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
  update_user_success,
  update_password_fail,
  update_password_request,
  update_password_reset,
  update_password_success,
  forgot_password_fail,
  forgot_password_request,
  forgot_password_success,
  reset_password_fail,
  reset_password_request,
  reset_password_success
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
      case logout_user_fail:
        return{
          ...state,
        loading: false,
        error :action.payload,
        isAuthenticated : false
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
        isRegistered: false,
      };
    
      case user_register_success:
        
      return {
        ...state,
        loading: false,
        isRegistered: true,
        newuser: action.payload
      };
    
      case user_register_failed:
        
      return {
        loading: true,
        isRegistered: false,
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
      case update_password_request:
      return {
        ...state,
        loading: true,
        
      };
    
      case update_user_success:
      case update_password_success:
      return {
        ...state,
        loading: false,
        
        isUpdated: action.payload
      };
    case update_user_reset:
    case update_password_reset:
      return{
        ...state,
        isUpdated : false
      }
      case update_user_fail:
        case update_password_fail:
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

export const forgotPasswordReducer = (state = {  }, action) => {
  switch (action.type) {
    
      case forgot_password_request:
        case reset_password_request:
      return {
        ...state,
        loading: true,
        error : null,
        isUpdated : false
      };
    
      case forgot_password_success:
      return {
        ...state,
        loading: false,
        isUpdated : true,
        success: action.payload
      };

      case reset_password_success:
      return {
        ...state,
        loading: false,
        
        isUpdated : true
      };
    
      case forgot_password_fail:
        case reset_password_fail:
      return {
        ...state,
        loading: false,
        isUpdated : false,
        
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
