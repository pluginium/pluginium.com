import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllPlatforms, getPlatformBySlug } from '@/app/api/platforms/route'
import PageHeader from '@/components/PageHeader'

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

export default function Platform({ params }: { params: Params }) {
  const platform = getPlatformBySlug(params.slug)

  if (!platform) notFound()

  return (
    <>
      <PageHeader breadcrumbs={[{ href: '/platforms', label: 'Platforms' }]}>
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
