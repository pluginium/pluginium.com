import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import { getAllPositions } from '@/lib/api'

import image from '@/../public/illustrations/careers.svg'

import type { Metadata } from 'next'

const description =
  'Discover exciting opportunities to thrive and grow with Pluginium, where passion meets purpose in every role.'

export const metadata: Metadata = {
  title: 'Careers',
  description,
  openGraph: {
    url: 'careers',
  },
}

export default function Platforms() {
  const positions = getAllPositions()

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Careers
      </PageHeader>

      <div className="space-y-12">
        {positions.map((position) => (
          <section key={position.slug}>
            <h2 className="text-2xl">
              <Link href={`/careers/${position.slug}`}>{position.title}</Link>
            </h2>
          </section>
        ))}
      </div>
    </>
  )
}
