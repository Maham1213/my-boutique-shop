import React, { useState } from 'react';
import './App.css';

// 9 Beautiful Boutique Products (All under Rs. 4000) with working high-quality images
const initialProducts = [
  { id: 1, name: "Red Floral Luxury Dress", price: 3500, img: "https://i.postimg.cc/7Z9q3XQH/red-dress.jpg" },
  { id: 2, name: "Black & Maroon Tunic", price: 2800, img: "https://i.postimg.cc/d3c0H32b/black-and-mehroon.jpg" },
  { id: 3, name: "Print Party Shirt", price: 1200, img: "https://i.postimg.cc/m2DxxRdB/print-party-dress.jpg" },
  { id: 4, name: "Elegant Yellow frock", price: 2500, img: "https://i.postimg.cc/vHjNpng7/yellow.jpg" },
  { id: 5, name: "Wedding Wear", price: 1950, img: "https://i.post img.cc/t4Nm7MvR/wedding-wear.jpg" },
  { id: 6, name: "Royal White dress", price: 4000, img: "https://i.postimg.cc/7hSnd5pf/white.jpg" },
  { id: 7, name: "Traditional Pink Printed Frock", price: 2600, img: "https://i.postimg.cc/gJWJ4rq4/pinl.jpg" },
  { id: 8, name: "Blue long frock", price: 1800, img: "https://i.postimg.cc/qRwkLw7k/blue.jpg" },
  { id: 9, name: "Designer Black Velvet frock", price: 3100, img: "https://i.postimg.cc/KYFSHTwR/black.jpg" }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImg, setNewImg] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return alert("Please fill Name and Price!");
    if (Number(newPrice) > 4000) return alert("Price must be under Rs. 4000!");
    
    const newProduct = {
      id: Date.now(),
      name: newName,
      price: Number(newPrice),
      img: newImg || "https://unsplash.com"
    };

    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewImg('');
  };

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
        <h2>🛍️ Royal Boutique Studio</h2>
        <div>
          <strong>Cart Items:</strong> {cart.reduce((a, b) => a + b.qty, 0)}
        </div>
      </nav>

      {/* Owner Panel */}
      <div className="admin-section" style={{ background: '#fff', margin: '30px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, color: '#232f3e' }}>✨ Owner Panel: Add Your Masterpieces</h3>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="Dress Name" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1, minWidth: '150px' }} />
          <input type="number" placeholder="Price (Max Rs. 4000)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '150px' }} />
          <input type="text" placeholder="Online Image URL (Optional)" value={newImg} onChange={(e) => setNewImg(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1, minWidth: '150px' }} />
          <button type="submit" className="btn" style={{ margin: 0, background: '#131921', color: 'white', border: 'none', padding: '10px 20px', width: 'auto', borderRadius: '20px' }}>Publish Item</button>
        </form>
      </div>

      {/* 9 Blocks Grid */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ fontSize: '18px', margin: '10px 0 5px' }}>{product.name}</h3>
            <p style={{ color: '#b12704', fontWeight: 'bold', margin: '0 0 10px' }}>Rs. {product.price}</p>
            <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>🛒 Client Shopping Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty.</p> : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name} (x{item.qty})</h4>
                  <p>Rs. {item.price * item.qty}</p>
                </div>
                <button className="btn" style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', width: 'auto' }} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <h3 style={{ marginTop: '20px' }}>Total Amount: Rs. {cartTotal}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
