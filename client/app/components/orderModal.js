import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose, order }) => {


    const [items, updateItems] = useState([
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
            id: 8,
            name: "Chicken Alfredo",
            description: "Fettuccine pasta with creamy Alfredo sauce",
            price: 18.99,
            imageUrl: "https://www.allrecipes.com/thmb/9aWCdbfttLcsW2dFQWwVQBGJM3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-236973-CreamyAlfredoSauce-0238-4x3-1-01e7091f47ae452d991abe32cbed5921.jpg",
            quantity: 1,

        }
    ]);



    if (!isOpen || !order) return null;

    return (

        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
            <div className="m-auto p-8 w-2/4">
                <div className="flex flex-col items-center">
                    <button
                        type="button"
                        className="absolute top-5 right-5 text-white font-bold hover:text-gray-800 focus:outline-none z-10"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="bg-white w-full shadow-md rounded-lg overflow-hidden m-5 p-5">
                        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                        <div className="flex justify-between">
                            <p className="text-left font-bold">Order ID:</p>
                            <p className="text-right">{order._id}</p>
                        </div>
                        {/* <div className="flex justify-between">
                            <p className="text-left font-bold">Order Time:</p>
                            <p className="text-right">{order.orderTime}</p>
                        </div> */}
                        <div className="flex justify-between">
                            <p className="text-left font-bold">Contact:</p>
                            <p className="text-right">{order.phone}</p>
                        </div>
                        {/* <div className="flex justify-between">
                            <p className="text-left font-bold">Note:</p>
                            <p className="text-right">{order.note}</p>
                        </div> */}
                        <div className="flex justify-between">
                            <p className="text-left font-bold">Delivery Address:</p>
                            <p className="text-right">{order.address}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-left font-bold">Order Status:</p>
                            <p className="text-right">{order.orderStatus}</p>
                        </div>
                    </div>

                    <div className="bg-white w-full shadow-md rounded-lg overflow-hidden mt-4 p-5">
                        <h2 className="text-2xl font-semibold mb-4">Items in Order</h2>
                        <div className="flex bg-gray-200 p-2">
                            <p className="flex-1 text-center">Item</p>
                            <p className="flex-1 text-center">Quantity</p>
                            {/* <p className="flex-1 text-center">Price</p>
                            <p className="flex-1 text-center">Total</p> */}
                        </div>
                        {(order.orderItems).map(item => {
                            // const item = items.find(item => item.id === parseInt(itemId));
                            // if (item) {
                                return (
                                    <div key={item._id} className="flex bg-gray-100 p-2">
                                        <p className="flex-1 text-center">{item.itemName}</p>
                                        <p className="flex-1 text-center">{item.quantity}</p>
                                        {/* <p className="flex-1 text-center">${item.price.toFixed(2)}</p>
                                        <p className="flex-1 text-center">${(item.price * item.quantity).toFixed(2)}</p> */}
                                    </div>
                                );
                            // }
                            // return null;
                        })}
                    </div>

                    <div className="bg-white w-full shadow-md rounded-lg overflow-hidden mt-4 p-5">
                        <div className="flex bg-gray-200 p-2">
                            <p className="flex-4 text-center mr-5">Delivery Fee :</p>
                            <p className="flex-4">$ 15</p>
                        </div>
                        <div className="flex bg-gray-200 p-2">
                            <p className="flex-4 text-center mr-5">Total Amount :</p>
                            <p className="flex-4">${order.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>


    );
};

export default OrderModal;
