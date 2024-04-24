import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import { getAllPlatforms } from '@/lib/api'

import image from '@/../public/illustrations/platforms.svg'

import type { Metadata } from 'next'

const description =
  'We build plugins and extensions on a many different platforms'

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

      <div className="space-y-12">
        {platforms.map((platform) => (
          <section key={platform.slug}>
            <h2 className="text-2xl">
              <Link href={`/platforms/${platform.slug}`}>{platform.title}</Link>
            </h2>
          </section>
        ))}
      </div>
    </>
  )
}
