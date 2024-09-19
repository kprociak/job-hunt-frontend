import React from 'react';
import {JobApplication} from "../../../types/JobApplication";
import {formatDistance} from "date-fns";

export interface ApplicationListItemProps {
  application: JobApplication;
  selected: boolean;
  onClick: () => void;
}
export default function ApplicationListItem({application, selected, onClick}: ApplicationListItemProps) {

  const colors = {
    new: 'bg-gray-50',
    ongoing: 'bg-green-50',
    rejected: 'bg-red-50',
    offer: 'bg-purple-50',
  }

  const lastUpdate = formatDistance(new Date(application.last_update_date), new Date(), {addSuffix: true});

  return (
    <div
      className={`flex justify-between p-4 my-2 rounded-2xl ${colors[application.status]} ${selected ? 'border border-gray-300 shadow-lg' : ''}`}
      onClick={onClick}
    >
      <div className="">
        <h3 className={"text-lg font-semibold"}>{application.company_name}</h3>
        <h4>{application.job_title}</h4>
      </div>
      <div className={"text-sm"}>
        <p>Status: <span className={"font-semibold"}>{application.status}</span></p>
        <p>Application Date: <span className={"font-semibold"}>{application.application_date}</span></p>
        <p>Last update: <span className={"font-semibold"}>{lastUpdate}</span></p>
      </div>
    </div>
);
}