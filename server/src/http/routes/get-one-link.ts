import { getOneLink } from '@/functions/get-one-link'
import { isLeft } from '@/shared/either'
import { linkSchema } from '@/shared/schemas/link-model'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOneLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:alias',
    {
      schema: {
        summary: 'Get one link',
        tags: ['Links'],
        params: z.object({
          alias: z.string(),
        }),
        response: {
          200: z.object(linkSchema),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { alias } = request.params

      const link = await getOneLink(alias)

      if (isLeft(link)) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      return reply.status(200).send(link.right)
    }
  )
}
