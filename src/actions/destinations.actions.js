import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const EXPORT = '[Destinations] LOAD';
export function exportDestination() {
    return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Destinations] LOAD_SUCCESS';
export function exportSuccess(file) {
    return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Destinations] LOAD_FAILED';
export function exportFailed(error) {
    return { type: EXPORT_FAILED, error }
}

export const LOAD = '[Destinations] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Destinations] LOAD_SUCCESS';
export function loadSuccess(destinations){
  return { type: LOAD_SUCCESS, destinations }
}

export const LOAD_FAILED = '[Destinations] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Destinations] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Destinations] UPDATE_ONE_FAILED';
export function updateOneFailed(error, DestinationId){
  return { type: UPDATE_ONE_FAILED, error, DestinationId }
}

export const UPDATE_ONE_SUCCESS = '[Destinations] UPDATE_ONE_SUCCESS';
export function updateOneSucess(destination){
  return { type: UPDATE_ONE_SUCCESS, destination }
}


export const CREATE = '[Destinations] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Destinations] CREATE_SUCCESS';
export function createSuccess(destination){
  return { type: CREATE_SUCCESS, destination }
}

export const CREATE_FAILED = '[Destinations] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Destinations] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Destinations] DESTROY_SUCCESS';
export function destroySuccess(destination){
  return { type: DESTROY_SUCCESS, destination }
}

export const DESTROY_FAILED = '[Destinations] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}

export function exportFile() {
    return async function (dispatch, getState) {
        dispatch(exportDestination())

        try {
            let url = `${window.config.API_URL}destinations/export`

            const res = await axios.get(url, {
                headers: getAuthHeaders(getState())
            });

            if (res.status === 200) {
                saveAs(res.config.url, 'Maestra_Destinos')
                dispatch(exportSuccess(res.data.data))
            } else {
                dispatch(exportFailed(res.data.message))
            }
        } catch (err) {
            dispatch(exportFailed(err))
        }
    }
}

export function fetchAll(){
    return async function(dispatch, getState){
      dispatch(load())
  
      try{
        let url = `${window.config.API_URL}destinations`
  
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
        const res = await axios.put( `${window.config.API_URL}destinations/${data.id}`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(updateOneSucess(res.data.data))
          dispatch(updateNotification('Destino actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar el destino', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar el destino', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }

  export function createDestination(data){
    return async function(dispatch, getState){
      dispatch(create(data))
      try{
        console.log('asdsad')
        const res = await axios.post(window.config.API_URL + `destinations`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(createSuccess(res.data.data))
        //   history.push('/ports')
          dispatch(updateNotification('Destino creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear el destino', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear el destino', 'danger'))
        dispatch(createFailed(error))
      }
    }
  }

  export function destroyById(DestinationId) {
    return async function (dispatch, getState) {
      dispatch(destroy(DestinationId))
  
      try {
        const res = await axios.delete(
          `${window.config.API_URL}destinations/${DestinationId}`,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if (res.status === 201) {
          dispatch(destroySuccess({DestinationId}))
        //   history.push('/ports')
          dispatch(updateNotification('Destino eliminado correctamente', 'success'))
        } else {
          dispatch(destroyFailed(res, DestinationId))
          dispatch(updateNotification('Hubo un error al eliminar el destino', 'danger'))
        }
  
      } catch (error) {
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar el destino', 'danger'))
        dispatch(destroyFailed(error, DestinationId))
      }
    }
  }
  