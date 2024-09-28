import React, { useEffect, useState } from 'react';
import './Testmouse.css'; // Ensure this file includes the necessary styles
import { useNavigate } from 'react-router-dom';

export const Testmouse = () => {
  const [miceData, setMiceData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMice = async () => {
      try {
        const response = await fetch('/data/mice.json'); // Adjust the path if necessary
        const data = await response.json();
        setMiceData(data.mice); // Ensure the JSON structure matches
      } catch (error) {
        console.error('Error fetching mice data:', error);
      }
    };

    fetchMice();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredMice = miceData.filter((mouse) => {
    const meetsBudget =
      (!minBudget || mouse.price >= Number(minBudget)) &&
      (!maxBudget || mouse.price <= Number(maxBudget));
    return meetsBudget;
  });

  const sortedMice = filteredMice.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (mouse) => {
    navigate('/PCBuilder', { state: { selectedMouse: { name: mouse.name, cost: mouse.price } } });
  };

  return (
    <div className="mouse-container">
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

      <div className="mouse-list">
        {sortedMice.map((mouse) => (
          <div className="mouse-card" key={mouse.id}>
            <img src={mouse.img} alt={mouse.name} className="mouse-image" />
            <h4>{mouse.name}</h4>
            <div className="mouse-details">
              <p>DPI: {mouse.dpi}</p>
              <p>Connection: {mouse.connection}</p>
            </div>
            <p className="price">₹{mouse.price}</p>
            <button className="add-btn" onClick={() => handleAdd(mouse)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
