// @flow
/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

// middlewares.
import experienceService from '../middleware/experienceApi'

// reducers.
import makeRootReducer from '../reducers'

let storeInstance = null
let persistorInstance = null

export const init = async (request = null) => {
  const debug = process.env.NODE_ENV !== 'production'
  const middlewares = [thunk, experienceService]
  let updateRequest = request
  // client side persist configuration.
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
    ],
    debug: process.env.NODE_ENV !== 'production',
  }

  if (debug) {

    // redux logger for non-production builds.
    const logger = createLogger({ duration: true })
    middlewares.push(logger)
  }

  // create enhanced reducer.
  const reducers = makeRootReducer(updateRequest)
  const rootReducer = persistReducer(persistConfig, reducers())

  const composeEnhancers =
    // eslint-disable-next-line no-underscore-dangle
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  store.asyncReducers = {}
  storeInstance = store

  const persistPromise = new Promise(resolve => {
    // persist the store (enabling rehydration) and cache the persistor to control it in future.
    const persistor = persistStore(store, null, () => {
      store.getState()
      resolve(storeInstance)
    })

    persistorInstance = persistor
  })

  return persistPromise
}

export const getInstance = () => storeInstance
export const getPersistor = () => persistorInstance

export default { init, getInstance, getPersistor }
