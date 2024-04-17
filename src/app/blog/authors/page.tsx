import Link from 'next/link'

import { getAllAuthors } from '@/app/api/authors/route'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authors | Blog',
}

export default function Authors() {
  const authors = getAllAuthors()

  return (
    <>
      <PageHeader breadcrumbs={[{ href: '/blog', label: 'Blog' }]}>
        Authors
      </PageHeader>

      <section>
        {authors.map((author) => (
          <article key={author.slug}>
            <h2>
              <Link href={`/blog/authors/${author.slug}`}>{author.title}</Link>
            </h2>
          </article>
        ))}
      </section>
    </>
  )
}
