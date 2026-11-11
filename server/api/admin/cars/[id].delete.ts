import { getSiteData, saveSiteData } from '~/server/utils/store'

export default defineEventHandler((event) => {
  const idStr = getRouterParam(event, 'id')
  const id = parseInt(idStr || '0')

  const siteData = getSiteData()
  const carIndex = siteData.cars.findIndex((c: any) => c.id === id)

  if (carIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Vehicle not found'
    })
  }

  const removed = siteData.cars.splice(carIndex, 1)[0]
  saveSiteData(siteData)

  return {
    success: true,
    message: 'Vehicle removed from inventory successfully',
    data: removed
  }
})

