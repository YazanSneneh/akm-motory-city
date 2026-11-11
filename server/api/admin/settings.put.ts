import { saveDealershipSettings } from '~/server/utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const updated = saveDealershipSettings(body)
  return {
    success: true,
    message: 'Dealership settings updated successfully',
    data: updated
  }
})

