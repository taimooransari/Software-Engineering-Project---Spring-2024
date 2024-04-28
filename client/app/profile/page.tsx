'use client';
import React, {useState,useEffect, use} from "react";
import { authSlice, useDispatch, useSelector } from "@/lib/redux";
import Login from "../components/Login";
import Profile from "../components/Profile.js";
import type { ReduxState } from "@/lib/redux";


const Index = () => {
   const islogged = useSelector((state: ReduxState) => state.auth.isLoggedIn);

   


  return (
    <div className="container mt-5 mb-5 w-full m-auto w-full" style={{padding:"50px", display: "flex", flexFlow:"column",justifyContent:"space-evenly", alignItems: "center"}}>

      <div className="flex items-evenly w-full" >
        
        {islogged ? <Profile/> :<Login />}
        
        
      
      </div>
    </div>
  );
};

export default Index;