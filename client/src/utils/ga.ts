// client/src/utils/ga.ts

export const __ga_debug = { inited: false, id: '', events: [] as any[] }

let initialized = false

export function initGA(measurementId: string) {
  if (initialized || !measurementId) return
  __ga_debug.id = measurementId

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

  // TEMP: set true so you get at least the first page_view automatically.
  // Once you see data flowing, you can change to false and rely on gaPageview().
  gtag('config', measurementId, { send_page_view: true })

  initialized = true
  __ga_debug.inited = true
}

export function gaEvent(eventName: string, params: Record<string, any> = {}) {
  __ga_debug.events.push({ name: eventName, params })
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
