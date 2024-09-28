import React, { useState } from "react";
import "./TestGpu.css"; // Create a CSS file for GPU-specific styles
import { gpusData } from "../../data"; // Import your GPU data from the data file
import { useNavigate } from "react-router-dom";

export const TestGpu = () => {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredGpus = gpusData.filter(
    (gpu) =>
      (!minBudget || gpu.price >= minBudget) &&
      (!maxBudget || gpu.price <= maxBudget)
  );

  const sortedGpus = filteredGpus.sort((a, b) => {
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

  const handleAdd = (gpu) => {
    navigate("/PCBuilder", {
      state: { selectedGpu: { name: gpu.name, cost: gpu.price } },
    });
  };

  return (
    <div className="gpu-container">
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

      <div className="gpu-list">
        {sortedGpus.map((gpu) => (
          <div className="gpu-card" key={gpu.id}>
            <img src={gpu.img} alt={gpu.name} className="gpu-image" />
            <h4>{gpu.name}</h4>
            <div className="gpu-details">
              <p>Memory: {gpu.memory} GB</p>
              <p>Core Clock: {gpu.coreClock} MHz</p>
              <p>Boost Clock: {gpu.boostClock} MHz</p>
              <p>CUDA Cores: {gpu.cudaCores}</p>
              <p>Interface: {gpu.interface}</p>
            </div>
            <p className="price">₹{gpu.price}</p>
            <button className="add-btn" onClick={() => handleAdd(gpu)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
