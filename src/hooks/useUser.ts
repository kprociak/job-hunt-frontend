import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {updateUser} from "../redux/slices/UserSlice";


export default function useUser() {
  // @ts-ignore
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userError, setUserError] = useState(false);

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
            setUserError(false);
          })
          .catch(err => {
            console.log(err);
            setUserError(true);
          })
      }
      else {
        setUserError(true);
      }
    }
    else {
      setUserError(false);
    }
  }, [user]);


  return {user: user, userError: userError};
}