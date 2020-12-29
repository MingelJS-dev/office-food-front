import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const EXPORT = '[Recipients] LOAD';
export function exportRecipient() {
    return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Recipients] LOAD_SUCCESS';
export function exportSuccess(file) {
    return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Recipients] LOAD_FAILED';
export function exportFailed(error) {
    return { type: EXPORT_FAILED, error }
}

export const LOAD = '[Recipients] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Recipients] LOAD_SUCCESS';
export function loadSuccess(recipients){
  return { type: LOAD_SUCCESS, recipients }
}

export const LOAD_FAILED = '[Recipients] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Recipients] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Recipients] UPDATE_ONE_FAILED';
export function updateOneFailed(error, RecipientId){
  return { type: UPDATE_ONE_FAILED, error, RecipientId }
}

export const UPDATE_ONE_SUCCESS = '[Recipients] UPDATE_ONE_SUCCESS';
export function updateOneSucess(recipient){
  return { type: UPDATE_ONE_SUCCESS, recipient }
}


export const CREATE = '[Recipients] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Recipients] CREATE_SUCCESS';
export function createSuccess(recipient){
  return { type: CREATE_SUCCESS, recipient }
}

export const CREATE_FAILED = '[Recipients] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Recipients] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Recipients] DESTROY_SUCCESS';
export function destroySuccess(recipient){
  return { type: DESTROY_SUCCESS, recipient }
}

export const DESTROY_FAILED = '[Recipients] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}


export function fetchAll(){
    return async function(dispatch, getState){
      dispatch(load())
  
      try{
        let url = `${window.config.API_URL}recipients`
  
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
  
  export function updateById(data){
    return async function(dispatch, getState){
      dispatch(updateOne(data))
  
      try{
        const res = await axios.put( `${window.config.API_URL}recipients/${data.id}`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(updateOneSucess(res.data.data))
          dispatch(updateNotification('Destinatario actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar el Destinatario', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar el Destinatario', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }

  export function createRecipient(data){
    return async function(dispatch, getState){
      dispatch(create(data))
      try{
        const res = await axios.post(window.config.API_URL + `recipients`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(createSuccess(res.data.data))
        //   history.push('/recipients')
          dispatch(updateNotification('Destinatario creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear el Destinatario', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear el Destinatario', 'danger'))
        dispatch(createFailed(error))
      }
    }
  }

  export function destroyById(RecipientId) {
    return async function (dispatch, getState) {
      dispatch(destroy(RecipientId))
  
      try {
        const res = await axios.delete(
          `${window.config.API_URL}recipients/${RecipientId}`,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if (res.status === 201) {
          dispatch(destroySuccess({RecipientId}))
        //   history.push('/ports')
          dispatch(updateNotification('Destinatario eliminado correctamente', 'success'))
        } else {
          dispatch(destroyFailed(res, RecipientId))
          dispatch(updateNotification('Hubo un error al eliminar el Destinatario', 'danger'))
        }
  
      } catch (error) {
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar el Destinatario', 'danger'))
        dispatch(destroyFailed(error, RecipientId))
      }
    }
  }
  