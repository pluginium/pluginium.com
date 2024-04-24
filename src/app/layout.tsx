import type { Metadata } from 'next'
import { Overpass, Overpass_Mono } from 'next/font/google'
import Link from 'next/link'
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaXTwitter,
} from 'react-icons/fa6'

import Logo from '@/components/Logo'
import MainMenu from '@/components/MainMenu'
import Wordmark from '@/components/Wordmark'
import { getAllPlatforms, getAllPlugins } from '@/lib/api'

import './globals.scss'

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
  title: {
    default: 'Pluginium | Extending and plugging into top software platforms',
    template: '%s | Pluginium',
  },
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const platforms = getAllPlatforms()
  const plugins = getAllPlugins()

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
      label: 'Plugins',
      href: '/plugins',
      double: true,
      links: plugins.map((plugin) => ({
        href: `/plugins/${plugin.slug}`,
        label: plugin.title,
      })),
    },
    {
      label: 'Company',
      links: [
        {
          href: '/blog',
          label: 'Blog',
        },
        {
          href: '/blog/news',
          label: 'News',
        },
        {
          href: '/about',
          label: 'About',
        },
        {
          href: '/team',
          label: 'Team',
        },
        {
          href: '/careers',
          label: 'Careers',
        },
        {
          href: '/open-source',
          label: 'Open Source',
        },
        {
          href: '/terms',
          label: 'Terms and Conditions',
        },
        {
          href: '/privacy',
          label: 'Privacy',
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
        {
          href: '/contact',
          label: 'Contact',
        },
      ],
    },
  ]

  return (
    <html lang="en">
      <body
        className={`${overpass.variable} ${overpassMono.variable} flex min-h-screen w-full flex-col bg-white font-sans text-stone-950 dark:bg-stone-950 dark:text-stone-50`}
      >
        <header className="sticky top-0 z-20 grid grid-cols-2 border-b-1/2 bg-white px-wrap dark:bg-stone-950">
          {banner && (
            <Link
              href="/plugins/clipboard"
              className="col-span-2 -mx-wrap bg-emerald-600 py-1 text-center text-stone-50 hover:bg-emerald-800 hover:text-stone-50 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300 hover:dark:text-stone-950"
              dangerouslySetInnerHTML={{ __html: banner }}
            />
          )}

          <Link
            href="/"
            className="-ml-3 justify-self-start p-3 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            <Logo className="block h-6 md:hidden" />
            <Wordmark className="hidden h-6 md:block" />
          </Link>

          <MainMenu platforms={platforms} plugins={plugins} />
        </header>

        <main className="z-10 flex-1 bg-stone-100 px-wrap py-12 dark:bg-stone-900">
          {children}
        </main>

        <footer className="border-t-1/2 px-wrap py-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm md:grid-cols-4 xl:grid-cols-6">
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
                Copyright &copy; {new Date().getFullYear()}{' '}
                <Link href="/">Pluginium LLC</Link>
              </p>
            </div>

            {footerLinks.map((section) => (
              <div
                key={section.label}
                className={section.double ? 'col-span-2' : undefined}
              >
                <h3 className="mb-1 font-semibold uppercase">
                  {section.href ? (
                    <Link href={section.href}>{section.label}</Link>
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
                      <Link href={link.href} className="inline-block py-1">
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
