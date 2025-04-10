import { db } from '@/db'
import { schema } from '@/db/schemas'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { deleteLink } from './delete-link'
import { isLeft, isRight } from '@/shared/either'
import { createLink } from './create-link'
import { getOneLink } from './get-one-link'

describe('delete link', () => {
  beforeAll(async () => {
    await db.delete(schema.links)
  })

  afterAll(async () => {
    await db.delete(schema.links)
  })

  it('should return an error if the link does not exist', async () => {
    const result = await deleteLink('abc')
    expect(isLeft(result)).toBe(true)
  })

  it('should be able to delete a specific link', async () => {
    await createLink({
      originalUrl: 'https://example1.com',
      alias: 'delete1',
    })

    await createLink({
      originalUrl: 'https://example2.com',
      alias: 'delete2',
    })

    const deleteResult = await deleteLink('delete1')
    console.log('delete result: ', deleteResult)
    expect(isRight(deleteResult)).toBe(true)

    const getOneResult1 = await getOneLink('delete1')
    expect(isRight(getOneResult1)).toBe(false)

    const getOneResult2 = await getOneLink('delete2')
    expect(isRight(getOneResult2)).toBe(true)
  })
})
