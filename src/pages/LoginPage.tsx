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

    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        })

        const data = await res.json();
        if (data.error) {
          setLoading(false);
          addMessage(data.error, "error");
          return;
        }

        localStorage.setItem("token", data.access_token);
        dispatch(updateUser({email: data.email, name: data.name}));
        navigate("/dashboard");
      }
      catch (err) {
        addMessage("Something went wrong", "error");
        setLoading(false);
      }

    })();
  }

  return (
    <CenterDiv>
      <div>
        <h1 className={"font-bold text-2xl my-2"}>Log in</h1>
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