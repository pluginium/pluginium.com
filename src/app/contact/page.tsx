import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/contact.svg'

import type { Metadata } from 'next'

const description =
  "Let's start a conversation! Reach out to us and let's make some magic happen together."

export const metadata: Metadata = {
  title: 'Contact',
  description,
  openGraph: {
    url: 'https://pluginium.com/contact',
  },
}

export default function Contact() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Contact
      </PageHeader>
    </>
  )
}
