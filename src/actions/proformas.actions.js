import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const EXPORT = '[Proformas] LOAD';
export function exportPorts() {
    return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Proformas] LOAD_SUCCESS';
export function exportSuccess(file) {
    return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Proformas] LOAD_FAILED';
export function exportFailed(error) {
    return { type: EXPORT_FAILED, error }
}

export const LOAD = '[Proformas] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Proformas] LOAD_SUCCESS';
export function loadSuccess(proformas){
  return { type: LOAD_SUCCESS, proformas }
}

export const LOAD_FAILED = '[Proformas] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Proformas] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Proformas] UPDATE_ONE_FAILED';
export function updateOneFailed(error, ProformaId){
  return { type: UPDATE_ONE_FAILED, error, ProformaId }
}

export const UPDATE_ONE_SUCCESS = '[Proformas] UPDATE_ONE_SUCCESS';
export function updateOneSucess(proforma){
  return { type: UPDATE_ONE_SUCCESS, proforma }
}


export const CREATE = '[Proformas] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Proformas] CREATE_SUCCESS';
export function createSuccess(proforma){
  return { type: CREATE_SUCCESS, proforma }
}

export const CREATE_FAILED = '[Proformas] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Proformas] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Proformas] DESTROY_SUCCESS';
export function destroySuccess(proforma){
  return { type: DESTROY_SUCCESS, proforma }
}

export const DESTROY_FAILED = '[Proformas] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}

export function exportBase() {
    return async function (dispatch, getState) {
        dispatch(exportPorts())

        try {
            let url = `${window.config.API_URL}proformas/base_export`

            const res = await axios.get(url, {
                headers: getAuthHeaders(getState())
            });

            if (res.status === 200) {
                saveAs(res.config.url, 'Base')
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
        let url = `${window.config.API_URL}proformas`
  
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
        const res = await axios.put( `${window.config.API_URL}proformas/${data.id}`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(updateOneSucess(res.data.data))
          dispatch(updateNotification('Proforma actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar la proforma', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar la proforma', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }

  export function createProforma(data){
    return async function(dispatch, getState){
      dispatch(create(data))
      try{
        const res = await axios.post(window.config.API_URL + `proformas`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          dispatch(createSuccess(res.data.data))
          history.push('/proformas')
          dispatch(updateNotification('Proforma creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear el proforma', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear el proforma', 'danger'))
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
  