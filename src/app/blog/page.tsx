import Link from 'next/link'

import { getAllPlatforms } from '@/app/api/platforms/route'
import { getAllPosts } from '@/app/api/posts/route'
import BlogPost from '@/components/BlogPost'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'
import { platformIcons } from '@/lib/platform-icons'

const description = 'Read the latest from our industry experts'

export const metadata: Metadata = {
  title: 'Blog',
  description,
}

export default function Blog() {
  const platforms = getAllPlatforms()
  const posts = getAllPosts()

  return (
    <>
      <PageHeader subtitle={description}>Blog</PageHeader>

      <div className="space-y-12">
        <section className="-mx-wrap -mt-12 border-b-1/2 bg-white px-wrap py-12 dark:bg-stone-950">
          <h2 className="mb-6 text-2xl">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {posts.slice(0, 12).map((post) => (
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

        <section>
          <h2 className="mb-6 text-2xl">By Platform</h2>

          <ul className="-mx-wrap flex items-stretch justify-between gap-4 overflow-x-auto px-wrap py-2">
            {platforms.map((platform) => {
              const Icon = platformIcons[platform.slug]

              return (
                <li
                  key={platform.slug}
                  className="flex aspect-square w-full flex-shrink items-stretch rounded-md border-1/2 bg-white dark:bg-stone-950"
                >
                  <Link
                    href={`/blog/${platform.slug}`}
                    className="group flex aspect-square w-full flex-col items-center justify-center p-4 text-center font-semibold leading-tight"
                  >
                    <Icon
                      aria-hidden
                      className="mb-2 h-8 w-8 opacity-50 transition-opacity group-hover:opacity-100"
                    />
                    <span>{platform.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </>
  )
}
