import { createSlice } from '@reduxjs/toolkit';

export const previewSlice = createSlice({
  name: 'preview',
  initialState: {
    selectedIndex: -1,
    responsiveCheckWidth: 400,
  },
  reducers: {
    selectPreview: (state, action) => {
      state.selectedIndex = action.payload;
      switch (action.payload) {
        case 0:
          state.responsiveCheckWidth = 500;
          break;
        case 1:
          state.responsiveCheckWidth = 800;
          break;
        default:
          state.responsiveCheckWidth = 500;
      }
    },
    setWidth: (state, action) => {
      state.responsiveCheckWidth = action.payload;
    },
  },
});

export const { selectPreview, setWidth } = previewSlice.actions;

export const selectSelectedIndex = (state) => state.preview.selectedIndex;
export const selectResponsiveCheckWidth = (state) => state.preview.responsiveCheckWidth;

export default previewSlice.reducer;
