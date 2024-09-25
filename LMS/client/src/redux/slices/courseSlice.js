import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    courseData:[]
}
const courseSlice=createSlice({
    name:'course',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                state.courseData=[...action.payload]
            }
        })
    }
})
export const getAllCourses=createAsyncThunk('/course/get',async()=>{
    try{
        const response=axiosInstance.get('/course');
        toast.promise(response,{
            loading:"Loading course data",
            success:"Courses Loaded succesfully",
            error:"Failed to get the course"
        })
        return (await response).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const createCourse=createAsyncThunk('/course/create',async(data)=>{
    try{
        let formData=new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("category",data?.category);
        formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);
        console.log("Hello");
        const response=axiosInstance.post('/course',formData);
        console.log(response);
        toast.promise(response,{
            loading:"Waiting to create course",
            success:"Succesfully created course",
            error:"Failed to create course"
        })
        return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
   
})

export default courseSlice.reducer;

