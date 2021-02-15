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
import ports from './ports.reducer.js'
import destinations from './destinations.reducer.js'
import proformas from './proformas.reducer.js'
import recipients from './recipients.reducer.js'
import incoterms from './incoterms.reducer.js'
import containers from './containers.reducer.js'
import articles from './proforma_products.reducer.js'
import files from './files.reducer.js'

const reducers = combineReducers({
  auth,
  users,
  roles,
  notifications,
  countries,
  categories,
  providers,
  products,
  brands,
  ports,
  destinations,
  proformas,
  recipients,
  incoterms,
  containers,
  articles,
  files
});

export default reducers;