'use client';
import React from "react";
import MenuItem from "../components/MenuItem";
import ShoppingCart from "../components/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


const Index = () => {

  const cartItems = useSelector(state => state.cart.items);
  const [isAlert, setIsAlert] = React.useState(false);

  const showalert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }


  const menuItems = [
    // Add your menu items here
    {
      id: 1,
      name: "BBQ Chicken",
      description: "Grilled chicken marinated in BBQ sauce",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
    },
    {
      id: 2,
      name: "Chicken Alfredo",
      description: "Fettuccine pasta with creamy Alfredo sauce",
      price: 18.99,
      imageUrl: "https://www.allrecipes.com/thmb/9aWCdbfttLcsW2dFQWwVQBGJM3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-236973-CreamyAlfredoSauce-0238-4x3-1-01e7091f47ae452d991abe32cbed5921.jpg",
      quantity: 1,

    },
    {
      id: 3,
      name: "BBQ Chicken",
      description: "Grilled chicken marinated in BBQ sauce",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
    },
    {
      id: 4,
      name: "Spaghetti",
      description: "Spaghetti with marinara sauce",
      price: 12.99,
      imageUrl:
        "https://s23209.pcdn.co/wp-content/uploads/2014/03/IMG_2626edit.jpg",
      quantity: 1,
    },
    {
      id: 5,
      name: "Chicken Alfredo",
      description: "Fettuccine pasta with creamy Alfredo sauce",
      price: 18.99,
      imageUrl: "https://www.allrecipes.com/thmb/9aWCdbfttLcsW2dFQWwVQBGJM3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-236973-CreamyAlfredoSauce-0238-4x3-1-01e7091f47ae452d991abe32cbed5921.jpg",
      quantity: 1,

    },
    {
      id: 6,
      name: "BBQ Chicken",
      description: "Grilled chicken marinated in BBQ sauce",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
    }, {
      id: 7,
      name: "BBQ Chicken",
      description: "Grilled chicken marinated in BBQ sauce",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
    },
    {
      id : 8,
      name: "Chicken Alfredo",
      description: "Fettuccine pasta with creamy Alfredo sauce",
      price: 18.99,
      imageUrl: "https://www.allrecipes.com/thmb/9aWCdbfttLcsW2dFQWwVQBGJM3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-236973-CreamyAlfredoSauce-0238-4x3-1-01e7091f47ae452d991abe32cbed5921.jpg",
      quantity: 1,

    },


    // Add more menu items as needed

  ];

  const barbecueMenuItems = [
    // Add your barbecue menu items here
    {
      id: 9,
      name: "BBQ Chicken",
      description: "Grilled chicken marinated in BBQ sauce",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
    },
    {
      id: 10,
      name: "BBQ Shrimp Skewers",
      description: "Grilled shrimp glazed with smoky barbecue sauce",
      price: 22.99,
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5babd6a3ebfc7f1d5fd228d5/1565718585976-IO42B9HLFLFE8AP98ERK/Grilled+Shrimp+skewers+recipe",
      quantity: 1,
    },
    {
      id: 11,
      name: "BBQ Veggie Platter",
      description: "Grilled vegetables marinated in barbecue seasoning",
      price: 13.99,
      imageUrl:
        "https://www.healthygffamily.com/wp-content/uploads/2017/05/IMG_9889.jpg",
      quantity: 1,
    },
    // Add more barbecue menu items as needed
  ];

  const [food, setFood] = React.useState(1);

  return (
    <>
    {isAlert && <div class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hidden opacity-0 transition-opacity duration-300" id="cartAlert">
  Item added to cart!
   </div>}
    <div className="container" style={{ paddingTop: "70px", margin: "auto" }}>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mine">
            {food === 1 &&
              menuItems.map((item, index) => (
                <MenuItem key={index} item={item} showalert={showalert} />
              ))}
            {food === 2 &&
              barbecueMenuItems.map((item, index) => (
                <MenuItem key={index} item={item}  showalert={showalert}/>
              ))}
          </div>
        </div>
      </div>
      <style jsx>{`

  .mine{
    border: 1px solid black;
    width: 100%;

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