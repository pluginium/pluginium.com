import { Plugin } from '@/interfaces/plugin'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const pluginsDirectory = join(process.cwd(), '_content/plugins')

export function getPluginSlugs() {
  return fs.readdirSync(pluginsDirectory)
}

export function getPluginBySlug<C extends boolean = false>(
  slug: string,
  hideContent?: C,
): C extends true ? Omit<Plugin, 'content'> : Plugin
export function getPluginBySlug(
  slug: string,
  hideContent?: boolean,
): Omit<Plugin, 'content'> | Plugin {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(pluginsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (hideContent) {
    return { ...data, slug: realSlug } as Plugin
  }

  return { ...data, slug: realSlug, content } as Plugin
}

export function getAllPlugins() {
  const slugs = getPluginSlugs()
  const plugins = slugs
    .map((slug) => getPluginBySlug(slug, true))
    // sort plugins by title in ascending order
    .sort((plugin1, plugin2) => (plugin1.title < plugin2.title ? -1 : 1))
  return plugins
}

export async function GET() {
  const data = getAllPlugins()

  return Response.json({ data })
}
