import * as IncotermActions from '../actions/incoterms.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {},
  pagination: {
    page: 1,
    limit: 50,
    totalItems: 0,
    totalPages: 0
  }
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IncotermActions.LOAD:
    case IncotermActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case IncotermActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case IncotermActions.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.incoterms.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.incoterms.map(x => x.id)
      }

    case IncotermActions.LOAD_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case IncotermActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.incoterm.id]: {
            ...state.entities[action.incoterm.id],
            ...action.incoterm
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.incoterm.id]: false
        }
      }

    case IncotermActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.IncotermId]: false
        }
      }

    case IncotermActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.incoterm.id]: {
            ...state.entities[action.incoterm.id],
            ...action.incoterm
          }
        },
        ids: [
          ...state.ids,
          action.incoterm.id
        ],
        isLoading: false,

      }
    case IncotermActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case IncotermActions.DESTROY_SUCCESS:
      delete state.entities[action.incoterm.IncotermId]
      delete state.ids[action.incoterm.IncotermId]

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

export const getIncotermsEntities = state => state.incoterms.entities
export const getIncoterms = state => state.incoterms.ids.map(id => state.incoterms.entities[id])
export const getIncotermById = (state, IncotermId) => state.incoterms.entities[IncotermId]


export const getIsLoading = state => state.incoterms.isLoading


