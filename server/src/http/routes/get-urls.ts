import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUrls: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/urls",
    {
      schema: {
        summary: "Get URL list",
        tags: ["URL"],
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send("Hello World");
    }
  );
};
