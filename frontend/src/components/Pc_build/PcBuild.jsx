import React, { useState, useEffect } from 'react';
import './PcBuild.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrochip, faThermometerHalf, faMemory, faHdd, faVideo, faKeyboard,
  faPrint, faPlug, faDesktop, faShoppingCart, faMouse, faVolumeUp, faBatteryFull, faCamera, faSave
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

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

  const location = useLocation(); // Use useLocation to get the state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (location.state && location.state.selectedProcessorCost) {
      setSelectedComponents(prevState => ({
        ...prevState,
        cpu: { name: 'Selected Processor', cost: location.state.selectedProcessorCost }
      }));
    }
  }, [location.state]);

  const handleSelection = (category) => {
    switch (category) {
      case 'cpu':
        navigate('/cpubuild');
        break;
      // other cases...
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
            ₹{totalCost}
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
            <button onClick={() => handleSelection(category)} className="choose-btn">
              Choose
            </button>
          </div>
        </div>
      ))}

      <h3>Additional Components</h3>
      {['keyboard', 'printer', 'powerSupply', 'casing', 'mouse', 'speaker', 'ups'].map(category => (
        <div key={category} className="component-row">
          <div className="component-icon">
            <FontAwesomeIcon icon={
              category === 'keyboard' ? faKeyboard :
              category === 'printer' ? faPrint :
              category === 'powerSupply' ? faPlug :
              category === 'casing' ? faDesktop :
              category === 'mouse' ? faMouse :
              category === 'speaker' ? faVolumeUp :
              category === 'ups' ? faBatteryFull : faDesktop} />
          </div>
          <div className="component-details">
            <span className="component-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </div>
          <div className="component-selection">
            <button onClick={() => handleSelection(category)} className="choose-btn">
              Choose
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};