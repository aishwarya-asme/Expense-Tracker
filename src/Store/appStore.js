import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expensesReducer from "./expensesSlice";


const appStore=configureStore({
    reducer:{
        auth:authReducer,
        expenses:expensesReducer,
    },
});

export default appStore;