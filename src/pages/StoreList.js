// pages/StoreList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StoreList.css';

const StoreList = () => {
  const navigate = useNavigate();

  const stores = [
    {
      id: 1,
      name: "Burger Palace",
      cuisine: "American • Burgers • Fast Food",
      rating: 4.5,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: 2,
      name: "Pizza Heaven",
      cuisine: "Italian • Pizza • Pasta",
      rating: 4.7,
      deliveryTime: "25-35 min",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      featured: false
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Japanese • Sushi • Asian",
      rating: 4.8,
      deliveryTime: "30-40 min",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: 4,
      name: "Taco Fiesta",
      cuisine: "Mexican • Tacos • Street Food",
      rating: 4.4,
      deliveryTime: "15-25 min",
      image: "https://images.unsplash.com/photo-1627564803215-ad55bad5c5ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      featured: false
    },
    {
      id: 5,
      name: "Healthy Bowls",
      cuisine: "Healthy • Salads • Bowls",
      rating: 4.6,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      featured: false
    },
    {
      id: 6,
      name: "Dessert Delight",
      cuisine: "Desserts • Bakery • Sweets",
      rating: 4.9,
      deliveryTime: "15-20 min",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80",
      featured: true
    }
  ];

  const handleStoreClick = (storeId) => {
    navigate(`/order/${storeId}`);
  };

  return (
    <div className="store-list-page">
      <div className="store-header">
        <h1>🍔 Food Delivery</h1>
        <p>Choose from our best restaurants</p>
      </div>

      <div className="stores-container">
        {stores.map(store => (
          <div 
            key={store.id} 
            className={`store-card ${store.featured ? 'featured' : ''}`}
            onClick={() => handleStoreClick(store.id)}
          >
            <div className="store-image">
              <img src={store.image} alt={store.name} />
              {store.featured && <span className="featured-badge">⭐ Featured</span>}
            </div>
            <div className="store-info">
              <h3>{store.name}</h3>
              <p className="cuisine">{store.cuisine}</p>
              <div className="store-details">
                <span className="rating">⭐ {store.rating}</span>
                <span className="delivery-time">🚴 {store.deliveryTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;