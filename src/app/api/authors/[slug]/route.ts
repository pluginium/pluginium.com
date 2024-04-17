import { getAuthorBySlug } from '../route'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const data = getAuthorBySlug(params.slug)

  return Response.json({ data })
}
