import { Section, Container, cn } from '../../craft'
import { print } from 'graphql/language/printer'
import { ContentNode, Page, Service } from '@/gql/graphql'
import { PRICING_QUERY } from '@/lib/queries'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { SERVICES_QUERY } from '@/src/lib/queries/services/service-query'
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
