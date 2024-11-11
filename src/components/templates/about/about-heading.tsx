'use client'
import Link from 'next/link'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Page, Service } from '@/src/gql/graphql'

type AboutHeadingProps = {
  page: Page
  services: Service[]
}

export default function AboutHeading({ page, services }: AboutHeadingProps) {
  const ourServices = services.filter(
    (service) => service.data?.type === 'General'
  )
  const specificServices = services.filter(
    (service) => service.data?.type === 'Specific'
  )

  return (
    <Section className="bg-background pb-24 pt-96">
      <Container className="flex flex-col-reverse gap-28 lg:flex-row">
        <div className="space-y-8 text-genmaicha lg:basis-1/2">
          <div>
            <div className="border-b border-b-secondary-foreground">
              <Text type="label">OUR SERVICES</Text>
            </div>
            <ul className="ml-auto mr-0 max-w-[346px]">
              {ourServices.map((service, index) => (
                <li
                  key={index}
                  className="border-b border-b-secondary-foreground"
                >
                  <Text type="label">{service?.data?.name}</Text>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="border-b border-b-secondary-foreground">
              <Text type="label">Specific Services</Text>
            </div>
            <ul className="ml-auto mr-0 max-w-[346px]">
              {specificServices.map((service, index) => (
                <li
                  key={index}
                  className="border-b border-b-secondary-foreground"
                >
                  <Text type="label">{service?.data?.name}</Text>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex">
            <div className="grow border-b border-b-secondary-foreground">
              <Text type="label">GET IN TOUCH</Text>
            </div>
            <div className="max-w-[346px] grow border-b border-b-secondary-foreground">
              <Link href="mailto:info@jowa.ca">
                <Text type="label">info@jowa.ca</Text>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:basis-1/2 lg:justify-end">
          <div className="max-w-[650px] space-y-4">
            <Text
              type="heading"
              tag="h1"
              className="text-[48px] text-secondary-foreground"
            >
              {page.aboutPage?.title}
            </Text>
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
