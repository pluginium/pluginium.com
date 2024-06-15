import Image from 'next/image'
import Link from 'next/link'

import { TbArrowNarrowRight } from 'react-icons/tb'

import { getAllSolutions } from '@/lib/api'
import { platformIcons } from '@/lib/platformIcons'

interface SolutionGridProps {
  hideTitle?: boolean
  truncate?: boolean
}

const SolutionGrid = ({ hideTitle, truncate }: SolutionGridProps) => {
  const solutions = getAllSolutions()

  const truncated = solutions.slice(0, truncate ? 2 : undefined)

  const ArticleHeading = hideTitle ? 'h2' : 'h3'

  return (
    <section>
      {!hideTitle && <h2 className="mb-6 text-2xl">Our Recent Solutions</h2>}

      <div className="grid gap-y-6 md:grid-cols-2 md:gap-12 xl:grid-cols-3">
        {truncated.map((solution) => (
          <article
            key={solution.slug}
            className="relative flex flex-col justify-center space-y-4 overflow-hidden rounded-lg border-1/2 bg-white p-6 transition-colors hover:border-emerald-600 dark:bg-stone-950 hover:dark:border-emerald-400"
          >
            {solution.cover && (
              <div className="-mx-6 -mt-6 mb-2 aspect-video overflow-hidden">
                <Image
                  src={solution.cover}
                  alt={`${solution.title} screenshot`}
                  className="object-cover object-center"
                  width={1920}
                  height={1080}
                />
              </div>
            )}

            <ArticleHeading className="text-2xl">
              <Link
                href={`/solutions/${solution.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {solution.title}
              </Link>
            </ArticleHeading>

            {solution.platforms && (
              <ul className="text-stone-700 dark:text-stone-300">
                {Object.keys(solution.platforms).map((platform) => {
                  const Icon = platformIcons[platform]

                  return (
                    <li key={platform}>
                      <Icon aria-hidden className="h-5 w-5" />
                    </li>
                  )
                })}
              </ul>
            )}

            <p>{solution.description}</p>
          </article>
        ))}
      </div>

      {truncated.length !== solutions.length && (
        <div className="mt-6 flex justify-end">
          <Link href="/solutions" className="flex items-center">
            View all solutions{' '}
            <TbArrowNarrowRight aria-hidden className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  )
}

export default SolutionGrid
