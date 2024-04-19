import Link from 'next/link'

import { getAllPlugins } from '@/app/api/plugins/route'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

const description =
  'We carefully craft plugins and extensions to solve a variety of problems'

export const metadata: Metadata = {
  title: 'Plugins',
  description,
}

export default function Plugins() {
  const plugins = getAllPlugins()

  return (
    <>
      <PageHeader subtitle={description}>Plugins</PageHeader>

      <div className="space-y-12">
        {plugins.map((plugin) => (
          <section key={plugin.slug}>
            <h2 className="text-2xl">
              <Link href={`/plugins/${plugin.slug}`}>{plugin.title}</Link>
            </h2>
          </section>
        ))}
      </div>
    </>
  )
}
