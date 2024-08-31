import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import jobApplicationReducer from "./slices/JobApplicationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    jobApplications: jobApplicationReducer,
  },
});

export default store;