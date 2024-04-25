import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/about.svg'

import type { Metadata } from 'next'

const description =
  'Crafting innovative solutions to modern challenges, Pluginium is a dynamic force driving change through technology and creativity.'

export const metadata: Metadata = {
  title: 'About',
  description,
  openGraph: {
    url: 'https://pluginium/about',
  },
}

export default function About() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        About
      </PageHeader>
    </>
  )
}
