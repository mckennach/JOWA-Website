'use client'

import Image from 'next/image'
import { Container, Section } from '@/src/components/craft'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Post, PostData, Tag } from '@/src/gql/graphql'
import { Text } from '@/src/components/ui/text'
import CustomIcons from '@/src/components/custom-icons'
import Link from 'next/link'
import ShareButton from '@/src/components/ui/share'
export default function JournalContent({ post }: { post: Post }) {
  const { postData } = post
  console.log(postData)
  const { content } = postData as PostData

  return (
    <div className="space-y-32 pb-20 lg:pb-36">
      <Section>
        <Container className="flex flex-col gap-y-24">
          <div className="space-y-6 pt-40 lg:mx-auto lg:max-w-[80%]">
            {content?.section1Title &&
              typeof content?.section1Title === 'string' && (
                <Text
                  type="title2"
                  tag="h2"
                  className="uppercase text-accent-foreground"
                >
                  1. {content?.section1Title}
                </Text>
              )}

            {content?.section1Copy && (
              <div
                dangerouslySetInnerHTML={{ __html: content.section1Copy }}
                className="body-xl-fluid"
              />
            )}
          </div>
          {content?.section1Cta &&
            content?.section1Cta?.image &&
            content?.section1Cta?.copy && (
              <div className="gap-28 space-y-12 lg:flex">
                <div className="lg:basis-1/2">
                  <div className="relative mx-auto aspect-[662/868] max-w-[662px]">
                    <Image
                      src={content?.section1Cta?.image?.node.mediaItemUrl ?? ''}
                      alt={content?.section1Cta?.image?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="lg:basis-1/2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content?.section1Cta?.copy ?? '',
                    }}
                    className="body-xl-fluid"
                  />
                </div>
              </div>
            )}
        </Container>
      </Section>
      {content?.blockQuote && typeof content?.blockQuote === 'string' && (
        <Section>
          <Container>
            <div className="mx-auto max-w-[1262px] text-center">
              <blockquote className="text-[20px] leading-[26.56px] text-accent lg:text-[48px] lg:leading-[63px]">
                <q>{content.blockQuote}</q>
              </blockquote>
            </div>
          </Container>
        </Section>
      )}
      {content?.fullWidthImage?.node &&
        content?.fullWidthImage.node.mediaItemUrl && (
          <Section>
            <Container className="">
              <div className="relative aspect-[1527/855]">
                <Image
                  src={content?.fullWidthImage.node.mediaItemUrl ?? ''}
                  alt={content?.fullWidthImage.node.altText ?? ''}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                  }}
                  className="brightness-75 filter"
                  loader={imageLoader}
                  priority={true}
                />
              </div>
            </Container>
          </Section>
        )}

      {content?.section2Title ||
        content?.section2Copy ||
        (content?.section2Cta?.copy && (
          <Section>
            <Container className="flex flex-col gap-y-24">
              <div className="space-y-6 lg:mx-auto lg:max-w-[80%]">
                {content?.section2Title &&
                  typeof content?.section2Title === 'string' && (
                    <Text
                      type="title2"
                      tag="h2"
                      className="uppercase text-accent-foreground"
                    >
                      2. {content?.section2Title}
                    </Text>
                  )}

                {content?.section2Copy && (
                  <div
                    dangerouslySetInnerHTML={{ __html: content.section2Copy }}
                    className="body-xl-fluid"
                  />
                )}
              </div>
              {content?.section2Cta &&
                content?.section2Cta?.image &&
                content?.section2Cta?.copy && (
                  <div className="flex gap-28">
                    <div className="basis-1/2">
                      <div className="relative mx-auto aspect-[662/868] max-w-[662px]">
                        <Image
                          src={
                            content?.section2Cta?.image?.node.mediaItemUrl ?? ''
                          }
                          alt={content?.section2Cta?.image?.node.altText ?? ''}
                          fill={true}
                          style={{
                            objectFit: 'cover',
                          }}
                          className="brightness-75 filter"
                          loader={imageLoader}
                          priority={true}
                        />
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content?.section2Cta?.copy ?? '',
                        }}
                        className="body-xl-fluid"
                      />
                    </div>
                  </div>
                )}
            </Container>
          </Section>
        ))}

      {content?.section3Title ||
        content?.section3Copy ||
        (content?.section3Cta?.copy && (
          <Section>
            <Container className="flex flex-col gap-y-24">
              <div className="space-y-6 lg:mx-auto lg:max-w-[80%]">
                {content?.section3Title &&
                  typeof content?.section3Title === 'string' && (
                    <Text
                      type="title2"
                      tag="h2"
                      className="uppercase text-accent-foreground"
                    >
                      2. {content?.section3Title}
                    </Text>
                  )}

                {content?.section3Copy && (
                  <div
                    dangerouslySetInnerHTML={{ __html: content.section3Copy }}
                    className="body-xl-fluid"
                  />
                )}
              </div>
              {content?.section3Cta &&
                content?.section3Cta?.image &&
                content?.section3Cta?.copy && (
                  <div className="flex gap-28">
                    <div className="basis-1/2">
                      <div className="relative mx-auto aspect-[662/868] max-w-[662px]">
                        <Image
                          src={
                            content?.section3Cta?.image?.node.mediaItemUrl ?? ''
                          }
                          alt={content?.section3Cta?.image?.node.altText ?? ''}
                          fill={true}
                          style={{
                            objectFit: 'cover',
                          }}
                          className="brightness-75 filter"
                          loader={imageLoader}
                          priority={true}
                        />
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content?.section3Cta?.copy ?? '',
                        }}
                        className="body-xl-fluid"
                      />
                    </div>
                  </div>
                )}
            </Container>
          </Section>
        ))}

      <Section>
        <Container>
          {(postData?.imageGallery?.image1?.node ||
            postData?.imageGallery?.image2?.node ||
            postData?.imageGallery?.image3?.node) && (
            <div className="grid lg:grid-cols-2">
              <div>
                {postData?.imageGallery?.image1?.node && (
                  <div className="relative mx-auto mb-24 aspect-[662/868] max-w-[662px] lg:mb-0 lg:ml-0">
                    <Image
                      src={
                        postData?.imageGallery?.image1?.node.mediaItemUrl ?? ''
                      }
                      alt={postData?.imageGallery?.image1?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                )}
              </div>
              <div>
                {postData?.imageGallery?.image2?.node && (
                  <div className="relative mb-16 ml-auto mr-auto aspect-[660/454] max-w-[75%] lg:mb-52 lg:mr-0 lg:max-w-[660px]">
                    <Image
                      src={
                        postData?.imageGallery?.image2?.node.mediaItemUrl ?? ''
                      }
                      alt={postData?.imageGallery?.image2?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                )}
                {postData?.imageGallery?.image3?.node && (
                  <div className="relative ml-auto mr-auto aspect-[295/351] max-w-[295px] lg:mr-0">
                    <Image
                      src={
                        postData?.imageGallery?.image3?.node.mediaItemUrl ?? ''
                      }
                      alt={postData?.imageGallery?.image3?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="mt-20 space-y-3 text-center lg:mt-0 lg:text-left">
            <Text tag="p" className="text-accent">
              {postData?.credits}
            </Text>
            <ShareButton />
          </div>
        </Container>
      </Section>
    </div>
  )
}
