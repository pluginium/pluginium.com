import { notFound } from 'next/navigation'

import { getAllAuthors, getAuthorBySlug } from '@/app/api/authors/route'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug)

  return {
    title: `${author.title} | Authors`,
  }
}

export default function Author({ params }: { params: Params }) {
  const author = getAuthorBySlug(params.slug)

  if (!author) notFound()

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/blog', label: 'Blog' },
          { href: '/blog/authors', label: 'Authors' },
        ]}
      >
        {author.title}
      </PageHeader>
    </>
  )
}

export async function generateStaticParams() {
  const authors = getAllAuthors()

  return authors.map((author) => ({
    slug: author.slug,
  }))
}
