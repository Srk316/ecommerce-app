import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import { Product } from '../types'
import { api } from '../hooks/api'

export default function Home(){
  const [params] = useSearchParams()
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    const query = params.toString()
    api<{items:Product[]}>('/api/products?'+query).then(d=> setItems(d.items)).finally(()=>setLoading(false))
  }, [params])

  return (
    <div className='container py-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6'>
      <Filters />
      <div>
        <div className='mb-4 text-sm text-slate-600'>{items.length} products</div>
        {loading ? <div>Loading…</div> : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {items.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
