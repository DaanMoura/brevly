import { db } from '@/db'
import { schema } from '@/db/schemas'
import { isRight, makeLeft, makeRight, type Either } from '@/shared/either'
import {
  type CreateLinkInput,
  createLinkInputSchema,
} from '@/shared/schemas/create-link'
import { getOneLink } from './get-one-link'

export const createLink = async (
  input: CreateLinkInput
): Promise<Either<string, { linkId: string }>> => {
  const { originalUrl, alias } = createLinkInputSchema.parse(input)

  const linkCheck = await getOneLink(alias)

  if (isRight(linkCheck)) {
    return makeLeft('Alias already exists')
  }

  const link = await db
    .insert(schema.links)
    .values({
      originalUrl,
      alias,
      accessCount: 0,
    })
    .returning({
      id: schema.links.id,
    })

  return makeRight({ linkId: link[0].id })
}
