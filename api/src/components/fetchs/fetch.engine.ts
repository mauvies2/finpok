import moment from 'moment'
import Fetch from './Fetch'

export const shouldFetch = async (modelName: string): Promise<boolean> => {
  if (modelName === 'Crypto') {
    try {
      const crypto = await Fetch.findOne({ modelName: 'Crypto' })

      if (!crypto) {
        await Fetch.create({
          modelName: 'Crypto',
          interval: 4,
          availableFetchs: 332,
        })

        return true
      }

      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const totalMinutes = hours * 60 + minutes
      const totalMinutesLeft = 1440 - totalMinutes

      const nowFormatted = moment(date).format('YYYY-MM-DD')
      const updatedAtFormatted = moment(crypto.updatedAt).format('YYYY-MM-DD')

      if (nowFormatted !== updatedAtFormatted) {
        const interval = totalMinutesLeft / 333
        crypto.interval = interval
        crypto.availableFetchs = 332
        await crypto.save()
        return true
      }

      if (totalMinutesLeft / crypto.availableFetchs < crypto.interval) {
        crypto.interval = totalMinutesLeft / crypto.availableFetchs
        crypto.availableFetchs--
        await crypto.save()
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  return false
}
