import * as CategoryActions from '../actions/categories.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {},
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CategoryActions.LOAD:
    case CategoryActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case CategoryActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case CategoryActions.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.categories.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.categories.map(x => x.id)
      }

    case CategoryActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.category.id]: {
            ...state.entities[action.category.id],
            ...action.category
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.category.id]: false
        }
      }

    case CategoryActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.CategoryId]: false
        }
      }

    case CategoryActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.category.id]: {
            ...state.entities[action.category.id],
            ...action.category
          }
        },
        ids: [
          ...state.ids,
          action.category.id
        ],
        isLoading: false,

      }
    case CategoryActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case CategoryActions.DESTROY_SUCCESS:
      // let entities = Object.keys(state.entities).filter(x => x !== action.category.id)

      //   state.entities = state.entities[entities.map(x => x)]

   
      // let entities = Object.keys(state.entities)
      // delete state.entities[action.category.CategoryId]
      // delete state.ids[action.category.CategoryId]

      state.ids = state.ids.filter(x => x !== action.category.CategoryId)

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

export const getCategoryEntities = state => state.categories.entities
export const getCategories = state => {
  return state.categories.ids.map(id =>  state.categories.entities[id])
}
export const getCategoryById = (state, CategoryId) => state.categories.entities[CategoryId]
export const getIsLoading = state => state.categories.isLoading

export const getCategoryN5s = state => {
  const categories = getCategories(state).filter(x => { 
    return x && x.level === 1 })
  return categories
}