import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/db'
import { schema } from '@/db/schemas'
import { createLink } from './create-link'
import { getOneLink } from './get-one-link'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { eq } from 'drizzle-orm'
import type { CreateLinkInput } from '@/shared/schemas/create-link'

const testAlias = 'brev-test-alias'
const testUrl = 'https://brevly.com'

async function clearTestLink(alias: string) {
  await db.delete(schema.links).where(eq(schema.links.alias, alias))
}

describe.sequential('createLink', () => {
  beforeEach(async () => {
    await clearTestLink(testAlias)
  })

  it('returns left if input is invalid', async () => {
    const invalidInput: CreateLinkInput = {
      originalUrl: '123',
      alias: testAlias,
    }
    const result = await createLink(invalidInput)
    expect(isLeft(result)).toBe(true)
    expect(result.left).toMatch(/originalUrl/)
  })

  it('returns left if alias already exists', async () => {
    await db
      .insert(schema.links)
      .values({ originalUrl: testUrl, alias: testAlias, accessCount: 0 })
    const result = await createLink({ originalUrl: testUrl, alias: testAlias })
    expect(isLeft(result)).toBe(true)
    expect(result.left).toBe('Alias already exists')
  })

  it('creates link and returns right with linkId', async () => {
    const result = await createLink({ originalUrl: testUrl, alias: testAlias })
    expect(isRight(result)).toBe(true)
    expect(result.right).toHaveProperty('linkId')
    const link = await getOneLink(testAlias)
    expect(isRight(link)).toBe(true)
    if (isRight(link)) {
      expect(unwrapEither(link).alias).toBe(testAlias)
      expect(unwrapEither(link).originalUrl).toBe(testUrl)
    }
  })
})
