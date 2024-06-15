import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

import type { BaseContent } from './api'
import { notFound } from 'next/navigation'

export function getContentBySlug<
  T extends BaseContent,
  C extends boolean | undefined = undefined,
>(
  dir: string,
  slug: string,
  hideContent?: C,
): C extends true ? Omit<T, 'content'> : T
export function getContentBySlug<T extends BaseContent>(
  dir: string,
  slug: string,
  hideContent?: boolean,
): Omit<T, 'content'> | T {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(`_content/${dir}`, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) notFound()

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (hideContent) {
    return { ...data, slug: realSlug } as T
  }

  return { ...data, slug: realSlug, content } as T
}

export function getAllContent<T extends BaseContent>(
  dir: string,
): Omit<T, 'content'>[] {
  const slugs = fs.readdirSync(`_content/${dir}`)
  const content = slugs
    .map((slug) => getContentBySlug<T, boolean>(dir, slug, true))
    // sort content by title in ascending order
    .sort((content1, content2) => (content1.title < content2.title ? -1 : 1))
  return content
}
