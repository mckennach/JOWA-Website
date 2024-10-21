import Image from 'next/image'
import { BlockData } from '..'
import { Section, Container } from '@/components/craft'
import { imageLoader } from '@/src/lib/utils'

type ImageBlockProps = {
  data: BlockData
  className?: string
}

export default function ImageBlock({ data, className }: ImageBlockProps) {
  const { url, alt } = data.attributes
  if (!url) return null
  return (
    <Section>
      <Container>
        <div className="pb-56 pr-14 pt-24">
          <div className="relative h-[650px] w-[476px]">
            <Image
              src={url}
              alt={alt ?? ''}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              loader={imageLoader}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
