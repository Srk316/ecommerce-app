import { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login(){
  const { login } = useAuth()
  const [email, setEmail] = useState('demo@shopstack.dev')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState<string|null>(null)
  const [params] = useSearchParams()
  const nav = useNavigate()

  const onSubmit = async (e:FormEvent)=>{
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      const next = params.get('next') || '/'
      nav(next)
    } catch (e:any) {
      setError(e.message)
    }
  }

  return (
    <div className='container py-16 max-w-md'>
      <div className='card p-6 space-y-4'>
        <div className='text-xl font-bold'>Login</div>
        <form onSubmit={onSubmit} className='space-y-3'>
          <input className='input' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
          <input type='password' className='input' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
          {error && <div className='text-sm text-red-600'>{error}</div>}
          <button className='btn btn-primary w-full'>Login</button>
        </form>
        <div className='text-xs text-slate-500'>Use demo credentials shown above.</div>
      </div>
    </div>
  )
}
