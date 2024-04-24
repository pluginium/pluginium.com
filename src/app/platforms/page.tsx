import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import { getAllPlatforms } from '@/lib/api'
import { platformIcons } from '@/lib/platform-icons'

import image from '@/../public/illustrations/platforms.svg'

import type { Metadata } from 'next'

const description =
  'We build plugins and extensions on many different platforms'

export const metadata: Metadata = {
  title: 'Platforms',
  description,
}

export default function Platforms() {
  const platforms = getAllPlatforms()

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Platforms
      </PageHeader>

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-12 xl:grid-cols-3">
        {platforms.map((platform) => {
          const Icon = platformIcons[platform.slug]

          return (
            <article
              key={platform.slug}
              className="group relative space-y-4 rounded-lg border-1/2 bg-white p-6 transition-colors hover:border-emerald-600 dark:bg-stone-950 hover:dark:border-emerald-400"
            >
              <h2 className="text-2xl">
                <Link
                  href={`/platforms/${platform.slug}`}
                  className="flex items-center after:absolute after:inset-0 after:content-['']"
                >
                  <Icon
                    aria-hidden
                    className="mr-3 h-8 w-8 text-stone-700 transition-colors group-hover:text-emerald-600 dark:text-stone-300 dark:group-hover:text-emerald-400"
                  />
                  <span className="mt-1">{platform.title}</span>
                </Link>
              </h2>

              {platform.description && <p>{platform.description}</p>}
            </article>
          )
        })}
      </div>
    </>
  )
}
