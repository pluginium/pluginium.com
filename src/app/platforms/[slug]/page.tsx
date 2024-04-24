import { notFound } from 'next/navigation'

import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getPlatformBySlug } from '@/lib/api'

import type { Metadata } from 'next'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const platform = getPlatformBySlug(params.slug)

  return {
    title: `${platform.title} | Platforms`,
  }
}

export default function PlatformPage({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.slug)

  if (!platform) notFound()

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/platforms', label: 'Platforms' }]}
        platform={platform.slug}
      >
        {platform.title}
      </PageHeader>
    </>
  )
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms()

  return platforms.map((platform) => ({
    slug: platform.slug,
  }))
}
