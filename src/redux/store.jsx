import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import itemReducer from "./reducers/itemReducer";
import itemPublicReducer from "./reducers/itemPublicReducer"

const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    publicItems: itemPublicReducer,
  },
});


export default store;