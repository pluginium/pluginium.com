import { getPostBySlug } from '../route'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const data = getPostBySlug(params.slug)

  return Response.json({ data })
}
