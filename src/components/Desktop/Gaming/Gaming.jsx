import React from "react";
import ProductData from "../../Product/ProductData";
import "./Gaming.css";
export const Gaming = () => {
  return (
    <div className="all-product">
      {ProductData.map((curElm) => {
        return (
        <div>
         {curElm.cat==="Gaming"?<div> 
            
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
          </div>:"Stock out"}
          </div>
       
          
        );
      })}
    </div>
  );
};
