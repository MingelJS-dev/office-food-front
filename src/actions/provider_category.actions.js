import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'

import { updateNotification } from './notifications.actions.js'

export const LOAD = '[ProviderCategories] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[ProviderCategories] LOAD_SUCCESS';
export function loadSuccess(providers){
  return { type: LOAD_SUCCESS, providers }
}

export const LOAD_FAILED = '[ProviderCategories] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[ProviderCategories] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[ProviderCategories] UPDATE_ONE_FAILED';
export function updateOneFailed(error, providerCategoryId){
  return { type: UPDATE_ONE_FAILED, error, UserId }
}

export const UPDATE_ONE_SUCCESS = '[ProviderCategories] UPDATE_ONE_SUCCESS';
export function updateOneSucess(providerCategories){
  return { type: UPDATE_ONE_SUCCESS, providerCategories }
}


export const CREATE = '[ProviderCategories] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[ProviderCategories] CREATE_SUCCESS';
export function createSuccess(providerCategories){
  return { type: CREATE_SUCCESS, providerCategories }
}

export const CREATE_FAILED = '[ProviderCategories] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[ProviderCategories] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[ProviderCategories] DESTROY_SUCCESS';
export function destroySuccess(providerCategories){
  return { type: DESTROY_SUCCESS, providerCategories }
}

export const DESTROY_FAILED = '[ProviderCategories] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
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
      const res = await axios.put( `${window.config.API_URL}providerCategories/${data.id}`,
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

export function createProviderCategories(data){
  return async function(dispatch, getState){
    dispatch(create(data))
    try{
      const res = await axios.post(window.config.API_URL + `providerCategories`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(createSuccess(res.data.data))
        // history.push('/users')
        // dispatch(updateNotification('Proveedor creado correctamente', 'success'))
      }else{
        dispatch(createFailed(res))
        // dispatch(updateNotification('Hubo un error al crear el proveedor', 'danger'))
      }
    }catch(error){
      console.log('error:', error)
    //   dispatch(updateNotification('Hubo un error al crear el proveedor', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function destroyById(ProviderId) {
  return async function (dispatch, getState) {
    dispatch(destroy(CategoryId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}providers/${ProviderId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(destroySuccess({CategoryId}))
        // history.push('/products')
        dispatch(updateNotification('Proveedor eliminado correctamente', 'success'))
      } else {
        dispatch(destroyFailed(res, CategoryId))
        dispatch(updateNotification('Hubo un error al eliminar el proveedor', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar el proveedor', 'danger'))
      dispatch(destroyFailed(error, CategoryId))
    }
  }
}


