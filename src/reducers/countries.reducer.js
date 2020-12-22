import * as CountryActions from '../actions/countries.actions.js'

const INITIAL_STATE = {
  entities: {},
  ids: [],
  isLoading: false,
  loadingById: {},
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CountryActions.LOAD_COUNTRIES:
      return {
        ...state,
        isLoading: true
      }

    case CountryActions.LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.countries.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
        ids: action.countries.map(x => x.id)
      }

    default:
      return state;
  }
}

export const getCountryEntities = state => state.countries.entities
export const getCountries = state => state.countries.ids.map(id => state.countries.entities[id])
export const getCountryById = (state, CountryId) => state.countries.entities[CountryId]

export const getIsLoading = state => state.countries.isLoading

export const getFeaturedCountries = state => {
  const countries = getCountries(state).filter(x => x.featured)

  return countries;
}


