// client/src/hooks/useAnalytics.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, gaPageview } from '../utils/analytics'

export default function useAnalytics() {
  const loc = useLocation()

  // init once
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID as string
    if (!id) return
    initGA(id)
  }, [])

  // page views on route changes
  useEffect(() => {
    gaPageview(loc.pathname + loc.search)
  }, [loc.pathname, loc.search])
}
