import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../HomeLayout/HomeLayout"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCourseLecture } from "../../redux/slices/lectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {
    const courseDetails=useLocation().state;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [userInput,setUserInput]=useState({
        id:courseDetails._id,
        title:"",
        description:"",
        lecture:undefined,
        videoSrc:""
    })
    function handleUserInput(e){
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }
    function handleVideo(e){
        const video=e.target.files[0]
        const source=window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            videoSrc:source,
            lecture:video
        })
    }
    const onFormSubmit=async(e)=>{
        e.preventDefault();
        if(!userInput.title||!userInput.description||!userInput.lecture){
            toast.error("All fields are mandatory")
            return
        }
        const response=await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            navigate(-1);
           setUserInput({
            id:courseDetails._id,
            title:"",
            description:"",
            lecture:undefined,
            videoSrc:""
           }) 
           
        }
    }
    useEffect(()=>{
        if(!courseDetails)navigate('/courses');
    },[])
  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col justify-center items-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
            <header className="flex items-center justify-center relative">
                <button onClick={()=>navigate(-1)}className="absolute left-2 text-xl text-green-500"><AiOutlineArrowLeft/></button>
                <h1 className="text-xl text-yellow-500 font-semibold">Add New Lecture</h1>
            </header>
            <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-3">
                <input type="text" name="title" placeholder="Enter the title of the lecture"
                onChange={handleUserInput} 
                className="bg-transparent px-3 py-1 border"
                value={userInput.title}
                />
                <textarea
                name="description"
                value={userInput.description}
                onChange={handleUserInput}
                placeholder="Enter the description for lecture"
                className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
                />
                  
                    {userInput.videoSrc?(
                        <video
                        src={userInput.videoSrc}
                        disablePictureInPicture
                        muted
                        controls
                        controlsList="nodownload nofullscreen"
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                        ></video>
                    ):(
                        <div className="h-48 border flex items-center justify-center cursor-pointer">
                            <label
                            htmlFor="lecture"
                            className="font-semibold text-xl cursor-pointer"
                            >
                                Choose your video
                            </label>
                            <input type="file"
                            id="lecture"
                            name="lecture"
                            onChange={handleVideo}
                            accept="video/mp4,video/x-m4v,video/*"
                            className="hidden"
                            />
                        </div>
                    )

                    }
                    <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                        Add Lecture
                    </button>
             
              
            </form>
        </div>
      </div>
    </HomeLayout>
  )
}

export default AddLecture
