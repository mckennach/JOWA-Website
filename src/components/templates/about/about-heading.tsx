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

export default function AboutHeading({ page, globalData, services }: AboutHeadingProps) {
  const ourServices = services.filter(
    (service) => service.data?.type === 'General'
  )
  const specificServices = services.filter(
    (service) => service.data?.type === 'Specific'
  )

  return (
    <Section className="bg-background pb-24 pt-32 lg:pt-80">
			<Container className="flex flex-col-reverse lg:flex-row mb-8 lg:gap-28">
				<div className="lg:basis-1/2"/>
				<div className="flex lg:basis-1/2 lg:justify-end">
					<div className="lg:max-w-[650px] w-full space-y-4 lg:justify-end">
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
      <Container className="flex flex-col-reverse  lg:gap-28 lg:flex-row">
        <div className="space-y-8 text-genmaicha lg:basis-1/2">
          <div>
            <div className="border-b border-b-secondary-foreground">
              <Text type="label">OUR SERVICES</Text>
            </div>
            <ul className="ml-auto mr-0  max-w-[324px] w-full lg:max-w-[346px]">
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
            <ul className="max-w-[324px] w-full ml-auto mr-0 lg:max-w-[346px]">
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

          <div className="flex flex-col lg:flex-row">
            <div className="grow border-b border-b-secondary-foreground">
              <Text type="label">GET IN TOUCH</Text>
            </div>
            <div className="max-w-[324px] w-full ml-auto lg:max-w-[346px] grow border-b border-b-secondary-foreground">
              <Link href={globalData?.globals?.email?.url ?? ''} target="_blank" className="inline-block">
                <Text type="label" className="flex items-center gap-2">{globalData?.globals?.email?.title ?? ''}
									<CustomIcons name="link" />
								</Text>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:basis-1/2 lg:justify-end">
          <div className="max-w-[650px] space-y-4">
          
            <div
              className="body-xl-fluid space-y-4"
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
