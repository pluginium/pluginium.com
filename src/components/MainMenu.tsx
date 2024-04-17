'use client'

import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { TbChevronDown, TbMenu, TbX } from 'react-icons/tb'

import { Platform } from '@/interfaces/platform'
import { Plugin } from '@/interfaces/plugin'

interface MainMenuProps {
  platforms?: Omit<Platform, 'content'>[]
  plugins?: Omit<Plugin, 'content'>[]
}

const MainMenu = ({ platforms, plugins }: MainMenuProps) => {
  const menuItems = [
    {
      label: 'Plugins',
      href: '/plugins',
      items: plugins?.map((p) => ({
        href: `/plugins/${p.slug}`,
        label: p.title,
      })),
    },
    {
      label: 'Platforms',
      href: '/platforms',
      items: platforms?.map((p) => ({
        href: `/platforms/${p.slug}`,
        label: p.title,
      })),
    },
    {
      label: 'Blog',
      href: '/blog',
    },
  ]

  return (
    <>
      {/* Desktop */}
      <div className="-mr-2 hidden items-stretch md:flex">
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
                      className="block whitespace-nowrap px-4 pb-1 pt-2 ui-active:bg-stone-200 ui-active:text-emerald-700 dark:ui-active:bg-stone-800 dark:ui-active:text-emerald-300"
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
      <Menu as="div" className="relative -mr-3 flex items-stretch md:hidden">
        <Menu.Button className="px-3 transition-colors hover:bg-stone-100 hover:text-emerald-700 dark:hover:bg-stone-900 dark:hover:text-emerald-300">
          <TbMenu aria-hidden className="h-6 w-6 ui-open:hidden" />
          <TbX aria-hidden className="hidden h-6 w-6 ui-open:block" />
          <span className="sr-only">Toggle Menu</span>
        </Menu.Button>

        <Menu.Items className="fixed bottom-12 left-wrap right-wrap top-12 mt-2 space-y-4 overflow-y-auto rounded-md border-1/2 bg-white px-8 py-6 text-lg dark:bg-stone-950">
          {menuItems.map((menuItem) => (
            <ul key={menuItem.href}>
              <li className="">
                <Menu.Item>
                  <Link
                    href={menuItem.href}
                    className="inline-block py-1 font-bold uppercase"
                  >
                    {menuItem.label}
                  </Link>
                </Menu.Item>
                {menuItem.items && menuItem.items.length > 0 && (
                  <ul className="text-base">
                    {menuItem.items.map((item) => (
                      <li key={item.href}>
                        <Menu.Item>
                          <Link href={item.href} className="inline-block py-1">
                            {item.label}
                          </Link>
                        </Menu.Item>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          ))}
        </Menu.Items>
      </Menu>
    </>
  )
}

export default MainMenu
