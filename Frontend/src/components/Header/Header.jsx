import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Discover a wide variety of delicious meals from your favorite restaurants, delivered hot and fresh right to your door. Enjoy fast, reliable service and an easy ordering experience—satisfy your cravings anytime, anywhere with just a few clicks!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header