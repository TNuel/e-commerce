import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value); // Trigger the search callback with the current search term
  };

  return (
    <div>
      <label htmlFor="searchInput">Search:</label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default SearchInput;
