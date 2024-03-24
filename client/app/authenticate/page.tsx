'use client';
import React, {useState} from "react";

import Login from "../components/Login";
import Profile from "../components/Profile";


const Index = () => {
   const [isLogged, setIsLogged] = useState(false);

const toggleState = () => {setIsLogged(!isLogged)};


  return (
    <div className="container mt-5 mb-5 w-full m-auto w-full" style={{padding:"50px", display: "flex", flexFlow:"column",justifyContent:"space-evenly", alignItems: "center"}}>

      <button onClick={toggleState}>Toggle</button>
      <div className="flex items-evenly w-full" >
        
        {isLogged ? <Profile/> :<Login />}
        
        
      
      </div>
    </div>
  );
};

export default Index;