import React, { useEffect, useState } from 'react';
import './Testspeaker.css'; // Make sure to create a CSS file for styles
import { useNavigate } from 'react-router-dom';

export const Testspeaker = () => {
  const [speakers, setSpeakers] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpeakersData = async () => {
      try {
        const response = await fetch('/data/speakers.json'); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSpeakers(data.speakers); // Ensure the JSON structure matches
      } catch (error) {
        console.error('Error fetching speakers data:', error);
        setError('Failed to fetch speakers data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakersData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance);
  const handlePopularOnlyChange = () => setPopularOnly(!popularOnly);

  // Define popular speaker ids (for demonstration purposes)
  const popularSpeakerIds = [1, 3, 5]; // Replace with actual popular speaker IDs or logic
  const performanceThreshold = 10000; // Example performance threshold based on price

  const filteredSpeakers = speakers.filter((speaker) => {
    const meetsBudget =
      (!minBudget || speaker.price >= Number(minBudget)) &&
      (!maxBudget || speaker.price <= Number(maxBudget));
    const meetsPerformance = !highPerformance || speaker.price >= performanceThreshold;
    const isPopular = !popularOnly || popularSpeakerIds.includes(speaker.id);

    return meetsBudget && meetsPerformance && isPopular;
  });

  const sortedSpeakers = filteredSpeakers.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (speaker) => {
    navigate('/PCBuilder', { state: { selectedSpeaker: { name: speaker.name, cost: speaker.price } } });
  };

  return (
    <div className="speaker-container">
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

      <div className="speaker-list">
        {loading ? (
          <p>Loading speakers data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          sortedSpeakers.map((speaker) => (
            <div className="speaker-card" key={speaker.id}>
              <img src={speaker.img} alt={speaker.name} className="speaker-image" />
              <h4>{speaker.name}</h4>
              <p>Type: {speaker.type}</p>
              <p>Power: {speaker.power}</p>
              <p className="price">₹{speaker.price}</p>
              <button className="add-btn" onClick={() => handleAdd(speaker)}>
                Add
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
