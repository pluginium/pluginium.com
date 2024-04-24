import { notFound } from 'next/navigation'

import BlogPost from '@/components/BlogPost'
import PageHeader from '@/components/PageHeader'
import {
  getAllNews,
  getAllPlatforms,
  getAllPlugins,
  getAllPosts,
  getNewsBySlug,
  getPlatformBySlug,
} from '@/lib/api'

import type { Metadata } from 'next'

interface Params {
  category: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const category =
    params.category === 'news' ? undefined : getPlatformBySlug(params.category)

  return {
    title: `${category?.title || 'News'} | Blog`,
    description: category
      ? `Tips and tricks for the ${category.title} platform`
      : 'Latest news from Pluginium',
  }
}

export default function PlatformCategory({ params }: { params: Params }) {
  const platform =
    params.category === 'news' ? undefined : getPlatformBySlug(params.category)
  const plugins = platform
    ? getAllPlugins().filter((p) =>
        Object.keys(p.platforms || {}).includes(platform.slug),
      )
    : []
  const posts = platform
    ? getAllPosts().filter((p) => p.platform === platform.slug)
    : getAllNews()

  if (params.category !== 'news' && !platform) notFound()

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/blog', label: 'Blog' }]}
        platform={platform?.slug}
        subtitle={
          platform
            ? `Tips and tricks for the ${platform.title} platform`
            : 'Latest news from Pluginium'
        }
      >
        {platform?.title || 'News'}
      </PageHeader>

      <section>
        <h2 className="mb-6 text-2xl">Latest Posts</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogPost
              key={`${post.platform || 'news'}-${post.slug}`}
              href={`/blog/${post.platform || 'news'}/${post.slug}`}
              platform={post.platform}
              date={post.date}
            >
              {post.title}
            </BlogPost>
          ))}
        </div>
      </section>

      {platform && plugins.length > 0 && (
        <section className="mt-12 border-t-1/2 pt-12">
          <h2 className="mb-6 text-2xl">Our {platform.title} Offerings</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {plugins.map((plugin) => (
              <BlogPost key={plugin.slug} href={`/plugins/${plugin.slug}`}>
                {plugin.title}
              </BlogPost>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms()

  return [
    { category: 'news' },
    ...platforms.map((platform) => ({
      category: platform.slug,
    })),
  ]
}
