import { Author } from '@/interfaces/author'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const authorsDirectory = join(process.cwd(), '_content/authors')

export function getAuthorSlugs() {
  return fs.readdirSync(authorsDirectory)
}

export function getAuthorBySlug<C extends boolean = false>(
  slug: string,
  hideContent?: C,
): C extends true ? Omit<Author, 'content'> : Author
export function getAuthorBySlug(
  slug: string,
  hideContent?: boolean,
): Omit<Author, 'content'> | Author {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(authorsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (hideContent) {
    return { ...data, slug: realSlug } as Author
  }

  return { ...data, slug: realSlug, content } as Author
}

export function getAllAuthors() {
  const slugs = getAuthorSlugs()
  const authors = slugs
    .map((slug) => getAuthorBySlug(slug, true))
    // sort authors by title in ascending order
    .sort((author1, author2) => (author1.title < author2.title ? -1 : 1))
  return authors
}

export async function GET() {
  const data = getAllAuthors()

  return Response.json({ data })
}
