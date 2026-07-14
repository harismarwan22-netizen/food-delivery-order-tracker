// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoreList from './pages/StoreList';
import FoodOrder from './pages/FoodOrder.js';
import OrderTracking from './pages/OrderTracking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/stores" replace />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/order/:storeId" element={<FoodOrder />} />
          <Route path="/tracking/:orderId" element={<OrderTracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;