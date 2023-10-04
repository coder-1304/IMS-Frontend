import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import AddShop from "./pages/AddShop";
import AddStaffMember from "./pages/AddStaffMember";
import { useState,useEffect } from "react";

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" Component={Auth}></Route>
        <Route path="/addShop" Component={AddShop}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/shops" Component={Shops}></Route>
        <Route path="/addStaffMember" Component={AddStaffMember}></Route>
        <Route path="/about" Component={About}></Route>
      </Routes>
      {/* </Navbar> */}
    </>
  );
}

export default App;
