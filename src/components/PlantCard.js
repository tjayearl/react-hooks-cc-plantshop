import React, { useState } from "react";

function PlantCard({ id, image, name, price }) {
  const [isInStock, setIsInStock] = useState(true);

  function handleStockClick() {
    setIsInStock(!isInStock);
  }

  function handleImageClick() {
    console.log(`Clicked on the image for: ${name}`);
    // You could add different logic here if needed
  }

  return (
    <li className="card" data-testid="plant-item">
      {/* This img tag will now use the Pexels URL from db.json */}
      <img
        src={image} // Uses the image URL from the fetched data
        alt={name}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
        // Optional: Add error handling for broken images
        onError={(e) => { e.target.onerror = null; e.target.src="path/to/default/image.png" }}
      />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleStockClick} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
