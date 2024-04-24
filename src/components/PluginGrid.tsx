import Link from 'next/link'

import { getAllPlugins } from '@/lib/api'
import { platformIcons } from '@/lib/platform-icons'

interface PluginGridProps {
  hideTitle?: boolean
}

const PluginGrid = ({ hideTitle }: PluginGridProps) => {
  const plugins = getAllPlugins()

  const ArticleHeading = hideTitle ? 'h2' : 'h3'

  return (
    <section>
      {!hideTitle && <h2 className="mb-6 text-2xl">Our Plugins</h2>}

      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
        {plugins.map((plugin) => (
          <article
            key={plugin.slug}
            className="relative space-y-4 rounded-lg border-1/2 bg-white p-6 transition-colors hover:border-emerald-600 dark:bg-stone-950 hover:dark:border-emerald-400"
          >
            <ArticleHeading className="text-2xl">
              <Link
                href={`/plugins/${plugin.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {plugin.title}
              </Link>
            </ArticleHeading>

            {plugin.platforms && (
              <ul className="text-stone-700 dark:text-stone-300">
                {Object.keys(plugin.platforms).map((platform) => {
                  const Icon = platformIcons[platform]

                  return (
                    <li key={platform}>
                      <Icon aria-hidden className="h-5 w-5" />
                    </li>
                  )
                })}
              </ul>
            )}

            <p>{plugin.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PluginGrid
