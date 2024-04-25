import Link from 'next/link'
import { notFound } from 'next/navigation'

import { metadata as layoutMetadata } from '@/app/layout'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getAllPlugins, getPluginBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { platformIcons } from '@/lib/platformIcons'

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
    description: plugin.description || layoutMetadata.description,
    openGraph: {
      url: `https://pluginium.com/plugins/${plugin.slug}`,
    },
  }
}

export default async function PluginPage({ params }: { params: Params }) {
  const platforms = getAllPlatforms()
  const plugin = getPluginBySlug(params.slug)

  if (!plugin) notFound()

  const content = await markdownToHtml(plugin.content)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/plugins', label: 'Plugins' }]}
        subtitle={plugin.description}
      >
        {plugin.title}
      </PageHeader>

      <section className="-mx-wrap -mt-12 mb-12 bg-white px-wrap py-4 dark:bg-stone-950">
        <ContentContainer unstyled>
          <div>
            <h2 className="mb-2 text-center text-sm">Available on:</h2>
            <div className="flex items-center justify-center space-x-4">
              {plugin.platforms &&
                Object.keys(plugin.platforms).map((platform) => {
                  const platformMatch = platforms.find(
                    (p) => p.slug === platform,
                  )
                  const href = plugin.platforms?.[platform]
                  const Icon = platformIcons[platform]

                  if (!href || !platformMatch) return <></>

                  return (
                    <Link
                      key={platform}
                      href={href}
                      rel="external noopener"
                      target="_blank"
                    >
                      <Icon aria-hidden className="h-8 w-8" />
                      <span className="sr-only">{platformMatch.title}</span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </ContentContainer>
      </section>

      {plugin.content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  )
}

export async function generateStaticParams() {
  const plugins = getAllPlugins()

  return plugins.map((plugin) => ({
    slug: plugin.slug,
  }))
}
