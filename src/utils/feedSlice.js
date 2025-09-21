import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // just the array of users
  reducers: {
    addFeedData: (state, action) => {
      return action.payload; // replace with new feed data
    },
    removeFeedData: (state, action) => {
      return state.filter((user) => user._id !== action.payload); // remove user by id
    },
  },
});

export const { addFeedData, removeFeedData } = feedSlice.actions;
export default feedSlice.reducer;
