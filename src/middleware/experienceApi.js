import {
  makeActions,
  makeRequestObj,
  makeQueryString,
  TYPE,
  isValidResponse,
  networkLog,
  makeRequestHeaders,
} from '../utils/middlewareUtils'

const isValidRequest = (action: { route: string}): boolean =>
  typeof action === 'object' && action.route

const apiService = (store: { getState: Function }) => (next: Function): Object => (action: {
  additionalHeaders?: Object,
  errorPayload?: Object,
  name: string,
  query?: Object,
  route: string,
  type: string,
  verb?: string,
  metaData?: Object,
}): Object => {
  // validate if the action needs to be captured by this middleware, otherwise pass to next().
  if (!isValidRequest(action)) return next(action)
  const {
    name,
    route,
    verb,
    query,
    additionalHeaders = {},
    errorPayload = {},
    queuedAction,
  } = action

  const queryString = query ? makeQueryString(query) : ''
  const { success, failure, error, init } = name ? makeActions(name) : TYPE

  const { dispatch } = store

  try {
    new Promise(resolve => {
      resolve()
    })
      .then(() => {
        // pass additional headers along to create the request object.
        return makeRequestHeaders(
          'application/json',
          additionalHeaders,
        )
      })
      // assemble complete headers.
      .then(headers => makeRequestObj(action, headers, true))
      // make the api call.
      .then(request => {
        next({
          type: init,
          payload: request,
        })

        return fetch(`${route}${queryString}`, request)
      })
      // process the response from the api into our standard format.
      .then(response =>
        response.json().then(data => ({
          dataReceived: data,
          status: response.status,
        }))
      )
      .then(({ status, dataReceived }) => {
        // check if response is valid, or an error response has been received.
        const valid = isValidResponse(status)
        const type = valid ? success : failure
        const data = dataReceived
        networkLog(`${verb || 'GET'} - ${type}`, status)

        return next({
          type,
          payload: data,
          error: !valid,
        })
      })
      .then(prevAction => {
        if (queuedAction) {
          dispatch(queuedAction(prevAction))
        }
      })
      // error triggered from the api response.
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Experience API fetch error', err.toString())

        return next({
          type: error,
          payload: {
            message: err,
            ...errorPayload,
          },
          error: true,
        })
      })
  } catch (err) {
    // a failure occurred inside this middleware.
    // eslint-disable-next-line no-console
    console.error('Experience API middleware failure', err.toString())

    return next({
      type: failure,
      payload: {
        message: err,
        ...errorPayload,
      },
      error: true,
    })
  }

  return {}
}

export default apiService
