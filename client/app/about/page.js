"use client";
import React from 'react';
import MapComponent from '../components/map';

const ContactInfo = () => (
    
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#f7f7f7', marginTop:"100px" }}>
    <div style={{ width: '40%', padding: '20px', backgroundColor: 'white', marginRight: '10px', marginLeft:'30px' }}>
      <h2 style={{ color: 'gray', marginBottom: '15px' }}>Address:</h2>
      <p style={{ marginBottom: '10px' }}>Defence, Khay-e-Nishat, Phase 6</p>
      <p style={{ marginBottom: '10px' }}>KDA, Scheme 1 (Service Lane Karsaz)</p>
      <h2 style={{ color: 'orange', marginBottom: '15px' }}>Take Away:</h2>
      <p style={{ marginBottom: '10px' }}>0327 4746373</p>
      <h2 style={{ color: 'orange', marginBottom: '15px' }}>Delivery:</h2>
      <p>0327 4746374</p>
      <h2 style={{ color: 'gray', marginBottom: '15px', marginTop: '20px' }}>Opening Hours:</h2>
        <p style={{ marginBottom: '10px' }}>Monday - Sunday: 12:00 PM - 12:00 AM</p>
      
    </div>
    <div style={{ width: '60%', height: '400px', marginRight:"30px" }}>
      {/* This is where you'd include your map component, e.g., a Google Maps iframe or a library like react-leaflet */}
        <MapComponent address="1600 Amphitheatre Parkway, Mountain View, CA" />
    </div>
  </div>
);

export default ContactInfo;
