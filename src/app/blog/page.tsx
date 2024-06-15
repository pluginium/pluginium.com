import Link from 'next/link'

import BlogPost from '@/components/BlogPost'
import LatestPosts from '@/components/LatestPosts'
import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getAllPosts } from '@/lib/api'
import { platformIcons } from '@/lib/platformIcons'

import image from '@/../public/illustrations/blog.svg'

import type { Metadata } from 'next'

const description = 'Read the latest from our industry experts'

export const metadata: Metadata = {
  title: 'Blog',
  description,
  openGraph: {
    url: 'blog',
  },
}

export default function Blog() {
  const platforms = getAllPlatforms()
  const posts = getAllPosts().slice(6)

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Blog
      </PageHeader>

      <div className="space-y-12">
        <LatestPosts />

        <section className="-mx-wrap -mt-12 border-y-1/2 bg-white px-wrap py-12 dark:bg-stone-950">
          <h2 className="mb-6 text-2xl">By Platform</h2>

          <ul className="-mx-wrap grid grid-flow-col grid-rows-1 justify-between gap-4 overflow-x-auto px-wrap py-2 [scrollbar-width:none]">
            {platforms.map((platform) => {
              const Icon = platformIcons[platform.slug]

              return (
                <li
                  key={platform.slug}
                  className="aspect-square h-full rounded-md border-1/2 bg-stone-100 transition-colors hover:border-emerald-600 dark:bg-stone-900 hover:dark:border-emerald-400"
                >
                  <Link
                    href={`/blog/${platform.slug}`}
                    className="group flex aspect-square w-full flex-col items-center justify-center p-4 text-center font-semibold leading-tight"
                  >
                    <Icon
                      aria-hidden
                      className="mb-2 h-8 w-8 flex-shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
                    />
                    <span>{platform.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {posts.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl">More Posts</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
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
        )}
      </div>
    </>
  )
}
