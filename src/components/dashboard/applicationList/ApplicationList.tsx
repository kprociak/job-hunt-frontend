import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FlashMessageContext} from "../../flashMessages/FlashMessagePovider";
import {loadJobApplications} from "../../../redux/slices/JobApplicationSlice";

export default function ApplicationList() {
  const dispatch = useDispatch();
  // @ts-ignore
  const applications = useSelector((state) => state.jobApplications.jobApplications);
  const {addMessage} = React.useContext(FlashMessageContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}job-applications`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!res.ok) {
          addMessage("Error fetching applications", "error");
          return;
        }
        const data = await res.json();

        dispatch(loadJobApplications(data.jobApplications));

        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl">Your applications</h2>
      {applications?.length > 0 ? (
        <ul>

        </ul>
      ) : (
        <p>No applications found</p>
      )}
    </div>
  );
}