import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  form: reduxFormReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store