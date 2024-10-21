import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { print } from 'graphql/language/printer'

import { setSeoData } from '@/lib/api/seoData'

import { fetchGraphQL } from '@/lib/api/fetchGraphQL'
import { ContentNode } from '@/gql/graphql'
import PageTemplate from '@/components/templates/page/page-template'
import { nextSlugToWpSlug } from '@/lib/api/nextSlugToWpSlug'
import PostTemplate from '@/components/templates/post/post-template'
import { SEO_QUERY, CONTENT_INFO_QUERY } from '@/lib/queries'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = nextSlugToWpSlug(params.slug)
  const isPreview = slug.includes('preview')

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SEO_QUERY),
    {
      slug: isPreview ? slug.split('preview/')[1] : slug,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
    }
  )

  if (!contentNode) {
    return notFound()
  }

  const metadata = setSeoData({ seo: contentNode.seo })

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  } as Metadata
}

export function generateStaticParams() {
  return []
}

export default async function Page({ params }: Props) {
  const slug = nextSlugToWpSlug(params.slug)
  const isPreview = slug.includes('preview')
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(CONTENT_INFO_QUERY),
    {
      slug: isPreview ? slug.split('preview/')[1] : slug,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
    }
  )

  if (!contentNode) return notFound()

  switch (contentNode.contentTypeName) {
    case 'page':
      return <PageTemplate node={contentNode} />
    case 'post':
      return <PostTemplate node={contentNode} />
    default:
      return <p>{contentNode.contentTypeName} not implemented</p>
  }
}
