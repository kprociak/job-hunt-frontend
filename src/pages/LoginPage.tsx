import React, {useContext, useState} from 'react'
import TextInput from "../components/UI/TextInput";
import CenterDiv from "../components/UI/CenterDiv";
import Button from "../components/UI/Button";
import {useDispatch} from "react-redux";
import {updateUser} from "../redux/slices/UserSlice";
import {useNavigate} from "react-router-dom";
import {FlashMessageContext} from "../components/flashMessages/FlashMessagePovider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {addMessage} = useContext(FlashMessageContext)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      //todo: show error flash message
      addMessage("Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setLoading(false);
          console.log(data.error);
        }

        localStorage.setItem("token", data.access_token);
        dispatch(updateUser({email: data.email, name: data.name}));
        navigate("/dashboard");

      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <CenterDiv>
      <div>
        <h1 className={"font-bold text-2xl my-2"}>Log In</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput label={"Email"} placeholder={"Email"} value={email} onChange={setEmail} type={"email"}/>
        <TextInput label={"Password"} placeholder={"******"} value={password} onChange={setPassword} type={"password"}/>
        <div className={"mt-4"}>
          <Button className={"w-full"} type={"submit"} disabled={loading}>Log in</Button>
        </div>
      </form>
    </CenterDiv>
  )
}