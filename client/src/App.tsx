import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'          // default export can be named anything
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import useAnalytics from './hooks/useAnalytics'

export default function App() {
  // initialize GA and send SPA page views on route changes
  useAnalytics()

  return (
    <AuthProvider>
      <CartProvider>
        <div className='min-h-screen flex flex-col'>
          <Header />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
