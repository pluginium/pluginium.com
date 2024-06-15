import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { metadata as layoutMetadata } from '@/app/layout'
import BlogPost from '@/components/BlogPost'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getPlatformBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { platformIcons } from '@/lib/platformIcons'

import type { Metadata } from 'next'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const platform = getPlatformBySlug(params.slug)

  return {
    title: `${platform.title} | Platforms`,
    description: platform.description || layoutMetadata.description,
    openGraph: {
      url: `platforms/${platform.slug}`,
    },
  }
}

export default async function PlatformPage({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.slug)

  if (!platform) notFound()

  const content = await markdownToHtml(platform.content)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/platforms', label: 'Platforms' }]}
        platform={platform.slug}
        subtitle={platform.description}
      >
        {platform.title}
      </PageHeader>

      <div className="space-y-12 divide-y-1/2">
        {platform.content && (
          <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
        )}

        {platform.solutions.length > 0 && (
          <ContentContainer className="pt-12" unstyled>
            <h2 className="text-2xl">Our {platform.title} Offerings</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {platform.solutions.map((solution) => (
                <article
                  key={solution.slug}
                  className="relative flex flex-col justify-center space-y-4 overflow-hidden rounded-lg border-1/2 bg-white p-6 transition-colors hover:border-emerald-600 dark:bg-stone-950 hover:dark:border-emerald-400"
                >
                  {solution.cover && (
                    <div className="-mx-6 -mt-6 mb-2 aspect-video overflow-hidden">
                      <Image
                        src={solution.cover}
                        alt={`${solution.title} screenshot`}
                        className="object-cover object-center"
                        width={1920}
                        height={1080}
                      />
                    </div>
                  )}

                  <h3 className="text-2xl">
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {solution.title}
                    </Link>
                  </h3>

                  {solution.platforms && (
                    <ul className="text-stone-700 dark:text-stone-300">
                      {Object.keys(solution.platforms).map((platform) => {
                        const Icon = platformIcons[platform]

                        return (
                          <li key={platform}>
                            <Icon aria-hidden className="h-5 w-5" />
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  <p>{solution.description}</p>
                </article>
              ))}
            </div>
          </ContentContainer>
        )}

        {platform.posts.length > 0 && (
          <ContentContainer className="pt-12" unstyled>
            <h2 className="text-2xl">Latest {platform.title} Posts</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {platform.posts.slice(0, 2).map((post) => (
                <BlogPost
                  key={post.slug}
                  href={`/blog/${platform.slug}/${post.slug}`}
                  platform={post.platform}
                  date={post.date}
                >
                  {post.title}
                </BlogPost>
              ))}
            </div>
          </ContentContainer>
        )}
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms()

  return platforms.map((platform) => ({
    slug: platform.slug,
  }))
}
