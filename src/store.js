import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import formVisibilityReducer from './slices/formVisibilitySlice'; 
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    posts: postReducer,
    formVisibility: formVisibilityReducer
  },
  middleware: [thunk],
});

export default store;
