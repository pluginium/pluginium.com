import Link from 'next/link'

import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader>Not Found</PageHeader>
      <ContentContainer className="text-center">
        <p>We couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href="/">Click here to return home.</Link>
      </ContentContainer>
    </>
  )
}
