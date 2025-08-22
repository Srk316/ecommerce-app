import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'
import jsonfile from 'jsonfile'
import path from 'path'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

const PORT = process.env.PORT || 8788
const DATA_DIR = path.join(process.cwd(), 'data')
const PRODUCTS_PATH = path.join(DATA_DIR, 'products.json')
const ORDERS_PATH = path.join(DATA_DIR, 'orders.json')
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

// --- tiny fake auth ---
function sign(payload){
  // NOT real JWT—just a demo token
  const base = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return base + '.' + Buffer.from(JWT_SECRET).toString('base64url')
}
function verify(token){
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return null
    if (Buffer.from(sig, 'base64url').toString() !== JWT_SECRET) return null
    return JSON.parse(Buffer.from(payload,'base64url').toString())
  } catch { return null }
}
function auth(req, res, next){
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if (!token) return res.status(401).send('Missing token')
  const user = verify(token)
  if (!user) return res.status(401).send('Invalid token')
  req.user = user
  next()
}

// --- routes ---
app.get('/api/health', (_req,res)=> res.json({ ok:true }))

app.post('/api/auth/login', (req,res)=>{
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).send('Email and password required')
  // demo: accept the demo creds, or any email ending with @shopstack.dev
  if (!(email.endsWith('@shopstack.dev') || email === 'demo@shopstack.dev')) {
    return res.status(401).send('Invalid credentials')
  }
  
  const token = sign({ id:'u_demo', name:'Demo User', email })
  res.json({ token })
})

app.get('/api/me', (req,res)=>{
  const authz = req.headers.authorization || ''
  const token = authz.startsWith('Bearer ') ? authz.slice(7) : ''
  const user = verify(token)
  if (!user) return res.status(401).send('Unauthorized')
  res.json({ id:user.id, name:user.name, email:user.email })
})

app.get('/api/products', async (req,res)=>{
  const { q='', category='', sort='', min='', max='' } = req.query
  const items = await jsonfile.readFile(PRODUCTS_PATH)
  let filtered = items.filter(p=> 
    (!category || p.category===category) &&
    (!q || (p.title.toLowerCase().includes(String(q).toLowerCase()) || p.description.toLowerCase().includes(String(q).toLowerCase()))) &&
    (!min || p.price >= Number(min)) &&
    (!max || p.price <= Number(max))
  )
  if (sort==='price-asc') filtered.sort((a,b)=> a.price-b.price)
  if (sort==='price-desc') filtered.sort((a,b)=> b.price-a.price)
  if (sort==='rating-desc') filtered.sort((a,b)=> b.rating-a.rating)
  res.json({ items: filtered })
})

app.get('/api/products/:id', async (req,res)=>{
  const items = await jsonfile.readFile(PRODUCTS_PATH)
  const p = items.find(x=> x.id===req.params.id)
  if (!p) return res.status(404).send('Not found')
  res.json(p)
})

app.post('/api/checkout', auth, async (req,res)=>{
  const { items=[], address='' } = req.body || {}
  if (!Array.isArray(items) || !address) return res.status(400).send('Invalid payload')
  const catalog = await jsonfile.readFile(PRODUCTS_PATH)
  let total = 0
  for (const it of items) {
    const p = catalog.find(x=> x.id===it.id)
    if (!p) return res.status(400).send('Invalid product: '+it.id)
    if (it.qty<1 || it.qty>p.stock) return res.status(400).send('Invalid qty for '+it.id)
    total += p.price * it.qty
  }
  const order = { id: nanoid(8), userId: req.user.id, items, address, total, createdAt: new Date().toISOString(), status: 'PLACED' }
  const orders = await jsonfile.readFile(ORDERS_PATH)
  orders.push(order)
  await jsonfile.writeFile(ORDERS_PATH, orders, { spaces: 2 })
  res.json({ ok:true, orderId: order.id })
})

app.get('/api/orders', auth, async (req,res)=>{
  const orders = await jsonfile.readFile(ORDERS_PATH)
  const mine = orders.filter(o=> o.userId===req.user.id).map(o=>({ id:o.id, total:o.total, createdAt:o.createdAt }))
  res.json(mine)
})

app.listen(PORT, ()=> console.log('✅ E‑commerce server on http://localhost:'+PORT))
