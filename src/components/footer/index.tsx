'use client'

import { useIntersectionObserver } from 'usehooks-ts'
import { Section, Container } from '@/components/craft'
import CustomIcons from '@/src/components/custom-icons'
import { Text } from '../ui/text'
import Link from 'next/link'
export default function Footer() {
  const { isIntersecting, ref } = useIntersectionObserver({
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
          'var(--foreground)'
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
          <div className="flex flex-col gap-[100px]">
            <div className="w-full">
              <CustomIcons name="logo" />
            </div>
            <div>
              <div className="grid grid-cols-2 border-b border-t py-4 text-2xl md:grid-cols-4">
                <div>
                  <Text className="footer-link"  type="footer">
										Where your vision unfolds.
									</Text>
                </div>
                <div>
                  <Text className="footer-link"  type="footer">Vancouver, BC</Text>
                </div>
                <div>
									<Link href="tel:6043776177" target='_blank' rel='noreferrer'>
										<Text className="footer-link"  type="footer">T: 604.377.6177</Text>
									</Link>
	              </div>
                <div>
									<Link href="https://www.instagram.com/embark.homes/?hl=en" target='_blank' rel='noreferrer'>
										<Text className="footer-link"  type="footer">IG: @jowainteriors</Text>
									</Link>
								</div>
              </div>
              <div className="grid grid-cols-2 border-b py-4 text-2xl md:grid-cols-4">
                <div></div>
                <div></div>
                <div>
									<Link href="mailto:info@jowa.ca" target='_blank' rel='noreferrer'>
	                  <Text className="footer-link"  type="footer">E: info@jowa.ca</Text>
									</Link>
                </div>
                <div>
                  <Text className="footer-link"  type="footer">© 2023 Jowa Interiors Ltd.</Text>
                </div>
              </div>
              <div className="flex items-center justify-end pb-20 pt-4">
                <Text type="caption" className="text-muted-foreground/25">
                  Site by <Link href="https://bio.site/supersensitivestudios?fbclid=PAZXh0bgNhZW0CMTEAAaYVHhacjDkQyvQldO_86QXWuiVOPSJFHHXXvomcj-iFU5t721kmiATzBio_aem_-KroG2Pdc1qxCOkcKiGWOw" target='_blank' rel='noreferrer'>Super Sensitive Studios</Link>
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  )
}
