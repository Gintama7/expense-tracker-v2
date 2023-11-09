
import expenseReducer from './expenses-slice';
import authReducer from './auth-slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer:{expensesList : expenseReducer, auth: authReducer}
})

export default store;