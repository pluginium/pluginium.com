import Link from 'next/link'

import { platformIcons } from '@/lib/platformIcons'

interface BlogPostProps {
  children?: React.ReactNode
  href: string
  platform?: string
  date?: string
}

const BlogPost = ({ children, date, href, platform }: BlogPostProps) => {
  const Icon = platform ? platformIcons[platform] : undefined

  return (
    <article className="group relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-md border-1/2 bg-emerald-400 px-4 py-2 text-center text-2xl transition-colors hover:bg-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700">
      {Icon && (
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-5"
        />
      )}

      {date && (
        <p className="z-[2] text-sm font-semibold">
          {new Date(date).toLocaleDateString()}
        </p>
      )}

      <h3 className="z-[2]">
        <Link
          href={href}
          className="after:absolute after:inset-0 after:z-[1] after:content-[''] hover:text-stone-950 dark:hover:text-stone-50"
        >
          {children}
        </Link>
      </h3>

      <div
        aria-hidden
        className="background-pattern absolute inset-0 z-0 text-emerald-500 transition-colors group-hover:text-emerald-400 dark:group-hover:text-emerald-600"
      />
    </article>
  )
}

export default BlogPost
