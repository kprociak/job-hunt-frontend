import React from 'react';
import {JobApplication} from "../../../types/JobApplication";

export interface ApplicationListItemProps {
  application: JobApplication;
  selected: boolean;
  onClick: () => void;
}
export default function ApplicationListItem({application, selected, onClick}: ApplicationListItemProps) {
  return (
    <div
      className={`flex justify-between p-4 my-2 rounded-2xl ${selected ? 'bg-sky-200' : 'bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="">
        <h3 className={"text-lg font-semibold"}>{application.company_name}</h3>
        <h4>{application.job_title}</h4>
      </div>
      <div>
        <p>Status: {application.status}</p>
        <p>Application Date: {application.application_date}</p>
      </div>
    </div>
  );
}