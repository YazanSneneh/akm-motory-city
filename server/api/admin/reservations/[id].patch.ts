import { updateReservationStatus } from '~/server/utils/store'

export default defineEventHandler(async (event) => {
  const idOrHash = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const { status, notes } = body

  if (!status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Status is required'
    })
  }

  const updated = updateReservationStatus(idOrHash, status, notes)
  if (!updated) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Reservation not found'
    })
  }

  return {
    success: true,
    message: 'Reservation status updated successfully',
    data: updated
  }
})

