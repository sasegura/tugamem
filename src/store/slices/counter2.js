import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 2,
};

export const counterSlice = createSlice({
  name: "counter2",
  initialState,
  reducers: {
    increment2: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement2: (state) => {
      state.value -= 1;
    },
    incrementByAmount2: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment2, decrement2, incrementByAmount2 } =
  counterSlice.actions;

export default counterSlice.reducer;
