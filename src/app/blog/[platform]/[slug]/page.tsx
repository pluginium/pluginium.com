import Link from 'next/link'
import { notFound } from 'next/navigation'

import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import markdownToHtml from '@/lib/markdownToHtml'
import {
  getAllPosts,
  getPersonBySlug,
  getPlatformBySlug,
  getPostBySlug,
} from '@/lib/api'

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

export default async function PostPage({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.platform)
  const post = getPostBySlug(`${params.platform}-${params.slug}`)

  if (!post || !platform || !post.author) notFound()

  const author = getPersonBySlug(post.author)

  if (!author) notFound()

  const content = await markdownToHtml(post.content)

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
              href={`/team/${author.slug}`}
              className="font-semibold hover:text-stone-950 hover:underline dark:hover:text-stone-50"
            >
              {author.title}
            </Link>
          </>
        }
      >
        {post.title}
      </PageHeader>

      {post.content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}
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
