// import React, { useState } from "react";
import "../styles/Navbar.css"; // Import your CSS styles here
import { logo } from "../assets";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logout from "../constants/logout";

function Navbar() {
  let navigate = useNavigate();
  const [activeOption, setActiveOption] = useState("dashboard");
  // State to manage the dropdown menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Function to toggle the dropdown menu
    // if (Cookies.get("isLoggedIn")) {
    //   // navigate("/dashboard")
    //   setActiveOption("dashboard");
    //   switch(activeOption){
    //     case 'dashboard':
    //       navigate('/dashboard')
    //       break;
    //     case 'about':
    //       navigate('about')
    //       break;
    //     case 'shops':
    //       navigate('shops')
    //       break;
    //     case 'addShop':
    //       navigate('addShops')
    //       break;
    //     case 'addStaffMember':
    //       navigate('addStaffMember')
    //       break;
    //   }
    // }
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li
          onClick={() => {
            setActiveOption("shops");
          }}
          className={`nav-item ${activeOption == "shops" ? "active" : ""}`}
        >
          <Link to="/shops">Shops</Link>
        </li>
        <li
          onClick={() => {
            setActiveOption("dashboard");
          }}
          className={`nav-item ${activeOption == "dashboard" ? "active" : ""}`}
        >
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li
          onClick={() => {
            setActiveOption("addShop");
          }}
          className={`nav-item ${activeOption == "addShop" ? "active" : ""}`}
        >
          <Link to="/addShop">Add Shop</Link>
        </li>
        <li
          onClick={() => {
            setActiveOption("addStaffMember");
          }}
          className={`nav-item ${
            activeOption == "addStaffMember" ? "active" : ""
          }`}
        >
          <Link to="/addStaffMember">Add Staff Member</Link>
        </li>
        <li
          onClick={() => {
            setActiveOption("about");
          }}
          className={`nav-item ${activeOption == "about" ? "active" : ""}`}
        >
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="user-menu">
        <span className="user-name">{Cookies.get("email")}</span>
        <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
          {Cookies.get("email") ? (
            <button className="dropdown-btn" onClick={toggleDropdown}>
              ⮟
            </button>
          ) : null}

          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link onClick={logout} to="/">
              Log Out
            </Link>
          </div>
        </div>
        <img className="websiteLogo" src={logo} alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
