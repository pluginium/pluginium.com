import { MetadataRoute } from 'next'

import { getAllAuthors } from './api/authors/route'
import { getAllPlatforms } from '@/app/api/platforms/route'
import { getAllPlugins } from '@/app/api/plugins/route'
import { getAllPosts } from '@/app/api/posts/route'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = 'https://pluginium.com'

  const platformData = getAllPlatforms()

  const authors: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${url}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.4,
  }))

  const platforms: MetadataRoute.Sitemap = platformData.map((platform) => ({
    url: `${url}/platforms/${platform.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const plugins: MetadataRoute.Sitemap = getAllPlugins().map((plugin) => ({
    url: `${url}/plugins/${plugin.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogCategories: MetadataRoute.Sitemap = platformData.map(
    (platform) => ({
      url: `${url}/blog/${platform.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }),
  )

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${url}/blog/${post.platform}/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${url}/plugins`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...plugins,
    {
      url: `${url}/platforms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...platforms,
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogCategories,
    ...posts,
    ...authors,
    {
      url: `${url}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${url}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${url}/open-source`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
}
