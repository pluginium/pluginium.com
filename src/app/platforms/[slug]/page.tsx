import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BlogPost from '@/components/BlogPost'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getPlatformBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { platformIcons } from '@/lib/platform-icons'

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

      {platform.content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {platform.plugins.length > 0 && (
        <ContentContainer className="mt-12 border-t-1/2 pt-12" unstyled>
          <h2 className="text-2xl">Our {platform.title} Offerings</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {platform.plugins.map((plugin) => (
              <article
                key={plugin.slug}
                className="relative flex flex-col justify-center space-y-4 overflow-hidden rounded-lg border-1/2 bg-white p-6 transition-colors hover:border-emerald-600 dark:bg-stone-950 hover:dark:border-emerald-400"
              >
                {plugin.cover && (
                  <div className="-mx-6 -mt-6 mb-2 aspect-video overflow-hidden">
                    <Image
                      src={plugin.cover}
                      alt={`${plugin.title} screenshot`}
                      className="object-cover object-center"
                      width={1920}
                      height={1080}
                    />
                  </div>
                )}

                <h3 className="text-2xl">
                  <Link
                    href={`/plugins/${plugin.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {plugin.title}
                  </Link>
                </h3>

                {plugin.platforms && (
                  <ul className="text-stone-700 dark:text-stone-300">
                    {Object.keys(plugin.platforms).map((platform) => {
                      const Icon = platformIcons[platform]

                      return (
                        <li key={platform}>
                          <Icon aria-hidden className="h-5 w-5" />
                        </li>
                      )
                    })}
                  </ul>
                )}

                <p>{plugin.description}</p>
              </article>
            ))}
          </div>
        </ContentContainer>
      )}

      {platform.posts.length > 0 && (
        <ContentContainer className="mt-12 border-t-1/2 pt-12" unstyled>
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
    </>
  )
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms()

  return platforms.map((platform) => ({
    slug: platform.slug,
  }))
}
