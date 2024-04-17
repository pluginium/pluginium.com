import { getPluginBySlug } from '../route'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const data = getPluginBySlug(params.slug)

  return Response.json({ data })
}
