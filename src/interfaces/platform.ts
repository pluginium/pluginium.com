import { Plugin } from './plugin'
import { Post } from './post'

export interface Platform {
  title: string
  abbr: string
  slug: string
  content: string
}

export interface PlatformWithRelations extends Platform {
  plugins: Omit<Plugin, 'content'>[]
  posts: Omit<Post, 'content'>[]
}
