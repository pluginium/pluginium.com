import Link from 'next/link'
import { notFound } from 'next/navigation'

import { metadata as layoutMetadata } from '@/app/layout'
import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getAllSolutions, getSolutionBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { platformIcons } from '@/lib/platformIcons'

import type { Metadata } from 'next'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const solution = getSolutionBySlug(params.slug)

  return {
    title: `${solution.title} | Solutions`,
    description: solution.description || layoutMetadata.description,
    openGraph: {
      url: `solutions/${solution.slug}`,
    },
  }
}

export default async function SolutionPage({ params }: { params: Params }) {
  const platforms = getAllPlatforms()
  const solution = getSolutionBySlug(params.slug)

  if (!solution) notFound()

  const content = await markdownToHtml(solution.content)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/solutions', label: 'Solutions' }]}
        subtitle={solution.description}
      >
        {solution.title}
      </PageHeader>

      <section className="-mx-wrap -mt-12 mb-12 bg-white px-wrap py-4 dark:bg-stone-950">
        <ContentContainer unstyled>
          <div>
            <h2 className="mb-2 text-center text-sm">Available on:</h2>
            <div className="flex items-center justify-center space-x-4">
              {solution.platforms &&
                Object.keys(solution.platforms).map((platform) => {
                  const platformMatch = platforms.find(
                    (p) => p.slug === platform,
                  )
                  const href = solution.platforms?.[platform]
                  const Icon = platformIcons[platform]

                  if (!href || !platformMatch) return <></>

                  return (
                    <Link
                      key={platform}
                      href={href}
                      rel="external noopener"
                      target="_blank"
                    >
                      <Icon aria-hidden className="h-8 w-8" />
                      <span className="sr-only">{platformMatch.title}</span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </ContentContainer>
      </section>

      {solution.content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  )
}

export async function generateStaticParams() {
  const solutions = getAllSolutions()

  return solutions.map((solution) => ({
    slug: solution.slug,
  }))
}
