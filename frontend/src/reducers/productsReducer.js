import {
  all_products_failed,
  all_products_request,
  all_products_success,
  all_errors
} from "../constants/productsConstants";
export const productReducer =
  (state = { products: [] },
  action) => {
    switch (action.type) {
      case all_products_request:
        return {
          loading: true,
          product: [],
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
