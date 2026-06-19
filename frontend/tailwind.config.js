/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page:      '#FAFAF9',
        surface:   '#FFFFFF',
        canvas:    '#F4F4F5',
        primary:   '#18181B',
        secondary: '#52525B',
        muted:     '#A1A1AA',
        default:   '#E4E4E7',
        subtle:    '#F0F0EF',
        strong:    '#D4D4D8',
        accent: {
          DEFAULT: '#0EA882',
          hover: '#0C9070'
        },
        gain: {
          DEFAULT: '#059669',
          bg: '#F0FBF7',
          border: '#B9EFE1'
        },
        loss: {
          DEFAULT: '#EF4444',
          bg: '#FEF2F2',
          border: '#FECACA'
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: '#FFFBEB',
          border: '#FDE68A'
        },
        info: {
          DEFAULT: '#2563EB',
          bg: '#EFF6FF',
          border: '#BFDBFE'
        }
      },
      fontFamily: {
        ui: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px'
      },
      spacing: {
        'page-x': '24px',
        'page-y': '28px',
        'section-gap': '36px',
        'card-padding': '16px',
        'gutter-default': '10px',
        'gutter-tight': '6px',
        'metric-cell-px': '11px',
        'metric-cell-py': '9px'
      }
    },
  },
  plugins: [],
}
