import { ContentNode, Page } from '@/gql/graphql'
import { PRICING_QUERY } from '@/lib/queries'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql/language/printer'
import PricingCalculator from './calculator'

interface TemplateProps {
  node: ContentNode
}

export default async function AboutTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PRICING_QUERY), {
    id: 54,
  })

  return <PricingCalculator page={page} />
}
