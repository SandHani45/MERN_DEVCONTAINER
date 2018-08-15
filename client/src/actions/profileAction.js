import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE
} from "./type";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Profile Loading
export const setProfileLoading = () => dispatch => {
  return {
    type: PROFILE_LOADING
  };
};

//clear current profile
export const clearCurrentProfile = () => dispatch => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
