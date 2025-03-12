import { configureStore, combineReducers } from "@reduxjs/toolkit";
import MediaSlice from "./Slices/MediaSlice";
import SearchSlice from "./Slices/SearchSlice";
const RootReducers = combineReducers({
  Media: MediaSlice,
  Search: SearchSlice,
});

export const store = configureStore({
  reducer: RootReducers,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
