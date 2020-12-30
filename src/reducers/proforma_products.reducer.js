import * as ProformaProductActions from '../actions/proforma_product.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},
    exporting: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ProformaProductActions.LOAD:
        case ProformaProductActions.CREATE:
            return {
                ...state,
                isLoading: true
            }

        case ProformaProductActions.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.articles.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.articles.map(x => x.id)
            }

        case ProformaProductActions.UPDATE_ONE:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.data.id]: true
                }
            }

        case ProformaProductActions.UPDATE_ONE_SUCCESS:
            return {
                ...state,
                //isLoading: false,
                entities: {
                    ...state.entities,
                    [action.article.id]: {
                        ...state.entities[action.article.id],
                        ...action.article
                    }
                },
                loadingById: {
                    ...state.loadingById,
                    [action.article.id]: false
                }
            }

        case ProformaProductActions.UPDATE_ONE_FAILED:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.ArticleId]: false
                }
            }

        case ProformaProductActions.CREATE_SUCCESS:
            return {
                ...state,
                // entities: {
                //     ...state.entities,
                //     [action.article.id]: {
                //         ...state.entities[action.article.id],
                //         ...action.article
                //     }
                // },
                // ids: [
                //     ...state.ids,
                //     action.article.id
                // ],
                isLoading: false,

            }
        case ProformaProductActions.CREATE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case ProformaProductActions.DESTROY_SUCCESS:
            state.ids = state.ids.filter(x => x !== action.article.ArticleId)

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

            case ProformaProductActions.EXPORT:
                return {
                    ...state,
                    isLoading: true
                }
    
            case ProformaProductActions.EXPORT_SUCCESS:
            case ProformaProductActions.EXPORT_FAILED:
                return {
                    ...state,
                    exporting: false
                }

        default:
            return state;
    }
}

export const getArticleEntities = state => state.articles.entities
export const getArticles = state => state.articles.ids.map(id => state.articles.entities[id])
export const getArticleById = (state, ArticleId) => state.articles.entities[ArticleId]

export const getIsLoading = state => state.articles.isLoading
export const getIsExporting = state => state.articles.exporting


