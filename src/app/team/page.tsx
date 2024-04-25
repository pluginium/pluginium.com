import Image from 'next/image'
import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import { getAllPeople } from '@/lib/api'

import image from '@/../public/illustrations/team.svg'

import type { Metadata } from 'next'

const description =
  'Meet the brilliant minds driving our company forward through passion, expertise, and creativity'

export const metadata: Metadata = {
  title: 'Team',
  description,
  openGraph: {
    url: 'https://pluginium.com/team',
  },
}

export default function People() {
  const people = getAllPeople()

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Team
      </PageHeader>

      <section className="grid gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:grid-cols-4 xl:grid-cols-5">
        {people.map((person) => (
          <article
            key={person.slug}
            className="relative flex flex-col items-center"
          >
            <div className="mb-4 aspect-square max-w-48 overflow-hidden rounded-full">
              <Image
                src={person.image}
                alt={person.title}
                width={800}
                height={800}
                className="object-cover object-center"
              />
            </div>
            <h2 className="text-xl">
              <Link
                href={`/team/${person.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {person.title}
              </Link>
            </h2>
            <p>{person.position}</p>
          </article>
        ))}
      </section>
    </>
  )
}
