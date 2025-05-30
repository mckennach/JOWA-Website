// import FloatingContact from '@/components/footer/floating-contact'
// import PricingCTA from '@/components/footer/pricing-cta'
// import EmailSignature from '@/src/components/templates/email-signature'
import { ContentNode } from '@/gql/graphql'
import { fetchGraphQL } from '@/lib/api/fetchGraphQL'
import { nextSlugToWpSlug } from '@/lib/api/nextSlugToWpSlug'
import { setSeoData } from '@/lib/api/seoData'
import { CONTENT_INFO_QUERY, SEO_QUERY } from '@/lib/queries'
import WorkTemplate from '@/src/components/templates/work'
import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const slug = nextSlugToWpSlug('/work')

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

export default async function Page() {
  const slug = nextSlugToWpSlug('/work')

  const isPreview = slug.includes('preview')
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(CONTENT_INFO_QUERY),
    {
      slug: isPreview ? slug.split('preview/')[1] : slug,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
    }
  )

  if (!contentNode) return notFound()

  return (
    <div className="min-h-dvh">
      <WorkTemplate node={contentNode} />
    </div>
  )
}
