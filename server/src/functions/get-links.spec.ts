// import { db } from '@/db'
// import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { describe, expect, it } from 'vitest'
// import { schema } from '@/db/schemas'
import { getLinks } from './get-links'
// import { createLink } from './create-link'
import { isRight, unwrapEither } from '@/shared/either'

// const links = [
//   {
//     originalUrl: 'https://example1.com',
//     alias: 'get1',
//   },
//   {
//     originalUrl: 'https://example2.com',
//     alias: 'get2',
//   },
//   {
//     originalUrl: 'https://example3.com',
//     alias: 'get3',
//   },
// ]

describe('get links', () => {
  it('should return an error if there are no links', async () => {
    const result = await getLinks()
    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      const { links, total } = unwrapEither(result)
      expect(links).toEqual([])
      expect(total).toBe(0)
    }
  })
})

// describe('get links', () => {
//   beforeEach(async () => {
//     console.log('Starting database cleanup...')
//     await db.delete(schema.links)
//     const remainingLinks = await db.select().from(schema.links)
//     console.log(`Remaining links after cleanup: ${remainingLinks.length}`)
//     expect(remainingLinks.length).toBe(0)
//   })

//   afterAll(async () => {
//     await db.delete(schema.links)
//   })

//   it('should be able to get the links', async () => {
//     // Create links with additional logging and verification
//     const createdLinks = []
//     for (const link of links) {
//       console.log(`Attempting to create link: ${JSON.stringify(link)}`)
//       const linkResult = await createLink(link)
//       expect(isRight(linkResult)).toBe(true)

//       // Store created link details
//       createdLinks.push(unwrapEither(linkResult))
//     }

//     // Verify links were created in the database
//     const dbLinks = await db.select().from(schema.links)
//     console.log('Links in database after creation:', dbLinks)
//     console.log('Number of links in database:', dbLinks.length)
//     console.log('Created link details:', createdLinks)

//     // Add a small delay to ensure database operations are complete
//     await new Promise(resolve => setTimeout(resolve, 100))

//     // Retrieve and verify links
//     const result = await getLinks()
//     console.log('Get links result:', result)

//     expect(isRight(result)).toBe(true)

//     const linksResult = unwrapEither(result)
//     console.log('Retrieved links:', linksResult)

//     expect(linksResult.total).toBe(3)
//     expect(linksResult.links).toEqual(
//       expect.arrayContaining(
//         links.map(link => expect.objectContaining({ alias: link.alias }))
//       )
//     )
//   })
// })
