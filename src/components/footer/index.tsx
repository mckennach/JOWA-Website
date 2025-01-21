'use client'

import { Container, Section } from '@/components/craft'
import CustomIcons from '@/src/components/custom-icons'
import { Global } from '@/src/gql/graphql'
import Link from 'next/link'
import { useIntersectionObserver } from 'usehooks-ts'
import { Text } from '../ui/text'

export default function Footer({ globalData }: { globalData: Global }) {
  const { phone, email, instagram, credits } = globalData?.globals ?? {}

  const { ref } = useIntersectionObserver({
    threshold: 0.9,
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        document.documentElement.style.setProperty(
          '--nav-foreground',
          'var(--walnut)'
        )
      } else {
        document.documentElement.style.setProperty(
          '--nav-foreground',
          'var(--main-nav-foreground)'
        )
      }
    },
  })

  return (
    <footer
      className="cream relative z-50 h-screen bg-background text-foreground"
      ref={ref}
    >
      <Section className="h-full">
        <Container className="flex h-full flex-col justify-end">
          <div className="flex flex-col gap-[30px] lg:gap-[100px]">
            <div className="w-full">
              <CustomIcons name="logo" />
            </div>
            <div>
              <div className="grid grid-cols-2 border-b border-t py-1 md:grid-cols-4 lg:py-4">
                <div>
                  <Text className="footer-link" type="footer">
                    Where your vision unfolds.
                  </Text>
                </div>
                <div>
                  <Text className="footer-link" type="footer">
                    Vancouver, BC
                  </Text>
                </div>
                <div className="hidden lg:block">
                  <Link
                    href={phone?.url ?? 'tel:6043776177'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text className="footer-link" type="footer">
                      T: {phone?.title ?? '604-377-6177'}
                    </Text>
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <Link
                    href={
                      instagram?.url ??
                      'https://www.instagram.com/jowa.interiors/'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text className="footer-link" type="footer">
                      IG: {instagram?.title ?? '@jowa.interiors'}
                    </Text>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b py-1 lg:hidden">
                <div>
                  <Link
                    href={phone?.url ?? 'tel:6043776177'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text className="footer-link" type="footer">
                      T: {phone?.title ?? '604-377-6177'}
                    </Text>
                  </Link>
                </div>
                <div>
                  <Link
                    href={
                      instagram?.url ??
                      'https://www.instagram.com/jowa.interiors/'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text className="footer-link" type="footer">
                      IG: {instagram?.title ?? '@jowa.interiors'}
                    </Text>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b py-1 md:grid-cols-4 lg:py-4">
                <div></div>
                <div></div>
                <div>
                  <Link
                    href={email?.url ?? 'mailto:info@jowa.ca'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text className="footer-link" type="footer">
                      E: {email?.title ?? 'info@jowa.ca'}
                    </Text>
                  </Link>
                </div>
                <div>
                  <Text className="footer-link" type="footer">
                    © 2023 Jowa Interiors Ltd.
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-end pb-20 pt-4">
                <Text type="caption" className="text-muted-foreground/25">
                  Site by{' '}
                  <Link
                    href="https://www.instagram.com/supersensitivestudios/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {credits?.title ?? 'Super Sensitive Studios'}
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  )
}
