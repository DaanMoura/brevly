import { db, pg } from '@/db'
import { schema } from '@/db/schemas'
import { makeRight, type Either } from '@/shared/either'
import { uploadFileToStorage } from '@/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

type ExportLinksOutput = {
  reportUrl: string
}

export const exportLinks = async (): Promise<
  Either<never, ExportLinksOutput>
> => {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      alias: schema.links.alias,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(50)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'alias', header: 'Alias' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const rowTransformer = new Transform({
    objectMode: true, // chunk as object (or array or any primitive type), not Buffer
    transform(chunks: unknown[], _, callback) {
      for (const chunk of chunks) {
        console.log({ chunk })
        // write one row at the time, instead of all of the cursor at once
        this.push(chunk)
      }
      callback()
    },
  })

  const convertToCSVPipeline = pipeline(
    cursor,
    rowTransformer,
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'downloads',
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
