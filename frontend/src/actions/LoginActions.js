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
  reset_password_success,
  all_users_request,
  all_users_success,
  all_users_fail,
  user_details_request,
  user_details_success,
  user_details_fail,
  admin_update_user_request,
  admin_update_user_suucess,
  admin_update_user_fail
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
    console.log('Response data:', data);
    dispatch({ type: user_register_success, payload: data.user });
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

export const ChangePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: update_password_request });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/updatepassword`, passwords, config);
    dispatch({ type: update_password_success, payload: data.success });
  } catch (error) {
    dispatch({
      type: update_password_fail,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token,passwords) => async (dispatch) => {
  try {
    dispatch({ type: reset_password_request });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
    dispatch({ type: reset_password_success, payload: data.success });
  } catch (error) {
    dispatch({
      type: reset_password_fail,
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

export const adminUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: user_details_request });

    const { data } = await axios.get(`/api/v1/admin/userdetails/${id}`);
    dispatch({ type: user_details_success, payload: data.user });
  } catch (error) {
    dispatch({ type: user_details_fail, payload: error.response.data.message });
  }
};

export const adminAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: all_users_request });

    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch({ type: all_users_success, payload: data.users });
  } catch (error) {
    dispatch({ type: all_users_fail, payload: error.response.data.message });
  }
};

export const adminUpdateUsers = (id,userData) => async (dispatch) => {
  try {
    dispatch({ type: admin_update_user_request });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/admin/updateuserrole/${id}`,userData,config);
    dispatch({ type: admin_update_user_suucess, payload: data.success });
  } catch (error) {
    dispatch({ type: admin_update_user_fail, payload: error.response.data.message });
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


export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: forgot_password_request });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/forgotpassword`,
       email,
      config
    );
    dispatch({ type: forgot_password_success, payload: data.message });
  } catch (error) {
    dispatch({ type: forgot_password_fail, payload: error.response.data.message });
  }
};