import * as PortActions from '../actions/ports.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},
    exporting: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PortActions.LOAD:
        case PortActions.CREATE:
            return {
                ...state,
                isLoading: true
            }

        case PortActions.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.ports.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.ports.map(x => x.id)
            }

        case PortActions.UPDATE_ONE:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.data.id]: true
                }
            }

        case PortActions.UPDATE_ONE_SUCCESS:
            return {
                ...state,
                //isLoading: false,
                entities: {
                    ...state.entities,
                    [action.port.id]: {
                        ...state.entities[action.port.id],
                        ...action.port
                    }
                },
                loadingById: {
                    ...state.loadingById,
                    [action.port.id]: false
                }
            }

        case PortActions.UPDATE_ONE_FAILED:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.PortId]: false
                }
            }

        case PortActions.CREATE_SUCCESS:
            // ids: action.users.map(x => x.id)
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.port.id]: {
                        ...state.entities[action.port.id],
                        ...action.port
                    }
                },
                ids: [
                    ...state.ids,
                    action.port.id
                ],
                isLoading: false,

            }
        case PortActions.CREATE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case PortActions.DESTROY_SUCCESS:
            state.ids = state.ids.filter(x => x !== action.port.PortId)

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

            case PortActions.EXPORT:
                return {
                    ...state,
                    isLoading: true
                }
    
            case PortActions.EXPORT_SUCCESS:
            case PortActions.EXPORT_FAILED:
                return {
                    ...state,
                    exporting: false
                }

        default:
            return state;
    }
}

export const getPortEntities = state => state.ports.entities
export const getPorts = state => state.ports.ids.map(id => state.ports.entities[id])
export const getPortById = (state, PortId) => state.ports.entities[PortId]

export const getIsLoading = state => state.ports.isLoading
export const getIsExporting = state => state.ports.exporting


