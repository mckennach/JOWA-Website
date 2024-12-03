'use client'
import Link from 'next/link'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Page, Service, Global } from '@/src/gql/graphql'
import CustomIcons from '../../custom-icons'

type AboutHeadingProps = {
  page: Page
  globalData: Global
  services: Service[]
}

export default function AboutHeading({
  page,
  globalData,
  services,
}: AboutHeadingProps) {
  const data = page.aboutPage
  const ourServices = data?.ourServices
  const specificServices = data?.specificServices

  return (
    <Section className="bg-background pb-24 pt-32 lg:pt-80">
      <Container className="mb-8 flex flex-col-reverse lg:flex-row lg:gap-28">
        <div className="lg:basis-1/2" />
        <div className="flex lg:basis-1/2 lg:justify-end">
          <div className="w-full space-y-4 lg:max-w-[650px] lg:justify-end">
            <Text
              type="heading"
              tag="h1"
              className="text-[48px] text-secondary-foreground"
            >
              {page.aboutPage?.title}
            </Text>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col-reverse lg:flex-row lg:gap-28">
        <div className="space-y-8 text-genmaicha lg:basis-1/2">
          <div>
            <div className="border-b border-b-secondary-foreground">
              <Text type="label">OUR SERVICES</Text>
            </div>
            <ul className="ml-auto mr-0 w-full max-w-[324px] lg:max-w-[346px]">
              {ourServices?.map((service, index) => (
                <li
                  key={index}
                  className="border-b border-b-secondary-foreground"
                >
                  <Text type="label">{service?.title}</Text>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="border-b border-b-secondary-foreground">
              <Text type="label">Specific Services</Text>
            </div>
            <ul className="ml-auto mr-0 w-full max-w-[324px] lg:max-w-[346px]">
              {specificServices?.map((service, index) => (
                <li
                  key={index}
                  className="border-b border-b-secondary-foreground"
                >
                  <Text type="label">{service?.title}</Text>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="grow border-b border-b-secondary-foreground">
              <Text type="label">GET IN TOUCH</Text>
            </div>
            <div className="ml-auto w-full max-w-[324px] grow border-b border-b-secondary-foreground lg:max-w-[346px]">
              <Link
                href={globalData?.globals?.email?.url ?? ''}
                target="_blank"
                className="inline-block"
              >
                <Text type="label" className="flex items-center gap-2">
                  {globalData?.globals?.email?.title ?? ''}
                  <CustomIcons name="link" />
                </Text>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:basis-1/2 lg:justify-end">
          <div className="max-w-[650px] space-y-4">
            <div
              className="body-sm-fluid space-y-4"
              dangerouslySetInnerHTML={{
                __html: page?.aboutPage?.description ?? '',
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
