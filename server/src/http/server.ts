import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '@/env'
import {
  createLinkRoute,
  getLinksRoute,
  getOneLinkRoute,
  increaseLinkRoute,
  deleteLinkRoute,
  exportLinksRoute,
} from './routes'

const HOST = '0.0.0.0'
const PORT = env.PORT

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      reason: error.validation,
    })
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brevly API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(getLinksRoute)
server.register(createLinkRoute)
server.register(getOneLinkRoute)
server.register(increaseLinkRoute)
server.register(deleteLinkRoute)
server.register(exportLinksRoute)

server.listen({ port: PORT, host: HOST }).then(() => {
  console.log(`🌎✅ Server running at http://${HOST}:${PORT}`)
})
