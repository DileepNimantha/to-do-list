import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import homeReducer from '../pages/home/homeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer
});

export default rootReducer;
