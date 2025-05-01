import { exportLinks } from '@/functions/export-links'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/export',
    {
      schema: {
        summary: 'Export links',
        tags: ['Links'],
        response: {
          200: z.object({ reportUrl: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinks(
        request.headers.origin ?? 'http://brev.ly'
      )

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    }
  )
}
