import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { metadata as layoutMetadata } from '@/app/layout'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import markdownToHtml from '@/lib/markdownToHtml'
import {
  getAllPosts,
  getPersonBySlug,
  getPlatformBySlug,
  getPostBySlug,
} from '@/lib/api'

import BlogPost from '@/components/BlogPost'
import type { Metadata } from 'next'

interface Params {
  category: string
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const post = getPostBySlug(`${params.category}-${params.slug}`)

  return {
    title: `${post.title} | Blog`,
    description: post.description || layoutMetadata.description,
    openGraph: {
      url: `blog/${post.platform}/${post.slug}`,
    },
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.category)
  const post = getPostBySlug(`${params.category}-${params.slug}`)

  if (!post || !platform || !post.author) {
    notFound()
  }

  const author = getPersonBySlug(post.author)

  if (!author) notFound()

  const content = await markdownToHtml(post.content)

  const morePlatformPosts = platform
    ? platform?.posts.filter((p) => p.slug !== post.slug)
    : []

  const moreAuthorPosts = author.posts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/blog', label: 'Blog' },
          {
            href: `/blog/${platform.slug}`,
            label: platform.title,
          },
        ]}
        platform={platform.slug}
        subtitle={
          <>
            <Link
              href={`/team/${author.slug}`}
              className="z-[1] mt-1 inline-flex items-center justify-center font-semibold hover:text-stone-950 hover:underline dark:hover:text-stone-50"
            >
              <span className="mr-2 aspect-square max-w-10 overflow-hidden rounded-full">
                <Image
                  src={author.image}
                  alt={author.title}
                  width={40}
                  height={40}
                  className="object-cover object-center"
                />
              </span>
              <span className="mt-1">{author.title}</span>
            </Link>
          </>
        }
      >
        {post.title}
      </PageHeader>

      {post.content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {morePlatformPosts.length > 0 && (
        <ContentContainer className="mt-12 border-t-1/2 pt-12" unstyled>
          <h2 className="text-2xl">More {platform.title} Posts</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {morePlatformPosts.map((post) => (
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

      <div className="mx-auto mt-12 flex w-full max-w-3xl border-t-1/2 pt-12">
        <Link
          href={`/team/${author.slug}`}
          className="mr-6 aspect-square w-36 overflow-hidden rounded-full"
        >
          <Image
            src={author.image}
            alt={author.title}
            width={144}
            height={144}
            className="object-cover object-center"
          />
        </Link>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl">
            <Link href={`/team/${author.slug}`}>{author.title}</Link>
          </h2>
          <p className="text-lg opacity-75">{author.position}</p>
          <p className="mt-2">{author.bio}</p>
        </div>
      </div>

      {moreAuthorPosts.length > 0 && (
        <ContentContainer className="mt-12 border-t-1/2 pt-12" unstyled>
          <h2 className="text-2xl">More Posts by {author.title}</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {moreAuthorPosts.map((post) => (
              <BlogPost
                key={post.slug}
                href={`/blog/${post.platform}/${post.slug}`}
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
  const posts = getAllPosts()

  return posts.map((post) => ({
    category: post.platform,
    slug: post.slug,
  }))
}
