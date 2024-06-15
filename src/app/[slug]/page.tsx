import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPages, getPageBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

import type { Metadata } from 'next'

type Params = {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const page = getPageBySlug(params.slug)

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      url: page.slug,
    },
  }
}

export default async function Page({ params }: { params: Params }) {
  const page = getPageBySlug(params.slug)

  const content = await markdownToHtml(page.content)

  return (
    <>
      <PageHeader image={page.image} subtitle={page.description}>
        {page.title}
      </PageHeader>

      {content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  )
}

export async function generateStaticParams() {
  const pages = getAllPages()

  return pages.map((page) => ({
    slug: page.slug,
  }))
}
