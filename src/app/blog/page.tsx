import Link from 'next/link'

import { getPlatformBySlug } from '@/app/api/platforms/route'
import { getAllPosts } from '@/app/api/posts/route'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

const description = 'Read the latest from our industry experts'

export const metadata: Metadata = {
  title: 'Blog',
  description,
}

export default function Blog() {
  const posts = getAllPosts()

  return (
    <>
      <PageHeader subtitle={<p className="mt-1 text-lg">{description}</p>}>
        Blog
      </PageHeader>

      <section>
        {posts.map((post) => (
          <article key={`${post.platform}-${post.slug}`}>
            <p>
              <Link href={`/blog/${post.platform}`}>
                {getPlatformBySlug(post.platform).title}
              </Link>
            </p>
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
