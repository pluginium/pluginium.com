'use client'

import { useState } from 'react'

import { Dialog, Menu } from '@headlessui/react'
import Link from 'next/link'
import { TbChevronDown, TbMenu, TbX } from 'react-icons/tb'

import { Platform, Solution } from '@/lib/api'
import { platformIcons } from '@/lib/platformIcons'

interface MainMenuProps {
  platforms?: Omit<Platform, 'content'>[]
  solutions?: Omit<Solution, 'content'>[]
}

const MainMenu = ({ platforms, solutions }: MainMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    {
      label: 'Solutions',
      href: '/solutions',
      items: solutions?.map((p) => ({
        href: `/solutions/${p.slug}`,
        label: p.title,
      })),
    },
    {
      label: 'Platforms',
      href: '/platforms',
      items: platforms?.map((p) => {
        const Icon = platformIcons[p.slug]

        return {
          href: `/platforms/${p.slug}`,
          label: (
            <>
              <Icon aria-hidden className="mr-3 h-4 w-4 md:mr-4" />
              {p.title}
            </>
          ),
        }
      }),
    },
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
  ]

  return (
    <>
      {/* Desktop */}
      <div className="-mr-2 hidden items-stretch justify-self-end md:flex">
        {menuItems.map((menuItem) =>
          menuItem.items ? (
            <Menu
              key={menuItem.label}
              as="div"
              className="relative flex items-stretch font-semibold"
            >
              <Menu.Button className="flex items-center pl-3 pr-2 text-xs uppercase transition-colors hover:bg-stone-100 hover:text-emerald-700 dark:hover:bg-stone-900 dark:hover:text-emerald-300">
                <span className="mt-1">{menuItem.label}</span>
                <TbChevronDown
                  aria-hidden
                  className="ml-px h-3 w-3 transition-transform ui-open:-rotate-180"
                />
              </Menu.Button>

              <Menu.Items className="absolute right-0 top-full mt-2 rounded-md border-1/2 bg-white py-1 dark:bg-stone-950">
                {menuItem.items.map((item) => (
                  <Menu.Item key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center whitespace-nowrap px-4 pb-1 pt-2 ui-active:bg-stone-200 ui-active:text-emerald-700 dark:ui-active:bg-stone-800 dark:ui-active:text-emerald-300"
                    >
                      {item.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          ) : (
            <Link
              key={menuItem.href}
              href={menuItem.href}
              className="flex items-center px-3 text-xs font-semibold uppercase hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              <span className="mt-1">{menuItem.label}</span>
            </Link>
          ),
        )}
      </div>

      {/* Mobile */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="-mr-3 block justify-self-end px-3 transition-colors hover:bg-stone-100 hover:text-emerald-700 md:hidden dark:hover:bg-stone-900 dark:hover:text-emerald-300"
      >
        <TbMenu aria-hidden className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </button>

      <Dialog
        as="div"
        className="relative z-40 block md:hidden"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="fixed inset-0 bg-stone-100 bg-opacity-90 dark:bg-stone-900 dark:bg-opacity-95" />

        <Dialog.Panel className="fixed left-wrap right-wrap top-12 my-2 max-h-[calc(100vh_-_7rem)] overflow-y-auto rounded-md border-1/2 bg-white px-8 py-6 text-lg dark:bg-stone-950">
          <button
            className="fixed right-wrap top-14 p-2 transition-colors hover:text-emerald-700 dark:hover:text-emerald-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <TbX aria-hidden className="h-6 w-6" />
          </button>

          <div className="space-y-4">
            {menuItems.map((menuItem) => (
              <ul key={menuItem.href}>
                <li>
                  <Link
                    href={menuItem.href}
                    className="inline-block py-1 font-bold uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {menuItem.label}
                  </Link>

                  {menuItem.items && menuItem.items.length > 0 && (
                    <ul className="text-lg">
                      {menuItem.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="inline-flex items-center py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default MainMenu
