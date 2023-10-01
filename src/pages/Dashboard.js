import React from "react";
import "../styles/Dashboard/Dashboard.css"; // You can style this component using CSS or a CSS-in-JS library
import { useState, useEffect } from "react";
import postData from "../API/postData";
import getData from "../API/getData";
import LoadingScreen from "../components/Loading/loadingScreen";
import NoShops from "../components/Dashboard/NoShops";
import "../styles/common.css";
import "../styles/AddShop/AddShop.css";
import ShopCard from "../components/Dashboard/ShopsList/ShopCard";
import "../components/Dashboard/ShopsList/ShopCard.css";
import Cookies from "js-cookie";
import SellProducts from "../components/Dashboard/SellProducts/SellProducts";

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState("Sell Products");
  const [loading, setLoading] = useState(false);
  const shopId = Cookies.get("shopId");
  const shopName = Cookies.get("shopName");
  useEffect(() => {
    // async function httpReq() {
    //   const response = await getData("/getShops");
    //   if (response.success) {
    //     if (response.result.length == 0) {
    //       setNoShops(true);
    //     }else{
    //       setShopsList(response.result)
    //     }
    //     setLoading(false);
    //     // alert("Success " + "Length of shops: " + response.result.length);
    //   } else {
    //     alert(
    //       "Failed: " +
    //         response.message +
    //         "\n" +
    //         "ErrorCode: " +
    //         response.errorCode
    //     );
    //   }
    // }
    // httpReq();
  }, []);

  return (
    <>
      <h1>{shopName}</h1>
      {loading ? (
        <div className="centerContainer">
          <LoadingScreen />
        </div>
      ) : null}
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
              activeOption === "Add Products" ? "active" : ""
            }`}
            onClick={() => setActiveOption("Add Products")}
          >
            Add Products
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
        <div className="dashboard-content">
          {activeOption == "Sell Products" ? <SellProducts/> : null}
          {activeOption == "Recent Sales" ? <h1>Recent Sales</h1> : null}
          {activeOption == "Sales Charts" ? <h1>Sales Charts</h1> : null}
          {/* Content for the selected navigation option goes here */}
        </div>
      </div>
      );
    </>
  );
};

export default Dashboard;
