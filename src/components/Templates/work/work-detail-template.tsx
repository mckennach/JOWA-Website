'use client'

import { print } from 'graphql/language/printer'
import { ContentNode, Page } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { WorkDetailQuery } from './WorkDetailQuery'
import Blocks from '../../blocks'

interface TemplateProps {
  node: ContentNode
}

export default function WorkDetailTemplate({ node }: TemplateProps) {
  console.log(node)
  return <div>WORK DETAIL</div>
}
