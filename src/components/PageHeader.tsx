import Link from 'next/link'

import { platformIcons } from '@/lib/platform-icons'

interface PageHeaderProps {
  breadcrumbs?: {
    href: string
    label: string
  }[]
  children?: React.ReactNode
  platform?: string
  subtitle?: React.ReactNode
}

const PageHeader = ({
  breadcrumbs,
  children,
  platform,
  subtitle,
}: PageHeaderProps) => {
  const Icon = platform ? platformIcons[platform] : undefined

  return (
    <header className="relative -mx-wrap -mt-12 mb-12 overflow-hidden bg-emerald-400 px-wrap py-24 text-center dark:bg-emerald-600">
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
        <p className="relative z-[2] text-lg font-medium">{subtitle}</p>
      )}

      {Icon && (
        <Icon
          aria-hidden
          className="absolute left-1/2 top-1/2 z-[1] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-5"
        />
      )}

      <div
        aria-hidden
        className="pattern-cross-dots-md absolute inset-0 z-0 text-emerald-500"
      />
    </header>
  )
}

export default PageHeader
