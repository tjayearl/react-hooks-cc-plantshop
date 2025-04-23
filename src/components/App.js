import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch plants on initial render
  useEffect(() => {
    fetch("http://localhost:6001/plants") // Fetches from your json-server
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        // console.log("Fetched plants:", data); // For debugging
      })
      .catch(error => console.error("Error fetching plants:", error)); // Add error handling
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter plants based on search term
  const filteredPlants = plants.filter((plant) => {
    // Add safety check for plant.name
    return plant.name && plant.name.toLowerCase().includes(search.toLowerCase());
  });

  // Function to add a new plant to the state
  function handleAddPlant(newPlant) {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
  }

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;
