import { db } from '@/db'
import { schema } from '@/db/schemas'
import { type Either, isLeft, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { getOneLink } from './get-one-link'

export const deleteLink = async (
  alias: string
): Promise<Either<string, boolean>> => {
  const linkCheck = await getOneLink(alias)

  if (isLeft(linkCheck)) {
    return makeLeft('Link not found')
  }

  await db.delete(schema.links).where(eq(schema.links.alias, alias))

  return makeRight(true)
}
