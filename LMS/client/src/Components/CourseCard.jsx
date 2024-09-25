import { useNavigate } from "react-router-dom"


function CourseCard({data}) {
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate('/course/description',{state:{...data}})}className="flex flex-col gap-4 py-2 px-3  text-white group h-[430px] shadow-lg rounded-lg cursor-pointer overflow-hidden bg-zinc-700 w-[22rem]">
        <div className="overflow-hidden">
            <img className="w-full h-48 rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300" src={data?.thumbnail?.secure_url} alt="Course thumbnail"/>
        </div>
        <div className="p-3 space-y-1 text-white">
            <h2 className="text-xl font-bold text-yellow-500 line-clamp-2 ">{data.title}</h2>
            <p className="line-clamp-2">
            {data?.description}
        </p>
        <p className="font-semibold"><span className="text-yellow-500 font-bold mr-1">Category:</span>{data?.category}</p>
        <p className="font-semibold"><span className="text-yellow-500 font-bold mr-1">Total Lectures:</span>{data?.numberOfLectures}</p>
        <p className="font-semibold"><span className="text-yellow-500 font-bold mr-1">Instructor:</span>{data?.createdBy}</p>
        </div>
    
           
    
      
    </div>
  )
}

export default CourseCard
