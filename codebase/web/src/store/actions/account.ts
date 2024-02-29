import { actionTypes } from '../action-types';
import Api from '../api/api';
import { isNNObject, isNN } from '../../util/index';
import { ROLE } from '../../constants';
import { ICook } from '../../models/cook';
import { ICooks } from '../../models/store/cook';

let controller: string = 'account/';

export const login = (userName: string, password: string, callback: (result: boolean, message: string) => void) => (dispatch: any) => {
  let fcm_token: string | null = sessionStorage.getItem('fcm_token');
    new Api().post(controller + 'login', (result: any, message: string) => {
      // console.log('OUT: ', result);
      if(isNNObject(result) && isNNObject(result.data) && isNN(result.data.token) && isNN(result.data.userId))
      {
        // console.log('IN: ', result);
        try {
          // console.log(result.token);
          sessionStorage.setItem('auth_token', result.data.token);
          sessionStorage.setItem('user_id', result.data.userId);
        } catch (error) {
          // console.error('AsyncStorage error: ' + error.message);
        }
        dispatch(setLoginResult({
          isLoggedIn: true,
          role: result.data.role,
          name: result.data.name,
          userId: result.data.userId}));
        callback(true, '');
      }else{
        callback(false, message);
      }
    }, {
      userName: userName,
      password: password,
      rememberMe: false
    });
};

export const getProfile = (callback: (result: boolean, message: string) => void) => (dispatch: any) => {
  new Api().get(controller + 'profile', (result: any, message: string) => {
    // console.log('OUT: ', result);
    if(isNNObject(result) && isNNObject(result.data))
    {
      dispatch(getCookResult(((isNNObject(result.data) && result.data instanceof Array) ? result.data as Array<ICook> : []), true, false, ''));    
      callback(true, '');
    }else{
      callback(false, message);
    }
  });
};

export const changePassword = (userId: string, password: string, newPassword: string, callback: (result: boolean, message: string) => void) => (dispatch: any) => {
  new Api().post(controller + 'changepassword/' + userId, (result: any, message: string) => {
    if(isNNObject(result) && isNNObject(result.data) && result.data == true)
    {
      callback(true, '');
    }else{
      callback(false, message);
    }
  }, {
    password: password,
    newPassword: newPassword
  });
};

export const logout = (callback: (result: boolean) => void) => (dispatch: any) => {
  try {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('client_id');
    dispatch(setLoginResult(
      {
        isLoggedIn: false,
        role: '',
        name: '',
        userId: ''
      }
    ));
    dispatch(resetState());
    callback(true);
  } catch (error) {
    // console.error('AsyncStorage error: ' + error.message);
    callback(false);
  }
};

const setLoginResult = (data: any) => ({
  type: actionTypes.SET_LOGIN_STATUS,
  payload: data
});

const getCookResult = (data: Array<ICook>, isUpToDate: boolean, isError: boolean, errorMessage: string) => ({
  type: actionTypes.LOAD_COOKS,
  payload: { 
    data,
    isUpToDate,
    isError,
    errorMessage
  } as ICooks
});

const resetState = () => ({
  type: actionTypes.RESET
});