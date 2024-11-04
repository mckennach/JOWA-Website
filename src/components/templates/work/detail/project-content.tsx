'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Project } from '@/src/gql/graphql'
import { Section, Container } from '@/src/components/craft'
import { Fragment } from 'react'

export default function ProjectContent({ project }: { project: Project }) {
	const content = project?.projectFields;
	console.log(content);
  return (
    <Fragment>
			{content?.introFullWidthImage?.node &&
        content?.introFullWidthImage.node.mediaItemUrl && (
          <Section>
            <Container className="">
              <div className="relative aspect-[1527/855]">
                <Image
                  src={content?.introFullWidthImage.node.mediaItemUrl ?? ''}
                  alt={content?.introFullWidthImage.node.altText ?? ''}
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
				{(content?.imageGallery?.image1 || content?.imageGallery?.image2) && (
					<Section className="py-16">
						<Container className="grid lg:grid-cols-2 gap-8">
							<div>
								<div className="relative aspect-[662/868] max-w-[662px]">
										<Image
											src={content?.imageGallery?.image1?.node.mediaItemUrl ?? ''}
											alt={content?.imageGallery?.image1?.node.altText ?? ''}
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
							<div>
								<div className="relative aspect-[660/454] max-w-[660px] mr-0 ml-auto">
									<Image
										src={content?.imageGallery?.image2?.node.mediaItemUrl ?? ''}
										alt={content?.imageGallery?.image2?.node.altText ?? ''}
										fill={true}
										style={{
											objectFit: 'cover',
										}}
										className="brightness-75 filter"
										loader={imageLoader}
										priority={true}
									/>
								</div>
								<div className="max-w-[475px] mr-0 lg:ml-auto text-accent-foreground gap-9 flex flex-col justify-end h-[45%]">
									{content?.imageGallery?.image1Caption && (
										<div>
											<p>fig. 01</p>
											<p>{content?.imageGallery?.image1Caption}</p>
										</div>
									)}
									{content?.imageGallery?.image2Caption && (
										<div>
											<p>fig. 02</p>
											<p>{content?.imageGallery?.image2Caption}</p>
										</div>
									)}
									
								</div>
							</div>
						</Container>
					</Section>
				)}
				{content?.fullWidthImage2?.node &&
        	content?.fullWidthImage2.node.mediaItemUrl && (
          <Section>
            <Container className="">
              <div className="relative aspect-[1527/855]">
                <Image
                  src={content?.fullWidthImage2.node.mediaItemUrl ?? ''}
                  alt={content?.fullWidthImage2.node.altText ?? ''}
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

				{content?.project?.content && content?.project?.image?.node && (
          <Section className="pt-44 pb-16">
            <Container className="grid lg:grid-cols-2 gap-8">
							<div>
	              <div className="body-xl-fluid" dangerouslySetInnerHTML={{ __html: content.project.content }} />
							</div>
							<div className="pt-32">
								<div className="relative aspect-[295/351] max-w-[295px] mr-0 ml-auto">
									<Image
										src={content?.project?.image?.node.mediaItemUrl ?? ''}
										alt={content?.project?.image?.node.altText ?? ''}
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
            </Container>
          </Section>
        )}

		</Fragment>
  )
}
