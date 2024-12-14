import dynamic from 'next/dynamic'
import { ContentNode } from '@/gql/graphql'

export interface TemplateProps {
  node: ContentNode
	type: 'landing' | 'detail';
}

type ComponentMap = {
	[key: string]: any;
}

const components: ComponentMap = {
	landing: dynamic(async () => import('@/src/components/templates/journal')),
	detail: dynamic(async () => import('@/src/components/templates/journal/detail')),
};



export default function JournalTemplate({ node, type }: TemplateProps) {

	const Component = components[type] || components.landing;

	if(!Component) {
		return <div>ERROR</div>
	}

  return <Component node={node} />
}
