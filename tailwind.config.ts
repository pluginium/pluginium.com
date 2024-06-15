import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/app/**/{layout,page}.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'Overpass', ...defaultTheme.fontFamily.sans],
      mono: [
        'var(--font-mono)',
        '"Overpass Mono"',
        ...defaultTheme.fontFamily.mono,
      ],
    },
    extend: {
      borderWidth: {
        '1/2': '.5px',
      },
      spacing: {
        wrap: '5.62vw',
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
}
export default config
