import React, { useState } from 'react';
import './Testpowersupply.css'; // Ensure to create a corresponding CSS file for styling
import { powerSupplyData } from '../../data'; // Adjust this path according to your project structure
import { useNavigate } from 'react-router-dom';

export const Testpowersupply = () => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredPowerSupplies = powerSupplyData.filter(
    (powerSupply) =>
      (!minBudget || powerSupply.price >= minBudget) &&
      (!maxBudget || powerSupply.price <= maxBudget)
  );

  const sortedPowerSupplies = filteredPowerSupplies.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (powerSupply) => {
    navigate('/PCBuilder', { state: { selectedPowerSupply: { name: powerSupply.name, cost: powerSupply.price } } });
  };

  return (
    <div className="powersupply-container">
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

      <div className="powersupply-list">
        {sortedPowerSupplies.map((powerSupply) => (
          <div className="powersupply-card" key={powerSupply.id}>
            <img src={powerSupply.img} alt={powerSupply.name} className="powersupply-image" />
            <h4>{powerSupply.name}</h4>
            <div className="powersupply-details">
              <p>Wattage: {powerSupply.wattage}</p>
              <p>Efficiency: {powerSupply.efficiency}</p>
            </div>
            <p className="price">₹{powerSupply.price}</p>
            <button className="add-btn" onClick={() => handleAdd(powerSupply)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
