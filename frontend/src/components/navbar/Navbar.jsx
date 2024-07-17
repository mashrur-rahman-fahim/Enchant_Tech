import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ProductData from "../Product/ProductData";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <nav className="nav">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <header className={menuOpen ? "open" : ""}>
        <a href="/">
          <h1 className="logo">Logo</h1>
        </a>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <div className="data-list-container">
          <div className="data-list">
            {ProductData.filter((curr) => {
              const searchTerm = searchQuery.toLowerCase();
              const fullName = curr.title.toLowerCase();
              return searchTerm && fullName.includes(searchTerm);
            }).map((curr, idx) => (
              <div className="data-item" key={idx}>
                <Link
                  className="data-link"
                  onClick={() => {
                    setSearchQuery("");
                    setMenuOpen(false);
                  }}
                  to={`/${curr.id}`}
                >
                  {curr.title}
                  <br />
                  {curr.price}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="shop">
          <ul className="hList">
            <li>
              <div className="menu">
                <Link to="/Desktop" onClick={handleMenuItemClick}>
                  <h2 className="menu-title">Desktop</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    <Link to="/Gaming" className="list" onClick={handleMenuItemClick}>
                      Gaming PC
                    </Link>
                  </li>
                  <li>
                    <Link to="/Desktop/AllInOne" className="list" onClick={handleMenuItemClick}>
                      All-in-One PC
                    </Link>
                  </li>
                  <li>
                    <Link to="/Apple-iMac" className="list" onClick={handleMenuItemClick}>
                      Apple iMac
                    </Link>
                  </li>
                  <li>
                    <Link to="/Desktop" className="list" onClick={handleMenuItemClick}>
                      Show All Desktop
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="menu">
                <Link to="/Laptop" onClick={handleMenuItemClick}>
                  <h2 className="menu-title menu-title_2nd">Laptop</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    <Link to="/GamingLaptop" className="list" onClick={handleMenuItemClick}>
                      Gaming Laptop
                    </Link>
                  </li>
                  <li>
                    <Link to="/Laptop/Ultrabook" className="list" onClick={handleMenuItemClick}>
                      Premium Ultrabook
                    </Link>
                  </li>
                  <li>
                    <Link to="/Laptop/AllInOne" className="list" onClick={handleMenuItemClick}>
                    All-in-One Laptop
                    </Link>
                  </li>
                  <li>
                    <Link to="/Laptop" className="list" onClick={handleMenuItemClick}>
                      Show All Laptop
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="menu">
                <Link to="/Components" onClick={handleMenuItemClick}>
                  <h2 className="menu-title menu-title_3rd">Components</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    <Link to="/Processor" className="list" onClick={handleMenuItemClick}>
                      Processor
                    </Link>
                  </li>
                  <li>
                    <Link to="/CPUCooler" className="list" onClick={handleMenuItemClick}>
                      CPU Cooler
                    </Link>
                  </li>
                  <li>
                    <Link to="/Motherboard" className="list" onClick={handleMenuItemClick}>
                      Motherboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/GraphicsCard" className="list" onClick={handleMenuItemClick}>
                      Graphics Card
                    </Link>
                  </li>
                  <li>
                    <Link to="/RandomAccessMemory" className="list" onClick={handleMenuItemClick}>
                      Random Access Memory
                    </Link>
                  </li>
                  <li>
                    <Link to="/HardDiskDrive" className="list" onClick={handleMenuItemClick}>
                      Hard Disk Drive
                    </Link>
                  </li>
                  <li>
                    <Link to="/SolidDiskDrive" className="list" onClick={handleMenuItemClick}>
                      Solid Disk Drive
                    </Link>
                  </li>
                  <li>
                    <Link to="/Monitor" className="list" onClick={handleMenuItemClick}>
                      Monitor
                    </Link>
                  </li>
                  <li>
                    <Link to="/Casing" className="list" onClick={handleMenuItemClick}>
                      Casing
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="component">
          <Link to="/" className="nav-link" onClick={handleMenuItemClick}>
            HOME
          </Link>
          <Link to="/Contact" className="nav-link" onClick={handleMenuItemClick}>
            CONTACT
          </Link>
          <Link to="/About" className="nav-link" onClick={handleMenuItemClick}>
            ABOUT
          </Link>
          <Link to="/Login" className="nav-link" onClick={handleMenuItemClick}>
            LOGIN
          </Link>
          <Link to="/PCBuilder" className="pcBuild" onClick={handleMenuItemClick}>
            PC Builder
          </Link>
        </div>
      </header>
    </nav>
  );
};
