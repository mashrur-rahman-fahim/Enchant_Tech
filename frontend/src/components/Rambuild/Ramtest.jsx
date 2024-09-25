import React, { useState } from 'react';
import './Ramtest.css'; // Ensure your CSS matches this file
import { ramData } from '../../data'; // Import your RAM data
import { useNavigate } from 'react-router-dom';

export const Ramtest = () => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filteredRam, setFilteredRam] = useState(ramData); // Store filtered RAM data
  const navigate = useNavigate();

  // Handle input changes for budget
  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  // Apply filters based on budget
  const applyFilters = () => {
    const min = minBudget ? Number(minBudget) : 0;
    const max = maxBudget ? Number(maxBudget) : Infinity;

    // Filter RAM data based on the budget
    const newFilteredRam = ramData.filter((ram) => {
      return ram.price >= min && ram.price <= max;
    });

    setFilteredRam(newFilteredRam); // Update the filtered RAM list
    setSortOption(''); // Reset sorting option when applying budget filters
  };

  // Sort the RAM data
  const sortedRam = [...filteredRam].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'performance':
        return b.performance - a.performance;
      default:
        return 0;
    }
  });

  // Handle adding RAM to the PC builder
  const handleAdd = (ram) => {
    navigate('/PCBuilder', { state: { selectedRam: { name: ram.name, cost: ram.price } } });
  };

  return (
    <div className="ram-container">
      <div className="filter-section">
        <h3>Budget</h3>
        <input
          type="number"
          placeholder="Min"
          value={minBudget}
          onChange={handleMinBudgetChange}
          aria-label="Minimum Budget"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxBudget}
          onChange={handleMaxBudgetChange}
          aria-label="Maximum Budget"
        />
        <button onClick={applyFilters}>Apply</button>

        <h3>Sort By</h3>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="performance">High Performance</option>
        </select>
      </div>

      <div className="ram-list">
        {sortedRam.map((ram) => (
          <div className="ram-card" key={ram.id}>
            <img src={ram.img} alt={ram.name} className="ram-image" />
            <h4>{ram.name}</h4>
            <div className="ram-details">
              <p>Capacity: {ram.capacity}</p>
              <p>Speed: {ram.speed}</p>
              <p>Type: {ram.type}</p>
              <p>Voltage: {ram.voltage}</p>
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
