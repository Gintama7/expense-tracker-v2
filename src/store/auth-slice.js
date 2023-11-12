import { createSlice } from "@reduxjs/toolkit";


const initialState = {isAuthenticated : false,token:'',email:''};

const authSlice = createSlice({
    name:'authentication',
    initialState:initialState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true; 
            const {email,token}=action.payload; 
            state.email= email; 
            state.token=token;
            localStorage.setItem('token',token); 
            localStorage.setItem('email',email)        
        },
        logout(state){
            state.isAuthenticated=false;
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('mode');
            localStorage.removeItem('email');
        }
    }
})


export const authActions = authSlice.actions;
export default authSlice.reducer