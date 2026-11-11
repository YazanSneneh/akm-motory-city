import { a as useI18n, c as useSeoMeta, s as siteData, _ as __nuxt_component_0, b as useRouter } from './server.mjs';
import { defineComponent, computed, unref, withCtx, createVNode, toDisplayString, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { ChevronRight, Sparkles, Glasses, MessageCircle, ShieldCheck, Search, BadgePercent } from 'lucide-vue-next';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { isRTL, t } = useI18n();
    useRouter();
    const selectedBrand = ref("");
    const selectedBody = ref("");
    const selectedCondition = ref("");
    const brands = computed(() => {
      var _a, _b;
      return ((_b = (_a = siteData.filters) == null ? void 0 : _a.brands) == null ? void 0 : _b.map((b) => b.name)) || [
        "Mazda",
        "Ford",
        "Toyota",
        "GAC",
        "Mercedes-Benz",
        "BMW",
        "Hyundai"
      ];
    });
    const bodies = computed(() => {
      var _a, _b;
      return ((_b = (_a = siteData.filters) == null ? void 0 : _a.bodies) == null ? void 0 : _b.map((b) => b.name)) || [
        "Sedan",
        "SUV",
        "Hatchback",
        "Pickup",
        "Coupe"
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-950 text-white" }, _attrs))}><video autoplay loop muted playsinline poster="https://cms-motorcity.akm.jo/storage/seo_pages/f7436f911b9335b46afc81caa65e336cd2b45bf0.webp" class="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transform pointer-events-none"><source src="https://cms-motorcity.akm.jo/storage/hero_pages/ywpPcGiIcmB6A5UJzAgKh0Aj754GMSzZQTHzIFsM.webm" type="video/webm"></video><div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-primary/30"></div><div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent"></div><div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center"><div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-sky-200 mb-6 shadow-inner animate-pulse">`);
      _push(ssrRenderComponent(unref(Sparkles), { class: "w-4 h-4 text-amber-400" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0648\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0623\u0631\u062F\u0646" : "Jordan\u2019s Premier Destination for Premium & EV Vehicles")}</span></div><h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight sm:leading-none"><span class="block mb-2">${ssrInterpolate(unref(isRTL) ? "\u0627\u0643\u062A\u0634\u0641 \u0633\u064A\u0627\u0631\u062A\u0643 \u0627\u0644\u0642\u0627\u062F\u0645\u0629" : "Drive the Extraordinary")}</span><span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-300">${ssrInterpolate(unref(isRTL) ? "\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u062E\u064A\u0627\u0637 \u0644\u0644\u0633\u064A\u0627\u0631\u0627\u062A" : "AKM MOTOR CITY")}</span></h1><p class="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u062A\u0635\u0641\u062D \u0623\u062D\u062F\u062B \u0645\u0648\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0648\u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0641\u062D\u0648\u0635\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u062F\u0646 \u0645\u0639 \u0643\u0641\u0627\u0644\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629\u060C \u0648\u062D\u062C\u0632 \u0641\u0648\u0631\u064A \u0628\u0645\u0628\u0644\u063A 100 \u062F\u064A\u0646\u0627\u0631 \u0641\u0642\u0637." : "Browse brand new models and certified pre-owned vehicles with official warranty, transparent pricing, and instant online reservation.")}</p><div class="mt-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl text-slate-800 border border-white/40"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"><div class="text-start"><label class="block text-xs font-bold text-slate-600 mb-1">${ssrInterpolate(unref(t)("website_cars_by_brands", "Brand"))}</label><select class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary text-slate-800"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), "") : ssrLooseEqual(unref(selectedBrand), "")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A" : "All Brands")}</option><!--[-->`);
      ssrRenderList(unref(brands), (b) => {
        _push(`<option${ssrRenderAttr("value", b)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), b) : ssrLooseEqual(unref(selectedBrand), b)) ? " selected" : ""}>${ssrInterpolate(b)}</option>`);
      });
      _push(`<!--]--></select></div><div class="text-start"><label class="block text-xs font-bold text-slate-600 mb-1">${ssrInterpolate(unref(t)("website_cars_by_bodies", "Body Shape"))}</label><select class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary text-slate-800"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBody)) ? ssrLooseContain(unref(selectedBody), "") : ssrLooseEqual(unref(selectedBody), "")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u062C\u0645\u064A\u0639 \u0627\u0644\u0647\u064A\u0627\u0643\u0644" : "All Bodies")}</option><!--[-->`);
      ssrRenderList(unref(bodies), (b) => {
        _push(`<option${ssrRenderAttr("value", b)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBody)) ? ssrLooseContain(unref(selectedBody), b) : ssrLooseEqual(unref(selectedBody), b)) ? " selected" : ""}>${ssrInterpolate(b)}</option>`);
      });
      _push(`<!--]--></select></div><div class="text-start"><label class="block text-xs font-bold text-slate-600 mb-1">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u062D\u0627\u0644\u0629" : "Condition")}</label><select class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary text-slate-800"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "") : ssrLooseEqual(unref(selectedCondition), "")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0643\u0644 (\u062C\u062F\u064A\u062F \u0648\u0645\u0633\u062A\u0639\u0645\u0644)" : "All (New & Used)")}</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "new") : ssrLooseEqual(unref(selectedCondition), "new")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u062C\u062F\u064A\u062F (0 \u0643\u0645)" : "Brand New")}</option><option value="used"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "used") : ssrLooseEqual(unref(selectedCondition), "used")) ? " selected" : ""}>${ssrInterpolate(unref(isRTL) ? "\u0645\u0633\u062A\u0639\u0645\u0644 \u0648\u0645\u0641\u062D\u0648\u0635" : "Pre-Owned")}</option></select></div><div class="flex items-end"><button class="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer">`);
      _push(ssrRenderComponent(unref(Search), { class: "w-4 h-4 group-hover:scale-110 transition-transform" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636" : "Search Inventory")}</span></button></div></div></div><div class="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300 font-medium"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-5 h-5 text-emerald-400" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0643\u0641\u0627\u0644\u0629 \u0634\u0627\u0645\u0644\u0629 \u0648\u0645\u0631\u0643\u0632 \u062E\u062F\u0645\u0629 \u0645\u0639\u062A\u0645\u062F" : "Certified Service & Warranty")}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(BadgePercent), { class: "w-5 h-5 text-amber-400" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u062D\u062C\u0632 \u0641\u0648\u0631\u064A \u0628\u0645\u0628\u0644\u063A 100 \u062F\u064A\u0646\u0627\u0631" : "Instant 100 JOD Online Booking")}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Glasses), { class: "w-5 h-5 text-sky-400" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/showroom",
        class: "hover:underline flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(isRTL) ? "\u0645\u0639\u0631\u0636 \u0627\u0641\u062A\u0631\u0627\u0636\u064A 3D \u062A\u0641\u0627\u0639\u0644\u064A" : "3D Virtual VR Showroom")}</span>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(isRTL) ? "\u0645\u0639\u0631\u0636 \u0627\u0641\u062A\u0631\u0627\u0636\u064A 3D \u062A\u0641\u0627\u0639\u0644\u064A" : "3D Virtual VR Showroom"), 1),
              createVNode(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { isRTL } = useI18n();
    const items = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = siteData.settings) == null ? void 0 : _a.home_page) == null ? void 0 : _b.about_us) == null ? void 0 : _c.items) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 bg-white" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16"><span class="text-xs font-black text-primary tracking-widest uppercase bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">${ssrInterpolate(unref(isRTL) ? "\u0644\u0645\u0627\u0630\u0627 \u062A\u062E\u062A\u0627\u0631 AKM\u061F" : "Why Choose AKM Motor City?")}</span><h2 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(isRTL) ? "\u0625\u0631\u062B \u0639\u0631\u064A\u0642 \u0645\u0646 \u0627\u0644\u062B\u0642\u0629 \u0648\u0627\u0644\u062A\u0645\u064A\u0632 \u0641\u064A \u0639\u0627\u0644\u0645 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A" : "A Legacy of Trust, Quality, & Automotive Excellence")}</h2><p class="mt-4 text-base text-slate-600 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u0645\u0646\u0630 \u0639\u0627\u0645 1996\u060C \u0646\u0644\u062A\u0632\u0645 \u0641\u064A \u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u062E\u064A\u0627\u0637 \u0644\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0628\u062A\u0642\u062F\u064A\u0645 \u0623\u0631\u0642\u0649 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u062F\u0645\u0629 \u0648\u0627\u0644\u0634\u0641\u0627\u0641\u064A\u0629 \u0644\u0639\u0645\u0644\u0627\u0626\u0646\u0627 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0623\u0631\u062F\u0646\u064A\u0629 \u0627\u0644\u0647\u0627\u0634\u0645\u064A\u0629." : "Since 1996, AKM Motor City has set the benchmark for automotive reliability, customer care, and multi-brand excellence in Jordan.")}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><!--[-->`);
      ssrRenderList(unref(items), (item) => {
        _push(`<div class="group bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-primary/40 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"><div><div class="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-sm mb-5 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform"><img${ssrRenderAttr("src", item.image_api)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-contain"></div><h3 class="text-lg font-black text-slate-900 mb-2">${ssrInterpolate(unref(isRTL) && item.title_ar ? item.title_ar : item.title)}</h3><p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${ssrInterpolate(unref(isRTL) && item.description_ar ? item.description_ar : item.description)}</p></div><div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all"><span>${ssrInterpolate(unref(isRTL) ? "\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0632\u064A\u062F" : "Learn more")}</span>`);
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isRTL } = useI18n();
    useSeoMeta({
      title: "AKM Motor City | \u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u062E\u064A\u0627\u0637 \u0644\u0644\u0633\u064A\u0627\u0631\u0627\u062A - New & Used Cars in Jordan",
      description: "Buy new and used cars in Jordan. Browse by brand, model, and year at competitive prices with certified warranty and instant booking."
    });
    const brandList = computed(() => {
      var _a;
      return ((_a = siteData.filters) == null ? void 0 : _a.brands) || [];
    });
    const featuredNewCars = computed(() => {
      const newCars = siteData.cars.filter((c) => !c.is_used);
      return newCars.slice(0, 6);
    });
    const popularUsedCars = computed(() => {
      const usedCars = siteData.cars.filter((c) => c.is_used);
      return usedCars.slice(0, 6);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSection = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CarCard = __nuxt_component_2;
      const _component_AboutSection = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(`<section class="py-8 bg-white border-y border-slate-200/80"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between gap-4 mb-4"><span class="text-xs font-black text-slate-400 uppercase tracking-wider">${ssrInterpolate(unref(isRTL) ? "\u062A\u0635\u0641\u062D \u062D\u0633\u0628 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629" : "Explore By Official Brands")}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cars",
        class: "text-xs font-bold text-primary hover:underline flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(isRTL) ? "\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u062F\u064A\u0644\u0627\u062A" : "View All Models")}</span>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(isRTL) ? "\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u062F\u064A\u0644\u0627\u062A" : "View All Models"), 1),
              createVNode(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"><!--[-->`);
      ssrRenderList(unref(brandList), (brand) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: brand.name,
          to: `/cars?brand=${encodeURIComponent(brand.name)}`,
          class: "px-5 py-3 rounded-2xl bg-slate-50 hover:bg-primary/5 hover:border-primary/30 border border-slate-200/90 text-slate-800 hover:text-primary font-black text-sm transition-all duration-200 shrink-0 flex items-center gap-2.5 shadow-2xs group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-primary transition-colors"${_scopeId}></div><span${_scopeId}>${ssrInterpolate(brand.name)}</span>`);
            } else {
              return [
                createVNode("div", { class: "w-2 h-2 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" }),
                createVNode("span", null, toDisplayString(brand.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section><section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"><div><div class="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1.5">`);
      _push(ssrRenderComponent(unref(Sparkles), { class: "w-4 h-4" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0623\u062D\u062F\u062B \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A" : "Latest Arrivals")}</span></div><h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (0 \u0643\u0645)" : "Brand New Vehicles")}</h2><p class="text-xs sm:text-sm text-slate-500 mt-1">${ssrInterpolate(unref(isRTL) ? "\u062A\u0634\u0643\u064A\u0644\u0629 \u0645\u0645\u064A\u0632\u0629 \u0645\u0646 \u0633\u064A\u0627\u0631\u0627\u062A 2026 \u06482025 \u0645\u0639 \u0643\u0641\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0648\u0643\u064A\u0644" : "Handpicked 2026 & 2025 inventory with certified factory warranty")}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cars?condition=new",
        class: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(isRTL) ? "\u0645\u0634\u0627\u0647\u062F\u0629 \u0627\u0644\u0645\u0632\u064A\u062F" : "See all new cars")}</span>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(isRTL) ? "\u0645\u0634\u0627\u0647\u062F\u0629 \u0627\u0644\u0645\u0632\u064A\u062F" : "See all new cars"), 1),
              createVNode(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"><!--[-->`);
      ssrRenderList(unref(featuredNewCars), (car) => {
        _push(ssrRenderComponent(_component_CarCard, {
          key: car.id,
          car
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"><div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-primary text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800"><div class="relative z-10 max-w-2xl space-y-5"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">`);
      _push(ssrRenderComponent(unref(Glasses), { class: "w-4 h-4" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u062A\u062C\u0631\u0628\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "3D Virtual Showroom")}</span></div><h3 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight">${ssrInterpolate(unref(isRTL) ? "\u062A\u062C\u0648\u0644 \u0641\u064A \u0645\u0639\u0631\u0636 AKM \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0648\u0623\u0646\u062A \u0641\u064A \u0645\u0646\u0632\u0644\u0643" : "Walk Through the AKM Showroom Virtually")}</h3><p class="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">${ssrInterpolate(unref(isRTL) ? "\u0627\u0633\u062A\u0643\u0634\u0641 \u0633\u064A\u0627\u0631\u0627\u062A\u0646\u0627 \u0628\u0623\u0628\u0639\u0627\u062F 360 \u062F\u0631\u062C\u0629\u060C \u0648\u062A\u0641\u0642\u062F \u0645\u0642\u0635\u0648\u0631\u0629 \u0627\u0644\u0642\u064A\u0627\u062F\u0629 \u0648\u0623\u062F\u0642 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0645\u0646 \u0647\u0627\u062A\u0641\u0643 \u0623\u0648 \u062D\u0627\u0633\u0648\u0628\u0643 \u0642\u0628\u0644 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0631\u0636." : "Explore the full showroom inventory with high-definition 360\xB0 virtual tours and inspect vehicle interiors before your test drive.")}</p><div class="pt-2 flex flex-wrap gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/showroom",
        class: "px-6 py-3.5 rounded-xl bg-white hover:bg-sky-50 text-slate-950 font-black text-sm shadow-lg transition-all flex items-center gap-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(isRTL) ? "\u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0627\u0644\u0622\u0646" : "Launch Virtual Tour")}</span>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(isRTL) ? "\u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0627\u0644\u0622\u0646" : "Launch Virtual Tour"), 1),
              createVNode(unref(ChevronRight), { class: "w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://wa.me/96265777777" target="_blank" class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(MessageCircle), { class: "w-4 h-4 text-emerald-400" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A" : "Contact Sales Consultant")}</span></a></div></div><div class="absolute -end-24 -bottom-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div></div></section><section class="py-16 bg-slate-100/60 border-t border-slate-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"><div><div class="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1.5">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0641\u062D\u0635 \u0643\u0627\u0645\u0644 \u0648\u0636\u0645\u0627\u0646 \u0645\u0639\u062A\u0645\u062F" : "100% Inspected & Certified")}</span></div><h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(isRTL) ? "\u0633\u064A\u0627\u0631\u0627\u062A \u0645\u0633\u062A\u0639\u0645\u0644\u0629 \u0645\u0641\u062D\u0648\u0635\u0629 \u0648\u0645\u0636\u0645\u0648\u0646\u0629" : "Certified Pre-Owned Inventory")}</h2><p class="text-xs sm:text-sm text-slate-500 mt-1">${ssrInterpolate(unref(isRTL) ? "\u0633\u064A\u0627\u0631\u0627\u062A \u062E\u0636\u0639\u062A \u0644\u0623\u062F\u0642 \u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u062F\u0627\u0621 \u0645\u0639 \u062A\u0642\u0627\u0631\u064A\u0631 \u0634\u0627\u0645\u0644\u0629" : "Meticulously inspected vehicles with verified history and condition reports")}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cars?condition=used",
        class: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0 shadow-2xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(isRTL) ? "\u0645\u0634\u0627\u0647\u062F\u0629 \u0627\u0644\u0645\u0632\u064A\u062F" : "See all pre-owned")}</span>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(isRTL) ? "\u0645\u0634\u0627\u0647\u062F\u0629 \u0627\u0644\u0645\u0632\u064A\u062F" : "See all pre-owned"), 1),
              createVNode(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"><!--[-->`);
      ssrRenderList(unref(popularUsedCars), (car) => {
        _push(ssrRenderComponent(_component_CarCard, {
          key: car.id,
          car
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
      _push(ssrRenderComponent(_component_AboutSection, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6cMTLrlS.mjs.map
