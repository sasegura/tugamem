// import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./slices/counterSlice";
import stripeData from "./slices/stripeData";
// import { createStore } from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authUser from "./slices/authUser";
import otherDetails from "./slices/otherDetails";
import homeInfo from "./slices/homedetails";

let combinedReducer = combineReducers({
  counter: counterSlice,
  stripeData: stripeData,
  authUser: authUser,
  otherDetails: otherDetails,
  homeInfo: homeInfo,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["stripeData", "authUser", homeInfo],
};
const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // .concat(logger),
});
persistStore(store);

export { store };

// export const store = configureStore({
//   reducer: {counter:counterSlice,
//   counter2:counter2},
// })
