
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
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
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				dark: '#0a0a0a',
				accent: '#facc15',
                grid: {
                    line: 'rgba(67, 56, 202, 0.2)'
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.6' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-40rem 0' },
					'100%': { backgroundPosition: '40rem 0' },
				},
				'spotlight': {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)',
					},
				},
				'fadeIn': {
					'from': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'to': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px 8px rgba(250, 204, 21, 0.5)'
					},
				},
				'scroll-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
                'float-card': {
                    '0%, 100%': { 
                        transform: 'translateY(0) scale(1)'
                    },
                    '50%': { 
                        transform: 'translateY(-5px) scale(1.01)'
                    }
                },
                'reveal': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'fade-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'grid-fade': {
                    '0%': {
                        opacity: '0.05'
                    },
                    '50%': {
                        opacity: '0.1'
                    },
                    '100%': {
                        opacity: '0.05'
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 6s ease-in-out infinite',
                'rotate-slow': 'rotate-slow 20s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'spotlight': 'spotlight 2s ease forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'glow': 'glow 1.5s ease-in-out infinite',
                'scroll-left': 'scroll-left 30s linear infinite',
                'float-card': 'float-card 3s ease-in-out infinite',
                'reveal': 'reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'fade-up': 'fade-up 0.6s ease-out forwards',
                'grid-fade': 'grid-fade 4s ease-in-out infinite',
			},
            backgroundImage: {
                'grid-lines': 'linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
            }
		},
	},
	plugins: [],
} satisfies Config;
