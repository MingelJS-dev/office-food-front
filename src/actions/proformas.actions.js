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

export const UPLOAD_FILE = '[Proformas] UPLOAD_FILE';
export function uploadFile() {
  return { type: UPLOAD_FILE }
}

export const GET_LINK_PDF = '[Proformas] GET_LINK_PDF';
export function getLinkPDF() {
  return { type: GET_LINK_PDF }
}

export const GET_FILE_PDF = '[Proformas] GET_FILE_PDF';
export function getFilePDF() {
  return { type: GET_FILE_PDF }
}

export const GET_FILE_PDF_SUCCESS = '[Proformas] GET_FILE_PDF_SUCCESS';
export function getFilePDFSuccess() {
  return { type: GET_FILE_PDF_SUCCESS }
}

export const GET_FILE_PDF_FAIL = '[Proformas] GET_FILE_PDF_FAIL';
export function getFilePDFFail() {
  return { type: GET_FILE_PDF_FAIL }
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

        data.mimeType = data.file ? data.file.type : null
      
        const res = await axios.post(window.config.API_URL + `proformas`,
          data,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 201 ){
          if(data.mimeType) {
            dispatch(uploadFilePDF(res.data.data, data.file))
          }
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

  export function uploadFilePDF(data, file) {
    return async function (dispatch, getState) {
      dispatch(uploadFile())
  
      try {
  
        const signedUrl = data.signedUrl
        const res = await axios.put(signedUrl, file);
        
        if (res.status === 200) {
          dispatch(createSuccess(data))
        } else {
          dispatch(updateNotification('Hubo un error al adjuntar pdf.', 'danger'))
        }
      } catch (err) {
        dispatch(updateNotification('Hubo un error al adjuntar pdf.', 'danger'))
        dispatch(createFailed(err))
      }
    }
  }

  export function destroyById(ProformaId) {
    return async function (dispatch, getState) {
      dispatch(destroy(ProformaId))
  
      try {
        const res = await axios.delete(
          `${window.config.API_URL}proformas/${ProformaId}`,
          {
            headers: getAuthHeaders(getState())
          }
        );
  
        if (res.status === 201) {
          dispatch(destroySuccess({ProformaId}))
          history.push('/proformas')
          dispatch(updateNotification('Proforma eliminado correctamente', 'success'))
        } else {
          dispatch(destroyFailed(res, ProformaId))
          dispatch(updateNotification('Hubo un error al eliminar el proforma', 'danger'))
        }
  
      } catch (error) {
        // console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar el proforma', 'danger'))
        dispatch(destroyFailed(error, ProformaId))
      }
    }
  }
  
  export function getLinkPDFAction(ProformaId){
 
    return async function(dispatch, getState){
      dispatch(getLinkPDF(ProformaId))
      try{
        const res = await axios.get(`${window.config.API_URL}proformas/${ProformaId}`,
          {
            headers: getAuthHeaders(getState())
          }
        );
         
        if( res.status === 201 ){
          dispatch(getFilePDFAction(res.data))
          // dispatch(updateNotification('Descarga completada.', 'success'))
        }else{
          dispatch(getFilePDFFail(res))
          dispatch(updateNotification('---', 'danger'))
        }
      }catch(error){
        dispatch(updateNotification('Hubo un error extraer PDF', 'danger'))
        dispatch(getFilePDFFail(error))
      }
    }
  }

  export function getFilePDFAction(data) {
    return async function (dispatch, getState) {
      dispatch(getFilePDF())
  
      try {
       
        const signedUrl = data.signedUrl
        const res = await axios.get(signedUrl);

        if (res.status === 200) {
          saveAs(res.config.url, 'Proforma_PDF.pdf')
          dispatch(getFilePDFSuccess())
        } else {
          dispatch(getFilePDFFail(res.data.message))
        }
      } catch (err) {
        dispatch(getFilePDFFail(err))
      }
    }
  }