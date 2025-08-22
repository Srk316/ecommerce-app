export default function Qty({value,onChange}:{value:number,onChange:(n:number)=>void}){
  return (
    <div className='inline-flex items-center border rounded-xl overflow-hidden'>
      <button className='px-3 py-1 border-r' onClick={()=>onChange(Math.max(1,value-1))}>-</button>
      <div className='px-4 select-none'>{value}</div>
      <button className='px-3 py-1 border-l' onClick={()=>onChange(value+1)}>+</button>
    </div>
  )
}
