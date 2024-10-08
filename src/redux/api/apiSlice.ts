import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {JobApplication} from "../../types/JobApplication";
import {RecruitmentEvent} from "../../types/recruitmentEvent";

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
  tagTypes: ["JobApplication","RecruitmentEvent"],
  endpoints: (builder) => ({
    getJobApplications: builder.query<JobApplication[], void>({
      query: () => "job-applications",
      providesTags: ["JobApplication"],
    }),
    addJobApplication: builder.mutation({
      query: (jobApplication) => ({
        url: "job-applications",
        method: "POST",
        body: jobApplication,
      }),
      invalidatesTags: ["JobApplication"],
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
    getRecruitmentEvents: builder.query({
      query: (jobApplicationId: number) => `job-applications/${jobApplicationId}/recruitment-events`,
      providesTags: ["RecruitmentEvent"],
    }),
    addRecruitmentEvent: builder.mutation({
      query: (recruitmentEvent) => ({
        url: "recruitment-events",
        method: "POST",
        body: recruitmentEvent,
      }),
      invalidatesTags: ["RecruitmentEvent", "JobApplication"],
    }),
  }),
});

export const {
  useGetJobApplicationsQuery,
  useAddJobApplicationMutation,
  useUpdateJobApplicationMutation,
  useDeleteJobApplicationMutation,
  useGetRecruitmentEventsQuery,
  useAddRecruitmentEventMutation,
} = apiSlice;