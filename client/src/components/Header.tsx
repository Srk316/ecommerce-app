import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Header(){
  const { count } = useCart()
  const { user, logout } = useAuth()
  const [q, setQ] = useState('')
  const nav = useNavigate()

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({ q })
    nav('/?'+params.toString())
  }

  return (
    <header className='border-b bg-white sticky top-0 z-40'>
      <div className='container py-3 flex items-center gap-4'>
        <Link to='/' className='font-extrabold text-xl text-brand-700'>ShopStack</Link>
        <form onSubmit={onSearch} className='flex-1 hidden md:flex'>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search products...' className='input rounded-r-none'/>
          <button className='btn btn-primary rounded-l-none'>Search</button>
        </form>
        <nav className='flex items-center gap-3'>
          <NavLink to='/' className='badge'>Home</NavLink>
          <NavLink to='/cart' className='badge'>Cart ({count})</NavLink>
          {user ? (
            <div className='flex items-center gap-2'>
              <NavLink to='/orders' className='badge'>Orders</NavLink>
              <button className='badge' onClick={logout}>Logout</button>
            </div>
          ) : (
            <NavLink to='/login' className='badge'>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
