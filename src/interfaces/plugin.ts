export interface Plugin {
  title: string
  slug: string
  abbr: string
  date: string
  published?: boolean
  platforms?: Record<string, string>
  content: string
}
