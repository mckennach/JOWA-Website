import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'

import { ContentNode, Page } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { setSeoData } from '@/src/lib/api/seoData'
import { SEO_QUERY } from '@/src/lib/queries'
import { PAGE_QUERY } from '@/src/lib/queries/pages/page-query'
import Link from 'next/link'
import { Container, Section } from '../components/craft'

const notFoundPageWordPressId = 28
export const runtime = 'edge'
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

  return (
    <Section className="py-60 text-center">
      <Container>
        <h1>404</h1>
        <div className="space-y-8">
          <p className="body-xl-fluid">
            We can&apos;t find the page you&apos;re looking for.{' '}
          </p>

          <Link
            href="/"
            className="group flex items-center justify-center gap-4"
          >
            <p className="label-fluid">Return to the homepage</p>
            <svg
              width="40"
              height="8"
              viewBox="0 0 40 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:translate-x-2 group-hover:transform"
            >
              <path
                d="M39.3536 4.35355C39.5488 4.15829 39.5488 3.84171 39.3536 3.64645L36.1716 0.464466C35.9763 0.269204 35.6597 0.269204 35.4645 0.464466C35.2692 0.659728 35.2692 0.976311 35.4645 1.17157L38.2929 4L35.4645 6.82843C35.2692 7.02369 35.2692 7.34027 35.4645 7.53553C35.6597 7.7308 35.9763 7.7308 36.1716 7.53553L39.3536 4.35355ZM0 4.5H39V3.5H0V4.5Z"
                fill="#3F261D"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
