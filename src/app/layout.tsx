import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

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

        <footer className="border-t-1/2 px-wrap pt-6">
          <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-6 text-sm md:grid-cols-4 xl:grid-cols-6">
            <div>
              <Link href="/" className="block max-w-32">
                <Wordmark />
              </Link>

              <p className="mt-4 text-xs">
                &copy; {new Date().getFullYear()}{' '}
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
                  <Link href="/blog" className="inline-block py-1">
                    Blog
                  </Link>
                </li>
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
                  <Link href="/support" className="inline-block py-1">
                    Support
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
