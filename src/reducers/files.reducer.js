import * as FileActions from '../actions/files.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},
    exporting: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
            case FileActions.EXPORT_TEMPLATE:
                return {
                    ...state,
                    isLoading: true
                }
    
            case FileActions.EXPORT_TEMPLATE_SUCCESS:
            case FileActions.EXPORT_TEMPLATE_FAILED:
                return {
                    ...state,
                    isLoading: false
                }

        default:
            return state;
    }
}

export const getIsLoading = state => state.files.isLoading



