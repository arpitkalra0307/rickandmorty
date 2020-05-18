// redux.
import { combineReducers } from 'redux'


import concertDetails from './concertDetails'

const makeRootReducer = (request?: { cookies: string, secure: boolean }) => (
  asyncReducers?: Object
) =>
  combineReducers({
    concertDetails,
    ...asyncReducers,
  })
export default makeRootReducer
