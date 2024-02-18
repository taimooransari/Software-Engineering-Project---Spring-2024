'use client';
import React from "react";
import MenuItem from "../components/MenuItem";
import ShoppingCart from "../components/ShoppingCart";


const Index = () => {
  const menuItems = [
    // Add your menu items here
    {
      name: "Spaghetti",
      description: "Spaghetti with marinara sauce",
      price: 12.99,
      imageUrl:
        "https://s23209.pcdn.co/wp-content/uploads/2014/03/IMG_2626edit.jpg",
      quantity: 1,
    },
    // Add more menu items as needed

  ];

  const barbecueMenuItems = [
    // Add your barbecue menu items here
    {
      name: "BBQ Chicken",
      description: "Grilled chicken marinated in BBQ sauce",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
    },
    {
      name: "BBQ Shrimp Skewers",
      description: "Grilled shrimp glazed with smoky barbecue sauce",
      price: 22.99,
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5babd6a3ebfc7f1d5fd228d5/1565718585976-IO42B9HLFLFE8AP98ERK/Grilled+Shrimp+skewers+recipe",
      quantity: 1,
    },
    {
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
    <div className="container mt-5 mb-5">
      <div className="flex">
        <div className="w-full md:w-3/4 lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {food === 1 &&
              menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            {food === 2 &&
              barbecueMenuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/4">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Index;