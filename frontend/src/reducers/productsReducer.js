import {
  all_products_failed,
  all_products_request,
  all_products_success,
  product_detail_request,
  product_detail_failed,
  product_detail_success,
  all_errors
} from "../constants/productsConstants";
export const productReducer =
  (state = { products: [] },
  action) => {
    switch (action.type) {
      case all_products_request:
        return {
          loading: true,
          products: [],
        };

      case all_products_success:
        return {
          loading: false,
          products: action.payload.products,
          //productsCount: action.payload.productsCount,
        };

      case all_products_failed:
        return {
          loading: false,
          error: action.payload,
        };

        case all_errors:
            return{
                ...state,
                error : null
            }

      default:
        return state;
    }
  };


  export const productDetailsReducer =
  (state = { product: [] },
  action) => {
    switch (action.type) {
      case product_detail_request:
        return {
          loading: true,
          ...state
        };

      case product_detail_success:
        return {
          loading: false,
          product: action.payload,
          //productsCount: action.payload.productsCount,
        };

      case product_detail_failed:
        return {
          loading: false,
          error: action.payload,
        };

        case all_errors:
            return{
                ...state,
                error : null
            }

      default:
        return state;
    }
  };
