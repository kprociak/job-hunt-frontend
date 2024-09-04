import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {JobApplication} from "../../types/JobApplication";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobApplications: builder.query<JobApplication[], void>({
      query: () => "job-applications",
    }),
    addJobApplication: builder.mutation({
      query: (jobApplication) => ({
        url: "job-applications",
        method: "POST",
        body: jobApplication,
      }),
    }),
    updateJobApplication: builder.mutation({
      query: ({id, ...jobApplication}) => ({
        url: `job-applications/${id}`,
        method: "PUT",
        body: jobApplication,
      }),
    }),
    deleteJobApplication: builder.mutation({
      query: (id) => ({
        url: `job-applications/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetJobApplicationsQuery,
  useAddJobApplicationMutation,
  useUpdateJobApplicationMutation,
  useDeleteJobApplicationMutation
} = apiSlice;