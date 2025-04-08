import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinks: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get link list',
        tags: ['Links'],
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send('Hello World')
    }
  )
}
