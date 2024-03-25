import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from '../../lib/redux/slices/cartSlice';


const ShoppingCart = () => {

  const cartItems = useSelector((state) => state.cart.items);



  // const cartItems = [
  //   {
  //     name: "Item 1",
  //     description: "A nice thing",
  //     price: 100,
  //     quantity: 2,
  //   },
  //   {
  //     name: "Item 2",
  //     description: "Another thing",
  //     price: 150,
  //     quantity: 1,
  //   },
  // ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

    const handleClearCart = () => {
    // Implement clear cart logic here
         console.log("Clear cart clicked");
    };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Checkout clicked");
    console.log(cartItems);
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <div className="flex flex-col md:flex-row md:justify-between">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:justify-between mb-4"
          >
            <div>
              <p className="font-semibold mb-1">{item.name}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-1">₹ {item.price}</p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <p className="font-semibold">Total:</p>
        <p className="font-semibold">₹ {total}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;