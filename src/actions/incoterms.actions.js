import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const LOAD = '[Containers] LOAD';
export function load() {
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Incoterms] LOAD_SUCCESS';
export function loadSuccess(incoterms) {
  return { type: LOAD_SUCCESS, incoterms }
}

export const LOAD_FAILED = '[Incoterms] LOAD_FAILED';
export function loadFailed(error) {
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Incoterms] UPDATE_ONE';
export function updateOne(data) {
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Incoterms] UPDATE_ONE_FAILED';
export function updateOneFailed(error, IncotermId) {
  return { type: UPDATE_ONE_FAILED, error, IncotermId }
}

export const UPDATE_ONE_SUCCESS = '[Incoterms] UPDATE_ONE_SUCCESS';
export function updateOneSucess(incoterm) {
  return { type: UPDATE_ONE_SUCCESS, incoterm }
}


export const CREATE = '[Incoterms] CREATE';
export function create(data) {
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Incoterms] CREATE_SUCCESS';
export function createSuccess(incoterm) {
  return { type: CREATE_SUCCESS, incoterm }
}

export const CREATE_FAILED = '[Incoterms] CREATE_FAILED';
export function createFailed(error) {
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Incoterms] DESTROY';
export function destroy(data) {
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Incoterms] DESTROY_SUCCESS';
export function destroySuccess(incoterm) {
  return { type: DESTROY_SUCCESS, incoterm }
}

export const DESTROY_FAILED = '[Incoterms] DESTROY_FAILED';
export function destroyFailed(error) {
  return { type: DESTROY_FAILED, error }
}

export function fetchAll() {
  return async function (dispatch, getState) {
    dispatch(load())

    try {
      let url = `${window.config.API_URL}incoterms`

      const res = await axios.get(url, {
        headers: getAuthHeaders(getState())
      });

      if (res.status === 201) {
        dispatch(loadSuccess(res.data.data))
      } else {
        dispatch(loadFailed(res.data.message))
      }
    } catch (err) {
      dispatch(loadFailed(err))
    }
  }
}

export function updateById(data) {
  return async function (dispatch, getState) {
    dispatch(updateOne(data))

    try {
      const res = await axios.put(`${window.config.API_URL}incoterms/${data.id}`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(updateOneSucess(res.data.data))
        dispatch(updateNotification('Incoterm actualizado correctamente', 'success'))
      } else {
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar el Incoterm', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar el Incoterm', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createIncoterm(data) {
  return async function (dispatch, getState) {
    dispatch(create(data))
    try {
      const res = await axios.post(window.config.API_URL + `incoterms`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(createSuccess(res.data.data))
        //   history.push('/recipients')
        dispatch(updateNotification('Incoterm creado correctamente', 'success'))
      } else {
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear el Incoterm', 'danger'))
      }
    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear el Incoterm', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function destroyById(IncotermId) {
  return async function (dispatch, getState) {
    dispatch(destroy(IncotermId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}incoterms/${IncotermId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(destroySuccess({ IncotermId }))
        //   history.push('/ports')
        dispatch(updateNotification('Incoterm eliminado correctamente', 'success'))
      } else {
        dispatch(destroyFailed(res, IncotermId))
        dispatch(updateNotification('Hubo un error al eliminar el Incoterm', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar el Incoterm', 'danger'))
      dispatch(destroyFailed(error, IncotermId))
    }
  }
}
