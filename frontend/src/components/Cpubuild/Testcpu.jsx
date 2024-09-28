import React, { useState } from "react";
import "./Testcpu.css"; // Ensure this file includes the necessary styles
import { processorsData } from "../../data";
import { useNavigate } from "react-router-dom";

export const Testcpu = () => {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredProcessors = processorsData.filter(
    (processor) =>
      (!minBudget || processor.price >= minBudget) &&
      (!maxBudget || processor.price <= maxBudget)
  );

  const sortedProcessors = filteredProcessors.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (processor) => {
    navigate("/PCBuilder", {
      state: {
        selectedProcessor: { name: processor.name, cost: processor.price },
      },
    });
  };

  return (
    <div className="cpu-container">
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

      <div className="processor-list">
        {sortedProcessors.map((processor) => (
          <div className="processor-card" key={processor.id}>
            <img
              src={processor.img}
              alt={processor.name}
              className="processor-image"
            />
            <h4>{processor.name}</h4>
            <div className="processor-details">
              <p>Speed: {processor.speed}</p>
              <p>Cache L2: {processor.cacheL2}</p>
              <p>Cache L3: {processor.cacheL3}</p>
              <p>Cores: {processor.cores}</p>
              <p>Memory Speed: {processor.memorySpeed}</p>
            </div>
            <p className="price">₹{processor.price}</p>
            <button className="add-btn" onClick={() => handleAdd(processor)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
