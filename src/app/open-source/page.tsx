import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/open-source.svg'

import type { Metadata } from 'next'

const description =
  'Unlock the power of collaboration and innovation with our open-source initiatives, where we share our code and co-create with the global community.'

export const metadata: Metadata = {
  title: 'Open Source',
  description,
  openGraph: {
    url: 'open-source',
  },
}

export default function OpenSource() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Open Source
      </PageHeader>
    </>
  )
}
