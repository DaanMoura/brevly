import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeRight, type Either } from '@/shared/either'
import type { LinkModel } from '@/shared/schemas/link-model'

type GetLinksOutput = {
  links: LinkModel[]
  total: number
}

export const getLinks = async (): Promise<Either<never, GetLinksOutput>> => {
  // Log the current database state before retrieving links
  const allLinks = await db.select().from(schema.links)
  console.log('DEBUG: All links in database:', allLinks)
  console.log('DEBUG: Total links count:', allLinks.length)

  const links: GetLinksOutput['links'] = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      alias: schema.links.alias,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)

  console.log('DEBUG: Retrieved links:', links)
  console.log('DEBUG: Retrieved links count:', links.length)

  const total = links.length

  return makeRight({ links, total })
}
