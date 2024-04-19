import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAuthorBySlug } from '@/app/api/authors/route'
import { getPlatformBySlug } from '@/app/api/platforms/route'
import { getAllPosts, getPostBySlug } from '@/app/api/posts/route'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

interface Params {
  platform: string
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const post = getPostBySlug(`${params.platform}-${params.slug}`)

  return {
    title: `${post.title} | Blog`,
  }
}

export default function Post({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.platform)
  const post = getPostBySlug(`${params.platform}-${params.slug}`)

  if (!post || !platform || !post.author) notFound()

  const author = getAuthorBySlug(post.author)

  if (!author) notFound()

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/blog', label: 'Blog' },
          { href: `/blog/${platform.slug}`, label: platform.title },
        ]}
        platform={platform.slug}
        subtitle={
          <>
            by{' '}
            <Link
              href={`/blog/authors/${author.slug}`}
              className="font-semibold hover:text-stone-950 hover:underline dark:hover:text-stone-50"
            >
              {author.title}
            </Link>
          </>
        }
      >
        {post.title}
      </PageHeader>
    </>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    platform: post.platform,
    slug: post.slug,
  }))
}
