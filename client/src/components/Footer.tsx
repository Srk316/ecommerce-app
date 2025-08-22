export default function Footer(){
  return (
    <footer className='border-t'>
      <div className='container py-8 text-sm text-slate-500 flex flex-col md:flex-row gap-2 justify-between'>
        <div>© {new Date().getFullYear()} ShopStack. All rights reserved.</div>
        <div>Demo store · No real payments</div>
      </div>
    </footer>
  )
}
