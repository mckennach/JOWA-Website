import { Global, Page } from '@/src/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { GLOBALS_QUERY } from '@/src/lib/queries'
import { print } from 'graphql'
import { Container, Section } from '../../craft'
import { Text } from '../../ui/text'
import { TemplateProps } from '../page'
import ContactForm from './contact-form'
import ContactInfo from './contact-info'
import { CONTACT_PAGE_QUERY } from './contact-query'

export default async function ContactTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(
    print(CONTACT_PAGE_QUERY),
    {
      id: node?.databaseId,
    }
  )

  const { global } = await fetchGraphQL<{
    global: Global
  }>(print(GLOBALS_QUERY), {
    id: '357',
  })

  return (
    <Section className="bg-background">
      <Container className="space-y-8 py-28">
        <header>
          <Text type="title1" tag="h1" className="text-secondary-foreground">
            {page.contactPage?.title}
          </Text>
        </header>
        <div className="flex flex-col gap-14 lg:flex-row">
          <div className="flex flex-col gap-14 lg:basis-1/2">
            <div className="space-y-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: page?.contactPage?.description ?? '',
                }}
                className="max-w-[673px] text-body"
              />
            </div>
            <ContactForm />
          </div>
          <div className="pt- lg:basis-1/2">
            <ContactInfo page={page} globalData={global} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
