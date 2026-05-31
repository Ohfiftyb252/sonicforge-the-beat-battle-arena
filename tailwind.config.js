/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			mono: ['JetBrains Mono', 'monospace'],
        retro: ['VT323', 'monospace']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: '#FF0000',
  				foreground: '#FFFFFF'
  			},
        'mutant-red': '#FF0000',
        'safety-yellow': '#F9D71C',
        'industrial-gray': '#1A1A1A',
        'dark-lab': '#0B0B0B',
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
        accent: {
          DEFAULT: '#F9D71C',
          foreground: '#000000'
        }
  		},
  		boxShadow: {
  			'glow-yellow': '0 0 15px rgba(249, 215, 28, 0.4)',
        'glow-red': '0 0 15px rgba(255, 0, 0, 0.5)'
  		},
  		keyframes: {
  			strobe: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.3' }
  			},
        'scanline-pulse': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
  		},
  		animation: {
  			strobe: 'strobe 0.2s ease-in-out infinite',
        'scanline-slow': 'scanline-pulse 8s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}