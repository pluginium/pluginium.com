import Image from 'next/image'
import Link from 'next/link'

import { platformIcons } from '@/lib/platformIcons'

interface PageHeaderProps {
  breadcrumbs?: {
    href: string
    label: string
  }[]
  children?: React.ReactNode
  image?: string
  platform?: string
  subtitle?: React.ReactNode
}

const PageHeader = ({
  breadcrumbs,
  children,
  image,
  platform,
  subtitle,
}: PageHeaderProps) => {
  const Icon = platform ? platformIcons[platform] : undefined

  return (
    <header
      className={`${image ? 'grid items-center gap-x-12 gap-y-24 text-center md:grid-cols-2 md:text-left' : 'flex justify-center text-center'} relative -mx-wrap -mt-12 mb-12 overflow-hidden bg-emerald-400 px-wrap py-24 dark:bg-emerald-600`}
    >
      {image && (
        <div className="relative mx-auto aspect-video max-w-xl">
          <Image
            src={image}
            alt=""
            className="relative z-[1] h-full w-full"
            height={720}
            width={1280}
            priority
          />
        </div>
      )}

      <div className="w-full max-w-3xl">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <ul className="relative z-[2] mb-1 flex items-center justify-center divide-x-1/2 divide-stone-950 text-xs font-medium uppercase dark:divide-white">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.href}>
                <Link
                  href={breadcrumb.href}
                  className="block px-2 hover:text-stone-950 hover:underline dark:hover:text-stone-50"
                >
                  {breadcrumb.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <h1 className="relative z-[2] text-4xl font-bold">{children}</h1>

        {subtitle && (
          <p className="relative z-[2] mx-auto mt-1 text-lg font-medium leading-snug">
            {subtitle}
          </p>
        )}
      </div>

      {Icon && (
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-5"
        />
      )}

      <div
        aria-hidden
        className="background-pattern absolute inset-0 z-0 text-emerald-500"
      />
    </header>
  )
}

export default PageHeader
