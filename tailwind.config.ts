import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01365F',
          50: '#EBF4FB',
          100: '#D1E6F6',
          200: '#A4CEEC',
          300: '#6CB0DF',
          400: '#358DCB',
          500: '#01365F',
          600: '#012E52',
          700: '#012441',
          800: '#011B31',
          900: '#00101F',
          950: '#000912'
        },
        brand: {
          blue: '#01365F',
          lightBlue: '#EAF2F8',
          accent: '#2563EB',
          whatsapp: '#25D366',
          gold: '#C59A45',
          dark: '#0D141C',
          surface: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Lato', 'Cairo', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        accent: ['Sarina', 'cursive']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(1, 54, 95, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(1, 54, 95, 0.16)',
        'floating': '0 20px 40px -10px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
}

