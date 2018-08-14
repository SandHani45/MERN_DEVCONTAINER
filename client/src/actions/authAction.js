//Register User
import {GET_ERROR, SET_CURRENT_USER} from './type';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (newUser,history) => dispatch =>{
    axios
      .post("/api/users/register/", newUser)
      .then(res => history.push('/login'))
      .catch(err =>
        dispatch({
            type:GET_ERROR,
            payload:err.response.data
        })
      );
}

//Login ---get User Token 
export const loginUser = userData => dispatch => {
  axios.post('api/users/login',userData)
        .then(res => {
          // Save LocalHost
          const {token} = res.data
          
          //set token in localStorage
          localStorage.setItem('jwtToken',token);

          //set Token to Auth Header
          setAuthToken(token);

          //decode token to get user data
          const decoded = jwt_decode(token);
          // set user user
          dispatch(setCurrentUser(decoded)); 
        })
        .catch(err =>
          dispatch({
              type:GET_ERROR,
              payload:err.response.data
          })
        );
}


// set login User
export const setCurrentUser = (decode) =>{
  return {
    type:SET_CURRENT_USER,
    payload: decode
  }
}