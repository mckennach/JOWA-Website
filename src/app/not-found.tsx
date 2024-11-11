import type { Metadata } from 'next'
import { print } from 'graphql/language/printer'

import { setSeoData } from '@/src/lib/api/seoData'

import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { ContentNode, Page } from '@/gql/graphql'
import { PAGE_QUERY } from '@/src/lib/queries/pages/page-query'
import { SEO_QUERY } from '@/src/lib/queries'

const notFoundPageWordPressId = 28

export async function generateMetadata(): Promise<Metadata> {
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SEO_QUERY),
    { slug: notFoundPageWordPressId, idType: 'DATABASE_ID' }
  )

  const metadata = setSeoData({ seo: contentNode.seo })

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  } as Metadata
}

export default async function NotFound() {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PAGE_QUERY), {
    id: notFoundPageWordPressId,
  })

  return <div dangerouslySetInnerHTML={{ __html: page.content || ' ' }} />
}
