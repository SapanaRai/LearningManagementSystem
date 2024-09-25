import { createSlice } from "@reduxjs/toolkit"

const initialState={
    allUsersCount:0
}
const statSlice=createSlice({
    name:'stats',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }

})
export default statSlice.reducer;