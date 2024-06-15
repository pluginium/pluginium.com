import { MetadataRoute } from 'next'

import {
  getAllNews,
  getAllPeople,
  getAllPlatforms,
  getAllPositions,
  getAllPosts,
  getAllSolutions,
} from '@/lib/api'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = 'https://pluginium.com'

  const platformData = getAllPlatforms()

  const people: MetadataRoute.Sitemap = getAllPeople().map((person) => ({
    url: `${url}/team/${person.slug}`,
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

  const solutions: MetadataRoute.Sitemap = getAllSolutions().map(
    (solution) => ({
      url: `${url}/solutions/${solution.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  )

  const blogCategories: MetadataRoute.Sitemap = platformData.map(
    (platform) => ({
      url: `${url}/blog/${platform.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }),
  )

  const positions: MetadataRoute.Sitemap = getAllPositions().map(
    (position) => ({
      url: `${url}/careers/${position.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
  )

  const news: MetadataRoute.Sitemap = getAllNews().map((item) => ({
    url: `${url}/newsroom/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

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
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${url}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...solutions,
    {
      url: `${url}/platforms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...platforms,
    {
      url: `${url}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogCategories,
    ...posts,
    {
      url: `${url}/newsroom`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...news,
    {
      url: `${url}/media`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${url}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...people,
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
    ...positions,
    {
      url: `${url}/open-source`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${url}/accessibility`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
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
