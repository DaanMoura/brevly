import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'
import { Readable } from 'node:stream'
import { Upload } from '@aws-sdk/lib-storage'
import { z } from 'zod'
import { r2 } from './client'
import { env } from '@/env'

const uploadFileToStorageInput = z.object({
  folder: z.enum(['downloads']),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>

export const uploadFileToStorage = async (input: UploadFileToStorageInput) => {
  const { folder, fileName, contentType, contentStream } =
    uploadFileToStorageInput.parse(input)

  const fileExtension = extname(fileName)
  const fileNameWithoutExtension = basename(fileName)
  const sanitizedFileName = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9]/g,
    ''
  )
  const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  console.log('Uploading file to storage...')

  upload.on('httpUploadProgress', progress => {
    console.log('Upload progress:', progress)
  })

  await upload.done().catch(error => {
    console.error('Failed to upload file to storage:', error)
    throw error
  })

  console.log('File uploaded to storage')

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_BUCKET_URL).toString(),
  }
}
