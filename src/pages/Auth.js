import { Login, Register } from "../components/Auth";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Auth/auth.css";
import { authImage } from "../assets";
import VerifyOTP from "../components/Auth/VerifyOTP";
import verifyLogin from "../constants/verifyLogin";

const Auth = () => {
  let [newUser, setNewUser] = useState(true);
  const text1 = "Not a new User? Click here to Login";
  const text2 = "New User? Click here to Register";
  let [text, setText] = useState(text1);
  let navigate = useNavigate();

  useEffect(() => {
    if (verifyLogin()) {
      navigate("/shops");
    }
  }, []);

  function setUser() {
    if (text == text1) {
      setNewUser(false);
      setText(text2);
    } else {
      setNewUser(true);
      setText(text1);
    }
  }

  return (
    <>
      <div className="authContainer">
        <img className="authImage" src={authImage} alt="" />
        <div>
          {/* <Routes>
            <Route path="/" Component={Register}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/verifyOtp" Component={VerifyOTP}></Route>
          </Routes> */}
          {newUser ? <Register /> : <Login />}
          <div className="newUserText">
            <p onClick={setUser}>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
