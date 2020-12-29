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
        entities: action.recipients.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.recipients.map(x => x.id)
      }

    case RecipientActions.LOAD_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case RecipientActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.recipient.id]: {
            ...state.entities[action.recipient.id],
            ...action.recipient
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.recipient.id]: false
        }
      }

    case RecipientActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.RecipientId]: false
        }
      }

    case RecipientActions.CREATE_SUCCESS:
      // ids: action.users.map(x => x.id)
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.recipient.id]: {
            ...state.entities[action.recipient.id],
            ...action.recipient
          }
        },
        ids: [
          ...state.ids,
          action.recipient.id
        ],
        isLoading: false,

      }
    case RecipientActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case RecipientActions.DESTROY_SUCCESS:
      delete state.entities[action.recipient.RecipientId]
      delete state.ids[action.recipient.RecipientId]

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

export const getRecipientsEntities = state => state.recipients.entities
export const getRecipients = state => state.recipients.ids.map(id => state.recipients.entities[id])
export const getRecipientById = (state, ReciepientId) => state.recipients.entities[ReciepientId]


export const getIsLoading = state => state.recipients.isLoading


