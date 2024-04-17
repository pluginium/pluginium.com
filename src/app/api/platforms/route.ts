import { PlatformWithRelations } from '@/interfaces/platform'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { getAllPlugins } from '@/app/api/plugins/route'
import { getAllPosts } from '@/app/api/posts/route'

const plugins = getAllPlugins()
const posts = getAllPosts()

const platformsDirectory = join(process.cwd(), '_content/platforms')

export function getPlatformSlugs() {
  return fs.readdirSync(platformsDirectory)
}

export function getPlatformBySlug<C extends boolean = false>(
  slug: string,
  hideContent?: C,
): C extends true
  ? Omit<PlatformWithRelations, 'content' | 'plugins' | 'posts'>
  : PlatformWithRelations
export function getPlatformBySlug(
  slug: string,
  hideContent?: boolean,
):
  | Omit<PlatformWithRelations, 'content' | 'plugins' | 'posts'>
  | PlatformWithRelations {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(platformsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (hideContent) {
    return { ...data, slug: realSlug } as PlatformWithRelations
  }

  const filteredPlugins = plugins.filter((p) =>
    p.platforms ? Object.keys(p.platforms).includes(realSlug) : false,
  )
  const filteredPosts = posts.filter((p) => p.platform === realSlug)

  return {
    ...data,
    slug: realSlug,
    plugins: filteredPlugins,
    posts: filteredPosts,
    content,
  } as PlatformWithRelations
}

export function getAllPlatforms() {
  const slugs = getPlatformSlugs()
  const platforms = slugs
    .map((slug) => getPlatformBySlug(slug, true))
    // sort platforms by title in ascending order
    .sort((platform1, platform2) =>
      platform1.title < platform2.title ? -1 : 1,
    )
  return platforms
}

export async function GET() {
  const data = getAllPlatforms()

  return Response.json({ data })
}
