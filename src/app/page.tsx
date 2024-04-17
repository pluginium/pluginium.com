import Link from 'next/link'

import { getAllPlatforms } from '@/app/api/platforms/route'
import Marquee from '@/components/Marquee'
import { platformIcons } from '@/lib/platform-icons'

export default function Home() {
  const platforms = getAllPlatforms()

  return (
    <>
      <section className="-mx-wrap -mt-12 bg-emerald-400 px-wrap py-24 dark:bg-emerald-600">
        <h1 className="text-center text-4xl font-bold">
          Extending and plugging into top software platforms
        </h1>
      </section>
      <section className="-mx-wrap border-y-1/2 bg-white px-wrap py-6 dark:bg-stone-950">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Platforms We Build On
        </h2>
        <Marquee className="-mx-wrap py-2">
          {platforms.map((platform) => {
            const Icon = platformIcons[platform.slug]

            return (
              <Link
                key={platform.slug}
                href={`/platforms/${platform.slug}`}
                className="transition-transform hover:scale-110 hover:text-stone-950 dark:hover:text-stone-50"
              >
                <Icon aria-hidden className="h-12 w-12 md:h-14 md:w-14" />
                <span className="sr-only">{platform.title}</span>
              </Link>
            )
          })}
        </Marquee>
      </section>
    </>
  )
}
