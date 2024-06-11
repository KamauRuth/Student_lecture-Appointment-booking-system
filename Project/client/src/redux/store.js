import {configureStore} from '@reduxjs/toolkit';   
import {combineReducers} from 'redux';
import { alertsSlice } from './alertsReducer';
import { userSlice } from './userSlice';

const rootReducer = combineReducers({
    alerts:alertsSlice.reducer,
    user:userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
