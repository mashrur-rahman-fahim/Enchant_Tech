
import React, { useEffect, useState } from 'react';
import './TestRam.css'; // Ensure this file includes the necessary styles
import { useNavigate } from 'react-router-dom';

export const TestRam = () => {
  const [ramsData, setRamsData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRams = async () => {
      try {
        const response = await fetch('/data/rams.json'); // Adjust the path if necessary
        const data = await response.json();
        setRamsData(data.rams);
      } catch (error) {
        console.error('Error fetching RAMs:', error);
      }
    };

    fetchRams();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance);
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly);

  const filteredRams = ramsData.filter((ram) => {
    const meetsBudget =
      (!minBudget || ram.price >= minBudget) &&
      (!maxBudget || ram.price <= maxBudget);
    const meetsPerformance = !highPerformance || ram.performance; // Check if performance is true
    const isPopular = !popularOnly || ram.popularity === 'Popular'; // Check for popularity

    return meetsBudget && meetsPerformance && isPopular;
  });

  const sortedRams = filteredRams.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;

      case 'high-performance':
        return (b.performance ? 1 : 0) - (a.performance ? 1 : 0);
      case 'popularity':
        return (b.popularity === 'Popular' ? 1 : 0) - (a.popularity === 'Popular' ? 1 : 0);

      default:
        return 0;
    }
  });

  const handleAdd = (ram) => {

    navigate('/PCBuilder', {

      state: { selectedRam: { name: ram.name, cost: ram.price } },
    });
  };

  return (
    <div className="ram-container">
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

      <div className="ram-list">
        {sortedRams.map((ram) => (
          <div className="ram-card" key={ram.id}>
            <img src={ram.img} alt={ram.name} className="ram-image" />
            <h4>{ram.name}</h4>
            <div className="ram-details">
              <p>Capacity: {ram.capacity}</p>
              <p>Speed: {ram.speed}</p>
              <p>Type: {ram.type}</p>

              <p>Voltage: {ram.voltage}</p>
              <p>Channels: {ram.channels}</p>

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
