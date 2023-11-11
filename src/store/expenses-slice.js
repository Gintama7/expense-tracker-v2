import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenses: [],totalAmount:0,premium: false}

const expenseSlice = createSlice({
    name:'expense',
    initialState:initialState,
    reducers:{
        addExpense(state,action){
            const item = action.payload;
            state.expenses.push(item);
           state.totalAmount+= Number(item.amount);
            if(state.totalAmount >=100000)
            {   
                state.premium =true;
            }
            
        } ,
        removeExpense(state,action)
        {
            const id= action.payload;
             const item = state.expenses.find( exp => exp.id === id);             
            state.expenses = state.expenses.filter(exp=> exp.id !== id );
            state.totalAmount -= Number(item.amount);
            if(state.totalAmount<100000)
            {
                state.premium = false;
            }
           
        },
        // editExpense(state,action)
        // {
        //     const id = action.payload.id;
        //     const item = state.expenses.find( exp => exp.id === id);
        //     state.expenses = state.expenses.filter(exp=> exp.id !== id );
        //     state.totalAmount -= Number(item.amount);
        //     state.expenses.push(item);
        //     state.totalAmount+= Number(item.amount);
        // }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;