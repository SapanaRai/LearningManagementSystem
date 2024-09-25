import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../Components/CourseCard';
import HomeLayout from '../../HomeLayout/HomeLayout';
import { getAllCourses } from '../../redux/slices/courseSlice';
function CourseList() {
  
    const dispatch=useDispatch();
    const {courseData}=useSelector((state)=>state.course);
  async function loadCourses(){
        await dispatch(getAllCourses());
    }
    useEffect(()=>{
        loadCourses();
    },[]);
  return (
   <HomeLayout>
     <div className="flex flex-col min-h-[90vh] pt-12 pl-20 gap-10 text-white">
      <h1 className='text-center text-2xl font-bold'>Explore All the courses by <span className="text-yellow-500 text-bold ml-1">Industry experts.</span></h1>
     <div className="mb-10 flex gap-14 flex-wrap">
      {courseData?.map((course)=>{
        return <CourseCard data={course} key={course._id}/>
      })}
     </div>
      </div>

   </HomeLayout>
  )
}

export default CourseList
