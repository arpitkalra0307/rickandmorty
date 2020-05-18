import {
  CONCERT_DETAILS_FETCH,
  CONCERT_DETAILS_FETCH_SUCCESS,
  CONCERT_DETAILS_FETCH_ERROR,
  CONCERT_DETAILS_FETCH_FAILURE,
  FILTERS_UPDATE,
} from '../actions/types/concertDetails'

export const initialState = {
  isFetching: false,
  data: [],
  error: false,
  errorMsg : '',
  filters: []
}

const concertDetails = (
  state: Object = initialState,
  action: { type: string, payload: Object, error: boolean }
) => {
  switch (action.type) {
    case CONCERT_DETAILS_FETCH: {
      return {
        ...initialState,
        isFetching: true,
      }
    }
    case CONCERT_DETAILS_FETCH_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: false,
      }
    }
    case CONCERT_DETAILS_FETCH_ERROR:
    case CONCERT_DETAILS_FETCH_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        errorMsg: action.payload.message

      }
    }
    case FILTERS_UPDATE: {
      return {
        ...state,
        filters: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default concertDetails
