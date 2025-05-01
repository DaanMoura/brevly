import { db } from '@/db'
import { schema } from '@/db/schemas'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const originalUrl = faker.internet.url()
  const alias = faker.internet.domainWord()

  const result = await db
    .insert(schema.links)
    .values({
      originalUrl,
      alias,
      accessCount: 0,
      ...overrides,
    })
    .returning()

  return result[0]
}
