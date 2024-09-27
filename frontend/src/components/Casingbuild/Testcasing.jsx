import React, { useState } from 'react';
import './Testcasing.css'; // Ensure to create a corresponding CSS file for styling
import { casingsData } from '../../data'; // Adjust this path according to your project structure
import { useNavigate } from 'react-router-dom';

export const Testcasing = () => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredCasings = casingsData.filter(
    (casing) =>
      (!minBudget || casing.price >= minBudget) &&
      (!maxBudget || casing.price <= maxBudget)
  );

  const sortedCasings = filteredCasings.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (casing) => {
    navigate('/PCBuilder', { state: { selectedCasing: { name: casing.name, cost: casing.price } } });
  };

  return (
    <div className="casing-container">
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

      <div className="casing-list">
        {sortedCasings.map((casing) => (
          <div className="casing-card" key={casing.id}>
            <img src={casing.img} alt={casing.name} className="casing-image" />
            <h4>{casing.name}</h4>
            <div className="casing-details">
              <p>Form Factor: {casing.formFactor}</p>
              <p>Material: {casing.material}</p>
            </div>
            <p className="price">₹{casing.price}</p>
            <button className="add-btn" onClick={() => handleAdd(casing)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
