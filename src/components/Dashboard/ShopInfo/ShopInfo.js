import React from "react";
import "./ShopInfo.css";
import { useNavigate } from "react-router-dom";

function ShopInfo({ shopName }) {
  const navigate = useNavigate();
  const onChangeShop = () => {
    navigate("/shops");
  };
  return (
    <div className="shop-info-container">
      <h4>{shopName}</h4>
      <button onClick={onChangeShop} className="change-shop-button">
        Change Shop
      </button>
    </div>
  );
}

export default ShopInfo;
