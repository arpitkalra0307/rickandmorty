import {
  CONCERT_DETAILS_FETCH,
  FILTERS_UPDATE,
} from '../types/concertDetails'


export const getConcertDetails = () =>
  dispatch => {
  dispatch({
    type: 'EXPERIENCE_API',
    name: CONCERT_DETAILS_FETCH,
    verb: 'GET',
    route: 'https://rickandmortyapi.com/api/character/',
  })
}

export const changeFilter = (payload) => ({
  type: FILTERS_UPDATE,
  payload
})
