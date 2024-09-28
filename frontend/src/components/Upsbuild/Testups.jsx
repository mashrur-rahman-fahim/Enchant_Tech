
import React, { useEffect, useState } from 'react';
import './Testups.css';
import { useNavigate } from 'react-router-dom';

export const Testups = () => {
  const [upsData, setUpsData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false); // Optional filter
  const [popularOnly, setPopularOnly] = useState(false); // Optional filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpsData = async () => {
      try {
        const response = await fetch('/data/ups.json'); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUpsData(data.ups); // Ensure the JSON structure matches
      } catch (error) {
        console.error('Error fetching UPS data:', error);
        setError('Failed to fetch UPS data. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUpsData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance); // Optional
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly); // Optional

  // Define popular UPS ids (for demonstration purposes)
  const popularUPSIds = [1, 2, 3]; // Replace with actual popular UPS IDs or logic

  // Set the performance threshold (for example, ₹20,000)
  const performanceThreshold = 20000; // Change this value as needed

  const filteredUPSs = upsData.filter((ups) => {
    const meetsBudget =
      (!minBudget || ups.price >= Number(minBudget)) &&
      (!maxBudget || ups.price <= Number(maxBudget));
    const meetsPerformance = !highPerformance || ups.price >= performanceThreshold; // Using price as a performance metric
    const isPopular = !popularOnly || popularUPSIds.includes(ups.id); // Check if the UPS is popular

    return meetsBudget && meetsPerformance && isPopular;
  });

  const sortedUPSs = filteredUPSs.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (ups) => {
    navigate("/PCBuilder", {
      state: { selectedUPS: { name: ups.name, cost: ups.price } },
    });
  };

  return (
    <div className="ups-container">
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

      <div className="ups-list">
        {loading ? ( // Display loading message
          <p>Loading UPS data...</p>
        ) : error ? ( // Display error message
          <p>{error}</p>
        ) : (
          sortedUPSs.map((ups) => (
            <div className="ups-card" key={ups.id}>
              <img src={ups.img} alt={ups.name} className="ups-image" />
              <h4>{ups.name}</h4>
              <div className="ups-details">
                <p>Capacity: {ups.capacity}</p>
                <p>Outlets: {ups.outlets}</p>
              </div>
              <p className="price">₹{ups.price}</p>
              <button className="add-btn" onClick={() => handleAdd(ups)}>
                Add
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
