import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const EXPORT = '[Articles] LOAD';
export function exportArticles() {
    return { type: EXPORT }
}

export const EXPORT_SUCCESS = '[Articles] LOAD_SUCCESS';
export function exportSuccess(file) {
    return { type: EXPORT_SUCCESS, file }
}

export const EXPORT_FAILED = '[Articles] LOAD_FAILED';
export function exportFailed(error) {
    return { type: EXPORT_FAILED, error }
}

export const LOAD = '[Articles] LOAD';
export function load() {
    return { type: LOAD }
}

export const LOAD_SUCCESS = '[Articles] LOAD_SUCCESS';
export function loadSuccess(articles) {
    return { type: LOAD_SUCCESS, articles }
}

export const LOAD_FAILED = '[Articles] LOAD_FAILED';
export function loadFailed(error) {
    return { type: LOAD_FAILED, error }
}

export const UPDATE_ONE = '[Articles] UPDATE_ONE';
export function updateOne(data) {
    return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Articles] UPDATE_ONE_FAILED';
export function updateOneFailed(error, ArticleId) {
    return { type: UPDATE_ONE_FAILED, error, ArticleId }
}

export const UPDATE_ONE_SUCCESS = '[Articles] UPDATE_ONE_SUCCESS';
export function updateOneSucess(article) {
    return { type: UPDATE_ONE_SUCCESS, article }
}


export const CREATE = '[Articles] CREATE';
export function create(data) {
    return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Articles] CREATE_SUCCESS';
export function createSuccess(articles) {
    return { type: CREATE_SUCCESS, articles }
}

export const CREATE_FAILED = '[Articles] CREATE_FAILED';
export function createFailed(error) {
    return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Articles] DESTROY';
export function destroy(data) {
    return { type: DESTROY, data }
}

export const DESTROY_SUCCESS = '[Articles] DESTROY_SUCCESS';
export function destroySuccess(article) {
    return { type: DESTROY_SUCCESS, article }
}

export const DESTROY_FAILED = '[Articles] DESTROY_FAILED';
export function destroyFailed(error) {
    return { type: DESTROY_FAILED, error }
}


export function fetchAll() {
    return async function (dispatch, getState) {
        dispatch(load())

        try {
            let url = `${window.config.API_URL}articles`

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

export function fetchAllByProformaId(ProformaId) {
    return async function (dispatch, getState) {
        dispatch(load())

        try {
            let url = `${window.config.API_URL}articles/${ProformaId}/products`

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
            const res = await axios.put(`${window.config.API_URL}articles/${data.id}`,
                data,
                {
                    headers: getAuthHeaders(getState())
                }
            );

            if (res.status === 201) {
                dispatch(updateOneSucess(res.data.data))
                dispatch(updateNotification('Artículo actualizado correctamente', 'success'))
            } else {
                dispatch(updateOneFailed(res, data.id))
                dispatch(updateNotification('Hubo un error al actualizar el Artículo', 'danger'))
            }

        } catch (error) {
            console.log('error:', error)
            dispatch(updateNotification('Hubo un error al actualizar el Artículo', 'danger'))
            dispatch(updateOneFailed(error, data.id))
        }
    }
}

export function createArticle(data) {
    return async function (dispatch, getState) {
        dispatch(create(data))
        try {
            const path = `/proformas/${data[0].ProformaId}/articles`
            const res = await axios.post(window.config.API_URL + `articles`,
                data,
                {
                    headers: getAuthHeaders(getState())
                }
            );

            if (res.status === 201) {
                dispatch(createSuccess(res.data.data))
                  history.push(path)
                dispatch(updateNotification('Artículo creado correctamente', 'success'))
            } else {
                dispatch(createFailed(res))
                dispatch(updateNotification('Hubo un error al crear el Artículo', 'danger'))
            }
        } catch (error) {
            console.log('error:', error)
            dispatch(updateNotification('Hubo un error al crear el Artículo', 'danger'))
            dispatch(createFailed(error))
        }
    }
}

export function destroyById(ArticleId) {
    return async function (dispatch, getState) {
        dispatch(destroy(ArticleId))

        try {
            const res = await axios.delete(
                `${window.config.API_URL}articles/${ArticleId}`,
                {
                    headers: getAuthHeaders(getState())
                }
            );

            if (res.status === 201) {
                dispatch(destroySuccess({ ArticleId }))
                //   history.push('/ports')
                dispatch(updateNotification('Artículo eliminado correctamente', 'success'))
            } else {
                dispatch(destroyFailed(res, ArticleId))
                dispatch(updateNotification('Hubo un error al eliminar el Artículo', 'danger'))
            }

        } catch (error) {
            console.log('error:', error)
            dispatch(updateNotification('Hubo un error al eliminar el Artículo', 'danger'))
            dispatch(destroyFailed(error, ArticleId))
        }
    }
}
