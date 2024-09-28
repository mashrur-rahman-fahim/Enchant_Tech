
import React, { useEffect, useState } from 'react';
import './Testpowersupply.css'; // Ensure you have the correct CSS file
import { useNavigate } from 'react-router-dom';

export const Testpowersupply = () => {
  const [powerSupplyData, setPowerSupplyData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPowerSupplyData = async () => {
      try {
        const response = await fetch('/data/power_supplies.json'); // Check this path
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPowerSupplyData(data.powerSupplies); // Ensure the JSON structure matches
      } catch (error) {
        console.error('Error fetching power supply data:', error);
        setError('Failed to fetch power supply data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPowerSupplyData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance);
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly);

  const popularPowerSupplyIds = [1, 2, 3]; // Adjust based on actual popular IDs
  const performanceThreshold = 20000; // Adjust this threshold as necessary

  const filteredPowerSupplies = powerSupplyData.filter((ps) => {
    const meetsBudget =
      (!minBudget || ps.price >= Number(minBudget)) &&
      (!maxBudget || ps.price <= Number(maxBudget));
    const meetsPerformance = !highPerformance || ps.price >= performanceThreshold;
    const isPopular = !popularOnly || popularPowerSupplyIds.includes(ps.id);

    return meetsBudget && meetsPerformance && isPopular;
  });

  const sortedPowerSupplies = filteredPowerSupplies.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (ps) => {
    navigate('/PCBuilder', { state: { selectedPowerSupply: { name: ps.name, cost: ps.price } } });

  };

  return (
    <div className="power-supply-container">
      <div className="filter-section">
        <h3>Budget</h3>
        <div className="budget-inputs">
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
        </div>
        <button onClick={() => {/* Apply budget filter logic here */}}>Apply</button>

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


      <div className="power-supply-list">
        {loading ? (
          <p>Loading power supply data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          sortedPowerSupplies.map((ps) => (
            <div className="power-supply-card" key={ps.id}>
              <img src={ps.img} alt={ps.name} className="power-supply-image" />
              <h4>{ps.name}</h4>
              <div className="power-supply-details">
                <p>Wattage: {ps.wattage}</p>
                <p>Modular: {ps.modular ? 'Yes' : 'No'}</p>
              </div>
              <p className="price">₹{ps.price}</p>
              <button className="add-btn" onClick={() => handleAdd(ps)}>
                Add
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
};
