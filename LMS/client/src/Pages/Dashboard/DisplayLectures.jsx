import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCourseLecture, getCourseLecture } from '../../redux/slices/lectureSlice';
import HomeLayout from '../../HomeLayout/HomeLayout';
function DisplayLectures(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {state}=useLocation();
    const {lectures}=useSelector((state)=>state.lecture);
    const {role}=useSelector((state)=>state.auth);
    const [currentVideoIndex,setCurrentVideoIndex]=useState(0);
   
      const handleLectureDelete=async(courseId,lectureId)=>{
        const data={courseId,lectureId};
        await dispatch(getCourseLecture(courseId));
        await dispatch(deleteCourseLecture(data));
       
    }
    useEffect(()=>{    
        if(!state) navigate('/courses');
        
    
            dispatch(getCourseLecture(state._id));
        
    },[])
    return (<HomeLayout>
                <div className='min-h-[90vh]  flex flex-col justify-center items-center  text-white mx-[5%] shadow-[0_0_10px_black] py-10 gap-10'>
                    <h1 className="text-2xl text-yellow-500 text-center font-semibold">
                            Course Name:{state?.title}
                     </h1>
                  {lectures&&lectures.length>0?(
   <div className="flex justify-center gap-10 w-full">
   <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
       <video
           src={lectures&&lectures[currentVideoIndex]?.lecture?.secure_url}
           className='object-fill rounded-tl-lg rounded-tr-lg w-full'
           controls
           muted
           disablePictureInPicture
           controlsList='nodownload'
       >
       </video>
       <div>
           <h1>
               <span className="text-yellow-500">Title :</span>{lectures&&lectures[currentVideoIndex]?.title}
           </h1>
           <p>
               <span className='text-yellow-500 line-clamp-4'>Description: {" "}</span>
               {lectures && lectures[currentVideoIndex]?.description}
           </p>
       </div>
   </div>
   <ul className=" w-[28rem] p-2 rounded-lg space-y-4 shadow-[0_0_10px_black] ">
     <li className='font-semibold text-xl text-yellow-500 flex items-center justify-between'>
       <p>Lectures List</p>
       {role==='ADMIN'&&
       (
           <button onClick={()=>navigate('/course/addlecture',{state:{...state}})}className='btn btn-primary px-2 py-1 rounded-md font-semibold text-sm'>
               Add New Lecture
           </button>
       )}
     </li>
     {
       lectures&&lectures.map((lecture,index)=>{
           return <li key={lecture?._id} className='spayce-y-2'>
               <p className='cursor-pointer'onClick={()=>setCurrentVideoIndex(index)}>
                   <span className='text-yellow-500'>{" "}
                   Lecture {index+1}:{" "}
                   </span>
                   {lecture?.title}
               </p>
               {role==='ADMIN'&&(
                       <button onClick={()=>handleLectureDelete(state?._id,lecture?._id)}className='btn btn-error  px-2 py-1 rounded-md font-semibold text-sm '>
                           Delete Lecture
                       </button>
                   )
               }
           </li>
       })
     }

   </ul>
</div>
                  
                    ):(
                        role==='ADMIN'&&
       (
           <button onClick={()=>navigate('/course/addlecture',{state:{...state}})}className='btn btn-primary px-2 py-1 rounded-md font-semibold text-sm'>
               Add New Lecture
           </button>
       )
                    )

                  }
                </div>
            </HomeLayout>)
}
export default DisplayLectures;