import Link from 'next/link'

interface PageHeaderProps {
  breadcrumbs?: {
    href: string
    label: string
  }[]
  children?: React.ReactNode
  subtitle?: React.ReactNode
}

const PageHeader = ({ breadcrumbs, children, subtitle }: PageHeaderProps) => {
  return (
    <header className="-mx-wrap -mt-12 mb-12 bg-emerald-400 px-wrap py-24 text-center dark:bg-emerald-600">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <ul className="mb-1 flex items-center justify-center divide-x-1/2 divide-stone-950 text-xs font-medium uppercase dark:divide-white">
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

      <h1 className="text-4xl font-bold">{children}</h1>

      {subtitle && subtitle}
    </header>
  )
}

export default PageHeader
