'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
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
  const containerRef = useRef(null)

  const members: TeamMember[] = data?.teamMembers?.nodes

  useGSAP(
    () => {
      if (containerRef.current === null) return
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `bottom+=${window.innerHeight} bottom`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
        },
      })
    },
    {
      scope: containerRef,
    }
  )

  return (
    <Section
      ref={containerRef}
      className="relative z-10 h-[120vh] bg-secondary-foreground py-32 text-background"
    >
      <Container>
        <Text
          type="heading"
          tag="h2"
          className="mb-14 text-center text-[48px] tracking-wide"
        >
          Our Team
        </Text>
        <div className="grid gap-8 lg:grid-cols-3">
          {!loading &&
            members.map((member, key) => {
              return (
                <div key={key} className="mx-auto w-full max-w-[295px]">
                  <div className="relative mb-4 aspect-[295/351]">
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
                    <Text
                      type="label"
                      tag="p"
                      className="text-[24px] leading-[40px]"
                    >
                      {member?.memberData?.name}
                    </Text>
                    <Text>{member?.memberData?.jobTitle}</Text>
                  </div>
                </div>
              )
            })}
        </div>
      </Container>
      <div className="bg-red pointer-events-none absolute top-0 h-screen w-full">
        <div className="absolute bottom-0 left-0 h-28 w-full bg-cream" />
      </div>
    </Section>
  )
}
