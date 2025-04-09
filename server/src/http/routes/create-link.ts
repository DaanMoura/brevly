import { createLink } from '@/functions/create-link'
import { isLeft } from '@/shared/either'
import { createLinkInputSchema } from '@/shared/schemas/create-link'
import { linkSchema } from '@/shared/schemas/link-model'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create link',
        tags: ['Links'],
        body: createLinkInputSchema,
        response: {
          200: z.object({ linkId: linkSchema.id }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, alias } = createLinkInputSchema.parse(request.body)

      const result = await createLink({ originalUrl, alias })

      if (isLeft(result)) {
        return reply.status(400).send({ message: result.left })
      }

      return reply.status(200).send({ linkId: result.right.linkId })
    }
  )
}
