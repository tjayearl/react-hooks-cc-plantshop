// src/components/PlantList.js
import React from "react";
import PlantCard from "./PlantCard";

// Accept the 'plants' array as a prop
function PlantList({ plants }) {
  return (
    <ul className="cards">
      {/* Map over the plants array */}
      {plants.map((plant) => (
        // Render a PlantCard for each plant
        // Pass plant data as props and include a unique key
        <PlantCard
          key={plant.id}
          id={plant.id} // Pass id, might be useful later
          name={plant.name}
          image={plant.image}
          price={plant.price}
        />
      ))}
    </ul>
  );
}

export default PlantList;
