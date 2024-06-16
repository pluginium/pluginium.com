import { notFound } from 'next/navigation'

import ContentContainer from '@/components/ContentContainer'
import FileInput from '@/components/FileInput'
import PageHeader from '@/components/PageHeader'
import { getAllPositions, getPositionBySlug } from '@/lib/api'
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
  const position = getPositionBySlug(params.slug)

  return {
    title: `${position.title} | Careers`,
    description: `Join our dynamic team and unleash your potential in the rewarding role of ${position.title} that makes a real impact.`,
    openGraph: {
      url: `careers/${position.slug}`,
    },
  }
}

export default async function PositionPage({ params }: { params: Params }) {
  const position = getPositionBySlug(params.slug)

  if (!position) notFound()

  const content = await markdownToHtml(position.content)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/careers', label: 'Careers' }]}
        subtitle={new Date(position.date).toLocaleDateString()}
      >
        {position.title}
      </PageHeader>

      {!position.open && (
        <ContentContainer className="mb-12">
          <p className="rounded-md bg-amber-400 px-3 pb-1 pt-2 text-center dark:bg-amber-600">
            This position is no longer accepting applications
          </p>
        </ContentContainer>
      )}

      {position.content && (
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {position.open && (
        <ContentContainer className="mt-12 border-t-1/2 pt-12">
          <h2>
            Apply for the <em>{position.title}</em> position
          </h2>

          <form
            name="job-application"
            method="POST"
            encType="multipart/form-data"
            data-netlify="true"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="job-application" />
            <input type="hidden" name="position" value={position.slug} />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label>
                  First name *
                  <input type="text" name="firstName" required />
                </label>
              </div>

              <div>
                <label>
                  Last name *
                  <input type="text" name="lastName" required />
                </label>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label>
                Email *
                <input type="email" name="email" required />
              </label>

              <label>
                Phone *
                <input
                  type="text"
                  name="phone"
                  pattern="^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,}$"
                  required
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label>
                Portfolio website
                <input type="url" name="portfolioUrl" />
              </label>

              <label>
                Personal website
                <input type="url" name="personalUrl" />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label>
                LinkedIn
                <input type="url" name="linkedin" />
              </label>

              <FileInput
                name="resume"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                defaultMessage="Add a resume file"
                label="Resume *"
                required
              />
            </div>

            <div>
              <label>
                Tell us about yourself and why you want to work at Pluginium *
                <textarea
                  name="message"
                  minLength={200}
                  maxLength={2000}
                  required
                ></textarea>
              </label>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="rounded-md bg-emerald-600 px-3 pb-1 pt-2 font-semibold text-stone-50 transition-colors hover:bg-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300"
              >
                Submit
              </button>
            </div>
          </form>
        </ContentContainer>
      )}
    </>
  )
}

export async function generateStaticParams() {
  const positions = getAllPositions()

  return positions.map((position) => ({
    slug: position.slug,
  }))
}
