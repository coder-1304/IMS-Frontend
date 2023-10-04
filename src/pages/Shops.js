import React from "react";
import "../styles/Dashboard/Dashboard.css"; // You can style this component using CSS or a CSS-in-JS library
import { useState, useEffect } from "react";
import postData from "../API/postData";
import getData from "../API/getData";
import Cookies from "js-cookie";
import LoadingScreen from "../components/Loading/loadingScreen";
import NoShops from "../components/Dashboard/NoShops";
import "../styles/common.css";
import "../styles/AddShop/AddShop.css";
import ShopCard from "../components/Dashboard/ShopsList/ShopCard";
import "../components/Dashboard/ShopsList/ShopCard.css";
import verifyLogin from "../constants/verifyLogin";
import UserNotLoggedIn from "../components/UserNotLoggedIn/UserNotLoggedIn";

const Shops = () => {
  console.log("User Role is: " + Cookies.get("role"));
  const [activeOption, setActiveOption] = useState("Sell Products");
  const [loading, setLoading] = useState(true);
  const [noShops, setNoShops] = useState(false);
  const [showShopsList, setShowShopsList] = useState(true);
  const [shopsList, setShopsList] = useState([]);

  useEffect(() => {
    async function httpReq() {
      const response = await getData("/getShops");
      if (response.success) {
        if (response.result.length == 0) {
          setNoShops(true);
        } else {
          setShopsList(response.result);
        }
        setLoading(false);
        // alert("Success " + "Length of shops: " + response.result.length);
      } else {
        alert(
          "Failed: " +
            response.message +
            "\n" +
            "ErrorCode: " +
            response.errorCode
        );
      }
    }
    httpReq();
  }, []);

  if (!verifyLogin()) {
    return <UserNotLoggedIn />;
  }

  return (
    <>
      {loading ? (
        <div className="centerContainer">
          <LoadingScreen />
        </div>
      ) : null}
      {showShopsList ? (
        <div className="centerContainer">
          {shopsList.map((data) => (
            <ShopCard data={data} />
          ))}
        </div>
      ) : null}
      {noShops ? <NoShops /> : null}
    </>
  );
};

export default Shops;
