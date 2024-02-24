'use client';
import React from "react";
import MenuItem from "../components/MenuItem";
import ShoppingCart from "../components/ShoppingCart";

import Login from "../components/Login";


const Index = () => {
   


  return (
    <div className="container mt-5 mb-5" style={{padding:"50px", display: "flex", justifyContent:"space-evenly", alignItems: "center"}}>
      <div className="flex items-evenly">
        <Login />
      
      </div>
    </div>
  );
};

export default Index;