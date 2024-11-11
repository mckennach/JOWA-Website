import Link from 'next/link'

export default function SkipToContent() {
  return (
    <Link
      className="text-primary-content absolute left-0 m-3 -translate-y-16 bg-primary p-3 transition focus:translate-y-0"
      href="#main-content"
    >
      Skip to main content
    </Link>
  )
}
