import { createSlice } from "@reduxjs/toolkit";

export const homeInfo = createSlice({
  name: "homeInfo",
  initialState: {
    games: [],
    game_masters: [],
    blogs: [],
  },
  reducers: {
    setHomeInfo: (state, action) => {
      state.games = action.payload.games;
      state.game_masters = action.payload.game_masters;
      state.blogs = action.payload.blogs;
    },
  },
});
export const { setHomeInfo } = homeInfo.actions;

export default homeInfo.reducer;
