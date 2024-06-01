import React, { useState } from "react";
import ProductData from "../../Product/ProductData";
import "./show-all.css";
import { Link } from "react-router-dom";
import { AllProduct } from "../../Product/All_product";



export const Show = () => {
  const [items, setItems] = useState(ProductData);

  const search = (value) => {
    let filter_it;
    if (!value) {
      setItems(ProductData);
    } else {
      filter_it = items.filter((product) =>
        product.title.toString().toLowerCase().includes(value.toLowerCase())
      );

      setItems(filter_it);
    }
  };

  const desktop_filter = (brand) => {
    const filter_items = ProductData.filter((curitem) => {
      return curitem.brand === brand;
    });
    setItems(filter_items);
  };
  const id=1;
 
  // const test=(val)=>
  // {
  //   const val2=1;
    
  //   return(
  //     <AllProduct val2={val2}/>
  //   )
   
    
  // }
  
  
  
  return (
    <div>
      <div className="all_nav">
        <div className="search">
          <input type="text" onChange={(e) => search(e.target.value)} />
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
        {items.map((curElm, idx) => {
          return (
            <div key={idx}>
              <div className="wrapper1">
                <div className="contant">
                  <img className="img" key={idx} src={curElm.img} alt="" />
                 
                 
                <Link className="Link_home" to={`/${curElm.id}`}> <div   key={idx + 1} className="title1" id="tit">
                    {curElm.title}
                  </div></Link>

                  <div key={idx + 2} className="des">
                    {curElm.description}
                  </div>
                  <div key={idx + 3} className="cat">
                    {curElm.cat}
                  </div>
                </div>
              </div>
              <div className="wrapper2">
                <div className="contant1">
                  <div key={idx + 4} className="price">
                    {curElm.price}
                  </div>
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


