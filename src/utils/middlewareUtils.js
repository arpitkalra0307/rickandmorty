
import moment from 'moment'

export const TYPE = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  error: 'ERROR',
}

// effectively determines that we haven't received a cached, error or failure response.
export const isValidResponse = (status: number) => status >= 200 && status < 300



export const makeActions = (name: string): { success: string, failure: string, error: string } => ({
  success: `${name}_SUCCESS`,
  failure: `${name}_FAILURE`,
  error: `${name}_ERROR`,
  init: `${name}_INIT`,
})

export const makeRequestObj = (
  {
    data,
    verb = 'GET',
    contentType = 'application/json',
  }: { data: Object, verb: string, contentType: string },
  headers: Object = {},
  stringify: boolean = false
) => {
  const body = data && verb !== 'GET' ? { body: stringify ? JSON.stringify(data) : data } : {}
  return {
    method: verb,
    headers: {
      'Content-Type': contentType,
      ...headers,
    },
    mode: 'cors',
    ...body,
  }
}

// logs network status to the console.
export const networkLog = (name: string, status: number) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `%c${status}${status ? ' : ' : ''}${name}`,
      `background: ${
        isValidResponse(status) ? 'green' : 'red'
      }; color: white; padding: 5px; display: block; width:100%;`
    )
  }
}

export const makeQueryString = (params: Object): string => {
  const arr = []
  Object.entries(params).forEach(obj => {
    arr.push(`${obj[0]}=${encodeURIComponent(obj[1])}`)
  })
  return `?${arr.join('&')}`
}

export const makeRequestHeaders = (
  contentType,
  additionalHeaders = {},
) => {
  const creationTime = moment().toISOString()
  const requestHeaders = {
    'Content-Type': contentType,
    timestamp: creationTime,
    transactionId: uuidv4(),
    trackingId: `trackingid-${creationTime}`,
    ...additionalHeaders,
  }
  return requestHeaders
}

export const uuidv4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    /* eslint no-bitwise: ["error", { "int32Hint": true }] */
    const r = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
