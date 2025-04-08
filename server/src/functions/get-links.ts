import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeRight, type Either } from '@/shared/either'
import { z } from 'zod'

const getLinksInputSchema = z.object({
  origin: z.string().url(),
})

type GetLinksInput = z.input<typeof getLinksInputSchema>

type GetLinksOutput = {
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: string
  }[]
  total: number
}

export const getLinks = async (
  input: GetLinksInput
): Promise<Either<never, GetLinksOutput>> => {
  const { origin } = getLinksInputSchema.parse(input)

  const linksResult = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      alias: schema.links.alias,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)

  const links: GetLinksOutput['links'] = linksResult.map(link => ({
    id: link.id,
    originalUrl: link.originalUrl,
    shortUrl: `${origin}/${link.alias}`,
    accessCount: link.accessCount,
    createdAt: link.createdAt.toISOString(),
  }))

  const total = links.length

  return makeRight({ links, total })
}
