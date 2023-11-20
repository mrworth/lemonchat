// formVisibilitySlice.js
import { createSlice } from '@reduxjs/toolkit';

export const formVisibilitySlice = createSlice({
  name: 'formVisibility',
  initialState: {
    visibleComponents: {} // Key: Component Name, Value: UUID
  },
  reducers: {
    toggleVisibility: (state, action) => {
      const { name, uuid } = action.payload;
      // If the component is currently visible and the UUID matches, hide it
      if (state.visibleComponents[name] === uuid) {
        delete state.visibleComponents[name];
      } else {
        // If not, set this component's UUID (show it)
        state.visibleComponents[name] = uuid;
      }
    }
  }
});

export const { toggleVisibility } = formVisibilitySlice.actions;

export default formVisibilitySlice.reducer;
