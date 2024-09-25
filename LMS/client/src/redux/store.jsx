import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import courseSliceReducer from "./slices/courseSlice";
import lectureSliceReducer from "./slices/lectureSlice";





const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        lecture:lectureSliceReducer
    },
    devTools:true
})

export default store;