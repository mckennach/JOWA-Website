import { setSeoData } from '@/lib/api/seoData'
import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'
// import FloatingContact from '@/components/footer/floating-contact'
// import PricingCTA from '@/components/footer/pricing-cta'
import { ContentNode, Global } from '@/gql/graphql'
import { fetchGraphQL } from '@/lib/api/fetchGraphQL'
import { nextSlugToWpSlug } from '@/lib/api/nextSlugToWpSlug'
import { CONTENT_INFO_QUERY, SEO_QUERY, GLOBALS_QUERY } from '@/lib/queries'
// import EmailSignature from '@/src/components/templates/email-signature'
import { cookies } from 'next/headers'
import HomePage from '@/src/components/templates/home';
import LoginPage from '@/src/components/templates/login';
import JournalTemplate from '@/src/components/templates/journal'
import JournalDetailTemplate from '@/src/components/templates/journal/detail'
import PricingTemplate from '@/src/components/templates/pricing'
import WorkTemplate from '@/src/components/templates/work'
import WorkDetailTemplate from '@/src/components/templates/work/detail'
import AboutTemplate from '@/src/components/templates/about'
import ContactTemplate from '@/src/components/templates/contact'

const FloatingContact = lazy(() => import('@/src/components/footer/floating-contact'))	
const PricingCTA = lazy(() => import('@/src/components/footer/pricing-cta'))
const EmailSignature = lazy(() => import('@/src/components/templates/email-signature'))
const PageTemplate = lazy(() => import('@/src/components/templates/page'))

async function getGlobalData() {
  const { global } = await fetchGraphQL<{
    global: Global
  }>(print(GLOBALS_QUERY), {
    id: '357',
  })

  if (global === null) {
    throw new Error('Failed to fetch data')
  }

  return global
}


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
  const isAuth = cookieStore.get('user:auth');
	const globalData = await getGlobalData();
	
  if (!isAuth && globalData.globals?.passwordEnabled) {
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
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(CONTENT_INFO_QUERY),
    {
      slug: isPreview ? slug.split('preview/')[1] : slug,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
    }
  )

  if (!contentNode) return notFound()

  if (contentNode.contentTypeName === 'page') {
    switch (contentNode.slug) {
      case 'home-2':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <HomePage node={contentNode} />
            <PricingCTA />
            <FloatingContact />
          </Suspense>
        )
      case 'work':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <WorkTemplate node={contentNode} />
          </Suspense>
        )
      case 'journal':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <JournalTemplate node={contentNode} />
          </Suspense>
        )
      case 'about':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <AboutTemplate node={contentNode} />
          </Suspense>
        )
      case 'contact':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <ContactTemplate node={contentNode} />
          </Suspense>
        )
      case 'pricing':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <PricingTemplate node={contentNode} />
          </Suspense>
        )
      case 'email-signature':
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <EmailSignature />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<div className="h-screen w-screen" />}>
            <PageTemplate node={contentNode} />
          </Suspense>
        )
    }
  } else if (contentNode.contentTypeName === 'work') {
    return (
      <Suspense fallback={<div className="h-screen w-screen" />}>
        <WorkDetailTemplate node={contentNode} />
        <PricingCTA />
      </Suspense>
    )
  } else if (contentNode.contentTypeName === 'post') {
    return (
      <Suspense fallback={<div className="h-screen w-screen" />}>
        <JournalDetailTemplate node={contentNode} />
      </Suspense>
    )
  }

  return null
}
