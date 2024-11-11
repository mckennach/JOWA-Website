import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { print } from 'graphql/language/printer'

import { setSeoData } from '@/lib/api/seoData'

import { fetchGraphQL } from '@/lib/api/fetchGraphQL'
import { ContentNode } from '@/gql/graphql'
import PageTemplate from '@/src/components/templates/page'
import { nextSlugToWpSlug } from '@/lib/api/nextSlugToWpSlug'
import { SEO_QUERY, CONTENT_INFO_QUERY } from '@/lib/queries'
import HomePage from '@/src/components/templates/home'
import WorkTemplate from '@/src/components/templates/work/work-template'
import Loading from '@/src/components/templates/home/loading'
import WorkDetailTemplate from '@/src/components/templates/work/detail'
import AboutTemplate from '@/src/components/templates/about'
import ContactTemplate from '@/src/components/templates/contact'
import JournalTemplate from '@/src/components/templates/journal'
import JournalDetailTemplate from '@/src/components/templates/journal/detail'
import FloatingContact from '@/components/footer/floating-contact'
import PricingCTA from '@/components/footer/pricing-cta'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let detailSlug: string | boolean = false

  if (params.slug && params.slug.length > 1) {
    if (params.slug[0] === 'work') {
      detailSlug = `/project/${params.slug[1]}/`
    } else if (params.slug[0] === 'journal') {
      detailSlug = `/${params.slug[1]}/`
    }
  }

  const slug = nextSlugToWpSlug(detailSlug || params.slug)

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


export default async function Page({ params }: Props) {
  let detailSlug: string | boolean = false

  if (params.slug && params.slug.length > 1) {
    if (params.slug[0] === 'work') {
      detailSlug = `/project/${params.slug[1]}/`
    } else if (params.slug[0] === 'journal') {
      detailSlug = `/${params.slug[1]}/`
    }
  }

  const slug = nextSlugToWpSlug(detailSlug || params.slug)

  const isPreview = slug.includes('preview')
	
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(CONTENT_INFO_QUERY),
    {
      slug: isPreview ? slug.split('preview/')[1] : slug,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
    }
  )

  if (!contentNode) return notFound()

  if (contentNode.contentTypeName === 'page') {
    switch (slug) {
      case '/':
        return (
          <>
            <HomePage node={contentNode} />
            <PricingCTA />
            <FloatingContact />
          </>
        )
      case 'work':
        return <WorkTemplate node={contentNode} />
      case 'journal':
        return <JournalTemplate node={contentNode} />
      case 'about':
        return <AboutTemplate node={contentNode} />
      case 'contact':
        return <ContactTemplate node={contentNode} />
      default:
        return (
          <div className="flex h-[90vh] items-center justify-center">
            <h1>COMING SOON</h1>
          </div>
        )
    }
  } else if (contentNode.contentTypeName === 'project') {
    return (
      <>
        <WorkDetailTemplate node={contentNode} />
        <PricingCTA />
      </>
    )
  } else if (contentNode.contentTypeName === 'post') {
    return <JournalDetailTemplate node={contentNode} />
  }

  return (
    <div className="flex h-[90vh] items-center justify-center">
      <h1>
        {slug}: {isPreview}
      </h1>
      <div>
        <pre>
          <code>{JSON.stringify(contentNode, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}
