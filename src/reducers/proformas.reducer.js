import * as ProformaActions from '../actions/proformas.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},
    exporting: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ProformaActions.LOAD:
        case ProformaActions.CREATE:
            return {
                ...state,
                isLoading: true
            }

        case ProformaActions.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.proformas.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.proformas.map(x => x.id)
            }

        case ProformaActions.UPDATE_ONE:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.data.id]: true
                }
            }

        case ProformaActions.UPDATE_ONE_SUCCESS:
            return {
                ...state,
                //isLoading: false,
                entities: {
                    ...state.entities,
                    [action.proforma.id]: {
                        ...state.entities[action.proforma.id],
                        ...action.proforma
                    }
                },
                loadingById: {
                    ...state.loadingById,
                    [action.proforma.id]: false
                }
            }

        case ProformaActions.UPDATE_ONE_FAILED:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.ProformaId]: false
                }
            }

        case ProformaActions.CREATE_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.proforma.id]: {
                        ...state.entities[action.proforma.id],
                        ...action.proforma
                    }
                },
                ids: [
                    ...state.ids,
                    action.proforma.id
                ],
                isLoading: false,

            }
        case ProformaActions.CREATE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case ProformaActions.DESTROY_SUCCESS:
            state.ids = state.ids.filter(x => x !== action.proforma.ProformaId)

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

            case ProformaActions.EXPORT:
                return {
                    ...state,
                    isLoading: true
                }
    
            case ProformaActions.EXPORT_SUCCESS:
            case ProformaActions.EXPORT_FAILED:
                return {
                    ...state,
                    exporting: false
                }

        default:
            return state;
    }
}

export const getProformaEntities = state => state.proformas.entities
export const getProformas = state => state.proformas.ids.map(id => state.proformas.entities[id])
export const getProformaById = (state, ProformaId) => state.ports.entities[ProformaId]

export const getIsLoading = state => state.proformas.isLoading
export const getIsExporting = state => state.proformas.exporting


