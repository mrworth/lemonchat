import { createAsyncThunk } from '@reduxjs/toolkit';

export const addReply = createAsyncThunk(
  'posts/addReply',
  async (postData, { rejectWithValue }) => {
    try {
      console.log(postData);
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
          },
          body: JSON.stringify(postData)
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
