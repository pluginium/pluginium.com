import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllPlatforms, getPlatformBySlug } from '@/app/api/platforms/route'
import BlogPost from '@/components/BlogPost'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

interface Params {
  platform: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const platform = getPlatformBySlug(params.platform)

  return {
    title: `${platform.title} | Blog`,
    description: `Tips and tricks for the ${platform.title} platform`,
  }
}

export default function PlatformCategory({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.platform)

  if (!platform) notFound()

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/blog', label: 'Blog' }]}
        platform={platform.slug}
        subtitle={`Tips and tricks for the ${platform.title} platform`}
      >
        {platform.title}
      </PageHeader>

      <section>
        <h2 className="mb-6 text-2xl">Latest Posts</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {platform.posts.map((post) => (
            <BlogPost
              key={`${post.platform}-${post.slug}`}
              href={`/blog/${post.platform}/${post.slug}`}
              platform={post.platform}
              date={post.date}
            >
              {post.title}
            </BlogPost>
          ))}
        </div>
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms()

  return platforms.map((platform) => ({
    platform: platform.slug,
  }))
}
