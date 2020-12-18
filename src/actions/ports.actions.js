import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const EXPORT = '[Ports] LOAD';
export function exportPorts() {
    return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Ports] LOAD_SUCCESS';
export function exportSuccess(file) {
    return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Ports] LOAD_FAILED';
export function exportFailed(error) {
    return { type: EXPORT_FAILED, error }
}

export const LOAD = '[Ports] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Ports] LOAD_SUCCESS';
export function loadSuccess(ports){
  return { type: LOAD_SUCCESS, ports }
}

export const LOAD_FAILED = '[Ports] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Ports] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Ports] UPDATE_ONE_FAILED';
export function updateOneFailed(error, PortId){
  return { type: UPDATE_ONE_FAILED, error, PortId }
}

export const UPDATE_ONE_SUCCESS = '[Ports] UPDATE_ONE_SUCCESS';
export function updateOneSucess(port){
  return { type: UPDATE_ONE_SUCCESS, port }
}


export const CREATE = '[Ports] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Ports] CREATE_SUCCESS';
export function createSuccess(port){
  return { type: CREATE_SUCCESS, port }
}

export const CREATE_FAILED = '[Ports] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Ports] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Ports] DESTROY_SUCCESS';
export function destroySuccess(port){
  return { type: DESTROY_SUCCESS, port }
}

export const DESTROY_FAILED = '[Ports] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}

export function exportPortFile() {
    return async function (dispatch, getState) {
        dispatch(exportPorts())

        try {
            let url = `${window.config.API_URL}ports/export`

            const res = await axios.get(url, {
                headers: getAuthHeaders(getState())
            });

            if (res.status === 200) {
                saveAs(res.config.url, 'Maestra_Puertos')
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
        let url = `${window.config.API_URL}ports`
  
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
        const res = await axios.put( `${window.config.API_URL}ports/${data.id}`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(updateOneSucess(res.data.data))
          dispatch(updateNotification('Puerto actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar el puerto', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar el puerto', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }

  export function createPort(data){
    return async function(dispatch, getState){
      dispatch(create(data))
      try{
        const res = await axios.post(window.config.API_URL + `ports`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(createSuccess(res.data.data))
          history.push('/ports')
          dispatch(updateNotification('Puerto creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear el puerto', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear el puerto', 'danger'))
        dispatch(createFailed(error))
      }
    }
  }

  export function destroyById(PortId) {
    return async function (dispatch, getState) {
      dispatch(destroy(PortId))
  
      try {
        const res = await axios.delete(
          `${window.config.API_URL}ports/${PortId}`,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if (res.status === 201) {
          dispatch(destroySuccess({PortId}))
          history.push('/ports')
          dispatch(updateNotification('Puerto eliminado correctamente', 'success'))
        } else {
          dispatch(destroyFailed(res, PortId))
          dispatch(updateNotification('Hubo un error al eliminar el puerto', 'danger'))
        }
  
      } catch (error) {
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar el puerto', 'danger'))
        dispatch(destroyFailed(error, PortId))
      }
    }
  }
  