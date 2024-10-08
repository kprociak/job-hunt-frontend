import React from 'react';
import {useSelector} from "react-redux";
import {JobApplication} from "../../types/JobApplication";
import RecruitmentEvents from "./RecruitmentEvets";
import Button from "../UI/Button";

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

interface ApplicationSalaryFieldProps {
  label: string;
  from: number;
  to: number;
}

function ApplicationSalaryField({label, from, to}: ApplicationSalaryFieldProps) {
  return (
    <>
      {(from || to) ? (
        <div className={"pb-4"}>
          <span className={"block text-xs"}>{label}</span>
          <span className={"block"}>
            {from} - {to}
          </span>
        </div>
      ) : ''}
    </>
  );
}

interface ApplicationDetailsProps {
  application: JobApplication;
  setSelectedApplication: (application: JobApplication | null) => void;
}

export default function ApplicationDetails({application, setSelectedApplication}: ApplicationDetailsProps) {

  return (
    <div>
      <div className={"mb-6 flex justify-start gap-4"}>
        <h2 className={"text-2xl"}>Application Details</h2>
        <Button className={"bg-gray-200 hover:bg-gray-300"} title={"Edit"} onClick={() => setSelectedApplication(application)}>
          <img alt={"Edit"} src={"/img/edit.png"} className={"w-5"}/>
        </Button>
      </div>
      <div>
        <ApplicationDetailsField label={"Company Name"} value={application.company_name} />
        <ApplicationDetailsField label={"Position"} value={application.job_title} />
        <ApplicationDetailsField label={"Offer URL"} value={application.offer_url} isLink={true}/>
        <ApplicationDetailsField label={"Application Date"} value={application.application_date} />
        <ApplicationDetailsField label={"Status"} value={application.status} />
        <ApplicationSalaryField label={"Offered salary"} from={application.offered_salary_from} to={application.offered_salary_to} />
        <ApplicationSalaryField label={"Expected salary"} from={application.expected_salary_from} to={application.expected_salary_to} />
        <ApplicationDetailsField label={"Notes"} value={application.notes} />
      </div>
      <div>
        <RecruitmentEvents JobApplicationId={application.id}/>
      </div>
    </div>
  );
}