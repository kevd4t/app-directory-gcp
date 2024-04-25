import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  important: true,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/d4t-ui-demo/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        '3xl': '1716px'
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },

      gridTemplateColumns: {
        sidebar: '250px minmax(0,1fr)',
        'sidebar-collapsed': '106px auto'
      },

      screens: {
        lg: '1040px',
        timeline: '1580px',
        '3xl': '1716px'
      },

      backgroundColor: {
        main: 'hsl(var(--background))',
        'main-hover': 'hsl(var(--background-hover) / 68%)'
      },

      borderColor: {
        dark: 'hsl(var(--border))'
      },

      colors: {
        'primary-gray': '#64748B',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        'body-background': 'hsl(var(--body-background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          background: 'hsl(var(--sidebar-background))',
          text: 'hsl(var(--sidebar-text))',
          'text-accent': 'hsl(var(--sidebar-text-accent))'
        },
        state: {
          open: {
            DEFAULT: '#0d2418'
          },
          close: {
            DEFAULT: '#340e10'
          }
        },
        brand: {
          text: {
            DEFAULT: 'hsl(var(--primary-brand-text))'
          },
          primary: {
            DEFAULT: 'hsl(var(--primary-brand))',
            opaque: 'hsl(var(--primary-brand-opaque))',
            lighter: 'hsl(var(--primary-brand-lighter))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary-brand))',
            opaque: 'hsl(var(--secondary-brand-opaque))'
          },
          sidebar: {
            background: 'hsl(var(--sidebar-background))',
            text: 'hsl(var(--sidebar-text))',
            textAccent: 'hsl(var(--sidebar-text-accent))',
            iconsHover: 'hsl(var(--sidebar-icons-hover))'
          }
        }
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'calc(100vh - 500px)' }
        },
        'accordion-up': {
          from: { height: 'calc(100vh - 500px)' },
          to: { height: '0px' }
        }
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
}
export default config
