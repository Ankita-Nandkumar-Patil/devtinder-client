import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeedData: (state, action) => {
      return state.data.filter(item => item._id !== action.payload)
    }
  }
})

export const { addFeedData, removeFeedData } = feedSlice.actions;
export default feedSlice.reducer;