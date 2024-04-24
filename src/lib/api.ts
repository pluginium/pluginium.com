import { getAllContent, getContentBySlug } from './content'

export interface BaseContent {
  title: string
  slug: string
  content: string
}

export interface Person extends BaseContent {}

export const getPersonBySlug = (slug: string) =>
  getContentBySlug<Person>('people', slug)

export const getAllPeople = () => getAllContent<Person>('people')

export interface Platform extends BaseContent {}

export const getPlatformBySlug = (slug: string) =>
  getContentBySlug<Platform>('platforms', slug)

export const getAllPlatforms = () => getAllContent<Platform>('platforms')

export interface Plugin extends BaseContent {
  description: string
  date: string
  published?: boolean
  platforms?: Record<string, string>
}

export const getPluginBySlug = (slug: string) =>
  getContentBySlug<Plugin>('plugins', slug)

export const getAllPlugins = () => getAllContent<Plugin>('plugins')

export interface Position extends BaseContent {
  date: string
  open?: boolean
}

export const getPositionBySlug = (slug: string) =>
  getContentBySlug<Position>('positions', slug)

export const getAllPositions = () => getAllContent<Position>('positions')

export interface Post extends BaseContent {
  date: string
  platform: string
  author: string
}

export const getPostBySlug = (slug: string) => {
  const post = getContentBySlug<Post>('posts', slug)
  post.slug = post.slug.replace(`${post.platform}-`, '')

  return post
}

export const getAllPosts = () =>
  getAllContent<Post>('posts').map(
    (p) =>
      ({
        ...p,
        slug: p.slug.replace(`${p.platform}-`, ''),
      }) as Omit<Post, 'content'>,
  )
