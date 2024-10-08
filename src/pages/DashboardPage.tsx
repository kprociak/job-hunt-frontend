import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../redux/slices/UserSlice";
import JobApplicationSlice from "../redux/slices/JobApplicationSlice";
import ApplicationList from "../components/dashboard/applicationList/ApplicationList";
import ApplicationForm from "../components/dashboard/ApplicationForm";
import ApplicationDetails from "../components/dashboard/ApplicationDetails";
import {JobApplication} from "../types/JobApplication";
import useUser from "../hooks/useUser";

export default function DashboardPage() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const {user, userError} = useUser();

  const [editApplication, setEditApplication] = useState<JobApplication | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(updateUser({email: "", name: ""}));
    navigate("/login");
  }

  useEffect(() => {
    if (userError) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className={"flex flex-col h-screen"}>
      <div className={"flex justify-between items-center w-full p-4"}>
        <div className={"flex items-center"}>
          <img src={"/resume.png"} className={"w-10"} alt={"JobHunt Logo"}/>
          <div className={"px-4"}>Hi, {user.name}</div>
        </div>
        <div>
          <button>Log out</button>
        </div>
      </div>
      <div className={"flex px-10 gap-10 max-h-[calc(100%-74px)]"}>
        <div className={"basis-1/2 h-full"}>
          <ApplicationList selectedApplication={selectedApplication} setSelectedApplication={setSelectedApplication}/>
        </div>
        <div className={"basis-1/2  h-full overflow-y-scroll no-scrollbar px-1"}>
          {!selectedApplication || editApplication ? (
            <ApplicationForm application={editApplication} setSelectedApplication={setEditApplication}/>
          ) : (
            <ApplicationDetails application={selectedApplication} setSelectedApplication={setEditApplication}/>
          )}
        </div>
      </div>
    </div>
  )
}