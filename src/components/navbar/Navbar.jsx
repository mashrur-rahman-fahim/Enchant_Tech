import React,{useState} from "react";
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
      {" "}
      <header>
        <a href="/">
          <h1>Logo</h1>
        </a>
        <form className="search-form" >
            <input
             
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
           
          </form>
        
            <div className="data_list">
          {
            
            ProductData.filter(curr=>{
              const searchTerm=searchQuery.toLowerCase();
              const FullName=curr.title.toLowerCase();
              return searchTerm && FullName.includes(searchTerm)


            })
            
            
            .map((curr,idx)=>{
              return(
              <div className="border_data" key={idx}>
                
               <Link className="text_nav" onClick={()=>{setSearchQuery("")}} to={`/${curr.id}`}>{curr.title}</Link> 
              </div>)

            })
          }</div>
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

          <Link to="/Contact">CONTACT</Link>
          <Link to="/About">ABOUT</Link>
          <Link to="/Login"> LOGIN</Link>
        </div>
      </header>
    </div>
   </nav>
  );
};
