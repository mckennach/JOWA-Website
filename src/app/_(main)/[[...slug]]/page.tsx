import { setSeoData } from '@/lib/api/seoData'
import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
// import FloatingContact from '@/components/footer/floating-contact'
// import PricingCTA from '@/components/footer/pricing-cta'
import { ContentNode, Global } from '@/gql/graphql'
import { fetchGraphQL } from '@/lib/api/fetchGraphQL'
import { nextSlugToWpSlug } from '@/lib/api/nextSlugToWpSlug'
import { CONTENT_INFO_QUERY, GLOBALS_QUERY, SEO_QUERY } from '@/lib/queries'
// import EmailSignature from '@/src/components/templates/email-signature'
import { cookies } from 'next/headers'

const HomePage = dynamic(() => import('@/src/components/templates/home'))
const LoginPage = dynamic(() => import('@/src/components/templates/login'))
const JournalTemplate = dynamic(
  () => import('@/src/components/templates/journal')
)
const JournalDetailTemplate = dynamic(
  () => import('@/src/components/templates/journal/detail')
)
const PricingTemplate = dynamic(
  () => import('@/src/components/templates/pricing')
)
const WorkTemplate = dynamic(() => import('@/src/components/templates/work'))
const WorkDetailTemplate = dynamic(
  () => import('@/src/components/templates/work/detail')
)
const AboutTemplate = dynamic(() => import('@/src/components/templates/about'))
const ContactTemplate = dynamic(
  () => import('@/src/components/templates/contact')
)
const EmailSignature = dynamic(
  () => import('@/src/components/templates/email-signature')
)
const PageTemplate = dynamic(() => import('@/src/components/templates/page'))

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
  const isAuth = cookieStore.get('user:auth')
  const globalData = await getGlobalData()

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
          <div className="min-h-dvh">
            <HomePage node={contentNode} />
          </div>
        )
      case 'work':
        return (
          <div className="min-h-dvh">
            <WorkTemplate node={contentNode} />
          </div>
        )
      case 'journal':
        return (
          <div className="min-h-dvh">
            <JournalTemplate node={contentNode} />
          </div>
        )
      case 'about':
        return (
          <div className="min-h-dvh">
            <AboutTemplate node={contentNode} />
          </div>
        )
      case 'contact':
        return (
          <div className="min-h-dvh">
            <ContactTemplate node={contentNode} />
          </div>
        )
      case 'pricing':
        return (
          <div className="min-h-dvh">
            <PricingTemplate node={contentNode} />
          </div>
        )
      case 'email-signature':
        return (
          <div className="min-h-dvh">
            <EmailSignature />
          </div>
        )
      default:
        return (
          <div className="min-h-dvh">
            <PageTemplate node={contentNode} />
          </div>
        )
    }
  } else if (contentNode.contentTypeName === 'work') {
    return (
      <div className="min-h-dvh">
        <WorkDetailTemplate node={contentNode} />
      </div>
    )
  } else if (contentNode.contentTypeName === 'post') {
    return (
      <div className="min-h-dvh">
        <JournalDetailTemplate node={contentNode} />
      </div>
    )
  }

  return null
}
