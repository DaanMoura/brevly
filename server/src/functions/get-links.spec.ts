import { describe, expect, it, beforeEach } from 'vitest'
import { db } from '@/db'
import { schema } from '@/db/schemas'
import { makeLink } from '@/test/factories/make-link'
import { getLinks } from './get-links'
import { isRight, unwrapEither } from '@/shared/either'

describe.sequential('getLinks', () => {
  beforeEach(async () => {
    // Clean the entire links table before each test
    await db.delete(schema.links)
  })

  it('returns empty array when no links exist', async () => {
    // No need to delete links here since beforeEach already does it
    const result = await getLinks()

    expect(isRight(result)).toBe(true)
    const { links, total } = unwrapEither(result)
    expect(links).toEqual([])
    expect(total).toBe(0)
  })

  it('returns all links when they exist', async () => {
    // Create test links with a specific pattern we can identify
    const testPrefix = 'test-get-links-'
    const link1 = await makeLink({ alias: `${testPrefix}1` })
    const link2 = await makeLink({ alias: `${testPrefix}2` })
    const link3 = await makeLink({ alias: `${testPrefix}3` })

    const result = await getLinks()

    expect(isRight(result)).toBe(true)
    const { links, total } = unwrapEither(result)

    expect(total).toBe(3)
    // Verify each link has the correct properties
    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: link1.id,
          originalUrl: link1.originalUrl,
          alias: link1.alias,
          accessCount: link1.accessCount,
          createdAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: link2.id,
          originalUrl: link2.originalUrl,
          alias: link2.alias,
          accessCount: link2.accessCount,
          createdAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: link3.id,
          originalUrl: link3.originalUrl,
          alias: link3.alias,
          accessCount: link3.accessCount,
          createdAt: expect.any(Date),
        }),
      ])
    )
  })
})
