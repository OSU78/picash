import { configureStore } from "@reduxjs/toolkit";
import  sessionSlice from "../stores/USER/sessionSlice.js";
import authReducer from '../stores/AUTH/authSlice.js';


export const store = configureStore({
  reducer: {
   
    USER : sessionSlice,
    auth: authReducer,
  
  }
});

export default store;

