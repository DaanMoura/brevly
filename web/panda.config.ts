import { defineConfig } from '@pandacss/dev'
import { colors, textStyles } from './src/design-system/tokens'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  importMap: '$',

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors
    },
    extend: {
      textStyles
    }
  },

  // Enable jsx framework
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  globalCss: {
    html: {
      '--global-font-body': '"Open Sans", sans-serif'
    },
    body: {
      backgroundColor: 'gray200',
      width: '100dvw',
      height: '100dvh'
    }
  }
})
