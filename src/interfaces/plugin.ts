export interface Plugin {
  title: string
  abbr: string
  slug: string
  date: string
  published?: boolean
  platforms?: Record<string, string>
  content: string
}
