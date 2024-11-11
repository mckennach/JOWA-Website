import Link from 'next/link'
import { Section, Container } from '../craft'
import CustomIcons from '../custom-icons'
import { Text } from '../ui/text'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-10 z-40 hidden lg:right-24 lg:block">
      <Link href="/contact">
        <Text
          type="label"
          className="inline-flex items-center gap-2 text-cream"
        >
          CONTACT US <CustomIcons name="link" />
        </Text>
      </Link>
    </div>
  )
}
