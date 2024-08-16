import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './CartPage';
import { CartProvider } from './CartContext';
import DataFetchAxios from './DataFetchAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



function App() {
  return (
    <CartProvider>  {/* Wrap the Router with the CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<DataFetchAxios />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
