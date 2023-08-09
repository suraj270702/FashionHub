import {
  login_request,
  login_success,
  login_failed,
  clearErrors,
  user_register_failed,
  user_register_request,
  user_register_success
} from "../constants/userConstants";

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case login_request:
      
      return {
        loading: true,
        isAuthenticated: false,
      };
    case login_success:
      
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case login_failed:
      
      return {
        loading: true,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case clearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const registerReducer = (state = { newuser: [] }, action) => {
  switch (action.type) {
    
      case user_register_request:
      return {
        loading: true,
        isAuthenticated: false,
      };
    
      case user_register_success:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        newuser: action.payload
      };
    
      case user_register_failed:
      return {
        loading: true,
        isAuthenticated: false,
        newuser: null,
        error: action.payload,
      };
    case clearErrors:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
