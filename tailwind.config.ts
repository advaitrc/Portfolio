module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          50: '#fffbeb',
        },
        orange: {
          700: '#f97316',
        },
        gray: {
          50: '#f3f4f6',
          200: '#e2e8f0',
          800: '#374151',
          900: '#1e293b',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
    },
  },
  plugins: [],
};
