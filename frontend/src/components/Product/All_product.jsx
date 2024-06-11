import { useParams } from "react-router-dom";
import ProductData from "./ProductData";
import "./All_product.css";

function AllProduct() {
  const { id } = useParams();
  const id1 = id.toString();

  return (
    <div>
      {ProductData.map((curElm, idx) => {
        if (curElm.id.toString() === id1) {
          return (
            <div key={idx} className="product_details">
              <div className="product-image">
                <img src={curElm.img} alt={curElm.title} />
              </div>
              <div className="product-info">
                <h1>{curElm.title}</h1>
                <p>{curElm.description}</p>
                <p>Category: {curElm.cat}</p>
                <div className="price">
                  <h4>Price:</h4>
                  <p>{curElm.price}</p>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default AllProduct;
