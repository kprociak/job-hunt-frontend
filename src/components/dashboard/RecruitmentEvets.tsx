import React, {useEffect, useState} from 'react';
import Button from "../UI/Button";
import RecruitmentEventForm from "./RecruitmentEventForm";
import {RecruitmentEventType} from "../../types/recruitmentEventType";
import RecruitmentEventList from "./RecruitmentEventList";

interface AddEventButtonProps {
  type: RecruitmentEventType;
  label: string;
  setAddEventType: (type: RecruitmentEventType) => void;
}
export function AddEventButton({type, label, setAddEventType}: AddEventButtonProps) {
  return (
    <Button className={"bg-gray-200 hover:bg-gray-300"} title={label} onClick={() => setAddEventType(type)}>
      <img src={`/img/${type}.png`} className={"w-10"}/>
    </Button>
  );
}

interface RecruitmentEventsProps {
  JobApplicationId: number;
}

export default function RecruitmentEvents({JobApplicationId}: RecruitmentEventsProps) {

  const [addEventType, setAddEventType] = useState<RecruitmentEventType|null>(null);

  const eventTypes = [
    {type: "phone_call", label: "Phone Call"},
    {type: "job_interview", label: "Interview"},
    {type: "technical_interview", label: "Technical Interview"},
    {type: "coding_test", label: "Coding Test"},
    {type: "coding_assignment", label: "Coding Assignment"},
    {type: "offer", label: "Offer"},
    {type: "rejection", label: "Rejection"},
  ];

  useEffect(() => {
    setAddEventType(null);
  }, [JobApplicationId]);

  return (
    <div>
      <h3 className={"text-2xl mb-3"}>Recruitment Events</h3>
      <h4 className={"text-lg"}>Add event:</h4>
      <div className="flex gap-1">
        {eventTypes.map((eventType) => (
          //@ts-ignore
          <AddEventButton key={eventType.type} type={eventType.type} label={eventType.label} setAddEventType={setAddEventType} />
        ))}
      </div>
      {addEventType && (
        <div>
          <RecruitmentEventForm
            type={addEventType}
            JobApplicationId={JobApplicationId}
            setType={setAddEventType} typeName={eventTypes.find((eventType) => eventType.type === addEventType)?.label || ""}
          />
        </div>
      )}
      <RecruitmentEventList JobApplicationId={JobApplicationId} />

    </div>
  );
}