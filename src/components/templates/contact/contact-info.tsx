'use client'

import { Page, Global } from '@/src/gql/graphql'
import { Text } from '../../ui/text'
import Image from 'next/image'
import { imageLoader } from '@/src/lib/utils'
import Link from 'next/link'
export default function ContactInfo({ page, globalData }: { page: Page, globalData: Global }) {
  
	const { phone, email, instagram, credits } = globalData?.globals ?? {};
	
	return (
    <div className="space-y-4">
      <div className="space-y-8">
        <table className="w-full max-w-[529px] text-secondary-foreground">
          <tbody>
            <tr className="border-b">
              <td className="flex p-0">
                <Text type="label">Contact Us</Text>
              </td>
              <td className=""></td>
            </tr>
            <tr className="border-b">
              <td className="flex p-0">
                <Text type="label">E-MAIL</Text>
              </td>
              <td className="p-0">
								<Link
									href={email?.url ?? "mailto:info@jowa.ca"}
									target="_blank"
									rel="noreferrer"
								>
									<Text type="label">{email?.title ?? 'info@jowa.ca'}</Text>
								</Link>
              </td>
            </tr>
            <tr className="border-b">
              <td className="flex p-0">
                <Text type="label">TEL</Text>
              </td>
              <td className="p-0">
								<Link
									href={phone?.url ?? 'tel:6043776177'}
									target="_blank"
									rel="noreferrer"
								>
									<Text type="label">{phone?.title ?? '604-377-6177'}</Text>
								</Link>
              </td>
            </tr>
            <tr>
              <td className="flex p-0">
                <Text type="label">INSTAGRAM</Text>
              </td>
              <td className="p-0">
								<Link
									href={instagram?.url ?? 'https://www.instagram.com/jowa.interiors/'}
									target="_blank"
									rel="noreferrer"
								>
									<Text type="label">{instagram?.title ?? '@jowa.interiors'}</Text>
								</Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Link
            href="/pricing"
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
