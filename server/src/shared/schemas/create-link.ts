import { z } from 'zod'
import { linkSchema } from './link-model'

export const createLinkInputSchema = z.object({
  originalUrl: linkSchema.originalUrl,
  alias: linkSchema.alias,
})

export type CreateLinkInput = z.input<typeof createLinkInputSchema>
