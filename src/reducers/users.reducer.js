import * as UsersActions from '../actions/users.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {},
  roles: [],
  pagination: {
    page: 1,
    limit: 50,
    totalItems: 0,
    totalPages: 0
  }
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UsersActions.LOAD_USERS:
    case UsersActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case UsersActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case UsersActions.LOAD_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.users.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.users.map(x => x.id)
      }

    case UsersActions.UPDATE_ONE_SUCCESS:
      console.log(action)
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.user.id]: {
            ...state.entities[action.user.id],
            ...action.user
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.user.id]: false
        }
      }

    case UsersActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.UserId]: false
        }
      }

    case UsersActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.user.id]: {
            ...state.entities[action.user.id],
            ...action.user
          }
        },
        ids: [
          ...state.ids,
          action.user.id
        ],
        isLoading: false,

      }
    case UsersActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case UsersActions.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: parseInt(action.headers['x-page']),
          limit: parseInt(action.headers['x-limit']),
          totalItems: parseInt(action.headers['x-total-items']),
          totalPages: parseInt(action.headers['x-total-pages'])
        }
      }

    case UsersActions.DELETE_SUCCESS:
      delete state.entities[action.user.UserId]
      delete state.ids[action.user.UserId]

      return {
        ...state,
        entities: {
          ...state.entities
        },
        ids: [
          ...state.ids,
          // action.user.id
        ],
      }

    default:
      return state;
  }
}

export const getUsersEntities = state => state.users.entities
export const getUsers = state => state.users.ids.map(id => state.users.entities[id])
export const getUserById = (state, UserId) => state.users.entities[UserId]
export const getPagination = state => state.users.pagination
export const getRoles = state => state.users.roles

export const getIsLoading = state => state.users.isLoading
export const getIsLoadingById = (state, UserId) => {
  if (UserId === undefined) {
    return false
  }

  return state.users.loadingById[UserId]
}

