
import expenseReducer from './expenses-slice';
import authReducer from './auth-slice';
import themeReducer from './theme-slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer:{expensesList : expenseReducer, auth: authReducer, theme: themeReducer}
})

export default store;