import React, { useState } from "react";
import "./Testups.css";
import { upsData } from "../../data"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

export const Testups = () => {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredUPSs = upsData.filter(
    (ups) =>
      (!minBudget || ups.price >= minBudget) &&
      (!maxBudget || ups.price <= maxBudget)
  );

  const sortedUPSs = filteredUPSs.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (ups) => {
    navigate("/PCBuilder", {
      state: { selectedUPS: { name: ups.name, cost: ups.price } },
    });
  };

  return (
    <div className="ups-container">
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

      <div className="ups-list">
        {sortedUPSs.map((ups) => (
          <div className="ups-card" key={ups.id}>
            <img src={ups.img} alt={ups.name} className="ups-image" />
            <h4>{ups.name}</h4>
            <div className="ups-details">
              <p>Capacity: {ups.capacity}</p>
              <p>Outlets: {ups.outlets}</p>
            </div>
            <p className="price">₹{ups.price}</p>
            <button className="add-btn" onClick={() => handleAdd(ups)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
