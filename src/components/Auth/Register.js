import "../../styles/Auth/form.css";
import { useState } from "react";
import LoadingScreen from "../Loading/loadingScreen";
import VerifyOTP from "./VerifyOTP";
import Cookies from "js-cookie";
import postData from "../../API/postData";

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Use the test method to check if the email matches the regex pattern
  return emailRegex.test(email);
}
const errors = {
  name: "Full length length must be minimum 3",
  email: "Invalid Email",
  phone: "Invalid Phone",
  password: "Password length must be mininum 6",
  passwordMatching: "Passwords are not matching",
};

const Register = () => {
  async function registerAPI() {
    setLoading(true);
    const userObject = {
      fullName: name,
      email: email,
      phone: phone,
      password: password,
      repeatPassword: confirmPassword,
      role: "Admin",
    };
    const response = await postData("/register", userObject);
    if (response.success) {
      Cookies.set("email", email);
      setRegistrationComplete(true);
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
    if (
      nameValidation &&
      emailValidation &&
      phoneValidation &&
      passwordValidation &&
      confirmPasswordValidation &&
      password === confirmPassword
    ) {
      registerAPI();
    } else {
      alert("Passwords are not matching");
      setShowErrors(true);
    }
  }
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  // inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // validation checks

  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState(false);
  const [passwordMatching, setPasswordMatching] = useState(false);
  const handleNameChange = (e) => {
    if (e.target.value.length <= 50) {
      setName(e.target.value);
      if (e.target.value.length > 3) {
        setNameValidation(true);
      } else {
        setNameValidation(false);
      }
    }
  };
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
  const checkPasswords = () => {
    if (password === confirmPassword) {
      setPasswordMatching(true);
    }
  };
  const handlePasswordChange = (e) => {
    if (e.target.value.length <= 30) {
      setPassword(e.target.value);
      checkPasswords();
      if (e.target.value.length >= 6) {
        setPasswordValidation(true);
      } else {
        setPasswordValidation(false);
      }
    }
  };
  const handleConfirmPasswordChange = (e) => {
    if (e.target.value.length <= 30) {
      setConfirmPassword(e.target.value);
      checkPasswords();
      if (e.target.value.length >= 6) {
        setConfirmPasswordValidation(true);
      } else {
        setConfirmPasswordValidation(false);
      }
    }
  };
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const digitOnly = inputValue.replace(/\D/g, ""); // Remove non-digits
    setPhone(digitOnly);
    if (e.target.value.length === 10) {
      setPhoneValidation(true);
    } else {
      setPhoneValidation(false);
    }
  };
  return registrationComplete ? (
    <VerifyOTP />
  ) : (
    <div className="registerForm">
      <form className="form" action="">
        <h2 style={{ color: "#00264d" }}>Register</h2>

        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            name="fullName"
            id="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        {!nameValidation && showErrors ? (
          <p className="errorText">{errors.name}</p>
        ) : null}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        {!emailValidation && showErrors ? (
          <p className="errorText">{errors.email}</p>
        ) : null}
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            pattern="[0-9]*" // Allow only digits
            maxLength="10"
            onChange={handlePhoneChange}
            value={phone}
          />
        </div>
        {showErrors && !phoneValidation ? (
          <p className="errorText">{errors.phone}</p>
        ) : null}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        {showErrors && !passwordValidation && showErrors ? (
          <p className="errorText">{errors.password}</p>
        ) : null}
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        {!confirmPasswordValidation && showErrors ? (
          <p className="errorText">{errors.password}</p>
        ) : null}
        {!passwordMatching && showErrors ? (
          <p className="errorText">{errors.passwordMatching}</p>
        ) : null}

        {loading ? (
          <LoadingScreen />
        ) : (
          <button className="btn-primary" onClick={handleSubmit} type="button">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};
export default Register;
