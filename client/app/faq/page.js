"use client";
import React from 'react';

const DeliveryFaq = () => (
  <div className="bg-yellow-100 shadow rounded-lg p-6 max-w-4xl mx-auto">
    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Delivery FAQ</h2>
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">What is the expected delivery time?</h3>
        <p className="text-gray-600 text-sm">40-45 minutes, may vary for different areas.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">What is the refund or exchange policy?</h3>
        <p className="text-gray-600 text-sm">
          Food that is consumed will not be exchanged or refunded, however, if there is a complaint then our rider will pick up the food and a refund or exchange will be provided based on feedback.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">What are your delivery charges?</h3>
        <p className="text-gray-600 text-sm">
          Our delivery charges vary from area to area. Upon selecting your delivery area, delivery charges will appear in the cart total.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">How can I submit my complaint/feedback?</h3>
        <p className="text-gray-600 text-sm">You can call us at 021111529233</p>
      </div>
    </div>
  </div>
);

export default DeliveryFaq;
