import { ContentNode } from '@/gql/graphql'
import dynamic from 'next/dynamic'

export interface TemplateProps {
  node: ContentNode
}

type ComponentMap = {
  [key: string]: any
}

const components: ComponentMap = {
  home: dynamic(async () => import('@/src/components/templates/home')),
  'home-2': dynamic(async () => import('@/src/components/templates/home')),
  about: dynamic(async () => import('@/src/components/templates/about')),
  contact: dynamic(async () => import('@/src/components/templates/contact')),
  pricing: dynamic(async () => import('@/src/components/templates/pricing')),
  'email-signature': dynamic(
    async () => import('@/src/components/templates/email-signature')
  ),
  default: dynamic(async () => import('@/src/components/templates/page')),
}

export default function PageTemplates({ node }: TemplateProps) {
  const Component = node.slug
    ? components[node.slug] || components.default
    : components.default

  if (!Component) {
    return <div>ERROR</div>
  }

  return <Component node={node} />
}
