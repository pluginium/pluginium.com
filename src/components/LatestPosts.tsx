import BlogPost from '@/components/BlogPost'
import { getAllPosts } from '@/lib/api'

const LatestPosts = () => {
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
    </section>
  )
}

export default LatestPosts
