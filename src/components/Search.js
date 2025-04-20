// src/components/Search.js
import React from "react";

// Accept searchTerm state and onSearchChange callback as props
function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        // Make the input a controlled component by setting its value
        value={searchTerm}
        // Call the onSearchChange callback when the input value changes
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
