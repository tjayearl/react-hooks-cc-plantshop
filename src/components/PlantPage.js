// src/components/PlantPage.js
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API = "http://localhost:6001/plants";

function PlantPage() {
  // State for the list of plants
  const [plants, setPlants] = useState([]);
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants from the API when the component mounts
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []); // Empty dependency array ensures this runs only once on mount

  // Callback function to add a new plant to the list
  function handleAddPlant(newPlant) {
    // Update the plants state by adding the new plant to the existing array
    setPlants([...plants, newPlant]);
  }

  // Callback function to update the search term state
  function handleSearchChange(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  // Filter the plants based on the current search term
  // The filter is case-insensitive
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Pass the handleAddPlant callback to the NewPlantForm */}
      <NewPlantForm onAddPlant={handleAddPlant} />
      {/* Pass the searchTerm state and handleSearchChange callback to Search */}
      <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {/* Pass the filtered list of plants to PlantList */}
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
