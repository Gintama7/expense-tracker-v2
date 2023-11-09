import { createSlice } from "@reduxjs/toolkit";


const initialState = {isAuthenticated : false,token:''};

const authSlice = createSlice({
    name:'authentication',
    initialState:initialState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true; 
            state.token=action.payload;  
            localStorage.setItem('token',action.payload);         
        },
        logout(state){
            state.isAuthenticated=false;
            state.token = '';
            localStorage.removeItem('token');
        }
    }
})


export const authActions = authSlice.actions;
export default authSlice.reducer