import { d as defineEventHandler, a as getQuery } from '../../_/nitro.mjs';
import { s as siteData } from '../../_/site-data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const bootstrap_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const locale = query.locale === "ar" ? "ar" : "en";
  const settings = locale === "ar" ? siteData.settings_ar : siteData.settings;
  const banners = locale === "ar" ? siteData.banners_ar : siteData.banners;
  const filters = locale === "ar" ? siteData.filters_ar : siteData.filters;
  const popularNew = siteData.cars.filter((c) => siteData.popular_new_ids.includes(c.id));
  const popularUsed = siteData.cars.filter((c) => siteData.popular_used_ids.includes(c.id));
  const featuredNew = siteData.cars.filter((c) => siteData.featured_new_ids.includes(c.id));
  const featuredUsed = siteData.cars.filter((c) => siteData.featured_used_ids.includes(c.id));
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
  };
});

export { bootstrap_get as default };
//# sourceMappingURL=bootstrap.get.mjs.map
