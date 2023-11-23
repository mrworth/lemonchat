import { createSlice } from '@reduxjs/toolkit';

export const focusPostSlice = createSlice({
  name: 'focusPost',
  initialState: {
    focusedPosts: [], // Entries are the focused post ids
    focusedTopic: ''
  },
  reducers: {
    focusPost: (state, action) => {
      const { postId, topic } = action.payload;
      const postIndex = state.focusedPosts.indexOf(postId)
      if(topic !== ''){
        if(state.focusedPosts.length == 0 || state.focusedPosts.indexOf(postId) === -1){
            state.focusedTopic = topic;
            state.focusedPosts = [postId];
        }else{
            state.focusedTopic = '';
            state.focusedPosts = [];
        }
      } else if (postIndex !== -1){
        state.focusedPosts.length = state.focusedPosts.indexOf(postId) 
      } else{
        state.focusedPosts.push(postId);
      }
    }
  }
});

export const selectFocusedPosts = (state) => state.focusPost.focusedPosts;
export const selectFocusedTopic = (state) => state.focusPost.focusedTopic;

export const { focusPost } = focusPostSlice.actions;

export default focusPostSlice.reducer;
