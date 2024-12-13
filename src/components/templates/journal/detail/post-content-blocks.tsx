import { Container, Section } from '@/src/components/craft'
import { Text } from '@/src/components/ui/text'
import type {
  PostDataPostContentBlockquoteLayout,
  PostDataPostContentFullWidthImageLayout,
  PostDataPostContentImageGalleryLayout,
  PostDataPostContentImageTextSectionLayout,
  PostDataPostContentTextSectionLayout,
} from '@/src/gql/graphql'
import { imageLoader } from '@/src/lib/utils'
import Image from 'next/image'

export function TextSection({
  title,
  description,
}: PostDataPostContentTextSectionLayout) {
  return (
    <Section>
      <Container className="flex flex-col gap-y-24">
        <div className="space-y-6 lg:mx-auto lg:max-w-[80%]">
          <Text
            type="title2"
            tag="h2"
            className="uppercase text-accent-foreground"
          >
            {title}
          </Text>
          <div
            dangerouslySetInnerHTML={{ __html: description ?? '' }}
            className="body-xl-fluid space-y-8"
          />
        </div>
      </Container>
    </Section>
  )
}

export function ImageTextSection({
  title,
  image,
  description,
}: PostDataPostContentImageTextSectionLayout) {
  return (
    <Section className="">
      <Container className="gap-28 space-y-12 lg:flex">
        <div className="lg:basis-1/2">
          <div className="relative mx-auto aspect-[662/868] max-w-[662px]">
            <Image
              src={image?.node.sourceUrl ?? ''}
              alt={image?.node.altText ?? ''}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              sizes="662px"
              className="brightness-75 filter"
              loader={imageLoader}
              priority={true}
            />
          </div>
        </div>
        <div className="lg:basis-1/2">
          <div
            dangerouslySetInnerHTML={{
              __html: description ?? '',
            }}
            className="body-xl-fluid"
          />
        </div>
      </Container>
    </Section>
  )
}

export function Blockquote({ text }: PostDataPostContentBlockquoteLayout) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-[1262px] text-center">
          <blockquote className="text-[20px] leading-[26.56px] text-accent lg:text-[48px] lg:leading-[63px]">
            <q>{text}</q>
          </blockquote>
        </div>
      </Container>
    </Section>
  )
}

export function FullWidthImage({
  image,
}: PostDataPostContentFullWidthImageLayout) {
  return (
    <Section>
      <Container className="">
        <div className="relative aspect-[1527/855]">
          <Image
            src={image?.node.sourceUrl ?? ''}
            alt={image?.node.altText ?? ''}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            sizes="1527px"
            className="brightness-75 filter"
            loader={imageLoader}
            priority={true}
          />
        </div>
      </Container>
    </Section>
  )
}

export function ImageGallery({
  images,
}: PostDataPostContentImageGalleryLayout) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-2">
        <div>
          {images?.nodes[0] && (
            <div className="relative mx-auto mb-24 aspect-[662/868] max-w-[662px] lg:mb-0 lg:ml-0">
              <Image
                src={images?.nodes[0].sourceUrl ?? ''}
                alt={images?.nodes[0].altText ?? ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                }}
                sizes="662px"
                className="brightness-75 filter"
                loader={imageLoader}
                priority={true}
              />
            </div>
          )}
        </div>
        <div>
          {images?.nodes[1] && (
            <div className="relative mb-16 ml-auto mr-auto aspect-[660/454] max-w-[75%] lg:mb-52 lg:mr-0 lg:max-w-[660px]">
              <Image
                src={images?.nodes[1].sourceUrl ?? ''}
                alt={images?.nodes[1].altText ?? ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                }}
                sizes="660px"
                className="brightness-75 filter"
                loader={imageLoader}
                priority={true}
              />
            </div>
          )}
          {images?.nodes[2] && (
            <div className="relative ml-auto mr-auto aspect-[295/351] max-w-[295px] lg:mr-0">
              <Image
                src={images?.nodes[2].sourceUrl ?? ''}
                alt={images?.nodes[2].altText ?? ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                }}
                sizes="295px"
                className="brightness-75 filter"
                loader={imageLoader}
                priority={true}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
