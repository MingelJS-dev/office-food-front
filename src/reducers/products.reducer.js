import * as ProductActions from '../actions/product.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {},
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ProductActions.LOAD:
    case ProductActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case ProductActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case ProductActions.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.products.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.products.map(x => x.id)
      }

    case ProductActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.product.id]: {
            ...state.entities[action.product.id],
            ...action.product
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.product.id]: false
        }
      }

    case ProductActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.ProductId]: false
        }
      }

    case ProductActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.product.id]: {
            ...state.entities[action.product.id],
            ...action.product
          }
        },
        ids: [
          ...state.ids,
          action.product.id
        ],
        isLoading: false,

      }
    case ProductActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case ProductActions.DESTROY_SUCCESS:
      // let entities = Object.keys(state.entities).filter(x => x !== action.category.id)

      //   state.entities = state.entities[entities.map(x => x)]

   
      // let entities = Object.keys(state.entities)
      // delete state.entities[action.category.CategoryId]
      // delete state.ids[action.category.CategoryId]

      state.ids = state.ids.filter(x => x !== action.product.ProductId)

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

export const getProductEntities = state => state.products.entities
export const getProducts = state => {
  return state.products.ids.map(id =>  state.products.entities[id])
}
export const getById = (state, ProductId) => state.products.entities[ProductId]
export const getIsLoading = state => state.products.isLoading
