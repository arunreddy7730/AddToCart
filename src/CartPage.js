import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./Cart.css"; // Ensure you have the CSS file for styling

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart } =
    useContext(CartContext);

  const handleQuantityChange = (id, change) => {
    updateCartItemQuantity(id, change);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };
  

  // Calculate total cart price
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return (
    <>
      <header>
        <div className="logo_div">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.8OMFA9whxc7CqD12FW9D9QHaFj&pid=Api&P=0&h=220"
            alt="globe-logo"
          />
        </div>
        <div className="menu_div">
          <ul>
            <li>Home page</li>
            <li>Shop</li>
            <li>Product</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{cart.length}</span> {/* Display cart count */}
        </div>
      </header>

      <div className="cart-page">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items-container">
            {cart.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>
                    <strong>Price: </strong>₹{item.price}
                  </p>
                  <p>
                    <strong>Total: </strong>₹{item.totalPrice}
                  </p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                    <button onClick={() => handleRemove(item.id)}>
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total Cart Price: ₹{totalCartPrice.toFixed(2)}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
