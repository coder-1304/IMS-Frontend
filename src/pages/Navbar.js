// import React, { useState } from "react";
import "../styles/Navbar.css"; // Import your CSS styles here
import { logo } from "../assets";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";


function Navbar() {
  // State to manage the dropdown menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  function logOut(){
    Cookies.remove('jwt_token');
    Cookies.remove('email');
    window.location.href="/";
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/addShop">Add Shop</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="user-menu">
        <span className="user-name">{Cookies.get("email")}</span>
        <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
          {Cookies.get("email")?<button className="dropdown-btn" onClick={toggleDropdown}>⮟</button>:null}
          
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link onClick={logOut}>Log Out</Link>
          </div>
        </div>
      <img className="websiteLogo" src={logo} alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
