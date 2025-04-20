// src/components/NewPlantForm.js
import React, { useState } from "react"; // Import useState hook

const API = "http://localhost:6001/plants";

// Accept the onAddPlant callback function as a prop
function NewPlantForm({ onAddPlant }) {
  // State for each form input field
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default page reload on form submit

    // Create a new plant object from the form state
    // Ensure price is stored as a number
    const newPlant = {
      name: name,
      image: image,
      price: parseFloat(price) || 0, // Convert price string to number, default to 0 if invalid
    };

    // Send a POST request to the API to add the new plant
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((addedPlant) => {
        // Call the onAddPlant callback passed from PlantPage
        // This updates the state in the parent component
        onAddPlant(addedPlant);
        // Reset the form fields after successful submission
        setName("");
        setImage("");
        setPrice("");
      })
      .catch((error) => console.error("Error adding plant:", error));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {/* Attach the handleSubmit function to the form's onSubmit event */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          // Control the input value with state
          value={name}
          // Update the name state when the input changes
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          // Control the input value with state
          value={image}
          // Update the image state when the input changes
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01" // Allow decimal values for price
          placeholder="Price"
          // Control the input value with state
          value={price}
          // Update the price state when the input changes
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
