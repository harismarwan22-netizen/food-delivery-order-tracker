// pages/FoodOrder.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FoodOrder.css';

const FoodOrder = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Mock data - in real app, you'd fetch this based on storeId
  const store = {
    id: 1,
    name: "Burger Palace",
    cuisine: "American • Burgers • Fast Food"
  };

  const menuItems = [
    {
      id: 1,
      name: "Classic Cheeseburger",
      description: "Beef patty with cheese, lettuce, tomato, and special sauce",
      price: 180,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      category: "Burgers"
    },
    {
      id: 2,
      name: "Crispy Chicken Burger",
      description: "Crispy fried chicken with coleslaw and mayo",
      price: 150,
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80",
      category: "Burgers"
    },
    {
      id: 3,
      name: "Loaded Fries",
      description: "Crispy fries topped with cheese, bacon, and green onions",
      price: 100,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
      category: "Sides"
    },
    {
      id: 4,
      name: "Chocolate Milkshake",
      description: "Creamy chocolate milkshake with whipped cream",
      price: 80,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80",
      category: "Drinks"
    },
    {
      id: 5,
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables and vegan mayo",
      price: 120,
      image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=600&q=80",
      category: "Burgers"
    },
    {
      id: 6,
      name: "Onion Rings",
      description: "Crispy beer-battered onion rings with dipping sauce",
      price: 60,
      image: "https://media.istockphoto.com/id/185258609/photo/cooked-onion-rings-with-dipping-sauce-in-a-white-cup.jpg?s=2048x2048&w=is&k=20&c=4Q04twiM4JbDeXxijFq5rfJHx1__1HpclAXdj2M1uXQ=",
      category: "Sides"
    }
  ];

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // In a real app, you'd send the order to your backend
    const orderId = Math.random().toString(36).substr(2, 9);
    navigate(`/tracking/${orderId}`);
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="food-order-page">
      <div className="order-header">
        <h1>{store.name}</h1>
        <p>{store.cuisine}</p>
      </div>

      <div className="order-content">
        <div className="menu-section">
          <h2>Menu</h2>
          {categories.map(category => (
            <div key={category} className="category-section">
              <h3>{category}</h3>
              <div className="menu-items">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <div key={item.id} className="menu-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <div className="item-price"> ₹{item.price}</div>
                        <button 
                          className="add-to-cart-btn" 
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-section">
          <h3>Your Cart ({cart.length})</h3>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h5>{item.name}</h5>
                      <p> ₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <strong>Total:  ₹{getTotalPrice().toFixed(2)}</strong>
              </div>
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                🛒 Checkout Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodOrder;