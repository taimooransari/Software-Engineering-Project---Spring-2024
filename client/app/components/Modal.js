"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cartSlice } from '@/lib/redux';

import {FaCartArrowDown} from 'react-icons/fa'

function Modal() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const router = useRouter();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };


    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <button type="button" onClick={toggleModal} className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >

            {/* <ion-icon name="cart"></ion-icon> */}
            <FaCartArrowDown size={25}/>
            </button>
            {showModal && (
                <dialog
                    className="fixed top-0 left-1 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
                
                
                >
                    <div className=" m-auto p-8 w-2/4">
                        <div className="flex flex-col items-center">

                            <button
                                type="button"
                                className="absolute top-5 right-5 text-white font-bold hover:text-gray-800 focus:outline-none z-10"
                                onClick={toggleModal}
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
                            {/* <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1> */}




                            <div className="flex justify-between mt-4 mb-4">


                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 "
                                    onClick={handleCheckout}

                                >
                                    Checkout
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"

                                >
                                    Clear Cart
                                </button>




                            </div>





                            <div className="bg-white w-full shadow-md rounded-lg overflow-hidden">
                                <div className="flex bg-gray-200 p-2">
                                    <p className="flex-1 text-center">Item</p>
                                    <p className="flex-1 text-center">Qty</p>
                                    <p className="flex-1 text-center">Price</p>
                                    <p className="flex-1 text-center">Total</p>
                                    <p className="flex-1 text-center">Action</p>
                                </div>
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex bg-gray-100 p-2">
                                        <p className="flex-1 text-center">{item.name}</p>
                                        <p className="flex-1 text-center">{item.quantity}</p>
                                        <p className="flex-1 text-center">${item.price.toFixed(2)}</p>
                                        <p className="flex-1 text-center">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                                            onClick={() => dispatch(cartSlice.actions.removeItem(item))}
                                        >
                                            -
                                        </button>
                                        <button
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                            onClick={() => dispatch(cartSlice.actions.addItem(item))}
                                        >
                                            +
                                        </button>

                                    </div>
                                ))}
                            </div>
                            {/* Total */}
                            <div className="flex justify-end mt-4  mb-10">
                                <div className="bg-white w-full shadow-md rounded-lg overflow-hidden">
                                    <div className="flex bg-gray-200 p-2">
                                        <p className="flex-4 text-center mr-5">Total Amount: </p>
                                        <p className="flex-4 text-center">${total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default Modal;

