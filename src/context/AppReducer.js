const products = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "DEL_PRODUCT":
            return {
                ...state,
                delproduct: action.payload,
                products: state.products.filter((product) => action.payload.product.id !== product.id)
            };
        case "ADD_PRODUCT":
            return {
                ...state,
                //product: action.payload,
                products:[ action.payload,...state.products]
            };
        case "GET_PRODUCT":
            return {
                ...state,
                product: action.payload,
            };
        case "EDIT_PRODUCT":
            console.log(' EDIT output: ' , action.payload)
            return {
                ...state,
            //    products: action.payload,
            };
        default:
            return state;
    }
};
export default products;