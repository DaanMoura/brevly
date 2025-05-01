import { describe, expect, it, beforeEach } from 'vitest'
import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeLink } from '@/test/factories/make-link'
import { increaseLinkAccess } from './increase-link-access'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { randomUUID } from 'node:crypto'

describe.sequential('increaseLinkAccess', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('returns left with "Link not found" when link does not exist', async () => {
    const nonExistentAlias = randomUUID()
    const result = await increaseLinkAccess({ alias: nonExistentAlias })

    expect(isLeft(result)).toBe(true)
    expect(result.left).toBe('Link not found')
  })

  it('increments access count and returns updated link data', async () => {
    // Create a test link
    const testLink = await makeLink()
    const initialAccessCount = testLink.accessCount

    const result = await increaseLinkAccess({ alias: testLink.alias })

    expect(isRight(result)).toBe(true)
    const link = unwrapEither(result)

    expect(link).toEqual({
      id: testLink.id,
      originalUrl: testLink.originalUrl,
      alias: testLink.alias,
      accessCount: initialAccessCount + 1,
      createdAt: expect.any(Date),
    })
  })

  it('correctly updates access count when called multiple times', async () => {
    // Create a test link
    const testLink = await makeLink()
    const initialAccessCount = testLink.accessCount

    // Increase access count twice
    await increaseLinkAccess({ alias: testLink.alias })
    const result = await increaseLinkAccess({ alias: testLink.alias })

    expect(isRight(result)).toBe(true)
    const link = unwrapEither(result)

    expect(link).toEqual({
      id: testLink.id,
      originalUrl: testLink.originalUrl,
      alias: testLink.alias,
      accessCount: initialAccessCount + 2,
      createdAt: expect.any(Date),
    })
  })
})
