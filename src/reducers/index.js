import { combineReducers } from 'redux'
import auth from './auth.reducer.js'
import users from './users.reducer.js'
import roles from './roles.reducer.js'
import notifications from './notifications.reducer.js'


const reducers = combineReducers({
  auth,
  users,
  roles,
  notifications
});

export default reducers;