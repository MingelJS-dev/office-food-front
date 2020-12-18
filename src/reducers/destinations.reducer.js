import * as DestinationActions from '../actions/destinations.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},
    exporting: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DestinationActions.LOAD:
        case DestinationActions.CREATE:
            return {
                ...state,
                isLoading: true
            }

        case DestinationActions.UPDATE_ONE:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.data.id]: true
                }
            }

        case DestinationActions.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.destinations.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.destinations.map(x => x.id)
            }

        case DestinationActions.UPDATE_ONE_SUCCESS:
            return {
                ...state,
                //isLoading: false,
                entities: {
                    ...state.entities,
                    [action.destination.id]: {
                        ...state.entities[action.destination.id],
                        ...action.destination
                    }
                },
                loadingById: {
                    ...state.loadingById,
                    [action.destination.id]: false
                }
            }

        case DestinationActions.UPDATE_ONE_FAILED:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.DestinationId]: false
                }
            }

        case DestinationActions.CREATE_SUCCESS:
            // ids: action.users.map(x => x.id)
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.destination.id]: {
                        ...state.entities[action.destination.id],
                        ...action.destination
                    }
                },
                ids: [
                    ...state.ids,
                    action.destination.id
                ],
                isLoading: false,

            }
        case DestinationActions.CREATE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case DestinationActions.DESTROY_SUCCESS:
            state.ids = state.ids.filter(x => x !== action.destination.ProviderId)

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

        case DestinationActions.EXPORT:
            return {
                ...state,
                isLoading: true
            }

        case DestinationActions.EXPORT_SUCCESS:
        case DestinationActions.EXPORT_FAILED:
            return {
                ...state,
                exporting: false
            }
        default:
            return state;
    }
}

export const getDestinationEntities = state => state.destinations.entities
export const getDestinations = state => state.destinations.ids.map(id => state.destinations.entities[id])
export const getDestinationById = (state, DestinationId) => state.destinations.entities[DestinationId]

export const getIsLoading = state => state.destinations.isLoading
export const getIsExporting = state => state.destinations.exporting


