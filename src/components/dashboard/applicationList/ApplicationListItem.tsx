import React from 'react';
import {JobApplicationType} from "../../../types/JobApplicationType";

export interface ApplicationListItemProps {
  application: JobApplicationType;
}
export default function ApplicationListItem({application}: ApplicationListItemProps) {
  return (
    <div className={"flex justify-between p-4 my-2 bg-gray-50 rounded-2xl"}>
      <div className="">
        <h3 className={"text-lg font-semibold"}>{application.companyName}</h3>
        <h4>{application.position}</h4>
      </div>
      <div>
        <p>Status: {application.status}</p>
        <p>Application Date: {application.ApplicationDate}</p>
      </div>
    </div>
  );
}