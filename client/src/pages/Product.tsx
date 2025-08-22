import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../hooks/api'
import { Product as ProductType } from '../types'
import { useCart } from '../context/CartContext'

function ProductPage() {
  const { id } = useParams()
  const [p, setP] = useState<ProductType | null>(null)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  useEffect(() => {
    api<ProductType>('/api/products/' + id).then(setP)
  }, [id])

  if (!p) return <div className='container py-8'>Loading…</div>

  return (
    <div className='container py-8 grid md:grid-cols-2 gap-8'>
      <div className='card overflow-hidden'>
        <img src={p.image} alt={p.title} className='w-full h-auto' />
      </div>
      <div className='space-y-3'>
        <div className='text-sm text-slate-500'>{p.category}</div>
        <div className='text-2xl font-bold'>{p.title}</div>
        <div>★ {p.rating.toFixed(1)}</div>
        <div className='text-2xl font-bold'>₹{p.price.toFixed(2)}</div>
        <p className='text-slate-600 whitespace-pre-wrap'>{p.description}</p>
        <div className='flex gap-2'>
          <input
            type='number'
            min={1}
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            className='input w-24'
          />
          <button onClick={() => add(p, qty)} className='btn btn-primary'>
            Add to Cart
          </button>
        </div>
        <div className='text-sm text-slate-500'>In stock: {p.stock}</div>
      </div>
    </div>
  )
}

export default ProductPage
