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
    url: 'team',
  },
}

export default function People() {
  const people = getAllPeople()

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Team
      </PageHeader>

      <section className="flex flex-wrap justify-center gap-x-16 gap-y-12">
        {people.map((person) => (
          <article
            key={person.slug}
            className="relative flex w-full max-w-48 flex-col items-center"
          >
            <div className="mb-4 aspect-square overflow-hidden rounded-full border-1/2">
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
