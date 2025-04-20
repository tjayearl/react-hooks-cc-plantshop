// src/components/PlantCard.js
import React, { useState } from "react"; // Import useState hook

// Accept plant details (name, image, price) as props
function PlantCard({ name, image, price }) {
  // State to track if the plant is in stock, default is true
  const [isInStock, setIsInStock] = useState(true);

  // Function to toggle the inStock state when the button is clicked
  function handleToggleStock() {
    setIsInStock((currentStockStatus) => !currentStockStatus);
  }

  return (
    <li className="card" data-testid="plant-item">
      {/* Display plant image and name using props */}
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {/* Display plant price using props */}
      <p>Price: {price}</p>
      {/* Conditionally render the button based on isInStock state */}
      {isInStock ? (
        <button className="primary" onClick={handleToggleStock}>
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
