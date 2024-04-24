import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).use(gfm).process(markdown)
  return result.toString()
}
