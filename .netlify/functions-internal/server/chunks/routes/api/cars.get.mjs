import { d as defineEventHandler, a as getQuery } from '../../_/nitro.mjs';
import { s as siteData } from '../../_/site-data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cars_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const q = (query.q || "").toLowerCase().trim();
  const brand = query.brand;
  const body = query.body;
  const engineType = query.engine_type;
  const transmission = query.transmission;
  const driveType = query.drive_type;
  const condition = query.condition;
  const minPrice = query.min_price ? parseFloat(query.min_price) : void 0;
  const maxPrice = query.max_price ? parseFloat(query.max_price) : void 0;
  const sort = query.sort;
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "12");
  let filtered = [...siteData.cars];
  if (q) {
    filtered = filtered.filter((car) => {
      var _a, _b, _c, _d;
      const nameEn = (car.name_api || "").toLowerCase();
      const nameAr = (car.name_ar || "").toLowerCase();
      const brandAttr = ((_b = (_a = car.attributes.find((a) => a.name === "Brand")) == null ? void 0 : _a.value) == null ? void 0 : _b.toLowerCase()) || "";
      const bodyAttr = ((_d = (_c = car.attributes.find((a) => a.name === "Body")) == null ? void 0 : _c.value) == null ? void 0 : _d.toLowerCase()) || "";
      return nameEn.includes(q) || nameAr.includes(q) || brandAttr.includes(q) || bodyAttr.includes(q);
    });
  }
  if (brand) {
    filtered = filtered.filter((car) => {
      var _a;
      const b = (_a = car.attributes.find((a) => a.name === "Brand")) == null ? void 0 : _a.value;
      return b && b.toLowerCase() === brand.toLowerCase();
    });
  }
  if (body) {
    filtered = filtered.filter((car) => {
      var _a;
      const b = (_a = car.attributes.find((a) => a.name === "Body")) == null ? void 0 : _a.value;
      return b && b.toLowerCase() === body.toLowerCase();
    });
  }
  if (engineType) {
    filtered = filtered.filter((car) => {
      var _a;
      const e = (_a = car.attributes.find((a) => a.name === "Engine Type")) == null ? void 0 : _a.value;
      return e && e.toLowerCase() === engineType.toLowerCase();
    });
  }
  if (transmission) {
    filtered = filtered.filter((car) => {
      var _a;
      const t = (_a = car.attributes.find((a) => a.name === "Transmission")) == null ? void 0 : _a.value;
      return t && t.toLowerCase() === transmission.toLowerCase();
    });
  }
  if (driveType) {
    filtered = filtered.filter((car) => {
      var _a;
      const d = (_a = car.attributes.find((a) => a.name === "Drive Type")) == null ? void 0 : _a.value;
      return d && d.toLowerCase() === driveType.toLowerCase();
    });
  }
  if (condition) {
    if (condition === "new") {
      filtered = filtered.filter((car) => !car.is_used);
    } else if (condition === "used") {
      filtered = filtered.filter((car) => car.is_used);
    }
  }
  if (minPrice !== void 0 && !isNaN(minPrice)) {
    filtered = filtered.filter((car) => parseFloat(car.price || "0") >= minPrice);
  }
  if (maxPrice !== void 0 && !isNaN(maxPrice)) {
    filtered = filtered.filter((car) => parseFloat(car.price || "0") <= maxPrice);
  }
  if (sort === "price_asc") {
    filtered.sort((a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0"));
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => parseFloat(b.price || "0") - parseFloat(a.price || "0"));
  } else if (sort === "views") {
    filtered.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
  }
  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);
  return {
    success: true,
    total,
    page,
    limit,
    total_pages: Math.ceil(total / limit),
    data: paginated
  };
});

export { cars_get as default };
//# sourceMappingURL=cars.get.mjs.map
