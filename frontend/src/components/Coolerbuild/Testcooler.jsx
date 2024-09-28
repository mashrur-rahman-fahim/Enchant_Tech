
import React, { useEffect, useState } from 'react';
import './Testcooler.css'; // Ensure this file includes the necessary styles
import { useNavigate } from 'react-router-dom';

export const Testcooler = () => {
  const [coolers, setCoolers] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false);

  const navigate = useNavigate();

  // Fetch coolers data from the backend
  useEffect(() => {
    const fetchCoolers = async () => {
      try {
        const response = await fetch('/data/coolers.json'); // Adjust the path if necessary
        const data = await response.json();
        setCoolers(data.coolers); // Assuming the data structure is similar to processors
      } catch (error) {
        console.error('Error fetching coolers:', error);
      }
    };

    fetchCoolers();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance);

  const filteredCoolers = coolers.filter((cooler) => {
    const meetsBudget =
      (!minBudget || cooler.price >= minBudget) &&
      (!maxBudget || cooler.price <= maxBudget);
    const meetsPerformance = !highPerformance || cooler.performance >= 90; // Example threshold

    return meetsBudget && meetsPerformance;
  });

  const sortedCoolers = filteredCoolers.sort((a, b) => {
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

  const handleAdd = (cooler) => {

    navigate('/PCBuilder', {

      state: { selectedCooler: { name: cooler.name, cost: cooler.price } },
    });
  };

  return (
    <div className="cooler-container">
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
          <option value="performance">Performance</option>
        </select>

        <h3>Filters</h3>
        <label>
          <input
            type="checkbox"
            checked={highPerformance}
            onChange={handleHighPerformanceChange}
          />
          High Performance (90+)
        </label>
      </div>

      <div className="cooler-list">
        {sortedCoolers.length > 0 ? (
          sortedCoolers.map((cooler) => (
            <div className="cooler-card" key={cooler.id}>
              <img src={cooler.img} alt={cooler.name} className="cooler-image" />
              <h4>{cooler.name}</h4>
              <div className="cooler-details">
                <p>Type: {cooler.type}</p>
                <p>Compatibility: {cooler.compatibility}</p>
                <p>Fan Speed: {cooler.fanSpeed}</p>
                <p>Noise Level: {cooler.noiseLevel}</p>
              </div>
              <p className="price">₹{cooler.price}</p>
              <button className="add-btn" onClick={() => handleAdd(cooler)}>
                Add
              </button>
            </div>
          ))
        ) : (
          <p>No coolers available</p>
        )}
      </div>
    </div>
  );
};
