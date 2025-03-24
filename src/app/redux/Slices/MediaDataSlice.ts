import { createSlice } from "@reduxjs/toolkit";

interface ImageProps {
  aspect_ratio: number;
  file_path: string;
  height: number;
  vote_average: number;
  vote_count: number;
  width: number;
}
interface MediaDataProps {
  id: number;
  backdrops: ImageProps[];
}
const initialState: MediaDataProps = { id: 0, backdrops: [] };

const MediaDataSlice = createSlice({
  name: `MediaData`,
  initialState,
  reducers: {
    setMediaId: (state, action) => {
      state.id = action.payload;
    },
    setBackDropsImages: (state, action) => {
      state.backdrops = action.payload;
    },
  },
});
export const { setMediaId, setBackDropsImages } = MediaDataSlice.actions;
export default MediaDataSlice.reducer;
