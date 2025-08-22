import { Link } from 'react-router-dom'
import { Product } from '../types'

export default function ProductCard({p}:{p:Product}){
  return (
    <Link to={`/product/${p.id}`} className='card overflow-hidden group'>
      <div className='aspect-[4/3] bg-slate-100 overflow-hidden'>
        <img src={p.image} alt={p.title} className='w-full h-full object-cover group-hover:scale-105 transition' />
      </div>
      <div className='p-4 space-y-1'>
        <div className='text-sm text-slate-500'>{p.category}</div>
        <div className='font-semibold line-clamp-2 h-12'>{p.title}</div>
        <div className='flex items-center justify-between pt-2'>
          <div className='font-bold'>₹{p.price.toFixed(2)}</div>
          <div className='text-xs text-slate-500'>★ {p.rating.toFixed(1)}</div>
        </div>
      </div>
    </Link>
  )
}
