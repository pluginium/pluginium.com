import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/open-source.svg'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Source',
}

export default function OpenSource() {
  return (
    <>
      <PageHeader image={image}>Open Source</PageHeader>
    </>
  )
}
