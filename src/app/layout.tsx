import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaXTwitter,
} from 'react-icons/fa6'

import { getAllPlatforms } from '@/app/api/platforms/route'
import { getAllPlugins } from '@/app/api/plugins/route'
import Logo from '@/components/Logo'
import MainMenu from '@/components/MainMenu'
import Wordmark from '@/components/Wordmark'

const overpass = Overpass({ subsets: ['latin'] })

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

  return (
    <html lang="en">
      <body
        className={`${overpass.className} flex min-h-screen w-full flex-col bg-white text-stone-950 dark:bg-stone-950 dark:text-stone-50`}
      >
        <header className="sticky top-0 z-20 flex h-12 items-stretch justify-between border-b-1/2 bg-white px-wrap dark:bg-stone-950">
          <Link
            href="/"
            className="-ml-3 p-3 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            <Logo className="block md:hidden" />
            <Wordmark className="hidden md:block" />
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

            <div>
              <h3 className="mb-1 font-semibold uppercase">
                <Link href="/platforms">Platforms</Link>
              </h3>
              <ul>
                {platforms.map((platform) => (
                  <li key={platform.slug}>
                    <Link
                      href={`/platforms/${platform.slug}`}
                      className="inline-block py-1"
                    >
                      {platform.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <h3 className="mb-1 font-semibold uppercase">
                <Link href="/plugins">Plugins</Link>
              </h3>
              <ul className="grid grid-cols-2 gap-x-4">
                {plugins.map((plugin) => (
                  <li key={plugin.slug}>
                    <Link
                      href={`/plugins/${plugin.slug}`}
                      className="inline-block py-1"
                    >
                      {plugin.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold uppercase">Company</h3>
              <ul>
                <li>
                  <Link href="/about" className="inline-block py-1">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="inline-block py-1">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="inline-block py-1">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="inline-block py-1">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/open-source" className="inline-block py-1">
                    Open Source
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="inline-block py-1">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="inline-block py-1">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold uppercase">Support</h3>
              <ul>
                <li>
                  <Link href="#" className="inline-block py-1">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:support@pluginium.com"
                    className="inline-block py-1"
                  >
                    Email
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
