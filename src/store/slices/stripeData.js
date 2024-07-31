import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: null,
};

export const stripeData = createSlice({
  name: "striprKey",
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
    decrement2: (state) => {
      state.key -= 1;
    },
  },
});

export const { setKey, decrement2 } = stripeData.actions;

export default stripeData.reducer;
