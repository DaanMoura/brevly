import { db } from '@/db'
import { schema } from '@/db/schemas'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getOneLink } from './get-one-link'
import { isRight, unwrapEither } from '@/shared/either'
import { createLink } from './create-link'

describe('get one link', () => {
  beforeAll(async () => {
    await db.delete(schema.links)
  })

  afterAll(async () => {
    await db.delete(schema.links)
  })

  it('should return an error if the alias does not exist', async () => {
    const result = await getOneLink('example1')

    expect(isRight(result)).toBe(false)
  })

  it('should return the link if the alias exists', async () => {
    const createResult = await createLink({
      originalUrl: 'https://example.com',
      alias: 'get-one-1',
    })

    expect(isRight(createResult)).toBe(true)

    const result = await getOneLink('get-one-1')

    expect(isRight(result)).toBe(true)
    if (isRight(createResult) && isRight(result)) {
      expect(unwrapEither(result)).toEqual({
        id: unwrapEither(createResult).linkId,
        originalUrl: 'https://example.com',
        alias: 'get-one-1',
        accessCount: 0,
        createdAt: expect.any(Date),
      })
    }
  })
})
