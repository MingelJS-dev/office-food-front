import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const LOAD = '[Containers] LOAD';
export function load() {
  return { type: LOAD }
}

export const LOAD_SUCCESS = '[Containers] LOAD_SUCCESS';
export function loadSuccess(containers) {
  return { type: LOAD_SUCCESS, containers }
}

export const LOAD_FAILED = '[Containers] LOAD_FAILED';
export function loadFailed(error) {
  return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Containers] UPDATE_ONE';
export function updateOne(data) {
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Containers] UPDATE_ONE_FAILED';
export function updateOneFailed(error, ContainerId) {
  return { type: UPDATE_ONE_FAILED, error, ContainerId }
}

export const UPDATE_ONE_SUCCESS = '[Containers] UPDATE_ONE_SUCCESS';
export function updateOneSucess(container) {
  return { type: UPDATE_ONE_SUCCESS, container }
}


export const CREATE = '[Containers] CREATE';
export function create(data) {
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Containers] CREATE_SUCCESS';
export function createSuccess(container) {
  return { type: CREATE_SUCCESS, container }
}

export const CREATE_FAILED = '[Containers] CREATE_FAILED';
export function createFailed(error) {
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Containers] DESTROY';
export function destroy(data) {
  return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Containers] DESTROY_SUCCESS';
export function destroySuccess(container) {
  return { type: DESTROY_SUCCESS, container }
}

export const DESTROY_FAILED = '[Containers] DESTROY_FAILED';
export function destroyFailed(error) {
  return { type: DESTROY_FAILED, error }
}

export function fetchAll() {
  return async function (dispatch, getState) {
    dispatch(load())

    try {
      let url = `${window.config.API_URL}containers`

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
      const res = await axios.put(`${window.config.API_URL}containers/${data.id}`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(updateOneSucess(res.data.data))
        dispatch(updateNotification('Contenedor actualizado correctamente', 'success'))
      } else {
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar el Contenedor', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar el Contenedor', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createContainer(data) {
  return async function (dispatch, getState) {
    dispatch(create(data))
    try {
      const res = await axios.post(window.config.API_URL + `containers`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(createSuccess(res.data.data))
        //   history.push('/recipients')
        dispatch(updateNotification('Contenedor creado correctamente', 'success'))
      } else {
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear el Contenedor', 'danger'))
      }
    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear el Contenedor', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function destroyById(ContainerId) {
  return async function (dispatch, getState) {
    dispatch(destroy(ContainerId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}containers/${ContainerId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(destroySuccess({ ContainerId }))
        //   history.push('/ports')
        dispatch(updateNotification('Contenedor eliminado correctamente', 'success'))
      } else {
        dispatch(destroyFailed(res, ContainerId))
        dispatch(updateNotification('Hubo un error al eliminar el Contenedor', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar el Contenedor', 'danger'))
      dispatch(destroyFailed(error, ContainerId))
    }
  }
}
