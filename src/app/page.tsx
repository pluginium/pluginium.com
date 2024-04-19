import Link from 'next/link'

import { getAllPlatforms } from '@/app/api/platforms/route'
import Marquee from '@/components/Marquee'
import PageHeader from '@/components/PageHeader'
import { platformIcons } from '@/lib/platform-icons'

export default function Home() {
  const platforms = getAllPlatforms()

  return (
    <>
      <PageHeader>
        <span className="my-24 block">
          Extending and plugging into top software platforms
        </span>
      </PageHeader>

      <section className="-mx-wrap -mt-12 border-y-1/2 bg-white px-wrap py-6 dark:bg-stone-950">
        <h2 className="mb-6 text-center text-2xl">Platforms We Build On</h2>

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
    </>
  )
}
