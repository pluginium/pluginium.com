import { notFound } from 'next/navigation'

import PageHeader from '@/components/PageHeader'
import { getAllPeople, getPersonBySlug } from '@/lib/api'

import type { Metadata } from 'next'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const person = getPersonBySlug(params.slug)

  return {
    title: `${person.title} | Team`,
    description: `Learn more about ${person.title}`,
    openGraph: {
      url: `https://pluginium.com/team/${person.title}`,
    },
  }
}

export default function PersonPage({ params }: { params: Params }) {
  const person = getPersonBySlug(params.slug)

  if (!person) notFound()

  return (
    <>
      <PageHeader breadcrumbs={[{ href: '/team', label: 'Team' }]}>
        {person.title}
      </PageHeader>
    </>
  )
}

export async function generateStaticParams() {
  const people = getAllPeople()

  return people.map((person) => ({
    slug: person.slug,
  }))
}
