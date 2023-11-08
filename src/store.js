import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice'; 
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: postReducer,
  middleware: [thunk],
});

export default store;