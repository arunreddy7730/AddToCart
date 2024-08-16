import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            // If the product exists, update the quantity and totalPrice
            setCart(prevCart =>
                prevCart.map(item => 
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price }
                        : item
                )
            );
        } else {
            // If the product is new, add it to the cart with quantity 1 and the original price
            setCart(prevCart => [...prevCart, { ...product, quantity: 1, totalPrice: product.price }]);
        }
    };

    const updateCartItemQuantity = (id, change) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity > 0) {
                        const newTotalPrice = item.price * newQuantity; // Update the total price
                        return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
                    }
                }
                return item;
            }).filter(item => item.quantity > 0) // Remove item if quantity goes to zero
        );
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
