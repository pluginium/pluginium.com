import { Post } from '@/interfaces/post'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_content/posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug<C extends boolean = false>(
  slug: string,
  hideContent?: C,
): C extends true ? Omit<Post, 'content'> : Post
export function getPostBySlug(
  slug: string,
  hideContent?: boolean,
): Omit<Post, 'content'> | Post {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const baseSlug = realSlug.replace(`${data.platform}-`, '')

  if (hideContent) {
    return { ...data, slug: baseSlug } as Post
  }

  return { ...data, slug: baseSlug, content } as Post
}

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, true))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.title < post2.title ? -1 : 1))
  return posts
}

export async function GET() {
  const data = getAllPosts()

  return Response.json({ data })
}
