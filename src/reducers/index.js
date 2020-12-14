import { combineReducers } from 'redux'
import auth from './auth.reducer.js'
import users from './users.reducer.js'
import roles from './roles.reducer.js'
import notifications from './notifications.reducer.js'
import countries from './countries.reducer.js'
import categories from './categories.reducer.js'
import providers from './providers.reducer.js'
import products from './products.reducer.js'
import brands from './brands.reducer.js'

const reducers = combineReducers({
  auth,
  users,
  roles,
  notifications,
  countries,
  categories,
  providers,
  products,
  brands
});

export default reducers;