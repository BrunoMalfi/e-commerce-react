import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        item_description: "",
        item_number: "",
        price: 0
    });
    const { addProduct } = useContext(GlobalContext);

    const handleInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("product", product);
        addProduct(product);
        setProduct({
            item_description: "",
            item_number: "",
            price: 0
        })
    };

    const [btnDisabled,setBtnDisabled] = useState(true)
    const [message,setMessage] = useState("")
    const validateForm = () => {
        switch (true) {
            case product.item_description.length == 0 && product.item_number.length == 0 && product.price == 0:
              setMessage("");
              break;
            case product.item_description.length < 5:
              setMessage("Item description must be at least 5 characters long");
              setBtnDisabled(true);
              break;
              case product.item_number.length < 3:
                setMessage("Item code must be at least 3 characters long");
                setBtnDisabled(true);
                break;
            case product.price == 0 :
                setMessage("Add price to the new product");
                break;
            case typeof(Number(product.price)) !== "number" :
                setMessage("Price must be a numeric value "+ typeof(product.price) );
                setBtnDisabled(true);
                break;

            default:
              setMessage("");
              setBtnDisabled(false);
            break;
          }
      };

      useEffect(() => {
        validateForm();
      }, [product]);


    return (
        <div className="d-flex justify-content-center m-2">
            <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ width: '300px' }}>
                <div className="mb-3">
                    <label htmlFor="itemDescription" className="form-label">Item description</label>
                    <input
                        type="text"
                        id="itemDescription"
                        className="form-control"
                        onChange={handleInputChange}
                        name="item_description"
                        value={product.item_description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemCode" className="form-label">Item code</label>
                    <input
                        type="text"
                        id="itemCode"
                        className="form-control"
                        onChange={handleInputChange}
                        name="item_number"
                        value={product.item_number}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        onChange={handleInputChange}
                        name="price"
                        value={product.price}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={btnDisabled}>Add product</button>
                <p>{message}</p>
            </form>
        </div>
    );
};

export default AddProduct;