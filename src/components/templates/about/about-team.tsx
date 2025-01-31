'use client'

import { TeamMember } from '@/gql/graphql'
import { useGSAP } from '@gsap/react'
import gql from 'graphql-tag'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { imageLoader } from '../../../lib/utils'
import { Container, Section } from '../../craft'
import { Text } from '../../ui/text'
gsap.registerPlugin(ScrollTrigger)

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

export default function TeamMembers({ members }: { members: TeamMember[] }) {
  // console.log(membersTeam);
  // const { data, loading } = useQuery(TEAM_MEMBERS_QUERY)
  const containerRef = useRef(null)

  // const members: TeamMember[] = data?.teamMembers?.nodes

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      if (containerRef.current === null) return
      mm.add('(min-width: 1024px)', () => {
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
      })
    },
    {
      scope: containerRef,
    }
  )

  return (
    <Section
      ref={containerRef}
      className="relative z-10 bg-secondary-foreground py-12 text-background lg:h-[120vh] lg:py-32"
    >
      <Container>
        <Text type="title1" tag="h2" className="mb-5 text-center lg:mb-14">
          Our Team
        </Text>
        <div className="grid gap-8 lg:grid-cols-3">
          {members.map((member, key) => {
            return (
              <div key={key} className="mx-auto w-full max-w-[295px]">
                <div className="relative mb-4 aspect-[295/351]">
                  {member?.memberData?.image?.node?.mediaItemUrl && (
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
                  )}
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
    </Section>
  )
}
