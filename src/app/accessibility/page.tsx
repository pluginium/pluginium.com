import Link from 'next/link'

import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'

import type { Metadata } from 'next'

const description =
  'Dedicated to inclusivity, we strive to ensure equitable access for all by implementing comprehensive accessibility measures across our platforms and services.'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description,
  openGraph: {
    url: 'https://pluginium/accessibility',
  },
}

export default function Accessibility() {
  return (
    <>
      <PageHeader subtitle={description}>Accessibility Statement</PageHeader>

      <ContentContainer>
        <p>Last updated: April 24, 2024</p>
        <h2>Measures to support accessibility</h2>
        <p>
          Pluginium LLC takes the following measures to ensure accessibility of
          Pluginium:
        </p>
        <ul>
          <li>Include accessibility as part of our mission statement.</li>
          <li>Include accessibility throughout our internal policies.</li>
          <li>Integrate accessibility into our procurement practices.</li>
          <li>Provide continual accessibility training for our staff.</li>
          <li>Assign clear accessibility goals and responsibilities.</li>
          <li>Employ formal accessibility quality assurance methods.</li>
        </ul>
        <h2>Conformance status</h2>
        <p>
          The{' '}
          <Link
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            rel="external nofollow noopener"
            target="_blank"
          >
            Web Content Accessibility Guidelines (WCAG)
          </Link>{' '}
          defines requirements for designers and developers to improve
          accessibility for people with disabilities. It defines three levels of
          conformance: Level A, Level AA, and Level AAA. Pluginium is partially
          conformant with WCAG 2.1 level AA. Partially conformant means that
          some parts of the content do not fully conform to the accessibility
          standard.
        </p>
        <h2>Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of Pluginium. Please let
          us know if you encounter accessibility barriers on Pluginium:
        </p>
        <ul>
          <li>
            E-mail:{' '}
            <Link href="mailto:accessibility@pluginium.com">
              accessibility@pluginium.com
            </Link>
          </li>
        </ul>
        <h2>Technical specifications</h2>
        <p>
          Accessibility of Pluginium relies on the following technologies to
          work with the particular combination of web browser and any assistive
          technologies or plugins installed on your computer:
        </p>
        <ul>
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <p>
          These technologies are relied upon for conformance with the
          accessibility standards used.
        </p>
        <h2>Assessment approach</h2>
        <p>
          Pluginium LLC assessed the accessibility of Pluginium by the following
          approaches:
        </p>
        <ul>
          <li>Self-evaluation</li>
        </ul>
      </ContentContainer>
    </>
  )
}
