import axios from "axios";
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
  update_user_request,
  update_user_fail,
  update_user_reset,
  update_user_success
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: login_request });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: login_success, payload: data.user });
  } catch (error) {
    dispatch({ type: login_failed, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: user_register_request });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({ type: user_register_success, payload: data.newuser });
  } catch (error) {
    dispatch({
      type: user_register_failed,
      payload: error.response.data.message,
    });
  }
};

export const update = (userData) => async (dispatch) => {
  try {
    dispatch({ type: update_user_request });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/api/v1/updateprofile`, userData, config);
    dispatch({ type: update_user_success, payload: data.success });
  } catch (error) {
    dispatch({
      type: update_user_fail,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: load_user_request });

    const { data } = await axios.get(`/api/v1/myprofile`);
    dispatch({ type: load_user_success, payload: data.user });
  } catch (error) {
    dispatch({ type: load_user_fail, payload: error.response.data.message });
  }
};

export const Logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch({ type: logout_user_success });
  } catch (error) {
    dispatch({ type: logout_user_fail, payload: error.response.data.message });
  }
};
export const Clearerrors = () => async (dispatch) => {
  dispatch({
    type: Clearerrors,
  });
};
