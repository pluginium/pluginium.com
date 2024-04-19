import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const boldFontData = await fetch(
      new URL('../../../../public/fonts/Overpass-Bold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer())
    const regularFontData = await fetch(
      new URL('../../../../public/fonts/Overpass-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer())
    const semiboldFontData = await fetch(
      new URL(
        '../../../../public/fonts/Overpass-SemiBold.ttf',
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer())

    const { searchParams } = new URL(request.url)

    const title = searchParams.get('title')?.slice(0, 100) || 'Pluginium'
    const subtitle = searchParams.get('subtitle')?.slice(0, 100)
    const breadcrumb = searchParams.get('breadcrumb')?.slice(0, 100)
    const height = Number(searchParams.get('height')) || 630
    const width = Number(searchParams.get('width')) || 1200

    return new ImageResponse(
      (
        <div
          tw="relative flex items-center gap-4 flex-col justify-center h-full w-full text-stone-950 bg-emerald-400"
          style={{
            fontFamily: '"Overpass"',
          }}
        >
          {breadcrumb && (
            <div tw="text-2xl" style={{ fontFamily: '"Overpass-SemiBold"' }}>
              {breadcrumb}
            </div>
          )}

          <div tw="relative text-7xl" style={{ fontFamily: '"Overpass-Bold"' }}>
            {title}
          </div>

          {subtitle && (
            <div
              tw="text-2xl mt-1"
              style={{ fontFamily: '"Overpass-SemiBold"' }}
            >
              {subtitle}
            </div>
          )}
        </div>
      ),
      {
        width,
        height,
        fonts: [
          {
            name: 'Overpass',
            data: regularFontData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Overpass-SemiBold',
            data: semiboldFontData,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Overpass-Bold',
            data: boldFontData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    )
  } catch (e: any) {
    console.error(e.message)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
