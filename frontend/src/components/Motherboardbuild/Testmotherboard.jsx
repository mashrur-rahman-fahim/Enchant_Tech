import React, { useState } from "react";
import "./Testmotherboard.css";
import { motherboardData } from "../../data";
import { useNavigate } from "react-router-dom";

export const Motherboardbuild = () => {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredMotherboards = motherboardData.filter(
    (motherboard) =>
      (!minBudget || motherboard.price >= minBudget) &&
      (!maxBudget || motherboard.price <= maxBudget)
  );

  const sortedMotherboards = filteredMotherboards.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "performance":
        return b.performance - a.performance;
      default:
        return 0;
    }
  });

  const handleAdd = (motherboard) => {
    navigate("/PCBuilder", {
      state: {
        selectedMotherboard: {
          name: motherboard.name,
          cost: motherboard.price,
        },
      },
    });
  };

  return (
    <div className="motherboard-container">
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

      <div className="motherboard-list">
        {sortedMotherboards.map((motherboard) => (
          <div className="motherboard-card" key={motherboard.id}>
            <img
              src={motherboard.img}
              alt={motherboard.name}
              className="motherboard-image"
            />
            <h4>{motherboard.name}</h4>
            <div className="motherboard-details">
              <p>Socket: {motherboard.socket}</p>
              <p>Chipset: {motherboard.chipset}</p>
              <p>Form Factor: {motherboard.formFactor}</p>
              <p>Memory Slots: {motherboard.memorySlots}</p>
            </div>
            <p className="price">₹{motherboard.price}</p>
            <button className="add-btn" onClick={() => handleAdd(motherboard)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
