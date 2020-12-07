import * as RolesActions from '../actions/roles.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {}
}

export default function auth(state = INITIAL_STATE, action){
  switch(action.type){
    case RolesActions.LOAD_ROLES:
      return {
        ...state,
        isLoading: true
      }


    case RolesActions.LOAD_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.roles.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.roles.map(x => x.id)
      }

      case RolesActions.LOAD_ROLES_FAILED:
        return {
          ...state,
          isLoading: false
        }



    default:
      return state;
  }
}

export const getRolesEntities = state => state.roles.entities
export const getRoles = state => Object.values(state.roles.entities)

export const getIsLoading = state => state.roles.isLoading


