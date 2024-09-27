import React, { useState, useEffect } from 'react';
import './PcBuild.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrochip, faThermometerHalf, faMemory, faHdd, faVideo, faKeyboard,
  faPrint, faPlug, faDesktop, faShoppingCart, faMouse, faVolumeUp, faBatteryFull, faCamera, faSave
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

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

  const location = useLocation();
  const navigate = useNavigate();

  // Update the selected components from state
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedProcessor) {
        setSelectedComponents(prevState => ({
          ...prevState,
          cpu: location.state.selectedProcessor
        }));
      }
      if (location.state.selectedCooler) {
        setSelectedComponents(prevState => ({
          ...prevState,
          cooler: location.state.selectedCooler
        }));
      }
      if (location.state.selectedMotherboard) {
        setSelectedComponents(prevState => ({
          ...prevState,
          motherboard: location.state.selectedMotherboard
        }));
      }
      if (location.state.selectedStorage) {
        setSelectedComponents(prevState => ({
          ...prevState,
          storage: location.state.selectedStorage
        }));
      }
      if (location.state.selectedRam) {
        setSelectedComponents(prevState => ({
          ...prevState,
          ram: location.state.selectedRam
        }));
      }
      if (location.state.selectedGpu) {
        setSelectedComponents(prevState => ({
          ...prevState,
          gpu: location.state.selectedGpu
        }));
      }
    }
  }, [location.state]);

  const handleSelection = (category) => {
    switch (category) {
      case 'cpu':
        navigate('/Cpubuild');
        break;
      case 'cooler':
        navigate('/Coolerbuild');
        break;
      case 'motherboard':
        navigate('/Motherboardbuild');
        break;
      case 'ram':
        navigate('/Rambuild');
        break;
      case 'storage':
        navigate('/Storagebuild');
        break;
      case 'gpu':
        navigate('/Gpubuild');
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
            <FontAwesomeIcon icon={category === 'cpu' ? faMicrochip :
              category === 'cooler' ? faThermometerHalf :
              category === 'motherboard' ? faDesktop :
              category === 'ram' ? faMemory :
              category === 'storage' ? faHdd :
              category === 'gpu' ? faVideo : faDesktop} />
          </div>
          <div className="component-details">
            <span className="component-name">
              {selectedComponents[category]?.name || category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <span className="component-cost">
              {selectedComponents[category]?.cost ? `₹${selectedComponents[category].cost}` : ''}
            </span>
          </div>
          <div className="component-selection">
            <button onClick={() => handleSelection(category)} className="choose-btn">
              Choose
            </button>
          </div>
        </div>
      ))}

      {/* Selected Components */}
      <h3>Selected Components</h3>
      <div className="selected-components">
        {selectedComponents.cpu && (
          <div className="component-row">
            <div className="component-icon">
              <FontAwesomeIcon icon={faMicrochip} />
            </div>
            <div className="component-details">
              <span className="component-name">
                CPU: {selectedComponents.cpu.name}
              </span>
              <span className="component-cost">
                ₹{selectedComponents.cpu.cost}
              </span>
            </div>
          </div>
        )}
        {selectedComponents.cooler && (
          <div className="component-row">
            <div className="component-icon">
              <FontAwesomeIcon icon={faThermometerHalf} />
            </div>
            <div className="component-details">
              <span className="component-name">
                Cooler: {selectedComponents.cooler.name}
              </span>
              <span className="component-cost">
                ₹{selectedComponents.cooler.cost}
              </span>
            </div>
          </div>
        )}
        {selectedComponents.motherboard && (
          <div className="component-row">
            <div className="component-icon">
              <FontAwesomeIcon icon={faDesktop} />
            </div>
            <div className="component-details">
              <span className="component-name">
                Motherboard: {selectedComponents.motherboard.name}
              </span>
              <span className="component-cost">
                ₹{selectedComponents.motherboard.cost}
              </span>
            </div>
          </div>
        )}
        {selectedComponents.ram && (
          <div className="component-row">
            <div className="component-icon">
              <FontAwesomeIcon icon={faMemory} />
            </div>
            <div className="component-details">
              <span className="component-name">
                RAM: {selectedComponents.ram.name}
              </span>
              <span className="component-cost">
                ₹{selectedComponents.ram.cost}
              </span>
            </div>
          </div>
        )}
        {selectedComponents.storage && (
          <div className="component-row">
            <div className="component-icon">
              <FontAwesomeIcon icon={faHdd} />
            </div>
            <div className="component-details">
              <span className="component-name">
                Storage: {selectedComponents.storage.name}
              </span>
              <span className="component-cost">
                ₹{selectedComponents.storage.cost}
              </span>
            </div>
          </div>
        )}
        {selectedComponents.gpu && (
          <div className="component-row">
            <div className="component-icon">
              <FontAwesomeIcon icon={faVideo} />
            </div>
            <div className="component-details">
              <span className="component-name">
                GPU: {selectedComponents.gpu.name}
              </span>
              <span className="component-cost">
                ₹{selectedComponents.gpu.cost}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Additional Components */}
      <h3>Additional Components</h3>
      {['keyboard', 'printer', 'powerSupply', 'casing', 'mouse', 'speaker', 'ups'].map(category => (
        <div key={category} className="component-row">
          <div className="component-icon">
            <FontAwesomeIcon icon={category === 'keyboard' ? faKeyboard :
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
