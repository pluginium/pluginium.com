import Link from 'next/link'

import { getAllPlatforms } from '@/app/api/platforms/route'
import PageHeader from '@/components/PageHeader'

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
      <PageHeader subtitle={<p className="mt-1 text-lg">{description}</p>}>
        Platforms
      </PageHeader>

      <div className="space-y-12">
        {platforms.map((platform) => (
          <section key={platform.slug}>
            <h2 className="text-2xl font-bold">
              <Link href={`/platforms/${platform.slug}`}>{platform.title}</Link>
            </h2>
          </section>
        ))}
      </div>
    </>
  )
}
