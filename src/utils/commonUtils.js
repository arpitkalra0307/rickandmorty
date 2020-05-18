import moment from 'moment'
export const extractYear = (timestamp) => {
  var time = moment(timestamp)
  return (moment().year() - time.format('YYYY')) + ' years ago'
}
