'use client'

import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { TeamMember } from '@/gql/graphql'
import Image from 'next/image'
import { imageLoader } from '../../../lib/utils'

const TEAM_MEMBERS_QUERY = gql`
  query TeamMembers {
    teamMembers {
      nodes {
        memberData {
          name
          jobTitle
          image {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`

export default function TeamMembers() {
  const { data, loading, error } = useQuery(TEAM_MEMBERS_QUERY)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const members: TeamMember[] = data?.teamMembers?.nodes

  return (
    <Section className="bg-secondary-foreground py-32 text-background">
      <Container>
        <Text
          type="heading"
          tag="h2"
          className="mb-14 text-center text-[48px] tracking-wide"
        >
          Our Team
        </Text>
        <div className="grid lg:grid-cols-3 gap-8">
          {members.map((member, key) => {
            return (
              <div key={key} className="mx-auto w-full max-w-[295px]">
                <div className="relative aspect-[295/351] mb-4">
                  <Image
                    src={member?.memberData?.image?.node?.mediaItemUrl ?? ''}
                    alt={member?.memberData?.image?.node?.altText ?? ''}
                    fill={true}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    loader={imageLoader}
                  />
                </div>
                <div>
                  <Text type="label" tag="p">
                    {member?.memberData?.name}
                  </Text>
                  <Text>{member?.memberData?.jobTitle}</Text>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
