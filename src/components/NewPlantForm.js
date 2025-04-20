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

    // Basic validation: Check if fields are empty
    if (!name || !image || !price) {
      alert("Please fill in all fields.");
      return; // Stop submission if validation fails
    }

    // Create a new plant object from the form state
    // Ensure price is stored as a number
    const newPlant = {
      name: name,
      image: image,
      price: parseFloat(price), // Convert price string to number
    };

    // Check if price conversion resulted in NaN (e.g., if input was not a valid number)
    if (isNaN(newPlant.price)) {
        alert("Please enter a valid price.");
        return; // Stop submission if price is not a number
    }


    // Send a POST request to the API to add the new plant
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => {
        // Check if the response was successful (status code 2xx)
        if (!res.ok) {
          // If not ok, throw an error to be caught by .catch()
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse the JSON body of the response
      })
      .then((addedPlant) => {
        // Call the onAddPlant callback passed from PlantPage
        // This updates the state in the parent component
        onAddPlant(addedPlant);
        // Reset the form fields after successful submission
        setName("");
        setImage("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
        // Optionally, inform the user that something went wrong
        alert(`Failed to add plant: ${error.message}`);
      });
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
          required // Add basic HTML5 validation
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          // Control the input value with state
          value={image}
          // Update the image state when the input changes
          onChange={(e) => setImage(e.target.value)}
           required // Add basic HTML5 validation
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
           required // Add basic HTML5 validation
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
