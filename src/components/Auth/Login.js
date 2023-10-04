import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../Loading/loadingScreen";
import postData from "../../API/postData";
import VerifyOTP from "./VerifyOTP";

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Use the test method to check if the email matches the regex pattern
  return emailRegex.test(email);
}

const Login = () => {
  let [email, setEmail] = useState("");
  let [emailValidation, setEmailValidation] = useState(false);
  let [password, setPassword] = useState("");
  let [passwordValidation, setPasswordValidation] = useState(false);
  let [otpNotVerified, SetOtpNotVerified] = useState(false);

  let [showError, setShowError] = useState(false);
  let [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    if (e.target.value.length <= 50) {
      setEmail(e.target.value);
    }
    if (isValidEmail(e.target.value)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length <= 30) {
      setPassword(e.target.value);
      if (e.target.value.length >= 6) {
        setPasswordValidation(true);
      } else {
        setPasswordValidation(false);
      }
    }
  };

  async function fetchAPI() {
    const requestBody = {
      email: email,
      password: password,
    };
    const response = await postData("/login", requestBody);
    if (response.success) {

      Cookies.set("isLoggedIn", true);
      Cookies.set("jwt_token", response.jwt_token);
      Cookies.set("email", email);
      Cookies.set("role", response.role);
      window.location.href = "/";
    } else {
      if (response.errorCode === 16) {
        Cookies.set("email", email);

        SetOtpNotVerified(true);
        // alert("Please Verify OTP");
      } else {
        setLoading(false);
        alert(
          "Failed: " +
          response.message +
          "\n" +
          "ErrorCode: " +
          response.errorCode
        );
      }
    }
  }
  function handleSubmit() {
    if (passwordValidation && emailValidation) {
      // alert("Verified");
      fetchAPI();
      setLoading(true);
    } else {
      setShowError(true);
    }
  }

  return <>
    {otpNotVerified ? <VerifyOTP /> :
      (
        <div className="loginForm">
          <form className="form" action="">
            <h2 style={{ color: "#00264d" }}>Login</h2>
            <div>
              <label htmlFor="email">Enter Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {showError && !emailValidation ? (
              <p className="errorText">Enter a valid email</p>
            ) : null}
            <div>
              <label htmlFor="password">Enter Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {showError && !passwordValidation ? (
              <p className="errorText">Enter a valid password</p>
            ) : null}
            {loading ? (
              <LoadingScreen />
            ) : (
              <button type="button" onClick={handleSubmit}>
                Login
              </button>
            )}
          </form>
        </div>
      )

    }

  </>;
};
export default Login;
