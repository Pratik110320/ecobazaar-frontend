export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efad',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        eco: {
          50: '#f4fef7',
          100: '#e5fcec',
          200: '#c9f9d9',
          300: '#9ff3ba',
          400: '#6de593',
          500: '#47d06f',
          600: '#34b058',
          700: '#2d8a48',
          800: '#296d3d',
          900: '#245a34',
          950: '#0f331b',
        },
        earth: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dcc9',
          300: '#d9c5a3',
          400: '#c7a878',
          500: '#b89159',
          600: '#a87d4e',
          700: '#8c6642',
          800: '#72533a',
          900: '#5e4531',
          950: '#332419',
        },
        leaf: {
          50: '#f6fef9',
          100: '#e9fdf0',
          200: '#d1fadf',
          300: '#a6f4c5',
          400: '#6fe9a6',
          500: '#3dd579',
          600: '#2bb764',
          700: '#259052',
          800: '#247143',
          900: '#205d38',
          950: '#0d341e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
        'large': '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
        'eco': '0 4px 20px rgba(34, 197, 94, 0.15)',
        'eco-glow': '0 0 20px rgba(34, 197, 94, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-eco': 'linear-gradient(135deg, #f0fdf5 0%, #dcfce8 100%)',
        'gradient-leaf': 'linear-gradient(135deg, #f6fef9 0%, #e9fdf0 50%, #d1fadf 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(34, 197, 94, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(71, 208, 111, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(52, 176, 88, 0.05) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-eco': 'pulseEco 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseEco: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}