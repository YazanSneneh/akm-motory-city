import { getSiteData } from '~/server/utils/store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const locale = (query.locale as string) === 'ar' ? 'ar' : 'en'

  const siteData = getSiteData()
  const settings = locale === 'ar' ? siteData.settings_ar : siteData.settings
  const banners = locale === 'ar' ? siteData.banners_ar : siteData.banners
  const filters = locale === 'ar' ? siteData.filters_ar : siteData.filters

  const popularNew = siteData.cars.filter((c: any) => siteData.popular_new_ids?.includes(c.id))
  const popularUsed = siteData.cars.filter((c: any) => siteData.popular_used_ids?.includes(c.id))
  const featuredNew = siteData.cars.filter((c: any) => siteData.featured_new_ids?.includes(c.id))
  const featuredUsed = siteData.cars.filter((c: any) => siteData.featured_used_ids?.includes(c.id))

  return {
    success: true,
    settings,
    banners,
    filters,
    cars: {
      popular_new: popularNew,
      popular_used: popularUsed,
      featured_new: featuredNew,
      featured_used: featuredUsed
    }
  }
})
