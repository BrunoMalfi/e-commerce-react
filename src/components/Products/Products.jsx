import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from "../AddProduct/AddProduct";
import { Link } from "react-router-dom";

const Products = () => {
    const { products, getProducts, deleteProduct } = useContext(GlobalContext);

    useEffect(() => {
      getProducts();
    }, []);
  
     if (products.length <= 0) {
       return <p className="loading-message">Cargando...</p>; 
       
    }
  
     return (
    <>
       <AddProduct/>
       <div className="d-flex flex-wrap">
         {products.map(product => {
           return (
            <div key={product.id} className="card m-2 bg-light">
                <div className="card-body">
                <h5 className="card-title">{product.item_description}</h5>
                {/* <img src={product.image_path} alt={product.item_number} /> */}
                <h6 className="card-subtitle mb-2 text-muted">{product.item_number}</h6>
                <p className="card-text">${product.price}</p>
                <div className="d-flex justify-content-evenly">
                    <button className="btn btn-danger" onClick={()=>{deleteProduct(product.id)}}>X</button>
                    <Link className ="btn btn-warning" to={'/editproduct/'+product.id}>Edit</Link>
                </div>
                </div>
            </div>
           );
         })}
       </div>
    </>
     );

    
}

export default Products