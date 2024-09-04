import React from 'react';
import {useSelector} from "react-redux";
import {JobApplication} from "../../types/JobApplication";
import RecruitmentEvents from "./RecruitmentEvets";

interface ApplicationDetailsProps {
  application: JobApplication;
}

interface ApplicationDetailsFieldProps {
  label: string;
  value: string;
  isLink?: boolean;
}
function ApplicationDetailsField({label, value, isLink}: ApplicationDetailsFieldProps) {
  return (
    <div className={"pb-4"}>
      <span className={"block text-xs"}>{label}</span>
      <span className={"block"}>
        {isLink ? <a href={value} target={"_blank"} className={"text-blue-700 hover:underline"}>{value}</a> : value}
      </span>
    </div>
  );
}

export default function ApplicationDetails({application}: ApplicationDetailsProps) {

  return (
    <div>
      <div className={"mb-6"}>
        <h2 className={"text-2xl"}>Application Details</h2>
      </div>
      <div>
        <ApplicationDetailsField label={"Company Name"} value={application.company_name} />
        <ApplicationDetailsField label={"Position"} value={application.job_title} />
        <ApplicationDetailsField label={"Offer URL"} value={application.offer_url} isLink={true}/>
        <ApplicationDetailsField label={"Status"} value={application.status} />
      </div>
      <div>
        <RecruitmentEvents JobApplicationId={application.id}/>
      </div>
    </div>
  );
}