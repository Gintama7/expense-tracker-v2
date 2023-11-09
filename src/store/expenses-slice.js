import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenses: []}

const expenseSlice = createSlice({
    name:'expense',
    initialState:initialState,
    reducers:{
        addExpense(state,action){
            state.expenses = [...state.expenses,action.payload];
        } 
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;