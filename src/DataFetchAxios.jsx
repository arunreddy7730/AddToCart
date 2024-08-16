import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext'; // Import the CartContext
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const DataFetchAxios = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { cart, addToCart } = useContext(CartContext); // Destructure cart and addToCart from CartContext
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category === "all") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(product => product.category === category);
            setFilteredData(filtered);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product); // Add product to cart
        navigate('/cart'); // Navigate to cart page
    };

    // Handle navigation to the cart page
    const handleCartIconClick = () => {
        navigate('/cart');
    };

    if (loading) {
        return <h2>Loading.....</h2>;
    }

    if (error) {
        return <h2>Error: {error.message}</h2>;
    }

    return (
        <>
            <header>
                <div className="logo_div">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.8OMFA9whxc7CqD12FW9D9QHaFj&pid=Api&P=0&h=220" alt="globe-logo" />
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
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </div>
                <div onClick={handleCartIconClick} style={{ cursor: 'pointer' }}>
                   <FontAwesomeIcon icon={faShoppingCart} />
                   <span>{cart.length}</span> {/* Display cart count */}
                </div>
            </header >

            <div className="product-card-container">
                <h3>Data Fetching using axios</h3>
                <div className="product-cards">
                    {filteredData.map(product => (
                        <div className="product-card" key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <div className="product-details">
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <button className="cart" onClick={() => handleAddToCart(product)}>Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DataFetchAxios;
