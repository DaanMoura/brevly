import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeRight, type Either } from '@/shared/either'
import type { LinkModel } from '@/shared/schemas/link-model'

type GetLinksOutput = {
  links: LinkModel[]
  total: number
}

export const getLinks = async (): Promise<Either<never, GetLinksOutput>> => {
  const links: GetLinksOutput['links'] = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      alias: schema.links.alias,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)

  const total = links.length

  return makeRight({ links, total })
}
