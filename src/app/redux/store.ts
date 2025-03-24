import { configureStore, combineReducers } from "@reduxjs/toolkit";
import MediaSlice from "./Slices/MediaSlice";
import SearchSlice from "./Slices/SearchSlice";
import ActorSlice from "./Slices/ActorSlice";
import MediaDataSlice from "./Slices/MediaDataSlice";
const RootReducers = combineReducers({
  Media: MediaSlice,
  Search: SearchSlice,
  Actor: ActorSlice,
  MediaData: MediaDataSlice,
});

export const store = configureStore({
  reducer: RootReducers,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
