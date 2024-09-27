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

  useEffect(() => {
    if (location.state) {
      const { state } = location;
      setSelectedComponents(prevComponents => ({
        ...prevComponents,
        cpu: state.selectedProcessor || prevComponents.cpu,
        cooler: state.selectedCooler || prevComponents.cooler,
        motherboard: state.selectedMotherboard || prevComponents.motherboard,
        ram: state.selectedRam || prevComponents.ram,
        storage: state.selectedStorage || prevComponents.storage,
        gpu: state.selectedGpu || prevComponents.gpu,
        keyboard: state.selectedKeyboard || prevComponents.keyboard,
        printer: state.selectedPrinter || prevComponents.printer,
        powerSupply: state.selectedPowerSupply || prevComponents.powerSupply,
        casing: state.selectedCasing || prevComponents.casing,
        mouse: state.selectedMouse || prevComponents.mouse,
        speaker: state.selectedSpeaker || prevComponents.speaker,
        ups: state.selectedUPS || prevComponents.ups,
      }));
    }
  }, [location.state]);

  const handleSelection = (category) => {
    const routes = {
      cpu: '/Cpubuild',
      cooler: '/Coolerbuild',
      motherboard: '/Motherboardbuild',
      gpu: '/Gpubuild',
      ram: '/Rambuild',
      storage: '/Storagebuild',
      ups: '/Upsbuild',
      mouse: '/Mousebuild',
      casing: '/Casingbuild',
      keyboard: '/Keyboardbuild',
      printer: '/Printerbuild',
      speaker: '/Speakerbuild',
      powerSupply: '/Powersupplybuild',
    };

    navigate(routes[category]);
  };

  // Calculate total cost and item count
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
              {selectedComponents[category]?.cost ? `₹${selectedComponents[category].cost}` : '' }
            </span>
          </div>
          <div className="component-selection">
            <button onClick={() => handleSelection(category)} className="choose-btn">
              Choose
            </button>
          </div>
        </div>
      ))}

      <h3>Selected Components</h3>
      <div className="selected-components">
        {Object.keys(selectedComponents).map((key) => (
          selectedComponents[key] && (
            <div className="component-row" key={key}>
              <div className="component-icon">
                <FontAwesomeIcon icon={key === 'cpu' ? faMicrochip :
                  key === 'cooler' ? faThermometerHalf :
                  key === 'motherboard' ? faDesktop :
                  key === 'ram' ? faMemory :
                  key === 'storage' ? faHdd :
                  key === 'gpu' ? faVideo :
                  key === 'ups' ? faBatteryFull : faDesktop} />
              </div>
              <div className="component-details">
                <span className="component-name">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {selectedComponents[key].name}
                </span>
                <span className="component-cost">
                  ₹{selectedComponents[key].cost}
                </span>
              </div>
            </div>
          )
        ))}
      </div>

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

      <h3>Selected Additional Components</h3>
      <div className="selected-components">
        {['keyboard', 'printer', 'powerSupply', 'casing', 'mouse', 'speaker', 'ups'].map(key => (
          selectedComponents[key] && (
            <div className="component-row" key={key}>
              <div className="component-icon">
                <FontAwesomeIcon icon={key === 'keyboard' ? faKeyboard :
                  key === 'printer' ? faPrint :
                  key === 'powerSupply' ? faPlug :
                  key === 'casing' ? faDesktop :
                  key === 'mouse' ? faMouse :
                  key === 'speaker' ? faVolumeUp :
                  key === 'ups' ? faBatteryFull : faDesktop} />
              </div>
              <div className="component-details">
                <span className="component-name">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {selectedComponents[key].name}
                </span>
                <span className="component-cost">
                  ₹{selectedComponents[key].cost}
                </span>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
