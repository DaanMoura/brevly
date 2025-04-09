import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeRight, type Either } from '@/shared/either'
import type { LinkModel } from '@/shared/schemas/link-model'
import { eq } from 'drizzle-orm'

export const getOneLink = async (
  alias: string
): Promise<Either<never, LinkModel>> => {
  const linkResult = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      alias: schema.links.alias,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(eq(schema.links.alias, alias))

  const link: LinkModel = linkResult[0]

  return makeRight(link)
}
