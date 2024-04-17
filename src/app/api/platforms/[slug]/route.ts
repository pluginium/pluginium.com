import { getPlatformBySlug } from '../route'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const data = getPlatformBySlug(params.slug)

  return Response.json({ data })
}
