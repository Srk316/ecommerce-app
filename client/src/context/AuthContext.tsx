import { createContext, useContext, useEffect, useState } from 'react'
type User = { id: string, name: string, email: string } | null

const C = createContext<{user:User, token:string|null, login:(e:string,p:string)=>Promise<void>, logout:()=>void}>(null!)

export function AuthProvider({children}:{children:React.ReactNode}){
  const [user, setUser] = useState<User>(null)
  const [token, setToken] = useState<string|null>(localStorage.getItem('token'))

  useEffect(()=>{ if (token) {
    fetch('/api/me', { headers: { Authorization: 'Bearer '+token }}).then(r=>r.json()).then(u=>setUser(u)).catch(()=>{setUser(null); setToken(null); localStorage.removeItem('token')})
  }}, [token])

  async function login(email:string, password:string){
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    if (!res.ok) throw new Error('Invalid credentials')
    const j = await res.json()
    setToken(j.token); localStorage.setItem('token', j.token)
  }
  function logout(){ setUser(null); setToken(null); localStorage.removeItem('token') }

  return <C.Provider value={{user, token, login, logout}}>{children}</C.Provider>
}
export const useAuth = ()=> useContext(C)
