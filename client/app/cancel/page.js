import React from 'react';

"use client";
const FailurePage = () => {
    return (
        <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center">
            <div className="text-center p-6 shadow-lg rounded-lg bg-white max-w-md">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
                <p className="text-gray-700 mb-6">Unfortunately, there was an issue processing your payment. Please try again or contact support if the problem persists.</p>
                <button className="text-white bg-red-500 hover:bg-red-600 font-semibold px-4 py-2 rounded-lg shadow">
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default FailurePage;
