import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, gaPageview } from '../utils/ga'

export default function useAnalytics() {
  const loc = useLocation()

  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID as string
    console.log('[GA] VITE_GA_ID =', id)            // <-- DEBUG LINE
    if (!id) return
    initGA(id)
  }, [])

  useEffect(() => {
    gaPageview(loc.pathname + loc.search)
  }, [loc.pathname, loc.search])
}
