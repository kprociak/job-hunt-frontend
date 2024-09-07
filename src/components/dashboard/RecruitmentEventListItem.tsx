import React from 'react';
import {RecruitmentEvent} from "../../types/recruitmentEvent";
interface RecruitmentEventListItemProps {
  event: RecruitmentEvent;
  setSelectedEventId: (id: number) => void;
  selectedEventId: number;
}
export default function RecruitmentEventListItem({event, setSelectedEventId, selectedEventId}: RecruitmentEventListItemProps) {

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
    <div className={"bg-gray-50 p-4 cursor-pointer rounded-lg"} onClick={() => setSelectedEventId(event.id)}>
      <span>{eventTypes[event.type]}</span>
      {selectedEventId === event.id && (
        <div className={"text-xs"}>
          <p>Date: <span>{event.date}</span></p>
          {event.time && <p>Time: <span>{event.time}</span></p>}
          {event.url && <p>URL: <a>{event.url}</a></p>}
          {event.location && <p>Location: <span>{event.location}</span></p>}
          {event.notes && <p>Notes:<span>{event.notes}</span></p>}
        </div>
      )}

    </div>
  );
}