import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function DashboardPage() {
  //@ts-ignore
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      console.log("No user found, redirecting to login");
      //navigate("/login");
    }
    else {
      console.log("User found, welcome!");
    }
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}