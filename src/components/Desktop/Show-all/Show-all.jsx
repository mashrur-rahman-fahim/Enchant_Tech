import React, { useState } from "react";
import ProductData from "../../Product/ProductData";
import "./show-all.css";

export const Show = () => {
  const [items, setItems] = useState(ProductData);

  const search = () => {
    let searchValue = document.getElementById("input").value.toLowerCase();
    document.getElementById("input").value = "";
    const fil_I = ProductData.filter((cur) => {
      return (
        cur.brand.toLowerCase().includes(searchValue) ||
        cur.title.toLowerCase().includes(searchValue)
      );
    });
    setItems(fil_I);
  };

  const desktop_filter = (brand) => {
    const filter_items = ProductData.filter((curitem) => {
      return curitem.brand === brand;
    });
    setItems(filter_items);
  };
  return (
    <div>
    
      <div className="all_nav">
        <div className="search">
          <input type="text" id="input" />
          <label htmlFor="">
            <button onClick={search}>search</button>
          </label>
        </div>
        <div className="brand">
          <ul>
            <li>
              <button onClick={() => setItems(ProductData)}>SHow All</button>
            </li>

            <li>
              <button onClick={() => desktop_filter("HP")}>HP</button>
            </li>

            <li>
              <button onClick={() => desktop_filter("HP")}>ASUS</button>
            </li>
            <li>
              <button onClick={() => desktop_filter("HP")}>LENOVO</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="all-product">
        {items.map((curElm) => {
          return (
            <div>
              <div className="wrapper1">
                <div className="contant">
                  <img className="img" src={curElm.img} alt="" />
                  <div className="title1">{curElm.title}</div>

                  <div className="des">{curElm.description}</div>
                  <div className="cat">{curElm.cat}</div>
                </div>
              </div>
              <div className="wrapper2">
                <div className="contant1">
                  <div className="price">{curElm.price}</div>
                  <div className="buy">
                    <button>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
