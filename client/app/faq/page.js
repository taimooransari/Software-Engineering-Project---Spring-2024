"use client";
import React from 'react';

const DeliveryFaq = () => (
  <div style={{
    backgroundColor: '#fff4cc', // Light yellow background
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '24px',
    display: 'grid',
    gap: '16px',
    maxHeight: '100%'
  }}>
    <h2 style={{
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '16px',
      textAlign: 'center'
    }}>Delivery FAQ</h2>
    <div style={{
      display: 'grid',
      gap: '16px'
    }}>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'medium',
          color: '#666',
          marginBottom: '8px'
        }}>What is the expected delivery time?</h3>
        <p style={{ color: '#666' }}>40-45 minutes, may vary for different areas.</p>
      </div>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'medium',
          color: '#666',
          marginBottom: '8px'
        }}>What is the refund or exchange policy?</h3>
        <p style={{ color: '#666' }}>
          Food that is consumed will not be exchanged or refunded, however, if there is a complaint then our rider will pick up the food and a refund or exchange will be provided based on feedback.
        </p>
      </div>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'medium',
          color: '#666',
          marginBottom: '8px'
        }}>What are your delivery charges?</h3>
        <p style={{ color: '#666' }}>
          Our delivery charges vary from area to area. Upon selecting your delivery area, delivery charges will appear in the cart total.
        </p>
      </div>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'medium',
          color: '#666',
          marginBottom: '8px'
        }}>How can I submit my complaint/feedback?</h3>
        <p style={{ color: '#666' }}>You can call us at 021111529233</p>
      </div>
    </div>
  </div>
);

export default DeliveryFaq;
