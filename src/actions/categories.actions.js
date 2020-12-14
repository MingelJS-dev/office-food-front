import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'

import { updateNotification } from './notifications.actions.js'

export const LOAD = '[Categories] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Categories] LOAD_SUCCESS';
export function loadSuccess(categories){
  return { type: LOAD_SUCCESS, categories }
}

export const LOAD_FAILED = '[Categories] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Categories] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Categories] UPDATE_ONE_FAILED';
export function updateOneFailed(error, CategoryId){
  return { type: UPDATE_ONE_FAILED, error, CategoryId }
}

export const UPDATE_ONE_SUCCESS = '[Categories] UPDATE_ONE_SUCCESS';
export function updateOneSucess(category){
  return { type: UPDATE_ONE_SUCCESS, category }
}


export const CREATE = '[Categories] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Categories] CREATE_SUCCESS';
export function createSuccess(category){
  return { type: CREATE_SUCCESS, category }
}

export const CREATE_FAILED = '[Categories] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Categories] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Categories] DESTROY_SUCCESS';
export function destroySuccess(category){
  return { type: DESTROY_SUCCESS, category }
}

export const DESTROY_FAILED = '[Categories] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}


export const [ UPDATE_PAGINATION, updatePagination ] = createAction('[Categories] UPDATE_PAGINATION', ['headers'])

export function fetchAll(){
  return async function(dispatch, getState){
    dispatch(load())

    try{
      let url = `${window.config.API_URL}categories`

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
      const res = await axios.put( `${window.config.API_URL}categories/${data.id}`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(updateOneSucess(res.data.data))
        dispatch(updateNotification('Categoria actualizado correctamente', 'success'))
      }else{
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar la categoria', 'danger'))
      }

    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar la categoria', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createCategory(data){
  return async function(dispatch, getState){
    dispatch(create(data))
    try{
      const res = await axios.post(window.config.API_URL + `categories`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(createSuccess(res.data.data))
        // history.push('/users')
        dispatch(updateNotification('Categoria creado correctamente', 'success'))
      }else{
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear la categoria', 'danger'))
      }
    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear la categoria', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function destroyById(CategoryId) {
  return async function (dispatch, getState) {
    dispatch(destroy(CategoryId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}categories/${CategoryId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(destroySuccess({CategoryId}))
        // history.push('/products')
        dispatch(updateNotification('Categoria eliminado correctamente', 'success'))
      } else {
        dispatch(destroyFailed(res, CategoryId))
        dispatch(updateNotification('Hubo un error al eliminar la categoria', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar la categoria', 'danger'))
      dispatch(destroyFailed(error, CategoryId))
    }
  }
}


