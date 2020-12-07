import decodeJWT from 'jwt-decode'
// import { createSelector } from 'reselect'

import * as AuthActions from '../actions/auth.actions.js'
import * as UserActions from '../actions/users.actions.js'


const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingIn: false,
  credentialsMsg: false,
  token: null,
  currentUser: null,
//   currentRole: null,
  company: null
}

export default function auth(state = INITIAL_STATE, action){
  switch(action.type){
    case AuthActions.LOGIN:
      return {
        ...state,
        isLoggingIn: true
      }

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        // currentRole: action.data.role
      }

    case AuthActions.LOGIN_FAILED:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        credentialsMsg: true,
        token: null
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        credentialsMsg: false,
        token: null
      }

    case UserActions.LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user
      }

    case AuthActions.LOAD_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.company
      }

    case AuthActions.LOAD_COMPANY_FAILED:
      return {
        ...state,
        credentialsMsg: false,
        company: {
          app_name: 'Restaurant XXI'
        }
      }

    default:
      return state;
  }
}

export const getCurrentUser = state => state.auth.currentUser;

export const getDecodedToken = state => {
  let decoded = {}

  if(state.auth.token){
    decoded = decodeJWT(state.auth.token)
  }

  return decoded;
}

// export const getRole = state => state.auth.currentRole

