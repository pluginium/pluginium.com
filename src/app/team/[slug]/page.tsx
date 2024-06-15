import { notFound } from 'next/navigation'

import BlogPost from '@/components/BlogPost'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPeople, getPersonBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

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
      url: `team/${person.title}`,
    },
  }
}

export default async function PersonPage({ params }: { params: Params }) {
  const person = getPersonBySlug(params.slug)

  if (!person) notFound()

  const content = await markdownToHtml(person.content)

  return (
    <>
      <PageHeader breadcrumbs={[{ href: '/team', label: 'Team' }]}>
        {person.title}
      </PageHeader>

      <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />

      {person.posts.length > 0 && (
        <section className="-mx-wrap mt-12 border-t-1/2 px-wrap pt-12">
          <h2 className="mb-6 text-2xl">Posts by {person.title}</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {person.posts.map((post) => (
              <BlogPost
                key={`${post.platform}-${post.slug}`}
                href={`/blog/${post.platform}/${post.slug}`}
                platform={post.platform}
                date={post.date}
              >
                {post.title}
              </BlogPost>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export async function generateStaticParams() {
  const people = getAllPeople()

  return people.map((person) => ({
    slug: person.slug,
  }))
}
