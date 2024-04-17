import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllPlugins, getPluginBySlug } from '@/app/api/plugins/route'
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
  const plugin = getPluginBySlug(params.slug)

  return {
    title: `${plugin.title} | Plugins`,
  }
}

export default function Plugin({ params }: { params: Params }) {
  const plugin = getPluginBySlug(params.slug)

  if (!plugin) notFound()

  return (
    <>
      <PageHeader breadcrumbs={[{ href: '/plugins', label: 'Plugins' }]}>
        {plugin.title}
      </PageHeader>
    </>
  )
}

export async function generateStaticParams() {
  const plugins = getAllPlugins()

  return plugins.map((plugin) => ({
    slug: plugin.slug,
  }))
}
