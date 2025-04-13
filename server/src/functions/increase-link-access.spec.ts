import { describe, expect, it } from 'vitest'
import { createLink } from './create-link'
import { increaseLinkAccess } from './increase-link-access'
import { getOneLink } from './get-one-link'
import { isRight, unwrapEither } from '@/shared/either'

describe('increase link access', () => {
  it('should increase the link access', async () => {
    await createLink({
      originalUrl: 'https://example.com',
      alias: 'increase-1',
    })

    await increaseLinkAccess({ alias: 'increase-1' })
    await increaseLinkAccess({ alias: 'increase-1' })

    const link = await getOneLink('increase-1')

    console.log('get link:', link)

    if (isRight(link)) {
      expect(unwrapEither(link).accessCount).toBe(2)
    }
  })
})
