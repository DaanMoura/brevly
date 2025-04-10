import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createLink } from './create-link'
import { isRight } from '@/shared/either'
import { db } from '@/db'
import { schema } from '@/db/schemas'

describe('create link', () => {
  beforeAll(async () => {
    await db.delete(schema.links)
  })

  afterAll(async () => {
    await db.delete(schema.links)
  })

  it('should create a link', async () => {
    const result = await createLink({
      originalUrl: 'https://example.com',
      alias: 'example1',
    })

    expect(isRight(result)).toBe(true)
  })

  it('should return an error if the original link is not a valid url', async () => {
    const result = await createLink({
      originalUrl: 'example',
      alias: 'example2',
    })

    expect(isRight(result)).toBe(false)
  })

  it('should return an error if the alias is not a valid format', async () => {
    const result = await createLink({
      originalUrl: 'https://example.com',
      alias: 'example!',
    })

    expect(isRight(result)).toBe(false)
  })

  it('should return an error if the alias already exists', async () => {
    const result = await createLink({
      originalUrl: 'https://example.com',
      alias: 'example1',
    })

    expect(isRight(result)).toBe(false)
  })
})
