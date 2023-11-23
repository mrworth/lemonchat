import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import focusPostReducer from './slices/focusPostSlice';
import formVisibilityReducer from './slices/formVisibilitySlice'; 
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    posts: postReducer,
    focusPost: focusPostReducer,
    formVisibility: formVisibilityReducer
  },
  middleware: [thunk],
});

export default store;
