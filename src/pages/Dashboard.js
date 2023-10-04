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
import { useNavigate } from "react-router-dom";
import ShopInfo from "../components/Dashboard/ShopInfo/ShopInfo";
import AddProducts from "../components/Dashboard/AddProducts/AddProducts";
import RecentSales from "../components/Dashboard/RecentSales/RecentSales";
import SalesChart from "../components/Dashboard/SalesChart/SalesChart";
import verifyLogin from "../constants/verifyLogin";
import UserNotLoggedIn from "../components/UserNotLoggedIn/UserNotLoggedIn";

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState("Sell Products");
  const [loading, setLoading] = useState(false);
  const shopId = Cookies.get("shopId");
  const shopName = Cookies.get("shopName");
  let navigate = useNavigate();
  
  useEffect(() => {
    function alerting() {
      if (!shopId) {
        navigate("/shops");
      }
    }
    alerting();
  }, [shopId]);
  if(!verifyLogin()){
    return <UserNotLoggedIn/>
  }

  return (
    <>
      <ShopInfo shopName={shopName} />
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
        <div style={{ width: 260, height: 1 }}></div>

        <div className="dashboard-content">
          {activeOption == "Sell Products" ? <SellProducts /> : null}
          {activeOption == "Add Products" ? <AddProducts /> : null}
          {activeOption == "Recent Sales" ? <RecentSales /> : null}
          {activeOption == "Sales Charts" ? <SalesChart /> : null}
          {/* Content for the selected navigation option goes here */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
