import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'
import { saveAs } from 'file-saver';

import { updateNotification } from './notifications.actions.js'

export const EXPORT_TEMPLATE = '[Files] EXPORT_TEMPLATE';
export function exportPorts() {
  return { type: EXPORT_TEMPLATE }
}

export const EXPORT_TEMPLATE_SUCCESS = '[Files] EXPORT_TEMPLATE_SUCCESS';
export function exportSuccess(file) {
  return { type: EXPORT_TEMPLATE_SUCCESS, file }
}

export const EXPORT_TEMPLATE_FAILED = '[Files] EXPORT_TEMPLATE_FAILED';
export function exportFailed(error) {
  return { type: EXPORT_TEMPLATE_FAILED, error }
}

export const GET_UPLOAD_LINK = '[Files] GET_UPLOAD_LINK';
export function getUploadLink() {
  return { type: GET_UPLOAD_LINK }
}

export const GET_UPLOAD_LINK_FAIL = '[Files] GET_UPLOAD_LINK_FAIL';
export function getUploadLinkFail(error) {
  return { type: GET_UPLOAD_LINK, error }
}

export const UPLOAD_FILE = '[Files] UPLOAD_FILE';
export function uploadFile() {
  return { type: UPLOAD_FILE }
}

export const UPLOAD_FILE_DATA = "[Files] UPLOAD_FILE_DATA";
export function uploadFileData() {
  return { type: UPLOAD_FILE_DATA }
}

export const UPLOAD_FILE_SUCCESS = '[Files] UPLOAD_FILE_SUCCESS';
export function uploadFileSuccess() {
  return { type: UPLOAD_FILE_SUCCESS }
}

export const UPLOAD_FILE_FAIL = '[Files] UPLOAD_FILE_FAIL';
export function uploadFileFail(error) {
  return { type: UPLOAD_FILE_FAIL, error }
}

export function exportMassiveTemplate(data) {
  return async function (dispatch, getState) {
    dispatch(exportPorts())

    try {
      let url = `${window.config.API_URL}files/export?CategoryId=${data.CategoryId}`

      const res = await axios.get(url,
        {
          headers: getAuthHeaders(getState())
        });

      if (res.status === 200) {
        saveAs(res.config.url, 'Template_Masivo_Proformas')
        dispatch(exportSuccess(res.data.data))
      } else {
        dispatch(exportFailed(res.data.message))
      }
    } catch (err) {
      dispatch(exportFailed(err))
    }
  }
}

export function getUploadLinkAction(file, UserId) {
  return async function (dispatch, getState) {
    dispatch(getUploadLink())

    try {
      let mimeType = file.type;
      let url = `${window.config.API_URL}files/upload_massive`

      const res = await axios.post(url,
        {
          mimeType,
          UserId
        }
        ,
        {
          headers: getAuthHeaders(getState())
        });

      if (res.status === 201) {
        dispatch(uploadFileAction(res.data, file))
      } else {
        dispatch(getUploadLinkFail(res.data.message))
      }
    } catch (err) {
      dispatch(getUploadLinkFail(err))
    }
  }
}

export function uploadFileAction(data, file) {
  return async function (dispatch, getState) {
    dispatch(uploadFile())

    try {

      const signedUrl = data.signedUrl
      const res = await axios.put(signedUrl, file);

      if (res.status === 200) {
        dispatch(uploadFileDataAction(data.id))
      } else {
        dispatch(uploadFileFail(res.data.message))
      }
    } catch (err) {
      dispatch(uploadFileFail(err))
    }
  }
}

export function uploadFileDataAction(FileId) {
  return async function (dispatch, getState) {
    dispatch(uploadFileData())

    try {

      const res = await axios.put(`${window.config.API_URL}files/upload_massive/${FileId}`,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(uploadFileSuccess(res.data.data))
      } else {
        dispatch(uploadFileFail(res.data.message))
      }
    } catch (err) {
      dispatch(uploadFileFail(err))
    }
  }
}