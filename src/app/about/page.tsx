import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <>
      <PageHeader>About</PageHeader>
    </>
  )
}
