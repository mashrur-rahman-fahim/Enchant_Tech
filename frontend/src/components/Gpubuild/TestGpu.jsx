
import React, { useEffect, useState } from 'react';
import './TestGpu.css'; // Ensure this file includes the necessary styles
import { useNavigate } from 'react-router-dom';

export const TestGpu = () => {
  const [gpusData, setGpusData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGpus = async () => {
      try {
        const response = await fetch('/data/gpus.json'); // Adjust the path if necessary
        const data = await response.json();
        setGpusData(data.gpus); // Ensure the JSON structure matches
      } catch (error) {
        console.error('Error fetching GPUs:', error);
      }
    };

    fetchGpus();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance);
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly);

  const filteredGpus = gpusData.filter((gpu) => {
    const meetsBudget =
      (!minBudget || gpu.price >= Number(minBudget)) &&
      (!maxBudget || gpu.price <= Number(maxBudget));
    const meetsPerformance = !highPerformance || gpu.performance >= 90; // Assuming high performance is 90+
    const isPopular = !popularOnly; // If you want to implement a popularity filter, you can add logic here

    return meetsBudget && meetsPerformance && isPopular;
  });

  const sortedGpus = filteredGpus.sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;

      case 'high-performance':
        return (b.performance - a.performance);
      case 'popularity':
        return 0; // Assuming all GPUs are equally popular for now

      default:
        return 0;
    }
  });

  const handleAdd = (gpu) => {

    navigate('/PCBuilder', {

      state: { selectedGpu: { name: gpu.name, cost: gpu.price } },
    });
  };

  return (
    <div className="gpu-container">
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

      <div className="gpu-list">
        {sortedGpus.map((gpu) => (
          <div className="gpu-card" key={gpu.id}>
            <img src={gpu.img} alt={gpu.name} className="gpu-image" />
            <h4>{gpu.name}</h4>
            <div className="gpu-details">
              <p>Memory: {gpu.memory}</p>
              <p>Core Clock: {gpu.coreClock}</p>
              <p>Boost Clock: {gpu.boostClock}</p>
              <p>Cuda Cores: {gpu.cudaCores}</p>
              <p>Interface: {gpu.interface}</p>
            </div>
            <p className="price">₹{gpu.price}</p>
            <button className="add-btn" onClick={() => handleAdd(gpu)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
