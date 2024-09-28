import React, { useEffect, useState } from 'react';
import './TestStorage.css';  // Ensure this file includes the necessary styles
import { useNavigate } from 'react-router-dom';

export const TestStorage = () => {
  const [storageData, setStorageData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  // Fetch storage data from the backend
  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const response = await fetch('/data/storage.json'); // Adjust the path if necessary
        const data = await response.json();
        setStorageData(data.storage); // Assuming the data structure includes a 'storage' array
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
    };

    fetchStorageData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredStorage = storageData.filter(
    (storage) =>
      (!minBudget || storage.price >= minBudget) &&
      (!maxBudget || storage.price <= maxBudget)
  );

  const sortedStorage = filteredStorage.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'capacity':
        return b.capacity.localeCompare(a.capacity); // Change to localeCompare for string comparison
      default:
        return 0;
    }
  });

  const handleAdd = (storage) => {
    navigate('/PCBuilder', { state: { selectedStorage: { name: storage.name, cost: storage.price } } });
  };

  return (
    <div className="storage-container">
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
          <option value="capacity">Capacity</option>
        </select>
      </div>

      <div className="storage-list">
        {sortedStorage.length > 0 ? (
          sortedStorage.map((storage) => (
            <div className="storage-card" key={storage.id}>
              <img src={storage.img} alt={storage.name} className="storage-image" />
              <h4>{storage.name}</h4>
              <div className="storage-details">
                <p>Capacity: {storage.capacity}</p>
                <p>Type: {storage.type}</p>
                <p>Read Speed: {storage.readSpeed}</p>
                <p>Write Speed: {storage.writeSpeed}</p>
                <p>Interface: {storage.interface}</p>
              </div>
              <p className="price">₹{storage.price}</p>
              <button className="add-btn" onClick={() => handleAdd(storage)}>
                Add
              </button>
            </div>
          ))
        ) : (
          <p>No storage devices available</p>
        )}
      </div>
    </div>
  );
};
