import React from 'react';
import './ShopCard.css'; 

const ShopCard = (props) => {
  console.log(props.data);
  let { ShopID, ShopName, Address, City, State, Country, PhoneNumber, AdminEmail } = props.data
  const handleSelect =()=>{
    console.log(ShopName);
  }
  return (
    <div className="shop-card">
      <div className="shop-header">
        <h2 className="shop-name">{ShopName}</h2>
        <button className="select-button" onClick={handleSelect}>Select</button>
      </div>
      <div className="shop-details">
        <p><strong>Shop ID:</strong> {ShopID}</p>
        <p><strong>Location:</strong> {Address}, {City}, {State}, {Country}</p>
        <p><strong>Phone Number:</strong> {PhoneNumber}</p>
        <p><strong>Admin Email:</strong> {AdminEmail}</p>
      </div>
    </div>
  );
};

export default ShopCard;
