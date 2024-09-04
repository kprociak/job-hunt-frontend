import {createSlice} from "@reduxjs/toolkit";
import {JobApplication} from "../../types/JobApplication";

const initialState = {
  jobApplications: <JobApplication[]>[],
}

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {
    addJobApplication(state, action) {
      state.jobApplications.push(action.payload);
    },
    removeJobApplication(state, action) {
      state.jobApplications = state.jobApplications.filter(jobApplication => jobApplication.id !== action.payload.id);
    },
    updateJobApplication(state, action) {
      const {id, ...jobApplication} = action.payload;
      const index = state.jobApplications.findIndex(jobApplication => jobApplication.id === id);
      state.jobApplications[index] = {...state.jobApplications[index], ...jobApplication};
    },
    loadJobApplications(state, action) {
      state.jobApplications = action.payload;
    }
  }
});

export const {
  addJobApplication,
  removeJobApplication,
  updateJobApplication,
  loadJobApplications,
} = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;