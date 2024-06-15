import PageHeader from '@/components/PageHeader'

import BlogPost from '@/components/BlogPost'
import { getAllNews } from '@/lib/api'

import image from '@/../public/illustrations/newsroom.svg'

import type { Metadata } from 'next'

const description =
  'Stay informed with the latest updates and insights from Pluginium'

export const metadata: Metadata = {
  title: 'Newsroom',
  description,
  openGraph: {
    url: 'newsroom',
  },
}

export default function Newsroom() {
  const news = getAllNews()

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Newsroom
      </PageHeader>

      {news.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl">Latest News</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {news.map((post) => (
              <BlogPost
                key={post.slug}
                href={`/newsroom/${post.slug}`}
                date={post.date}
              >
                {post.title}
              </BlogPost>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
