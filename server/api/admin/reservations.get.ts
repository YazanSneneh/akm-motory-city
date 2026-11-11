import { getReservations } from '~/server/utils/store'

export default defineEventHandler(() => {
  return {
    success: true,
    data: getReservations()
  }
})

