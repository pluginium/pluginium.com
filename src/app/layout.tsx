import { Overpass, Overpass_Mono } from 'next/font/google'
import Link from 'next/link'
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaXTwitter,
} from 'react-icons/fa6'

import MainMenu from '@/components/MainMenu'
import Wordmark from '@/components/Wordmark'
import { getAllPlatforms, getAllSolutions } from '@/lib/api'
import type { Metadata } from 'next'

import './globals.scss'
import 'highlight.js/styles/atom-one-dark.min.css'

const overpass = Overpass({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const overpassMono = Overpass_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pluginium.com'),
  title: {
    default: 'Pluginium | Extending and plugging into top software platforms',
    template: '%s | Pluginium',
  },
  description:
    'Pluginium extends and plugs into top software platforms with innovative solutions.',
  applicationName: 'Pluginium Website',
  authors: {
    name: 'Pluginium Team',
    url: 'https://pluginium.com',
  },
  generator: 'Next.js',
  referrer: 'origin',
  creator: 'Pluginium Team',
  publisher: 'Pluginium',
  openGraph: {
    type: 'website',
    url: 'https://pluginium.com',
    siteName: 'Pluginium',
  },
  twitter: {
    site: '@pluginium',
    creator: '@pluginium',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const platforms = getAllPlatforms()
  const solutions = getAllSolutions()

  const banner = ''

  const socials = [
    { label: 'GitHub', icon: FaGithub, href: 'https://github.com/pluginium' },
    { label: 'X', icon: FaXTwitter, href: 'https://twitter.com/pluginium' },
    {
      label: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://linkedin.com/company/pluginium',
    },
    {
      label: 'Threads',
      icon: FaThreads,
      href: 'https://threads.net/@pluginium',
    },
    {
      label: 'Instagram',
      icon: FaInstagram,
      href: 'https://instagram.com/pluginium',
    },
  ]

  const footerLinks: {
    label: string
    href?: string
    double?: boolean
    links: {
      href: string
      label: string
    }[]
  }[] = [
    {
      label: 'Platforms',
      href: '/platforms',
      links: platforms.map((platform) => ({
        href: `/platforms/${platform.slug}`,
        label: platform.title,
      })),
    },
    {
      label: 'Solutions',
      href: '/solutions',
      double: true,
      links: solutions.map((solution) => ({
        href: `/solutions/${solution.slug}`,
        label: solution.title,
      })),
    },
    {
      label: 'Company',
      links: [
        {
          href: '/about',
          label: 'About',
        },
        {
          href: '/team',
          label: 'Team',
        },
        {
          href: '/contact',
          label: 'Contact',
        },
        {
          href: '/careers',
          label: 'Careers',
        },
        {
          href: '/blog',
          label: 'Blog',
        },
        {
          href: '/newsroom',
          label: 'Newsroom',
        },
        {
          href: '/media',
          label: 'Media Resources',
        },
        {
          href: '/open-source',
          label: 'Open Source',
        },
      ],
    },
    {
      label: 'Support',
      links: [
        {
          href: '#',
          label: 'Chat',
        },
        {
          href: 'mailto:support@pluginium.com',
          label: 'Email',
        },
      ],
    },
  ]

  return (
    <html lang="en">
      <body
        className={`${overpass.variable} ${overpassMono.variable} flex min-h-screen w-full flex-col bg-white font-sans text-stone-950 dark:bg-stone-950 dark:text-stone-50`}
      >
        <a
          href="#main"
          className="sr-only left-2 top-2 z-[90] inline-block rounded-md bg-stone-100 focus:not-sr-only dark:bg-stone-900"
          style={{ padding: '1rem', position: 'fixed' }}
        >
          Skip to main content
        </a>

        <header className="sticky top-0 z-20 grid grid-cols-2 border-b-1/2 bg-white px-wrap dark:bg-stone-950">
          {banner && (
            <Link
              href="/solutions/clipboard"
              className="col-span-2 -mx-wrap bg-emerald-600 py-1 text-center text-stone-50 hover:bg-emerald-800 hover:text-stone-50 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300 hover:dark:text-stone-950"
              dangerouslySetInnerHTML={{ __html: banner }}
            />
          )}

          <Link
            href="/"
            className="-ml-3 justify-self-start p-3 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            <Wordmark className="h-6 w-auto" />
            <span className="sr-only">Pluginium</span>
          </Link>

          <MainMenu platforms={platforms} solutions={solutions} />
        </header>

        <main
          id="main"
          className="z-10 flex-1 bg-stone-100 px-wrap py-12 dark:bg-stone-900"
        >
          {children}
        </main>

        <footer className="border-t-1/2 px-wrap py-12">
          <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4 xl:grid-cols-6">
            <div>
              <Link href="/" className="block max-w-32">
                <Wordmark />
              </Link>

              <ul className="my-4 flex flex-wrap gap-4">
                {socials.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noreferrer nofollow"
                    >
                      <social.icon aria-hidden className="h-6 w-6" />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-xs">
                &copy; {new Date().getFullYear()}{' '}
                <Link href="/">Pluginium LLC</Link>
              </p>

              <p className="mt-2 flex items-center space-x-4 text-xs">
                <Link href="/terms">Terms</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/accessibility">Accessibility</Link>
              </p>
            </div>

            {footerLinks.map((section) => (
              <div
                key={section.label}
                className={section.double ? 'col-span-2' : undefined}
              >
                <h3 className="mb-1 font-semibold uppercase">
                  {section.href ? (
                    <Link href={section.href} className="block pb-1">
                      {section.label}
                    </Link>
                  ) : (
                    section.label
                  )}
                </h3>
                <ul
                  className={
                    section.double ? 'grid grid-cols-2 gap-x-4' : undefined
                  }
                >
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block py-1">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </body>
    </html>
  )
}
