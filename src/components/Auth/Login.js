import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../Loading/loadingScreen";
import postData from "../../API/postData";

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Use the test method to check if the email matches the regex pattern
  return emailRegex.test(email);
}

const Login = () => {
  let navigate = useNavigate();
  // console.log(Cookies.get("jwt_token"));
  let [email, setEmail] = useState("");
  let [emailValidation, setEmailValidation] = useState(false);
  let [password, setPassword] = useState("");
  let [passwordValidation, setPasswordValidation] = useState(false);

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
      Cookies.set("jwt_token", response.jwt_token);
      Cookies.set("email", email);
      // navigate("/dashboard");
      window.location.href = "/dashboard"

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
  function handleSubmit() {
    if(passwordValidation&&emailValidation){
      // alert("Verified");
      fetchAPI();
      setLoading(true);
    }else{
      setShowError(true);
    }
  }

  return (
    <div className="loginForm">
      <form className="form" action="">
        <h2 style={{color: "#00264d"}}>Login</h2>
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
  );
};
export default Login;
