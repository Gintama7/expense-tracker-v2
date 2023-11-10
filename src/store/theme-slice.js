import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name:'theme',
    initialState:{currTheme:'light'},
    reducers:{
        changeTheme(state)
        {
            state.currTheme = state.currTheme ==='light' ? 'dark' : 'light';
        }
    }
}) 

export const themeActions =themeSlice.actions;
export default themeSlice.reducer;