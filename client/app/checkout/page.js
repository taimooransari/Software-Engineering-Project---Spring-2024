"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/map.js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    discountCode: "",
    countryRegion: "",
    shippingMethod: "standard",
    paymentMethod: "",
    billingSameAsShipping: true,
    phone: "",
    address: "",
    // Add more state properties for address fields (name, address, city, postal code, phone)
  });

  const cartItems = useSelector((state) => state.cart.items);
  const { userinfo } = useSelector((state) => state.auth);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(149.0);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default to COD

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    if (subtotal > 1000) {
      setDeliveryCharges(0);
    } else {
      setDeliveryCharges(149.0);
    }

    if (userinfo.loyaltyPoints > 20) {
      const discount = subtotal * 0.1; // 10% discount
      setDiscount(discount);
    }
  }, [cartItems, userinfo.loyaltyPoints]);

  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBillingChange = () => {
    setFormData({
      ...formData,
      billingSameAsShipping: !formData.billingSameAsShipping,
    });
  };

  const host = "http://localhost:3000";

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P8nRUGYLTJbmOKmGMcOvRlaBaz2VvdJ24apNM2OYW6yN0xAcuCp9s1vqYA0xHATj9PrMzI6g3aZtyQ7Ju708aCg00irbOXcj8"
    );

    const body = {
      products: cartItems,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:3000/api/orders/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const sendorder = async () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const total = subtotal - discount + deliveryCharges;

    console.log(cartItems);
    try {
      const response = await fetch(`${host}/api/orders/addorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: userinfo.id,
          address: formData.address,
          items: cartItems,
          email: formData.email,
          phone: formData.phone,
          total: total,
          orderStatus: "Open",
        }),
      });
      const data = await response.json();
      alert("Order placed successfully!");
      console.log(data);
      setConfirmed(true);
    } catch (error) {
      console.error("Error occurred while sending order:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here (potentially using Stripe)
    console.log("Checkout form submitted:", formData);
    if (paymentMethod === "COD") {
      sendorder();
    }else{
      sendorder();
      makePayment();
    }
  };

  return (
    <>
      {confirmed ? (
        <div>
          <h2 className="text-xl text-center font-bold mb-4 mt-6 pt-10">
            ORDER CONFIRMED
          </h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-2">Order Summary</h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm">
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-center">Price</th>
                    <th className="py-3 px-4 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left">{item.name}</td>
                      <td className="py-2 px-4 text-center">{item.quantity}</td>
                      <td className="py-2 px-4 text-center">
                        Rs. {item.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-center">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  Rs.{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {deliveryCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>Rs. {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>
                  Rs.{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Total</span>
                <span>
                  Rs.{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2) +
                    deliveryCharges -
                    discount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <h2 className="text-xl text-center font-bold mb-4 mt-6 pt-10">
              THANK YOU FOR YOUR ORDER
            </h2>
          </div>
          <div className="flex justify-center mt-4">
            <h2>Shipping Details</h2>
          </div>
          <div className="flex justify-center mt-4">
            <h2>Address: {formData.address}</h2>
          </div>
          <div className="flex justify-center mt-4">
            <h2>Email: {formData.email}</h2>
          </div>
          <div className="flex justify-center mt-4">
            <h2>Phone: {formData.phone}</h2>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 mb-12">
          <h2 className="text-xl text-center font-bold mb-4 mt-6 pt-10">
            CHECK OUT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-white shadow-md p-4">
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="discountCode"
                    className="block text-sm font-medium mb-1"
                  >
                    Discount code (optional)
                  </label>
                  <input
                    type="text"
                    id="discountCode"
                    name="discountCode"
                    value={formData.discountCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Delivery Information */}
                <div className="mb-4">
                  <h3 className="text-base font-bold mb-2">Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Country Region */}
                    <div>
                      <label
                        htmlFor="countryRegion"
                        className="block text-sm font-medium mb-1"
                      >
                        Country/Region
                      </label>
                      <select
                        id="countryRegion"
                        name="countryRegion"
                        value={formData.countryRegion}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                      >
                        {/* Add options for countries/regions */}
                        <option value="">Select Country/Region</option>
                        <option value="pakistan">Pakistan</option>
                        {/* Add more options */}
                      </select>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-base font-bold mb-2">
                        Payment Method
                      </h3>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="mr-2"
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="online"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="mr-2"
                        />
                        <label htmlFor="online">Online Payment</label>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <label
                        htmlFor="shippingMethod"
                        className="block text-sm font-medium mb-1"
                      >
                        Shipping Method
                      </label>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="standardShipping"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label htmlFor="standardShipping">
                          Standard (Rs. 149.00)
                        </label>
                      </div>
                      {/* Add option for other shipping methods */}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="mb-4">
                  <h3 className="text-base font-bold mb-2">Address</h3>
                  <div
                    className="grid grid-cols-1 md:grid
            -cols-2 gap-4"
                  >
                    {/* Add address fields (name, address, city, postal code, phone) */}
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    type="checkbox"
                    id="billingSameAsShipping"
                    name="billingSameAsShipping"
                    checked={formData.billingSameAsShipping}
                    onChange={handleBillingChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="billingSameAsShipping"
                    className="text-sm font-medium"
                  >
                    Billing address same as shipping
                  </label>
                </div>

                {/* Payment Information */}
                <div className="mb-4">
                  <h3 className="text-base font-bold mb-2">Payment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Add payment fields */}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded align-center mt-4"
                >
                  Place Order
                </button>
              </form>
            </div>
            <div>
              {/* Order Summary */}
              <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-bold mb-2">Order Summary</h3>
                {/* Add order summary items */}
                <div className="w-full overflow-x-auto">
                  {" "}
                  {/* Container for horizontal scrolling if needed */}
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 text-sm">
                        <th className="py-3 px-4 text-left">Product</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4 text-center">Price</th>
                        <th className="py-3 px-4 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-left">{item.name}</td>
                          <td className="py-2 px-4 text-center">
                            {item.quantity}
                          </td>
                          <td className="py-2 px-4 text-center">
                           {item.price.toFixed(2)}
                          </td>
                          <td className="py-2 px-4 text-center">
                             {(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 shadow-md rounded-lg mt-4">
                  <h3 className="text-lg font-bold mb-2">Total</h3>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {" "}
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{deliveryCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bill</span>
                    <span>
                      Rs.{" "}
                      {(cartItems.reduce((acc, item) => acc + item.price * item.quantity,0)  + deliveryCharges - discount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
