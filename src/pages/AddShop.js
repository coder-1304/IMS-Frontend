import { useState } from "react";
import "../styles/Auth/form.css";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/Loading/loadingScreen";
import postData from "../API/postData";
import Cookies from "js-cookie";
import "../styles/common.css"
import verifyLogin from "../constants/verifyLogin";
import UserNotLoggedIn from "../components/UserNotLoggedIn/UserNotLoggedIn";
import Unauthorized from "../components/Unauthorized/Unauthorized";


const AddShop = () => {
  let navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  //   Validations
  const [shopNameValidation, setShopNameValidation] = useState(false);
  const [addressValidation, setAddressValidation] = useState(false);
  const [cityValidation, setCityValidation] = useState(false);
  const [stateValidation, setStateValidation] = useState(false);
  const [countryValidation, setCountryValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  if(!verifyLogin()){
    return <UserNotLoggedIn/>
  }

  const handleSubmit = async () => {
    if (
      shopNameValidation &&
      addressValidation &&
      cityValidation &&
      stateValidation &&
      countryValidation &&
      phoneValidation
    ) {
      setLoading(true);
      const requestBody = {
        shopName: shopName,
        address: address,
        city: city,
        state: state,
        country: country,
        phone: phone,
      };
      const response = await postData("/createShop", requestBody);
      if (response.success) {
        alert("Shop Added Successfully");
        navigate("/dashboard");
      } else {
        alert(response.message + "\n" + "Error Code: " + response.errorCode);
      }
    } else {
      setShowError(true);
    }
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "shopName": {
        if (value.length <= 40) {
          setShopName(value);
          if (value.length > 3) {
            setShopNameValidation(true);
          } else {
            setShopNameValidation(false);
          }
        }
        break;
      }
      case "address": {
        if (value.length <= 40) {
          setAddress(value);
          if (value.length > 10) {
            setAddressValidation(true);
          } else {
            setAddressValidation(false);
          }
        }
        break;
      }
      case "city": {
        if (value.length <= 40) {
          setCity(value);
          if (value.length > 3) {
            setCityValidation(true);
          } else {
            setCityValidation(false);
          }
        }
        break;
      }
      case "state": {
        if (value.length <= 40) {
          setState(value);
          if (value.length >= 2) {
            setStateValidation(true);
          } else {
            setStateValidation(false);
          }
        }
        break;
      }
      case "country": {
        if (value.length <= 40) {
          setCountry(value);
          if (value.length > 3) {
            setCountryValidation(true);
          } else {
            setCountryValidation(false);
          }
        }
        break;
      }
      case "phone": {
        const digitOnly = value.replace(/\D/g, "");
        setPhone(digitOnly);
        if (digitOnly.length == 10) {
          setPhoneValidation(true);
        } else {
          setPhoneValidation(false);
        }
        break;
      }
      default:
        break;
    }
  };
  return <>
  {Cookies.get("role")!="Admin"?<Unauthorized message="Only Admin can add shops"/>:(
    <div className="centerContainer">
      <div className="addShopContainer">
        <form className="form" action="">
          <div>
            <label htmlFor="shopName">Shop Name:</label>
            <input
              type="text"
              id="shopName"
              pattern="[A-Za-z0-9\s]*" // Allow letters, digits, and spaces
              maxLength="50"
              value={shopName}
              onChange={handleChange}
            />
          </div>
          {showError && !shopNameValidation ? (
            <p className="errorText">Enter a valid Shop Name</p>
          ) : null}
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              pattern="[A-Za-z0-9\s]*" // Allow letters, digits, and spaces
              maxLength="100"
              value={address}
              onChange={handleChange}
            />
          </div>
          {showError && !addressValidation ? (
            <p className="errorText">Enter a valid Address</p>
          ) : null}
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              pattern="[A-Za-z\s]*" // Allow letters and spaces
              maxLength="50"
              value={city}
              onChange={handleChange}
            />
          </div>
          {showError && !cityValidation ? (
            <p className="errorText">Enter a valid City</p>
          ) : null}
          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              pattern="[A-Za-z\s]*" // Allow letters and spaces
              maxLength="50"
              value={state}
              onChange={handleChange}
            />
          </div>
          {showError && !stateValidation ? (
            <p className="errorText">Enter a valid State</p>
          ) : null}
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              pattern="[A-Za-z\s]*" // Allow letters and spaces
              maxLength="50"
              value={country}
              onChange={handleChange}
            />
          </div>
          {showError && !countryValidation ? (
            <p className="errorText">Enter a valid Country</p>
          ) : null}
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              pattern="[0-9]*" // Allow only digits
              maxLength="10"
              value={phone}
              onChange={handleChange}
            />
          </div>
          {showError && !phoneValidation ? (
            <p className="errorText">Enter a valid Phone</p>
          ) : null}
          {loading ? (
            <LoadingScreen />
          ) : (
            <button type="button" onClick={handleSubmit}>
              Add Shop
            </button>
          )}
        </form>
      </div>
    </div>
  )}
  
  </>;
};
export default AddShop;
