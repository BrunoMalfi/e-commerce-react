import React, { useContext, useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const EditProduct = () => {
    const {id} = useParams()
    let navigate = useNavigate();
    const {product,getProduct, editProduct }=useContext(GlobalContext)
    const [newProduct, setNewProduct] = useState({
        item_description: "",
        item_number: "",
        price: 0
    });
    
    useEffect(() => {
        getProduct(id)
    }, [])

   useEffect(() =>   {
    if (product && Object.keys(product).length > 0) {
        setNewProduct({
            id,
            item_description: product.item_description,
            item_number: product.item_number,
            price: product.price
        });
    }
   },[product]);


    useEffect(() => {
        validateForm();
      }, [newProduct]);

    
    const handleInputChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value,
        });
    };

    const [btnDisabled,setBtnDisabled] = useState(true)
    const [message,setMessage] = useState("")
    const validateForm = () => {
        switch (true) {
            case newProduct.item_description.length == 0 && newProduct.item_number.length == 0 && newProduct.price == 0:
              setMessage("");
              break;
            case newProduct.item_description.length < 5:
              setMessage("Item description must be at least 5 characters long");
              setBtnDisabled(true);
              break;
              case newProduct.item_number.length < 3:
                setMessage("Item code must be at least 3 characters long");
                setBtnDisabled(true);
                break;
            case newProduct.price == 0 :
                setMessage("Add price to the new product");
                break;
            case typeof(Number(newProduct.price)) !== "number" :
                setMessage("Price must be a numeric value "+ typeof(product.price) );
                setBtnDisabled(true);
                break;

            default:
              setMessage("");
              setBtnDisabled(false);
            break;
          }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        editProduct(newProduct);
        navigate("/products");
    };
    
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
                        value={newProduct.item_description}
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
                        value={newProduct.item_number}
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
                        value={newProduct.price}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={btnDisabled}>Update product</button>
                <p>{message}</p>
            </form>
        </div>
  )
}

export default EditProduct