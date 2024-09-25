import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../HomeLayout/HomeLayout";

function CourseDescription(){
    const {state}=useLocation();
    const {role,data}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    useEffect(()=>{

    },[])
return (
  <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center flex-col text-white pt-12 px-20">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-5">
          <img
            className="w-full h-64" 
            alt="Thumbnail"
            src={state?.thumbnail?.secure_url}
            />
            <div className="space-y-4">
                <div className="flex flex-col justify-center items-center text-xl">
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold mr-1">Number of Lectures:</span>{state?.numberOfLectures}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold mr-1">Instructor:</span>{state?.createdBy}
                    </p>
                </div>
            </div>
            {role==='ADMIN'||data?.subcription?.status==='active'?
                (<button onClick={()=>navigate('/course/displayLectures',{state:{...state}})} className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 font-bold rounded-sm w-full text-xl">
                    Watch Course
                </button>):(
                 <button onClick={()=>navigate('/course/displayLectures',{state:{...state}})} className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 font-bold rounded-sm w-full text-xl">
                 Subscribe
             </button>
                )
            }
          </div>
          <div className="space-y-1 text-xl">
            <h1 className="text-3xl text-yellow-500">
            {state?.title}
            </h1>
            <p className="text-yellow-500">
                Description:
            </p>
            <p>{state?.description}</p>
          </div>
        </div>        
    </div>
  </HomeLayout>
)
}
export default CourseDescription;