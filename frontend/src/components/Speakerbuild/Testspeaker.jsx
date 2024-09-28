import React, { useState } from "react";
import "./Testspeaker.css"; // Ensure to create a corresponding CSS file for styling
import { speakersData } from "../../data"; // Adjust this path according to your project structure
import { useNavigate } from "react-router-dom";

export const Testspeaker = () => {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredSpeakers = speakersData.filter(
    (speaker) =>
      (!minBudget || speaker.price >= minBudget) &&
      (!maxBudget || speaker.price <= maxBudget)
  );

  const sortedSpeakers = filteredSpeakers.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (speaker) => {
    navigate("/PCBuilder", {
      state: { selectedSpeaker: { name: speaker.name, cost: speaker.price } },
    });
  };

  return (
    <div className="speaker-container">
      <div className="filter-section">
        <h3>Budget</h3>
        <input
          type="number"
          placeholder="min"
          value={minBudget}
          onChange={handleMinBudgetChange}
        />
        <input
          type="number"
          placeholder="max"
          value={maxBudget}
          onChange={handleMaxBudgetChange}
        />
        <button>Apply</button>

        <h3>Sort By</h3>
        <select onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="speaker-list">
        {sortedSpeakers.map((speaker) => (
          <div className="speaker-card" key={speaker.id}>
            <img
              src={speaker.img}
              alt={speaker.name}
              className="speaker-image"
            />
            <h4>{speaker.name}</h4>
            <div className="speaker-details">
              <p>Type: {speaker.type}</p>
              <p>Power: {speaker.power}</p>
            </div>
            <p className="price">₹{speaker.price}</p>
            <button className="add-btn" onClick={() => handleAdd(speaker)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
