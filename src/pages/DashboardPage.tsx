import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../redux/slices/UserSlice";
import JobApplicationSlice from "../redux/slices/JobApplicationSlice";
import ApplicationList from "../components/dashboard/applicationList/ApplicationList";
import NewApplicationForm from "../components/dashboard/newApplicationForm";
import ApplicationDetails from "../components/dashboard/ApplicationDetails";
import {JobApplication} from "../types/JobApplication";

export default function DashboardPage() {
  //@ts-ignore
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(updateUser({email: "", name: ""}));
    navigate("/login");
  }

  useEffect(() => {
    if (!user.email) {
      if (localStorage.getItem("token")){
        fetch(`${process.env.REACT_APP_BACKEND_URL}me`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (!res.ok) {
              throw new Error("Invalid token");
            }
            return res;
          })
          .then(res => res.json())
          .then(data => {
            dispatch(updateUser({email: data.email, name: data.name}));
          })
          .catch(err => {
            console.log(err);
            navigate("/login");
        })
      }
      else {
        navigate("/login");
      }
    }
    else {
      console.log("User found, welcome!");
    }
  }, [user]);

  return (
    <div>
      <div className={"flex justify-between items-center w-full p-4"}>
        <div className={"flex items-center"}>
          <img src={"/resume.png"} className={"w-10"}/>
          <div className={"px-4"}>Hi, {user.name}</div>
        </div>
        <div>
          <button>Log out</button>
        </div>
      </div>
      <div className={"flex p-10 gap-10"}>
        <div className={"basis-1/2"}>
          <ApplicationList selectedApplication={selectedApplication} setSelectedApplication={setSelectedApplication}/>
        </div>
        <div className={"basis-1/2"}>
          {selectedApplication ? (
            <ApplicationDetails application={selectedApplication} />
          ) : (
            <NewApplicationForm />
          )}
        </div>
      </div>
    </div>
  )
}