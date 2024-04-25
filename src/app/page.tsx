import Link from 'next/link'

import LatestPosts from '@/components/LatestPosts'
import Marquee from '@/components/Marquee'
import PageHeader from '@/components/PageHeader'
import PluginGrid from '@/components/PluginGrid'
import { getAllPlatforms } from '@/lib/api'
import { platformIcons } from '@/lib/platformIcons'

import image from '@/../public/illustrations/home.svg'

export default function Home() {
  const platforms = getAllPlatforms()

  return (
    <>
      <PageHeader image={image}>
        Extending and plugging into top software platforms
      </PageHeader>

      <PluginGrid />

      <section className="-mx-wrap my-12 border-y-1/2 bg-white px-wrap py-6 dark:bg-stone-950">
        <h2 className="mb-6 text-2xl">Platforms We Build On</h2>

        <Marquee className="-mx-wrap py-2">
          {platforms.map((platform) => {
            const Icon = platformIcons[platform.slug]

            return (
              <Link
                key={platform.slug}
                href={`/platforms/${platform.slug}`}
                className="opacity-40 transition-all hover:scale-110 hover:opacity-100"
              >
                <Icon aria-hidden className="h-12 w-12" />

                <span className="sr-only">{platform.title}</span>
              </Link>
            )
          })}
        </Marquee>
      </section>

      <LatestPosts />
    </>
  )
}
