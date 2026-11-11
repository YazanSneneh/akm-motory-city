import { e as useRoute, a as useI18n, d as useCurrency, f as useFavorites, g as useCompare, s as siteData, h as createError, c as useSeoMeta, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderList, ssrLooseContain } from 'vue/server-renderer';
import { Share2, ArrowLeftRight, Heart, ShieldCheck, AlertCircle, CreditCard, MessageCircle, FileText, SlidersHorizontal, CheckCircle2, Check, Phone, MapPin, ImageIcon, Rotate3d, ChevronLeft, ChevronRight, X, Wallet, Loader2, MoveHorizontal, Pause, Play, RotateCcw } from 'lucide-vue-next';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ThreesixtyViewer",
  __ssrInlineRender: true,
  props: {
    frames: {}
  },
  setup(__props) {
    const props = __props;
    const { isRTL } = useI18n();
    ref(null);
    const currentFrameIndex = ref(0);
    const isAutoSpinning = ref(false);
    const showHint = ref(true);
    const isLoading = ref(true);
    const loadedCount = ref(0);
    const totalFrames = computed(() => {
      var _a;
      return ((_a = props.frames) == null ? void 0 : _a.length) || 0;
    });
    const currentFrameUrl = computed(() => {
      var _a, _b;
      if (!props.frames || props.frames.length === 0) return "";
      return ((_a = props.frames[currentFrameIndex.value]) == null ? void 0 : _a.url) || ((_b = props.frames[0]) == null ? void 0 : _b.url) || "";
    });
    const loadPercentage = computed(() => {
      if (totalFrames.value === 0) return 100;
      return Math.min(100, Math.round(loadedCount.value / totalFrames.value * 100));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none" }, _attrs))}><div class="relative aspect-16/10 sm:aspect-16/9 w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden">`);
      if (unref(currentFrameUrl)) {
        _push(`<img${ssrRenderAttr("src", unref(currentFrameUrl))}${ssrRenderAttr("alt", `360 View Frame ${unref(currentFrameIndex) + 1}`)} class="w-full h-full object-contain pointer-events-none transition-transform">`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading)) {
        _push(`<div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30 text-white">`);
        _push(ssrRenderComponent(unref(Loader2), { class: "w-10 h-10 text-sky-400 animate-spin mb-3" }, null, _parent));
        _push(`<span class="text-sm font-bold tracking-wide">${ssrInterpolate(unref(isRTL) ? "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A 360\xB0..." : "Loading 360\xB0 Interactive Experience...")}</span><div class="w-48 h-2 bg-slate-800 rounded-full mt-3 overflow-hidden"><div class="h-full bg-sky-400 transition-all duration-150" style="${ssrRenderStyle({ width: `${unref(loadPercentage)}%` })}"></div></div><span class="text-xs text-slate-400 mt-1 font-mono">${ssrInterpolate(unref(loadPercentage))}%</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showHint) && !unref(isLoading)) {
        _push(`<div class="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none z-20 animate-bounce"><div class="px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-2 shadow-lg">`);
        _push(ssrRenderComponent(unref(MoveHorizontal), { class: "w-4 h-4 text-sky-400" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0627\u0633\u062D\u0628 \u0644\u062A\u062F\u0648\u064A\u0631 \u0627\u0644\u0633\u064A\u0627\u0631\u0629 360 \u062F\u0631\u062C\u0629" : "Drag or swipe to rotate car 360\xB0")}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 gap-4"><div class="flex items-center gap-3"><button class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition-colors"${ssrRenderAttr("title", unref(isAutoSpinning) ? "Pause rotation" : "Auto-spin")}>`);
      if (unref(isAutoSpinning)) {
        _push(ssrRenderComponent(unref(Pause), { class: "w-3.5 h-3.5 text-amber-400" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Play), { class: "w-3.5 h-3.5 text-sky-400" }, null, _parent));
      }
      _push(`<span class="hidden sm:inline">${ssrInterpolate(unref(isAutoSpinning) ? unref(isRTL) ? "\u0625\u064A\u0642\u0627\u0641" : "Pause" : unref(isRTL) ? "\u062F\u0648\u0631\u0627\u0646 \u062A\u0644\u0642\u0627\u0626\u064A" : "Auto Spin")}</span></button><button class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5" title="Reset to front angle">`);
      _push(ssrRenderComponent(unref(RotateCcw), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(`<span class="hidden sm:inline">${ssrInterpolate(unref(isRTL) ? "\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637" : "Reset")}</span></button></div><div class="flex-1 max-w-xs flex items-center gap-2"><span class="text-[10px] font-mono text-slate-400">1</span><input${ssrRenderAttr("value", unref(currentFrameIndex))} type="range" min="0"${ssrRenderAttr("max", unref(totalFrames) - 1)} class="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"><span class="text-[10px] font-mono text-slate-400">${ssrInterpolate(unref(totalFrames))}</span></div><div class="text-[11px] font-mono text-slate-400 hidden sm:block">${ssrInterpolate(unref(currentFrameIndex) + 1)} / ${ssrInterpolate(unref(totalFrames))}</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThreesixtyViewer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CarGallery",
  __ssrInlineRender: true,
  props: {
    images: {},
    threesixtyFrames: {},
    title: {}
  },
  setup(__props) {
    const props = __props;
    const { isRTL } = useI18n();
    const activeMode = ref("photos");
    const selectedIndex = ref(0);
    const has360 = computed(() => {
      return Array.isArray(props.threesixtyFrames) && props.threesixtyFrames.length > 0;
    });
    const currentImage = computed(() => {
      var _a, _b;
      if (props.images && props.images.length > 0) {
        return ((_a = props.images[selectedIndex.value]) == null ? void 0 : _a.url) || ((_b = props.images[0]) == null ? void 0 : _b.url);
      }
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThreesixtyViewer = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (unref(has360)) {
        _push(`<div class="flex items-center gap-2"><button class="${ssrRenderClass([unref(activeMode) === "photos" ? "bg-primary text-white shadow-sm" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50", "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"])}">`);
        _push(ssrRenderComponent(unref(ImageIcon), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631" : "Photo Gallery")} (${ssrInterpolate(__props.images.length)})</span></button><button class="${ssrRenderClass([unref(activeMode) === "360" ? "bg-slate-900 text-sky-400 shadow-md ring-2 ring-sky-400/20" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50", "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"])}">`);
        _push(ssrRenderComponent(unref(Rotate3d), { class: "w-4 h-4 text-sky-400" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0639\u0631\u0636 \u062A\u0641\u0627\u0639\u0644\u064A 360\xB0" : "Interactive 360\xB0 View")}</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeMode) === "360" && unref(has360)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_ThreesixtyViewer, { frames: __props.threesixtyFrames }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-3"><div class="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group"><img${ssrRenderAttr("src", unref(currentImage))}${ssrRenderAttr("alt", __props.title)} class="w-full h-full object-cover object-center transition-all duration-300">`);
        if (__props.images.length > 1) {
          _push(`<button class="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100" aria-label="Previous image">`);
          _push(ssrRenderComponent(unref(ChevronLeft), { class: "w-5 h-5 rtl:rotate-180" }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.images.length > 1) {
          _push(`<button class="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100" aria-label="Next image">`);
          _push(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5 rtl:rotate-180" }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute bottom-3 end-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-xs font-mono backdrop-blur-xs">${ssrInterpolate(unref(selectedIndex) + 1)} / ${ssrInterpolate(__props.images.length)}</div></div>`);
        if (__props.images.length > 1) {
          _push(`<div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"><!--[-->`);
          ssrRenderList(__props.images, (img, idx) => {
            _push(`<button class="${ssrRenderClass([unref(selectedIndex) === idx ? "border-primary ring-2 ring-primary/20 scale-95" : "border-transparent opacity-70 hover:opacity-100", "relative w-20 sm:w-24 aspect-16/10 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer"])}"><img${ssrRenderAttr("src", img.url)} class="w-full h-full object-cover"></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CarGallery.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BookingModal",
  __ssrInlineRender: true,
  props: {
    car: {},
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { isRTL, t } = useI18n();
    const { formatPrice } = useCurrency();
    const isSubmitting = ref(false);
    const isSuccess = ref(false);
    const bookingHash = ref("");
    const form = ref({
      firstName: "",
      lastName: "",
      phone: "079",
      email: "",
      paymentMethod: "mastercard",
      agreeTerms: true
    });
    const whatsappUrl = computed(() => {
      var _a;
      const carName = ((_a = props.car) == null ? void 0 : _a.name_api) || "Car";
      const text = encodeURIComponent(
        `Hello AKM Motor City, I have submitted a reservation for ${carName} (Booking ID: ${bookingHash.value}). Please contact me regarding the next steps.`
      );
      return `https://wa.me/96265777777?text=${text}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" }, _attrs))}><div class="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200"><div class="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">`);
        _push(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5" }, null, _parent));
        _push(`</div><div><h3 class="text-lg font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(isSuccess) ? unref(isRTL) ? "\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632 \u0628\u0646\u062C\u0627\u062D!" : "Reservation Confirmed!" : unref(t)("website_checkout_title", "Book & Reserve Vehicle"))}</h3><p class="text-xs text-slate-500">${ssrInterpolate(unref(isSuccess) ? unref(isRTL) ? "\u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0643\u0648\u062F \u0627\u0644\u062D\u062C\u0632 \u0648\u062A\u062B\u0628\u064A\u062A \u0637\u0644\u0628\u0643" : "Your booking code has been generated" : unref(isRTL) ? "\u062D\u062C\u0632 \u0641\u0648\u0631\u064A \u0644\u0644\u0633\u064A\u0627\u0631\u0629 \u0628\u062F\u0641\u0639\u0629 \u0645\u0642\u062F\u0645\u0629 100 \u062F\u064A\u0646\u0627\u0631 \u0641\u0642\u0637" : "Secure this car with an initial 100 JOD deposit")}</p></div></div><button class="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors">`);
        _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
        _push(`</button></div><div class="p-4 bg-slate-100/70 border-b border-slate-200 flex items-center gap-3"><img${ssrRenderAttr("src", (_b = (_a = __props.car.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.url)} class="w-16 h-12 object-cover rounded-lg bg-slate-200 shrink-0"><div class="flex-1 truncate"><h4 class="font-extrabold text-sm text-slate-900 truncate">${ssrInterpolate(unref(isRTL) && __props.car.name_ar ? __props.car.name_ar : __props.car.name_api)}</h4><div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5"><span>${ssrInterpolate(unref(isRTL) ? "\u0633\u0639\u0631 \u0627\u0644\u0633\u064A\u0627\u0631\u0629:" : "Vehicle Price:")}</span><span class="font-bold text-primary">${ssrInterpolate(unref(formatPrice)(__props.car.price))}</span></div></div><div class="text-end"><div class="text-[10px] text-slate-500 uppercase font-bold">${ssrInterpolate(unref(t)("website_checkout_booking_fee", "Booking Deposit"))}</div><div class="text-base font-black text-emerald-600">100 JOD</div></div></div>`);
        if (unref(isSuccess)) {
          _push(`<div class="p-6 text-center space-y-6"><div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">`);
          _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-10 h-10" }, null, _parent));
          _push(`</div><div><h4 class="text-xl font-black text-slate-900">${ssrInterpolate(unref(isRTL) ? "\u062A\u0647\u0627\u0646\u064A\u0646\u0627! \u062A\u0645 \u062D\u062C\u0632 \u0627\u0644\u0633\u064A\u0627\u0631\u0629 \u0644\u0643" : "Congratulations! Vehicle Reserved")}</h4><p class="text-xs text-slate-600 mt-1 max-w-sm mx-auto">${ssrInterpolate(unref(isRTL) ? "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0637\u0644\u0628 \u0627\u0644\u062D\u062C\u0632 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u0642\u0648\u0645 \u0645\u0633\u062A\u0634\u0627\u0631 \u0645\u0628\u064A\u0639\u0627\u062A AKM \u0628\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u062E\u0644\u0627\u0644 \u0633\u0627\u0639\u0627\u062A \u0644\u0625\u062A\u0645\u0627\u0645 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0648\u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645." : "Your booking has been registered. An AKM sales specialist will contact you shortly to coordinate final registration and pickup.")}</p></div><div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-start space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632 \u0627\u0644\u0645\u0631\u062C\u0639\u064A:" : "Booking Reference:")}</span><span class="font-mono font-black text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-md">${ssrInterpolate(unref(bookingHash))}</span></div><div class="flex items-center justify-between text-xs"><span class="text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0627\u0633\u0645:" : "Customer Name:")}</span><span class="font-bold text-slate-800">${ssrInterpolate(unref(form).firstName)} ${ssrInterpolate(unref(form).lastName)}</span></div><div class="flex items-center justify-between text-xs"><span class="text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0647\u0627\u062A\u0641:" : "Phone:")}</span><span class="font-mono font-bold text-slate-800">${ssrInterpolate(unref(form).phone)}</span></div></div><div class="space-y-2"><a${ssrRenderAttr("href", unref(whatsappUrl))} target="_blank" class="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">`);
          _push(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5" }, null, _parent));
          _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0625\u0631\u0633\u0627\u0644 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628" : "Confirm via WhatsApp Now")}</span></a><button class="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800">${ssrInterpolate(unref(isRTL) ? "\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0645\u0639\u0631\u0636" : "Close and return to inventory")}</button></div></div>`);
        } else {
          _push(`<form class="p-6 space-y-4"><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-bold text-slate-700 mb-1">${ssrInterpolate(unref(t)("website_checkout_first_name", "First Name"))} * </label><input${ssrRenderAttr("value", unref(form).firstName)} type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800" placeholder="e.g. Ahmad"></div><div><label class="block text-xs font-bold text-slate-700 mb-1">${ssrInterpolate(unref(t)("website_checkout_last_name", "Last Name"))} * </label><input${ssrRenderAttr("value", unref(form).lastName)} type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800" placeholder="e.g. Al-Khayyat"></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><label class="block text-xs font-bold text-slate-700 mb-1">${ssrInterpolate(unref(t)("website_checkout_phone", "Phone Number (Jordan)"))} * </label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" required dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800 font-mono" placeholder="079XXXXXXX"></div><div><label class="block text-xs font-bold text-slate-700 mb-1">${ssrInterpolate(unref(t)("website_checkout_email", "Email Address"))}</label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800" placeholder="name@example.com"></div></div><div><label class="block text-xs font-bold text-slate-700 mb-1.5">${ssrInterpolate(unref(t)("website_checkout_payment_method", "Preferred Payment Method"))}</label><div class="grid grid-cols-3 gap-2"><button type="button" class="${ssrRenderClass([unref(form).paymentMethod === "mastercard" ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20" : "border-slate-200 hover:bg-slate-50 text-slate-700", "p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all"])}">`);
          _push(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5 text-amber-500" }, null, _parent));
          _push(`<span>Mastercard / Visa</span></button><button type="button" class="${ssrRenderClass([unref(form).paymentMethod === "apple_pay" ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20" : "border-slate-200 hover:bg-slate-50 text-slate-700", "p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all"])}">`);
          _push(ssrRenderComponent(unref(Wallet), { class: "w-5 h-5 text-slate-800" }, null, _parent));
          _push(`<span>Apple Pay</span></button><button type="button" class="${ssrRenderClass([unref(form).paymentMethod === "whatsapp" ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300" : "border-slate-200 hover:bg-slate-50 text-slate-700", "p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all"])}">`);
          _push(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5 text-emerald-600" }, null, _parent));
          _push(`<span>WhatsApp Booking</span></button></div></div><div class="flex items-start gap-2 pt-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).agreeTerms) ? ssrLooseContain(unref(form).agreeTerms, null) : unref(form).agreeTerms) ? " checked" : ""} type="checkbox" id="terms-check" required class="w-4 h-4 rounded text-primary focus:ring-primary mt-0.5 accent-primary cursor-pointer"><label for="terms-check" class="text-xs text-slate-600 leading-snug cursor-pointer">${ssrInterpolate(unref(isRTL) ? "\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 " : "I agree to the ")} `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/terms_conditions",
            target: "_blank",
            class: "text-primary font-bold hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("website_terms_conditions", "Terms & Conditions"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("website_terms_conditions", "Terms & Conditions")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` ${ssrInterpolate(unref(isRTL) ? " \u0648\u0642\u0648\u0627\u0639\u062F \u062D\u062C\u0632 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0644\u062F\u0649 AKM Motor City." : " and vehicle reservation policies of AKM Motor City.")}</label></div><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">`);
          if (unref(isSubmitting)) {
            _push(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin" }, null, _parent));
          } else {
            _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632 \u0627\u0644\u0622\u0646 (100 \u062F\u064A\u0646\u0627\u0631)" : "Confirm Booking Deposit (100 JOD)")}</span>`);
          }
          _push(`</button></form>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const route = useRoute();
    const carId = parseInt(route.params.id || "0");
    const { isRTL, t } = useI18n();
    const { formatPrice } = useCurrency();
    const { isFavorite } = useFavorites();
    const { isComparing } = useCompare();
    const isBookingOpen = ref(false);
    const car = computed(() => {
      return siteData.cars.find((c) => c.id === carId);
    });
    if (!car.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Car not found"
      });
    }
    const carTitle = computed(() => {
      var _a2, _b;
      if (isRTL.value && ((_a2 = car.value) == null ? void 0 : _a2.name_ar)) return car.value.name_ar;
      return ((_b = car.value) == null ? void 0 : _b.name_api) || "Car";
    });
    const brandName = computed(() => {
      var _a2, _b, _c;
      return ((_c = (_b = (_a2 = car.value) == null ? void 0 : _a2.attributes) == null ? void 0 : _b.find((a) => a.name === "Brand")) == null ? void 0 : _c.value) || "AKM";
    });
    const modelYear = computed(() => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = car.value) == null ? void 0 : _a2.extra_attributes) == null ? void 0 : _b.find((a) => a.name === "Model Year")) == null ? void 0 : _c.value;
    });
    const getAttr = (name) => {
      var _a2, _b, _c;
      return ((_c = (_b = (_a2 = car.value) == null ? void 0 : _a2.attributes) == null ? void 0 : _b.find((a) => a.name === name)) == null ? void 0 : _c.value) || "\u2014";
    };
    const getExtraAttr = (name) => {
      var _a2, _b, _c;
      return ((_c = (_b = (_a2 = car.value) == null ? void 0 : _a2.extra_attributes) == null ? void 0 : _b.find((a) => a.name === name)) == null ? void 0 : _c.value) || "\u2014";
    };
    const relatedCars = computed(() => {
      const currentBrand = brandName.value;
      const currentBody = getAttr("Body");
      return siteData.cars.filter((c) => {
        var _a2, _b, _c, _d;
        return c.id !== carId && (((_b = (_a2 = c.attributes) == null ? void 0 : _a2.find((a) => a.name === "Brand")) == null ? void 0 : _b.value) === currentBrand || ((_d = (_c = c.attributes) == null ? void 0 : _c.find((a) => a.name === "Body")) == null ? void 0 : _d.value) === currentBody);
      }).slice(0, 4);
    });
    const whatsappInquiryUrl = computed(() => {
      const text = encodeURIComponent(
        `Hello AKM Motor City, I am interested in ${carTitle.value} (ID: ${carId}). Please provide more details and availability.`
      );
      return `https://wa.me/96265777777?text=${text}`;
    });
    useSeoMeta({
      title: `${carTitle.value} | AKM Motor City Jordan`,
      description: (_a = car.value) == null ? void 0 : _a.description_api
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CarGallery = _sfc_main$2;
      const _component_CarCard = __nuxt_component_2;
      const _component_BookingModal = _sfc_main$1;
      if (unref(car)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-2 text-xs text-slate-500 truncate">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-primary transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("website_car_details_home", "Home"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("website_car_details_home", "Home")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span>/</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/cars",
          class: "hover:text-primary transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("website_car_details_the_cars", "Models"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("website_car_details_the_cars", "Models")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span>/</span><span class="text-slate-900 font-bold truncate">${ssrInterpolate(unref(carTitle))}</span></div><div class="flex items-center gap-2 shrink-0"><button class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"${ssrRenderAttr("title", unref(isRTL) ? "\u0645\u0634\u0627\u0631\u0643\u0629 \u0631\u0627\u0628\u0637 \u0627\u0644\u0633\u064A\u0627\u0631\u0629" : "Share link")}>`);
        _push(ssrRenderComponent(unref(Share2), { class: "w-3.5 h-3.5 text-primary" }, null, _parent));
        _push(`<span class="hidden sm:inline">${ssrInterpolate(unref(isRTL) ? "\u0645\u0634\u0627\u0631\u0643\u0629" : "Share")}</span></button><button class="${ssrRenderClass([unref(isComparing)(unref(car).id) ? "bg-primary text-white border-primary" : "border-slate-200 text-slate-700 hover:bg-slate-50", "px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors"])}">`);
        _push(ssrRenderComponent(unref(ArrowLeftRight), { class: "w-3.5 h-3.5" }, null, _parent));
        _push(`<span class="hidden sm:inline">${ssrInterpolate(unref(isComparing)(unref(car).id) ? unref(isRTL) ? "\u0641\u064A \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629" : "In Compare" : unref(isRTL) ? "\u0645\u0642\u0627\u0631\u0646\u0629" : "Compare")}</span></button><button class="${ssrRenderClass([unref(isFavorite)(unref(car).id) ? "text-rose-500 bg-rose-50 border-rose-200" : "", "p-2 rounded-xl border border-slate-200 text-slate-700 hover:text-rose-500 hover:bg-slate-50 transition-colors"])}">`);
        _push(ssrRenderComponent(unref(Heart), {
          class: ["w-4 h-4", unref(isFavorite)(unref(car).id) ? "fill-rose-500" : ""]
        }, null, _parent));
        _push(`</button></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"><div class="lg:col-span-7">`);
        _push(ssrRenderComponent(_component_CarGallery, {
          images: unref(car).images || [],
          threesixtyFrames: unref(car).threesixty || [],
          title: unref(carTitle)
        }, null, _parent));
        _push(`</div><div class="lg:col-span-5"><div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card sticky top-28 space-y-6"><div class="flex items-center justify-between"><span class="${ssrRenderClass([unref(car).is_used ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-emerald-600 text-white", "px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider"])}">${ssrInterpolate(unref(car).is_used ? unref(isRTL) ? "\u0645\u0633\u062A\u0639\u0645\u0644 \u0648\u0645\u0641\u062D\u0648\u0635" : "Certified Pre-Owned" : unref(isRTL) ? "\u0633\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 0 \u0643\u0645" : "Brand New (0 KM)")}</span>`);
        if (unref(modelYear)) {
          _push(`<span class="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">${ssrInterpolate(unref(isRTL) ? `\u0645\u0648\u062F\u064A\u0644 ${unref(modelYear)}` : `Model Year ${unref(modelYear)}`)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">${ssrInterpolate(unref(brandName))}</div><h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">${ssrInterpolate(unref(carTitle))}</h1></div><div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1"><div class="text-xs font-medium text-slate-500">${ssrInterpolate(unref(t)("website_car_details_car_price", "Vehicle Cash Price"))}</div><div class="text-3xl font-black text-primary tracking-tight">`);
        if (unref(car).show_price && unref(car).price) {
          _push(`<span>${ssrInterpolate(unref(formatPrice)(unref(car).price))}</span>`);
        } else {
          _push(`<span class="text-xl text-slate-700">${ssrInterpolate(unref(t)("website_car_price_on_request", "Price on Request"))}</span>`);
        }
        _push(`</div><div class="text-xs text-slate-500 flex items-center gap-1.5 pt-1">`);
        _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4 text-emerald-600 shrink-0" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u064A\u0634\u0645\u0644 \u0641\u062D\u0635 \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0634\u0627\u0645\u0644 \u0648\u0636\u0645\u0627\u0646 AKM \u0627\u0644\u0645\u0639\u062A\u0645\u062F" : "Includes multi-point vehicle inspection & AKM warranty")}</span></div></div>`);
        if (unref(car).is_full) {
          _push(`<div class="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(AlertCircle), { class: "w-4 h-4 shrink-0" }, null, _parent));
          _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0647\u0630\u0647 \u0627\u0644\u0633\u064A\u0627\u0631\u0629 \u0645\u062D\u062C\u0648\u0632\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u062D\u0627\u0644\u064A\u0627\u064B. \u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0644\u0645\u0639\u0631\u0641\u0629 \u0645\u0648\u0639\u062F \u062A\u0648\u0641\u0631 \u062F\u0641\u0639\u0629 \u062C\u062F\u064A\u062F\u0629." : "This vehicle is currently fully booked. Contact us for incoming batches.")}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-3 pt-2"><button${ssrIncludeBooleanAttr(unref(car).is_full) ? " disabled" : ""} class="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm sm:text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group">`);
        _push(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5 group-hover:scale-110 transition-transform" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646 \u0623\u0648\u0646\u0644\u0627\u064A\u0646 (\u062F\u0641\u0639\u0629 100 \u062F\u064A\u0646\u0627\u0631 \u0641\u0642\u0637)" : "Book Online (100 JOD Deposit Only)")}</span></button><a${ssrRenderAttr("href", unref(whatsappInquiryUrl))} target="_blank" class="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">`);
        _push(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(t)("website_car_whatsapp_inquire", "Inquire via WhatsApp"))}</span></a></div><p class="text-[11px] text-slate-400 text-center leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u0645\u0628\u0644\u063A \u0627\u0644\u0640 100 \u062F\u064A\u0646\u0627\u0631 \u064A\u064F\u0639\u062F \u062F\u0641\u0639\u0629 \u062D\u062C\u0632 \u0623\u0648\u0644\u064A\u0629 \u062A\u064F\u062E\u0635\u0645 \u0645\u0646 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0644\u0644\u0633\u064A\u0627\u0631\u0629 \u0639\u0646\u062F \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621." : "The 100 JOD reservation fee is deducted from the final purchase price upon closing.")}</p></div></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"><div class="lg:col-span-8 space-y-10"><div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4"><h2 class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(FileText), { class: "w-5 h-5 text-primary" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(t)("website_car_details_description", "Vehicle Overview & Description"))}</span></h2><p class="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">${ssrInterpolate(unref(isRTL) && unref(car).description_ar ? unref(car).description_ar : unref(car).description_api)}</p></div><div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"><h2 class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(SlidersHorizontal), { class: "w-5 h-5 text-primary" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(t)("website_car_details_car_specifications", "Technical Specifications"))}</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("website_car_details_brand", "Brand"))}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(unref(brandName))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639" : "Model Year")}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(unref(modelYear) || "\u2014")}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("website_car_details_body", "Body Shape"))}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getAttr("Body"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("website_car_details_engine_type", "Engine Type"))}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getAttr("Engine Type"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0646\u0627\u0642\u0644 \u0627\u0644\u062D\u0631\u0643\u0629" : "Transmission")}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getAttr("Transmission"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0646\u0638\u0627\u0645 \u0627\u0644\u062F\u0641\u0639" : "Drive Type")}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getAttr("Drive Type"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("website_car_details_wheel_type", "Wheel Type"))}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getAttr("Wheel Type"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0642\u0648\u0629 \u0648\u0627\u0644\u0623\u062F\u0627\u0621" : "Horsepower / Performance")}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getExtraAttr("Performance"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0641\u0631\u0634 \u0627\u0644\u0645\u0642\u0627\u0639\u062F" : "Upholstery Material")}</span><span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getExtraAttr("Upholstery Material"))}</span></div><div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between"><span class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u062E\u0627\u0631\u062C\u064A" : "Exterior Color")}</span><div class="flex items-center gap-2">`);
        if ((_a2 = getExtraAttr("Exterior Color")) == null ? void 0 : _a2.startsWith("#")) {
          _push(`<span class="w-4 h-4 rounded-full border border-slate-300 shadow-2xs" style="${ssrRenderStyle({ backgroundColor: getExtraAttr("Exterior Color") })}"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-xs sm:text-sm font-black text-slate-800">${ssrInterpolate(getExtraAttr("Exterior Color"))}</span></div></div></div></div>`);
        if (unref(car).features && unref(car).features.length > 0) {
          _push(`<div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"><h2 class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-5 h-5 text-emerald-600" }, null, _parent));
          _push(`<span>${ssrInterpolate(unref(t)("website_car_details_features", "Included Features & Equipment"))} (${ssrInterpolate(unref(car).features.length)})</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"><!--[-->`);
          ssrRenderList(unref(car).features, (f) => {
            _push(`<div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">`);
            _push(ssrRenderComponent(unref(Check), { class: "w-4 h-4 text-emerald-600 shrink-0" }, null, _parent));
            _push(`<span class="truncate">${ssrInterpolate(unref(isRTL) && f.name_ar ? f.name_ar : f.name_api)}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-4 space-y-6"><div class="bg-gradient-to-br from-primary to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4"><div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-6 h-6 text-sky-300" }, null, _parent));
        _push(`</div><h3 class="text-lg font-black tracking-tight">${ssrInterpolate(unref(isRTL) ? "\u0643\u0641\u0627\u0644\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0648\u0645\u0631\u0643\u0632 \u062E\u062F\u0645\u0629 \u0627\u0644\u0628\u064A\u0627\u062F\u0631" : "AKM Certified Warranty & Service")}</h3><p class="text-xs text-slate-300 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u062A\u062E\u0636\u0639 \u062C\u0645\u064A\u0639 \u0633\u064A\u0627\u0631\u0627\u062A\u0646\u0627 \u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0636\u0645\u0627\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0645\u0639 \u062E\u062F\u0645\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0648\u062A\u0648\u0641\u064A\u0631 \u0642\u0637\u0639 \u0627\u0644\u063A\u064A\u0627\u0631 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0641\u064A \u0645\u0631\u0643\u0632 \u062E\u062F\u0645\u0629 \u0627\u0644\u0628\u064A\u0627\u062F\u0631." : "All vehicles come with verified warranty coverage and post-sale support backed by our official Bayader service center.")}</p><div class="pt-2 text-xs text-sky-200 font-bold flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(Phone), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>0791663333</span></div></div><div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3"><h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4 text-primary" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0639\u0631\u0636 \u0648\u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0627\u0644\u062D\u064A\u0629" : "Showroom Inspection")}</span></h4><p class="text-xs text-slate-600 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u062A\u0641\u0636\u0644 \u0628\u0632\u064A\u0627\u0631\u0629 \u0645\u0639\u0631\u0636\u0646\u0627 \u0641\u064A \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0628\u064A\u0627\u062F\u0631 - \u0639\u0645\u0651\u0627\u0646 \u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0633\u064A\u0627\u0631\u0629 \u0648\u062A\u062C\u0631\u0628\u0629 \u0642\u064A\u0627\u062F\u062A\u0647\u0627." : "Visit our flagship showroom in Bayader - Amman to inspect the vehicle and book a test drive.")}</p><a href="https://maps.google.com/?q=AKM+Motor+City+Amman" target="_blank" class="inline-block text-xs font-bold text-primary hover:underline">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0639\u0628\u0631 \u062E\u0631\u0627\u0626\u0637 Google" : "Open in Google Maps")} \u2192 </a></div></div></div>`);
        if (unref(relatedCars).length > 0) {
          _push(`<div class="pt-8 border-t border-slate-200"><div class="mb-8"><h3 class="text-2xl font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(t)("website_car_details_vehicles_for_you", "Related Vehicles You May Like"))}</h3><p class="text-xs sm:text-sm text-slate-500 mt-1">${ssrInterpolate(unref(isRTL) ? "\u062E\u064A\u0627\u0631\u0627\u062A \u0645\u0645\u0627\u062B\u0644\u0629 \u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0641\u0626\u0629 \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629" : "Alternative options with similar attributes and price points")}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
          ssrRenderList(unref(relatedCars), (rc) => {
            _push(ssrRenderComponent(_component_CarCard, {
              key: rc.id,
              car: rc
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_BookingModal, {
          car: unref(car),
          isOpen: unref(isBookingOpen),
          onClose: ($event) => isBookingOpen.value = false
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cars/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CZD5RyBo.mjs.map
