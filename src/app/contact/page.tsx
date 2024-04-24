import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/contact.svg'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function Contact() {
  return (
    <>
      <PageHeader image={image}>Contact</PageHeader>
    </>
  )
}
