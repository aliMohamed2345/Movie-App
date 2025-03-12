import { createSlice } from "@reduxjs/toolkit";
interface SearchSliceProps {
  URL: string;
  searchQuery: string;
}
const initialState: SearchSliceProps = {
  URL: "",
  searchQuery: "",
};

const SearchSlice = createSlice({
  name: `search`,
  initialState,
  reducers: {
    setURL: (state, action) => {
      state.URL = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setURL, setSearchQuery } = SearchSlice.actions;
export default SearchSlice.reducer;
