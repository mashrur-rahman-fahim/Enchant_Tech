
import React, { useEffect, useState } from 'react';
import './Testcasing.css'; // Make sure to create a CSS file for styling
import { useNavigate } from 'react-router-dom';

export const Testcasing = () => {
  const [casingData, setCasingData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false); // Optional filter
  const [popularOnly, setPopularOnly] = useState(false); // Optional filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCasingData = async () => {
      try {
        const response = await fetch('/data/casing.json'); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCasingData(data.casings); // Ensure the JSON structure matches
      } catch (error) {
        console.error('Error fetching casing data:', error);
        setError('Failed to fetch casing data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCasingData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance); // Optional
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly); // Optional

  // Define popular casing ids (for demonstration purposes)
  const popularCasingIds = [1, 2, 3]; // Replace with actual popular casing IDs or logic

  // Set the performance threshold (for example, ₹8,000)
  const performanceThreshold = 8000; // Change this value as needed

  const filteredCasings = casingData.filter((casing) => {
    const meetsBudget =
      (!minBudget || casing.price >= Number(minBudget)) &&
      (!maxBudget || casing.price <= Number(maxBudget));
    const meetsPerformance = !highPerformance || casing.price >= performanceThreshold; // Using price as a performance metric
    const isPopular = !popularOnly || popularCasingIds.includes(casing.id); // Check if the casing is popular

    return meetsBudget && meetsPerformance && isPopular;
  });

  const sortedCasings = filteredCasings.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (casing) => {
    navigate("/PCBuilder", {
      state: { selectedCasing: { name: casing.name, cost: casing.price } },
    });
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

      <div className="casing-list">
        {loading ? (
          <p>Loading casing data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          sortedCasings.map((casing) => (
            <div className="casing-card" key={casing.id}>
              <img src={casing.img} alt={casing.name} className="casing-image" />
              <h4>{casing.name}</h4>
              <p>Form Factor: {casing.formFactor}</p>
              <p>Material: {casing.material}</p>
              <p className="price">₹{casing.price}</p>
              <button className="add-btn" onClick={() => handleAdd(casing)}>
                Add
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
