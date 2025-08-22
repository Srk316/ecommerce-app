import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const { token } = useAuth()
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const placeOrder = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (token || ''),
        },
        body: JSON.stringify({
          items: items.map((x) => ({ id: x.id, qty: x.qty })),
          address,
        }),
      })
      if (!res.ok) throw new Error(await res.text())

      const j = await res.json() // { ok:true, orderId: '...' }

      // Build GA purchase payload using the cart at the time of success
      const purchasePayload = {
        transaction_id: j.orderId,
        currency: 'INR',
        value: total, // number
        items: items.map((x) => ({
          item_id: x.id,
          item_name: x.product.title,
          item_category: x.product.category,
          price: x.product.price,
          quantity: x.qty,
        })),
      }

      // Stash payload so Orders page can emit the GA 'purchase' event after redirect
      localStorage.setItem('ga_purchase', JSON.stringify(purchasePayload))

      // Clear cart and go to thank-you / orders page
      clear()
      nav('/orders?placed=' + j.orderId)
    } catch (e: any) {
      alert('Checkout failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container py-8 grid md:grid-cols-[1fr_360px] gap-6'>
      <div className='card p-4 space-y-3'>
        <div className='font-semibold'>Shipping Address</div>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='input h-32'
          placeholder='Full name, street, city, state, pincode, phone'
        />
      </div>
      <div className='card p-4 h-fit space-y-3 sticky top-24'>
        <div className='font-semibold'>Payment</div>
        <div className='text-sm text-slate-500'>
          Demo checkout (no real payment). Click Place Order.
        </div>
        <div className='flex justify-between'>
          <span>Total</span>
          <span className='font-semibold'>₹{total.toFixed(2)}</span>
        </div>
        <button
          disabled={!items.length || !address || loading}
          onClick={placeOrder}
          className='btn btn-primary w-full'
        >
          {loading ? 'Placing…' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}
