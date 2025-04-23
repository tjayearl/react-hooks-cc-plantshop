import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

// Accept onAddPlant prop from App
function PlantPage({ plants, onAddPlant, search, setSearch }) {
  return (
    <main>
      {/* Pass onAddPlant down to NewPlantForm */}
      <NewPlantForm onAddPlant={onAddPlant}/>
      <Search search={search} setSearch={setSearch}/>
      {/* PlantList receives the potentially filtered list */}
      <PlantList plants={plants}/>
    </main>
  );
}

export default PlantPage;
