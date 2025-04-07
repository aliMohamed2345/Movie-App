import { createSlice } from "@reduxjs/toolkit";

interface MediaProps {
  category: string;
  media: `movie` | `tv` | `person`;
  genre: number;
}
const initialState: MediaProps = {
  category: "",
  media: `movie`,
  genre: 0,
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
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});
export const { setGenre, setMedia, setCategory } = mediaSlice.actions;
export default mediaSlice.reducer;
