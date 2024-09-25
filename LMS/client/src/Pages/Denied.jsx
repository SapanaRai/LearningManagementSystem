import {  useNavigate } from "react-router-dom"

function Denied() {
    const navigate=useNavigate();
  return (
    <main className="flex flex-col w-full h-screen bg-[#1A2238] justify-center items-center">
      <h1 className="text-white text-9xl font-extrabold tracking-widest">403</h1>
      <div className="absolute rotate-12 bg-black text-sm rounded px-2">Access Denied</div>
      <button onClick={()=>navigate(-1)} className="mt-5">
        <span className="border px-8 py-3 bg-[#1A2238] border-current">Go Back</span>
      </button>
    </main>
  )
}

export default Denied
