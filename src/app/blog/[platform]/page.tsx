import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllPlatforms, getPlatformBySlug } from '@/app/api/platforms/route'
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
        subtitle={
          <p className="mt-1 text-lg">{`Tips and tricks for the ${platform.title} platform`}</p>
        }
      >
        {platform.title}
      </PageHeader>

      <section>
        {platform.posts.map((post) => (
          <article key={post.slug}>
            <h2>
              <Link href={`/blog/${post.platform}/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
          </article>
        ))}
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
