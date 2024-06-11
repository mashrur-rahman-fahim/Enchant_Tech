import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ProductData from "../Product/ProductData";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="nav">
      <div>
        <header>
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
                    }}
                    to={`/${curr.id}`}
                  >
                    {curr.title}<br/>
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
                  <Link to="/Desktop">
                    <h2 className="menu-title">Desktop</h2>
                  </Link>
                  <ul className="menu-dropdown">
                    <li>
                      <Link to="/Gaming" className="list">
                        Gaming PC
                      </Link>
                    </li>
                    <li>All-in-One PC</li>
                    <li>Apple iMac</li>
                    <li>Show All Desktop</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="menu">
                  <Link to="/Laptop">
                    <h2 className="menu-title menu-title_2nd">Laptop</h2>
                  </Link>
                  <ul className="menu-dropdown">
                    <li>Gaming Laptop</li>
                    <li>Premium Ultrabook</li>
                    <li>Show All Laptop</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="menu">
                  <Link to="/Components">
                    <h2 className="menu-title menu-title_3rd">Components</h2>
                  </Link>
                  <ul className="menu-dropdown">
                    <li>Processor</li>
                    <li>CPU Cooler</li>
                    <li>Motherboard</li>
                    <li>Graphics Card</li>
                    <li>Random Access Memory</li>
                    <li>Hard Disk Drive</li>
                    <li>Solid Disk Drive</li>
                    <li>Monitor</li>
                    <li>Casing</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="component">
            <Link to="/" className="nav-link">
              HOME
            </Link>
            <Link to="/Contact" className="nav-link">
              CONTACT
            </Link>
            <Link to="/About" className="nav-link">
              ABOUT
            </Link>
            <Link to="/Login" className="nav-link">
              LOGIN
            </Link>
          </div>
        </header>
      </div>
    </nav>
  );
};
