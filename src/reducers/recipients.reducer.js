import * as RecipientActions from '../actions/recipients.actions.js'

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
    case RecipientActions.LOAD:
    case RecipientActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case RecipientActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case RecipientActions.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.reciepients.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.reciepients.map(x => x.id)
      }

    case RecipientActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.reciepient.id]: {
            ...state.entities[action.reciepient.id],
            ...action.reciepient
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.reciepient.id]: false
        }
      }

    case RecipientActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.ReciepientId]: false
        }
      }

    case RecipientActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.reciepient.id]: {
            ...state.entities[action.reciepient.id],
            ...action.reciepient
          }
        },
        ids: [
          ...state.ids,
          action.reciepient.id
        ],
        isLoading: false,

      }
    case RecipientActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case RecipientActions.DESTROY_SUCCESS:
      delete state.entities[action.reciepient.UserId]
      delete state.ids[action.reciepient.UserId]

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

export const getRecipientsEntities = state => state.reciepients.entities
export const getRecipients = state => state.reciepients.ids.map(id => state.reciepients.entities[id])
export const getRecipientById = (state, ReciepientId) => state.reciepients.entities[ReciepientId]


export const getIsLoading = state => state.reciepients.isLoading


