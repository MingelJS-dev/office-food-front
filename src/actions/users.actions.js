import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'

import { updateNotification } from './notifications.actions.js'

export const LOAD_USERS = '[Users] LOAD_USERS';
export function loadUsers(){
  return { type: LOAD_USERS }
}

export const LOAD_USERS_SUCCESS = '[Users] LOAD_USERS_SUCCESS';
export function loadUsersSuccess(users){
  return { type: LOAD_USERS_SUCCESS, users }
}

export const LOAD_USERS_FAILED = '[Users] LOAD_USERS_FAILED';
export function loadUsersFailed(error){
  return { type: LOAD_USERS_FAILED, error }
}

export const LOAD_CURRENT_USER = '[Users] LOAD_CURRENT_USER';
export function loadCurrentUser(){
  return { type: LOAD_CURRENT_USER }
}

export const LOAD_CURRENT_USER_FAILED = '[Users] LOAD_CURRENT_USER_FAILED';
export function loadCurrentUserFailed(){
  return { type: LOAD_CURRENT_USER_FAILED }
}

export const LOAD_CURRENT_USER_SUCCESS = '[Users] LOAD_CURRENT_USER_SUCCESS';
export function loadCurrentUserSuccess(user){
  return { type: LOAD_CURRENT_USER_SUCCESS, user }
}

export const UPDATE_ONE = '[Users] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Users] UPDATE_ONE_FAILED';
export function updateOneFailed(error, UserId){
  return { type: UPDATE_ONE_FAILED, error, UserId }
}

export const UPDATE_ONE_SUCCESS = '[Users] UPDATE_ONE_SUCCESS';
export function updateOneSucess(user){
  return { type: UPDATE_ONE_SUCCESS, user }
}


export const CREATE = '[Users] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Users] CREATE_SUCCESS';
export function createSuccess(user){
  return { type: CREATE_SUCCESS, user }
}

export const CREATE_FAILED = '[Users] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DELETE = '[Users] DELETE';
export function deleteUser(data){
  return { type: DELETE, data }
}

export const DELETE_SUCCESS = '[Users] DELETE_SUCCESS';
export function deleteSuccess(user){
  return { type: DELETE_SUCCESS, user }
}

export const DELETE_FAILED = '[Users] DELETE_FAILED';
export function deleteFailed(error){
  return { type: DELETE_SUCCESS, error }
}


export const [ UPDATE_PAGINATION, updatePagination ] = createAction('[Users] UPDATE_PAGINATION', ['headers'])

export function fetchUsers(filters = {}){
  return async function(dispatch, getState){
    dispatch(loadUsers())

    try{
      let url = `${window.config.API_URL}users`

      // if( Object.keys(filters).length ){
        // url += '?' + toQueryString({page: 1})
      // }

      const res = await axios.get(url, {
        headers: getAuthHeaders(getState())
      });

      if(res.status === 201){
        dispatch(updatePagination(res.headers)) 
        dispatch(loadUsersSuccess(res.data.data))
      }else{
        dispatch(loadUsersFailed(res.statusText))
      }
    }catch(err){
      dispatch(loadUsersFailed(err))
    }
  }
}

export function fetchCurrentUser(){
  return async function(dispatch, getState){
    dispatch(loadCurrentUser());

    try{
      const res = await axios.get(window.config.API_URL + 'users/me', {
        headers: getAuthHeaders(getState())
      });

      if( res.status === 200 ){
        dispatch(loadCurrentUserSuccess(res.data.result))
      }else{
        dispatch(loadCurrentUserFailed(res))
      }

    }catch(err){
      console.log(err)
      dispatch(loadCurrentUserFailed(err))
    }

  }
}

export function updateUserById(data){
  return async function(dispatch, getState){
    dispatch(updateOne(data))

    try{
      const res = await axios.put( `${window.config.API_URL}users/${data.id}`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(updateOneSucess(res.data.data))
        dispatch(updateNotification('Usuario actualizado correctamente', 'success'))
      }else{
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar el usuario', 'danger'))
      }

    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar el usuario', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createUser(data){
  return async function(dispatch, getState){
    dispatch(create(data))
    try{
      const res = await axios.post(window.config.API_URL + `users`,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 201 ){
        dispatch(createSuccess(res.data.data))
        // history.push('/users')
        dispatch(updateNotification('Usuario creado correctamente', 'success'))
      }else{
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear el usuario', 'danger'))
      }
    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear el usuario', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function updateUserStatus(UserId, status){
  return async function(dispatch, getState){
    dispatch(updateOne({ id: UserId }))

    try{
      const res = await axios.post(window.config.API_URL + `users/${UserId}/${status}`,
        {},
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 200 ){
        dispatch(updateOneSucess(res.data.result))
        dispatch(updateNotification('Usuario actualizado!', 'success'))
      }else{
        dispatch(updateOneFailed(res))
      }
    }catch(error){
      dispatch(updateOneFailed(error))
    }
  }
}

export function destroyUserById(UserId) {
  return async function (dispatch, getState) {
    dispatch(deleteUser(UserId))

    try {
      const res = await axios.delete(
        `${window.config.API_URL}users/${UserId}`,
        // window.config.API_URL + 'users/?id=' + UserId,
        // {
        //   params: {
        //     id: UserId
        //   }
        // },
        {
          headers: getAuthHeaders(getState())
        }
      );

      if (res.status === 201) {
        dispatch(deleteSuccess({UserId}))
        // history.push('/products')
        dispatch(updateNotification('Usuario eliminado correctamente', 'success'))
      } else {
        dispatch(deleteFailed(res, UserId))
        dispatch(updateNotification('Hubo un error al eliminar el usuario', 'danger'))
      }

    } catch (error) {
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al eliminar el usuario', 'danger'))
      dispatch(deleteFailed(error, UserId))
    }
  }
}


