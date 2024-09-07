import React, {useState} from 'react';
import {useGetRecruitmentEventsQuery} from "../../redux/api/apiSlice";
import {RecruitmentEvent} from "../../types/recruitmentEvent";
import RecruitmentEventListItem from "./RecruitmentEventListItem";

interface RecruitmentEventListProps {
  JobApplicationId: number;
}
export default function RecruitmentEventList({JobApplicationId}: RecruitmentEventListProps) {
  const {data = [], isLoading, isSuccess, error} = useGetRecruitmentEventsQuery(JobApplicationId);
  const [selectedEventId, setSelectedEventId] = useState<number>(0);


  return (
    <div>
      {isLoading ? (<p>Loading...</p>) : (
        <div className={"max-w-xl flex flex-col gap-2 mt-4"}>
          {data?.recruitmentEvents?.map((event: RecruitmentEvent) => (
            <RecruitmentEventListItem
              event={event}
              setSelectedEventId={setSelectedEventId}
              selectedEventId={selectedEventId}
            />
          ))}
        </div>
      )}

    </div>
  );
}