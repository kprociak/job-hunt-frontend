import React, {useContext, useEffect, useState} from 'react';
import TextInput from "../UI/TextInput";
import {format} from "date-fns";
import Textarea from "../UI/Textarea";
import {useAddRecruitmentEventMutation} from "../../redux/api/apiSlice";
import {RecruitmentEventType} from "../../types/recruitmentEventType";
import Button from "../UI/Button";
import {FlashMessageContext} from "../flashMessages/FlashMessagePovider";

interface RecruitmentEventFormProps {
  JobApplicationId: number;
  type: RecruitmentEventType;
  typeName?: string;
  setType: (type: RecruitmentEventType | null) => void;
}

export default function RecruitmentEventForm({JobApplicationId, type, typeName, setType}: RecruitmentEventFormProps) {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [url, setEventUrl] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [addRecruitmentEvent, {isLoading, isError, isSuccess}] = useAddRecruitmentEventMutation();

  const {addMessage} = useContext(FlashMessageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addRecruitmentEvent({
      job_application_id: JobApplicationId,
      type: type,
      date: date,
      time: time,
      location: location,
      url: url,
      notes: notes
    });

    setType(null);
  }

  useEffect(() => {
    if (isError) {
      console.log("Error adding event");
      addMessage("Error adding event", "error");
    }

    if (isSuccess) {
      console.log("Event added");
      addMessage("Event added", "success");
    }
  }, [isError, isSuccess]);

  return (
    <div className={"mb-10"}>
      <h3 className={"text-xl mt-4"}>Add {typeName || "event"}</h3>
      <form onSubmit={handleSubmit}>
        <div className={"flex gap-6"}>
          <div>
            <TextInput label={"Date"} placeholder={"Date"} value={date} onChange={setDate} type={"date"}/>
            <TextInput label={"Time"} placeholder={"Time"} value={time} onChange={setTime} type={"time"}/>
            <Textarea label={"Notes"} value={notes} onChange={setNotes} />
          </div>
          <div className={"flex flex-col justify-between"}>
            <div>
              <TextInput label={"Location"} placeholder={"Location"} value={location} onChange={setLocation} />
              <TextInput label={"URL"} placeholder={"URL"} value={url} onChange={setEventUrl} />
            </div>
            <div className={"flex justify-end pb-3"}>
              <Button
                title={"Cancel"}
                onClick={() => setType(null)}
                className={"bg-gray-400 mr-2"}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button title={"Add Event"} type={"submit"} disabled={isLoading} className={"self-end"}>
                Add Event
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}