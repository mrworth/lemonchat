import { createSlice } from '@reduxjs/toolkit';

export const focusPostSlice = createSlice({
  name: 'focusPost',
  initialState: {
    focusedPosts: [], // Entries are the focused post ids
    focusedTopic: '',
    contentPanePosition: {
      contentPaneX: 0,
      contentPaneY: 0
    }
  },
  reducers: {
    focusPost: (state, action) => {
      const { postId, parentPostId, topic } = action.payload;
      const postIndex = state.focusedPosts.indexOf(postId)
      const postLength = state.focusedPosts.length
      if(topic !== ''){
        if(postLength === 0 || state.focusedPosts.indexOf(postId) === -1){
            state.focusedTopic = topic;
            state.focusedPosts = [postId];
        }else{
            state.focusedTopic = '';
            state.focusedPosts = [];
        }
      } else if (postIndex !== -1){
        state.focusedPosts.length = state.focusedPosts.indexOf(postId) 
      } else{
        state.focusedPosts.length = state.focusedPosts.indexOf(parentPostId) + 1
        state.focusedPosts.push(postId);
      }
    }

  }
});

export const selectFocusedPosts = (state) => state.focusPost.focusedPosts;
export const selectFocusedTopic = (state) => state.focusPost.focusedTopic;
export const selectContentPanePosition = (state) => state.focusPost.contentPanePosition;

export const { focusPost } = focusPostSlice.actions;

export default focusPostSlice.reducer;
