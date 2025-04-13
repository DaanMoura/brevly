import { increaseLinkAccess } from '@/functions/increase-link-access'
import { isLeft } from '@/shared/either'
import { linkSchema } from '@/shared/schemas/link-model'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const increaseLinkRoute: FastifyPluginAsyncZod = async server => {
  server.put(
    '/link/:alias/access',
    {
      schema: {
        summary: 'Increase link access',
        tags: ['Links'],
        params: z.object({
          alias: linkSchema.alias,
        }),
        response: {
          200: z.object(linkSchema),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { alias } = request.params

      const link = await increaseLinkAccess({ alias })

      if (isLeft(link)) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      return reply.status(200).send(link.right)
    }
  )
}
