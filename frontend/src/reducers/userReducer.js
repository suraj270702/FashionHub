import {
  login_request,
  login_success,
  login_failed,
  clearErrors,
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
