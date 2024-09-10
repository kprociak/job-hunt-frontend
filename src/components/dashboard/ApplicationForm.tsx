import React, {useContext, useEffect, useState} from 'react';
import TextInput from "../UI/TextInput";
import {format} from 'date-fns';
import Button from "../UI/Button";
import SalaryInput from "../UI/SalaryInput";
import Textarea from "../UI/Textarea";
import {FlashMessageContext} from "../flashMessages/FlashMessagePovider";
import {useDispatch} from "react-redux";
//import {addJobApplication} from "../../redux/slices/JobApplicationSlice";
import {useAddJobApplicationMutation, useUpdateJobApplicationMutation} from "../../redux/api/apiSlice";
import {JobApplication} from "../../types/JobApplication";

interface ApplicationFormProps {
  application: JobApplication | null;
  setSelectedApplication: (application: JobApplication | null) => void;
}

export default function ApplicationForm({application, setSelectedApplication}: ApplicationFormProps) {
  const [companyName, setCompanyName] = useState(application?.company_name || "");
  const [jobTitle, setJobTitle] = useState(application?.job_title || "");
  const [offerUrl, setOfferUrl] = useState(application?.offer_url || "");
  const [applicationDate, setApplicationDate] = useState(application?.application_date || format(new Date(), "yyyy-MM-dd"));
  const [offerSalaryFrom, setOfferSalaryFrom] = useState(application?.offered_salary_from || 0);
  const [offerSalaryTo, setOfferSalaryTo] = useState(application?.offered_salary_to || 0);
  const [expectedSalaryFrom, setExpectedSalaryFrom] = useState(application?.expected_salary_from || 0);
  const [expectedSalaryTo, setExpectedSalaryTo] = useState(application?.expected_salary_to || 0);
  const [notes, setNotes] = useState(application?.notes || "");

  const {addMessage} = useContext(FlashMessageContext);

  const [addJobApplication, {isLoading, isError, isSuccess}] = useAddJobApplicationMutation();
  const [updateJobApplication, {isLoading: editLoading, isError: editError, isSuccess: editSuccess}] = useUpdateJobApplicationMutation();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (application) {

      updateJobApplication({
        id: application.id,
        company_name: companyName,
        job_title: jobTitle,
        offer_url: offerUrl,
        application_date: applicationDate,
        offered_salary_from: offerSalaryFrom,
        offered_salary_to: offerSalaryTo,
        expected_salary_from: expectedSalaryFrom,
        expected_salary_to: expectedSalaryTo,
        notes
      });
    }
    else {
      addJobApplication({
        company_name: companyName,
        job_title: jobTitle,
        offer_url: offerUrl,
        application_date: applicationDate,
        offered_salary_from: offerSalaryFrom,
        offered_salary_to: offerSalaryTo,
        expected_salary_from: expectedSalaryFrom,
        expected_salary_to: expectedSalaryTo,
        notes
      });
    }

    setCompanyName("");
    setJobTitle("");
    setOfferUrl("");
    setApplicationDate(format(new Date(), "yyyy-MM-dd"));
    setOfferSalaryFrom(0);
    setOfferSalaryTo(0);
    setExpectedSalaryFrom(0);
    setExpectedSalaryTo(0);
    setNotes("");

    setSelectedApplication(null);
  }

  useEffect(() => {
    if (isError) {
      addMessage("Error submitting application", "error");
    }

    if (isSuccess) {
      addMessage("Application submitted", "success");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <h2 className={"text-2xl"}>{application ? 'Edit' : 'Add new'} job application</h2>
      <form onSubmit={handleSubmit} className={"max-w-lg"}>
        <TextInput label={"Company name"} placeholder={"Company name"} value={companyName} onChange={setCompanyName} inputClassName={"w-full"} />
        <TextInput label={"Job Title"} placeholder={"Job Title"} value={jobTitle} onChange={setJobTitle} inputClassName={"w-full"}/>
        <TextInput label={"Offer URL"} placeholder={"Offer URL"} value={offerUrl} onChange={setOfferUrl} inputClassName={"w-full"}/>
        <TextInput label={"Application Date"} placeholder={"Application Date"} value={applicationDate} onChange={setApplicationDate} type={"date"} />
        <SalaryInput
          label={"Salary from the offer"}
          from={offerSalaryFrom}
          to={offerSalaryTo}
          onFromChange={setOfferSalaryFrom}
          onToChange={setOfferSalaryTo}

        />
        <SalaryInput
          label={"Provided expected salary"}
          from={expectedSalaryFrom}
          to={expectedSalaryTo}
          onFromChange={setExpectedSalaryFrom}
          onToChange={setExpectedSalaryTo}
        />
        <Textarea label={"Notes"} value={notes} onChange={setNotes} />
        <div className={"mt-2 flex gap-2"}>
          <Button type={"submit"} disabled={isLoading}>Submit</Button>
          {application && <Button type={"button"} onClick={() => setSelectedApplication(null)} className={"bg-gray-200 hover:bg-gray-300 text-slate-900"}>Cancel</Button>}
        </div>
      </form>
    </div>
  );
}