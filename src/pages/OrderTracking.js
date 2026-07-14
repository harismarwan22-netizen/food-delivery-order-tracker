// pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [currentActive, setCurrentActive] = useState(1);
  const [remainingTime, setRemainingTime] = useState(20); // in minutes

  const statuses = [
    "Your order has been placed! 🛒",
    "Your food is being prepared 👨‍🍳",
    "Your delivery partner is on the way 🚴‍♂️",
    "Order delivered! 🎉 Enjoy your meal!"
  ];

  const driverPath = [
    [10.773372, 106.700981], // restaurant
    [10.778372, 106.705981],
    [10.782372, 106.710981],
    [10.787372, 106.715981], // near delivery point
  ];

  // Simulate automatic progress
  useEffect(() => {
    const simulation = setInterval(() => {
      setCurrentActive(prev => {
        if (prev < 4) {
          return prev + 1;
        }
        return prev;
      });
    }, 5000); // advance every 5 seconds

    return () => clearInterval(simulation);
  }, []);

  // Countdown timer for ETA
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 60000); // decrease every 1 minute

    return () => clearInterval(timer);
  }, []);

  const progressWidth = ((currentActive - 1) / 3) * 100;

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h1>🍔 Order Tracking</h1>
        <p>Order ID: {orderId}</p>
      </div>
      
      <div className="status-text">
        {statuses[currentActive - 1]}
      </div>

      <div className="progressbar">
        <div 
          className="progress" 
          style={{ width: `${progressWidth}%` }}
        ></div>
        <div className={`step ${currentActive >= 1 ? 'active' : ''}`}>🛒</div>
        <div className={`step ${currentActive >= 2 ? 'active' : ''}`}>👨‍🍳</div>
        <div className={`step ${currentActive >= 3 ? 'active' : ''}`}>🚴‍♂️</div>
        <div className={`step ${currentActive >= 4 ? 'active' : ''}`}>🏠</div>
      </div>

      <div className="labels">
        <span>Placed</span>
        <span>Preparing</span>
        <span>On the Way</span>
        <span>Delivered</span>
      </div>

      <div className="eta">
        {remainingTime > 0 ? (
          <>Estimated delivery in: <strong>{remainingTime} min</strong></>
        ) : (
          <strong>Delivered ✔️</strong>
        )}
      </div>

      <div className="map-container">
        <iframe
          title="Delivery Map"
          src={`https://maps.google.com/maps?q=${driverPath[currentActive - 1][0]},${driverPath[currentActive - 1][1]}&z=14&output=embed`}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="order-details">
        <h3>Order Summary</h3>
        <div className="detail-item">
          <span>Order Number:</span>
          <span>{orderId}</span>
        </div>
        <div className="detail-item">
          <span>Restaurant:</span>
          <span>Burger Palace</span>
        </div>
        <div className="detail-item">
          <span>Delivery Address:</span>
          <span>123 Main St, City, State</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;