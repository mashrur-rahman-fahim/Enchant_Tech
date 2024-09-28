
import React, { useEffect, useState } from 'react';
import './Testmotherboard.css'; // Ensure this file includes the necessary styles
import { useNavigate } from 'react-router-dom';

export const Motherboardbuild = () => {
  const [motherboardData, setMotherboardData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  const navigate = useNavigate();

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/motherboards.json'); // Adjust the path as necessary
        const data = await response.json();
        setMotherboardData(data); // Assuming the data structure is an array
      } catch (error) {
        console.error('Error fetching motherboards:', error);
      }
    };
    fetchData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance);
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly);

  // Filtering logic
  const filteredMotherboards = motherboardData.filter((motherboard) => {
    const meetsBudget =
      (!minBudget || motherboard.price >= Number(minBudget)) &&
      (!maxBudget || motherboard.price <= Number(maxBudget));
    const meetsPerformance = !highPerformance || motherboard.performance >= 90; // Filter for high performance (assuming a threshold of 90)
    const isPopular = !popularOnly || motherboard.popularity === 'Popular'; // Check if motherboard is popular

    return meetsBudget && meetsPerformance && isPopular;
  });

  // Sorting logic
  const sortedMotherboards = filteredMotherboards.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;

      case 'high-performance':
        return b.performance - a.performance; // Sort by performance
      case 'popularity':
        return (b.popularity === 'Popular' ? 1 : 0) - (a.popularity === 'Popular' ? 1 : 0);

      default:
        return 0;
    }
  });

  const handleAdd = (motherboard) => {

    navigate('/PCBuilder', {
      state: { selectedMotherboard: { name: motherboard.name, cost: motherboard.price } },

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
        <button onClick={() => { setMinBudget(''); setMaxBudget(''); }}>Clear</button>

        <h3>Sort By</h3>
        <select onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="high-performance">High Performance</option>
          <option value="popularity">Popularity</option>
        </select>

        <h3>Filters</h3>
        <label>
          <input
            type="checkbox"
            checked={highPerformance}
            onChange={handleHighPerformanceChange}
          />
          High Performance
        </label>
        <label>
          <input
            type="checkbox"
            checked={popularOnly}
            onChange={handlePopularOnlyChange}
          />
          Popular
        </label>
      </div>

      <div className="motherboard-list">

        {sortedMotherboards.length > 0 ? (
          sortedMotherboards.map((motherboard) => (
            <div className="motherboard-card" key={motherboard.id}>
              <img src={motherboard.img} alt={motherboard.name} className="motherboard-image" />
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
          ))
        ) : (
          <p>No motherboards found for the given criteria.</p>
        )}
      </div>
    </div>
  );
};
