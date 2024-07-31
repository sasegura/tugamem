import { createSlice } from "@reduxjs/toolkit";

export const otherDetails = createSlice({
  name: "authUser",
  initialState:{
   languages:[],
   gamesList:[],
   timezons:[],
   countries:[]
  },
  reducers: {
  setLanguages:(state,action)=>{
    state.languages=action.payload
  },
  setGameList:(state,action)=>{
    state.gamesList=action.payload
  },
  setCountries:(state,action)=>{
    state.countries=action.payload
  },
  setTimezones:(state,action)=>{
    state.timezons=action.payload
  },
   
  },
});
export const { setCountries,setGameList,setLanguages,setTimezones} =
otherDetails.actions;

export default otherDetails.reducer;