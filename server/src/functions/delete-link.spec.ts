import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '@/db'
import { schema } from '@/db/schemas'
import { deleteLink } from './delete-link'
import { createLink } from './create-link'
import { getOneLink } from './get-one-link'
import { isLeft, isRight } from '@/shared/either'
import { eq } from 'drizzle-orm'

const testAlias = 'brev-delete-test-alias'
const testUrl = 'https://brevly.com'

async function clearTestLink(alias: string) {
  await db.delete(schema.links).where(eq(schema.links.alias, alias))
}

describe.sequential('deleteLink', () => {
  beforeEach(async () => {
    await clearTestLink(testAlias)
  })

  it('returns left if alias does not exist', async () => {
    const result = await deleteLink(testAlias)
    expect(isLeft(result)).toBe(true)
    expect(result.left).toBe('Link not found')
  })

  it('deletes an existing link and returns right', async () => {
    // Insert the link first
    await createLink({ originalUrl: testUrl, alias: testAlias })
    // Confirm it exists
    const before = await getOneLink(testAlias)
    expect(isRight(before)).toBe(true)
    // Delete
    const result = await deleteLink(testAlias)
    expect(isRight(result)).toBe(true)
    expect(result.right).toBe(true)
    // Confirm it is gone
    const after = await getOneLink(testAlias)
    expect(isLeft(after)).toBe(true)
  })

  it('deleting the same alias twice: first right, then left', async () => {
    await createLink({ originalUrl: testUrl, alias: testAlias })
    const first = await deleteLink(testAlias)
    expect(isRight(first)).toBe(true)
    const second = await deleteLink(testAlias)
    expect(isLeft(second)).toBe(true)
    expect(second.left).toBe('Link not found')
  })
})
