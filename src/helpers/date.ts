import moment from 'moment'

export const formatDate = (date: number) => {
  return moment.unix(date).format('DD.MM.YYYY')
}
