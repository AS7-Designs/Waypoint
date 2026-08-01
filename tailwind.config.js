/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgCanvas: 'var(--color-bg-canvas)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
        },
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          tint: 'var(--color-primary-tint)',
          tint2: 'var(--color-primary-tint-2)',
        },
        accent: {
          teal: 'var(--color-accent-teal)',
          amber: 'var(--color-accent-amber)',
          rose: 'var(--color-accent-rose)',
          violet: 'var(--color-accent-violet)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          disabled: 'var(--color-text-disabled)',
        },
        status: {
          successBg: 'var(--color-success-bg)',
          successText: 'var(--color-success-text)',
          progressBg: 'var(--color-progress-bg)',
          progressText: 'var(--color-progress-text)',
          neutralBg: 'var(--color-neutral-bg)',
          neutralText: 'var(--color-neutral-text)',
          dangerBg: 'var(--color-danger-bg)',
          dangerText: 'var(--color-danger-text)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'element': '12px',
        'nested': '16px',   /* nested panels / sub-cards inside a Card (kanban cards, table wrappers, toasts) */
        'card': '20px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(17, 24, 39, 0.04), 0 1px 2px rgba(17, 24, 39, 0.03)',
        'elevated': '0 25px 50px -12px rgba(17, 24, 39, 0.25)',   /* Modal / Drawer / Toast - surfaces above a scrim */
      }
    },
  },
  plugins: [],
}
