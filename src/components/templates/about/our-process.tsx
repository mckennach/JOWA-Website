'use client'

import { Page } from '@/src/gql/graphql'
import { Text } from '../../ui/text'
import { Section, Container } from '../../craft'
import Image from 'next/image'
import { cn, imageLoader } from '@/src/lib/utils'
type OurProcessProps = {
  page: Page
}

export default function OurProcess({ page }: OurProcessProps) {
  const section = page?.aboutPage?.ourProcess
  return (
    <Section className="bg-secondary py-10 lg:py-28">
      <Container>
        <header className="mb-20 border-b border-b-background pb-6">
          <Text type="title1" tag="h2" className="text-background">
            {section?.title}
          </Text>
        </header>
        <div className="grid gap-x-36 gap-y-4 lg:gap-y-16 lg:grid-cols-2">
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: section?.description ?? '' }}
              className={cn(
                'process-description',
                '[&>h3]: [&>h3]:uppercase [&>h3]:text-walnut',
                '[&>ul]:ml-4 [&>ul]:list-disc [&>ul]:py-2 [&>ul]:pl-4 [&>ul]:text-cream'
              )}
            />
          </div>
          <div>
            <div className="relative mx-auto mt-16 aspect-[662/868] max-w-full lg:max-w-[662px]">
              <Image
                src={section?.image?.node?.sourceUrl ?? ''}
                alt={section?.image?.node?.altText ?? ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                loader={imageLoader}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
