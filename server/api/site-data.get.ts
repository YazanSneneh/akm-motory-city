import { getSiteData } from '~/server/utils/store'

export default defineEventHandler(() => {
  return {
    success: true,
    data: getSiteData()
  }
})

