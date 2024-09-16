import React, { useState } from 'react';
import './PcBuild.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrochip, faThermometerHalf, faMemory, faHdd, faVideo, faKeyboard,
  faPrint, faPlug, faDesktop, faShoppingCart, faMouse, faVolumeUp, faBatteryFull, faCamera, faSave
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const components = {
  cpu: [
    { name: 'Intel Core i9', cost: 500 },
    { name: 'Intel Core i7', cost: 300 },
    { name: 'AMD Ryzen 9', cost: 450 },
    { name: 'AMD Ryzen 7', cost: 350 },
    { name: 'Intel Core i5', cost: 200 }
  ],
  cooler: [
    { name: 'Cooler Master', cost: 50 },
    { name: 'Corsair', cost: 60 },
    { name: 'Noctua', cost: 70 },
    { name: 'NZXT', cost: 80 },
    { name: 'be quiet!', cost: 90 }
  ],
  motherboard: [
    { name: 'ASUS ROG', cost: 250 },
    { name: 'MSI', cost: 200 },
    { name: 'Gigabyte', cost: 220 },
    { name: 'ASRock', cost: 180 },
    { name: 'Biostar', cost: 160 }
  ],
  ram: [
    { name: 'Corsair 16GB', cost: 80 },
    { name: 'G.Skill 16GB', cost: 75 },
    { name: 'Kingston 16GB', cost: 70 },
    { name: 'Crucial 16GB', cost: 65 },
    { name: 'HyperX 16GB', cost: 60 }
  ],
  storage: [
    { name: 'Samsung 1TB SSD', cost: 150 },
    { name: 'WD 1TB SSD', cost: 140 },
    { name: 'Seagate 1TB HDD', cost: 100 },
    { name: 'Kingston 1TB SSD', cost: 130 },
    { name: 'Crucial 1TB SSD', cost: 120 }
  ],
  gpu: [
    { name: 'NVIDIA RTX 3080', cost: 700 },
    { name: 'NVIDIA RTX 3070', cost: 600 },
    { name: 'AMD RX 6800', cost: 550 },
    { name: 'AMD RX 6700', cost: 450 },
    { name: 'NVIDIA RTX 3060', cost: 400 }
  ],
  keyboard: [
    { name: 'Logitech', cost: 50 },
    { name: 'Corsair', cost: 60 },
    { name: 'Razer', cost: 70 },
    { name: 'SteelSeries', cost: 80 },
    { name: 'HyperX', cost: 90 }
  ],
  printer: [
    { name: 'HP', cost: 150 },
    { name: 'Canon', cost: 130 },
    { name: 'Epson', cost: 120 },
    { name: 'Brother', cost: 140 },
    { name: 'Samsung', cost: 110 }
  ],
  powerSupply: [
    { name: 'Corsair 750W', cost: 100 },
    { name: 'EVGA 750W', cost: 90 },
    { name: 'Seasonic 750W', cost: 110 },
    { name: 'Thermaltake 750W', cost: 95 },
    { name: 'Antec 750W', cost: 85 }
  ],
  casing: [
    { name: 'NZXT H510', cost: 100 },
    { name: 'Corsair 4000D', cost: 90 },
    { name: 'Fractal Meshify', cost: 110 },
    { name: 'Phanteks Eclipse', cost: 95 },
    { name: 'Lian Li PC-O11', cost: 120 }
  ],
  mouse: [
    { name: 'Logitech', cost: 40 },
    { name: 'Corsair', cost: 50 },
    { name: 'Razer', cost: 60 },
    { name: 'SteelSeries', cost: 70 },
    { name: 'Microsoft', cost: 45 }
  ],
  speaker: [
    { name: 'Logitech', cost: 80 },
    { name: 'Bose', cost: 150 },
    { name: 'Sony', cost: 120 },
    { name: 'JBL', cost: 100 },
    { name: 'Harman Kardon', cost: 130 }
  ],
  ups: [
    { name: 'APC', cost: 200 },
    { name: 'CyberPower', cost: 180 },
    { name: 'Eaton', cost: 220 },
    { name: 'Tripp Lite', cost: 190 },
    { name: 'Vertiv', cost: 210 }
  ]
};

export const PcBuild = () => {
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    cooler: null,
    motherboard: null,
    ram: null,
    storage: null,
    gpu: null,
    keyboard: null,
    printer: null,
    powerSupply: null,
    casing: null,
    mouse: null,
    speaker: null,
    ups: null
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSelection = (category, event) => {
    const selectedOption = event.target.value;
    const component = components[category].find(item => item.name === selectedOption);

    setSelectedComponents(prevState => ({
      ...prevState,
      [category]: component
    }));

    // Navigate to a specific page based on the category
    switch (category) {
      case 'cpu':
        navigate('/cpubuild');
        break;
      case 'cooler':
        navigate('/coolerbuild');
        break;
      case 'motherboard':
        navigate('/motherboardbuild');
        break;
      case 'ram':
        navigate('/rambuild');
        break;
      case 'storage':
        navigate('/storagebuild');
        break;
      case 'gpu':
        navigate('/gpbuild');
        break;
      case 'keyboard':
        navigate('/keyboardbuild');
        break;
      case 'printer':
        navigate('/printerbuild');
        break;
      case 'powerSupply':
        navigate('/powersupplybuild');
        break;
      case 'casing':
        navigate('/casingbuild');
        break;
      case 'mouse':
        navigate('/mousebuild');
        break;
      case 'speaker':
        navigate('/speakerbuild');
        break;
      case 'ups':
        navigate('/upsbuild');
        break;
      default:
        break;
    }
  };

  const totalCost = Object.values(selectedComponents).reduce((total, component) => {
    return total + (component ? component.cost : 0);
  }, 0);

  const itemCount = Object.values(selectedComponents).filter(component => component !== null).length;

  const handleScreenshot = () => {
    alert('Screenshot taken!');
  };

  const handleSave = () => {
    alert('Components saved!');
  };

  return (
    <div className="pc-builder">
      <div className="screenshot-save">
        <button className="screenshot-btn" onClick={handleScreenshot}>
          <FontAwesomeIcon icon={faCamera} /> Screenshot
        </button>
        <button className="save-btn" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </div>

      <h2>PC Builder - Build Your Own Computer - Enchant Tech</h2>

      <div className="build-info">
        <div className="total-info">
          <div className="item-count">
            {itemCount}
            <span className="item-label"> Items</span>
          </div>
          <div className="total-cost">
            ${totalCost}
            <span className="cost-label"> Total Cost</span>
          </div>
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        </div>
      </div>

      <h3>Core Components</h3>
      {['cpu', 'cooler', 'motherboard', 'ram', 'storage', 'gpu'].map(category => (
        <div key={category} className="component-row">
          <div className="component-icon">
            <FontAwesomeIcon icon={
              category === 'cpu' ? faMicrochip :
              category === 'cooler' ? faThermometerHalf :
              category === 'motherboard' ? faDesktop :
              category === 'ram' ? faMemory :
              category === 'storage' ? faHdd :
              category === 'gpu' ? faVideo : faDesktop} />
          </div>
          <div className="component-details">
            <span className="component-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </div>
          <div className="component-selection">
            <select onChange={e => handleSelection(category, e)}>
              <option value="">Choose</option>
              {components[category].map((item, index) => (
                <option key={index} value={item.name}>{item.name} - ${item.cost}</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <h3>Additional Components</h3>
      {Object.keys(components).slice(6).map(category => (
        <div key={category} className="component-row">
          <div className="component-icon">
            <FontAwesomeIcon icon={
              category === 'keyboard' ? faKeyboard :
              category === 'printer' ? faPrint :
              category === 'powerSupply' ? faPlug :
              category === 'mouse' ? faMouse :
              category === 'speaker' ? faVolumeUp :
              category === 'ups' ? faBatteryFull : faDesktop} />
          </div>
          <div className="component-details">
            <span className="component-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </div>
          <div className="component-selection">
            <select onChange={e => handleSelection(category, e)}>
              <option value="">Choose</option>
              {components[category].map((item, index) => (
                <option key={index} value={item.name}>{item.name} - ${item.cost}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};