import { db } from '@/db'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { schema } from '@/db/schemas'
import { getLinks } from './get-links'
import { createLink } from './create-link'
import { isRight, unwrapEither } from '@/shared/either'

const links = [
  {
    originalUrl: 'https://example1.com',
    alias: 'get1',
  },
  {
    originalUrl: 'https://example2.com',
    alias: 'get2',
  },
  {
    originalUrl: 'https://example3.com',
    alias: 'get3',
  },
]

describe('get links', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  afterAll(async () => {
    await db.delete(schema.links)
  })

  it('should be able to get the links', async () => {
    for (const link of links) {
      console.log('Creating link', link)
      const linkResult = await createLink(link)
      expect(isRight(linkResult)).toBe(true)
      console.log('Created link', linkResult)
    }

    const result = await getLinks()

    expect(isRight(result)).toBe(true)
    expect(unwrapEither(result).total).toBe(3)
    expect(unwrapEither(result).links).toEqual(
      links.map(link => expect.objectContaining({ alias: link.alias }))
    )
  })
})
