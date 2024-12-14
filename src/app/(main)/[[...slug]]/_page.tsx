import { ContentNode } from '@/gql/graphql'
import { fetchGraphQL } from '@/lib/api/fetchGraphQL'
import { nextSlugToWpSlug } from '@/lib/api/nextSlugToWpSlug'
import { setSeoData } from '@/lib/api/seoData'
import { CONTENT_INFO_QUERY, SEO_QUERY } from '@/lib/queries'
import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense, lazy } from 'react'

const LoginPage = lazy(() => import('@/src/components/templates/login'))
const HomePage = dynamic(() => import('@/src/components/templates/home'), {
  ssr: false,
})
const PageTemplates = dynamic(() => import('@/src/templates/page-templates'))
const JournalTemplate = dynamic(
  () => import('@/src/templates/journal-template')
)
const WorkTemplate = dynamic(() => import('@/src/templates/work-template'))
// const JournalTemplate = lazy(() => import('@/src/components/templates/journal'))
// const JournalDetailTemplate = lazy(
//   () => import('@/src/components/templates/journal/detail')
// )
// const PricingTemplate = lazy(() => import('@/src/components/templates/pricing'))
// const WorkTemplate = lazy(() => import('@/src/components/templates/work'))
// const WorkDetailTemplate = lazy(
//   () => import('@/src/components/templates/work/detail')
// )
// const AboutTemplate = lazy(() => import('@/src/components/templates/about'))
// const ContactTemplate = lazy(() => import('@/src/components/templates/contact'))

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = await cookies()
  const isAuth = cookieStore.get('user:auth')

  if (!isAuth)
    return {
      title: 'Login',
      description: 'Login',
    }

  let detailSlug: string | boolean = false
  if (params.slug && params.slug.length > 1) {
    if (params.slug[0] === 'work') {
      detailSlug = `/work/${params.slug[1]}/`
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
  const cookieStore = await cookies()
  const isAuth = cookieStore.get('user:auth')

  if (!isAuth) {
    return <LoginPage />
  }

  let detailSlug: string | boolean = false

  if (params.slug && params.slug.length > 1) {
    if (params.slug[0] === 'work') {
      detailSlug = `/work/${params.slug[1]}/`
    } else if (params.slug[0] === 'journal') {
      detailSlug = `/${params.slug[1]}/`
    }
  }

  const slug = nextSlugToWpSlug(detailSlug || params.slug)

  const isPreview = slug.includes('preview')
  const slugToCheck = isPreview ? slug.split('preview/')[1] : slug
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(CONTENT_INFO_QUERY),
    {
      slug: isPreview ? slug.split('preview/')[1] : slug,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
    }
  )

  if (!contentNode) return notFound()

  return (
    <Suspense fallback={<div className="h-screen w-screen" />}>
      {contentNode.contentTypeName === 'page' &&
        contentNode.slug === 'journal' && (
          <JournalTemplate node={contentNode} type="landing" />
        )}
      {contentNode.contentTypeName === 'page' &&
        contentNode.slug === 'work' && (
          <WorkTemplate node={contentNode} type="landing" />
        )}
      {contentNode.contentTypeName === 'page' &&
        contentNode.slug !== 'journal' &&
        contentNode.slug !== 'work' && <PageTemplates node={contentNode} />}
      {contentNode.contentTypeName === 'post' && (
        <JournalTemplate node={contentNode} type="detail" />
      )}
      {contentNode.contentTypeName === 'work' && (
        <WorkTemplate node={contentNode} type="detail" />
      )}
    </Suspense>
  )
}
