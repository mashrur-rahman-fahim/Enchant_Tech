
import React, { useEffect, useState } from 'react';
import './Testkeyboard.css';
import { useNavigate } from 'react-router-dom';

export const Testkeyboard = () => {
  const [keyboardData, setKeyboardData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false); // High Performance filter
  const [popular, setPopular] = useState(false); // Popular filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKeyboardData = async () => {
      try {
        const response = await fetch('/data/keyboards.json'); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setKeyboardData(data.keyboards);
      } catch (error) {
        console.error('Error fetching keyboard data:', error);
        setError('Failed to fetch keyboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchKeyboardData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance); // Toggle High Performance filter
  const handlePopularChange = () => setPopular(!popular); // Toggle Popular filter

  const filteredKeyboards = keyboardData.filter((keyboard) => {
    const meetsBudget =
      (!minBudget || keyboard.price >= Number(minBudget)) &&
      (!maxBudget || keyboard.price <= Number(maxBudget));
    const isHighPerformance = !highPerformance || keyboard.isHighPerformance;
    const isPopular = !popular || keyboard.isPopular;

    return meetsBudget && isHighPerformance && isPopular;
  });

  const sortedKeyboards = filteredKeyboards.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (keyboard) => {
    navigate("/PCBuilder", {
      state: {
        selectedKeyboard: { name: keyboard.name, cost: keyboard.price },
      },
    });
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
            checked={popular}
            onChange={handlePopularChange}
          />
          Popular
        </label>
      </div>

      <div className="keyboard-list">

        {loading ? (
          <p>Loading keyboard data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          sortedKeyboards.map((keyboard) => (
            <div className="keyboard-card" key={keyboard.id}>
              <img src={keyboard.img} alt={keyboard.name} className="keyboard-image" />
              <h4>{keyboard.name}</h4>
              <div className="keyboard-details">
                <p>Switch Type: {keyboard.switchType}</p>
                <p>Connection: {keyboard.connection}</p>
                <p>Price: ₹{keyboard.price}</p>
                {keyboard.rgbLighting && <p>RGB Lighting: Yes</p>}
              </div>
              <button className="add-btn" onClick={() => handleAdd(keyboard)}>
                Add
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
};
