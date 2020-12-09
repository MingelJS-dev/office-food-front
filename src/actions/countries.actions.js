import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'

import { updateNotification } from './notifications.actions.js'

export const LOAD_COUNTRIES = '[Countries] LOAD_COUNTRIES';
export function load(){
  return { type: LOAD_COUNTRIES }
}

export const LOAD_COUNTRIES_SUCCESS = '[Countries] LLOAD_COUNTRIES_SUCCESS';
export function loadSuccess(countries){
  return { type: LOAD_COUNTRIES_SUCCESS, countries }
}

export const LOAD_COUNTRIES_FAILED = '[Countries] LOAD_COUNTRIES_FAILED';
export function loadFailed(error){
  return { type: LOAD_COUNTRIES_FAILED, error }
}

export function fetchCountries(){
    return async function(dispatch, getState){
      dispatch(load())
  
      try{
        let url = `${window.config.API_URL}countries`
  
        const res = await axios.get(url, {
          headers: getAuthHeaders(getState())
        });
  
        if(res.status === 201){
          dispatch(loadSuccess(res.data.data))
        }else{
          dispatch(loadFailed(res.data.message))
        }
      }catch(err){
        dispatch(loadFailed(err))
      }
    }
  }