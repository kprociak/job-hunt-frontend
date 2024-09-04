import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./api/apiSlice";
import userReducer from "./slices/UserSlice";
import jobApplicationReducer from "./slices/JobApplicationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    jobApplications: jobApplicationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;