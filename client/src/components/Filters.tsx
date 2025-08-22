import { useSearchParams } from 'react-router-dom'

export default function Filters(){
  const [params, setParams] = useSearchParams()

  const onChange = (key: string, value: string) => {
    const p = new URLSearchParams(params)
    if (value) {
      p.set(key, value)
    } else {
      p.delete(key)
    }
    setParams(p, { replace: true })
  }
  

  return (
    <div className='card p-4 sticky top-20'>
      <div className='font-semibold mb-2'>Filters</div>
      <div className='space-y-3 text-sm'>
        <div>
          <div className='mb-1 text-slate-600'>Category</div>
          <select className='input' value={params.get('category')||''} onChange={e=>onChange('category', e.target.value)}>
            <option value=''>All</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Home</option>
            <option>Fashion</option>
            <option>Sports</option>
          </select>
        </div>
        <div>
          <div className='mb-1 text-slate-600'>Sort</div>
          <select className='input' value={params.get('sort')||''} onChange={e=>onChange('sort', e.target.value)}>
            <option value=''>Relevance</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='rating-desc'>Rating</option>
          </select>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <input className='input' placeholder='Min ₹' value={params.get('min')||''} onChange={e=>onChange('min', e.target.value)} />
          <input className='input' placeholder='Max ₹' value={params.get('max')||''} onChange={e=>onChange('max', e.target.value)} />
        </div>
      </div>
    </div>
  )
}
