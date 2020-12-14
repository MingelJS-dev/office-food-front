import * as BrandActions from '../actions/brands.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BrandActions.LOAD:
        case BrandActions.LOAD_FAILED:
            return {
                ...state,
                isLoading: true
            }

        case BrandActions.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.brands.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.brands.map(x => x.id)
            }

        default:
            return state;
    }
}

export const getBrandEntities = state => state.brands.entities
export const getBrands = state => {
    return state.brands.ids.map(id => state.brands.entities[id])
}
export const getBrandById = (state, BrandId) => state.brands.entities[BrandId]
export const getIsLoading = state => state.brands.isLoading
