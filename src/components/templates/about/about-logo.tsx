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
    <Section className="relative flex items-center justify-center border-t border-t-foreground  py-24 lg:py-48">
      <Container className="flex flex-col gap-8 px-4 lg:px-0 w-full ">
        <div className="mx-auto w-full lg:max-w-[800px]">
          <CustomIcons name="about-logo"  className="mx-auto lg:max-w-[800px] w-full" />
        </div>
        <div className="ml-0 lg:absolute lg:bottom-20 lg:left-12 lg:px-0 max-w-[296px]">
          <Text className="text-[16px] leading-[24px] text-accent-foreground">
            {page?.aboutPage?.logoDescription}
          </Text>
        </div>
      </Container>
    </Section>
  )
}
