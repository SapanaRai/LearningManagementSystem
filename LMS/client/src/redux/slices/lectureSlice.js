import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState={
    lectures:[]
}
export const getCourseLecture=createAsyncThunk("course/lecture/get",async(courseId)=>{
    try{
        const response=axiosInstance.get(`/course/${courseId}`);
        toast.promise(response,{
            loading:"Fetching the lecures.....",
            success:"Lecures fetched succesfully",
            error:"Failed to fetch lectures"
        })
        return (await response).data
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const addCourseLecture=createAsyncThunk('course/lecture/add',async(data)=>{
    try{
        const formData=new FormData();
        formData.append("lecture",data?.lecture);
        formData.append("title",data.title);
        formData.append("description",data.description);
    
        const response=axiosInstance.post(`course/${data.id}`,formData);
        toast.promise(response,{
            loading:'Adding the lecture.....',
            success:"Lecture Added Succesfully",
            error:"Failed to add lecture"
        })
        return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
    

})
export const deleteCourseLecture=createAsyncThunk("coures/lecture/delete",async(data)=>{
    console.log(data);
    try{
        const res = axiosInstance.delete(
            `course/?courseId=${data.courseId}&lectureId=${data.lectureId}`
          );
        toast.promise(res,{
            loading:`Deleting the lecture....`,
            success:`Lecture deleted succesfully`,
            error:'Failed to delete lecture'
        })
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})
const lectureSlice=createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            console.log(action?.payload?.course?.lectures)
            state.lectures=action?.payload?.course?.lectures
        })
        .addCase(getCourseLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.lectures;
        })
    }
})

export default lectureSlice.reducer;