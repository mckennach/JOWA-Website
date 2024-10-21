'use client'

import { print } from 'graphql/language/printer'
import { ContentNode, Page } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { WORK_DETAIL_QUERY } from '@/lib/queries'
import Blocks from '../../blocks'

interface TemplateProps {
  node: ContentNode
}

export default function WorkDetailTemplate({ node }: TemplateProps) {
  // const {
  //   posts: { nodes },
  // } = await fetchGraphQL<{ posts: { nodes: Array<Post> } }>(print(WORK_DETAIL_QUERY))

  return <div>WORK DETAIL</div>
}