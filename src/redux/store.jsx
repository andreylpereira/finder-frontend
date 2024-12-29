import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import itemReducer from "./reducers/itemReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer
  },
});


export default store;