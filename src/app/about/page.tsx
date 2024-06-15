import Link from 'next/link'

import { TbMessage, TbUsersGroup } from 'react-icons/tb'

import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getPageBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageBySlug('about')

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      url: 'about',
    },
  }
}

export default async function About() {
  const page = getPageBySlug('about')

  const content = await markdownToHtml(page.content)

  return (
    <>
      <PageHeader image={page.image} subtitle={page.description}>
        {page.title}
      </PageHeader>

      {content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 border-t-1/2 pt-12 text-center text-xl md:grid-cols-2">
        <Link
          href="/team"
          className="group flex flex-col items-center justify-center rounded-md border-1/2 bg-white p-6 no-underline hover:border-emerald-700 dark:bg-stone-950 dark:hover:border-emerald-300"
        >
          <TbUsersGroup
            aria-hidden
            className="mb-2 h-8 w-8 opacity-50 transition-opacity group-hover:opacity-100"
          />
          Meet our team
        </Link>
        <Link
          href="/contact"
          className="group flex flex-col items-center justify-center rounded-md border-1/2 bg-white p-6 no-underline hover:border-emerald-700 dark:bg-stone-950 dark:hover:border-emerald-300"
        >
          <TbMessage
            aria-hidden
            className="mb-2 h-8 w-8 opacity-50 transition-opacity group-hover:opacity-100"
          />
          Contact us
        </Link>
      </div>
    </>
  )
}
