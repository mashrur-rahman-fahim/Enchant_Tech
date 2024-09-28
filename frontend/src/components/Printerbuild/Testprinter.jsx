import React, { useEffect, useState } from 'react';
import './Testprinter.css';
import { useNavigate } from 'react-router-dom';

export const Testprinter = () => {
  const [printerData, setPrinterData] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [highPerformance, setHighPerformance] = useState(false); // High Performance filter
  const [popular, setPopular] = useState(false); // Popular filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrinterData = async () => {
      try {
        const response = await fetch('/data/printers.json'); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrinterData(data.printers);
      } catch (error) {
        console.error('Error fetching printer data:', error);
        setError('Failed to fetch printer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrinterData();
  }, []);

  const handleMinBudgetChange = (e) => setMinBudget(e.target.value);
  const handleMaxBudgetChange = (e) => setMaxBudget(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleHighPerformanceChange = () => setHighPerformance(!highPerformance); // Toggle High Performance filter
  const handlePopularChange = () => setPopular(!popular); // Toggle Popular filter

  const filteredPrinters = printerData.filter((printer) => {
    const meetsBudget =
      (!minBudget || printer.price >= Number(minBudget)) &&
      (!maxBudget || printer.price <= Number(maxBudget));
    const isHighPerformance = !highPerformance || printer.isHighPerformance;
    const isPopular = !popular || printer.isPopular;

    return meetsBudget && isHighPerformance && isPopular;
  });

  const sortedPrinters = filteredPrinters.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAdd = (printer) => {
    navigate('/PCBuilder', { state: { selectedPrinter: { name: printer.name, cost: printer.price } } });
  };

  return (
    <div className="printer-container">
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

      <div className="printer-list">
        {loading ? (
          <p>Loading printer data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          sortedPrinters.map((printer) => (
            <div className="printer-card" key={printer.id}>
              <img src={printer.img} alt={printer.name} className="printer-image" />
              <h4>{printer.name}</h4>
              <div className="printer-details">
                <p>Type: {printer.type}</p>
                <p>Color: {printer.color}</p>
                <p>Connectivity: {printer.connectivity}</p>
                <p>Price: ₹{printer.price}</p>
                {printer.isWireless && <p>Wireless: Yes</p>}
              </div>
              <button className="add-btn" onClick={() => handleAdd(printer)}>
                Add
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
