import { getDealershipSettings } from '~/server/utils/store'

export default defineEventHandler(() => {
  return {
    success: true,
    data: getDealershipSettings()
  }
})

