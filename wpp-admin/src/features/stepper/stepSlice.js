import { createSlice } from '@reduxjs/toolkit';

export const stepSlice = createSlice({
  name: 'step',
  initialState: {
    step: 0,
    last: false,
    first: true,
  },
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      if (state.step === 2) {
        state.last = true;
      } else {
        state.last = false;
      }
      state.first = false;
    },
    previousStep: (state) => {
      state.step -= 1;
      if (state.step === 0) {
        state.first = true;
      } else {
        state.first = false;
      }
      state.last = false;
    },
    reset: (state) => {
      state.step = 0;
      state.last = false;
      state.first = true;
    },
    setCustomize: (state) => {
      state.step = 1;
      state.last = false;
      state.first = false;
    },
  },
});

export const {
  setCustomize, nextStep, previousStep, reset,
} = stepSlice.actions;

export const selectIsLast = (state) => state.step.last;
export const selectIsFirst = (state) => state.step.first;
export const selectStep = (state) => state.step.step;
export const selectState = (state) => state.step;

export default stepSlice.reducer;
