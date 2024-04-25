import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { metadata as layoutMetadata } from '@/app/layout'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllNews, getNewsBySlug, getPersonBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

import type { Metadata } from 'next'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const news = getNewsBySlug(params.slug)

  return {
    title: `${news.title} | Newsroom`,
    description: news.description || layoutMetadata.description,
    openGraph: {
      url: `https://pluginium.com/newsroom/${news.slug}`,
    },
  }
}

export default async function PlatformPage({ params }: { params: Params }) {
  const post = getNewsBySlug(params.slug)

  const author = getPersonBySlug(post.author)

  if (!post) notFound()

  const content = await markdownToHtml(post.content)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/newsroom', label: 'Newsroom' }]}
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
                  width={400}
                  height={400}
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
    </>
  )
}

export async function generateStaticParams() {
  const news = getAllNews()

  return news.map((post) => ({
    slug: post.slug,
  }))
}
