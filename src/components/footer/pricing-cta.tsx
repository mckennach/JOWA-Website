'use client'

import { useEffect, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import Link from 'next/link'
import { Text } from '../ui/text'
import { X } from 'lucide-react'
import { cn } from '@/src/lib/utils'

export default function PricingCTA() {
  const [closed, setClosed] = useSessionStorage('pricingCTA', false)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setClosed(true)
    setOpen(false)
  }

  useEffect(() => {
    if (!closed) {
      setTimeout(() => setOpen(true), 1000)
    }
  }, [closed])

  if (closed) return null
  return (
    <div
      className={cn(
        'fixed bottom-28 right-0 z-40 hidden items-start gap-4 bg-cream/85 p-4 text-jowa-red transition-all duration-700 ease-in-out lg:flex',
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <Link href="/pricing" className="flex flex-col items-start justify-start">
        <Text type="label" tag="p" className="leading-[21.25px]">
          NEED AN ESTIMATE?
        </Text>
        <Text tag="p" className="font-maisonNeue text-[14px]">
          Try our pricing calculator
        </Text>
      </Link>
      <button onClick={handleClose}>
        <X
          className="mt-1 text-jowa-red"
          width={20}
          height={20}
          strokeWidth={1}
        />
      </button>
    </div>
  )
}
