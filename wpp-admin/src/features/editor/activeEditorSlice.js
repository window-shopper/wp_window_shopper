import { createSlice } from '@reduxjs/toolkit';

export const activeEditorSlice = createSlice({
  name: 'activeEditor',
  initialState: {
    index: 0,
  },
  reducers: {
    setActiveEditor: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setActiveEditor } = activeEditorSlice.actions;

export const selectActiveEditor = (state) => state.activeEditor.index;

export default activeEditorSlice.reducer;
