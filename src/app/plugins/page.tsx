import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import PluginGrid from '@/components/PluginGrid'

import image from '@/../public/illustrations/plugins.svg'

import type { Metadata } from 'next'

const description =
  'We carefully craft plugins and extensions to solve a variety of problems'

export const metadata: Metadata = {
  title: 'Plugins',
  description,
}

export default function Plugins() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Plugins
      </PageHeader>

      <PluginGrid hideTitle />
    </>
  )
}
