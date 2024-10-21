'use client'

import { Section, Container, cn } from '@/components/craft'
import Blocks, { BlockData } from '..'
import ImageBlock from '../image'
import TextBlock from '../text-block'

export default function Columns({ ...props }: BlockData) {
  console.log(props)
  return (
    <Section>
      <Container>
        <div className="space-around flex flex-col-reverse gap-4 md:flex-row">
          {props.innerBlocks.map((block, index) => {
            if (block.name !== 'core/column') return null
            // const { innerHTML } = block.innerBlocks[0];
            return (
              <div
                key={index}
                className={cn('flex items-center py-8 md:basis-1/2 md:py-40')}
              >
                <div
                  className={cn(
                    index === 0
                      ? 'max-w-[476px] md:pl-28'
                      : 'max-w-[750px] md:pr-28'
                  )}
                >
                  {block.innerBlocks[0].name === 'core/image' && (
                    <ImageBlock data={block.innerBlocks[0]} />
                  )}
                  {block.innerBlocks[0].name === 'core/paragraph' && (
                    <TextBlock data={block.innerBlocks[0]} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
