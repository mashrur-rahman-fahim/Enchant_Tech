import React,{useState} from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
      {" "}
      <header>
        <a href="/">
          <h1>Logo</h1>
        </a>
        <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        <div className="shop">
          <ul className="hList">
            <li>
              <div className="menu">
                <Link to="/Desktop">
                  <h2 className="menu-title">Desktop</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    {" "}
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
              <a href="#click" className="menu">
                <h2 className="menu-title menu-title_2nd">Laptop</h2>
                <ul className="menu-dropdown">
                  <li>Gaming Laptop</li>
                  <li>Premium Ultrabook</li>
                  <li>Show All Laptop</li>
                </ul>
              </a>
            </li>
            <li>
              <a href="#click" className="menu">
                <h2 className="menu-title menu-title_3rd">Components</h2>
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
              </a>
            </li>
          </ul>
        </div>
        <div className="component">
          <a href="/">HOME</a>

          <a href="#">CONTACT</a>
          <a href="#">ABOUT</a>
          <a href="/Login"> LOGIN</a>
        </div>
      </header>
    </div>
   </nav>
  );
};
