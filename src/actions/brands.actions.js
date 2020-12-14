import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'

import { updateNotification } from './notifications.actions.js'

export const LOAD = '[Brands] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Brands] LOAD_SUCCESS';
export function loadSuccess(brands){
  return { type: LOAD_SUCCESS, brands }
}

export const LOAD_FAILED = '[Brands] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}


export function fetchAll(){
  return async function(dispatch, getState){
    dispatch(load())

    try{
      let url = `${window.config.API_URL}brands`

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



