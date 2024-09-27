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

  const [totalCost, setTotalCost] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { state } = location;
      setSelectedComponents(prevComponents => ({
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

    // Get the current component
    const currentComponent = selectedComponents[category];

    // Navigate to the selection page
    navigate(routes[category]);
  };

  useEffect(() => {
    const total = Object.values(selectedComponents).reduce((acc, component) => {
      return acc + (component ? component.cost : 0);
    }, 0);
    setTotalCost(total);
  }, [selectedComponents]);

  const itemCount = Object.values(selectedComponents).filter(component => component !== null).length;

  const handleScreenshot = () => {
    alert('Screenshot taken!');
  };

  const handleSave = () => {
    alert('Components saved!');
  };

  const handleClear = () => {
    setSelectedComponents({
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
    setTotalCost(0);
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
        <button className="clear-btn" onClick={handleClear}>
          Clear All
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
            {'\u20B9'}{totalCost} {/* Updated total cost */}
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
              {selectedComponents[category]?.cost ? `\u20B9${selectedComponents[category].cost}` : ''}
            </span>
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
              {selectedComponents[category]?.cost ? `\u20B9${selectedComponents[category].cost}` : ''}
            </span>
          </div>
          <div className="component-selection">
            <button onClick={() => handleSelection(category)} className="choose-btn">
              Choose
            </button>
          </div>
        </div>
      ))}

      <h3></h3>
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
                  {'\u20B9'}{selectedComponents[key].cost}
                </span>
              </div>
            </div>
          )
        ))}
      </div>

      <h3></h3>
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
                  {'\u20B9'}{selectedComponents[key].cost}
                </span>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
