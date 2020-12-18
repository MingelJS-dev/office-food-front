import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';
import { updateNotification } from './notifications.actions.js'

export const LOAD = '[Providers] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Providers] LOAD_SUCCESS';
export function loadSuccess(providers){
  return { type: LOAD_SUCCESS, providers }
}

export const LOAD_FAILED = '[Providers] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Providers] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Providers] UPDATE_ONE_FAILED';
export function updateOneFailed(error, ProviderId){
  return { type: UPDATE_ONE_FAILED, error, ProviderId }
}

export const UPDATE_ONE_SUCCESS = '[Providers] UPDATE_ONE_SUCCESS';
export function updateOneSucess(provider){
  return { type: UPDATE_ONE_SUCCESS, provider }
}


export const CREATE = '[Providers] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Providers] CREATE_SUCCESS';
export function createSuccess(provider){
  return { type: CREATE_SUCCESS, provider }
}

export const CREATE_FAILED = '[Providers] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Providers] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Providers] DESTROY_SUCCESS';
export function destroySuccess(provider){
  return { type: DESTROY_SUCCESS, provider }
}

export const DESTROY_FAILED = '[Providers] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}

export const EXPORT = '[Providers] LOAD';
export function exportProvider() {
    return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Providers] LOAD_SUCCESS';
export function exportSuccess(file) {
    return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Providers] LOAD_FAILED';
export function exportFailed(error) {
    return { type: EXPORT_FAILED, error }
}


export const [ UPDATE_PAGINATION, updatePagination ] = createAction('[Providers] UPDATE_PAGINATION', ['headers'])

export function fetchAll(){
  return async function(dispatch, getState){
    dispatch(load())

    try{
      let url = `${window.config.API_URL}providers`

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
      const res = await axios.put( `${window.config.API_URL}providers/${data.id}`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(updateOneSucess(res.data.data))
        dispatch(updateNotification('Proveedor actualizado correctamente', 'success'))
      }else{
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar el proveedor', 'danger'))
      }

    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar el proveedor', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createProvider(data){
  return async function(dispatch, getState){
    dispatch(create(data))
    try{
      const res = await axios.post(window.config.API_URL + `providers`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(createSuccess(res.data.data))
        history.push('/providers')
        dispatch(updateNotification('Proveedor creado correctamente', 'success'))
      }else{
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear el proveedor', 'danger'))
      }
    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear el proveedor', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function destroyById(ProviderId) {
  return async function (dispatch, getState) {
    dispatch(destroy(ProviderId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}providers/${ProviderId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(destroySuccess({ProviderId}))
        // history.push('/products')
        dispatch(updateNotification('Proveedor eliminado correctamente', 'success'))
      } else {
        dispatch(destroyFailed(res, ProviderId))
        dispatch(updateNotification('Hubo un error al eliminar el proveedor', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar el proveedor', 'danger'))
      dispatch(destroyFailed(error, ProviderId))
    }
  }
}

export function exportFile() {
  return async function (dispatch, getState) {
      dispatch(exportProvider())

      try {
          let url = `${window.config.API_URL}providers/export`

          const res = await axios.get(url, {
              headers: getAuthHeaders(getState())
          });

          if (res.status === 200) {
              saveAs(res.config.url, 'Maestra_Proveedores')
              dispatch(exportSuccess(res.data.data))
          } else {
              dispatch(exportFailed(res.data.message))
          }
      } catch (err) {
          dispatch(exportFailed(err))
      }
  }
}


