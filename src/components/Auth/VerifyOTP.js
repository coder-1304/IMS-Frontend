import { useState } from "react";
import Cookies from "js-cookie";
import LoadingScreen from "../Loading/loadingScreen";
import postData from "../../API/postData";
import { useNavigate } from "react-router-dom";


const VerifyOTP = () => {
  let navigate = useNavigate();
  console.log(Cookies.get("jwt_token"));
  let [otp, setOtp] = useState("");
  let [showError, setShowError] = useState(false);
  let [loading, setLoading] = useState(false);

  function handleChange(e) {
    // console.log(e.target.value);
    const inputValue = e.target.value;
    const digitOnly = inputValue.replace(/\D/g, "");
    setOtp(digitOnly);
    if(e.target.value.length==4){
      setShowError(false);
    }
  }
  async function fetchAPI(){
    const requestBody ={
      email: Cookies.get("email"),
      otp: otp
    }
    const response = await postData('/verifyOTP',requestBody);
    if(response.success){
      Cookies.set("jwt_token", response.jwt_token);
      // navigate('/dashboard')
      window.location.href="/dashboard"
    }else{
      setLoading(false);
      alert("Failed: "+response.message+"\n"+"ErrorCode: "+response.errorCode);
    }
  }
  function handleSubmit() {
    if (otp.length != 4) {
      setShowError(true);
    } else {
      setLoading(true);
      fetchAPI();
    }
  }

  return (
    <div className="verifyOTP">
      <form className="form" action="">
        <div>
          OTP is sent to {Cookies.get("email")}
          <br /> Please Verify
        </div>
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            pattern="[0-9]*" // Allow only digits
            maxLength="4"
            value={otp}
            onChange={handleChange}
          />
        </div>
        { showError ? (
          <p className="errorText">Enter a valid OTP</p>
        ) : null}
        {loading ? (
          <LoadingScreen />
        ) : (
          <button type="button" onClick={handleSubmit}>
            Verify
          </button>
        )}
      </form>
    </div>
  );
};
export default VerifyOTP;
