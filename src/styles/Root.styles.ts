import { makeStaticStyles } from '@fluentui/react-components'

export const useRootStaticStyles = makeStaticStyles([
  {
    '*': {
      boxSizing: 'border-box',
    },
    'html, body, #root': {
      minWidth: '320px',
      minHeight: '100%',
      margin: 0,
    },
    body: {
      minHeight: '100vh',
    },
  },
  `
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `,
])
