import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from '../../Helpers/axiosInstance'
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')||false,
    role:localStorage.getItem('role')|| '',
    data:localStorage.getItem==undefined?JSON.parse(localStorage.getItem("data")):{} || {}
}
export const createAccount=createAsyncThunk('/auth/signup',async(data)=>{
    try{
        const res=axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait! creating your account",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to create Account"
        })
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const login=createAsyncThunk('auth/login',async(data)=>{
    try{
        const res=axiosInstance.post('/user/login',data);
        toast.promise(res,{
            loading:"Authentication on progress",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to login"
        })
        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})
export const logout=createAsyncThunk('auth/logout',async()=>{
    try{
        const res=axiosInstance.get('user/logout');
        toast.promise(res,{
            loading:'Waiting to log out!!!',
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to log out"
        })
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const updateProfile=createAsyncThunk("/user/update",async(data)=>{
   
    try{
        const response=axiosInstance.put(`/user/update-user`,data[1]);
        toast.promise(response,{
            loading:'Updating.....',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to update profile'
        })
    return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getUserData=createAsyncThunk('user/me',async()=>{
    try{
        const response=await axiosInstance.get('/user/me');
        return response.data;
    }catch(error){
        toast.error(error.message);
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.data={};
            state.role="";
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role)
            console.log(action?.payload?.user);
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user?.role;
        })
    }
})


export const {}=authSlice.actions;
export default authSlice.reducer