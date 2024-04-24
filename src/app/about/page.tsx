import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/about.svg'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <>
      <PageHeader image={image}>About</PageHeader>
    </>
  )
}
