import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeRight, type Either } from '@/shared/either'
import {
  type CreateLinkInput,
  createLinkInputSchema,
} from '@/shared/schemas/create-link'

export const createLink = async (
  input: CreateLinkInput
): Promise<Either<never, { linkId: string }>> => {
  const { originalUrl, alias } = createLinkInputSchema.parse(input)

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
