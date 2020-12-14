import * as ProviderActions from '../actions/provider.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {},
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ProviderActions.LOAD:
    case ProviderActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case ProviderActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case ProviderActions.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.providers.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.providers.map(x => x.id)
      }

    case ProviderActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.provider.id]: {
            ...state.entities[action.provider.id],
            ...action.provider
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.provider.id]: false
        }
      }

    case ProviderActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.ProviderId]: false
        }
      }

    case ProviderActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.provider.id]: {
            ...state.entities[action.provider.id],
            ...action.provider
          }
        },
        ids: [
          ...state.ids,
          action.provider.id
        ],
        isLoading: false,

      }
    case ProviderActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case ProviderActions.DESTROY_SUCCESS:
      // let entities = Object.keys(state.entities).filter(x => x !== action.category.id)

      //   state.entities = state.entities[entities.map(x => x)]

   
      // let entities = Object.keys(state.entities)
      // delete state.entities[action.category.CategoryId]
      // delete state.ids[action.category.CategoryId]

      state.ids = state.ids.filter(x => x !== action.provider.ProviderId)

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

export const getProviderEntities = state => state.providers.entities
export const getProviders = state => {
  return state.providers.ids.map(id =>  state.providers.entities[id])
}
export const getById = (state, ProviderId) => state.providers.entities[ProviderId]
export const getIsLoading = state => state.providers.isLoading
