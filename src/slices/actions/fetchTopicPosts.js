import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopicPosts = createAsyncThunk(
  'posts/fetchTopicPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/posts/topics', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
