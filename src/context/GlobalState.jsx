import { createContext, useReducer } from 'react';
import AppReducer from "./AppReducer"
import axios from "axios"

const API_URL= "http://localhost:3000/"

const initialState = {
  products: [],
  delproduct:{},
  product:{},
  updproduct:{}
}


export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    // const [characters, setCharacters] = useState([]);

    const getProducts = async () => {
        const res = await axios.get("http://localhost:3000/products/showallitems");
        dispatch({
          type: "GET_PRODUCTS",
          payload: res.data.products,
        });//action
      };
      const deleteProduct =async (id) =>{
        console.log(API_URL+"products/delete/"+id)
        const res = await axios.delete(API_URL+"products/delete/"+id)
        console.log(res.data)
        dispatch({
             type: "DEL_PRODUCT",
             payload: res.data,
        })
      };

      const addProduct = async (product) =>{
        try{
            const res= await axios.post(API_URL+"products/new",product)
            dispatch({
                type:"ADD_PRODUCT",
                payload: res.data.product
            })
        }
        catch(error){console.error('Error in adding product : ', error)}
      }; 
       const getProduct = async (id) =>{
            const res= await axios.get(API_URL+"products/getitembyid/"+id)
            dispatch({
                type : "GET_PRODUCT",
                payload: res.data.product
            })
       };

       const editProduct = async(newProduct) =>{
        try {
            const res= await axios.put(API_URL+"products/update",newProduct)
            getProducts();
            dispatch({
                type : "EDIT_PRODUCT",
                payload: res.data
            })
            } catch(error){
                console.error(error)
        }
       }
        

    
      return (
        <GlobalContext.Provider
          value={{
            products: state.products,
            delproduct: state.delproduct,
            product: state.product,
            deleteProduct,
            addProduct,
            getProducts,
            getProduct,
            editProduct
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}  