import React, { useState } from 'react';
import './App.css';

// Aapke kapron ki items aur 4000 se kam prices
const initialProducts = [
  { id: 1, name: "Red Floral Dress", price: 3200, img: "https://unsplash.com" },
  { id: 2, name: "Black & Maroon Tunic", price: 2800, img: "https://unsplash.com" },
  { id: 3, name: "Leopard Print Dress", price: 3500, img: "https://unsplash.com" },
  { id: 4, name: "Elegant Yellow Tunic", price: 2400, img: "https://unsplash.com" }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div>
      <nav className="navbar">
        <h2>🛍️ My Boutique Shop</h2>
        <div>
          <strong>Cart Items:</strong> {cart.reduce((a, b) => a + b.qty, 0)}
        </div>
      </nav>

      <div className="product-grid">
        {initialProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rs. {product.price}</p>
            <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>🛒 Shopping Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty.</p> : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name} (x{item.qty})</h4>
                  <p>Rs. {item.price * item.qty}</p>
                </div>
                <button className="btn" style={{backgroundColor: '#ff4d4d', color: 'white', border: 'none'}} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <h3 style={{marginTop: '20px'}}>Total Amount: Rs. {cartTotal}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;