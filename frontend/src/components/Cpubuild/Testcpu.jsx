import React, { useState } from 'react';
import './Testcpu.css';
import { processorsData } from '../../data'; // Assuming your data is imported correctly

export const Testcpu = () => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState(''); // New state for sorting

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  // Filter the processors by budget
  const filteredProcessors = processorsData.filter(
    (processor) =>
      (!minBudget || processor.price >= minBudget) &&
      (!maxBudget || processor.price <= maxBudget)
  );

  // Sort the processors based on the selected option
  const sortedProcessors = filteredProcessors.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'performance':
        // Assuming performance is a property indicating high performance
        return b.performance - a.performance;
      default:
        return 0;
    }
  });

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
          <option value="performance">High Performance</option>
        </select>
      </div>

      <div className="processor-list">
        {sortedProcessors.map((processor, index) => (
          <div className="processor-card" key={index}>
            <img
              src={processor.image}
              alt={processor.name}
              className="processor-image"
            />
            <h4>{processor.name}</h4>
            <div className="processor-details">
              <p>Speed: {processor.speed}</p>
              <p>Cache: {processor.cache}</p> {/* Cache is shown here */}
              <p>Cores: {processor.cores}</p>
              <p>Memory Speed: {processor.memorySpeed}</p>
            </div>
            <p className="price">{processor.price}৳</p>
            <button className="add-button">Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};
