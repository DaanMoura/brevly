import { z } from 'zod'

export const linkSchema = {
  id: z.string().uuid(),
  originalUrl: z.string().url(),
  alias: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  accessCount: z.number(),
  createdAt: z.date(),
}

export const linkObjectSchema = z.object(linkSchema)

export type LinkModel = z.infer<typeof linkObjectSchema>
