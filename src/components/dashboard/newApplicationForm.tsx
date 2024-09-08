import React, {useContext, useEffect, useState} from 'react';
import TextInput from "../UI/TextInput";
import {format} from 'date-fns';
import Button from "../UI/Button";
import SalaryInput from "../UI/SalaryInput";
import Textarea from "../UI/Textarea";
import {FlashMessageContext} from "../flashMessages/FlashMessagePovider";
import {useDispatch} from "react-redux";
//import {addJobApplication} from "../../redux/slices/JobApplicationSlice";
import {useAddJobApplicationMutation} from "../../redux/api/apiSlice";
export default function NewApplicationForm(){
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [offerUrl, setOfferUrl] = useState("");
  const [applicationDate, setApplicationDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [offeredSalaryFrom, setOfferSalaryFrom] = useState(0);
  const [offeredSalaryTo, setOfferSalaryTo] = useState(0);
  const [expectedSalaryFrom, setExpectedSalaryFrom] = useState(0);
  const [expectedSalaryTo, setExpectedSalaryTo] = useState(0);
  const [notes, setNotes] = useState("");

  const {addMessage} = useContext(FlashMessageContext);

  const [addJobApplication, {isLoading, isError, isSuccess}] = useAddJobApplicationMutation();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addJobApplication({
      company_name: companyName,
      job_title: jobTitle,
      offer_url: offerUrl,
      application_date: applicationDate,
      offered_salary_from :offeredSalaryFrom,
      offered_salary_to: offeredSalaryTo,
      expected_salary_from: expectedSalaryFrom,
      expected_salary_to: expectedSalaryTo,
      notes
    });

    setCompanyName("");
    setJobTitle("");
    setOfferUrl("");
    setApplicationDate(format(new Date(), "yyyy-MM-dd"));
    setOfferSalaryFrom(0);
    setOfferSalaryTo(0);
    setExpectedSalaryFrom(0);
    setExpectedSalaryTo(0);
    setNotes("");
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
      <h2 className={"text-2xl"}>Add new job application</h2>
      <form onSubmit={handleSubmit} className={"max-w-lg"}>
        <TextInput label={"Company name"} placeholder={"Company name"} value={companyName} onChange={setCompanyName} inputClassName={"w-full"} />
        <TextInput label={"Job Title"} placeholder={"Job Title"} value={jobTitle} onChange={setJobTitle} inputClassName={"w-full"}/>
        <TextInput label={"Offer URL"} placeholder={"Offer URL"} value={offerUrl} onChange={setOfferUrl} inputClassName={"w-full"}/>
        <TextInput label={"Application Date"} placeholder={"Application Date"} value={applicationDate} onChange={setApplicationDate} type={"date"} />
        <SalaryInput
          label={"Salary from the offer"}
          from={offeredSalaryFrom}
          to={offeredSalaryTo}
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
        <Button type={"submit"} disabled={isLoading}>Submit</Button>
      </form>
    </div>
  );
}