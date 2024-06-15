import Logo from '@/components/Logo'
import PageHeader from '@/components/PageHeader'
import Wordmark from '@/components/Wordmark'

import image from '@/../public/illustrations/media.svg'

import type { Metadata } from 'next'

const description =
  'Empower your coverage with comprehensive resources and exclusive insights tailored for media professionals'

export const metadata: Metadata = {
  title: 'Media Resources',
  description,
  openGraph: {
    url: 'media',
  },
}

export default function About() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Media Resources
      </PageHeader>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <a
            href="/wordmark.svg"
            download
            className="mx-auto block max-w-lg rounded-md border bg-white p-8 transition-colors hover:border-emerald-600 hover:text-stone-950 dark:bg-stone-950 dark:hover:border-emerald-400 dark:hover:text-stone-50"
          >
            <Wordmark className="max-h-[100px]" />
          </a>
        </div>

        <div>
          <a
            href="/logo.svg"
            download
            className="mx-auto block max-w-lg rounded-md border bg-white p-8 transition-colors hover:border-emerald-600 hover:text-stone-950 dark:bg-stone-950 dark:hover:border-emerald-400 dark:hover:text-stone-50"
          >
            <Logo className="max-h-[100px]" />
          </a>
        </div>
      </div>
    </>
  )
}
