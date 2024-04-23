"use client";
import React, { useState, useEffect } from "react";
import { authSlice, useDispatch, useSelector } from "@/lib/redux";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Taimoor Ansari");
  const [email, setEmail] = useState("taimoor.ansari432@gmail.com");
  const [contactNumber, setContactNumber] = useState("033633468547");
  const [address, setAddress] = useState(
    "R13, Block 13, Gulshan-e-Iqbal, Karachi, Pakistan"
  );

  const [pastOrders, setPastOrders] = useState([]);
  const [buttonclicked, setButtonClicked] = useState(false);

  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch the user profile data when the component mounts
    getprofile();
  }, []);

  const host = "http://localhost:3000";

  const getprofile = async () => {
    try {
      console.log("Fetching user profile");
      const mytoken = localStorage.getItem("token");
      console.log(mytoken);
      const response = await fetch(`${host}/api/customers/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": mytoken,
        },
      });
      if (response.ok) {
        const user = await response.json();
        dispatch(
          authSlice.actions.setuser({
            id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: "911",
            address: "Bilawal House, Karachi, Pakistan",
            loyaltyPoints: user.loyaltyPoints
          })
        );
      } else {
        console.error("1_Failed to fetch user profile");
      }
    } catch (error) {
      console.error("2_Failed to fetch user profile", error);
    }
  };

  const getOrders = async () => {
    try {
      console.log("This is the user id that I am sending", userinfo.id);
      const response = await fetch(
        `${host}/api/orders/getcustomerorders/${userinfo.id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const orders = await response.json();
        console.log("These are the orders I fetched", orders);
        setPastOrders((prevOrders) => [...prevOrders, ...orders]);
      } else {
        console.error("Failed to fetch user orders");
      }
    } catch (err) {
      console.error("Failed to fetch user orders", err);
    }
    setButtonClicked(true);
  };

  const handleSave = async () => {
    // Save the updated profile information
    // You can implement the logic to save the data to your backend here
    console.log("Saving the updated profile information");
    try {
      const response = await fetch(
        `${host}/api/customers/updateuser/${userinfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            contactNumber: contactNumber,
            address: address,
          }),
        }
      );
      if (response.ok) {
        console.log("Profile information updated successfully");
        getprofile();
        setIsEditing(false);
      } else {
        console.error("Failed to update profile information");
      }
    } catch (err) {
      console.log(err);
      console.log("Server error");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  let x = 50;

  return (
    <div className="flex flex-wrap justify-center items-center m-auto w-3/4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Welcome Back, {userinfo.name}</h1>
      <div className="bg-gray-100 flex justify-center items-center m-auto w-3/4 mt-20">
        <div className="bg-gray-50 shadow-md rounded-lg p-8 w-full">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="name">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                className="border border-gray-300 p-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{userinfo.name}</p>
            )}
          </div>
          {!isEditing && (
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="email">
                Email
              </label>
              <p>{userinfo.email}</p>
            </div>
          )}
          {isEditing && (
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="contactNumber">
              Contact Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                id="contactNumber"
                className="border border-gray-300 p-2 w-full"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            ) : (
              <p>{userinfo.contactNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="address">
              Address
            </label>
            {isEditing ? (
              <textarea
                id="address"
                className="border border-gray-300 p-2 w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <p>{userinfo.address}</p>
            )}
          </div>
          <div className="flex justify-end">
            <div className="bg-yellow-500 text-white font-bold rounded-full px-4 py-2 shadow-md">
              {userinfo.loyaltyPoints} Loyalty Points
            </div>
          </div>
          {isEditing ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}

          {isEditing && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditing(false)} // Cancel button
            >
              Cancel
            </button>
          )}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={getOrders}
            disabled={buttonclicked}
          >
            Get Orders
          </button>
        </div>
      </div>

      <div className="bg-gray-100 flex justify-center items-center m-auto w-3/4 mt-20">
        {pastOrders.length > 0 && (
          <div className="bg-gray-50 shadow-md rounded-lg p-8 w-full">
            <h1 className="text-2xl font-bold mb-4">Past Orders</h1>
            <div className="grid grid-cols-1 gap-2">
              {pastOrders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded-md shadow-sm hover:bg-gray-100 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                      Order Status: {order.orderStatus}
                    </h2>
                    <p className="text-sm">Total: ${order.total}</p>
                  </div>
                  <table className="w-full flex-grow">
                    {" "}
                    {/* Add w-full for table to take up full card width */}
                    <thead className="bg-gray-200 text-sm">
                      <tr>
                        <th className="p-2">Item</th>
                        <th className="p-2 text-center">Quantity</th>
                        <th className="p-2 text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item) => (
                        <tr
                          key={item.id}
                          className="odd:bg-white even:bg-gray-50"
                        >
                          <td className="p-2">{item.name}</td>
                          <td className="p-2 text-center">{item.quantity}</td>
                          <td className="p-2 text-center">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
