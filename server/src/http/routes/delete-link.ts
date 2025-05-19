import { deleteLink } from '@/functions/delete-link'
import { isLeft } from '@/shared/either'
import { linkSchema } from '@/shared/schemas/link-model'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:alias',
    {
      schema: {
        summary: 'Delete link',
        tags: ['Links'],
        params: z.object({
          alias: linkSchema.alias,
        }),
        response: {
          201: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { alias } = request.params

      const result = await deleteLink(alias)

      if (isLeft(result)) {
        return reply.status(404).send({ message: result.left })
      }

      return reply.status(201).send({ message: 'Link deleted successfully' })
    }
  )
}
