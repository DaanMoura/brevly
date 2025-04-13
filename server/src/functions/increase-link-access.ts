import { type Either, isLeft, makeLeft, makeRight } from '@/shared/either'
import { getOneLink } from './get-one-link'
import { db } from '@/db'
import { schema } from '@/db/schemas'
import { eq } from 'drizzle-orm'
import type { LinkModel } from '@/shared/schemas/link-model'

type IncreaseLinkAccessInput = {
  alias: string
}

export const increaseLinkAccess = async ({
  alias,
}: IncreaseLinkAccessInput): Promise<Either<string, LinkModel>> => {
  const linkCheck = await getOneLink(alias)

  if (isLeft(linkCheck)) {
    return makeLeft('Link not found')
  }

  const link = await db
    .update(schema.links)
    .set({ accessCount: linkCheck.right.accessCount + 1 })
    .where(eq(schema.links.alias, alias))
    .returning({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      alias: schema.links.alias,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })

  console.log(`Link ${alias} access count incremented successfully`)

  return makeRight(link[0])
}
