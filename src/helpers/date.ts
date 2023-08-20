import moment from 'moment'

export const formatDate = (date: number): string[] => {
  return moment.unix(date).format('DD.MMMM.YYYY').split('.')
}
