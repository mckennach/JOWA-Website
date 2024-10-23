import { print } from 'graphql'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Page } from '@/src/gql/graphql'
import { TemplateProps } from '../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { CONTACT_PAGE_QUERY } from './contact-query'
import ContactForm from './contact-form'
import ContactInfo from './contact-info'

export default async function ContactTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(
    print(CONTACT_PAGE_QUERY),
    {
      id: node?.databaseId,
    }
  )
  return (
    <Section className="bg-background">
      <Container className="flex gap-14 py-32">
        <div className="flex basis-1/2 flex-col gap-28">
          <div className="space-y-8">
            <Text
              type="heading"
              tag="h1"
              className="text-[48px] text-secondary-foreground"
            >
              {page.contactPage?.title}
            </Text>
            <div
              dangerouslySetInnerHTML={{
                __html: page?.contactPage?.description ?? '',
              }}
              className="max-w-[673px] text-body"
            />
          </div>
          <ContactForm />
        </div>
        <div className="basis-1/2">
          <ContactInfo page={page} />
        </div>
      </Container>
    </Section>
  )
}
