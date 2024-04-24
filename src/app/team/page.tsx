import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import { getAllPeople } from '@/lib/api'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'People | Blog',
}

export default function People() {
  const people = getAllPeople()

  return (
    <>
      <PageHeader>Team</PageHeader>

      <section>
        {people.map((person) => (
          <article key={person.slug}>
            <h2>
              <Link href={`/team/${person.slug}`}>{person.title}</Link>
            </h2>
          </article>
        ))}
      </section>
    </>
  )
}
