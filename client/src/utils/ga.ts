// client/src/utils/ga.ts

// Force module detection even if something strips code during build:
export const __ga_module__ = true

let initialized = false

export function initGA(measurementId: string) {
  if (initialized || !measurementId) return

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(s)

  // @ts-ignore
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    // @ts-ignore
    window.dataLayer.push(args)
  }
  // @ts-ignore
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId, { send_page_view: false })

  initialized = true
}

export function gaEvent(eventName: string, params: Record<string, any> = {}) {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.gtag) {
    // @ts-ignore
    window.gtag('event', eventName, params)
  }
}

export function gaPageview(path: string) {
  const id = import.meta.env.VITE_GA_ID as string
  if (!id) return
  gaEvent('page_view', { page_path: path, send_to: id })
}
