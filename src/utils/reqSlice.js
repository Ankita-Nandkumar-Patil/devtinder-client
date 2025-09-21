import { createSlice } from "@reduxjs/toolkit";

const reqSlice = createSlice({
  name: "reqests",
  initialState: null,
  reducers: {
    addRequests: (state, action)=> {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.data.filter(r=> r._id !== action.payload)
    }
  }
})

export const { addRequests, removeRequest } = reqSlice.actions;
export default reqSlice.reducer;