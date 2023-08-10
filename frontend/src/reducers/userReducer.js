import {
  login_request,
  login_success,
  login_failed,
  clearErrors,
  user_register_failed,
  user_register_request,
  user_register_success,
  load_user_fail,
  load_user_request,
  load_user_success,
  logout_user_fail,
  logout_user_success,
  update_user_fail,
  update_user_request,
  update_user_reset,
  update_user_success
} from "../constants/userConstants";

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case login_request:
      case load_user_request:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case login_success:
      case load_user_success:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
      case logout_user_success:
        return{
          loading: false,
        isAuthenticated: false,
        user: null,
        }
    case login_failed:
      case load_user_fail:
      return {
        loading: true,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case logout_user_success:
        return{
          ...state,
        loading: false,
        error :action.payload
        }
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

export const updateReducer = (state = {  }, action) => {
  switch (action.type) {
    
      case update_user_request:
        
      return {
        ...state,
        loading: true,
        
      };
    
      case update_user_success:
        
      return {
        ...state,
        loading: false,
        
        isUpdated: action.payload
      };
    case update_user_reset:
      return{
        ...state,
        isUpdated : false
      }
      case update_user_fail:
        
      return {
        loading: true,
        
        
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
