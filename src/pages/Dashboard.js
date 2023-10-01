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
import '../components/Dashboard/ShopsList/ShopCard.css'

const Dashboard = () => {
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
        }else{
          setShopsList(response.result)
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


  return loading ? (
    <div className="centerContainer">
      <LoadingScreen />
    </div>
  ) : showShopsList ? (
    <div className="centerContainer">
      {shopsList.map((data)=> <ShopCard data={data} />)}
    </div>
  ) : (
    <div className="dashboard-container">
      {/* Left Side Navigation */}
      <div className="dashboard-navigation">
        <div
          className={`nav-item ${
            activeOption === "Sell Products" ? "active" : ""
          }`}
          onClick={() => setActiveOption("Sell Products")}
        >
          Sell Products
        </div>
        <div
          className={`nav-item ${
            activeOption === "Recent Sales" ? "active" : ""
          }`}
          onClick={() => setActiveOption("Recent Sales")}
        >
          Recent Sales
        </div>
        <div
          className={`nav-item ${
            activeOption === "Sales Charts" ? "active" : ""
          }`}
          onClick={() => setActiveOption("Sales Charts")}
        >
          Sales Charts
        </div>
      </div>
      {noShops ? (
        <NoShops />
      ) : (
        <div className="dashboard-content">
          content
          {/* Content for the selected navigation option goes here */}
        </div>
      )}

      {/* Right Side Content */}
    </div>
  );
};

export default Dashboard;
