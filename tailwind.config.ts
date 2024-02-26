import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#0a1128',
        secondary:'#001f54',
        title: '#192229',
        text: '#192229',
        textsm: '#192229',
        border: 'rgb(234, 233, 233)',
        container: 'rgb(234, 233, 233)',
        body: '#192229',
        white: '#fff',
        darkGreen: '#006400',
        forestGreen: '#228B22',
        emerald: '#008000',
        lime: '#00FF00',
        mint: '#00FF7F',
        olive: '#808000',
        lightGreen: '#00FA9A',
        aqua: '#7FFFD4',
        
      }
    },
   
  },
  plugins: [],
}
export default config
