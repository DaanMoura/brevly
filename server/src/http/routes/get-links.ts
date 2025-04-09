import { getLinks } from '@/functions/get-links'
import { unwrapEither } from '@/shared/either'
import { linkSchema } from '@/shared/schemas/link-model'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get link list',
        tags: ['Links'],
        response: {
          200: z.object({
            links: z.array(z.object(linkSchema)),
            total: z.number(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await getLinks()

      const { links, total } = unwrapEither(result)

      return reply.status(200).send({ links, total })
    }
  )
}
