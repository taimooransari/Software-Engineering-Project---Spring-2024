"use client";
import React from 'react';
import MapComponent from '../components/map';
import DeliveryFaq from '../faq/page';

const ContactInfo = () => (
  <div className="flex flex-col bg-gray-100 mt-12" style={{ minHeight: "100vh" }}>
    <div className="flex flex-row bg-gray-100 mt-12 ">
      <div className="w-1/2 p-5 bg-white m-4 flex flex-col justify-between">
        <div>
          <h2 className="text-gray-500 mb-4">Address:</h2>
          <p className="mb-2.5">Defence, Khay-e-Nishat, Phase 6</p>
          <p className="mb-2.5">KDA, Scheme 1 (Service Lane Karsaz)</p>
        </div>
        <div>
          <h2 className="text-orange-500 mb-4">Take Away:</h2>
          <p className="mb-2.5">0327 4746373</p>
          <h2 className="text-orange-500 mb-4">Delivery:</h2>
          <p className="mb-2.5">0327 4746374</p>
        </div>
        <div>
          <h2 className="text-gray-500 mb-4">Opening Hours:</h2>
          <p>Monday - Sunday: 12:00 PM - 12:00 AM</p>
        </div>
      </div>
      <div className="w-1/2 p-5 flex flex-col justify-between">
        {/* This is where you'd include your map component, e.g., a Google Maps iframe or a library like react-leaflet */}
        <DeliveryFaq />

      </div>
    </div>
    <div className="flex flex-col bg-gray-100 mb-16 ">
      <MapComponent address="1600 Amphitheatre Parkway, Mountain View, CA" />
    </div>
  </div>
);

export default ContactInfo;
