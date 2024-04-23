'use client';
import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { useDispatch, useSelector} from "react-redux";


const Index = () => {

  const cartItems = useSelector(state => state.cart.items);
  const [isAlert, setIsAlert] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }
  , []);

  const showalert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }

  const fetchItems = async()=>{
    const response = await fetch("http://localhost:3000/api/inventory/getinventory", {
        method: "GET",
     
    
    });

    if (!response.ok) {
        throw new Error("Failed to add item");
    }
    const data = await response.json();
    setMenuItems(data);

                               
}
  

  const [food, setFood] = React.useState(1);

  return (
    <>
      {isAlert && <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hidden opacity-0 transition-opacity duration-300" id="cartAlert">Item added to cart!</div>}
      <div className="container" style={{ paddingTop: "70px", margin: "auto" }}>
        <div className="flex justify-center">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mine">
              {food === 1 &&
                menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} showalert={showalert} />
                ))}
              {/* {food === 2 &&
                barbecueMenuItems.map((item, index) => (
                  <MenuItem key={index} item={item} showalert={showalert} />
                ))} */}
            </div>
          </div>
        </div>
        <style jsx>{`

  .mine{
    // border: 1px solid black;
    width: 100%;
    justify-content: center;

  }
    .grid {
      display: flex;
      flex-wrap: wrap;
    }
    .grid > * {
      width: calc(100% / 3 - 1rem); /* Equal width for lg screens */
      max-width: 24%; /* Max width */
    }
    @media (min-width: 768px) { /* Medium screens */
      .grid > * {
        width: calc(100% / 2 - 1rem); /* Equal width for md screens */
      }
    }
    @media (min-width: 1024px) { /* Large screens */
      .grid > * {
        width: calc(100% / 3 - 1rem); /* Equal width for lg screens */
      }
    }
  `}</style>
      </div>
    </>

  );
};

export default Index;