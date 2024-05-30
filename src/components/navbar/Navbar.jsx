import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      {" "}
      <header>
        <a href="/"><h1>Logo</h1></a>
        <div class="shop">
          <ul class="hList">
            <li>
              <div  class="menu">
               <Link to='/Desktop'><h2 class="menu-title">Desktop</h2></Link> 
                <ul class="menu-dropdown">
                <li> <Link to='/Gaming' className="list" >Gaming PC</Link></li>
                  <li>All-in-One PC</li>
                  <li>Apple iMac</li>
                  <li>Show All Desktop</li>
                 
                </ul>
              </div>
            </li>
            <li>
              <a href="#click" class="menu">
                <h2 class="menu-title menu-title_2nd">Laptop</h2>
                <ul class="menu-dropdown">
                  <li>Gaming Laptop</li>
                  <li>Premium Ultrabook</li>
                  <li>Show All Laptop</li>
                </ul>
              </a>
            </li>
            <li>
              <a href="#click" class="menu">
                <h2 class="menu-title menu-title_3rd">Components</h2>
                <ul class="menu-dropdown">
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
        <div class="component">
          <a href="/">HOME</a>

          <a href="#">CONTACT</a>
          <a href="#">ABOUT</a>
          <a href="/Login"> LOGIN</a>
        </div>
      </header>
    </div>
  );
};
