import Link from 'next/link'

import { TbArrowNarrowRight } from 'react-icons/tb'

import BlogPost from '@/components/BlogPost'
import { getAllPosts } from '@/lib/api'

type LatestPostsProps = {
  moreLink?: boolean
}

const LatestPosts = ({ moreLink }: LatestPostsProps) => {
  const posts = getAllPosts()

  const firstPosts = posts.slice(0, 6)

  return (
    <section>
      <h2 className="mb-6 text-2xl">Latest Posts</h2>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {firstPosts.map((post) => (
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

      {moreLink && (
        <div className="mt-6 flex justify-end">
          <Link href="/blog" className="flex items-center">
            View more posts{' '}
            <TbArrowNarrowRight aria-hidden className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  )
}

export default LatestPosts
