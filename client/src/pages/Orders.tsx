import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../hooks/api'

type Order = { id:string, total:number, createdAt:string }

export default function Orders(){
  const { token } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [params] = useSearchParams()

  useEffect(()=>{
    if (!token) return
    api<Order[]>('/api/orders', { headers: { Authorization: 'Bearer '+token } }).then(setOrders)
  }, [token])

  if (!token) return <div className='container py-8'>Please <Link to='/login' className='text-brand-600 underline'>login</Link> to view your orders.</div>

  return (
    <div className='container py-8'>
      {params.get('placed') && <div className='card p-4 mb-4'>Order placed successfully! Order ID: {params.get('placed')}</div>}
      <h1 className='text-2xl font-bold mb-4'>Your Orders</h1>
      {!orders.length ? <div className='card p-4'>No orders yet.</div> : (
        <div className='grid gap-3'>
          {orders.map(o=> (
            <div key={o.id} className='card p-4 flex justify-between'>
              <div>
                <div className='font-semibold'>Order #{o.id}</div>
                <div className='text-sm text-slate-500'>{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className='font-semibold'>₹{o.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
