"use client";

import React from 'react';
import { useEffect } from 'react';
import { authSlice, cartSlice } from '@/lib/redux';

const SuccessPage = () => {

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
            <div className="text-center p-6 shadow-lg rounded-lg bg-white max-w-md">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h1>
                <p className="text-gray-700 mb-6">Your payment has been successful.</p>
                <button className="text-white bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-lg shadow">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
