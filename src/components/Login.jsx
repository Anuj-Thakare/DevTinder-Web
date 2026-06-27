import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
//import { BASE_URL } from "./utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true });
      //console.log(res.data);
      dispatch(addUser(res?.data?.data));
      return navigation("/");
    } catch (err) {
      setError(err?.response?.data || "Error: Invalid Credentials");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signUp", {firstName, lastName, emailId, password}, { withCredentials: true});
     //console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigation("/profile");
    } catch (err) {
      setError(err?.response?.data);
      //console.error(err);
    }
  }

  return (
    <div className="justify-items-center my-25">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-3xl">{isLoginForm ? "Login" : "Sign Up"}</h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base">First Name</legend>
                <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <p className="label">Required</p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base">Last Name</legend>
                <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <p className="label">Required</p>
              </fieldset>
            </>
          )
          }
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Email ID</legend>
            <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            <p className="label">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Password</legend>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="label">Required</p>
          </fieldset>
          <p className="text-red-700 text-base">{error}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary m-auto" onClick={isLoginForm? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p onClick={() => setIsLoginForm((value) => !value)} className="cursor-pointer m-auto">{isLoginForm? "New User? Sign Up here" : "Already have an account? Login here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login