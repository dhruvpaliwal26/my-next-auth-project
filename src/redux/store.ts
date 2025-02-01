import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  // Redux DevTools Extension ko enable karne ke liye
  devTools: process.env.NODE_ENV !== 'production',  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



