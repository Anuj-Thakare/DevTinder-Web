import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
//import { BASE_URL } from "./utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState("anuj@gmail.com");
  const [password, setPassword] = useState("Anuj@123");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login", {
      emailId,
      password
    },{withCredentials: true});
    //console.log(res.data);
    dispatch(addUser(res.data));
    return navigation("/");
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="justify-items-center my-25">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-3xl">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Email ID</legend>
            <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            <p className="label">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Password</legend>
            <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="label">Required</p>
          </fieldset>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login