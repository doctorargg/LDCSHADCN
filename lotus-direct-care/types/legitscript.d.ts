declare global {
  interface Window {
    legitscript?: {
      renderSeal: (container: HTMLElement) => void
    }
  }
}

export {}