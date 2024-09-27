import React, { useState } from 'react';
import './Testprinter.css';
import { printersData } from '../../data'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

export const Testprinter = () => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredPrinters = printersData.filter(
    (printer) =>
      (!minBudget || printer.price >= minBudget) &&
      (!maxBudget || printer.price <= maxBudget)
  );

  const sortedPrinters = filteredPrinters.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (printer) => {
    navigate('/PCBuilder', { state: { selectedPrinter: { name: printer.name, cost: printer.price } } });
  };

  return (
    <div className="printer-container">
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

      <div className="printer-list">
        {sortedPrinters.map((printer) => (
          <div className="printer-card" key={printer.id}>
            <img src={printer.img} alt={printer.name} className="printer-image" />
            <h4>{printer.name}</h4>
            <div className="printer-details">
              <p>Type: {printer.type}</p>
              <p>Color: {printer.color}</p>
              <p>Connectivity: {printer.connectivity}</p>
            </div>
            <p className="price">₹{printer.price}</p>
            <button className="add-btn" onClick={() => handleAdd(printer)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
