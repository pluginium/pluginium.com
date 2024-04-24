export interface Plugin {
  title: string
  slug: string
  description: string
  date: string
  published?: boolean
  platforms?: Record<string, string>
  content: string
}
