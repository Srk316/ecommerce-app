import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, gaPageview } from '../utils/ga'

export default function useAnalytics() {
  const loc = useLocation()

  // init once
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID as string
    if (!id) return
    initGA(id)
  }, [])

  // fire SPA page views (kept even though send_page_view:true above)
  useEffect(() => {
    gaPageview(loc.pathname + loc.search)
  }, [loc.pathname, loc.search])
}
