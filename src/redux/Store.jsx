// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slices/artistDetailSlice'

import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//       },
// })
import thunk from "redux-thunk";

let composeWithDevTools;
composeWithDevTools = require("redux-devtools-extension").composeWithDevTools;
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
