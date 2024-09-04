import React from 'react';
import {useGetRecruitmentEventsQuery} from "../../redux/api/apiSlice";
import {RecruitmentEvent} from "../../types/recruitmentEvent";

interface RecruitmentEventListProps {
  JobApplicationId: number;
}
export default function RecruitmentEventList({JobApplicationId}: RecruitmentEventListProps) {
  const {data = [], isLoading, isSuccess, error} = useGetRecruitmentEventsQuery(JobApplicationId);

  const eventTypes = {
    phone_call: "Phone Call",
    job_interview: "Interview",
    technical_interview: "Technical Interview",
    coding_test: "Coding Test",
    coding_assignment: "Coding Assignment",
    offer: "Offer",
    rejection: "Rejection"
  }


  return (
    <div>
      {isLoading ? (<p>Loading...</p>) : (
        <div className={"max-w-xl flex flex-col gap-2 mt-4"}>
          {data?.recruitmentEvents?.map((event: RecruitmentEvent) => (
            <div key={event.id} className={"bg-gray-50 p-4"}>
              <span>{eventTypes[event.type]}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}