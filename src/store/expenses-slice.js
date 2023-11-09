import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenses: []}

const expenseSlice = createSlice({
    name:'expense',
    initialState:initialState,
    reducers:{
        addExpense(state,action){
            state.expenses.push(action.payload);
        } ,
        removeExpense(state,action)
        {
            const id= action.payload;
            state.expenses = state.expenses.filter(exp=> exp.id !== id );
        }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;