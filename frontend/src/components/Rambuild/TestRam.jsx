import React, { useState } from "react";
import "./TestRam.css"; // Ensure to create a corresponding CSS file
import { ramData } from "../../data"; // Replace this with the correct path to your RAM data
import { useNavigate } from "react-router-dom";

export const TestRam = () => {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredRams = ramData.filter(
    (ram) =>
      (!minBudget || ram.price >= minBudget) &&
      (!maxBudget || ram.price <= maxBudget)
  );

  const sortedRams = filteredRams.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "performance":
        return b.performance - a.performance; // Assuming you have a performance metric
      default:
        return 0;
    }
  });

  const handleAdd = (ram) => {
    navigate("/PCBuilder", {
      state: { selectedRam: { name: ram.name, cost: ram.price } },
    });
  };

  return (
    <div className="ram-container">
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
          <option value="performance">High Performance</option>
        </select>
      </div>

      <div className="ram-list">
        {sortedRams.map((ram) => (
          <div className="ram-card" key={ram.id}>
            <img src={ram.img} alt={ram.name} className="ram-image" />
            <h4>{ram.name}</h4>
            <div className="ram-details">
              <p>Capacity: {ram.capacity}</p>
              <p>Speed: {ram.speed}</p>
              <p>Type: {ram.type}</p>
              <p>Memory Channels: {ram.channels}</p>{" "}
              {/* Update this if your data uses a different property name */}
            </div>
            <p className="price">₹{ram.price}</p>
            <button className="add-btn" onClick={() => handleAdd(ram)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
