import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '../types'

type Item = { id: string, qty: number, product: Product }
type CartCtx = {
  items: Item[]
  add: (p: Product, qty?:number)=>void
  remove: (id:string)=>void
  update: (id:string, qty:number)=>void
  clear: ()=>void
  count: number
  total: number
}
const C = createContext<CartCtx>(null!)

export function CartProvider({children}:{children:React.ReactNode}){
  const [items, setItems] = useState<Item[]>(()=> JSON.parse(localStorage.getItem('cart')||'[]'))

  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(items)) }, [items])

  const add = (product: Product, qty:number=1)=>{
    setItems(prev=>{
      const found = prev.find(x=>x.id===product.id)
      if (found) return prev.map(x=> x.id===product.id ? {...x, qty: x.qty+qty} : x)
      return [...prev, { id: product.id, qty, product }]
    })
  }
  const remove = (id:string)=> setItems(prev=> prev.filter(x=>x.id!==id))
  const update = (id:string, qty:number)=> setItems(prev=> prev.map(x=> x.id===id ? {...x, qty} : x))
  const clear = ()=> setItems([])

  const count = useMemo(()=> items.reduce((a,c)=>a+c.qty,0), [items])
  const total = useMemo(()=> items.reduce((a,c)=>a+c.qty*c.product.price,0), [items])

  return <C.Provider value={{items, add, remove, update, clear, count, total}}>{children}</C.Provider>
}
export const useCart = ()=> useContext(C)
