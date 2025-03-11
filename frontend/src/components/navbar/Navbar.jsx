import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth1 } from "../Authentication/LoginContest";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();
  const [validLog, setValidLog] = useState(false);
  const [ProductData, setProductData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const checkAuthStatus = () => {
    fetch("https://enchant-tech-backend.onrender.com/auth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          setIsLoggedIn1(true);
          setValidLog(true);
        } else {
          setIsLoggedIn1(false);
          setValidLog(false);
        }
      })
      .catch((error) => console.error("Error fetching auth status:", error));
  };

  useEffect(() => {
    fetch("https://enchant-tech-backend.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProductData(data));
  }, []);

  useEffect(() => {
    // Check auth status initially
    checkAuthStatus();

    // Set up interval to check auth status every 5 minutes
    const intervalId = setInterval(checkAuthStatus, 5 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [setIsLoggedIn1, setValidLog]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://enchant-tech-backend.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logged out successfully");
        setIsLoggedIn1(false);
        setValidLog(false);
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
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
          <h1 className="logo">ENCHANT TECH</h1>
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
            {/* Desktop Section */}
            <li>
              <div className="menu">
                <Link to="/Desktop" onClick={handleMenuItemClick}>
                  <h2 className="menu-title">Desktop</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    <Link
                      to="/Gaming"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Gaming PC
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Desktop/AllInOne"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      All-in-One PC
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Desktop"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Show All Desktop
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* Laptop Section */}
            <li>
              <div className="menu">
                <Link to="/Laptop" onClick={handleMenuItemClick}>
                  <h2 className="menu-title menu-title_2nd">Laptop</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    <Link
                      to="/GamingLaptop"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Gaming Laptop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Laptop/AllInOne"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      All-in-One Laptop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Laptop"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Show All Laptop
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* Components Section */}
            <li>
              <div className="menu">
                <Link to="/Components" onClick={handleMenuItemClick}>
                  <h2 className="menu-title menu-title_3rd">Components</h2>
                </Link>
                <ul className="menu-dropdown">
                  <li>
                    <Link
                      to="/category/cpu"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Processor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/cpucooler"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      CPU Cooler
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/motherboard"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Motherboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/gpu"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Graphics Card
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/ram"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Random Access Memory
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/ssd"
                      className="list"
                      onClick={handleMenuItemClick}
                    >
                      Solid Disk Drive
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
          <Link
            to="/Contact"
            className="nav-link"
            onClick={handleMenuItemClick}
          >
            CONTACT
          </Link>
          <Link to="/About" className="nav-link" onClick={handleMenuItemClick}>
            ABOUT
          </Link>
          {!isLoggedIn1 || !validLog ? (
            <Link
              to="/Login"
              className="nav-link"
              onClick={handleMenuItemClick}
            >
              LOGIN
            </Link>
          ) : (
            <Link
              className="nav-link"
              onClick={() => {
                handleLogout();
                handleMenuItemClick();
              }}
            >
              LOGOUT
            </Link>
          )}
          {isLoggedIn1 && validLog ? (
            <Link
              to="/profile"
              className="nav-link"
              onClick={handleMenuItemClick}
            >
              PROFILE
            </Link>
          ) : null}
          <Link
            to="/PCBuilder"
            className="pcBuild"
            onClick={handleMenuItemClick}
          >
            PC Builder
          </Link>
        </div>
      </header>
    </nav>
  );
};
