import { createSlice } from "@reduxjs/toolkit";

export const authUser = createSlice({
  name: "authUser",
  initialState: {
    id: null,
    accessToken: "",
    refreshToken: "",
    user: {
      id: null,
      email: "",
      user_name: "",
      first_name: "",
      last_name: "",
      picture: null,
      poster: null,
      country: null,
      time_zone: null,
      fav_game: [],
      birthday: null,
      about_me: null,
      is_active: null,
      role_type: [],
      date_joined: null,
    },
    gmInfo: {
      id: null,
      created_at: null,
      updated_at: null,
      name: "",
      about_me_game_master: null,
      experience_game_master: null,
      experience_player: null,
      average_reviews: null,
      total_reviews: null,
      discord_tag: null,
      game_tools: null,
      is_active: true,
      user: null,
      express_details_submitted: null,
      language: null,
      stripe_connect_id: null,
    },
    authenticate: false,
  },
  reducers: {
    setLoginUser: (state, action) => {
      state.id = action.payload.id;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.user = { ...state.user, ...action.payload.user };
      state.gmInfo = { ...state.gmInfo, ...action.payload.gmInfo };
      state.authenticate = true;
    },
    setUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setGmInfo: (state, action) => {
      state.gmInfo = { ...state.gmInfo, ...action.payload };
    },
    setSignOut: (state, action) => {
      state.gmInfo = {};
      state.user = {};
      state.accessToken = "";
      state.refreshToken = "";
      state.id = null;
      state.authenticate = false;
    },
    setPosterPic: (state, action) => {
      state.user.poster = action.payload;
    },
    setProfilePic: (state, action) => {
      state.user.picture = action.payload;
    },
    setAuthTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
  },
});
export const {
  setLoginUser,
  setUserInfo,
  setGmInfo,
  setSignOut,
  setPosterPic,
  setProfilePic,
  setAuthTokens,
} = authUser.actions;

export default authUser.reducer;
