import { e as useRoute, b as useRouter, a as useI18n, c as useSeoMeta, s as siteData, _ as __nuxt_component_0, d as useCurrency } from './server.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createTextVNode, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { SlidersHorizontal, X, CarFront, ChevronLeft, ChevronRight, Search, Check } from 'lucide-vue-next';
import { _ as __nuxt_component_2 } from './CarCard-D9n78Rtl.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './_plugin-vue_export-helper-8jYXDYbZ.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FilterDrawer",
  __ssrInlineRender: true,
  props: {
    query: {},
    condition: {},
    brand: {},
    body: {},
    engineType: {},
    transmission: {},
    maxPrice: {}
  },
  emits: ["update:query", "update:condition", "update:brand", "update:body", "update:engineType", "update:transmission", "update:maxPrice", "clear"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { isRTL, t } = useI18n();
    const { formatPrice } = useCurrency();
    const modelQuery = computed({
      get: () => props.query,
      set: (v) => emit("update:query", v)
    });
    const modelCondition = computed({
      get: () => props.condition,
      set: (v) => emit("update:condition", v)
    });
    const modelBrand = computed({
      get: () => props.brand,
      set: (v) => emit("update:brand", v)
    });
    const modelBody = computed({
      get: () => props.body,
      set: (v) => emit("update:body", v)
    });
    const modelEngineType = computed({
      get: () => props.engineType,
      set: (v) => emit("update:engineType", v)
    });
    const modelTransmission = computed({
      get: () => props.transmission,
      set: (v) => emit("update:transmission", v)
    });
    const modelMaxPrice = computed({
      get: () => props.maxPrice,
      set: (v) => emit("update:maxPrice", v)
    });
    const brands = computed(() => {
      var _a, _b;
      return ((_b = (_a = siteData.filters) == null ? void 0 : _a.brands) == null ? void 0 : _b.map((b) => b.name)) || [];
    });
    const bodies = computed(() => {
      var _a, _b;
      return ((_b = (_a = siteData.filters) == null ? void 0 : _a.bodies) == null ? void 0 : _b.map((b) => b.name)) || [];
    });
    const engineTypes = computed(() => {
      var _a, _b;
      return ((_b = (_a = siteData.filters) == null ? void 0 : _a.engine_types) == null ? void 0 : _b.map((e) => e.name)) || ["Gasoline", "Electric", "Hybrid"];
    });
    const transmissions = computed(() => {
      var _a, _b;
      return ((_b = (_a = siteData.filters) == null ? void 0 : _a.transmissions) == null ? void 0 : _b.map((t2) => t2.name)) || ["Automatic", "Manual"];
    });
    const hasActiveFilters = computed(() => {
      return !!(props.query || props.condition || props.brand || props.body || props.engineType || props.transmission || props.maxPrice < 15e4);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6" }, _attrs))}><div class="flex items-center justify-between pb-4 border-b border-slate-100"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "w-4 h-4 text-primary" }, null, _parent));
      _push(`<h3 class="font-extrabold text-slate-900 text-base">${ssrInterpolate(unref(t)("website_cars_filters", "Filters"))}</h3></div>`);
      if (unref(hasActiveFilters)) {
        _push(`<button class="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors">${ssrInterpolate(unref(t)("website_cars_clear_all", "Clear All"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-bold text-slate-700 mb-2">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0633\u0631\u064A\u0639" : "Search")}</label><div class="relative"><input${ssrRenderAttr("value", unref(modelQuery))} type="text"${ssrRenderAttr("placeholder", unref(t)("website_cars_search_placeholder", "Search by make, model, or keyword"))} class="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-primary focus:bg-white transition-all">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 text-slate-400 absolute start-3 top-3" }, null, _parent));
      if (unref(modelQuery)) {
        _push(`<button class="absolute end-3 top-2.5 text-slate-400 hover:text-slate-600">`);
        _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="block text-xs font-bold text-slate-700 mb-2">${ssrInterpolate(unref(isRTL) ? "\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u064A\u0627\u0631\u0629" : "Vehicle Condition")}</label><div class="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl"><button class="${ssrRenderClass([!unref(modelCondition) ? "bg-white text-primary shadow-xs" : "text-slate-600 hover:text-slate-900", "py-2 text-xs font-bold rounded-lg transition-all"])}">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0643\u0644" : "All")}</button><button class="${ssrRenderClass([unref(modelCondition) === "new" ? "bg-white text-primary shadow-xs" : "text-slate-600 hover:text-slate-900", "py-2 text-xs font-bold rounded-lg transition-all"])}">${ssrInterpolate(unref(isRTL) ? "\u062C\u062F\u064A\u062F" : "New")}</button><button class="${ssrRenderClass([unref(modelCondition) === "used" ? "bg-white text-primary shadow-xs" : "text-slate-600 hover:text-slate-900", "py-2 text-xs font-bold rounded-lg transition-all"])}">${ssrInterpolate(unref(isRTL) ? "\u0645\u0633\u062A\u0639\u0645\u0644" : "Used")}</button></div></div><div><label class="block text-xs font-bold text-slate-700 mb-2">${ssrInterpolate(unref(t)("website_cars_by_brands", "Brand"))}</label><div class="space-y-1 max-h-48 overflow-y-auto pe-1"><!--[-->`);
      ssrRenderList(unref(brands), (b) => {
        _push(`<button class="${ssrRenderClass([unref(modelBrand) === b ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100", "w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"])}"><span>${ssrInterpolate(b)}</span>`);
        if (unref(modelBrand) === b) {
          _push(ssrRenderComponent(unref(Check), { class: "w-3.5 h-3.5" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-xs font-bold text-slate-700 mb-2">${ssrInterpolate(unref(t)("website_cars_by_bodies", "Body Shape"))}</label><div class="flex flex-wrap gap-1.5"><!--[-->`);
      ssrRenderList(unref(bodies), (b) => {
        _push(`<button class="${ssrRenderClass([unref(modelBody) === b ? "bg-primary text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200", "px-3 py-1.5 rounded-lg text-xs font-bold transition-all"])}">${ssrInterpolate(b)}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-xs font-bold text-slate-700 mb-2">${ssrInterpolate(unref(t)("website_cars_by_engine_types", "Engine Type"))}</label><div class="flex flex-wrap gap-1.5"><!--[-->`);
      ssrRenderList(unref(engineTypes), (e) => {
        _push(`<button class="${ssrRenderClass([unref(modelEngineType) === e ? "bg-primary text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200", "px-3 py-1.5 rounded-lg text-xs font-bold transition-all"])}">${ssrInterpolate(e)}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-xs font-bold text-slate-700 mb-2">${ssrInterpolate(unref(t)("website_cars_by_transmissions", "Transmission"))}</label><div class="flex flex-wrap gap-1.5"><!--[-->`);
      ssrRenderList(unref(transmissions), (t2) => {
        _push(`<button class="${ssrRenderClass([unref(modelTransmission) === t2 ? "bg-primary text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200", "px-3 py-1.5 rounded-lg text-xs font-bold transition-all"])}">${ssrInterpolate(t2)}</button>`);
      });
      _push(`<!--]--></div></div><div><div class="flex items-center justify-between mb-2"><label class="text-xs font-bold text-slate-700">${ssrInterpolate(unref(t)("website_cars_by_price", "Price"))}</label><span class="text-xs font-black text-primary">${ssrInterpolate(unref(formatPrice)(unref(modelMaxPrice)))}</span></div><input${ssrRenderAttr("value", unref(modelMaxPrice))} type="range" min="5000" max="150000" step="2500" class="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"><div class="flex justify-between text-[10px] text-slate-400 font-medium mt-1"><span>5,000 JOD</span><span>150,000 JOD</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FilterDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const itemsPerPage = 9;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { isRTL, t } = useI18n();
    useSeoMeta({
      title: "All Models & Cars | AKM Motor City - \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0633\u064A\u0627\u0631\u0627\u062A",
      description: "Explore the full inventory of certified new and used cars at AKM Motor City. Filter by brand, shape, engine, and price."
    });
    const query = ref(route.query.q || "");
    const condition = ref(route.query.condition || "");
    const brand = ref(route.query.brand || "");
    const body = ref(route.query.body || "");
    const engineType = ref(route.query.engineType || "");
    const transmission = ref(route.query.transmission || "");
    const maxPrice = ref(15e4);
    const sortOrder = ref(route.query.sort || "");
    const isMobileFilterOpen = ref(false);
    const currentPage = ref(1);
    const totalCars = computed(() => siteData.cars.length);
    watch([query, condition, brand, body, engineType, transmission, sortOrder], () => {
      currentPage.value = 1;
      const q = {};
      if (query.value) q.q = query.value;
      if (condition.value) q.condition = condition.value;
      if (brand.value) q.brand = brand.value;
      if (body.value) q.body = body.value;
      if (engineType.value) q.engineType = engineType.value;
      if (transmission.value) q.transmission = transmission.value;
      if (sortOrder.value) q.sort = sortOrder.value;
      router.replace({ query: q });
    });
    const activeFilterCount = computed(() => {
      let count = 0;
      if (query.value) count++;
      if (condition.value) count++;
      if (brand.value) count++;
      if (body.value) count++;
      if (engineType.value) count++;
      if (transmission.value) count++;
      if (maxPrice.value < 15e4) count++;
      return count;
    });
    const clearAllFilters = () => {
      query.value = "";
      condition.value = "";
      brand.value = "";
      body.value = "";
      engineType.value = "";
      transmission.value = "";
      maxPrice.value = 15e4;
      sortOrder.value = "";
      currentPage.value = 1;
    };
    const filteredCars = computed(() => {
      let list = [...siteData.cars];
      if (query.value.trim()) {
        const q = query.value.toLowerCase().trim();
        list = list.filter((car) => {
          var _a, _b, _c, _d, _e, _f;
          const nameEn = (car.name_api || "").toLowerCase();
          const nameAr = (car.name_ar || "").toLowerCase();
          const brandVal = ((_c = (_b = (_a = car.attributes) == null ? void 0 : _a.find((a) => a.name === "Brand")) == null ? void 0 : _b.value) == null ? void 0 : _c.toLowerCase()) || "";
          const bodyVal = ((_f = (_e = (_d = car.attributes) == null ? void 0 : _d.find((a) => a.name === "Body")) == null ? void 0 : _e.value) == null ? void 0 : _f.toLowerCase()) || "";
          return nameEn.includes(q) || nameAr.includes(q) || brandVal.includes(q) || bodyVal.includes(q);
        });
      }
      if (condition.value) {
        if (condition.value === "new") {
          list = list.filter((c) => !c.is_used);
        } else if (condition.value === "used") {
          list = list.filter((c) => c.is_used);
        }
      }
      if (brand.value) {
        list = list.filter((c) => {
          var _a, _b;
          const b = (_b = (_a = c.attributes) == null ? void 0 : _a.find((a) => a.name === "Brand")) == null ? void 0 : _b.value;
          return b && b.toLowerCase() === brand.value.toLowerCase();
        });
      }
      if (body.value) {
        list = list.filter((c) => {
          var _a, _b;
          const b = (_b = (_a = c.attributes) == null ? void 0 : _a.find((a) => a.name === "Body")) == null ? void 0 : _b.value;
          return b && b.toLowerCase() === body.value.toLowerCase();
        });
      }
      if (engineType.value) {
        list = list.filter((c) => {
          var _a, _b;
          const e = (_b = (_a = c.attributes) == null ? void 0 : _a.find((a) => a.name === "Engine Type")) == null ? void 0 : _b.value;
          return e && e.toLowerCase() === engineType.value.toLowerCase();
        });
      }
      if (transmission.value) {
        list = list.filter((c) => {
          var _a, _b;
          const t2 = (_b = (_a = c.attributes) == null ? void 0 : _a.find((a) => a.name === "Transmission")) == null ? void 0 : _b.value;
          return t2 && t2.toLowerCase() === transmission.value.toLowerCase();
        });
      }
      if (maxPrice.value < 15e4) {
        list = list.filter((c) => {
          const p = parseFloat(c.price || "0");
          return p <= maxPrice.value;
        });
      }
      if (sortOrder.value === "price_asc") {
        list.sort((a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0"));
      } else if (sortOrder.value === "price_desc") {
        list.sort((a, b) => parseFloat(b.price || "0") - parseFloat(a.price || "0"));
      } else if (sortOrder.value === "views") {
        list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
      }
      return list;
    });
    const totalPages = computed(() => Math.ceil(filteredCars.value.length / itemsPerPage));
    const paginatedCars = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredCars.value.slice(start, start + itemsPerPage);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_FilterDrawer = _sfc_main$1;
      const _component_CarCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="mb-8"><div class="flex items-center gap-2 text-xs text-slate-500 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("website_cars_hero_home", "Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("website_cars_hero_home", "Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>/</span><span class="text-slate-900 font-bold">${ssrInterpolate(unref(t)("website_cars_hero_the_cars", "Models"))}</span></div><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="text-3xl font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(isRTL) ? "\u0645\u0639\u0631\u0636 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u062F\u064A\u0644\u0627\u062A" : "Vehicle Inventory")}</h1><p class="text-xs sm:text-sm text-slate-500 mt-1">${ssrInterpolate(unref(isRTL) ? `\u0639\u0631\u0636 ${unref(filteredCars).length} \u0645\u0646 \u0623\u0635\u0644 ${unref(totalCars)} \u0633\u064A\u0627\u0631\u0629 \u0645\u062A\u0648\u0641\u0631\u0629` : `Showing ${unref(filteredCars).length} of ${unref(totalCars)} vehicles`)}</p></div><div class="flex items-center gap-3"><button class="lg:hidden px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs">`);
      _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "w-4 h-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(t)("website_cars_filters", "Filters"))}</span>`);
      if (unref(activeFilterCount) > 0) {
        _push(`<span class="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">${ssrInterpolate(unref(activeFilterCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="flex items-center gap-2"><span class="text-xs text-slate-500 font-semibold hidden sm:inline">${ssrInterpolate(unref(t)("website_cars_sort_by", "Sort by"))}: </span><select class="bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary shadow-2xs"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "") : ssrLooseEqual(unref(sortOrder), "")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A" : "Featured")}</option><option value="price_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "price_asc") : ssrLooseEqual(unref(sortOrder), "price_asc")) ? " selected" : ""}>${ssrInterpolate(unref(t)("website_cars_price_low_high", "Price: Low to High"))}</option><option value="price_desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "price_desc") : ssrLooseEqual(unref(sortOrder), "price_desc")) ? " selected" : ""}>${ssrInterpolate(unref(t)("website_cars_price_high_low", "Price: High to Low"))}</option><option value="views"${ssrIncludeBooleanAttr(Array.isArray(unref(sortOrder)) ? ssrLooseContain(unref(sortOrder), "views") : ssrLooseEqual(unref(sortOrder), "views")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0634\u0627\u0647\u062F\u0629" : "Most Popular")}</option></select></div></div></div>`);
      if (unref(activeFilterCount) > 0) {
        _push(`<div class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-200/80"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("website_cars_active_filters", "Active Filters:"))}</span>`);
        if (unref(query)) {
          _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"><span>&quot;${ssrInterpolate(unref(query))}&quot;</span>`);
          _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(condition)) {
          _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"><span>${ssrInterpolate(unref(condition) === "new" ? unref(isRTL) ? "\u062C\u062F\u064A\u062F" : "New" : unref(isRTL) ? "\u0645\u0633\u062A\u0639\u0645\u0644" : "Used")}</span>`);
          _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(brand)) {
          _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"><span>${ssrInterpolate(unref(brand))}</span>`);
          _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(body)) {
          _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"><span>${ssrInterpolate(unref(body))}</span>`);
          _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(engineType)) {
          _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"><span>${ssrInterpolate(unref(engineType))}</span>`);
          _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(maxPrice) < 15e4) {
          _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"><span>\u2264 ${ssrInterpolate(unref(maxPrice))} JOD</span>`);
          _push(ssrRenderComponent(unref(X), { class: "w-3.5 h-3.5" }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="text-xs font-bold text-rose-600 hover:underline ms-2">${ssrInterpolate(unref(t)("website_cars_clear_all", "Clear All"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-4 gap-8"><aside class="hidden lg:block lg:col-span-1"><div class="sticky top-28">`);
      _push(ssrRenderComponent(_component_FilterDrawer, {
        query: unref(query),
        "onUpdate:query": ($event) => isRef(query) ? query.value = $event : null,
        condition: unref(condition),
        "onUpdate:condition": ($event) => isRef(condition) ? condition.value = $event : null,
        brand: unref(brand),
        "onUpdate:brand": ($event) => isRef(brand) ? brand.value = $event : null,
        body: unref(body),
        "onUpdate:body": ($event) => isRef(body) ? body.value = $event : null,
        engineType: unref(engineType),
        "onUpdate:engineType": ($event) => isRef(engineType) ? engineType.value = $event : null,
        transmission: unref(transmission),
        "onUpdate:transmission": ($event) => isRef(transmission) ? transmission.value = $event : null,
        maxPrice: unref(maxPrice),
        "onUpdate:maxPrice": ($event) => isRef(maxPrice) ? maxPrice.value = $event : null,
        onClear: clearAllFilters
      }, null, _parent));
      _push(`</div></aside><div class="lg:col-span-3">`);
      if (unref(paginatedCars).length === 0) {
        _push(`<div class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4"><div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">`);
        _push(ssrRenderComponent(unref(CarFront), { class: "w-8 h-8" }, null, _parent));
        _push(`</div><h3 class="text-xl font-black text-slate-900">${ssrInterpolate(unref(t)("website_cars_no_cars_found", "No Cars Found"))}</h3><p class="text-sm text-slate-500 max-w-md mx-auto">${ssrInterpolate(unref(t)("website_cars_try_adjusting", "Try adjusting your filters or search query."))}</p><button class="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-dark transition-colors inline-block">${ssrInterpolate(unref(t)("website_cars_clear_all", "Reset All Filters"))}</button></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(paginatedCars), (car) => {
          _push(ssrRenderComponent(_component_CarCard, {
            key: car.id,
            car
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (unref(totalPages) > 1) {
        _push(`<div class="mt-12 flex items-center justify-center gap-2"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors">`);
        _push(ssrRenderComponent(unref(ChevronLeft), { class: "w-4 h-4 rtl:rotate-180" }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(unref(totalPages), (p) => {
          _push(`<button class="${ssrRenderClass([unref(currentPage) === p ? "bg-primary text-white shadow-md" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50", "w-10 h-10 rounded-xl font-bold text-xs transition-all"])}">${ssrInterpolate(p)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors">`);
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 rtl:rotate-180" }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(isMobileFilterOpen)) {
        _push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-end"><div class="relative w-full max-w-sm bg-white min-h-screen p-5 flex flex-col justify-between shadow-2xl"><div class="space-y-4"><div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-lg font-black text-slate-900">${ssrInterpolate(unref(t)("website_cars_filters", "Filter Options"))}</h3><button class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">`);
        _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
        _push(`</button></div>`);
        _push(ssrRenderComponent(_component_FilterDrawer, {
          query: unref(query),
          "onUpdate:query": ($event) => isRef(query) ? query.value = $event : null,
          condition: unref(condition),
          "onUpdate:condition": ($event) => isRef(condition) ? condition.value = $event : null,
          brand: unref(brand),
          "onUpdate:brand": ($event) => isRef(brand) ? brand.value = $event : null,
          body: unref(body),
          "onUpdate:body": ($event) => isRef(body) ? body.value = $event : null,
          engineType: unref(engineType),
          "onUpdate:engineType": ($event) => isRef(engineType) ? engineType.value = $event : null,
          transmission: unref(transmission),
          "onUpdate:transmission": ($event) => isRef(transmission) ? transmission.value = $event : null,
          maxPrice: unref(maxPrice),
          "onUpdate:maxPrice": ($event) => isRef(maxPrice) ? maxPrice.value = $event : null,
          onClear: clearAllFilters
        }, null, _parent));
        _push(`</div><div class="pt-4 border-t border-slate-200"><button class="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md">${ssrInterpolate(unref(t)("website_cars_apply_filters", "Apply Filters"))} (${ssrInterpolate(unref(filteredCars).length)}) </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cars/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CSUUVTeg.mjs.map
