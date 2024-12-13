'use client'

import { Page } from '@/src/gql/graphql'
import Columns from './columns'
import MediaText from './media-text'
import ScrollSlideShow from './scroll-slide-show'
import TextBlock from './text-block'
export type BlockData = {
  name: string
  attributes: {
    [key: string]: any
    url?: string
    name?: string
    alt?: string
  }
  innerHTML?: string
  htmlContent?: string
  innerBlocks: BlockData[]
}

export default function Blocks({ page }: { page: Page }) {
  const blocks: BlockData[] = page.blocks || []
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.name) {
          case 'core/gallery':
            return <ScrollSlideShow key={index} block={block} />
          case 'core/columns':
            return <Columns key={index} {...block} />
          case 'core/paragraph':
            return <TextBlock key={index} data={block} />
          case 'core/media-text':
            return <MediaText key={index} data={block} />
          default:
            return null
        }
      })}
    </>
  )
}
