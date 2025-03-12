import { createSlice } from "@reduxjs/toolkit";

interface MediaProps {
  category: string;
  media: `movie` | `tv` | `person`;
}
const initialState: MediaProps = {
  category: "",
  media: `movie`,
};

const mediaSlice = createSlice({
  name: `Media`,
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { setMedia, setCategory } = mediaSlice.actions;
export default mediaSlice.reducer;
