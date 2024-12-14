import { ContentNode } from '@/gql/graphql'
import dynamic from 'next/dynamic'

export interface TemplateProps {
  node: ContentNode
  type: 'landing' | 'detail'
}

type ComponentMap = {
  [key: string]: any
}

const components: ComponentMap = {
  landing: dynamic(async () => import('@/src/components/templates/work')),
  detail: dynamic(async () => import('@/src/components/templates/work/detail')),
}

export default function WorkTemplate({ node, type }: TemplateProps) {
  const Component = components[type] || components.landing

  if (!Component) {
    return <div>ERROR</div>
  }

  return <Component node={node} />
}
