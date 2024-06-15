import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import SolutionGrid from '@/components/SolutionGrid'

import image from '@/../public/illustrations/solutions.svg'

import type { Metadata } from 'next'

const description =
  'We carefully craft plugins and extensions to solve a variety of problems'

export const metadata: Metadata = {
  title: 'Solutions',
  description,
  openGraph: {
    url: 'solutions',
  },
}

export default function Solutions() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Solutions
      </PageHeader>

      <SolutionGrid hideTitle />
    </>
  )
}
