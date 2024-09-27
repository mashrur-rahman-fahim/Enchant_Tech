import React, { useState } from 'react';
import './Testkeyboard.css';
import { keyboardsData } from '../../data'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

export const Testkeyboard = () => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredKeyboards = keyboardsData.filter(
    (keyboard) =>
      (!minBudget || keyboard.price >= minBudget) &&
      (!maxBudget || keyboard.price <= maxBudget)
  );

  const sortedKeyboards = filteredKeyboards.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (keyboard) => {
    navigate('/PCBuilder', { state: { selectedKeyboard: { name: keyboard.name, cost: keyboard.price } } });
  };

  return (
    <div className="keyboard-container">
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

      <div className="keyboard-list">
        {sortedKeyboards.map((keyboard) => (
          <div className="keyboard-card" key={keyboard.id}>
            <img src={keyboard.img} alt={keyboard.name} className="keyboard-image" />
            <h4>{keyboard.name}</h4>
            <div className="keyboard-details">
              <p>Switch Type: {keyboard.switchType}</p>
              <p>RGB Lighting: {keyboard.rgbLighting ? 'Yes' : 'No'}</p>
              <p>Connection: {keyboard.connection}</p>
            </div>
            <p className="price">₹{keyboard.price}</p>
            <button className="add-btn" onClick={() => handleAdd(keyboard)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
