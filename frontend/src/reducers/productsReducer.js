import {
  all_products_failed,
  all_products_request,
  all_products_success,
  product_detail_request,
  product_detail_failed,
  product_detail_success,
  review_fail,
  review_request,
  review_success,
  all_errors,
  review_reset,
  admin_products_request,
  admin_products_fail,
  admin_products_success,
  new_product_fail,
  new_product_request,
  new_product_reset,
  new_product_success,
  delete_product_request,
  delete_product_success,
  delete_product_fail,
  delete_product_reset,
  update_products_request,
  update_products_fail,
  update_products_success,
  admin_all_reviews_request,
  admin_all_reviews_success,
  admin_all_reviews_fail,
  admin_delete_reviews_request,
  admin_delete_reviews_success,
  admin_delete_reviews_fail,
  admin_delete_reviews_reset
} from "../constants/productsConstants";
export const productReducer =
  (state = { products: [] },
  action) => {
    switch (action.type) {
      case all_products_request:
        case admin_products_request:
        return {
          loading: true,
          products: [],
        };

      case all_products_success:
        case admin_products_success:
        return {
          loading: false,
          products: action.payload.products,
          //productsCount: action.payload.productsCount,
        };

      case all_products_failed:
        case admin_products_fail:
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

  export const reviewReducer =
  (state = { },
  action) => {
    switch (action.type) {
      case review_request:
        return {
          loading: true,
          ...state
        };

      case review_success:
        return {
          loading: false,
          success: action.payload,
          //productsCount: action.payload.productsCount,
        };

      case review_fail:
        return {
          loading: false,
          error: action.payload,
        };

        case review_reset:
          return{
            ...state,
            success : false
          }

        case all_errors:
            return{
                ...state,
                error : null
            }

      default:
        return state;
    }
  };

  export const newProductsReducer =
  (state = { product:[]},
  action) => {
    switch (action.type) {
      case new_product_request:
        return {
          loading: true,
          ...state
        };

      case new_product_success:
        return {
          loading: false,
          product: action.payload.product,
          success:action.payload.success
        };

      case new_product_fail:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case new_product_reset:
          return{
            ...state,
            success : false
          }

        case all_errors:
            return{
                ...state,
                error : null
            }

      default:
        return state;
    }
  };

  export const Deleteproductreducer =
  (state = { },
  action) => {
    switch (action.type) {
      case delete_product_request:
        case update_products_request:
        return {
          loading: true,
          ...state
        };

      case delete_product_success:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
          //productsCount: action.payload.productsCount,
        };

        case update_products_success:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
          //productsCount: action.payload.productsCount,
        };

      case delete_product_fail:
        case update_products_fail:
        return {
          loading: false,
          error: action.payload,
        };

        case delete_product_reset:
          return{
            ...state,
            isDeleted : false
          }

          case update_products_request:
          return{
            ...state,
            isUpdated : false
          }

        case all_errors:
            return{
                ...state,
                error : null
            }

      default:
        return state;
    }
  };

  export const productReviewsReducer =
  (state = { reviews: [] },
  action) => {
    switch (action.type) {
      case admin_all_reviews_request:
        return {
          loading: true,
          ...state
        };

      case admin_all_reviews_success:
        return {
          loading: false,
          reviews: action.payload,
          //productsCount: action.payload.productsCount,
        };

      case admin_all_reviews_fail:
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

  export const Deleteproductsreviewreducer =
  (state = { },
  action) => {
    switch (action.type) {
      
        case admin_delete_reviews_request:
        return {
          loading: true,
          ...state
        };

      case admin_delete_reviews_success:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
          //productsCount: action.payload.productsCount,
        };

        

      
        case admin_delete_reviews_fail:
        return {
          loading: false,
          error: action.payload,
        };

        case admin_delete_reviews_reset:
          return{
            ...state,
            isDeleted : false
          }

          

        case all_errors:
            return{
                ...state,
                error : null
            }

      default:
        return state;
    }
  };

