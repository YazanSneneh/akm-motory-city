import { getSiteData } from '~/server/utils/store'

export default defineEventHandler(() => {
  const siteData = getSiteData()
  return {
    success: true,
    data: siteData.cars
  }
})

