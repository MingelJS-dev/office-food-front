import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const LOAD = '[Products] LOAD';
export function load(){
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Products] LOAD_SUCCESS';
export function loadSuccess(products){
  return { type: LOAD_SUCCESS, products }
}

export const LOAD_FAILED = '[Products] LOAD_FAILED';
export function loadFailed(error){
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Products] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Products] UPDATE_ONE_FAILED';
export function updateOneFailed(error, ProductId){
  return { type: UPDATE_ONE_FAILED, error, ProductId }
}

export const UPDATE_ONE_SUCCESS = '[Products] UPDATE_ONE_SUCCESS';
export function updateOneSucess(product){
  return { type: UPDATE_ONE_SUCCESS, product }
}


export const CREATE = '[Products] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Products] CREATE_SUCCESS';
export function createSuccess(product){
  return { type: CREATE_SUCCESS, product }
}

export const CREATE_FAILED = '[Products] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Products] DESTROY';
export function destroy(data){
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Products] DESTROY_SUCCESS';
export function destroySuccess(product){
  return { type: DESTROY_SUCCESS, product }
}

export const DESTROY_FAILED = '[Products] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}

export const EXPORT = '[Products] EXPORT';
export function exportProduct() {
  return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Products] EXPORT_SUCCESS';
export function exportSuccess(file) {
  return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Products] EXPORT_FAILED';
export function exportFailed(error) {
  return { type: EXPORT_FAILED, error }
}


export const [ UPDATE_PAGINATION, updatePagination ] = createAction('[Products] UPDATE_PAGINATION', ['headers'])

export function fetchAll(){
  return async function(dispatch, getState){
    dispatch(load())

    try{
      let url = `${window.config.API_URL}products`

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
      const res = await axios.put( `${window.config.API_URL}products/${data.id}`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(updateOneSucess(res.data.data))
        dispatch(updateNotification('Artículo actualizado correctamente', 'success'))
      }else{
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar el artículo', 'danger'))
      }

    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar el artículo', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createProduct(data){
  return async function(dispatch, getState){
    dispatch(create(data))
    try{
      const res = await axios.post(window.config.API_URL + `products`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(createSuccess(res.data.data))
        history.push('/products')
        dispatch(updateNotification('Artículo creado correctamente', 'success'))
      }else{
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear el artículo', 'danger'))
      }
    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear el artículo', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function destroyById(ProductId) {
  return async function (dispatch, getState) {
    dispatch(destroy(ProductId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}products/${ProductId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(destroySuccess({ProductId}))
        // history.push('/products')
        dispatch(updateNotification('Artículo eliminado correctamente', 'success'))
      } else {
        dispatch(destroyFailed(res, ProductId))
        dispatch(updateNotification('Hubo un error al eliminar el artículo', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar el artículo', 'danger'))
      dispatch(destroyFailed(error, ProductId))
    }
  }
}

export function exportProductFile() {
  return async function (dispatch, getState) {
    dispatch(exportProduct())

    try {
      let url = `${window.config.API_URL}products/export`

      const res = await axios.get(url, {
        headers: getAuthHeaders(getState())
      });

      if (res.status === 200) {
        saveAs(res.config.url, 'Maestra_Artículos')
        dispatch(exportSuccess(res.data.data))
      } else {
        dispatch(exportFailed(res.data.message))
      }
    } catch (err) {
      dispatch(exportFailed(err))
    }
  }
}



