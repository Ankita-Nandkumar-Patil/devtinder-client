import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import reqReducer from "./reqSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: reqReducer,
  }
})

export default appStore;