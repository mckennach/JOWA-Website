'use client'
import Link from 'next/link'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Page, Service } from '@/src/gql/graphql'
import CustomIcons from '../../custom-icons'

type AboutLogoProps = {
  page: Page
}

export default function AboutLogo({ page }: AboutLogoProps) {
  return (
    <Section className="relative flex items-center justify-center border-t border-t-foreground py-96">
      <Container className="flex flex-col">
        <div className="mx-auto w-full max-w-[800px]">
          <CustomIcons name="logo" color="#fff" width={800} />
        </div>
        <div className="absolute bottom-20 left-12 max-w-[296px]">
          <Text className="text-[16px] leading-[24px] text-accent-foreground">
            {page?.aboutPage?.logoDescription}
          </Text>
        </div>
      </Container>
    </Section>
  )
}
