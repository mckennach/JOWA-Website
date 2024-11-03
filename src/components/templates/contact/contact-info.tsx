'use client'

import { Page } from '@/src/gql/graphql'
import { Text } from '../../ui/text'
import Image from 'next/image'
import { imageLoader } from '@/src/lib/utils'
import Link from 'next/link'
export default function ContactInfo({ page }: { page: Page }) {
  return (
    <div className="space-y-4">
      <div className="space-y-8">
        <table className="w-full max-w-[529px] text-secondary-foreground">
          <tbody>
            <tr className="border-b">
              <td className="flex  p-0">
                <Text type="label">Contact Us</Text>
              </td>
              <td className=""></td>
            </tr>
            <tr className="border-b">
              <td className="flex  p-0">
                <Text type="label">E-MAIL</Text>
              </td>
              <td className=" p-0">
                <Text type="label">{page?.contactPage?.emailAddress}</Text>
              </td>
            </tr>
            <tr className="border-b">
              <td className="flex  p-0">
                <Text type="label">TEL</Text>
              </td>
              <td className=" p-0">
                <Text type="label">{page?.contactPage?.phoneNumber}</Text>
              </td>
            </tr>
            <tr>
              <td className="flex p-0">
                <Text type="label">INSTAGRAM</Text>
              </td>
              <td className="p-0">
                <Text type="label">{page?.contactPage?.instagram}</Text>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Link
            href="/pricing-calculator"
            className="text-secondary-foreground underline"
          >
            WANT AN ESTIMATE? Try our pricing calculator
          </Link>
        </div>
      </div>

      <div className="relative aspect-[762/1021]">
        <Image
          src={page?.contactPage?.featuredImage?.node?.mediaItemUrl ?? ''}
          alt={page?.contactPage?.featuredImage?.node?.altText ?? ''}
          fill={true}
          style={{
            objectFit: 'cover',
          }}
          loader={imageLoader}
        />
      </div>
    </div>
  )
}
