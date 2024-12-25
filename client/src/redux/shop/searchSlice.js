import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchResults: [],
  isLoading:false
};

export const getSearchResults= createAsyncThunk(
  "/search/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:4415/api/shop/search/${keyword}`,

    );

    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults:(state) => {
      state.searchResults=[]
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults=action.payload.data
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults=[]
      })
  },
});

export const {resetSearchResults}=searchSlice.actions
export default searchSlice.reducer;
