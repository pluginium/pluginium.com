import { getAllContent, getContentBySlug } from './content'

export interface BaseContent {
  title: string
  slug: string
  content: string
}

interface BlogBase extends BaseContent {
  description: string
  author: string
  date: string
}

interface News extends BlogBase {}

export const getNewsBySlug = (slug: string) =>
  getContentBySlug<News>('news', slug)

export const getAllNews = () => getAllContent<News>('news')

interface Page extends BaseContent {
  description?: string
  image?: string
}

export const getPageBySlug = (slug: string) =>
  getContentBySlug<Page>('pages', slug)

export const getAllPages = () => getAllContent<Page>('pages')

interface Person extends BaseContent {
  image: string
  position: string
  bio: string
}

interface PersonWithRelations extends Person {
  posts: Omit<Post, 'content'>[]
}

export const getPersonBySlug = (slug: string): PersonWithRelations => {
  const person = getContentBySlug<PersonWithRelations>('people', slug)
  const posts = getAllPosts().filter((p) => p.author === person.slug)

  return {
    ...person,
    posts,
  }
}

export const getAllPeople = () => getAllContent<Person>('people')

export interface Platform extends BaseContent {
  description: string
}

interface PlatformWithRelations extends Platform {
  solutions: Omit<Solution, 'content'>[]
  posts: Omit<Post, 'content'>[]
}

export const getPlatformBySlug = (slug: string): PlatformWithRelations => {
  const platform = getContentBySlug<Platform>('platforms', slug)
  const solutions = getAllSolutions().filter(
    (p) => p.platforms && Object.keys(p.platforms).includes(platform.slug),
  )
  const posts = getAllPosts().filter(
    (p) => p.platform && p.platform === platform.slug,
  )

  return {
    ...platform,
    solutions,
    posts,
  }
}

export const getAllPlatforms = () => getAllContent<Platform>('platforms')

export interface Solution extends BaseContent {
  cover?: string
  description: string
  date: string
  published?: boolean
  platforms?: Record<string, string>
}

export const getSolutionBySlug = (slug: string) =>
  getContentBySlug<Solution>('solutions', slug)

export const getAllSolutions = () => getAllContent<Solution>('solutions')

interface Position extends BaseContent {
  date: string
  open?: boolean
}

export const getPositionBySlug = (slug: string) =>
  getContentBySlug<Position>('positions', slug)

export const getAllPositions = () => getAllContent<Position>('positions')

interface Post extends BlogBase {
  platform: string
}

export const getPostBySlug = (slug: string) => {
  const post = getContentBySlug<Post>('posts', slug)
  post.slug = post.slug.replace(`${post.platform}-`, '')

  return post
}

export const getAllPosts = () =>
  getAllContent<Post>('posts')
    .map(
      (p) =>
        ({
          ...p,
          slug: p.slug.replace(`${p.platform}-`, ''),
        }) as Omit<Post, 'content'>,
    )
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
