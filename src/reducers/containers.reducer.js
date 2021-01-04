import * as ContainerActions from '../actions/containers.actions.js'

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
    case ContainerActions.LOAD:
    case ContainerActions.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case ContainerActions.UPDATE_ONE:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.data.id]: true
        }
      }

    case ContainerActions.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.containers.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.containers.map(x => x.id)
      }

    case ContainerActions.LOAD_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case ContainerActions.UPDATE_ONE_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        entities: {
          ...state.entities,
          [action.container.id]: {
            ...state.entities[action.container.id],
            ...action.container
          }
        },
        loadingById: {
          ...state.loadingById,
          [action.container.id]: false
        }
      }

    case ContainerActions.UPDATE_ONE_FAILED:
      return {
        ...state,
        loadingById: {
          ...state.loadingById,
          [action.ContainerId]: false
        }
      }

    case ContainerActions.CREATE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.container.id]: {
            ...state.entities[action.container.id],
            ...action.container
          }
        },
        ids: [
          ...state.ids,
          action.container.id
        ],
        isLoading: false,

      }
    case ContainerActions.CREATE_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case ContainerActions.DESTROY_SUCCESS:
      delete state.entities[action.container.ContainerId]
      delete state.ids[action.container.ContainerId]

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

export const getContainersEntities = state => state.containers.entities
export const getContainers = state => state.containers.ids.map(id => state.containers.entities[id])
export const getContainerById = (state, ContainerId) => state.containers.entities[ContainerId]


export const getIsLoading = state => state.containers.isLoading


