import { Link } from 'react-router-dom'
import Qty from '../components/Qty'
import { useCart } from '../context/CartContext'

export default function Cart(){
  const { items, update, remove, total } = useCart()

  return (
    <div className='container py-8'>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
      {!items.length ? (
        <div className='card p-6'>Your cart is empty. <Link to='/' className='text-brand-600 underline ml-1'>Go shopping</Link>.</div>
      ) : (
        <div className='grid md:grid-cols-[1fr_320px] gap-6'>
          <div className='card'>
            {items.map(it => (
              <div key={it.id} className='p-4 border-b last:border-none flex gap-4 items-center'>
                <img src={it.product.image} className='w-20 h-20 rounded-lg object-cover'/>
                <div className='flex-1'>
                  <div className='font-semibold'>{it.product.title}</div>
                  <div className='text-sm text-slate-500'>₹{it.product.price.toFixed(2)}</div>
                </div>
                <Qty value={it.qty} onChange={n=>update(it.id, n)} />
                <button onClick={()=>remove(it.id)} className='badge'>Remove</button>
              </div>
            ))}
          </div>
          <div className='card p-4 space-y-3 h-fit sticky top-24'>
            <div className='font-semibold'>Order Summary</div>
            <div className='flex justify-between'><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
            <div className='text-sm text-slate-500'>Shipping calculated at checkout</div>
            <Link to='/checkout' className='btn btn-primary w-full text-center'>Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
