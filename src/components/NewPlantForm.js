import React, { useState } from "react";

// Accept onAddPlant prop
function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation: ensure fields are not empty
    if (!name || !image || !price) {
        alert("Please fill out all fields.");
        return;
    }

    let newPlant = {
      name, // same as name: name
      image, // same as image: image
      price: parseFloat(price) // Ensure price is a number
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Corrected header value
      },
      body: JSON.stringify(newPlant),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(addedPlant => {
        // Call the function passed from App.js to update the state
        onAddPlant(addedPlant);
        // Clear the form fields after successful submission
        setName("");
        setImage("");
        setPrice("");
    })
    .catch(error => {
        console.error("Error adding plant:", error);
        alert("Failed to add plant. Please check the console for details.");
    });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e)=>setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
        />
        <input
          onChange={(e)=>setImage(e.target.value)}
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
        />
        <input
          onChange={(e)=>setPrice(e.target.value)}
          type="number"
          name="price"
          step="0.01" // Allows decimal prices
          placeholder="Price"
          value={price}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
