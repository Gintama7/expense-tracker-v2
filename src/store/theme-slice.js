import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name:'theme',
    initialState:{currTheme:localStorage.getItem('mode')},
    reducers:{
        changeTheme(state)
        {
            state.currTheme = state.currTheme ==='light' ? 'dark' : 'light';
            localStorage.setItem('mode',state.currTheme);
        }
        
    }
}) 

export const themeActions =themeSlice.actions;
export default themeSlice.reducer;