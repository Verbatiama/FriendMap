//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, r, i, a, o = t((() => {
	r = globalThis, globalThis.document, i = globalThis.process || {}, globalThis.console, a = globalThis.navigator || {};
}));
//#endregion
//#region node_modules/@probe.gl/env/dist/lib/is-electron.js
function s(e) {
	if (typeof window < "u" && window.process?.type === "renderer" || typeof process < "u" && process.versions?.electron) return !0;
	let t = typeof navigator < "u" && navigator.userAgent, n = e || t;
	return !!(n && n.indexOf("Electron") >= 0);
}
var c = t((() => {}));
//#endregion
//#region node_modules/@probe.gl/env/dist/lib/is-browser.js
function l() {
	return !(typeof process == "object" && String(process) === "[object process]" && !process?.browser) || s();
}
var u = t((() => {
	c();
}));
//#endregion
//#region node_modules/@probe.gl/env/dist/lib/get-browser.js
function d(e) {
	return !e && !l() ? "Node" : s(e) ? "Electron" : (e || a.userAgent || "").indexOf("Edge") > -1 ? "Edge" : globalThis.chrome ? "Chrome" : globalThis.safari ? "Safari" : globalThis.mozInnerScreenX ? "Firefox" : "Unknown";
}
var f = t((() => {
	u(), c(), o();
})), p, m = t((() => {
	o(), u(), f(), p = "4.1.2";
}));
//#endregion
//#region node_modules/@probe.gl/log/dist/utils/assert.js
function h(e, t) {
	if (!e) throw Error(t || "Assertion failed");
}
var g = t((() => {}));
//#endregion
//#region node_modules/@probe.gl/log/dist/loggers/log-utils.js
function _(e) {
	if (!e) return 0;
	let t;
	switch (typeof e) {
		case "number":
			t = e;
			break;
		case "object":
			t = e.logLevel || e.priority || 0;
			break;
		default: return 0;
	}
	return h(Number.isFinite(t) && t >= 0), t;
}
function v(e) {
	let { logLevel: t, message: n } = e;
	e.logLevel = _(t);
	let r = e.args ? Array.from(e.args) : [];
	for (; r.length && r.shift() !== n;);
	switch (typeof t) {
		case "string":
		case "function":
			n !== void 0 && r.unshift(n), e.message = t;
			break;
		case "object": Object.assign(e, t);
	}
	typeof e.message == "function" && (e.message = e.message());
	let i = typeof e.message;
	return h(i === "string" || i === "object"), Object.assign(e, { args: r }, e.opts);
}
var y = t((() => {
	g();
})), b, x, S = t((() => {
	y(), b = () => {}, x = class {
		constructor({ level: e = 0 } = {}) {
			this.userData = {}, this._onceCache = /* @__PURE__ */ new Set(), this._level = e;
		}
		set level(e) {
			this.setLevel(e);
		}
		get level() {
			return this.getLevel();
		}
		setLevel(e) {
			return this._level = e, this;
		}
		getLevel() {
			return this._level;
		}
		warn(e, ...t) {
			return this._log("warn", 0, e, t, { once: !0 });
		}
		error(e, ...t) {
			return this._log("error", 0, e, t);
		}
		log(e, t, ...n) {
			return this._log("log", e, t, n);
		}
		info(e, t, ...n) {
			return this._log("info", e, t, n);
		}
		once(e, t, ...n) {
			return this._log("once", e, t, n, { once: !0 });
		}
		_log(e, t, n, r, i = {}) {
			let a = v({
				logLevel: t,
				message: n,
				args: this._buildArgs(t, n, r),
				opts: i
			});
			return this._createLogFunction(e, a, i);
		}
		_buildArgs(e, t, n) {
			return [
				e,
				t,
				...n
			];
		}
		_createLogFunction(e, t, n) {
			if (!this._shouldLog(t.logLevel)) return b;
			let r = this._getOnceTag(n.tag ?? t.tag ?? t.message);
			if ((n.once || t.once) && r !== void 0) {
				if (this._onceCache.has(r)) return b;
				this._onceCache.add(r);
			}
			return this._emit(e, t);
		}
		_shouldLog(e) {
			return this.getLevel() >= _(e);
		}
		_getOnceTag(e) {
			if (e !== void 0) try {
				return typeof e == "string" ? e : String(e);
			} catch {
				return;
			}
		}
	};
}));
//#endregion
//#region node_modules/@probe.gl/log/dist/utils/local-storage.js
function C(e) {
	try {
		let t = window[e], n = "__storage_test__";
		return t.setItem(n, n), t.removeItem(n), t;
	} catch {
		return null;
	}
}
var w, T = t((() => {
	w = class {
		constructor(e, t, n = "sessionStorage") {
			this.storage = C(n), this.id = e, this.config = t, this._loadConfiguration();
		}
		getConfiguration() {
			return this.config;
		}
		setConfiguration(e) {
			if (Object.assign(this.config, e), this.storage) {
				let e = JSON.stringify(this.config);
				this.storage.setItem(this.id, e);
			}
		}
		_loadConfiguration() {
			let e = {};
			if (this.storage) {
				let t = this.storage.getItem(this.id);
				e = t ? JSON.parse(t) : {};
			}
			return Object.assign(this.config, e), this;
		}
	};
}));
//#endregion
//#region node_modules/@probe.gl/log/dist/utils/formatters.js
function E(e) {
	let t;
	return t = e < 10 ? `${e.toFixed(2)}ms` : e < 100 ? `${e.toFixed(1)}ms` : e < 1e3 ? `${e.toFixed(0)}ms` : `${(e / 1e3).toFixed(2)}s`, t;
}
function ee(e, t = 8) {
	let n = Math.max(t - e.length, 0);
	return `${" ".repeat(n)}${e}`;
}
var te = t((() => {}));
//#endregion
//#region node_modules/@probe.gl/log/dist/utils/color.js
function ne(e) {
	return typeof e == "string" ? (e = e.toUpperCase(), re[e] || re.WHITE) : e;
}
function D(e, t, n) {
	return !l && typeof e == "string" && (t && (e = `\u001b[${ne(t)}m${e}\u001b[39m`), n && (e = `\u001b[${ne(n) + ie}m${e}\u001b[49m`)), e;
}
var re, ie, ae = t((() => {
	m(), (function(e) {
		e[e.BLACK = 30] = "BLACK", e[e.RED = 31] = "RED", e[e.GREEN = 32] = "GREEN", e[e.YELLOW = 33] = "YELLOW", e[e.BLUE = 34] = "BLUE", e[e.MAGENTA = 35] = "MAGENTA", e[e.CYAN = 36] = "CYAN", e[e.WHITE = 37] = "WHITE", e[e.BRIGHT_BLACK = 90] = "BRIGHT_BLACK", e[e.BRIGHT_RED = 91] = "BRIGHT_RED", e[e.BRIGHT_GREEN = 92] = "BRIGHT_GREEN", e[e.BRIGHT_YELLOW = 93] = "BRIGHT_YELLOW", e[e.BRIGHT_BLUE = 94] = "BRIGHT_BLUE", e[e.BRIGHT_MAGENTA = 95] = "BRIGHT_MAGENTA", e[e.BRIGHT_CYAN = 96] = "BRIGHT_CYAN", e[e.BRIGHT_WHITE = 97] = "BRIGHT_WHITE";
	})(re ||= {}), ie = 10;
}));
//#endregion
//#region node_modules/@probe.gl/log/dist/utils/autobind.js
function oe(e, t = ["constructor"]) {
	let n = Object.getPrototypeOf(e), r = Object.getOwnPropertyNames(n), i = e;
	for (let n of r) {
		let r = i[n];
		typeof r == "function" && (t.find((e) => n === e) || (i[n] = r.bind(e)));
	}
}
var se = t((() => {})), ce, le, ue = t((() => {
	m(), ce = class {
		getHighResolutionTimer() {
			let e;
			if (l() && r.performance) e = r?.performance?.now?.();
			else if ("hrtime" in i) {
				let t = i?.hrtime?.();
				e = t[0] * 1e3 + t[1] / 1e6;
			} else e = Date.now();
			return e;
		}
		getMemoryUsageMB() {
			let e = (r?.performance)?.memory?.usedJSHeapSize;
			return e == null ? null : Math.trunc(e / 1024 / 1024);
		}
	}, le = new ce(), globalThis.Probe = ce, globalThis.probe = le;
}));
//#endregion
//#region node_modules/@probe.gl/log/dist/loggers/probe-log.js
function de(e, t, n) {
	if (typeof t == "string") {
		let r = n.time ? ee(E(n.total)) : "";
		t = n.time ? `${e}: ${r}  ${t}` : `${e}: ${t}`, t = D(t, n.color, n.background);
	}
	return t;
}
function fe(e) {
	for (let t in e) for (let n in e[t]) return n || "untitled";
	return "empty";
}
var pe, me, he, ge = t((() => {
	m(), S(), T(), te(), ae(), se(), g(), ue(), y(), pe = {
		debug: l() && console.debug || console.log,
		log: console.log,
		info: console.info,
		warn: console.warn,
		error: console.error
	}, me = {
		enabled: !0,
		level: 0
	}, he = class extends x {
		constructor({ id: e } = { id: "" }) {
			super({ level: 0 }), this.VERSION = p, this._startTs = le.getHighResolutionTimer(), this._deltaTs = le.getHighResolutionTimer(), this.userData = {}, this.LOG_THROTTLE_TIMEOUT = 0, this.id = e, this.userData = {}, this._storage = new w(`__probe-${this.id}__`, { [this.id]: me }), this.timeStamp(`${this.id} started`), oe(this), Object.seal(this);
		}
		isEnabled() {
			return this._getConfiguration().enabled;
		}
		getLevel() {
			return this._getConfiguration().level;
		}
		getTotal() {
			return Number((le.getHighResolutionTimer() - this._startTs).toPrecision(10));
		}
		getDelta() {
			return Number((le.getHighResolutionTimer() - this._deltaTs).toPrecision(10));
		}
		set priority(e) {
			this.level = e;
		}
		get priority() {
			return this.level;
		}
		getPriority() {
			return this.level;
		}
		enable(e = !0) {
			return this._updateConfiguration({ enabled: e }), this;
		}
		setLevel(e) {
			return this._updateConfiguration({ level: e }), this;
		}
		get(e) {
			return this._getConfiguration()[e];
		}
		set(e, t) {
			this._updateConfiguration({ [e]: t });
		}
		settings() {
			console.table ? console.table(this._storage.config) : console.log(this._storage.config);
		}
		assert(e, t) {
			if (!e) throw Error(t || "Assertion failed");
		}
		warn(e, ...t) {
			return this._log("warn", 0, e, t, {
				method: pe.warn,
				once: !0
			});
		}
		error(e, ...t) {
			return this._log("error", 0, e, t, { method: pe.error });
		}
		deprecated(e, t) {
			return this.warn(`\`${e}\` is deprecated and will be removed \
in a later version. Use \`${t}\` instead`);
		}
		removed(e, t) {
			return this.error(`\`${e}\` has been removed. Use \`${t}\` instead`);
		}
		probe(e, t, ...n) {
			let r = le.getMemoryUsageMB();
			if (r !== null) {
				let e = `${r}MB `;
				typeof t == "function" ? t = () => `${e}${t()}` : typeof t == "string" && (t = `${e}${t}`);
			}
			return this._log("log", e, t, n, {
				method: pe.log,
				time: !0,
				once: !0
			});
		}
		log(e, t, ...n) {
			return this._log("log", e, t, n, { method: pe.debug });
		}
		info(e, t, ...n) {
			return this._log("info", e, t, n, { method: console.info });
		}
		once(e, t, ...n) {
			return this._log("once", e, t, n, {
				method: pe.debug || pe.info,
				once: !0
			});
		}
		table(e, t, n) {
			return t ? this._log("table", e, t, n && [n] || [], {
				method: console.table || b,
				tag: fe(t)
			}) : b;
		}
		time(e, t) {
			return this._log("time", e, t, [], { method: console.time ? console.time : console.info });
		}
		timeEnd(e, t) {
			return this._log("time", e, t, [], { method: console.timeEnd ? console.timeEnd : console.info });
		}
		timeStamp(e, t) {
			return this._log("time", e, t, [], { method: console.timeStamp || b });
		}
		group(e, t, n = { collapsed: !1 }) {
			let r = (n.collapsed ? console.groupCollapsed : console.group) || console.info;
			return this._log("group", e, t, [], { method: r });
		}
		groupCollapsed(e, t, n = {}) {
			return this.group(e, t, Object.assign({}, n, { collapsed: !0 }));
		}
		groupEnd(e) {
			return this._log("groupEnd", e, "", [], { method: console.groupEnd || b });
		}
		withGroup(e, t, n) {
			this.group(e, t)();
			try {
				n();
			} finally {
				this.groupEnd(e)();
			}
		}
		trace() {
			console.trace && console.trace();
		}
		_shouldLog(e) {
			return this.isEnabled() && super._shouldLog(e);
		}
		_emit(e, t) {
			let n = t.method;
			h(n), t.total = this.getTotal(), t.delta = this.getDelta(), this._deltaTs = le.getHighResolutionTimer();
			let r = de(this.id, t.message, t);
			return n.bind(console, r, ...t.args);
		}
		_getConfiguration() {
			return this._storage.config[this.id] || this._updateConfiguration(me), this._storage.config[this.id];
		}
		_updateConfiguration(e) {
			let t = this._storage.config[this.id] || { ...me };
			this._storage.setConfiguration({ [this.id]: {
				...t,
				...e
			} });
		}
	}, he.VERSION = p;
})), _e = t((() => {
	ue(), globalThis.probe || (globalThis.probe = le);
})), ve = t((() => {
	ue(), ge(), S(), ae(), T(), _e();
})), O, ye = t((() => {
	ve(), O = new he({ id: "luma.gl" });
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter/device-defaults.js
function be(e, t) {
	return e == null ? t !== void 0 && t !== "production" : !!e;
}
function xe() {
	return be(O.get("debug"), Se());
}
function Se() {
	let e = globalThis.process;
	if (e?.env) return e.env.NODE_ENV;
}
var Ce, we = t((() => {
	ye(), Ce = {
		id: null,
		powerPreference: "high-performance",
		failIfMajorPerformanceCaveat: !1,
		featureLevel: void 0,
		optionalFeatures: [],
		xrCompatible: !1,
		createCanvasContext: void 0,
		webgl: {},
		onError: (e, t) => {},
		onResize: (e, t) => {
			let [n, r] = e.getDevicePixelSize();
			O.log(1, `${e} resized => ${n}x${r}px`)();
		},
		onPositionChange: (e, t) => {
			let [n, r] = e.getPosition();
			O.log(1, `${e} repositioned => ${n},${r}`)();
		},
		onVisibilityChange: (e) => O.log(1, `${e} Visibility changed ${e.isVisible}`)(),
		onDevicePixelRatioChange: (e, t) => O.log(1, `${e} DPR changed ${t.oldRatio} => ${e.devicePixelRatio}`)(),
		debug: xe(),
		debugGPUTime: !1,
		debugShaders: O.get("debug-shaders") || void 0,
		debugFramebuffers: !!O.get("debug-framebuffers"),
		debugFactories: !!O.get("debug-factories"),
		debugWebGL: !!O.get("debug-webgl"),
		debugSpectorJS: void 0,
		debugSpectorJSUrl: void 0,
		_reuseDevices: !1,
		_cacheShaders: !0,
		_destroyShaders: !1,
		_cachePipelines: !0,
		_sharePipelines: !0,
		_destroyPipelines: !1,
		_initializeFeatures: !0,
		_disabledFeatures: { "compilation-status-async-webgl": !0 },
		_handle: void 0
	};
}));
//#endregion
//#region node_modules/@probe.gl/stats/dist/utils/hi-res-timestamp.js
function Te() {
	let e;
	if (typeof window < "u" && window.performance) e = window.performance.now();
	else if (typeof process < "u" && process.hrtime) {
		let t = process.hrtime();
		e = t[0] * 1e3 + t[1] / 1e6;
	} else e = Date.now();
	return e;
}
var Ee = t((() => {})), De, Oe = t((() => {
	Ee(), De = class {
		constructor(e, t) {
			this.sampleSize = 1, this.time = 0, this.count = 0, this.samples = 0, this.lastTiming = 0, this.lastSampleTime = 0, this.lastSampleCount = 0, this._count = 0, this._time = 0, this._samples = 0, this._startTime = 0, this._timerPending = !1, this.name = e, this.type = t, this.reset();
		}
		reset() {
			return this.time = 0, this.count = 0, this.samples = 0, this.lastTiming = 0, this.lastSampleTime = 0, this.lastSampleCount = 0, this._count = 0, this._time = 0, this._samples = 0, this._startTime = 0, this._timerPending = !1, this;
		}
		setSampleSize(e) {
			return this.sampleSize = e, this;
		}
		incrementCount() {
			return this.addCount(1), this;
		}
		decrementCount() {
			return this.subtractCount(1), this;
		}
		addCount(e) {
			return this._count += e, this._samples++, this._checkSampling(), this;
		}
		subtractCount(e) {
			return this._count -= e, this._samples++, this._checkSampling(), this;
		}
		addTime(e) {
			return this._time += e, this.lastTiming = e, this._samples++, this._checkSampling(), this;
		}
		timeStart() {
			return this._startTime = Te(), this._timerPending = !0, this;
		}
		timeEnd() {
			return this._timerPending && (this.addTime(Te() - this._startTime), this._timerPending = !1, this._checkSampling()), this;
		}
		getSampleAverageCount() {
			return this.sampleSize > 0 ? this.lastSampleCount / this.sampleSize : 0;
		}
		getSampleAverageTime() {
			return this.sampleSize > 0 ? this.lastSampleTime / this.sampleSize : 0;
		}
		getSampleHz() {
			return this.lastSampleTime > 0 ? this.sampleSize / (this.lastSampleTime / 1e3) : 0;
		}
		getAverageCount() {
			return this.samples > 0 ? this.count / this.samples : 0;
		}
		getAverageTime() {
			return this.samples > 0 ? this.time / this.samples : 0;
		}
		getHz() {
			return this.time > 0 ? this.samples / (this.time / 1e3) : 0;
		}
		_checkSampling() {
			this._samples === this.sampleSize && (this.lastSampleTime = this._time, this.lastSampleCount = this._count, this.count += this._count, this.time += this._time, this.samples += this._samples, this._time = 0, this._count = 0, this._samples = 0);
		}
	};
})), ke, Ae = t((() => {
	Oe(), ke = class {
		constructor(e) {
			this.stats = {}, this.id = e.id, this.stats = {}, this._initializeStats(e.stats), Object.seal(this);
		}
		get(e, t = "count") {
			return this._getOrCreate({
				name: e,
				type: t
			});
		}
		get size() {
			return Object.keys(this.stats).length;
		}
		reset() {
			for (let e of Object.values(this.stats)) e.reset();
			return this;
		}
		forEach(e) {
			for (let t of Object.values(this.stats)) e(t);
		}
		getTable() {
			let e = {};
			return this.forEach((t) => {
				e[t.name] = {
					time: t.time || 0,
					count: t.count || 0,
					average: t.getAverageTime() || 0,
					hz: t.getHz() || 0
				};
			}), e;
		}
		_initializeStats(e = []) {
			e.forEach((e) => this._getOrCreate(e));
		}
		_getOrCreate(e) {
			let { name: t, type: n } = e, r = this.stats[t];
			return r || (r = e instanceof De ? e : new De(t, n), this.stats[t] = r), r;
		}
	};
})), je = t((() => {
	Ae(), Oe(), Ee();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/stats-manager.js
function Me(e, t) {
	let n = e.stats, r = !1;
	for (let i of t) n[i] || (e.get(i), r = !0);
	let i = Object.keys(n).length, a = Fe.get(e);
	if (!r && a?.orderedStatNames === t && a.statCount === i) return;
	let o = {}, s = Ie.get(t);
	s || (s = new Set(t), Ie.set(t, s));
	for (let e of t) n[e] && (o[e] = n[e]);
	for (let [e, t] of Object.entries(n)) s.has(e) || (o[e] = t);
	for (let e of Object.keys(n)) delete n[e];
	Object.assign(n, o), Fe.set(e, {
		orderedStatNames: t,
		statCount: i
	});
}
var Ne, Pe, Fe, Ie, Le, Re, ze = t((() => {
	je(), Ne = "GPU Time and Memory", Pe = [
		"Adapter",
		"GPU",
		"GPU Type",
		"GPU Backend",
		"Frame Rate",
		"CPU Time",
		"GPU Time",
		"GPU Memory",
		"Buffer Memory",
		"Texture Memory",
		"External Buffer Memory",
		"External Texture Memory",
		"Swap Chain Texture"
	], Fe = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), Le = class {
		stats = /* @__PURE__ */ new Map();
		getStats(e) {
			return this.get(e);
		}
		get(e) {
			this.stats.has(e) || this.stats.set(e, new ke({ id: e }));
			let t = this.stats.get(e);
			return e === Ne && Me(t, Pe), t;
		}
	}, Re = new Le();
})), Be, Ve, He, Ue, We = t((() => {
	we(), ze(), ye(), Be = "set luma.log.level=1 (or higher) to trace rendering", Ve = "No matching device found. Ensure `@luma.gl/webgl` and/or `@luma.gl/webgpu` modules are imported.", He = class e {
		static defaultProps = {
			...Ce,
			type: "best-available",
			adapters: void 0,
			waitForPageLoad: !0
		};
		stats = Re;
		log = O;
		VERSION = "9.4.2";
		spector;
		preregisteredAdapters = /* @__PURE__ */ new Map();
		constructor() {
			if (globalThis.luma) {
				if (globalThis.luma.VERSION !== this.VERSION) throw O.error(`Found luma.gl ${globalThis.luma.VERSION} while initialzing ${this.VERSION}`)(), O.error("'yarn why @luma.gl/core' can help identify the source of the conflict")(), Error("luma.gl - multiple versions detected: see console log");
				O.error("This version of luma.gl has already been initialized")();
			}
			O.log(1, `${this.VERSION} - ${Be}`)(), globalThis.luma = this;
		}
		async createDevice(t = {}) {
			let n = {
				...e.defaultProps,
				...t
			}, r = this.selectAdapter(n.type, n.adapters);
			if (!r) throw Error(Ve);
			return n.waitForPageLoad && await r.pageLoaded, await r.create(n);
		}
		async attachDevice(e, t) {
			let n = this._getTypeFromHandle(e, t.adapters), r = n && this.selectAdapter(n, t.adapters);
			if (!r) throw Error(Ve);
			return await r?.attach?.(e, t);
		}
		registerAdapters(e) {
			for (let t of e) this.preregisteredAdapters.set(t.type, t);
		}
		getSupportedAdapters(e = []) {
			let t = this._getAdapterMap(e);
			return Array.from(t).map(([, e]) => e).filter((e) => e.isSupported?.()).map((e) => e.type);
		}
		getBestAvailableAdapterType(e = []) {
			let t = [
				"webgpu",
				"webgl",
				"null"
			], n = this._getAdapterMap(e);
			for (let e of t) if (n.get(e)?.isSupported?.()) return e;
			return null;
		}
		selectAdapter(e, t = []) {
			let n = e;
			e === "best-available" && (n = this.getBestAvailableAdapterType(t));
			let r = this._getAdapterMap(t);
			return n && r.get(n) || null;
		}
		enforceWebGL2(e = !0, t = []) {
			let n = this._getAdapterMap(t).get("webgl");
			n || O.warn("enforceWebGL2: webgl adapter not found")(), n?.enforceWebGL2?.(e);
		}
		setDefaultDeviceProps(t) {
			Object.assign(e.defaultProps, t);
		}
		_getAdapterMap(e = []) {
			let t = new Map(this.preregisteredAdapters);
			for (let n of e) t.set(n.type, n);
			return t;
		}
		_getTypeFromHandle(e, t = []) {
			return e instanceof WebGL2RenderingContext ? "webgl" : typeof GPUDevice < "u" && e instanceof GPUDevice || e?.queue ? "webgpu" : e === null ? "null" : (e instanceof WebGLRenderingContext ? O.warn("WebGL1 is not supported", e)() : O.warn("Unknown handle type", e)(), null);
		}
	}, Ue = new He();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter/adapter.js
function Ge() {
	return Ye ||= Je() || typeof window > "u" ? Promise.resolve() : new Promise((e) => window.addEventListener("load", () => e())), Ye;
}
var Ke, qe, Je, Ye, Xe = t((() => {
	m(), Ke = class {
		get pageLoaded() {
			return Ge();
		}
	}, qe = l() && typeof document < "u", Je = () => qe && document.readyState === "complete", Ye = null;
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/uid.js
function Ze(e = "id") {
	return Qe[e] = Qe[e] || 1, `${e}-${Qe[e]++}`;
}
var Qe, $e = t((() => {
	Qe = {};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter/resources/resource.js
function et(e, t) {
	let n = { ...t };
	for (let t in e) e[t] !== void 0 && (n[t] = e[t]);
	return n;
}
function tt(e, t) {
	let n = e.stats, r = !1;
	for (let i of t) n[i] || (e.get(i), r = !0);
	let i = Object.keys(n).length, a = gt.get(e);
	if (!r && a?.orderedStatNames === t && a.statCount === i) return;
	let o = {}, s = _t.get(t);
	s || (s = new Set(t), _t.set(t, s));
	for (let e of t) n[e] && (o[e] = n[e]);
	for (let [e, t] of Object.entries(n)) s.has(e) || (o[e] = t);
	for (let e of Object.keys(n)) delete n[e];
	Object.assign(n, o), gt.set(e, {
		orderedStatNames: t,
		statCount: i
	});
}
function nt(e) {
	return e.type === "webgl" ? ht : mt;
}
function rt(e) {
	let t = e.userData[ct];
	return t?.enabled ? t : null;
}
function it() {
	return globalThis.performance?.now?.() ?? Date.now();
}
function at(e, t) {
	let n = rt(e);
	if (n && n.activeDefaultFramebufferAcquireDepth) switch (n.transientCanvasResourceCreates = (n.transientCanvasResourceCreates || 0) + 1, t) {
		case "Texture":
			n.transientCanvasTextureCreates = (n.transientCanvasTextureCreates || 0) + 1;
			break;
		case "TextureView":
			n.transientCanvasTextureViewCreates = (n.transientCanvasTextureViewCreates || 0) + 1;
			break;
		case "Sampler":
			n.transientCanvasSamplerCreates = (n.transientCanvasSamplerCreates || 0) + 1;
			break;
		case "Framebuffer": n.transientCanvasFramebufferCreates = (n.transientCanvasFramebufferCreates || 0) + 1;
	}
}
function ot(e) {
	let t = Object.getPrototypeOf(e);
	for (; t;) {
		let n = Object.getPrototypeOf(t);
		if (!n || n === k.prototype) return st(t) || e[Symbol.toStringTag] || e.constructor.name;
		t = n;
	}
	return e[Symbol.toStringTag] || e.constructor.name;
}
function st(e) {
	let t = Object.getOwnPropertyDescriptor(e, Symbol.toStringTag);
	return typeof t?.get == "function" ? t.get.call(e) : typeof t?.value == "string" ? t.value : null;
}
var ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, k, A = t((() => {
	$e(), ct = "cpu-hotspot-profiler", lt = "GPU Resource Counts", ut = "Resource Counts", dt = "GPU Time and Memory", ft = [
		"Resources",
		"Buffers",
		"Textures",
		"Samplers",
		"TextureViews",
		"Framebuffers",
		"QuerySets",
		"Shaders",
		"RenderPipelines",
		"ComputePipelines",
		"PipelineLayouts",
		"VertexArrays",
		"RenderPasss",
		"RenderBundleEncoders",
		"RenderBundles",
		"ComputePasss",
		"CommandEncoders",
		"CommandBuffers"
	], pt = [
		"Resources",
		"Buffers",
		"Textures",
		"Samplers",
		"TextureViews",
		"Framebuffers",
		"QuerySets",
		"Shaders",
		"RenderPipelines",
		"SharedRenderPipelines",
		"ComputePipelines",
		"PipelineLayouts",
		"VertexArrays",
		"RenderPasss",
		"RenderBundleEncoders",
		"RenderBundles",
		"ComputePasss",
		"CommandEncoders",
		"CommandBuffers"
	], mt = ft.flatMap((e) => [`${e} Created`, `${e} Active`]), ht = pt.flatMap((e) => [`${e} Created`, `${e} Active`]), gt = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), k = class {
		static defaultProps = {
			id: "undefined",
			handle: void 0,
			_isHandleBorrowed: !1,
			userData: void 0
		};
		toString() {
			return `${this[Symbol.toStringTag] || this.constructor.name}:"${this.id}"`;
		}
		toJSON() {
			return this.toString();
		}
		id;
		props;
		userData = {};
		_device;
		destroyed = !1;
		allocatedBytes = 0;
		allocatedBytesName = null;
		_attachedResources = /* @__PURE__ */ new Set();
		get ownsHandle() {
			return (this.props.handle === void 0 || this.props.handle === null) && !this.isHandleBorrowed;
		}
		get isHandleBorrowed() {
			return !!this.props._isHandleBorrowed;
		}
		constructor(e, t, n) {
			if (!e) throw Error("no device");
			this._device = e, this.props = et(t, n);
			let r = this.props.id === "undefined" ? Ze(this[Symbol.toStringTag]) : this.props.id;
			this.props.id = r, this.id = r, this.userData = this.props.userData || {}, this.addStats();
		}
		destroy() {
			this.destroyed || this.destroyResource();
		}
		delete() {
			return this.destroy(), this;
		}
		getProps() {
			return this.props;
		}
		attachResource(e) {
			this._attachedResources.add(e);
		}
		detachResource(e) {
			this._attachedResources.delete(e);
		}
		destroyAttachedResource(e) {
			this._attachedResources.delete(e) && e.destroy();
		}
		destroyAttachedResources() {
			for (let e of this._attachedResources) e.destroy();
			this._attachedResources = /* @__PURE__ */ new Set();
		}
		destroyResource() {
			this.destroyed ||= (this.destroyAttachedResources(), this.removeStats(), !0);
		}
		removeStats() {
			let e = rt(this._device), t = e ? it() : 0, n = [this._device.statsManager.getStats(lt), this._device.statsManager.getStats(ut)], r = nt(this._device);
			for (let e of n) tt(e, r);
			let i = this.getStatsName();
			for (let e of n) e.get("Resources Active").decrementCount(), e.get(`${i}s Active`).decrementCount();
			e && (e.statsBookkeepingCalls = (e.statsBookkeepingCalls || 0) + 1, e.statsBookkeepingTimeMs = (e.statsBookkeepingTimeMs || 0) + (it() - t));
		}
		trackAllocatedMemory(e, t = this.getStatsName()) {
			let n = rt(this._device), r = n ? it() : 0, i = this._device.statsManager.getStats(dt);
			this.allocatedBytes > 0 && this.allocatedBytesName && (i.get("GPU Memory").subtractCount(this.allocatedBytes), i.get(`${this.allocatedBytesName} Memory`).subtractCount(this.allocatedBytes)), i.get("GPU Memory").addCount(e), i.get(`${t} Memory`).addCount(e), n && (n.statsBookkeepingCalls = (n.statsBookkeepingCalls || 0) + 1, n.statsBookkeepingTimeMs = (n.statsBookkeepingTimeMs || 0) + (it() - r)), this.allocatedBytes = e, this.allocatedBytesName = t;
		}
		trackReferencedMemory(e, t = this.getStatsName()) {
			this.trackAllocatedMemory(e, `External ${t}`);
		}
		trackDeallocatedMemory(e = this.getStatsName()) {
			if (this.allocatedBytes === 0) {
				this.allocatedBytesName = null;
				return;
			}
			let t = rt(this._device), n = t ? it() : 0, r = this._device.statsManager.getStats(dt);
			r.get("GPU Memory").subtractCount(this.allocatedBytes), r.get(`${this.allocatedBytesName || e} Memory`).subtractCount(this.allocatedBytes), t && (t.statsBookkeepingCalls = (t.statsBookkeepingCalls || 0) + 1, t.statsBookkeepingTimeMs = (t.statsBookkeepingTimeMs || 0) + (it() - n)), this.allocatedBytes = 0, this.allocatedBytesName = null;
		}
		trackDeallocatedReferencedMemory(e = this.getStatsName()) {
			this.trackDeallocatedMemory(`Referenced ${e}`);
		}
		addStats() {
			let e = this.getStatsName(), t = rt(this._device), n = t ? it() : 0, r = [this._device.statsManager.getStats(lt), this._device.statsManager.getStats(ut)], i = nt(this._device);
			for (let e of r) tt(e, i);
			for (let t of r) t.get("Resources Created").incrementCount(), t.get("Resources Active").incrementCount(), t.get(`${e}s Created`).incrementCount(), t.get(`${e}s Active`).incrementCount();
			t && (t.statsBookkeepingCalls = (t.statsBookkeepingCalls || 0) + 1, t.statsBookkeepingTimeMs = (t.statsBookkeepingTimeMs || 0) + (it() - n)), at(this._device, e);
		}
		getStatsName() {
			return ot(this);
		}
	};
})), j, vt = t((() => {
	A(), j = class e extends k {
		static INDEX = 16;
		static VERTEX = 32;
		static UNIFORM = 64;
		static STORAGE = 128;
		static INDIRECT = 256;
		static QUERY_RESOLVE = 512;
		static MAP_READ = 1;
		static MAP_WRITE = 2;
		static COPY_SRC = 4;
		static COPY_DST = 8;
		get [Symbol.toStringTag]() {
			return "Buffer";
		}
		usage;
		indexType;
		updateTimestamp;
		constructor(t, n) {
			let r = { ...n };
			(n.usage || 0) & e.INDEX && !n.indexType && (n.data instanceof Uint32Array ? r.indexType = "uint32" : n.data instanceof Uint16Array ? r.indexType = "uint16" : n.data instanceof Uint8Array && (r.indexType = "uint8")), delete r.data, super(t, r, e.defaultProps), this.usage = r.usage || 0, this.indexType = r.indexType, this.updateTimestamp = t.incrementTimestamp();
		}
		clone(e) {
			return this.device.createBuffer({
				...this.props,
				...e
			});
		}
		static DEBUG_DATA_MAX_LENGTH = 32;
		debugData = /* @__PURE__ */ new ArrayBuffer(0);
		_setDebugData(t, n, r) {
			if (!this.device.props.debug) return;
			let i = null, a;
			ArrayBuffer.isView(t) ? (i = t, a = t.buffer) : a = t;
			let o = Math.min(t ? t.byteLength : r, e.DEBUG_DATA_MAX_LENGTH);
			if (a === null) this.debugData = new ArrayBuffer(o);
			else {
				let e = Math.min(i?.byteOffset || 0, a.byteLength), t = Math.max(0, a.byteLength - e), n = Math.min(o, t);
				this.debugData = new Uint8Array(a, e, n).slice().buffer;
			}
		}
		static defaultProps = {
			...k.defaultProps,
			handle: void 0,
			usage: 0,
			byteLength: 0,
			byteOffset: 0,
			data: null,
			indexType: "uint16",
			onMapped: void 0
		};
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/types.js
function yt() {
	return xt ?? Uint16Array;
}
function bt(e) {
	return !!(xt && e === xt);
}
var xt, St = t((() => {
	xt = globalThis.Float16Array;
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/data-types/decode-data-types.js
function Ct(e) {
	let t = e.includes("norm"), n = !t && !e.startsWith("float"), r = e.startsWith("s"), [i, a, o] = At[e] || [
		"uint8 ",
		"i32",
		1
	];
	return {
		signedType: i,
		primitiveType: a,
		byteLength: o,
		normalized: t,
		integer: n,
		signed: r
	};
}
function wt(e) {
	let t = e;
	switch (t) {
		case "uint8": return "unorm8";
		case "sint8": return "snorm8";
		case "uint16": return "unorm16";
		case "sint16": return "snorm16";
		default: return t;
	}
}
function Tt(e, t) {
	switch (t) {
		case 1: return e;
		case 2: return e + e % 2;
		default: return e + (4 - e % 4) % 4;
	}
}
function Et(e) {
	let t = ArrayBuffer.isView(e) ? e.constructor : e;
	if (bt(t)) return "float16";
	if (t === Uint8ClampedArray) return "uint8";
	let n = Object.values(At).find((e) => t === e[4]);
	if (!n) throw Error(t.name);
	return n[0];
}
function Dt(e) {
	return Et(e);
}
function Ot(e) {
	if (e === "float16") return yt();
	let t = At[e];
	if (!t) throw Error(e);
	let [, , , , n] = t;
	return n;
}
function kt(e) {
	return Ot(e);
}
var At, jt = t((() => {
	St(), At = {
		uint8: [
			"uint8",
			"u32",
			1,
			!1,
			Uint8Array
		],
		sint8: [
			"sint8",
			"i32",
			1,
			!1,
			Int8Array
		],
		unorm8: [
			"uint8",
			"f32",
			1,
			!0,
			Uint8Array
		],
		snorm8: [
			"sint8",
			"f32",
			1,
			!0,
			Int8Array
		],
		uint16: [
			"uint16",
			"u32",
			2,
			!1,
			Uint16Array
		],
		sint16: [
			"sint16",
			"i32",
			2,
			!1,
			Int16Array
		],
		unorm16: [
			"uint16",
			"u32",
			2,
			!0,
			Uint16Array
		],
		snorm16: [
			"sint16",
			"i32",
			2,
			!0,
			Int16Array
		],
		float16: [
			"float16",
			"f16",
			2,
			!1,
			Uint16Array
		],
		float32: [
			"float32",
			"f32",
			4,
			!1,
			Float32Array
		],
		uint32: [
			"uint32",
			"u32",
			4,
			!1,
			Uint32Array
		],
		sint32: [
			"sint32",
			"i32",
			4,
			!1,
			Int32Array
		]
	};
})), Mt, Nt, Pt = t((() => {
	jt(), Mt = class {
		getDataTypeInfo(e) {
			return Ct(e);
		}
		getNormalizedDataType(e) {
			return wt(e);
		}
		alignTo(e, t) {
			return Tt(e, t);
		}
		getDataType(e) {
			return Dt(e);
		}
		getTypedArrayConstructor(e) {
			return kt(e);
		}
	}, Nt = new Mt();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/vertex-types/vertex-format-decoder.js
function Ft(e, t) {
	try {
		return Nt.getDataTypeInfo(t);
	} catch {
		throw Error(`Unsupported vertex format: ${e}`);
	}
}
function It(e, t) {
	if (!t) return 1;
	let n = Number(t);
	if (n === 2 || n === 3 || n === 4) return n;
	throw Error(`Unsupported vertex format: ${e}`);
}
function Lt(e, t, n) {
	if (n !== 3) throw Error(`Unsupported vertex format: ${e}`);
	switch (t) {
		case "uint8":
		case "sint8":
		case "unorm8":
		case "snorm8":
		case "uint16":
		case "sint16":
		case "unorm16":
		case "snorm16": return `${t}x3-webgl`;
		default: throw Error(`Unsupported vertex format: ${e}`);
	}
}
var Rt, M, zt = t((() => {
	Pt(), Rt = class {
		getVertexFormatInfo(e) {
			if (e === "unorm10-10-10-2") return {
				type: "unorm8",
				components: 4,
				byteLength: 4,
				integer: !1,
				signed: !1,
				normalized: !0
			};
			let t = e === "unorm8x4-bgra" ? "unorm8x4" : e, n;
			t.endsWith("-webgl") && (t = t.slice(0, -6), n = !0);
			let r = t.split("x");
			if (r.length > 2) throw Error(`Unsupported vertex format: ${e}`);
			let [i, a] = r, o = i, s = It(e, a), c = Ft(e, o), l;
			try {
				l = n ? Lt(e, o, s) : this.makeVertexFormat(c.signedType, s, c.normalized);
			} catch {
				throw Error(`Unsupported vertex format: ${e}`);
			}
			if (l !== (n ? e : t)) throw Error(`Unsupported vertex format: ${e}`);
			let u = {
				type: o,
				components: s,
				byteLength: c.byteLength * s,
				integer: c.integer,
				signed: c.signed,
				normalized: c.normalized
			};
			return n && (u.webglOnly = !0), u;
		}
		makeVertexFormat(e, t, n) {
			let r = n ? Nt.getNormalizedDataType(e) : e;
			switch (r) {
				case "unorm8": return t === 1 ? "unorm8" : t === 3 ? "unorm8x3-webgl" : `${r}x${t}`;
				case "snorm8": return t === 1 ? "snorm8" : t === 3 ? "snorm8x3-webgl" : `${r}x${t}`;
				case "uint8":
				case "sint8":
					if (t === 3) throw Error(`size: ${t}`);
					return t === 1 ? r : `${r}x${t}`;
				case "uint16": return t === 1 ? "uint16" : t === 3 ? "uint16x3-webgl" : `${r}x${t}`;
				case "sint16": return t === 1 ? "sint16" : t === 3 ? "sint16x3-webgl" : `${r}x${t}`;
				case "unorm16": return t === 1 ? "unorm16" : t === 3 ? "unorm16x3-webgl" : `${r}x${t}`;
				case "snorm16": return t === 1 ? "snorm16" : t === 3 ? "snorm16x3-webgl" : `${r}x${t}`;
				case "float16":
					if (t === 3) throw Error(`size: ${t}`);
					return t === 1 ? r : `${r}x${t}`;
				default: return t === 1 ? r : `${r}x${t}`;
			}
		}
		getVertexFormatFromAttribute(e, t, n) {
			if (!t || t > 4) throw Error(`size ${t}`);
			let r = t, i = Nt.getDataType(e);
			return this.makeVertexFormat(i, r, n);
		}
		getCompatibleVertexFormat(e) {
			let t;
			switch (e.primitiveType) {
				case "f32":
					t = "float32";
					break;
				case "i32":
					t = "sint32";
					break;
				case "u32":
					t = "uint32";
					break;
				case "f16": return e.components <= 2 ? "float16x2" : "float16x4";
			}
			return e.components === 1 ? t : `${t}x${e.components}`;
		}
	}, M = new Rt();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/texture-types/texture-format-table.js
function Bt(e) {
	let t = dn[e];
	if (!t) throw Error(`Unsupported texture format ${e}`);
	return t;
}
function Vt() {
	return dn;
}
var N, P, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn = t((() => {
	N = "texture-compression-bc", P = "texture-compression-astc", Ht = "texture-compression-etc2", Ut = "texture-compression-etc1-webgl", Wt = "texture-compression-pvrtc-webgl", Gt = "texture-compression-atc-webgl", Kt = "float32-renderable-webgl", qt = "float16-renderable-webgl", Jt = "rgb9e5ufloat-renderable-webgl", Yt = "snorm8-renderable-webgl", Xt = "norm16-webgl", Zt = "norm16-renderable-webgl", Qt = "snorm16-renderable-webgl", $t = "float32-filterable", en = "float16-filterable-webgl", tn = 3, nn = 5, rn = 15, an = 19, on = 31, sn = 992, cn = 15360, ln = {
		r8unorm: { webgpu: 527 },
		rg8unorm: { webgpu: 527 },
		"rgb8unorm-webgl": {},
		rgba8unorm: { webgpu: on },
		"rgba8unorm-srgb": { webgpu: rn },
		r8snorm: {
			render: Yt,
			webgpu: 837
		},
		rg8snorm: {
			render: Yt,
			webgpu: 837
		},
		"rgb8snorm-webgl": {},
		rgba8snorm: {
			render: Yt,
			webgpu: 341
		},
		r8uint: { webgpu: 515 },
		rg8uint: { webgpu: 515 },
		rgba8uint: { webgpu: an },
		r8sint: { webgpu: 515 },
		rg8sint: { webgpu: 515 },
		rgba8sint: { webgpu: an },
		bgra8unorm: { webgpu: rn },
		"bgra8unorm-srgb": { webgpu: cn },
		r16unorm: {
			f: Xt,
			render: Zt,
			webgpu: sn
		},
		rg16unorm: {
			f: Xt,
			render: Zt,
			webgpu: sn
		},
		"rgb16unorm-webgl": {
			f: Xt,
			render: !1
		},
		rgba16unorm: {
			f: Xt,
			render: Zt,
			webgpu: sn
		},
		r16snorm: {
			f: Xt,
			render: Qt,
			webgpu: sn
		},
		rg16snorm: {
			f: Xt,
			render: Qt,
			webgpu: sn
		},
		"rgb16snorm-webgl": {
			f: Xt,
			render: !1
		},
		rgba16snorm: {
			f: Xt,
			render: Qt,
			webgpu: sn
		},
		r16uint: { webgpu: 515 },
		rg16uint: { webgpu: 515 },
		rgba16uint: { webgpu: an },
		r16sint: { webgpu: 515 },
		rg16sint: { webgpu: 515 },
		rgba16sint: { webgpu: an },
		r16float: {
			render: qt,
			filter: "float16-filterable-webgl",
			webgpu: 527
		},
		rg16float: {
			render: qt,
			filter: en,
			webgpu: 527
		},
		rgba16float: {
			render: qt,
			filter: en,
			webgpu: on
		},
		r32uint: { webgpu: an },
		rg32uint: { webgpu: 16387 },
		rgba32uint: { webgpu: an },
		r32sint: { webgpu: an },
		rg32sint: { webgpu: 16387 },
		rgba32sint: { webgpu: an },
		r32float: {
			render: Kt,
			filter: $t,
			webgpu: an
		},
		rg32float: {
			render: !1,
			filter: $t,
			webgpu: 16387
		},
		"rgb32float-webgl": {
			render: Kt,
			filter: $t
		},
		rgba32float: {
			render: Kt,
			filter: $t,
			webgpu: an
		},
		"rgba4unorm-webgl": {
			channels: "rgba",
			bitsPerChannel: [
				4,
				4,
				4,
				4
			],
			packed: !0
		},
		"rgb565unorm-webgl": {
			channels: "rgb",
			bitsPerChannel: [
				5,
				6,
				5,
				0
			],
			packed: !0
		},
		"rgb5a1unorm-webgl": {
			channels: "rgba",
			bitsPerChannel: [
				5,
				5,
				5,
				1
			],
			packed: !0
		},
		rgb9e5ufloat: {
			channels: "rgb",
			packed: !0,
			render: Jt,
			webgpu: nn
		},
		rg11b10ufloat: {
			channels: "rgb",
			bitsPerChannel: [
				11,
				11,
				10,
				0
			],
			packed: !0,
			p: 1,
			render: Kt,
			webgpu: 517
		},
		rgb10a2unorm: {
			channels: "rgba",
			bitsPerChannel: [
				10,
				10,
				10,
				2
			],
			packed: !0,
			p: 1,
			webgpu: 527
		},
		rgb10a2uint: {
			channels: "rgba",
			bitsPerChannel: [
				10,
				10,
				10,
				2
			],
			packed: !0,
			p: 1,
			webgpu: 515
		},
		stencil8: {
			attachment: "stencil",
			bitsPerChannel: [
				8,
				0,
				0,
				0
			],
			dataType: "uint8",
			webgpu: tn
		},
		depth16unorm: {
			attachment: "depth",
			bitsPerChannel: [
				16,
				0,
				0,
				0
			],
			dataType: "uint16",
			webgpu: tn
		},
		depth24plus: {
			attachment: "depth",
			bitsPerChannel: [
				24,
				0,
				0,
				0
			],
			dataType: "uint32",
			webgpu: tn
		},
		depth32float: {
			attachment: "depth",
			bitsPerChannel: [
				32,
				0,
				0,
				0
			],
			dataType: "float32",
			webgpu: tn
		},
		"depth24plus-stencil8": {
			attachment: "depth-stencil",
			bitsPerChannel: [
				24,
				8,
				0,
				0
			],
			packed: !0,
			webgpu: tn
		},
		"depth32float-stencil8": {
			attachment: "depth-stencil",
			bitsPerChannel: [
				32,
				8,
				0,
				0
			],
			packed: !0,
			f: "depth32float-stencil8",
			webgpu: tn
		}
	}, un = {
		"bc1-rgb-unorm-webgl": { f: N },
		"bc1-rgb-unorm-srgb-webgl": { f: N },
		"bc1-rgba-unorm": { f: N },
		"bc1-rgba-unorm-srgb": { f: N },
		"bc2-rgba-unorm": { f: N },
		"bc2-rgba-unorm-srgb": { f: N },
		"bc3-rgba-unorm": { f: N },
		"bc3-rgba-unorm-srgb": { f: N },
		"bc4-r-unorm": { f: N },
		"bc4-r-snorm": { f: N },
		"bc5-rg-unorm": { f: N },
		"bc5-rg-snorm": { f: N },
		"bc6h-rgb-ufloat": { f: N },
		"bc6h-rgb-float": { f: N },
		"bc7-rgba-unorm": { f: N },
		"bc7-rgba-unorm-srgb": { f: N },
		"etc2-rgb8unorm": { f: Ht },
		"etc2-rgb8unorm-srgb": { f: Ht },
		"etc2-rgb8a1unorm": { f: Ht },
		"etc2-rgb8a1unorm-srgb": { f: Ht },
		"etc2-rgba8unorm": { f: Ht },
		"etc2-rgba8unorm-srgb": { f: Ht },
		"eac-r11unorm": { f: Ht },
		"eac-r11snorm": { f: Ht },
		"eac-rg11unorm": { f: Ht },
		"eac-rg11snorm": { f: Ht },
		"astc-4x4-unorm": { f: P },
		"astc-4x4-unorm-srgb": { f: P },
		"astc-5x4-unorm": { f: P },
		"astc-5x4-unorm-srgb": { f: P },
		"astc-5x5-unorm": { f: P },
		"astc-5x5-unorm-srgb": { f: P },
		"astc-6x5-unorm": { f: P },
		"astc-6x5-unorm-srgb": { f: P },
		"astc-6x6-unorm": { f: P },
		"astc-6x6-unorm-srgb": { f: P },
		"astc-8x5-unorm": { f: P },
		"astc-8x5-unorm-srgb": { f: P },
		"astc-8x6-unorm": { f: P },
		"astc-8x6-unorm-srgb": { f: P },
		"astc-8x8-unorm": { f: P },
		"astc-8x8-unorm-srgb": { f: P },
		"astc-10x5-unorm": { f: P },
		"astc-10x5-unorm-srgb": { f: P },
		"astc-10x6-unorm": { f: P },
		"astc-10x6-unorm-srgb": { f: P },
		"astc-10x8-unorm": { f: P },
		"astc-10x8-unorm-srgb": { f: P },
		"astc-10x10-unorm": { f: P },
		"astc-10x10-unorm-srgb": { f: P },
		"astc-12x10-unorm": { f: P },
		"astc-12x10-unorm-srgb": { f: P },
		"astc-12x12-unorm": { f: P },
		"astc-12x12-unorm-srgb": { f: P },
		"pvrtc-rgb4unorm-webgl": { f: Wt },
		"pvrtc-rgba4unorm-webgl": { f: Wt },
		"pvrtc-rgb2unorm-webgl": { f: Wt },
		"pvrtc-rgba2unorm-webgl": { f: Wt },
		"etc1-rbg-unorm-webgl": { f: Ut },
		"atc-rgb-unorm-webgl": { f: Gt },
		"atc-rgba-unorm-webgl": { f: Gt },
		"atc-rgbai-unorm-webgl": { f: Gt }
	}, dn = {
		...ln,
		...un
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/texture-types/texture-format-decoder.js
function pn({ format: e, width: t, height: n, depth: r, byteAlignment: i }) {
	let { bytesPerPixel: a, bytesPerBlock: o = a, blockWidth: s = 1, blockHeight: c = 1, compressed: l = !1 } = Tn.getInfo(e), u = l ? Math.ceil(t / s) : t, d = l ? Math.ceil(n / c) : n, f = u * o, p = Math.ceil(f / i) * i, m = d, h = p * m * r;
	return {
		bytesPerPixel: a,
		bytesPerRow: p,
		rowsPerImage: m,
		depthOrArrayLayers: r,
		bytesPerImage: p * m,
		byteLength: h
	};
}
function mn(e) {
	let t = Bt(e), n = {
		format: e,
		create: t.f ?? !0,
		render: t.render ?? !0,
		filter: t.filter ?? !0,
		blend: t.blend ?? !0,
		store: t.store ?? !0
	}, r = hn(e), i = e.startsWith("depth") || e.startsWith("stencil"), a = r?.signed, o = r?.integer, s = r?.webgl, c = !!r?.compressed;
	return n.render &&= !i && !c, n.filter &&= !i && !a && !o && !s, n;
}
function hn(e) {
	let t = gn(e);
	if (Tn.isCompressed(e)) {
		t.channels = "rgb", t.components = 3, t.bytesPerPixel = 1, t.srgb = !1, t.compressed = !0, t.bytesPerBlock = vn(e);
		let n = _n(e);
		n && (t.blockWidth = n.blockWidth, t.blockHeight = n.blockHeight);
	}
	let n = t.packed ? null : yn.exec(e);
	if (n) {
		let [, r, i, a, o, s] = n, c = `${a}${i}`, l = Nt.getDataTypeInfo(c), u = l.byteLength * 8, d = r?.length ?? 1, f = [
			u,
			d >= 2 ? u : 0,
			d >= 3 ? u : 0,
			d >= 4 ? u : 0
		];
		t = {
			format: e,
			attachment: t.attachment,
			dataType: l.signedType,
			components: d,
			channels: r,
			integer: l.integer,
			signed: l.signed,
			normalized: l.normalized,
			bitsPerChannel: f,
			bytesPerPixel: l.byteLength * d,
			packed: t.packed,
			srgb: t.srgb
		}, s === "-webgl" && (t.webgl = !0), o === "-srgb" && (t.srgb = !0);
	}
	return e.endsWith("-webgl") && (t.webgl = !0), e.endsWith("-srgb") && (t.srgb = !0), t;
}
function gn(e) {
	let t = { ...Bt(e) }, n = t.bytesPerPixel || 1, r = t.bitsPerChannel || [
		8,
		8,
		8,
		8
	];
	return delete t.bitsPerChannel, delete t.bytesPerPixel, delete t.f, delete t.render, delete t.filter, delete t.blend, delete t.store, delete t.webgpu, {
		...t,
		format: e,
		attachment: t.attachment || "color",
		channels: t.channels || "r",
		components: t.components || t.channels?.length || 1,
		bytesPerPixel: n,
		bitsPerChannel: r,
		dataType: t.dataType || "uint8",
		srgb: t.srgb ?? !1,
		packed: t.packed ?? !1,
		webgl: t.webgl ?? !1,
		integer: t.integer ?? !1,
		signed: t.signed ?? !1,
		normalized: t.normalized ?? !1,
		compressed: t.compressed ?? !1
	};
}
function _n(e) {
	let t = /.*-(\d+)x(\d+)-.*/.exec(e);
	if (t) {
		let [, e, n] = t;
		return {
			blockWidth: Number(e),
			blockHeight: Number(n)
		};
	}
	return e.startsWith("bc") || e.startsWith("etc1") || e.startsWith("etc2") || e.startsWith("eac") || e.startsWith("atc") || e.startsWith("pvrtc-rgb4") || e.startsWith("pvrtc-rgba4") ? {
		blockWidth: 4,
		blockHeight: 4
	} : e.startsWith("pvrtc-rgb2") || e.startsWith("pvrtc-rgba2") ? {
		blockWidth: 8,
		blockHeight: 4
	} : null;
}
function vn(e) {
	return e.startsWith("bc1") || e.startsWith("bc4") || e.startsWith("etc1") || e.startsWith("etc2-rgb8") || e.startsWith("etc2-rgb8a1") || e.startsWith("eac-r11") || e === "atc-rgb-unorm-webgl" ? 8 : e.startsWith("bc2") || e.startsWith("bc3") || e.startsWith("bc5") || e.startsWith("bc6h") || e.startsWith("bc7") || e.startsWith("etc2-rgba8") || e.startsWith("eac-rg11") || e.startsWith("astc") || e === "atc-rgba-unorm-webgl" || e === "atc-rgbai-unorm-webgl" ? 16 : e.startsWith("pvrtc") ? 8 : 16;
}
var yn, bn, xn, Sn, Cn, wn, Tn, En = t((() => {
	Pt(), fn(), yn = /^(r|rg|rgb|rgba|bgra)([0-9]*)([a-z]*)(-srgb)?(-webgl)?$/, bn = [
		"rgb",
		"rgba",
		"bgra"
	], xn = ["depth", "stencil"], Sn = 5, Cn = [
		"bc1",
		"bc2",
		"bc3",
		"bc4",
		"bc5",
		"bc6",
		"bc7",
		"etc1",
		"etc2",
		"eac",
		"atc",
		"astc",
		"pvrtc"
	], wn = class {
		isColor(e) {
			return bn.some((t) => e.startsWith(t));
		}
		isDepthStencil(e) {
			return xn.some((t) => e.startsWith(t));
		}
		isCompressed(e) {
			return Cn.some((t) => e.startsWith(t));
		}
		getInfo(e) {
			return hn(e);
		}
		getCapabilities(e) {
			return mn(e);
		}
		getWebGPUCapabilities(e) {
			let t = Bt(e);
			return t.webgpu === void 0 ? this.isCompressed(e) && !e.endsWith("-webgl") ? Sn : 0 : t.webgpu;
		}
		computeMemoryLayout(e) {
			return pn(e);
		}
	}, Tn = new wn();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/image-types/image-types.js
function Dn(e) {
	return typeof ImageData < "u" && e instanceof ImageData || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement || typeof VideoFrame < "u" && e instanceof VideoFrame || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas;
}
function On(e) {
	if (typeof ImageData < "u" && e instanceof ImageData || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas) return {
		width: e.width,
		height: e.height
	};
	if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) return {
		width: e.naturalWidth,
		height: e.naturalHeight
	};
	if (typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement) return {
		width: e.videoWidth,
		height: e.videoHeight
	};
	if (typeof VideoFrame < "u" && e instanceof VideoFrame) return {
		width: e.displayWidth,
		height: e.displayHeight
	};
	throw Error("Unknown image type");
}
var kn = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter/device.js
function An(e, t) {
	return [jn(e), ...t.map(jn).filter((e) => e !== void 0)].filter((e) => e !== void 0);
}
function jn(e) {
	if (e !== void 0) {
		if (e === null || typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
		if (e instanceof Error) return e.message;
		if (Array.isArray(e)) return e.map(jn);
		if (typeof e == "object") {
			if (Mn(e)) {
				let t = String(e);
				if (t !== "[object Object]") return t;
			}
			return Nn(e) ? Pn(e) : e.constructor?.name || "Object";
		}
		return String(e);
	}
}
function Mn(e) {
	return "toString" in e && typeof e.toString == "function" && e.toString !== Object.prototype.toString;
}
function Nn(e) {
	return "message" in e && "type" in e;
}
function Pn(e) {
	let t = typeof e.type == "string" ? e.type : "message", n = typeof e.message == "string" ? e.message : "", r = typeof e.lineNum == "number" ? e.lineNum : null, i = typeof e.linePos == "number" ? e.linePos : null;
	return `${t}${r !== null && i !== null ? ` @ ${r}:${i}` : r === null ? "" : ` @ ${r}`}: ${n}`.trim();
}
function Fn() {
	if (typeof HTMLCanvasElement > "u") return !1;
	let e = HTMLCanvasElement.prototype;
	return "layoutSubtree" in e && typeof e.requestPaint == "function";
}
var In, Ln, Rn, zn = t((() => {
	ze(), ye(), $e(), vt(), zt(), En(), kn(), fn(), we(), In = class {}, Ln = class {
		features;
		disabledFeatures;
		constructor(e = [], t) {
			this.features = new Set(e), this.disabledFeatures = t || {};
		}
		*[Symbol.iterator]() {
			yield* this.features;
		}
		has(e) {
			return !this.disabledFeatures?.[e] && this.features.has(e);
		}
	}, Rn = class e {
		static defaultProps = { ...Ce };
		get [Symbol.toStringTag]() {
			return "Device";
		}
		toString() {
			return `Device(${this.id})`;
		}
		toJSON() {
			return this.toString();
		}
		id;
		props;
		userData = {};
		statsManager = Re;
		_factories = {};
		timestamp = 0;
		_reused = !1;
		_moduleData = {};
		wgslLanguageFeatures = /* @__PURE__ */ new Set();
		_textureCaps = {};
		_debugGPUTimeQuery = null;
		constructor(t) {
			this.props = {
				...e.defaultProps,
				...t
			}, this.id = this.props.id || Ze(this[Symbol.toStringTag].toLowerCase());
		}
		getVertexFormatInfo(e) {
			return M.getVertexFormatInfo(e);
		}
		isVertexFormatSupported(e) {
			return !0;
		}
		getTextureFormatInfo(e) {
			return Tn.getInfo(e);
		}
		getTextureFormatCapabilities(e) {
			let t = this._textureCaps[e];
			if (!t) {
				let n = this._getDeviceTextureFormatCapabilities(e);
				t = this._getDeviceSpecificTextureFormatCapabilities(n), this._textureCaps[e] = t;
			}
			return t;
		}
		getMipLevelCount(e, t, n = 1) {
			return 1 + Math.floor(Math.log2(Math.max(e, t, n)));
		}
		isExternalImage(e) {
			return Dn(e);
		}
		getExternalImageSize(e) {
			return On(e);
		}
		isTextureFormatSupported(e) {
			return this.getTextureFormatCapabilities(e).create;
		}
		isTextureFormatFilterable(e) {
			return this.getTextureFormatCapabilities(e).filter;
		}
		isTextureFormatRenderable(e) {
			return this.getTextureFormatCapabilities(e).render;
		}
		isTextureFormatCompressed(e) {
			return Tn.isCompressed(e);
		}
		getSupportedCompressedTextureFormats() {
			let e = [];
			for (let t of Object.keys(Vt())) this.isTextureFormatCompressed(t) && this.isTextureFormatSupported(t) && e.push(t);
			return e;
		}
		pushDebugGroup(e) {
			this.commandEncoder.pushDebugGroup(e);
		}
		popDebugGroup() {
			this.commandEncoder?.popDebugGroup();
		}
		insertDebugMarker(e) {
			this.commandEncoder?.insertDebugMarker(e);
		}
		loseDevice() {
			return !1;
		}
		incrementTimestamp() {
			return this.timestamp++;
		}
		reportError(e, t, ...n) {
			if (!this.props.onError(e, t)) {
				let r = An(t, n);
				return O.error(this.type === "webgl" ? "%cWebGL" : "%cWebGPU", "color: white; background: red; padding: 2px 6px; border-radius: 3px;", e.message, ...r);
			}
			return () => {};
		}
		debug() {
			if (this.props.debug) debugger;
			else O.once(0, "'Type luma.log.set({debug: true}) in console to enable debug breakpoints',\nor create a device with the 'debug: true' prop.")();
		}
		getDefaultCanvasContext() {
			if (!this.canvasContext) throw Error("Device has no default CanvasContext. See props.createCanvasContext");
			return this.canvasContext;
		}
		createFence() {
			throw Error("createFence() not implemented");
		}
		beginRenderPass(e) {
			return this.commandEncoder.beginRenderPass(e);
		}
		beginComputePass(e) {
			return this.commandEncoder.beginComputePass(e);
		}
		writeBufferViaCommandEncoder(e, t, n, r = 0) {
			throw Error("writeBufferViaCommandEncoder() not implemented");
		}
		generateMipmapsWebGPU(e) {
			throw Error("not implemented");
		}
		_createSharedRenderPipelineWebGL(e) {
			throw Error("_createSharedRenderPipelineWebGL() not implemented");
		}
		_createBindGroupLayoutWebGPU(e, t) {
			throw Error("_createBindGroupLayoutWebGPU() not implemented");
		}
		_createBindGroupWebGPU(e, t, n, r, i) {
			throw Error("_createBindGroupWebGPU() not implemented");
		}
		_supportsDebugGPUTime() {
			return this.features.has("timestamp-query") && !!(this.props.debug || this.props.debugGPUTime);
		}
		_enableDebugGPUTime(e = 256) {
			if (!this._supportsDebugGPUTime()) return null;
			if (this._debugGPUTimeQuery) return this._debugGPUTimeQuery;
			try {
				this._debugGPUTimeQuery = this.createQuerySet({
					type: "timestamp",
					count: e
				}), this.commandEncoder = this.createCommandEncoder({
					id: this.commandEncoder.props.id,
					timeProfilingQuerySet: this._debugGPUTimeQuery
				});
			} catch {
				this._debugGPUTimeQuery = null;
			}
			return this._debugGPUTimeQuery;
		}
		_disableDebugGPUTime() {
			this._debugGPUTimeQuery &&= (this.commandEncoder.getTimeProfilingQuerySet() === this._debugGPUTimeQuery && (this.commandEncoder = this.createCommandEncoder({ id: this.commandEncoder.props.id })), this._debugGPUTimeQuery.destroy(), null);
		}
		_isDebugGPUTimeEnabled() {
			return this._debugGPUTimeQuery !== null;
		}
		getCanvasContext() {
			return this.getDefaultCanvasContext();
		}
		readPixelsToArrayWebGL(e, t) {
			throw Error("not implemented");
		}
		readPixelsToBufferWebGL(e, t) {
			throw Error("not implemented");
		}
		setParametersWebGL(e) {
			throw Error("not implemented");
		}
		getParametersWebGL(e) {
			throw Error("not implemented");
		}
		withParametersWebGL(e, t) {
			throw Error("not implemented");
		}
		clearWebGL(e) {
			throw Error("not implemented");
		}
		resetWebGL() {
			throw Error("not implemented");
		}
		getModuleData(e) {
			return this._moduleData[e] ||= {}, this._moduleData[e];
		}
		static _getCanvasContextProps(e) {
			return e.createCanvasContext === !0 ? {} : e.createCanvasContext;
		}
		_getDeviceTextureFormatCapabilities(e) {
			let t = Tn.getCapabilities(e), n = (e) => (typeof e == "string" ? this.features.has(e) : e) ?? !0, r = n(t.create);
			return {
				format: e,
				create: r,
				render: r && n(t.render),
				filter: r && n(t.filter),
				blend: r && n(t.blend),
				store: r && n(t.store)
			};
		}
		_normalizeBufferProps(e) {
			(e instanceof ArrayBuffer || ArrayBuffer.isView(e)) && (e = { data: e });
			let t = { ...e };
			if ((e.usage || 0) & j.INDEX && (e.indexType || (e.data instanceof Uint32Array ? t.indexType = "uint32" : e.data instanceof Uint16Array ? t.indexType = "uint16" : e.data instanceof Uint8Array && (t.data = new Uint16Array(e.data), t.indexType = "uint16")), !t.indexType)) throw Error("indices buffer content must be of type uint16 or uint32");
			return t;
		}
	};
})), Bn, Vn = t((() => {
	Bn = class {
		props;
		_resizeObserver;
		_intersectionObserver;
		_observeDevicePixelRatioTimeout = null;
		_observeDevicePixelRatioMediaQuery = null;
		_handleDevicePixelRatioChange = () => this._refreshDevicePixelRatio();
		_trackPositionInterval = null;
		_started = !1;
		get started() {
			return this._started;
		}
		constructor(e) {
			this.props = e;
		}
		start() {
			if (this._started || !this.props.canvas) return;
			this._started = !0, this._intersectionObserver ||= new IntersectionObserver((e) => this.props.onIntersection(e)), this._resizeObserver ||= new ResizeObserver((e) => this.props.onResize(e)), this._intersectionObserver.observe(this.props.canvas);
			let e = this.props.resizeObserverBox;
			try {
				this._resizeObserver.observe(this.props.canvas, { box: e });
			} catch {
				this._resizeObserver.observe(this.props.canvas, { box: "content-box" });
			}
			this._observeDevicePixelRatioTimeout = setTimeout(() => this._refreshDevicePixelRatio(), 0), this.props.trackPosition && this._trackPosition();
		}
		stop() {
			this._started && (this._started = !1, this._observeDevicePixelRatioTimeout &&= (clearTimeout(this._observeDevicePixelRatioTimeout), null), this._observeDevicePixelRatioMediaQuery &&= (this._observeDevicePixelRatioMediaQuery.removeEventListener("change", this._handleDevicePixelRatioChange), null), this._trackPositionInterval &&= (clearInterval(this._trackPositionInterval), null), this._resizeObserver?.disconnect(), this._intersectionObserver?.disconnect());
		}
		_refreshDevicePixelRatio() {
			this._started && (this.props.onDevicePixelRatioChange(), this._observeDevicePixelRatioMediaQuery?.removeEventListener("change", this._handleDevicePixelRatioChange), this._observeDevicePixelRatioMediaQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`), this._observeDevicePixelRatioMediaQuery.addEventListener("change", this._handleDevicePixelRatioChange, { once: !0 }));
		}
		_trackPosition(e = 100) {
			this._trackPositionInterval ||= setInterval(() => {
				this._started ? this.props.onPositionChange() : this._trackPositionInterval &&= (clearInterval(this._trackPositionInterval), null);
			}, e);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/promise-utils.js
function Hn() {
	let e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var Un = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/assert.js
function Wn(e, t) {
	if (!e) {
		let e = Error(t ?? "luma.gl assertion failed.");
		throw Error.captureStackTrace?.(e, Wn), e;
	}
}
function Gn(e, t) {
	return Wn(e, t), e;
}
var Kn = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter/canvas-surface.js
function qn(e) {
	if (typeof e == "string") {
		let t = document.getElementById(e);
		if (!t) throw Error(`${e} is not an HTML element`);
		return t;
	}
	return e || document.body;
}
function Jn(e) {
	let t = document.getElementById(e);
	if (!$n.isHTMLCanvas(t)) throw Error("Object is not a canvas element");
	return t;
}
function Yn(e) {
	let { width: t, height: n } = e, r = document.createElement("canvas");
	r.id = Ze("lumagl-auto-created-canvas"), r.width = t || 1, r.height = n || 1, r.style.width = Number.isFinite(t) ? `${t}px` : "100%", r.style.height = Number.isFinite(n) ? `${n}px` : "100%", e?.visible || (r.style.visibility = "hidden");
	let i = qn(e?.container || null);
	return i.insertBefore(r, i.firstChild), r;
}
function Xn(e, t, n, r, i) {
	let a = e, o = Zn(a[0], t, n), s = Qn(a[1], t, r, i), c = Zn(a[0] + 1, t, n), l = c === n - 1 ? c : c - 1;
	c = Qn(a[1] + 1, t, r, i);
	let u;
	return i ? (c = c === 0 ? c : c + 1, u = s, s = c) : u = c === r - 1 ? c : c - 1, {
		x: o,
		y: s,
		width: Math.max(l - o + 1, 1),
		height: Math.max(u - s + 1, 1)
	};
}
function Zn(e, t, n) {
	return Math.min(Math.round(e * t), n - 1);
}
function Qn(e, t, n, r) {
	return r ? Math.max(0, n - 1 - Math.round(e * t)) : Math.min(Math.round(e * t), n - 1);
}
var $n, er = t((() => {
	m(), Vn(), $e(), Un(), Kn(), $n = class e {
		static isHTMLCanvas(e) {
			return typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement;
		}
		static isOffscreenCanvas(e) {
			return typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas;
		}
		static defaultProps = {
			id: void 0,
			canvas: null,
			width: 800,
			height: 600,
			useDevicePixels: !0,
			pixelSizeSource: "exact",
			autoResize: !0,
			container: null,
			visible: !0,
			alphaMode: "opaque",
			colorSpace: "srgb",
			colorFormat: void 0,
			toneMapping: "standard",
			trackPosition: !1
		};
		id;
		props;
		canvas;
		htmlCanvas;
		offscreenCanvas;
		type;
		initialized;
		isInitialized = !1;
		isVisible = !0;
		cssWidth;
		cssHeight;
		devicePixelRatio;
		devicePixelWidth;
		devicePixelHeight;
		drawingBufferWidth;
		drawingBufferHeight;
		_initializedResolvers = Hn();
		_canvasObserver;
		_position = [0, 0];
		destroyed = !1;
		_needsDrawingBufferResize = !0;
		_configuredDrawingBufferSize = [0, 0];
		toString() {
			return `${this[Symbol.toStringTag]}(${this.id})`;
		}
		constructor(t) {
			this.props = {
				...e.defaultProps,
				...t
			}, t = this.props, this.initialized = this._initializedResolvers.promise, this.canvas = l() ? t.canvas ? typeof t.canvas == "string" ? Jn(t.canvas) : t.canvas : Yn(t) : {
				width: t.width || 1,
				height: t.height || 1
			}, e.isHTMLCanvas(this.canvas) ? (this.id = t.id || this.canvas.id, this.type = "html-canvas", this.htmlCanvas = this.canvas) : e.isOffscreenCanvas(this.canvas) ? (this.id = t.id || "offscreen-canvas", this.type = "offscreen-canvas", this.offscreenCanvas = this.canvas) : (this.id = t.id || "node-canvas-context", this.type = "node"), this.cssWidth = this.htmlCanvas?.clientWidth || this.canvas.width, this.cssHeight = this.htmlCanvas?.clientHeight || this.canvas.height, this.devicePixelWidth = this.canvas.width, this.devicePixelHeight = this.canvas.height, this.drawingBufferWidth = this.canvas.width, this.drawingBufferHeight = this.canvas.height, this._configuredDrawingBufferSize = [this.canvas.width, this.canvas.height], this.devicePixelRatio = globalThis.devicePixelRatio || 1, this._position = [0, 0], this._canvasObserver = new Bn({
				canvas: this.htmlCanvas,
				trackPosition: this.props.trackPosition,
				resizeObserverBox: this.props.pixelSizeSource === "css-dpr" ? "content-box" : "device-pixel-content-box",
				onResize: (e) => this._handleResize(e),
				onIntersection: (e) => this._handleIntersection(e),
				onDevicePixelRatioChange: () => this._observeDevicePixelRatio(),
				onPositionChange: () => this.updatePosition()
			});
		}
		destroy() {
			this.destroyed || (this.destroyed = !0, this._stopObservers(), this.device = null);
		}
		setProps(e) {
			return "useDevicePixels" in e && (this.props.useDevicePixels = e.useDevicePixels || !1, this._updateDrawingBufferSize()), this;
		}
		getCurrentFramebuffer(e) {
			return this._resizeDrawingBufferIfNeeded(), this._getCurrentFramebuffer(e);
		}
		getCSSSize() {
			return [this.cssWidth, this.cssHeight];
		}
		getPosition() {
			return this._position;
		}
		getDevicePixelSize() {
			return [this.devicePixelWidth, this.devicePixelHeight];
		}
		getDrawingBufferSize() {
			return [this.drawingBufferWidth, this.drawingBufferHeight];
		}
		getMaxDrawingBufferSize() {
			let e = this.device.limits.maxTextureDimension2D;
			return [e, e];
		}
		setDrawingBufferSize(e, t) {
			e = Math.floor(e), t = Math.floor(t), (this.drawingBufferWidth !== e || this.drawingBufferHeight !== t) && (this.drawingBufferWidth = e, this.drawingBufferHeight = t, this._needsDrawingBufferResize = !0);
		}
		getDevicePixelRatio() {
			return typeof window < "u" && window.devicePixelRatio || 1;
		}
		cssToDevicePixels(e, t = !0) {
			let n = this.cssToDeviceRatio(), [r, i] = this.getDrawingBufferSize();
			return Xn(e, n, r, i, t);
		}
		getPixelSize() {
			return this.getDevicePixelSize();
		}
		getAspect() {
			let [e, t] = this.getDrawingBufferSize();
			return e > 0 && t > 0 ? e / t : 1;
		}
		cssToDeviceRatio() {
			try {
				let [e] = this.getDrawingBufferSize(), [t] = this.getCSSSize();
				return t ? e / t : 1;
			} catch {
				return 1;
			}
		}
		resize(e) {
			this.setDrawingBufferSize(e.width, e.height);
		}
		_setAutoCreatedCanvasId(e) {
			this.htmlCanvas?.id === "lumagl-auto-created-canvas" && (this.htmlCanvas.id = e);
		}
		_startObservers() {
			this.destroyed || this._canvasObserver.start();
		}
		_stopObservers() {
			this._canvasObserver.stop();
		}
		_handleIntersection(e) {
			if (this.destroyed) return;
			let t = e.find((e) => e.target === this.canvas);
			if (!t) return;
			let n = t.isIntersecting;
			this.isVisible !== n && (this.isVisible = n, this.device.props.onVisibilityChange(this));
		}
		_handleResize(e) {
			if (this.destroyed) return;
			let t = e.find((e) => e.target === this.canvas);
			if (!t) return;
			let n = Gn(t.contentBoxSize?.[0]);
			this.cssWidth = n.inlineSize, this.cssHeight = n.blockSize;
			let r = this.getDevicePixelSize();
			this._setDevicePixelSize(this._getDevicePixelSizeFromResizeEntry(t)), this._updateDrawingBufferSize(), this.device.props.onResize(this, { oldPixelSize: r });
		}
		_updateDrawingBufferSize() {
			if (this.props.autoResize) {
				if (typeof this.props.useDevicePixels == "number") {
					let e = this.props.useDevicePixels;
					this.setDrawingBufferSize(this.cssWidth * e, this.cssHeight * e);
				} else this.props.useDevicePixels ? this.setDrawingBufferSize(this.devicePixelWidth, this.devicePixelHeight) : this.setDrawingBufferSize(this.cssWidth, this.cssHeight);
			}
			this._initializedResolvers.resolve(), this.isInitialized = !0, this.updatePosition();
		}
		_getDevicePixelSizeFromResizeEntry(e) {
			let t = Gn(e.contentBoxSize?.[0]);
			return this.props.pixelSizeSource === "css-dpr" ? this._getDevicePixelSizeFromCSSSize(t.inlineSize, t.blockSize) : {
				devicePixelWidth: e.devicePixelContentBoxSize?.[0]?.inlineSize || t.inlineSize * devicePixelRatio,
				devicePixelHeight: e.devicePixelContentBoxSize?.[0]?.blockSize || t.blockSize * devicePixelRatio
			};
		}
		_getDevicePixelSizeFromCSSSize(e, t) {
			let n = this.getDevicePixelRatio();
			return {
				devicePixelWidth: Math.floor(e * n),
				devicePixelHeight: Math.floor(t * n)
			};
		}
		_setDevicePixelSize({ devicePixelWidth: e, devicePixelHeight: t }) {
			let [n, r] = this.getMaxDrawingBufferSize();
			this.devicePixelWidth = Math.max(1, Math.min(e, n)), this.devicePixelHeight = Math.max(1, Math.min(t, r));
		}
		_resizeDrawingBufferIfNeeded() {
			if (this._needsDrawingBufferResize) {
				this._needsDrawingBufferResize = !1, (this.drawingBufferWidth !== this.canvas.width || this.drawingBufferHeight !== this.canvas.height) && (this.canvas.width = this.drawingBufferWidth, this.canvas.height = this.drawingBufferHeight);
				let [e, t] = this._configuredDrawingBufferSize;
				(this.drawingBufferWidth !== e || this.drawingBufferHeight !== t) && (this._configureDevice(), this._configuredDrawingBufferSize = [this.drawingBufferWidth, this.drawingBufferHeight]);
			}
		}
		_observeDevicePixelRatio() {
			if (this.destroyed || !this._canvasObserver.started) return;
			let e = this.devicePixelRatio;
			if (this.devicePixelRatio = window.devicePixelRatio, this.props.pixelSizeSource === "css-dpr") {
				let e = this.getDevicePixelSize();
				this._setDevicePixelSize(this._getDevicePixelSizeFromCSSSize(this.cssWidth, this.cssHeight)), this._updateDrawingBufferSize(), this.device.props.onResize(this, { oldPixelSize: e });
			}
			this.updatePosition(), this.device.props.onDevicePixelRatioChange?.(this, { oldRatio: e });
		}
		updatePosition() {
			if (this.destroyed) return;
			let e = this.htmlCanvas?.getBoundingClientRect();
			if (e) {
				let t = [e.left, e.top];
				if (this._position ??= t, t[0] !== this._position[0] || t[1] !== this._position[1]) {
					let e = this._position;
					this._position = t, this.device.props.onPositionChange?.(this, { oldPosition: e });
				}
			}
		}
	};
})), tr, nr = t((() => {
	er(), tr = class extends $n {
		static defaultProps = $n.defaultProps;
	};
})), rr, ir = t((() => {
	er(), rr = class extends $n {};
})), ar, or = t((() => {
	A(), ar = class e extends k {
		static defaultProps = {
			...k.defaultProps,
			type: "color-sampler",
			addressModeU: "clamp-to-edge",
			addressModeV: "clamp-to-edge",
			addressModeW: "clamp-to-edge",
			magFilter: "nearest",
			minFilter: "nearest",
			mipmapFilter: "none",
			lodMinClamp: 0,
			lodMaxClamp: 32,
			compare: "less-equal",
			maxAnisotropy: 1
		};
		get [Symbol.toStringTag]() {
			return "Sampler";
		}
		constructor(t, n) {
			n = e.normalizeProps(t, n), super(t, n, e.defaultProps);
		}
		static normalizeProps(e, t) {
			return t;
		}
	};
})), sr, F, cr = t((() => {
	A(), or(), ye(), En(), sr = {
		"1d": "1d",
		"2d": "2d",
		"2d-array": "2d",
		cube: "2d",
		"cube-array": "2d",
		"3d": "3d"
	}, F = class e extends k {
		static SAMPLE = 4;
		static STORAGE = 8;
		static RENDER = 16;
		static COPY_SRC = 1;
		static COPY_DST = 2;
		static TEXTURE = 4;
		static RENDER_ATTACHMENT = 16;
		dimension;
		baseDimension;
		format;
		width;
		height;
		depth;
		mipLevels;
		samples;
		byteAlignment;
		ready = Promise.resolve(this);
		isReady = !0;
		updateTimestamp;
		get [Symbol.toStringTag]() {
			return "Texture";
		}
		toString() {
			return `Texture(${this.id},${this.format},${this.width}x${this.height})`;
		}
		constructor(t, n, r) {
			if (n = e.normalizeProps(t, n), super(t, n, e.defaultProps), this.dimension = this.props.dimension, this.baseDimension = sr[this.dimension], this.format = this.props.format, this.width = this.props.width, this.height = this.props.height, this.depth = this.props.depth, this.mipLevels = this.props.mipLevels, this.samples = this.props.samples || 1, this.dimension === "cube" && (this.depth = 6), this.props.width === void 0 || this.props.height === void 0) {
				if (t.isExternalImage(n.data)) {
					let e = t.getExternalImageSize(n.data);
					this.width = e?.width || 1, this.height = e?.height || 1;
				} else this.width = 1, this.height = 1, (this.props.width === void 0 || this.props.height === void 0) && O.warn(`${this} created with undefined width or height. This is deprecated. Use DynamicTexture instead.`)();
			}
			this.byteAlignment = r?.byteAlignment || 1, this.updateTimestamp = t.incrementTimestamp();
		}
		clone(e) {
			return this.device.createTexture({
				...this.props,
				...e
			});
		}
		setSampler(e) {
			this.sampler = e instanceof ar ? e : this.device.createSampler(e);
		}
		copyImageData(e) {
			let { data: t, depth: n, ...r } = e;
			this.writeData(t, {
				...r,
				depthOrArrayLayers: r.depthOrArrayLayers ?? n
			});
		}
		computeMemoryLayout(e = {}) {
			let { width: t = this.width, height: n = this.height, depthOrArrayLayers: r = this.depth } = this._normalizeTextureReadOptions(e), { format: i, byteAlignment: a } = this;
			return Tn.computeMemoryLayout({
				format: i,
				width: t,
				height: n,
				depth: r,
				byteAlignment: a
			});
		}
		readBuffer(e, t) {
			throw Error("readBuffer not implemented");
		}
		readDataAsync(e) {
			throw Error("readBuffer not implemented");
		}
		writeBuffer(e, t) {
			throw Error("readBuffer not implemented");
		}
		writeData(e, t) {
			throw Error("readBuffer not implemented");
		}
		readDataSyncWebGL(e) {
			throw Error("readDataSyncWebGL not available");
		}
		generateMipmapsWebGL() {
			throw Error("generateMipmapsWebGL not available");
		}
		static normalizeProps(e, t) {
			let n = { ...t }, { width: r, height: i } = n;
			return typeof r == "number" && (n.width = Math.max(1, Math.ceil(r))), typeof i == "number" && (n.height = Math.max(1, Math.ceil(i))), n;
		}
		_initializeData(e) {
			this.device.isExternalImage(e) ? this.copyExternalImage({
				image: e,
				width: this.width,
				height: this.height,
				depth: this.depth,
				mipLevel: 0,
				x: 0,
				y: 0,
				z: 0,
				aspect: "all",
				colorSpace: "srgb",
				premultipliedAlpha: !1,
				flipY: !1
			}) : e && this.copyImageData({
				data: e,
				mipLevel: 0,
				x: 0,
				y: 0,
				z: 0,
				aspect: "all"
			});
		}
		_normalizeCopyImageDataOptions(e) {
			let { data: t, depth: n, ...r } = e, i = this._normalizeTextureWriteOptions({
				...r,
				depthOrArrayLayers: r.depthOrArrayLayers ?? n
			});
			return {
				data: t,
				depth: i.depthOrArrayLayers,
				...i
			};
		}
		_normalizeCopyExternalImageOptions(t) {
			let n = e._omitUndefined(t), r = n.mipLevel ?? 0, i = this._getMipLevelSize(r), a = this.device.getExternalImageSize(t.image), o = {
				...e.defaultCopyExternalImageOptions,
				...i,
				...a,
				...n
			};
			return o.width = Math.min(o.width, i.width - o.x), o.height = Math.min(o.height, i.height - o.y), o.depth = Math.min(o.depth, i.depthOrArrayLayers - o.z), o;
		}
		_normalizeCopyElementImageOptions(t) {
			let n = e._omitUndefined(t), r = n.mipLevel ?? 0, i = this._getMipLevelSize(r), a = {
				...e.defaultCopyElementImageOptions,
				...i,
				...n
			};
			return a.width = Math.min(a.width, i.width - a.x), a.height = Math.min(a.height, i.height - a.y), a.depth = Math.min(a.depth, i.depthOrArrayLayers - a.z), a;
		}
		_normalizeTextureReadOptions(t) {
			let n = e._omitUndefined(t), r = n.mipLevel ?? 0, i = this._getMipLevelSize(r), a = {
				...e.defaultTextureReadOptions,
				...i,
				...n
			};
			return a.width = Math.min(a.width, i.width - a.x), a.height = Math.min(a.height, i.height - a.y), a.depthOrArrayLayers = Math.min(a.depthOrArrayLayers, i.depthOrArrayLayers - a.z), a;
		}
		_getSupportedColorReadOptions(e) {
			let t = this._normalizeTextureReadOptions(e), n = Tn.getInfo(this.format);
			switch (this._validateColorReadAspect(t), this._validateColorReadFormat(n), this.dimension) {
				case "2d":
				case "cube":
				case "cube-array":
				case "2d-array":
				case "3d": return t;
				default: throw Error(`${this} color readback does not support ${this.dimension} textures`);
			}
		}
		_validateColorReadAspect(e) {
			if (e.aspect !== "all") throw Error(`${this} color readback only supports aspect 'all'`);
		}
		_validateColorReadFormat(e) {
			if (e.compressed) throw Error(`${this} color readback does not support compressed formats (${this.format})`);
			switch (e.attachment) {
				case "color": return;
				case "depth": throw Error(`${this} color readback does not support depth formats (${this.format})`);
				case "stencil": throw Error(`${this} color readback does not support stencil formats (${this.format})`);
				case "depth-stencil": throw Error(`${this} color readback does not support depth-stencil formats (${this.format})`);
				default: throw Error(`${this} color readback does not support format ${this.format}`);
			}
		}
		_normalizeTextureWriteOptions(t) {
			let n = e._omitUndefined(t), r = n.mipLevel ?? 0, i = this._getMipLevelSize(r), a = {
				...e.defaultTextureWriteOptions,
				...i,
				...n
			};
			a.width = Math.min(a.width, i.width - a.x), a.height = Math.min(a.height, i.height - a.y), a.depthOrArrayLayers = Math.min(a.depthOrArrayLayers, i.depthOrArrayLayers - a.z);
			let o = Tn.computeMemoryLayout({
				format: this.format,
				width: a.width,
				height: a.height,
				depth: a.depthOrArrayLayers,
				byteAlignment: this.byteAlignment
			}), s = o.bytesPerPixel * a.width;
			if (a.bytesPerRow = n.bytesPerRow ?? o.bytesPerRow, a.rowsPerImage = n.rowsPerImage ?? a.height, a.bytesPerRow < s) throw Error(`bytesPerRow (${a.bytesPerRow}) must be at least ${s} for ${this.format}`);
			if (a.rowsPerImage < a.height) throw Error(`rowsPerImage (${a.rowsPerImage}) must be at least ${a.height} for ${this.format}`);
			let c = this.device.getTextureFormatInfo(this.format).bytesPerPixel;
			if (c && a.bytesPerRow % c !== 0) throw Error(`bytesPerRow (${a.bytesPerRow}) must be a multiple of bytesPerPixel (${c}) for ${this.format}`);
			return a;
		}
		_getMipLevelSize(e) {
			return {
				width: Math.max(1, this.width >> e),
				height: this.baseDimension === "1d" ? 1 : Math.max(1, this.height >> e),
				depthOrArrayLayers: this.dimension === "3d" ? Math.max(1, this.depth >> e) : this.depth
			};
		}
		getAllocatedByteLength() {
			let e = 0;
			for (let t = 0; t < this.mipLevels; t++) {
				let { width: n, height: r, depthOrArrayLayers: i } = this._getMipLevelSize(t);
				e += Tn.computeMemoryLayout({
					format: this.format,
					width: n,
					height: r,
					depth: i,
					byteAlignment: 1
				}).byteLength;
			}
			return e * this.samples;
		}
		static _omitUndefined(e) {
			return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
		}
		static defaultProps = {
			...k.defaultProps,
			data: null,
			dimension: "2d",
			format: "rgba8unorm",
			usage: e.SAMPLE | e.RENDER | e.COPY_DST,
			width: void 0,
			height: void 0,
			depth: 1,
			mipLevels: 1,
			samples: void 0,
			sampler: {},
			view: void 0
		};
		static defaultCopyDataOptions = {
			data: void 0,
			byteOffset: 0,
			bytesPerRow: void 0,
			rowsPerImage: void 0,
			width: void 0,
			height: void 0,
			depthOrArrayLayers: void 0,
			depth: 1,
			mipLevel: 0,
			x: 0,
			y: 0,
			z: 0,
			aspect: "all"
		};
		static defaultCopyExternalImageOptions = {
			image: void 0,
			sourceX: 0,
			sourceY: 0,
			width: void 0,
			height: void 0,
			depth: 1,
			mipLevel: 0,
			x: 0,
			y: 0,
			z: 0,
			aspect: "all",
			colorSpace: "srgb",
			premultipliedAlpha: !1,
			flipY: !1
		};
		static defaultCopyElementImageOptions = {
			element: void 0,
			width: void 0,
			height: void 0,
			sourceX: 0,
			sourceY: 0,
			sourceWidth: void 0,
			sourceHeight: void 0,
			depth: 1,
			mipLevel: 0,
			x: 0,
			y: 0,
			z: 0,
			aspect: "all",
			colorSpace: "srgb",
			premultipliedAlpha: !1,
			flipY: !1
		};
		static defaultTextureReadOptions = {
			x: 0,
			y: 0,
			z: 0,
			width: void 0,
			height: void 0,
			depthOrArrayLayers: 1,
			mipLevel: 0,
			aspect: "all"
		};
		static defaultTextureWriteOptions = {
			byteOffset: 0,
			bytesPerRow: void 0,
			rowsPerImage: void 0,
			x: 0,
			y: 0,
			z: 0,
			width: void 0,
			height: void 0,
			depthOrArrayLayers: 1,
			mipLevel: 0,
			aspect: "all"
		};
	};
})), lr, ur = t((() => {
	A(), lr = class e extends k {
		get [Symbol.toStringTag]() {
			return "TextureView";
		}
		constructor(t, n) {
			super(t, n, e.defaultProps);
		}
		static defaultProps = {
			...k.defaultProps,
			format: void 0,
			dimension: void 0,
			aspect: "all",
			baseMipLevel: 0,
			mipLevelCount: void 0,
			baseArrayLayer: 0,
			arrayLayerCount: void 0
		};
	};
})), dr, fr = t((() => {
	A(), dr = class e extends k {
		width;
		height;
		updateTimestamp;
		get [Symbol.toStringTag]() {
			return "ExternalTexture";
		}
		constructor(t, n) {
			super(t, n, e.defaultProps);
			let r = this.props.source ? t.getExternalImageSize(this.props.source) : null;
			this.width = this.props.width || r?.width || 0, this.height = this.props.height || r?.height || 0, this.updateTimestamp = t.incrementTimestamp();
		}
		static defaultProps = {
			...k.defaultProps,
			source: void 0,
			width: 0,
			height: 0,
			colorSpace: "srgb",
			sampler: {}
		};
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter-utils/format-compiler-log.js
function pr(e, t, n) {
	let r = "", i = t.split(/\r?\n/), a = e.slice().sort((e, t) => e.lineNum - t.lineNum);
	switch (n?.showSourceCode || "no") {
		case "all":
			let t = 0;
			for (let e = 1; e <= i.length; e++) {
				let o = i[e - 1], s = a[t];
				for (o && s && (r += gr(o, e, n)); a.length > t && s.lineNum === e;) {
					let e = a[t++];
					e && (r += mr(e, i, e.lineNum, {
						...n,
						inlineSource: !1
					}));
				}
			}
			for (; a.length > t;) {
				let e = a[t++];
				e && (r += mr(e, [], 0, {
					...n,
					inlineSource: !1
				}));
			}
			return r;
		case "issues":
		case "no":
			for (let t of e) r += mr(t, i, t.lineNum, { inlineSource: n?.showSourceCode !== "no" });
			return r;
	}
}
function mr(e, t, n, r) {
	if (r?.inlineSource) return `
${hr(t, n)}${e.linePos > 0 ? `${" ".repeat(e.linePos + 5)}^^^\n` : ""}${e.type.toUpperCase()}: ${e.message}

`;
	let i = e.type === "error" ? "red" : "orange";
	return r?.html ? `<div class='luma-compiler-log-${e.type}' style="color:${i};"><b> ${e.type.toUpperCase()}: ${e.message}</b></div>` : `${e.type.toUpperCase()}: ${e.message}`;
}
function hr(e, t, n) {
	let r = "";
	for (let i = t - 2; i <= t; i++) {
		let a = e[i - 1];
		a !== void 0 && (r += gr(a, t, n));
	}
	return r;
}
function gr(e, t, n) {
	let r = n?.html ? vr(e) : e;
	return `${_r(String(t), 4)}: ${r}${n?.html ? "<br/>" : "\n"}`;
}
function _r(e, t) {
	let n = "";
	for (let r = e.length; r < t; ++r) n += " ";
	return n + e;
}
function vr(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
var yr = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter/resources/shader.js
function br(e) {
	return xr(e.source) || e.id || Ze(`unnamed ${e.stage}-shader`);
}
function xr(e, t = "unnamed") {
	return /#define[\s*]SHADER_NAME[\s*]([A-Za-z0-9_-]+)[\s*]/.exec(e)?.[1] ?? t;
}
var Sr, Cr = t((() => {
	A(), ye(), $e(), yr(), Sr = class e extends k {
		get [Symbol.toStringTag]() {
			return "Shader";
		}
		stage;
		source;
		compilationStatus = "pending";
		constructor(t, n) {
			n = {
				...n,
				debugShaders: n.debugShaders || t.props.debugShaders || "errors"
			}, super(t, {
				id: br(n),
				...n
			}, e.defaultProps), this.stage = this.props.stage, this.source = this.props.source;
		}
		getCompilationInfoSync() {
			return null;
		}
		getTranslatedSource() {
			return null;
		}
		async debugShader() {
			let e = this.props.debugShaders;
			switch (e) {
				case "never": return;
				case "errors": if (this.compilationStatus === "success") return;
			}
			try {
				let t = await this.getCompilationInfo();
				if (e === "warnings" && t?.length === 0) return;
				this._displayShaderLog(t, this.id);
			} catch (e) {
				O.warn(`Shader ${this.id}: failed to fetch compilation info during debug logging`, e)();
			}
		}
		_displayShaderLog(e, t) {
			if (typeof document > "u" || !document?.createElement) return;
			let n = t, r = `${this.stage} shader "${n}"`, i = pr(e, this.source, {
				showSourceCode: "all",
				html: !0
			}), a = this.getTranslatedSource(), o = document.createElement("div");
			o.innerHTML = `\
<h1>Compilation error in ${r}</h1>
<div style="display:flex;position:fixed;top:10px;right:20px;gap:2px;">
<button id="copy">Copy source</button><br/>
<button id="close">Close</button>
</div>
<code><pre>${i}</pre></code>`, a && (o.innerHTML += `<br /><h1>Translated Source</h1><br /><br /><code><pre>${a}</pre></code>`), o.style.top = "0", o.style.left = "0", o.style.background = "white", o.style.position = "fixed", o.style.zIndex = "9999", o.style.maxWidth = "100vw", o.style.maxHeight = "100vh", o.style.overflowY = "auto", document.body.appendChild(o), o.querySelector(".luma-compiler-log-error")?.scrollIntoView(), o.querySelector("button#close").onclick = () => {
				o.remove();
			}, o.querySelector("button#copy").onclick = () => {
				navigator.clipboard.writeText(this.source);
			};
		}
		static defaultProps = {
			...k.defaultProps,
			language: "auto",
			stage: void 0,
			source: "",
			sourceMap: null,
			entryPoint: "main",
			debugShaders: void 0
		};
	};
})), wr, Tr = t((() => {
	A(), cr(), ye(), wr = class e extends k {
		get [Symbol.toStringTag]() {
			return "Framebuffer";
		}
		width;
		height;
		constructor(t, n = {}) {
			super(t, n, e.defaultProps), this.width = this.props.width, this.height = this.props.height;
		}
		clone(e) {
			let t = this.colorAttachments.map((t) => t.texture.clone(e)), n = this.depthStencilAttachment && this.depthStencilAttachment.texture.clone(e);
			return this.device.createFramebuffer({
				...this.props,
				...e,
				colorAttachments: t,
				depthStencilAttachment: n
			});
		}
		resize(e) {
			let t = !e;
			if (e) {
				let [n, r] = Array.isArray(e) ? e : [e.width, e.height];
				t = t || r !== this.height || n !== this.width, this.width = n, this.height = r;
			}
			t && (O.log(2, `Resizing framebuffer ${this.id} to ${this.width}x${this.height}`)(), this.resizeAttachments(this.width, this.height));
		}
		autoCreateAttachmentTextures() {
			if (this.props.colorAttachments.length === 0 && !this.props.depthStencilAttachment) throw Error("Framebuffer has noattachments");
			this.colorAttachments = this.props.colorAttachments.map((e, t) => {
				if (typeof e == "string") {
					let n = this.createColorTexture(e, t);
					return this.attachResource(n), n.view;
				}
				return e instanceof F ? e.view : e;
			});
			let e = this.props.depthStencilAttachment;
			if (e) {
				if (typeof e == "string") {
					let t = this.createDepthStencilTexture(e);
					this.attachResource(t), this.depthStencilAttachment = t.view;
				} else this.depthStencilAttachment = e instanceof F ? e.view : e;
			}
		}
		createColorTexture(e, t) {
			return this.device.createTexture({
				id: `${this.id}-color-attachment-${t}`,
				usage: F.RENDER_ATTACHMENT,
				format: e,
				width: this.width,
				height: this.height,
				sampler: {
					magFilter: "linear",
					minFilter: "linear"
				}
			});
		}
		createDepthStencilTexture(e) {
			return this.device.createTexture({
				id: `${this.id}-depth-stencil-attachment`,
				usage: F.RENDER_ATTACHMENT | F.SAMPLE,
				format: e,
				width: this.width,
				height: this.height
			});
		}
		resizeAttachments(e, t) {
			if (this.colorAttachments.forEach((n, r) => {
				let i = n.texture.clone({
					width: e,
					height: t
				});
				this.destroyAttachedResource(n), this.colorAttachments[r] = i.view, this.attachResource(i.view);
			}), this.depthStencilAttachment) {
				let n = this.depthStencilAttachment.texture.clone({
					width: e,
					height: t
				});
				this.destroyAttachedResource(this.depthStencilAttachment), this.depthStencilAttachment = n.view, this.attachResource(n);
			}
			this.updateAttachments();
		}
		static defaultProps = {
			...k.defaultProps,
			width: 1,
			height: 1,
			colorAttachments: [],
			depthStencilAttachment: null
		};
	};
})), Er, Dr = t((() => {
	A(), Er = class e extends k {
		get [Symbol.toStringTag]() {
			return "RenderPipeline";
		}
		shaderLayout;
		bufferLayout;
		linkStatus = "pending";
		hash = "";
		sharedRenderPipeline = null;
		get isPending() {
			return this.linkStatus === "pending" || this.vs.compilationStatus === "pending" || this.fs?.compilationStatus === "pending";
		}
		get isErrored() {
			return this.linkStatus === "error" || this.vs.compilationStatus === "error" || this.fs?.compilationStatus === "error";
		}
		constructor(t, n) {
			super(t, n, e.defaultProps), this.shaderLayout = this.props.shaderLayout, this.bufferLayout = this.props.bufferLayout || [], this.sharedRenderPipeline = this.props._sharedRenderPipeline || null;
		}
		static defaultProps = {
			...k.defaultProps,
			vs: null,
			vertexEntryPoint: "vertexMain",
			vsConstants: {},
			fs: null,
			fragmentEntryPoint: "fragmentMain",
			fsConstants: {},
			shaderLayout: null,
			bufferLayout: [],
			topology: "triangle-list",
			colorAttachmentFormats: void 0,
			depthStencilAttachmentFormat: void 0,
			parameters: {},
			varyings: void 0,
			bufferMode: void 0,
			disableWarnings: !1,
			_sharedRenderPipeline: void 0,
			_uniformBlockLayouts: [],
			bindings: void 0,
			bindGroups: void 0
		};
	};
})), Or, kr = t((() => {
	A(), Or = class extends k {
		get [Symbol.toStringTag]() {
			return "SharedRenderPipeline";
		}
		constructor(e, t) {
			super(e, t, {
				...k.defaultProps,
				handle: void 0,
				vs: void 0,
				fs: void 0,
				varyings: void 0,
				bufferMode: void 0
			});
		}
	};
})), Ar, jr = t((() => {
	A(), Ar = class e extends k {
		get [Symbol.toStringTag]() {
			return "ComputePipeline";
		}
		hash = "";
		shaderLayout;
		constructor(t, n) {
			super(t, n, e.defaultProps), this.shaderLayout = n.shaderLayout;
		}
		static defaultProps = {
			...k.defaultProps,
			shader: void 0,
			entryPoint: void 0,
			constants: {},
			shaderLayout: void 0
		};
	};
})), Mr, Nr = t((() => {
	jr(), Dr(), ye(), $e(), Mr = class e {
		static defaultProps = { ...Er.defaultProps };
		static getDefaultPipelineFactory(t) {
			let n = t.getModuleData("@luma.gl/core");
			return n.defaultPipelineFactory ||= new e(t), n.defaultPipelineFactory;
		}
		device;
		_hashCounter = 0;
		_hashes = {};
		_renderPipelineCache = {};
		_computePipelineCache = {};
		_sharedRenderPipelineCache = {};
		get [Symbol.toStringTag]() {
			return "PipelineFactory";
		}
		toString() {
			return `PipelineFactory(${this.device.id})`;
		}
		constructor(e) {
			this.device = e;
		}
		createRenderPipeline(e) {
			if (!this.device.props._cachePipelines) return this.device.createRenderPipeline(e);
			let t = {
				...Er.defaultProps,
				...e
			}, n = this._renderPipelineCache, r = this._hashRenderPipeline(t), i = n[r]?.resource;
			if (i) n[r].useCount++, this.device.props.debugFactories && O.log(3, `${this}: ${n[r].resource} reused, count=${n[r].useCount}, (id=${e.id})`)();
			else {
				let e = this.device.type === "webgl" && this.device.props._sharePipelines ? this.createSharedRenderPipeline(t) : void 0;
				i = this.device.createRenderPipeline({
					...t,
					id: t.id ? `${t.id}-cached` : Ze("unnamed-cached"),
					_sharedRenderPipeline: e
				}), i.hash = r, n[r] = {
					resource: i,
					useCount: 1
				}, this.device.props.debugFactories && O.log(3, `${this}: ${i} created, count=${n[r].useCount}`)();
			}
			return i;
		}
		createComputePipeline(e) {
			if (!this.device.props._cachePipelines) return this.device.createComputePipeline(e);
			let t = {
				...Ar.defaultProps,
				...e
			}, n = this._computePipelineCache, r = this._hashComputePipeline(t), i = n[r]?.resource;
			return i ? (n[r].useCount++, this.device.props.debugFactories && O.log(3, `${this}: ${n[r].resource} reused, count=${n[r].useCount}, (id=${e.id})`)()) : (i = this.device.createComputePipeline({
				...t,
				id: t.id ? `${t.id}-cached` : void 0
			}), i.hash = r, n[r] = {
				resource: i,
				useCount: 1
			}, this.device.props.debugFactories && O.log(3, `${this}: ${i} created, count=${n[r].useCount}`)()), i;
		}
		release(e) {
			if (!this.device.props._cachePipelines) {
				e.destroy();
				return;
			}
			let t = this._getCache(e), n = e.hash;
			t[n].useCount--, t[n].useCount === 0 ? (this._destroyPipeline(e), this.device.props.debugFactories && O.log(3, `${this}: ${e} released and destroyed`)()) : t[n].useCount < 0 ? (O.error(`${this}: ${e} released, useCount < 0, resetting`)(), t[n].useCount = 0) : this.device.props.debugFactories && O.log(3, `${this}: ${e} released, count=${t[n].useCount}`)();
		}
		createSharedRenderPipeline(e) {
			let t = this._hashSharedRenderPipeline(e), n = this._sharedRenderPipelineCache[t];
			return n || (n = {
				resource: this.device._createSharedRenderPipelineWebGL(e),
				useCount: 0
			}, this._sharedRenderPipelineCache[t] = n), n.useCount++, n.resource;
		}
		releaseSharedRenderPipeline(e) {
			if (!e.sharedRenderPipeline) return;
			let t = this._hashSharedRenderPipeline(e.sharedRenderPipeline.props), n = this._sharedRenderPipelineCache[t];
			n && (n.useCount--, n.useCount === 0 && (n.resource.destroy(), delete this._sharedRenderPipelineCache[t]));
		}
		_destroyPipeline(e) {
			let t = this._getCache(e);
			return this.device.props._destroyPipelines ? (delete t[e.hash], e.destroy(), e instanceof Er && this.releaseSharedRenderPipeline(e), !0) : !1;
		}
		_getCache(e) {
			let t;
			if (e instanceof Ar && (t = this._computePipelineCache), e instanceof Er && (t = this._renderPipelineCache), !t) throw Error(`${this}`);
			if (!t[e.hash]) throw Error(`${this}: ${e} matched incorrect entry`);
			return t;
		}
		_hashComputePipeline(e) {
			let { type: t } = this.device;
			return `${t}/C/${this._getHash(e.shader.source)}SL${this._getHash(JSON.stringify(e.shaderLayout))}`;
		}
		_hashRenderPipeline(e) {
			let t = e.vs ? this._getHash(e.vs.source) : 0, n = e.fs ? this._getHash(e.fs.source) : 0, r = this._getWebGLVaryingHash(e), i = this._getHash(JSON.stringify(e.shaderLayout)), a = this._getHash(JSON.stringify(e._uniformBlockLayouts)), o = this._getHash(JSON.stringify(e.bufferLayout)), { type: s } = this.device;
			switch (s) {
				case "webgl":
					let c = this._getHash(JSON.stringify(e.parameters));
					return `${s}/R/${t}/${n}V${r}T${e.topology}P${c}SL${i}UBL${a}BL${o}`;
				default:
					let l = this._getHash(JSON.stringify({
						vertexEntryPoint: e.vertexEntryPoint,
						fragmentEntryPoint: e.fragmentEntryPoint
					})), u = this._getHash(JSON.stringify(e.parameters)), d = this._getWebGPUAttachmentHash(e);
					return `${s}/R/${t}/${n}V${r}T${e.topology}EP${l}P${u}SL${i}BL${o}A${d}`;
			}
		}
		_hashSharedRenderPipeline(e) {
			return `webgl/S/${e.vs ? this._getHash(e.vs.source) : 0}/${e.fs ? this._getHash(e.fs.source) : 0}V${this._getWebGLVaryingHash(e)}`;
		}
		_getHash(e) {
			return this._hashes[e] === void 0 && (this._hashes[e] = this._hashCounter++), this._hashes[e];
		}
		_getWebGLVaryingHash(e) {
			let { varyings: t = [], bufferMode: n = null } = e;
			return this._getHash(JSON.stringify({
				varyings: t,
				bufferMode: n
			}));
		}
		_getWebGPUAttachmentHash(e) {
			let t = e.colorAttachmentFormats ?? [this.device.preferredColorFormat], n = e.depthStencilAttachmentFormat ?? (e.parameters?.depthWriteEnabled ? this.device.preferredDepthFormat : null);
			return this._getHash(JSON.stringify({
				colorAttachmentFormats: t,
				depthStencilAttachmentFormat: n
			}));
		}
	};
})), Pr, Fr = t((() => {
	Cr(), ye(), Pr = class e {
		static defaultProps = { ...Sr.defaultProps };
		static getDefaultShaderFactory(t) {
			let n = t.getModuleData("@luma.gl/core");
			return n.defaultShaderFactory ||= new e(t), n.defaultShaderFactory;
		}
		device;
		_cache = {};
		get [Symbol.toStringTag]() {
			return "ShaderFactory";
		}
		toString() {
			return `${this[Symbol.toStringTag]}(${this.device.id})`;
		}
		constructor(e) {
			this.device = e;
		}
		createShader(e) {
			if (!this.device.props._cacheShaders) return this.device.createShader(e);
			let t = this._hashShader(e), n = this._cache[t];
			if (n) n.useCount++, this.device.props.debugFactories && O.log(3, `${this}: Reusing shader ${n.resource.id} count=${n.useCount}`)();
			else {
				let r = this.device.createShader({
					...e,
					id: e.id ? `${e.id}-cached` : void 0
				});
				this._cache[t] = n = {
					resource: r,
					useCount: 1
				}, this.device.props.debugFactories && O.log(3, `${this}: Created new shader ${r.id}`)();
			}
			return n.resource;
		}
		release(e) {
			if (!this.device.props._cacheShaders) {
				e.destroy();
				return;
			}
			let t = this._hashShader(e), n = this._cache[t];
			if (n) {
				if (n.useCount--, n.useCount === 0) this.device.props._destroyShaders && (delete this._cache[t], n.resource.destroy(), this.device.props.debugFactories && O.log(3, `${this}: Releasing shader ${e.id}, destroyed`)());
				else if (n.useCount < 0) throw Error(`ShaderFactory: Shader ${e.id} released too many times`);
				else this.device.props.debugFactories && O.log(3, `${this}: Releasing shader ${e.id} count=${n.useCount}`)();
			}
		}
		_hashShader(e) {
			return `${e.stage}:${e.source}`;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter-utils/bind-groups.js
function Ir(e, t, n) {
	let r = e.bindings.find((e) => e.name === t || `${e.name.toLocaleLowerCase()}uniforms` === t.toLocaleLowerCase());
	return !r && !n?.ignoreWarnings && O.warn(`Binding ${t} not set: Not found in shader layout.`)(), r || null;
}
function Lr(e, t) {
	if (!t) return {};
	if (zr(t)) return Object.fromEntries(Object.entries(t).map(([e, t]) => [Number(e), { ...t }]));
	let n = {};
	for (let [r, i] of Object.entries(t)) {
		let t = Ir(e, r)?.group ?? 0;
		n[t] ||= {}, n[t][r] = i;
	}
	return n;
}
function Rr(e) {
	let t = {};
	for (let n of Object.values(e)) Object.assign(t, n);
	return t;
}
function zr(e) {
	let t = Object.keys(e);
	return t.length > 0 && t.every((e) => /^\d+$/.test(e));
}
var Br = t((() => {
	ye();
})), Vr, Hr = t((() => {
	A(), Vr = class e extends k {
		static defaultClearColor = [
			0,
			0,
			0,
			1
		];
		static defaultClearDepth = 1;
		static defaultClearStencil = 0;
		get [Symbol.toStringTag]() {
			return "RenderPass";
		}
		constructor(t, n, r = e.defaultProps) {
			n = e.normalizeProps(t, n), super(t, n, r);
		}
		static normalizeProps(e, t) {
			return t;
		}
		static defaultProps = {
			...k.defaultProps,
			framebuffer: null,
			resolveTargets: void 0,
			parameters: void 0,
			clearColor: e.defaultClearColor,
			clearColors: void 0,
			clearDepth: e.defaultClearDepth,
			clearStencil: e.defaultClearStencil,
			depthReadOnly: !1,
			stencilReadOnly: !1,
			discard: !1,
			occlusionQuerySet: void 0,
			timestampQuerySet: void 0,
			beginTimestampIndex: void 0,
			endTimestampIndex: void 0
		};
	};
})), Ur, Wr = t((() => {
	A(), Ur = class e extends k {
		get [Symbol.toStringTag]() {
			return "CommandEncoder";
		}
		_timeProfilingQuerySet = null;
		_timeProfilingSlotCount = 0;
		_gpuTimeMs;
		constructor(t, n) {
			super(t, n, e.defaultProps), this._timeProfilingQuerySet = n.timeProfilingQuerySet ?? null, this._timeProfilingSlotCount = 0, this._gpuTimeMs = void 0;
		}
		async resolveTimeProfilingQuerySet() {
			if (this._gpuTimeMs = void 0, !this._timeProfilingQuerySet) return;
			let e = Math.floor(this._timeProfilingSlotCount / 2);
			if (e <= 0) return;
			let t = e * 2, n = await this._timeProfilingQuerySet.readResults({
				firstQuery: 0,
				queryCount: t
			}), r = 0n;
			for (let e = 0; e < t; e += 2) r += n[e + 1] - n[e];
			this._gpuTimeMs = Number(r) / 1e6;
		}
		getTimeProfilingSlotCount() {
			return this._timeProfilingSlotCount;
		}
		getTimeProfilingQuerySet() {
			return this._timeProfilingQuerySet;
		}
		_applyTimeProfilingToPassProps(e) {
			let t = e || {};
			if (!this._supportsTimestampQueries() || !this._timeProfilingQuerySet || t.timestampQuerySet !== void 0 || t.beginTimestampIndex !== void 0 || t.endTimestampIndex !== void 0) return t;
			let n = this._timeProfilingSlotCount;
			return n + 1 >= this._timeProfilingQuerySet.props.count ? t : (this._timeProfilingSlotCount += 2, {
				...t,
				timestampQuerySet: this._timeProfilingQuerySet,
				beginTimestampIndex: n,
				endTimestampIndex: n + 1
			});
		}
		_supportsTimestampQueries() {
			return this.device.features.has("timestamp-query");
		}
		static defaultProps = {
			...k.defaultProps,
			measureExecutionTime: void 0,
			timeProfilingQuerySet: void 0
		};
	};
})), Gr, Kr = t((() => {
	A(), Gr = class e extends k {
		get [Symbol.toStringTag]() {
			return "CommandBuffer";
		}
		constructor(t, n) {
			super(t, n, e.defaultProps);
		}
		static defaultProps = { ...k.defaultProps };
	};
})), qr, Jr = t((() => {
	A(), qr = class e extends k {
		static defaultProps = {
			...k.defaultProps,
			shaderLayout: void 0,
			bufferLayout: []
		};
		get [Symbol.toStringTag]() {
			return "VertexArray";
		}
		maxVertexAttributes;
		indexBuffer = null;
		attributes;
		constructor(t, n) {
			super(t, n, e.defaultProps), this.maxVertexAttributes = t.limits.maxVertexAttributes, this.attributes = Array(this.maxVertexAttributes).fill(null);
		}
		getBufferSlot(e) {
			return null;
		}
		getDrawValidationError() {
			return null;
		}
		setConstantWebGL(e, t) {
			this.device.reportError(/* @__PURE__ */ Error("constant attributes not supported"), this)();
		}
	};
})), Yr, Xr = t((() => {
	A(), Yr = class e extends k {
		static defaultProps = {
			...k.defaultProps,
			layout: void 0,
			buffers: {}
		};
		get [Symbol.toStringTag]() {
			return "TransformFeedback";
		}
		constructor(t, n) {
			super(t, n, e.defaultProps);
		}
	};
})), Zr, Qr = t((() => {
	A(), Zr = class e extends k {
		get [Symbol.toStringTag]() {
			return "QuerySet";
		}
		constructor(t, n) {
			super(t, n, e.defaultProps);
		}
		static defaultProps = {
			...k.defaultProps,
			type: void 0,
			count: void 0
		};
	};
})), $r, ei = t((() => {
	A(), $r = class e extends k {
		static defaultProps = { ...k.defaultProps };
		get [Symbol.toStringTag]() {
			return "Fence";
		}
		constructor(t, n = {}) {
			super(t, n, e.defaultProps);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/shader-types/shader-type-decoder.js
function ti(e) {
	let t = ai(e), n = ui[t];
	if (!n) throw Error(`Unsupported variable shader type: ${e}`);
	return n;
}
function ni(e) {
	let t = ii(e), n = li[t];
	if (!n) throw Error(`Unsupported attribute shader type: ${e}`);
	let [r, i] = n, a = r === "i32" || r === "u32", o = r !== "u32";
	return {
		primitiveType: r,
		components: i,
		byteLength: ci[r] * i,
		integer: a,
		signed: o
	};
}
function ri(e, t) {
	return t === 1 ? e : `vec${t}<${e}>`;
}
function ii(e) {
	return di[e] || e;
}
function ai(e) {
	return fi[e] || e;
}
var oi, si, ci, li, ui, di, fi, pi = t((() => {
	oi = class {
		getVariableShaderTypeInfo(e) {
			return ti(e);
		}
		getAttributeShaderTypeInfo(e) {
			return ni(e);
		}
		makeShaderAttributeType(e, t) {
			return ri(e, t);
		}
		resolveAttributeShaderTypeAlias(e) {
			return ii(e);
		}
		resolveVariableShaderTypeAlias(e) {
			return ai(e);
		}
	}, si = new oi(), ci = {
		f32: 4,
		f16: 2,
		i32: 4,
		u32: 4
	}, li = {
		f32: ["f32", 1],
		"vec2<f32>": ["f32", 2],
		"vec3<f32>": ["f32", 3],
		"vec4<f32>": ["f32", 4],
		f16: ["f16", 1],
		"vec2<f16>": ["f16", 2],
		"vec3<f16>": ["f16", 3],
		"vec4<f16>": ["f16", 4],
		i32: ["i32", 1],
		"vec2<i32>": ["i32", 2],
		"vec3<i32>": ["i32", 3],
		"vec4<i32>": ["i32", 4],
		u32: ["u32", 1],
		"vec2<u32>": ["u32", 2],
		"vec3<u32>": ["u32", 3],
		"vec4<u32>": ["u32", 4]
	}, ui = {
		f32: {
			type: "f32",
			components: 1
		},
		f16: {
			type: "f16",
			components: 1
		},
		i32: {
			type: "i32",
			components: 1
		},
		u32: {
			type: "u32",
			components: 1
		},
		"vec2<f32>": {
			type: "f32",
			components: 2
		},
		"vec3<f32>": {
			type: "f32",
			components: 3
		},
		"vec4<f32>": {
			type: "f32",
			components: 4
		},
		"vec2<f16>": {
			type: "f16",
			components: 2
		},
		"vec3<f16>": {
			type: "f16",
			components: 3
		},
		"vec4<f16>": {
			type: "f16",
			components: 4
		},
		"vec2<i32>": {
			type: "i32",
			components: 2
		},
		"vec3<i32>": {
			type: "i32",
			components: 3
		},
		"vec4<i32>": {
			type: "i32",
			components: 4
		},
		"vec2<u32>": {
			type: "u32",
			components: 2
		},
		"vec3<u32>": {
			type: "u32",
			components: 3
		},
		"vec4<u32>": {
			type: "u32",
			components: 4
		},
		"mat2x2<f32>": {
			type: "f32",
			components: 4
		},
		"mat2x3<f32>": {
			type: "f32",
			components: 6
		},
		"mat2x4<f32>": {
			type: "f32",
			components: 8
		},
		"mat3x2<f32>": {
			type: "f32",
			components: 6
		},
		"mat3x3<f32>": {
			type: "f32",
			components: 9
		},
		"mat3x4<f32>": {
			type: "f32",
			components: 12
		},
		"mat4x2<f32>": {
			type: "f32",
			components: 8
		},
		"mat4x3<f32>": {
			type: "f32",
			components: 12
		},
		"mat4x4<f32>": {
			type: "f32",
			components: 16
		},
		"mat2x2<f16>": {
			type: "f16",
			components: 4
		},
		"mat2x3<f16>": {
			type: "f16",
			components: 6
		},
		"mat2x4<f16>": {
			type: "f16",
			components: 8
		},
		"mat3x2<f16>": {
			type: "f16",
			components: 6
		},
		"mat3x3<f16>": {
			type: "f16",
			components: 9
		},
		"mat3x4<f16>": {
			type: "f16",
			components: 12
		},
		"mat4x2<f16>": {
			type: "f16",
			components: 8
		},
		"mat4x3<f16>": {
			type: "f16",
			components: 12
		},
		"mat4x4<f16>": {
			type: "f16",
			components: 16
		},
		"mat2x2<i32>": {
			type: "i32",
			components: 4
		},
		"mat2x3<i32>": {
			type: "i32",
			components: 6
		},
		"mat2x4<i32>": {
			type: "i32",
			components: 8
		},
		"mat3x2<i32>": {
			type: "i32",
			components: 6
		},
		"mat3x3<i32>": {
			type: "i32",
			components: 9
		},
		"mat3x4<i32>": {
			type: "i32",
			components: 12
		},
		"mat4x2<i32>": {
			type: "i32",
			components: 8
		},
		"mat4x3<i32>": {
			type: "i32",
			components: 12
		},
		"mat4x4<i32>": {
			type: "i32",
			components: 16
		},
		"mat2x2<u32>": {
			type: "u32",
			components: 4
		},
		"mat2x3<u32>": {
			type: "u32",
			components: 6
		},
		"mat2x4<u32>": {
			type: "u32",
			components: 8
		},
		"mat3x2<u32>": {
			type: "u32",
			components: 6
		},
		"mat3x3<u32>": {
			type: "u32",
			components: 9
		},
		"mat3x4<u32>": {
			type: "u32",
			components: 12
		},
		"mat4x2<u32>": {
			type: "u32",
			components: 8
		},
		"mat4x3<u32>": {
			type: "u32",
			components: 12
		},
		"mat4x4<u32>": {
			type: "u32",
			components: 16
		}
	}, di = {
		vec2i: "vec2<i32>",
		vec3i: "vec3<i32>",
		vec4i: "vec4<i32>",
		vec2u: "vec2<u32>",
		vec3u: "vec3<u32>",
		vec4u: "vec4<u32>",
		vec2f: "vec2<f32>",
		vec3f: "vec3<f32>",
		vec4f: "vec4<f32>",
		vec2h: "vec2<f16>",
		vec3h: "vec3<f16>",
		vec4h: "vec4<f16>"
	}, fi = {
		vec2i: "vec2<i32>",
		vec3i: "vec3<i32>",
		vec4i: "vec4<i32>",
		vec2u: "vec2<u32>",
		vec3u: "vec3<u32>",
		vec4u: "vec4<u32>",
		vec2f: "vec2<f32>",
		vec3f: "vec3<f32>",
		vec4f: "vec4<f32>",
		vec2h: "vec2<f16>",
		vec3h: "vec3<f16>",
		vec4h: "vec4<f16>",
		mat2x2f: "mat2x2<f32>",
		mat2x3f: "mat2x3<f32>",
		mat2x4f: "mat2x4<f32>",
		mat3x2f: "mat3x2<f32>",
		mat3x3f: "mat3x3<f32>",
		mat3x4f: "mat3x4<f32>",
		mat4x2f: "mat4x2<f32>",
		mat4x3f: "mat4x3<f32>",
		mat4x4f: "mat4x4<f32>",
		mat2x2i: "mat2x2<i32>",
		mat2x3i: "mat2x3<i32>",
		mat2x4i: "mat2x4<i32>",
		mat3x2i: "mat3x2<i32>",
		mat3x3i: "mat3x3<i32>",
		mat3x4i: "mat3x4<i32>",
		mat4x2i: "mat4x2<i32>",
		mat4x3i: "mat4x3<i32>",
		mat4x4i: "mat4x4<i32>",
		mat2x2u: "mat2x2<u32>",
		mat2x3u: "mat2x3<u32>",
		mat2x4u: "mat2x4<u32>",
		mat3x2u: "mat3x2<u32>",
		mat3x3u: "mat3x3<u32>",
		mat3x4u: "mat3x4<u32>",
		mat4x2u: "mat4x2<u32>",
		mat4x3u: "mat4x3<u32>",
		mat4x4u: "mat4x4<u32>",
		mat2x2h: "mat2x2<f16>",
		mat2x3h: "mat2x3<f16>",
		mat2x4h: "mat2x4<f16>",
		mat3x2h: "mat3x2<f16>",
		mat3x3h: "mat3x3<f16>",
		mat3x4h: "mat3x4<f16>",
		mat4x2h: "mat4x2<f16>",
		mat4x3h: "mat4x3<f16>",
		mat4x4h: "mat4x4<f16>"
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/shadertypes/shader-types/shader-block-layout.js
function mi(e, t = {}) {
	let n = { ...e }, r = t.layout ?? "std140", i = {}, a = 0;
	for (let [e, t] of Object.entries(n)) a = _i(i, e, t, a, r);
	return a = Tt(a, yi(n, r)), {
		layout: r,
		byteLength: a * 4,
		uniformTypes: n,
		fields: i
	};
}
function hi(e, t) {
	let n = ai(e), r = ti(n), i = /^mat(\d)x(\d)<.+>$/.exec(n);
	if (i) {
		let e = Number(i[1]), a = Number(i[2]), o = bi(a, n, r.type, t), s = Ci(o.size, o.alignment, t);
		return {
			alignment: o.alignment,
			size: e * s,
			components: e * a,
			columns: e,
			rows: a,
			columnStride: s,
			shaderType: n,
			type: r.type
		};
	}
	let a = /^vec(\d)<.+>$/.exec(n);
	return a ? bi(Number(a[1]), n, r.type, t) : {
		alignment: 1,
		size: 1,
		components: 1,
		columns: 1,
		rows: 1,
		columnStride: 1,
		shaderType: n,
		type: r.type
	};
}
function gi(e) {
	return !!e && typeof e == "object" && !Array.isArray(e);
}
function _i(e, t, n, r, i) {
	if (typeof n == "string") {
		let a = hi(n, i), o = Tt(r, a.alignment);
		return e[t] = {
			offset: o,
			...a
		}, o + a.size;
	}
	if (Array.isArray(n)) {
		if (Array.isArray(n[0])) throw Error(`Nested arrays are not supported for ${t}`);
		let a = n[0], o = n[1], s = xi(a, i), c = Tt(r, yi(n, i));
		for (let n = 0; n < o; n++) _i(e, `${t}[${n}]`, a, c + n * s, i);
		return c + s * o;
	}
	if (gi(n)) {
		let a = yi(n, i), o = Tt(r, a);
		for (let [r, a] of Object.entries(n)) o = _i(e, `${t}.${r}`, a, o, i);
		return Tt(o, a);
	}
	throw Error(`Unsupported CompositeShaderType for ${t}`);
}
function vi(e, t) {
	if (typeof e == "string") return hi(e, t).size;
	if (Array.isArray(e)) {
		let n = e[0], r = e[1];
		if (Array.isArray(n)) throw Error("Nested arrays are not supported");
		return xi(n, t) * r;
	}
	let n = 0;
	for (let r of Object.values(e)) {
		let e = r;
		n = Tt(n, yi(e, t)), n += vi(e, t);
	}
	return Tt(n, yi(e, t));
}
function yi(e, t) {
	if (typeof e == "string") return hi(e, t).alignment;
	if (Array.isArray(e)) {
		let n = e[0], r = yi(n, t);
		return wi(t) ? Math.max(r, 4) : r;
	}
	let n = 1;
	for (let r of Object.values(e)) {
		let e = yi(r, t);
		n = Math.max(n, e);
	}
	return Ti(t) ? Math.max(n, 4) : n;
}
function bi(e, t, n, r) {
	return {
		alignment: e === 2 ? 2 : 4,
		size: e === 3 ? 3 : e,
		components: e,
		columns: 1,
		rows: e,
		columnStride: e === 3 ? 3 : e,
		shaderType: t,
		type: n
	};
}
function xi(e, t) {
	return Si(vi(e, t), yi(e, t), t);
}
function Si(e, t, n) {
	return Tt(e, wi(n) ? 4 : t);
}
function Ci(e, t, n) {
	return n === "std140" ? 4 : Tt(e, t);
}
function wi(e) {
	return e === "std140" || e === "wgsl-uniform";
}
function Ti(e) {
	return e === "std140" || e === "wgsl-uniform";
}
var Ei = t((() => {
	jt(), pi();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/array-utils-flat.js
function Di(e) {
	return (!ki || ki.byteLength < e) && (ki = new ArrayBuffer(e)), ki;
}
function Oi(e, t) {
	return new e(Di(e.BYTES_PER_ELEMENT * t), 0, t);
}
var ki, Ai = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/is-array.js
function ji(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Mi(e) {
	return Array.isArray(e) ? e.length === 0 || typeof e[0] == "number" : ji(e);
}
var Ni = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/core/dist/portable/shader-block-writer.js
function Pi(e) {
	return !!e && typeof e == "object" && !Array.isArray(e) && !ArrayBuffer.isView(e);
}
function Fi(e, t, n) {
	return Array.prototype.slice.call(e, t, n);
}
var Ii, Li = t((() => {
	Ai(), Ni(), ye(), Ei(), Ii = class {
		layout;
		constructor(e) {
			this.layout = e;
		}
		has(e) {
			return !!this.layout.fields[e];
		}
		get(e) {
			let t = this.layout.fields[e];
			return t ? {
				offset: t.offset,
				size: t.size
			} : void 0;
		}
		getFlatUniformValues(e) {
			let t = {};
			for (let [n, r] of Object.entries(e)) {
				let e = this.layout.uniformTypes[n];
				e ? this._flattenCompositeValue(t, n, e, r) : this.layout.fields[n] && (t[n] = r);
			}
			return t;
		}
		getData(e) {
			let t = Di(this.layout.byteLength);
			new Uint8Array(t, 0, this.layout.byteLength).fill(0);
			let n = {
				i32: new Int32Array(t),
				u32: new Uint32Array(t),
				f32: new Float32Array(t),
				f16: new Uint16Array(t)
			}, r = this.getFlatUniformValues(e);
			for (let [e, t] of Object.entries(r)) this._writeLeafValue(n, e, t);
			return new Uint8Array(t, 0, this.layout.byteLength);
		}
		_flattenCompositeValue(e, t, n, r) {
			if (r !== void 0) {
				if (typeof n == "string" || this.layout.fields[t]) e[t] = r;
				else if (Array.isArray(n)) {
					let i = n[0], a = n[1];
					if (Array.isArray(i)) throw Error(`Nested arrays are not supported for ${t}`);
					if (typeof i == "string" && Mi(r)) {
						this._flattenPackedArray(e, t, i, a, r);
						return;
					}
					if (!Array.isArray(r)) {
						O.warn(`Unsupported uniform array value for ${t}:`, r)();
						return;
					}
					for (let n = 0; n < Math.min(r.length, a); n++) {
						let a = r[n];
						a !== void 0 && this._flattenCompositeValue(e, `${t}[${n}]`, i, a);
					}
				} else if (gi(n) && Pi(r)) for (let [i, a] of Object.entries(r)) {
					if (a === void 0) continue;
					let r = `${t}.${i}`;
					this._flattenCompositeValue(e, r, n[i], a);
				}
				else O.warn(`Unsupported uniform value for ${t}:`, r)();
			}
		}
		_flattenPackedArray(e, t, n, r, i) {
			let a = i, o = hi(n, this.layout.layout).components;
			for (let n = 0; n < r; n++) {
				let r = n * o;
				if (r >= a.length) break;
				o === 1 ? e[`${t}[${n}]`] = Number(a[r]) : e[`${t}[${n}]`] = Fi(i, r, r + o);
			}
		}
		_writeLeafValue(e, t, n) {
			let r = this.layout.fields[t];
			if (!r) {
				O.warn(`Uniform ${t} not found in layout`)();
				return;
			}
			let { type: i, components: a, columns: o, rows: s, offset: c, columnStride: l } = r, u = e[i];
			if (a === 1) {
				u[c] = Number(n);
				return;
			}
			let d = n;
			if (o === 1) {
				for (let e = 0; e < a; e++) u[c + e] = Number(d[e] ?? 0);
				return;
			}
			let f = 0;
			for (let e = 0; e < o; e++) {
				let t = c + e * l;
				for (let e = 0; e < s; e++) u[t + e] = Number(d[f++] ?? 0);
			}
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/utils/array-equal.js
function Ri(e, t, n = 16) {
	if (e === t) return !0;
	let r = e, i = t;
	if (!Mi(r) || !Mi(i) || r.length !== i.length) return !1;
	let a = Math.min(n, Bi);
	if (r.length > a) return !1;
	for (let e = 0; e < r.length; ++e) if (i[e] !== r[e]) return !1;
	return !0;
}
function zi(e) {
	return Mi(e) ? e.slice() : e;
}
var Bi, Vi = t((() => {
	Ni(), Bi = 128;
})), Hi, Ui = t((() => {
	Vi(), Hi = class {
		name;
		uniforms = {};
		modifiedUniforms = {};
		modified = !0;
		bindingLayout = {};
		needsRedraw = "initialized";
		constructor(e) {
			if (this.name = e?.name || "unnamed", e?.name && e?.shaderLayout) {
				let t = e?.shaderLayout.bindings?.find((t) => t.type === "uniform" && t.name === e?.name);
				if (!t) throw Error(e?.name);
				let n = t;
				for (let e of n.uniforms || []) this.bindingLayout[e.name] = e;
			}
		}
		setUniforms(e) {
			for (let [t, n] of Object.entries(e)) this._setUniform(t, n) && !this.needsRedraw && this.setNeedsRedraw(`${this.name}.${t}=${n}`);
		}
		setNeedsRedraw(e) {
			this.needsRedraw = this.needsRedraw || e;
		}
		getAllUniforms() {
			return this.modifiedUniforms = {}, this.needsRedraw = !1, this.uniforms || {};
		}
		_setUniform(e, t) {
			return !Ri(this.uniforms[e], t) && (this.uniforms[e] = zi(t), this.modifiedUniforms[e] = !0, this.modified = !0, !0);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/portable/uniform-store.js
function Wi(e) {
	return e.type === "webgpu" ? "wgsl-uniform" : "std140";
}
var Gi, Ki, qi = t((() => {
	vt(), ye(), Ei(), Ui(), Li(), Gi = 1024, Ki = class {
		device;
		uniformBlocks = /* @__PURE__ */ new Map();
		shaderBlockLayouts = /* @__PURE__ */ new Map();
		shaderBlockWriters = /* @__PURE__ */ new Map();
		uniformBuffers = /* @__PURE__ */ new Map();
		constructor(e, t) {
			this.device = e;
			for (let [n, r] of Object.entries(t)) {
				let t = n, i = mi(r.uniformTypes ?? {}, { layout: r.layout ?? Wi(e) }), a = new Ii(i);
				this.shaderBlockLayouts.set(t, i), this.shaderBlockWriters.set(t, a);
				let o = new Hi({ name: n });
				o.setUniforms(a.getFlatUniformValues(r.defaultUniforms || {})), this.uniformBlocks.set(t, o);
			}
		}
		destroy() {
			for (let e of this.uniformBuffers.values()) e.destroy();
		}
		setUniforms(e, t) {
			for (let [t, n] of Object.entries(e)) {
				let e = t, r = this.shaderBlockWriters.get(e)?.getFlatUniformValues(n || {});
				this.uniformBlocks.get(e)?.setUniforms(r || {});
			}
			this.updateUniformBuffers(t);
		}
		getUniformBufferByteLength(e) {
			let t = this.shaderBlockLayouts.get(e)?.byteLength || 0;
			return Math.max(t, Gi);
		}
		getUniformBufferData(e) {
			let t = this.uniformBlocks.get(e)?.getAllUniforms() || {};
			return this.shaderBlockWriters.get(e)?.getData(t) || /* @__PURE__ */ new Uint8Array();
		}
		createUniformBuffer(e, t) {
			t && this.setUniforms(t);
			let n = this.getUniformBufferByteLength(e), r = this.device.createBuffer({
				usage: j.UNIFORM | j.COPY_DST,
				byteLength: n
			}), i = this.getUniformBufferData(e);
			return r.write(i), r;
		}
		getManagedUniformBuffer(e) {
			if (!this.uniformBuffers.get(e)) {
				let t = this.getUniformBufferByteLength(e), n = this.device.createBuffer({
					usage: j.UNIFORM | j.COPY_DST,
					byteLength: t
				});
				this.uniformBuffers.set(e, n);
			}
			return this.uniformBuffers.get(e);
		}
		updateUniformBuffers(e) {
			let t = !1;
			for (let n of this.uniformBlocks.keys()) {
				let r = this.updateUniformBuffer(n, e);
				t ||= r;
			}
			return t && O.log(3, `UniformStore.updateUniformBuffers(): ${t}`)(), t;
		}
		updateUniformBuffer(e, t) {
			let n = this.uniformBlocks.get(e), r = this.uniformBuffers.get(e), i = !1;
			if (r && n?.needsRedraw) {
				i ||= n.needsRedraw;
				let a = this.getUniformBufferData(e);
				if (r = this.uniformBuffers.get(e), r && (t ? this.device.writeBufferViaCommandEncoder(t, r, a) : r.write(a)), O.level >= 4) {
					let t = this.uniformBlocks.get(e)?.getAllUniforms();
					O.log(4, `Writing to uniform buffer ${String(e)}`, a, t)();
				}
			}
			return i;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter-utils/buffer-layout-utils.js
function Ji(e) {
	return e.attributes ? e.attributes.map((e) => e.attribute) : [e.name];
}
function Yi(e) {
	return Object.fromEntries(e.attributes.map((e) => [e.name, e.location]));
}
function Xi(e) {
	let t = Infinity;
	for (let n of e) n !== void 0 && (t = Math.min(t, n));
	return t;
}
function Zi(e, t, n) {
	Qi(t);
	let r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = $i(e);
		if (e.attributes) for (let n of e.attributes) r.has(n.attribute) || r.set(n.attribute, {
			bufferName: e.name,
			stepMode: e.stepMode,
			vertexFormat: n.format,
			byteOffset: n.byteOffset,
			byteStride: t
		});
		else e.format && !r.has(e.name) && r.set(e.name, {
			bufferName: e.name,
			stepMode: e.stepMode,
			vertexFormat: e.format,
			byteOffset: 0,
			byteStride: t
		});
	}
	return e.attributes.map((e) => {
		let t = r.get(e.name);
		!t && n?.warnOnMissingBufferLayout && O.warn(`layout for attribute "${e.name}" not present in buffer layout`)();
		let i = si.getAttributeShaderTypeInfo(e.type), a = t?.vertexFormat || M.getCompatibleVertexFormat(i);
		return {
			attributeName: e.name,
			bufferName: t?.bufferName || e.name,
			location: e.location,
			vertexFormat: a,
			byteOffset: t?.byteOffset ?? 0,
			byteStride: t?.byteStride ?? M.getVertexFormatInfo(a).byteLength,
			stepMode: t?.stepMode || e.stepMode || (e.name.startsWith("instance") ? "instance" : "vertex")
		};
	}).sort((e, t) => e.location - t.location);
}
function Qi(e) {
	for (let t of e) (t.attributes && t.format || !t.attributes && !t.format) && O.warn(`BufferLayout ${t.name} must have either 'attributes' or 'format' field`)();
}
function $i(e) {
	if (typeof e.byteStride == "number") return e.byteStride;
	if (e.attributes) {
		let t = 0;
		for (let n of e.attributes) t += M.getVertexFormatInfo(n.format).byteLength;
		return t;
	}
	return M.getVertexFormatInfo(e.format).byteLength;
}
var ea = t((() => {
	ye(), pi(), zt();
}));
//#endregion
//#region node_modules/@luma.gl/core/dist/adapter-utils/get-attribute-from-layouts.js
function ta(e, t) {
	let n = {}, r = Zi(e, t, { warnOnMissingBufferLayout: !0 });
	for (let t of r) {
		let r = na(e, t);
		n[t.attributeName] = r;
	}
	return n;
}
function na(e, t) {
	let n = ra(e, t.attributeName), r = si.getAttributeShaderTypeInfo(n.type), i = t.vertexFormat, a = M.getVertexFormatInfo(i);
	return {
		attributeName: t.attributeName,
		bufferName: t.bufferName,
		location: n.location,
		shaderType: n.type,
		primitiveType: r.primitiveType,
		shaderComponents: r.components,
		vertexFormat: i,
		bufferDataType: a.type,
		bufferComponents: a.components,
		normalized: a.normalized,
		integer: r.integer,
		stepMode: t.stepMode,
		byteOffset: t.byteOffset,
		byteStride: t.byteStride
	};
}
function ra(e, t) {
	let n = e.attributes.find((e) => e.name === t);
	return n || O.warn(`shader layout attribute "${t}" not present in shader`)(), n || null;
}
var ia = t((() => {
	ye(), pi(), zt(), ea();
})), I = t((() => {
	We(), Xe(), zn(), nr(), ir(), A(), vt(), cr(), ur(), fr(), Cr(), or(), Tr(), Dr(), kr(), Nr(), Fr(), Br(), Hr(), jr(), Wr(), Kr(), Jr(), Xr(), Qr(), ei(), Ei(), Li(), Ui(), qi(), St(), Pt(), jt(), pi(), zt(), En(), ye(), Kn(), Ai(), ia(), ea(), fn();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/polyfills/polyfill-webgl1-extensions.js
function aa(e = !0) {
	let t = HTMLCanvasElement.prototype;
	!e && t.originalGetContext ? (t.getContext = t.originalGetContext, t.originalGetContext = void 0) : (t.originalGetContext = t.getContext, t.getContext = function(e, t) {
		if (e === "webgl" || e === "experimental-webgl") {
			let e = this.originalGetContext("webgl2", t);
			return e instanceof HTMLElement && oa(e), e;
		}
		return this.originalGetContext(e, t);
	});
}
function oa(e) {
	e.getExtension("EXT_color_buffer_float");
	let t = {
		...sa,
		WEBGL_disjoint_timer_query: e.getExtension("EXT_disjoint_timer_query_webgl2"),
		WEBGL_draw_buffers: ca(e),
		OES_vertex_array_object: la(e),
		ANGLE_instanced_arrays: ua(e)
	}, n = e.getExtension.bind(e);
	e.getExtension = function(e) {
		return n(e) || (e in t ? t[e] : null);
	};
	let r = e.getSupportedExtensions;
	e.getSupportedExtensions = function() {
		return (r.apply(e) || [])?.concat(Object.keys(t));
	};
}
var sa, ca, la, ua, da = t((() => {
	sa = {
		WEBGL_depth_texture: { UNSIGNED_INT_24_8_WEBGL: 34042 },
		OES_element_index_uint: {},
		OES_texture_float: {},
		OES_texture_half_float: { HALF_FLOAT_OES: 5131 },
		EXT_color_buffer_float: {},
		OES_standard_derivatives: { FRAGMENT_SHADER_DERIVATIVE_HINT_OES: 35723 },
		EXT_frag_depth: {},
		EXT_blend_minmax: {
			MIN_EXT: 32775,
			MAX_EXT: 32776
		},
		EXT_shader_texture_lod: {}
	}, ca = (e) => ({
		drawBuffersWEBGL(t) {
			return e.drawBuffers(t);
		},
		COLOR_ATTACHMENT0_WEBGL: 36064,
		COLOR_ATTACHMENT1_WEBGL: 36065,
		COLOR_ATTACHMENT2_WEBGL: 36066,
		COLOR_ATTACHMENT3_WEBGL: 36067
	}), la = (e) => ({
		VERTEX_ARRAY_BINDING_OES: 34229,
		createVertexArrayOES() {
			return e.createVertexArray();
		},
		deleteVertexArrayOES(t) {
			return e.deleteVertexArray(t);
		},
		isVertexArrayOES(t) {
			return e.isVertexArray(t);
		},
		bindVertexArrayOES(t) {
			return e.bindVertexArray(t);
		}
	}), ua = (e) => ({
		VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: 35070,
		drawArraysInstancedANGLE(...t) {
			return e.drawArraysInstanced(...t);
		},
		drawElementsInstancedANGLE(...t) {
			return e.drawElementsInstanced(...t);
		},
		vertexAttribDivisorANGLE(...t) {
			return e.vertexAttribDivisor(...t);
		}
	});
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/debug/debug-hooks.js
async function fa() {
	_a ? await _a.load() : ga();
}
function pa(e, t) {
	return _a ? _a.makeDebugContext(e, t) : (ga(), e);
}
async function ma(e) {
	va ? await va.load(e) : ga();
}
function ha(e) {
	return va?.initialize(e) || null;
}
function ga() {
	ya || (ya = !0, O.warn("Import @luma.gl/webgl/debug before enabling WebGL debugging.")());
}
var _a, va, ya, ba = t((() => {
	I(), _a = null, va = null, ya = !1;
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/parameters/webgl-parameter-tables.js
function xa(e) {
	return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function L(e, t, n) {
	return t[e] === void 0 ? n[e] : t[e];
}
var Sa, R, Ca, z, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma = t((() => {
	Sa = {
		3042: !1,
		32773: new Float32Array([
			0,
			0,
			0,
			0
		]),
		32777: 32774,
		34877: 32774,
		32969: 1,
		32968: 0,
		32971: 1,
		32970: 0,
		3106: new Float32Array([
			0,
			0,
			0,
			0
		]),
		3107: [
			!0,
			!0,
			!0,
			!0
		],
		2884: !1,
		2885: 1029,
		2929: !1,
		2931: 1,
		2932: 513,
		2928: new Float32Array([0, 1]),
		2930: !0,
		3024: !0,
		35725: null,
		36006: null,
		36007: null,
		34229: null,
		34964: null,
		2886: 2305,
		33170: 4352,
		2849: 1,
		32823: !1,
		32824: 0,
		10752: 0,
		32926: !1,
		32928: !1,
		32938: 1,
		32939: !1,
		3089: !1,
		3088: new Int32Array([
			0,
			0,
			1024,
			1024
		]),
		2960: !1,
		2961: 0,
		2968: 4294967295,
		36005: 4294967295,
		2962: 519,
		2967: 0,
		2963: 4294967295,
		34816: 519,
		36003: 0,
		36004: 4294967295,
		2964: 7680,
		2965: 7680,
		2966: 7680,
		34817: 7680,
		34818: 7680,
		34819: 7680,
		2978: [
			0,
			0,
			1024,
			1024
		],
		36389: null,
		36662: null,
		36663: null,
		35053: null,
		35055: null,
		35723: 4352,
		36010: null,
		35977: !1,
		3333: 4,
		3317: 4,
		37440: !1,
		37441: !1,
		37443: 37444,
		3330: 0,
		3332: 0,
		3331: 0,
		3314: 0,
		32878: 0,
		3316: 0,
		3315: 0,
		32877: 0
	}, R = (e, t, n) => t ? e.enable(n) : e.disable(n), Ca = (e, t, n) => e.hint(n, t), z = (e, t, n) => e.pixelStorei(n, t), wa = (e, t, n) => {
		let r = n === 36006 ? 36009 : 36008;
		return e.bindFramebuffer(r, t);
	}, Ta = (e, t, n) => {
		let r = {
			34964: 34962,
			36662: 36662,
			36663: 36663,
			35053: 35051,
			35055: 35052
		}[n];
		e.bindBuffer(r, t);
	}, Ea = {
		3042: R,
		32773: (e, t) => e.blendColor(...t),
		32777: "blendEquation",
		34877: "blendEquation",
		32969: "blendFunc",
		32968: "blendFunc",
		32971: "blendFunc",
		32970: "blendFunc",
		3106: (e, t) => e.clearColor(...t),
		3107: (e, t) => e.colorMask(...t),
		2884: R,
		2885: (e, t) => e.cullFace(t),
		2929: R,
		2931: (e, t) => e.clearDepth(t),
		2932: (e, t) => e.depthFunc(t),
		2928: (e, t) => e.depthRange(...t),
		2930: (e, t) => e.depthMask(t),
		3024: R,
		35723: Ca,
		35725: (e, t) => e.useProgram(t),
		36007: (e, t) => e.bindRenderbuffer(36161, t),
		36389: (e, t) => e.bindTransformFeedback?.(36386, t),
		34229: (e, t) => e.bindVertexArray(t),
		36006: wa,
		36010: wa,
		34964: Ta,
		36662: Ta,
		36663: Ta,
		35053: Ta,
		35055: Ta,
		2886: (e, t) => e.frontFace(t),
		33170: Ca,
		2849: (e, t) => e.lineWidth(t),
		32823: R,
		32824: "polygonOffset",
		10752: "polygonOffset",
		35977: R,
		32926: R,
		32928: R,
		32938: "sampleCoverage",
		32939: "sampleCoverage",
		3089: R,
		3088: (e, t) => e.scissor(...t),
		2960: R,
		2961: (e, t) => e.clearStencil(t),
		2968: (e, t) => e.stencilMaskSeparate(1028, t),
		36005: (e, t) => e.stencilMaskSeparate(1029, t),
		2962: "stencilFuncFront",
		2967: "stencilFuncFront",
		2963: "stencilFuncFront",
		34816: "stencilFuncBack",
		36003: "stencilFuncBack",
		36004: "stencilFuncBack",
		2964: "stencilOpFront",
		2965: "stencilOpFront",
		2966: "stencilOpFront",
		34817: "stencilOpBack",
		34818: "stencilOpBack",
		34819: "stencilOpBack",
		2978: (e, t) => e.viewport(...t),
		34383: R,
		10754: R,
		12288: R,
		12289: R,
		12290: R,
		12291: R,
		12292: R,
		12293: R,
		12294: R,
		12295: R,
		3333: z,
		3317: z,
		37440: z,
		37441: z,
		37443: z,
		3330: z,
		3332: z,
		3331: z,
		3314: z,
		32878: z,
		3316: z,
		3315: z,
		32877: z,
		framebuffer: (e, t) => {
			let n = t && "handle" in t ? t.handle : t;
			return e.bindFramebuffer(36160, n);
		},
		blend: (e, t) => t ? e.enable(3042) : e.disable(3042),
		blendColor: (e, t) => e.blendColor(...t),
		blendEquation: (e, t) => {
			let n = typeof t == "number" ? [t, t] : t;
			e.blendEquationSeparate(...n);
		},
		blendFunc: (e, t) => {
			let n = t?.length === 2 ? [...t, ...t] : t;
			e.blendFuncSeparate(...n);
		},
		clearColor: (e, t) => e.clearColor(...t),
		clearDepth: (e, t) => e.clearDepth(t),
		clearStencil: (e, t) => e.clearStencil(t),
		colorMask: (e, t) => e.colorMask(...t),
		cull: (e, t) => t ? e.enable(2884) : e.disable(2884),
		cullFace: (e, t) => e.cullFace(t),
		depthTest: (e, t) => t ? e.enable(2929) : e.disable(2929),
		depthFunc: (e, t) => e.depthFunc(t),
		depthMask: (e, t) => e.depthMask(t),
		depthRange: (e, t) => e.depthRange(...t),
		dither: (e, t) => t ? e.enable(3024) : e.disable(3024),
		derivativeHint: (e, t) => {
			e.hint(35723, t);
		},
		frontFace: (e, t) => e.frontFace(t),
		mipmapHint: (e, t) => e.hint(33170, t),
		lineWidth: (e, t) => e.lineWidth(t),
		polygonOffsetFill: (e, t) => t ? e.enable(32823) : e.disable(32823),
		polygonOffset: (e, t) => e.polygonOffset(...t),
		sampleCoverage: (e, t) => e.sampleCoverage(t[0], t[1] || !1),
		scissorTest: (e, t) => t ? e.enable(3089) : e.disable(3089),
		scissor: (e, t) => e.scissor(...t),
		stencilTest: (e, t) => t ? e.enable(2960) : e.disable(2960),
		stencilMask: (e, t) => {
			t = xa(t) ? t : [t, t];
			let [n, r] = t;
			e.stencilMaskSeparate(1028, n), e.stencilMaskSeparate(1029, r);
		},
		stencilFunc: (e, t) => {
			t = xa(t) && t.length === 3 ? [...t, ...t] : t;
			let [n, r, i, a, o, s] = t;
			e.stencilFuncSeparate(1028, n, r, i), e.stencilFuncSeparate(1029, a, o, s);
		},
		stencilOp: (e, t) => {
			t = xa(t) && t.length === 3 ? [...t, ...t] : t;
			let [n, r, i, a, o, s] = t;
			e.stencilOpSeparate(1028, n, r, i), e.stencilOpSeparate(1029, a, o, s);
		},
		viewport: (e, t) => e.viewport(...t)
	}, Da = {
		blendEquation: (e, t, n) => e.blendEquationSeparate(L(32777, t, n), L(34877, t, n)),
		blendFunc: (e, t, n) => e.blendFuncSeparate(L(32969, t, n), L(32968, t, n), L(32971, t, n), L(32970, t, n)),
		polygonOffset: (e, t, n) => e.polygonOffset(L(32824, t, n), L(10752, t, n)),
		sampleCoverage: (e, t, n) => e.sampleCoverage(L(32938, t, n), L(32939, t, n)),
		stencilFuncFront: (e, t, n) => e.stencilFuncSeparate(1028, L(2962, t, n), L(2967, t, n), L(2963, t, n)),
		stencilFuncBack: (e, t, n) => e.stencilFuncSeparate(1029, L(34816, t, n), L(36003, t, n), L(36004, t, n)),
		stencilOpFront: (e, t, n) => e.stencilOpSeparate(1028, L(2964, t, n), L(2965, t, n), L(2966, t, n)),
		stencilOpBack: (e, t, n) => e.stencilOpSeparate(1029, L(34817, t, n), L(34818, t, n), L(34819, t, n))
	}, Oa = {
		enable: (e, t) => e({ [t]: !0 }),
		disable: (e, t) => e({ [t]: !1 }),
		pixelStorei: (e, t, n) => e({ [t]: n }),
		hint: (e, t, n) => e({ [t]: n }),
		useProgram: (e, t) => e({ 35725: t }),
		bindRenderbuffer: (e, t, n) => e({ 36007: n }),
		bindTransformFeedback: (e, t, n) => e({ 36389: n }),
		bindVertexArray: (e, t) => e({ 34229: t }),
		bindFramebuffer: (e, t, n) => {
			switch (t) {
				case 36160: return e({
					36006: n,
					36010: n
				});
				case 36009: return e({ 36006: n });
				case 36008: return e({ 36010: n });
				default: return null;
			}
		},
		bindBuffer: (e, t, n) => {
			let r = {
				34962: [34964],
				36662: [36662],
				36663: [36663],
				35051: [35053],
				35052: [35055]
			}[t];
			return r ? e({ [r]: n }) : { valueChanged: !0 };
		},
		blendColor: (e, t, n, r, i) => e({ 32773: new Float32Array([
			t,
			n,
			r,
			i
		]) }),
		blendEquation: (e, t) => e({
			32777: t,
			34877: t
		}),
		blendEquationSeparate: (e, t, n) => e({
			32777: t,
			34877: n
		}),
		blendFunc: (e, t, n) => e({
			32969: t,
			32968: n,
			32971: t,
			32970: n
		}),
		blendFuncSeparate: (e, t, n, r, i) => e({
			32969: t,
			32968: n,
			32971: r,
			32970: i
		}),
		clearColor: (e, t, n, r, i) => e({ 3106: new Float32Array([
			t,
			n,
			r,
			i
		]) }),
		clearDepth: (e, t) => e({ 2931: t }),
		clearStencil: (e, t) => e({ 2961: t }),
		colorMask: (e, t, n, r, i) => e({ 3107: [
			t,
			n,
			r,
			i
		] }),
		cullFace: (e, t) => e({ 2885: t }),
		depthFunc: (e, t) => e({ 2932: t }),
		depthRange: (e, t, n) => e({ 2928: new Float32Array([t, n]) }),
		depthMask: (e, t) => e({ 2930: t }),
		frontFace: (e, t) => e({ 2886: t }),
		lineWidth: (e, t) => e({ 2849: t }),
		polygonOffset: (e, t, n) => e({
			32824: t,
			10752: n
		}),
		sampleCoverage: (e, t, n) => e({
			32938: t,
			32939: n
		}),
		scissor: (e, t, n, r, i) => e({ 3088: new Int32Array([
			t,
			n,
			r,
			i
		]) }),
		stencilMask: (e, t) => e({
			2968: t,
			36005: t
		}),
		stencilMaskSeparate: (e, t, n) => e({ [t === 1028 ? 2968 : 36005]: n }),
		stencilFunc: (e, t, n, r) => e({
			2962: t,
			2967: n,
			2963: r,
			34816: t,
			36003: n,
			36004: r
		}),
		stencilFuncSeparate: (e, t, n, r, i) => e({
			[t === 1028 ? 2962 : 34816]: n,
			[t === 1028 ? 2967 : 36003]: r,
			[t === 1028 ? 2963 : 36004]: i
		}),
		stencilOp: (e, t, n, r) => e({
			2964: t,
			2965: n,
			2966: r,
			34817: t,
			34818: n,
			34819: r
		}),
		stencilOpSeparate: (e, t, n, r, i) => e({
			[t === 1028 ? 2964 : 34817]: n,
			[t === 1028 ? 2965 : 34818]: r,
			[t === 1028 ? 2966 : 34819]: i
		}),
		viewport: (e, t, n, r, i) => e({ 2978: [
			t,
			n,
			r,
			i
		] })
	}, ka = (e, t) => e.isEnabled(t), Aa = {
		3042: ka,
		2884: ka,
		2929: ka,
		3024: ka,
		32823: ka,
		32926: ka,
		32928: ka,
		3089: ka,
		2960: ka,
		35977: ka
	}, ja = /* @__PURE__ */ new Set([
		34016,
		36388,
		36387,
		35983,
		35368,
		34965,
		35739,
		35738,
		3074,
		34853,
		34854,
		34855,
		34856,
		34857,
		34858,
		34859,
		34860,
		34861,
		34862,
		34863,
		34864,
		34865,
		34866,
		34867,
		34868,
		35097,
		32873,
		35869,
		32874,
		34068
	]);
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/parameters/unified-parameter-api.js
function Na(e, t) {
	if (Ia(t)) return;
	let n = {};
	for (let r in t) {
		let i = Number(r), a = Ea[r];
		a && (typeof a == "string" ? n[a] = !0 : a(e, t[r], i));
	}
	let r = e.lumaState?.cache;
	if (r) for (let i in n) {
		let n = Da[i];
		n(e, t, r);
	}
}
function Pa(e, t = Sa) {
	if (typeof t == "number") {
		let n = t, r = Aa[n];
		return r ? r(e, n) : e.getParameter(n);
	}
	let n = Array.isArray(t) ? t : Object.keys(t), r = {};
	for (let t of n) {
		let n = Aa[t];
		r[t] = n ? n(e, Number(t)) : e.getParameter(Number(t));
	}
	return r;
}
function Fa(e) {
	Na(e, Sa);
}
function Ia(e) {
	for (let t in e) return !1;
	return !0;
}
var La = t((() => {
	Ma();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/state-tracker/deep-array-equal.js
function Ra(e, t) {
	if (e === t) return !0;
	if (za(e) && za(t) && e.length === t.length) {
		for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
function za(e) {
	return Array.isArray(e) || ArrayBuffer.isView(e);
}
var Ba = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/state-tracker/webgl-state-tracker.js
function Va(e, t) {
	let n = e[t].bind(e);
	e[t] = function(t) {
		if (t === void 0 || ja.has(t)) return n(t);
		let r = Wa.get(e);
		return t in r.cache || (r.cache[t] = n(t)), r.enable ? r.cache[t] : n(t);
	}, Object.defineProperty(e[t], "name", {
		value: `${t}-from-cache`,
		configurable: !1
	});
}
function Ha(e, t, n) {
	if (!e[t]) return;
	let r = e[t].bind(e);
	e[t] = function(...t) {
		let { valueChanged: i, oldValue: a } = n(Wa.get(e)._updateCache, ...t);
		return i && r(...t), a;
	}, Object.defineProperty(e[t], "name", {
		value: `${t}-to-cache`,
		configurable: !1
	});
}
function Ua(e) {
	let t = e.useProgram.bind(e);
	e.useProgram = function(n) {
		let r = Wa.get(e);
		r.program !== n && (t(n), r.program = n);
	};
}
var Wa, Ga = t((() => {
	La(), Ba(), Ma(), Wa = class {
		static get(e) {
			return e.lumaState;
		}
		gl;
		program = null;
		stateStack = [];
		enable = !0;
		cache = null;
		log;
		initialized = !1;
		constructor(e, t) {
			this.gl = e, this.log = t?.log || (() => {}), this._updateCache = this._updateCache.bind(this), Object.seal(this);
		}
		push(e = {}) {
			this.stateStack.push({});
		}
		pop() {
			let e = this.stateStack[this.stateStack.length - 1];
			Na(this.gl, e), this.stateStack.pop();
		}
		trackState(e, t) {
			if (this.cache = t?.copyState ? Pa(e) : Object.assign({}, Sa), this.initialized) throw Error("WebGLStateTracker");
			this.initialized = !0, this.gl.lumaState = this, Ua(e);
			for (let t in Oa) {
				let n = Oa[t];
				Ha(e, t, n);
			}
			Va(e, "getParameter"), Va(e, "isEnabled");
		}
		_updateCache(e) {
			let t = !1, n, r = this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
			for (let i in e) {
				let a = e[i], o = this.cache[i];
				Ra(a, o) || (t = !0, n = o, r && !(i in r) && (r[i] = o), this.cache[i] = a);
			}
			return {
				valueChanged: t,
				oldValue: n
			};
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/helpers/webgl-context-data.js
function Ka(e) {
	let t = e.luma || {
		_polyfilled: !1,
		extensions: {},
		softwareRenderer: !1
	};
	return t._polyfilled ??= !1, t.extensions ||= {}, e.luma = t, t;
}
var qa = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/helpers/create-browser-context.js
function Ja(e, t, n) {
	let r = "", i = (e) => {
		let t = e.statusMessage;
		t && (r ||= t);
	};
	e.addEventListener("webglcontextcreationerror", i, !1);
	let a = n.failIfMajorPerformanceCaveat !== !0, o = {
		preserveDrawingBuffer: !0,
		...n,
		failIfMajorPerformanceCaveat: !0
	}, s = null;
	try {
		s ||= e.getContext("webgl2", o), !s && o.failIfMajorPerformanceCaveat && (r ||= "Only software GPU is available. Set `failIfMajorPerformanceCaveat: false` to allow.");
		let n = !1;
		if (!s && a && (o.failIfMajorPerformanceCaveat = !1, s = e.getContext("webgl2", o), n = !0), s || (s = e.getContext("webgl", {}), s && (s = null, r ||= "Your browser only supports WebGL1")), !s) throw r ||= "Your browser does not support WebGL", Error(`Failed to create WebGL context: ${r}`);
		let i = Ka(s);
		i.softwareRenderer = n;
		let { onContextLost: c, onContextRestored: l } = t;
		return e.addEventListener("webglcontextlost", (e) => c(e), !1), e.addEventListener("webglcontextrestored", (e) => l(e), !1), s;
	} finally {
		e.removeEventListener("webglcontextcreationerror", i, !1);
	}
}
var Ya = t((() => {
	qa();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/helpers/webgl-extensions.js
function Xa(e, t, n) {
	return n[t] === void 0 && (n[t] = e.getExtension(t) || null), n[t];
}
var Za = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/device-helpers/webgl-device-info.js
function Qa(e, t) {
	let n = e.getParameter(7936), r = e.getParameter(7937);
	Xa(e, "WEBGL_debug_renderer_info", t);
	let i = t.WEBGL_debug_renderer_info, a = e.getParameter(i ? i.UNMASKED_VENDOR_WEBGL : 7936), o = e.getParameter(i ? i.UNMASKED_RENDERER_WEBGL : 7937), s = a || n, c = o || r, l = e.getParameter(7938), u = $a(s, c), d = eo(s, c);
	return {
		type: "webgl",
		gpu: u,
		gpuType: to(s, c),
		gpuBackend: d,
		vendor: s,
		renderer: c,
		version: l,
		shadingLanguage: "glsl",
		shadingLanguageVersion: 300
	};
}
function $a(e, t) {
	return /NVIDIA/i.exec(e) || /NVIDIA/i.exec(t) ? "nvidia" : /INTEL/i.exec(e) || /INTEL/i.exec(t) ? "intel" : /Apple/i.exec(e) || /Apple/i.exec(t) ? "apple" : /AMD/i.exec(e) || /AMD/i.exec(t) || /ATI/i.exec(e) || /ATI/i.exec(t) ? "amd" : /SwiftShader/i.exec(e) || /SwiftShader/i.exec(t) ? "software" : "unknown";
}
function eo(e, t) {
	return /Metal/i.exec(e) || /Metal/i.exec(t) ? "metal" : /ANGLE/i.exec(e) || /ANGLE/i.exec(t) ? "opengl" : "unknown";
}
function to(e, t) {
	if (/SwiftShader/i.exec(e) || /SwiftShader/i.exec(t)) return "cpu";
	switch ($a(e, t)) {
		case "apple": return no(e, t) ? "integrated" : "unknown";
		case "intel": return "integrated";
		case "software": return "cpu";
		case "unknown": return "unknown";
		default: return "discrete";
	}
}
function no(e, t) {
	return /Apple (M\d|A\d|GPU)/i.test(`${e} ${t}`);
}
var ro = t((() => {
	Za();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/converters/webgl-vertex-formats.js
function io(e) {
	switch (e) {
		case "uint8": return 5121;
		case "sint8": return 5120;
		case "unorm8": return 5121;
		case "snorm8": return 5120;
		case "uint16": return 5123;
		case "sint16": return 5122;
		case "unorm16": return 5123;
		case "snorm16": return 5122;
		case "uint32": return 5125;
		case "sint32": return 5124;
		case "float16": return 5131;
		case "float32": return 5126;
	}
	throw Error(String(e));
}
var ao = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/converters/webgl-texture-table.js
function oo(e) {
	return e in Po;
}
function so(e, t, n) {
	return co(e, t, n, /* @__PURE__ */ new Set());
}
function co(e, t, n, r) {
	let i = Po[t];
	if (!i || r.has(t)) return !1;
	r.add(t);
	let a = (i.features || []).every((t) => co(e, t, n, r));
	return r.delete(t), a ? (i.extensions || []).every((t) => !!Xa(e, t, n)) : !1;
}
function lo(e, t, n) {
	let r = t.create, i = Fo[t.format];
	i?.gl === void 0 && (r = !1), i?.x && (r &&= !!Xa(e, i.x, n)), t.format === "stencil8" && (r = !1);
	let a = i?.r === !1 ? !1 : i?.r === void 0 || so(e, i.r, n), o = r && t.render && a && uo(e, t.format, n);
	return {
		format: t.format,
		create: r && t.create,
		render: o,
		filter: r && t.filter,
		blend: r && t.blend,
		store: r && t.store
	};
}
function uo(e, t, n) {
	let r = Fo[t], i = r?.gl;
	if (i === void 0 || r?.x && !Xa(e, r.x, n)) return !1;
	let a = e.getParameter(32873), o = e.getParameter(36006), s = e.createTexture(), c = e.createFramebuffer();
	if (!s || !c) return !1;
	let l = Number(e.getError());
	for (; l !== 0;) l = e.getError();
	let u = !1;
	try {
		if (e.bindTexture(3553, s), e.texStorage2D(3553, 1, i, 1, 1), Number(e.getError()) !== 0) return !1;
		e.bindFramebuffer(36160, c), e.framebufferTexture2D(36160, 36064, 3553, s, 0), u = Number(e.checkFramebufferStatus(36160)) === 36053 && Number(e.getError()) === 0;
	} finally {
		e.bindFramebuffer(36160, o), e.deleteFramebuffer(c), e.bindTexture(3553, a), e.deleteTexture(s);
	}
	return u;
}
function fo(e) {
	let t = Fo[e], n = ho(e), r = Tn.getInfo(e);
	return r.compressed && (t.dataFormat = n), {
		internalFormat: n,
		format: t?.dataFormat || mo(r.channels, r.integer, r.normalized, n),
		type: r.dataType ? io(r.dataType) : t?.types?.[0] || 5121,
		compressed: r.compressed || !1
	};
}
function po(e) {
	switch (Tn.getInfo(e).attachment) {
		case "depth": return 36096;
		case "stencil": return 36128;
		case "depth-stencil": return 33306;
		default: throw Error(`Not a depth stencil format: ${e}`);
	}
}
function mo(e, t, n, r) {
	if (r === 6408 || r === 6407) return r;
	switch (e) {
		case "r": return t && !n ? 36244 : 6403;
		case "rg": return t && !n ? 33320 : 33319;
		case "rgb": return t && !n ? 36248 : 6407;
		case "rgba": return t && !n ? 36249 : 6408;
		case "bgra": throw Error("bgra pixels not supported by WebGL");
		default: return 6408;
	}
}
function ho(e) {
	let t = Fo[e]?.gl;
	if (t === void 0) throw Error(`Unsupported texture format ${e}`);
	return t;
}
var go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io = t((() => {
	I(), Za(), ao(), go = "WEBGL_compressed_texture_s3tc", _o = "WEBGL_compressed_texture_s3tc_srgb", vo = "EXT_texture_compression_rgtc", yo = "EXT_texture_compression_bptc", bo = "WEBGL_compressed_texture_etc", xo = "WEBGL_compressed_texture_astc", So = "WEBGL_compressed_texture_etc1", Co = "WEBGL_compressed_texture_pvrtc", wo = "WEBGL_compressed_texture_atc", To = "EXT_texture_norm16", Eo = "EXT_render_snorm", Do = "EXT_color_buffer_float", Oo = "snorm8-renderable-webgl", ko = "norm16-renderable-webgl", Ao = "snorm16-renderable-webgl", jo = "float16-renderable-webgl", Mo = "float32-renderable-webgl", No = "rgb9e5ufloat-renderable-webgl", Po = {
		"float32-renderable-webgl": { extensions: [Do] },
		"float16-renderable-webgl": { extensions: ["EXT_color_buffer_half_float"] },
		"rgb9e5ufloat-renderable-webgl": { extensions: ["WEBGL_render_shared_exponent"] },
		"snorm8-renderable-webgl": { extensions: [Eo] },
		"norm16-webgl": { extensions: [To] },
		"norm16-renderable-webgl": { features: ["norm16-webgl"] },
		"snorm16-renderable-webgl": {
			features: ["norm16-webgl"],
			extensions: [Eo]
		},
		"float32-filterable": { extensions: ["OES_texture_float_linear"] },
		"float16-filterable-webgl": { extensions: ["OES_texture_half_float_linear"] },
		"texture-filterable-anisotropic-webgl": { extensions: ["EXT_texture_filter_anisotropic"] },
		"texture-blend-float-webgl": { extensions: ["EXT_float_blend"] },
		"texture-compression-bc": { extensions: [
			go,
			_o,
			vo,
			yo
		] },
		"texture-compression-bc5-webgl": { extensions: [vo] },
		"texture-compression-bc7-webgl": { extensions: [yo] },
		"texture-compression-etc2": { extensions: [bo] },
		"texture-compression-astc": { extensions: [xo] },
		"texture-compression-etc1-webgl": { extensions: [So] },
		"texture-compression-pvrtc-webgl": { extensions: [Co] },
		"texture-compression-atc-webgl": { extensions: [wo] }
	}, Fo = {
		r8unorm: {
			gl: 33321,
			rb: !0
		},
		r8snorm: {
			gl: 36756,
			r: Oo
		},
		r8uint: {
			gl: 33330,
			rb: !0
		},
		r8sint: {
			gl: 33329,
			rb: !0
		},
		rg8unorm: {
			gl: 33323,
			rb: !0
		},
		rg8snorm: {
			gl: 36757,
			r: Oo
		},
		rg8uint: {
			gl: 33336,
			rb: !0
		},
		rg8sint: {
			gl: 33335,
			rb: !0
		},
		r16uint: {
			gl: 33332,
			rb: !0
		},
		r16sint: {
			gl: 33331,
			rb: !0
		},
		r16float: {
			gl: 33325,
			rb: !0,
			r: jo
		},
		r16unorm: {
			gl: 33322,
			rb: !0,
			r: ko
		},
		r16snorm: {
			gl: 36760,
			r: Ao
		},
		"rgba4unorm-webgl": {
			gl: 32854,
			rb: !0
		},
		"rgb565unorm-webgl": {
			gl: 36194,
			rb: !0
		},
		"rgb5a1unorm-webgl": {
			gl: 32855,
			rb: !0
		},
		"rgb8unorm-webgl": { gl: 32849 },
		"rgb8snorm-webgl": { gl: 36758 },
		rgba8unorm: { gl: 32856 },
		"rgba8unorm-srgb": { gl: 35907 },
		rgba8snorm: {
			gl: 36759,
			r: Oo
		},
		rgba8uint: { gl: 36220 },
		rgba8sint: { gl: 36238 },
		bgra8unorm: {},
		"bgra8unorm-srgb": {},
		rg16uint: { gl: 33338 },
		rg16sint: { gl: 33337 },
		rg16float: {
			gl: 33327,
			rb: !0,
			r: jo
		},
		rg16unorm: {
			gl: 33324,
			r: ko
		},
		rg16snorm: {
			gl: 36761,
			r: Ao
		},
		r32uint: {
			gl: 33334,
			rb: !0
		},
		r32sint: {
			gl: 33333,
			rb: !0
		},
		r32float: {
			gl: 33326,
			r: Mo
		},
		rgb9e5ufloat: {
			gl: 35901,
			r: No
		},
		rg11b10ufloat: {
			gl: 35898,
			rb: !0
		},
		rgb10a2unorm: {
			gl: 32857,
			rb: !0
		},
		rgb10a2uint: {
			gl: 36975,
			rb: !0
		},
		"rgb16unorm-webgl": {
			gl: 32852,
			r: !1
		},
		"rgb16snorm-webgl": {
			gl: 36762,
			r: !1
		},
		rg32uint: {
			gl: 33340,
			rb: !0
		},
		rg32sint: {
			gl: 33339,
			rb: !0
		},
		rg32float: {
			gl: 33328,
			rb: !0,
			r: Mo
		},
		rgba16uint: {
			gl: 36214,
			rb: !0
		},
		rgba16sint: {
			gl: 36232,
			rb: !0
		},
		rgba16float: {
			gl: 34842,
			r: jo
		},
		rgba16unorm: {
			gl: 32859,
			rb: !0,
			r: ko
		},
		rgba16snorm: {
			gl: 36763,
			r: Ao
		},
		"rgb32float-webgl": {
			gl: 34837,
			x: Do,
			r: Mo,
			dataFormat: 6407,
			types: [5126]
		},
		rgba32uint: {
			gl: 36208,
			rb: !0
		},
		rgba32sint: {
			gl: 36226,
			rb: !0
		},
		rgba32float: {
			gl: 34836,
			rb: !0,
			r: Mo
		},
		stencil8: {
			gl: 36168,
			rb: !0
		},
		depth16unorm: {
			gl: 33189,
			dataFormat: 6402,
			types: [5123],
			rb: !0
		},
		depth24plus: {
			gl: 33190,
			dataFormat: 6402,
			types: [5125]
		},
		depth32float: {
			gl: 36012,
			dataFormat: 6402,
			types: [5126],
			rb: !0
		},
		"depth24plus-stencil8": {
			gl: 35056,
			rb: !0,
			depthTexture: !0,
			dataFormat: 34041,
			types: [34042]
		},
		"depth32float-stencil8": {
			gl: 36013,
			dataFormat: 34041,
			types: [36269],
			rb: !0
		},
		"bc1-rgb-unorm-webgl": {
			gl: 33776,
			x: go
		},
		"bc1-rgb-unorm-srgb-webgl": {
			gl: 35916,
			x: _o
		},
		"bc1-rgba-unorm": {
			gl: 33777,
			x: go
		},
		"bc1-rgba-unorm-srgb": {
			gl: 35916,
			x: _o
		},
		"bc2-rgba-unorm": {
			gl: 33778,
			x: go
		},
		"bc2-rgba-unorm-srgb": {
			gl: 35918,
			x: _o
		},
		"bc3-rgba-unorm": {
			gl: 33779,
			x: go
		},
		"bc3-rgba-unorm-srgb": {
			gl: 35919,
			x: _o
		},
		"bc4-r-unorm": {
			gl: 36283,
			x: vo
		},
		"bc4-r-snorm": {
			gl: 36284,
			x: vo
		},
		"bc5-rg-unorm": {
			gl: 36285,
			x: vo
		},
		"bc5-rg-snorm": {
			gl: 36286,
			x: vo
		},
		"bc6h-rgb-ufloat": {
			gl: 36495,
			x: yo
		},
		"bc6h-rgb-float": {
			gl: 36494,
			x: yo
		},
		"bc7-rgba-unorm": {
			gl: 36492,
			x: yo
		},
		"bc7-rgba-unorm-srgb": {
			gl: 36493,
			x: yo
		},
		"etc2-rgb8unorm": { gl: 37492 },
		"etc2-rgb8unorm-srgb": { gl: 37494 },
		"etc2-rgb8a1unorm": { gl: 37496 },
		"etc2-rgb8a1unorm-srgb": { gl: 37497 },
		"etc2-rgba8unorm": { gl: 37493 },
		"etc2-rgba8unorm-srgb": { gl: 37495 },
		"eac-r11unorm": { gl: 37488 },
		"eac-r11snorm": { gl: 37489 },
		"eac-rg11unorm": { gl: 37490 },
		"eac-rg11snorm": { gl: 37491 },
		"astc-4x4-unorm": { gl: 37808 },
		"astc-4x4-unorm-srgb": { gl: 37840 },
		"astc-5x4-unorm": { gl: 37809 },
		"astc-5x4-unorm-srgb": { gl: 37841 },
		"astc-5x5-unorm": { gl: 37810 },
		"astc-5x5-unorm-srgb": { gl: 37842 },
		"astc-6x5-unorm": { gl: 37811 },
		"astc-6x5-unorm-srgb": { gl: 37843 },
		"astc-6x6-unorm": { gl: 37812 },
		"astc-6x6-unorm-srgb": { gl: 37844 },
		"astc-8x5-unorm": { gl: 37813 },
		"astc-8x5-unorm-srgb": { gl: 37845 },
		"astc-8x6-unorm": { gl: 37814 },
		"astc-8x6-unorm-srgb": { gl: 37846 },
		"astc-8x8-unorm": { gl: 37815 },
		"astc-8x8-unorm-srgb": { gl: 37847 },
		"astc-10x5-unorm": { gl: 37816 },
		"astc-10x5-unorm-srgb": { gl: 37848 },
		"astc-10x6-unorm": { gl: 37817 },
		"astc-10x6-unorm-srgb": { gl: 37849 },
		"astc-10x8-unorm": { gl: 37818 },
		"astc-10x8-unorm-srgb": { gl: 37850 },
		"astc-10x10-unorm": { gl: 37819 },
		"astc-10x10-unorm-srgb": { gl: 37851 },
		"astc-12x10-unorm": { gl: 37820 },
		"astc-12x10-unorm-srgb": { gl: 37852 },
		"astc-12x12-unorm": { gl: 37821 },
		"astc-12x12-unorm-srgb": { gl: 37853 },
		"pvrtc-rgb4unorm-webgl": { gl: 35840 },
		"pvrtc-rgba4unorm-webgl": { gl: 35842 },
		"pvrtc-rgb2unorm-webgl": { gl: 35841 },
		"pvrtc-rgba2unorm-webgl": { gl: 35843 },
		"etc1-rbg-unorm-webgl": { gl: 36196 },
		"atc-rgb-unorm-webgl": { gl: 35986 },
		"atc-rgba-unorm-webgl": { gl: 35986 },
		"atc-rgbai-unorm-webgl": { gl: 34798 }
	};
})), Lo, Ro, zo = t((() => {
	I(), Za(), Io(), Lo = {
		"depth-clip-control": "EXT_depth_clamp",
		"timestamp-query": "EXT_disjoint_timer_query_webgl2",
		"compilation-status-async-webgl": "KHR_parallel_shader_compile",
		"html-in-canvas": (e) => Fn() && typeof e.texElementImage2D == "function",
		"polygon-mode-webgl": "WEBGL_polygon_mode",
		"provoking-vertex-webgl": "WEBGL_provoking_vertex",
		"shader-clip-cull-distance-webgl": "WEBGL_clip_cull_distance",
		"shader-noperspective-interpolation-webgl": "NV_shader_noperspective_interpolation",
		"shader-conservative-depth-webgl": "EXT_conservative_depth"
	}, Ro = class extends Ln {
		gl;
		extensions;
		testedFeatures = /* @__PURE__ */ new Set();
		constructor(e, t, n) {
			super([], n), this.gl = e, this.extensions = t, Xa(e, "EXT_color_buffer_float", t);
		}
		*[Symbol.iterator]() {
			let e = this.getFeatures();
			for (let t of e) this.has(t) && (yield t);
			return [];
		}
		has(e) {
			return !this.disabledFeatures?.[e] && (this.testedFeatures.has(e) || (this.testedFeatures.add(e), oo(e) && so(this.gl, e, this.extensions) && this.features.add(e), this.getWebGLFeature(e) && this.features.add(e)), this.features.has(e));
		}
		initializeFeatures() {
			let e = this.getFeatures().filter((e) => e !== "polygon-mode-webgl");
			for (let t of e) this.has(t);
		}
		getFeatures() {
			return [...Object.keys(Lo), ...Object.keys(Po)];
		}
		getWebGLFeature(e) {
			let t = Lo[e];
			return typeof t == "string" ? !!Xa(this.gl, t, this.extensions) : typeof t == "function" ? t(this.gl) : !!t;
		}
	};
})), Bo, Vo = t((() => {
	I(), Bo = class extends In {
		get maxTextureDimension1D() {
			return 0;
		}
		get maxTextureDimension2D() {
			return this.getParameter(3379);
		}
		get maxTextureDimension3D() {
			return this.getParameter(32883);
		}
		get maxTextureArrayLayers() {
			return this.getParameter(35071);
		}
		get maxBindGroups() {
			return 0;
		}
		get maxBindGroupsPlusVertexBuffers() {
			return 0;
		}
		get maxBindingsPerBindGroup() {
			return 0;
		}
		get maxDynamicUniformBuffersPerPipelineLayout() {
			return 0;
		}
		get maxDynamicStorageBuffersPerPipelineLayout() {
			return 0;
		}
		get maxSampledTexturesPerShaderStage() {
			return this.getParameter(35660);
		}
		get maxSamplersPerShaderStage() {
			return this.getParameter(35661);
		}
		get maxStorageBuffersPerShaderStage() {
			return 0;
		}
		get maxStorageBuffersInVertexStage() {
			return 0;
		}
		get maxStorageBuffersInFragmentStage() {
			return 0;
		}
		get maxStorageTexturesPerShaderStage() {
			return 0;
		}
		get maxStorageTexturesInVertexStage() {
			return 0;
		}
		get maxStorageTexturesInFragmentStage() {
			return 0;
		}
		get maxUniformBuffersPerShaderStage() {
			return this.getParameter(35375);
		}
		get maxUniformBufferBindingSize() {
			return this.getParameter(35376);
		}
		get maxStorageBufferBindingSize() {
			return 0;
		}
		get maxBufferSize() {
			return 2 ** 53 - 1;
		}
		get minUniformBufferOffsetAlignment() {
			return this.getParameter(35380);
		}
		get minStorageBufferOffsetAlignment() {
			return 0;
		}
		get maxVertexBuffers() {
			return 16;
		}
		get maxVertexAttributes() {
			return this.getParameter(34921);
		}
		get maxVertexBufferArrayStride() {
			return 2048;
		}
		get maxInterStageShaderVariables() {
			return this.getParameter(35659);
		}
		get maxColorAttachments() {
			return this.getParameter(36063);
		}
		get maxColorAttachmentBytesPerSample() {
			return 0;
		}
		get maxComputeWorkgroupStorageSize() {
			return 0;
		}
		get maxComputeInvocationsPerWorkgroup() {
			return 0;
		}
		get maxComputeWorkgroupSizeX() {
			return 0;
		}
		get maxComputeWorkgroupSizeY() {
			return 0;
		}
		get maxComputeWorkgroupSizeZ() {
			return 0;
		}
		get maxComputeWorkgroupsPerDimension() {
			return 0;
		}
		gl;
		limits = {};
		constructor(e) {
			super(), this.gl = e;
		}
		getParameter(e) {
			return this.limits[e] === void 0 && (this.limits[e] = this.gl.getParameter(e)), this.limits[e] || 0;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-framebuffer.js
function Ho(e) {
	return e < 34069 ? e + 34069 : e;
}
function Uo(e) {
	switch (e) {
		case 36053: return "success";
		case 36054: return "Mismatched attachments";
		case 36055: return "No attachments";
		case 36057: return "Height/width mismatch";
		case 36061: return "Unsupported or split attachments";
		case 36182: return "Samples mismatch";
		default: return `${e}`;
	}
}
var Wo, Go = t((() => {
	I(), Io(), Wo = class extends wr {
		device;
		gl;
		handle;
		colorAttachments = [];
		depthStencilAttachment = null;
		constructor(e, t) {
			super(e, t);
			let n = t.handle, r = n === null;
			this.device = e, this.gl = e.gl, this.handle = n || r ? n : this.gl.createFramebuffer(), r || (e._setWebGLDebugMetadata(this.handle, this, { spector: this.props }), t.handle || (this.autoCreateAttachmentTextures(), this.updateAttachments()));
		}
		destroy() {
			super.destroy(), !this.destroyed && this.handle !== null && !this.props.handle && this.gl.deleteFramebuffer(this.handle);
		}
		updateAttachments() {
			let e = this.gl.bindFramebuffer(36160, this.handle);
			for (let e = 0; e < this.colorAttachments.length; ++e) {
				let t = this.colorAttachments[e];
				if (t) {
					let n = 36064 + e;
					this._attachTextureView(n, t);
				}
			}
			if (this.depthStencilAttachment) {
				let e = po(this.depthStencilAttachment.props.format);
				this._attachTextureView(e, this.depthStencilAttachment);
			}
			if (this.device.props.debug) {
				let e = this.gl.checkFramebufferStatus(36160);
				if (e !== 36053) throw Error(`Framebuffer ${Uo(e)}`);
			}
			this.gl.bindFramebuffer(36160, e);
		}
		_attachTextureView(e, t) {
			let { gl: n } = this.device, { texture: r } = t, i = t.props.baseMipLevel, a = t.props.baseArrayLayer;
			switch (n.bindTexture(r.glTarget, r.handle), r.glTarget) {
				case 35866:
				case 32879:
					n.framebufferTextureLayer(36160, e, r.handle, i, a);
					break;
				case 34067:
					let t = Ho(a);
					n.framebufferTexture2D(36160, e, t, r.handle, i);
					break;
				case 3553:
					n.framebufferTexture2D(36160, e, 3553, r.handle, i);
					break;
				default: throw Error("Illegal texture type");
			}
			n.bindTexture(r.glTarget, null);
		}
		resizeAttachments(e, t) {
			this.handle === null ? (this.width = e, this.height = t) : super.resizeAttachments(e, t);
		}
	};
})), Ko, qo = t((() => {
	I(), Go(), Ko = class extends tr {
		device;
		handle = null;
		_framebuffer = null;
		get [Symbol.toStringTag]() {
			return "WebGLCanvasContext";
		}
		constructor(e, t) {
			super(t), this.device = e, this._setAutoCreatedCanvasId(`${this.device.id}-canvas`), this._configureDevice();
		}
		_configureDevice() {
			(this.drawingBufferWidth !== this._framebuffer?.width || this.drawingBufferHeight !== this._framebuffer?.height) && this._framebuffer?.resize([this.drawingBufferWidth, this.drawingBufferHeight]);
		}
		_getCurrentFramebuffer() {
			return this._framebuffer ||= new Wo(this.device, {
				id: "canvas-context-framebuffer",
				handle: null,
				width: this.drawingBufferWidth,
				height: this.drawingBufferHeight
			}), this._framebuffer;
		}
	};
})), Jo, Yo = t((() => {
	I(), Jo = class extends rr {
		device;
		handle = null;
		context2d;
		get [Symbol.toStringTag]() {
			return "WebGLPresentationContext";
		}
		constructor(e, t = {}) {
			super(t), this.device = e;
			let n = `${this[Symbol.toStringTag]}(${this.id})`;
			if (!this.device.getDefaultCanvasContext().offscreenCanvas) throw Error(`${n}: WebGL PresentationContext requires the default CanvasContext canvas to be an OffscreenCanvas`);
			let r = this.canvas.getContext("2d");
			if (!r) throw Error(`${n}: Failed to create 2d presentation context`);
			this.context2d = r, this._setAutoCreatedCanvasId(`${this.device.id}-presentation-canvas`), this._configureDevice(), this._startObservers();
		}
		present() {
			this._resizeDrawingBufferIfNeeded(), this.device.submit();
			let e = this.device.getDefaultCanvasContext(), [t, n] = e.getDrawingBufferSize();
			if (this.drawingBufferWidth !== 0 && this.drawingBufferHeight !== 0 && t !== 0 && n !== 0 && e.canvas.width !== 0 && e.canvas.height !== 0) {
				if (t !== this.drawingBufferWidth || n !== this.drawingBufferHeight || e.canvas.width !== this.drawingBufferWidth || e.canvas.height !== this.drawingBufferHeight) throw Error(`${this[Symbol.toStringTag]}(${this.id}): Default canvas context size ${t}x${n} does not match presentation size ${this.drawingBufferWidth}x${this.drawingBufferHeight}`);
				this.context2d.clearRect(0, 0, this.drawingBufferWidth, this.drawingBufferHeight), this.context2d.drawImage(e.canvas, 0, 0);
			}
		}
		_configureDevice() {}
		_getCurrentFramebuffer(e) {
			let t = this.device.getDefaultCanvasContext();
			return t.setDrawingBufferSize(this.drawingBufferWidth, this.drawingBufferHeight), t.getCurrentFramebuffer(e);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/utils/uid.js
function Xo(e = "id") {
	return Zo[e] = Zo[e] || 1, `${e}-${Zo[e]++}`;
}
var Zo, Qo = t((() => {
	Zo = {};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-buffer.js
function $o(e) {
	return e & j.INDEX ? 34963 : e & j.VERTEX ? 34962 : e & j.UNIFORM ? 35345 : 34962;
}
function es(e) {
	return e & j.INDEX || e & j.VERTEX ? 35044 : e & j.UNIFORM ? 35048 : 35044;
}
var ts, ns = t((() => {
	I(), ts = class extends j {
		device;
		gl;
		handle;
		glTarget;
		glUsage;
		glIndexType = 5123;
		byteLength = 0;
		bytesUsed = 0;
		constructor(e, t = {}) {
			super(e, t), this.device = e, this.gl = this.device.gl;
			let n = typeof t == "object" ? t.handle : void 0;
			this.handle = n || this.gl.createBuffer(), e._setWebGLDebugMetadata(this.handle, this, { spector: {
				...this.props,
				data: typeof this.props.data
			} }), this.glTarget = $o(this.props.usage), this.glUsage = es(this.props.usage), this.glIndexType = this.props.indexType === "uint32" ? 5125 : 5123, t.data ? this._initWithData(t.data, t.byteOffset, t.byteLength) : this._initWithByteLength(t.byteLength || 0);
		}
		destroy() {
			!this.destroyed && this.handle && (this.removeStats(), this.props.handle ? this.trackDeallocatedReferencedMemory("Buffer") : (this.trackDeallocatedMemory(), this.gl.deleteBuffer(this.handle)), this.destroyed = !0, this.handle = null);
		}
		_initWithData(e, t = 0, n = e.byteLength + t) {
			let r = this.glTarget;
			this.gl.bindBuffer(r, this.handle), this.gl.bufferData(r, n, this.glUsage), this.gl.bufferSubData(r, t, e), this.gl.bindBuffer(r, null), this.bytesUsed = n, this.byteLength = n, this._setDebugData(e, t, n), this.props.handle ? this.trackReferencedMemory(n, "Buffer") : this.trackAllocatedMemory(n);
		}
		_initWithByteLength(e) {
			let t = e;
			e === 0 && (t = /* @__PURE__ */ new Float32Array());
			let n = this.glTarget;
			return this.gl.bindBuffer(n, this.handle), this.gl.bufferData(n, t, this.glUsage), this.gl.bindBuffer(n, null), this.bytesUsed = e, this.byteLength = e, this._setDebugData(null, 0, e), this.props.handle ? this.trackReferencedMemory(e, "Buffer") : this.trackAllocatedMemory(e), this;
		}
		write(e, t = 0) {
			let n = ArrayBuffer.isView(e) ? e : new Uint8Array(e), r = 36663;
			this.gl.bindBuffer(r, this.handle), this.gl.bufferSubData(r, t, n), this.gl.bindBuffer(r, null), this._setDebugData(e, t, e.byteLength);
		}
		async mapAndWriteAsync(e, t = 0, n = this.byteLength - t) {
			let r = new ArrayBuffer(n);
			await e(r, "copied"), this.write(r, t);
		}
		async readAsync(e = 0, t) {
			return this.readSyncWebGL(e, t);
		}
		async mapAndReadAsync(e, t = 0, n) {
			return await e((await this.readAsync(t, n)).buffer, "copied");
		}
		readSyncWebGL(e = 0, t) {
			t ??= this.byteLength - e;
			let n = new Uint8Array(t);
			return this.gl.bindBuffer(36662, this.handle), this.gl.getBufferSubData(36662, e, n, 0, t), this.gl.bindBuffer(36662, null), this._setDebugData(n, e, t), n;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/helpers/parse-shader-compiler-log.js
function rs(e) {
	let t = e.split(/\r?\n/), n = [];
	for (let e of t) {
		if (e.length <= 1) continue;
		let t = e.trim(), r = e.split(":"), i = r[0]?.trim();
		if (r.length === 2) {
			let [e, a] = r;
			if (!e || !a) {
				n.push({
					message: t,
					type: is(i || "info"),
					lineNum: 0,
					linePos: 0
				});
				continue;
			}
			n.push({
				message: a.trim(),
				type: is(e),
				lineNum: 0,
				linePos: 0
			});
			continue;
		}
		let [a, o, s, ...c] = r;
		if (!a || !o || !s) {
			n.push({
				message: r.slice(1).join(":").trim() || t,
				type: is(i || "info"),
				lineNum: 0,
				linePos: 0
			});
			continue;
		}
		let l = parseInt(s, 10);
		Number.isNaN(l) && (l = 0);
		let u = parseInt(o, 10);
		Number.isNaN(u) && (u = 0), n.push({
			message: c.join(":").trim(),
			type: is(a),
			lineNum: l,
			linePos: u
		});
	}
	return n;
}
function is(e) {
	let t = [
		"warning",
		"error",
		"info"
	], n = e.toLowerCase();
	return t.includes(n) ? n : "info";
}
var as = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-shader.js
function os(e) {
	return e.split(/\r?\n/).find((e) => e.trim())?.trim();
}
var ss, cs = t((() => {
	I(), as(), ss = class extends Sr {
		device;
		handle;
		_compilationInfoLog = "";
		constructor(e, t) {
			super(e, t), this.device = e;
			let n = this.props.handle;
			switch (this.props.stage) {
				case "vertex":
					this.handle = n || this.device.gl.createShader(35633);
					break;
				case "fragment":
					this.handle = n || this.device.gl.createShader(35632);
					break;
				default: throw Error(this.props.stage);
			}
			e._setWebGLDebugMetadata(this.handle, this, { spector: this.props });
			let r = this._compile(this.source);
			r && typeof r.catch == "function" && r.catch(() => {
				this.compilationStatus = "error";
			});
		}
		destroy() {
			this.handle && (this.removeStats(), this.device.gl.deleteShader(this.handle), this.destroyed = !0, this.handle.destroyed = !0);
		}
		get asyncCompilationStatus() {
			return this._waitForCompilationComplete().then(() => (this._getCompilationStatus(), this.compilationStatus));
		}
		async getCompilationInfo() {
			return await this._waitForCompilationComplete(), this.getCompilationInfoSync();
		}
		getCompilationInfoSync() {
			let e = this._getCompilationInfoLog();
			return e ? rs(e) : [];
		}
		getTranslatedSource() {
			return this.device.getExtension("WEBGL_debug_shaders").WEBGL_debug_shaders?.getTranslatedShaderSource(this.handle) || null;
		}
		_compile(e) {
			e = e.startsWith("#version ") ? e : `#version 300 es\n${e}`;
			let { gl: t } = this.device;
			if (t.shaderSource(this.handle, e), t.compileShader(this.handle), !this.device.props.debug) this.compilationStatus = "pending";
			else {
				if (this.device.features.has("compilation-status-async-webgl")) return O.once(1, "Shader compilation is asynchronous")(), this._waitForCompilationComplete().then(() => {
					O.info(2, `Shader ${this.id} - async compilation complete: ${this.compilationStatus}`)(), this._getCompilationStatus(), this.debugShader();
				});
				if (this._getCompilationStatus(), this.debugShader(), this.compilationStatus === "error") throw Error(this._getCompilationErrorMessage(e));
			}
		}
		async _waitForCompilationComplete() {
			let e = async (e) => await new Promise((t) => setTimeout(t, e));
			if (!this.device.features.has("compilation-status-async-webgl")) {
				await e(10);
				return;
			}
			let { gl: t } = this.device;
			for (;;) {
				if (t.getShaderParameter(this.handle, 37297)) return;
				await e(10);
			}
		}
		_getCompilationStatus() {
			this.compilationStatus = this.device.gl.getShaderParameter(this.handle, 35713) ? "success" : "error", this.compilationStatus === "error" && this._getCompilationInfoLog();
		}
		_getCompilationErrorMessage(e) {
			let t = `${this.props.stage} shader ${this.props.id}`, n = os(this._getCompilationInfoLog()), r = this.getCompilationInfoSync(), i = r.find((e) => e.type === "error" && e.message.trim()) || r.find((e) => e.message.trim()) || r.find((e) => e.type === "error") || r[0];
			if (!i) return n ? `GLSL compilation errors in ${t}: ${n}` : `GLSL compilation errors in ${t}: WebGL did not provide a shader compiler log`;
			let a = i.lineNum ? e.split(/\r?\n/)[i.lineNum - 1]?.trim() : void 0, o = i.lineNum ? ` line ${i.lineNum}` : "", s = a ? `\nSource: ${a}` : "";
			return `GLSL compilation errors in ${t}:${o}: ${i.message.trim() || n || "WebGL did not provide a shader compiler log"}${s}`;
		}
		_getCompilationInfoLog() {
			let e = this.device.gl.getShaderInfoLog(this.handle)?.trim();
			return e && (this._compilationInfoLog = e), this._compilationInfoLog;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/converters/device-parameters.js
function ls(e, t, n, r) {
	if (vs(t)) return r(e);
	let i = e;
	i.pushState();
	try {
		return us(e, t), Na(i.gl, n), r(e);
	} finally {
		i.popState();
	}
}
function us(e, t) {
	let n = e, { gl: r } = n;
	if (t.cullMode) switch (t.cullMode) {
		case "none":
			r.disable(2884);
			break;
		case "front":
			r.enable(2884), r.cullFace(1028);
			break;
		case "back": r.enable(2884), r.cullFace(1029);
	}
	if (t.frontFace && r.frontFace(gs("frontFace", t.frontFace, {
		ccw: 2305,
		cw: 2304
	})), t.unclippedDepth && e.features.has("depth-clip-control") && r.enable(34383), t.depthBias !== void 0 && (r.enable(32823), r.polygonOffset(t.depthBias, t.depthBiasSlopeScale || 0)), t.provokingVertex && e.features.has("provoking-vertex-webgl")) {
		let e = n.getExtension("WEBGL_provoking_vertex").WEBGL_provoking_vertex, r = gs("provokingVertex", t.provokingVertex, {
			first: 36429,
			last: 36430
		});
		e?.provokingVertexWEBGL(r);
	}
	if ((t.polygonMode || t.polygonOffsetLine) && e.features.has("polygon-mode-webgl")) {
		if (t.polygonMode) {
			let e = n.getExtension("WEBGL_polygon_mode").WEBGL_polygon_mode, r = gs("polygonMode", t.polygonMode, {
				fill: 6914,
				line: 6913
			});
			e?.polygonModeWEBGL(1028, r), e?.polygonModeWEBGL(1029, r);
		}
		t.polygonOffsetLine && r.enable(10754);
	}
	if (e.features.has("shader-clip-cull-distance-webgl") && (t.clipDistance0 && r.enable(12288), t.clipDistance1 && r.enable(12289), t.clipDistance2 && r.enable(12290), t.clipDistance3 && r.enable(12291), t.clipDistance4 && r.enable(12292), t.clipDistance5 && r.enable(12293), t.clipDistance6 && r.enable(12294), t.clipDistance7 && r.enable(12295)), t.depthWriteEnabled !== void 0 && r.depthMask(_s("depthWriteEnabled", t.depthWriteEnabled)), t.depthCompare && (t.depthCompare === "always" ? r.disable(2929) : r.enable(2929), r.depthFunc(ds("depthCompare", t.depthCompare))), t.clearDepth !== void 0 && r.clearDepth(t.clearDepth), t.stencilWriteMask) {
		let e = t.stencilWriteMask;
		r.stencilMaskSeparate(1028, e), r.stencilMaskSeparate(1029, e);
	}
	if (t.stencilReadMask && O.warn("stencilReadMask not supported under WebGL"), t.stencilCompare) {
		let e = t.stencilReadMask || 4294967295, n = ds("depthCompare", t.stencilCompare);
		t.stencilCompare === "always" ? r.disable(2960) : r.enable(2960), r.stencilFuncSeparate(1028, n, 0, e), r.stencilFuncSeparate(1029, n, 0, e);
	}
	if (t.stencilPassOperation && t.stencilFailOperation && t.stencilDepthFailOperation) {
		let e = fs("stencilPassOperation", t.stencilPassOperation), n = fs("stencilFailOperation", t.stencilFailOperation), i = fs("stencilDepthFailOperation", t.stencilDepthFailOperation);
		r.stencilOpSeparate(1028, n, i, e), r.stencilOpSeparate(1029, n, i, e);
	}
	switch (t.blend) {
		case !0:
			r.enable(3042);
			break;
		case !1: r.disable(3042);
	}
	if (t.blendColorOperation || t.blendAlphaOperation) {
		let e = ps("blendColorOperation", t.blendColorOperation || "add"), n = ps("blendAlphaOperation", t.blendAlphaOperation || "add");
		r.blendEquationSeparate(e, n);
		let i = ms("blendColorSrcFactor", t.blendColorSrcFactor || "one"), a = ms("blendColorDstFactor", t.blendColorDstFactor || "zero"), o = ms("blendAlphaSrcFactor", t.blendAlphaSrcFactor || "one"), s = ms("blendAlphaDstFactor", t.blendAlphaDstFactor || "zero");
		r.blendFuncSeparate(i, a, o, s);
	}
}
function ds(e, t) {
	return gs(e, t, {
		never: 512,
		less: 513,
		equal: 514,
		"less-equal": 515,
		greater: 516,
		"not-equal": 517,
		"greater-equal": 518,
		always: 519
	});
}
function fs(e, t) {
	return gs(e, t, {
		keep: 7680,
		zero: 0,
		replace: 7681,
		invert: 5386,
		"increment-clamp": 7682,
		"decrement-clamp": 7683,
		"increment-wrap": 34055,
		"decrement-wrap": 34056
	});
}
function ps(e, t) {
	return gs(e, t, {
		add: 32774,
		subtract: 32778,
		"reverse-subtract": 32779,
		min: 32775,
		max: 32776
	});
}
function ms(e, t, n = "color") {
	return gs(e, t, {
		one: 1,
		zero: 0,
		src: 768,
		"one-minus-src": 769,
		dst: 774,
		"one-minus-dst": 775,
		"src-alpha": 770,
		"one-minus-src-alpha": 771,
		"dst-alpha": 772,
		"one-minus-dst-alpha": 773,
		"src-alpha-saturated": 776,
		constant: n === "color" ? 32769 : 32771,
		"one-minus-constant": n === "color" ? 32770 : 32772,
		src1: 768,
		"one-minus-src1": 769,
		"src1-alpha": 770,
		"one-minus-src1-alpha": 771
	});
}
function hs(e, t) {
	return `Illegal parameter ${t} for ${e}`;
}
function gs(e, t, n) {
	if (!(t in n)) throw Error(hs(e, t));
	return n[t];
}
function _s(e, t) {
	return t;
}
function vs(e) {
	let t = !0;
	for (let n in e) {
		t = !1;
		break;
	}
	return t;
}
var ys = t((() => {
	I(), La();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/converters/sampler-parameters.js
function bs(e) {
	let t = {};
	return e.addressModeU && (t[10242] = xs(e.addressModeU)), e.addressModeV && (t[10243] = xs(e.addressModeV)), e.addressModeW && (t[32882] = xs(e.addressModeW)), e.magFilter && (t[10240] = Ss(e.magFilter)), (e.minFilter || e.mipmapFilter) && (t[10241] = Cs(e.minFilter || "linear", e.mipmapFilter)), e.lodMinClamp !== void 0 && (t[33082] = e.lodMinClamp), e.lodMaxClamp !== void 0 && (t[33083] = e.lodMaxClamp), e.type === "comparison-sampler" && (t[34892] = 34894), e.compare && (t[34893] = ds("compare", e.compare)), e.maxAnisotropy && (t[34046] = e.maxAnisotropy), t;
}
function xs(e) {
	switch (e) {
		case "clamp-to-edge": return 33071;
		case "repeat": return 10497;
		case "mirror-repeat": return 33648;
	}
}
function Ss(e) {
	switch (e) {
		case "nearest": return 9728;
		case "linear": return 9729;
	}
}
function Cs(e, t = "none") {
	if (!t) return Ss(e);
	switch (t) {
		case "none": return Ss(e);
		case "nearest":
			switch (e) {
				case "nearest": return 9984;
				case "linear": return 9985;
			}
			break;
		case "linear": switch (e) {
			case "nearest": return 9986;
			case "linear": return 9987;
		}
	}
}
var ws = t((() => {
	ys();
})), Ts, Es = t((() => {
	I(), ws(), Ts = class extends ar {
		device;
		handle;
		parameters;
		constructor(e, t) {
			super(e, t), this.device = e, this.parameters = bs(t), this.handle = t.handle || this.device.gl.createSampler(), this._setSamplerParameters(this.parameters);
		}
		destroy() {
			this.handle &&= (this.device.gl.deleteSampler(this.handle), void 0);
		}
		toString() {
			return `Sampler(${this.id},${JSON.stringify(this.props)})`;
		}
		_setSamplerParameters(e) {
			for (let [t, n] of Object.entries(e)) {
				let e = Number(t);
				switch (e) {
					case 33082:
					case 33083:
						this.device.gl.samplerParameterf(this.handle, e, n);
						break;
					default: this.device.gl.samplerParameteri(this.handle, e, n);
				}
			}
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/context/state-tracker/with-parameters.js
function Ds(e, t, n) {
	if (Os(t)) return n(e);
	let { nocatch: r = !0 } = t, i = Wa.get(e);
	i.push(), Na(e, t);
	let a;
	if (r) a = n(e), i.pop();
	else try {
		a = n(e);
	} finally {
		i.pop();
	}
	return a;
}
function Os(e) {
	for (let t in e) return !1;
	return !0;
}
var ks = t((() => {
	La(), Ga();
})), As, js = t((() => {
	I(), As = class extends lr {
		device;
		gl;
		handle;
		texture;
		constructor(e, t) {
			super(e, {
				...F.defaultProps,
				...t
			}), this.device = e, this.gl = this.device.gl, this.handle = null, this.texture = t.texture;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/converters/shader-formats.js
function Ms(e) {
	return Ns[e];
}
var Ns, Ps = t((() => {
	Ns = {
		5124: "sint32",
		5125: "uint32",
		5122: "sint16",
		5123: "uint16",
		5120: "sint8",
		5121: "uint8",
		5126: "float32",
		5131: "float16",
		33635: "uint16",
		32819: "uint16",
		32820: "uint16",
		33640: "uint32",
		35899: "uint32",
		35902: "uint32",
		34042: "uint32",
		36269: "uint32"
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-texture.js
function Fs(e, t = 0) {
	return t ? new e.constructor(e.buffer, e.byteOffset + t, (e.byteLength - t) / e.BYTES_PER_ELEMENT) : e;
}
function Is(e, t) {
	if (t % e.BYTES_PER_ELEMENT !== 0) throw Error(`Texture byteOffset ${t} must align to typed array element size ${e.BYTES_PER_ELEMENT}`);
	return t / e.BYTES_PER_ELEMENT;
}
function Ls(e) {
	switch (e) {
		case "1d": break;
		case "2d": return 3553;
		case "3d": return 32879;
		case "cube": return 34067;
		case "2d-array": return 35866;
	}
	throw Error(e);
}
function Rs(e, t, n) {
	return t === "cube" ? 34069 + n : e;
}
var zs, Bs = t((() => {
	I(), Io(), ws(), ks(), js(), Ps(), zs = class extends F {
		device;
		gl;
		handle;
		sampler = void 0;
		view;
		glTarget;
		glFormat;
		glType;
		glInternalFormat;
		compressed;
		_textureUnit = 0;
		_framebuffer = null;
		_framebufferAttachmentKey = null;
		constructor(e, t) {
			super(e, t, { byteAlignment: 1 }), this.device = e, this.gl = this.device.gl;
			let n = fo(this.props.format);
			if (this.glTarget = Ls(this.props.dimension), this.glInternalFormat = n.internalFormat, this.glFormat = n.format, this.glType = n.type, this.compressed = n.compressed, this.isHandleBorrowed && this.props.handle === void 0) throw Error("Borrowed WebGL textures require a texture handle");
			if (this.handle = this.props.handle || this.gl.createTexture(), this.device._setWebGLDebugMetadata(this.handle, this, { spector: this.props }), !this.isHandleBorrowed) {
				this.gl.bindTexture(this.glTarget, this.handle);
				let { dimension: e, width: n, height: r, depth: i, mipLevels: a, glTarget: o, glInternalFormat: s } = this;
				if (!this.compressed) switch (e) {
					case "2d":
					case "cube":
						this.gl.texStorage2D(o, a, s, n, r);
						break;
					case "2d-array":
					case "3d":
						this.gl.texStorage3D(o, a, s, n, r, i);
						break;
					default: throw Error(e);
				}
				this.gl.bindTexture(this.glTarget, null), this._initializeData(t.data);
			}
			this.ownsHandle ? this.trackAllocatedMemory(this.getAllocatedByteLength(), "Texture") : this.trackReferencedMemory(this.getAllocatedByteLength(), "Texture"), this.isHandleBorrowed || this.setSampler(this.props.sampler), this.view = new As(this.device, {
				...this.props,
				texture: this
			}), Object.seal(this);
		}
		destroy() {
			this.handle && (this._framebuffer?.destroy(), this._framebuffer = null, this._framebufferAttachmentKey = null, this.removeStats(), this.ownsHandle ? (this.gl.deleteTexture(this.handle), this.trackDeallocatedMemory("Texture")) : this.trackDeallocatedReferencedMemory("Texture"), this.destroyed = !0);
		}
		createView(e) {
			return new As(this.device, {
				...e,
				texture: this
			});
		}
		clone(e) {
			if (this.isHandleBorrowed && e && (e.width !== this.width || e.height !== this.height)) throw Error(`Cannot resize borrowed read-only ${this}`);
			return super.clone(e);
		}
		setSampler(e = {}) {
			this._assertWritable("set sampler parameters on"), super.setSampler(e);
			let t = bs(this.sampler.props);
			this._setSamplerParameters(t);
		}
		copyExternalImage(e) {
			this._assertWritable("copy external image data into");
			let t = this._normalizeCopyExternalImageOptions(e);
			if (t.sourceX || t.sourceY) throw Error("WebGL does not support sourceX/sourceY)");
			let { glFormat: n, glType: r } = this, { image: i, depth: a, mipLevel: o, x: s, y: c, z: l, width: u, height: d } = t, f = Rs(this.glTarget, this.dimension, l), p = t.flipY ? { 37440: !0 } : {};
			return this.gl.bindTexture(this.glTarget, this.handle), Ds(this.gl, p, () => {
				switch (this.dimension) {
					case "2d":
					case "cube":
						this.gl.texSubImage2D(f, o, s, c, u, d, n, r, i);
						break;
					case "2d-array":
					case "3d": this.gl.texSubImage3D(f, o, s, c, l, u, d, a, n, r, i);
				}
			}), this.gl.bindTexture(this.glTarget, null), {
				width: t.width,
				height: t.height
			};
		}
		copyElementImage(e) {
			this._assertWritable("copy element image data into");
			let t = this._normalizeCopyElementImageOptions(e), { glFormat: n } = this, { element: r, depth: i, mipLevel: a, sourceX: o, sourceY: s, sourceWidth: c, sourceHeight: l, x: u, y: d, z: f, width: p, height: m } = t, h = Rs(this.glTarget, this.dimension, f), g = t.flipY ? { 37440: !0 } : {}, _ = this.gl;
			if (i !== 1 || this.dimension !== "2d" && this.dimension !== "cube") throw Error(`${this} copyElementImage only supports 2d and cube textures on WebGL`);
			if (a !== 0 || u !== 0 || d !== 0) throw Error(`${this} copyElementImage only supports full base-level uploads on WebGL`);
			if (typeof _.texElementImage2D != "function") throw Error(`${this} copyElementImage is not supported by this WebGL implementation`);
			return this.gl.bindTexture(this.glTarget, this.handle), Ds(this.gl, g, () => {
				_.texElementImage2D?.(h, n, r, {
					sx: o,
					sy: s,
					swidth: c ?? p,
					sheight: l ?? m,
					width: p,
					height: m
				});
			}), this.gl.bindTexture(this.glTarget, null), {
				width: t.width,
				height: t.height
			};
		}
		copyImageData(e) {
			super.copyImageData(e);
		}
		readBuffer(e = {}, t) {
			if (!t) throw Error(`${this} readBuffer requires a destination buffer`);
			let n = this._getSupportedColorReadOptions(e), r = e.byteOffset ?? 0, i = this.computeMemoryLayout(n);
			if (t.byteLength < r + i.byteLength) throw Error(`${this} readBuffer target is too small (${t.byteLength} < ${r + i.byteLength})`);
			let a = t;
			this.gl.bindBuffer(35051, a.handle);
			try {
				this._readColorTextureLayers(n, i, (e) => {
					this.gl.readPixels(n.x, n.y, n.width, n.height, this.glFormat, this.glType, r + e);
				});
			} finally {
				this.gl.bindBuffer(35051, null);
			}
			return t;
		}
		async readDataAsync(e = {}) {
			throw Error(`${this} readDataAsync is deprecated; use readBuffer() with an explicit destination buffer or DynamicTexture.readAsync()`);
		}
		writeBuffer(e, t = {}) {
			this._assertWritable("write buffer data into");
			let n = this._normalizeTextureWriteOptions(t), { width: r, height: i, depthOrArrayLayers: a, mipLevel: o, byteOffset: s, x: c, y: l, z: u } = n, { glFormat: d, glType: f, compressed: p } = this, m = Rs(this.glTarget, this.dimension, u);
			if (p) throw Error("writeBuffer for compressed textures is not implemented in WebGL");
			let { bytesPerPixel: h } = this.device.getTextureFormatInfo(this.format), g = h ? n.bytesPerRow / h : void 0, _ = {
				3317: this.byteAlignment,
				...g === void 0 ? {} : { 3314: g },
				32878: n.rowsPerImage
			};
			this.gl.bindTexture(this.glTarget, this.handle), this.gl.bindBuffer(35052, e.handle), Ds(this.gl, _, () => {
				switch (this.dimension) {
					case "2d":
					case "cube":
						this.gl.texSubImage2D(m, o, c, l, r, i, d, f, s);
						break;
					case "2d-array":
					case "3d": this.gl.texSubImage3D(m, o, c, l, u, r, i, a, d, f, s);
				}
			}), this.gl.bindBuffer(35052, null), this.gl.bindTexture(this.glTarget, null);
		}
		writeData(e, t = {}) {
			this._assertWritable("write data into");
			let n = this._normalizeTextureWriteOptions(t), r = ArrayBuffer.isView(e) ? e : new Uint8Array(e), { width: i, height: a, depthOrArrayLayers: o, mipLevel: s, x: c, y: l, z: u, byteOffset: d } = n, { glFormat: f, glType: p, compressed: m } = this, h = Rs(this.glTarget, this.dimension, u), g;
			if (!m) {
				let { bytesPerPixel: e } = this.device.getTextureFormatInfo(this.format);
				e && (g = n.bytesPerRow / e);
			}
			let _ = this.compressed ? {} : {
				3317: this.byteAlignment,
				...g === void 0 ? {} : { 3314: g },
				32878: n.rowsPerImage
			}, v = Is(r, d), y = m ? Fs(r, d) : r, b = this._getMipLevelSize(s), x = c === 0 && l === 0 && u === 0 && i === b.width && a === b.height && o === b.depthOrArrayLayers;
			this.gl.bindTexture(this.glTarget, this.handle), this.gl.bindBuffer(35052, null), Ds(this.gl, _, () => {
				switch (this.dimension) {
					case "2d":
					case "cube":
						m ? x ? this.gl.compressedTexImage2D(h, s, f, i, a, 0, y) : this.gl.compressedTexSubImage2D(h, s, c, l, i, a, f, y) : this.gl.texSubImage2D(h, s, c, l, i, a, f, p, r, v);
						break;
					case "2d-array":
					case "3d": m ? x ? this.gl.compressedTexImage3D(h, s, f, i, a, o, 0, y) : this.gl.compressedTexSubImage3D(h, s, c, l, u, i, a, o, f, y) : this.gl.texSubImage3D(h, s, c, l, u, i, a, o, f, p, r, v);
				}
			}), this.gl.bindTexture(this.glTarget, null);
		}
		_getRowByteAlignment(e, t) {
			return 1;
		}
		_getFramebuffer() {
			return this._framebuffer ||= this.device.createFramebuffer({
				id: `framebuffer-for-${this.id}`,
				width: this.width,
				height: this.height,
				colorAttachments: [this]
			}), this._framebuffer;
		}
		readDataSyncWebGL(e = {}) {
			let t = this._getSupportedColorReadOptions(e), n = this.computeMemoryLayout(t), r = kt(Ms(this.glType)), i = new r(n.byteLength / r.BYTES_PER_ELEMENT);
			return this._readColorTextureLayers(t, n, (e) => {
				let a = new r(i.buffer, i.byteOffset + e, n.bytesPerImage / r.BYTES_PER_ELEMENT);
				this.gl.readPixels(t.x, t.y, t.width, t.height, this.glFormat, this.glType, a);
			}), i.buffer;
		}
		_readColorTextureLayers(e, t, n) {
			let r = this._getFramebuffer(), i = t.bytesPerRow / t.bytesPerPixel, a = {
				3333: this.byteAlignment,
				...i === e.width ? {} : { 3330: i }
			}, o = this.gl.getParameter(3074), s = this.gl.bindFramebuffer(36160, r.handle);
			try {
				this.gl.readBuffer(36064), Ds(this.gl, a, () => {
					for (let i = 0; i < e.depthOrArrayLayers; i++) this._attachReadSubresource(r, e.mipLevel, e.z + i), n(i * t.bytesPerImage);
				});
			} finally {
				this.gl.bindFramebuffer(36160, s || null), this.gl.readBuffer(o);
			}
		}
		_attachReadSubresource(e, t, n) {
			let r = `${t}:${n}`;
			if (this._framebufferAttachmentKey !== r) {
				switch (this.dimension) {
					case "2d":
						this.gl.framebufferTexture2D(36160, 36064, 3553, this.handle, t);
						break;
					case "cube":
						this.gl.framebufferTexture2D(36160, 36064, Rs(this.glTarget, this.dimension, n), this.handle, t);
						break;
					case "2d-array":
					case "3d":
						this.gl.framebufferTextureLayer(36160, 36064, this.handle, t, n);
						break;
					default: throw Error(`${this} color readback does not support ${this.dimension} textures`);
				}
				if (this.device.props.debug) {
					let t = Number(this.gl.checkFramebufferStatus(36160));
					if (t !== 36053) throw Error(`${e} incomplete for ${this} readback (${t})`);
				}
				this._framebufferAttachmentKey = r;
			}
		}
		generateMipmapsWebGL(e) {
			if (this._assertWritable("generate mipmaps for"), !(!(this.device.isTextureFormatRenderable(this.props.format) && this.device.isTextureFormatFilterable(this.props.format)) && (O.warn(`${this} is not renderable or filterable, may not be able to generate mipmaps`)(), !e?.force))) try {
				this.gl.bindTexture(this.glTarget, this.handle), this.gl.generateMipmap(this.glTarget);
			} catch (e) {
				O.warn(`Error generating mipmap for ${this}: ${e.message}`)();
			} finally {
				this.gl.bindTexture(this.glTarget, null);
			}
		}
		_setSamplerParameters(e) {
			O.level >= 2 && O.log(2, `${this.id} sampler parameters`, this.device.getGLKeys(e))(), this.gl.bindTexture(this.glTarget, this.handle);
			for (let [t, n] of Object.entries(e)) {
				let e = Number(t), r = n;
				switch (e) {
					case 33082:
					case 33083:
						this.gl.texParameterf(this.glTarget, e, r);
						break;
					case 10240:
					case 10241:
						this.gl.texParameteri(this.glTarget, e, r);
						break;
					case 10242:
					case 10243:
					case 32882:
						this.gl.texParameteri(this.glTarget, e, r);
						break;
					case 34046:
						this.device.features.has("texture-filterable-anisotropic-webgl") && this.gl.texParameteri(this.glTarget, e, r);
						break;
					case 34892:
					case 34893: this.gl.texParameteri(this.glTarget, e, r);
				}
			}
			this.gl.bindTexture(this.glTarget, null);
		}
		_getActiveUnit() {
			return this.gl.getParameter(34016) - 33984;
		}
		_bind(e) {
			let { gl: t } = this;
			return e !== void 0 && (this._textureUnit = e, t.activeTexture(33984 + e)), t.bindTexture(this.glTarget, this.handle), e;
		}
		_unbind(e) {
			let { gl: t } = this;
			return e !== void 0 && (this._textureUnit = e, t.activeTexture(33984 + e)), t.bindTexture(this.glTarget, null), e;
		}
		_assertWritable(e) {
			if (this.isHandleBorrowed) throw Error(`Cannot ${e} borrowed read-only ${this}`);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/helpers/set-uniform.js
function Vs(e, t, n, r) {
	let i = e, a = r;
	a === !0 && (a = 1), a === !1 && (a = 0);
	let o = typeof a == "number" ? [a] : a;
	switch (n) {
		case 35678:
		case 35680:
		case 35679:
		case 35682:
		case 36289:
		case 36292:
		case 36293:
		case 36298:
		case 36299:
		case 36300:
		case 36303:
		case 36306:
		case 36307:
		case 36308:
		case 36311:
			if (typeof r != "number") throw Error("samplers must be set to integers");
			return e.uniform1i(t, r);
		case 5126: return e.uniform1fv(t, o);
		case 35664: return e.uniform2fv(t, o);
		case 35665: return e.uniform3fv(t, o);
		case 35666: return e.uniform4fv(t, o);
		case 5124: return e.uniform1iv(t, o);
		case 35667: return e.uniform2iv(t, o);
		case 35668: return e.uniform3iv(t, o);
		case 35669: return e.uniform4iv(t, o);
		case 35670: return e.uniform1iv(t, o);
		case 35671: return e.uniform2iv(t, o);
		case 35672: return e.uniform3iv(t, o);
		case 35673: return e.uniform4iv(t, o);
		case 5125: return i.uniform1uiv(t, o, 1);
		case 36294: return i.uniform2uiv(t, o, 2);
		case 36295: return i.uniform3uiv(t, o, 3);
		case 36296: return i.uniform4uiv(t, o, 4);
		case 35674: return e.uniformMatrix2fv(t, !1, o);
		case 35675: return e.uniformMatrix3fv(t, !1, o);
		case 35676: return e.uniformMatrix4fv(t, !1, o);
		case 35685: return i.uniformMatrix2x3fv(t, !1, o);
		case 35686: return i.uniformMatrix2x4fv(t, !1, o);
		case 35687: return i.uniformMatrix3x2fv(t, !1, o);
		case 35688: return i.uniformMatrix3x4fv(t, !1, o);
		case 35689: return i.uniformMatrix4x2fv(t, !1, o);
		case 35690: return i.uniformMatrix4x3fv(t, !1, o);
	}
	throw Error("Illegal uniform");
}
var Hs = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/converters/webgl-shadertypes.js
function Us(e) {
	return Ys[e];
}
function Ws(e) {
	return qs[e];
}
function Gs(e) {
	return !!Js[e];
}
function Ks(e) {
	return Js[e];
}
var qs, Js, Ys, Xs = t((() => {
	qs = {
		5126: "f32",
		35664: "vec2<f32>",
		35665: "vec3<f32>",
		35666: "vec4<f32>",
		5124: "i32",
		35667: "vec2<i32>",
		35668: "vec3<i32>",
		35669: "vec4<i32>",
		5125: "u32",
		36294: "vec2<u32>",
		36295: "vec3<u32>",
		36296: "vec4<u32>",
		35670: "f32",
		35671: "vec2<f32>",
		35672: "vec3<f32>",
		35673: "vec4<f32>",
		35674: "mat2x2<f32>",
		35685: "mat2x3<f32>",
		35686: "mat2x4<f32>",
		35687: "mat3x2<f32>",
		35675: "mat3x3<f32>",
		35688: "mat3x4<f32>",
		35689: "mat4x2<f32>",
		35690: "mat4x3<f32>",
		35676: "mat4x4<f32>"
	}, Js = {
		35678: {
			viewDimension: "2d",
			sampleType: "float"
		},
		35680: {
			viewDimension: "cube",
			sampleType: "float"
		},
		35679: {
			viewDimension: "3d",
			sampleType: "float"
		},
		35682: {
			viewDimension: "3d",
			sampleType: "depth"
		},
		36289: {
			viewDimension: "2d-array",
			sampleType: "float"
		},
		36292: {
			viewDimension: "2d-array",
			sampleType: "depth"
		},
		36293: {
			viewDimension: "cube",
			sampleType: "float"
		},
		36298: {
			viewDimension: "2d",
			sampleType: "sint"
		},
		36299: {
			viewDimension: "3d",
			sampleType: "sint"
		},
		36300: {
			viewDimension: "cube",
			sampleType: "sint"
		},
		36303: {
			viewDimension: "2d-array",
			sampleType: "uint"
		},
		36306: {
			viewDimension: "2d",
			sampleType: "uint"
		},
		36307: {
			viewDimension: "3d",
			sampleType: "uint"
		},
		36308: {
			viewDimension: "cube",
			sampleType: "uint"
		},
		36311: {
			viewDimension: "2d-array",
			sampleType: "uint"
		}
	}, Ys = {
		uint8: 5121,
		sint8: 5120,
		unorm8: 5121,
		snorm8: 5120,
		uint16: 5123,
		sint16: 5122,
		unorm16: 5123,
		snorm16: 5122,
		uint32: 5125,
		sint32: 5124,
		float16: 5131,
		float32: 5126
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/helpers/get-shader-layout-from-glsl.js
function Zs(e, t, n = {}) {
	let r = {
		attributes: [],
		bindings: []
	};
	r.attributes = Qs(e, t);
	let i = tc(e, t, n);
	for (let e of i) {
		let t = e.uniforms.map((e) => ({
			name: e.name,
			format: e.format,
			byteOffset: e.byteOffset,
			byteStride: e.byteStride,
			arrayLength: e.arrayLength
		}));
		r.bindings.push({
			type: "uniform",
			name: e.name,
			group: 0,
			location: e.location,
			visibility: +!!e.vertex | (e.fragment ? 2 : 0),
			minBindingSize: e.byteLength,
			uniforms: t
		});
	}
	let a = ec(e, t), o = 0;
	for (let e of a) if (Gs(e.type)) {
		let { viewDimension: t, sampleType: n } = Ks(e.type);
		r.bindings.push({
			type: "texture",
			name: e.name,
			group: 0,
			location: o,
			viewDimension: t,
			sampleType: n
		}), e.textureUnit = o, o += 1;
	}
	a.length && (r.uniforms = a);
	let s = $s(e, t);
	return s?.length && (r.varyings = s), r;
}
function Qs(e, t) {
	let n = [], r = e.getProgramParameter(t, 35721);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i);
		if (!r) throw Error("activeInfo");
		let { name: a, type: o } = r, s = e.getAttribLocation(t, a);
		if (s >= 0) {
			let e = Ws(o), t = /instance/i.test(a) ? "instance" : "vertex";
			n.push({
				name: a,
				location: s,
				stepMode: t,
				type: e
			});
		}
	}
	return n.sort((e, t) => e.location - t.location), n;
}
function $s(e, t) {
	let n = [], r = e.getProgramParameter(t, 35971);
	for (let i = 0; i < r; i++) {
		let r = e.getTransformFeedbackVarying(t, i);
		if (!r) throw Error("activeInfo");
		let { name: a, type: o, size: s } = r, { type: c, components: l } = ti(Ws(o));
		n.push({
			location: i,
			name: a,
			type: c,
			size: s * l
		});
	}
	return n.sort((e, t) => e.location - t.location), n;
}
function ec(e, t) {
	let n = [], r = e.getProgramParameter(t, 35718);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveUniform(t, i);
		if (!r) throw Error("activeInfo");
		let { name: a, size: o, type: s } = r, { name: c, isArray: l } = fc(a), u = e.getUniformLocation(t, c), d = {
			location: u,
			name: c,
			size: o,
			type: s,
			isArray: l
		};
		if (n.push(d), d.size > 1) for (let r = 0; r < d.size; r++) {
			let i = `${c}[${r}]`;
			u = e.getUniformLocation(t, i);
			let a = {
				...d,
				name: i,
				location: u
			};
			n.push(a);
		}
	}
	return n;
}
function tc(e, t, n) {
	let r = [], i = rc(e, t, n);
	for (let [n, a] of i) {
		r.push(a);
		try {
			nc(ac(e, t, n, a.name), a);
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			O.once(0, `WebGL uniform block reflection failed for "${a.name}"; using supplied std140 metadata. ${t}`)();
		}
	}
	let a = e.getProgramParameter(t, 35382);
	if (!Number.isInteger(a) || a < 0) throw Error(`Failed to reflect WebGL uniform blocks: ACTIVE_UNIFORM_BLOCKS returned ${String(a)}`);
	for (let n = 0; n < a; n++) i.has(n) || r.push(ac(e, t, n));
	return r.sort((e, t) => e.location - t.location), r;
}
function nc(e, t) {
	for (let n of e.uniforms) {
		let e = t.uniforms.find((e) => n.name === e.name || n.name.endsWith(`.${e.name}`));
		if (!e) throw Error(`Failed to validate WebGL uniform block "${t.name}": reflected unexpected member "${n.name}"`);
		if (n.format !== e.format || n.arrayLength !== e.arrayLength || n.byteOffset !== e.byteOffset || n.byteStride !== e.byteStride) throw Error(`Failed to validate WebGL uniform block "${t.name}": reflected layout for "${n.name}" does not match supplied std140 metadata`);
	}
}
function rc(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of n.uniformBlockLayouts || []) r.set(e.name, lc(e));
	for (let e of n.shaderLayout?.bindings || []) dc(e) && r.set(e.name, e);
	let i = /* @__PURE__ */ new Map();
	for (let n of r.values()) {
		let r = ic(e, t, n.name);
		if (!r) continue;
		let { blockIndex: a, blockName: o } = r;
		if (i.has(a)) throw Error(`Multiple supplied uniform block layouts resolve to active WebGL block "${o}"`);
		i.set(a, {
			name: o,
			location: a,
			byteLength: n.minBindingSize,
			vertex: !!(n.visibility && n.visibility & 1),
			fragment: !!(n.visibility && n.visibility & 2),
			uniformCount: n.uniforms.length,
			uniforms: n.uniforms.map((e) => ({ ...e }))
		});
	}
	return i;
}
function ic(e, t, n) {
	let r = n.endsWith("Uniforms") ? [n, n.slice(0, -8)] : [n, `${n}Uniforms`];
	for (let n of r) {
		let r = e.getUniformBlockIndex(t, n);
		if (r !== 4294967295) {
			if (!Number.isInteger(r) || r < 0) throw Error(`Failed to resolve WebGL uniform block "${n}": getUniformBlockIndex returned ${String(r)}`);
			return {
				blockIndex: r,
				blockName: n
			};
		}
	}
	return null;
}
function ac(e, t, n, r) {
	let i = r || e.getActiveUniformBlockName(t, n);
	if (!i) throw Error(`Failed to reflect WebGL uniform block at index ${n}: missing block name`);
	let a = (r, a) => {
		let o = e.getActiveUniformBlockParameter(t, n, r);
		if (o == null) throw Error(`Failed to reflect WebGL uniform block "${i}": ${a} returned null`);
		return o;
	}, o = cc(a(35391, "UNIFORM_BLOCK_BINDING"), i, "UNIFORM_BLOCK_BINDING", 0), s = cc(a(35392, "UNIFORM_BLOCK_DATA_SIZE"), i, "UNIFORM_BLOCK_DATA_SIZE", 0), c = cc(a(35394, "UNIFORM_BLOCK_ACTIVE_UNIFORMS"), i, "UNIFORM_BLOCK_ACTIVE_UNIFORMS", 0), l = sc(a(35395, "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"), i, "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES", c), u = oc(e, t, l, 35383, "UNIFORM_TYPE", i, c), d = oc(e, t, l, 35384, "UNIFORM_SIZE", i, c), f = oc(e, t, l, 35386, "UNIFORM_BLOCK_INDEX", i, c), p = oc(e, t, l, 35387, "UNIFORM_OFFSET", i, c), m = oc(e, t, l, 35388, "UNIFORM_ARRAY_STRIDE", i, c), h = [];
	for (let r = 0; r < c; r++) {
		if (f[r] !== n) throw Error(`Failed to reflect WebGL uniform block "${i}": active uniform index ${l[r]} belongs to block ${f[r]}, expected ${n}`);
		let a = l[r], o = e.getActiveUniform(t, a);
		if (!o) throw Error(`Failed to reflect WebGL uniform block "${i}": getActiveUniform(${a}) returned null`);
		let s = cc(u[r], i, `UNIFORM_TYPE[${r}]`, 1), c = cc(d[r], i, `UNIFORM_SIZE[${r}]`, 1), g = cc(p[r], i, `UNIFORM_OFFSET[${r}]`, 0), _ = cc(m[r], i, `UNIFORM_ARRAY_STRIDE[${r}]`, 0);
		if (o.type !== s || o.size !== c) throw Error(`Failed to reflect WebGL uniform block "${i}": getActiveUniform(${a}) disagrees with getActiveUniforms`);
		h.push({
			name: o.name,
			format: Ws(s),
			arrayLength: c,
			byteOffset: g,
			byteStride: _
		});
	}
	let g = {
		name: i,
		location: o,
		byteLength: s,
		vertex: !!a(35396, "UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"),
		fragment: !!a(35398, "UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"),
		uniformCount: c,
		uniforms: h
	}, _ = new Set(g.uniforms.map((e) => e.name.split(".")[0]).filter((e) => !!e)), v = g.name.replace(/Uniforms$/, "");
	if (_.size === 1 && !_.has(g.name) && !_.has(v)) {
		let [e] = _;
		O.warn(`Uniform block "${g.name}" uses GLSL instance "${e}". luma.gl binds uniform buffers by block name ("${g.name}") and alias ("${v}"). Prefer matching the instance name to one of those to avoid confusing silent mismatches.`)();
	}
	return g;
}
function oc(e, t, n, r, i, a, o) {
	let s = e.getActiveUniforms(t, n, r);
	if (s === null) throw Error(`Failed to reflect WebGL uniform block "${a}": ${i} returned null`);
	return sc(s, a, i, o);
}
function sc(e, t, n, r) {
	if (!Array.isArray(e) && !ArrayBuffer.isView(e)) throw Error(`Failed to reflect WebGL uniform block "${t}": ${n} returned a non-array value`);
	let i = Array.from(e);
	if (i.length !== r || i.some((e) => !Number.isInteger(e))) throw Error(`Failed to reflect WebGL uniform block "${t}": ${n} returned ${i.length} invalid values, expected ${r}`);
	return i;
}
function cc(e, t, n, r) {
	if (!Number.isInteger(e) || e < r) throw Error(`Failed to reflect WebGL uniform block "${t}": ${n} returned ${String(e)}`);
	return e;
}
function lc(e) {
	let t = mi(e.uniformTypes, { layout: "std140" }), n = uc(e.uniformTypes, t.fields);
	return {
		type: "uniform",
		name: e.name,
		group: 0,
		location: 0,
		minBindingSize: t.byteLength,
		uniforms: n
	};
}
function uc(e, t) {
	let n = [], r = (e, a) => {
		if (typeof a == "string") {
			let r = t[e];
			if (!r) throw Error(`Missing std140 layout field ${e}`);
			n.push({
				name: e,
				format: r.shaderType,
				arrayLength: 1,
				byteOffset: r.offset * 4,
				byteStride: 0
			});
		} else if (Array.isArray(a)) i(e, a[0], a[1]);
		else for (let [t, n] of Object.entries(a)) r(`${e}.${t}`, n);
	}, i = (e, r, i) => {
		if (typeof r == "string") {
			let r = t[`${e}[0]`], a = i > 1 ? t[`${e}[1]`] : void 0;
			if (!r) throw Error(`Missing std140 array layout field ${e}[0]`);
			n.push({
				name: `${e}[0]`,
				format: r.shaderType,
				arrayLength: i,
				byteOffset: r.offset * 4,
				byteStride: a ? (a.offset - r.offset) * 4 : 0
			});
		} else {
			if (Array.isArray(r)) throw Error(`Nested uniform arrays are not supported for ${e}`);
			for (let [a, o] of Object.entries(r)) {
				if (typeof o != "string") throw Error(`Composite uniform array members are not supported for ${e}`);
				let r = `${e}[0].${a}`, s = `${e}[1].${a}`, c = t[r], l = i > 1 ? t[s] : void 0;
				if (!c) throw Error(`Missing std140 array layout field ${r}`);
				n.push({
					name: r,
					format: c.shaderType,
					arrayLength: i,
					byteOffset: c.offset * 4,
					byteStride: l ? (l.offset - c.offset) * 4 : 0
				});
			}
		}
	};
	for (let [t, n] of Object.entries(e)) r(t, n);
	return n;
}
function dc(e) {
	return e.type === "uniform" && Number.isInteger(e.minBindingSize) && e.minBindingSize >= 0 && Array.isArray(e.uniforms) && e.uniforms.every((e) => typeof e.name == "string" && typeof e.format == "string" && Number.isInteger(e.arrayLength) && e.arrayLength > 0 && Number.isInteger(e.byteOffset) && e.byteOffset >= 0 && Number.isInteger(e.byteStride) && e.byteStride >= 0);
}
function fc(e) {
	if (e[e.length - 1] !== "]") return {
		name: e,
		length: 1,
		isArray: !1
	};
	let t = /([^[]*)(\[[0-9]+\])?/.exec(e);
	return {
		name: Gn(t?.[1], `Failed to parse GLSL uniform name ${e}`),
		length: +!!t?.[2],
		isArray: !!t?.[2]
	};
}
var pc = t((() => {
	I(), Xs();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-render-pipeline.js
function mc(e, t) {
	let n = {
		...e,
		attributes: e.attributes.map((e) => ({ ...e })),
		bindings: e.bindings.map((e) => ({ ...e }))
	};
	for (let e of t?.attributes || []) {
		let t = n.attributes.find((t) => t.name === e.name);
		t ? (t.type = e.type || t.type, t.stepMode = e.stepMode || t.stepMode) : O.warn(`shader layout attribute ${e.name} not present in shader`);
	}
	for (let e of t?.bindings || []) {
		let t = hc(n, e.name);
		t ? Object.assign(t, e) : O.warn(`shader layout binding ${e.name} not present in shader`);
	}
	return n;
}
function hc(e, t) {
	return e.bindings.find((e) => e.name === t || e.name === `${t}Uniforms` || `${e.name}Uniforms` === t);
}
function gc(e, t) {
	return e[t] || e[`${t}Uniforms`] || e[t.replace(/Uniforms$/, "")];
}
var _c, vc = t((() => {
	I(), Hs(), ns(), Go(), Bs(), js(), pc(), _c = class extends Er {
		device;
		handle;
		vs;
		fs;
		introspectedLayout;
		bindings = {};
		uniforms = {};
		varyings = null;
		_uniformCount = 0;
		_uniformSetters = {};
		get [Symbol.toStringTag]() {
			return "WEBGLRenderPipeline";
		}
		constructor(e, t) {
			super(e, t), this.device = e;
			let n = this.sharedRenderPipeline || this.device._createSharedRenderPipelineWebGL(t);
			this.sharedRenderPipeline = n, this.handle = n.handle, this.vs = n.vs, this.fs = n.fs, this.linkStatus = n.linkStatus, this.introspectedLayout = Zs(this.device.gl, this.handle, {
				uniformBlockLayouts: t._uniformBlockLayouts,
				shaderLayout: t.shaderLayout
			}), this.device._setWebGLDebugMetadata(this.handle, this, { spector: { id: this.props.id } }), this.shaderLayout = t.shaderLayout ? mc(this.introspectedLayout, t.shaderLayout) : this.introspectedLayout;
		}
		destroy() {
			this.destroyed || (this.sharedRenderPipeline && !this.props._sharedRenderPipeline && this.sharedRenderPipeline.destroy(), this.destroyResource());
		}
		setBindings(e, t) {
			let n = Rr(Lr(this.shaderLayout, e));
			for (let [e, r] of Object.entries(n)) {
				let n = hc(this.shaderLayout, e);
				if (n) {
					switch (r || O.warn(`Unsetting binding "${e}" in render pipeline "${this.id}"`)(), n.type) {
						case "uniform":
							if (!(r instanceof ts) && !(r.buffer instanceof ts)) throw Error("buffer value");
							break;
						case "texture":
							if (!(r instanceof As || r instanceof zs || r instanceof Wo)) throw Error(`${this} Bad texture binding for ${e}`);
							break;
						case "sampler":
							O.warn(`Ignoring sampler ${e}`)();
							break;
						default: throw Error(n.type);
					}
					this.bindings[e] = r;
				} else {
					let n = this.shaderLayout.bindings.map((e) => `"${e.name}"`).join(", ");
					t?.disableWarnings || O.warn(`No binding "${e}" in render pipeline "${this.id}", expected one of ${n}`, r)();
				}
			}
		}
		draw(e) {
			let t = e.renderPass, n = e.bindGroups ? Rr(e.bindGroups) : e.bindings || this.bindings;
			return t.setPipeline(this), t.setBindings(n), t.setVertexArray(e.vertexArray), t.draw({
				parameters: e.parameters,
				topology: e.topology,
				isInstanced: e.isInstanced,
				vertexCount: e.vertexCount,
				indexCount: e.indexCount,
				instanceCount: e.instanceCount,
				firstVertex: e.firstVertex,
				firstIndex: e.firstIndex,
				firstInstance: e.firstInstance,
				baseVertex: e.baseVertex,
				transformFeedback: e.transformFeedback,
				uniforms: e.uniforms
			});
		}
		_areTexturesRenderable(e) {
			let t = !0;
			for (let n of this.shaderLayout.bindings) gc(e, n.name) || (O.warn(`Binding ${n.name} not found in ${this.id}`)(), t = !1);
			return t;
		}
		_applyBindings(e, t) {
			if (this._syncLinkStatus(), this.linkStatus !== "success") return;
			let { gl: n } = this.device;
			n.useProgram(this.handle);
			let r = 0, i = 0;
			for (let t of this.shaderLayout.bindings) {
				let a = gc(e, t.name);
				if (!a) throw Error(`No value for binding ${t.name} in ${this.id}`);
				switch (t.type) {
					case "uniform":
						let { name: e } = t, o = n.getUniformBlockIndex(this.handle, e);
						if (o === 4294967295) throw Error(`Invalid uniform block name ${e}`);
						if (n.uniformBlockBinding(this.handle, o, i), a instanceof ts) n.bindBufferBase(35345, i, a.handle);
						else {
							let e = a;
							n.bindBufferRange(35345, i, e.buffer.handle, e.offset || 0, e.size || e.buffer.byteLength - (e.offset || 0));
						}
						i += 1;
						break;
					case "texture":
						if (!(a instanceof As || a instanceof zs || a instanceof Wo)) throw Error("texture");
						let s;
						if (a instanceof As) s = a.texture;
						else if (a instanceof zs) s = a;
						else if (a instanceof Wo && a.colorAttachments[0] instanceof As) O.warn("Passing framebuffer in texture binding may be deprecated. Use fbo.colorAttachments[0] instead")(), s = a.colorAttachments[0].texture;
						else throw Error("No texture");
						n.activeTexture(33984 + r), n.bindTexture(s.glTarget, s.handle), r += 1;
						break;
					case "sampler": break;
					case "storage":
					case "read-only-storage": throw Error(`binding type '${t.type}' not supported in WebGL`);
				}
			}
		}
		_applyUniforms(e) {
			for (let t of this.shaderLayout.uniforms || []) {
				let { name: n, location: r, type: i, textureUnit: a } = t, o = e[n] ?? a;
				o !== void 0 && Vs(this.device.gl, r, i, o);
			}
		}
		_syncLinkStatus() {
			this.linkStatus = this.sharedRenderPipeline.linkStatus;
		}
	};
})), yc, bc, xc = t((() => {
	I(), Xs(), yc = 4, bc = class extends Or {
		device;
		handle;
		vs;
		fs;
		linkStatus = "pending";
		constructor(e, t) {
			super(e, t), this.device = e, this.handle = t.handle || this.device.gl.createProgram(), this.vs = t.vs, this.fs = t.fs, t.varyings && t.varyings.length > 0 && this.device.gl.transformFeedbackVaryings(this.handle, t.varyings, t.bufferMode || 35981), this._linkShaders();
		}
		destroy() {
			this.destroyed || (this.device.gl.useProgram(null), this.device.gl.deleteProgram(this.handle), this.handle.destroyed = !0, this.destroyResource());
		}
		async _linkShaders() {
			let { gl: e } = this.device;
			if (e.attachShader(this.handle, this.vs.handle), e.attachShader(this.handle, this.fs.handle), O.time(yc, `linkProgram for ${this.id}`)(), e.linkProgram(this.handle), O.timeEnd(yc, `linkProgram for ${this.id}`)(), !this.device.features.has("compilation-status-async-webgl")) {
				let e = this._getLinkStatus();
				this._reportLinkStatus(e);
				return;
			}
			O.once(1, "RenderPipeline linking is asynchronous")(), await this._waitForLinkComplete(), O.info(2, `RenderPipeline ${this.id} - async linking complete: ${this.linkStatus}`)();
			let t = this._getLinkStatus();
			this._reportLinkStatus(t);
		}
		async _reportLinkStatus(e) {
			switch (e) {
				case "success": return;
				default:
					let t = e === "link-error" ? "Link error" : "Validation error";
					switch (this.vs.compilationStatus) {
						case "error": throw this.vs.debugShader(), Error(`${this} ${t} during compilation of ${this.vs}`);
						case "pending": await this.vs.asyncCompilationStatus, this.vs.debugShader();
					}
					switch (this.fs?.compilationStatus) {
						case "error": throw this.fs.debugShader(), Error(`${this} ${t} during compilation of ${this.fs}`);
						case "pending": await this.fs.asyncCompilationStatus, this.fs.debugShader();
					}
					let n = this.device.gl.getProgramInfoLog(this.handle);
					this.device.reportError(/* @__PURE__ */ Error(`${t} during ${e}: ${n}`), this)(), this.device.debug();
			}
		}
		_getLinkStatus() {
			let { gl: e } = this.device;
			return e.getProgramParameter(this.handle, 35714) ? (this._initializeSamplerUniforms(), e.validateProgram(this.handle), e.getProgramParameter(this.handle, 35715) ? (this.linkStatus = "success", "success") : (this.linkStatus = "error", "validation-error")) : (this.linkStatus = "error", "link-error");
		}
		_initializeSamplerUniforms() {
			let { gl: e } = this.device;
			e.useProgram(this.handle);
			let t = 0, n = e.getProgramParameter(this.handle, 35718);
			for (let r = 0; r < n; r++) {
				let n = e.getActiveUniform(this.handle, r);
				if (n && Gs(n.type)) {
					let r = n.name.endsWith("[0]"), i = r ? n.name.slice(0, -3) : n.name, a = e.getUniformLocation(this.handle, i);
					a !== null && (t = this._assignSamplerUniform(a, n, r, t));
				}
			}
		}
		_assignSamplerUniform(e, t, n, r) {
			let { gl: i } = this.device;
			if (n && t.size > 1) {
				let n = Int32Array.from({ length: t.size }, (e, t) => r + t);
				return i.uniform1iv(e, n), r + t.size;
			}
			return i.uniform1i(e, r), r + 1;
		}
		async _waitForLinkComplete() {
			let e = async (e) => await new Promise((t) => setTimeout(t, e));
			if (!this.device.features.has("compilation-status-async-webgl")) {
				await e(10);
				return;
			}
			let { gl: t } = this.device;
			for (;;) {
				if (t.getProgramParameter(this.handle, 37297)) return;
				await e(10);
			}
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-command-buffer.js
function Sc(e, t) {
	let n = t.sourceBuffer, r = t.destinationBuffer;
	e.gl.bindBuffer(36662, n.handle), e.gl.bindBuffer(36663, r.handle), e.gl.copyBufferSubData(36662, 36663, t.sourceOffset ?? 0, t.destinationOffset ?? 0, t.size), e.gl.bindBuffer(36662, null), e.gl.bindBuffer(36663, null);
}
function Cc(e, t) {
	let { sourceBuffer: n, byteOffset: r = 0, destinationTexture: i, mipLevel: a = 0, origin: o = [
		0,
		0,
		0
	], aspect: s = "all", bytesPerRow: c, rowsPerImage: l, size: u } = t;
	if (s !== "all") throw Error("copyBufferToTexture aspect is not supported in WebGL");
	i.writeBuffer(n, {
		byteOffset: r,
		bytesPerRow: c,
		rowsPerImage: l,
		mipLevel: a,
		x: o[0] ?? 0,
		y: o[1] ?? 0,
		z: o[2] ?? 0,
		width: u[0],
		height: u[1],
		depthOrArrayLayers: u[2]
	});
}
function wc(e, t) {
	let { sourceTexture: n, mipLevel: r = 0, aspect: i = "all", width: a = t.sourceTexture.width, height: o = t.sourceTexture.height, depthOrArrayLayers: s, origin: c = [
		0,
		0,
		0
	], destinationBuffer: l, byteOffset: u = 0, bytesPerRow: d, rowsPerImage: f } = t;
	if (n instanceof F) {
		n.readBuffer({
			x: c[0] ?? 0,
			y: c[1] ?? 0,
			z: c[2] ?? 0,
			width: a,
			height: o,
			depthOrArrayLayers: s,
			mipLevel: r,
			aspect: i,
			byteOffset: u
		}, l);
		return;
	}
	if (i !== "all") throw Error("aspect not supported in WebGL");
	if (r !== 0 || s !== void 0 || d || f) throw Error("not implemented");
	let { framebuffer: p, destroyFramebuffer: m } = Ec(n), h;
	try {
		let t = l, n = a || p.width, r = o || p.height, i = fo(Gn(p.colorAttachments[0]).texture.props.format), s = i.format, d = i.type;
		e.gl.bindBuffer(35051, t.handle), h = e.gl.bindFramebuffer(36160, p.handle), e.gl.readPixels(c[0], c[1], n, r, s, d, u);
	} finally {
		e.gl.bindBuffer(35051, null), h !== void 0 && e.gl.bindFramebuffer(36160, h), m && p.destroy();
	}
}
function Tc(e, t) {
	let { sourceTexture: n, destinationMipLevel: r = 0, origin: i = [0, 0], destinationOrigin: a = [
		0,
		0,
		0
	], destinationTexture: o } = t, { width: s = t.destinationTexture.width, height: c = t.destinationTexture.height } = t, { framebuffer: l, destroyFramebuffer: u } = Ec(n), [d = 0, f = 0] = i, [p, m, h] = a, g = e.gl.bindFramebuffer(36160, l.handle), _, v;
	if (o instanceof zs) _ = o, s = Number.isFinite(s) ? s : _.width, c = Number.isFinite(c) ? c : _.height, _._bind(0), v = _.glTarget;
	else throw Error("invalid destination");
	switch (v) {
		case 3553:
		case 34067:
			e.gl.copyTexSubImage2D(v, r, p, m, d, f, s, c);
			break;
		case 35866:
		case 32879: e.gl.copyTexSubImage3D(v, r, p, m, h, d, f, s, c);
	}
	_ && _._unbind(), e.gl.bindFramebuffer(36160, g), u && l.destroy();
}
function Ec(e) {
	if (e instanceof F) {
		let { width: t, height: n, id: r } = e;
		return {
			framebuffer: e.device.createFramebuffer({
				id: `framebuffer-for-${r}`,
				width: t,
				height: n,
				colorAttachments: [e]
			}),
			destroyFramebuffer: !0
		};
	}
	return {
		framebuffer: e,
		destroyFramebuffer: !1
	};
}
var Dc, Oc = t((() => {
	I(), Io(), Bs(), Dc = class extends Gr {
		device;
		handle = null;
		commands = [];
		constructor(e, t = {}) {
			super(e, t), this.device = e;
		}
		_executeCommands(e = this.commands) {
			for (let t of e) switch (t.name) {
				case "copy-buffer-to-buffer":
					Sc(this.device, t.options);
					break;
				case "copy-buffer-to-texture":
					Cc(this.device, t.options);
					break;
				case "copy-texture-to-buffer":
					wc(this.device, t.options);
					break;
				case "copy-texture-to-texture":
					Tc(this.device, t.options);
					break;
				default: throw Error(t.name);
			}
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/helpers/webgl-topology-utils.js
function kc(e) {
	switch (e) {
		case "point-list": return 0;
		case "line-list": return 1;
		case "line-strip": return 3;
		case "triangle-list": return 4;
		case "triangle-strip": return 5;
		default: throw Error(e);
	}
}
function Ac(e) {
	switch (e) {
		case "point-list": return 0;
		case "line-list": return 1;
		case "line-strip": return 1;
		case "triangle-list": return 4;
		case "triangle-strip": return 4;
		default: throw Error(e);
	}
}
var jc = t((() => {})), Mc, Nc, Pc = t((() => {
	I(), ks(), La(), jc(), ys(), Mc = [
		1,
		2,
		4,
		8
	], Nc = class extends Vr {
		device;
		handle = null;
		glParameters = {};
		pipeline = null;
		bindings = {};
		bindingsPipeline = null;
		vertexArray = null;
		constructor(e, t) {
			super(e, t), this.device = e;
			let n = this.props.framebuffer, r = !n || n.handle === null;
			r && e.getDefaultCanvasContext()._resizeDrawingBufferIfNeeded();
			let i;
			if (!t?.parameters?.viewport) {
				if (!r && n) {
					let { width: e, height: t } = n;
					i = [
						0,
						0,
						e,
						t
					];
				} else {
					let [t, n] = e.getDefaultCanvasContext().getDrawingBufferSize();
					i = [
						0,
						0,
						t,
						n
					];
				}
			}
			if (this.device.pushState(), this.setParameters({
				viewport: i,
				...this.props.parameters
			}), !r && n?.colorAttachments.length) {
				let e = n.colorAttachments.map((e, t) => 36064 + t);
				this.device.gl.drawBuffers(e);
			} else r && this.device.gl.drawBuffers([1029]);
			this.clear(), this.props.timestampQuerySet && this.props.beginTimestampIndex !== void 0 && this.props.timestampQuerySet.writeTimestamp(this.props.beginTimestampIndex);
		}
		end() {
			this.destroyed || (this.props.timestampQuerySet && this.props.endTimestampIndex !== void 0 && this.props.timestampQuerySet.writeTimestamp(this.props.endTimestampIndex), this.device.popState(), this.destroy());
		}
		pushDebugGroup(e) {}
		popDebugGroup() {}
		insertDebugMarker(e) {}
		executeBundles(e) {
			throw Error("Render bundles are only supported in WebGPU");
		}
		setParameters(e = {}) {
			let t = { ...this.glParameters };
			t.framebuffer = this.props.framebuffer || null, this.props.depthReadOnly && (t.depthMask = !this.props.depthReadOnly), t.stencilMask = +!this.props.stencilReadOnly, t[35977] = this.props.discard, e.viewport && (e.viewport.length >= 6 ? (t.viewport = e.viewport.slice(0, 4), t.depthRange = [e.viewport[4], e.viewport[5]]) : t.viewport = e.viewport), e.scissorRect && (t.scissorTest = !0, t.scissor = e.scissorRect), e.blendConstant && (t.blendColor = e.blendConstant), e.stencilReference !== void 0 && (t[2967] = e.stencilReference, t[36003] = e.stencilReference), "colorMask" in e && (t.colorMask = Mc.map((t) => !!(t & e.colorMask))), this.glParameters = t, Na(this.device.gl, t);
		}
		setPipeline(e) {
			this.pipeline = e;
		}
		setBindings(e, t) {
			if (!this.pipeline) throw Error("RenderPass.setPipeline() must be called before setBindings()");
			this.bindings = Rr(Lr(this.pipeline.shaderLayout, e)), this.bindingsPipeline = this.pipeline;
		}
		setVertexArray(e) {
			this.vertexArray = e;
		}
		draw(e) {
			let t = this.pipeline, n = this.vertexArray;
			if (!t) throw Error("RenderPass.setPipeline() must be called before draw()");
			if (!n) throw Error("RenderPass.setVertexArray() must be called before draw()");
			if (t.shaderLayout.bindings.length > 0 && this.bindingsPipeline !== t) throw Error("RenderPass.setBindings() must be called after setPipeline() before draw()");
			t._syncLinkStatus();
			let { parameters: r = t.props.parameters, topology: i = t.props.topology, vertexCount: a, indexCount: o, instanceCount: s, isInstanced: c = !1, firstVertex: l = 0, transformFeedback: u, uniforms: d = t.uniforms } = e, f = kc(i), p = !!n.indexBuffer, m = n.indexBuffer?.glIndexType, h = o ?? a ?? 0;
			if (t.linkStatus !== "success") return O.info(2, `RenderPipeline:${t.id}.draw() aborted - waiting for shader linking`)(), !1;
			if (!t._areTexturesRenderable(this.bindings)) return O.info(2, `RenderPipeline:${t.id}.draw() aborted - textures not yet loaded`)(), !1;
			this.device.gl.useProgram(t.handle), n.bindBeforeRender(this);
			let g = u;
			return g && g.begin(t.props.topology), t._applyBindings(this.bindings, { disableWarnings: t.props.disableWarnings }), t._applyUniforms(d), ls(this.device, r, this.glParameters, () => {
				p && c ? this.device.gl.drawElementsInstanced(f, h, m, l, s || 0) : p ? this.device.gl.drawElements(f, h, m, l) : c ? this.device.gl.drawArraysInstanced(f, l, a || 0, s || 0) : this.device.gl.drawArrays(f, l, a || 0), g && g.end();
			}), n.unbindAfterRender(this), !0;
		}
		drawIndirect(e, t = 0) {
			throw Error("Indirect drawing is only supported in WebGPU");
		}
		drawIndexedIndirect(e, t = 0) {
			throw Error("Indirect drawing is only supported in WebGPU");
		}
		beginOcclusionQuery(e) {
			this.props.occlusionQuerySet?.beginOcclusionQuery();
		}
		endOcclusionQuery() {
			this.props.occlusionQuerySet?.endOcclusionQuery();
		}
		clear() {
			let e = { ...this.glParameters }, t = 0;
			this.props.clearColors && this.props.clearColors.forEach((e, t) => {
				e && this.clearColorBuffer(t, e);
			}), this.props.clearColor !== !1 && this.props.clearColors === void 0 && (t |= 16384, e.clearColor = this.props.clearColor), this.props.clearDepth !== !1 && (t |= 256, e.clearDepth = this.props.clearDepth), this.props.clearStencil !== !1 && (t |= 1024, e.clearStencil = this.props.clearStencil), t !== 0 && Ds(this.device.gl, e, () => {
				this.device.gl.clear(t);
			});
		}
		clearColorBuffer(e = 0, t = [
			0,
			0,
			0,
			0
		]) {
			Ds(this.device.gl, { framebuffer: this.props.framebuffer }, () => {
				switch (t.constructor) {
					case Int8Array:
					case Int16Array:
					case Int32Array:
						this.device.gl.clearBufferiv(6144, e, t);
						break;
					case Uint8Array:
					case Uint8ClampedArray:
					case Uint16Array:
					case Uint32Array:
						this.device.gl.clearBufferuiv(6144, e, t);
						break;
					case Float32Array:
						this.device.gl.clearBufferfv(6144, e, t);
						break;
					default: throw Error("clearColorBuffer: color must be typed array");
				}
			});
		}
	};
})), Fc, Ic = t((() => {
	I(), Oc(), Pc(), Fc = class extends Ur {
		device;
		handle = null;
		commandBuffer;
		constructor(e, t) {
			super(e, t), this.device = e, this.commandBuffer = new Dc(e, {
				id: this.id,
				userData: this.userData
			});
		}
		destroy() {
			this.destroyResource();
		}
		finish() {
			return this.destroy(), this.commandBuffer;
		}
		beginRenderPass(e = {}) {
			return new Nc(this.device, this._applyTimeProfilingToPassProps(e));
		}
		beginComputePass(e = {}) {
			throw Error("ComputePass not supported in WebGL");
		}
		copyBufferToBuffer(e) {
			this.commandBuffer.commands.push({
				name: "copy-buffer-to-buffer",
				options: e
			});
		}
		copyBufferToTexture(e) {
			this.commandBuffer.commands.push({
				name: "copy-buffer-to-texture",
				options: e
			});
		}
		copyTextureToBuffer(e) {
			this.commandBuffer.commands.push({
				name: "copy-texture-to-buffer",
				options: e
			});
		}
		copyTextureToTexture(e) {
			this.commandBuffer.commands.push({
				name: "copy-texture-to-texture",
				options: e
			});
		}
		pushDebugGroup(e) {}
		popDebugGroup() {}
		insertDebugMarker(e) {}
		resolveQuerySet(e, t, n) {
			throw Error("resolveQuerySet is not supported in WebGL");
		}
		writeTimestamp(e, t) {
			e.writeTimestamp(t);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/utils/fill-array.js
function Lc(e) {
	let { target: t, source: n, start: r = 0, count: i = 1 } = e, a = n.length, o = i * a, s = 0;
	for (let e = r; s < a; s++) t[e++] = n[s] ?? 0;
	for (; s < o;) s < o - s ? (t.copyWithin(r + s, r, r + s), s *= 2) : (t.copyWithin(r + s, r, r + o - s), s = o);
	return e.target;
}
var Rc = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-vertex-array.js
function zc(e) {
	return Array.isArray(e) ? new Float32Array(e) : e;
}
function Bc(e, t) {
	if (!e || !t || e.length !== t.length || e.constructor !== t.constructor) return !1;
	for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
	return !0;
}
var Vc, Hc = t((() => {
	I(), m(), ao(), Rc(), Vc = class e extends qr {
		get [Symbol.toStringTag]() {
			return "VertexArray";
		}
		device;
		handle;
		attributeInfosByLocation;
		buffer = null;
		bufferValue = null;
		static isConstantAttributeZeroSupported(e) {
			return d() === "Chrome";
		}
		constructor(e, t) {
			super(e, t), this.device = e, this.handle = this.device.gl.createVertexArray(), this.attributeInfosByLocation = Array(this.maxVertexAttributes).fill(null);
			for (let e of Object.values(ta(t.shaderLayout, t.bufferLayout))) this.attributeInfosByLocation[e.location] = e;
		}
		destroy() {
			super.destroy(), this.buffer && this.buffer?.destroy(), this.handle &&= (this.device.gl.deleteVertexArray(this.handle), void 0);
		}
		setIndexBuffer(e) {
			let t = e;
			if (t && t.glTarget !== 34963) throw Error("Use .setBuffer()");
			this.device.gl.bindVertexArray(this.handle), this.device.gl.bindBuffer(34963, t ? t.handle : null), this.indexBuffer = t, this.device.gl.bindVertexArray(null);
		}
		setBuffer(e, t) {
			let n = t;
			if (n.glTarget === 34963) throw Error("Use .setIndexBuffer()");
			let { size: r, type: i, stride: a, offset: o, normalized: s, integer: c, divisor: l } = this._getAccessor(e);
			this.device.gl.bindVertexArray(this.handle), this.device.gl.bindBuffer(34962, n.handle), c ? this.device.gl.vertexAttribIPointer(e, r, i, a, o) : this.device.gl.vertexAttribPointer(e, r, i, s, a, o), this.device.gl.bindBuffer(34962, null), this.device.gl.enableVertexAttribArray(e), this.device.gl.vertexAttribDivisor(e, l || 0), this.attributes[e] = n, this.device.gl.bindVertexArray(null);
		}
		setConstantWebGL(e, t) {
			this._enable(e, !1), this.attributes[e] = t;
		}
		bindBeforeRender() {
			this.device.gl.bindVertexArray(this.handle), this._applyConstantAttributes();
		}
		unbindAfterRender() {
			this.device.gl.bindVertexArray(null);
		}
		_applyConstantAttributes() {
			for (let e = 0; e < this.maxVertexAttributes; ++e) {
				let t = this.attributes[e];
				ArrayBuffer.isView(t) && this.device.setConstantAttributeWebGL(e, t);
			}
		}
		_getAccessor(e) {
			let t = this.attributeInfosByLocation[e];
			if (!t) throw Error(`Unknown attribute location ${e}`);
			let n = io(t.bufferDataType);
			return {
				size: t.bufferComponents,
				type: n,
				stride: t.byteStride,
				offset: t.byteOffset,
				normalized: t.normalized,
				integer: t.integer,
				divisor: +(t.stepMode === "instance")
			};
		}
		_enable(t, n = !0) {
			let r = e.isConstantAttributeZeroSupported(this.device) || t !== 0;
			(n || r) && (t = Number(t), this.device.gl.bindVertexArray(this.handle), n ? this.device.gl.enableVertexAttribArray(t) : this.device.gl.disableVertexAttribArray(t), this.device.gl.bindVertexArray(null));
		}
		getConstantBuffer(e, t) {
			let n = zc(t), r = n.byteLength * e, i = n.length * e;
			if (this.buffer && r !== this.buffer.byteLength) throw Error(`Buffer size is immutable, byte length ${r} !== ${this.buffer.byteLength}.`);
			let a = !this.buffer;
			if (this.buffer = this.buffer || this.device.createBuffer({ byteLength: r }), a ||= !Bc(n, this.bufferValue), a) {
				let e = Oi(t.constructor, i);
				Lc({
					target: e,
					source: n,
					start: 0,
					count: i
				}), this.buffer.write(e), this.bufferValue = t;
			}
			return this.buffer;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/resources/webgl-transform-feedback.js
function Uc(e) {
	return typeof e == "number" ? Number.isInteger(e) : /^\d+$/.test(e);
}
var Wc, Gc = t((() => {
	I(), xl(), jc(), Wc = class extends Yr {
		device;
		gl;
		handle;
		layout;
		buffers = {};
		unusedBuffers = {};
		bindOnUse = !0;
		_bound = !1;
		constructor(e, t) {
			super(e, t), this.device = e, this.gl = e.gl, this.handle = this.props.handle || this.gl.createTransformFeedback(), this.layout = this.props.layout, t.buffers && this.setBuffers(t.buffers), Object.seal(this);
		}
		destroy() {
			this.gl.deleteTransformFeedback(this.handle), super.destroy();
		}
		begin(e = "point-list") {
			this.gl.bindTransformFeedback(36386, this.handle), this.bindOnUse && this._bindBuffers(), this.gl.beginTransformFeedback(Ac(e));
		}
		end() {
			this.gl.endTransformFeedback(), this.bindOnUse && this._unbindBuffers(), this.gl.bindTransformFeedback(36386, null);
		}
		setBuffers(e) {
			this.buffers = {}, this.unusedBuffers = {}, this.bind(() => {
				for (let [t, n] of Object.entries(e)) this.setBuffer(t, n);
			});
		}
		setBuffer(e, t) {
			let n = this._getVaryingIndex(e), { buffer: r, byteLength: i, byteOffset: a } = this._getBufferRange(t);
			n < 0 ? (this.unusedBuffers[e] = r, O.warn(`${this.id} unusedBuffers varying buffer ${e}`)()) : (this.buffers[n] = {
				buffer: r,
				byteLength: i,
				byteOffset: a
			}, this.bindOnUse || this._bindBuffer(n, r, a, i));
		}
		getBuffer(e) {
			if (Uc(e)) return this.buffers[e] || null;
			let t = this._getVaryingIndex(e);
			return this.buffers[t] ?? null;
		}
		bind(e = this.handle) {
			if (typeof e != "function") return this.gl.bindTransformFeedback(36386, e), this;
			let t;
			return this._bound ? t = e() : (this.gl.bindTransformFeedback(36386, this.handle), this._bound = !0, t = e(), this._bound = !1, this.gl.bindTransformFeedback(36386, null)), t;
		}
		unbind() {
			this.bind(null);
		}
		_getBufferRange(e) {
			if (e instanceof ts) return {
				buffer: e,
				byteOffset: 0,
				byteLength: e.byteLength
			};
			let { buffer: t, byteOffset: n = 0, byteLength: r = e.buffer.byteLength } = e;
			return {
				buffer: t,
				byteOffset: n,
				byteLength: r
			};
		}
		_getVaryingIndex(e) {
			if (Uc(e)) return Number(e);
			for (let t of this.layout.varyings || []) if (e === t.name) return t.location;
			return -1;
		}
		_bindBuffers() {
			for (let [e, t] of Object.entries(this.buffers)) {
				let { buffer: n, byteLength: r, byteOffset: i } = this._getBufferRange(t);
				this._bindBuffer(Number(e), n, i, r);
			}
		}
		_unbindBuffers() {
			for (let e in this.buffers) this.gl.bindBufferBase(35982, Number(e), null);
		}
		_bindBuffer(e, t, n = 0, r) {
			let i = t && t.handle;
			!i || r === void 0 ? this.gl.bindBufferBase(35982, e, i) : this.gl.bindBufferRange(35982, e, i, n, r);
		}
	};
})), Kc, qc = t((() => {
	I(), Kc = class extends Zr {
		device;
		handle;
		_timestampPairs = [];
		_pendingReads = /* @__PURE__ */ new Set();
		_occlusionQuery = null;
		_occlusionActive = !1;
		get [Symbol.toStringTag]() {
			return "QuerySet";
		}
		constructor(e, t) {
			if (super(e, t), this.device = e, t.type === "timestamp") {
				if (t.count < 2) throw Error("Timestamp QuerySet requires at least two query slots");
				this._timestampPairs = Array(Math.ceil(t.count / 2)).fill(null).map(() => ({
					activeQuery: null,
					completedQueries: []
				})), this.handle = null;
			} else {
				if (t.count > 1) throw Error("WebGL occlusion QuerySet can only have one value");
				let e = this.device.gl.createQuery();
				if (!e) throw Error("WebGL query not supported");
				this.handle = e;
			}
			Object.seal(this);
		}
		destroy() {
			if (!this.destroyed) {
				this.handle && this.device.gl.deleteQuery(this.handle);
				for (let e of this._timestampPairs) {
					e.activeQuery && (this._cancelPendingQuery(e.activeQuery), this.device.gl.deleteQuery(e.activeQuery.handle));
					for (let t of e.completedQueries) this._cancelPendingQuery(t), this.device.gl.deleteQuery(t.handle);
				}
				this._occlusionQuery && (this._cancelPendingQuery(this._occlusionQuery), this.device.gl.deleteQuery(this._occlusionQuery.handle));
				for (let e of Array.from(this._pendingReads)) this._cancelPendingQuery(e);
				this.destroyResource();
			}
		}
		isResultAvailable(e) {
			return this.props.type === "timestamp" ? e === void 0 ? this._timestampPairs.some((e, t) => this._isTimestampPairAvailable(t)) : this._isTimestampPairAvailable(this._getTimestampPairIndex(e)) : this._occlusionQuery ? this._pollQueryAvailability(this._occlusionQuery) : !1;
		}
		async readResults(e) {
			let t = e?.firstQuery || 0, n = e?.queryCount || this.props.count - t;
			if (this._validateRange(t, n), this.props.type === "timestamp") {
				let e = Array(n).fill(0n), r = Math.floor(t / 2), i = Math.floor((t + n - 1) / 2);
				for (let a = r; a <= i; a++) {
					let r = await this._consumeTimestampPairResult(a), i = a * 2, o = i + 1;
					i >= t && i < t + n && (e[i - t] = 0n), o >= t && o < t + n && (e[o - t] = r);
				}
				return e;
			}
			if (!this._occlusionQuery) throw Error("Occlusion query has not been started");
			return [await this._consumeQueryResult(this._occlusionQuery)];
		}
		async readTimestampDuration(e, t) {
			if (this.props.type !== "timestamp") throw Error("Timestamp durations require a timestamp QuerySet");
			if (e < 0 || t >= this.props.count || t <= e) throw Error("Timestamp duration range is out of bounds");
			if (e % 2 != 0 || t !== e + 1) throw Error("WebGL timestamp durations require adjacent even/odd query indices");
			let n = await this._consumeTimestampPairResult(this._getTimestampPairIndex(e));
			return Number(n) / 1e6;
		}
		beginOcclusionQuery() {
			if (this.props.type !== "occlusion") throw Error("Occlusion queries require an occlusion QuerySet");
			if (!this.handle) throw Error("WebGL occlusion query is not available");
			if (this._occlusionActive) throw Error("Occlusion query is already active");
			this.device.gl.beginQuery(35887, this.handle), this._occlusionQuery = {
				handle: this.handle,
				promise: null,
				result: null,
				disjoint: !1,
				cancelled: !1,
				pollRequestId: null,
				resolve: null,
				reject: null
			}, this._occlusionActive = !0;
		}
		endOcclusionQuery() {
			if (!this._occlusionActive) throw Error("Occlusion query is not active");
			this.device.gl.endQuery(35887), this._occlusionActive = !1;
		}
		writeTimestamp(e) {
			if (this.props.type !== "timestamp") throw Error("Timestamp writes require a timestamp QuerySet");
			let t = this._getTimestampPairIndex(e), n = this._timestampPairs[t];
			if (e % 2 == 0) {
				if (n.activeQuery) throw Error("Timestamp query pair is already active");
				let e = this.device.gl.createQuery();
				if (!e) throw Error("WebGL query not supported");
				let t = {
					handle: e,
					promise: null,
					result: null,
					disjoint: !1,
					cancelled: !1,
					pollRequestId: null,
					resolve: null,
					reject: null
				};
				this.device.gl.beginQuery(35007, e), n.activeQuery = t;
			} else {
				if (!n.activeQuery) throw Error("Timestamp query pair was ended before it was started");
				this.device.gl.endQuery(35007), n.completedQueries.push(n.activeQuery), n.activeQuery = null;
			}
		}
		_validateRange(e, t) {
			if (e < 0 || t < 0 || e + t > this.props.count) throw Error("Query read range is out of bounds");
		}
		_getTimestampPairIndex(e) {
			if (e < 0 || e >= this.props.count) throw Error("Query index is out of bounds");
			return Math.floor(e / 2);
		}
		_isTimestampPairAvailable(e) {
			let t = this._timestampPairs[e];
			return !t || t.completedQueries.length === 0 ? !1 : this._pollQueryAvailability(t.completedQueries[0]);
		}
		_pollQueryAvailability(e) {
			if (e.cancelled || this.destroyed) return e.result = 0n, !0;
			if (e.result !== null || e.disjoint) return !0;
			if (!this.device.gl.getQueryParameter(e.handle, 34919)) return !1;
			let t = !!this.device.gl.getParameter(36795);
			return e.disjoint = t, e.result = t ? 0n : BigInt(this.device.gl.getQueryParameter(e.handle, 34918)), !0;
		}
		async _consumeTimestampPairResult(e) {
			let t = this._timestampPairs[e];
			if (!t || t.completedQueries.length === 0) throw Error("Timestamp query pair has no completed result");
			let n = t.completedQueries.shift();
			try {
				return await this._consumeQueryResult(n);
			} finally {
				this.device.gl.deleteQuery(n.handle);
			}
		}
		_consumeQueryResult(e) {
			return e.promise ||= (this._pendingReads.add(e), new Promise((t, n) => {
				e.resolve = t, e.reject = n;
				let r = () => {
					e.pollRequestId = null, e.cancelled || this.destroyed ? (this._pendingReads.delete(e), e.promise = null, e.resolve = null, e.reject = null, t(0n)) : this._pollQueryAvailability(e) ? (this._pendingReads.delete(e), e.promise = null, e.resolve = null, e.reject = null, e.disjoint ? n(/* @__PURE__ */ Error("GPU timestamp query was invalidated by a disjoint event")) : t(e.result || 0n)) : e.pollRequestId = this._requestAnimationFrame(r);
				};
				r();
			})), e.promise;
		}
		_cancelPendingQuery(e) {
			if (this._pendingReads.delete(e), e.cancelled = !0, e.pollRequestId !== null && (this._cancelAnimationFrame(e.pollRequestId), e.pollRequestId = null), e.resolve) {
				let t = e.resolve;
				e.promise = null, e.resolve = null, e.reject = null, t(0n);
			}
		}
		_requestAnimationFrame(e) {
			return requestAnimationFrame(e);
		}
		_cancelAnimationFrame(e) {
			cancelAnimationFrame(e);
		}
	};
})), Jc, Yc = t((() => {
	I(), Jc = class extends $r {
		device;
		gl;
		handle;
		signaled;
		_signaled = !1;
		constructor(e, t = {}) {
			super(e, {}), this.device = e, this.gl = e.gl;
			let n = this.props.handle || this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
			if (!n) throw Error("Failed to create WebGL fence");
			this.handle = n, this.signaled = new Promise((e) => {
				let t = () => {
					let n = this.gl.clientWaitSync(this.handle, 0, 0);
					n === this.gl.ALREADY_SIGNALED || n === this.gl.CONDITION_SATISFIED ? (this._signaled = !0, e()) : setTimeout(t, 1);
				};
				t();
			});
		}
		isSignaled() {
			if (this._signaled) return !0;
			let e = this.gl.getSyncParameter(this.handle, this.gl.SYNC_STATUS);
			return this._signaled = e === this.gl.SIGNALED, this._signaled;
		}
		destroy() {
			this.destroyed || this.gl.deleteSync(this.handle);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/helpers/format-utils.js
function Xc(e) {
	switch (e) {
		case 6406:
		case 33326:
		case 6403:
		case 36244: return 1;
		case 33339:
		case 33340:
		case 33328:
		case 33320:
		case 33319: return 2;
		case 6407:
		case 36248:
		case 34837: return 3;
		case 6408:
		case 36249:
		case 34836: return 4;
		default: return 0;
	}
}
function Zc(e) {
	switch (e) {
		case 5121: return 1;
		case 33635:
		case 32819:
		case 32820: return 2;
		case 5126: return 4;
		default: return 0;
	}
}
var Qc = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/helpers/webgl-texture-utils.js
function $c(e, t) {
	let { sourceX: n = 0, sourceY: r = 0, sourceAttachment: i = 0 } = t || {}, { target: a = null, sourceWidth: o, sourceHeight: s, sourceDepth: c, sourceFormat: l, sourceType: u } = t || {}, { framebuffer: d, deleteFramebuffer: f } = tl(e), { gl: p, handle: m } = d;
	o ||= d.width, s ||= d.height;
	let h = d.colorAttachments[i]?.texture;
	if (!h) throw Error(`Invalid framebuffer attachment ${i}`);
	c = h?.depth || 1, l ||= h?.glFormat || 6408, u ||= h?.glType || 5121, a = rl(a, u, l, o, s, c);
	let g = Nt.getDataType(a);
	u ||= Us(g);
	let _ = p.bindFramebuffer(36160, m);
	return p.readBuffer(36064 + i), p.readPixels(n, r, o, s, l, u, a), p.readBuffer(36064), p.bindFramebuffer(36160, _ || null), f && d.destroy(), a;
}
function el(e, t) {
	let { target: n, sourceX: r = 0, sourceY: i = 0, sourceFormat: a = 6408, targetByteOffset: o = 0 } = t || {}, { sourceWidth: s, sourceHeight: c, sourceType: l } = t || {}, { framebuffer: u, deleteFramebuffer: d } = tl(e);
	s ||= u.width, c ||= u.height;
	let f = u;
	l ||= 5121;
	let p = n;
	if (!p) {
		let e = Xc(a), t = Zc(l), n = o + s * c * e * t;
		p = f.device.createBuffer({ byteLength: n });
	}
	let m = e.device.createCommandEncoder();
	return m.copyTextureToBuffer({
		sourceTexture: e,
		width: s,
		height: c,
		origin: [r, i],
		destinationBuffer: p,
		byteOffset: o
	}), m.destroy(), d && u.destroy(), p;
}
function tl(e) {
	return e instanceof wr ? {
		framebuffer: e,
		deleteFramebuffer: !1
	} : {
		framebuffer: nl(e),
		deleteFramebuffer: !0
	};
}
function nl(e, t) {
	let { device: n, width: r, height: i, id: a } = e;
	return n.createFramebuffer({
		...t,
		id: `framebuffer-for-${a}`,
		width: r,
		height: i,
		colorAttachments: [e]
	});
}
function rl(e, t, n, r, i, a) {
	if (e) return e;
	t ||= 5121;
	let o = Ms(t), s = Nt.getTypedArrayConstructor(o), c = Xc(n);
	return new s(r * i * c);
}
var il = t((() => {
	I(), Xs(), Qc(), Ps();
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/constants/webgl-constant-utils.js
function al(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n in e) {
		let r = e[n];
		if (n < "a") {
			let e = t.get(r);
			t.set(r, e ? `${e}, GL.${n}` : `GL.${n}`);
		}
	}
	return t;
}
var ol = t((() => {})), sl = /* @__PURE__ */ n({ WebGLDevice: () => fl });
function cl(e, t, n) {
	switch (n.length) {
		case 1:
			e.gl.vertexAttrib1fv(t, n);
			break;
		case 2:
			e.gl.vertexAttrib2fv(t, n);
			break;
		case 3:
			e.gl.vertexAttrib3fv(t, n);
			break;
		case 4: e.gl.vertexAttrib4fv(t, n);
	}
}
function ll(e, t, n) {
	e.gl.vertexAttribI4iv(t, n);
}
function ul(e, t, n) {
	e.gl.vertexAttribI4uiv(t, n);
}
function dl(e, t) {
	if (!e || !t || e.length !== t.length || e.constructor !== t.constructor) return !1;
	for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
	return !0;
}
var fl, pl = t((() => {
	I(), Ga(), Ya(), qa(), ro(), zo(), Vo(), qo(), Yo(), ba(), Io(), Qo(), ns(), cs(), Es(), Bs(), Go(), vc(), xc(), Ic(), Hc(), Gc(), qc(), Yc(), il(), La(), ks(), Za(), ol(), fl = class e extends Rn {
		static getDeviceFromContext(e) {
			return e ? e.luma?.device ?? null : null;
		}
		type = "webgl";
		handle;
		features;
		limits;
		info;
		canvasContext;
		preferredColorFormat = "rgba8unorm";
		preferredDepthFormat = "depth24plus";
		commandEncoder;
		lost;
		_resolveContextLost;
		_isLost = !1;
		gl;
		_glKeyByValue = null;
		_constants;
		extensions;
		_polyfilled = !1;
		spectorJS;
		get [Symbol.toStringTag]() {
			return "WebGLDevice";
		}
		toString() {
			return `${this[Symbol.toStringTag]}(${this.id})`;
		}
		isVertexFormatSupported(e) {
			switch (e) {
				case "unorm8x4-bgra": return !1;
				default: return !0;
			}
		}
		constructor(t) {
			super({
				...t,
				id: t.id || Xo("webgl-device")
			});
			let n = Rn._getCanvasContextProps(t);
			if (!n) throw Error("WebGLDevice requires props.createCanvasContext to be set");
			let r = n.canvas?.gl ?? null, i = e.getDeviceFromContext(r);
			if (i) throw Error(`WebGL context already attached to device ${i.id}`);
			this.canvasContext = new Ko(this, n), this.lost = new Promise((e) => {
				this._resolveContextLost = e;
			});
			let a = { ...t.webgl };
			n.alphaMode === "premultiplied" && (a.premultipliedAlpha = !0), t.powerPreference !== void 0 && (a.powerPreference = t.powerPreference), t.failIfMajorPerformanceCaveat !== void 0 && (a.failIfMajorPerformanceCaveat = t.failIfMajorPerformanceCaveat);
			let o = this.props._handle || Ja(this.canvasContext.canvas, {
				onContextLost: (e) => this._resolveContextLost?.({
					reason: "destroyed",
					message: "Entered sleep mode, or too many apps or browser tabs are using the GPU."
				}),
				onContextRestored: (e) => {
					console.log("WebGL context restored");
				}
			}, a);
			if (!o) throw Error("WebGL context creation failed");
			if (i = e.getDeviceFromContext(o), i) {
				if (t._reuseDevices) return O.log(1, `Not creating a new Device, instead returning a reference to Device ${i.id} already attached to WebGL context`, i)(), this.canvasContext.destroy(), i._reused = !0, i;
				throw Error(`WebGL context already attached to device ${i.id}`);
			}
			this.handle = o, this.gl = o, this.spectorJS = ha({
				...this.props,
				gl: this.handle
			});
			let s = Ka(this.handle);
			s.device = this, s.extensions ||= {}, this.extensions = s.extensions, this.info = Qa(this.gl, this.extensions), this.limits = new Bo(this.gl), this.features = new Ro(this.gl, this.extensions, this.props._disabledFeatures), this.props._initializeFeatures && this.features.initializeFeatures(), new Wa(this.gl, { log: (...e) => O.log(1, ...e)() }).trackState(this.gl, { copyState: !1 }), (t.debug || t.debugWebGL) && (this.gl = pa(this.gl, {
				debugWebGL: !0,
				traceWebGL: t.debugWebGL
			}), O.warn("WebGL debug mode activated. Performance reduced.")()), t.debugWebGL && (O.level = Math.max(O.level, 1)), this.commandEncoder = new Fc(this, { id: `${this}-command-encoder` }), this.canvasContext._startObservers();
		}
		destroy() {
			if (!this.props._reuseDevices && !this._reused) {
				this._isLost = !0, this.commandEncoder?.destroy();
				let e = Ka(this.handle);
				e.device = null;
			}
		}
		get isLost() {
			return this._isLost || this.gl.isContextLost();
		}
		createCanvasContext(e) {
			throw Error("WebGL only supports a single canvas");
		}
		createPresentationContext(e) {
			return new Jo(this, e || {});
		}
		createBuffer(e) {
			let t = this._normalizeBufferProps(e);
			return new ts(this, t);
		}
		createTexture(e) {
			return new zs(this, e);
		}
		createExternalTexture(e) {
			throw Error("ExternalTexture is not available on WebGL");
		}
		createSampler(e) {
			return new Ts(this, e);
		}
		createShader(e) {
			return new ss(this, e);
		}
		createFramebuffer(e) {
			return new Wo(this, e);
		}
		createVertexArray(e) {
			return new Vc(this, e);
		}
		createTransformFeedback(e) {
			return new Wc(this, e);
		}
		createQuerySet(e) {
			return new Kc(this, e);
		}
		createFence() {
			return new Jc(this);
		}
		createRenderPipeline(e) {
			return new _c(this, e);
		}
		_createSharedRenderPipelineWebGL(e) {
			return new bc(this, e);
		}
		createComputePipeline(e) {
			throw Error("ComputePipeline not supported in WebGL");
		}
		createRenderBundleEncoder(e) {
			throw Error("Render bundles are only supported in WebGPU");
		}
		createCommandEncoder(e = {}) {
			return new Fc(this, e);
		}
		submit(e) {
			let t = null;
			e || ({submittedCommandEncoder: t, commandBuffer: e} = this._finalizeDefaultCommandEncoderForSubmit());
			try {
				e._executeCommands(), t && t.resolveTimeProfilingQuerySet().then(() => {
					this.commandEncoder._gpuTimeMs = t._gpuTimeMs;
				}).catch(() => {});
			} finally {
				e.destroy();
			}
		}
		writeBufferViaCommandEncoder(e, t, n, r = 0) {
			t.write(n, r);
		}
		_finalizeDefaultCommandEncoderForSubmit() {
			let e = this.commandEncoder, t = e.finish();
			return this.commandEncoder.destroy(), this.commandEncoder = this.createCommandEncoder({
				id: e.props.id,
				timeProfilingQuerySet: e.getTimeProfilingQuerySet()
			}), {
				submittedCommandEncoder: e,
				commandBuffer: t
			};
		}
		readPixelsToArrayWebGL(e, t) {
			return $c(e, t);
		}
		readPixelsToBufferWebGL(e, t) {
			return el(e, t);
		}
		setParametersWebGL(e) {
			Na(this.gl, e);
		}
		getParametersWebGL(e) {
			return Pa(this.gl, e);
		}
		withParametersWebGL(e, t) {
			return Ds(this.gl, e, t);
		}
		resetWebGL() {
			O.warn("WebGLDevice.resetWebGL is deprecated, use only for debugging")(), Fa(this.gl);
		}
		_getDeviceSpecificTextureFormatCapabilities(e) {
			return lo(this.gl, e, this.extensions);
		}
		loseDevice() {
			let e = !1, t = this.getExtension("WEBGL_lose_context").WEBGL_lose_context;
			return t && (e = !0, t.loseContext()), this._resolveContextLost?.({
				reason: "destroyed",
				message: "Application triggered context loss"
			}), e;
		}
		pushState() {
			Wa.get(this.gl).push();
		}
		popState() {
			Wa.get(this.gl).pop();
		}
		getGLKey(e, t) {
			return this._getGLKeyByValue().get(Number(e)) || (t?.emptyIfUnknown ? "" : String(e));
		}
		getGLKeys(e) {
			let t = { emptyIfUnknown: !0 };
			return Object.entries(e).reduce((e, [n, r]) => (e[`${n}:${this.getGLKey(n, t)}`] = `${r}:${this.getGLKey(r, t)}`, e), {});
		}
		_getGLKeyByValue() {
			return this._glKeyByValue ??= al(this.gl), this._glKeyByValue;
		}
		setConstantAttributeWebGL(e, t) {
			let n = this.limits.maxVertexAttributes;
			this._constants = this._constants || Array(n).fill(null);
			let r = this._constants[e];
			switch (r && dl(r, t) && O.info(1, `setConstantAttributeWebGL(${e}) could have been skipped, value unchanged`)(), this._constants[e] = t, t.constructor) {
				case Float32Array:
					cl(this, e, t);
					break;
				case Int32Array:
					ll(this, e, t);
					break;
				case Uint32Array:
					ul(this, e, t);
					break;
				default: throw Error("constant");
			}
		}
		getExtension(e) {
			return Xa(this.gl, e, this.extensions), this.extensions;
		}
		_setWebGLDebugMetadata(e, t, n) {
			e.luma = t, e.__SPECTOR_Metadata = {
				props: n.spector,
				id: n.spector.id
			};
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/webgl/dist/adapter/webgl-adapter.js
function ml(e) {
	return typeof WebGL2RenderingContext < "u" && e instanceof WebGL2RenderingContext || !!(e && typeof e.createVertexArray == "function");
}
function hl(e) {
	return {
		...e,
		debug: e.debug ?? Rn.defaultProps.debug,
		debugWebGL: e.debugWebGL ?? Rn.defaultProps.debugWebGL,
		debugSpectorJS: e.debugSpectorJS ?? !!O.get("debug-spectorjs")
	};
}
async function gl(e) {
	let t = [];
	(e.debugWebGL || e.debug) && t.push(fa()), e.debugSpectorJS && t.push(ma(e));
	let n = await Promise.allSettled(t);
	for (let e of n) e.status === "rejected" && O.error(`Failed to initialize debug libraries ${e.reason}`)();
}
var _l, vl, yl, bl = t((() => {
	I(), da(), ba(), _l = 1, vl = class extends Ke {
		type = "webgl";
		enforceWebGL2(e) {
			aa(e);
		}
		isSupported() {
			return typeof WebGL2RenderingContext < "u";
		}
		isDeviceHandle(e) {
			return typeof WebGL2RenderingContext < "u" && e instanceof WebGL2RenderingContext || (typeof WebGLRenderingContext < "u" && e instanceof WebGLRenderingContext && O.warn("WebGL1 is not supported", e)(), !1);
		}
		async attach(e, t = {}) {
			let { WebGLDevice: n } = await Promise.resolve().then(() => (pl(), sl));
			if (e instanceof n) return e;
			let r = n.getDeviceFromContext(e);
			if (r) return r;
			if (!ml(e)) throw Error("Invalid WebGL2RenderingContext");
			t = hl(t), await gl(t);
			let i = t.createCanvasContext === !0 ? {} : t.createCanvasContext;
			return new n({
				...t,
				_handle: e,
				createCanvasContext: {
					canvas: e.canvas,
					autoResize: !1,
					...i
				}
			});
		}
		async create(e = {}) {
			let { WebGLDevice: t } = await Promise.resolve().then(() => (pl(), sl));
			e = hl(e), await gl(e);
			try {
				let n = new t(e);
				O.groupCollapsed(_l, `WebGLDevice ${n.id} created`)();
				let r = `\
${n._reused ? "Reusing" : "Created"} device with WebGL2 ${n.props.debug ? "debug " : ""}context: \
${n.info.vendor}, ${n.info.renderer} for canvas: ${n.canvasContext.id}`;
				return O.probe(_l, r)(), O.table(_l, n.info)(), n;
			} finally {
				O.groupEnd(_l)(), O.info(_l, "%cWebGL call tracing: luma.log.set('debug-webgl') ", "color: white; background: blue; padding: 2px 6px; border-radius: 3px;")();
			}
		}
	}, yl = new vl();
})), xl = t((() => {
	bl(), pl(), qo(), ns(), Bs(), cs(), Es(), Go(), Yc(), vc(), Ic(), Pc(), Hc(), Gc(), ys(), pc(), Ga(), La(), ks();
}));
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/assert.js
function Sl(e, t) {
	if (!e) throw Error(t || "loader assertion failed.");
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/globals.js
var Cl = {
	self: typeof self < "u" && self,
	window: typeof window < "u" && window,
	global: typeof global < "u" && global,
	document: typeof document < "u" && document
};
Cl.self || Cl.window || Cl.global, Cl.window || Cl.self || Cl.global, Cl.global || Cl.self || Cl.window, Cl.document;
var wl = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), Tl = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/log-utils/log.js
Tl && parseFloat(Tl[1]), ve();
var El = "v4.5.4";
function Dl() {
	let e = new he({ id: "loaders.gl" });
	return globalThis.loaders ||= {}, globalThis.loaders.log = e, globalThis.loaders.version = El, globalThis.probe ||= {}, globalThis.probe.loaders = e, e;
}
var Ol = Dl(), kl = (e) => typeof e == "boolean", Al = (e) => typeof e == "function", jl = (e) => typeof e == "object" && !!e, Ml = (e) => jl(e) && e.constructor === {}.constructor, Nl = (e) => typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer, Pl = (e) => jl(e) && typeof e.byteLength == "number" && typeof e.slice == "function", Fl = (e) => !!e && Al(e[Symbol.iterator]), Il = (e) => !!e && Al(e[Symbol.asyncIterator]), Ll = (e) => typeof Response < "u" && e instanceof Response || jl(e) && Al(e.arrayBuffer) && Al(e.text) && Al(e.json), Rl = (e) => typeof Blob < "u" && e instanceof Blob, zl = (e) => typeof ReadableStream < "u" && e instanceof ReadableStream || jl(e) && Al(e.tee) && Al(e.cancel) && Al(e.getReader), Bl = (e) => jl(e) && Al(e.read) && Al(e.pipe) && kl(e.readable), Vl = (e) => zl(e) || Bl(e);
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/option-utils/merge-options.js
function Hl(e, t) {
	return Ul(e || {}, t);
}
function Ul(e, t, n = 0) {
	if (n > 3) return t;
	let r = { ...e };
	for (let [e, i] of Object.entries(t)) r[e] = i && typeof i == "object" && !Array.isArray(i) ? Ul(r[e] || {}, t[e], n + 1) : t[e];
	return r;
}
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/npm-tag.js
var Wl = "latest";
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/version.js
function Gl() {
	return globalThis._loadersgl_?.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.5.4"), globalThis._loadersgl_.version;
}
var Kl = Gl();
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js
function ql(e, t) {
	if (!e) throw Error(t || "loaders.gl assertion failed.");
}
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js
var Jl = {
	self: typeof self < "u" && self,
	window: typeof window < "u" && window,
	global: typeof global < "u" && global,
	document: typeof document < "u" && document
};
Jl.self || Jl.window || Jl.global, Jl.window || Jl.self || Jl.global, Jl.global || Jl.self || Jl.window, Jl.document;
var Yl = typeof process != "object" || String(process) !== "[object process]" || process.browser, Xl = typeof window < "u" && window.orientation !== void 0, Zl = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Zl && parseFloat(Zl[1]);
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-job.js
var Ql = class {
	name;
	workerThread;
	isRunning = !0;
	result;
	_resolve = () => {};
	_reject = () => {};
	constructor(e, t) {
		this.name = e, this.workerThread = t, this.result = new Promise((e, t) => {
			this._resolve = e, this._reject = t;
		});
	}
	postMessage(e, t) {
		this.workerThread.postMessage({
			source: "loaders.gl",
			type: e,
			payload: t
		});
	}
	done(e) {
		ql(this.isRunning), this.isRunning = !1, this._resolve(e);
	}
	error(e) {
		ql(this.isRunning), this.isRunning = !1, this._reject(e);
	}
}, $l = class {
	terminate() {}
}, eu = /* @__PURE__ */ new Map();
function tu(e) {
	ql(e.source && !e.url || !e.source && e.url);
	let t = eu.get(e.source || e.url);
	return t || (e.url && (t = nu(e.url), eu.set(e.url, t)), e.source && (t = ru(e.source), eu.set(e.source, t))), ql(t), t;
}
function nu(e) {
	return e.startsWith("http") ? ru(iu(e)) : e;
}
function ru(e) {
	let t = new Blob([e], { type: "application/javascript" });
	return URL.createObjectURL(t);
}
function iu(e) {
	return `\
try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-transfer-list.js
function au(e, t = !0, n) {
	let r = n || /* @__PURE__ */ new Set();
	if (e) {
		if (ou(e)) r.add(e);
		else if (ou(e.buffer)) r.add(e.buffer);
		else if (!ArrayBuffer.isView(e) && t && typeof e == "object") for (let n in e) au(e[n], t, r);
	}
	return n === void 0 ? Array.from(r) : [];
}
function ou(e) {
	return e ? e instanceof ArrayBuffer || typeof MessagePort < "u" && e instanceof MessagePort || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas : !1;
}
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-thread.js
var su = () => {}, cu = class {
	name;
	source;
	url;
	terminated = !1;
	worker;
	onMessage;
	onError;
	_loadableURL = "";
	static isSupported() {
		return typeof Worker < "u" && Yl || $l !== void 0 && !Yl;
	}
	constructor(e) {
		let { name: t, source: n, url: r } = e;
		ql(n || r), this.name = t, this.source = n, this.url = r, this.onMessage = su, this.onError = (e) => console.log(e), this.worker = Yl ? this._createBrowserWorker() : this._createNodeWorker();
	}
	destroy() {
		this.onMessage = su, this.onError = su, this.worker.terminate(), this.terminated = !0;
	}
	get isRunning() {
		return !!this.onMessage;
	}
	postMessage(e, t) {
		t ||= au(e), this.worker.postMessage(e, t);
	}
	_getErrorFromErrorEvent(e) {
		let t = "Failed to load ";
		return t += `worker ${this.name} from ${this.url}. `, e.message && (t += `${e.message} in `), e.lineno && (t += `:${e.lineno}:${e.colno}`), Error(t);
	}
	_createBrowserWorker() {
		this._loadableURL = tu({
			source: this.source,
			url: this.url
		});
		let e = new Worker(this._loadableURL, { name: this.name });
		return e.onmessage = (e) => {
			e.data ? this.onMessage(e.data) : this.onError(/* @__PURE__ */ Error("No data received"));
		}, e.onerror = (e) => {
			this.onError(this._getErrorFromErrorEvent(e)), this.terminated = !0;
		}, e.onmessageerror = (e) => console.error(e), e;
	}
	_createNodeWorker() {
		let e;
		if (this.url) e = new $l(this.url.includes(":/") || this.url.startsWith("/") ? this.url : `./${this.url}`, {
			eval: !1,
			type: this.url.endsWith(".ts") || this.url.endsWith(".mjs") ? "module" : "commonjs"
		});
		else if (this.source) e = new $l(this.source, { eval: !0 });
		else throw Error("no worker");
		return e.on("message", (e) => {
			this.onMessage(e);
		}), e.on("error", (e) => {
			this.onError(e);
		}), e.on("exit", (e) => {}), e;
	}
}, lu = class {
	name = "unnamed";
	source;
	url;
	maxConcurrency = 1;
	maxMobileConcurrency = 1;
	onDebug = () => {};
	reuseWorkers = !0;
	props = {};
	jobQueue = [];
	idleQueue = [];
	count = 0;
	isDestroyed = !1;
	static isSupported() {
		return cu.isSupported();
	}
	constructor(e) {
		this.source = e.source, this.url = e.url, this.setProps(e);
	}
	destroy() {
		this.idleQueue.forEach((e) => e.destroy()), this.isDestroyed = !0;
	}
	setProps(e) {
		this.props = {
			...this.props,
			...e
		}, e.name !== void 0 && (this.name = e.name), e.maxConcurrency !== void 0 && (this.maxConcurrency = e.maxConcurrency), e.maxMobileConcurrency !== void 0 && (this.maxMobileConcurrency = e.maxMobileConcurrency), e.reuseWorkers !== void 0 && (this.reuseWorkers = e.reuseWorkers), e.onDebug !== void 0 && (this.onDebug = e.onDebug);
	}
	async startJob(e, t = (e, t, n) => e.done(n), n = (e, t) => e.error(t)) {
		let r = new Promise((r) => (this.jobQueue.push({
			name: e,
			onMessage: t,
			onError: n,
			onStart: r
		}), this));
		return this._startQueuedJob(), await r;
	}
	async _startQueuedJob() {
		if (!this.jobQueue.length) return;
		let e = this._getAvailableWorker();
		if (!e) return;
		let t = this.jobQueue.shift();
		if (t) {
			this.onDebug({
				message: "Starting job",
				name: t.name,
				workerThread: e,
				backlog: this.jobQueue.length
			});
			let n = new Ql(t.name, e);
			e.onMessage = (e) => t.onMessage(n, e.type, e.payload), e.onError = (e) => t.onError(n, e), t.onStart(n);
			try {
				await n.result;
			} catch (e) {
				console.error(`Worker exception: ${e}`);
			} finally {
				this.returnWorkerToQueue(e);
			}
		}
	}
	returnWorkerToQueue(e) {
		!Yl || this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency() ? (e.destroy(), this.count--) : this.idleQueue.push(e), this.isDestroyed || this._startQueuedJob();
	}
	_getAvailableWorker() {
		return this.idleQueue.length > 0 ? this.idleQueue.shift() || null : this.count < this._getMaxConcurrency() ? (this.count++, new cu({
			name: `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`,
			source: this.source,
			url: this.url
		})) : null;
	}
	_getMaxConcurrency() {
		return Xl ? this.maxMobileConcurrency : this.maxConcurrency;
	}
}, uu = {
	maxConcurrency: 3,
	maxMobileConcurrency: 1,
	reuseWorkers: !0,
	onDebug: () => {}
}, du = class e {
	props;
	workerPools = /* @__PURE__ */ new Map();
	static _workerFarm;
	static isSupported() {
		return cu.isSupported();
	}
	static getWorkerFarm(t = {}) {
		return e._workerFarm = e._workerFarm || new e({}), e._workerFarm.setProps(t), e._workerFarm;
	}
	constructor(e) {
		this.props = { ...uu }, this.setProps(e), this.workerPools = /* @__PURE__ */ new Map();
	}
	destroy() {
		for (let e of this.workerPools.values()) e.destroy();
		this.workerPools = /* @__PURE__ */ new Map();
	}
	setProps(e) {
		this.props = {
			...this.props,
			...e
		};
		for (let e of this.workerPools.values()) e.setProps(this._getWorkerPoolProps());
	}
	getWorkerPool(e) {
		let { name: t, source: n, url: r } = e, i = this.workerPools.get(t);
		return i || (i = new lu({
			name: t,
			source: n,
			url: r
		}), i.setProps(this._getWorkerPoolProps()), this.workerPools.set(t, i)), i;
	}
	_getWorkerPoolProps() {
		return {
			maxConcurrency: this.props.maxConcurrency,
			maxMobileConcurrency: this.props.maxMobileConcurrency,
			reuseWorkers: this.props.reuseWorkers,
			onDebug: this.props.onDebug
		};
	}
};
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/get-worker-url.js
function fu(e, t = {}) {
	let n = t[e.id] || {}, r = Yl ? e.workerFile || `${e.id}-worker.js` : `${e.id}-worker-node.js`, i = n.workerUrl;
	if (!i && e.id === "compression" && (i = t.workerUrl), (t._workerType || t?.core?._workerType) === "test" && (i = Yl ? `modules/${e.module}/dist/${r}` : `modules/${e.module}/src/workers/${e.id}-worker-node.ts`), !i) {
		let t = e.version;
		t === "latest" && (t = Wl);
		let n = t ? `@${t}` : "";
		i = `https://unpkg.com/@loaders.gl/${e.module}${n}/dist/${r}`;
	}
	return ql(i), i;
}
//#endregion
//#region node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/validate-worker-version.js
function pu(e, t = Kl) {
	ql(e, "no worker provided");
	let n = e.version;
	return !(!t || !n);
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/worker-loader-utils/parse-with-worker.js
function mu(e, t) {
	if (!du.isSupported()) return !1;
	let n = t?._nodeWorkers ?? t?.core?._nodeWorkers;
	if (!Yl && !n) return !1;
	let r = t?.worker ?? t?.core?.worker;
	return !!(e.worker && r);
}
async function hu(e, t, n, r, i) {
	let a = e.id, o = fu(e, n), s = du.getWorkerFarm(n?.core).getWorkerPool({
		name: a,
		url: o
	});
	n = JSON.parse(JSON.stringify(n || {})), n._workerLoaderId = e.id, r = JSON.parse(JSON.stringify(r || {}));
	let c = await s.startJob("process-on-worker", gu.bind(null, i));
	return c.postMessage("process", {
		input: t,
		options: n,
		context: r
	}), await (await c.result).result;
}
async function gu(e, t, n, r) {
	switch (n) {
		case "done":
			t.done(r);
			break;
		case "error":
			t.error(Error(r.error));
			break;
		case "process":
			let { id: i, input: a, options: o } = r;
			try {
				let n = await e(a, o);
				t.postMessage("done", {
					id: i,
					result: n
				});
			} catch (e) {
				let n = e instanceof Error ? e.message : "unknown error";
				t.postMessage("error", {
					id: i,
					error: n
				});
			}
			break;
		default: console.warn(`parse-with-worker unknown message ${n}`);
	}
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/array-buffer-utils.js
function _u(e, t, n) {
	if (n ||= e.byteLength, e.byteLength < n || t.byteLength < n) return !1;
	let r = new Uint8Array(e), i = new Uint8Array(t);
	for (let e = 0; e < r.length; ++e) if (r[e] !== i[e]) return !1;
	return !0;
}
function vu(...e) {
	return yu(e);
}
function yu(e) {
	let t = e.map((e) => e instanceof ArrayBuffer ? new Uint8Array(e) : e), n = t.reduce((e, t) => e + t.byteLength, 0), r = new Uint8Array(n), i = 0;
	for (let e of t) r.set(e, i), i += e.byteLength;
	return r.buffer;
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/iterators/async-iteration.js
async function bu(e) {
	let t = [];
	for await (let n of e) t.push(xu(n));
	return vu(...t);
}
function xu(e) {
	if (e instanceof ArrayBuffer) return e;
	if (ArrayBuffer.isView(e)) {
		let { buffer: t, byteOffset: n, byteLength: r } = e;
		return Su(t, n, r);
	}
	return Su(e);
}
function Su(e, t = 0, n = e.byteLength - t) {
	let r = new Uint8Array(e, t, n), i = new Uint8Array(r.length);
	return i.set(r), i.buffer;
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/file-aliases.js
var Cu = "", wu = {};
function Tu(e) {
	for (let t in wu) if (e.startsWith(t)) {
		let n = wu[t];
		e = e.replace(t, n);
	}
	return !e.startsWith("http://") && !e.startsWith("https://") && (e = `${Cu}${e}`), e;
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/node/buffer.browser.js
function Eu(e) {
	return e;
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/memory-conversion-utils.js
function Du(e) {
	return e && typeof e == "object" && e.isBuffer;
}
function Ou(e) {
	if (Du(e)) return Eu(e);
	if (e instanceof ArrayBuffer) return e;
	if (Nl(e)) return Au(e);
	if (ArrayBuffer.isView(e)) {
		let t = e.buffer;
		return e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? t : t.slice(e.byteOffset, e.byteOffset + e.byteLength);
	}
	if (typeof e == "string") {
		let t = e;
		return new TextEncoder().encode(t).buffer;
	}
	if (e && typeof e == "object" && e._toArrayBuffer) return e._toArrayBuffer();
	throw Error("toArrayBuffer");
}
function ku(e) {
	if (e instanceof ArrayBuffer) return e;
	if (Nl(e)) return Au(e);
	let { buffer: t, byteOffset: n, byteLength: r } = e;
	return t instanceof ArrayBuffer && n === 0 && r === t.byteLength ? t : Au(t, n, r);
}
function Au(e, t = 0, n = e.byteLength - t) {
	let r = new Uint8Array(e, t, n), i = new Uint8Array(r.length);
	return i.set(r), i.buffer;
}
function ju(e) {
	return ArrayBuffer.isView(e) ? e : new Uint8Array(e);
}
//#endregion
//#region node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/path.js
function Mu(e) {
	let t = e ? e.lastIndexOf("/") : -1;
	return t >= 0 ? e.substr(t + 1) : e;
}
function Nu(e) {
	let t = e ? e.lastIndexOf("/") : -1;
	return t >= 0 ? e.substr(0, t) : "";
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/fetch/fetch-error.js
var Pu = class extends Error {
	constructor(e, t) {
		super(e), this.reason = t.reason, this.url = t.url, this.response = t.response;
	}
	reason;
	url;
	response;
}, Fu = /^data:([-\w.]+\/[-\w.+]+)(;|,)/, Iu = /^([-\w.]+\/[-\w.+]+)/;
function Lu(e, t) {
	return e.toLowerCase() === t.toLowerCase();
}
function Ru(e) {
	let t = Iu.exec(e);
	return t ? t[1] : e;
}
function zu(e) {
	let t = Fu.exec(e);
	return t ? t[1] : "";
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js
var Bu = /\?.*/;
function Vu(e) {
	let t = e.match(Bu);
	return t && t[0];
}
function Hu(e) {
	return e.replace(Bu, "");
}
function Uu(e) {
	if (e.length < 50) return e;
	let t = e.slice(e.length - 15);
	return `${e.substr(0, 32)}...${t}`;
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/utils/resource-utils.js
function Wu(e) {
	return Ll(e) ? e.url : Rl(e) ? ("name" in e ? e.name : "") || "" : typeof e == "string" ? e : "";
}
function Gu(e) {
	if (Ll(e)) {
		let t = e.headers.get("content-type") || "", n = Hu(e.url);
		return Ru(t) || zu(n);
	}
	return Rl(e) ? e.type || "" : typeof e == "string" ? zu(e) : "";
}
function Ku(e) {
	return Ll(e) ? e.headers["content-length"] || -1 : Rl(e) ? e.size : typeof e == "string" ? e.length : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/utils/response-utils.js
async function qu(e) {
	if (Ll(e)) return e;
	let t = {}, n = Ku(e);
	n >= 0 && (t["content-length"] = String(n));
	let r = Wu(e), i = Gu(e);
	i && (t["content-type"] = i);
	let a = await Xu(e);
	a && (t["x-first-bytes"] = a), typeof e == "string" && (e = new TextEncoder().encode(e));
	let o = new Response(e, { headers: t });
	return Object.defineProperty(o, "url", { value: r }), o;
}
async function Ju(e) {
	if (!e.ok) throw await Yu(e);
}
async function Yu(e) {
	let t = Uu(e.url), n = `Failed to fetch resource (${e.status}) ${e.statusText}: ${t}`;
	n = n.length > 100 ? `${n.slice(0, 100)}...` : n;
	let r = {
		reason: e.statusText,
		url: e.url,
		response: e
	};
	try {
		let t = e.headers.get("Content-Type");
		r.reason = !e.bodyUsed && t?.includes("application/json") ? await e.json() : await e.text();
	} catch {}
	return new Pu(n, r);
}
async function Xu(e) {
	if (typeof e == "string") return `data:,${e.slice(0, 5)}`;
	if (e instanceof Blob) {
		let t = e.slice(0, 5);
		return await new Promise((e) => {
			let n = new FileReader();
			n.onload = (t) => e(t?.target?.result), n.readAsDataURL(t);
		});
	}
	return e instanceof ArrayBuffer ? `data:base64,${Zu(e.slice(0, 5))}` : null;
}
function Zu(e) {
	let t = "", n = new Uint8Array(e);
	for (let e = 0; e < n.byteLength; e++) t += String.fromCharCode(n[e]);
	return btoa(t);
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/fetch/fetch-file.js
function Qu(e) {
	return !$u(e) && !ed(e);
}
function $u(e) {
	return e.startsWith("http:") || e.startsWith("https:");
}
function ed(e) {
	return e.startsWith("data:");
}
async function td(e, t) {
	if (typeof e == "string") {
		let n = Tu(e);
		return Qu(n) && globalThis.loaders?.fetchNode ? globalThis.loaders?.fetchNode(n, t) : await fetch(n, t);
	}
	return await qu(e);
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/loader-utils/loggers.js
ve();
var nd = new he({ id: "loaders.gl" }), rd = class {
	log() {
		return () => {};
	}
	info() {
		return () => {};
	}
	warn() {
		return () => {};
	}
	error() {
		return () => {};
	}
}, id = { core: {
	baseUrl: void 0,
	fetch: null,
	mimeType: void 0,
	fallbackMimeType: void 0,
	ignoreRegisteredLoaders: void 0,
	nothrow: !1,
	log: new class {
		console;
		constructor() {
			this.console = console;
		}
		log(...e) {
			return this.console.log.bind(this.console, ...e);
		}
		info(...e) {
			return this.console.info.bind(this.console, ...e);
		}
		warn(...e) {
			return this.console.warn.bind(this.console, ...e);
		}
		error(...e) {
			return this.console.error.bind(this.console, ...e);
		}
	}(),
	useLocalLibraries: !1,
	CDN: "https://unpkg.com/@loaders.gl",
	worker: !0,
	maxConcurrency: 3,
	maxMobileConcurrency: 1,
	reuseWorkers: wl,
	_nodeWorkers: !1,
	_workerType: "",
	limit: 0,
	_limitMB: 0,
	batchSize: "auto",
	batchDebounceMs: 0,
	metadata: !1,
	transforms: []
} }, ad = {
	baseUri: "core.baseUrl",
	fetch: "core.fetch",
	mimeType: "core.mimeType",
	fallbackMimeType: "core.fallbackMimeType",
	ignoreRegisteredLoaders: "core.ignoreRegisteredLoaders",
	nothrow: "core.nothrow",
	log: "core.log",
	useLocalLibraries: "core.useLocalLibraries",
	CDN: "core.CDN",
	worker: "core.worker",
	maxConcurrency: "core.maxConcurrency",
	maxMobileConcurrency: "core.maxMobileConcurrency",
	reuseWorkers: "core.reuseWorkers",
	_nodeWorkers: "core.nodeWorkers",
	_workerType: "core._workerType",
	_worker: "core._workerType",
	limit: "core.limit",
	_limitMB: "core._limitMB",
	batchSize: "core.batchSize",
	batchDebounceMs: "core.batchDebounceMs",
	metadata: "core.metadata",
	transforms: "core.transforms",
	throws: "nothrow",
	dataType: "(no longer used)",
	uri: "core.baseUrl",
	method: "core.fetch.method",
	headers: "core.fetch.headers",
	body: "core.fetch.body",
	mode: "core.fetch.mode",
	credentials: "core.fetch.credentials",
	cache: "core.fetch.cache",
	redirect: "core.fetch.redirect",
	referrer: "core.fetch.referrer",
	referrerPolicy: "core.fetch.referrerPolicy",
	integrity: "core.fetch.integrity",
	keepalive: "core.fetch.keepalive",
	signal: "core.fetch.signal"
}, od = [
	"baseUrl",
	"fetch",
	"mimeType",
	"fallbackMimeType",
	"ignoreRegisteredLoaders",
	"nothrow",
	"log",
	"useLocalLibraries",
	"CDN",
	"worker",
	"maxConcurrency",
	"maxMobileConcurrency",
	"reuseWorkers",
	"_nodeWorkers",
	"_workerType",
	"limit",
	"_limitMB",
	"batchSize",
	"batchDebounceMs",
	"metadata",
	"transforms"
];
function sd() {
	globalThis.loaders = globalThis.loaders || {};
	let { loaders: e } = globalThis;
	return e._state ||= {}, e._state;
}
function cd() {
	let e = sd();
	return e.globalOptions = e.globalOptions || {
		...id,
		core: { ...id.core }
	}, ud(e.globalOptions);
}
function ld(e, t, n, r) {
	return n ||= [], n = Array.isArray(n) ? n : [n], dd(e, n), ud(md(t, e, r));
}
function ud(e) {
	let t = _d(e);
	vd(t);
	for (let e of od) t.core && t.core[e] !== void 0 && delete t[e];
	return t.core && t.core._workerType !== void 0 && delete t._worker, t;
}
function dd(e, t) {
	fd(e, null, id, ad, t);
	for (let n of t) {
		let r = e && e[n.id] || {}, i = n.options && n.options[n.id] || {}, a = n.deprecatedOptions && n.deprecatedOptions[n.id] || {};
		fd(r, n.id, i, a, t);
	}
}
function fd(e, t, n, r, i) {
	let a = t || "Top level", o = t ? `${t}.` : "";
	for (let s in e) {
		let c = !t && jl(e[s]), l = s === "baseUri" && !t, u = s === "workerUrl" && t;
		if (!(s in n) && !l && !u) {
			if (s in r) nd.level > 0 && nd.warn(`${a} loader option \'${o}${s}\' no longer supported, use \'${r[s]}\'`)();
			else if (!c && nd.level > 0) {
				let e = pd(s, i);
				nd.warn(`${a} loader option \'${o}${s}\' not recognized. ${e}`)();
			}
		}
	}
}
function pd(e, t) {
	let n = e.toLowerCase(), r = "";
	for (let i of t) for (let t in i.options) {
		if (e === t) return `Did you mean \'${i.id}.${t}\'?`;
		let a = t.toLowerCase();
		(n.startsWith(a) || a.startsWith(n)) && (r ||= `Did you mean \'${i.id}.${t}\'?`);
	}
	return r;
}
function md(e, t, n) {
	let r = e.options || {}, i = { ...r };
	return r.core && (i.core = { ...r.core }), vd(i), i.core?.log === null && (i.core = {
		...i.core,
		log: new rd()
	}), hd(i, ud(cd())), hd(i, ud(t)), gd(i, n), yd(i), i;
}
function hd(e, t) {
	for (let n in t) if (n in t) {
		let r = t[n];
		e[n] = Ml(r) && Ml(e[n]) ? {
			...e[n],
			...t[n]
		} : t[n];
	}
}
function gd(e, t) {
	t && e.core?.baseUrl === void 0 && (e.core ||= {}, e.core.baseUrl = Nu(Hu(t)));
}
function _d(e) {
	let t = { ...e };
	return e.core && (t.core = { ...e.core }), t;
}
function vd(e) {
	e.baseUri !== void 0 && (e.core ||= {}, e.core.baseUrl === void 0 && (e.core.baseUrl = e.baseUri));
	for (let t of od) if (e[t] !== void 0) {
		let n = e.core = e.core || {};
		n[t] === void 0 && (n[t] = e[t]);
	}
	let t = e._worker;
	t !== void 0 && (e.core ||= {}, e.core._workerType === void 0 && (e.core._workerType = t));
}
function yd(e) {
	let t = e.core;
	if (t) for (let n of od) t[n] !== void 0 && (e[n] = t[n]);
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/loader-utils/normalize-loader.js
function bd(e) {
	return e ? (Array.isArray(e) && (e = e[0]), Array.isArray(e?.extensions)) : !1;
}
function xd(e) {
	Sl(e, "null loader"), Sl(bd(e), "invalid loader");
	let t;
	return Array.isArray(e) && (t = e[1], e = e[0], e = {
		...e,
		options: {
			...e.options,
			...t
		}
	}), (e?.parseTextSync || e?.parseText) && (e.text = !0), e.text || (e.binary = !0), e;
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/api/register-loaders.js
var Sd = () => {
	let e = sd();
	return e.loaderRegistry = e.loaderRegistry || [], e.loaderRegistry;
};
function Cd(e) {
	let t = Sd();
	e = Array.isArray(e) ? e : [e];
	for (let n of e) {
		let e = xd(n);
		t.find((t) => e === t) || t.unshift(e);
	}
}
function wd() {
	return Sd();
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/api/select-loader.js
var Td = /\.([^.]+)$/;
async function Ed(e, t = [], n, r) {
	if (!Ad(e)) return null;
	let i = ud(n || {});
	if (i.core ||= {}, e instanceof Response && Dd(e)) {
		let n = Od(await e.clone().text(), t, {
			...i,
			core: {
				...i.core,
				nothrow: !0
			}
		}, r);
		if (n) return n;
	}
	let a = Od(e, t, {
		...i,
		core: {
			...i.core,
			nothrow: !0
		}
	}, r);
	if (a) return a;
	if (Rl(e) && (e = await e.slice(0, 10).arrayBuffer(), a = Od(e, t, i, r)), !a && e instanceof Response && Dd(e) && (a = Od(await e.clone().text(), t, i, r)), !a && !i.core.nothrow) throw Error(jd(e));
	return a;
}
function Dd(e) {
	let t = Gu(e);
	return !!(t && (t.startsWith("text/") || t === "application/json" || t.endsWith("+json")));
}
function Od(e, t = [], n, r) {
	if (!Ad(e)) return null;
	let i = ud(n || {});
	if (i.core ||= {}, t && !Array.isArray(t)) return xd(t);
	let a = [];
	t && (a = a.concat(t)), i.core.ignoreRegisteredLoaders || a.push(...wd()), Md(a);
	let o = kd(e, a, i, r);
	if (!o && !i.core.nothrow) throw Error(jd(e));
	return o;
}
function kd(e, t, n, r) {
	let i = Wu(e), a = Gu(e), o = Hu(i) || r?.url, s = null, c = "";
	return n?.core?.mimeType && (s = Fd(t, n?.core?.mimeType), c = `match forced by supplied MIME type ${n?.core?.mimeType}`), s ||= Nd(t, o), c ||= s ? `matched url ${o}` : "", s ||= Fd(t, a), c ||= s ? `matched MIME type ${a}` : "", s ||= Id(t, e), c ||= s ? `matched initial data ${Bd(e)}` : "", n?.core?.fallbackMimeType && (s ||= Fd(t, n?.core?.fallbackMimeType), c ||= s ? `matched fallback MIME type ${a}` : ""), c && Ol.log(1, `selectLoader selected ${s?.name}: ${c}.`), s;
}
function Ad(e) {
	return !(e instanceof Response && e.status === 204);
}
function jd(e) {
	let t = Wu(e), n = Gu(e), r = "No valid loader found (";
	r += t ? `${Mu(t)}, ` : "no url provided, ", r += `MIME type: ${n ? `"${n}"` : "not provided"}, `;
	let i = e ? Bd(e) : "";
	return r += i ? ` first bytes: "${i}"` : "first bytes: not available", r += ")", r;
}
function Md(e) {
	for (let t of e) xd(t);
}
function Nd(e, t) {
	let n = t && Td.exec(t), r = n && n[1];
	return r ? Pd(e, r) : null;
}
function Pd(e, t) {
	t = t.toLowerCase();
	for (let n of e) for (let e of n.extensions) if (e.toLowerCase() === t) return n;
	return null;
}
function Fd(e, t) {
	for (let n of e) if (n.mimeTypes?.some((e) => Lu(t, e)) || Lu(t, `application/x.${n.id}`)) return n;
	return null;
}
function Id(e, t) {
	if (!t) return null;
	for (let n of e) if (typeof t == "string") {
		if (Ld(t, n)) return n;
	} else if (ArrayBuffer.isView(t)) {
		if (Rd(t.buffer, t.byteOffset, n)) return n;
	} else if (t instanceof ArrayBuffer && Rd(t, 0, n)) return n;
	return null;
}
function Ld(e, t) {
	return t.testText ? t.testText(e) : (Array.isArray(t.tests) ? t.tests : [t.tests]).some((t) => e.startsWith(t));
}
function Rd(e, t, n) {
	return (Array.isArray(n.tests) ? n.tests : [n.tests]).some((r) => zd(e, t, n, r));
}
function zd(e, t, n, r) {
	if (Pl(r)) return _u(r, e, r.byteLength);
	switch (typeof r) {
		case "function": return r(ku(e));
		case "string": return r === Vd(e, t, r.length);
		default: return !1;
	}
}
function Bd(e, t = 5) {
	return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? Vd(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? Vd(e, 0, t) : "";
}
function Vd(e, t, n) {
	if (e.byteLength < t + n) return "";
	let r = new DataView(e), i = "";
	for (let e = 0; e < n; e++) i += String.fromCharCode(r.getUint8(t + e));
	return i;
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-string-iterator.js
var Hd = 262144;
function* Ud(e, t) {
	let n = t?.chunkSize || Hd, r = 0, i = new TextEncoder();
	for (; r < e.length;) {
		let t = Math.min(e.length - r, n), a = e.slice(r, r + t);
		r += t, yield ku(i.encode(a));
	}
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-array-buffer-iterator.js
var Wd = 262144;
function* Gd(e, t = {}) {
	let { chunkSize: n = Wd } = t, r = 0;
	for (; r < e.byteLength;) {
		let t = Math.min(e.byteLength - r, n), i = new ArrayBuffer(t), a = new Uint8Array(e, r, t);
		new Uint8Array(i).set(a), r += t, yield i;
	}
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-blob-iterator.js
var Kd = 1048576;
async function* qd(e, t) {
	let n = t?.chunkSize || Kd, r = 0;
	for (; r < e.size;) {
		let t = r + n, i = await e.slice(r, t).arrayBuffer();
		r = t, yield i;
	}
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-stream-iterator.js
function Jd(e, t) {
	return wl ? Yd(e, t) : Xd(e, t);
}
async function* Yd(e, t) {
	let n = e.getReader(), r;
	try {
		for (;;) {
			let e = r || n.read();
			t?._streamReadAhead && (r = n.read());
			let { done: i, value: a } = await e;
			if (i) return;
			yield Ou(a);
		}
	} catch {
		n.releaseLock();
	}
}
async function* Xd(e, t) {
	for await (let t of e) yield Ou(t);
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-iterator.js
function Zd(e, t) {
	if (typeof e == "string") return Ud(e, t);
	if (e instanceof ArrayBuffer) return Gd(e, t);
	if (Rl(e)) return qd(e, t);
	if (Vl(e)) return Jd(e, t);
	if (Ll(e)) {
		let n = e.body;
		if (!n) throw Error("Readable stream not available on Response");
		return Jd(n, t);
	}
	throw Error("makeIterator");
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/loader-utils/get-data.js
var Qd = "Cannot convert supplied data type";
function $d(e, t, n) {
	if (t.text && typeof e == "string") return e;
	if (Du(e) && (e = e.buffer), Pl(e)) {
		let n = ju(e);
		return t.text && !t.binary ? new TextDecoder("utf8").decode(n) : Ou(n);
	}
	throw Error(Qd);
}
async function ef(e, t, n) {
	if (typeof e == "string" || Pl(e)) return $d(e, t, n);
	if (Rl(e) && (e = await qu(e)), Ll(e)) return await Ju(e), t.binary ? await e.arrayBuffer() : await e.text();
	if (Vl(e) && (e = Zd(e, n)), Fl(e) || Il(e)) return bu(e);
	throw Error(Qd);
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/loader-utils/get-fetch-function.js
function tf(e, t) {
	let n = cd(), r = e || n, i = r.fetch ?? r.core?.fetch;
	return typeof i == "function" ? i : jl(i) ? (e) => td(e, i) : t?.fetch ? t?.fetch : td;
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/loader-utils/loader-context.js
function nf(e, t, n) {
	if (n) return n;
	let r = {
		fetch: tf(t, e),
		...e
	};
	if (r.url) {
		let e = Hu(r.url);
		r.baseUrl = e, r.queryString = Vu(r.url), r.filename = Mu(e), r.baseUrl = Nu(e);
	}
	return Array.isArray(r.loaders) || (r.loaders = null), r;
}
function rf(e, t) {
	if (e && !Array.isArray(e)) return e;
	let n;
	if (e && (n = Array.isArray(e) ? e : [e]), t && t.loaders) {
		let e = Array.isArray(t.loaders) ? t.loaders : [t.loaders];
		n = n ? [...n, ...e] : e;
	}
	return n && n.length ? n : void 0;
}
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/api/parse.js
async function af(e, t, n, r) {
	t && !Array.isArray(t) && !bd(t) && (r = void 0, n = t, t = void 0), e = await e, n ||= {};
	let i = Wu(e), a = rf(t, r), o = await Ed(e, a, n);
	if (!o) return null;
	let s = ld(n, o, a, i);
	return r = nf({
		url: i,
		_parse: af,
		loaders: a
	}, s, r || null), await of(o, e, s, r);
}
async function of(e, t, n, r) {
	if (pu(e), n = Hl(e.options, n), Ll(t)) {
		let { ok: e, redirected: n, status: i, statusText: a, type: o, url: s } = t;
		r.response = {
			headers: Object.fromEntries(t.headers.entries()),
			ok: e,
			redirected: n,
			status: i,
			statusText: a,
			type: o,
			url: s
		};
	}
	t = await ef(t, e, n);
	let i = e;
	if (i.parseTextSync && typeof t == "string") return i.parseTextSync(t, n, r);
	if (mu(e, n)) return await hu(e, t, n, r, af);
	if (i.parseText && typeof t == "string") return await i.parseText(t, n, r);
	if (i.parse) return await i.parse(t, n, r);
	throw ql(!i.parseSync), Error(`${e.id} loader - no parser found and worker is disabled`);
}
//#endregion
//#region node_modules/@math.gl/types/dist/is-array.js
function sf(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function cf(e) {
	return Array.isArray(e) ? e.length === 0 || typeof e[0] == "number" : !1;
}
function lf(e) {
	return sf(e) || cf(e);
}
var uf = t((() => {})), df = t((() => {
	uf();
}));
//#endregion
//#region node_modules/@loaders.gl/core/dist/lib/api/load.js
async function ff(e, t, n, r) {
	let i, a;
	!Array.isArray(t) && !bd(t) ? (i = [], a = t, r = void 0) : (i = t, a = n);
	let o = tf(a), s = e;
	return typeof e == "string" && (s = await o(e)), Rl(e) && (s = await o(e)), typeof e == "string" && (ud(a || {}).core?.baseUrl || (a = {
		...a,
		core: {
			...a?.core,
			baseUrl: e
		}
	})), await af(s, i, a);
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/utils/version.js
var pf = "4.5.4", mf = globalThis.loaders?.parseImageNode, hf = typeof Image < "u", gf = typeof ImageBitmap < "u", _f = wl ? !0 : !!mf;
function vf(e) {
	switch (e) {
		case "auto": return gf || hf || _f;
		case "imagebitmap": return gf;
		case "image": return hf;
		case "data": return _f;
		default: throw Error(`@loaders.gl/images: image ${e} not supported in this environment`);
	}
}
function yf() {
	if (gf) return "imagebitmap";
	if (hf) return "image";
	if (_f) return "data";
	throw Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/category-api/parsed-image-api.js
function bf(e) {
	let t = Sf(e);
	if (!t) throw Error("Not an image");
	return t;
}
function xf(e) {
	switch (bf(e)) {
		case "data": return e;
		case "image":
		case "imagebitmap":
			let t = document.createElement("canvas"), n = t.getContext("2d");
			if (!n) throw Error("getImageData");
			return t.width = e.width, t.height = e.height, n.drawImage(e, 0, 0), n.getImageData(0, 0, e.width, e.height);
		default: throw Error("getImageData");
	}
}
function Sf(e) {
	return typeof ImageBitmap < "u" && e instanceof ImageBitmap ? "imagebitmap" : typeof Image < "u" && e instanceof Image ? "image" : e && typeof e == "object" && e.data && e.width && e.height ? "data" : null;
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/parsers/svg-utils.js
var Cf = /^data:image\/svg\+xml/, wf = /\.svg((\?|#).*)?$/;
function Tf(e) {
	return e && (Cf.test(e) || wf.test(e));
}
function Ef(e, t) {
	if (Tf(t)) {
		let t = new TextDecoder().decode(e);
		try {
			typeof unescape == "function" && typeof encodeURIComponent == "function" && (t = unescape(encodeURIComponent(t)));
		} catch (e) {
			throw Error(e.message);
		}
		return `data:image/svg+xml;base64,${btoa(t)}`;
	}
	return Df(e, t);
}
function Df(e, t) {
	if (Tf(t)) throw Error("SVG cannot be parsed directly to imagebitmap");
	return new Blob([new Uint8Array(e)]);
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/parsers/parse-to-image.js
async function Of(e, t, n) {
	let r = Ef(e, n), i = self.URL || self.webkitURL, a = typeof r != "string" && i.createObjectURL(r);
	try {
		return await kf(a || r, t);
	} finally {
		a && i.revokeObjectURL(a);
	}
}
async function kf(e, t) {
	let n = new Image();
	return n.src = e, t.image && t.image.decode && n.decode ? (await n.decode(), n) : await new Promise((e, t) => {
		try {
			n.onload = () => e(n), n.onerror = (e) => {
				let n = e instanceof Error ? e.message : "error";
				t(Error(n));
			};
		} catch (e) {
			t(e);
		}
	});
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/parsers/parse-to-image-bitmap.js
var Af = !0;
async function jf(e, t, n) {
	let r;
	r = Tf(n) ? await Of(e, t, n) : Df(e, n);
	let i = t && t.imagebitmap;
	return await Mf(r, i);
}
async function Mf(e, t = null) {
	if ((Nf(t) || !Af) && (t = null), t) try {
		return await createImageBitmap(e, t);
	} catch (e) {
		console.warn(e), Af = !1;
	}
	return await createImageBitmap(e);
}
function Nf(e) {
	if (!e) return !0;
	for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/category-api/parse-isobmff-binary.js
function Pf(e) {
	return !Rf(e, "ftyp", 4) || !(e[8] & 96) ? null : Ff(e);
}
function Ff(e) {
	switch (If(e, 8, 12).replace("\0", " ").trim()) {
		case "avif":
		case "avis": return {
			extension: "avif",
			mimeType: "image/avif"
		};
		default: return null;
	}
}
function If(e, t, n) {
	return String.fromCharCode(...e.slice(t, n));
}
function Lf(e) {
	return [...e].map((e) => e.charCodeAt(0));
}
function Rf(e, t, n = 0) {
	let r = Lf(t);
	for (let t = 0; t < r.length; ++t) if (r[t] !== e[t + n]) return !1;
	return !0;
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/category-api/binary-image-api.js
var zf = !1, Bf = !0;
function Vf(e) {
	let t = Jf(e);
	return Uf(t) || Kf(t) || Wf(t) || Gf(t) || Hf(t);
}
function Hf(e) {
	let t = Pf(new Uint8Array(e instanceof DataView ? e.buffer : e));
	return t ? {
		mimeType: t.mimeType,
		width: 0,
		height: 0
	} : null;
}
function Uf(e) {
	let t = Jf(e);
	return t.byteLength >= 24 && t.getUint32(0, zf) === 2303741511 ? {
		mimeType: "image/png",
		width: t.getUint32(16, zf),
		height: t.getUint32(20, zf)
	} : null;
}
function Wf(e) {
	let t = Jf(e);
	return t.byteLength >= 10 && t.getUint32(0, zf) === 1195984440 ? {
		mimeType: "image/gif",
		width: t.getUint16(6, Bf),
		height: t.getUint16(8, Bf)
	} : null;
}
function Gf(e) {
	let t = Jf(e);
	return t.byteLength >= 14 && t.getUint16(0, zf) === 16973 && t.getUint32(2, Bf) === t.byteLength ? {
		mimeType: "image/bmp",
		width: t.getUint32(18, Bf),
		height: t.getUint32(22, Bf)
	} : null;
}
function Kf(e) {
	let t = Jf(e);
	if (!(t.byteLength >= 3 && t.getUint16(0, zf) === 65496 && t.getUint8(2) === 255)) return null;
	let { tableMarkers: n, sofMarkers: r } = qf(), i = 2;
	for (; i + 9 < t.byteLength;) {
		let e = t.getUint16(i, zf);
		if (r.has(e)) return {
			mimeType: "image/jpeg",
			height: t.getUint16(i + 5, zf),
			width: t.getUint16(i + 7, zf)
		};
		if (!n.has(e)) return null;
		i += 2, i += t.getUint16(i, zf);
	}
	return null;
}
function qf() {
	let e = /* @__PURE__ */ new Set([
		65499,
		65476,
		65484,
		65501,
		65534
	]);
	for (let t = 65504; t < 65520; ++t) e.add(t);
	return {
		tableMarkers: e,
		sofMarkers: /* @__PURE__ */ new Set([
			65472,
			65473,
			65474,
			65475,
			65477,
			65478,
			65479,
			65481,
			65482,
			65483,
			65485,
			65486,
			65487,
			65502
		])
	};
}
function Jf(e) {
	if (e instanceof DataView) return e;
	if (ArrayBuffer.isView(e)) return new DataView(e.buffer);
	if (e instanceof ArrayBuffer) return new DataView(e);
	throw Error("toDataView");
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/parsers/parse-to-node-image.js
async function Yf(e, t) {
	let { mimeType: n } = Vf(e) || {}, r = globalThis.loaders?.parseImageNode;
	return Sl(r), await r(e, n);
}
//#endregion
//#region node_modules/@loaders.gl/images/dist/lib/parsers/parse-image.js
async function Xf(e, t, n) {
	t ||= {};
	let r = (t.image || {}).type || "auto", { url: i } = n || {}, a = Zf(r), o;
	switch (a) {
		case "imagebitmap":
			o = await jf(e, t, i);
			break;
		case "image":
			o = await Of(e, t, i);
			break;
		case "data":
			o = await Yf(e, t);
			break;
		default: Sl(!1);
	}
	return r === "data" && (o = xf(o)), o;
}
function Zf(e) {
	switch (e) {
		case "auto":
		case "data": return yf();
		default: return vf(e), e;
	}
}
var Qf = {
	dataType: null,
	batchType: null,
	id: "image",
	module: "images",
	name: "Images",
	version: pf,
	mimeTypes: [
		"image/png",
		"image/jpeg",
		"image/gif",
		"image/webp",
		"image/avif",
		"image/bmp",
		"image/vnd.microsoft.icon",
		"image/svg+xml"
	],
	extensions: [
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp",
		"ico",
		"svg",
		"avif"
	],
	parse: Xf,
	tests: [(e) => !!Vf(new DataView(e))],
	options: { image: {
		type: "auto",
		decode: !0
	} }
};
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/log.js
ve();
var B = new he({ id: "deck" }), $f = {};
function ep(e) {
	$f = e;
}
function V(e, t, n, r) {
	B.level > 0 && $f[e] && $f[e].call(null, t, n, r);
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/json-loader.js
function tp(e) {
	let t = e[0], n = e[e.length - 1];
	return t === "{" && n === "}" || t === "[" && n === "]";
}
var np = {
	dataType: null,
	batchType: null,
	id: "JSON",
	name: "JSON",
	module: "",
	version: "",
	options: {},
	extensions: ["json", "geojson"],
	mimeTypes: ["application/json", "application/geo+json"],
	testText: tp,
	parseTextSync: JSON.parse
};
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/init.js
function rp() {
	let e = "9.4.0", t = globalThis.deck && globalThis.deck.VERSION;
	if (t && t !== e) throw Error(`deck.gl - multiple versions detected: ${t} vs ${e}`);
	return t || (B.log(1, `deck.gl ${e}`)(), globalThis.deck = {
		...globalThis.deck,
		VERSION: e,
		version: e,
		log: B,
		_registerLoggers: ep
	}, Cd([np, [Qf, { imagebitmap: { premultiplyAlpha: "none" } }]])), e;
}
var ip = rp();
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/wgsl-binding-scan.js
function ap(e) {
	let t = e.split(""), n = 0, r = 0, i = !1, a = !1, o = !1;
	for (; n < e.length;) {
		let s = e[n], c = e[n + 1];
		if (a) o ? o = !1 : s === "\\" ? o = !0 : s === "\"" && (a = !1), n++;
		else if (i) s === "\n" || s === "\r" ? i = !1 : t[n] = " ", n++;
		else if (r > 0) {
			if (s === "/" && c === "*") {
				t[n] = " ", t[n + 1] = " ", r++, n += 2;
				continue;
			}
			if (s === "*" && c === "/") {
				t[n] = " ", t[n + 1] = " ", r--, n += 2;
				continue;
			}
			s !== "\n" && s !== "\r" && (t[n] = " "), n++;
		} else s === "\"" ? (a = !0, n++) : s === "/" && c === "/" ? (t[n] = " ", t[n + 1] = " ", i = !0, n += 2) : s === "/" && c === "*" ? (t[n] = " ", t[n + 1] = " ", r = 1, n += 2) : n++;
	}
	return t.join("");
}
function op(e, t) {
	let n = ap(e), r = [];
	for (let i of t) {
		i.lastIndex = 0;
		let a;
		for (a = i.exec(n); a;) {
			let o = i === t[0], s = a.index, c = a[0].length;
			r.push({
				match: e.slice(s, s + c),
				index: s,
				length: c,
				bindingToken: a[o ? 1 : 2],
				groupToken: a[o ? 2 : 1],
				accessDeclaration: a[3]?.trim(),
				name: a[4]
			}), a = i.exec(n);
		}
	}
	return r.sort((e, t) => e.index - t.index);
}
function sp(e, t, n) {
	let r = op(e, t);
	if (!r.length) return e;
	let i = "", a = 0;
	for (let t of r) i += e.slice(a, t.index), i += n(t), a = t.index + t.length;
	return i += e.slice(a), i;
}
function cp(e) {
	return /@binding\(\s*auto\s*\)/.test(ap(e));
}
function lp(e, t) {
	return op(e, t === fp || t === pp ? hp : t).find((e) => e.bindingToken === "auto");
}
var up, dp, fp, pp, mp, hp, gp = t((() => {
	up = "(?:var<\\s*(uniform|storage(?:\\s*,\\s*[A-Za-z_][A-Za-z0-9_]*)?)\\s*>|var)\\s+([A-Za-z_][A-Za-z0-9_]*)", dp = "\\s*", fp = [RegExp(`@binding\\(\\s*(auto|\\d+)\\s*\\)${dp}@group\\(\\s*(\\d+)\\s*\\)${dp}${up}`, "g"), RegExp(`@group\\(\\s*(\\d+)\\s*\\)${dp}@binding\\(\\s*(auto|\\d+)\\s*\\)${dp}${up}`, "g")], pp = [RegExp(`@binding\\(\\s*(auto|\\d+)\\s*\\)${dp}@group\\(\\s*(\\d+)\\s*\\)${dp}${up}`, "g"), RegExp(`@group\\(\\s*(\\d+)\\s*\\)${dp}@binding\\(\\s*(auto|\\d+)\\s*\\)${dp}${up}`, "g")], mp = [RegExp(`@binding\\(\\s*(\\d+)\\s*\\)${dp}@group\\(\\s*(\\d+)\\s*\\)${dp}${up}`, "g"), RegExp(`@group\\(\\s*(\\d+)\\s*\\)${dp}@binding\\(\\s*(\\d+)\\s*\\)${dp}${up}`, "g")], hp = [
		RegExp(`@binding\\(\\s*(auto)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)\\s*${up}`, "g"),
		RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(auto)\\s*\\)\\s*${up}`, "g"),
		RegExp(`@binding\\(\\s*(auto)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)(?:[\\s\\n\\r]*@[A-Za-z_][^\\n\\r]*)*[\\s\\n\\r]*${up}`, "g"),
		RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(auto)\\s*\\)(?:[\\s\\n\\r]*@[A-Za-z_][^\\n\\r]*)*[\\s\\n\\r]*${up}`, "g")
	];
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/wgsl-interface-scan.js
function _p(e, t = {}) {
	let n = vp(e), r = yp(n);
	if (!r) return null;
	let i = bp(n, r);
	if (!i) return null;
	let a = Sp(n, r, i);
	if (!a) return null;
	if (t.scanVertexAttributes === !1) return {
		attributes: [],
		bindings: a
	};
	let o = xp(n, r);
	if (!o) return null;
	let s = Dp(n, r, i, o, t.vertexEntryPoint);
	return s ? {
		attributes: s,
		bindings: a
	} : null;
}
function vp(e) {
	let t = ap(e), n = /[A-Za-z_][A-Za-z0-9_]*|(?:0[xX][0-9A-Fa-f]+|\d+)|[@(){}<>\[\]:,;=]/g, r = [], i = n.exec(t);
	for (; i;) r.push({
		value: i[0],
		index: i.index
	}), i = n.exec(t);
	return r;
}
function yp(e) {
	let t = [], n = 0;
	for (let r of e) {
		if (r.value === "}" && n === 0) return null;
		t.push(n), r.value === "{" ? n++ : r.value === "}" && n--;
	}
	return n === 0 ? t : null;
}
function bp(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r = 0; r < e.length; r++) {
		if (t[r] !== 0 || e[r].value !== "alias") continue;
		let i = e[r + 1]?.value;
		if (!Up(i) || e[r + 2]?.value !== "=" || n.has(i)) return null;
		let a = zp(e, t, r + 3, ";");
		if (a < 0 || a === r + 3) return null;
		n.set(i, Hp(e.slice(r + 3, a))), r = a;
	}
	return n;
}
function xp(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r = 0; r < e.length; r++) {
		if (t[r] !== 0 || e[r].value !== "struct") continue;
		let i = e[r + 1]?.value, a = r + 2;
		if (!Up(i) || n.has(i) || e[a]?.value !== "{") return null;
		let o = Ip(e, a, "{", "}");
		if (o < 0) return null;
		n.set(i, e.slice(a + 1, o)), r = o;
	}
	return n;
}
function Sp(e, t, n) {
	let r = [], i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
	for (let o = 0; o < e.length; o++) {
		if (t[o] !== 0 || e[o].value !== "var") continue;
		let s = Bp(e, t, o), c = e.slice(s, o), l = Np(c, "group"), u = Np(c, "binding");
		if (l === null || u === null || l === void 0 != (u === void 0)) return null;
		if (l === void 0 || u === void 0) continue;
		let d = o + 1, f = [];
		if (e[d]?.value === "<") {
			let t = Ip(e, d, "<", ">");
			if (t < 0) return null;
			let n = Lp(e.slice(d + 1, t), ",");
			if (!n) return null;
			f = n.map(Hp), d = t + 1;
		}
		let p = e[d]?.value;
		if (!Up(p) || e[d + 1]?.value !== ":") return null;
		let m = zp(e, t, d + 2, ";");
		if (m < 0 || m === d + 2) return null;
		let h = Ap(Hp(e.slice(d + 2, m)), n);
		if (!h) return null;
		let g = Cp({
			name: p,
			group: l,
			location: u,
			addressSpace: f,
			resourceType: h
		}), _ = `${l}:${u}`;
		if (!g || i.has(_) || a.has(p)) return null;
		r.push(g), i.add(_), a.add(p), o = m;
	}
	return Ep(r), r.sort((e, t) => e.group - t.group || e.location - t.location || e.name.localeCompare(t.name));
}
function Cp(e) {
	let { name: t, group: n, location: r, addressSpace: i, resourceType: a } = e, o = {
		name: t,
		group: n,
		location: r
	};
	if (i[0] === "uniform" && i.length === 1) return {
		...o,
		type: "uniform"
	};
	if (i[0] === "storage" && i.length <= 2) {
		let e = i[1] || "read";
		return e === "read" ? {
			...o,
			type: "read-only-storage"
		} : e === "read_write" ? {
			...o,
			type: "storage"
		} : null;
	}
	return i.length > 0 ? null : a === "sampler" || a === "sampler_comparison" ? {
		...o,
		type: "sampler",
		...a === "sampler_comparison" ? { samplerType: "comparison" } : {}
	} : a === "texture_external" ? {
		...o,
		type: "external-texture"
	} : wp(o, a) || Tp(o, a);
}
function wp(e, t) {
	let n = /^texture_storage_(1d|2d|2d_array|3d)<([A-Za-z0-9_]+),(read|write|read_write)>$/.exec(t);
	if (!n) return null;
	let r = {
		read: "read-only",
		write: "write-only",
		read_write: "read-write"
	}[n[3]];
	return {
		...e,
		type: "storage",
		format: n[2],
		access: r,
		viewDimension: Fp(n[1])
	};
}
function Tp(e, t) {
	let n = /^texture_(multisampled_)?(1d|2d|2d_array|cube|cube_array|3d)<(f32|i32|u32)>$/.exec(t);
	if (n) {
		if (n[1] && n[2] !== "2d") return null;
		let t = {
			f32: "float",
			i32: "sint",
			u32: "uint"
		}[n[3]];
		return {
			...e,
			type: "texture",
			viewDimension: Fp(n[2]),
			sampleType: t,
			multisampled: !!n[1]
		};
	}
	let r = /^texture_depth_(multisampled_)?(2d|2d_array|cube|cube_array)$/.exec(t);
	return !r || r[1] && r[2] !== "2d" ? null : {
		...e,
		type: "texture",
		viewDimension: Fp(r[2]),
		sampleType: "depth",
		multisampled: !!r[1]
	};
}
function Ep(e) {
	for (let t of e) {
		if (t.type !== "sampler" || t.samplerType || !t.name.endsWith("Sampler")) continue;
		let n = t.name.slice(0, -7);
		e.find((e) => e.type === "texture" && e.name === n && e.group === t.group)?.sampleType === "depth" && (t.samplerType = "non-filtering");
	}
}
function Dp(e, t, n, r, i) {
	let a = Op(e, t);
	if (!a) return null;
	let o = a.filter((e) => e.vertex), s = i ? o.find((e) => e.name === i) : o.length === 1 ? o[0] : void 0;
	if (!s) return o.length === 0 && !i ? [] : null;
	let c = Lp(s.parameters, ",");
	if (!c) return null;
	let l = [], u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set();
	for (let e of c) if (e.length > 0 && !kp({
		declaration: e,
		aliases: n,
		structures: r,
		attributes: l,
		attributeLocations: u,
		attributeNames: d,
		visitedStructures: f
	})) return null;
	return l.sort((e, t) => e.location - t.location || e.name.localeCompare(t.name));
}
function Op(e, t) {
	let n = [], r = /* @__PURE__ */ new Set();
	for (let i = 0; i < e.length; i++) {
		if (t[i] !== 0 || e[i].value !== "fn") continue;
		let a = e[i + 1]?.value, o = i + 2;
		if (!Up(a) || r.has(a) || e[o]?.value !== "(") return null;
		let s = Ip(e, o, "(", ")");
		if (s < 0) return null;
		let c = Bp(e, t, i);
		n.push({
			name: a,
			vertex: Pp(e.slice(c, i), "vertex"),
			parameters: e.slice(o + 1, s)
		}), r.add(a), i = s;
	}
	return n;
}
function kp(e) {
	let { declaration: t, aliases: n, structures: r, attributes: i, attributeLocations: a, attributeNames: o, visitedStructures: s } = e, c = Rp(t, ":");
	if (c < 1 || c === t.length - 1) return !1;
	let l = Vp(t.slice(0, c)), u = Np(t.slice(0, c), "location"), d = Pp(t.slice(0, c), "builtin"), f = Ap(Hp(t.slice(c + 1)), n);
	if (!l || u === null || !f || u !== void 0 && d) return !1;
	if (u !== void 0) {
		let e = Mp(f);
		return !e || a.has(u) || o.has(l) ? !1 : (i.push({
			name: l,
			location: u,
			type: e
		}), a.add(u), o.add(l), !0);
	}
	if (d) return !0;
	let p = r.get(f);
	if (!p || s.has(f)) return !1;
	let m = Lp(p, ",");
	if (!m) return !1;
	s.add(f);
	for (let t of m) if (t.length > 0 && !kp({
		...e,
		declaration: t
	})) return !1;
	return s.delete(f), !0;
}
function Ap(e, t, n = /* @__PURE__ */ new Set()) {
	let r = vp(e), i = "";
	for (let e of r) {
		let r = t.get(e.value);
		if (!r) {
			i += jp(e.value);
			continue;
		}
		if (n.has(e.value)) return null;
		let a = new Set(n);
		a.add(e.value);
		let o = Ap(r, t, a);
		if (!o) return null;
		i += o;
	}
	return i;
}
function jp(e) {
	let t = /^(vec[234]|mat[234]x[234])([fiuh])$/.exec(e);
	if (!t) return e;
	let n = {
		f: "f32",
		i: "i32",
		u: "u32",
		h: "f16"
	}[t[2]];
	return `${t[1]}<${n}>`;
}
function Mp(e) {
	return /^(?:i32|u32|f32|f16|vec[234]<(?:i32|u32|f32|f16)>)$/.test(e) ? e : null;
}
function Np(e, t) {
	let n;
	for (let r = 0; r < e.length; r++) if (e[r].value === "@" && e[r + 1]?.value === t) {
		if (n !== void 0 || e[r + 2]?.value !== "(" || !/^\d+$/.test(e[r + 3]?.value || "") || e[r + 4]?.value !== ")") return null;
		n = Number(e[r + 3].value);
	}
	return n;
}
function Pp(e, t) {
	return e.some((n, r) => n.value === "@" && e[r + 1]?.value === t);
}
function Fp(e) {
	return e.replace("_", "-");
}
function Ip(e, t, n, r) {
	let i = 0;
	for (let a = t; a < e.length; a++) if (e[a].value === n) i++;
	else if (e[a].value === r && --i === 0) return a;
	return -1;
}
function Lp(e, t) {
	let n = [], r = 0, i = {
		"(": 0,
		"<": 0,
		"[": 0,
		"{": 0
	}, a = Object.keys(i), o = {
		")": "(",
		">": "<",
		"]": "[",
		"}": "{"
	};
	for (let s = 0; s < e.length; s++) {
		let c = e[s].value;
		if (c === t && a.every((e) => i[e] === 0)) n.push(e.slice(r, s)), r = s + 1;
		else if (c in i) i[c]++;
		else if (c in o) {
			let e = o[c];
			if (i[e]--, i[e] < 0) return null;
		}
	}
	return a.every((e) => i[e] === 0) ? (n.push(e.slice(r)), n) : null;
}
function Rp(e, t) {
	let n = Lp(e, t);
	return n && n.length === 2 ? n[0].length : -1;
}
function zp(e, t, n, r) {
	for (let i = n; i < e.length; i++) if (t[i] === 0 && e[i].value === r) return i;
	return -1;
}
function Bp(e, t, n) {
	for (let r = n - 1; r >= 0; r--) if (e[r].value === ";" && t[r] === 0 || e[r].value === "}" && t[r] === 1) return r + 1;
	return 0;
}
function Vp(e) {
	for (let t = e.length - 1; t >= 0; t--) if (Up(e[t].value)) return e[t].value;
	return null;
}
function Hp(e) {
	return e.map((e) => e.value).join("");
}
function Up(e) {
	return !!(e && /^[A-Za-z_][A-Za-z0-9_]*$/.test(e));
}
var Wp = t((() => {
	gp();
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/utils/assert.js
function Gp(e, t) {
	if (!e) {
		let e = Error(t || "shadertools: assertion failed.");
		throw Error.captureStackTrace?.(e, Gp), e;
	}
}
var Kp = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/filters/prop-types.js
function qp(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) t[n] = Jp(r);
	return t;
}
function Jp(e) {
	let t = Yp(e);
	if (t !== "object") return {
		value: e,
		...Xp[t],
		type: t
	};
	if (typeof e == "object") return e ? e.type === void 0 ? e.value === void 0 ? {
		type: "object",
		value: e
	} : (t = Yp(e.value), {
		...e,
		...Xp[t],
		type: t
	}) : {
		...e,
		...Xp[e.type],
		type: e.type
	} : {
		type: "object",
		value: null
	};
	throw Error("props");
}
function Yp(e) {
	return Array.isArray(e) || ArrayBuffer.isView(e) ? "array" : typeof e;
}
var Xp, Zp = t((() => {
	Xp = {
		number: {
			type: "number",
			validate(e, t) {
				return Number.isFinite(e) && typeof t == "object" && (t.max === void 0 || e <= t.max) && (t.min === void 0 || e >= t.min);
			}
		},
		array: {
			type: "array",
			validate(e, t) {
				return Array.isArray(e) || ArrayBuffer.isView(e);
			}
		}
	};
})), Qp, $p, em = t((() => {
	Qp = "#ifdef MODULE_LOGDEPTH\n  logdepth_adjustPosition(gl_Position);\n#endif\n", $p = "#ifdef MODULE_MATERIAL\n  fragColor = material_filterColor(fragColor);\n#endif\n\n#ifdef MODULE_LIGHTING\n  fragColor = lighting_filterColor(fragColor);\n#endif\n\n#ifdef MODULE_FOG\n  fragColor = fog_filterColor(fragColor);\n#endif\n\n#ifdef MODULE_PICKING\n  fragColor = picking_filterHighlightColor(fragColor);\n  fragColor = picking_filterPickingColor(fragColor);\n#endif\n\n#ifdef MODULE_LOGDEPTH\n  logdepth_setFragDepth();\n#endif\n";
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/shader-injections.js
function tm(e) {
	let t = {
		vertex: {},
		fragment: {}
	};
	for (let n in e) {
		let r = e[n], i = nm(n);
		typeof r == "string" && (r = {
			order: 0,
			injection: r
		}), t[i][n] = r;
	}
	return t;
}
function nm(e) {
	let t = e.slice(0, 2);
	switch (t) {
		case "vs": return "vertex";
		case "fs": return "fragment";
		default: throw Error(t);
	}
}
function rm(e, t, n, r = !1, i = "glsl", a = {}) {
	let o = t === "vertex";
	for (let t in n) {
		let r = n[t];
		r.sort((e, t) => e.order - t.order), um.length = r.length;
		for (let e = 0, t = r.length; e < t; ++e) um[e] = r[e].injection;
		let s = `${um.join("\n")}\n`;
		switch (t) {
			case "vs:#decl":
				(i === "wgsl" || o) && (e = e.replace(dm, s));
				break;
			case "vs:#main-start":
				(i === "wgsl" || o) && (e = i === "wgsl" ? im(e, "vertex", s, "start", a.vertex) : e.replace(cm, (e) => e + s));
				break;
			case "vs:#main-end":
				(i === "wgsl" || o) && (e = i === "wgsl" ? im(e, "vertex", s, "end", a.vertex) : e.replace(lm, (e) => s + e));
				break;
			case "fs:#decl":
				(i === "wgsl" || !o) && (e = e.replace(dm, s));
				break;
			case "fs:#main-start":
				(i === "wgsl" || !o) && (e = i === "wgsl" ? im(e, "fragment", s, "start", a.fragment) : e.replace(cm, (e) => e + s));
				break;
			case "fs:#main-end":
				(i === "wgsl" || !o) && (e = i === "wgsl" ? im(e, "fragment", s, "end", a.fragment) : e.replace(lm, (e) => s + e));
				break;
			default: e = e.replace(t, (e) => e + s);
		}
	}
	return e = e.replace(dm, ""), r && (e = e.replace(/\}\s*$/, (e) => e + sm[t])), e;
}
function im(e, t, n, r, i) {
	let a = am(e, t, i);
	if (!a) return e;
	if (r === "start") {
		let t = a.openBraceIndex + 1;
		return `${e.slice(0, t)}\n${n}${e.slice(t)}`;
	}
	return `${e.slice(0, a.closeBraceIndex)}${n}${e.slice(a.closeBraceIndex)}`;
}
function am(e, t, n) {
	let r = t === "vertex" ? "@vertex" : "@fragment", i = e.indexOf(r);
	if (i < 0) return null;
	let a = n ? e.search(RegExp(`\\bfn\\s+${om(n)}\\s*\\(`)) : e.indexOf("fn", i);
	if (a < 0) return null;
	let o = e.indexOf("{", a);
	if (o < 0) return null;
	let s = 0;
	for (let t = o; t < e.length; t++) {
		let n = e[t];
		if (n === "{") s++;
		else if (n === "}" && (s--, s === 0)) return {
			openBraceIndex: o,
			closeBraceIndex: t
		};
	}
	return null;
}
function om(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var sm, cm, lm, um, dm, fm = t((() => {
	em(), sm = {
		vertex: Qp,
		fragment: $p
	}, cm = /void\s+main\s*\([^)]*\)\s*\{\n?/, lm = /}\n?[^{}]*$/, um = [], dm = "__LUMA_INJECT_DECLARATIONS__";
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-module/shader-module.js
function pm(e) {
	e.map((e) => mm(e));
}
function mm(e) {
	if (e.instance) return;
	pm(e.dependencies || []);
	let { propTypes: t = {}, deprecations: n = [], inject: r = {} } = e, i = {
		normalizedInjections: tm(r),
		parsedDeprecations: gm(n)
	};
	t && (i.propValidators = qp(t)), e.instance = i;
	let a = {};
	t && (a = Object.entries(t).reduce((e, [t, n]) => {
		let r = n?.value;
		return r && (e[t] = r), e;
	}, {})), e.defaultUniforms = {
		...e.defaultUniforms,
		...a
	};
}
function hm(e, t, n) {
	e.deprecations?.forEach((e) => {
		e.regex?.test(t) && (e.deprecated ? n.deprecated(e.old, e.new)() : n.removed(e.old, e.new)());
	});
}
function gm(e) {
	return e.forEach((e) => {
		switch (e.type) {
			case "function":
				e.regex = RegExp(`\\b${e.old}\\(`);
				break;
			default: e.regex = RegExp(`${e.type} ${e.old};`);
		}
	}), e;
}
var _m = t((() => {
	Zp(), fm();
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-module/shader-module-dependencies.js
function vm(e) {
	pm(e);
	let t = {}, n = {};
	ym({
		modules: e,
		level: 0,
		moduleMap: t,
		moduleDepth: n
	});
	let r = Object.keys(n).sort((e, t) => n[t] - n[e]).map((e) => t[e]);
	return pm(r), r;
}
function ym(e) {
	let { modules: t, level: n, moduleMap: r, moduleDepth: i } = e;
	if (n >= 5) throw Error("Possible loop in shader dependency graph");
	for (let e of t) r[e.name] = e, (i[e.name] === void 0 || i[e.name] < n) && (i[e.name] = n);
	for (let e of t) e.dependencies && ym({
		modules: e.dependencies,
		level: n + 1,
		moduleMap: r,
		moduleDepth: i
	});
}
var bm = t((() => {
	_m();
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-plugin.js
function xm(e = [], t) {
	let n = [], r = {}, i = {}, a = {}, o = {};
	for (let s of e) Cm({
		modules: n,
		defines: r,
		injections: i,
		vertexInputs: a,
		varyings: o
	}, s), Cm({
		modules: n,
		defines: r,
		injections: i,
		vertexInputs: a,
		varyings: o
	}, s[t]);
	for (let e of Object.keys(o)) if (a[e]) throw Error(`ShaderPlugin name "${e}" cannot be both a vertex input and a varying`);
	return {
		modules: n,
		defines: r,
		injections: i,
		vertexInputs: a,
		varyings: o
	};
}
function Sm(e = [], t = []) {
	let n = [...e], r = new Set(n.map((e) => e.name));
	for (let e of t) r.has(e.name) || (n.push(e), r.add(e.name));
	return n;
}
function Cm(e, t) {
	if (t) {
		t.modules?.length && e.modules.push(...t.modules), t.defines && Object.assign(e.defines, t.defines);
		for (let [n, r] of Object.entries(t.vertexInputs || {})) {
			wm(n, "vertex input");
			let t = e.vertexInputs[n];
			if (t && t !== r) throw Error(`ShaderPlugin vertex input "${n}" has conflicting types "${t}" and "${r}"`);
			e.vertexInputs[n] = r;
		}
		for (let [n, r] of Object.entries(t.varyings || {})) {
			wm(n, "varying");
			let t = Tm(n, r), i = e.varyings[n];
			if (i && (i.type !== t.type || i.interpolation !== t.interpolation)) throw Error(`ShaderPlugin varying "${n}" has conflicting declarations "${i.type}/${i.interpolation}" and "${t.type}/${t.interpolation}"`);
			e.varyings[n] = t;
		}
		for (let n of t.injections || []) Em(n.target), e.injections[n.target] || (e.injections[n.target] = []), e.injections[n.target].push({
			injection: n.injection,
			order: n.order ?? 0
		});
	}
}
function wm(e, t) {
	if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e) || e.startsWith("_luma_")) throw Error(`ShaderPlugin ${t} "${e}" must be a valid non-reserved identifier`);
}
function Tm(e, t) {
	let { primitiveType: n } = si.getAttributeShaderTypeInfo(t.type), r = n === "i32" || n === "u32", i = t.interpolation || (r ? "flat" : "smooth");
	if (r && i === "smooth") throw Error(`ShaderPlugin integer varying "${e}" must use flat interpolation`);
	return {
		type: t.type,
		interpolation: i
	};
}
function Em(e) {
	if (!Dm.test(e)) throw Error(`ShaderPlugin injection target "${e}" must be a named shader anchor or hook`);
}
var Dm, Om = t((() => {
	I(), Dm = /^(vs|fs):(?:#(?:decl|main-start|main-end)|[A-Za-z_][\w-]*)$/;
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-module/shader-module-uniform-layout.js
function km(e) {
	return `${e.name}Uniforms`;
}
function Am(e, t) {
	let n = t === "wgsl" ? e.source : t === "vertex" ? e.vs : e.fs;
	if (!n) return null;
	let r = km(e);
	return Fm(n, t === "wgsl" ? "wgsl" : "glsl", r);
}
function jm(e, t) {
	let n = Object.keys(e.uniformTypes || {});
	if (!n.length) return null;
	let r = Am(e, t);
	return r ? {
		moduleName: e.name,
		uniformBlockName: km(e),
		stage: t,
		expectedUniformNames: n,
		actualUniformNames: r,
		matches: Rm(n, r)
	} : null;
}
function Mm(e, t, n = {}) {
	let r = jm(e, t);
	if (!r || r.matches) return r;
	let i = zm(r);
	return n.log?.error?.(i, r)(), n.throwOnError !== !1 && Gp(!1, i), r;
}
function Nm(e) {
	let t = [], n = Bm(e);
	for (let e of n.matchAll(Gm)) {
		let n = e[1]?.trim() || null;
		t.push({
			blockName: e[2],
			body: e[3],
			instanceName: e[4] || null,
			layoutQualifier: n,
			hasLayoutQualifier: !!n,
			isStd140: !!(n && /\blayout\s*\([^)]*\bstd140\b[^)]*\)/.exec(n))
		});
	}
	return t;
}
function Pm(e, t, n, r) {
	let i = Nm(e).filter((e) => !e.isStd140), a = /* @__PURE__ */ new Set();
	for (let e of i) {
		if (a.has(e.blockName)) continue;
		a.add(e.blockName);
		let i = r?.label ? `${r.label} ` : "", o = e.hasLayoutQualifier ? `declares ${Vm(e.layoutQualifier)} instead of layout(std140)` : "does not declare layout(std140)", s = `${i}${t} shader uniform block ${e.blockName} ${o}. luma.gl host-side shader block packing assumes explicit layout(std140) for GLSL uniform blocks. Add \`layout(std140)\` to the block declaration.`;
		n?.warn?.(s, e)();
	}
	return i;
}
function Fm(e, t, n) {
	let r = t === "wgsl" ? Im(e, n) : Lm(e, n);
	if (!r) return null;
	let i = [];
	for (let e of r.split("\n")) {
		let n = e.replace(/\/\/.*$/, "").trim();
		if (!n || n.startsWith("#")) continue;
		let r = t === "wgsl" ? n.match(/^([A-Za-z0-9_]+)\s*:/) : n.match(Wm);
		r && i.push(r[1]);
	}
	return i;
}
function Im(e, t) {
	let n = RegExp(`\\bstruct\\s+${t}\\b`, "m").exec(e);
	if (!n) return null;
	let r = e.indexOf("{", n.index);
	if (r < 0) return null;
	let i = 0;
	for (let t = r; t < e.length; t++) {
		let n = e[t];
		if (n === "{") i++;
		else if (n === "}" && (i--, i === 0)) return e.slice(r + 1, t);
	}
	return null;
}
function Lm(e, t) {
	return Nm(e).find((e) => e.blockName === t)?.body || null;
}
function Rm(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function zm(e) {
	let { expectedUniformNames: t, actualUniformNames: n } = e, r = t.filter((e) => !n.includes(e)), i = n.filter((e) => !t.includes(e)), a = [`Expected ${t.length} fields, found ${n.length}.`], o = Hm(t, n);
	return o && a.push(o), r.length && a.push(`Missing from shader block (${r.length}): ${Um(r)}.`), i.length && a.push(`Unexpected in shader block (${i.length}): ${Um(i)}.`), t.length <= 12 && n.length <= 12 && (r.length || i.length) && (a.push(`Expected: ${t.join(", ")}.`), a.push(`Actual: ${n.join(", ")}.`)), `${e.moduleName}: ${e.stage} shader uniform block ${e.uniformBlockName} does not match module.uniformTypes. ${a.join(" ")}`;
}
function Bm(e) {
	return e.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}
function Vm(e) {
	return e.replace(/\s+/g, " ").trim();
}
function Hm(e, t) {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) if (e[r] !== t[r]) return `First mismatch at field ${r + 1}: expected ${e[r]}, found ${t[r]}.`;
	return e.length > t.length ? `Shader block ends after field ${t.length}; expected next field ${e[t.length]}.` : t.length > e.length ? `Shader block has extra field ${t.length}: ${t[e.length]}.` : null;
}
function Um(e, t = 8) {
	if (e.length <= t) return e.join(", ");
	let n = e.length - t;
	return `${e.slice(0, t).join(", ")}, ... (${n} more)`;
}
var Wm, Gm, Km = t((() => {
	Kp(), Wm = /^(?:uniform\s+)?(?:(?:lowp|mediump|highp)\s+)?[A-Za-z0-9_]+(?:<[^>]+>)?\s+([A-Za-z0-9_]+)(?:\s*\[[^\]]+\])?\s*;/, Gm = /((?:layout\s*\([^)]*\)\s*)*)uniform\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{([\s\S]*?)\}\s*([A-Za-z_][A-Za-z0-9_]*)?\s*;/g;
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/platform-defines.js
function qm(e) {
	switch (e?.gpu.toLowerCase()) {
		case "apple": return "#define APPLE_GPU\n// Apple optimizes away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1\n// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow\n#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1\n";
		case "nvidia": return "#define NVIDIA_GPU\n// Nvidia optimizes away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n";
		case "intel": return "#define INTEL_GPU\n// Intel optimizes away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n// Intel's built-in 'tan' function doesn't have acceptable precision\n#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1\n// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow\n#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1\n";
		case "amd": return "#define AMD_GPU\n";
		default: return "#define DEFAULT_GPU\n// Prevent driver from optimizing away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n// Headless Chrome's software shader 'tan' function doesn't have acceptable precision\n#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1\n// If the GPU doesn't have full 32 bits precision, will causes overflow\n#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1\n";
	}
}
var Jm = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-transpiler/transpile-glsl-shader.js
function Ym(e, t) {
	if (Number(e.match(/^#version[ \t]+(\d+)/m)?.[1] || 100) !== 300) throw Error("luma.gl v9 only supports GLSL 3.00 shader sources");
	switch (t) {
		case "vertex": return e = Xm(e, $m), e;
		case "fragment": return e = Xm(e, eh), e;
		default: throw Error(t);
	}
}
function Xm(e, t) {
	for (let [n, r] of t) e = e.replace(n, r);
	return e;
}
function Zm(e) {
	return RegExp(`\\b${e}[ \\t]+(\\w+[ \\t]+\\w+(\\[\\w+\\])?;)`, "g");
}
var Qm, $m, eh, th = t((() => {
	Qm = [
		[/^(#version[ \t]+(100|300[ \t]+es))?[ \t]*\n/, "#version 300 es\n"],
		[/\btexture(2D|2DProj|Cube)Lod(EXT)?\(/g, "textureLod("],
		[/\btexture(2D|2DProj|Cube)(EXT)?\(/g, "texture("]
	], $m = [
		...Qm,
		[Zm("attribute"), "in $1"],
		[Zm("varying"), "out $1"]
	], eh = [...Qm, [Zm("varying"), "in $1"]];
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/shader-hooks.js
function nh(e, t, n = "glsl") {
	let r = "";
	for (let i in e) {
		let a = e[i];
		if (r += `${n === "wgsl" ? "fn" : "void"} ${a.signature} {\n`, a.header && (r += `  ${a.header}`), t[i]) {
			let e = t[i];
			e.sort((e, t) => e.order - t.order);
			for (let t of e) r += `  ${t.injection}\n`;
		}
		a.footer && (r += `  ${a.footer}`), r += "}\n";
	}
	return r;
}
function rh(e) {
	let t = {
		vertex: {},
		fragment: {}
	};
	for (let n of e) {
		let e, r;
		typeof n == "string" ? (e = {}, r = n) : (e = n, r = e.hook), r = r.trim();
		let i = r.indexOf(":"), a = r.slice(0, i), o = r.slice(i + 1), s = r.replace(/\(.+/, ""), c = Object.assign(e, { signature: o });
		switch (a) {
			case "vs":
				t.vertex[s] = c;
				break;
			case "fs":
				t.fragment[s] = c;
				break;
			default: throw Error(a);
		}
	}
	return t;
}
var ih = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/glsl-utils/get-shader-info.js
function ah(e, t) {
	return {
		name: oh(e, t),
		language: "glsl",
		version: sh(e)
	};
}
function oh(e, t = "unnamed") {
	let n = /#define[^\S\r\n]*SHADER_NAME[^\S\r\n]*([A-Za-z0-9_-]+)\s*/.exec(e);
	return n ? n[1] : t;
}
function sh(e) {
	let t = 100, n = e.match(/[^\s]+/g);
	if (n && n.length >= 2 && n[0] === "#version") {
		let e = parseInt(n[1], 10);
		Number.isFinite(e) && (t = e);
	}
	if (t !== 100 && t !== 300) throw Error(`Invalid GLSL version ${t}`);
	return t;
}
var ch = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/wgsl-binding-debug.js
function lh(e, t = []) {
	let n = ap(e), r = /* @__PURE__ */ new Map();
	for (let e of t) r.set(dh(e.name, e.group, e.location), e.moduleName);
	let i = [];
	for (let e of hh) {
		e.lastIndex = 0;
		let t;
		for (t = e.exec(n); t;) {
			let a = e === hh[0], o = Number(t[a ? 1 : 2]), s = Number(t[a ? 2 : 1]), c = t[3]?.trim(), l = t[4], u = t[5].trim(), d = r.get(dh(l, s, o));
			i.push(uh({
				name: l,
				group: s,
				binding: o,
				owner: d ? "module" : "application",
				moduleName: d,
				accessDeclaration: c,
				resourceType: u
			})), t = e.exec(n);
		}
	}
	return i.sort((e, t) => e.group === t.group ? e.binding === t.binding ? e.name.localeCompare(t.name) : e.binding - t.binding : e.group - t.group);
}
function uh(e) {
	let t = {
		name: e.name,
		group: e.group,
		binding: e.binding,
		owner: e.owner,
		kind: "unknown",
		moduleName: e.moduleName,
		resourceType: e.resourceType
	};
	if (e.accessDeclaration) {
		let n = e.accessDeclaration.split(",").map((e) => e.trim());
		if (n[0] === "uniform") return {
			...t,
			kind: "uniform",
			access: "uniform"
		};
		if (n[0] === "storage") {
			let e = n[1] || "read_write";
			return {
				...t,
				kind: e === "read" ? "read-only-storage" : "storage",
				access: e
			};
		}
	}
	return e.resourceType === "sampler" || e.resourceType === "sampler_comparison" ? {
		...t,
		kind: "sampler",
		samplerKind: e.resourceType === "sampler_comparison" ? "comparison" : "filtering"
	} : e.resourceType.startsWith("texture_storage_") ? {
		...t,
		kind: "storage-texture",
		access: mh(e.resourceType),
		viewDimension: fh(e.resourceType)
	} : e.resourceType.startsWith("texture_") ? {
		...t,
		kind: "texture",
		viewDimension: fh(e.resourceType),
		sampleType: ph(e.resourceType),
		multisampled: e.resourceType.startsWith("texture_multisampled_")
	} : t;
}
function dh(e, t, n) {
	return `${t}:${n}:${e}`;
}
function fh(e) {
	if (e.includes("cube_array")) return "cube-array";
	if (e.includes("2d_array")) return "2d-array";
	if (e.includes("cube")) return "cube";
	if (e.includes("3d")) return "3d";
	if (e.includes("2d")) return "2d";
	if (e.includes("1d")) return "1d";
}
function ph(e) {
	if (e.startsWith("texture_depth_")) return "depth";
	if (e.includes("<i32>")) return "sint";
	if (e.includes("<u32>")) return "uint";
	if (e.includes("<f32>")) return "float";
}
function mh(e) {
	return /,\s*([A-Za-z_][A-Za-z0-9_]*)\s*>$/.exec(e)?.[1];
}
var hh, gh = t((() => {
	gp(), hh = [RegExp(`@binding\\(\\s*(\\d+)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)\\s*${up}\\s*:\\s*([^;]+);`, "g"), RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(\\d+)\\s*\\)\\s*${up}\\s*:\\s*([^;]+);`, "g")];
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/preprocessor/preprocessor.js
function _h(e, t) {
	let n = e.split("\n"), r = [], i = [], a = !0;
	for (let e of n) {
		let n = e.match(bh), o = e.match(Th) || e.match(xh), s = e.match(Sh), c = e.match(Ch), l = e.match(Eh) || e.match(wh);
		if (n) {
			let e = vh(n[1], t?.defines || {}), r = a && e;
			i.push({
				parentActive: a,
				branchTaken: e,
				active: r
			}), a = r;
		} else if (o || s) {
			let e = (o || s)?.[1], n = !!t?.defines?.[e], r = o ? n : !n, c = a && r;
			i.push({
				parentActive: a,
				branchTaken: r,
				active: c
			}), a = c;
		} else if (c) {
			let e = i[i.length - 1];
			if (!e) throw Error("Encountered #else without matching #if, #ifdef or #ifndef");
			e.active = e.parentActive && !e.branchTaken, e.branchTaken = !0, a = e.active;
		} else l ? (i.pop(), a = !i.length || i[i.length - 1].active) : a && r.push(e);
	}
	if (i.length > 0) throw Error("Unterminated conditional block in shader source");
	return r.join("\n");
}
function vh(e, t) {
	let n = e.trim();
	if (/^[+-]?\d+(?:\.\d+)?$/.test(n)) return Number(n) !== 0;
	if (n === "true") return !0;
	if (n === "false") return !1;
	let r = n.match(RegExp(`^!\\s*${yh}$`));
	if (r) return !t[r[1]];
	let i = n.match(RegExp(`^${yh}$`));
	if (i) return !!t[i[1]];
	let a = n.match(RegExp(`^defined\\s*\\(\\s*${yh}\\s*\\)$`));
	if (a) return t[a[1]] !== void 0;
	let o = n.match(RegExp(`^!\\s*defined\\s*\\(\\s*${yh}\\s*\\)$`));
	if (o) return t[o[1]] === void 0;
	throw Error(`Unsupported #if expression "${e}"`);
}
var yh, bh, xh, Sh, Ch, wh, Th, Eh, Dh = t((() => {
	yh = "([a-zA-Z_][a-zA-Z0-9_]*)", bh = /^\s*\#\s*if\s+(.+?)\s*(?:\/\/.*)?$/, xh = RegExp(`^\\s*\\#\\s*ifdef\\s*${yh}\\s*$`), Sh = RegExp(`^\\s*\\#\\s*ifndef\\s*${yh}\\s*(?:\\/\\/.*)?$`), Ch = /^\s*\#\s*else\s*(?:\/\/.*)?$/, wh = /^\s*\#\s*endif\s*$/, Th = RegExp(`^\\s*\\#\\s*ifdef\\s*${yh}\\s*(?:\\/\\/.*)?$`), Eh = /^\s*\#\s*endif\s*(?:\/\/.*)?$/;
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/shader-plugin-vertex-inputs.js
function Oh(e, t) {
	let n = [];
	for (let [r, i] of Object.entries(t)) jh(e, r), n.push(`in ${Ah(i)} ${r};`);
	return n.join("\n");
}
function kh(e, t, n) {
	let r = Object.entries(n);
	if (r.length === 0) return {
		source: e,
		declarations: "",
		initialization: ""
	};
	let i = Mh(e, t), a = e.slice(i.openParenthesis + 1, i.closeParenthesis), o = Nh(e, a), s = new Set(o.locations), c = [], l = [], u = [];
	for (let [t, n] of r) {
		if (o.names.has(t) || Rh(e, t)) throw Error(`ShaderPlugin vertex input "${t}" conflicts with an existing WGSL shader input or variable`);
		let r = zh(s);
		s.add(r);
		let i = `_luma_${t}`;
		c.push(`@location(${r}) ${i}: ${n}`), l.push(`var<private> ${t}: ${n};`), u.push(`${t} = ${i};`);
	}
	let d = a.trim() ? ",\n  " : "\n  ", f = a.trim() ? "" : "\n", p = `${a}${d}${c.join(",\n  ")}${f}`;
	return {
		source: e.slice(0, i.openParenthesis + 1) + p + e.slice(i.closeParenthesis),
		declarations: l.join("\n"),
		initialization: u.join("\n")
	};
}
function Ah(e) {
	let { primitiveType: t, components: n } = si.getAttributeShaderTypeInfo(e), r = t === "i32" ? "int" : t === "u32" ? "uint" : "float";
	return n === 1 ? r : `${r === "int" ? "i" : r === "uint" ? "u" : ""}vec${n}`;
}
function jh(e, t) {
	let n = Hh(t);
	if (RegExp(`\\b(?:in|attribute)\\s+(?:(?:lowp|mediump|highp)\\s+)?[A-Za-z_][A-Za-z0-9_]*\\s+${n}\\s*(?:\\[|;)`).test(e)) throw Error(`ShaderPlugin vertex input "${t}" conflicts with an existing GLSL input`);
}
function Mh(e, t) {
	let n = RegExp(`\\bfn\\s+${Hh(t)}\\s*\\(`, "g").exec(e);
	if (!n) throw Error(`ShaderPlugin vertex inputs require WGSL vertex entry point "${t}"`);
	let r = e.indexOf("(", n.index), i = Bh(e, r, "(", ")");
	if (i < 0) throw Error(`Unable to parse WGSL vertex entry point "${t}" parameters`);
	return {
		openParenthesis: r,
		closeParenthesis: i
	};
}
function Nh(e, t) {
	let n = Ph(t), r = new Set(Fh(t)), i = Ih(t);
	for (let t of i) {
		let i = Lh(e, t);
		if (i !== null) {
			n.push(...Ph(i));
			for (let e of Fh(i)) r.add(e);
		}
	}
	return {
		locations: n,
		names: r
	};
}
function Ph(e) {
	let t = [], n = /@location\s*\(\s*(\d+)\s*\)/g, r = n.exec(e);
	for (; r;) t.push(Number(r[1])), r = n.exec(e);
	return t;
}
function Fh(e) {
	let t = [], n = /(?:^|,)\s*(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:/gm, r = n.exec(e);
	for (; r;) t.push(r[1]), r = n.exec(e);
	return t;
}
function Ih(e) {
	let t = [], n = /:\s*([A-Za-z_][\w]*)\b/g, r = n.exec(e);
	for (; r;) t.push(r[1]), r = n.exec(e);
	return t;
}
function Lh(e, t) {
	let n = RegExp(`\\bstruct\\s+${Hh(t)}\\s*\\{`, "g").exec(e);
	if (!n) return null;
	let r = e.indexOf("{", n.index), i = Bh(e, r, "{", "}");
	return i < 0 ? null : e.slice(r + 1, i);
}
function Rh(e, t) {
	let n = Hh(t), r = RegExp(`\\b(?:var(?:<[^>]+>)?|let|const)\\s+${n}\\b`, "g"), i = r.exec(e);
	for (; i;) {
		if (Vh(e, i.index) === 0) return !0;
		i = r.exec(e);
	}
	return !1;
}
function zh(e) {
	let t = 0;
	for (; e.has(t);) t++;
	return t;
}
function Bh(e, t, n, r) {
	let i = 0, a = 0, o = !1;
	for (let s = t; s < e.length; s++) {
		let t = e[s], c = e[s + 1];
		if (o) t === "\n" && (o = !1);
		else if (a > 0) t === "/" && c === "*" ? (a++, s++) : t === "*" && c === "/" && (a--, s++);
		else if (t === "/" && c === "/") o = !0, s++;
		else if (t === "/" && c === "*") a = 1, s++;
		else if (t === n && i++, t === r && --i === 0) return s;
	}
	return -1;
}
function Vh(e, t) {
	let n = 0, r = 0, i = !1;
	for (let a = 0; a < t; a++) {
		let t = e[a], o = e[a + 1];
		i ? t === "\n" && (i = !1) : r > 0 ? t === "/" && o === "*" ? (r++, a++) : t === "*" && o === "/" && (r--, a++) : t === "/" && o === "/" ? (i = !0, a++) : t === "/" && o === "*" ? (r = 1, a++) : t === "{" ? n++ : t === "}" && n--;
	}
	return n;
}
function Hh(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var Uh = t((() => {
	I();
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/shader-plugin-varyings.js
function Wh(e, t, n) {
	let r = [], i = [];
	for (let [a, o] of Object.entries(n)) {
		ug(e, a);
		let n = o.interpolation === "flat" ? "flat " : "", s = t === "vertex" ? "out" : "in";
		r.push(`${n}${s} ${Ah(o.type)} ${a};`), t === "vertex" && i.push(`${a} = ${cg(o.type)};`);
	}
	return {
		declarations: r.join("\n"),
		initialization: i.join("\n")
	};
}
function Gh(e, t, n, r) {
	let i = Object.entries(r);
	if (i.length === 0) return {
		source: e,
		declarations: "",
		vertexInitialization: "",
		fragmentInitialization: ""
	};
	let a = e, o = Kh(a, t, "vertex"), s = qh(a, o), c = Kh(a, n, "fragment"), l = Jh(a, c), u = Yh(a, s), d = Yh(a, l.type), f = /* @__PURE__ */ new Set([
		...ag(o.parameters),
		...ag(u.body),
		...ag(c.parameters),
		...ag(d.body)
	]), p = /* @__PURE__ */ new Set([...ig(u.body), ...ig(d.body)]), m = [], h = [], g = [], _ = [];
	for (let [e, t] of i) {
		if (f.has(e) || og(a, e)) throw Error(`ShaderPlugin varying "${e}" conflicts with existing WGSL stage I/O or a module variable`);
		let n = sg(p);
		p.add(n);
		let r = t.interpolation === "flat" ? " @interpolate(flat)" : "";
		m.push(`  @location(${n})${r} ${e}: ${t.type},`), h.push(`var<private> ${e}: ${t.type};`), g.push(`${e} = ${lg(t.type)};`), _.push(`${e} = ${l.name}.${e};`);
	}
	Zh(a, s, o.openBrace, o.closeBrace), a = Qh(a, s, o, i.map(([e]) => e)), o = Kh(a, t, "vertex"), a = $h(a, o, i.map(([e]) => e));
	let v = (s === l.type ? [s] : [s, l.type]).map((e) => Yh(a, e).closeBrace).sort((e, t) => t - e);
	for (let e of v) a = a.slice(0, e) + `${m.join("\n")}\n` + a.slice(e);
	if (c = Kh(a, n, "fragment"), !RegExp(`\\b${pg(l.name)}\\s*:`).test(c.parameters)) throw Error(`Unable to preserve WGSL fragment input "${l.name}"`);
	return {
		source: a,
		declarations: h.join("\n"),
		vertexInitialization: g.join("\n"),
		fragmentInitialization: _.join("\n")
	};
}
function Kh(e, t, n) {
	let r = RegExp(`\\bfn\\s+${pg(t)}\\s*\\(`, "g").exec(e);
	if (!r) throw Error(`ShaderPlugin varyings require WGSL ${n} entry point "${t}"`);
	let i = e.indexOf("(", r.index), a = dg(e, i, "(", ")"), o = e.indexOf("{", a), s = dg(e, o, "{", "}");
	if (a < 0 || o < 0 || s < 0) throw Error(`Unable to parse WGSL ${n} entry point "${t}"`);
	return {
		openParenthesis: i,
		closeParenthesis: a,
		openBrace: o,
		closeBrace: s,
		parameters: e.slice(i + 1, a)
	};
}
function qh(e, t) {
	let n = e.slice(t.closeParenthesis + 1, t.openBrace), r = /->\s*([A-Za-z_][\w]*)\s*$/.exec(n.trim());
	if (!r || Xh(e, r[1]) === null) throw Error("ShaderPlugin varyings require the WGSL vertex entry point to return a named struct");
	return r[1];
}
function Jh(e, t) {
	let n = [];
	for (let r of rg(t.parameters, ",")) {
		let t = /(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:\s*([A-Za-z_][\w]*)\s*$/.exec(r.trim());
		t && Xh(e, t[2]) && n.push({
			name: t[1],
			type: t[2]
		});
	}
	if (n.length !== 1) throw Error(`ShaderPlugin varyings require exactly one named WGSL fragment input struct; found ${n.length}`);
	return n[0];
}
function Yh(e, t) {
	let n = Xh(e, t);
	if (!n) throw Error(`Unable to find WGSL stage I/O struct "${t}"`);
	return n;
}
function Xh(e, t) {
	let n = RegExp(`\\bstruct\\s+${pg(t)}\\s*\\{`, "g").exec(e);
	if (!n) return null;
	let r = e.indexOf("{", n.index), i = dg(e, r, "{", "}");
	return i < 0 ? null : {
		openBrace: r,
		closeBrace: i,
		body: e.slice(r + 1, i)
	};
}
function Zh(e, t, n, r) {
	let i = RegExp(`\\b${pg(t)}\\s*\\(`, "g"), a = i.exec(e);
	for (; a;) {
		if (a.index < n || a.index > r) throw Error(`ShaderPlugin varying output struct "${t}" is constructed outside the selected vertex entry point`);
		a = i.exec(e);
	}
}
function Qh(e, t, n, r) {
	let i = RegExp(`\\b${pg(t)}\\s*\\(`, "g"), a = [], o = i.exec(e);
	for (; o;) {
		if (o.index > n.openBrace && o.index < n.closeBrace) {
			let r = e.indexOf("(", o.index), i = dg(e, r, "(", ")");
			if (i < 0 || i > n.closeBrace) throw Error(`Unable to parse WGSL output constructor "${t}"`);
			a.push({
				openParenthesis: r,
				closeParenthesis: i
			});
		}
		o = i.exec(e);
	}
	for (let t of a.sort((e, t) => t.closeParenthesis - e.closeParenthesis)) {
		let n = e.slice(t.openParenthesis + 1, t.closeParenthesis).trim() ? ", " : "";
		e = e.slice(0, t.closeParenthesis) + n + r.join(", ") + e.slice(t.closeParenthesis);
	}
	return e;
}
function $h(e, t, n) {
	let r = eg(e, t.openBrace + 1, t.closeBrace);
	for (let t = r.length - 1; t >= 0; t--) {
		let i = r[t], a = e.slice(i.expressionStart, i.semicolon).trim();
		if (!a) throw Error("ShaderPlugin varying vertex entry point cannot use an empty return");
		let o = `_luma_vertexOutput${t}`, s = `{\nvar ${o} = ${a};\n${n.map((e) => `${o}.${e} = ${e};`).join("\n")}\nreturn ${o};\n}`;
		e = e.slice(0, i.start) + s + e.slice(i.semicolon + 1);
	}
	return e;
}
function eg(e, t, n) {
	let r = [], i = t;
	for (; i < n;) if (i = ng(e, i, n), e.slice(i, i + 6) === "return" && !/[A-Za-z0-9_]/.test(e[i + 6] || "")) {
		let t = i + 6, a = tg(e, t, n);
		if (a < 0) throw Error("Unable to parse WGSL return statement in selected vertex entry point");
		r.push({
			start: i,
			expressionStart: t,
			semicolon: a
		}), i = a + 1;
	} else i++;
	return r;
}
function tg(e, t, n) {
	let r = 0, i = 0;
	for (let a = t; a < n; a++) {
		let t = ng(e, a, n);
		if (t !== a) {
			a = t - 1;
			continue;
		}
		let o = e[a];
		if (o === "(" && r++, o === ")" && r--, o === "[" && i++, o === "]" && i--, o === ";" && r === 0 && i === 0) return a;
	}
	return -1;
}
function ng(e, t, n) {
	let r = t;
	if (e[r] === "/" && e[r + 1] === "/") {
		let t = e.indexOf("\n", r + 2);
		return t < 0 || t > n ? n : t + 1;
	}
	if (e[r] === "/" && e[r + 1] === "*") {
		let t = 1;
		for (r += 2; r < n && t > 0;) e[r] === "/" && e[r + 1] === "*" ? (t++, r += 2) : e[r] === "*" && e[r + 1] === "/" ? (t--, r += 2) : r++;
	}
	return r;
}
function rg(e, t) {
	let n = [], r = 0, i = 0, a = 0;
	for (let o = 0; o < e.length; o++) {
		let s = e[o];
		s === "(" && i++, s === ")" && i--, s === "<" && a++, s === ">" && a--, s === t && i === 0 && a === 0 && (n.push(e.slice(r, o)), r = o + 1);
	}
	return n.push(e.slice(r)), n;
}
function ig(e) {
	let t = [], n = /@location\s*\(\s*(\d+)\s*\)/g, r = n.exec(e);
	for (; r;) t.push(Number(r[1])), r = n.exec(e);
	return t;
}
function ag(e) {
	let t = [], n = /(?:^|,)\s*(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:/gm, r = n.exec(e);
	for (; r;) t.push(r[1]), r = n.exec(e);
	return t;
}
function og(e, t) {
	let n = RegExp(`\\b(?:var(?:<[^>]+>)?|let|const)\\s+${pg(t)}\\b`, "g"), r = n.exec(e);
	for (; r;) {
		if (fg(e, r.index) === 0) return !0;
		r = n.exec(e);
	}
	return !1;
}
function sg(e) {
	let t = 0;
	for (; e.has(t);) t++;
	return t;
}
function cg(e) {
	let { primitiveType: t, components: n } = si.getAttributeShaderTypeInfo(e), r = t === "u32" ? "0u" : t === "i32" ? "0" : "0.0";
	return n === 1 ? r : `${Ah(e)}(${r})`;
}
function lg(e) {
	let { primitiveType: t, components: n } = si.getAttributeShaderTypeInfo(e), r = `${t}(0)`;
	return n === 1 ? r : `${e}(${r})`;
}
function ug(e, t) {
	if (RegExp(`\\b(?:flat\\s+|smooth\\s+)?(?:in|out|varying)\\s+(?:(?:lowp|mediump|highp)\\s+)?[A-Za-z_][A-Za-z0-9_]*\\s+${pg(t)}\\s*(?:\\[|;)`).test(e)) throw Error(`ShaderPlugin varying "${t}" conflicts with existing GLSL stage I/O`);
}
function dg(e, t, n, r) {
	let i = 0, a = 0, o = !1;
	for (let s = t; s < e.length; s++) {
		let t = e[s], c = e[s + 1];
		if (o) t === "\n" && (o = !1);
		else if (a > 0) t === "/" && c === "*" ? (a++, s++) : t === "*" && c === "/" && (a--, s++);
		else if (t === "/" && c === "/") o = !0, s++;
		else if (t === "/" && c === "*") a = 1, s++;
		else if (t === n && i++, t === r && --i === 0) return s;
	}
	return -1;
}
function fg(e, t) {
	let n = 0;
	for (let r = 0; r < t; r++) {
		let i = ng(e, r, t);
		i === r ? (e[r] === "{" && n++, e[r] === "}" && n--) : r = i - 1;
	}
	return n;
}
function pg(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var mg = t((() => {
	I(), Uh();
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/shader-assembly/assemble-shaders.js
function hg(e) {
	let t = vm(e.modules || []), { source: n, bindingAssignments: r } = _g(e.platformInfo, {
		...e,
		source: e.source,
		stage: "vertex",
		modules: t
	});
	return {
		source: n,
		getUniforms: yg(t),
		bindingAssignments: r,
		bindingTable: lh(n, r),
		shaderLayout: _p(n, {
			vertexEntryPoint: e.vertexEntryPoint,
			scanVertexAttributes: e.scanVertexAttributes
		})
	};
}
function gg(e) {
	let { vs: t, fs: n } = e, r = vm(e.modules || []);
	return {
		vs: vg(e.platformInfo, {
			...e,
			source: t,
			stage: "vertex",
			modules: r
		}),
		fs: vg(e.platformInfo, {
			...e,
			source: n,
			stage: "fragment",
			modules: r
		}),
		getUniforms: yg(r)
	};
}
function _g(e, t) {
	let { source: n, stage: r, modules: i, defines: a = {}, hookFunctions: o = [], inject: s = {}, pluginInjections: c = {}, pluginVertexInputs: l = {}, pluginVaryings: u = {}, vertexEntryPoint: d = "vertexMain", fragmentEntryPoint: f = "fragmentMain", log: p } = t;
	Gp(typeof n == "string", "shader source must be a string");
	let m = kh(_h(n, { defines: a }), d, l), h = Gh(m.source, d, f, u), g = h.source, _ = "", v = rh(o), y = {}, b = {}, x = {};
	bg(c, y, b, x);
	for (let e in s) {
		let t = typeof s[e] == "string" ? {
			injection: s[e],
			order: 0
		} : s[e], n = /^(v|f)s:(#)?([\w-]+)$/.exec(e);
		if (n) {
			let r = n[2], i = n[3];
			r ? i === "decl" ? b[e] = [t] : x[e] = [t] : y[e] = [t];
		} else x[e] = [t];
	}
	xg(m.declarations, m.initialization, b, x), Sg(h, b, x);
	let S = i, C = kg(g), w = Og(C.source), T = Ng(S, t._bindingRegistry, w, a), E = [];
	for (let e of S) {
		p && hm(e, g, p);
		let n = Ag(_h(Dg(e, "wgsl", p), { defines: a }), e, {
			usedBindingsByGroup: w,
			bindingRegistry: t._bindingRegistry,
			reservedBindingKeysByGroup: T
		});
		E.push(...n.bindingAssignments);
		let r = n.source;
		_ += r;
		let i = Cg(e);
		for (let e in i) {
			let t = /^(v|f)s:#([\w-]+)$/.exec(e);
			if (t) {
				let n = t[2] === "decl" ? b : x;
				n[e] = n[e] || [], n[e].push(i[e]);
			} else y[e] = y[e] || [], y[e].push(i[e]);
		}
	}
	return _ += qg, _ = rm(_, r, wg(b), !1, "wgsl", {
		vertex: d,
		fragment: f
	}), _ += Tg(v, y), _ += Hg(E), _ += C.source, _ = rm(_, r, x, !1, "wgsl", {
		vertex: d,
		fragment: f
	}), Vg(_), {
		source: _,
		bindingAssignments: E
	};
}
function vg(e, t) {
	let { source: n, stage: r, language: i = "glsl", modules: a, defines: o = {}, hookFunctions: s = [], inject: c = {}, pluginInjections: l = {}, pluginVertexInputs: u = {}, pluginVaryings: d = {}, prologue: f = !0, log: p } = t;
	Gp(typeof n == "string", "shader source must be a string");
	let m = i === "glsl" ? ah(n).version : -1, h = e.shaderLanguageVersion, g = m === 100 ? "#version 100" : "#version 300 es", _ = n.split("\n").slice(1).join("\n"), v = {};
	a.forEach((e) => {
		Object.assign(v, e.defines);
	}), Object.assign(v, o);
	let y = "";
	switch (i) {
		case "wgsl": break;
		case "glsl": y = f ? `\
${g}

// ----- PROLOGUE -------------------------
${`#define SHADER_TYPE_${r.toUpperCase()}`}

${qm(e)}
${r === "fragment" ? Yg : ""}

// ----- APPLICATION DEFINES -------------------------

${Eg(v)}

` : `${g}
`;
	}
	let b = rh(s), x = {}, S = {}, C = {};
	bg(l, x, S, C);
	for (let e in c) {
		let t = typeof c[e] == "string" ? {
			injection: c[e],
			order: 0
		} : c[e], n = /^(v|f)s:(#)?([\w-]+)$/.exec(e);
		if (n) {
			let r = n[2], i = n[3];
			r ? i === "decl" ? S[e] = [t] : C[e] = [t] : x[e] = [t];
		} else C[e] = [t];
	}
	if (r === "vertex") {
		let e = Oh(_, u);
		e && (S["vs:#decl"] = S["vs:#decl"] || [], S["vs:#decl"].push({
			injection: e,
			order: -(2 ** 53 - 1)
		}));
	}
	let w = Wh(_, r, d);
	if (w.declarations) {
		let e = r === "vertex" ? "vs:#decl" : "fs:#decl";
		S[e] = S[e] || [], S[e].push({
			injection: w.declarations,
			order: -(2 ** 53 - 1)
		});
	}
	w.initialization && (C["vs:#main-start"] = C["vs:#main-start"] || [], C["vs:#main-start"].push({
		injection: w.initialization,
		order: -(2 ** 53 - 1)
	}));
	for (let e of a) {
		p && hm(e, _, p);
		let t = Dg(e, r, p);
		y += t;
		let n = e.instance?.normalizedInjections[r] || {};
		for (let e in n) {
			let t = /^(v|f)s:#([\w-]+)$/.exec(e);
			if (t) {
				let r = t[2] === "decl" ? S : C;
				r[e] = r[e] || [], r[e].push(n[e]);
			} else x[e] = x[e] || [], x[e].push(n[e]);
		}
	}
	return y += "// ----- MAIN SHADER SOURCE -------------------------", y += qg, y = rm(y, r, S), y += nh(b[r], x), y += _, y = rm(y, r, C), i === "glsl" && m !== h && (y = Ym(y, r)), i === "glsl" && Pm(y, r, p), y.trim();
}
function yg(e) {
	return function(t) {
		let n = {};
		for (let r of e) {
			let e = r.getUniforms?.(t, n);
			Object.assign(n, e);
		}
		return n;
	};
}
function bg(e, t, n, r) {
	for (let i in e) {
		let a = /^(v|f)s:(#)?([\w-]+)$/.exec(i);
		if (a) {
			let o = a[2], s = a[3], c = o ? s === "decl" ? n : r : t;
			c[i] = c[i] || [], c[i].push(...e[i]);
		} else r[i] = r[i] || [], r[i].push(...e[i]);
	}
}
function xg(e, t, n, r) {
	e && (n["vs:#decl"] = n["vs:#decl"] || [], n["vs:#decl"].push({
		injection: e,
		order: -(2 ** 53 - 1)
	})), t && (r["vs:#main-start"] = r["vs:#main-start"] || [], r["vs:#main-start"].push({
		injection: t,
		order: -(2 ** 53 - 1)
	}));
}
function Sg(e, t, n) {
	e.declarations && (t["vs:#decl"] = t["vs:#decl"] || [], t["vs:#decl"].push({
		injection: e.declarations,
		order: -(2 ** 53 - 1)
	})), e.vertexInitialization && (n["vs:#main-start"] = n["vs:#main-start"] || [], n["vs:#main-start"].push({
		injection: e.vertexInitialization,
		order: -(2 ** 53 - 1)
	})), e.fragmentInitialization && (n["fs:#main-start"] = n["fs:#main-start"] || [], n["fs:#main-start"].push({
		injection: e.fragmentInitialization,
		order: -(2 ** 53 - 1)
	}));
}
function Cg(e) {
	return {
		...e.instance?.normalizedInjections.vertex || {},
		...e.instance?.normalizedInjections.fragment || {}
	};
}
function wg(e) {
	let t = [...e["vs:#decl"] || [], ...e["fs:#decl"] || []];
	return t.length ? { "vs:#decl": t } : {};
}
function Tg(e, t) {
	return nh(e.vertex, t, "wgsl") + nh(e.fragment, t, "wgsl");
}
function Eg(e = {}) {
	let t = "";
	for (let n in e) {
		let r = e[n];
		(r || Number.isFinite(r)) && (t += `#define ${n.toUpperCase()} ${e[n]}\n`);
	}
	return t;
}
function Dg(e, t, n) {
	let r;
	switch (t) {
		case "vertex":
			r = e.vs || "";
			break;
		case "fragment":
			r = e.fs || "";
			break;
		case "wgsl":
			r = e.source || "";
			break;
		default: Gp(!1);
	}
	if (!e.name) throw Error("Shader module must have a name");
	Mm(e, t, { log: n });
	let i = e.name.toUpperCase().replace(/[^0-9a-z]/gi, "_"), a = `\
// ----- MODULE ${e.name} ---------------

`;
	return t !== "wgsl" && (a += `#define MODULE_${i}\n`), a += `${r}\n`, a;
}
function Og(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of op(e, mp)) {
		let e = Number(n.bindingToken), r = Number(n.groupToken);
		Ig(r, e, n.name), Rg(t, r, e, `application binding "${n.name}"`);
	}
	return t;
}
function kg(e) {
	let t = op(e, pp), n = /* @__PURE__ */ new Map();
	for (let e of t) {
		if (e.bindingToken === "auto") continue;
		let t = Number(e.bindingToken), r = Number(e.groupToken);
		Ig(r, t, e.name), Rg(n, r, t, `application binding "${e.name}"`);
	}
	let r = { sawSupportedBindingDeclaration: t.length > 0 }, i = sp(e, pp, (e) => Mg(e, n, r));
	if (cp(e) && !r.sawSupportedBindingDeclaration) throw Error("Unsupported @binding(auto) declaration form in application WGSL. Use adjacent \"@group(N)\" and \"@binding(auto)\" decorators followed by a bindable \"var\" declaration.");
	return { source: i };
}
function Ag(e, t, n) {
	let r = [], i = {
		sawSupportedBindingDeclaration: op(e, fp).length > 0,
		nextHintedBindingLocation: typeof t.firstBindingSlot == "number" ? t.firstBindingSlot : null
	}, a = sp(e, fp, (e) => jg(e, {
		module: t,
		context: n,
		bindingAssignments: r,
		relocationState: i
	}));
	if (cp(e) && !i.sawSupportedBindingDeclaration) throw Error(`Unsupported @binding(auto) declaration form in module "${t.name}". Use adjacent "@group(N)" and "@binding(auto)" decorators followed by a bindable "var" declaration.`);
	return {
		source: a,
		bindingAssignments: r
	};
}
function jg(e, t) {
	let { module: n, context: r, bindingAssignments: i, relocationState: a } = t, { match: o, bindingToken: s, groupToken: c, name: l } = e, u = Number(c);
	if (s === "auto") {
		let e = Ug(u, n.name, l), t = r.bindingRegistry?.get(e), s = t === void 0 ? zg(u, r.usedBindingsByGroup, n.name, a.nextHintedBindingLocation ?? void 0, r.bindingRegistry) : t;
		return Lg(n.name, u, s, l), t !== void 0 && Pg(r.reservedBindingKeysByGroup, u, s, e) ? (i.push({
			moduleName: n.name,
			name: l,
			group: u,
			location: s
		}), o.replace(/@binding\(\s*auto\s*\)/, `@binding(${s})`)) : (Rg(r.usedBindingsByGroup, u, s, `module "${n.name}" binding "${l}"`), r.bindingRegistry?.set(e, s), i.push({
			moduleName: n.name,
			name: l,
			group: u,
			location: s
		}), a.nextHintedBindingLocation !== null && t === void 0 && (a.nextHintedBindingLocation = s + 1), o.replace(/@binding\(\s*auto\s*\)/, `@binding(${s})`));
	}
	let d = Number(s);
	return Lg(n.name, u, d, l), Rg(r.usedBindingsByGroup, u, d, `module "${n.name}" binding "${l}"`), i.push({
		moduleName: n.name,
		name: l,
		group: u,
		location: d
	}), o;
}
function Mg(e, t, n) {
	let { match: r, bindingToken: i, groupToken: a, name: o } = e, s = Number(a);
	if (i === "auto") {
		let e = Bg(s, t);
		return Ig(s, e, o), Rg(t, s, e, `application binding "${o}"`), r.replace(/@binding\(\s*auto\s*\)/, `@binding(${e})`);
	}
	return n.sawSupportedBindingDeclaration = !0, r;
}
function Ng(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	if (!t) return i;
	for (let a of e) for (let e of Fg(a, r)) {
		let r = Ug(e.group, a.name, e.name), o = t.get(r);
		if (o !== void 0) {
			let t = i.get(e.group) || /* @__PURE__ */ new Map(), a = t.get(o);
			if (a && a !== r) throw Error(`Duplicate WGSL binding reservation for modules "${a}" and "${r}": group ${e.group}, binding ${o}.`);
			Rg(n, e.group, o, `registered module binding "${r}"`), t.set(o, r), i.set(e.group, t);
		}
	}
	return i;
}
function Pg(e, t, n, r) {
	let i = e.get(t);
	if (!i) return !1;
	let a = i.get(n);
	if (!a) return !1;
	if (a !== r) throw Error(`Registered module binding "${r}" collided with "${a}": group ${t}, binding ${n}.`);
	return !0;
}
function Fg(e, t) {
	let n = [], r = _h(e.source || "", { defines: t });
	for (let e of op(r, fp)) n.push({
		name: e.name,
		group: Number(e.groupToken)
	});
	return n;
}
function Ig(e, t, n) {
	if (e === 0 && t >= Jg) throw Error(`Application binding "${n}" in group 0 uses reserved binding ${t}. Application-owned explicit group-0 bindings must stay below ${Jg}.`);
}
function Lg(e, t, n, r) {
	if (t === 0 && n < Jg) throw Error(`Module "${e}" binding "${r}" in group 0 uses reserved application binding ${n}. Module-owned explicit group-0 bindings must be ${Jg} or higher.`);
}
function Rg(e, t, n, r) {
	let i = e.get(t) || /* @__PURE__ */ new Set();
	if (i.has(n)) throw Error(`Duplicate WGSL binding assignment for ${r}: group ${t}, binding ${n}.`);
	i.add(n), e.set(t, i);
}
function zg(e, t, n, r, i) {
	let a = t.get(e) || /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = `${e}:`, c = `${s}${n}:`;
	for (let [e, t] of i || []) e.startsWith(c) && o.add(t);
	let l = r ?? (e === 0 ? Jg : a.size > 0 ? Math.max(...a) + 1 : 0);
	for (; a.has(l) || o.has(l);) l++;
	for (let [e, t] of i || []) t === l && e.startsWith(s) && i?.delete(e);
	return l;
}
function Bg(e, t) {
	let n = t.get(e) || /* @__PURE__ */ new Set(), r = 0;
	for (; n.has(r);) r++;
	return r;
}
function Vg(e) {
	let t = lp(e, fp);
	if (!t) return;
	let n = Wg(e, t.index);
	throw n ? Error(`Unresolved @binding(auto) for module "${n}" binding "${t.name}" remained in assembled WGSL source.`) : Gg(e, t.index) ? Error(`Unresolved @binding(auto) for application binding "${t.name}" remained in assembled WGSL source.`) : Error(`Unresolved @binding(auto) remained in assembled WGSL source near "${Kg(t.match)}".`);
}
function Hg(e) {
	if (e.length === 0) return "";
	let t = "// ----- MODULE WGSL BINDING ASSIGNMENTS ---------------\n";
	for (let n of e) t += `// ${n.moduleName}.${n.name} -> @group(${n.group}) @binding(${n.location})\n`;
	return t += "\n", t;
}
function Ug(e, t, n) {
	return `${e}:${t}:${n}`;
}
function Wg(e, t) {
	let n = /^\/\/ ----- MODULE ([^\n]+) ---------------$/gm, r, i;
	for (i = n.exec(e); i && i.index <= t;) r = i[1], i = n.exec(e);
	return r;
}
function Gg(e, t) {
	let n = e.indexOf(qg);
	return n >= 0 ? t > n : !0;
}
function Kg(e) {
	return e.replace(/\s+/g, " ").trim();
}
var qg, Jg, Yg, Xg = t((() => {
	bm(), Jm(), fm(), th(), _m(), Km(), ih(), Kp(), ch(), gh(), Wp(), Dh(), Uh(), mg(), gp(), qg = `\n\n${dm}\n`, Jg = 100, Yg = "precision highp float;\n";
})), Zg, Qg, $g, e_ = t((() => {
	_m(), Xg(), gh(), Dh(), Wp(), Kp(), Zg = class e {
		static defaultShaderAssemblers = {};
		_hookFunctions = [];
		_defaultModules = [];
		static getDefaultShaderAssembler(t) {
			return Gp(t === "glsl" || t === "wgsl"), t === "wgsl" ? (e.defaultShaderAssemblers.wgsl = e.defaultShaderAssemblers.wgsl || new $g(), e.defaultShaderAssemblers.wgsl) : (e.defaultShaderAssemblers.glsl = e.defaultShaderAssemblers.glsl || new Qg(), e.defaultShaderAssemblers.glsl);
		}
		addDefaultModule(e) {
			this._defaultModules.find((t) => t.name === (typeof e == "string" ? e : e.name)) || this._defaultModules.push(e);
		}
		removeDefaultModule(e) {
			let t = typeof e == "string" ? e : e.name;
			this._defaultModules = this._defaultModules.filter((e) => e.name !== t);
		}
		addShaderHook(e, t) {
			t && (e = Object.assign(t, { hook: e })), this._hookFunctions.push(e);
		}
		_getModuleList(e = []) {
			let t = Array(this._defaultModules.length + e.length), n = {}, r = 0;
			for (let e = 0, i = this._defaultModules.length; e < i; ++e) {
				let i = this._defaultModules[e], a = i.name;
				t[r++] = i, n[a] = !0;
			}
			for (let i = 0, a = e.length; i < a; ++i) {
				let a = e[i], o = a.name;
				n[o] || (t[r++] = a, n[o] = !0);
			}
			return t.length = r, pm(t), t;
		}
	}, Qg = class extends Zg {
		shaderLanguage = "glsl";
		assembleGLSLShaderPair(e) {
			let t = this._getModuleList(e.modules), n = this._hookFunctions;
			return {
				...gg({
					...e,
					vs: e.vs,
					fs: e.fs,
					modules: t,
					hookFunctions: n
				}),
				modules: t
			};
		}
	}, $g = class e extends Zg {
		shaderLanguage = "wgsl";
		_wgslBindingRegistry = /* @__PURE__ */ new Map();
		assembleWGSLShader(t) {
			let n = this._getModuleList(t.modules), r = this._hookFunctions, i = e.getShaderPreprocessorDefines(t, n), a = t.platformInfo.shaderLanguage === "wgsl" && t.source ? _h(t.source, { defines: i }) : t.source, { source: o, getUniforms: s, bindingAssignments: c } = hg({
				...t,
				source: a,
				defines: i,
				_bindingRegistry: this._wgslBindingRegistry,
				modules: n,
				hookFunctions: r
			}), l = t.platformInfo.shaderLanguage === "wgsl" ? _h(o, { defines: i }) : o;
			return {
				source: l,
				getUniforms: s,
				modules: n,
				bindingAssignments: c,
				bindingTable: lh(l, c),
				shaderLayout: _p(l, {
					vertexEntryPoint: t.vertexEntryPoint,
					scanVertexAttributes: t.scanVertexAttributes
				})
			};
		}
		static getShaderPreprocessorDefines(t, n) {
			return {
				...e.getPlatformPreprocessorDefines(t.platformInfo),
				...n.reduce((e, t) => (Object.assign(e, t.defines), e), {}),
				...t.defines
			};
		}
		static getPlatformPreprocessorDefines(e) {
			let t = e.limits || {};
			return {
				LUMA_SUPPORTS_VERTEX_STORAGE_BUFFERS: e.type === "webgpu" && (t.maxStorageBuffersInVertexStage || 0) > 0,
				LUMA_FP32_TAN_PRECISION_WORKAROUND: e.type === "webgpu" && e.gpu.toLowerCase() !== "nvidia" && e.gpu.toLowerCase() !== "amd",
				LUMA_FP64_INTEGER_ARITHMETIC: e.type === "webgpu" && e.gpu.toLowerCase() === "apple"
			};
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/glsl-utils/shader-utils.js
function t_(e) {
	let { input: t, inputChannels: n, output: r } = e || {};
	if (!t) return i_;
	if (!n) throw Error("inputChannels");
	return `\
#version 300 es
in ${n_(n)} ${t};
out vec4 ${r};
void main() {
  ${r} = ${r_(t, n)};
}`;
}
function n_(e) {
	switch (e) {
		case 1: return "float";
		case 2: return "vec2";
		case 3: return "vec3";
		case 4: return "vec4";
		default: throw Error(`invalid channels: ${e}`);
	}
}
function r_(e, t) {
	switch (t) {
		case 1: return `vec4(${e}, 0.0, 0.0, 1.0)`;
		case 2: return `vec4(${e}, 0.0, 1.0)`;
		case 3: return `vec4(${e}, 1.0)`;
		case 4: return e;
		default: throw Error(`invalid channels: ${t}`);
	}
}
var i_, a_ = t((() => {
	i_ = "#version 300 es\nout vec4 transform_output;\nvoid main() {\n  transform_output = vec4(0);\n}";
}));
//#endregion
//#region node_modules/@math.gl/core/dist/lib/common.js
function o_(e, { precision: t = H.precision } = {}) {
	return e = d_(e), `${parseFloat(e.toPrecision(t))}`;
}
function s_(e) {
	return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function c_(e, t, n) {
	return p_(e, (e) => Math.max(t, Math.min(n, e)));
}
function l_(e, t, n) {
	return s_(e) ? e.map((e, r) => l_(e, t[r], n)) : n * t + (1 - n) * e;
}
function u_(e, t, n) {
	let r = H.EPSILON;
	n && (H.EPSILON = n);
	try {
		if (e === t) return !0;
		if (s_(e) && s_(t)) {
			if (e.length !== t.length) return !1;
			for (let n = 0; n < e.length; ++n) if (!u_(e[n], t[n])) return !1;
			return !0;
		}
		return e && e.equals ? e.equals(t) : t && t.equals ? t.equals(e) : typeof e == "number" && typeof t == "number" && Math.abs(e - t) <= H.EPSILON * Math.max(1, Math.abs(e), Math.abs(t));
	} finally {
		H.EPSILON = r;
	}
}
function d_(e) {
	return Math.round(e / H.EPSILON) * H.EPSILON;
}
function f_(e) {
	return e.clone ? e.clone() : Array(e.length);
}
function p_(e, t, n) {
	if (s_(e)) {
		let r = e;
		n ||= f_(r);
		for (let i = 0; i < n.length && i < r.length; ++i) {
			let r = typeof e == "number" ? e : e[i];
			n[i] = t(r, i, n);
		}
		return n;
	}
	return t(e);
}
var H, m_ = t((() => {
	globalThis.mathgl = globalThis.mathgl || { config: {
		EPSILON: 1e-12,
		debug: !1,
		precision: 4,
		printTypes: !1,
		printDegrees: !1,
		printRowMajor: !0,
		_cartographicRadians: !1
	} }, H = globalThis.mathgl.config;
})), h_, g_ = t((() => {
	m_(), h_ = class extends Array {
		clone() {
			return new this.constructor().copy(this);
		}
		fromArray(e, t = 0) {
			for (let n = 0; n < this.ELEMENTS; ++n) this[n] = e[n + t];
			return this.check();
		}
		toArray(e = [], t = 0) {
			for (let n = 0; n < this.ELEMENTS; ++n) e[t + n] = this[n];
			return e;
		}
		toObject(e) {
			return e;
		}
		from(e) {
			return Array.isArray(e) ? this.copy(e) : this.fromObject(e);
		}
		to(e) {
			return e === this ? this : s_(e) ? this.toArray(e) : this.toObject(e);
		}
		toTarget(e) {
			return e ? this.to(e) : this;
		}
		toFloat32Array() {
			return new Float32Array(this);
		}
		toString() {
			return this.formatString(H);
		}
		formatString(e) {
			let t = "";
			for (let n = 0; n < this.ELEMENTS; ++n) t += (n > 0 ? ", " : "") + o_(this[n], e);
			return `${e.printTypes ? this.constructor.name : ""}[${t}]`;
		}
		equals(e) {
			if (!e || this.length !== e.length) return !1;
			for (let t = 0; t < this.ELEMENTS; ++t) if (!u_(this[t], e[t])) return !1;
			return !0;
		}
		exactEquals(e) {
			if (!e || this.length !== e.length) return !1;
			for (let t = 0; t < this.ELEMENTS; ++t) if (this[t] !== e[t]) return !1;
			return !0;
		}
		negate() {
			for (let e = 0; e < this.ELEMENTS; ++e) this[e] = -this[e];
			return this.check();
		}
		lerp(e, t, n) {
			if (n === void 0) return this.lerp(this, e, t);
			for (let r = 0; r < this.ELEMENTS; ++r) {
				let i = e[r], a = typeof t == "number" ? t : t[r];
				this[r] = i + n * (a - i);
			}
			return this.check();
		}
		min(e) {
			for (let t = 0; t < this.ELEMENTS; ++t) this[t] = Math.min(e[t], this[t]);
			return this.check();
		}
		max(e) {
			for (let t = 0; t < this.ELEMENTS; ++t) this[t] = Math.max(e[t], this[t]);
			return this.check();
		}
		clamp(e, t) {
			for (let n = 0; n < this.ELEMENTS; ++n) this[n] = Math.min(Math.max(this[n], e[n]), t[n]);
			return this.check();
		}
		add(...e) {
			for (let t of e) for (let e = 0; e < this.ELEMENTS; ++e) this[e] += t[e];
			return this.check();
		}
		subtract(...e) {
			for (let t of e) for (let e = 0; e < this.ELEMENTS; ++e) this[e] -= t[e];
			return this.check();
		}
		scale(e) {
			if (typeof e == "number") for (let t = 0; t < this.ELEMENTS; ++t) this[t] *= e;
			else for (let t = 0; t < this.ELEMENTS && t < e.length; ++t) this[t] *= e[t];
			return this.check();
		}
		multiplyByScalar(e) {
			for (let t = 0; t < this.ELEMENTS; ++t) this[t] *= e;
			return this.check();
		}
		check() {
			if (H.debug && !this.validate()) throw Error(`math.gl: ${this.constructor.name} some fields set to invalid numbers'`);
			return this;
		}
		validate() {
			let e = this.length === this.ELEMENTS;
			for (let t = 0; t < this.ELEMENTS; ++t) e &&= Number.isFinite(this[t]);
			return e;
		}
		sub(e) {
			return this.subtract(e);
		}
		setScalar(e) {
			for (let t = 0; t < this.ELEMENTS; ++t) this[t] = e;
			return this.check();
		}
		addScalar(e) {
			for (let t = 0; t < this.ELEMENTS; ++t) this[t] += e;
			return this.check();
		}
		subScalar(e) {
			return this.addScalar(-e);
		}
		multiplyScalar(e) {
			for (let t = 0; t < this.ELEMENTS; ++t) this[t] *= e;
			return this.check();
		}
		divideScalar(e) {
			return this.multiplyByScalar(1 / e);
		}
		clampScalar(e, t) {
			for (let n = 0; n < this.ELEMENTS; ++n) this[n] = Math.min(Math.max(this[n], e), t);
			return this.check();
		}
		get elements() {
			return this;
		}
	};
}));
//#endregion
//#region node_modules/@math.gl/core/dist/lib/validators.js
function __(e, t) {
	if (e.length !== t) return !1;
	for (let t = 0; t < e.length; ++t) if (!Number.isFinite(e[t])) return !1;
	return !0;
}
function U(e) {
	if (!Number.isFinite(e)) throw Error(`Invalid number ${JSON.stringify(e)}`);
	return e;
}
function v_(e, t, n = "") {
	if (H.debug && !__(e, t)) throw Error(`math.gl: ${n} some fields set to invalid numbers'`);
	return e;
}
var y_ = t((() => {
	m_();
}));
//#endregion
//#region node_modules/@math.gl/core/dist/lib/assert.js
function b_(e, t) {
	if (!e) throw Error(`math.gl assertion ${t}`);
}
var x_ = t((() => {})), S_, C_ = t((() => {
	g_(), y_(), x_(), S_ = class extends h_ {
		get x() {
			return this[0];
		}
		set x(e) {
			this[0] = U(e);
		}
		get y() {
			return this[1];
		}
		set y(e) {
			this[1] = U(e);
		}
		len() {
			return Math.sqrt(this.lengthSquared());
		}
		magnitude() {
			return this.len();
		}
		lengthSquared() {
			let e = 0;
			for (let t = 0; t < this.ELEMENTS; ++t) e += this[t] * this[t];
			return e;
		}
		magnitudeSquared() {
			return this.lengthSquared();
		}
		distance(e) {
			return Math.sqrt(this.distanceSquared(e));
		}
		distanceSquared(e) {
			let t = 0;
			for (let n = 0; n < this.ELEMENTS; ++n) {
				let r = this[n] - e[n];
				t += r * r;
			}
			return U(t);
		}
		dot(e) {
			let t = 0;
			for (let n = 0; n < this.ELEMENTS; ++n) t += this[n] * e[n];
			return U(t);
		}
		normalize() {
			let e = this.magnitude();
			if (e !== 0) for (let t = 0; t < this.ELEMENTS; ++t) this[t] /= e;
			return this.check();
		}
		multiply(...e) {
			for (let t of e) for (let e = 0; e < this.ELEMENTS; ++e) this[e] *= t[e];
			return this.check();
		}
		divide(...e) {
			for (let t of e) for (let e = 0; e < this.ELEMENTS; ++e) this[e] /= t[e];
			return this.check();
		}
		lengthSq() {
			return this.lengthSquared();
		}
		distanceTo(e) {
			return this.distance(e);
		}
		distanceToSquared(e) {
			return this.distanceSquared(e);
		}
		getComponent(e) {
			return b_(e >= 0 && e < this.ELEMENTS, "index is out of range"), U(this[e]);
		}
		setComponent(e, t) {
			return b_(e >= 0 && e < this.ELEMENTS, "index is out of range"), this[e] = t, this.check();
		}
		addVectors(e, t) {
			return this.copy(e).add(t);
		}
		subVectors(e, t) {
			return this.copy(e).subtract(t);
		}
		multiplyVectors(e, t) {
			return this.copy(e).multiply(t);
		}
		addScaledVector(e, t) {
			return this.add(new this.constructor(e).multiplyScalar(t));
		}
	};
})), w_, T_ = t((() => {
	w_ = typeof Float32Array < "u" ? Float32Array : Array;
}));
//#endregion
//#region node_modules/@math.gl/core/dist/gl-matrix/vec2.js
function E_() {
	let e = new w_(2);
	return w_ != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function D_(e, t, n) {
	return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e;
}
function O_(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e;
}
function k_(e, t) {
	return e[0] = -t[0], e[1] = -t[1], e;
}
function A_(e, t, n, r) {
	let i = t[0], a = t[1];
	return e[0] = i + r * (n[0] - i), e[1] = a + r * (n[1] - a), e;
}
function j_(e, t, n) {
	let r = t[0], i = t[1];
	return e[0] = n[0] * r + n[2] * i, e[1] = n[1] * r + n[3] * i, e;
}
function M_(e, t, n) {
	let r = t[0], i = t[1];
	return e[0] = n[0] * r + n[2] * i + n[4], e[1] = n[1] * r + n[3] * i + n[5], e;
}
function N_(e, t, n) {
	let r = t[0], i = t[1];
	return e[0] = n[0] * r + n[3] * i + n[6], e[1] = n[1] * r + n[4] * i + n[7], e;
}
function P_(e, t, n) {
	let r = t[0], i = t[1];
	return e[0] = n[0] * r + n[4] * i + n[12], e[1] = n[1] * r + n[5] * i + n[13], e;
}
var F_, I_ = t((() => {
	T_(), F_ = O_, (function() {
		let e = E_();
		return function(t, n, r, i, a, o) {
			let s, c;
			for (n ||= 2, r ||= 0, c = i ? Math.min(i * n + r, t.length) : t.length, s = r; s < c; s += n) e[0] = t[s], e[1] = t[s + 1], a(e, e, o), t[s] = e[0], t[s + 1] = e[1];
			return t;
		};
	})();
}));
//#endregion
//#region node_modules/@math.gl/core/dist/lib/gl-matrix-extras.js
function L_(e, t, n) {
	let r = t[0], i = t[1], a = n[3] * r + n[7] * i || 1;
	return e[0] = (n[0] * r + n[4] * i) / a, e[1] = (n[1] * r + n[5] * i) / a, e;
}
function R_(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = n[3] * r + n[7] * i + n[11] * a || 1;
	return e[0] = (n[0] * r + n[4] * i + n[8] * a) / o, e[1] = (n[1] * r + n[5] * i + n[9] * a) / o, e[2] = (n[2] * r + n[6] * i + n[10] * a) / o, e;
}
function z_(e, t, n) {
	let r = t[0], i = t[1];
	return e[0] = n[0] * r + n[2] * i, e[1] = n[1] * r + n[3] * i, e[2] = t[2], e;
}
var B_ = t((() => {})), V_, H_ = t((() => {
	C_(), m_(), y_(), I_(), B_(), V_ = class extends S_ {
		constructor(e = 0, t = 0) {
			super(2), s_(e) && arguments.length === 1 ? this.copy(e) : (H.debug && (U(e), U(t)), this[0] = e, this[1] = t);
		}
		set(e, t) {
			return this[0] = e, this[1] = t, this.check();
		}
		copy(e) {
			return this[0] = e[0], this[1] = e[1], this.check();
		}
		fromObject(e) {
			return H.debug && (U(e.x), U(e.y)), this[0] = e.x, this[1] = e.y, this.check();
		}
		toObject(e) {
			return e.x = this[0], e.y = this[1], e;
		}
		get ELEMENTS() {
			return 2;
		}
		horizontalAngle() {
			return Math.atan2(this.y, this.x);
		}
		verticalAngle() {
			return Math.atan2(this.x, this.y);
		}
		transform(e) {
			return this.transformAsPoint(e);
		}
		transformAsPoint(e) {
			return P_(this, this, e), this.check();
		}
		transformAsVector(e) {
			return L_(this, this, e), this.check();
		}
		transformByMatrix3(e) {
			return N_(this, this, e), this.check();
		}
		transformByMatrix2x3(e) {
			return M_(this, this, e), this.check();
		}
		transformByMatrix2(e) {
			return j_(this, this, e), this.check();
		}
	};
}));
//#endregion
//#region node_modules/@math.gl/core/dist/gl-matrix/vec3.js
function U_() {
	let e = new w_(3);
	return w_ != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function W_(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e;
}
function G_(e, t) {
	return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e;
}
function K_(e, t) {
	return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function q_(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = n[0], s = n[1], c = n[2];
	return e[0] = i * c - a * s, e[1] = a * o - r * c, e[2] = r * s - i * o, e;
}
function J_(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = n[3] * r + n[7] * i + n[11] * a + n[15];
	return o ||= 1, e[0] = (n[0] * r + n[4] * i + n[8] * a + n[12]) / o, e[1] = (n[1] * r + n[5] * i + n[9] * a + n[13]) / o, e[2] = (n[2] * r + n[6] * i + n[10] * a + n[14]) / o, e;
}
function Y_(e, t, n) {
	let r = t[0], i = t[1], a = t[2];
	return e[0] = r * n[0] + i * n[3] + a * n[6], e[1] = r * n[1] + i * n[4] + a * n[7], e[2] = r * n[2] + i * n[5] + a * n[8], e;
}
function X_(e, t, n) {
	let r = n[0], i = n[1], a = n[2], o = n[3], s = t[0], c = t[1], l = t[2], u = i * l - a * c, d = a * s - r * l, f = r * c - i * s, p = i * f - a * d, m = a * u - r * f, h = r * d - i * u, g = o * 2;
	return u *= g, d *= g, f *= g, p *= 2, m *= 2, h *= 2, e[0] = s + u + p, e[1] = c + d + m, e[2] = l + f + h, e;
}
function Z_(e, t, n, r) {
	let i = [], a = [];
	return i[0] = t[0] - n[0], i[1] = t[1] - n[1], i[2] = t[2] - n[2], a[0] = i[0], a[1] = i[1] * Math.cos(r) - i[2] * Math.sin(r), a[2] = i[1] * Math.sin(r) + i[2] * Math.cos(r), e[0] = a[0] + n[0], e[1] = a[1] + n[1], e[2] = a[2] + n[2], e;
}
function Q_(e, t, n, r) {
	let i = [], a = [];
	return i[0] = t[0] - n[0], i[1] = t[1] - n[1], i[2] = t[2] - n[2], a[0] = i[2] * Math.sin(r) + i[0] * Math.cos(r), a[1] = i[1], a[2] = i[2] * Math.cos(r) - i[0] * Math.sin(r), e[0] = a[0] + n[0], e[1] = a[1] + n[1], e[2] = a[2] + n[2], e;
}
function $_(e, t, n, r) {
	let i = [], a = [];
	return i[0] = t[0] - n[0], i[1] = t[1] - n[1], i[2] = t[2] - n[2], a[0] = i[0] * Math.cos(r) - i[1] * Math.sin(r), a[1] = i[0] * Math.sin(r) + i[1] * Math.cos(r), a[2] = i[2], e[0] = a[0] + n[0], e[1] = a[1] + n[1], e[2] = a[2] + n[2], e;
}
function ev(e, t) {
	let n = e[0], r = e[1], i = e[2], a = t[0], o = t[1], s = t[2], c = Math.sqrt((n * n + r * r + i * i) * (a * a + o * o + s * s)), l = c && K_(e, t) / c;
	return Math.acos(Math.min(Math.max(l, -1), 1));
}
var tv, nv = t((() => {
	T_(), tv = W_, (function() {
		let e = U_();
		return function(t, n, r, i, a, o) {
			let s, c;
			for (n ||= 3, r ||= 0, c = i ? Math.min(i * n + r, t.length) : t.length, s = r; s < c; s += n) e[0] = t[s], e[1] = t[s + 1], e[2] = t[s + 2], a(e, e, o), t[s] = e[0], t[s + 1] = e[1], t[s + 2] = e[2];
			return t;
		};
	})();
})), rv, iv, av, ov = t((() => {
	C_(), m_(), y_(), nv(), B_(), rv = [
		0,
		0,
		0
	], av = class e extends S_ {
		static get ZERO() {
			return iv || (iv = new e(0, 0, 0), Object.freeze(iv)), iv;
		}
		constructor(e = 0, t = 0, n = 0) {
			super(-0, -0, -0), arguments.length === 1 && s_(e) ? this.copy(e) : (H.debug && (U(e), U(t), U(n)), this[0] = e, this[1] = t, this[2] = n);
		}
		set(e, t, n) {
			return this[0] = e, this[1] = t, this[2] = n, this.check();
		}
		copy(e) {
			return this[0] = e[0], this[1] = e[1], this[2] = e[2], this.check();
		}
		fromObject(e) {
			return H.debug && (U(e.x), U(e.y), U(e.z)), this[0] = e.x, this[1] = e.y, this[2] = e.z, this.check();
		}
		toObject(e) {
			return e.x = this[0], e.y = this[1], e.z = this[2], e;
		}
		get ELEMENTS() {
			return 3;
		}
		get z() {
			return this[2];
		}
		set z(e) {
			this[2] = U(e);
		}
		angle(e) {
			return ev(this, e);
		}
		cross(e) {
			return q_(this, this, e), this.check();
		}
		rotateX({ radians: e, origin: t = rv }) {
			return Z_(this, this, t, e), this.check();
		}
		rotateY({ radians: e, origin: t = rv }) {
			return Q_(this, this, t, e), this.check();
		}
		rotateZ({ radians: e, origin: t = rv }) {
			return $_(this, this, t, e), this.check();
		}
		transform(e) {
			return this.transformAsPoint(e);
		}
		transformAsPoint(e) {
			return J_(this, this, e), this.check();
		}
		transformAsVector(e) {
			return R_(this, this, e), this.check();
		}
		transformByMatrix3(e) {
			return Y_(this, this, e), this.check();
		}
		transformByMatrix2(e) {
			return z_(this, this, e), this.check();
		}
		transformByQuaternion(e) {
			return X_(this, this, e), this.check();
		}
	};
})), sv, cv = t((() => {
	g_(), y_(), m_(), sv = class extends h_ {
		toString() {
			let e = "[";
			if (H.printRowMajor) {
				e += "row-major:";
				for (let t = 0; t < this.RANK; ++t) for (let n = 0; n < this.RANK; ++n) e += ` ${this[n * this.RANK + t]}`;
			} else {
				e += "column-major:";
				for (let t = 0; t < this.ELEMENTS; ++t) e += ` ${this[t]}`;
			}
			return e += "]", e;
		}
		getElementIndex(e, t) {
			return t * this.RANK + e;
		}
		getElement(e, t) {
			return this[t * this.RANK + e];
		}
		setElement(e, t, n) {
			return this[t * this.RANK + e] = U(n), this;
		}
		getColumn(e, t = Array(this.RANK).fill(-0)) {
			let n = e * this.RANK;
			for (let e = 0; e < this.RANK; ++e) t[e] = this[n + e];
			return t;
		}
		setColumn(e, t) {
			let n = e * this.RANK;
			for (let e = 0; e < this.RANK; ++e) this[n + e] = t[e];
			return this;
		}
	};
}));
//#endregion
//#region node_modules/@math.gl/core/dist/gl-matrix/mat4.js
function lv(e) {
	return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function uv(e, t) {
	if (e === t) {
		let n = t[1], r = t[2], i = t[3], a = t[6], o = t[7], s = t[11];
		e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = r, e[9] = a, e[11] = t[14], e[12] = i, e[13] = o, e[14] = s;
	} else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
	return e;
}
function dv(e, t) {
	let n = t[0], r = t[1], i = t[2], a = t[3], o = t[4], s = t[5], c = t[6], l = t[7], u = t[8], d = t[9], f = t[10], p = t[11], m = t[12], h = t[13], g = t[14], _ = t[15], v = n * s - r * o, y = n * c - i * o, b = n * l - a * o, x = r * c - i * s, S = r * l - a * s, C = i * l - a * c, w = u * h - d * m, T = u * g - f * m, E = u * _ - p * m, ee = d * g - f * h, te = d * _ - p * h, ne = f * _ - p * g, D = v * ne - y * te + b * ee + x * E - S * T + C * w;
	return D ? (D = 1 / D, e[0] = (s * ne - c * te + l * ee) * D, e[1] = (i * te - r * ne - a * ee) * D, e[2] = (h * C - g * S + _ * x) * D, e[3] = (f * S - d * C - p * x) * D, e[4] = (c * E - o * ne - l * T) * D, e[5] = (n * ne - i * E + a * T) * D, e[6] = (g * b - m * C - _ * y) * D, e[7] = (u * C - f * b + p * y) * D, e[8] = (o * te - s * E + l * w) * D, e[9] = (r * E - n * te - a * w) * D, e[10] = (m * S - h * b + _ * v) * D, e[11] = (d * b - u * S - p * v) * D, e[12] = (s * T - o * ee - c * w) * D, e[13] = (n * ee - r * T + i * w) * D, e[14] = (h * y - m * x - g * v) * D, e[15] = (u * x - d * y + f * v) * D, e) : null;
}
function fv(e) {
	let t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = n * s - r * o, b = l * m - u * p, x = l * h - d * p, S = u * h - d * m, C = t * S - n * x + r * b, w = a * S - o * x + s * b, T = l * y - u * v + d * _, E = p * y - m * v + h * _;
	return c * C - i * w + g * T - f * E;
}
function pv(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = t[3], s = t[4], c = t[5], l = t[6], u = t[7], d = t[8], f = t[9], p = t[10], m = t[11], h = t[12], g = t[13], _ = t[14], v = t[15], y = n[0], b = n[1], x = n[2], S = n[3];
	return e[0] = y * r + b * s + x * d + S * h, e[1] = y * i + b * c + x * f + S * g, e[2] = y * a + b * l + x * p + S * _, e[3] = y * o + b * u + x * m + S * v, y = n[4], b = n[5], x = n[6], S = n[7], e[4] = y * r + b * s + x * d + S * h, e[5] = y * i + b * c + x * f + S * g, e[6] = y * a + b * l + x * p + S * _, e[7] = y * o + b * u + x * m + S * v, y = n[8], b = n[9], x = n[10], S = n[11], e[8] = y * r + b * s + x * d + S * h, e[9] = y * i + b * c + x * f + S * g, e[10] = y * a + b * l + x * p + S * _, e[11] = y * o + b * u + x * m + S * v, y = n[12], b = n[13], x = n[14], S = n[15], e[12] = y * r + b * s + x * d + S * h, e[13] = y * i + b * c + x * f + S * g, e[14] = y * a + b * l + x * p + S * _, e[15] = y * o + b * u + x * m + S * v, e;
}
function mv(e, t, n) {
	let r = n[0], i = n[1], a = n[2], o, s, c, l, u, d, f, p, m, h, g, _;
	return t === e ? (e[12] = t[0] * r + t[4] * i + t[8] * a + t[12], e[13] = t[1] * r + t[5] * i + t[9] * a + t[13], e[14] = t[2] * r + t[6] * i + t[10] * a + t[14], e[15] = t[3] * r + t[7] * i + t[11] * a + t[15]) : (o = t[0], s = t[1], c = t[2], l = t[3], u = t[4], d = t[5], f = t[6], p = t[7], m = t[8], h = t[9], g = t[10], _ = t[11], e[0] = o, e[1] = s, e[2] = c, e[3] = l, e[4] = u, e[5] = d, e[6] = f, e[7] = p, e[8] = m, e[9] = h, e[10] = g, e[11] = _, e[12] = o * r + u * i + m * a + t[12], e[13] = s * r + d * i + h * a + t[13], e[14] = c * r + f * i + g * a + t[14], e[15] = l * r + p * i + _ * a + t[15]), e;
}
function hv(e, t, n) {
	let r = n[0], i = n[1], a = n[2];
	return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * i, e[5] = t[5] * i, e[6] = t[6] * i, e[7] = t[7] * i, e[8] = t[8] * a, e[9] = t[9] * a, e[10] = t[10] * a, e[11] = t[11] * a, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function gv(e, t, n, r) {
	let i = r[0], a = r[1], o = r[2], s = Math.sqrt(i * i + a * a + o * o), c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, D, re;
	return s < 1e-6 ? null : (s = 1 / s, i *= s, a *= s, o *= s, l = Math.sin(n), c = Math.cos(n), u = 1 - c, d = t[0], f = t[1], p = t[2], m = t[3], h = t[4], g = t[5], _ = t[6], v = t[7], y = t[8], b = t[9], x = t[10], S = t[11], C = i * i * u + c, w = a * i * u + o * l, T = o * i * u - a * l, E = i * a * u - o * l, ee = a * a * u + c, te = o * a * u + i * l, ne = i * o * u + a * l, D = a * o * u - i * l, re = o * o * u + c, e[0] = d * C + h * w + y * T, e[1] = f * C + g * w + b * T, e[2] = p * C + _ * w + x * T, e[3] = m * C + v * w + S * T, e[4] = d * E + h * ee + y * te, e[5] = f * E + g * ee + b * te, e[6] = p * E + _ * ee + x * te, e[7] = m * E + v * ee + S * te, e[8] = d * ne + h * D + y * re, e[9] = f * ne + g * D + b * re, e[10] = p * ne + _ * D + x * re, e[11] = m * ne + v * D + S * re, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function _v(e, t, n) {
	let r = Math.sin(n), i = Math.cos(n), a = t[4], o = t[5], s = t[6], c = t[7], l = t[8], u = t[9], d = t[10], f = t[11];
	return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = a * i + l * r, e[5] = o * i + u * r, e[6] = s * i + d * r, e[7] = c * i + f * r, e[8] = l * i - a * r, e[9] = u * i - o * r, e[10] = d * i - s * r, e[11] = f * i - c * r, e;
}
function vv(e, t, n) {
	let r = Math.sin(n), i = Math.cos(n), a = t[0], o = t[1], s = t[2], c = t[3], l = t[8], u = t[9], d = t[10], f = t[11];
	return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = a * i - l * r, e[1] = o * i - u * r, e[2] = s * i - d * r, e[3] = c * i - f * r, e[8] = a * r + l * i, e[9] = o * r + u * i, e[10] = s * r + d * i, e[11] = c * r + f * i, e;
}
function yv(e, t, n) {
	let r = Math.sin(n), i = Math.cos(n), a = t[0], o = t[1], s = t[2], c = t[3], l = t[4], u = t[5], d = t[6], f = t[7];
	return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = a * i + l * r, e[1] = o * i + u * r, e[2] = s * i + d * r, e[3] = c * i + f * r, e[4] = l * i - a * r, e[5] = u * i - o * r, e[6] = d * i - s * r, e[7] = f * i - c * r, e;
}
function bv(e, t) {
	let n = t[0], r = t[1], i = t[2], a = t[3], o = n + n, s = r + r, c = i + i, l = n * o, u = r * o, d = r * s, f = i * o, p = i * s, m = i * c, h = a * o, g = a * s, _ = a * c;
	return e[0] = 1 - d - m, e[1] = u + _, e[2] = f - g, e[3] = 0, e[4] = u - _, e[5] = 1 - l - m, e[6] = p + h, e[7] = 0, e[8] = f + g, e[9] = p - h, e[10] = 1 - l - d, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function xv(e, t, n, r, i, a, o) {
	let s = 1 / (n - t), c = 1 / (i - r), l = 1 / (a - o);
	return e[0] = a * 2 * s, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a * 2 * c, e[6] = 0, e[7] = 0, e[8] = (n + t) * s, e[9] = (i + r) * c, e[10] = (o + a) * l, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * a * 2 * l, e[15] = 0, e;
}
function Sv(e, t, n, r, i) {
	let a = 1 / Math.tan(t / 2);
	if (e[0] = a / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, i != null && i !== Infinity) {
		let t = 1 / (r - i);
		e[10] = (i + r) * t, e[14] = 2 * i * r * t;
	} else e[10] = -1, e[14] = -2 * r;
	return e;
}
function Cv(e, t, n, r, i, a, o) {
	let s = 1 / (t - n), c = 1 / (r - i), l = 1 / (a - o);
	return e[0] = -2 * s, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * c, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * l, e[11] = 0, e[12] = (t + n) * s, e[13] = (i + r) * c, e[14] = (o + a) * l, e[15] = 1, e;
}
function wv(e, t, n, r) {
	let i, a, o, s, c, l, u, d, f, p, m = t[0], h = t[1], g = t[2], _ = r[0], v = r[1], y = r[2], b = n[0], x = n[1], S = n[2];
	return Math.abs(m - b) < 1e-6 && Math.abs(h - x) < 1e-6 && Math.abs(g - S) < 1e-6 ? lv(e) : (d = m - b, f = h - x, p = g - S, i = 1 / Math.sqrt(d * d + f * f + p * p), d *= i, f *= i, p *= i, a = v * p - y * f, o = y * d - _ * p, s = _ * f - v * d, i = Math.sqrt(a * a + o * o + s * s), i ? (i = 1 / i, a *= i, o *= i, s *= i) : (a = 0, o = 0, s = 0), c = f * s - p * o, l = p * a - d * s, u = d * o - f * a, i = Math.sqrt(c * c + l * l + u * u), i ? (i = 1 / i, c *= i, l *= i, u *= i) : (c = 0, l = 0, u = 0), e[0] = a, e[1] = c, e[2] = d, e[3] = 0, e[4] = o, e[5] = l, e[6] = f, e[7] = 0, e[8] = s, e[9] = u, e[10] = p, e[11] = 0, e[12] = -(a * m + o * h + s * g), e[13] = -(c * m + l * h + u * g), e[14] = -(d * m + f * h + p * g), e[15] = 1, e);
}
var Tv, Ev, Dv = t((() => {
	T_(), Tv = Sv, Ev = Cv;
}));
//#endregion
//#region node_modules/@math.gl/core/dist/gl-matrix/vec4.js
function Ov() {
	let e = new w_(4);
	return w_ != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function kv(e, t, n) {
	return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e;
}
function Av(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = t[3];
	return e[0] = n[0] * r + n[4] * i + n[8] * a + n[12] * o, e[1] = n[1] * r + n[5] * i + n[9] * a + n[13] * o, e[2] = n[2] * r + n[6] * i + n[10] * a + n[14] * o, e[3] = n[3] * r + n[7] * i + n[11] * a + n[15] * o, e;
}
var jv = t((() => {
	T_(), (function() {
		let e = Ov();
		return function(t, n, r, i, a, o) {
			let s, c;
			for (n ||= 4, r ||= 0, c = i ? Math.min(i * n + r, t.length) : t.length, s = r; s < c; s += n) e[0] = t[s], e[1] = t[s + 1], e[2] = t[s + 2], e[3] = t[s + 3], a(e, e, o), t[s] = e[0], t[s + 1] = e[1], t[s + 2] = e[2], t[s + 3] = e[3];
			return t;
		};
	})();
}));
//#endregion
//#region node_modules/@math.gl/core/dist/classes/matrix4.js
function Mv() {
	return Uv || (Uv = new Hv([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]), Object.freeze(Uv)), Uv;
}
function Nv() {
	return Wv || (Wv = new Hv(), Object.freeze(Wv)), Wv;
}
function Pv(e) {
	if (e > Math.PI * 2) throw Error("expected radians");
}
function Fv(e, t, n, r, i, a) {
	let o = 2 * a / (n - t), s = 2 * a / (i - r), c = (n + t) / (n - t), l = (i + r) / (i - r), u = -2 * a;
	return e[0] = o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s, e[6] = 0, e[7] = 0, e[8] = c, e[9] = l, e[10] = -1, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = u, e[15] = 0, e;
}
var Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv, Gv = t((() => {
	cv(), y_(), B_(), Dv(), I_(), nv(), jv(), (function(e) {
		e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL0ROW3 = 3] = "COL0ROW3", e[e.COL1ROW0 = 4] = "COL1ROW0", e[e.COL1ROW1 = 5] = "COL1ROW1", e[e.COL1ROW2 = 6] = "COL1ROW2", e[e.COL1ROW3 = 7] = "COL1ROW3", e[e.COL2ROW0 = 8] = "COL2ROW0", e[e.COL2ROW1 = 9] = "COL2ROW1", e[e.COL2ROW2 = 10] = "COL2ROW2", e[e.COL2ROW3 = 11] = "COL2ROW3", e[e.COL3ROW0 = 12] = "COL3ROW0", e[e.COL3ROW1 = 13] = "COL3ROW1", e[e.COL3ROW2 = 14] = "COL3ROW2", e[e.COL3ROW3 = 15] = "COL3ROW3";
	})(Iv ||= {}), Lv = 45 * Math.PI / 180, Rv = 1, zv = .1, Bv = 500, Vv = Object.freeze([
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	]), Hv = class extends sv {
		static get IDENTITY() {
			return Nv();
		}
		static get ZERO() {
			return Mv();
		}
		get ELEMENTS() {
			return 16;
		}
		get RANK() {
			return 4;
		}
		get INDICES() {
			return Iv;
		}
		constructor(e) {
			super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(e) ? this.copy(e) : this.identity();
		}
		copy(e) {
			return this[0] = e[0], this[1] = e[1], this[2] = e[2], this[3] = e[3], this[4] = e[4], this[5] = e[5], this[6] = e[6], this[7] = e[7], this[8] = e[8], this[9] = e[9], this[10] = e[10], this[11] = e[11], this[12] = e[12], this[13] = e[13], this[14] = e[14], this[15] = e[15], this.check();
		}
		set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
			return this[0] = e, this[1] = t, this[2] = n, this[3] = r, this[4] = i, this[5] = a, this[6] = o, this[7] = s, this[8] = c, this[9] = l, this[10] = u, this[11] = d, this[12] = f, this[13] = p, this[14] = m, this[15] = h, this.check();
		}
		setRowMajor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
			return this[0] = e, this[1] = i, this[2] = c, this[3] = f, this[4] = t, this[5] = a, this[6] = l, this[7] = p, this[8] = n, this[9] = o, this[10] = u, this[11] = m, this[12] = r, this[13] = s, this[14] = d, this[15] = h, this.check();
		}
		toRowMajor(e) {
			return e[0] = this[0], e[1] = this[4], e[2] = this[8], e[3] = this[12], e[4] = this[1], e[5] = this[5], e[6] = this[9], e[7] = this[13], e[8] = this[2], e[9] = this[6], e[10] = this[10], e[11] = this[14], e[12] = this[3], e[13] = this[7], e[14] = this[11], e[15] = this[15], e;
		}
		identity() {
			return this.copy(Vv);
		}
		fromObject(e) {
			return this.check();
		}
		fromQuaternion(e) {
			return bv(this, e), this.check();
		}
		frustum(e) {
			let { left: t, right: n, bottom: r, top: i, near: a = zv, far: o = Bv } = e;
			return o === Infinity ? Fv(this, t, n, r, i, a) : xv(this, t, n, r, i, a, o), this.check();
		}
		lookAt(e) {
			let { eye: t, center: n = [
				0,
				0,
				0
			], up: r = [
				0,
				1,
				0
			] } = e;
			return wv(this, t, n, r), this.check();
		}
		ortho(e) {
			let { left: t, right: n, bottom: r, top: i, near: a = zv, far: o = Bv } = e;
			return Ev(this, t, n, r, i, a, o), this.check();
		}
		orthographic(e) {
			let { fovy: t = Lv, aspect: n = Rv, focalDistance: r = 1, near: i = zv, far: a = Bv } = e;
			Pv(t);
			let o = t / 2, s = r * Math.tan(o), c = s * n;
			return this.ortho({
				left: -c,
				right: c,
				bottom: -s,
				top: s,
				near: i,
				far: a
			});
		}
		perspective(e) {
			let { fovy: t = 45 * Math.PI / 180, aspect: n = 1, near: r = .1, far: i = 500 } = e;
			return Pv(t), Tv(this, t, n, r, i), this.check();
		}
		determinant() {
			return fv(this);
		}
		getScale(e = [
			-0,
			-0,
			-0
		]) {
			return e[0] = Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]), e[1] = Math.sqrt(this[4] * this[4] + this[5] * this[5] + this[6] * this[6]), e[2] = Math.sqrt(this[8] * this[8] + this[9] * this[9] + this[10] * this[10]), e;
		}
		getTranslation(e = [
			-0,
			-0,
			-0
		]) {
			return e[0] = this[12], e[1] = this[13], e[2] = this[14], e;
		}
		getRotation(e, t) {
			e ||= [
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0
			], t ||= [
				-0,
				-0,
				-0
			];
			let n = this.getScale(t), r = 1 / n[0], i = 1 / n[1], a = 1 / n[2];
			return e[0] = this[0] * r, e[1] = this[1] * i, e[2] = this[2] * a, e[3] = 0, e[4] = this[4] * r, e[5] = this[5] * i, e[6] = this[6] * a, e[7] = 0, e[8] = this[8] * r, e[9] = this[9] * i, e[10] = this[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
		}
		getRotationMatrix3(e, t) {
			e ||= [
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0,
				-0
			], t ||= [
				-0,
				-0,
				-0
			];
			let n = this.getScale(t), r = 1 / n[0], i = 1 / n[1], a = 1 / n[2];
			return e[0] = this[0] * r, e[1] = this[1] * i, e[2] = this[2] * a, e[3] = this[4] * r, e[4] = this[5] * i, e[5] = this[6] * a, e[6] = this[8] * r, e[7] = this[9] * i, e[8] = this[10] * a, e;
		}
		transpose() {
			return uv(this, this), this.check();
		}
		invert() {
			return dv(this, this), this.check();
		}
		multiplyLeft(e) {
			return pv(this, e, this), this.check();
		}
		multiplyRight(e) {
			return pv(this, this, e), this.check();
		}
		rotateX(e) {
			return _v(this, this, e), this.check();
		}
		rotateY(e) {
			return vv(this, this, e), this.check();
		}
		rotateZ(e) {
			return yv(this, this, e), this.check();
		}
		rotateXYZ(e) {
			return this.rotateX(e[0]).rotateY(e[1]).rotateZ(e[2]);
		}
		rotateAxis(e, t) {
			return gv(this, this, e, t), this.check();
		}
		scale(e) {
			return hv(this, this, Array.isArray(e) ? e : [
				e,
				e,
				e
			]), this.check();
		}
		translate(e) {
			return mv(this, this, e), this.check();
		}
		transform(e, t) {
			return e.length === 4 ? (t = Av(t || [
				-0,
				-0,
				-0,
				-0
			], e, this), v_(t, 4), t) : this.transformAsPoint(e, t);
		}
		transformAsPoint(e, t) {
			let { length: n } = e, r;
			switch (n) {
				case 2:
					r = P_(t || [-0, -0], e, this);
					break;
				case 3:
					r = J_(t || [
						-0,
						-0,
						-0
					], e, this);
					break;
				default: throw Error("Illegal vector");
			}
			return v_(r, e.length), r;
		}
		transformAsVector(e, t) {
			let n;
			switch (e.length) {
				case 2:
					n = L_(t || [-0, -0], e, this);
					break;
				case 3:
					n = R_(t || [
						-0,
						-0,
						-0
					], e, this);
					break;
				default: throw Error("Illegal vector");
			}
			return v_(n, e.length), n;
		}
		transformPoint(e, t) {
			return this.transformAsPoint(e, t);
		}
		transformVector(e, t) {
			return this.transformAsPoint(e, t);
		}
		transformDirection(e, t) {
			return this.transformAsVector(e, t);
		}
		makeRotationX(e) {
			return this.identity().rotateX(e);
		}
		makeTranslation(e, t, n) {
			return this.identity().translate([
				e,
				t,
				n
			]);
		}
	};
})), W = t((() => {
	H_(), ov(), nv(), C_(), m_(), y_(), cv(), T_(), I_(), Gv(), g_(), jv(), Dv();
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/modules/math/fp64/fp64-utils.js
function Kv(e, t = [], n = 0) {
	let r = Math.fround(e), i = e - r;
	return t[n] = r, t[n + 1] = i, t;
}
function qv(e) {
	return e - Math.fround(e);
}
function Jv(e) {
	let t = /* @__PURE__ */ new Float32Array(32);
	for (let n = 0; n < 4; ++n) for (let r = 0; r < 4; ++r) {
		let i = n * 4 + r;
		Kv(e[r * 4 + n], t, i * 2);
	}
	return t;
}
var Yv = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/lib/color/normalize-byte-colors.js
function Xv(e, t = !0) {
	return e ?? t;
}
function Zv(e = [
	0,
	0,
	0
], t = !0) {
	return t ? e.map((e) => e / 255) : [...e];
}
function Qv(e, t = !0) {
	let n = Zv(e.slice(0, 3), t), r = Number.isFinite(e[3]), i = r ? e[3] : 1;
	return [
		n[0],
		n[1],
		n[2],
		t && r ? i / 255 : i
	];
}
var $v = t((() => {})), ey, ty, ny, ry = t((() => {
	ey = "#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND\n\n// All these functions are for substituting tan() function from Intel GPU only\nconst float TWO_PI = 6.2831854820251465;\nconst float PI_2 = 1.5707963705062866;\nconst float PI_16 = 0.1963495463132858;\n\nconst float SIN_TABLE_0 = 0.19509032368659973;\nconst float SIN_TABLE_1 = 0.3826834261417389;\nconst float SIN_TABLE_2 = 0.5555702447891235;\nconst float SIN_TABLE_3 = 0.7071067690849304;\n\nconst float COS_TABLE_0 = 0.9807852506637573;\nconst float COS_TABLE_1 = 0.9238795042037964;\nconst float COS_TABLE_2 = 0.8314695954322815;\nconst float COS_TABLE_3 = 0.7071067690849304;\n\nconst float INVERSE_FACTORIAL_3 = 1.666666716337204e-01; // 1/3!\nconst float INVERSE_FACTORIAL_5 = 8.333333767950535e-03; // 1/5!\nconst float INVERSE_FACTORIAL_7 = 1.9841270113829523e-04; // 1/7!\nconst float INVERSE_FACTORIAL_9 = 2.75573188446287533e-06; // 1/9!\n\nfloat sin_taylor_fp32(float a) {\n  float r, s, t, x;\n\n  if (a == 0.0) {\n    return 0.0;\n  }\n\n  x = -a * a;\n  s = a;\n  r = a;\n\n  r = r * x;\n  t = r * INVERSE_FACTORIAL_3;\n  s = s + t;\n\n  r = r * x;\n  t = r * INVERSE_FACTORIAL_5;\n  s = s + t;\n\n  r = r * x;\n  t = r * INVERSE_FACTORIAL_7;\n  s = s + t;\n\n  r = r * x;\n  t = r * INVERSE_FACTORIAL_9;\n  s = s + t;\n\n  return s;\n}\n\nvoid sincos_taylor_fp32(float a, out float sin_t, out float cos_t) {\n  if (a == 0.0) {\n    sin_t = 0.0;\n    cos_t = 1.0;\n  }\n  sin_t = sin_taylor_fp32(a);\n  cos_t = sqrt(1.0 - sin_t * sin_t);\n}\n\nfloat tan_taylor_fp32(float a) {\n    float sin_a;\n    float cos_a;\n\n    if (a == 0.0) {\n        return 0.0;\n    }\n\n    // 2pi range reduction\n    float z = floor(a / TWO_PI);\n    float r = a - TWO_PI * z;\n\n    float t;\n    float q = floor(r / PI_2 + 0.5);\n    int j = int(q);\n\n    if (j < -2 || j > 2) {\n        return 1.0 / 0.0;\n    }\n\n    t = r - PI_2 * q;\n\n    q = floor(t / PI_16 + 0.5);\n    int k = int(q);\n    int abs_k = int(abs(float(k)));\n\n    if (abs_k > 4) {\n        return 1.0 / 0.0;\n    } else {\n        t = t - PI_16 * q;\n    }\n\n    float u = 0.0;\n    float v = 0.0;\n\n    float sin_t, cos_t;\n    float s, c;\n    sincos_taylor_fp32(t, sin_t, cos_t);\n\n    if (k == 0) {\n        s = sin_t;\n        c = cos_t;\n    } else {\n        if (abs(float(abs_k) - 1.0) < 0.5) {\n            u = COS_TABLE_0;\n            v = SIN_TABLE_0;\n        } else if (abs(float(abs_k) - 2.0) < 0.5) {\n            u = COS_TABLE_1;\n            v = SIN_TABLE_1;\n        } else if (abs(float(abs_k) - 3.0) < 0.5) {\n            u = COS_TABLE_2;\n            v = SIN_TABLE_2;\n        } else if (abs(float(abs_k) - 4.0) < 0.5) {\n            u = COS_TABLE_3;\n            v = SIN_TABLE_3;\n        }\n        if (k > 0) {\n            s = u * sin_t + v * cos_t;\n            c = u * cos_t - v * sin_t;\n        } else {\n            s = u * sin_t - v * cos_t;\n            c = u * cos_t + v * sin_t;\n        }\n    }\n\n    if (j == 0) {\n        sin_a = s;\n        cos_a = c;\n    } else if (j == 1) {\n        sin_a = c;\n        cos_a = -s;\n    } else if (j == -1) {\n        sin_a = -c;\n        cos_a = s;\n    } else {\n        sin_a = -s;\n        cos_a = -c;\n    }\n    return sin_a / cos_a;\n}\n#endif\n\nfloat tan_fp32(float a) {\n#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND\n  return tan_taylor_fp32(a);\n#else\n  return tan(a);\n#endif\n}\n", ty = "#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND\nconst FP32_TWO_PI: f32 = 6.2831854820251465;\nconst FP32_PI_2: f32 = 1.5707963705062866;\nconst FP32_PI_16: f32 = 0.1963495463132858;\n\nconst FP32_SIN_TABLE_0: f32 = 0.19509032368659973;\nconst FP32_SIN_TABLE_1: f32 = 0.3826834261417389;\nconst FP32_SIN_TABLE_2: f32 = 0.5555702447891235;\nconst FP32_SIN_TABLE_3: f32 = 0.7071067690849304;\n\nconst FP32_COS_TABLE_0: f32 = 0.9807852506637573;\nconst FP32_COS_TABLE_1: f32 = 0.9238795042037964;\nconst FP32_COS_TABLE_2: f32 = 0.8314695954322815;\nconst FP32_COS_TABLE_3: f32 = 0.7071067690849304;\n\nconst FP32_INVERSE_FACTORIAL_3: f32 = 1.666666716337204e-01;\nconst FP32_INVERSE_FACTORIAL_5: f32 = 8.333333767950535e-03;\nconst FP32_INVERSE_FACTORIAL_7: f32 = 1.9841270113829523e-04;\nconst FP32_INVERSE_FACTORIAL_9: f32 = 2.75573188446287533e-06;\nconst FP32_OVERFLOW: f32 = 3.402823466e+38;\n\nfn sin_taylor_fp32(a: f32) -> f32 {\n  if (a == 0.0) {\n    return 0.0;\n  }\n\n  let x = -a * a;\n  var sum = a;\n  var term = a;\n\n  term = term * x;\n  sum = sum + term * FP32_INVERSE_FACTORIAL_3;\n  term = term * x;\n  sum = sum + term * FP32_INVERSE_FACTORIAL_5;\n  term = term * x;\n  sum = sum + term * FP32_INVERSE_FACTORIAL_7;\n  term = term * x;\n  sum = sum + term * FP32_INVERSE_FACTORIAL_9;\n\n  return sum;\n}\n\nfn tan_taylor_fp32(a: f32) -> f32 {\n  if (a == 0.0) {\n    return 0.0;\n  }\n\n  let z = floor(a / FP32_TWO_PI);\n  let reduced = a - FP32_TWO_PI * z;\n\n  var quadrantValue = floor(reduced / FP32_PI_2 + 0.5);\n  let quadrant = i32(quadrantValue);\n  if (quadrant < -2 || quadrant > 2) {\n    return FP32_OVERFLOW;\n  }\n\n  var angle = reduced - FP32_PI_2 * quadrantValue;\n  quadrantValue = floor(angle / FP32_PI_16 + 0.5);\n  let tableIndex = i32(quadrantValue);\n  let absoluteTableIndex = abs(tableIndex);\n  if (absoluteTableIndex > 4) {\n    return FP32_OVERFLOW;\n  }\n\n  angle = angle - FP32_PI_16 * quadrantValue;\n  let sinAngle = sin_taylor_fp32(angle);\n  let cosAngle = sqrt(1.0 - sinAngle * sinAngle);\n\n  var tableCos = 0.0;\n  var tableSin = 0.0;\n  if (absoluteTableIndex == 1) {\n    tableCos = FP32_COS_TABLE_0;\n    tableSin = FP32_SIN_TABLE_0;\n  } else if (absoluteTableIndex == 2) {\n    tableCos = FP32_COS_TABLE_1;\n    tableSin = FP32_SIN_TABLE_1;\n  } else if (absoluteTableIndex == 3) {\n    tableCos = FP32_COS_TABLE_2;\n    tableSin = FP32_SIN_TABLE_2;\n  } else if (absoluteTableIndex == 4) {\n    tableCos = FP32_COS_TABLE_3;\n    tableSin = FP32_SIN_TABLE_3;\n  }\n\n  var sinReduced = sinAngle;\n  var cosReduced = cosAngle;\n  if (tableIndex > 0) {\n    sinReduced = tableCos * sinAngle + tableSin * cosAngle;\n    cosReduced = tableCos * cosAngle - tableSin * sinAngle;\n  } else if (tableIndex < 0) {\n    sinReduced = tableCos * sinAngle - tableSin * cosAngle;\n    cosReduced = tableCos * cosAngle + tableSin * sinAngle;\n  }\n\n  var sinValue = 0.0;\n  var cosValue = 0.0;\n  if (quadrant == 0) {\n    sinValue = sinReduced;\n    cosValue = cosReduced;\n  } else if (quadrant == 1) {\n    sinValue = cosReduced;\n    cosValue = -sinReduced;\n  } else if (quadrant == -1) {\n    sinValue = -cosReduced;\n    cosValue = sinReduced;\n  } else {\n    sinValue = -sinReduced;\n    cosValue = -cosReduced;\n  }\n\n  return sinValue / cosValue;\n}\n\nfn tan_fp32(a: f32) -> f32 {\n  return tan_taylor_fp32(a);\n}\n#else\nfn tan_fp32(a: f32) -> f32 {\n  return tan(a);\n}\n#endif\n", ny = {
		name: "fp32",
		source: ty,
		vs: ey
	};
})), iy, ay = t((() => {
	iy = "\nlayout(std140) uniform fp64arithmeticUniforms {\n  uniform float ONE;\n  uniform float SPLIT;\n} fp64;\n\n/*\nAbout LUMA_FP64_CODE_ELIMINATION_WORKAROUND\n\nThe purpose of this workaround is to prevent shader compilers from\noptimizing away necessary arithmetic operations by swapping their sequences\nor transform the equation to some 'equivalent' form.\n\nThese helpers implement Dekker/Veltkamp-style error tracking. If the compiler\nfolds constants or reassociates the arithmetic, the high/low split can stop\ntracking the rounding error correctly. That failure mode tends to look fine in\nsimple coordinate setup, but then breaks down inside iterative arithmetic such\nas fp64 Mandelbrot loops.\n\nThe method is to multiply an artifical variable, ONE, which will be known to\nthe compiler to be 1 only at runtime. The whole expression is then represented\nas a polynomial with respective to ONE. In the coefficients of all terms, only one a\nand one b should appear\n\nerr = (a + b) * ONE^6 - a * ONE^5 - (a + b) * ONE^4 + a * ONE^3 - b - (a + b) * ONE^2 + a * ONE\n*/\n\nfloat prevent_fp64_optimization(float value) {\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  return value + fp64.ONE * 0.0;\n#else\n  return value;\n#endif\n}\n\n// Divide float number to high and low floats to extend fraction bits\nvec2 split(float a) {\n  // Keep SPLIT as a runtime uniform so the compiler cannot fold the Dekker\n  // split into a constant expression and reassociate the recovery steps.\n  float split = prevent_fp64_optimization(fp64.SPLIT);\n  float t = prevent_fp64_optimization(a * split);\n  float temp = t - a;\n  float a_hi = t - temp;\n  float a_lo = a - a_hi;\n  return vec2(a_hi, a_lo);\n}\n\n// Divide float number again when high float uses too many fraction bits\nvec2 split2(vec2 a) {\n  vec2 b = split(a.x);\n  b.y += a.y;\n  return b;\n}\n\n// Special sum operation when a > b\nvec2 quickTwoSum(float a, float b) {\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  float sum = (a + b) * fp64.ONE;\n  float err = b - (sum - a) * fp64.ONE;\n#else\n  float sum = a + b;\n  float err = b - (sum - a);\n#endif\n  return vec2(sum, err);\n}\n\n// General sum operation\nvec2 twoSum(float a, float b) {\n  float s = (a + b);\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  float v = (s * fp64.ONE - a) * fp64.ONE;\n  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE + (b - v);\n#else\n  float v = s - a;\n  float err = (a - (s - v)) + (b - v);\n#endif\n  return vec2(s, err);\n}\n\nvec2 twoSub(float a, float b) {\n  float s = (a - b);\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  float v = (s * fp64.ONE - a) * fp64.ONE;\n  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE - (b + v);\n#else\n  float v = s - a;\n  float err = (a - (s - v)) - (b + v);\n#endif\n  return vec2(s, err);\n}\n\nvec2 twoSqr(float a) {\n  float prod = a * a;\n  vec2 a_fp64 = split(a);\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  float err = ((a_fp64.x * a_fp64.x - prod) * fp64.ONE + 2.0 * a_fp64.x *\n    a_fp64.y * fp64.ONE * fp64.ONE) + a_fp64.y * a_fp64.y * fp64.ONE * fp64.ONE * fp64.ONE;\n#else\n  float err = ((a_fp64.x * a_fp64.x - prod) + 2.0 * a_fp64.x * a_fp64.y) + a_fp64.y * a_fp64.y;\n#endif\n  return vec2(prod, err);\n}\n\nvec2 twoProd(float a, float b) {\n  float prod = a * b;\n  vec2 a_fp64 = split(a);\n  vec2 b_fp64 = split(b);\n  // twoProd is especially sensitive because mul_fp64 and div_fp64 both depend\n  // on the split terms and cross terms staying in the original evaluation\n  // order. If the compiler folds or reassociates them, the low part tends to\n  // collapse to zero or NaN on some drivers.\n  float highProduct = prevent_fp64_optimization(a_fp64.x * b_fp64.x);\n  float crossProduct1 = prevent_fp64_optimization(a_fp64.x * b_fp64.y);\n  float crossProduct2 = prevent_fp64_optimization(a_fp64.y * b_fp64.x);\n  float lowProduct = prevent_fp64_optimization(a_fp64.y * b_fp64.y);\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  float err1 = (highProduct - prod) * fp64.ONE;\n  float err2 = crossProduct1 * fp64.ONE * fp64.ONE;\n  float err3 = crossProduct2 * fp64.ONE * fp64.ONE * fp64.ONE;\n  float err4 = lowProduct * fp64.ONE * fp64.ONE * fp64.ONE * fp64.ONE;\n#else\n  float err1 = highProduct - prod;\n  float err2 = crossProduct1;\n  float err3 = crossProduct2;\n  float err4 = lowProduct;\n#endif\n  float err = ((err1 + err2) + err3) + err4;\n  return vec2(prod, err);\n}\n\nvec2 sum_fp64(vec2 a, vec2 b) {\n  vec2 s, t;\n  s = twoSum(a.x, b.x);\n  t = twoSum(a.y, b.y);\n  s.y += t.x;\n  s = quickTwoSum(s.x, s.y);\n  s.y += t.y;\n  s = quickTwoSum(s.x, s.y);\n  return s;\n}\n\nvec2 sub_fp64(vec2 a, vec2 b) {\n  vec2 s, t;\n  s = twoSub(a.x, b.x);\n  t = twoSub(a.y, b.y);\n  s.y += t.x;\n  s = quickTwoSum(s.x, s.y);\n  s.y += t.y;\n  s = quickTwoSum(s.x, s.y);\n  return s;\n}\n\nvec2 mul_fp64(vec2 a, vec2 b) {\n  vec2 prod = twoProd(a.x, b.x);\n  // y component is for the error\n  prod.y += a.x * b.y;\n#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)\n  prod = split2(prod);\n#endif\n  prod = quickTwoSum(prod.x, prod.y);\n  prod.y += a.y * b.x;\n#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)\n  prod = split2(prod);\n#endif\n  prod = quickTwoSum(prod.x, prod.y);\n  return prod;\n}\n\nvec2 div_fp64(vec2 a, vec2 b) {\n  float xn = 1.0 / b.x;\n#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)\n  vec2 yn = mul_fp64(a, vec2(xn, 0));\n#else\n  vec2 yn = a * xn;\n#endif\n  float diff = (sub_fp64(a, mul_fp64(b, yn))).x;\n  vec2 prod = twoProd(xn, diff);\n  return sum_fp64(yn, prod);\n}\n\nvec2 sqrt_fp64(vec2 a) {\n  if (a.x == 0.0 && a.y == 0.0) return vec2(0.0, 0.0);\n  if (a.x < 0.0) return vec2(0.0 / 0.0, 0.0 / 0.0);\n\n  float x = 1.0 / sqrt(a.x);\n  float yn = a.x * x;\n#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)\n  vec2 yn_sqr = twoSqr(yn) * fp64.ONE;\n#else\n  vec2 yn_sqr = twoSqr(yn);\n#endif\n  float diff = sub_fp64(a, yn_sqr).x;\n  vec2 prod = twoProd(x * 0.5, diff);\n#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)\n  return sum_fp64(split(yn), prod);\n#else\n  return sum_fp64(vec2(yn, 0.0), prod);\n#endif\n}\n";
})), oy, sy = t((() => {
	oy = "struct Fp64F32Bits {\n  sign: u32,\n  baseExponent: i32,\n  significand: u32,\n  isZero: bool,\n  isInf: bool,\n  isNan: bool,\n};\n\n// Decode an f32 as (-1)^sign * significand * 2^baseExponent.\nfn fp64_decode_f32_bits(bits: u32) -> Fp64F32Bits {\n  let sign = bits >> 31u;\n  let exponentBits = (bits >> 23u) & 0xffu;\n  let fraction = bits & 0x7fffffu;\n\n  if (exponentBits == 0xffu) {\n    return Fp64F32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);\n  }\n  if (exponentBits == 0u) {\n    return Fp64F32Bits(sign, -149, fraction, fraction == 0u, false, false);\n  }\n  return Fp64F32Bits(sign, i32(exponentBits) - 150, 0x800000u | fraction, false, false, false);\n}\n\nfn fp64_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {\n  let aMagnitude = aBits & 0x7fffffffu;\n  let bMagnitude = bBits & 0x7fffffffu;\n  if (aMagnitude == bMagnitude) {\n    return 0;\n  }\n  return select(-1, 1, aMagnitude > bMagnitude);\n}\n\nfn fp64_make_residual_f32_bits(\n  exactSign: u32,\n  exactMagnitude: vec2u,\n  exactBaseExponent: i32,\n  highBits: u32\n) -> u32 {\n  if (fp64_u64_is_zero(exactMagnitude)) {\n    return 0u;\n  }\n\n  let high = fp64_decode_f32_bits(highBits);\n  if (high.isInf || high.isNan) {\n    return exactSign << 31u;\n  }\n  if (high.isZero) {\n    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);\n  }\n\n  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);\n  let exactShift = exactBaseExponent - commonBaseExponent;\n  let highShift = high.baseExponent - commonBaseExponent;\n\n  // A normal two-sum/two-product residual never needs a shift this large.\n  // This guard gives deterministic underflow behavior outside that contract.\n  if (exactShift >= 64 || highShift >= 64) {\n    return exactSign << 31u;\n  }\n\n  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));\n  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));\n  let comparison = fp64_u64_compare(exactAligned, highAligned);\n  if (comparison == 0) {\n    return 0u;\n  }\n\n  var residualSign = exactSign;\n  var residualMagnitude: vec2u;\n  if (comparison > 0) {\n    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);\n  } else {\n    residualSign = exactSign ^ 1u;\n    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);\n  }\n  return fp64_make_f32_bits_from_u64(\n    residualSign,\n    residualMagnitude,\n    commonBaseExponent\n  );\n}\n\nfn fp64_split_accumulator_bits(\n  sign: u32,\n  magnitude: vec2u,\n  baseExponent: i32\n) -> vec2u {\n  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);\n  let lowBits = fp64_make_residual_f32_bits(sign, magnitude, baseExponent, highBits);\n  return vec2u(highBits, lowBits);\n}\n\nfn fp64_two_sum_integer_bits(aBits: u32, bBits: u32) -> vec2u {\n  let a = fp64_decode_f32_bits(aBits);\n  let b = fp64_decode_f32_bits(bBits);\n\n  if (a.isNan || b.isNan) {\n    return vec2u(0x7fc00000u, 0u);\n  }\n  if (a.isInf || b.isInf) {\n    if (a.isInf && b.isInf && a.sign != b.sign) {\n      return vec2u(0x7fc00000u, 0u);\n    }\n    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);\n  }\n  if (a.isZero && b.isZero) {\n    return vec2u((a.sign & b.sign) << 31u, 0u);\n  }\n  if (a.isZero) {\n    return vec2u(bBits, 0u);\n  }\n  if (b.isZero) {\n    return vec2u(aBits, 0u);\n  }\n\n  let exponentDifference = select(\n    b.baseExponent - a.baseExponent,\n    a.baseExponent - b.baseExponent,\n    a.baseExponent >= b.baseExponent\n  );\n\n  // Beyond half an ulp, rounding cannot change the larger operand. Returning\n  // the smaller operand intact also avoids an unbounded integer alignment.\n  // At a power-of-two boundary the spacing below the larger operand is half\n  // the spacing above it, so an opposite-sign gap-25 operand can still change\n  // the rounded high limb. Gap 26 is the first universally safe early-out.\n  if (exponentDifference > 25) {\n    if (fp64_f32_magnitude_compare(aBits, bBits) >= 0) {\n      return vec2u(aBits, bBits);\n    }\n    return vec2u(bBits, aBits);\n  }\n\n  let commonBaseExponent = min(a.baseExponent, b.baseExponent);\n  let aMagnitude = fp64_u64_shift_left(\n    vec2u(0u, a.significand),\n    u32(a.baseExponent - commonBaseExponent)\n  );\n  let bMagnitude = fp64_u64_shift_left(\n    vec2u(0u, b.significand),\n    u32(b.baseExponent - commonBaseExponent)\n  );\n\n  var resultSign = a.sign;\n  var resultMagnitude: vec2u;\n  if (a.sign == b.sign) {\n    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);\n  } else {\n    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);\n    if (comparison == 0) {\n      return vec2u(0u, 0u);\n    }\n    if (comparison > 0) {\n      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);\n    } else {\n      resultSign = b.sign;\n      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);\n    }\n  }\n\n  return fp64_split_accumulator_bits(resultSign, resultMagnitude, commonBaseExponent);\n}\n\nfn fp64_two_sum_integer(a: f32, b: f32) -> vec2f {\n  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bitcast<u32>(b));\n  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));\n}\n\nfn fp64_multiply_significands(a: u32, b: u32) -> vec2u {\n  let aLow = a & 0xffffu;\n  let aHigh = a >> 16u;\n  let bLow = b & 0xffffu;\n  let bHigh = b >> 16u;\n  let lowProduct = aLow * bLow;\n  let crossProduct = aLow * bHigh + aHigh * bLow;\n  let highProduct = aHigh * bHigh;\n\n  var result = vec2u(0u, lowProduct);\n  result = fp64_u64_add(\n    result,\n    fp64_u64_shift_left(vec2u(0u, crossProduct), 16u)\n  );\n  result = fp64_u64_add(result, vec2u(highProduct, 0u));\n  return result;\n}\n\nfn fp64_two_prod_integer_bits(aBits: u32, bBits: u32) -> vec2u {\n  let a = fp64_decode_f32_bits(aBits);\n  let b = fp64_decode_f32_bits(bBits);\n  let resultSign = a.sign ^ b.sign;\n\n  if (a.isNan || b.isNan || ((a.isZero || b.isZero) && (a.isInf || b.isInf))) {\n    return vec2u(0x7fc00000u, 0u);\n  }\n  if (a.isInf || b.isInf) {\n    return vec2u((resultSign << 31u) | 0x7f800000u, resultSign << 31u);\n  }\n  if (a.isZero || b.isZero) {\n    return vec2u(resultSign << 31u, resultSign << 31u);\n  }\n\n  let magnitude = fp64_multiply_significands(a.significand, b.significand);\n  return fp64_split_accumulator_bits(\n    resultSign,\n    magnitude,\n    a.baseExponent + b.baseExponent\n  );\n}\n\nfn fp64_two_prod_integer(a: f32, b: f32) -> vec2f {\n  let resultBits = fp64_two_prod_integer_bits(bitcast<u32>(a), bitcast<u32>(b));\n  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));\n}\n\nfn fp64_round_add_integer(a: f32, b: f32) -> f32 {\n  return fp64_two_sum_integer(a, b).x;\n}\n\nfn fp64_round_mul_integer(a: f32, b: f32) -> f32 {\n  return fp64_two_prod_integer(a, b).x;\n}\n\n#ifndef LUMA_FP64_PREDICATE_ONLY\nfn fp64_f32_finite_exponent(value: Fp64F32Bits) -> i32 {\n  let mostSignificantBit = 31u - countLeadingZeros(value.significand);\n  return value.baseExponent + i32(mostSignificantBit);\n}\n\nfn fp64_scale_f32_integer(value: f32, exponent: i32) -> f32 {\n  let decoded = fp64_decode_f32_bits(bitcast<u32>(value));\n  if (decoded.isZero || decoded.isInf || decoded.isNan) {\n    return value;\n  }\n  let resultBits = fp64_make_f32_bits_from_u64(\n    decoded.sign,\n    vec2u(0u, decoded.significand),\n    decoded.baseExponent + exponent\n  );\n  return bitcast<f32>(resultBits);\n}\n\n// Divide normalized significands so the hardware operation cannot overflow,\n// underflow, or flush a subnormal result. Reapply the exponent with integer\n// packing, which also produces subnormal correction limbs without relying on\n// floating-point arithmetic to preserve them.\nfn fp64_divide_f32_integer(aValue: f32, bValue: f32) -> f32 {\n  let a = fp64_decode_f32_bits(bitcast<u32>(aValue));\n  let b = fp64_decode_f32_bits(bitcast<u32>(bValue));\n  if (a.isZero || b.isZero || a.isInf || b.isInf || a.isNan || b.isNan) {\n    return aValue / bValue;\n  }\n\n  let aMostSignificantBit = 31u - countLeadingZeros(a.significand);\n  let bMostSignificantBit = 31u - countLeadingZeros(b.significand);\n  let normalizedABits = fp64_make_f32_bits_from_u64(\n    a.sign,\n    vec2u(0u, a.significand),\n    -i32(aMostSignificantBit)\n  );\n  let normalizedBBits = fp64_make_f32_bits_from_u64(\n    b.sign,\n    vec2u(0u, b.significand),\n    -i32(bMostSignificantBit)\n  );\n  let normalizedQuotient = bitcast<f32>(normalizedABits) / bitcast<f32>(normalizedBBits);\n  let quotient = fp64_decode_f32_bits(bitcast<u32>(normalizedQuotient));\n  let exponentShift =\n    a.baseExponent + i32(aMostSignificantBit) -\n    b.baseExponent - i32(bMostSignificantBit);\n  let quotientBits = fp64_make_f32_bits_from_u64(\n    quotient.sign,\n    vec2u(0u, quotient.significand),\n    quotient.baseExponent + exponentShift\n  );\n  return bitcast<f32>(quotientBits);\n}\n#endif\n\n#ifndef LUMA_FP64_PREDICATE_ONLY\nfn split(a: f32) -> vec2f {\n  let aBits = bitcast<u32>(a);\n  let decoded = fp64_decode_f32_bits(aBits);\n  if (decoded.isZero || decoded.isInf || decoded.isNan) {\n    return vec2f(a, 0.0);\n  }\n\n  var roundedHigh = decoded.significand >> 12u;\n  let remainder = decoded.significand & 0xfffu;\n  if (remainder > 0x800u || (remainder == 0x800u && (roundedHigh & 1u) == 1u)) {\n    roundedHigh = roundedHigh + 1u;\n  }\n  var highMagnitude = vec2u(0u, roundedHigh << 12u);\n  var highBits = fp64_make_f32_bits_from_u64(\n    decoded.sign,\n    highMagnitude,\n    decoded.baseExponent\n  );\n  // Rounding the high limb of a maximum-exponent value can overflow even\n  // though the original value is finite. Truncate only in that boundary case\n  // so split remains an exact finite decomposition.\n  if (fp64_decode_f32_bits(highBits).isInf) {\n    roundedHigh = decoded.significand >> 12u;\n    highMagnitude = vec2u(0u, roundedHigh << 12u);\n    highBits = fp64_make_f32_bits_from_u64(\n      decoded.sign,\n      highMagnitude,\n      decoded.baseExponent\n    );\n  }\n  let lowBits = fp64_make_residual_f32_bits(\n    decoded.sign,\n    vec2u(0u, decoded.significand),\n    decoded.baseExponent,\n    highBits\n  );\n  return vec2f(bitcast<f32>(highBits), bitcast<f32>(lowBits));\n}\n\nfn split2(a: vec2f) -> vec2f {\n  var result = split(a.x);\n  result.y = fp64_round_add_integer(result.y, a.y);\n  return result;\n}\n#endif\n\n#ifndef LUMA_FP64_PREDICATE_ONLY\nfn quickTwoSum(a: f32, b: f32) -> vec2f {\n  return fp64_two_sum_integer(a, b);\n}\n#endif\n\nfn twoSum(a: f32, b: f32) -> vec2f {\n  return fp64_two_sum_integer(a, b);\n}\n\nfn twoSub(a: f32, b: f32) -> vec2f {\n  let bBits = bitcast<u32>(b) ^ 0x80000000u;\n  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bBits);\n  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));\n}\n\n#ifndef LUMA_FP64_PREDICATE_ONLY\nfn twoSqr(a: f32) -> vec2f {\n  return fp64_two_prod_integer(a, a);\n}\n\nfn twoProd(a: f32, b: f32) -> vec2f {\n  return fp64_two_prod_integer(a, b);\n}\n#endif\n\nfn sum_fp64(a: vec2f, b: vec2f) -> vec2f {\n  var sum = fp64_two_sum_integer(a.x, b.x);\n  let lowSum = fp64_two_sum_integer(a.y, b.y);\n  sum.y = fp64_round_add_integer(sum.y, lowSum.x);\n  sum = fp64_two_sum_integer(sum.x, sum.y);\n  sum.y = fp64_round_add_integer(sum.y, lowSum.y);\n  return fp64_two_sum_integer(sum.x, sum.y);\n}\n\nfn sub_fp64(a: vec2f, b: vec2f) -> vec2f {\n  let negatedB = vec2f(\n    bitcast<f32>(bitcast<u32>(b.x) ^ 0x80000000u),\n    bitcast<f32>(bitcast<u32>(b.y) ^ 0x80000000u)\n  );\n  return sum_fp64(a, negatedB);\n}\n\nfn mul_fp64(a: vec2f, b: vec2f) -> vec2f {\n  var product = fp64_two_prod_integer(a.x, b.x);\n  let crossProduct1 = fp64_round_mul_integer(a.x, b.y);\n  product.y = fp64_round_add_integer(product.y, crossProduct1);\n  product = fp64_two_sum_integer(product.x, product.y);\n  let crossProduct2 = fp64_round_mul_integer(a.y, b.x);\n  product.y = fp64_round_add_integer(product.y, crossProduct2);\n  return fp64_two_sum_integer(product.x, product.y);\n}\n\n#ifndef LUMA_FP64_PREDICATE_ONLY\nfn fp64_scale_fp64_integer(value: vec2f, exponent: i32) -> vec2f {\n  let high = fp64_scale_f32_integer(value.x, exponent);\n  let low = fp64_scale_f32_integer(value.y, exponent);\n  return sum_fp64(vec2f(high, 0.0), vec2f(low, 0.0));\n}\n\nfn fp64_div_fp64_normalized(a: vec2f, b: vec2f) -> vec2f {\n  let quotientHigh = fp64_divide_f32_integer(a.x, b.x);\n  var quotient = vec2f(quotientHigh, 0.0);\n\n  let remainder = sub_fp64(a, mul_fp64(b, quotient));\n  let quotientLow = fp64_divide_f32_integer(remainder.x, b.x);\n  quotient = sum_fp64(quotient, vec2f(quotientLow, 0.0));\n\n  let secondRemainder = sub_fp64(a, mul_fp64(b, quotient));\n  let correction = fp64_divide_f32_integer(secondRemainder.x, b.x);\n  return sum_fp64(quotient, vec2f(correction, 0.0));\n}\n\nfn div_fp64(a: vec2f, b: vec2f) -> vec2f {\n  let decodedA = fp64_decode_f32_bits(bitcast<u32>(a.x));\n  let decodedB = fp64_decode_f32_bits(bitcast<u32>(b.x));\n  if (\n    decodedA.isZero || decodedB.isZero ||\n    decodedA.isInf || decodedB.isInf ||\n    decodedA.isNan || decodedB.isNan\n  ) {\n    return fp64_div_fp64_normalized(a, b);\n  }\n\n  let exponentA = fp64_f32_finite_exponent(decodedA);\n  let exponentB = fp64_f32_finite_exponent(decodedB);\n  // Correct the quotient near unity so b * q and the remainder stay clear of\n  // both f32 underflow and overflow. The exponent difference is applied once.\n  let normalizedA = fp64_scale_fp64_integer(a, -exponentA);\n  let normalizedB = fp64_scale_fp64_integer(b, -exponentB);\n  let normalizedQuotient = fp64_div_fp64_normalized(normalizedA, normalizedB);\n  return fp64_scale_fp64_integer(normalizedQuotient, exponentA - exponentB);\n}\n\nfn fp64_sqrt_fp64_normalized(a: vec2f) -> vec2f {\n  let estimate = sqrt(a.x);\n  let difference = sub_fp64(a, fp64_two_prod_integer(estimate, estimate)).x;\n  let denominator = fp64_round_add_integer(estimate, estimate);\n  let correction = fp64_divide_f32_integer(difference, denominator);\n  return sum_fp64(vec2f(estimate, 0.0), vec2f(correction, 0.0));\n}\n\nfn sqrt_fp64(a: vec2f) -> vec2f {\n  let decoded = fp64_decode_f32_bits(bitcast<u32>(a.x));\n  let decodedLow = fp64_decode_f32_bits(bitcast<u32>(a.y));\n  if (decoded.isZero && decodedLow.isZero) {\n    return vec2f(0.0, 0.0);\n  }\n  if (decoded.sign == 1u) {\n    let nanValue = fp64_nan(a.x);\n    return vec2f(nanValue, nanValue);\n  }\n\n  if (decoded.isInf || decoded.isNan) {\n    return fp64_sqrt_fp64_normalized(a);\n  }\n  let exponent = fp64_f32_finite_exponent(decoded);\n  // An even scale lets the final square-root rescale use an integer exponent.\n  let evenExponent = exponent - (exponent & 1);\n  let normalizedA = fp64_scale_fp64_integer(a, -evenExponent);\n  let normalizedRoot = fp64_sqrt_fp64_normalized(normalizedA);\n  return fp64_scale_fp64_integer(normalizedRoot, evenExponent / 2);\n}\n#endif\n";
})), cy, ly = t((() => {
	sy(), cy = `\
struct Fp64ArithmeticUniforms {
  ONE: f32,
  SPLIT: f32,
};

@group(0) @binding(auto) var<uniform> fp64arithmetic : Fp64ArithmeticUniforms;

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64Bits {
  sign: u32,
  exponent: i32,
  significand: vec2u,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_nan(seed: f32) -> f32 {
  let nanBits = 0x7fc00000u | select(0u, 1u, seed < 0.0);
  return bitcast<f32>(nanBits);
}
#endif

fn fp64_u64_is_zero(value: vec2u) -> bool {
  return value.x == 0u && value.y == 0u;
}

fn fp64_u64_compare(a: vec2u, b: vec2u) -> i32 {
  if (a.x != b.x) {
    return select(-1, 1, a.x > b.x);
  }
  if (a.y != b.y) {
    return select(-1, 1, a.y > b.y);
  }
  return 0;
}

fn fp64_u64_add(a: vec2u, b: vec2u) -> vec2u {
  let low = a.y + b.y;
  let carry = select(0u, 1u, low < a.y);
  return vec2u(a.x + b.x + carry, low);
}

fn fp64_u64_sub(a: vec2u, b: vec2u) -> vec2u {
  let borrow = select(0u, 1u, a.y < b.y);
  return vec2u(a.x - b.x - borrow, a.y - b.y);
}

fn fp64_u64_shift_left(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u((value.x << shift) | (value.y >> (32u - shift)), value.y << shift);
  }
  if (shift == 32u) {
    return vec2u(value.y, 0u);
  }
  if (shift < 64u) {
    return vec2u(value.y << (shift - 32u), 0u);
  }
  return vec2u(0u);
}

fn fp64_u64_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u(value.x >> shift, (value.y >> shift) | (value.x << (32u - shift)));
  }
  if (shift == 32u) {
    return vec2u(0u, value.x);
  }
  if (shift < 64u) {
    return vec2u(0u, value.x >> (shift - 32u));
  }
  return vec2u(0u);
}

fn fp64_u64_get_bit(value: vec2u, bitIndex: u32) -> bool {
  if (bitIndex >= 64u) {
    return false;
  }
  if (bitIndex >= 32u) {
    return ((value.x >> (bitIndex - 32u)) & 1u) != 0u;
  }
  return ((value.y >> bitIndex) & 1u) != 0u;
}

fn fp64_u64_has_bits_below(value: vec2u, bitCount: u32) -> bool {
  if (bitCount == 0u) {
    return false;
  }
  if (bitCount >= 64u) {
    return !fp64_u64_is_zero(value);
  }
  if (bitCount > 32u) {
    let highBitCount = bitCount - 32u;
    let highMask = (1u << highBitCount) - 1u;
    return value.y != 0u || (value.x & highMask) != 0u;
  }
  if (bitCount == 32u) {
    return value.y != 0u;
  }
  let lowMask = (1u << bitCount) - 1u;
  return (value.y & lowMask) != 0u;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_u64_shift_right_sticky(value: vec2u, shift: u32) -> vec2u {
  var shifted = fp64_u64_shift_right(value, shift);
  if (fp64_u64_has_bits_below(value, shift)) {
    shifted.y = shifted.y | 1u;
  }
  return shifted;
}
#endif

fn fp64_u64_count_leading_zeros(value: vec2u) -> u32 {
  if (value.x != 0u) {
    return countLeadingZeros(value.x);
  }
  return 32u + countLeadingZeros(value.y);
}

fn fp64_round_shift_right_to_u32(value: vec2u, shift: u32) -> u32 {
  if (shift == 0u) {
    return value.y;
  }

  let truncated = fp64_u64_shift_right(value, shift);
  var rounded = truncated.y;
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded & 1u) == 1u)) {
    rounded = rounded + 1u;
  }
  return rounded;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_round_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }

  var rounded = fp64_u64_shift_right(value, shift);
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded.y & 1u) == 1u)) {
    rounded = fp64_u64_add(rounded, vec2u(0u, 1u));
  }
  return rounded;
}
#endif

fn fp64_make_f32_bits_from_u64(sign: u32, significand: vec2u, baseExponent: i32) -> u32 {
  if (fp64_u64_is_zero(significand)) {
    return sign << 31u;
  }

  let leadingZeros = fp64_u64_count_leading_zeros(significand);
  let mostSignificantBit = 63u - leadingZeros;
  var exponent = baseExponent + i32(mostSignificantBit);

  if (exponent > 127) {
    return (sign << 31u) | 0x7f800000u;
  }

  if (exponent >= -126) {
    let shift = i32(mostSignificantBit) - 23;
    var significand24: u32;
    if (shift > 0) {
      significand24 = fp64_round_shift_right_to_u32(significand, u32(shift));
    } else {
      significand24 = fp64_u64_shift_left(significand, u32(-shift)).y;
    }

    if (significand24 >= 0x1000000u) {
      significand24 = significand24 >> 1u;
      exponent = exponent + 1;
      if (exponent > 127) {
        return (sign << 31u) | 0x7f800000u;
      }
    }

    return (sign << 31u) | (u32(exponent + 127) << 23u) | (significand24 & 0x7fffffu);
  }

  let scaleExponent = baseExponent + 149;
  var mantissa: u32;
  if (scaleExponent >= 0) {
    mantissa = fp64_u64_shift_left(significand, u32(scaleExponent)).y;
  } else {
    mantissa = fp64_round_shift_right_to_u32(significand, u32(-scaleExponent));
  }

  if (mantissa >= 0x800000u) {
    return (sign << 31u) | 0x00800000u;
  }
  return (sign << 31u) | mantissa;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_decode_bits(bits: vec2u) -> Fp64Bits {
  let sign = bits.x >> 31u;
  let exponentBits = (bits.x >> 20u) & 0x7ffu;
  let fractionHigh = bits.x & 0xfffffu;
  let fractionLow = bits.y;
  let fraction = vec2u(fractionHigh, fractionLow);

  if (exponentBits == 0x7ffu) {
    let isInf = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, 0, vec2u(0u), false, isInf, !isInf);
  }

  if (exponentBits == 0u) {
    let isZero = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, -1022, fraction, isZero, false, false);
  }

  return Fp64Bits(sign, i32(exponentBits) - 1023, vec2u((1u << 20u) | fractionHigh, fractionLow), false, false, false);
}

fn fp64_finite_magnitude_compare(a: Fp64Bits, b: Fp64Bits) -> i32 {
  if (a.exponent != b.exponent) {
    return select(-1, 1, a.exponent > b.exponent);
  }
  return fp64_u64_compare(a.significand, b.significand);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64RawF32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent. This shared
// integer representation lets normalization remain independent of the
// selected double-single arithmetic implementation.
fn fp64_decode_raw_f32_bits(bits: u32) -> Fp64RawF32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64RawF32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64RawF32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64RawF32Bits(
    sign,
    i32(exponentBits) - 150,
    0x800000u | fraction,
    false,
    false,
    false
  );
}

fn fp64_raw_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_raw_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_raw_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return 0u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;
  if (exactShift >= 64 || highShift >= 64) {
    return 0u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_raw_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let rawLowBits = fp64_make_raw_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  let lowBits = select(rawLowBits, 0u, (rawLowBits & 0x7fffffffu) == 0u);
  if ((highBits & 0x7fffffffu) == 0u && (lowBits & 0x7fffffffu) == 0u) {
    return vec2u(0u);
  }
  return vec2u(highBits, lowBits);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
// Round an arithmetic accumulator to binary64 before splitting it. The
// aligned add/subtract paths retain three guard bits plus a sticky bit, which
// is sufficient for round-to-nearest-even at the binary64 boundary.
fn fp64_split_binary64_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }

  let mostSignificantBit = 63u - fp64_u64_count_leading_zeros(magnitude);
  let exponent = baseExponent + i32(mostSignificantBit);
  if (exponent > 1023) {
    return vec2u((sign << 31u) | 0x7f800000u, 0u);
  }

  var roundedMagnitude = magnitude;
  var roundedBaseExponent = baseExponent;
  if (exponent >= -1022) {
    if (mostSignificantBit > 52u) {
      let shift = mostSignificantBit - 52u;
      roundedMagnitude = fp64_round_shift_right(magnitude, shift);
      roundedBaseExponent = baseExponent + i32(shift);
    }
  } else {
    let shift = -1074 - baseExponent;
    if (shift > 0) {
      roundedMagnitude = fp64_round_shift_right(magnitude, u32(shift));
      roundedBaseExponent = -1074;
    }
  }

  if (fp64_u64_is_zero(roundedMagnitude)) {
    return vec2u(0u);
  }
  return fp64_split_raw_accumulator_bits(sign, roundedMagnitude, roundedBaseExponent);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_add_raw_f32_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_raw_f32_bits(aBits);
  let b = fp64_decode_raw_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = abs(a.baseExponent - b.baseExponent);
  if (exponentDifference > 25) {
    if (fp64_raw_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_raw_accumulator_bits(
    resultSign,
    resultMagnitude,
    commonBaseExponent
  );
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_add_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_sub_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_add_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

fn fp64_sub_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

// Subtract two raw binary64 values and round the exact result once to f32.
// The input words are canonical high/low words: .x contains sign/exponent/high
// fraction bits, and .y contains the low 32 fraction bits.
fn sub_fp64u32_to_f32_bits(aBits: vec2u, bBits: vec2u) -> u32 {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return 0x7fc00000u;
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return (a.sign << 31u) | 0x7f800000u;
    }
    return 0x7fc00000u;
  }
  if (a.isInf) {
    return (a.sign << 31u) | 0x7f800000u;
  }
  if (b.isInf) {
    return (bSubtractionSign << 31u) | 0x7f800000u;
  }
  if (a.isZero && b.isZero) {
    return select(0u, 0x80000000u, a.sign == 1u && b.sign == 0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return 0u;
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_f32_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_f32_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_f32(aBits: vec2u, bBits: vec2u) -> f32 {
  return bitcast<f32>(sub_fp64u32_to_f32_bits(aBits, bBits));
}

// Subtract two raw binary64 values, round once to binary64, then split the
// result into normalized f32 limbs. Finite results must fit within the f32
// exponent range; larger magnitudes map to infinity and smaller magnitudes
// map to zero. The input words use canonical high/low word order.
fn sub_fp64u32_to_fp64_bits(aBits: vec2u, bBits: vec2u) -> vec2u {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
    }
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf) {
    return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
  }
  if (b.isInf) {
    return vec2u((bSubtractionSign << 31u) | 0x7f800000u, 0u);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return vec2u(0u);
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_fp64_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_fp64(aBits: vec2u, bBits: vec2u) -> vec2f {
  let resultBits = sub_fp64u32_to_fp64_bits(aBits, bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_runtime_zero() -> f32 {
  return fp64arithmetic.ONE * 0.0;
}

fn prevent_fp64_optimization(value: f32) -> f32 {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  return value + fp64_runtime_zero();
#else
  return value;
#endif
}
#endif

#ifdef LUMA_FP64_INTEGER_ARITHMETIC
${oy}
#else
fn split(a: f32) -> vec2f {
  let splitValue = prevent_fp64_optimization(fp64arithmetic.SPLIT + fp64_runtime_zero());
  let t = prevent_fp64_optimization(a * splitValue);
  let temp = prevent_fp64_optimization(t - a);
  let aHi = prevent_fp64_optimization(t - temp);
  let aLo = prevent_fp64_optimization(a - aHi);
  return vec2f(aHi, aLo);
}

fn split2(a: vec2f) -> vec2f {
  var b = split(a.x);
  b.y = b.y + a.y;
  return b;
}

fn quickTwoSum(a: f32, b: f32) -> vec2f {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let sum = prevent_fp64_optimization((a + b) * fp64arithmetic.ONE);
  let err = prevent_fp64_optimization(b - (sum - a) * fp64arithmetic.ONE);
#else
  let sum = prevent_fp64_optimization(a + b);
  let err = prevent_fp64_optimization(b - (sum - a));
#endif
  return vec2f(sum, err);
}

fn twoSum(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a + b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) +
    prevent_fp64_optimization(b - v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) + prevent_fp64_optimization(b - v);
#endif
  return vec2f(s, err);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a - b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) -
    prevent_fp64_optimization(b + v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) - prevent_fp64_optimization(b + v);
#endif
  return vec2f(s, err);
}

fn twoSqr(a: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * a);
  let aFp64 = split(a);
  let highProduct = prevent_fp64_optimization(aFp64.x * aFp64.x);
  let crossProduct = prevent_fp64_optimization(2.0 * aFp64.x * aFp64.y);
  let lowProduct = prevent_fp64_optimization(aFp64.y * aFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err =
    (prevent_fp64_optimization(highProduct - prod) * fp64arithmetic.ONE +
      crossProduct * fp64arithmetic.ONE * fp64arithmetic.ONE) +
    lowProduct * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
#else
  let err = ((prevent_fp64_optimization(highProduct - prod) + crossProduct) + lowProduct);
#endif
  return vec2f(prod, err);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * b);
  let aFp64 = split(a);
  let bFp64 = split(b);
  let highProduct = prevent_fp64_optimization(aFp64.x * bFp64.x);
  let crossProduct1 = prevent_fp64_optimization(aFp64.x * bFp64.y);
  let crossProduct2 = prevent_fp64_optimization(aFp64.y * bFp64.x);
  let lowProduct = prevent_fp64_optimization(aFp64.y * bFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err1 = (highProduct - prod) * fp64arithmetic.ONE;
  let err2 = crossProduct1 * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err3 = crossProduct2 * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err4 =
    lowProduct *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE;
#else
  let err1 = highProduct - prod;
  let err2 = crossProduct1;
  let err3 = crossProduct2;
  let err4 = lowProduct;
#endif
  let err12InputA = prevent_fp64_optimization(err1);
  let err12InputB = prevent_fp64_optimization(err2);
  let err12 = prevent_fp64_optimization(err12InputA + err12InputB);
  let err123InputA = prevent_fp64_optimization(err12);
  let err123InputB = prevent_fp64_optimization(err3);
  let err123 = prevent_fp64_optimization(err123InputA + err123InputB);
  let err1234InputA = prevent_fp64_optimization(err123);
  let err1234InputB = prevent_fp64_optimization(err4);
  let err = prevent_fp64_optimization(err1234InputA + err1234InputB);
  return vec2f(prod, err);
}

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSum(a.x, b.x);
  let t = twoSum(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSub(a.x, b.x);
  let t = twoSub(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var prod = twoProd(a.x, b.x);
  let crossProduct1 = prevent_fp64_optimization(a.x * b.y);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct1);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  let crossProduct2 = prevent_fp64_optimization(a.y * b.x);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct2);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let xn = prevent_fp64_optimization(1.0 / b.x);
  let yn = mul_fp64(a, vec2f(xn, fp64_runtime_zero()));
  let diff = prevent_fp64_optimization(sub_fp64(a, mul_fp64(b, yn)).x);
  let prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  if (a.x == 0.0 && a.y == 0.0) {
    return vec2f(0.0, 0.0);
  }
  if (a.x < 0.0) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  let x = prevent_fp64_optimization(1.0 / sqrt(a.x));
  let yn = prevent_fp64_optimization(a.x * x);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let ynSqr = twoSqr(yn) * fp64arithmetic.ONE;
#else
  let ynSqr = twoSqr(yn);
#endif
  let diff = prevent_fp64_optimization(sub_fp64(a, ynSqr).x);
  let prod = twoProd(prevent_fp64_optimization(x * 0.5), diff);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2f(yn, 0.0), prod);
#endif
}
#endif
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_bits_is_nan(bits: u32) -> bool {
  return (bits & 0x7fffffffu) > 0x7f800000u;
}

fn fp64_f32_bits_is_inf(bits: u32) -> bool {
  return (bits & 0x7fffffffu) == 0x7f800000u;
}

fn fp64_compare_f32_bits(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == 0u && bMagnitude == 0u) {
    return 0;
  }
  let aSign = aBits >> 31u;
  let bSign = bBits >> 31u;
  if (aSign != bSign) {
    return select(1, -1, aSign == 1u);
  }
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  let magnitudeComparison = select(-1, 1, aMagnitude > bMagnitude);
  return select(magnitudeComparison, -magnitudeComparison, aSign == 1u);
}

// Normalize an arbitrary pair of finite f32 limbs with integer accumulation.
// This is independent of LUMA_FP64_INTEGER_ARITHMETIC and canonicalizes every
// representation of zero to vec2f(+0.0, +0.0).
fn normalize_fp64(value: vec2f) -> vec2f {
  let resultBits = fp64_add_raw_f32_bits(bitcast<u32>(value.x), bitcast<u32>(value.y));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn is_nan_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  return fp64_f32_bits_is_nan(bitcast<u32>(normalized.x)) ||
    fp64_f32_bits_is_nan(bitcast<u32>(normalized.y));
}

fn is_finite_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  return !fp64_f32_bits_is_nan(highBits) && !fp64_f32_bits_is_nan(lowBits) &&
    !fp64_f32_bits_is_inf(highBits) && !fp64_f32_bits_is_inf(lowBits);
}

// Returns -1, 0, or 1. NaN is unordered and returns 0; call is_nan_fp64 or
// is_finite_fp64 first when 0 must mean a finite zero.
fn sign_fp64(value: vec2f) -> i32 {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  if (fp64_f32_bits_is_nan(highBits) || fp64_f32_bits_is_nan(lowBits)) {
    return 0;
  }
  if ((highBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (highBits >> 31u) == 1u);
  }
  if ((lowBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (lowBits >> 31u) == 1u);
  }
  return 0;
}

// Compares double-single values and returns -1, 0, or 1. NaN is unordered
// and returns 0; callers that require equality semantics must first check
// is_nan_fp64 or is_finite_fp64.
fn compare_fp64(a: vec2f, b: vec2f) -> i32 {
  let normalizedA = normalize_fp64(a);
  let normalizedB = normalize_fp64(b);
  let aHighBits = bitcast<u32>(normalizedA.x);
  let aLowBits = bitcast<u32>(normalizedA.y);
  let bHighBits = bitcast<u32>(normalizedB.x);
  let bLowBits = bitcast<u32>(normalizedB.y);
  if (fp64_f32_bits_is_nan(aHighBits) || fp64_f32_bits_is_nan(aLowBits) ||
      fp64_f32_bits_is_nan(bHighBits) || fp64_f32_bits_is_nan(bLowBits)) {
    return 0;
  }
  let highComparison = fp64_compare_f32_bits(aHighBits, bHighBits);
  if (highComparison != 0) {
    return highComparison;
  }
  return fp64_compare_f32_bits(aLowBits, bLowBits);
}
#endif
`;
})), uy, dy, fy = t((() => {
	Yv(), ay(), ly(), uy = {
		ONE: 1,
		SPLIT: 4097
	}, dy = {
		name: "fp64arithmetic",
		source: cy,
		fs: iy,
		vs: iy,
		defaultUniforms: uy,
		uniformTypes: {
			ONE: "f32",
			SPLIT: "f32"
		},
		fp64ify: Kv,
		fp64LowPart: qv,
		fp64ifyMatrix4: Jv
	};
}));
//#endregion
//#region node_modules/@luma.gl/shadertools/dist/modules/engine/picking/picking.js
function py(e = {}, t) {
	let n = {}, r = Xv(e.useByteColors, !0);
	return e.highlightedObjectColor === void 0 || (e.highlightedObjectColor === null ? n.isHighlightActive = !1 : (n.isHighlightActive = !0, n.highlightedObjectColor = e.highlightedObjectColor.slice(0, 3))), e.highlightColor && (n.highlightColor = Qv(e.highlightColor, r)), e.isActive !== void 0 && (n.isActive = !!e.isActive, n.isAttribute = !!e.isAttribute), e.useByteColors !== void 0 && (n.useByteColors = !!e.useByteColors), n;
}
var my, hy, gy, _y, vy = t((() => {
	$v(), my = [
		0,
		1,
		1,
		1
	], hy = "layout(std140) uniform pickingUniforms {\n  float isActive;\n  float isAttribute;\n  float isHighlightActive;\n  float useByteColors;\n  vec3 highlightedObjectColor;\n  vec4 highlightColor;\n} picking;\n\nout vec4 picking_vRGBcolor_Avalid;\n\n// Normalize unsigned byte color to 0-1 range\nvec3 picking_normalizeColor(vec3 color) {\n  return picking.useByteColors > 0.5 ? color / 255.0 : color;\n}\n\n// Normalize unsigned byte color to 0-1 range\nvec4 picking_normalizeColor(vec4 color) {\n  return picking.useByteColors > 0.5 ? color / 255.0 : color;\n}\n\nbool picking_isColorZero(vec3 color) {\n  return dot(color, vec3(1.0)) < 0.00001;\n}\n\nbool picking_isColorValid(vec3 color) {\n  return dot(color, vec3(1.0)) > 0.00001;\n}\n\n// Check if this vertex is highlighted \nbool isVertexHighlighted(vec3 vertexColor) {\n  vec3 highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);\n  return\n    bool(picking.isHighlightActive) && picking_isColorZero(abs(vertexColor - highlightedObjectColor));\n}\n\n// Set the current picking color\nvoid picking_setPickingColor(vec3 pickingColor) {\n  pickingColor = picking_normalizeColor(pickingColor);\n\n  if (bool(picking.isActive)) {\n    // Use alpha as the validity flag. If pickingColor is [0, 0, 0] fragment is non-pickable\n    picking_vRGBcolor_Avalid.a = float(picking_isColorValid(pickingColor));\n\n    if (!bool(picking.isAttribute)) {\n      // Stores the picking color so that the fragment shader can render it during picking\n      picking_vRGBcolor_Avalid.rgb = pickingColor;\n    }\n  } else {\n    // Do the comparison with selected item color in vertex shader as it should mean fewer compares\n    picking_vRGBcolor_Avalid.a = float(isVertexHighlighted(pickingColor));\n  }\n}\n\nvoid picking_setPickingAttribute(float value) {\n  if (bool(picking.isAttribute)) {\n    picking_vRGBcolor_Avalid.r = value;\n  }\n}\n\nvoid picking_setPickingAttribute(vec2 value) {\n  if (bool(picking.isAttribute)) {\n    picking_vRGBcolor_Avalid.rg = value;\n  }\n}\n\nvoid picking_setPickingAttribute(vec3 value) {\n  if (bool(picking.isAttribute)) {\n    picking_vRGBcolor_Avalid.rgb = value;\n  }\n}\n", gy = "layout(std140) uniform pickingUniforms {\n  float isActive;\n  float isAttribute;\n  float isHighlightActive;\n  float useByteColors;\n  vec3 highlightedObjectColor;\n  vec4 highlightColor;\n} picking;\n\nin vec4 picking_vRGBcolor_Avalid;\n\n/*\n * Returns highlight color if this item is selected.\n */\nvec4 picking_filterHighlightColor(vec4 color) {\n  // If we are still picking, we don't highlight\n  if (picking.isActive > 0.5) {\n    return color;\n  }\n\n  bool selected = bool(picking_vRGBcolor_Avalid.a);\n\n  if (selected) {\n    // Blend in highlight color based on its alpha value\n    float highLightAlpha = picking.highlightColor.a;\n    float blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);\n    float highLightRatio = highLightAlpha / blendedAlpha;\n\n    vec3 blendedRGB = mix(color.rgb, picking.highlightColor.rgb, highLightRatio);\n    return vec4(blendedRGB, blendedAlpha);\n  } else {\n    return color;\n  }\n}\n\n/*\n * Returns picking color if picking enabled else unmodified argument.\n */\nvec4 picking_filterPickingColor(vec4 color) {\n  if (bool(picking.isActive)) {\n    if (picking_vRGBcolor_Avalid.a == 0.0) {\n      discard;\n    }\n    return picking_vRGBcolor_Avalid;\n  }\n  return color;\n}\n\n/*\n * Returns picking color if picking is enabled if not\n * highlight color if this item is selected, otherwise unmodified argument.\n */\nvec4 picking_filterColor(vec4 color) {\n  vec4 highlightColor = picking_filterHighlightColor(color);\n  return picking_filterPickingColor(highlightColor);\n}\n", _y = {
		props: {},
		uniforms: {},
		name: "picking",
		uniformTypes: {
			isActive: "f32",
			isAttribute: "f32",
			isHighlightActive: "f32",
			useByteColors: "f32",
			highlightedObjectColor: "vec3<f32>",
			highlightColor: "vec4<f32>"
		},
		defaultUniforms: {
			isActive: !1,
			isAttribute: !1,
			isHighlightActive: !1,
			useByteColors: !0,
			highlightedObjectColor: [
				0,
				0,
				0
			],
			highlightColor: my
		},
		vs: hy,
		fs: gy,
		getUniforms: py
	};
})), G = t((() => {
	Wp(), _m(), bm(), Om(), Km(), Xg(), e_(), a_(), Dh(), fm(), W(), ry(), fy(), vy(), I();
})), yy = "struct LayerUniforms {\n  opacity: f32,\n};\n\n@group(0) @binding(auto)\nvar<uniform> layer: LayerUniforms;\n", by = "layout(std140) uniform layerUniforms {\n  float opacity;\n} layer;\n", xy = {
	name: "layer",
	source: yy,
	vs: by,
	fs: by,
	getUniforms: (e) => ({ opacity: e.opacity ** (1 / 2.2) }),
	uniformTypes: { opacity: "f32" }
}, Sy = {
	name: "color",
	dependencies: [],
	source: "\n\n@must_use\nfn deckgl_premultiplied_alpha(fragColor: vec4<f32>) -> vec4<f32> {\n    return vec4(fragColor.rgb * fragColor.a, fragColor.a); \n};\n",
	getUniforms: (e) => ({})
}, Cy = "const SMOOTH_EDGE_RADIUS: f32 = 0.5;\n\nstruct VertexGeometry {\n  position: vec4<f32>,\n  worldPosition: vec3<f32>,\n  worldPositionAlt: vec3<f32>,\n  normal: vec3<f32>,\n  uv: vec2<f32>,\n  pickingColor: vec3<f32>,\n};\n\nvar<private> geometry_: VertexGeometry = VertexGeometry(\n  vec4<f32>(0.0, 0.0, 1.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec2<f32>(0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0)\n);\n\nstruct FragmentGeometry {\n  uv: vec2<f32>,\n};\n\nvar<private> fragmentGeometry: FragmentGeometry;\n\nfn smoothedge(edge: f32, x: f32) -> f32 {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n", wy = "#define SMOOTH_EDGE_RADIUS 0.5", Ty = {
	name: "geometry",
	source: Cy,
	vs: `\
${wy}

struct VertexGeometry {
  vec4 position;
  vec3 worldPosition;
  vec3 worldPositionAlt;
  vec3 normal;
  vec2 uv;
  vec3 pickingColor;
} geometry = VertexGeometry(
  vec4(0.0, 0.0, 1.0, 0.0),
  vec3(0.0),
  vec3(0.0),
  vec3(0.0),
  vec2(0.0),
  vec3(0.0)
);
`,
	fs: `\
${wy}

struct FragmentGeometry {
  vec2 uv;
};
FragmentGeometry geometry;

float smoothedge(float edge, float x) {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`
}, K;
(function(e) {
	e[e.Start = 1] = "Start", e[e.Move = 2] = "Move", e[e.End = 4] = "End", e[e.Cancel = 8] = "Cancel";
})(K ||= {});
var q;
(function(e) {
	e[e.None = 0] = "None", e[e.Left = 1] = "Left", e[e.Right = 2] = "Right", e[e.Up = 4] = "Up", e[e.Down = 8] = "Down", e[e.Horizontal = 3] = "Horizontal", e[e.Vertical = 12] = "Vertical", e[e.All = 15] = "All";
})(q ||= {});
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/recognizer/recognizer-state.js
var J;
(function(e) {
	e[e.Possible = 1] = "Possible", e[e.Began = 2] = "Began", e[e.Changed = 4] = "Changed", e[e.Ended = 8] = "Ended", e[e.Recognized = 8] = "Recognized", e[e.Cancelled = 16] = "Cancelled", e[e.Failed = 32] = "Failed";
})(J ||= {});
var Ey = "auto", Dy = "manipulation", Oy = "none", ky = "pan-x", Ay = "pan-y";
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/touchaction/clean-touch-actions.js
function jy(e) {
	if (e.includes("none")) return Oy;
	let t = e.includes(ky), n = e.includes(Ay);
	return t && n ? Oy : t || n ? t ? ky : Ay : e.includes("manipulation") ? Dy : Ey;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/touchaction/touchaction.js
var My = class {
	constructor(e, t) {
		this.actions = "", this.manager = e, this.set(t);
	}
	set(e) {
		e === "compute" && (e = this.compute()), this.manager.element && (this.manager.element.style.touchAction = e, this.actions = e);
	}
	update() {
		this.set(this.manager.options.touchAction);
	}
	compute() {
		let e = [];
		for (let t of this.manager.recognizers) t.options.enable && (e = e.concat(t.getTouchAction()));
		return jy(e.join(" "));
	}
};
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/utils/split-str.js
function Ny(e) {
	return e.trim().split(/\s+/g);
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/utils/event-listeners.js
function Py(e, t, n) {
	if (e) for (let r of Ny(t)) e.addEventListener(r, n, !1);
}
function Fy(e, t, n) {
	if (e) for (let r of Ny(t)) e.removeEventListener(r, n, !1);
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/utils/get-window-for-element.js
function Iy(e) {
	return (e.ownerDocument || e).defaultView;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/utils/has-parent.js
function Ly(e, t) {
	let n = e;
	for (; n;) {
		if (n === t) return !0;
		n = n.parentNode;
	}
	return !1;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-center.js
function Ry(e) {
	let t = e.length;
	if (t === 1) return {
		x: Math.round(e[0].clientX),
		y: Math.round(e[0].clientY)
	};
	let n = 0, r = 0, i = 0;
	for (; i < t;) n += e[i].clientX, r += e[i].clientY, i++;
	return {
		x: Math.round(n / t),
		y: Math.round(r / t)
	};
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/simple-clone-input-data.js
function zy(e) {
	let t = [], n = 0;
	for (; n < e.pointers.length;) t[n] = {
		clientX: Math.round(e.pointers[n].clientX),
		clientY: Math.round(e.pointers[n].clientY)
	}, n++;
	return {
		timeStamp: Date.now(),
		pointers: t,
		center: Ry(t),
		deltaX: e.deltaX,
		deltaY: e.deltaY
	};
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-distance.js
function By(e, t) {
	let n = t.x - e.x, r = t.y - e.y;
	return Math.sqrt(n * n + r * r);
}
function Vy(e, t) {
	let n = t.clientX - e.clientX, r = t.clientY - e.clientY;
	return Math.sqrt(n * n + r * r);
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-angle.js
function Hy(e, t) {
	let n = t.x - e.x, r = t.y - e.y;
	return Math.atan2(r, n) * 180 / Math.PI;
}
function Uy(e, t) {
	let n = t.clientX - e.clientX, r = t.clientY - e.clientY;
	return Math.atan2(r, n) * 180 / Math.PI;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-direction.js
function Wy(e, t) {
	return e === t ? q.None : Math.abs(e) >= Math.abs(t) ? e < 0 ? q.Left : q.Right : t < 0 ? q.Up : q.Down;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-delta-xy.js
function Gy(e, t) {
	let n = t.center, r = e.offsetDelta, i = e.prevDelta, a = e.prevInput;
	return (t.eventType === K.Start || a?.eventType === K.End) && (i = e.prevDelta = {
		x: a?.deltaX || 0,
		y: a?.deltaY || 0
	}, r = e.offsetDelta = {
		x: n.x,
		y: n.y
	}), {
		deltaX: i.x + (n.x - r.x),
		deltaY: i.y + (n.y - r.y)
	};
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-velocity.js
function Ky(e, t, n) {
	return {
		x: t / e || 0,
		y: n / e || 0
	};
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-scale.js
function qy(e, t) {
	return Vy(t[0], t[1]) / Vy(e[0], e[1]);
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/get-rotation.js
function Jy(e, t) {
	return Uy(t[1], t[0]) - Uy(e[1], e[0]);
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/compute-interval-input-data.js
function Yy(e, t) {
	let n = e.lastInterval || t, r = t.timeStamp - n.timeStamp, i, a, o, s;
	if (t.eventType !== K.Cancel && (r > 25 || n.velocity === void 0)) {
		let c = t.deltaX - n.deltaX, l = t.deltaY - n.deltaY, u = Ky(r, c, l);
		a = u.x, o = u.y, i = Math.abs(u.x) > Math.abs(u.y) ? u.x : u.y, s = Wy(c, l), e.lastInterval = t;
	} else i = n.velocity, a = n.velocityX, o = n.velocityY, s = n.direction;
	t.velocity = i, t.velocityX = a, t.velocityY = o, t.direction = s;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/compute-input-data.js
function Xy(e, t) {
	return "pointerId" in e ? e.pointerId : t;
}
function Zy(e, t) {
	e.movementOrigin = new Map(t.map((e, t) => [Xy(e, t), {
		clientX: e.clientX,
		clientY: e.clientY
	}])), e.firstMovementTime = void 0;
}
function Qy(e, t) {
	let n = t.pointers.map(Xy);
	if (e.movementOrigin?.size === n.length && n.every((t) => e.movementOrigin.has(t)) || Zy(e, t.pointers), t.distancePerPointer = t.pointers.map((t, r) => Vy(e.movementOrigin.get(n[r]), t)), t.eventType & K.Move && t.distancePerPointer.some((e) => e > 0) && (e.firstMovementTime ??= t.timeStamp), t.movementDeltaTime = e.firstMovementTime === void 0 ? 0 : t.timeStamp - e.firstMovementTime, t.eventType & (K.End | K.Cancel)) {
		let r = t.changedPointers.map((e) => Xy(e, t.pointers.indexOf(e)));
		Zy(e, t.pointers.filter((e, t) => !r.includes(n[t])));
	}
}
function $y(e, t) {
	let { session: n } = e, { pointers: r } = t, { length: i } = r;
	n.firstInput ||= zy(t), i > 1 && !n.firstMultiple ? n.firstMultiple = zy(t) : i === 1 && (n.firstMultiple = !1);
	let { firstInput: a, firstMultiple: o } = n, s = o ? o.center : a.center, c = t.center = Ry(r);
	t.timeStamp = Date.now(), t.deltaTime = t.timeStamp - a.timeStamp, Qy(n, t), t.angle = Hy(s, c), t.distance = By(s, c);
	let { deltaX: l, deltaY: u } = Gy(n, t);
	t.deltaX = l, t.deltaY = u, t.offsetDirection = Wy(t.deltaX, t.deltaY);
	let d = Ky(t.deltaTime, t.deltaX, t.deltaY);
	t.overallVelocityX = d.x, t.overallVelocityY = d.y, t.overallVelocity = Math.abs(d.x) > Math.abs(d.y) ? d.x : d.y, t.scale = o ? qy(o.pointers, r) : 1, t.rotation = o ? Jy(o.pointers, r) : 0, t.maxPointers = n.prevInput ? t.pointers.length > n.prevInput.maxPointers ? t.pointers.length : n.prevInput.maxPointers : t.pointers.length;
	let f = e.element;
	return Ly(t.srcEvent.target, f) && (f = t.srcEvent.target), t.target = f, Yy(n, t), t;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/input-handler.js
function eb(e, t, n) {
	let r = n.pointers.length, i = n.changedPointers.length, a = t & K.Start && r - i === 0, o = t & (K.End | K.Cancel) && r - i === 0;
	n.isFirst = !!a, n.isFinal = !!o, a && (e.session = {}), n.eventType = t;
	let s = $y(e, n);
	e.emit("hammer.input", s), e.recognize(s), e.session.prevInput = s;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/input/input.js
var tb = class {
	constructor(e) {
		this.evEl = "", this.evWin = "", this.evTarget = "", this.domHandler = (e) => {
			this.manager.options.enable && this.handler(e);
		}, this.manager = e, this.element = e.element, this.target = e.options.inputTarget || e.element;
	}
	callback(e, t) {
		eb(this.manager, e, t);
	}
	init() {
		Py(this.element, this.evEl, this.domHandler), Py(this.target, this.evTarget, this.domHandler), Py(Iy(this.element), this.evWin, this.domHandler);
	}
	destroy() {
		Fy(this.element, this.evEl, this.domHandler), Fy(this.target, this.evTarget, this.domHandler), Fy(Iy(this.element), this.evWin, this.domHandler);
	}
}, nb = {
	pointerdown: K.Start,
	pointermove: K.Move,
	pointerup: K.End,
	pointercancel: K.Cancel,
	pointerout: K.Cancel
}, rb = "pointerdown", ib = "pointermove pointerup pointercancel", ab = class extends tb {
	constructor(e) {
		super(e), this.evEl = rb, this.evWin = ib, this.store = this.manager.session.pointerEvents = [], this.init();
	}
	handler(e) {
		let { store: t } = this, n = !1, r = nb[e.type], i = e.pointerType, a = i === "touch", o = t.findIndex((t) => t.pointerId === e.pointerId);
		r & K.Start && (e.buttons || a) ? o < 0 && (t.push(e), o = t.length - 1) : r & (K.End | K.Cancel) && (n = !0), !(o < 0) && (t[o] = e, this.callback(r, {
			pointers: t,
			changedPointers: [e],
			eventType: r,
			pointerType: i,
			srcEvent: e
		}), n && t.splice(o, 1));
	}
}, ob = [
	"",
	"webkit",
	"Moz",
	"MS",
	"ms",
	"o"
];
function sb(e, t) {
	let n = t[0].toUpperCase() + t.slice(1);
	for (let r of ob) {
		let i = r ? r + n : t;
		if (i in e) return i;
	}
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/manager.js
var cb = 1, lb = 2, ub = {
	touchAction: "compute",
	enable: !0,
	inputTarget: null,
	cssProps: {
		userSelect: "none",
		userDrag: "none",
		touchCallout: "none",
		tapHighlightColor: "rgba(0,0,0,0)"
	}
}, db = class {
	constructor(e, t) {
		this.options = {
			...ub,
			...t,
			cssProps: {
				...ub.cssProps,
				...t.cssProps
			},
			inputTarget: t.inputTarget || e
		}, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = new ab(this), this.touchAction = new My(this, this.options.touchAction), this.toggleCssProps(!0);
	}
	set(e) {
		return Object.assign(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this;
	}
	stop(e) {
		this.session.stopped = e ? lb : cb;
	}
	recognize(e) {
		let { session: t } = this;
		if (t.stopped) return;
		this.session.prevented && e.srcEvent.preventDefault();
		let n, { recognizers: r } = this, { curRecognizer: i } = t;
		(!i || i && i.state & J.Recognized) && (i = t.curRecognizer = null);
		let a = 0;
		for (; a < r.length;) n = r[a], t.stopped !== lb && (!i || n === i || n.canRecognizeWith(i)) ? n.recognize(e) : n.reset(), !i && n.state & (J.Began | J.Changed | J.Ended) && (i = t.curRecognizer = n), a++;
	}
	get(e) {
		let { recognizers: t } = this;
		for (let n = 0; n < t.length; n++) if (t[n].options.event === e) return t[n];
		return null;
	}
	add(e) {
		if (Array.isArray(e)) {
			for (let t of e) this.add(t);
			return this;
		}
		let t = this.get(e.options.event);
		return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e;
	}
	remove(e) {
		if (Array.isArray(e)) {
			for (let t of e) this.remove(t);
			return this;
		}
		let t = typeof e == "string" ? this.get(e) : e;
		if (t) {
			let { recognizers: e } = this, n = e.indexOf(t);
			n !== -1 && (e.splice(n, 1), this.touchAction.update());
		}
		return this;
	}
	on(e, t) {
		if (!e || !t) return;
		let { handlers: n } = this;
		for (let r of Ny(e)) n[r] = n[r] || [], n[r].push(t);
	}
	off(e, t) {
		if (!e) return;
		let { handlers: n } = this;
		for (let r of Ny(e)) t ? n[r] && n[r].splice(n[r].indexOf(t), 1) : delete n[r];
	}
	emit(e, t) {
		let n = this.handlers[e] && this.handlers[e].slice();
		if (!n || !n.length) return;
		let r = t;
		r.type = e, r.preventDefault = function() {
			t.srcEvent.preventDefault();
		};
		let i = 0;
		for (; i < n.length;) n[i](r), i++;
	}
	destroy() {
		this.toggleCssProps(!1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
	}
	toggleCssProps(e) {
		let { element: t } = this;
		if (t) {
			for (let [n, r] of Object.entries(this.options.cssProps)) {
				let i = sb(t.style, n);
				e ? (this.oldCssProps[i] = t.style[i], t.style[i] = r) : t.style[i] = this.oldCssProps[i] || "";
			}
			e || (this.oldCssProps = {});
		}
	}
}, fb = 1;
function pb() {
	return fb++;
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/recognizer/state-str.js
function mb(e) {
	return e & J.Cancelled ? "cancel" : e & J.Ended ? "end" : e & J.Changed ? "move" : e & J.Began ? "start" : "";
}
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/recognizer/recognizer.js
var hb = class {
	constructor(e) {
		this.options = e, this.id = pb(), this.state = J.Possible, this.simultaneous = {}, this.requireFail = [];
	}
	set(e) {
		return Object.assign(this.options, e), this.manager.touchAction.update(), this;
	}
	recognizeWith(e) {
		if (Array.isArray(e)) {
			for (let t of e) this.recognizeWith(t);
			return this;
		}
		let t;
		if (typeof e == "string") {
			if (t = this.manager.get(e), !t) throw Error(`Cannot find recognizer ${e}`);
		} else t = e;
		let { simultaneous: n } = this;
		return n[t.id] || (n[t.id] = t, t.recognizeWith(this)), this;
	}
	dropRecognizeWith(e) {
		if (Array.isArray(e)) {
			for (let t of e) this.dropRecognizeWith(t);
			return this;
		}
		let t;
		return t = typeof e == "string" ? this.manager.get(e) : e, t && delete this.simultaneous[t.id], this;
	}
	requireFailure(e) {
		if (Array.isArray(e)) {
			for (let t of e) this.requireFailure(t);
			return this;
		}
		let t;
		if (typeof e == "string") {
			if (t = this.manager.get(e), !t) throw Error(`Cannot find recognizer ${e}`);
		} else t = e;
		let { requireFail: n } = this;
		return n.indexOf(t) === -1 && (n.push(t), t.requireFailure(this)), this;
	}
	dropRequireFailure(e) {
		if (Array.isArray(e)) {
			for (let t of e) this.dropRequireFailure(t);
			return this;
		}
		let t;
		if (t = typeof e == "string" ? this.manager.get(e) : e, t) {
			let e = this.requireFail.indexOf(t);
			e > -1 && this.requireFail.splice(e, 1);
		}
		return this;
	}
	hasRequireFailures() {
		return !!this.requireFail.find((e) => e.options.enable);
	}
	canRecognizeWith(e) {
		return !!this.simultaneous[e.id];
	}
	emit(e) {
		if (!e) return;
		let { state: t } = this;
		t < J.Ended && this.manager.emit(this.options.event + mb(t), e), this.manager.emit(this.options.event, e), e.additionalEvent && this.manager.emit(e.additionalEvent, e), t >= J.Ended && this.manager.emit(this.options.event + mb(t), e);
	}
	tryEmit(e) {
		this.canEmit() ? this.emit(e) : this.state = J.Failed;
	}
	canEmit() {
		let e = 0;
		for (; e < this.requireFail.length;) {
			if (!(this.requireFail[e].state & (J.Failed | J.Possible))) return !1;
			e++;
		}
		return !0;
	}
	recognize(e) {
		let t = { ...e };
		this.options.enable ? (this.state & (J.Recognized | J.Cancelled | J.Failed) && (this.state = J.Possible), this.state = this.process(t), this.state & (J.Began | J.Changed | J.Ended | J.Cancelled) && this.tryEmit(t)) : (this.reset(), this.state = J.Failed);
	}
	getEventNames() {
		return [this.options.event];
	}
	reset() {}
};
//#endregion
//#region node_modules/mjolnir.js/dist/hammerjs/recognizers/attribute.js
function gb(e) {
	return Math.abs(((e + 180) % 360 + 360) % 360 - 180);
}
function _b(e, t) {
	return (t.distance === void 0 || e.distance >= t.distance) && (t.distancePerPointer === void 0 || e.distancePerPointer.length > 0 && e.distancePerPointer.every((e) => e >= t.distancePerPointer)) && (t.movementDeltaTime === void 0 || e.movementDeltaTime >= t.movementDeltaTime) && (t.rotation === void 0 || gb(e.rotation) >= t.rotation) && (t.scale === void 0 || Math.abs(e.scale - 1) >= t.scale);
}
var vb = class extends hb {
	attrTest(e) {
		let t = this.options.pointers;
		return t === 0 || e.pointers.length === t;
	}
	coherentTest(e) {
		let t = this.options.coherent;
		return !t?.length || t.some((t) => _b(e, t));
	}
	process(e) {
		let { state: t } = this, { eventType: n } = e, r = t & (J.Began | J.Changed), i = this.attrTest(e);
		return r && (n & K.Cancel || !i) ? t | J.Cancelled : r || i ? n & K.End ? t | J.Ended : t & J.Began ? t | J.Changed : J.Began : J.Failed;
	}
}, yb = [
	"",
	"start",
	"move",
	"end",
	"cancel"
], bb = class extends hb {
	constructor(e = {}) {
		super({
			enable: !0,
			event: "doubleclickdrag",
			pointers: 1,
			interval: 500,
			time: 350,
			threshold: 28,
			dragThreshold: 1,
			pixelsPerScale: 120,
			...e
		}), this._tapStart = null, this._lastTap = null, this._drag = null, this._emittedStart = !1;
	}
	getTouchAction() {
		return [Dy];
	}
	getEventNames() {
		return yb.map((e) => this.options.event + e);
	}
	process(e) {
		let { options: t } = this;
		return e.pointers.length === t.pointers ? e.eventType & K.Start ? this._handleStart(e) : e.eventType & K.Move ? this._handleMove(e) : e.eventType & K.Cancel ? this._handleEnd(e, !0) : e.eventType & K.End ? this._handleEnd(e, !1) : J.Failed : (this.reset(), J.Failed);
	}
	reset() {
		this._tapStart = null, this._lastTap = null, this._drag = null, this._emittedStart = !1;
	}
	emit(e) {
		if (e) {
			if (this.state === J.Began) {
				if (!this._drag?.active || this._emittedStart) return;
				this._emittedStart = !0, this.manager.emit(`${this.options.event}start`, e), this.manager.emit(this.options.event, e);
			} else if (this.state === J.Changed) {
				if (!this._emittedStart) return;
				this.manager.emit(`${this.options.event}move`, e), this.manager.emit(this.options.event, e);
			} else if (this.state === J.Ended) {
				if (!this._emittedStart) return;
				this.manager.emit(this.options.event, e), this.manager.emit(`${this.options.event}end`, e), this._emittedStart = !1;
			} else if (this.state === J.Cancelled) {
				if (!this._emittedStart) return;
				this.manager.emit(this.options.event, e), this.manager.emit(`${this.options.event}cancel`, e), this._emittedStart = !1;
			}
		}
	}
	_handleStart(e) {
		let t = this._getPointerId(e);
		return this._lastTap && this._isTapMatch(e, this._lastTap) ? (this._tapStart = null, this._lastTap = null, this._drag = {
			startCenter: e.center,
			pointerId: t,
			active: !1
		}, this._emittedStart = !1, J.Began) : (this._tapStart = {
			center: e.center,
			timeStamp: e.timeStamp,
			pointerId: t
		}, this._lastTap = null, this._drag = null, this._emittedStart = !1, J.Failed);
	}
	_handleMove(e) {
		if (!this._drag || !this._isSamePointer(e, this._drag.pointerId)) return J.Failed;
		let t = this._drag.startCenter.y - e.center.y;
		return !this._drag.active && Math.abs(t) < this.options.dragThreshold ? J.Began : (this._drag.active = !0, e.scale = 2 ** (t / this.options.pixelsPerScale), this._emittedStart ? J.Changed : J.Began);
	}
	_handleEnd(e, t) {
		if (this._drag && this._isSamePointer(e, this._drag.pointerId)) {
			let { active: n, startCenter: r } = this._drag;
			return this._drag = null, this._tapStart = null, this._lastTap = null, n ? (e.scale = 2 ** ((r.y - e.center.y) / this.options.pixelsPerScale), t ? J.Cancelled : J.Ended) : (this._emittedStart = !1, J.Failed);
		}
		return !this._tapStart || !this._isSamePointer(e, this._tapStart.pointerId) ? (t && this.reset(), J.Failed) : (this._lastTap = this._isValidTap(e) ? {
			center: e.center,
			timeStamp: e.timeStamp,
			pointerId: this._tapStart.pointerId
		} : null, this._tapStart = null, J.Failed);
	}
	_isTapMatch(e, t) {
		return e.timeStamp - t.timeStamp <= this.options.interval && By(e.center, t.center) <= this.options.threshold;
	}
	_isValidTap(e) {
		return e.deltaTime <= this.options.time && e.distance <= this.options.threshold;
	}
	_getPointerId(e) {
		return "pointerId" in e.srcEvent ? e.srcEvent.pointerId : null;
	}
	_isSamePointer(e, t) {
		return t === null || this._getPointerId(e) === t;
	}
}, xb = class extends hb {
	constructor(e = {}) {
		super({
			enable: !0,
			event: "tap",
			pointers: 1,
			taps: 1,
			interval: 300,
			time: 250,
			threshold: 9,
			posThreshold: 10,
			...e
		}), this.pTime = null, this.pCenter = null, this._timer = null, this._input = null, this.count = 0;
	}
	getTouchAction() {
		return [Dy];
	}
	process(e) {
		let { options: t } = this, n = e.pointers.length === t.pointers, r = e.distance < t.threshold, i = e.deltaTime < t.time;
		if (this.reset(), e.eventType & K.Start && this.count === 0) return this.failTimeout();
		if (r && i && n) {
			if (e.eventType !== K.End) return this.failTimeout();
			let n = !this.pTime || e.timeStamp - this.pTime < t.interval, r = !this.pCenter || By(this.pCenter, e.center) < t.posThreshold;
			if (this.pTime = e.timeStamp, this.pCenter = e.center, !r || !n ? this.count = 1 : this.count += 1, this._input = e, this.count % t.taps === 0) return this.hasRequireFailures() ? (this._timer = setTimeout(() => {
				this.state = J.Recognized, this.tryEmit(this._input);
			}, t.interval), J.Began) : J.Recognized;
		}
		return J.Failed;
	}
	failTimeout() {
		return this._timer = setTimeout(() => {
			this.state = J.Failed;
		}, this.options.interval), J.Failed;
	}
	reset() {
		clearTimeout(this._timer);
	}
	emit(e) {
		this.state === J.Recognized && (e.tapCount = this.count, this.manager.emit(this.options.event, e));
	}
}, Sb = class extends vb {
	constructor() {
		super(...arguments), this.wheelSession = null, this.wheelSessionUnsubscribe = null, this.handleWheelSessionEvent = (e) => {
			e.device === "trackpad" && this.handleTrackpadEvent(e);
		};
	}
	set(e) {
		let { wheelSession: t, ...n } = e;
		return t && t !== this.wheelSession && (this.wheelSessionUnsubscribe?.(), this.wheelSessionUnsubscribe = null, this.wheelSession = t), super.set(n), this.updateWheelSessionSubscription(), this;
	}
	getTrackpadInput(e, t = {}) {
		let { srcEvent: n } = e, r = t.deltaX ?? e.deltaX, i = t.deltaY ?? e.deltaY, a = Wy(r, i), o = Math.sqrt(e.deltaX * e.deltaX + e.deltaY * e.deltaY), s = n;
		return {
			pointers: [s, s],
			changedPointers: [s, s],
			pointerType: "trackpad",
			srcEvent: s,
			eventType: e.eventType,
			timeStamp: e.timeStamp,
			deltaTime: e.deltaTime,
			center: e.center,
			deltaX: r,
			deltaY: i,
			angle: Math.atan2(i, r) * 180 / Math.PI,
			distance: Math.sqrt(r * r + i * i),
			distancePerPointer: [o, o],
			movementDeltaTime: e.deltaTime,
			scale: 1,
			rotation: 0,
			direction: a,
			offsetDirection: a,
			velocity: e.velocity,
			velocityX: e.velocityX,
			velocityY: e.velocityY,
			overallVelocity: e.overallVelocity,
			overallVelocityX: e.overallVelocityX,
			overallVelocityY: e.overallVelocityY,
			maxPointers: 2,
			target: n.target || this.manager.element,
			additionalEvent: "",
			...t
		};
	}
	updateWheelSessionSubscription() {
		let e = !!(this.wheelSession && this.options.enable && this.options.trackpad && this.options.pointers === 2);
		e && !this.wheelSessionUnsubscribe ? this.wheelSessionUnsubscribe = this.wheelSession.on(this.handleWheelSessionEvent) : !e && this.wheelSessionUnsubscribe && (this.wheelSessionUnsubscribe(), this.wheelSessionUnsubscribe = null);
	}
}, Cb = [
	"",
	"start",
	"move",
	"end",
	"cancel",
	"up",
	"down",
	"left",
	"right"
], wb = class extends Sb {
	constructor(e = {}) {
		super({
			enable: !0,
			pointers: 1,
			event: "pan",
			threshold: 10,
			direction: q.All,
			trackpad: !1,
			coherent: [],
			...e
		}), this.trackpadGesture = !1, this.pX = null, this.pY = null;
	}
	getTouchAction() {
		let { options: { direction: e } } = this, t = [];
		return e & q.Horizontal && t.push(Ay), e & q.Vertical && t.push(ky), t;
	}
	getEventNames() {
		return Cb.map((e) => this.options.event + e);
	}
	directionTest(e) {
		let { options: t } = this, n = !0, { distance: r } = e, { direction: i } = e, a = e.deltaX, o = e.deltaY;
		return i & t.direction || (t.direction & q.Horizontal ? (i = a === 0 ? q.None : a < 0 ? q.Left : q.Right, n = a !== this.pX, r = Math.abs(e.deltaX)) : (i = o === 0 ? q.None : o < 0 ? q.Up : q.Down, n = o !== this.pY, r = Math.abs(e.deltaY))), e.direction = i, n && r > t.threshold && !!(i & t.direction);
	}
	attrTest(e) {
		let t = !!(this.state & J.Began), n = !(this.options.coherent?.length && e.eventType & (K.End | K.Cancel));
		return super.attrTest(e) && (t || n && this.coherentTest(e) && this.directionTest(e));
	}
	emit(e) {
		this.pX = e.deltaX, this.pY = e.deltaY;
		let t = q[e.direction].toLowerCase();
		t && (e.additionalEvent = this.options.event + t), super.emit(e);
	}
	handleTrackpadEvent(e) {
		e.isFirst && (this.trackpadGesture = !e.srcEvent.ctrlKey, !this.trackpadGesture && this.state & (J.Recognized | J.Cancelled | J.Failed) && (this.state = J.Possible)), this.trackpadGesture && (this.recognize(this.getTrackpadInput(e, {
			deltaX: -e.deltaX,
			deltaY: -e.deltaY,
			velocity: -e.velocity,
			velocityX: -e.velocityX,
			velocityY: -e.velocityY,
			overallVelocity: -e.overallVelocity,
			overallVelocityX: -e.overallVelocityX,
			overallVelocityY: -e.overallVelocityY
		})), e.isFinal && (this.trackpadGesture = !1));
	}
}, Tb = [
	"",
	"start",
	"move",
	"end",
	"cancel",
	"in",
	"out"
], Eb = class extends Sb {
	constructor(e = {}) {
		super({
			enable: !0,
			event: "pinch",
			threshold: 0,
			pointers: 2,
			trackpad: !1,
			coherent: [],
			...e
		}), this.trackpadGesture = !1;
	}
	getTouchAction() {
		return [Oy];
	}
	getEventNames() {
		return Tb.map((e) => this.options.event + e);
	}
	attrTest(e) {
		let t = !!this.options.coherent?.length, n = !!(this.state & J.Began), r = !(t && e.eventType & (K.End | K.Cancel));
		return super.attrTest(e) && (n || r && (t ? this.coherentTest(e) : Math.abs(e.scale - 1) > this.options.threshold));
	}
	emit(e) {
		if (e.scale !== 1) {
			let t = e.scale < 1 ? "in" : "out";
			e.additionalEvent = this.options.event + t;
		}
		super.emit(e);
	}
	handleTrackpadEvent(e) {
		e.isFirst && (this.trackpadGesture = e.srcEvent.ctrlKey, !this.trackpadGesture && this.state & (J.Recognized | J.Cancelled | J.Failed) && (this.state = J.Possible)), this.trackpadGesture && (this.recognize(this.getTrackpadInput(e, {
			deltaX: 0,
			deltaY: 0,
			velocity: 0,
			velocityX: 0,
			velocityY: 0,
			overallVelocity: 0,
			overallVelocityX: 0,
			overallVelocityY: 0,
			scale: Math.exp(-e.deltaY / 100)
		})), e.isFinal && (this.trackpadGesture = !1));
	}
}, Db = class {
	constructor(e, t, n) {
		this.element = e, this.callback = t, this.options = n;
	}
	listen(e, t) {
		t ? this.element.addEventListener(e, this.handleEvent, { passive: !1 }) : this.element.removeEventListener(e, this.handleEvent);
	}
}, Ob = (typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "").indexOf("firefox") !== -1, kb = 40, Ab = .25, jb = class extends Db {
	constructor(e, t, n) {
		n.enable = n.enable ?? !1, super(e, t, n), this.handleEvent = (e) => {
			if (!this.options.enable) return;
			let t = e.deltaY;
			globalThis.WheelEvent && (Ob && e.deltaMode === globalThis.WheelEvent.DOM_DELTA_PIXEL && (t /= globalThis.devicePixelRatio), e.deltaMode === globalThis.WheelEvent.DOM_DELTA_LINE && (t *= kb)), e.shiftKey && t && (t *= Ab), this.callback({
				type: "wheel",
				center: {
					x: e.clientX,
					y: e.clientY
				},
				delta: -t,
				device: this.options.wheelSession?.device ?? "unknown",
				srcEvent: e,
				pointerType: "mouse",
				target: e.target
			});
		}, n.enable && (this.wheelSessionUnsubscribe = this.options.wheelSession?.on(() => {}), this.listen("wheel", !0));
	}
	destroy() {
		this.listen("wheel", !1), this.wheelSessionUnsubscribe?.(), this.wheelSessionUnsubscribe = void 0;
	}
	enableEventType(e, t) {
		e === "wheel" && this.options.enable !== t && (this.options.enable = t, t && !this.wheelSessionUnsubscribe && (this.wheelSessionUnsubscribe = this.options.wheelSession?.on(() => {})), this.listen("wheel", t), t || (this.wheelSessionUnsubscribe?.(), this.wheelSessionUnsubscribe = void 0));
	}
}, Mb = 4.000244140625, Nb = 40, Pb = 0, Fb = 1, Ib = 40, Lb = 40, Rb = 120, zb = {
	classificationDelay: 32,
	endDelay: 80
}, Bb = class {
	constructor(e, t = {}) {
		this.subscriptions = /* @__PURE__ */ new Map(), this.session = null, this.classificationTimer = null, this.endTimer = null, this.pressedControlKeys = /* @__PURE__ */ new Set(), this.listeningForControlKeys = !1, this.handleEvent = (e) => {
			if (!this.hasSubscribers) return "unknown";
			let t = Hb(e, this.pressedControlKeys.size > 0), n = this.session;
			if (n && t.timeStamp - n.lastTimeStamp >= this.options.endDelay) {
				if (this.end(), !this.hasSubscribers) return "unknown";
				n = null;
			}
			n ? (this.scheduleEnd(), this.addSample(n, t)) : (n = this.startPendingSession(t), this.scheduleEnd());
			let { device: r } = n;
			return r === "unknown" && (r = Ub(n.samples, !1), r !== "unknown" && this.begin(n, r)), r;
		}, this.finishClassification = () => {
			if (this.classificationTimer = null, !this.session || this.session.device !== "unknown") return;
			let e = this.session, t = Ub(e.samples, !0);
			this.begin(e, t === "unknown" ? "mouse" : t);
		}, this.end = () => {
			if (!this.session) return;
			if (this.session.device === "unknown") {
				let e = this.session, t = Ub(e.samples, !0);
				this.begin(e, t === "unknown" ? "mouse" : t);
			}
			if (!this.session) return;
			let e = this.session;
			this.emit(K.End, e.lastEvent), this.reset();
		}, this.handleKeyDown = (e) => {
			e.key === "Control" && this.pressedControlKeys.add(e.code || e.key);
		}, this.handleKeyUp = (e) => {
			e.key === "Control" && (e.code ? this.pressedControlKeys.delete(e.code) : this.pressedControlKeys.clear());
		}, this.handleWindowBlur = () => {
			this.pressedControlKeys.clear();
		}, this.element = e, this.options = {
			...zb,
			...t
		}, this.element?.addEventListener("wheel", this.handleEvent, { passive: !0 });
	}
	get hasSubscribers() {
		return this.subscriptions.size > 0;
	}
	get device() {
		return this.session?.device ?? "unknown";
	}
	on(e) {
		let t = { listener: e };
		return this.subscriptions.set(e, t), this.updateControlKeyEventListeners(), () => {
			this.subscriptions.get(e) === t && this.off(e);
		};
	}
	off(e) {
		this.subscriptions.delete(e), this.updateControlKeyEventListeners(), this.hasSubscribers || this.reset();
	}
	cancel() {
		let e = this.session;
		e && e.device !== "unknown" && this.emit(K.Cancel, e.lastEvent), this.reset();
	}
	destroy() {
		this.cancel(), this.subscriptions.clear(), this.updateControlKeyEventListeners(), this.element?.removeEventListener("wheel", this.handleEvent);
	}
	startPendingSession(e) {
		let t = {
			samples: [e],
			device: "unknown",
			firstTimeStamp: e.timeStamp,
			lastTimeStamp: e.timeStamp,
			totalDeltaX: e.deltaX,
			totalDeltaY: e.deltaY,
			velocityX: 0,
			velocityY: 0,
			lastEvent: e.event
		};
		return this.session = t, this.classificationTimer = globalThis.setTimeout(this.finishClassification, this.options.classificationDelay), t;
	}
	addSample(e, t) {
		if (e.samples.push(t), e.lastTimeStamp = t.timeStamp, e.lastEvent = t.event, e.totalDeltaX += t.deltaX, e.totalDeltaY += t.deltaY, e.device !== "unknown") {
			let n = e.samples[e.samples.length - 2], r = t.timeStamp - n.timeStamp;
			e.velocityX = r > 0 ? t.deltaX / r : 0, e.velocityY = r > 0 ? t.deltaY / r : 0, this.emit(K.Move, t.event, {
				velocityX: e.velocityX,
				velocityY: e.velocityY
			});
		}
	}
	begin(e, t) {
		e.device = t, this.clearClassificationTimer(), this.emit(K.Start, e.samples[0].event);
		let n = e.lastTimeStamp - e.firstTimeStamp;
		e.velocityX = n > 0 ? e.totalDeltaX / n : 0, e.velocityY = n > 0 ? e.totalDeltaY / n : 0, this.emit(K.Move, e.lastEvent, {
			velocityX: e.velocityX,
			velocityY: e.velocityY
		});
	}
	scheduleEnd() {
		this.clearEndTimer(), this.endTimer = globalThis.setTimeout(this.end, this.options.endDelay);
	}
	emit(e, t, n) {
		let r = this.session;
		if (!r || r.device === "unknown") return;
		let i = e === K.Start, a = e === K.End || e === K.Cancel, o = i ? r.firstTimeStamp : r.lastTimeStamp, s = i ? 0 : Math.max(0, o - r.firstTimeStamp), c = i ? 0 : r.totalDeltaX, l = i ? 0 : r.totalDeltaY, u = s > 0 ? c / s : 0, d = s > 0 ? l / s : 0, f = i ? 0 : n?.velocityX ?? r.velocityX, p = i ? 0 : n?.velocityY ?? r.velocityY, m = {
			eventType: e,
			device: r.device,
			srcEvent: t,
			timeStamp: o,
			center: {
				x: t.clientX,
				y: t.clientY
			},
			deltaX: c,
			deltaY: l,
			deltaTime: s,
			velocity: Math.abs(f) > Math.abs(p) ? f : p,
			velocityX: f,
			velocityY: p,
			overallVelocity: Math.abs(u) > Math.abs(d) ? u : d,
			overallVelocityX: u,
			overallVelocityY: d,
			isFirst: i,
			isFinal: a
		};
		for (let { listener: e } of [...this.subscriptions.values()]) e(m);
	}
	reset() {
		this.clearClassificationTimer(), this.clearEndTimer(), this.session = null;
	}
	clearClassificationTimer() {
		this.classificationTimer !== null && (globalThis.clearTimeout(this.classificationTimer), this.classificationTimer = null);
	}
	clearEndTimer() {
		this.endTimer !== null && (globalThis.clearTimeout(this.endTimer), this.endTimer = null);
	}
	updateControlKeyEventListeners() {
		let e = this.hasSubscribers, t = Vb();
		t && e !== this.listeningForControlKeys && (this.listeningForControlKeys = e, e ? (t.addEventListener("keydown", this.handleKeyDown, !0), t.addEventListener("keyup", this.handleKeyUp, !0), t.addEventListener("blur", this.handleWindowBlur)) : (t.removeEventListener("keydown", this.handleKeyDown, !0), t.removeEventListener("keyup", this.handleKeyUp, !0), t.removeEventListener("blur", this.handleWindowBlur), this.pressedControlKeys.clear()));
	}
};
function Vb() {
	return typeof window < "u" ? window : globalThis.document?.defaultView;
}
function Hb(e, t) {
	let n = e.deltaX, r = e.deltaY;
	return e.deltaMode === Fb && (n *= Nb, r *= Nb), {
		event: e,
		timeStamp: e.timeStamp,
		deltaX: n,
		deltaY: r,
		isControlKeyDown: t
	};
}
function Ub(e, t) {
	return e.some(({ event: e, isControlKeyDown: t }) => e.ctrlKey && !t) ? "trackpad" : e.some(({ event: e }) => e.deltaMode !== Pb) || e.some(Wb) || e.every(({ event: e }) => {
		let t = e.wheelDelta;
		return t !== void 0 && Math.abs(t) % 40 == 0;
	}) ? "mouse" : e.some(({ deltaX: e }) => e !== 0) || e.length > 1 && Gb(e) ? "trackpad" : t ? "mouse" : "unknown";
}
function Wb({ event: e, deltaX: t, deltaY: n }) {
	if (t !== 0 || n === 0) return !1;
	let r = Math.abs(n / Mb);
	if (Number.isInteger(r)) return !0;
	let i = e.wheelDelta;
	return typeof i == "number" && i !== 0 && i % Rb === 0;
}
function Gb(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (Math.abs(n.deltaX) > Lb || Math.abs(n.deltaY) > Lb || t > 0 && n.timeStamp - e[t - 1].timeStamp > Ib) return !1;
	}
	return !0;
}
//#endregion
//#region node_modules/mjolnir.js/dist/inputs/move-input.js
var Kb = [
	"mousedown",
	"mousemove",
	"mouseup",
	"mouseover",
	"mouseout",
	"mouseenter",
	"mouseleave"
], qb = class extends Db {
	constructor(e, t, n) {
		super(e, t, {
			enable: !0,
			...n
		}), this.handleEvent = (e) => {
			this.handleOverEvent(e), this.handleOutEvent(e), this.handleEnterEvent(e), this.handleLeaveEvent(e), this.handleMoveEvent(e);
		}, this.pressed = !1;
		let { enable: r = !1 } = this.options;
		this.enableMoveEvent = r, this.enableLeaveEvent = r, this.enableEnterEvent = r, this.enableOutEvent = r, this.enableOverEvent = r, r && Kb.forEach((e) => this.listen(e, !0));
	}
	destroy() {
		Kb.forEach((e) => this.listen(e, !1));
	}
	enableEventType(e, t) {
		switch (e) {
			case "pointermove":
				this.enableMoveEvent !== t && (this.enableMoveEvent = t, this.listen("mousedown", t), this.listen("mousemove", t), this.listen("mouseup", t));
				break;
			case "pointerover":
				this.enableOverEvent !== t && (this.enableOverEvent = t, this.listen("mouseover", t));
				break;
			case "pointerout":
				this.enableOutEvent !== t && (this.enableOutEvent = t, this.listen("mouseout", t));
				break;
			case "pointerenter":
				this.enableEnterEvent !== t && (this.enableEnterEvent = t, this.listen("mouseenter", t));
				break;
			case "pointerleave": this.enableLeaveEvent !== t && (this.enableLeaveEvent = t, this.listen("mouseleave", t));
		}
	}
	handleOverEvent(e) {
		this.enableOverEvent && e.type === "mouseover" && this._emit("pointerover", e);
	}
	handleOutEvent(e) {
		this.enableOutEvent && e.type === "mouseout" && this._emit("pointerout", e);
	}
	handleEnterEvent(e) {
		this.enableEnterEvent && e.type === "mouseenter" && this._emit("pointerenter", e);
	}
	handleLeaveEvent(e) {
		this.enableLeaveEvent && e.type === "mouseleave" && this._emit("pointerleave", e);
	}
	handleMoveEvent(e) {
		if (this.enableMoveEvent) switch (e.type) {
			case "mousedown":
				e.button >= 0 && (this.pressed = !0);
				break;
			case "mousemove":
				e.buttons === 0 && (this.pressed = !1), this.pressed || this._emit("pointermove", e);
				break;
			case "mouseup": this.pressed = !1;
		}
	}
	_emit(e, t) {
		this.callback({
			type: e,
			center: {
				x: t.clientX,
				y: t.clientY
			},
			srcEvent: t,
			pointerType: "mouse",
			target: t.target
		});
	}
}, Jb = ["keydown", "keyup"], Yb = class extends Db {
	constructor(e, t, n) {
		super(e, t, {
			enable: !0,
			tabIndex: 0,
			...n
		}), this.handleEvent = (e) => {
			let t = e.target || e.srcElement;
			t.tagName === "INPUT" && t.type === "text" || t.tagName === "TEXTAREA" || (this.enableDownEvent && e.type === "keydown" && this.callback({
				type: "keydown",
				srcEvent: e,
				key: e.key,
				target: e.target
			}), this.enableUpEvent && e.type === "keyup" && this.callback({
				type: "keyup",
				srcEvent: e,
				key: e.key,
				target: e.target
			}));
		};
		let { enable: r = !1 } = this.options;
		this.enableDownEvent = r, this.enableUpEvent = r, e.tabIndex = this.options.tabIndex, e.style.outline = "none", r && Jb.forEach((e) => this.listen(e, !0));
	}
	destroy() {
		Jb.forEach((e) => this.listen(e, !1));
	}
	enableEventType(e, t) {
		e === "keydown" && this.enableDownEvent !== t && (this.enableDownEvent = t, this.listen(e, t)), e === "keyup" && this.enableUpEvent !== t && (this.enableUpEvent = t, this.listen(e, t));
	}
}, Xb = class extends Db {
	constructor(e, t, n) {
		n.enable = n.enable ?? !1, super(e, t, n), this.handleEvent = (e) => {
			this.options.enable && this.callback({
				type: "contextmenu",
				center: {
					x: e.clientX,
					y: e.clientY
				},
				srcEvent: e,
				pointerType: "mouse",
				target: e.target
			});
		}, n.enable && this.listen("contextmenu", !0);
	}
	destroy() {
		this.listen("contextmenu", !1);
	}
	enableEventType(e, t) {
		e === "contextmenu" && this.options.enable !== t && (this.options.enable = t, this.listen("contextmenu", t));
	}
}, Zb = 1, Qb = 2, $b = 4, ex = {
	pointerdown: Zb,
	pointermove: Qb,
	pointerup: $b,
	mousedown: Zb,
	mousemove: Qb,
	mouseup: $b
}, tx = 0, nx = 1, rx = 2, ix = 1, ax = 2, ox = 4;
function sx(e) {
	let t = ex[e.srcEvent.type];
	if (!t) return null;
	let { buttons: n, button: r } = e.srcEvent, i = !1, a = !1, o = !1;
	return t === Qb ? (i = !!(n & ix), a = !!(n & ox), o = !!(n & ax)) : (i = r === tx, a = r === nx, o = r === rx), {
		leftButton: i,
		middleButton: a,
		rightButton: o
	};
}
function cx(e, t) {
	let n = e.center;
	if (!n) return null;
	let r = t.getBoundingClientRect(), i = r.width / t.offsetWidth || 1, a = r.height / t.offsetHeight || 1;
	return {
		center: n,
		offsetCenter: {
			x: (n.x - r.left - t.clientLeft) / i,
			y: (n.y - r.top - t.clientTop) / a
		}
	};
}
//#endregion
//#region node_modules/mjolnir.js/dist/utils/event-registrar.js
var lx = {
	srcElement: "root",
	priority: 0
}, ux = class {
	constructor(e, t) {
		this.handleEvent = (e) => {
			if (this.isEmpty()) return;
			let t = this._normalizeEvent(e), n = e.srcEvent.target;
			for (; n && n !== t.rootElement;) {
				if (this._emit(t, n), t.handled) return;
				n = n.parentNode;
			}
			this._emit(t, "root");
		}, this.eventManager = e, this.recognizerName = t, this.handlers = [], this.handlersByElement = /* @__PURE__ */ new Map(), this._active = !1;
	}
	isEmpty() {
		return !this._active;
	}
	add(e, t, n, r = !1, i = !1) {
		let { handlers: a, handlersByElement: o } = this, s = {
			...lx,
			...n
		}, c = o.get(s.srcElement);
		c || (c = [], o.set(s.srcElement, c));
		let l = {
			type: e,
			handler: t,
			srcElement: s.srcElement,
			priority: s.priority
		};
		r && (l.once = !0), i && (l.passive = !0), a.push(l), this._active = this._active || !l.passive;
		let u = c.length - 1;
		for (; u >= 0 && !(c[u].priority >= l.priority);) u--;
		c.splice(u + 1, 0, l);
	}
	remove(e, t) {
		let { handlers: n, handlersByElement: r } = this;
		for (let i = n.length - 1; i >= 0; i--) {
			let a = n[i];
			if (a.type === e && a.handler === t) {
				n.splice(i, 1);
				let e = r.get(a.srcElement);
				e.splice(e.indexOf(a), 1), e.length === 0 && r.delete(a.srcElement);
			}
		}
		this._active = n.some((e) => !e.passive);
	}
	_emit(e, t) {
		let n = this.handlersByElement.get(t);
		if (n) {
			let t = !1, r = () => {
				e.handled = !0;
			}, i = () => {
				e.handled = !0, t = !0;
			}, a = [];
			for (let o = 0; o < n.length; o++) {
				let { type: s, handler: c, once: l } = n[o];
				if (c({
					...e,
					type: s,
					stopPropagation: r,
					stopImmediatePropagation: i
				}), l && a.push(n[o]), t) break;
			}
			for (let e = 0; e < a.length; e++) {
				let { type: t, handler: n } = a[e];
				this.remove(t, n);
			}
		}
	}
	_normalizeEvent(e) {
		let t = this.eventManager.getElement();
		return {
			...e,
			...sx(e),
			...cx(e, t),
			preventDefault: () => {
				e.srcEvent.preventDefault();
			},
			stopImmediatePropagation: null,
			stopPropagation: null,
			handled: !1,
			rootElement: t
		};
	}
};
//#endregion
//#region node_modules/mjolnir.js/dist/event-manager.js
function dx(e) {
	if ("recognizer" in e) return e;
	let t, n = Array.isArray(e) ? [...e] : [e];
	return t = typeof n[0] == "function" ? new (n.shift())(n.shift() || {}) : n.shift(), {
		recognizer: t,
		recognizeWith: typeof n[0] == "string" ? [n[0]] : n[0],
		requireFailure: typeof n[1] == "string" ? [n[1]] : n[1]
	};
}
var fx = class {
	constructor(e = null, t = {}) {
		if (this._onBasicInput = (e) => {
			this.manager.emit(e.srcEvent.type, e);
		}, this._onOtherEvent = (e) => {
			this.manager.emit(e.type, e);
		}, this.options = {
			recognizers: [],
			events: {},
			touchAction: "compute",
			tabIndex: 0,
			cssProps: {},
			...t
		}, this.events = /* @__PURE__ */ new Map(), this.element = e, this.wheelSession = new Bb(e), e) {
			this.manager = new db(e, this.options);
			for (let e of this.options.recognizers) {
				let { recognizer: t, recognizeWith: n, requireFailure: r } = dx(e);
				this.manager.add(t), n && t.recognizeWith(n), r && t.requireFailure(r);
			}
			this.manager.on("hammer.input", this._onBasicInput), this.wheelInput = new jb(e, this._onOtherEvent, {
				enable: !1,
				wheelSession: this.wheelSession
			}), this.moveInput = new qb(e, this._onOtherEvent, { enable: !1 }), this.keyInput = new Yb(e, this._onOtherEvent, {
				enable: !1,
				tabIndex: t.tabIndex
			}), this.contextmenuInput = new Xb(e, this._onOtherEvent, { enable: !1 }), this.on(this.options.events);
		}
	}
	getElement() {
		return this.element;
	}
	destroy() {
		this.element ? (this.wheelInput.destroy(), this.wheelSession.destroy(), this.moveInput.destroy(), this.keyInput.destroy(), this.contextmenuInput.destroy(), this.manager.destroy()) : this.wheelSession.destroy();
	}
	on(e, t, n) {
		this._addEventHandler(e, t, n, !1);
	}
	once(e, t, n) {
		this._addEventHandler(e, t, n, !0);
	}
	watch(e, t, n) {
		this._addEventHandler(e, t, n, !1, !0);
	}
	off(e, t) {
		this._removeEventHandler(e, t);
	}
	emit(e) {
		this.manager?.emit(e.type, e);
	}
	_toggleRecognizer(e, t) {
		let { manager: n } = this;
		if (!n) return;
		let r = n.get(e);
		r && (r.set({
			enable: t,
			wheelSession: this.wheelSession
		}), n.touchAction.update()), this.wheelInput?.enableEventType(e, t), this.moveInput?.enableEventType(e, t), this.keyInput?.enableEventType(e, t), this.contextmenuInput?.enableEventType(e, t);
	}
	_addEventHandler(e, t, n, r, i) {
		if (typeof e != "string") {
			n = t;
			for (let [t, a] of Object.entries(e)) this._addEventHandler(t, a, n, r, i);
			return;
		}
		let { manager: a, events: o } = this;
		if (!a) return;
		let s = o.get(e);
		if (!s) {
			let t = this._getRecognizerName(e) || e;
			s = new ux(this, t), o.set(e, s), a && a.on(e, s.handleEvent);
		}
		s.add(e, t, n, r, i), s.isEmpty() || this._toggleRecognizer(s.recognizerName, !0);
	}
	_removeEventHandler(e, t) {
		if (typeof e != "string") {
			for (let [t, n] of Object.entries(e)) this._removeEventHandler(t, n);
			return;
		}
		let { events: n } = this, r = n.get(e);
		if (r && (r.remove(e, t), r.isEmpty())) {
			let { recognizerName: e } = r, t = !1;
			for (let r of n.values()) if (r.recognizerName === e && !r.isEmpty()) {
				t = !0;
				break;
			}
			t || this._toggleRecognizer(e, !1);
		}
	}
	_getRecognizerName(e) {
		return this.manager.recognizers.find((t) => t.getEventNames().includes(e))?.options.event;
	}
}, px = {
	DEFAULT: "default",
	LNGLAT: "lnglat",
	METER_OFFSETS: "meter-offsets",
	LNGLAT_OFFSETS: "lnglat-offsets",
	CARTESIAN: "cartesian"
};
Object.defineProperty(px, "IDENTITY", { get: () => (B.deprecated("COORDINATE_SYSTEM.IDENTITY", "COORDINATE_SYSTEM.CARTESIAN")(), px.CARTESIAN) });
var mx = {
	WEB_MERCATOR: 1,
	GLOBE: 2,
	WEB_MERCATOR_AUTO_OFFSET: 4,
	IDENTITY: 0
}, hx = {
	common: 0,
	meters: 1,
	pixels: 2
}, gx = {
	click: "onClick",
	dblclick: "onClick",
	panstart: "onDragStart",
	panmove: "onDrag",
	panend: "onDragEnd"
}, _x = {
	multipan: [wb, {
		threshold: 10,
		pointers: 2,
		trackpad: !0
	}],
	pinch: [
		Eb,
		{ trackpad: !0 },
		null,
		["multipan"]
	],
	pan: [
		wb,
		{ threshold: 1 },
		["pinch"],
		["multipan"]
	],
	dblclick: [xb, {
		event: "dblclick",
		taps: 2,
		enable: !1
	}],
	dblclickdrag: [
		bb,
		{
			event: "dblclickdrag",
			enable: !1
		},
		["dblclick"],
		null
	],
	click: [
		xb,
		{ event: "click" },
		["dblclickdrag"],
		["dblclick", "dblclickdrag"]
	]
};
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/memoize.js
function vx(e, t) {
	if (e === t) return !0;
	if (Array.isArray(e)) {
		let n = e.length;
		if (!t || t.length !== n) return !1;
		for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
		return !0;
	}
	return !1;
}
function yx(e) {
	let t = {}, n;
	return (r) => {
		for (let i in r) if (!vx(r[i], t[i])) {
			n = e(r), t = r;
			break;
		}
		return n;
	};
}
//#endregion
//#region node_modules/@deck.gl/core/dist/shaderlib/project/viewport-uniforms.js
W();
var bx = [
	0,
	0,
	0,
	0
], xx = [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0
], Sx = [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
], Cx = [
	0,
	0,
	0
], wx = [
	0,
	0,
	0
], Tx = {
	default: -1,
	cartesian: 0,
	lnglat: 1,
	"meter-offsets": 2,
	"lnglat-offsets": 3
};
function Ex(e) {
	let t = Tx[e];
	if (t === void 0) throw Error(`Invalid coordinateSystem: ${e}`);
	return t;
}
var Dx = yx(jx);
function Ox(e, t, n = wx) {
	n.length < 3 && (n = [
		n[0],
		n[1],
		0
	]);
	let r = n, i, a = !0;
	switch (i = t === "lnglat-offsets" || t === "meter-offsets" ? n : e.isGeospatial ? [
		Math.fround(e.longitude),
		Math.fround(e.latitude),
		0
	] : null, e.projectionMode) {
		case mx.WEB_MERCATOR:
			(t === "lnglat" || t === "cartesian") && (i = [
				0,
				0,
				0
			], a = !1);
			break;
		case mx.WEB_MERCATOR_AUTO_OFFSET:
			t === "lnglat" ? r = i : t === "cartesian" && (r = [
				Math.fround(e.center[0]),
				Math.fround(e.center[1]),
				0
			], i = e.unprojectPosition(r), r[0] -= n[0], r[1] -= n[1], r[2] -= n[2]);
			break;
		case mx.IDENTITY:
			r = e.position.map(Math.fround), r[2] = r[2] || 0;
			break;
		case mx.GLOBE:
			a = !1, i = null;
			break;
		default: a = !1;
	}
	return {
		geospatialOrigin: i,
		shaderCoordinateOrigin: r,
		offsetMode: a
	};
}
function kx(e, t, n) {
	let { viewMatrixUncentered: r, projectionMatrix: i } = e, { viewMatrix: a, viewProjectionMatrix: o } = e, s = bx, c = bx, l = e.cameraPosition, { geospatialOrigin: u, shaderCoordinateOrigin: d, offsetMode: f } = Ox(e, t, n);
	return f && (c = e.projectPosition(u || d), l = [
		l[0] - c[0],
		l[1] - c[1],
		l[2] - c[2]
	], c[3] = 1, s = Av([], c, o), a = r || a, o = pv([], i, a), o = pv([], o, xx)), {
		viewMatrix: a,
		viewProjectionMatrix: o,
		projectionCenter: s,
		originCommon: c,
		cameraPosCommon: l,
		shaderCoordinateOrigin: d,
		geospatialOrigin: u
	};
}
function Ax({ viewport: e, devicePixelRatio: t = 1, modelMatrix: n = null, coordinateSystem: r = "default", coordinateOrigin: i = wx, autoWrapLongitude: a = !1 }) {
	r === "default" && (r = e.isGeospatial ? "lnglat" : "cartesian");
	let o = Dx({
		viewport: e,
		devicePixelRatio: t,
		coordinateSystem: r,
		coordinateOrigin: i
	});
	return o.wrapLongitude = a, o.modelMatrix = n || Sx, o;
}
function jx({ viewport: e, devicePixelRatio: t, coordinateSystem: n, coordinateOrigin: r }) {
	let { projectionCenter: i, viewProjectionMatrix: a, originCommon: o, cameraPosCommon: s, shaderCoordinateOrigin: c, geospatialOrigin: l } = kx(e, n, r), u = e.getDistanceScales(), d = [e.width * t, e.height * t], f = Av([], [
		0,
		0,
		-e.focalDistance,
		1
	], e.projectionMatrix)[3] || 1, p = {
		coordinateSystem: Ex(n),
		projectionMode: e.projectionMode,
		coordinateOrigin: c,
		commonOrigin: o.slice(0, 3),
		center: i,
		pseudoMeters: !!e._pseudoMeters,
		viewportSize: d,
		devicePixelRatio: t,
		focalDistance: f,
		commonUnitsPerMeter: u.unitsPerMeter,
		commonUnitsPerWorldUnit: u.unitsPerMeter,
		commonUnitsPerWorldUnit2: Cx,
		scale: e.scale,
		wrapLongitude: !1,
		viewProjectionMatrix: a,
		modelMatrix: Sx,
		cameraPosition: s
	};
	if (l) {
		let t = e.getDistanceScales(l);
		switch (n) {
			case "meter-offsets":
				p.commonUnitsPerWorldUnit = t.unitsPerMeter, p.commonUnitsPerWorldUnit2 = t.unitsPerMeter2;
				break;
			case "lnglat":
			case "lnglat-offsets":
				e._pseudoMeters || (p.commonUnitsPerMeter = t.unitsPerMeter), p.commonUnitsPerWorldUnit = t.unitsPerDegree, p.commonUnitsPerWorldUnit2 = t.unitsPerDegree2;
				break;
			case "cartesian": p.commonUnitsPerWorldUnit = [
				1,
				1,
				t.unitsPerMeter[2]
			], p.commonUnitsPerWorldUnit2 = [
				0,
				0,
				t.unitsPerMeter2[2]
			];
		}
	}
	if (e.projectionMode === mx.GLOBE && n === "meter-offsets") {
		let e = r[0] * Math.PI / 180, t = r[1] * Math.PI / 180, n = Math.cos(t), i = ((r[2] || 0) / 6370972 + 1) * 256;
		p.commonOrigin = [
			Math.sin(e) * n * i,
			-Math.cos(e) * n * i,
			Math.sin(t) * i
		];
	}
	return p;
}
var Mx = `\
${`\
${[
	"default",
	"lnglat",
	"meter-offsets",
	"lnglat-offsets",
	"cartesian"
].map((e) => `const COORDINATE_SYSTEM_${e.toUpperCase().replaceAll("-", "_")}: i32 = ${Ex(e)};`).join("")}
${Object.keys(mx).map((e) => `const PROJECTION_MODE_${e}: i32 = ${mx[e]};`).join("")}
${Object.keys(hx).map((e) => `const UNIT_${e.toUpperCase()}: i32 = ${hx[e]};`).join("")}

const TILE_SIZE: f32 = 512.0;
const PI: f32 = 3.1415926536;
const WORLD_SCALE: f32 = TILE_SIZE / (PI * 2.0);
const ZERO_64_LOW: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);
const EARTH_RADIUS: f32 = 6370972.0; // meters
const GLOBE_RADIUS: f32 = 256.0;

// -----------------------------------------------------------------------------
// Uniform block (converted from GLSL uniform block)
// -----------------------------------------------------------------------------
struct ProjectUniforms {
  wrapLongitude: i32,
  coordinateSystem: i32,
  commonUnitsPerMeter: vec3<f32>,
  projectionMode: i32,
  scale: f32,
  commonUnitsPerWorldUnit: vec3<f32>,
  commonUnitsPerWorldUnit2: vec3<f32>,
  center: vec4<f32>,
  modelMatrix: mat4x4<f32>,
  viewProjectionMatrix: mat4x4<f32>,
  viewportSize: vec2<f32>,
  devicePixelRatio: f32,
  focalDistance: f32,
  cameraPosition: vec3<f32>,
  coordinateOrigin: vec3<f32>,
  commonOrigin: vec3<f32>,
  pseudoMeters: i32,
};

@group(0) @binding(auto)
var<uniform> project: ProjectUniforms;

// -----------------------------------------------------------------------------
// Geometry data shared across the project helpers.
// The active layer shader is responsible for populating this private module
// state before calling the project functions below.
// -----------------------------------------------------------------------------

// Structure to carry additional geometry data used by deck.gl filters.
struct Geometry {
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  position: vec4<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry: Geometry;
`}

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

// Returns an adjustment factor for commonUnitsPerMeter
fn _project_size_at_latitude(lat: f32) -> f32 {
  let y = clamp(lat, -89.9, 89.9);
  return 1.0 / cos(radians(y));
}

// Overloaded version: scales a value in meters at a given latitude.
fn _project_size_at_latitude_m(meters: f32, lat: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * _project_size_at_latitude(lat);
}

// Computes a non-linear scale factor based on geometry.
// (Note: This function relies on "geometry" being provided.)
fn project_size() -> f32 {
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
      project.pseudoMeters == 0) {
    if (geometry.position.w == 0.0) {
      return _project_size_at_latitude(geometry.worldPosition.y);
    }
    let y: f32 = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
    let y2 = y * y;
    let y4 = y2 * y2;
    let y6 = y4 * y2;
    return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
  }
  return 1.0;
}

// Overloads to scale offsets (meters to world units)
fn project_size_float(meters: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * project_size();
}

fn project_size_vec2(meters: vec2<f32>) -> vec2<f32> {
  return meters * project.commonUnitsPerMeter.xy * project_size();
}

fn project_size_vec3(meters: vec3<f32>) -> vec3<f32> {
  return meters * project.commonUnitsPerMeter * project_size();
}

fn project_size_vec4(meters: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(meters.xyz * project.commonUnitsPerMeter, meters.w);
}

// Returns a rotation matrix aligning the z‑axis with the given up vector.
fn project_get_orientation_matrix(up: vec3<f32>) -> mat3x3<f32> {
  let uz = normalize(up);
  let ux = select(
    vec3<f32>(1.0, 0.0, 0.0),
    normalize(vec3<f32>(uz.y, -uz.x, 0.0)),
    abs(uz.z) == 1.0
  );
  let uy = cross(uz, ux);
  return mat3x3<f32>(ux, uy, uz);
}

// Since WGSL does not support "out" parameters, we return a struct.
struct RotationResult {
  needsRotation: bool,
  transform: mat3x3<f32>,
};

fn project_needs_rotation(commonPosition: vec3<f32>) -> RotationResult {
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    return RotationResult(true, project_get_orientation_matrix(commonPosition));
  } else {
    return RotationResult(false, mat3x3<f32>());  // identity alternative if needed
  };
}

// Projects a normal vector from the current coordinate system to world space.
fn project_normal(vector: vec3<f32>) -> vec3<f32> {
  let normal_modelspace = project.modelMatrix * vec4<f32>(vector, 0.0);
  var n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
  let rotResult = project_needs_rotation(geometry.position.xyz);
  if (rotResult.needsRotation) {
    n = rotResult.transform * n;
  }
  return n;
}

// Applies a scale offset based on y-offset (dy)
fn project_offset_(offset: vec4<f32>) -> vec4<f32> {
  let dy: f32 = offset.y;
  let commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
  return vec4<f32>(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}

// Projects lng/lat coordinates to a unit tile [0,1]
fn project_mercator_(lnglat: vec2<f32>) -> vec2<f32> {
  var x = lnglat.x;
  if (project.wrapLongitude != 0) {
    x = ((x + 180.0) % 360.0) - 180.0;
  }
  let y = clamp(lnglat.y, -89.9, 89.9);
  return vec2<f32>(
    radians(x) + PI,
    PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
  ) * WORLD_SCALE;
}

// Projects lng/lat/z coordinates for a globe projection.
fn project_globe_(lnglatz: vec3<f32>) -> vec3<f32> {
  let lambda = radians(lnglatz.x);
  let phi = radians(lnglatz.y);
  let cosPhi = cos(phi);
  let D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
  return vec3<f32>(
    sin(lambda) * cosPhi,
    -cos(lambda) * cosPhi,
    sin(phi)
  ) * D;
}

// Projects positions (with an optional 64-bit low part) from the input
// coordinate system to the common space.
fn project_position_vec4_f64(position: vec4<f32>, position64Low: vec3<f32>) -> vec4<f32> {
  var position_world = project.modelMatrix * position;

  // Work around for a Mac+NVIDIA bug:
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_mercator_(position_world.xy),
        _project_size_at_latitude_m(position_world.z, position_world.y),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
      position_world = vec4f(position_world.xyz + project.coordinateOrigin, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_globe_(position_world.xyz),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
      let enuMatrix = project_get_orientation_matrix(project.commonOrigin);
      let metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
      let offsetCommon = (enuMatrix * vec3<f32>(-position_world.x, -position_world.y, position_world.z)) * metersToCommon;
      return vec4<f32>(project.commonOrigin + offsetCommon, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
        return vec4<f32>(
          project_mercator_(position_world.xy) - project.commonOrigin.xy,
          project_size_float(position_world.z),
          position_world.w
        );
      }
    }
  }
  if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
      (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
       (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
        project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
    position_world = vec4f(position_world.xyz - project.coordinateOrigin, position_world.w);
  }

  return project_offset_(position_world) +
         project_offset_(project.modelMatrix * vec4<f32>(position64Low, 0.0));
}

// Overloaded versions for different input types.
fn project_position_vec4_f32(position: vec4<f32>) -> vec4<f32> {
  return project_position_vec4_f64(position, ZERO_64_LOW);
}

fn project_position_vec3_f64(position: vec3<f32>, position64Low: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), position64Low);
  return projected_position.xyz;
}

fn project_position_vec3_f32(position: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), ZERO_64_LOW);
  return projected_position.xyz;
}

fn project_position_vec2_f32(position: vec2<f32>) -> vec2<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 0.0, 1.0), ZERO_64_LOW);
  return projected_position.xy;
}

// Transforms a common space position to clip space.
fn project_common_position_to_clipspace_with_projection(position: vec4<f32>, viewProjectionMatrix: mat4x4<f32>, center: vec4<f32>) -> vec4<f32> {
  var clipPosition = viewProjectionMatrix * position + center;
  // deck.gl projection matrices use WebGL's [-w, w] depth range; WebGPU clips z to [0, w].
  clipPosition.z = (clipPosition.z + clipPosition.w) * 0.5;
  return clipPosition;
}

// Uses the project viewProjectionMatrix and center.
fn project_common_position_to_clipspace(position: vec4<f32>) -> vec4<f32> {
  return project_common_position_to_clipspace_with_projection(position, project.viewProjectionMatrix, project.center);
}

// Returns a clip space offset corresponding to a given number of screen pixels.
fn project_pixel_size_to_clipspace(pixels: vec2<f32>) -> vec2<f32> {
  let offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
  return offset * project.focalDistance;
}

fn project_meter_size_to_pixel(meters: f32) -> f32 {
  return project_size_float(meters) * project.scale;
}

fn project_unit_size_to_pixel(size: f32, unit: i32) -> f32 {
  if (unit == UNIT_METERS) {
    return project_meter_size_to_pixel(size);
  } else if (unit == UNIT_COMMON) {
    return size * project.scale;
  }
  // UNIT_PIXELS: no scaling applied.
  return size;
}

fn project_pixel_size_float(pixels: f32) -> f32 {
  return pixels / project.scale;
}

fn project_pixel_size_vec2(pixels: vec2<f32>) -> vec2<f32> {
  return pixels / project.scale;
}
`, Nx = `\
${[
	"default",
	"lnglat",
	"meter-offsets",
	"lnglat-offsets",
	"cartesian"
].map((e) => `const int COORDINATE_SYSTEM_${e.toUpperCase().replaceAll("-", "_")} = ${Ex(e)};`).join("")}
${Object.keys(mx).map((e) => `const int PROJECTION_MODE_${e} = ${mx[e]};`).join("")}
${Object.keys(hx).map((e) => `const int UNIT_${e.toUpperCase()} = ${hx[e]};`).join("")}
layout(std140) uniform projectUniforms {
bool wrapLongitude;
int coordinateSystem;
vec3 commonUnitsPerMeter;
int projectionMode;
float scale;
vec3 commonUnitsPerWorldUnit;
vec3 commonUnitsPerWorldUnit2;
vec4 center;
mat4 modelMatrix;
mat4 viewProjectionMatrix;
vec2 viewportSize;
float devicePixelRatio;
float focalDistance;
vec3 cameraPosition;
vec3 coordinateOrigin;
vec3 commonOrigin;
bool pseudoMeters;
} project;
const float TILE_SIZE = 512.0;
const float PI = 3.1415926536;
const float WORLD_SCALE = TILE_SIZE / (PI * 2.0);
const vec3 ZERO_64_LOW = vec3(0.0);
const float EARTH_RADIUS = 6370972.0;
const float GLOBE_RADIUS = 256.0;
float project_size_at_latitude(float lat) {
float y = clamp(lat, -89.9, 89.9);
return 1.0 / cos(radians(y));
}
float project_size() {
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
project.pseudoMeters == false) {
if (geometry.position.w == 0.0) {
return project_size_at_latitude(geometry.worldPosition.y);
}
float y = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
float y2 = y * y;
float y4 = y2 * y2;
float y6 = y4 * y2;
return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
}
return 1.0;
}
float project_size_at_latitude(float meters, float lat) {
return meters * project.commonUnitsPerMeter.z * project_size_at_latitude(lat);
}
float project_size(float meters) {
return meters * project.commonUnitsPerMeter.z * project_size();
}
vec2 project_size(vec2 meters) {
return meters * project.commonUnitsPerMeter.xy * project_size();
}
vec3 project_size(vec3 meters) {
return meters * project.commonUnitsPerMeter * project_size();
}
vec4 project_size(vec4 meters) {
return vec4(meters.xyz * project.commonUnitsPerMeter, meters.w);
}
mat3 project_get_orientation_matrix(vec3 up) {
vec3 uz = normalize(up);
vec3 ux = abs(uz.z) == 1.0 ? vec3(1.0, 0.0, 0.0) : normalize(vec3(uz.y, -uz.x, 0));
vec3 uy = cross(uz, ux);
return mat3(ux, uy, uz);
}
bool project_needs_rotation(vec3 commonPosition, out mat3 transform) {
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
transform = project_get_orientation_matrix(commonPosition);
return true;
}
return false;
}
vec3 project_normal(vec3 vector) {
vec4 normal_modelspace = project.modelMatrix * vec4(vector, 0.0);
vec3 n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
mat3 rotation;
if (project_needs_rotation(geometry.position.xyz, rotation)) {
n = rotation * n;
}
return n;
}
vec4 project_offset_(vec4 offset) {
float dy = offset.y;
vec3 commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
return vec4(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}
vec2 project_mercator_(vec2 lnglat) {
float x = lnglat.x;
if (project.wrapLongitude) {
x = mod(x + 180., 360.0) - 180.;
}
float y = clamp(lnglat.y, -89.9, 89.9);
return vec2(
radians(x) + PI,
PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
) * WORLD_SCALE;
}
vec3 project_globe_(vec3 lnglatz) {
float lambda = radians(lnglatz.x);
float phi = radians(lnglatz.y);
float cosPhi = cos(phi);
float D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
return vec3(
sin(lambda) * cosPhi,
-cos(lambda) * cosPhi,
sin(phi)
) * D;
}
vec4 project_position(vec4 position, vec3 position64Low) {
vec4 position_world = project.modelMatrix * position;
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_mercator_(position_world.xy),
project_size_at_latitude(position_world.z, position_world.y),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
position_world.xyz += project.coordinateOrigin;
}
}
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_globe_(position_world.xyz),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
mat3 enuMatrix = project_get_orientation_matrix(project.commonOrigin);
float metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
vec3 offsetCommon = (enuMatrix * vec3(-position_world.xy, position_world.z)) * metersToCommon;
return vec4(project.commonOrigin + offsetCommon, position_world.w);
}
}
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
return vec4(
project_mercator_(position_world.xy) - project.commonOrigin.xy,
project_size(position_world.z),
position_world.w
);
}
}
}
if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
(project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
(project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
position_world.xyz -= project.coordinateOrigin;
}
return project_offset_(position_world) + project_offset_(project.modelMatrix * vec4(position64Low, 0.0));
}
vec4 project_position(vec4 position) {
return project_position(position, ZERO_64_LOW);
}
vec3 project_position(vec3 position, vec3 position64Low) {
vec4 projected_position = project_position(vec4(position, 1.0), position64Low);
return projected_position.xyz;
}
vec3 project_position(vec3 position) {
vec4 projected_position = project_position(vec4(position, 1.0), ZERO_64_LOW);
return projected_position.xyz;
}
vec2 project_position(vec2 position) {
vec4 projected_position = project_position(vec4(position, 0.0, 1.0), ZERO_64_LOW);
return projected_position.xy;
}
vec4 project_common_position_to_clipspace(vec4 position, mat4 viewProjectionMatrix, vec4 center) {
return viewProjectionMatrix * position + center;
}
vec4 project_common_position_to_clipspace(vec4 position) {
return project_common_position_to_clipspace(position, project.viewProjectionMatrix, project.center);
}
vec2 project_pixel_size_to_clipspace(vec2 pixels) {
vec2 offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
return offset * project.focalDistance;
}
float project_size_to_pixel(float meters) {
return project_size(meters) * project.scale;
}
vec2 project_size_to_pixel(vec2 meters) {
return project_size(meters) * project.scale;
}
float project_size_to_pixel(float size, int unit) {
if (unit == UNIT_METERS) return project_size_to_pixel(size);
if (unit == UNIT_COMMON) return size * project.scale;
return size;
}
float project_pixel_size(float pixels) {
return pixels / project.scale;
}
vec2 project_pixel_size(vec2 pixels) {
return pixels / project.scale;
}
`;
//#endregion
//#region node_modules/@deck.gl/core/dist/shaderlib/project/project.js
G();
var Px = {};
function Fx(e = Px) {
	return "viewport" in e ? Ax(e) : {};
}
var Ix = {
	name: "project",
	dependencies: [ny, Ty],
	source: Mx,
	vs: Nx,
	getUniforms: Fx,
	uniformTypes: {
		wrapLongitude: "f32",
		coordinateSystem: "i32",
		commonUnitsPerMeter: "vec3<f32>",
		projectionMode: "i32",
		scale: "f32",
		commonUnitsPerWorldUnit: "vec3<f32>",
		commonUnitsPerWorldUnit2: "vec3<f32>",
		center: "vec4<f32>",
		modelMatrix: "mat4x4<f32>",
		viewProjectionMatrix: "mat4x4<f32>",
		viewportSize: "vec2<f32>",
		devicePixelRatio: "f32",
		focalDistance: "f32",
		cameraPosition: "vec3<f32>",
		coordinateOrigin: "vec3<f32>",
		commonOrigin: "vec3<f32>",
		pseudoMeters: "f32"
	}
}, Lx = {
	name: "project32",
	dependencies: [Ix],
	source: "// Define a structure to hold both the clip-space position and the common position.\nstruct ProjectResult {\n  clipPosition: vec4<f32>,\n  commonPosition: vec4<f32>,\n};\n\n// This function mimics the GLSL version with the 'out' parameter by returning both values.\nfn project_position_to_clipspace_and_commonspace(\n    position: vec3<f32>,\n    position64Low: vec3<f32>,\n    offset: vec3<f32>\n) -> ProjectResult {\n  // Compute the projected position.\n  let projectedPosition: vec3<f32> = project_position_vec3_f64(position, position64Low);\n\n  // Start with the provided offset.\n  var finalOffset: vec3<f32> = offset;\n\n  // Get whether a rotation is needed and the rotation matrix.\n  let rotationResult = project_needs_rotation(projectedPosition);\n\n  // If rotation is needed, update the offset.\n  if (rotationResult.needsRotation) {\n    finalOffset = rotationResult.transform * offset;\n  }\n\n  // Compute the common position.\n  let commonPosition: vec4<f32> = vec4<f32>(projectedPosition + finalOffset, 1.0);\n\n  // Convert to clip-space.\n  let clipPosition: vec4<f32> = project_common_position_to_clipspace(commonPosition);\n\n  return ProjectResult(clipPosition, commonPosition);\n}\n\n// A convenience overload that returns only the clip-space position.\nfn project_position_to_clipspace(\n    position: vec3<f32>,\n    position64Low: vec3<f32>,\n    offset: vec3<f32>\n) -> vec4<f32> {\n  return project_position_to_clipspace_and_commonspace(position, position64Low, offset).clipPosition;\n}\n",
	vs: "vec4 project_position_to_clipspace(\n  vec3 position, vec3 position64Low, vec3 offset, out vec4 commonPosition\n) {\n  vec3 projectedPosition = project_position(position, position64Low);\n  mat3 rotation;\n  if (project_needs_rotation(projectedPosition, rotation)) {\n    // offset is specified as ENU\n    // when in globe projection, rotate offset so that the ground alighs with the surface of the globe\n    offset = rotation * offset;\n  }\n  commonPosition = vec4(projectedPosition + offset, 1.0);\n  return project_common_position_to_clipspace(commonPosition);\n}\n\nvec4 project_position_to_clipspace(\n  vec3 position, vec3 position64Low, vec3 offset\n) {\n  vec4 commonPosition;\n  return project_position_to_clipspace(position, position64Low, offset, commonPosition);\n}\n"
};
//#endregion
//#region node_modules/@math.gl/web-mercator/dist/math-utils.js
W();
function Rx() {
	return [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	];
}
function zx(e, t) {
	let n = Av([], t, e);
	return kv(n, n, 1 / n[3]), n;
}
function Bx(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Vx(e) {
	return Math.log(e) * Math.LOG2E;
}
var Hx = Math.log2 || Vx;
//#endregion
//#region node_modules/@math.gl/web-mercator/dist/assert.js
function Ux(e, t) {
	if (!e) throw Error(t || "@math.gl/web-mercator: assertion failed.");
}
//#endregion
//#region node_modules/@math.gl/web-mercator/dist/web-mercator-utils.js
W();
var Wx = Math.PI, Gx = Wx / 4, Kx = Wx / 180, qx = 180 / Wx, Jx = 512, Yx = 4003e4, Xx = 85.051129, Zx = 1.5;
function Qx(e) {
	return Hx(e);
}
function $x(e) {
	let [t, n] = e;
	Ux(Number.isFinite(t)), Ux(Number.isFinite(n) && n >= -90 && n <= 90, "invalid latitude");
	let r = t * Kx, i = n * Kx;
	return [Jx * (r + Wx) / (2 * Wx), Jx * (Wx + Math.log(Math.tan(Gx + i * .5))) / (2 * Wx)];
}
function eS(e) {
	let [t, n] = e, r = t / Jx * (2 * Wx) - Wx, i = 2 * (Math.atan(Math.exp(n / Jx * (2 * Wx) - Wx)) - Gx);
	return [r * qx, i * qx];
}
function tS(e) {
	let { latitude: t } = e;
	return Ux(Number.isFinite(t)), Qx(Yx * Math.cos(t * Kx)) - 9;
}
function nS(e) {
	let t = Math.cos(e * Kx);
	return Jx / Yx / t;
}
function rS(e) {
	let { latitude: t, longitude: n, highPrecision: r = !1 } = e;
	Ux(Number.isFinite(t) && Number.isFinite(n));
	let i = Jx, a = Math.cos(t * Kx), o = i / 360, s = o / a, c = i / Yx / a, l = {
		unitsPerMeter: [
			c,
			c,
			c
		],
		metersPerUnit: [
			1 / c,
			1 / c,
			1 / c
		],
		unitsPerDegree: [
			o,
			s,
			c
		],
		degreesPerUnit: [
			1 / o,
			1 / s,
			1 / c
		]
	};
	if (r) {
		let e = Kx * Math.tan(t * Kx) / a, n = o * e / 2, r = i / Yx * e, u = r / s * c;
		l.unitsPerDegree2 = [
			0,
			n,
			r
		], l.unitsPerMeter2 = [
			u,
			0,
			u
		];
	}
	return l;
}
function iS(e, t) {
	let [n, r, i] = e, [a, o, s] = t, { unitsPerMeter: c, unitsPerMeter2: l } = rS({
		longitude: n,
		latitude: r,
		highPrecision: !0
	}), u = $x(e);
	u[0] += a * (c[0] + l[0] * o), u[1] += o * (c[1] + l[1] * o);
	let d = eS(u), f = (i || 0) + (s || 0);
	return Number.isFinite(i) || Number.isFinite(s) ? [
		d[0],
		d[1],
		f
	] : d;
}
function aS(e) {
	let { height: t, pitch: n, bearing: r, altitude: i, scale: a, center: o } = e, s = Rx();
	mv(s, s, [
		0,
		0,
		-i
	]), _v(s, s, -n * Kx), yv(s, s, r * Kx);
	let c = a / t;
	return hv(s, s, [
		c,
		c,
		c
	]), o && mv(s, s, G_([], o)), s;
}
function oS(e) {
	let { width: t, height: n, altitude: r, pitch: i = 0, offset: a, center: o, scale: s, nearZMultiplier: c = 1, farZMultiplier: l = 1 } = e, { fovy: u = sS(Zx) } = e;
	r !== void 0 && (u = sS(r));
	let d = u * Kx, f = i * Kx, p = cS(u), m = p;
	o && (m += o[2] * s / Math.cos(f) / n);
	let h = d * (.5 + (a ? a[1] : 0) / n), g = Math.sin(h) * m / Math.sin(Bx(Math.PI / 2 - f - h, .01, Math.PI - .01)), _ = Math.sin(f) * g + m, v = m * 10, y = Math.min(_ * l, v);
	return {
		fov: d,
		aspect: t / n,
		focalDistance: p,
		near: c,
		far: y
	};
}
function sS(e) {
	return 2 * Math.atan(.5 / e) * qx;
}
function cS(e) {
	return .5 / Math.tan(.5 * e * Kx);
}
function lS(e, t) {
	let [n, r, i = 0] = e;
	return Ux(Number.isFinite(n) && Number.isFinite(r) && Number.isFinite(i)), zx(t, [
		n,
		r,
		i,
		1
	]);
}
function uS(e, t, n = 0) {
	let [r, i, a] = e;
	if (Ux(Number.isFinite(r) && Number.isFinite(i), "invalid pixel coordinate"), Number.isFinite(a)) return zx(t, [
		r,
		i,
		a,
		1
	]);
	let o = zx(t, [
		r,
		i,
		0,
		1
	]), s = zx(t, [
		r,
		i,
		1,
		1
	]), c = o[2], l = s[2];
	return A_([], o, s, c === l ? 0 : ((n || 0) - c) / (l - c));
}
//#endregion
//#region node_modules/@math.gl/web-mercator/dist/fit-bounds.js
function dS(e) {
	let { width: t, height: n, bounds: r, minExtent: i = 0, maxZoom: a = 24, offset: o = [0, 0] } = e, [[s, c], [l, u]] = r, d = fS(e.padding), f = $x([s, Bx(u, -Xx, Xx)]), p = $x([l, Bx(c, -Xx, Xx)]), m = [Math.max(Math.abs(p[0] - f[0]), i), Math.max(Math.abs(p[1] - f[1]), i)], h = [t - d.left - d.right - Math.abs(o[0]) * 2, n - d.top - d.bottom - Math.abs(o[1]) * 2];
	Ux(h[0] > 0 && h[1] > 0);
	let g = h[0] / m[0], _ = h[1] / m[1], v = (d.right - d.left) / 2 / g, y = (d.top - d.bottom) / 2 / _, b = eS([(p[0] + f[0]) / 2 + v, (p[1] + f[1]) / 2 + y]), x = Math.min(a, Hx(Math.abs(Math.min(g, _))));
	return Ux(Number.isFinite(x)), {
		longitude: b[0],
		latitude: b[1],
		zoom: x
	};
}
function fS(e = 0) {
	return typeof e == "number" ? {
		top: e,
		bottom: e,
		left: e,
		right: e
	} : (Ux(Number.isFinite(e.top) && Number.isFinite(e.bottom) && Number.isFinite(e.left) && Number.isFinite(e.right)), e);
}
//#endregion
//#region node_modules/@math.gl/web-mercator/dist/get-bounds.js
W();
var pS = Math.PI / 180;
function mS(e, t = 0) {
	let { width: n, height: r, unproject: i } = e, a = { targetZ: t }, o = i([0, r], a), s = i([n, r], a), c, l;
	return (e.fovy ? .5 * e.fovy * pS : Math.atan(.5 / e.altitude)) > (90 - e.pitch) * pS - .01 ? (c = hS(e, 0, t), l = hS(e, n, t)) : (c = i([0, 0], a), l = i([n, 0], a)), [
		o,
		s,
		l,
		c
	];
}
function hS(e, t, n) {
	let { pixelUnprojectionMatrix: r } = e, i = zx(r, [
		t,
		0,
		1,
		1
	]), a = zx(r, [
		t,
		e.height,
		1,
		1
	]), o = eS(A_([], i, a, (n * e.distanceScales.unitsPerMeter[2] - i[2]) / (a[2] - i[2])));
	return o.push(n), o;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/shaderlib/shadow/shadow.js
W();
var gS = "\nlayout(std140) uniform shadowUniforms {\n  bool drawShadowMap;\n  bool useShadowMap;\n  vec4 color;\n  highp int lightId;\n  float lightCount;\n  mat4 viewProjectionMatrix0;\n  mat4 viewProjectionMatrix1;\n  vec4 projectCenter0;\n  vec4 projectCenter1;\n} shadow;\n", _S = `
${gS}

const int max_lights = 2;

out vec3 shadow_vPosition[max_lights];

vec4 shadow_setVertexPosition(vec4 position_commonspace) {
  mat4 viewProjectionMatrices[max_lights];
  viewProjectionMatrices[0] = shadow.viewProjectionMatrix0;
  viewProjectionMatrices[1] = shadow.viewProjectionMatrix1;
  vec4 projectCenters[max_lights];
  projectCenters[0] = shadow.projectCenter0;
  projectCenters[1] = shadow.projectCenter1;

  if (shadow.drawShadowMap) {
    return project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[shadow.lightId], projectCenters[shadow.lightId]);
  }
  if (shadow.useShadowMap) {
    for (int i = 0; i < max_lights; i++) {
      if(i < int(shadow.lightCount)) {
        vec4 shadowMap_position = project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[i], projectCenters[i]);
        shadow_vPosition[i] = (shadowMap_position.xyz / shadowMap_position.w + 1.0) / 2.0;
      }
    }
  }
  return gl_Position;
}

`, vS = `
${gS}

const int max_lights = 2;
uniform sampler2D shadow_uShadowMap0;
uniform sampler2D shadow_uShadowMap1;

in vec3 shadow_vPosition[max_lights];

const vec4 bitPackShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 bitUnpackShift = 1.0 / bitPackShift;
const vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0,  0.0);

float shadow_getShadowWeight(vec3 position, sampler2D shadowMap) {
  vec4 rgbaDepth = texture(shadowMap, position.xy);

  float z = dot(rgbaDepth, bitUnpackShift);
  return smoothstep(0.001, 0.01, position.z - z);
}

vec4 shadow_filterShadowColor(vec4 color) {
  if (shadow.drawShadowMap) {
    vec4 rgbaDepth = fract(gl_FragCoord.z * bitPackShift);
    rgbaDepth -= rgbaDepth.gbaa * bitMask;
    return rgbaDepth;
  }
  if (shadow.useShadowMap) {
    float shadowAlpha = 0.0;
    shadowAlpha += shadow_getShadowWeight(shadow_vPosition[0], shadow_uShadowMap0);
    if(shadow.lightCount > 1.0) {
      shadowAlpha += shadow_getShadowWeight(shadow_vPosition[1], shadow_uShadowMap1);
    }
    shadowAlpha *= shadow.color.a / shadow.lightCount;
    float blendedAlpha = shadowAlpha + color.a * (1.0 - shadowAlpha);

    return vec4(
      mix(color.rgb, shadow.color.rgb, shadowAlpha / blendedAlpha),
      blendedAlpha
    );
  }
  return color;
}

`, yS = yx(wS), bS = yx(TS), xS = [
	0,
	0,
	0,
	1
], SS = [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0
];
function CS(e, t) {
	let [n, r, i] = e, a = uS([
		n,
		r,
		i
	], t);
	return Number.isFinite(i) ? a : [
		a[0],
		a[1],
		0
	];
}
function wS({ viewport: e, center: t }) {
	return new Hv(e.viewProjectionMatrix).invert().transform(t);
}
function TS({ viewport: e, shadowMatrices: t }) {
	let n = [], r = e.pixelUnprojectionMatrix, i = e.isGeospatial ? void 0 : 1, a = [
		[
			0,
			0,
			i
		],
		[
			e.width,
			0,
			i
		],
		[
			0,
			e.height,
			i
		],
		[
			e.width,
			e.height,
			i
		],
		[
			0,
			0,
			-1
		],
		[
			e.width,
			0,
			-1
		],
		[
			0,
			e.height,
			-1
		],
		[
			e.width,
			e.height,
			-1
		]
	].map((e) => CS(e, r));
	for (let r of t) {
		let t = r.clone().translate(new av(e.center).negate()), i = a.map((e) => t.transform(e)), o = new Hv().ortho({
			left: Math.min(...i.map((e) => e[0])),
			right: Math.max(...i.map((e) => e[0])),
			bottom: Math.min(...i.map((e) => e[1])),
			top: Math.max(...i.map((e) => e[1])),
			near: Math.min(...i.map((e) => -e[2])),
			far: Math.max(...i.map((e) => -e[2]))
		});
		n.push(o.multiplyRight(r));
	}
	return n;
}
function ES(e) {
	let { shadowEnabled: t = !0, project: n } = e;
	if (!t || !n || !e.shadowMatrices || !e.shadowMatrices.length) return {
		drawShadowMap: !1,
		useShadowMap: !1,
		shadow_uShadowMap0: e.dummyShadowMap,
		shadow_uShadowMap1: e.dummyShadowMap
	};
	let r = Ix.getUniforms(n), i = yS({
		viewport: n.viewport,
		center: r.center
	}), a = [], o = bS({
		shadowMatrices: e.shadowMatrices,
		viewport: n.viewport
	}).slice();
	for (let t = 0; t < e.shadowMatrices.length; t++) {
		let e = o[t], s = e.clone().translate(new av(n.viewport.center).negate());
		r.coordinateSystem === Ex("lnglat") && r.projectionMode === mx.WEB_MERCATOR ? (o[t] = s, a[t] = i) : (o[t] = e.clone().multiplyRight(SS), a[t] = s.transform(i));
	}
	let s = {
		drawShadowMap: !!e.drawToShadowMap,
		useShadowMap: e.shadowMaps ? e.shadowMaps.length > 0 : !1,
		color: e.shadowColor || xS,
		lightId: e.shadowLightId || 0,
		lightCount: e.shadowMatrices.length,
		shadow_uShadowMap0: e.dummyShadowMap,
		shadow_uShadowMap1: e.dummyShadowMap
	};
	for (let e = 0; e < o.length; e++) s[`viewProjectionMatrix${e}`] = o[e], s[`projectCenter${e}`] = a[e];
	for (let t = 0; t < 2; t++) s[`shadow_uShadowMap${t}`] = e.shadowMaps && e.shadowMaps[t] || e.dummyShadowMap;
	return s;
}
var DS = {
	name: "shadow",
	dependencies: [Ix],
	vs: _S,
	fs: vS,
	inject: {
		"vs:DECKGL_FILTER_GL_POSITION": "\n    position = shadow_setVertexPosition(geometry.position);\n    ",
		"fs:DECKGL_FILTER_COLOR": "\n    color = shadow_filterShadowColor(color);\n    "
	},
	getUniforms: ES,
	uniformTypes: {
		drawShadowMap: "f32",
		useShadowMap: "f32",
		color: "vec4<f32>",
		lightId: "i32",
		lightCount: "f32",
		viewProjectionMatrix0: "mat4x4<f32>",
		viewProjectionMatrix1: "mat4x4<f32>",
		projectCenter0: "vec4<f32>",
		projectCenter1: "vec4<f32>"
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/shaderlib/picking/picking.js
G();
var OS = 16777215;
function kS(e, t) {
	e.length === 10 ? B.warn("pickMultipleObjects can only exclude 10 previously picked objects for layers without picking buffers")() : e.push(t);
}
var AS = "  float disabledPickingIndexCount;\n  vec4 disabledPickingIndices0;\n  vec4 disabledPickingIndices1;\n  vec4 disabledPickingIndices2;\n";
function jS(e) {
	return e.replace("  vec4 highlightColor;\n} picking;", `  vec4 highlightColor;\n${AS}} picking;`);
}
function MS(e, t) {
	return [
		e[t] || 0,
		e[t + 1] || 0,
		e[t + 2] || 0,
		e[t + 3] || 0
	];
}
var NS = `\
vec3 picking_getPickingColorFromIndex(float objectIndex) {
  if (objectIndex < 0.0 || objectIndex >= ${OS}.0) {
    return vec3(0.0);
  }

  for (int i = 0; i < 10; i++) {
    if (float(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    vec4 disabledIndices = i < 4
      ? picking.disabledPickingIndices0
      : (i < 8 ? picking.disabledPickingIndices1 : picking.disabledPickingIndices2);
    float disabledIndex = disabledIndices[i - (i / 4) * 4];
    if (disabledIndex == objectIndex) {
      return vec3(0.0);
    }
  }

  float encodedIndex = objectIndex + 1.0;
  return vec3(
    mod(encodedIndex, 256.0),
    mod(floor(encodedIndex / 256.0), 256.0),
    mod(floor(encodedIndex / 65536.0), 256.0)
  );
}

vec3 picking_getPickingColorFromIndex(uint objectIndex) {
  return picking_getPickingColorFromIndex(float(objectIndex));
}

vec3 picking_getPickingColorFromInstanceID() {
  return picking_getPickingColorFromIndex(float(gl_InstanceID));
}

void picking_setPickingColorFromInstanceID() {
  picking_setPickingColor(picking_getPickingColorFromInstanceID());
}
`, PS = `\
struct pickingUniforms {
  isActive: f32,
  isAttribute: f32,
  isHighlightActive: f32,
  useByteColors: f32,
  highlightedObjectColor: vec3<f32>,
  highlightColor: vec4<f32>,
  disabledPickingIndexCount: f32,
  disabledPickingIndices0: vec4<f32>,
  disabledPickingIndices1: vec4<f32>,
  disabledPickingIndices2: vec4<f32>,
};

@group(0) @binding(auto) var<uniform> picking: pickingUniforms;

fn picking_normalizeColor(color: vec3<f32>) -> vec3<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_normalizeColor4(color: vec4<f32>) -> vec4<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_isColorZero(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) < 0.00001;
}

fn picking_isColorValid(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) > 0.00001;
}

fn picking_getPickingColorFromIndex(objectIndex: u32) -> vec3<f32> {
  if (objectIndex >= ${OS}u) {
    return vec3<f32>(0.0);
  }

  for (var i = 0; i < 10; i = i + 1) {
    if (f32(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    let disabledIndices = select(
      picking.disabledPickingIndices2,
      select(picking.disabledPickingIndices1, picking.disabledPickingIndices0, i < 4),
      i < 8
    );
    let disabledIndex = disabledIndices[i % 4];
    if (disabledIndex == f32(objectIndex)) {
      return vec3<f32>(0.0);
    }
  }

  let encodedIndex = objectIndex + 1u;
  return vec3<f32>(
    f32(encodedIndex % 256u),
    f32((encodedIndex / 256u) % 256u),
    f32((encodedIndex / 65536u) % 256u)
  ) / 255.0;
}
`, FS = {
	..._y,
	vs: `${jS(_y.vs)}\n${NS}`,
	fs: jS(_y.fs),
	source: PS,
	uniformTypes: {
		..._y.uniformTypes,
		disabledPickingIndexCount: "f32",
		disabledPickingIndices0: "vec4<f32>",
		disabledPickingIndices1: "vec4<f32>",
		disabledPickingIndices2: "vec4<f32>"
	},
	defaultUniforms: {
		..._y.defaultUniforms,
		useByteColors: !0,
		disabledPickingIndexCount: 0,
		disabledPickingIndices0: [
			0,
			0,
			0,
			0
		],
		disabledPickingIndices1: [
			0,
			0,
			0,
			0
		],
		disabledPickingIndices2: [
			0,
			0,
			0,
			0
		]
	},
	getUniforms(e, t) {
		let n = _y.getUniforms(e, t), r = e.disabledPickingIndices || [];
		return n.disabledPickingIndexCount = r.length, n.disabledPickingIndices0 = MS(r, 0), n.disabledPickingIndices1 = MS(r, 4), n.disabledPickingIndices2 = MS(r, 8), n;
	},
	inject: {
		"vs:DECKGL_FILTER_GL_POSITION": "\n    // for picking depth values\n    picking_setPickingAttribute(position.z / position.w);\n  ",
		"vs:DECKGL_FILTER_COLOR": "\n  picking_setPickingColor(geometry.pickingColor);\n  ",
		"fs:DECKGL_FILTER_COLOR": {
			order: 99,
			injection: "\n  // use highlight color if this fragment belongs to the selected object.\n  color = picking_filterHighlightColor(color);\n\n  // use picking color if rendering to picking FBO.\n  color = picking_filterPickingColor(color);\n    "
		}
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/shaderlib/index.js
G();
var IS = [Ty], LS = [
	"vs:DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)",
	"vs:DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)",
	"vs:DECKGL_FILTER_COLOR(inout vec4 color, VertexGeometry geometry)",
	"fs:DECKGL_FILTER_COLOR(inout vec4 color, FragmentGeometry geometry)"
], RS = [];
function zS(e) {
	let t = Zg.getDefaultShaderAssembler(e);
	for (let e of IS) t.addDefaultModule(e);
	t._hookFunctions.length = 0;
	let n = e === "glsl" ? LS : RS;
	for (let e of n) t.addShaderHook(e);
	return t;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/effects/lighting/ambient-light.js
var BS = [
	255,
	255,
	255
], VS = 1, HS = 0, US = class {
	constructor(e = {}) {
		this.type = "ambient";
		let { color: t = BS } = e, { intensity: n = VS } = e;
		this.id = e.id || `ambient-${HS++}`, this.color = t, this.intensity = n;
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/effects/lighting/directional-light.js
W();
var WS = [
	255,
	255,
	255
], GS = 1, KS = [
	0,
	0,
	-1
], qS = 0, JS = class {
	constructor(e = {}) {
		this.type = "directional";
		let { color: t = WS } = e, { intensity: n = GS } = e, { direction: r = KS } = e, { _shadow: i = !1 } = e;
		this.id = e.id || `directional-${qS++}`, this.color = t, this.intensity = n, this.type = "directional", this.direction = new av(r).normalize().toArray(), this.shadow = i;
	}
	getProjectedLight(e) {
		return this;
	}
}, YS = class {
	constructor(e, t = { id: "pass" }) {
		let { id: n } = t;
		this.id = n, this.device = e, this.props = { ...t };
	}
	setProps(e) {
		Object.assign(this.props, e);
	}
	render(e) {}
	cleanup() {}
}, XS = {
	depthWriteEnabled: !0,
	depthCompare: "less-equal",
	blendColorOperation: "add",
	blendColorSrcFactor: "one",
	blendColorDstFactor: "one-minus-src-alpha",
	blendAlphaOperation: "add",
	blendAlphaSrcFactor: "one",
	blendAlphaDstFactor: "one-minus-src-alpha"
}, ZS = class extends YS {
	constructor() {
		super(...arguments), this._lastRenderIndex = -1;
	}
	render(e) {
		this._render(e);
	}
	_render(e) {
		let { canvasContext: t = this.device.canvasContext } = e, n = e.target ?? t.getCurrentFramebuffer(), [r, i] = t.getDrawingBufferSize(), a = e.clearCanvas ?? !0, o = e.clearColor ?? (a ? [
			0,
			0,
			0,
			0
		] : !1), s = a ? 1 : !1, c = a ? 0 : !1, l = e.colorMask ?? 15, u = { viewport: [
			0,
			0,
			r,
			i
		] };
		e.colorMask && (u.colorMask = l), e.scissorRect && (u.scissorRect = e.scissorRect);
		let { shaderModuleProps: d, viewports: f, views: p, onViewportActive: m, clearStack: h = !0 } = e, g = e.pass || "unknown", _ = this.device.type === "webgpu";
		h && (this._lastRenderIndex = -1);
		let v = [];
		if (!f.length) return this.device.beginRenderPass({
			framebuffer: n,
			parameters: u,
			clearColor: o,
			clearDepth: s,
			clearStencil: c
		}).end(), this.device.submit(), v;
		try {
			for (let r of f) {
				m?.(r);
				let i = this._getDrawLayerParams(r, e), a = p && p[r.id], l = r.subViewports || [r], f = _ ? l.map((e) => [e]) : [l];
				for (let r of f) {
					let l = this.device.beginRenderPass({
						framebuffer: n,
						parameters: u,
						clearColor: o,
						clearDepth: s,
						clearStencil: c
					});
					try {
						for (let o of r) {
							let r = this._drawLayersInViewport(l, {
								target: n,
								canvasContext: t,
								shaderModuleProps: d,
								viewport: o,
								view: a,
								pass: g,
								layers: e.layers,
								isPicking: e.isPicking
							}, i);
							v.push(r);
						}
					} finally {
						l.end(), _ && this.device.submit();
					}
					o = !1, s = !1, c = !1;
				}
			}
			return v;
		} finally {
			_ || this.device.submit();
		}
	}
	_getDrawLayerParams(e, { layers: t, pass: n, isPicking: r = !1, layerFilter: i, cullRect: a, views: o, effects: s, canvasContext: c = this.device.canvasContext, shaderModuleProps: l }, u = !1) {
		let d = [], f = QS(this._lastRenderIndex + 1), p = {
			layer: t[0],
			viewport: e,
			isPicking: r,
			renderPass: n,
			cullRect: a
		}, m = {};
		for (let r = 0; r < t.length; r++) {
			let a = t[r], h = this._shouldDrawLayer(a, p, i, m), g = { shouldDrawLayer: h };
			h && !u && (g.shouldDrawLayer = !0, g.layerRenderIndex = f(a, h), g.shaderModuleProps = this._getShaderModuleProps(a, s, n, c, l), g.layerParameters = {
				...a.context.device.type === "webgpu" ? XS : null,
				...a.context.deck?.props.parameters,
				...o?.[e.id]?.props.parameters,
				...this.getLayerParameters(a, r, e)
			}), d[r] = g;
		}
		return d;
	}
	_drawLayersInViewport(e, { layers: t, shaderModuleProps: n, pass: r, target: i, canvasContext: a, viewport: o, view: s, isPicking: c }, l) {
		let u = $S(this.device, {
			canvasContext: a,
			shaderModuleProps: n,
			target: i,
			viewport: o
		});
		if (s) {
			let { clear: e, clearColor: t, clearDepth: n, clearStencil: r } = s.props;
			if (e) {
				let e = [
					0,
					0,
					0,
					0
				], a = 1, o = 0;
				Array.isArray(t) && !c ? e = [...t.slice(0, 3), t[3] || 255].map((e) => e / 255) : t === !1 && (e = !1), n !== void 0 && (a = n), r !== void 0 && (o = r), this.device.beginRenderPass({
					framebuffer: i,
					parameters: {
						viewport: u,
						scissorRect: u
					},
					clearColor: e,
					clearDepth: a,
					clearStencil: o
				}).end();
			}
		}
		let d = {
			totalCount: t.length,
			visibleCount: 0,
			compositeCount: 0,
			pickableCount: 0
		};
		e.setParameters({ viewport: u });
		for (let n = 0; n < t.length; n++) {
			let i = t[n], a = l[n], { shouldDrawLayer: s } = a;
			if (s && i.props.pickable && d.pickableCount++, i.isComposite && d.compositeCount++, i.isDrawable && a.shouldDrawLayer) {
				let { layerRenderIndex: t, shaderModuleProps: n, layerParameters: s } = a;
				d.visibleCount++, this._lastRenderIndex = Math.max(this._lastRenderIndex, t), n.project && (n.project.viewport = o), i.context.renderPass = e;
				try {
					i._drawLayer({
						renderPass: e,
						shaderModuleProps: n,
						uniforms: { layerIndex: t },
						parameters: s
					});
				} catch (e) {
					i.raiseError(e, `drawing ${i} to ${r}`);
				}
			}
		}
		return d;
	}
	shouldDrawLayer(e) {
		return !0;
	}
	getShaderModuleProps(e, t, n) {
		return null;
	}
	getLayerParameters(e, t, n) {
		return e.props.parameters;
	}
	_shouldDrawLayer(e, t, n, r) {
		if (!(e.props.visible && this.shouldDrawLayer(e))) return !1;
		t.layer = e;
		let i = e.parent;
		for (; i;) {
			if (!i.props.visible || !i.filterSubLayer(t)) return !1;
			t.layer = i, i = i.parent;
		}
		if (n) {
			let e = t.layer.id;
			if (e in r || (r[e] = n(t)), !r[e]) return !1;
		}
		return e.activateViewport(t.viewport), !0;
	}
	_getShaderModuleProps(e, t, n, r, i) {
		let a = r.cssToDeviceRatio(), o = e.internalState?.propsInTransition || e.props, s = {
			layer: o,
			picking: { isActive: !1 },
			project: {
				viewport: e.context.viewport,
				devicePixelRatio: a,
				modelMatrix: o.modelMatrix,
				coordinateSystem: o.coordinateSystem,
				coordinateOrigin: o.coordinateOrigin,
				autoWrapLongitude: e.wrapLongitude
			}
		};
		if (t) for (let n of t) eC(s, n.getShaderModuleProps?.(e, s));
		for (let t of e.context.defaultShaderModules) t.name in s || (s[t.name] = {});
		return eC(s, this.getShaderModuleProps(e, t, s), i);
	}
};
function QS(e = 0, t = {}) {
	let n = {}, r = (i, a) => {
		let o = i.props._offset, s = i.id, c = i.parent && i.parent.id, l;
		if (c && !(c in t) && r(i.parent, !1), c in n) {
			let e = n[c] = n[c] || QS(t[c], t);
			l = e(i, a), n[s] = e;
		} else Number.isFinite(o) ? (l = o + (t[c] || 0), n[s] = null) : l = e;
		return a && l >= e && (e = l + 1), t[s] = l, l;
	};
	return r;
}
function $S(e, { canvasContext: t = e.canvasContext, shaderModuleProps: n, target: r, viewport: i }) {
	let a = n?.project?.devicePixelRatio ?? t.cssToDeviceRatio(), [, o] = t.getDrawingBufferSize(), s = r ? r.height : o, c = i;
	return [
		c.x * a,
		s - (c.y + c.height) * a,
		c.width * a,
		c.height * a
	];
}
function eC(e, ...t) {
	for (let n of t) if (n) for (let t in n) e[t] ? Object.assign(e[t], n[t]) : e[t] = n[t];
	return e;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/passes/shadow-pass.js
var tC = class extends ZS {
	constructor(e, t) {
		super(e, t);
		let n = e.createTexture({
			format: "rgba8unorm",
			width: 1,
			height: 1,
			sampler: {
				minFilter: "linear",
				magFilter: "linear",
				addressModeU: "clamp-to-edge",
				addressModeV: "clamp-to-edge"
			}
		}), r = e.createTexture({
			format: "depth16unorm",
			width: 1,
			height: 1
		});
		this.fbo = e.createFramebuffer({
			id: "shadowmap",
			width: 1,
			height: 1,
			colorAttachments: [n],
			depthStencilAttachment: r
		});
	}
	delete() {
		this.fbo &&= (this.fbo.destroy(), null);
	}
	getShadowMap() {
		return this.fbo.colorAttachments[0].texture;
	}
	render(e) {
		let t = this.fbo, n = this.device.canvasContext.cssToDeviceRatio(), r = e.viewports[0], i = r.width * n, a = r.height * n, o = [
			1,
			1,
			1,
			1
		];
		(i !== t.width || a !== t.height) && t.resize({
			width: i,
			height: a
		}), super.render({
			...e,
			clearColor: o,
			target: t,
			pass: "shadow"
		});
	}
	getLayerParameters(e, t, n) {
		return {
			...e.props.parameters,
			blend: !1,
			depthWriteEnabled: !0,
			depthCompare: "less-equal"
		};
	}
	shouldDrawLayer(e) {
		return e.props.shadowEnabled !== !1;
	}
	getShaderModuleProps(e, t, n) {
		return { shadow: {
			project: n.project,
			drawToShadowMap: !0
		} };
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/effects/lighting/lighting-effect.js
W();
var nC = {
	color: [
		255,
		255,
		255
	],
	intensity: 1
}, rC = [{
	color: [
		255,
		255,
		255
	],
	intensity: 1,
	direction: [
		-1,
		3,
		-1
	]
}, {
	color: [
		255,
		255,
		255
	],
	intensity: .9,
	direction: [
		1,
		-8,
		-2.5
	]
}], iC = [
	0,
	0,
	0,
	200 / 255
], aC = class {
	constructor(e = {}) {
		this.id = "lighting-effect", this.shadowColor = iC, this.shadow = !1, this.directionalLights = [], this.pointLights = [], this.shadowPasses = [], this.dummyShadowMap = null, this.setProps(e);
	}
	setup(e) {
		this.context = e;
		let { device: t, deck: n } = e;
		this.shadow && !this.dummyShadowMap && (this._createShadowPasses(t), n._addDefaultShaderModule(DS), this.dummyShadowMap = t.createTexture({
			width: 1,
			height: 1
		}));
	}
	setProps(e) {
		this.ambientLight = void 0, this.directionalLights = [], this.pointLights = [];
		for (let t in e) {
			let n = e[t];
			switch (n.type) {
				case "ambient":
					this.ambientLight = n;
					break;
				case "directional":
					this.directionalLights.push(n);
					break;
				case "point": this.pointLights.push(n);
			}
		}
		this._applyDefaultLights(), this.shadow = this.directionalLights.some((e) => e.shadow), this.context && this.setup(this.context), this.props = e;
	}
	preRender({ layers: e, layerFilter: t, viewports: n, onViewportActive: r, views: i }) {
		if (this.shadow) {
			this.shadowMatrices = this._calculateMatrices();
			for (let a = 0; a < this.shadowPasses.length; a++) this.shadowPasses[a].render({
				layers: e,
				layerFilter: t,
				viewports: n,
				onViewportActive: r,
				views: i,
				shaderModuleProps: { shadow: {
					shadowLightId: a,
					dummyShadowMap: this.dummyShadowMap,
					shadowMatrices: this.shadowMatrices
				} }
			});
		}
	}
	getShaderModuleProps(e, t) {
		let n = this.shadow ? {
			project: t.project,
			shadowMaps: this.shadowPasses.map((e) => e.getShadowMap()),
			dummyShadowMap: this.dummyShadowMap,
			shadowColor: this.shadowColor,
			shadowMatrices: this.shadowMatrices
		} : {}, r = {
			enabled: !0,
			lights: this._getLights(e)
		}, i = e.props.material;
		return {
			shadow: n,
			lighting: r,
			phongMaterial: i,
			gouraudMaterial: i
		};
	}
	cleanup(e) {
		for (let e of this.shadowPasses) e.delete();
		this.shadowPasses.length = 0, this.dummyShadowMap && (this.dummyShadowMap.destroy(), this.dummyShadowMap = null, e.deck._removeDefaultShaderModule(DS));
	}
	_calculateMatrices() {
		let e = [];
		for (let t of this.directionalLights) {
			let n = new Hv().lookAt({ eye: new av(t.direction).negate() });
			e.push(n);
		}
		return e;
	}
	_createShadowPasses(e) {
		for (let t = 0; t < this.directionalLights.length; t++) {
			let n = new tC(e);
			this.shadowPasses[t] = n;
		}
	}
	_applyDefaultLights() {
		let { ambientLight: e, pointLights: t, directionalLights: n } = this;
		!e && t.length === 0 && n.length === 0 && (this.ambientLight = new US(nC), this.directionalLights.push(new JS(rC[0]), new JS(rC[1])));
	}
	_getLights(e) {
		let t = [];
		this.ambientLight && t.push(this.ambientLight);
		for (let n of this.pointLights) t.push(n.getProjectedLight({ layer: e }));
		for (let n of this.directionalLights) t.push(n.getProjectedLight({ layer: e }));
		return t;
	}
}, oC = new class {
	constructor(e = {}) {
		this._pool = [], this.opts = {
			overAlloc: 2,
			poolSize: 100
		}, this.setOptions(e);
	}
	setOptions(e) {
		Object.assign(this.opts, e);
	}
	allocate(e, t, { size: n = 1, type: r, padding: i = 0, copy: a = !1, initialize: o = !1, maxCount: s }) {
		let c = r || e && e.constructor || Float32Array, l = t * n + i;
		if (ArrayBuffer.isView(e)) {
			if (l <= e.length) return e;
			if (l * e.BYTES_PER_ELEMENT <= e.buffer.byteLength) return new c(e.buffer, 0, l);
		}
		let u = Infinity;
		s && (u = s * n + i);
		let d = this._allocate(c, l, o, u);
		return e && a ? d.set(e) : o || d.fill(0, 0, 4), this._release(e), d;
	}
	release(e) {
		this._release(e);
	}
	_allocate(e, t, n, r) {
		let i = Math.max(Math.ceil(t * this.opts.overAlloc), 1);
		i > r && (i = r);
		let a = this._pool, o = e.BYTES_PER_ELEMENT * i, s = a.findIndex((e) => e.byteLength >= o);
		if (s >= 0) {
			let t = new e(a.splice(s, 1)[0], 0, i);
			return n && t.fill(0), t;
		}
		return new e(i);
	}
	_release(e) {
		if (!ArrayBuffer.isView(e)) return;
		let t = this._pool, { buffer: n } = e, { byteLength: r } = n, i = t.findIndex((e) => e.byteLength >= r);
		i < 0 ? t.push(n) : (i > 0 || t.length < this.opts.poolSize) && t.splice(i, 0, n), t.length > this.opts.poolSize && t.shift();
	}
}();
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/math-utils.js
W();
function sC() {
	return [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	];
}
function cC(e, t) {
	let n = e % t;
	return n < 0 ? t + n : n;
}
function lC(e) {
	return [
		e[12],
		e[13],
		e[14]
	];
}
function uC(e) {
	return {
		left: fC(e[3] + e[0], e[7] + e[4], e[11] + e[8], e[15] + e[12]),
		right: fC(e[3] - e[0], e[7] - e[4], e[11] - e[8], e[15] - e[12]),
		bottom: fC(e[3] + e[1], e[7] + e[5], e[11] + e[9], e[15] + e[13]),
		top: fC(e[3] - e[1], e[7] - e[5], e[11] - e[9], e[15] - e[13]),
		near: fC(e[3] + e[2], e[7] + e[6], e[11] + e[10], e[15] + e[14]),
		far: fC(e[3] - e[2], e[7] - e[6], e[11] - e[10], e[15] - e[14])
	};
}
var dC = new av();
function fC(e, t, n, r) {
	dC.set(e, t, n);
	let i = dC.len();
	return {
		distance: r / i,
		normal: new av(-e / i, -t / i, -n / i)
	};
}
function pC(e) {
	return e - Math.fround(e);
}
var mC;
function hC(e, t) {
	let { size: n = 1, startIndex: r = 0 } = t, i = t.endIndex === void 0 ? e.length : t.endIndex, a = (i - r) / n;
	mC = oC.allocate(mC, a, {
		type: Float32Array,
		size: n * 2
	});
	let o = r, s = 0;
	for (; o < i;) {
		for (let t = 0; t < n; t++) {
			let r = e[o++];
			mC[s + t] = r, mC[s + t + n] = pC(r);
		}
		s += n * 2;
	}
	return mC.subarray(0, a * n * 2);
}
function gC(e) {
	let t = null, n = !1;
	for (let r of e) r && (t ? (n ||= (t = [[t[0][0], t[0][1]], [t[1][0], t[1][1]]], !0), t[0][0] = Math.min(t[0][0], r[0][0]), t[0][1] = Math.min(t[0][1], r[0][1]), t[1][0] = Math.max(t[1][0], r[1][0]), t[1][1] = Math.max(t[1][1], r[1][1])) : t = r);
	return t;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/viewports/viewport.js
W();
var _C = Math.PI / 180, vC = sC(), yC = [
	0,
	0,
	0
], bC = {
	unitsPerMeter: [
		1,
		1,
		1
	],
	metersPerUnit: [
		1,
		1,
		1
	]
};
function xC({ width: e, height: t, orthographic: n, fovyRadians: r, focalDistance: i, padding: a, near: o, far: s }) {
	let c = e / t, l = n ? new Hv().orthographic({
		fovy: r,
		aspect: c,
		focalDistance: i,
		near: o,
		far: s
	}) : new Hv().perspective({
		fovy: r,
		aspect: c,
		near: o,
		far: s
	});
	if (a) {
		let { left: n = 0, right: r = 0, top: i = 0, bottom: o = 0 } = a, s = c_((n + e - r) / 2, 0, e) - e / 2, c = c_((i + t - o) / 2, 0, t) - t / 2;
		l[8] -= s * 2 / e, l[9] += c * 2 / t;
	}
	return l;
}
var SC = class e {
	constructor(e = {}) {
		this._frustumPlanes = {}, this.id = e.id || this.constructor.displayName || "viewport", this.x = e.x || 0, this.y = e.y || 0, this.width = e.width || 1, this.height = e.height || 1, this.zoom = e.zoom || 0, this.padding = e.padding, this.distanceScales = e.distanceScales || bC, this.focalDistance = e.focalDistance || 1, this.position = e.position || yC, this.modelMatrix = e.modelMatrix || null;
		let { longitude: t, latitude: n } = e;
		this.isGeospatial = Number.isFinite(n) && Number.isFinite(t), this._initProps(e), this._initMatrices(e), this.equals = this.equals.bind(this), this.project = this.project.bind(this), this.unproject = this.unproject.bind(this), this.projectPosition = this.projectPosition.bind(this), this.unprojectPosition = this.unprojectPosition.bind(this), this.projectFlat = this.projectFlat.bind(this), this.unprojectFlat = this.unprojectFlat.bind(this);
	}
	get subViewports() {
		return null;
	}
	get metersPerPixel() {
		return this.distanceScales.metersPerUnit[2] / this.scale;
	}
	get projectionMode() {
		return this.isGeospatial ? this.zoom < 12 ? mx.WEB_MERCATOR : mx.WEB_MERCATOR_AUTO_OFFSET : mx.IDENTITY;
	}
	equals(t) {
		return t instanceof e ? this === t || t.width === this.width && t.height === this.height && t.scale === this.scale && t.projectionMode === this.projectionMode && t.resolution === this.resolution && u_(t.distanceScales.unitsPerMeter, this.distanceScales.unitsPerMeter) && u_(t.projectionMatrix, this.projectionMatrix) && u_(t.viewMatrix, this.viewMatrix) : !1;
	}
	project(e, { topLeft: t = !0 } = {}) {
		let n = lS(this.projectPosition(e), this.pixelProjectionMatrix), [r, i] = n, a = t ? i : this.height - i;
		return e.length === 2 ? [r, a] : [
			r,
			a,
			n[2]
		];
	}
	unproject(e, { topLeft: t = !0, targetZ: n } = {}) {
		let [r, i, a] = e, o = t ? i : this.height - i, s = n && n * this.distanceScales.unitsPerMeter[2], c = uS([
			r,
			o,
			a
		], this.pixelUnprojectionMatrix, s), [l, u, d] = this.unprojectPosition(c);
		return Number.isFinite(a) ? [
			l,
			u,
			d
		] : Number.isFinite(n) ? [
			l,
			u,
			n
		] : [l, u];
	}
	projectPosition(e) {
		let [t, n] = this.projectFlat(e);
		return [
			t,
			n,
			(e[2] || 0) * this.distanceScales.unitsPerMeter[2]
		];
	}
	unprojectPosition(e) {
		let [t, n] = this.unprojectFlat(e);
		return [
			t,
			n,
			(e[2] || 0) * this.distanceScales.metersPerUnit[2]
		];
	}
	projectFlat(e) {
		if (this.isGeospatial) {
			let t = $x(e);
			return t[1] = c_(t[1], -318, 830), t;
		}
		return e;
	}
	unprojectFlat(e) {
		return this.isGeospatial ? eS(e) : e;
	}
	getBounds(e = {}) {
		let t = { targetZ: e.z || 0 }, n = this.unproject([0, 0], t), r = this.unproject([this.width, 0], t), i = this.unproject([0, this.height], t), a = this.unproject([this.width, this.height], t);
		return [
			Math.min(n[0], r[0], i[0], a[0]),
			Math.min(n[1], r[1], i[1], a[1]),
			Math.max(n[0], r[0], i[0], a[0]),
			Math.max(n[1], r[1], i[1], a[1])
		];
	}
	getDistanceScales(e) {
		return e && this.isGeospatial ? rS({
			longitude: e[0],
			latitude: e[1],
			highPrecision: !0
		}) : this.distanceScales;
	}
	containsPixel({ x: e, y: t, width: n = 1, height: r = 1 }) {
		return e < this.x + this.width && this.x < e + n && t < this.y + this.height && this.y < t + r;
	}
	getFrustumPlanes() {
		return this._frustumPlanes.near || Object.assign(this._frustumPlanes, uC(this.viewProjectionMatrix)), this._frustumPlanes;
	}
	panByPosition(e, t, n) {
		return null;
	}
	_initProps(e) {
		let t = e.longitude, n = e.latitude;
		this.isGeospatial && (Number.isFinite(e.zoom) || (this.zoom = tS({ latitude: n }) + Math.log2(this.focalDistance)), this.distanceScales = e.distanceScales || rS({
			latitude: n,
			longitude: t
		}));
		let r = 2 ** this.zoom;
		this.scale = r;
		let { position: i, modelMatrix: a } = e, o = yC;
		if (i && (o = a ? new Hv(a).transformAsVector(i, []) : i), this.isGeospatial) {
			let e = this.projectPosition([
				t,
				n,
				0
			]);
			this.center = new av(o).scale(this.distanceScales.unitsPerMeter).add(e);
		} else this.center = this.projectPosition(o);
	}
	_initMatrices(e) {
		let { viewMatrix: t = vC, projectionMatrix: n = null, orthographic: r = !1, fovyRadians: i, fovy: a = 75, near: o = .1, far: s = 1e3, padding: c = null, focalDistance: l = 1 } = e;
		this.viewMatrixUncentered = t, this.viewMatrix = new Hv().multiplyRight(t).translate(new av(this.center).negate()), this.projectionMatrix = n || xC({
			width: this.width,
			height: this.height,
			orthographic: r,
			fovyRadians: i || a * _C,
			focalDistance: l,
			padding: c,
			near: o,
			far: s
		});
		let u = sC();
		pv(u, u, this.projectionMatrix), pv(u, u, this.viewMatrix), this.viewProjectionMatrix = u, this.viewMatrixInverse = dv([], this.viewMatrix) || this.viewMatrix, this.cameraPosition = lC(this.viewMatrixInverse);
		let d = sC(), f = sC();
		hv(d, d, [
			this.width / 2,
			-this.height / 2,
			1
		]), mv(d, d, [
			1,
			-1,
			0
		]), pv(f, d, this.viewProjectionMatrix), this.pixelProjectionMatrix = f, this.pixelUnprojectionMatrix = dv(sC(), this.pixelProjectionMatrix), this.pixelUnprojectionMatrix || B.warn("Pixel project matrix not invertible")();
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/viewports/web-mercator-viewport.js
SC.displayName = "Viewport", W();
var CC = class e extends SC {
	constructor(e = {}) {
		let { latitude: t = 0, longitude: n = 0, zoom: r = 0, pitch: i = 0, bearing: a = 0, nearZMultiplier: o = .1, farZMultiplier: s = 1.01, nearZ: c, farZ: l, orthographic: u = !1, projectionMatrix: d, repeat: f = !1, worldOffset: p = 0, position: m, padding: h, legacyMeterSizes: g = !1 } = e, { width: _, height: v, altitude: y = 1.5 } = e, b = 2 ** r;
		_ ||= 1, v ||= 1;
		let x, S = null;
		if (d) y = d[5] / 2, x = sS(y);
		else {
			e.fovy ? (x = e.fovy, y = cS(x)) : x = sS(y);
			let n;
			if (h) {
				let { top: e = 0, bottom: t = 0 } = h;
				n = [0, c_((e + v - t) / 2, 0, v) - v / 2];
			}
			S = oS({
				width: _,
				height: v,
				scale: b,
				center: m && [
					0,
					0,
					m[2] * nS(t)
				],
				offset: n,
				pitch: i,
				fovy: x,
				nearZMultiplier: o,
				farZMultiplier: s
			}), Number.isFinite(c) && (S.near = c), Number.isFinite(l) && (S.far = l);
		}
		let C = aS({
			height: v,
			pitch: i,
			bearing: a,
			scale: b,
			altitude: y
		});
		p && (C = new Hv().translate([
			512 * p,
			0,
			0
		]).multiplyLeft(C)), super({
			...e,
			width: _,
			height: v,
			viewMatrix: C,
			longitude: n,
			latitude: t,
			zoom: r,
			...S,
			fovy: x,
			focalDistance: y
		}), this.latitude = t, this.longitude = n, this.zoom = r, this.pitch = i, this.bearing = a, this.altitude = y, this.fovy = x, this.orthographic = u, this._subViewports = f ? [] : null, this._pseudoMeters = g, Object.freeze(this);
	}
	get subViewports() {
		if (this._subViewports && !this._subViewports.length) {
			let t = this.getBounds(), n = Math.floor((t[0] + 180) / 360), r = Math.ceil((t[2] - 180) / 360);
			for (let t = n; t <= r; t++) {
				let n = t ? new e({
					...this,
					worldOffset: t
				}) : this;
				this._subViewports.push(n);
			}
		}
		return this._subViewports;
	}
	equals(t) {
		return t instanceof e && t._pseudoMeters === this._pseudoMeters && super.equals(t);
	}
	projectPosition(e) {
		if (this._pseudoMeters) return super.projectPosition(e);
		let [t, n] = this.projectFlat(e);
		return [
			t,
			n,
			(e[2] || 0) * nS(e[1])
		];
	}
	unprojectPosition(e) {
		if (this._pseudoMeters) return super.unprojectPosition(e);
		let [t, n] = this.unprojectFlat(e);
		return [
			t,
			n,
			(e[2] || 0) / nS(n)
		];
	}
	addMetersToLngLat(e, t) {
		return iS(e, t);
	}
	panByPosition(e, t, n) {
		let r = uS(t, this.pixelUnprojectionMatrix), i = D_([], this.projectFlat(e), k_([], r)), a = D_([], this.center, i), [o, s] = this.unprojectFlat(a);
		return {
			longitude: o,
			latitude: s
		};
	}
	panByPosition3D(e, t) {
		let n = e[2] || 0, r = F_([], e, this.unproject(t, { targetZ: n }));
		return {
			longitude: this.longitude + r[0],
			latitude: this.latitude + r[1]
		};
	}
	getBounds(e = {}) {
		let t = mS(this, e.z || 0);
		return [
			Math.min(t[0][0], t[1][0], t[2][0], t[3][0]),
			Math.min(t[0][1], t[1][1], t[2][1], t[3][1]),
			Math.max(t[0][0], t[1][0], t[2][0], t[3][0]),
			Math.max(t[0][1], t[1][1], t[2][1], t[3][1])
		];
	}
	fitBounds(t, n = {}) {
		let { width: r, height: i } = this, { longitude: a, latitude: o, zoom: s } = dS({
			width: r,
			height: i,
			bounds: t,
			...n
		});
		return new e({
			width: r,
			height: i,
			longitude: a,
			latitude: o,
			zoom: s
		});
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/shaderlib/project/project-functions.js
CC.displayName = "WebMercatorViewport", W();
var wC = [
	0,
	0,
	0
];
function TC(e, t, n = !1) {
	let r = t.projectPosition(e);
	if (n && t instanceof CC) {
		let [n, i, a = 0] = e;
		r[2] = a * t.getDistanceScales([n, i]).unitsPerMeter[2];
	}
	return r;
}
function EC(e) {
	let { viewport: t, modelMatrix: n, coordinateOrigin: r } = e, { coordinateSystem: i, fromCoordinateSystem: a, fromCoordinateOrigin: o } = e;
	return i === "default" && (i = t.isGeospatial ? "lnglat" : "cartesian"), a === void 0 ? a = i : a === "default" && (a = t.isGeospatial ? "lnglat" : "cartesian"), o === void 0 && (o = r), {
		viewport: t,
		coordinateSystem: i,
		coordinateOrigin: r,
		modelMatrix: n,
		fromCoordinateSystem: a,
		fromCoordinateOrigin: o
	};
}
function DC(e, { viewport: t, modelMatrix: n, coordinateSystem: r, coordinateOrigin: i, offsetMode: a }) {
	let [o, s, c = 0] = e;
	switch (n && ([o, s, c] = Av([], [
		o,
		s,
		c,
		1
	], n)), r) {
		case "default": return DC(e, {
			viewport: t,
			modelMatrix: n,
			coordinateSystem: t.isGeospatial ? "lnglat" : "cartesian",
			coordinateOrigin: i,
			offsetMode: a
		});
		case "lnglat": return TC([
			o,
			s,
			c
		], t, a);
		case "lnglat-offsets": return TC([
			o + i[0],
			s + i[1],
			c + (i[2] || 0)
		], t, a);
		case "meter-offsets": return TC(iS(i, [
			o,
			s,
			c
		]), t, a);
		case "cartesian": return t.isGeospatial ? [
			o + i[0],
			s + i[1],
			c + i[2]
		] : t.projectPosition([
			o,
			s,
			c
		]);
		default: throw Error(`Invalid coordinateSystem: ${r}`);
	}
}
function OC(e, t) {
	let { viewport: n, coordinateSystem: r, coordinateOrigin: i, modelMatrix: a, fromCoordinateSystem: o, fromCoordinateOrigin: s } = EC(t), { autoOffset: c = !0 } = t, { geospatialOrigin: l = wC, shaderCoordinateOrigin: u = wC, offsetMode: d = !1 } = c ? Ox(n, r, i) : {}, f = DC(e, {
		viewport: n,
		modelMatrix: a,
		coordinateSystem: o,
		coordinateOrigin: s,
		offsetMode: d
	});
	if (d) {
		let e = n.projectPosition(l || u);
		tv(f, f, e);
	}
	return f;
}
//#endregion
//#region node_modules/@luma.gl/engine/dist/utils/uid.js
function kC(e = "id") {
	return AC[e] = AC[e] || 1, `${e}-${AC[e]++}`;
}
var AC, jC = t((() => {
	AC = {};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/geometry/geometry.js
function MC(e) {
	switch (e) {
		case "POSITION": return "positions";
		case "NORMAL": return "normals";
		case "TEXCOORD_0": return "texCoords";
		case "TEXCOORD_1": return "texCoords1";
		case "COLOR_0": return "colors";
		default: return e;
	}
}
function NC(e) {
	let t = [];
	for (let [n, r] of Object.entries(e)) {
		if (!r) continue;
		let { value: e, size: i, normalized: a } = r;
		if (i === void 0) throw Error(`Attribute ${n} is missing a size`);
		t.push({
			name: MC(n),
			format: M.getVertexFormatFromAttribute(e, i, a)
		});
	}
	return t;
}
var PC, FC = t((() => {
	I(), jC(), PC = class {
		id;
		topology;
		vertexCount;
		indices;
		attributes;
		bufferLayout;
		userData = {};
		constructor(e) {
			let { attributes: t = {}, indices: n = null, vertexCount: r = null } = e;
			this.id = e.id || kC("geometry"), this.topology = e.topology, n && (this.indices = ArrayBuffer.isView(n) ? {
				value: n,
				size: 1
			} : n), this.attributes = {};
			for (let [e, n] of Object.entries(t)) {
				let t = ArrayBuffer.isView(n) ? { value: n } : n;
				if (!ArrayBuffer.isView(t.value)) throw Error(`${this._print(e)}: must be typed array or object with value as typed array`);
				if ((e === "POSITION" || e === "positions") && !t.size && (t.size = 3), e === "indices") {
					if (this.indices) throw Error("Multiple indices detected");
					this.indices = t;
				} else {
					let n = MC(e), r = Object.keys(this.attributes).find((e) => MC(e) === n);
					r && delete this.attributes[r], this.attributes[e] = t;
				}
			}
			this.indices && this.indices.isIndexed !== void 0 && (this.indices = Object.assign({}, this.indices), delete this.indices.isIndexed), this.vertexCount = r || this._calculateVertexCount(this.attributes, this.indices), this.bufferLayout = e.bufferLayout || NC(this.attributes);
		}
		getVertexCount() {
			return this.vertexCount;
		}
		getAttributes() {
			return this.indices ? {
				indices: this.indices,
				...this.attributes
			} : this.attributes;
		}
		_print(e) {
			return `Geometry ${this.id} attribute ${e}`;
		}
		_setAttributes(e, t) {
			return this;
		}
		_calculateVertexCount(e, t) {
			if (t) return t.value.length;
			let n = Infinity;
			for (let t of Object.values(e)) {
				if (!t) continue;
				let { value: e, size: r, constant: i } = t;
				!i && e && r !== void 0 && r >= 1 && (n = Math.min(n, e.length / r));
			}
			return n;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/geometry/geometry-utils.js
function IC(e, t = {}) {
	let n = t.bufferName || "geometry";
	if (LC(e, n)) return e;
	let r = t.minAttributeAlignment || 4, i = RC(e, t.attributes), a = [], o = 0, s = Infinity;
	for (let [e, t] of i) {
		if (!t) continue;
		if (t.constant) throw Error(`Attribute ${e} is constant`);
		let { value: n, size: i, normalized: c } = t;
		if (!ArrayBuffer.isView(n)) throw Error(`Attribute ${e} is missing typed array data`);
		if (i === void 0) throw Error(`Attribute ${e} is missing a size`);
		let l = M.getVertexFormatFromAttribute(n, i, c), u = M.getVertexFormatInfo(l);
		o = BC(o, r), a.push({
			sourceName: e,
			attributeName: MC(e),
			value: n,
			size: i,
			format: l,
			byteOffset: o,
			byteLength: u.byteLength
		}), o += u.byteLength;
		let d = n.length / i;
		if (!Number.isInteger(d)) throw Error(`Attribute ${e} length is not divisible by size`);
		s = Math.min(s, d);
	}
	if (a.length === 0 || !Number.isFinite(s)) throw Error(`Geometry ${e.id} has no interleavable attributes`);
	let c = BC(o, r), l = new ArrayBuffer(s * c);
	for (let e of a) zC(l, s, c, e);
	return new PC({
		id: e.id,
		topology: e.topology || "triangle-list",
		vertexCount: e.vertexCount,
		indices: e.indices,
		attributes: { [n]: {
			value: new Uint8Array(l),
			size: c,
			byteStride: c
		} },
		bufferLayout: [{
			name: n,
			stepMode: "vertex",
			byteStride: c,
			attributes: a.map((e) => ({
				attribute: e.attributeName,
				format: e.format,
				byteOffset: e.byteOffset
			}))
		}]
	});
}
function LC(e, t) {
	if (e.bufferLayout.length !== 1) return !1;
	let n = e.bufferLayout[0];
	return n.name === t && !!n.attributes?.length && !!e.attributes[t];
}
function RC(e, t) {
	return t ? t.map((t) => [t, e.attributes[t]]) : Object.entries(e.attributes);
}
function zC(e, t, n, r) {
	let i = r.value.constructor, a = i.BYTES_PER_ELEMENT;
	if (r.byteOffset % a !== 0 || n % a !== 0) throw Error(`Attribute ${r.sourceName} is not aligned to its component type`);
	let o = new i(e), s = r.value, c = r.byteOffset / a, l = n / a;
	for (let e = 0; e < t; e++) {
		let t = e * r.size, n = e * l + c;
		for (let e = 0; e < r.size; e++) o[n + e] = s[t + e];
	}
}
function BC(e, t) {
	return Math.ceil(e / t) * t;
}
var VC = t((() => {
	I(), FC();
})), HC, UC, WC, GC = t((() => {
	HC = 1, UC = 1, WC = class {
		time = 0;
		channels = /* @__PURE__ */ new Map();
		animations = /* @__PURE__ */ new Map();
		playing = !1;
		lastEngineTime = -1;
		constructor() {}
		addChannel(e) {
			let { delay: t = 0, duration: n = Infinity, rate: r = 1, repeat: i = 1 } = e, a = HC++, o = {
				time: 0,
				delay: t,
				duration: n,
				rate: r,
				repeat: i
			};
			return this._setChannelTime(o, this.time), this.channels.set(a, o), a;
		}
		removeChannel(e) {
			this.channels.delete(e);
			for (let [t, n] of this.animations) n.channel === e && this.detachAnimation(t);
		}
		isFinished(e) {
			let t = this.channels.get(e);
			return t !== void 0 && this.time >= t.delay + t.duration * t.repeat;
		}
		getTime(e) {
			if (e === void 0) return this.time;
			let t = this.channels.get(e);
			return t === void 0 ? -1 : t.time;
		}
		setTime(e) {
			this.time = Math.max(0, e);
			let t = this.channels.values();
			for (let e of t) this._setChannelTime(e, this.time);
			let n = this.animations.values();
			for (let e of n) {
				let { animation: t, channel: n } = e;
				t.setTime(this.getTime(n));
			}
		}
		play() {
			this.playing = !0;
		}
		pause() {
			this.playing = !1, this.lastEngineTime = -1;
		}
		reset() {
			this.setTime(0);
		}
		attachAnimation(e, t) {
			let n = UC++;
			return this.animations.set(n, {
				animation: e,
				channel: t
			}), e.setTime(this.getTime(t)), n;
		}
		detachAnimation(e) {
			this.animations.delete(e);
		}
		update(e) {
			this.playing && (this.lastEngineTime === -1 && (this.lastEngineTime = e), this.setTime(this.time + (e - this.lastEngineTime)), this.lastEngineTime = e);
		}
		_setChannelTime(e, t) {
			let n = t - e.delay;
			n >= e.duration * e.repeat ? e.time = e.duration * e.rate : (e.time = Math.max(0, n) % e.duration, e.time *= e.rate);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/animation-loop/request-animation-frame.js
function KC(e) {
	let t = typeof window < "u" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame : null;
	return t ? t.call(window, e) : setTimeout(() => e(typeof performance < "u" ? performance.now() : Date.now()), 1e3 / 60);
}
function qC(e) {
	let t = typeof window < "u" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame : null;
	t ? t.call(window, e) : clearTimeout(e);
}
var JC = t((() => {})), YC, XC, ZC, QC, $C = t((() => {
	I(), JC(), je(), YC = 0, XC = "Animation Loop", ZC = {
		requestAnimationFrame: (e) => KC(e),
		cancelAnimationFrame: (e) => qC(e)
	}, QC = class e {
		static defaultAnimationLoopProps = {
			device: null,
			onAddHTML: () => "",
			onInitialize: async () => null,
			onRender: () => {},
			onFinalize: () => {},
			onError: (e) => {
				console.error(e);
			},
			stats: void 0,
			autoResizeViewport: !1,
			animationFrameProvider: ZC
		};
		device = null;
		canvas = null;
		props;
		animationProps = null;
		timeline = null;
		stats;
		sharedStats;
		cpuTime;
		gpuTime;
		frameRate;
		display;
		_needsRedraw = "initialized";
		_initialized = !1;
		_running = !1;
		_animationFrameId = null;
		_nextFramePromise = null;
		_resolveNextFrame = null;
		_cpuStartTime = 0;
		_error = null;
		_lastFrameTime = 0;
		constructor(t) {
			if (this.props = {
				...e.defaultAnimationLoopProps,
				...t
			}, t = this.props, !t.device) throw Error("No device provided");
			this.stats = t.stats || new ke({ id: `animation-loop-${YC++}` }), this.sharedStats = Ue.stats.get(XC), this.frameRate = this.stats.get("Frame Rate"), this.frameRate.setSampleSize(1), this.cpuTime = this.stats.get("CPU Time"), this.gpuTime = this.stats.get("GPU Time"), this.setProps({
				autoResizeViewport: t.autoResizeViewport,
				animationFrameProvider: t.animationFrameProvider
			}), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this._onMousemove = this._onMousemove.bind(this), this._onMouseleave = this._onMouseleave.bind(this);
		}
		destroy() {
			this.stop(), this._setDisplay(null), this.device?._disableDebugGPUTime();
		}
		delete() {
			this.destroy();
		}
		reportError(t) {
			this._error = t, this.props.onError(t), this.props.onError === e.defaultAnimationLoopProps.onError && typeof window < "u" && typeof ErrorEvent < "u" && window.dispatchEvent(new ErrorEvent("error", {
				error: t,
				message: t.message
			}));
		}
		setNeedsRedraw(e) {
			return this._needsRedraw = this._needsRedraw || e, this;
		}
		needsRedraw() {
			let e = this._needsRedraw;
			return this._needsRedraw = !1, e;
		}
		setProps(e) {
			if ("autoResizeViewport" in e && (this.props.autoResizeViewport = e.autoResizeViewport || !1), "animationFrameProvider" in e) {
				let t = e.animationFrameProvider || ZC;
				if (t !== this.props.animationFrameProvider) {
					let e = this._animationFrameId !== null;
					e && this._cancelAnimationFrame(), this.props.animationFrameProvider = t, e && this._requestAnimationFrame();
				}
			}
			return this;
		}
		async start() {
			if (this._running) return this;
			this._running = !0;
			try {
				if (!this._initialized) {
					if (this._initialized = !0, await this._initDevice(), this._initialize(), !this._running) return null;
					await this.props.onInitialize(this._getAnimationProps());
				}
				return this._running ? (this._cancelAnimationFrame(), this._requestAnimationFrame(), this) : null;
			} catch (e) {
				let t = e instanceof Error ? e : /* @__PURE__ */ Error("Unknown error");
				throw this.props.onError(t), t;
			}
		}
		stop() {
			if (this._running) {
				let e = this.animationProps;
				this._cancelAnimationFrame(), this._nextFramePromise = null, this._resolveNextFrame = null, this._running = !1, this._lastFrameTime = 0, e && this.props.onFinalize(e);
			}
			return this;
		}
		redraw(e, t = null) {
			return this.device?.isLost || this._error || (this._beginFrameTimers(e), this._setupFrame(), this.animationProps && (this.animationProps.animationFrame = t), this._updateAnimationProps(), this._renderFrame(this._getAnimationProps()), this._clearNeedsRedraw(), this._resolveNextFrame &&= (this._resolveNextFrame(this), this._nextFramePromise = null, null), this._endFrameTimers()), this;
		}
		attachTimeline(e) {
			return this.timeline = e, this.timeline;
		}
		detachTimeline() {
			this.timeline = null;
		}
		waitForRender() {
			return this.setNeedsRedraw("waitForRender"), this._nextFramePromise ||= new Promise((e) => {
				this._resolveNextFrame = e;
			}), this._nextFramePromise;
		}
		async toDataURL() {
			if (this.setNeedsRedraw("toDataURL"), await this.waitForRender(), this.canvas instanceof HTMLCanvasElement) return this.canvas.toDataURL();
			throw Error("OffscreenCanvas");
		}
		_initialize() {
			this._startEventHandling(), this._initializeAnimationProps(), this._updateAnimationProps(), this._resizeViewport(), this.device?._enableDebugGPUTime();
		}
		_setDisplay(e) {
			this.display && (this.display.destroy(), this.display.animationLoop = null), e && (e.animationLoop = this), this.display = e;
		}
		_requestAnimationFrame() {
			this._running && (this._animationFrameId = this.props.animationFrameProvider.requestAnimationFrame(this._animationFrame.bind(this)));
		}
		_cancelAnimationFrame() {
			this._animationFrameId !== null && (this.props.animationFrameProvider.cancelAnimationFrame(this._animationFrameId), this._animationFrameId = null);
		}
		_animationFrame(e, t) {
			if (this._running) try {
				this.redraw(e, t ?? null), this._requestAnimationFrame();
			} catch (e) {
				let t = e instanceof Error ? e : Error(String(e));
				this.reportError(t), this.stop();
			}
		}
		_renderFrame(e) {
			if (this.display) {
				this.display._renderFrame(e);
				return;
			}
			let t = this.props.onRender(this._getAnimationProps());
			this.device && t !== !1 && this.device.submit();
		}
		_clearNeedsRedraw() {
			this._needsRedraw = !1;
		}
		_setupFrame() {
			this._resizeViewport();
		}
		_initializeAnimationProps() {
			let e = this.device?.getDefaultCanvasContext();
			if (!this.device || !e) throw Error("loop");
			let t = e?.canvas, n = e.props.useDevicePixels;
			this.animationProps = {
				animationLoop: this,
				device: this.device,
				canvasContext: e,
				canvas: t,
				useDevicePixels: n,
				timeline: this.timeline,
				needsRedraw: !1,
				width: 1,
				height: 1,
				aspect: 1,
				time: 0,
				startTime: Date.now(),
				engineTime: 0,
				tick: 0,
				tock: 0,
				animationFrame: null,
				_mousePosition: null
			};
		}
		_getAnimationProps() {
			if (!this.animationProps) throw Error("animationProps");
			return this.animationProps;
		}
		_updateAnimationProps() {
			if (!this.animationProps) return;
			let { width: e, height: t, aspect: n } = this._getSizeAndAspect();
			(e !== this.animationProps.width || t !== this.animationProps.height) && this.setNeedsRedraw("drawing buffer resized"), n !== this.animationProps.aspect && this.setNeedsRedraw("drawing buffer aspect changed"), this.animationProps.width = e, this.animationProps.height = t, this.animationProps.aspect = n, this.animationProps.needsRedraw = this._needsRedraw, this.animationProps.engineTime = Date.now() - this.animationProps.startTime, this.timeline && this.timeline.update(this.animationProps.engineTime), this.animationProps.tick = Math.floor(this.animationProps.time / 1e3 * 60), this.animationProps.tock++, this.animationProps.time = this.timeline ? this.timeline.getTime() : this.animationProps.engineTime;
		}
		async _initDevice() {
			if (this.device = await this.props.device, !this.device) throw Error("No device provided");
			this.canvas = this.device.getDefaultCanvasContext().canvas || null;
		}
		_createInfoDiv() {
			if (this.canvas && this.props.onAddHTML) {
				let e = document.createElement("div");
				document.body.appendChild(e), e.style.position = "relative";
				let t = document.createElement("div");
				t.style.position = "absolute", t.style.left = "10px", t.style.bottom = "10px", t.style.width = "300px", t.style.background = "white", this.canvas instanceof HTMLCanvasElement && e.appendChild(this.canvas), e.appendChild(t);
				let n = this.props.onAddHTML(t);
				n && (t.innerHTML = n);
			}
		}
		_getSizeAndAspect() {
			if (!this.device) return {
				width: 1,
				height: 1,
				aspect: 1
			};
			let [e, t] = this.device.getDefaultCanvasContext().getDrawingBufferSize();
			return {
				width: e,
				height: t,
				aspect: e > 0 && t > 0 ? e / t : 1
			};
		}
		_resizeViewport() {
			this.props.autoResizeViewport && this.device.gl && this.device.gl.viewport(0, 0, this.device.gl.drawingBufferWidth, this.device.gl.drawingBufferHeight);
		}
		_beginFrameTimers(e) {
			let t = e ?? (typeof performance < "u" ? performance.now() : Date.now());
			if (this._lastFrameTime) {
				let e = t - this._lastFrameTime;
				e > 0 && this.frameRate.addTime(e);
			}
			this._lastFrameTime = t, this.device?._isDebugGPUTimeEnabled() && this._consumeEncodedGpuTime(), this.cpuTime.timeStart();
		}
		_endFrameTimers() {
			this.device?._isDebugGPUTimeEnabled() && this._consumeEncodedGpuTime(), this.cpuTime.timeEnd(), this._updateSharedStats();
		}
		_consumeEncodedGpuTime() {
			if (!this.device) return;
			let e = this.device.commandEncoder._gpuTimeMs;
			e !== void 0 && (this.gpuTime.addTime(e), this.device.commandEncoder._gpuTimeMs = void 0);
		}
		_updateSharedStats() {
			if (this.stats !== this.sharedStats) {
				for (let e of Object.keys(this.sharedStats.stats)) this.stats.stats[e] || delete this.sharedStats.stats[e];
				this.stats.forEach((e) => {
					let t = this.sharedStats.get(e.name, e.type);
					t.sampleSize = e.sampleSize, t.time = e.time, t.count = e.count, t.samples = e.samples, t.lastTiming = e.lastTiming, t.lastSampleTime = e.lastSampleTime, t.lastSampleCount = e.lastSampleCount, t._count = e._count, t._time = e._time, t._samples = e._samples, t._startTime = e._startTime, t._timerPending = e._timerPending;
				});
			}
		}
		_startEventHandling() {
			this.canvas && (this.canvas.addEventListener("mousemove", this._onMousemove.bind(this)), this.canvas.addEventListener("mouseleave", this._onMouseleave.bind(this)));
		}
		_onMousemove(e) {
			e instanceof MouseEvent && (this._getAnimationProps()._mousePosition = [e.offsetX, e.offsetY]);
		}
		_onMouseleave(e) {
			this._getAnimationProps()._mousePosition = null;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/geometry/gpu-geometry.js
function ew(e, t) {
	if (t instanceof rw) return t;
	let n = IC(t), r = tw(e, n), { attributes: i, bufferLayout: a } = nw(e, n);
	return new rw({
		topology: n.topology || "triangle-list",
		bufferLayout: a,
		vertexCount: n.vertexCount,
		indices: r,
		attributes: i
	});
}
function tw(e, t) {
	if (!t.indices) return;
	let n = t.indices.value;
	return e.createBuffer({
		usage: j.INDEX,
		data: n
	});
}
function nw(e, t) {
	let n = {};
	for (let [r, i] of Object.entries(t.attributes)) {
		let a = t.bufferLayout.find((e) => e.name === r)?.name || MC(r);
		i && (n[a] = e.createBuffer({
			data: i.value,
			id: `${r}-buffer`
		}));
	}
	return {
		attributes: n,
		bufferLayout: t.bufferLayout,
		vertexCount: t.vertexCount
	};
}
var rw, iw = t((() => {
	I(), FC(), VC(), jC(), rw = class {
		id;
		userData = {};
		topology;
		bufferLayout = [];
		vertexCount;
		indices;
		attributes;
		constructor(e) {
			if (this.id = e.id || kC("geometry"), this.topology = e.topology, this.indices = e.indices || null, this.attributes = e.attributes, this.vertexCount = e.vertexCount, this.bufferLayout = e.bufferLayout || [], this.indices && !(this.indices.usage & j.INDEX)) throw Error("Index buffer must have INDEX usage");
		}
		destroy() {
			this.indices?.destroy();
			for (let e of Object.values(this.attributes)) e.destroy();
		}
		getVertexCount() {
			return this.vertexCount;
		}
		getAttributes() {
			return this.attributes;
		}
		getIndexes() {
			return this.indices || null;
		}
		_calculateVertexCount(e) {
			return e.byteLength / 12;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/debug/debug-shader-layout.js
function aw(e, t) {
	let n = {}, r = "Values";
	if (e.attributes.length === 0 && !e.varyings?.length) return { "No attributes or varyings": { [r]: "N/A" } };
	for (let t of e.attributes) if (t) {
		let e = `${t.location} ${t.name}: ${t.type}`;
		n[`in ${e}`] = { [r]: t.stepMode || "vertex" };
	}
	for (let t of e.varyings || []) {
		let e = `${t.location} ${t.name}`;
		n[`out ${e}`] = { [r]: JSON.stringify(t) };
	}
	return n;
}
var ow = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/debug/debug-framebuffer.js
function sw(e, t, n) {
	if (e.device.type !== "webgl") return;
	let r = uw(e.device);
	r.flushing || (fw(e) ? cw(e, n, r) : t && dw(t) && t.handle !== null && (r.queuedFramebuffers.includes(t) || r.queuedFramebuffers.push(t)));
}
function cw(e, t, n) {
	if (n.queuedFramebuffers.length === 0) return;
	let { gl: r } = e.device, i = r.getParameter(36010), a = r.getParameter(36006), [o, s] = e.device.getDefaultCanvasContext().getDrawingBufferSize(), c = pw(t.top, hw), l = pw(t.left, hw);
	n.flushing = !0;
	try {
		for (let e of n.queuedFramebuffers) {
			let [n, i, a, u, d] = lw({
				framebuffer: e,
				targetWidth: o,
				targetHeight: s,
				topPx: c,
				leftPx: l,
				minimap: t.minimap
			});
			r.bindFramebuffer(36008, e.handle), r.bindFramebuffer(36009, null), r.blitFramebuffer(0, 0, e.width, e.height, n, i, a, u, 16384, 9728), c += d + hw;
		}
	} finally {
		r.bindFramebuffer(36008, i), r.bindFramebuffer(36009, a), n.flushing = !1;
	}
}
function lw(e) {
	let { framebuffer: t, targetWidth: n, targetHeight: r, topPx: i, leftPx: a, minimap: o } = e, s = o ? Math.max(Math.floor(n / 4), 1) : n, c = o ? Math.max(Math.floor(r / 4), 1) : r, l = Math.min(s / t.width, c / t.height), u = Math.max(Math.floor(t.width * l), 1), d = Math.max(Math.floor(t.height * l), 1), f = a, p = Math.max(r - i - d, 0);
	return [
		f,
		p,
		f + u,
		p + d,
		d
	];
}
function uw(e) {
	return e.userData[mw] ||= {
		flushing: !1,
		queuedFramebuffers: []
	}, e.userData[mw];
}
function dw(e) {
	return "colorAttachments" in e;
}
function fw(e) {
	let t = e.props.framebuffer;
	return !t || t.handle === null;
}
function pw(e, t) {
	if (!e) return t;
	let n = Number.parseInt(e, 10);
	return Number.isFinite(n) ? n : t;
}
var mw, hw, gw = t((() => {
	mw = "__debugFramebufferState", hw = 8;
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/utils/deep-equal.js
function _w(e, t, n) {
	if (e === t) return !0;
	if (!n || !e || !t) return !1;
	if (Array.isArray(e)) {
		if (!Array.isArray(t) || e.length !== t.length) return !1;
		for (let r = 0; r < e.length; r++) if (!_w(e[r], t[r], n - 1)) return !1;
		return !0;
	}
	if (Array.isArray(t)) return !1;
	if (typeof e == "object" && typeof t == "object") {
		let r = Object.keys(e), i = Object.keys(t);
		if (r.length !== i.length) return !1;
		for (let i of r) if (!t.hasOwnProperty(i) || !_w(e[i], t[i], n - 1)) return !1;
		return !0;
	}
	return !1;
}
var vw = t((() => {})), yw, bw = t((() => {
	I(), yw = class {
		bufferLayouts;
		constructor(e) {
			this.bufferLayouts = e;
		}
		getBufferLayout(e) {
			return this.bufferLayouts.find((t) => t.name === e) || null;
		}
		getAttributeNamesForBuffer(e) {
			return Ji(e);
		}
		mergeBufferLayouts(e, t) {
			let n = [...e];
			for (let e of t) {
				let t = n.findIndex((t) => t.name === e.name);
				t < 0 ? n.push(e) : n[t] = e;
			}
			return n;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/utils/buffer-layout-order.js
function xw(e, t) {
	let n = Yi(e), r = t.slice();
	return r.sort((e, t) => Xi(Ji(e).map((e) => n[e])) - Xi(Ji(t).map((e) => n[e]))), r;
}
var Sw = t((() => {
	I();
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/utils/shader-module-utils.js
function Cw(e, t) {
	if (!e || !t.some((e) => e.bindingLayout?.length)) return e;
	let n = {
		...e,
		bindings: e.bindings.map((e) => ({ ...e }))
	};
	"attributes" in (e || {}) && (n.attributes = e?.attributes || []);
	for (let e of t) for (let t of e.bindingLayout || []) for (let e of Ow(t.name)) {
		let r = n.bindings.find((t) => t.name === e);
		r?.group === 0 && (r.group = t.group), r && t.visibility !== void 0 && (r.visibility = t.visibility);
	}
	return n;
}
function ww(e, t, n = []) {
	return e ? t ? {
		...e,
		attributes: e.attributes.length ? jw(e.attributes, t.attributes.filter((e) => n.includes(e.name))) : t.attributes,
		bindings: Aw(e.bindings, t.bindings)
	} : e : t;
}
function Tw(e) {
	return !(!e.uniformTypes || kw(e.uniformTypes));
}
function Ew(e) {
	let t = [];
	for (let n of e) {
		let e = km(n), r = new Set([n.vs, n.fs].flatMap((e) => e ? Nm(e).filter((e) => e.isStd140).map((e) => e.blockName) : [])), i = r.has(e) ? e : r.size === 1 ? r.values().next().value : void 0;
		Tw(n) && i && t.push({
			name: i,
			uniformTypes: n.uniformTypes
		});
	}
	return t;
}
function Dw(e, t) {
	let n = [], r = /* @__PURE__ */ new Set();
	for (let i of [...e || [], ...t || []]) r.has(i.name) || (r.add(i.name), n.push(i));
	return n;
}
function Ow(e) {
	let t = /* @__PURE__ */ new Set([e, `${e}Uniforms`]);
	return e.endsWith("Uniforms") || t.add(`${e}Sampler`), [...t];
}
function kw(e) {
	for (let t in e) return !1;
	return !0;
}
function Aw(e, t) {
	let n = e.map((e) => ({ ...e })), r = new Set(e.map((e) => e.name)), i = new Set(e.map((e) => `${e.group}:${e.location}`));
	for (let e of t) {
		let t = `${e.group}:${e.location}`;
		!r.has(e.name) && !i.has(t) && n.push({ ...e });
	}
	return n;
}
function jw(e, t) {
	let n = e.map((e) => ({ ...e })), r = new Map(e.map((e) => [e.name, e])), i = new Map(e.map((e) => [e.location, e]));
	for (let e of t) {
		let t = r.get(e.name);
		if (t) {
			if (t.type !== e.type || t.location !== e.location) throw Error(`Shader attribute "${e.name}" conflicts with its inferred type or location`);
			continue;
		}
		let a = i.get(e.location);
		if (a) throw Error(`Shader attributes "${a.name}" and "${e.name}" both use location ${e.location}`);
		n.push({ ...e });
	}
	return n;
}
var Mw = t((() => {
	G();
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/model/split-uniforms-and-bindings.js
function Nw(e) {
	return lf(e) || typeof e == "number" || typeof e == "boolean";
}
function Pw(e, t = {}) {
	let n = {
		bindings: {},
		uniforms: {}
	};
	return Object.keys(e).forEach((r) => {
		let i = e[r];
		Object.prototype.hasOwnProperty.call(t, r) || Nw(i) ? n.uniforms[r] = i : n.bindings[r] = i;
	}), n;
}
var Fw = t((() => {
	df();
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/shader-inputs.js
function Iw(e = {}, t = {}, n = {}) {
	let r = { ...e };
	for (let [i, a] of Object.entries(t)) a !== void 0 && (r[i] = Lw(e[i], a, n[i]));
	return r;
}
function Lw(e, t, n) {
	if (!n || typeof n == "string") return Rw(t);
	if (Array.isArray(n)) {
		if (zw(t) || !Array.isArray(t)) return Rw(t);
		let r = Array.isArray(e) && !zw(e) ? [...e] : [], i = r.slice();
		for (let e = 0; e < t.length; e++) {
			let a = t[e];
			a !== void 0 && (i[e] = Lw(r[e], a, n[0]));
		}
		return i;
	}
	if (!Bw(t)) return Rw(t);
	let r = n, i = Bw(e) ? e : {}, a = { ...i };
	for (let [e, n] of Object.entries(t)) n !== void 0 && (a[e] = Lw(i[e], n, r[e]));
	return a;
}
function Rw(e) {
	return ArrayBuffer.isView(e) ? Array.prototype.slice.call(e) : Array.isArray(e) ? zw(e) ? e.slice() : e.map((e) => e === void 0 ? void 0 : Rw(e)) : Bw(e) ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, t === void 0 ? void 0 : Rw(t)])) : e;
}
function zw(e) {
	return ArrayBuffer.isView(e) || Array.isArray(e) && (e.length === 0 || typeof e[0] == "number");
}
function Bw(e) {
	return !!e && typeof e == "object" && !Array.isArray(e) && !ArrayBuffer.isView(e);
}
function Vw(e) {
	return !!e?.dependencies;
}
var Hw, Uw = t((() => {
	I(), G(), Fw(), Hw = class {
		options = { disableWarnings: !1 };
		modules;
		moduleUniforms;
		moduleBindings;
		directBindings = {};
		constructor(e, t) {
			Object.assign(this.options, t);
			let n = vm(Object.values(e).filter(Vw));
			for (let t of n) e[t.name] = t;
			O.log(1, "Creating ShaderInputs with modules", Object.keys(e))(), this.modules = e, this.moduleUniforms = {}, this.moduleBindings = {};
			for (let [t, n] of Object.entries(e)) n && (this._addModule(n), n.name && t !== n.name && !this.options.disableWarnings && O.warn(`Module name: ${t} vs ${n.name}`)());
		}
		destroy() {}
		setProps(e) {
			e.bindings && Object.assign(this.directBindings, e.bindings);
			for (let t of Object.keys(e)) {
				if (t === "bindings") continue;
				let n = t, r = e[n] || {}, i = this.modules[n];
				if (!i) this.options.disableWarnings || O.warn(`Module ${t} not found`)();
				else {
					let e = this.moduleUniforms[n], t = this.moduleBindings[n], { uniforms: a, bindings: o } = Pw(i.getUniforms?.(r, e) || r, i.uniformTypes);
					this.moduleUniforms[n] = Iw(e, a, i.uniformTypes), this.moduleBindings[n] = {
						...t,
						...o
					};
				}
			}
		}
		getModules() {
			return Object.values(this.modules);
		}
		addModules(e) {
			let t = vm(e);
			for (let e of t) {
				let t = e.name;
				this.modules[t] || (this.modules[t] = e, this._addModule(e));
			}
		}
		getUniformValues() {
			return this.moduleUniforms;
		}
		getBindingValues() {
			let e = {};
			for (let t of Object.values(this.moduleBindings)) Object.assign(e, t);
			return Object.assign(e, this.directBindings), e;
		}
		getModuleBindingValues(e) {
			let t = this.moduleBindings[e];
			return t ? { ...t } : {};
		}
		getDebugTable() {
			let e = {};
			for (let [t, n] of Object.entries(this.moduleUniforms)) for (let [r, i] of Object.entries(n)) e[`${t}.${r}`] = {
				type: this.modules[t].uniformTypes?.[r],
				value: String(i)
			};
			return e;
		}
		_addModule(e) {
			let t = e.name;
			this.moduleUniforms[t] = Iw({}, e.defaultUniforms || {}, e.uniformTypes), this.moduleBindings[t] = {};
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/dynamic-buffer/dynamic-buffer.js
function Ww(e) {
	return typeof e == "object" && !!e && "buffer" in e;
}
function Gw(e) {
	return e instanceof Jw ? e.buffer : e;
}
function Kw(e) {
	return {
		buffer: Gw(e.buffer),
		offset: e.offset,
		size: e.size
	};
}
var qw, Jw, Yw = t((() => {
	I(), jC(), qw = j.DEBUG_DATA_MAX_LENGTH, Jw = class {
		device;
		id;
		ready;
		usage;
		props;
		isReady = !0;
		destroyed = !1;
		generation = 0;
		updateTimestamp;
		debugData = /* @__PURE__ */ new ArrayBuffer(0);
		_debugDataEnabled;
		_maxDebugDataByteLength;
		_ownsBuffer;
		_buffer;
		get buffer() {
			return this._buffer;
		}
		get byteLength() {
			return this._buffer.byteLength;
		}
		get [Symbol.toStringTag]() {
			return "DynamicBuffer";
		}
		toString() {
			return `DynamicBuffer:"${this.id}":${this.byteLength}B`;
		}
		toJSON() {
			return this.toString();
		}
		constructor(e, t) {
			let { debugData: n = !1, buffer: r, ownsBuffer: i = !0, ...a } = t;
			if (r && r.device !== e) throw Error("DynamicBuffer adopted buffers must belong to the supplied device");
			if (r && (a.byteLength !== void 0 || a.data !== void 0)) throw Error("DynamicBuffer cannot combine an adopted buffer with byteLength or data");
			let o = t.id || r?.id || kC("dynamic-buffer"), s = {
				...a,
				id: o,
				usage: a.usage ?? r?.usage,
				indexType: a.indexType ?? r?.indexType
			};
			(s.usage || 0) & j.INDEX && !s.indexType && (a.data instanceof Uint32Array ? s.indexType = "uint32" : a.data instanceof Uint16Array ? s.indexType = "uint16" : a.data instanceof Uint8Array && (s.indexType = "uint8")), delete s.data, delete s.byteOffset, this.device = e, this.id = o, this.props = s, this.usage = s.usage || 0, this._debugDataEnabled = !!n, this._maxDebugDataByteLength = typeof n == "object" && n.maxByteLength !== void 0 ? n.maxByteLength : qw, this._ownsBuffer = i, this._buffer = r ?? this.device.createBuffer({
				...a,
				id: o
			}), this.ready = Promise.resolve(this._buffer), this.updateTimestamp = this._buffer.updateTimestamp, this._resetDebugData(this._buffer.byteLength), a.data && this._writeDebugData(a.data, a.byteOffset || 0);
		}
		write(e, t = 0) {
			this._buffer.write(e, t), this._touch(), this._writeDebugData(e, t);
		}
		async mapAndWriteAsync(e, t = 0, n = this.byteLength - t) {
			let r = null;
			await this._buffer.mapAndWriteAsync(async (t, i) => {
				await e(t, i), r = new Uint8Array(t.slice(0, n));
			}, t, n), this._touch(), r && this._writeDebugData(r, t);
		}
		async readAsync(e = 0, t = this.byteLength - e) {
			let n = await this._buffer.readAsync(e, t);
			return this._writeDebugData(n, e) && this._touch(), n;
		}
		async mapAndReadAsync(e, t = 0, n = this.byteLength - t) {
			let r = null, i = await this._buffer.mapAndReadAsync(async (t, n) => (r = new Uint8Array(t.slice(0)), await e(t, n)), t, n);
			return r && this._writeDebugData(r, t) && this._touch(), i;
		}
		resize(e) {
			let { byteLength: t, preserveData: n = !1 } = e;
			if (t === this.byteLength) return !1;
			let r = Math.min(e.copyByteLength ?? Math.min(this.byteLength, t), this.byteLength, t), i = this._buffer, a = this.debugData.slice(0), { data: o, byteOffset: s, ...c } = this.props, l = this.device.createBuffer({
				...c,
				byteLength: t
			});
			return n && r > 0 && this._copyBufferContents(i, l, r), this._buffer = l, this._resetDebugData(t), n && a.byteLength > 0 && this._writeDebugData(a, 0), this._ownsBuffer && i.destroy(), this._ownsBuffer = !0, this.generation++, this._touch(), !0;
		}
		ensureSize(e, t) {
			return e <= this.byteLength ? !1 : this.resize({
				byteLength: e,
				preserveData: t?.preserveData
			});
		}
		getBinding(e) {
			return e?.offset === void 0 && e?.size === void 0 ? this._buffer : {
				buffer: this._buffer,
				offset: e?.offset,
				size: e?.size
			};
		}
		destroy() {
			this.destroyed || (this._ownsBuffer && this._buffer.destroy(), this.destroyed = !0, this.debugData = /* @__PURE__ */ new ArrayBuffer(0));
		}
		_copyBufferContents(e, t, n) {
			let r = this.device.type === "webgpu" ? Math.ceil(n / 4) * 4 : n, i = this.device.createCommandEncoder();
			i.copyBufferToBuffer({
				sourceBuffer: e,
				destinationBuffer: t,
				size: r
			}), this.device.submit(i.finish());
		}
		_touch() {
			this.updateTimestamp = this.device.incrementTimestamp();
		}
		_resetDebugData(e) {
			this.debugData = this._debugDataEnabled ? new ArrayBuffer(Math.min(e, this._maxDebugDataByteLength)) : /* @__PURE__ */ new ArrayBuffer(0);
		}
		_writeDebugData(e, t) {
			if (!this._debugDataEnabled || this.debugData.byteLength === 0 || t >= this.debugData.byteLength) return !1;
			let n = ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(e), r = new Uint8Array(this.debugData), i = Math.min(n.byteLength, r.byteLength - t);
			return r.set(n.subarray(0, i), t), i > 0;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/dynamic-texture/texture-binding-source.js
function Xw(e) {
	return typeof e == "object" && !!e && "resolveTextureBinding" in e && typeof e.resolveTextureBinding == "function";
}
function Zw(e) {
	return e?.type === "texture" || e?.type === "external-texture";
}
function Qw(e, t, n) {
	let r = Ir(e, t, { ignoreWarnings: !0 });
	return Zw(r) ? r : e.bindings.length === 0 && n?.fallbackGroup !== void 0 ? {
		type: "texture",
		name: t,
		group: n.fallbackGroup,
		location: 0
	} : null;
}
var $w = t((() => {
	I();
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/model/model.js
function eT(e, t) {
	return e.shaderLanguage !== void 0 && e.shaderLanguage !== t ? !1 : t === "glsl" ? "assembleGLSLShaderPair" in e && typeof e.assembleGLSLShaderPair == "function" : "assembleWGSLShader" in e && typeof e.assembleWGSLShader == "function";
}
function tT(e, t) {
	return !e || Object.keys(t).length === 0 ? e : {
		...e,
		attributes: e.attributes.map((e) => {
			let n = e.name.startsWith("_luma_") ? e.name.slice(6) : null;
			return n && t[n] ? {
				...e,
				name: n
			} : e;
		})
	};
}
function nT(e, t, n) {
	if (Xw(t)) {
		let r = Qw(n, e, { fallbackGroup: 0 });
		return r ? t.resolveTextureBinding(r) : null;
	}
	return t instanceof Jw ? t.buffer : Ww(t) ? Kw(t) : t;
}
function rT(e) {
	return e && !aT(e) ? e : null;
}
function iT(e) {
	return e && aT(e) ? e : void 0;
}
function aT(e) {
	return uT.includes(e);
}
function oT(e) {
	return {
		type: e.type,
		shaderLanguage: e.info.shadingLanguage,
		shaderLanguageVersion: e.info.shadingLanguageVersion,
		gpu: e.info.gpu,
		limits: e.limits,
		features: e.features
	};
}
var sT, cT, lT, uT, dT, fT = t((() => {
	I(), G(), iw(), ow(), gw(), vw(), bw(), Sw(), Mw(), jC(), Uw(), Yw(), $w(), sT = 2, cT = 1e4, lT = "render pipeline initialization failed", uT = [
		"stencil8",
		"depth16unorm",
		"depth24plus",
		"depth24plus-stencil8",
		"depth32float",
		"depth32float-stencil8"
	], dT = class e {
		static defaultProps = {
			...Er.defaultProps,
			source: void 0,
			vs: null,
			fs: null,
			id: "unnamed",
			handle: void 0,
			userData: {},
			defines: {},
			modules: [],
			plugins: [],
			geometry: null,
			indexBuffer: null,
			indexCount: void 0,
			firstVertex: 0,
			firstIndex: 0,
			attributes: {},
			constantAttributes: {},
			bindings: {},
			uniforms: {},
			varyings: [],
			isInstanced: void 0,
			instanceCount: 0,
			vertexCount: 0,
			shaderInputs: void 0,
			material: void 0,
			pipelineFactory: void 0,
			shaderFactory: void 0,
			transformFeedback: void 0,
			shaderAssembler: Zg.getDefaultShaderAssembler("glsl"),
			debugShaders: void 0,
			disableWarnings: void 0
		};
		device;
		id;
		source;
		vs;
		fs;
		pipelineFactory;
		shaderFactory;
		userData = {};
		parameters;
		topology;
		bufferLayout;
		isInstanced = void 0;
		instanceCount = 0;
		vertexCount;
		indexCount;
		firstVertex;
		firstIndex;
		indexBuffer = null;
		bufferAttributes = {};
		constantAttributes = {};
		bindings = {};
		vertexArray;
		transformFeedback = null;
		pipeline;
		shaderInputs;
		material = null;
		_uniformStore;
		_attributeInfos = {};
		_gpuGeometry = null;
		props;
		_dynamicIndexBufferSource = null;
		_dynamicAttributeBufferSources = {};
		_colorAttachmentFormats;
		_depthStencilAttachmentFormat;
		_pipelineNeedsUpdate = "newly created";
		_needsRedraw = "initializing";
		_drawBlockedReason = !1;
		_destroyed = !1;
		_vertexCountSet = !1;
		_lastDrawTimestamp = -1;
		_bindingTable = [];
		get [Symbol.toStringTag]() {
			return "Model";
		}
		toString() {
			return `Model(${this.id})`;
		}
		constructor(t, n) {
			let r = e.defaultProps.shaderAssembler, i = n.vertexCount !== void 0;
			this.props = {
				...e.defaultProps,
				...n,
				shaderAssembler: n.shaderAssembler ?? (eT(r, t.info.shadingLanguage) ? r : Zg.getDefaultShaderAssembler(t.info.shadingLanguage))
			}, this._vertexCountSet = i, n = this.props, this.id = n.id || kC("model"), this.device = t, Object.assign(this.userData, n.userData), this.material = n.material || null;
			let a = oT(t), o = xm(this.props.plugins, a.shaderLanguage), s = Sm(this.props.modules, o.modules), c = Object.fromEntries(s.map((e) => [e.name, e])), l = n.shaderInputs || new Hw(c, { disableWarnings: this.props.disableWarnings });
			n.shaderInputs && o.modules.length > 0 && l.addModules(o.modules), this.setShaderInputs(l);
			let u = Dw(this.props.modules, l.getModules()), d = {
				...o.defines,
				...this.props.defines
			};
			if (this.device.type === "webgl" && (this.props._uniformBlockLayouts = Ew(u)), this.props.shaderLayout = Cw(this.props.shaderLayout, u) || null, this.device.type === "webgpu" && this.props.source) {
				let e = this.props.shaderAssembler;
				Wn(eT(e, "wgsl"));
				let { source: n, getUniforms: r, bindingTable: i, shaderLayout: s } = e.assembleWGSLShader({
					platformInfo: a,
					...this.props,
					modules: u,
					defines: d,
					pluginInjections: o.injections,
					pluginVertexInputs: o.vertexInputs,
					pluginVaryings: o.varyings
				});
				this.source = n, this._getModuleUniforms = r, this._bindingTable = i;
				let c = tT(s ?? t.getShaderLayout?.(this.source), o.vertexInputs), l = ww(this.props.shaderLayout, c, Object.keys(o.vertexInputs));
				this.props.shaderLayout = Cw(l || null, u) || null;
			} else {
				let e = this.props.shaderAssembler;
				Wn(eT(e, "glsl"));
				let { vs: t, fs: n, getUniforms: r } = e.assembleGLSLShaderPair({
					platformInfo: a,
					...this.props,
					modules: u,
					defines: d,
					pluginInjections: o.injections,
					pluginVertexInputs: o.vertexInputs,
					pluginVaryings: o.varyings
				});
				this.vs = t, this.fs = n, this._getModuleUniforms = r, this._bindingTable = [];
			}
			this.vertexCount = this.props.vertexCount, this.indexCount = this.props.indexCount, this.firstVertex = this.props.firstVertex, this.firstIndex = this.props.firstIndex, this.instanceCount = this.props.instanceCount, this.topology = this.props.topology, this.bufferLayout = this.props.bufferLayout, this.parameters = this.props.parameters, this._colorAttachmentFormats = this.props.colorAttachmentFormats, this._depthStencilAttachmentFormat = this.props.depthStencilAttachmentFormat, n.geometry && this.setGeometry(n.geometry), this.pipelineFactory = n.pipelineFactory || Mr.getDefaultPipelineFactory(this.device), this.shaderFactory = n.shaderFactory || Pr.getDefaultShaderFactory(this.device), this.pipeline = this._updatePipeline(), this.vertexArray = t.createVertexArray({
				shaderLayout: this.pipeline.shaderLayout,
				bufferLayout: this.pipeline.bufferLayout
			}), this._gpuGeometry && this._setGeometryAttributes(this._gpuGeometry), "isInstanced" in n && (this.isInstanced = n.isInstanced), n.instanceCount && this.setInstanceCount(n.instanceCount), n.vertexCount && this.setVertexCount(n.vertexCount), n.indexBuffer && this.setIndexBuffer(n.indexBuffer), n.attributes && this.setAttributes(n.attributes), n.constantAttributes && this.setConstantAttributes(n.constantAttributes), n.bindings && this.setBindings(n.bindings), n.transformFeedback && (this.transformFeedback = n.transformFeedback);
		}
		destroy() {
			this._destroyed ||= (this.pipelineFactory.release(this.pipeline), this.shaderFactory.release(this.pipeline.vs), this.pipeline.fs && this.pipeline.fs !== this.pipeline.vs && this.shaderFactory.release(this.pipeline.fs), this._uniformStore.destroy(), this._gpuGeometry?.destroy(), !0);
		}
		needsRedraw() {
			this._getBindingsUpdateTimestamp() > this._lastDrawTimestamp && this.setNeedsRedraw("contents of bound textures or buffers updated");
			let e = this._needsRedraw;
			return this._needsRedraw = !1, e;
		}
		setNeedsRedraw(e) {
			this._needsRedraw ||= e;
		}
		getBindingDebugTable() {
			return this._bindingTable;
		}
		predraw(e) {
			this._syncDynamicBuffers(), this.updateShaderInputs(e), this.material?.updateShaderInputs(e), this.pipeline = this._updatePipeline();
		}
		draw(e) {
			if (this._drawBlockedReason && !this._pipelineNeedsUpdate) return O.info(sT, `>>> DRAWING ABORTED ${this.id}: ${this._drawBlockedReason}`)(), !1;
			let t = this._areBindingsLoading();
			if (t) return O.info(sT, `>>> DRAWING ABORTED ${this.id}: ${t} not loaded`)(), !1;
			this._syncAttachmentFormats(e);
			try {
				e.pushDebugGroup(`${this}.predraw(${e})`), this.device.type === "webgpu" ? (this.updateShaderInputs(), this.material?.updateShaderInputs(), this._syncDynamicBuffers(), this.pipeline = this._updatePipeline()) : this.predraw(this.device.commandEncoder);
			} finally {
				e.popDebugGroup();
			}
			let n, r = this.pipeline.isErrored;
			try {
				if (e.pushDebugGroup(`${this}.draw(${e})`), this._logDrawCallStart(), this.pipeline = this._updatePipeline(), r = this.pipeline.isErrored, r) O.info(sT, `>>> DRAWING ABORTED ${this.id}: ${lT}`)(), n = !1;
				else {
					let t = this.vertexArray.getDrawValidationError();
					if (t) O.info(sT, `>>> DRAWING ABORTED ${this.id}: ${t}`)(), this._drawBlockedReason = t, n = !1;
					else {
						let t = this._getCurrentShaderLayout(), r = this._getBindings(t), i = this._getBindGroups(t, r), { indexBuffer: a } = this.vertexArray, o = a ? this.indexCount ?? (this._vertexCountSet ? this.vertexCount : a.byteLength / (a.indexType === "uint32" ? 4 : 2)) : void 0;
						e.setPipeline(this.pipeline), e.setBindings(i, { _bindGroupCacheKeys: this._getBindGroupCacheKeys() }), e.setVertexArray(this.vertexArray), n = this.isInstanced === !0 && this.instanceCount === 0 || e.draw({
							isInstanced: this.isInstanced,
							vertexCount: this.vertexCount,
							instanceCount: this.isInstanced ? this.instanceCount : void 0,
							indexCount: o,
							firstVertex: this.firstVertex,
							firstIndex: this.firstIndex,
							transformFeedback: this.transformFeedback || void 0,
							uniforms: this.props.uniforms,
							parameters: this.parameters,
							topology: this.topology
						});
					}
				}
			} finally {
				e.popDebugGroup(), this._logDrawCallEnd();
			}
			return this._logFramebuffer(e), n ? (this._lastDrawTimestamp = this.device.timestamp, this._needsRedraw = !1) : r ? (this._needsRedraw = lT, this._drawBlockedReason = lT) : this._needsRedraw = this._drawBlockedReason ? this._drawBlockedReason : "waiting for resource initialization", n;
		}
		setGeometry(e) {
			this._gpuGeometry?.destroy();
			let t = e && ew(this.device, e);
			if (t) {
				this.setTopology(t.topology || "triangle-list");
				let e = new yw(this.bufferLayout);
				this.bufferLayout = e.mergeBufferLayouts(t.bufferLayout, this.bufferLayout), this.vertexArray && this._setGeometryAttributes(t);
			}
			this._gpuGeometry = t;
		}
		setTopology(e) {
			e !== this.topology && (this.topology = e, this._setPipelineNeedsUpdate("topology"));
		}
		setBufferLayout(e) {
			let t = new yw(this.bufferLayout), n = this._gpuGeometry ? t.mergeBufferLayouts(e, this._gpuGeometry.bufferLayout) : e;
			_w(n, this.bufferLayout, -1) || (this.bufferLayout = n, this._setPipelineNeedsUpdate("bufferLayout"), this.pipeline = this._updatePipeline(), this.vertexArray = this.device.createVertexArray({
				shaderLayout: this.pipeline.shaderLayout,
				bufferLayout: this.pipeline.bufferLayout
			}), this._gpuGeometry && this._setGeometryAttributes(this._gpuGeometry));
		}
		setParameters(e) {
			_w(e, this.parameters, 2) || (this.parameters = e, this._setPipelineNeedsUpdate("parameters"));
		}
		setInstanceCount(e) {
			this.instanceCount = e, this.isInstanced === void 0 && e > 0 && (this.isInstanced = !0), this.setNeedsRedraw("instanceCount");
		}
		setVertexCount(e) {
			this.vertexCount = e, this._vertexCountSet = !0, this.setNeedsRedraw("vertexCount");
		}
		setIndexCount(e) {
			this.indexCount = e, this.setNeedsRedraw("indexCount");
		}
		setDrawOffsets({ firstVertex: e, firstIndex: t }) {
			this.firstVertex = e, this.firstIndex = t, this.setNeedsRedraw("drawOffsets");
		}
		setShaderInputs(e) {
			this.shaderInputs = e, this._uniformStore = new Ki(this.device, this.shaderInputs.modules);
			for (let [e, t] of Object.entries(this.shaderInputs.modules)) if (Tw(t) && !this.material?.ownsModule(e)) {
				let t = this._uniformStore.getManagedUniformBuffer(e);
				this.bindings[`${e}Uniforms`] = t;
			}
			this.setNeedsRedraw("shaderInputs");
		}
		setMaterial(e) {
			this.material = e, this.setNeedsRedraw("material");
		}
		updateShaderInputs(e) {
			this._uniformStore.setUniforms(this.shaderInputs.getUniformValues(), e), this.setBindings(this._getNonMaterialBindings(this.shaderInputs.getBindingValues())), this.setNeedsRedraw("shaderInputs");
		}
		setBindings(e) {
			Object.assign(this.bindings, e), this.setNeedsRedraw("bindings");
		}
		setTransformFeedback(e) {
			this.transformFeedback = e, this.setNeedsRedraw("transformFeedback");
		}
		setIndexBuffer(e) {
			let t = e instanceof Jw ? e.buffer : e;
			this.indexBuffer = t, this._dynamicIndexBufferSource = e instanceof Jw ? {
				source: e,
				generation: e.generation
			} : null, this.vertexArray.setIndexBuffer(t), this.setNeedsRedraw("indexBuffer");
		}
		setAttributes(e, t) {
			this._drawBlockedReason = !1;
			let n = t?.disableWarnings ?? this.props.disableWarnings;
			e.indices && O.warn(`Model:${this.id} setAttributes() - indexBuffer should be set using setIndexBuffer()`)(), this.bufferLayout = xw(this.pipeline.shaderLayout, this.bufferLayout);
			let r = new yw(this.bufferLayout);
			for (let [t, i] of Object.entries(e)) {
				let e = i instanceof Jw ? i.buffer : i, a = r.getBufferLayout(t);
				if (!a) {
					n || O.warn(`Model(${this.id}): Missing layout for buffer "${t}".`)();
					continue;
				}
				let o = r.getAttributeNamesForBuffer(a), s = !1;
				for (let t of o) {
					let r = this._attributeInfos[t];
					if (r) {
						let t = this.device.type === "webgpu" ? this.vertexArray.getBufferSlot(r.bufferName) : r.location;
						if (t === null) {
							n || O.warn(`Model(${this.id}): Missing vertex array slot for buffer "${r.bufferName}".`)();
							continue;
						}
						this.vertexArray.setBuffer(t, e), i instanceof Jw ? this._dynamicAttributeBufferSources[t] = {
							source: i,
							generation: i.generation
						} : delete this._dynamicAttributeBufferSources[t], s = !0;
					}
				}
				!s && !n && O.warn(`Model(${this.id}): Ignoring buffer "${e.id}" for unknown attribute "${t}"`)();
			}
			this.setNeedsRedraw("attributes");
		}
		setConstantAttributes(e, t) {
			for (let [n, r] of Object.entries(e)) {
				let e = this._attributeInfos[n];
				e ? this.vertexArray.setConstantWebGL(e.location, r) : (t?.disableWarnings ?? this.props.disableWarnings) || O.warn(`Model "${this.id}: Ignoring constant supplied for unknown attribute "${n}"`)();
			}
			this.setNeedsRedraw("constants");
		}
		_areBindingsLoading() {
			for (let e of Object.values(this.bindings)) if (Xw(e) && !e.isReady) return e.id;
			for (let e of Object.values(this.material?.bindings || {})) if (Xw(e) && !e.isReady) return e.id;
			return !1;
		}
		_getBindings(e = this._getCurrentShaderLayout()) {
			let t = {};
			for (let [n, r] of Object.entries(this.bindings)) {
				let i = nT(n, r, e);
				i && (t[n] = i);
			}
			return t;
		}
		_getBindGroups(e = this._getCurrentShaderLayout(), t = this._getBindings(e)) {
			let n = e.bindings.length ? Lr(e, t) : { 0: t };
			if (!this.material) return n;
			for (let [t, r] of Object.entries(this.material.getBindingsByGroup(e))) {
				let e = Number(t);
				n[e] = {
					...n[e] || {},
					...r
				};
			}
			return n;
		}
		_getBindGroupCacheKeys() {
			let e = this.material?.getBindGroupCacheKey(3);
			return e ? { 3: e } : {};
		}
		_getBindingsUpdateTimestamp() {
			let e = 0;
			this._dynamicIndexBufferSource && (e = Math.max(e, this._dynamicIndexBufferSource.source.updateTimestamp));
			for (let t of Object.values(this._dynamicAttributeBufferSources)) e = Math.max(e, t.source.updateTimestamp);
			for (let t of Object.values(this.bindings)) t instanceof lr ? e = Math.max(e, t.texture.updateTimestamp) : t instanceof j || t instanceof F || t instanceof dr || t instanceof Jw ? e = Math.max(e, t.updateTimestamp) : Xw(t) ? e = t.isReady ? Math.max(e, t.updateTimestamp) : Infinity : Ww(t) && (e = Math.max(e, (t.buffer instanceof Jw, t.buffer.updateTimestamp)));
			return Math.max(e, this.material?.getBindingsUpdateTimestamp() || 0);
		}
		_setGeometryAttributes(e) {
			let t = { ...e.attributes };
			for (let [e] of Object.entries(t)) !this.pipeline.shaderLayout.attributes.find((t) => t.name === e) && e !== "positions" && delete t[e];
			this.vertexCount = e.vertexCount, this._vertexCountSet = !0, this.setIndexBuffer(e.indices || null), this.setAttributes(e.attributes, { disableWarnings: !0 }), this.setAttributes(t, { disableWarnings: this.props.disableWarnings }), this.setNeedsRedraw("geometry attributes");
		}
		_setPipelineNeedsUpdate(e) {
			this._pipelineNeedsUpdate ||= e, this._drawBlockedReason = !1, this.setNeedsRedraw(e);
		}
		_updatePipeline() {
			if (this._pipelineNeedsUpdate) {
				let e = null, t = null;
				this.pipeline && (O.log(1, `Model ${this.id}: Recreating pipeline because "${this._pipelineNeedsUpdate}".`)(), e = this.pipeline.vs, t = this.pipeline.fs), this._pipelineNeedsUpdate = !1;
				let n = this.shaderFactory.createShader({
					id: `${this.id}-vertex`,
					stage: "vertex",
					source: this.source || this.vs,
					debugShaders: this.props.debugShaders
				}), r = null;
				this.source ? r = n : this.fs && (r = this.shaderFactory.createShader({
					id: `${this.id}-fragment`,
					stage: "fragment",
					source: this.source || this.fs,
					debugShaders: this.props.debugShaders
				})), this.pipeline = this.pipelineFactory.createRenderPipeline({
					...this.props,
					bindings: void 0,
					bufferLayout: this.bufferLayout,
					colorAttachmentFormats: this._colorAttachmentFormats,
					depthStencilAttachmentFormat: this._depthStencilAttachmentFormat,
					topology: this.topology,
					parameters: this.parameters,
					bindGroups: void 0,
					vs: n,
					fs: r
				}), this._attributeInfos = ta(this.pipeline.shaderLayout, this.bufferLayout), e && this.shaderFactory.release(e), t && t !== e && this.shaderFactory.release(t);
			}
			return this.pipeline;
		}
		_lastLogTime = 0;
		_logOpen = !1;
		_logDrawCallStart() {
			let e = O.level > 3 ? 0 : cT;
			O.level < 2 || Date.now() - this._lastLogTime < e || (this._lastLogTime = Date.now(), this._logOpen = !0, O.group(sT, `>>> DRAWING MODEL ${this.id}`, { collapsed: O.level <= 2 })());
		}
		_logDrawCallEnd() {
			if (this._logOpen) {
				let e = aw(this.pipeline.shaderLayout, this.id);
				O.table(sT, e)();
				let t = this.shaderInputs.getDebugTable();
				O.table(sT, t)();
				let n = this._getAttributeDebugTable();
				O.table(sT, this._attributeInfos)(), O.table(sT, n)(), O.groupEnd(sT)(), this._logOpen = !1;
			}
		}
		_drawCount = 0;
		_logFramebuffer(e) {
			let t = this.device.props.debugFramebuffers;
			if (this._drawCount++, !t) return;
			let n = e.props.framebuffer;
			sw(e, n, {
				id: n?.id || `${this.id}-framebuffer`,
				minimap: !0
			});
		}
		_getAttributeDebugTable() {
			let e = {};
			for (let [t, n] of Object.entries(this._attributeInfos)) {
				let r = this.vertexArray.attributes[n.location];
				e[n.location] = {
					name: t,
					type: n.shaderType,
					values: r ? this._getBufferOrConstantValues(r, n.bufferDataType) : "null"
				};
			}
			if (this.vertexArray.indexBuffer) {
				let { indexBuffer: t } = this.vertexArray, n = t.indexType === "uint32" ? new Uint32Array(t.debugData) : new Uint16Array(t.debugData);
				e.indices = {
					name: "indices",
					type: t.indexType,
					values: n.toString()
				};
			}
			return e;
		}
		_getBufferOrConstantValues(e, t) {
			let n = Nt.getTypedArrayConstructor(t);
			return (e instanceof j ? new n(e.debugData) : e).toString();
		}
		_getNonMaterialBindings(e) {
			if (!this.material) return e;
			let t = {};
			for (let [n, r] of Object.entries(e)) this.material.ownsBinding(n) || (t[n] = r);
			return t;
		}
		_getCurrentShaderLayout() {
			return this.pipeline?.shaderLayout || this.props.shaderLayout || { bindings: [] };
		}
		_syncDynamicBuffers() {
			if (this._dynamicIndexBufferSource && this._dynamicIndexBufferSource.generation !== this._dynamicIndexBufferSource.source.generation) {
				let e = this._dynamicIndexBufferSource.source.buffer;
				this.indexBuffer = e, this.vertexArray.setIndexBuffer(e), this._dynamicIndexBufferSource.generation = this._dynamicIndexBufferSource.source.generation, this.setNeedsRedraw("dynamic index buffer");
			}
			for (let [e, t] of Object.entries(this._dynamicAttributeBufferSources)) t.generation !== t.source.generation && (this.vertexArray.setBuffer(Number(e), t.source.buffer), t.generation = t.source.generation, this.setNeedsRedraw("dynamic attribute buffer"));
		}
		_syncAttachmentFormats(e) {
			if (this.device.type !== "webgpu") return;
			let t = e.framebuffer || e.props.framebuffer, n = e.props, r = n.colorAttachmentFormats ?? t?.colorAttachments?.map((e) => rT(e?.texture?.format)), i = n.depthStencilAttachmentFormat === !1 ? void 0 : n.depthStencilAttachmentFormat ?? iT(t?.depthStencilAttachment?.texture?.format);
			(!_w(this._colorAttachmentFormats, r, 1) || this._depthStencilAttachmentFormat !== i) && (this._colorAttachmentFormats = r, this._depthStencilAttachmentFormat = i, this._setPipelineNeedsUpdate("attachment formats"));
		}
	};
})), pT, mT, hT, gT = t((() => {
	I(), G(), fT(), pT = 35980, mT = 35981, hT = class e {
		device;
		model;
		transformFeedback;
		static defaultProps = {
			...dT.defaultProps,
			feedbackBufferMode: "separate",
			outputs: void 0,
			feedbackBuffers: void 0
		};
		static isSupported(e) {
			return e?.info?.type === "webgl";
		}
		constructor(t, n = e.defaultProps) {
			if (!e.isSupported(t)) throw Error("BufferTransform not yet implemented on WebGPU");
			this.device = t, this.model = new dT(this.device, {
				id: n.id || "buffer-transform-model",
				fs: n.fs || t_(),
				topology: n.topology || "point-list",
				varyings: n.outputs || n.varyings,
				...n,
				bufferMode: n.bufferMode || (n.feedbackBufferMode === "interleaved" ? pT : mT)
			}), this.transformFeedback = this.device.createTransformFeedback({
				layout: this.model.pipeline.shaderLayout,
				buffers: n.feedbackBuffers
			}), this.model.setTransformFeedback(this.transformFeedback);
		}
		destroy() {
			this.model && this.model.destroy();
		}
		delete() {
			this.destroy();
		}
		run(e) {
			e?.inputBuffers && this.model.setAttributes(e.inputBuffers), e?.outputBuffers && this.transformFeedback.setBuffers(e.outputBuffers);
			let t = this.device.beginRenderPass({
				discard: !0,
				...e
			});
			this.model.draw(t), t.end();
		}
		getBuffer(e) {
			return this.transformFeedback.getBuffer(e);
		}
		readAsync(e) {
			let t = this.getBuffer(e);
			if (!t) throw Error("BufferTransform#getBuffer");
			if (t instanceof j) return t.readAsync();
			let { buffer: n, byteOffset: r = 0, byteLength: i = n.byteLength } = t;
			return n.readAsync(r, i);
		}
	};
})), _T, vT, yT = t((() => {
	G(), fT(), jC(), _T = "transform_output", vT = class {
		device;
		model;
		sampler;
		currentIndex = 0;
		samplerTextureMap = null;
		bindings = [];
		resources = {};
		constructor(e, t) {
			this.device = e, this.sampler = e.createSampler({
				addressModeU: "clamp-to-edge",
				addressModeV: "clamp-to-edge",
				minFilter: "nearest",
				magFilter: "nearest",
				mipmapFilter: "nearest"
			}), this.model = new dT(this.device, {
				id: t.id || kC("texture-transform-model"),
				fs: t.fs || t_({
					input: t.targetTextureVarying,
					inputChannels: t.targetTextureChannels,
					output: _T
				}),
				vertexCount: t.vertexCount,
				...t
			}), this._initialize(t), Object.seal(this);
		}
		destroy() {
			this.model.destroy();
			for (let e of this.bindings) e.framebuffer?.destroy();
		}
		delete() {
			this.destroy();
		}
		run(e) {
			let { framebuffer: t } = this.bindings[this.currentIndex], n = this.device.beginRenderPass({
				framebuffer: t,
				...e
			});
			this.model.draw(n), n.end(), this.device.submit();
		}
		getTargetTexture() {
			let { targetTexture: e } = this.bindings[this.currentIndex];
			return e;
		}
		getFramebuffer() {
			return this.bindings[this.currentIndex].framebuffer;
		}
		_initialize(e) {
			this._updateBindings(e);
		}
		_updateBindings(e) {
			this.bindings[this.currentIndex] = this._updateBinding(this.bindings[this.currentIndex], e);
		}
		_updateBinding(e, { sourceBuffers: t, sourceTextures: n, targetTexture: r }) {
			if (e ||= {
				sourceBuffers: {},
				sourceTextures: {},
				targetTexture: null
			}, Object.assign(e.sourceTextures, n), Object.assign(e.sourceBuffers, t), r) {
				e.targetTexture = r;
				let { width: t, height: n } = r;
				e.framebuffer && e.framebuffer.destroy(), e.framebuffer = this.device.createFramebuffer({
					id: "transform-framebuffer",
					width: t,
					height: n,
					colorAttachments: [r]
				}), e.framebuffer.resize({
					width: t,
					height: n
				});
			}
			return e;
		}
		_setSourceTextureParameters() {
			let e = this.currentIndex, { sourceTextures: t } = this.bindings[e];
			for (let e in t) t[e].sampler = this.sampler;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/engine/dist/compute/computation.js
function bT(e) {
	return {
		type: e.type,
		shaderLanguage: e.info.shadingLanguage,
		shaderLanguageVersion: e.info.shadingLanguageVersion,
		gpu: e.info.gpu,
		limits: e.limits,
		features: e.features
	};
}
var xT, ST, CT, wT = t((() => {
	I(), G(), df(), Uw(), Mw(), jC(), xT = 2, ST = 1e4, CT = class e {
		static defaultProps = {
			...Ar.defaultProps,
			id: "unnamed",
			handle: void 0,
			userData: {},
			source: "",
			modules: [],
			defines: {},
			plugins: [],
			bindings: void 0,
			shaderInputs: void 0,
			pipelineFactory: void 0,
			shaderFactory: void 0,
			shaderAssembler: Zg.getDefaultShaderAssembler("wgsl"),
			debugShaders: void 0
		};
		device;
		id;
		pipelineFactory;
		shaderFactory;
		userData = {};
		bindings = {};
		pipeline;
		source;
		shader;
		shaderInputs;
		_uniformStore;
		_pipelineNeedsUpdate = "newly created";
		_getModuleUniforms;
		props;
		_destroyed = !1;
		constructor(t, n) {
			if (t.type !== "webgpu") throw Error("Computation is only supported in WebGPU");
			this.props = {
				...e.defaultProps,
				...n
			}, n = this.props, this.id = n.id || kC("model"), this.device = t, Object.assign(this.userData, n.userData);
			let r = bT(t), i = xm(this.props.plugins, r.shaderLanguage);
			if (Object.keys(i.vertexInputs).length > 0 || Object.keys(i.varyings).length > 0) throw Error("Computation does not support ShaderPlugin vertex inputs or varyings");
			let a = Sm(this.props.modules, i.modules), o = Object.fromEntries(a.map((e) => [e.name, e]));
			this.shaderInputs = n.shaderInputs || new Hw(o), n.shaderInputs && i.modules.length > 0 && this.shaderInputs.addModules(i.modules), this.setShaderInputs(this.shaderInputs);
			let s = Dw(this.props.modules, this.shaderInputs?.getModules()), c = {
				...i.defines,
				...this.props.defines
			};
			this.props.shaderLayout = Cw(this.props.shaderLayout, s) || null, this.pipelineFactory = n.pipelineFactory || Mr.getDefaultPipelineFactory(this.device), this.shaderFactory = n.shaderFactory || Pr.getDefaultShaderFactory(this.device);
			let l = this.props.shaderAssembler;
			Wn(l instanceof $g);
			let { source: u, getUniforms: d, shaderLayout: f } = l.assembleWGSLShader({
				platformInfo: r,
				...this.props,
				modules: s,
				defines: c,
				scanVertexAttributes: !1,
				pluginInjections: i.injections
			});
			this.source = u, this._getModuleUniforms = d;
			let p = f ?? t.getShaderLayout?.(this.source, { scanVertexAttributes: !1 });
			this.props.shaderLayout = Cw(this.props.shaderLayout || p || null, s) || null, this.pipeline = this._updatePipeline(), n.bindings && this.setBindings(n.bindings);
		}
		destroy() {
			this._destroyed ||= (this.pipelineFactory.release(this.pipeline), this.shaderFactory.release(this.shader), this._uniformStore.destroy(), !0);
		}
		predraw(e) {
			this.updateShaderInputs(e);
		}
		dispatch(e, t, n, r) {
			try {
				this._logDrawCallStart(), this._setPipeline(e), e.dispatch(t, n, r);
			} finally {
				this._logDrawCallEnd();
			}
		}
		dispatchIndirect(e, t, n = 0) {
			try {
				this._logDrawCallStart(), this._setPipeline(e), e.dispatchIndirect(t, n);
			} finally {
				this._logDrawCallEnd();
			}
		}
		_setPipeline(e) {
			this.pipeline = this._updatePipeline(), this.pipeline.setBindings(this.bindings), e.setPipeline(this.pipeline), e.setBindings({});
		}
		setVertexCount(e) {}
		setInstanceCount(e) {}
		setShaderInputs(e) {
			this.shaderInputs = e, this._uniformStore = new Ki(this.device, this.shaderInputs.modules);
			for (let [e, t] of Object.entries(this.shaderInputs.modules)) if (Tw(t)) {
				let t = this._uniformStore.getManagedUniformBuffer(e);
				this.bindings[`${e}Uniforms`] = t;
			}
		}
		setShaderModuleProps(e) {
			let t = this._getModuleUniforms(e), n = Object.keys(t).filter((e) => {
				let n = t[e];
				return !lf(n) && typeof n != "number" && typeof n != "boolean";
			}), r = {};
			for (let e of n) r[e] = t[e], delete t[e];
		}
		updateShaderInputs(e) {
			this._uniformStore.setUniforms(this.shaderInputs.getUniformValues(), e);
		}
		setBindings(e) {
			Object.assign(this.bindings, e);
		}
		_setPipelineNeedsUpdate(e) {
			this._pipelineNeedsUpdate = this._pipelineNeedsUpdate || e;
		}
		_updatePipeline() {
			if (this._pipelineNeedsUpdate) {
				let e = null;
				this.pipeline && (O.log(1, `Model ${this.id}: Recreating pipeline because "${this._pipelineNeedsUpdate}".`)(), e = this.shader), this._pipelineNeedsUpdate = !1, this.shader = this.shaderFactory.createShader({
					id: `${this.id}-fragment`,
					stage: "compute",
					source: this.source,
					debugShaders: this.props.debugShaders
				}), this.pipeline = this.pipelineFactory.createComputePipeline({
					...this.props,
					shader: this.shader
				}), e && this.shaderFactory.release(e);
			}
			return this.pipeline;
		}
		_lastLogTime = 0;
		_logOpen = !1;
		_logDrawCallStart() {
			let e = O.level > 3 ? 0 : ST;
			O.level < 2 || Date.now() - this._lastLogTime < e || (this._lastLogTime = Date.now(), this._logOpen = !0, O.group(xT, `>>> DRAWING MODEL ${this.id}`, { collapsed: O.level <= 2 })());
		}
		_logDrawCallEnd() {
			if (this._logOpen) {
				let e = this.shaderInputs.getDebugTable();
				O.table(xT, e)(), O.groupEnd(xT)(), this._logOpen = !1;
			}
		}
		_drawCount = 0;
		_getBufferOrConstantValues(e, t) {
			let n = Nt.getTypedArrayConstructor(t);
			return (e instanceof j ? new n(e.debugData) : e).toString();
		}
	};
})), Y = t((() => {
	I(), FC(), VC(), W(), GC(), $C(), fT(), Yw(), $w(), Uw(), Mw(), jC(), gT(), yT(), iw(), G(), wT();
})), TT = {
	blendColorOperation: "add",
	blendColorSrcFactor: "one",
	blendColorDstFactor: "zero",
	blendAlphaOperation: "add",
	blendAlphaSrcFactor: "constant",
	blendAlphaDstFactor: "zero"
}, ET = class extends ZS {
	constructor() {
		super(...arguments), this._colorEncoderState = null;
	}
	render(e) {
		return "pickingFBO" in e ? this._drawPickingBuffer(e) : {
			decodePickingColor: null,
			stats: super._render(e)
		};
	}
	_drawPickingBuffer({ layers: e, layerFilter: t, views: n, viewports: r, onViewportActive: i, pickingFBO: a, deviceRect: { x: o, y: s, width: c, height: l }, cullRect: u, effects: d, pass: f = "picking", pickZ: p, canvasContext: m, shaderModuleProps: h, clearColor: g }) {
		this.pickZ = p;
		let _ = this._resetColorEncoder(p), v = [
			o,
			s,
			c,
			l
		], y = super._render({
			target: a,
			layers: e,
			layerFilter: t,
			views: n,
			viewports: r,
			onViewportActive: i,
			cullRect: u,
			effects: d?.filter((e) => e.useInPicking),
			pass: f,
			canvasContext: m,
			isPicking: !0,
			shaderModuleProps: h,
			clearColor: g ?? [
				0,
				0,
				0,
				0
			],
			colorMask: 15,
			scissorRect: v
		});
		return this._colorEncoderState = null, {
			decodePickingColor: _ && OT.bind(null, _),
			stats: y
		};
	}
	shouldDrawLayer(e) {
		let { pickable: t, operation: n } = e.props;
		return t && n.includes("draw") || n.includes("terrain") || n.includes("mask");
	}
	getShaderModuleProps(e, t, n) {
		return {
			picking: {
				isActive: 1,
				isAttribute: this.pickZ,
				disabledPickingIndices: e.internalState?.disabledPickingIndices
			},
			lighting: { enabled: !1 }
		};
	}
	getLayerParameters(e, t, n) {
		let r = { ...e.props.parameters }, { pickable: i, operation: a } = e.props;
		return this._colorEncoderState ? i && a.includes("draw") ? (Object.assign(r, TT), r.blend = !0, this.device.type === "webgpu" ? r.blendConstant = DT(this._colorEncoderState, e, n) : r.blendColor = DT(this._colorEncoderState, e, n), a.includes("terrain") && e.state?._hasPickingCover && (r.blendAlphaSrcFactor = "one")) : a.includes("terrain") && (r.blend = !1) : r.blend = !1, r;
	}
	_resetColorEncoder(e) {
		return this._colorEncoderState = e ? null : {
			byLayer: /* @__PURE__ */ new Map(),
			byAlpha: []
		}, this._colorEncoderState;
	}
};
function DT(e, t, n) {
	let { byLayer: r, byAlpha: i } = e, a, o = r.get(t);
	return o ? (o.viewports.push(n), a = o.a) : (a = r.size + 1, a <= 255 ? (o = {
		a,
		layer: t,
		viewports: [n]
	}, r.set(t, o), i[a] = o) : (B.warn("Too many pickable layers, only picking the first 255")(), a = 0)), [
		0,
		0,
		0,
		a / 255
	];
}
function OT(e, t) {
	let n = e.byAlpha[t[3]];
	return n && {
		pickedLayer: n.layer,
		pickedViewports: n.viewports,
		pickedObjectIndex: n.layer.decodePickingColor(t)
	};
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lifecycle/constants.js
var kT = {
	NO_STATE: "Awaiting state",
	MATCHED: "Matched. State transferred from previous layer",
	INITIALIZED: "Initialized",
	AWAITING_GC: "Discarded. Awaiting garbage collection",
	AWAITING_FINALIZATION: "No longer matched. Awaiting garbage collection",
	FINALIZED: "Finalized! Awaiting garbage collection"
}, AT = Symbol.for("component"), jT = Symbol.for("propTypes"), MT = Symbol.for("deprecatedProps"), NT = Symbol.for("asyncPropDefaults"), PT = Symbol.for("asyncPropOriginal"), FT = Symbol.for("asyncPropResolved");
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/flatten.js
function IT(e, t = () => !0) {
	return Array.isArray(e) ? LT(e, t, []) : t(e) ? [e] : [];
}
function LT(e, t, n) {
	let r = -1;
	for (; ++r < e.length;) {
		let i = e[r];
		Array.isArray(i) ? LT(i, t, n) : t(i) && n.push(i);
	}
	return n;
}
function RT({ target: e, source: t, start: n = 0, count: r = 1 }) {
	let i = t.length, a = r * i, o = 0;
	for (let r = n; o < i; o++) e[r++] = t[o];
	for (; o < a;) o < a - o ? (e.copyWithin(n + o, n, n + o), o *= 2) : (e.copyWithin(n + o, n, n + a - o), o = a);
	return e;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/resource/resource.js
var zT = class {
	constructor(e, t, n) {
		this._loadCount = 0, this._subscribers = /* @__PURE__ */ new Set(), this.id = e, this.context = n, this.setData(t);
	}
	subscribe(e) {
		this._subscribers.add(e);
	}
	unsubscribe(e) {
		this._subscribers.delete(e);
	}
	inUse() {
		return this._subscribers.size > 0;
	}
	delete() {}
	getData() {
		return this.isLoaded ? this._error ? Promise.reject(this._error) : this._content : this._loader.then(() => this.getData());
	}
	setData(e, t) {
		if (e === this._data && !t) return;
		this._data = e;
		let n = ++this._loadCount, r = e;
		typeof e == "string" && (r = ff(e)), r instanceof Promise ? (this.isLoaded = !1, this._loader = r.then((e) => {
			this._loadCount === n && (this.isLoaded = !0, this._error = void 0, this._content = e);
		}).catch((e) => {
			this._loadCount === n && (this.isLoaded = !0, this._error = e || !0);
		})) : (this.isLoaded = !0, this._error = void 0, this._content = e);
		for (let e of this._subscribers) e.onChange(this.getData());
	}
}, BT = class {
	constructor(e) {
		this.protocol = e.protocol || "resource://", this._context = {
			device: e.device,
			gl: e.device?.gl,
			resourceManager: this
		}, this._resources = {}, this._consumers = {}, this._pruneRequest = null;
	}
	contains(e) {
		return e.startsWith(this.protocol) ? !0 : e in this._resources;
	}
	add({ resourceId: e, data: t, forceUpdate: n = !1, persistent: r = !0 }) {
		let i = this._resources[e];
		i ? i.setData(t, n) : (i = new zT(e, t, this._context), this._resources[e] = i), i.persistent = r;
	}
	remove(e) {
		let t = this._resources[e];
		t && (t.delete(), delete this._resources[e]);
	}
	unsubscribe({ consumerId: e }) {
		let t = this._consumers[e];
		if (t) {
			for (let e in t) {
				let n = t[e], r = this._resources[n.resourceId];
				r && r.unsubscribe(n);
			}
			delete this._consumers[e], this.prune();
		}
	}
	subscribe({ resourceId: e, onChange: t, consumerId: n, requestId: r = "default" }) {
		let { _resources: i, protocol: a } = this;
		e.startsWith(a) && (e = e.replace(a, ""), i[e] || this.add({
			resourceId: e,
			data: null,
			persistent: !1
		}));
		let o = i[e];
		if (this._track(n, r, o, t), o) return o.getData();
	}
	prune() {
		this._pruneRequest ||= setTimeout(() => this._prune(), 0);
	}
	finalize() {
		for (let e in this._resources) this._resources[e].delete();
	}
	_track(e, t, n, r) {
		let i = this._consumers, a = i[e] = i[e] || {}, o = a[t], s = o && o.resourceId && this._resources[o.resourceId];
		s && (s.unsubscribe(o), this.prune()), n && (o ? (o.onChange = r, o.resourceId = n.id) : o = {
			onChange: r,
			resourceId: n.id
		}, a[t] = o, n.subscribe(o));
	}
	_prune() {
		this._pruneRequest = null;
		for (let e of Object.keys(this._resources)) {
			let t = this._resources[e];
			!t.persistent && !t.inUse() && (t.delete(), delete this._resources[e]);
		}
	}
};
Y(), je();
var VT = "layerManager.setLayers", HT = "layerManager.activateViewport", UT = class {
	constructor(e, t) {
		this._lastRenderedLayers = [], this._needsRedraw = !1, this._needsUpdate = !1, this._nextLayers = null, this._debug = !1, this._defaultShaderModulesChanged = !1, this.activateViewport = (e) => {
			V(HT, this, e), e && (this.context.viewport = e);
		};
		let { deck: n, stats: r, viewport: i, timeline: a } = t || {};
		this.layers = [], this.resourceManager = new BT({
			device: e,
			protocol: "deck://"
		}), this.context = {
			mousePosition: null,
			userData: {},
			layerManager: this,
			device: e,
			gl: e?.gl,
			deck: n,
			shaderAssembler: zS(e?.info?.shadingLanguage || "glsl"),
			defaultShaderModules: [xy],
			renderPass: void 0,
			stats: r || new ke({ id: "deck.gl" }),
			viewport: i || new SC({ id: "DEFAULT-INITIAL-VIEWPORT" }),
			timeline: a || new WC(),
			resourceManager: this.resourceManager,
			onError: void 0
		}, Object.seal(this);
	}
	finalize() {
		this.resourceManager.finalize();
		for (let e of this.layers) this._finalizeLayer(e);
	}
	needsRedraw(e = { clearRedrawFlags: !1 }) {
		let t = this._needsRedraw;
		e.clearRedrawFlags && (this._needsRedraw = !1);
		for (let n of this.layers) {
			let r = n.getNeedsRedraw(e);
			t ||= r;
		}
		return t;
	}
	needsUpdate() {
		return this._nextLayers && this._nextLayers !== this._lastRenderedLayers ? "layers changed" : this._defaultShaderModulesChanged ? "shader modules changed" : this._needsUpdate;
	}
	setNeedsRedraw(e) {
		this._needsRedraw = this._needsRedraw || e;
	}
	setNeedsUpdate(e) {
		this._needsUpdate = this._needsUpdate || e;
	}
	getLayers({ layerIds: e } = {}) {
		return e ? this.layers.filter((t) => e.find((e) => t.id.indexOf(e) === 0)) : this.layers;
	}
	setProps(e) {
		"debug" in e && (this._debug = e.debug), "userData" in e && (this.context.userData = e.userData), "layers" in e && (this._nextLayers = e.layers), "onError" in e && (this.context.onError = e.onError);
	}
	setLayers(e, t) {
		V(VT, this, t, e), this._lastRenderedLayers = e;
		let n = IT(e, Boolean);
		for (let e of n) e.context = this.context;
		this._updateLayers(this.layers, n);
	}
	updateLayers() {
		let e = this.needsUpdate();
		e && (this.setNeedsRedraw(`updating layers: ${e}`), this.setLayers(this._nextLayers || this._lastRenderedLayers, e)), this._nextLayers = null;
	}
	addDefaultShaderModule(e) {
		let { defaultShaderModules: t } = this.context;
		t.find((t) => t.name === e.name) || (t.push(e), this._defaultShaderModulesChanged = !0);
	}
	removeDefaultShaderModule(e) {
		let { defaultShaderModules: t } = this.context, n = t.findIndex((t) => t.name === e.name);
		n >= 0 && (t.splice(n, 1), this._defaultShaderModulesChanged = !0);
	}
	_handleError(e, t, n) {
		n.raiseError(t, `${e} of ${n}`);
	}
	_updateLayers(e, t) {
		let n = {};
		for (let t of e) n[t.id] ? B.warn(`Multiple old layers with same id ${t.id}`)() : n[t.id] = t;
		if (this._defaultShaderModulesChanged) {
			for (let t of e) t.setNeedsUpdate(), t.setChangeFlags({ extensionsChanged: !0 });
			this._defaultShaderModulesChanged = !1;
		}
		let r = [];
		this._updateSublayersRecursively(t, n, r), this._finalizeOldLayers(n);
		let i = !1;
		for (let e of r) if (e.hasUniformTransition()) {
			i = `Uniform transition in ${e}`;
			break;
		}
		this._needsUpdate = i, this.layers = r;
	}
	_updateSublayersRecursively(e, t, n) {
		for (let r of e) {
			r.context = this.context;
			let e = t[r.id];
			e === null && B.warn(`Multiple new layers with same id ${r.id}`)(), t[r.id] = null;
			let i = null;
			try {
				this._debug && e !== r && r.validateProps(), e ? (this._transferLayerState(e, r), this._updateLayer(r)) : this._initializeLayer(r), n.push(r), i = r.isComposite ? r.getSubLayers() : null;
			} catch (e) {
				this._handleError("matching", e, r);
			}
			i && this._updateSublayersRecursively(i, t, n);
		}
	}
	_finalizeOldLayers(e) {
		for (let t in e) {
			let n = e[t];
			n && this._finalizeLayer(n);
		}
	}
	_initializeLayer(e) {
		try {
			e._initialize(), e.lifecycle = kT.INITIALIZED;
		} catch (t) {
			this._handleError("initialization", t, e);
		}
	}
	_transferLayerState(e, t) {
		t._transferState(e), t.lifecycle = kT.MATCHED, t !== e && (e.lifecycle = kT.AWAITING_GC);
	}
	_updateLayer(e) {
		try {
			e._update();
		} catch (t) {
			this._handleError("update", t, e);
		}
	}
	_finalizeLayer(e) {
		this._needsRedraw = this._needsRedraw || `finalized ${e}`, e.lifecycle = kT.AWAITING_FINALIZATION;
		try {
			e._finalize(), e.lifecycle = kT.FINALIZED;
		} catch (t) {
			this._handleError("finalization", t, e);
		}
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/deep-equal.js
function WT(e, t, n) {
	if (e === t) return !0;
	if (!n || !e || !t) return !1;
	if (Array.isArray(e)) {
		if (!Array.isArray(t) || e.length !== t.length) return !1;
		for (let r = 0; r < e.length; r++) if (!WT(e[r], t[r], n - 1)) return !1;
		return !0;
	}
	if (Array.isArray(t)) return !1;
	if (typeof e == "object" && typeof t == "object") {
		let r = Object.keys(e), i = Object.keys(t);
		if (r.length !== i.length) return !1;
		for (let i of r) if (!t.hasOwnProperty(i) || !WT(e[i], t[i], n - 1)) return !1;
		return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/view-manager.js
var GT = "default-canvas", KT = class {
	constructor(e) {
		this.views = [], this.width = 100, this.height = 100, this.viewState = {}, this.controllers = {}, this.timeline = e.timeline, this._viewports = [], this._viewportMap = {}, this._isUpdating = !1, this._needsRedraw = "First render", this._needsUpdate = "Initialize", this._eventManager = e.eventManager, this._eventManagers = e.eventManagers || {}, this._viewEventManagers = {}, this._eventCallbacks = {
			onViewStateChange: e.onViewStateChange,
			onInteractionStateChange: e.onInteractionStateChange
		}, this._pickPosition = e.pickPosition, this._getCanvasContext = e.getCanvasContext, Object.seal(this), this.setProps(e);
	}
	finalize() {
		for (let e in this.controllers) {
			let t = this.controllers[e];
			t && t.finalize();
		}
		this.controllers = {};
	}
	needsRedraw(e = { clearRedrawFlags: !1 }) {
		let t = this._needsRedraw;
		return e.clearRedrawFlags && (this._needsRedraw = !1), t;
	}
	setNeedsUpdate(e) {
		this._needsUpdate = this._needsUpdate || e, this._needsRedraw = this._needsRedraw || e;
	}
	updateViewStates() {
		for (let e in this.controllers) {
			let t = this.controllers[e];
			t && t.updateTransition();
		}
	}
	getViewports(e) {
		return e ? this._viewports.filter((t) => {
			let n = !e.canvasId || this.getCanvasId(t.id) === e.canvasId, r = !("x" in e) || t.containsPixel(e);
			return n && r;
		}) : this._viewports;
	}
	getViews() {
		let e = {};
		return this.views.forEach((t) => {
			e[t.id] = t;
		}), e;
	}
	getView(e) {
		return this.views.find((t) => t.id === e);
	}
	getViewState(e) {
		let t = typeof e == "string" ? this.getView(e) : e, n = t && this.viewState[t.getViewStateId()] || this.viewState;
		return t ? t.filterViewState(n) : n;
	}
	getViewport(e) {
		return this._viewportMap[e];
	}
	getCanvasId(e) {
		let t = typeof e == "string" ? this.getView(e) : e;
		return t ? this._viewEventManagers[t.id]?.canvasId || this._getCanvasIdFromView(t) : void 0;
	}
	unproject(e, t) {
		let n = this.getViewports(), r = {
			x: e[0],
			y: e[1]
		};
		for (let i = n.length - 1; i >= 0; --i) {
			let a = n[i];
			if (a.containsPixel(r)) {
				let n = e.slice();
				return n[0] -= a.x, n[1] -= a.y, a.unproject(n, t);
			}
		}
		return null;
	}
	setProps(e) {
		e.views && this._setViews(e.views), e.viewState && this._setViewState(e.viewState), ("width" in e || "height" in e) && this._setSize(e.width, e.height), "pickPosition" in e && (this._pickPosition = e.pickPosition), "eventManagers" in e && this._setEventManagers(e.eventManagers || {}), this._isUpdating || this._update();
	}
	_update() {
		this._isUpdating = !0, this._needsUpdate && (this._needsUpdate = !1, this._rebuildViewports()), this._needsUpdate && (this._needsUpdate = !1, this._rebuildViewports()), this._isUpdating = !1;
	}
	_setSize(e, t) {
		(e !== this.width || t !== this.height) && (this.width = e, this.height = t, this.setNeedsUpdate("Size changed"));
	}
	_setViews(e) {
		e = IT(e, Boolean), this._diffViews(e, this.views) && this.setNeedsUpdate("views changed"), this.views = e;
	}
	_setViewState(e) {
		e ? (WT(e, this.viewState, 3) || this.setNeedsUpdate("viewState changed"), this.viewState = e) : B.warn("missing `viewState` or `initialViewState`")();
	}
	_setEventManagers(e) {
		this._eventManagers !== e && (this._eventManagers = e, this.setNeedsUpdate("eventManagers changed"));
	}
	_getCanvasIdFromView(e) {
		return e.props.canvasId || this._getCanvasContext?.(e.id)?.id || "default-canvas";
	}
	_getCanvasDimensions(e) {
		let [t, n] = (this._getCanvasContext?.(e.id))?.getCSSSize() || [this.width, this.height];
		return {
			width: t,
			height: n
		};
	}
	_getViewEventManager(e) {
		let t = this.getCanvasId(e) || "default-canvas";
		return {
			canvasId: t,
			eventManager: this._eventManagers[t] || this._eventManager
		};
	}
	_startViewportRebuild() {
		let e = this.controllers, t = this._viewEventManagers;
		return this._viewports = [], this.controllers = {}, this._viewEventManagers = {}, {
			oldControllers: e,
			oldViewEventManagers: t
		};
	}
	_getReusableController(e, t, n) {
		return e && (t?.canvasId !== n.canvasId || t?.eventManager !== n.eventManager) ? (e.finalize(), null) : e;
	}
	_createController(e, t) {
		let n = t.type;
		return new n({
			timeline: this.timeline,
			eventManager: this._getViewEventManager(e).eventManager,
			onViewStateChange: this._eventCallbacks.onViewStateChange,
			onStateChange: this._eventCallbacks.onInteractionStateChange,
			makeViewport: (t) => this.getView(e.id)?.makeViewport({
				viewState: t,
				...this._getCanvasDimensions(e)
			}),
			pickPosition: (t, n) => this._pickPosition?.(t, n, e.id)
		});
	}
	_updateController(e, t, n, r) {
		let i = e.controller;
		if (i && n) {
			let a = {
				...t,
				...i,
				id: e.id,
				x: n.x,
				y: n.y,
				width: n.width,
				height: n.height
			};
			return (!r || r.constructor !== i.type) && (r = this._createController(e, a)), r && r.setProps(a), r;
		}
		return null;
	}
	_rebuildViewports() {
		let { views: e } = this, { oldControllers: t, oldViewEventManagers: n } = this._startViewportRebuild(), r = !1;
		for (let i = e.length; i--;) {
			let a = e[i], { width: o, height: s } = this._getCanvasDimensions(a), c = this._getViewEventManager(a);
			this._viewEventManagers[a.id] = c;
			let l = this.getViewState(a), u = a.makeViewport({
				viewState: l,
				width: o,
				height: s
			}), d = this._getReusableController(t[a.id], n[a.id], c), f = !!a.controller;
			f && !d && (r = !0), (r || !f) && d && (d.finalize(), d = null), this.controllers[a.id] = this._updateController(a, l, u, d), u && this._viewports.unshift(u);
		}
		for (let e in t) {
			let n = t[e];
			n && !this.controllers[e] && n.finalize();
		}
		this._buildViewportMap();
	}
	_buildViewportMap() {
		this._viewportMap = {}, this._viewports.forEach((e) => {
			e.id && (this._viewportMap[e.id] = this._viewportMap[e.id] || e);
		});
	}
	_diffViews(e, t) {
		return e.length !== t.length || e.some((n, r) => !e[r].equals(t[r]));
	}
}, qT = /^(?:\d+\.?\d*|\.\d+)$/;
function JT(e) {
	switch (typeof e) {
		case "number":
			if (!Number.isFinite(e)) throw Error(`Could not parse position string ${e}`);
			return {
				type: "literal",
				value: e
			};
		case "string": try {
			return new QT(ZT(e)).parseExpression();
		} catch (t) {
			let n = t instanceof Error ? t.message : String(t);
			throw Error(`Could not parse position string ${e}: ${n}`);
		}
		default: throw Error(`Could not parse position string ${e}`);
	}
}
function YT(e, t) {
	switch (e.type) {
		case "literal": return e.value;
		case "percentage": return Math.round(e.value * t);
		case "binary":
			let n = YT(e.left, t), r = YT(e.right, t);
			return e.operator === "+" ? n + r : n - r;
		default: throw Error("Unknown layout expression type");
	}
}
function XT(e, t) {
	return YT(e, t);
}
function ZT(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e[n];
		if (/\s/.test(r)) n++;
		else if (r === "+" || r === "-" || r === "(" || r === ")" || r === "%") t.push({
			type: "symbol",
			value: r
		}), n++;
		else if ($T(r) || r === ".") {
			let i = n, a = r === ".";
			for (n++; n < e.length;) {
				let t = e[n];
				if ($T(t)) n++;
				else if (t === "." && !a) a = !0, n++;
				else break;
			}
			let o = e.slice(i, n);
			if (!qT.test(o)) throw Error("Invalid number token");
			t.push({
				type: "number",
				value: parseFloat(o)
			});
		} else if (eE(r)) {
			let r = n;
			for (; n < e.length && eE(e[n]);) n++;
			let i = e.slice(r, n).toLowerCase();
			t.push({
				type: "word",
				value: i
			});
		} else throw Error("Invalid token in position string");
	}
	return t;
}
var QT = class {
	constructor(e) {
		this.index = 0, this.tokens = e;
	}
	parseExpression() {
		let e = this.parseBinaryExpression();
		if (this.index < this.tokens.length) throw Error("Unexpected token at end of expression");
		return e;
	}
	parseBinaryExpression() {
		let e = this.parseFactor(), t = this.peek();
		for (; tE(t);) {
			this.index++;
			let n = this.parseFactor();
			e = {
				type: "binary",
				operator: t.value,
				left: e,
				right: n
			}, t = this.peek();
		}
		return e;
	}
	parseFactor() {
		let e = this.peek();
		if (!e) throw Error("Unexpected end of expression");
		if (e.type === "symbol" && e.value === "+") return this.index++, this.parseFactor();
		if (e.type === "symbol" && e.value === "-") return this.index++, {
			type: "binary",
			operator: "-",
			left: {
				type: "literal",
				value: 0
			},
			right: this.parseFactor()
		};
		if (e.type === "symbol" && e.value === "(") {
			this.index++;
			let e = this.parseBinaryExpression();
			if (!this.consumeSymbol(")")) throw Error("Missing closing parenthesis");
			return e;
		}
		if (e.type === "word" && e.value === "calc") {
			if (this.index++, !this.consumeSymbol("(")) throw Error("Missing opening parenthesis after calc");
			let e = this.parseBinaryExpression();
			if (!this.consumeSymbol(")")) throw Error("Missing closing parenthesis");
			return e;
		}
		if (e.type === "number") {
			this.index++;
			let t = e.value, n = this.peek();
			return n && n.type === "symbol" && n.value === "%" ? (this.index++, {
				type: "percentage",
				value: t / 100
			}) : (n && n.type === "word" && n.value === "px" && this.index++, {
				type: "literal",
				value: t
			});
		}
		throw Error("Unexpected token in expression");
	}
	consumeSymbol(e) {
		let t = this.peek();
		return t && t.type === "symbol" && t.value === e ? (this.index++, !0) : !1;
	}
	peek() {
		return this.tokens[this.index] || null;
	}
};
function $T(e) {
	return e >= "0" && e <= "9";
}
function eE(e) {
	return e >= "a" && e <= "z" || e >= "A" && e <= "Z";
}
function tE(e) {
	return !(!e || e.type !== "symbol" || e.value !== "+" && e.value !== "-");
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/deep-merge.js
function nE(e, t) {
	let n = { ...e };
	for (let e in t) e !== "id" && (n[e] = Array.isArray(n[e]) && Array.isArray(t[e]) ? rE(n[e], t[e]) : t[e]);
	return n;
}
function rE(e, t) {
	e = e.slice();
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		Number.isFinite(r) && (e[n] = r);
	}
	return e;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/views/view.js
var iE = class {
	constructor(e) {
		let { id: t, x: n = 0, y: r = 0, width: i = "100%", height: a = "100%", padding: o = null } = e;
		this.id = t || this.constructor.displayName || "view", this.props = {
			...e,
			id: this.id
		}, this._x = JT(n), this._y = JT(r), this._width = JT(i), this._height = JT(a), this._padding = o && {
			left: JT(o.left || 0),
			right: JT(o.right || 0),
			top: JT(o.top || 0),
			bottom: JT(o.bottom || 0)
		}, this.equals = this.equals.bind(this), Object.seal(this);
	}
	equals(e) {
		return this === e || this.constructor === e.constructor && WT(this.props, e.props, 2);
	}
	clone(e) {
		let t = this.constructor;
		return new t({
			...this.props,
			...e
		});
	}
	makeViewport({ width: e, height: t, viewState: n }) {
		n = this.filterViewState(n);
		let r = this.getDimensions({
			width: e,
			height: t
		});
		return !r.height || !r.width ? null : new (this.getViewportType(n))({
			...n,
			...this.props,
			...r
		});
	}
	getViewStateId() {
		let { viewState: e } = this.props;
		return typeof e == "string" ? e : e?.id || this.id;
	}
	filterViewState(e) {
		return this.props.viewState && typeof this.props.viewState == "object" ? this.props.viewState.id ? nE(e, this.props.viewState) : this.props.viewState : e;
	}
	getDimensions({ width: e, height: t }) {
		let n = {
			x: XT(this._x, e),
			y: XT(this._y, t),
			width: XT(this._width, e),
			height: XT(this._height, t)
		};
		return this._padding && (n.padding = {
			left: XT(this._padding.left, e),
			top: XT(this._padding.top, t),
			right: XT(this._padding.right, e),
			bottom: XT(this._padding.bottom, t)
		}), n;
	}
	get controller() {
		let e = this.props.controller;
		return e ? e === !0 ? { type: this.ControllerType } : typeof e == "function" ? { type: e } : {
			type: this.ControllerType,
			...e
		} : null;
	}
}, aE = class {
	constructor(e) {
		this._inProgress = !1, this._handle = null, this.time = 0, this.settings = { duration: 0 }, this._timeline = e;
	}
	get inProgress() {
		return this._inProgress;
	}
	start(e) {
		this.cancel(), this.settings = e, this._inProgress = !0, this.settings.onStart?.(this);
	}
	end() {
		this._inProgress && (this._timeline.removeChannel(this._handle), this._handle = null, this._inProgress = !1, this.settings.onEnd?.(this));
	}
	cancel() {
		this._inProgress &&= (this.settings.onInterrupt?.(this), this._timeline.removeChannel(this._handle), this._handle = null, !1);
	}
	update() {
		if (!this._inProgress) return !1;
		if (this._handle === null) {
			let { _timeline: e, settings: t } = this;
			this._handle = e.addChannel({
				delay: e.getTime(),
				duration: t.duration
			});
		}
		return this.time = this._timeline.getTime(this._handle), this._onUpdate(), this.settings.onUpdate?.(this), this._timeline.isFinished(this._handle) && this.end(), !0;
	}
	_onUpdate() {}
}, oE = () => {}, sE = { mode: "preserve" }, cE = { mode: "hard" }, lE = {
	BREAK: 1,
	SNAP_TO_END: 2,
	IGNORE: 3
}, uE = (e) => e, dE = lE.BREAK, fE = class {
	constructor(e) {
		this._onTransitionUpdate = (e) => {
			let { time: t, settings: { interpolator: n, startProps: r, endProps: i, duration: a, easing: o } } = e, s = o(t / a), c = n.interpolateProps(r, i, s);
			this.propsInTransition = this.getControllerState({
				...this.props,
				...c
			}, sE).getViewportProps(), this.onViewStateChange({
				viewState: this.propsInTransition,
				oldViewState: this.props
			});
		}, this.getControllerState = e.getControllerState, this.propsInTransition = null, this.transition = new aE(e.timeline), this.onViewStateChange = e.onViewStateChange || oE, this.onStateChange = e.onStateChange || oE;
	}
	finalize() {
		this.transition.cancel();
	}
	getViewportInTransition() {
		return this.propsInTransition;
	}
	processViewStateChange(e) {
		let t = !1, n = this.props;
		if (this.props = e, !n || this._shouldIgnoreViewportChange(n, e)) return !1;
		if (this._isTransitionEnabled(e)) {
			let r = n;
			if (this.transition.inProgress) {
				let { interruption: e, endProps: t } = this.transition.settings;
				r = {
					...n,
					...e === lE.SNAP_TO_END ? t : this.propsInTransition || n
				};
			}
			this._triggerTransition(r, e), t = !0;
		} else this.transition.cancel();
		return t;
	}
	updateTransition() {
		this.transition.update();
	}
	_isTransitionEnabled(e) {
		let { transitionDuration: t, transitionInterpolator: n } = e;
		return (t > 0 || t === "auto") && !!n;
	}
	_isUpdateDueToCurrentTransition(e) {
		return this.transition.inProgress && this.propsInTransition ? this.transition.settings.interpolator.arePropsEqual(e, this.propsInTransition) : !1;
	}
	_shouldIgnoreViewportChange(e, t) {
		return this.transition.inProgress ? this.transition.settings.interruption === lE.IGNORE || this._isUpdateDueToCurrentTransition(t) : !this._isTransitionEnabled(t) || t.transitionInterpolator.arePropsEqual(e, t);
	}
	_triggerTransition(e, t) {
		let n = this.getControllerState(e, sE), r = this.getControllerState(t, cE).shortestPathFrom(n), i = t.transitionInterpolator, a = i.getDuration ? i.getDuration(e, t) : t.transitionDuration;
		if (a === 0) return;
		let o = i.initializeProps(e, r);
		this.propsInTransition = {};
		let s = {
			duration: a,
			easing: t.transitionEasing || uE,
			interpolator: i,
			interruption: t.transitionInterruption || dE,
			startProps: o.start,
			endProps: o.end,
			onStart: t.onTransitionStart,
			onUpdate: this._onTransitionUpdate,
			onInterrupt: this._onTransitionEnd(t.onTransitionInterrupt),
			onEnd: this._onTransitionEnd(t.onTransitionEnd)
		};
		this.transition.start(s), this.onStateChange({ inTransition: !0 }), this.updateTransition();
	}
	_onTransitionEnd(e) {
		return (t) => {
			this.propsInTransition = null, this.onStateChange({
				inTransition: !1,
				isZooming: !1,
				isPanning: !1,
				isRotating: !1
			}), e?.(t);
		};
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/assert.js
function X(e, t) {
	if (!e) throw Error(t || "deck.gl: assertion failed.");
}
//#endregion
//#region node_modules/@deck.gl/core/dist/transitions/transition-interpolator.js
W();
var pE = class {
	constructor(e) {
		let { compare: t, extract: n, required: r } = e;
		this._propsToCompare = t, this._propsToExtract = n || t, this._requiredProps = r;
	}
	arePropsEqual(e, t) {
		for (let n of this._propsToCompare) if (!(n in e) || !(n in t) || !u_(e[n], t[n])) return !1;
		return !0;
	}
	initializeProps(e, t) {
		let n = {}, r = {};
		for (let i of this._propsToExtract) (i in e || i in t) && (n[i] = e[i], r[i] = t[i]);
		return this._checkRequiredProps(n), this._checkRequiredProps(r), {
			start: n,
			end: r
		};
	}
	getDuration(e, t) {
		return t.transitionDuration;
	}
	_checkRequiredProps(e) {
		this._requiredProps && this._requiredProps.forEach((t) => {
			let n = e[t];
			X(Number.isFinite(n) || Array.isArray(n), `${t} is required for transition`);
		});
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/transitions/linear-interpolator.js
W();
var mE = [
	"longitude",
	"latitude",
	"zoom",
	"bearing",
	"pitch"
], hE = [
	"longitude",
	"latitude",
	"zoom"
], gE = class extends pE {
	constructor(e = {}) {
		let t = Array.isArray(e) ? e : e.transitionProps, n = Array.isArray(e) ? {} : e;
		n.transitionProps = Array.isArray(t) ? {
			compare: t,
			required: t
		} : t || {
			compare: mE,
			required: hE
		}, super(n.transitionProps), this.opts = n;
	}
	initializeProps(e, t) {
		let n = super.initializeProps(e, t), { makeViewport: r, around: i } = this.opts;
		if (r && i) {
			let a = r(e), o = r(t), s = a.unproject(i);
			n.start.around = i, Object.assign(n.end, {
				around: o.project(s),
				aroundPosition: s,
				width: t.width,
				height: t.height
			});
		}
		return n;
	}
	interpolateProps(e, t, n) {
		let r = {};
		for (let i of this._propsToExtract) r[i] = l_(e[i] || 0, t[i] || 0, n);
		if (t.aroundPosition && this.opts.makeViewport) {
			let i = this.opts.makeViewport({
				...t,
				...r
			});
			Object.assign(r, i.panByPosition(t.aroundPosition, l_(e.around, t.around, n)));
		}
		return r;
	}
}, _E = { transitionDuration: 0 }, vE = 300, yE = 300, bE = (e) => 1 - (1 - e) * (1 - e), xE = (e) => e === 1 ? 1 : 1 - 2 ** (-10 * e), SE = {
	WHEEL: ["wheel"],
	PAN: [
		"panstart",
		"panmove",
		"panend"
	],
	PINCH: [
		"pinchstart",
		"pinchmove",
		"pinchend"
	],
	MULTI_PAN: [
		"multipanstart",
		"multipanmove",
		"multipanend"
	],
	DOUBLE_CLICK: ["dblclick"],
	DOUBLE_CLICK_DRAG: [
		"dblclickdragstart",
		"dblclickdragmove",
		"dblclickdragend",
		"dblclickdragcancel"
	],
	KEYBOARD: ["keydown"]
}, CE = {}, wE = class {
	constructor(e) {
		this.state = {}, this._events = {}, this._interactionState = { isDragging: !1 }, this._customEvents = [], this._eventStartBlocked = null, this._panMove = !1, this._multiPanMode = null, this._multiPanStartCenter = null, this._doubleClickDragAnchor = null, this._suppressDoubleClickUntil = 0, this.invertPan = !1, this.dragMode = "rotate", this.inertia = 0, this.scrollZoom = !0, this.dragPan = !0, this.dragRotate = !0, this.doubleClickZoom = !0, this.doubleClickDragZoom = !0, this.touchZoom = !0, this.touchRotate = !1, this.multiTouchDrag = null, this.trackpadGesture = !1, this.zoomAround = "pointer", this.keyboard = !0, this.transitionManager = new fE({
			...e,
			getControllerState: (t, n) => new this.ControllerState({
				...t,
				constraintContext: n,
				makeViewport: e.makeViewport
			}),
			onViewStateChange: this._onTransition.bind(this),
			onStateChange: this._setInteractionState.bind(this)
		}), this.handleEvent = this.handleEvent.bind(this), this.eventManager = e.eventManager, this.onViewStateChange = e.onViewStateChange || (() => {}), this.onStateChange = e.onStateChange || (() => {}), this.makeViewport = e.makeViewport, this.pickPosition = e.pickPosition;
	}
	set events(e) {
		this.toggleEvents(this._customEvents, !1), this.toggleEvents(e, !0), this._customEvents = e, this.props && this.setProps(this.props);
	}
	finalize() {
		for (let e in this._events) this._events[e] && this.eventManager?.off(e, this.handleEvent);
		this.transitionManager.finalize();
	}
	handleEvent(e) {
		this._controllerState = void 0;
		let t = this._eventStartBlocked;
		switch (e.type) {
			case "panstart": return !t && this._onPanStart(e);
			case "panmove": return this._onPan(e);
			case "panend": return this._onPanEnd(e);
			case "pinchstart": return t || !this._isTrackpadGestureAllowed(e) ? !1 : this._onPinchStart(e);
			case "pinchmove": return this._isTrackpadGestureAllowed(e) ? this._onPinch(e) : !1;
			case "pinchend": return this._isTrackpadGestureAllowed(e) ? this._onPinchEnd(e) : !1;
			case "multipanstart": return !t && this._onMultiPanStart(e);
			case "multipanmove": return this._onMultiPan(e);
			case "multipanend": return this._onMultiPanEnd(e);
			case "dblclick": return this._onDoubleClick(e);
			case "dblclickdragstart": return !t && this._onDoubleClickDragStart(e);
			case "dblclickdragmove": return this._onDoubleClickDrag(e);
			case "dblclickdragend":
			case "dblclickdragcancel": return this._onDoubleClickDragEnd(e);
			case "wheel": return this._onWheel(e);
			case "keydown": return this._onKeyDown(e);
			default: return !1;
		}
	}
	get controllerState() {
		return this._controllerState = this._controllerState || new this.ControllerState({
			makeViewport: this.makeViewport,
			...this.props,
			...this.state
		}), this._controllerState;
	}
	getCenter(e) {
		let { x: t, y: n } = this.props, { offsetCenter: r } = e;
		return [r.x - t, r.y - n];
	}
	getZoomPosition(e) {
		if (this.zoomAround === "pointer") return e;
		let t = this.makeViewport(this.controllerState.getViewportProps()), [n, r] = lS(t.center, t.pixelProjectionMatrix);
		return [n, r];
	}
	isPointInBounds(e, t) {
		let { width: n, height: r } = this.props;
		if (t && t.handled) return !1;
		let i = e[0] >= 0 && e[0] <= n && e[1] >= 0 && e[1] <= r;
		return i && t && t.stopPropagation(), i;
	}
	isFunctionKeyPressed(e) {
		let { srcEvent: t } = e;
		return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
	}
	isDragging() {
		return this._interactionState.isDragging || !1;
	}
	blockEvents(e) {
		let t = setTimeout(() => {
			this._eventStartBlocked === t && (this._eventStartBlocked = null);
		}, e);
		this._eventStartBlocked = t;
	}
	setProps(e) {
		e.maxBoundsPadding === void 0 && (e.maxBoundsPadding = null), e.dragMode && (this.dragMode = e.dragMode);
		let t = this.props;
		this.props = e, "transitionInterpolator" in e || (e.transitionInterpolator = this._getTransitionProps().transitionInterpolator), this.transitionManager.processViewStateChange(e);
		let { inertia: n } = e;
		this.inertia = Number.isFinite(n) ? n : n === !0 ? vE : 0;
		let { scrollZoom: r = !0, dragPan: i = !0, dragRotate: a = !0, doubleClickZoom: o = !0, doubleClickDragZoom: s = !1, touchZoom: c = !0, touchRotate: l = !1, multiTouchDrag: u = l ? "rotate" : null, trackpadGesture: d = !1, zoomAround: f = "pointer", keyboard: p = !0 } = e, m = !!this.onViewStateChange;
		if (this.toggleEvents(SE.WHEEL, m && r), this.toggleEvents(SE.PAN, m), this.toggleEvents(SE.PINCH, m && (c || u === "rotate")), this.toggleEvents(SE.MULTI_PAN, m && !!u), this.toggleEvents(SE.DOUBLE_CLICK, m && o), this.toggleEvents(SE.DOUBLE_CLICK_DRAG, m && s), this.toggleEvents(SE.KEYBOARD, m && p), this.scrollZoom = r, this.dragPan = i, this.dragRotate = a, this.doubleClickZoom = o, this.doubleClickDragZoom = s, this.touchZoom = c, this.touchRotate = u === "rotate", this.multiTouchDrag = u, this.trackpadGesture = d, this.zoomAround = f, this.keyboard = p, (!t || t.height !== e.height || t.width !== e.width || t.maxBounds !== e.maxBounds || t.maxBoundsPadding !== e.maxBoundsPadding) && e.maxBounds) {
			let t = new this.ControllerState({
				...e,
				makeViewport: this.makeViewport
			}), n = t.getViewportProps();
			Object.keys(n).some((t) => !WT(n[t], e[t], 1)) && this.updateViewport(t);
		}
	}
	updateTransition() {
		this.transitionManager.updateTransition();
	}
	toggleEvents(e, t) {
		this.eventManager && e.forEach((e) => {
			this._events[e] !== t && (this._events[e] = t, t ? this.eventManager.on(e, this.handleEvent) : this.eventManager.off(e, this.handleEvent));
		});
	}
	updateViewport(e, t = null, n = {}) {
		let r = {
			...e.getViewportProps(),
			...t
		}, i = this.controllerState !== e;
		if (this.state = e.getState(), this._setInteractionState(n), i) {
			let e = this.controllerState && this.controllerState.getViewportProps();
			this.onViewStateChange && this.onViewStateChange({
				viewState: r,
				interactionState: this._interactionState,
				oldViewState: e,
				viewId: this.props.id
			});
		}
	}
	_onTransition(e) {
		this.onViewStateChange({
			...e,
			interactionState: this._interactionState,
			viewId: this.props.id
		});
	}
	_setInteractionState(e) {
		Object.assign(this._interactionState, e), this.onStateChange(this._interactionState);
	}
	_getConstraintContext(e, t) {
		return this.props.rubberBand ? { mode: t === "update" ? "elastic" : t === "end" ? "rebound" : "hard" } : { mode: "hard" };
	}
	_getReboundTransition(e, t) {
		if (e.mode !== "rebound") return null;
		let n = t.getViewportProps();
		return Object.keys(n).some((e) => !WT(this.props[e], n[e], 1)) ? {
			...this._getTransitionProps(),
			transitionDuration: yE,
			transitionEasing: xE
		} : null;
	}
	_onPanStart(e) {
		let t = this.getCenter(e);
		if (!this.isPointInBounds(t, e)) return !1;
		let n = this.isFunctionKeyPressed(e) || e.rightButton || !1;
		(this.invertPan || this.dragMode === "pan") && (n = !n);
		let r = n ? "pan" : "rotate", i = this._getConstraintContext(r, "start"), a = n ? this.controllerState.panStart({ pos: t }, i) : this.controllerState.rotateStart({ pos: t }, i);
		return this._panMove = n, this.updateViewport(a, _E, { isDragging: !0 }), !0;
	}
	_onPan(e) {
		return this.isDragging() ? this._panMove ? this._onPanMove(e) : this._onPanRotate(e) : !1;
	}
	_onPanEnd(e) {
		return this.isDragging() ? this._panMove ? this._onPanMoveEnd(e) : this._onPanRotateEnd(e) : !1;
	}
	_onPanMove(e) {
		if (!this.dragPan) return !1;
		let t = this.getCenter(e), n = this.controllerState.pan({ pos: t }, this._getConstraintContext("pan", "update"));
		return this.updateViewport(n, _E, {
			isDragging: !0,
			isPanning: !0
		}), !0;
	}
	_onPanMoveEnd(e) {
		let { inertia: t } = this;
		if (this.dragPan && t && e.velocity) {
			let n = this.getCenter(e), r = [n[0] + e.velocityX * t / 2, n[1] + e.velocityY * t / 2], i = this.controllerState.pan({ pos: r }).panEnd();
			this.updateViewport(i, {
				...this._getTransitionProps(),
				transitionDuration: t,
				transitionEasing: bE
			}, {
				isDragging: !1,
				isPanning: !0
			});
		} else {
			let e = this.controllerState, t = this._getConstraintContext("pan", "end"), n = e.panEnd(t), r = this._getReboundTransition(t, n);
			this.updateViewport(n, r, {
				isDragging: !1,
				isPanning: !!r
			});
		}
		return !0;
	}
	_onPanRotate(e) {
		if (!this.dragRotate) return !1;
		let t = this.getCenter(e), n = this.controllerState.rotate({ pos: t }, this._getConstraintContext("rotate", "update"));
		return this.updateViewport(n, _E, {
			isDragging: !0,
			isRotating: !0
		}), !0;
	}
	_onPanRotateEnd(e) {
		let { inertia: t } = this;
		if (this.dragRotate && t && e.velocity) {
			let n = this.getCenter(e), r = [n[0] + e.velocityX * t / 2, n[1] + e.velocityY * t / 2], i = this.controllerState.rotate({ pos: r }).rotateEnd();
			this.updateViewport(i, {
				...this._getTransitionProps(),
				transitionDuration: t,
				transitionEasing: bE
			}, {
				isDragging: !1,
				isRotating: !0
			});
		} else {
			let e = this.controllerState, t = this._getConstraintContext("rotate", "end"), n = e.rotateEnd(t), r = this._getReboundTransition(t, n);
			this.updateViewport(n, r, {
				isDragging: !1,
				isRotating: !!r
			});
		}
		return !0;
	}
	_onWheel(e) {
		if (!this.scrollZoom || this.trackpadGesture && e.device !== "mouse") return !1;
		let t = this.getCenter(e);
		if (!this.isPointInBounds(t, e)) return !1;
		e.srcEvent.preventDefault();
		let { speed: n = .01, smooth: r = !1 } = this.scrollZoom === !0 ? {} : this.scrollZoom, { delta: i } = e, a = 2 / (1 + Math.exp(-Math.abs(i * n)));
		i < 0 && a !== 0 && (a = 1 / a);
		let o = this.getZoomPosition(t), s = r ? {
			...this._getTransitionProps({ around: o }),
			transitionDuration: 250
		} : _E, c = this.controllerState.zoom({
			pos: o,
			scale: a
		});
		return this.updateViewport(c, s, {
			isZooming: !0,
			isPanning: !0
		}), r || this._setInteractionState({
			isZooming: !1,
			isPanning: !1
		}), !0;
	}
	_onMultiPanStart(e) {
		let { multiTouchDrag: t } = this;
		if (!t || !this._isMultiPanEventAllowed(e, t)) return !1;
		let n = e.offsetCenter;
		if (!this.isPointInBounds(this.getCenter(e), e)) return !1;
		let r = e.pointerType === "trackpad", i = {
			x: n.x - (r ? 0 : e.deltaX),
			y: n.y - (r ? 0 : e.deltaY)
		}, a = {
			...e,
			offsetCenter: i
		}, o = this.getCenter(a), s = t === "pan" ? this.controllerState.panStart({ pos: o }, this._getConstraintContext("pan", "start")) : this.controllerState.rotateStart({ pos: o }, this._getConstraintContext("rotate", "start"));
		return this._multiPanMode = t, this._multiPanStartCenter = i, this.updateViewport(s, _E, { isDragging: !0 }), !0;
	}
	_onMultiPan(e) {
		let { mode: t, event: n } = this._getMultiPanEvent(e);
		return !t || !n || !this.isDragging() ? !1 : t === "pan" ? this._onPanMove(n) : this._onPanRotate(n);
	}
	_onMultiPanEnd(e) {
		let { mode: t, event: n } = this._getMultiPanEvent(e);
		if (!t || !n || !this.isDragging()) return this._resetMultiPan(), !1;
		let r = t === "pan" ? this._onPanMoveEnd(n) : this._onPanRotateEnd(n);
		return this._resetMultiPan(), r;
	}
	_isTrackpadGestureAllowed(e) {
		return e.pointerType !== "trackpad" || this.trackpadGesture;
	}
	_isMultiPanEventAllowed(e, t) {
		return e.pointerType === "trackpad" ? this.trackpadGesture && (t === "pan" ? this.dragPan : this.dragRotate) : e.pointerType === "touch" && (t === "pan" ? this.dragPan : this.dragRotate);
	}
	_getMultiPanEvent(e) {
		let t = this._multiPanMode, n = this._multiPanStartCenter;
		return !t || !n ? {
			mode: null,
			event: null
		} : {
			mode: t,
			event: {
				...e,
				offsetCenter: {
					x: n.x + e.deltaX,
					y: n.y + e.deltaY
				}
			}
		};
	}
	_resetMultiPan() {
		this._multiPanMode = null, this._multiPanStartCenter = null;
	}
	_onPinchStart(e) {
		this._doubleClickDragAnchor = null;
		let t = this.getCenter(e);
		if (!this.isPointInBounds(t, e)) return !1;
		let n = this.controllerState.zoomStart({ pos: this.getZoomPosition(t) }, this._getConstraintContext("zoom", "start")).rotateStart({ pos: t }, this._getConstraintContext("rotate", "start"));
		return CE._startPinchRotation = e.rotation, CE._lastPinchEvent = e, this.updateViewport(n, _E, { isDragging: !0 }), !0;
	}
	_onPinch(e) {
		if (!this.touchZoom && !this.touchRotate || !this.isDragging()) return !1;
		let t = this.controllerState;
		if (this.touchZoom) {
			let { scale: n } = e, r = this.getCenter(e);
			t = t.zoom({
				pos: this.getZoomPosition(r),
				scale: n
			}, this._getConstraintContext("zoom", "update"));
		}
		if (this.touchRotate) {
			let { rotation: n } = e;
			t = t.rotate({ deltaAngleX: CE._startPinchRotation - n }, this._getConstraintContext("rotate", "update"));
		}
		return this.updateViewport(t, _E, {
			isDragging: !0,
			isPanning: this.touchZoom,
			isZooming: this.touchZoom,
			isRotating: this.touchRotate
		}), CE._lastPinchEvent = e, !0;
	}
	_onPinchEnd(e) {
		if (!this.isDragging()) return !1;
		let { inertia: t } = this, { _lastPinchEvent: n } = CE;
		if (this.touchZoom && t && n && e.scale !== n.scale) {
			let r = this.getCenter(e), i = this.getZoomPosition(r), a = this.controllerState.rotateEnd(), o = Math.log2(e.scale), s = 2 ** (o + (o - Math.log2(n.scale)) / (e.deltaTime - n.deltaTime) * t / 2);
			a = a.zoom({
				pos: i,
				scale: s
			}).zoomEnd(), this.updateViewport(a, {
				...this._getTransitionProps({ around: i }),
				transitionDuration: t,
				transitionEasing: bE
			}, {
				isDragging: !1,
				isPanning: this.touchZoom,
				isZooming: this.touchZoom,
				isRotating: !1
			}), this.blockEvents(t);
		} else {
			let e = this.controllerState, t = this._getConstraintContext("zoom", "end"), n = this._getConstraintContext("rotate", "end"), r = e.zoomEnd(t).rotateEnd(n), i = this._getReboundTransition(this.touchZoom ? t : n, r);
			this.updateViewport(r, i, {
				isDragging: !1,
				isPanning: !!i && this.touchZoom,
				isZooming: !!i && this.touchZoom,
				isRotating: !!i && this.touchRotate
			});
		}
		return CE._startPinchRotation = null, CE._lastPinchEvent = null, !0;
	}
	_onDoubleClick(e) {
		if (!this.doubleClickZoom || Date.now() < this._suppressDoubleClickUntil) return !1;
		let t = this.getCenter(e);
		if (!this.isPointInBounds(t, e)) return !1;
		let n = this.isFunctionKeyPressed(e), r = this.getZoomPosition(t), i = this.controllerState.zoom({
			pos: r,
			scale: n ? .5 : 2
		});
		return this.updateViewport(i, this._getTransitionProps({ around: r }), {
			isZooming: !0,
			isPanning: !0
		}), this.blockEvents(100), !0;
	}
	_onDoubleClickDragStart(e) {
		if (!this.doubleClickDragZoom) return this._doubleClickDragAnchor = null, !1;
		let t = this.getCenter(e);
		if (!this.isPointInBounds(t, e)) return this._doubleClickDragAnchor = null, !1;
		this._doubleClickDragAnchor = this.getZoomPosition(t);
		let n = this.controllerState.zoomStart({ pos: this._doubleClickDragAnchor }, this._getConstraintContext("zoom", "start"));
		return e.scale !== 1 && (n = n.zoom({
			pos: this._doubleClickDragAnchor,
			scale: e.scale
		}, this._getConstraintContext("zoom", "update"))), this.updateViewport(n, _E, {
			isDragging: !0,
			isPanning: !0,
			isZooming: !0
		}), !0;
	}
	_onDoubleClickDrag(e) {
		let t = this._doubleClickDragAnchor;
		if (!t) return !1;
		let n = this.controllerState.zoom({
			pos: t,
			scale: e.scale
		}, this._getConstraintContext("zoom", "update"));
		return this.updateViewport(n, _E, {
			isDragging: !0,
			isPanning: !0,
			isZooming: !0
		}), !0;
	}
	_onDoubleClickDragEnd(e) {
		if (!this._doubleClickDragAnchor) return !1;
		this._doubleClickDragAnchor = null;
		let t = this.controllerState, n = this._getConstraintContext("zoom", "end"), r = t.zoomEnd(n), i = this._getReboundTransition(n, r);
		return this.updateViewport(r, i, {
			isDragging: !1,
			isPanning: !!i,
			isZooming: !!i
		}), this._suppressDoubleClickUntil = Date.now() + 100, this.blockEvents(100), !0;
	}
	_onKeyDown(e) {
		if (!this.keyboard) return !1;
		let t = this.isFunctionKeyPressed(e), { zoomSpeed: n, moveSpeed: r, rotateSpeedX: i, rotateSpeedY: a } = this.keyboard === !0 ? {} : this.keyboard, { controllerState: o } = this, s, c = {};
		switch (e.srcEvent.code) {
			case "Minus":
				s = t ? o.zoomOut(n).zoomOut(n) : o.zoomOut(n), c.isZooming = !0;
				break;
			case "Equal":
				s = t ? o.zoomIn(n).zoomIn(n) : o.zoomIn(n), c.isZooming = !0;
				break;
			case "ArrowLeft":
				t ? (s = o.rotateLeft(i), c.isRotating = !0) : (s = o.moveLeft(r), c.isPanning = !0);
				break;
			case "ArrowRight":
				t ? (s = o.rotateRight(i), c.isRotating = !0) : (s = o.moveRight(r), c.isPanning = !0);
				break;
			case "ArrowUp":
				t ? (s = o.rotateUp(a), c.isRotating = !0) : (s = o.moveUp(r), c.isPanning = !0);
				break;
			case "ArrowDown":
				t ? (s = o.rotateDown(a), c.isRotating = !0) : (s = o.moveDown(r), c.isPanning = !0);
				break;
			default: return !1;
		}
		return this.updateViewport(s, this._getTransitionProps(), c), !0;
	}
	_getTransitionProps(e) {
		let { transition: t } = this;
		return !t || !t.transitionInterpolator ? _E : e ? {
			...t,
			transitionInterpolator: new gE({
				...e,
				...t.transitionInterpolator.opts,
				makeViewport: this.controllerState.makeViewport
			})
		} : t;
	}
}, TE = Symbol("constraintAround"), EE = class {
	constructor(e, t, n, r) {
		this.makeViewport = n, this._viewportProps = this.applyConstraints(e, r), this._state = t;
	}
	getViewportProps() {
		return this._viewportProps;
	}
	getState() {
		return this._state;
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/controllers/utils.js
function DE(e, t, n) {
	let r = e - t;
	return r && Number.isFinite(r) ? t + r * n / (n + Math.abs(r)) : t;
}
function OE(e, t, n) {
	let r = XT(JT(n?.left ?? 0), e), i = XT(JT(n?.right ?? 0), e), a = XT(JT(n?.top ?? 0), t), o = XT(JT(n?.bottom ?? 0), t);
	return {
		x: r,
		y: a,
		width: e - r - i,
		height: t - a - o
	};
}
function kE(e, t, n) {
	let [r, i] = e.project(t);
	return r = Number.isFinite(r) ? r : e.width / 2, i = Number.isFinite(i) ? i : e.height / 2, {
		left: r - n.x,
		right: n.x + n.width - r,
		top: i - n.y,
		bottom: n.y + n.height - i
	};
}
//#endregion
//#region node_modules/@deck.gl/core/dist/controllers/map-controller.js
W();
var AE = 5, jE = 1.2, ME = 512, NE = [[-Infinity, -90], [Infinity, 90]], PE = 1;
function FE([e, t]) {
	if (Math.abs(t) > 90 && (t = Math.sign(t) * 90), Number.isFinite(e)) {
		let [n, r] = $x([e, t]);
		return [n, c_(r, 0, ME)];
	}
	let [, n] = $x([0, t]);
	return [e, c_(n, 0, ME)];
}
var IE = class extends EE {
	constructor(e) {
		let { width: t, height: n, latitude: r, longitude: i, zoom: a, bearing: o = 0, pitch: s = 0, altitude: c = 1.5, position: l = [
			0,
			0,
			0
		], maxZoom: u = 20, minZoom: d = 0, maxPitch: f = 60, minPitch: p = 0, startPanLngLat: m, startZoomLngLat: h, startRotatePos: g, startRotateLngLat: _, startBearing: v, startPitch: y, startZoom: b, normalize: x = !0, rubberBand: S = !1 } = e, { [TE]: C } = e;
		X(Number.isFinite(i)), X(Number.isFinite(r)), X(Number.isFinite(a));
		let w = e.maxBounds || (x ? NE : null), T = e.maxBoundsPadding || null;
		super({
			width: t,
			height: n,
			latitude: r,
			longitude: i,
			zoom: a,
			bearing: o,
			pitch: s,
			altitude: c,
			maxZoom: u,
			minZoom: d,
			maxPitch: f,
			minPitch: p,
			normalize: x,
			position: l,
			maxBounds: w,
			maxBoundsPadding: T,
			rubberBand: S,
			[TE]: C
		}, {
			startPanLngLat: m,
			startZoomLngLat: h,
			startRotatePos: g,
			startRotateLngLat: _,
			startBearing: v,
			startPitch: y,
			startZoom: b
		}, e.makeViewport, e.constraintContext), this.getAltitude = e.getAltitude;
	}
	panStart({ pos: e }, t) {
		return this._getUpdatedState({ startPanLngLat: this._unproject(e) }, t);
	}
	pan({ pos: e, startPos: t }, n) {
		let r = this.getState().startPanLngLat || this._unproject(t);
		if (!r) return this;
		let i = this.makeViewport(this.getViewportProps()).panByPosition(r, e);
		return this._getUpdatedState(i, n);
	}
	panEnd(e) {
		return this._getUpdatedState({ startPanLngLat: null }, e);
	}
	rotateStart({ pos: e }) {
		let t = this.getAltitude?.(e);
		return this._getUpdatedState({
			startRotatePos: e,
			startRotateLngLat: t === void 0 ? void 0 : this._unproject3D(e, t),
			startBearing: this.getViewportProps().bearing,
			startPitch: this.getViewportProps().pitch
		});
	}
	rotate({ pos: e, deltaAngleX: t = 0, deltaAngleY: n = 0 }) {
		let { startRotatePos: r, startRotateLngLat: i, startBearing: a, startPitch: o } = this.getState();
		if (!r || a === void 0 || o === void 0) return this;
		let s;
		if (s = e ? this._getNewRotation(e, r, o, a) : {
			bearing: a + t,
			pitch: o + n
		}, i) {
			let e = this.makeViewport({
				...this.getViewportProps(),
				...s
			}), t = "panByPosition3D" in e ? "panByPosition3D" : "panByPosition";
			return this._getUpdatedState({
				...s,
				...e[t](i, r)
			});
		}
		return this._getUpdatedState(s);
	}
	rotateEnd() {
		return this._getUpdatedState({
			startRotatePos: null,
			startRotateLngLat: null,
			startBearing: null,
			startPitch: null
		});
	}
	zoomStart({ pos: e }, t) {
		return this._getUpdatedState({
			startZoomLngLat: this._unproject(e),
			startZoom: this.getViewportProps().zoom
		}, t);
	}
	zoom({ pos: e, startPos: t, scale: n }, r) {
		let { startZoom: i, startZoomLngLat: a } = this.getState();
		return a ||= (i = this.getViewportProps().zoom, this._unproject(t) || this._unproject(e)), a ? this._getUpdatedState({
			zoom: i + Math.log2(n),
			[TE]: {
				position: a,
				screenPosition: e
			}
		}, r) : this;
	}
	zoomEnd(e) {
		return this._getUpdatedState({
			startZoomLngLat: null,
			startZoom: null
		}, e);
	}
	zoomIn(e = 2, t) {
		return this._zoomFromCenter(e, t);
	}
	zoomOut(e = 2, t) {
		return this._zoomFromCenter(1 / e, t);
	}
	moveLeft(e = 100, t) {
		return this._panFromCenter([e, 0], t);
	}
	moveRight(e = 100, t) {
		return this._panFromCenter([-e, 0], t);
	}
	moveUp(e = 100, t) {
		return this._panFromCenter([0, e], t);
	}
	moveDown(e = 100, t) {
		return this._panFromCenter([0, -e], t);
	}
	rotateLeft(e = 15) {
		return this._getUpdatedState({ bearing: this.getViewportProps().bearing - e });
	}
	rotateRight(e = 15) {
		return this._getUpdatedState({ bearing: this.getViewportProps().bearing + e });
	}
	rotateUp(e = 10) {
		return this._getUpdatedState({ pitch: this.getViewportProps().pitch + e });
	}
	rotateDown(e = 10) {
		return this._getUpdatedState({ pitch: this.getViewportProps().pitch - e });
	}
	shortestPathFrom(e) {
		let t = e.getViewportProps(), n = { ...this.getViewportProps() }, { bearing: r, longitude: i } = n;
		return Math.abs(r - t.bearing) > 180 && (n.bearing = r < 0 ? r + 360 : r - 360), Math.abs(i - t.longitude) > 180 && (n.longitude = i < 0 ? i + 360 : i - 360), n;
	}
	applyConstraints(e, t) {
		let n = e, r = n[TE];
		delete n[TE];
		let { maxPitch: i, minPitch: a, pitch: o, bearing: s, normalize: c, maxBounds: l, rubberBand: u } = e;
		c && (s < -180 || s > 180) && (e.bearing = cC(s + 180, 360) - 180), e.pitch = c_(o, a, i);
		let d = this._constrainZoom(e.zoom, e), f = u && t?.mode === "elastic";
		if (e.zoom = t?.mode === "preserve" ? e.zoom : f ? DE(e.zoom, d, PE) : d, r) {
			let t = this.makeViewport(e);
			Object.assign(e, t.panByPosition(r.position, r.screenPosition));
		}
		if (c && (e.longitude < -180 || e.longitude > 180) && (e.longitude = cC(e.longitude + 180, 360) - 180), l) {
			let n = OE(e.width, e.height, e.maxBoundsPadding), r = kE(this.makeViewport({
				...e,
				bearing: 0,
				pitch: 0
			}), [e.longitude, e.latitude], n), i = FE(l[0]), a = FE(l[1]), o = 2 ** e.zoom, s = [i[0] + r.left / o, i[1] + r.bottom / o], c = [a[0] - r.right / o, a[1] - r.top / o], u = FE([e.longitude, e.latitude]), d = [c_(u[0], s[0], c[0]), c_(u[1], s[1], c[1])], p = u.slice();
			if (n.width >= 0 && (p[0] = t?.mode === "preserve" ? u[0] : f ? DE(u[0], d[0], n.width / 2 / o) : d[0]), n.height >= 0 && (p[1] = t?.mode === "preserve" ? u[1] : f ? DE(u[1], d[1], n.height / 2 / o) : d[1]), p[0] !== u[0] || p[1] !== u[1]) {
				let [t, n] = eS(p);
				p[0] !== u[0] && (e.longitude = t), p[1] !== u[1] && (e.latitude = n);
			}
		}
		return e;
	}
	_constrainZoom(e, t) {
		t ||= this.getViewportProps();
		let { maxZoom: n, maxBounds: r } = t, i = r !== null && t.width > 0 && t.height > 0, { minZoom: a } = t;
		if (i) {
			let e = OE(t.width, t.height, t.maxBoundsPadding), i = FE(r[0]), o = FE(r[1]), s = o[0] - i[0], c = o[1] - i[1];
			e.width > 0 && Number.isFinite(s) && s > 0 && (a = Math.max(a, Math.log2(e.width / s))), e.height > 0 && Number.isFinite(c) && c > 0 && (a = Math.max(a, Math.log2(e.height / c))), a > n && (a = n);
		}
		return c_(e, a, n);
	}
	_zoomFromCenter(e, t) {
		let { width: n, height: r } = this.getViewportProps();
		return this.zoom({
			pos: [n / 2, r / 2],
			scale: e
		}, t);
	}
	_panFromCenter(e, t) {
		let { width: n, height: r } = this.getViewportProps();
		return this.pan({
			startPos: [n / 2, r / 2],
			pos: [n / 2 + e[0], r / 2 + e[1]]
		}, t);
	}
	_getUpdatedState(e, t) {
		return new this.constructor({
			makeViewport: this.makeViewport,
			...this.getViewportProps(),
			...this.getState(),
			...e,
			constraintContext: t
		});
	}
	_unproject(e) {
		let t = this.makeViewport(this.getViewportProps());
		return e && t.unproject(e);
	}
	_unproject3D(e, t) {
		return this.makeViewport(this.getViewportProps()).unproject(e, { targetZ: t });
	}
	_getNewRotation(e, t, n, r) {
		let i = e[0] - t[0], a = e[1] - t[1], o = e[1], s = t[1], { width: c, height: l } = this.getViewportProps(), u = i / c, d = 0;
		a > 0 ? Math.abs(l - s) > AE && (d = a / (s - l) * jE) : a < 0 && s > AE && (d = 1 - o / s), d = c_(d, -1, 1);
		let { minPitch: f, maxPitch: p } = this.getViewportProps(), m = r + 180 * u, h = n;
		return d > 0 ? h = n + d * (p - n) : d < 0 && (h = n - d * (f - n)), {
			pitch: h,
			bearing: m
		};
	}
}, LE = class extends wE {
	constructor() {
		super(...arguments), this.ControllerState = IE, this.transition = {
			transitionDuration: 300,
			transitionInterpolator: new gE({ transitionProps: {
				compare: [
					"longitude",
					"latitude",
					"zoom",
					"bearing",
					"pitch",
					"position"
				],
				required: [
					"longitude",
					"latitude",
					"zoom"
				]
			} })
		}, this.dragMode = "pan", this.rotationPivot = "center", this._getAltitude = (e) => {
			if (this.rotationPivot === "2d") return 0;
			if (this.rotationPivot === "3d" && this.pickPosition) {
				let { x: t, y: n } = this.props, r = this.pickPosition(t + e[0], n + e[1]);
				if (r && r.coordinate && r.coordinate.length >= 3) return r.coordinate[2];
			}
		};
	}
	setProps(e) {
		"rotationPivot" in e && (this.rotationPivot = e.rotationPivot || "center"), e.getAltitude = this._getAltitude, e.position = e.position || [
			0,
			0,
			0
		], e.maxBounds = e.maxBounds || (e.normalize === !1 ? null : NE), super.setProps(e);
	}
	updateViewport(e, t = null, n = {}) {
		let r = e.getState();
		n.isDragging && r.startRotateLngLat ? n = {
			...n,
			rotationPivotPosition: r.startRotateLngLat
		} : n.isDragging === !1 && (n = {
			...n,
			rotationPivotPosition: void 0
		}), super.updateViewport(e, t, n);
	}
}, RE = class extends iE {
	constructor(e = {}) {
		super(e);
	}
	getViewportType() {
		return CC;
	}
	get ControllerType() {
		return LE;
	}
};
RE.displayName = "MapView";
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/effect-manager.js
var zE = new aC();
function BE(e, t) {
	return (e.order ?? Infinity) - (t.order ?? Infinity);
}
var VE = class {
	constructor(e) {
		this._resolvedEffects = [], this._defaultEffects = [], this.effects = [], this._context = e, this._needsRedraw = "Initial render", this._setEffects([]);
	}
	addDefaultEffect(e) {
		let t = this._defaultEffects;
		if (!t.find((t) => t.id === e.id)) {
			let n = t.findIndex((t) => BE(t, e) > 0);
			n < 0 ? t.push(e) : t.splice(n, 0, e), e.setup(this._context), this._setEffects(this.effects);
		}
	}
	setProps(e) {
		"effects" in e && (WT(e.effects, this.effects, 1) || this._setEffects(e.effects));
	}
	needsRedraw(e = { clearRedrawFlags: !1 }) {
		let t = this._needsRedraw;
		return e.clearRedrawFlags && (this._needsRedraw = !1), t;
	}
	getEffects() {
		return this._resolvedEffects;
	}
	_setEffects(e) {
		let t = {};
		for (let e of this.effects) t[e.id] = e;
		let n = [];
		for (let r of e) {
			let e = t[r.id], i = r;
			e && e !== r ? e.setProps ? (e.setProps(r.props), i = e) : e.cleanup(this._context) : e || r.setup(this._context), n.push(i), delete t[r.id];
		}
		for (let e in t) t[e].cleanup(this._context);
		this.effects = n, this._resolvedEffects = n.concat(this._defaultEffects), e.some((e) => e instanceof aC) || this._resolvedEffects.push(zE), this._needsRedraw = "effects changed";
	}
	finalize() {
		for (let e of this._resolvedEffects) e.cleanup(this._context);
		this.effects.length = 0, this._resolvedEffects.length = 0, this._defaultEffects.length = 0;
	}
}, HE = class extends ZS {
	shouldDrawLayer(e) {
		let { operation: t } = e.props;
		return t.includes("draw") || t.includes("terrain");
	}
	render(e) {
		return this._render(e);
	}
}, UE = "deckRenderer.renderLayers", WE = class {
	constructor(e, t = {}) {
		this.device = e, this.stats = t.stats, this.layerFilter = null, this.drawPickingColors = !1, this.drawLayersPass = new HE(e), this.pickLayersPass = new ET(e), this.renderCount = 0, this._needsRedraw = "Initial render", this.renderBuffers = [], this.lastPostProcessEffect = null;
	}
	setProps(e) {
		this.layerFilter !== e.layerFilter && (this.layerFilter = e.layerFilter, this._needsRedraw = "layerFilter changed"), this.drawPickingColors !== e.drawPickingColors && (this.drawPickingColors = e.drawPickingColors, this._needsRedraw = "drawPickingColors changed");
	}
	renderLayers(e) {
		let t = this.drawPickingColors ? this.pickLayersPass : this.drawLayersPass, n = {
			layerFilter: this.layerFilter,
			isPicking: this.drawPickingColors,
			...e
		};
		if (!e.viewports.length) {
			let e = t.render(n), r = "stats" in e ? e.stats : e;
			this._updateStats(r);
			return;
		}
		n.effects && this._preRender(n.effects, n);
		let r = this.lastPostProcessEffect ? this.renderBuffers[0] : n.target;
		this.lastPostProcessEffect && (n.clearColor = [
			0,
			0,
			0,
			0
		], n.clearCanvas = !0);
		let i = t.render({
			...n,
			target: r
		}), a = "stats" in i ? i.stats : i;
		n.effects && (this.lastPostProcessEffect && (n.clearCanvas = e.clearCanvas === void 0 || e.clearCanvas), this._postRender(n.effects, n)), this.renderCount++, V(UE, this, a, e), this._updateStats(a);
	}
	needsRedraw(e = { clearRedrawFlags: !1 }) {
		let t = this._needsRedraw;
		return e.clearRedrawFlags && (this._needsRedraw = !1), t;
	}
	finalize() {
		let { renderBuffers: e } = this;
		for (let t of e) t.delete();
		e.length = 0;
	}
	_updateStats(e) {
		if (!this.stats) return;
		let t = 0;
		for (let { visibleCount: n } of e) t += n;
		this.stats.get("Layers rendered").addCount(t);
	}
	_preRender(e, t) {
		this.lastPostProcessEffect = null, t.preRenderStats = t.preRenderStats || {};
		for (let n of e) t.preRenderStats[n.id] = n.preRender(t), n.postRender && (this.lastPostProcessEffect = n.id);
		this.lastPostProcessEffect && this._resizeRenderBuffers(t.canvasContext);
	}
	_resizeRenderBuffers(e = this.device.canvasContext) {
		let { renderBuffers: t } = this, n = e.getDrawingBufferSize(), [r, i] = n;
		t.length === 0 && [0, 1].map((e) => {
			let n = this.device.createTexture({
				sampler: {
					minFilter: "linear",
					magFilter: "linear"
				},
				width: r,
				height: i
			});
			t.push(this.device.createFramebuffer({
				id: `deck-renderbuffer-${e}`,
				colorAttachments: [n]
			}));
		});
		for (let e of t) e.resize(n);
	}
	_postRender(e, t) {
		let { renderBuffers: n } = this, r = t.target ?? t.canvasContext?.getCurrentFramebuffer() ?? t.target, i = {
			...t,
			inputBuffer: n[0],
			swapBuffer: n[1]
		};
		for (let t of e) if (t.postRender) {
			i.target = t.id === this.lastPostProcessEffect ? r : void 0;
			let e = t.postRender(i);
			i.inputBuffer = e, i.swapBuffer = e === n[0] ? n[1] : n[0];
		}
	}
}, GE = {
	pickedColor: null,
	pickedObjectIndex: -1
};
function KE({ pickedColors: e, decodePickingColor: t, deviceX: n, deviceY: r, deviceRadius: i, deviceRect: a }) {
	let { x: o, y: s, width: c, height: l } = a, u = i * i, d = -1, f = 0;
	for (let t = 0; t < l; t++) {
		let i = t + s - r, a = i * i;
		if (a > u) f += 4 * c;
		else for (let t = 0; t < c; t++) {
			if (e[f + 3] - 1 >= 0) {
				let e = t + o - n, r = e * e + a;
				r <= u && (u = r, d = f);
			}
			f += 4;
		}
	}
	if (d >= 0) {
		let n = e.slice(d, d + 4), r = t(n);
		if (r) {
			let e = Math.floor(d / 4 / c), t = d / 4 - e * c;
			return {
				...r,
				pickedColor: n,
				pickedX: o + t,
				pickedY: s + e
			};
		}
		B.error("Picked non-existent layer. Is picking buffer corrupt?")();
	}
	return GE;
}
function qE({ pickedColors: e, decodePickingColor: t }) {
	let n = /* @__PURE__ */ new Map();
	if (e) {
		for (let r = 0; r < e.length; r += 4) if (e[r + 3] - 1 >= 0) {
			let i = e.slice(r, r + 4), a = i.join(",");
			if (!n.has(a)) {
				let e = t(i);
				e ? n.set(a, {
					...e,
					color: i
				}) : B.error("Picked non-existent layer. Is picking buffer corrupt?")();
			}
		}
	}
	return Array.from(n.values());
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/picking/pick-info.js
function JE({ pickInfo: e, viewports: t, pixelRatio: n, x: r, y: i, z: a }) {
	let o = t[0];
	t.length > 1 && (o = ZE(e?.pickedViewports || t, {
		x: r,
		y: i
	}));
	let s;
	if (o) {
		let e = [r - o.x, i - o.y];
		a !== void 0 && (e[2] = a), s = o.unproject(e);
	}
	return {
		color: null,
		layer: null,
		viewport: o,
		index: -1,
		picked: !1,
		x: r,
		y: i,
		pixel: [r, i],
		coordinate: s,
		devicePixel: e && "pickedX" in e ? [e.pickedX, e.pickedY] : void 0,
		pixelRatio: n
	};
}
function YE(e) {
	let { pickInfo: t, lastPickedInfo: n, mode: r, layers: i } = e, { pickedColor: a, pickedLayer: o, pickedObjectIndex: s } = t, c = o ? [o] : [];
	if (r === "hover") {
		let e = n.index, t = n.layerId, r = o ? o.props.id : null;
		if (r !== t || s !== e) {
			if (r !== t) {
				let e = i.find((e) => e.props.id === t);
				e && c.unshift(e);
			}
			n.layerId = r, n.index = s, n.info = null;
		}
	}
	let l = JE(e), u = /* @__PURE__ */ new Map();
	return u.set(null, l), c.forEach((e) => {
		let t = { ...l };
		e === o && (t.color = a, t.index = s, t.picked = !0), t = XE({
			layer: e,
			info: t,
			mode: r
		});
		let i = t.layer;
		e === o && r === "hover" && (n.info = t), u.set(i.id, t), r === "hover" && i.updateAutoHighlight(t);
	}), u;
}
function XE({ layer: e, info: t, mode: n }) {
	for (; e && t;) {
		let r = t.layer || null;
		t.sourceLayer = r, t.layer = e, t = e.getPickingInfo({
			info: t,
			mode: n,
			sourceLayer: r
		}), e = e.parent;
	}
	return t;
}
function ZE(e, t) {
	for (let n = e.length - 1; n >= 0; n--) {
		let r = e[n];
		if (r.containsPixel(t)) return r;
	}
	return e[0];
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/deck-picker.js
I();
var QE = class {
	constructor(e, t = {}) {
		this._pickable = !0, this.device = e, this.stats = t.stats, this.pickLayersPass = new ET(e), this.lastPickedInfo = {
			index: -1,
			layerId: null,
			info: null
		};
	}
	setProps(e) {
		"layerFilter" in e && (this.layerFilter = e.layerFilter), "_pickable" in e && (this._pickable = e._pickable);
	}
	finalize() {
		this.pickingFBO && this.pickingFBO.destroy(), this.depthFBO && this.depthFBO.destroy();
	}
	pickObjectAsync(e) {
		return this._pickClosestObjectAsync(e);
	}
	pickObjectsAsync(e) {
		return this._pickVisibleObjectsAsync(e);
	}
	pickObject(e) {
		return this._pickClosestObject(e);
	}
	pickObjects(e) {
		return this._pickVisibleObjects(e);
	}
	getLastPickedObject({ x: e, y: t, layers: n, viewports: r }, i = this.lastPickedInfo.info) {
		let a = i && i.layer && i.layer.id, o = i && i.viewport && i.viewport.id, s = a ? n.find((e) => e.id === a) : null, c = o && r.find((e) => e.id === o) || r[0], l = {
			x: e,
			y: t,
			viewport: c,
			coordinate: c && c.unproject([e - c.x, t - c.y]),
			layer: s
		};
		return {
			...i,
			...l
		};
	}
	_resizeBuffer(e = this.device.getDefaultCanvasContext()) {
		if (!this.pickingFBO) {
			let e = this.device.createTexture({
				format: "rgba8unorm",
				width: 1,
				height: 1,
				usage: F.RENDER_ATTACHMENT | F.COPY_SRC
			});
			if (this.pickingFBO = this.device.createFramebuffer({
				colorAttachments: [e],
				depthStencilAttachment: "depth16unorm"
			}), this.device.isTextureFormatRenderable("rgba32float")) {
				let e = this.device.createTexture({
					format: "rgba32float",
					width: 1,
					height: 1,
					usage: F.RENDER_ATTACHMENT | F.COPY_SRC
				}), t = this.device.createFramebuffer({
					colorAttachments: [e],
					depthStencilAttachment: "depth16unorm"
				});
				this.depthFBO = t;
			}
		}
		let [t, n] = e.getDrawingBufferSize();
		this.pickingFBO?.resize({
			width: t,
			height: n
		}), this.depthFBO?.resize({
			width: t,
			height: n
		});
	}
	_getPickable(e) {
		if (this._pickable === !1) return null;
		let t = e.filter((e) => this.pickLayersPass.shouldDrawLayer(e) && !e.isComposite);
		return t.length ? t : null;
	}
	async _pickClosestObjectAsync({ layers: e, views: t, viewports: n, x: r, y: i, radius: a = 0, depth: o = 1, mode: s = "query", unproject3D: c, canvasContext: l = this.device.getDefaultCanvasContext(), onViewportActive: u, effects: d }) {
		let f = l.cssToDeviceRatio(), p = this._getPickable(e);
		if (!p || n.length === 0) return {
			result: [],
			emptyInfo: JE({
				viewports: n,
				x: r,
				y: i,
				pixelRatio: f
			})
		};
		this._resizeBuffer(l);
		let m = l.cssToDevicePixels([r, i], !0), h = [m.x + Math.floor(m.width / 2), m.y + Math.floor(m.height / 2)], g = Math.round(a * f), { width: _, height: v } = this.pickingFBO, y = this._getPickingRect({
			deviceX: h[0],
			deviceY: h[1],
			deviceRadius: g,
			deviceWidth: _,
			deviceHeight: v
		}), b = {
			x: r - a,
			y: i - a,
			width: a * 2 + 1,
			height: a * 2 + 1
		}, x, S = [], C = /* @__PURE__ */ new Set();
		for (let e = 0; e < o; e++) {
			let a;
			a = y ? KE({
				...await this._drawAndSampleAsync({
					layers: p,
					views: t,
					viewports: n,
					onViewportActive: u,
					deviceRect: y,
					cullRect: b,
					effects: d,
					pass: `picking:${s}`,
					canvasContext: l
				}),
				deviceX: h[0],
				deviceY: h[1],
				deviceRadius: g,
				deviceRect: y
			}) : {
				pickedColor: null,
				pickedObjectIndex: -1
			};
			let m, _ = this._getDepthLayers(a, p, c);
			if (_.length > 0) {
				let { pickedColors: e } = await this._drawAndSampleAsync({
					layers: _,
					views: t,
					viewports: n,
					onViewportActive: u,
					deviceRect: {
						x: a.pickedX ?? h[0],
						y: a.pickedY ?? h[1],
						width: 1,
						height: 1
					},
					cullRect: b,
					effects: d,
					pass: `picking:${s}:z`,
					canvasContext: l
				}, !0);
				e[3] && (m = e[0]);
			}
			a.pickedLayer && e + 1 < o && (C.add(a.pickedLayer), a.pickedLayer.disablePickingIndex(a.pickedObjectIndex)), x = YE({
				pickInfo: a,
				lastPickedInfo: this.lastPickedInfo,
				mode: s,
				layers: p,
				viewports: n,
				x: r,
				y: i,
				z: m,
				pixelRatio: f
			});
			for (let e of x.values()) e.layer && S.push(e);
			if (!a.pickedColor) break;
		}
		for (let e of C) e.restorePickingColors();
		return {
			result: S,
			emptyInfo: x.get(null)
		};
	}
	_pickClosestObject({ layers: e, views: t, viewports: n, x: r, y: i, radius: a = 0, depth: o = 1, mode: s = "query", unproject3D: c, canvasContext: l = this.device.getDefaultCanvasContext(), onViewportActive: u, effects: d }) {
		let f = l.cssToDeviceRatio(), p = this._getPickable(e);
		if (!p || n.length === 0) return {
			result: [],
			emptyInfo: JE({
				viewports: n,
				x: r,
				y: i,
				pixelRatio: f
			})
		};
		this._resizeBuffer(l);
		let m = l.cssToDevicePixels([r, i], !0), h = [m.x + Math.floor(m.width / 2), m.y + Math.floor(m.height / 2)], g = Math.round(a * f), { width: _, height: v } = this.pickingFBO, y = this._getPickingRect({
			deviceX: h[0],
			deviceY: h[1],
			deviceRadius: g,
			deviceWidth: _,
			deviceHeight: v
		}), b = {
			x: r - a,
			y: i - a,
			width: a * 2 + 1,
			height: a * 2 + 1
		}, x, S = [], C = /* @__PURE__ */ new Set();
		for (let e = 0; e < o; e++) {
			let a;
			a = y ? KE({
				...this._drawAndSample({
					layers: p,
					views: t,
					viewports: n,
					onViewportActive: u,
					deviceRect: y,
					cullRect: b,
					effects: d,
					pass: `picking:${s}`,
					canvasContext: l
				}),
				deviceX: h[0],
				deviceY: h[1],
				deviceRadius: g,
				deviceRect: y
			}) : {
				pickedColor: null,
				pickedObjectIndex: -1
			};
			let m, _ = this._getDepthLayers(a, p, c);
			if (_.length > 0) {
				let { pickedColors: e } = this._drawAndSample({
					layers: _,
					views: t,
					viewports: n,
					onViewportActive: u,
					deviceRect: {
						x: a.pickedX ?? h[0],
						y: a.pickedY ?? h[1],
						width: 1,
						height: 1
					},
					cullRect: b,
					effects: d,
					pass: `picking:${s}:z`,
					canvasContext: l
				}, !0);
				e[3] && (m = e[0]);
			}
			a.pickedLayer && e + 1 < o && (C.add(a.pickedLayer), a.pickedLayer.disablePickingIndex(a.pickedObjectIndex)), x = YE({
				pickInfo: a,
				lastPickedInfo: this.lastPickedInfo,
				mode: s,
				layers: p,
				viewports: n,
				x: r,
				y: i,
				z: m,
				pixelRatio: f
			});
			for (let e of x.values()) e.layer && S.push(e);
			if (!a.pickedColor) break;
		}
		for (let e of C) e.restorePickingColors();
		return {
			result: S,
			emptyInfo: x.get(null)
		};
	}
	async _pickVisibleObjectsAsync({ layers: e, views: t, viewports: n, x: r, y: i, width: a = 1, height: o = 1, mode: s = "query", maxObjects: c = null, canvasContext: l = this.device.getDefaultCanvasContext(), onViewportActive: u, effects: d }) {
		let f = this._getPickable(e);
		if (!f || n.length === 0) return [];
		this._resizeBuffer(l);
		let p = l.cssToDeviceRatio(), m = l.cssToDevicePixels([r, i], !0), h = m.x, g = m.y + m.height, _ = l.cssToDevicePixels([r + a, i + o], !0), v = _.x + _.width, y = _.y, b = {
			x: h,
			y,
			width: v - h,
			height: g - y
		}, x = qE(await this._drawAndSampleAsync({
			layers: f,
			views: t,
			viewports: n,
			onViewportActive: u,
			deviceRect: b,
			cullRect: {
				x: r,
				y: i,
				width: a,
				height: o
			},
			effects: d,
			pass: `picking:${s}`,
			canvasContext: l
		})), S = /* @__PURE__ */ new Map(), C = [], w = Number.isFinite(c);
		for (let e = 0; e < x.length && !(w && C.length >= c); e++) {
			let t = x[e], n = {
				color: t.pickedColor,
				layer: null,
				index: t.pickedObjectIndex,
				picked: !0,
				x: r,
				y: i,
				pixelRatio: p
			};
			n = XE({
				layer: t.pickedLayer,
				info: n,
				mode: s
			});
			let a = n.layer.id;
			S.has(a) || S.set(a, /* @__PURE__ */ new Set());
			let o = S.get(a), c = n.object ?? n.index;
			o.has(c) || (o.add(c), C.push(n));
		}
		return C;
	}
	_pickVisibleObjects({ layers: e, views: t, viewports: n, x: r, y: i, width: a = 1, height: o = 1, mode: s = "query", maxObjects: c = null, canvasContext: l = this.device.getDefaultCanvasContext(), onViewportActive: u, effects: d }) {
		let f = this._getPickable(e);
		if (!f || n.length === 0) return [];
		this._resizeBuffer(l);
		let p = l.cssToDeviceRatio(), m = l.cssToDevicePixels([r, i], !0), h = m.x, g = m.y + m.height, _ = l.cssToDevicePixels([r + a, i + o], !0), v = _.x + _.width, y = _.y, b = {
			x: h,
			y,
			width: v - h,
			height: g - y
		}, x = qE(this._drawAndSample({
			layers: f,
			views: t,
			viewports: n,
			onViewportActive: u,
			deviceRect: b,
			cullRect: {
				x: r,
				y: i,
				width: a,
				height: o
			},
			effects: d,
			pass: `picking:${s}`,
			canvasContext: l
		})), S = /* @__PURE__ */ new Map(), C = [], w = Number.isFinite(c);
		for (let e = 0; e < x.length && !(w && C.length >= c); e++) {
			let t = x[e], n = {
				color: t.pickedColor,
				layer: null,
				index: t.pickedObjectIndex,
				picked: !0,
				x: r,
				y: i,
				pixelRatio: p
			};
			n = XE({
				layer: t.pickedLayer,
				info: n,
				mode: s
			});
			let a = n.layer.id;
			S.has(a) || S.set(a, /* @__PURE__ */ new Set());
			let o = S.get(a), c = n.object ?? n.index;
			o.has(c) || (o.add(c), C.push(n));
		}
		return C;
	}
	async _drawAndSampleAsync({ layers: e, views: t, viewports: n, onViewportActive: r, deviceRect: i, cullRect: a, effects: o, pass: s, canvasContext: c }, l = !1) {
		let u = l ? this.depthFBO : this.pickingFBO, d = {
			layers: e,
			layerFilter: this.layerFilter,
			views: t,
			viewports: n,
			onViewportActive: r,
			pickingFBO: u,
			deviceRect: i,
			cullRect: a,
			effects: o,
			pass: s,
			canvasContext: c,
			pickZ: l,
			preRenderStats: {},
			isPicking: !0
		};
		for (let e of o) e.useInPicking && (d.preRenderStats[e.id] = e.preRender(d));
		let { decodePickingColor: f, stats: p } = this.pickLayersPass.render(d);
		this._updateStats(p);
		let { x: m, y: h, width: g, height: _ } = i, v = u.colorAttachments[0]?.texture;
		if (!v) throw Error("Picking framebuffer color attachment is missing");
		let y = await this._readTextureDataAsync(v, {
			x: m,
			y: h,
			width: g,
			height: _
		}, l ? Float32Array : Uint8Array);
		if (!l) {
			let e = !1;
			for (let t = 3; t < y.length; t += 4) if (y[t] !== 0) {
				e = !0;
				break;
			}
			!e && y.length > 0 && B.warn("Async pick readback returned only zero alpha values", {
				deviceRect: i,
				bytes: Array.from(y.subarray(0, Math.min(y.length, 16)))
			})();
		}
		return {
			pickedColors: y,
			decodePickingColor: f
		};
	}
	async _readTextureDataAsync(e, t, n) {
		let { width: r, height: i } = t, a = e.computeMemoryLayout(t), o = this.device.createBuffer({
			byteLength: a.byteLength,
			usage: j.COPY_DST | j.MAP_READ
		});
		try {
			e.readBuffer(t, o);
			let s = await o.readAsync(0, a.byteLength), c = n.BYTES_PER_ELEMENT;
			if (a.bytesPerRow % c !== 0) throw Error(`Texture readback row stride ${a.bytesPerRow} is not aligned to ${c}-byte elements.`);
			let l = new n(s.buffer, s.byteOffset, a.byteLength / c), u = r * 4, d = a.bytesPerRow / c;
			if (d < u) throw Error(`Texture readback row stride ${d} is smaller than packed row length ${u}.`);
			let f = new n(r * i * 4);
			for (let e = 0; e < i; e++) {
				let t = e * d;
				f.set(l.subarray(t, t + u), e * u);
			}
			return f;
		} finally {
			o.destroy();
		}
	}
	_drawAndSample({ layers: e, views: t, viewports: n, onViewportActive: r, deviceRect: i, cullRect: a, effects: o, pass: s, canvasContext: c }, l = !1) {
		let u = l ? this.depthFBO : this.pickingFBO, d = {
			layers: e,
			layerFilter: this.layerFilter,
			views: t,
			viewports: n,
			onViewportActive: r,
			pickingFBO: u,
			deviceRect: i,
			cullRect: a,
			effects: o,
			pass: s,
			canvasContext: c,
			pickZ: l,
			preRenderStats: {},
			isPicking: !0
		};
		for (let e of o) e.useInPicking && (d.preRenderStats[e.id] = e.preRender(d));
		let { decodePickingColor: f, stats: p } = this.pickLayersPass.render(d);
		this._updateStats(p);
		let { x: m, y: h, width: g, height: _ } = i, v = new (l ? Float32Array : Uint8Array)(g * _ * 4);
		return this.device.readPixelsToArrayWebGL(u, {
			sourceX: m,
			sourceY: h,
			sourceWidth: g,
			sourceHeight: _,
			target: v
		}), {
			pickedColors: v,
			decodePickingColor: f
		};
	}
	_updateStats(e) {
		if (!this.stats) return;
		let t = 0;
		for (let { visibleCount: n } of e) t += n;
		this.stats.get("Layers picked").addCount(t);
	}
	_getDepthLayers(e, t, n) {
		if (!n || !this.depthFBO) return [];
		let { pickedLayer: r } = e, i = r?.state?.terrainDrawMode === "drape";
		return r && !i ? [r] : t.filter((e) => e.props.operation.includes("terrain"));
	}
	_getPickingRect({ deviceX: e, deviceY: t, deviceRadius: n, deviceWidth: r, deviceHeight: i }) {
		let a = Math.max(0, e - n), o = Math.max(0, t - n), s = Math.min(r, e + n + 1) - a, c = Math.min(i, t + n + 1) - o;
		return s <= 0 || c <= 0 ? null : {
			x: a,
			y: o,
			width: s,
			height: c
		};
	}
}, $E = {
	"top-left": {
		top: 0,
		left: 0
	},
	"top-right": {
		top: 0,
		right: 0
	},
	"bottom-left": {
		bottom: 0,
		left: 0
	},
	"bottom-right": {
		bottom: 0,
		right: 0
	},
	fill: {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
}, eD = "top-left", tD = "root", nD = class {
	constructor({ deck: e, parentElement: t }) {
		this.defaultWidgets = [], this.widgets = [], this.resolvedWidgets = [], this.containers = {}, this.lastViewports = {}, this.deck = e, t?.classList.add("deck-widget-container"), this.parentElement = t;
	}
	getWidgets() {
		return this.resolvedWidgets;
	}
	setProps(e) {
		if (e.widgets && !WT(e.widgets, this.widgets, 1)) {
			let t = e.widgets.filter(Boolean);
			this._setWidgets(t);
		}
	}
	finalize() {
		for (let e of this.getWidgets()) this._removeWidget(e);
		this.defaultWidgets.length = 0, this.resolvedWidgets.length = 0;
		for (let e in this.containers) this.containers[e].remove();
	}
	addDefault(e) {
		this.defaultWidgets.find((t) => t.id === e.id) || (this._addWidget(e), this.defaultWidgets.push(e), this._setWidgets(this.widgets));
	}
	onRedraw({ viewports: e, layers: t }) {
		let n = e.reduce((e, t) => (e[t.id] = t, e), {});
		for (let r of this.getWidgets()) {
			let { viewId: i } = r;
			if (i) {
				let e = n[i];
				e && (r.onViewportChange && r.onViewportChange(e), r.onRedraw?.({
					viewports: [e],
					layers: t
				}));
			} else {
				if (r.onViewportChange) for (let t of e) r.onViewportChange(t);
				r.onRedraw?.({
					viewports: e,
					layers: t
				});
			}
		}
		this.lastViewports = n, this._updateContainers();
	}
	onHover(e, t) {
		for (let n of this.getWidgets()) {
			let { viewId: r } = n;
			(!r || r === e.viewport?.id) && n.onHover?.(e, t);
		}
	}
	getCanvasBounds(e) {
		let t = (this.deck?.getCanvas?.())?.getBoundingClientRect(), n = this.parentElement?.getBoundingClientRect(), r = this.deck?.getCanvasContext?.(e?.id);
		if (r && n) {
			r.updatePosition();
			let [e, t] = r.getPosition(), [i, a] = r.getCSSSize();
			return {
				x: e - n.left,
				y: t - n.top,
				width: i,
				height: a
			};
		}
		return {
			x: t && n ? t.left - n.left : 0,
			y: t && n ? t.top - n.top : 0,
			width: t?.width || this.deck?.width || 0,
			height: t?.height || this.deck?.height || 0
		};
	}
	onEvent(e, t) {
		let n = gx[t.type];
		if (n) for (let r of this.getWidgets()) {
			let { viewId: i } = r;
			(!i || i === e.viewport?.id) && r[n]?.(e, t);
		}
	}
	_setWidgets(e) {
		let t = {};
		for (let e of this.resolvedWidgets) t[e.id] = e;
		this.resolvedWidgets.length = 0;
		for (let e of this.defaultWidgets) t[e.id] = null, this.resolvedWidgets.push(e);
		for (let n of e) {
			let e = t[n.id];
			e ? e.viewId !== n.viewId || e.placement !== n.placement ? (this._removeWidget(e), this._addWidget(n)) : n !== e && (e.setProps(n.props), n = e) : this._addWidget(n), t[n.id] = null, this.resolvedWidgets.push(n);
		}
		for (let e in t) {
			let n = t[e];
			n && this._removeWidget(n);
		}
		this.widgets = e;
	}
	_addWidget(e) {
		let { viewId: t = null, placement: n = eD } = e, r = e.props._container ?? t;
		e.widgetManager = this, e.deck = this.deck, e.rootElement = e._onAdd({
			deck: this.deck,
			viewId: t
		}), e.rootElement && this._getContainer(r, n).append(e.rootElement), e.updateHTML();
	}
	_removeWidget(e) {
		e.onRemove?.(), e.rootElement && e.rootElement.remove(), e.rootElement = void 0, e.deck = void 0, e.widgetManager = void 0;
	}
	_getContainer(e, t) {
		if (e && typeof e != "string") return e;
		let n = e || tD, r = this.containers[n];
		r || (r = document.createElement("div"), r.style.pointerEvents = "none", r.style.position = "absolute", r.style.overflow = "hidden", this.parentElement?.append(r), this.containers[n] = r);
		let i = r.querySelector(`.${t}`);
		return i || (i = globalThis.document.createElement("div"), i.className = t, i.style.position = "absolute", i.style.zIndex = "2", Object.assign(i.style, $E[t]), r.append(i)), i;
	}
	_updateContainers() {
		for (let e in this.containers) {
			let t = this.lastViewports[e] || null, n = e === tD || t, r = this.containers[e];
			if (n) {
				let e = this._getContainerBounds(t);
				r.style.display = "block", r.style.left = `${e.x}px`, r.style.top = `${e.y}px`, r.style.width = `${e.width}px`, r.style.height = `${e.height}px`;
			} else r.style.display = "none";
		}
	}
	_getContainerBounds(e) {
		if (!e) return {
			x: 0,
			y: 0,
			width: this.parentElement?.clientWidth || this.deck.width,
			height: this.parentElement?.clientHeight || this.deck.height
		};
		let t = this.getCanvasBounds(e);
		return {
			x: t.x + e.x,
			y: t.y + e.y,
			width: e.width,
			height: e.height
		};
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/apply-styles.js
function rD(e, t) {
	t && Object.entries(t).map(([t, n]) => {
		t.startsWith("--") ? e.style.setProperty(t, n) : e.style[t] = n;
	});
}
function iD(e, t) {
	t && Object.keys(t).map((t) => {
		t.startsWith("--") ? e.style.removeProperty(t) : e.style[t] = "";
	});
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/widget.js
var aD = class {
	constructor(e) {
		this.viewId = null, this.props = {
			...this.constructor.defaultProps,
			...e
		}, this.id = this.props.id;
	}
	setProps(e) {
		let t = this.props, n = this.rootElement;
		n && t.className !== e.className && (t.className && n.classList.remove(t.className), e.className && n.classList.add(e.className)), n && !WT(t.style, e.style, 1) && (iD(n, t.style), rD(n, e.style)), Object.assign(this.props, e), this.updateHTML();
	}
	updateHTML() {
		this.rootElement && this.onRenderHTML(this.rootElement);
	}
	get viewIds() {
		return this.viewId ? [this.viewId] : this.deck?.getViews().map((e) => e.id) ?? [];
	}
	getViewState(e) {
		return this.deck?.viewManager?.getViewState(e) || {};
	}
	setViewState(e, t) {
		this.deck?._onViewStateChange({
			viewId: e,
			viewState: t,
			interactionState: {}
		});
	}
	onCreateRootElement() {
		let e = [
			"deck-widget",
			this.className,
			this.props.className
		], t = document.createElement("div");
		return e.filter((e) => typeof e == "string" && e.length > 0).forEach((e) => t.classList.add(e)), rD(t, this.props.style), t;
	}
	_onAdd(e) {
		return this.onAdd(e) ?? this.onCreateRootElement();
	}
	onAdd(e) {}
	onRemove() {}
	onViewportChange(e) {}
	onRedraw(e) {}
	onHover(e, t) {}
	onClick(e, t) {}
	onDrag(e, t) {}
	onDragStart(e, t) {}
	onDragEnd(e, t) {}
};
aD.defaultProps = {
	id: "widget",
	style: {},
	_container: null,
	className: ""
};
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/tooltip-widget.js
var oD = {
	zIndex: "1",
	position: "absolute",
	pointerEvents: "none",
	color: "#a0a7b4",
	backgroundColor: "#29323c",
	padding: "10px",
	top: "0",
	left: "0",
	display: "none"
}, sD = class extends aD {
	constructor(e = {}) {
		super(e), this.id = "default-tooltip", this.placement = "fill", this.className = "deck-tooltip", this.isVisible = !1, this.setProps(e);
	}
	onCreateRootElement() {
		let e = document.createElement("div");
		return e.className = this.className, Object.assign(e.style, oD), e;
	}
	onRenderHTML(e) {}
	onViewportChange(e) {
		this.isVisible && e.id === this.lastViewport?.id && !e.equals(this.lastViewport) && this.setTooltip(null), this.lastViewport = e;
	}
	onHover(e) {
		let { deck: t } = this, n = t && t.props.getTooltip;
		if (!n) return;
		let r = n(e), i = this.widgetManager?.getCanvasBounds(e.viewport), a = e.x + (i?.x || 0), o = e.y + (i?.y || 0);
		this.setTooltip(r, a, o);
	}
	setTooltip(e, t, n) {
		let r = this.rootElement;
		if (r) {
			if (typeof e == "string") r.innerText = e;
			else if (e) e.text && (r.innerText = e.text), e.html && (r.innerHTML = e.html), e.className && (r.className = e.className);
			else {
				this.isVisible = !1, r.style.display = "none";
				return;
			}
			this.isVisible = !0, r.style.display = "block", r.style.transform = `translate(${t}px, ${n}px)`, e && typeof e == "object" && "style" in e && Object.assign(r.style, e.style);
		}
	}
};
sD.defaultProps = { ...aD.defaultProps };
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/canvas-manager.js
var cD = class {
	constructor(e) {
		this.targets = {}, this.order = [], this.eventManagers = {}, this._eventRootToCanvasId = /* @__PURE__ */ new WeakMap(), this._createEventManager = e.createEventManager, this._getEventRoot = e.getEventRoot;
	}
	finalize() {
		for (let e of Object.values(this.targets)) e.eventManager.destroy(), e.presentationContext.destroy();
		this.targets = {}, this.order = [], this.eventManagers = {}, this._eventRootToCanvasId = /* @__PURE__ */ new WeakMap();
	}
	syncCanvasEntries(e) {
		let t = this._normalizeCanvasList(e.canvases), n = {}, r = [], i = /* @__PURE__ */ new Map();
		for (let { canvas: e } of t) {
			let t = this._getEventRoot(e);
			i.set(t, (i.get(t) || 0) + 1);
		}
		for (let { id: a, canvas: o } of t) {
			let t = this._getEventRoot(o), s = i.get(t) === 1 ? t : o, c = this.targets[a];
			if (!c || c.device !== e.device || c.canvas !== o || c.eventRoot !== s) {
				c?.eventManager.destroy(), c?.presentationContext.destroy();
				let t = e.device.createPresentationContext({
					id: a,
					canvas: o,
					useDevicePixels: e.useDevicePixels,
					autoResize: !0
				});
				c = {
					id: a,
					device: e.device,
					canvas: o,
					eventRoot: s,
					presentationContext: t,
					eventManager: this._createEventManager(s)
				};
			}
			this._eventRootToCanvasId.set(s, a), this._eventRootToCanvasId.set(o, a), n[a] = c, r.push(a);
		}
		for (let [e, t] of Object.entries(this.targets)) n[e] || (t.eventManager.destroy(), t.presentationContext.destroy());
		this.targets = n, this.order = r;
		let a = Object.fromEntries(Object.entries(n).map(([e, t]) => [e, t.eventManager]));
		this._haveSameEventManagers(a) || (this.eventManagers = a);
	}
	getCanvasIdFromEvent(e) {
		return e ? this._eventRootToCanvasId.get(e) : void 0;
	}
	getTarget(e) {
		return this.targets[e || this.order[0] || "default-canvas"] || null;
	}
	_normalizeCanvasList(e = []) {
		let t = /* @__PURE__ */ new Set();
		return e.map((e, n) => {
			let r, i;
			return typeof e == "string" ? (r = document.getElementById(e), X(r, `Canvas with id ${e} not found`), i = e) : (r = e, i = r.id || `deckgl-canvas-${n}`), X(!t.has(i), `Duplicate canvas id ${i}`), t.add(i), {
				id: i,
				canvas: r
			};
		});
	}
	_haveSameEventManagers(e) {
		let t = Object.keys(e), n = Object.keys(this.eventManagers);
		return t.length === n.length && t.every((t) => e[t] === this.eventManagers[t]);
	}
};
I(), xl(), Y(), je();
function lD() {}
var uD = {
	id: "",
	width: "100%",
	height: "100%",
	style: null,
	viewState: null,
	initialViewState: null,
	pickingRadius: 0,
	pickAsync: "auto",
	layerFilter: null,
	parameters: {},
	parent: null,
	device: null,
	deviceProps: {},
	gl: null,
	canvas: null,
	_canvases: null,
	layers: [],
	effects: [],
	views: null,
	controller: null,
	useDevicePixels: !0,
	touchAction: "none",
	eventRecognizerOptions: {},
	_framebuffer: null,
	_animate: !1,
	_pickable: !0,
	_typedArrayManagerProps: {},
	_customRender: null,
	widgets: [],
	onDeviceInitialized: lD,
	onWebGLInitialized: lD,
	onResize: lD,
	onViewStateChange: lD,
	onInteractionStateChange: lD,
	onBeforeRender: lD,
	onAfterRender: lD,
	onLoad: lD,
	onError: (e) => B.error(e.message, e.cause)(),
	onHover: null,
	onClick: null,
	onDragStart: null,
	onDrag: null,
	onDragEnd: null,
	_onMetrics: null,
	getCursor: ({ isDragging: e }) => e ? "grabbing" : "grab",
	getTooltip: null,
	debug: !1,
	drawPickingColors: !1
}, dD = class {
	constructor(e) {
		this.width = 0, this.height = 0, this.userData = {}, this.device = null, this.canvas = null, this.viewManager = null, this.layerManager = null, this.effectManager = null, this.deckRenderer = null, this.deckPicker = null, this.eventManager = null, this.eventManagers = {}, this.widgetManager = null, this.tooltip = null, this.animationLoop = null, this._canvasContext = null, this._deviceResizeHandler = null, this.cursorState = {
			isHovering: !1,
			isDragging: !1
		}, this.stats = new ke({ id: "deck.gl" }), this.metrics = {
			fps: 0,
			setPropsTime: 0,
			layersCount: 0,
			drawLayersCount: 0,
			updateLayersCount: 0,
			updateAttributesCount: 0,
			updateAttributesTime: 0,
			framesRedrawn: 0,
			pickTime: 0,
			pickCount: 0,
			pickLayersCount: 0,
			gpuTime: 0,
			gpuTimePerFrame: 0,
			cpuTime: 0,
			cpuTimePerFrame: 0,
			bufferMemory: 0,
			textureMemory: 0,
			renderbufferMemory: 0,
			gpuMemory: 0
		}, this._metricsCounter = 0, this._hoverPickSequence = 0, this._pointerDownPickSequence = 0, this._needsRedraw = "Initial render", this._canvasManager = new cD({
			createEventManager: (e) => this._createEventManager(e),
			getEventRoot: (e) => this._getEventRoot(e)
		}), this._ownedCanvas = null, this._pickRequest = {
			mode: "hover",
			x: -1,
			y: -1,
			radius: 0,
			canvasId: void 0,
			event: null,
			unproject3D: !1
		}, this._lastPointerDownInfo = null, this._lastPointerDownInfoPromise = null, this._onPointerMove = (e) => {
			let { _pickRequest: t } = this, n = this._getCanvasIdFromEvent(e);
			if (e.type === "pointerleave") t.x = -1, t.y = -1, t.radius = 0, t.canvasId = n;
			else if (e.leftButton || e.rightButton) return;
			else {
				let r = e.offsetCenter;
				if (!r) return;
				t.x = r.x, t.y = r.y, t.radius = this.props.pickingRadius, t.canvasId = n;
			}
			this.layerManager && (this.layerManager.context.mousePosition = {
				x: t.x,
				y: t.y
			}), t.event = e;
		}, this._onEvent = (e) => {
			let t = gx[e.type], n = e.offsetCenter, r = this._getCanvasIdFromEvent(e);
			if (!t || !n || !this.layerManager) return;
			let i = this.layerManager.getLayers(), a = this._getInternalPickingMode();
			if (a) {
				if (a === "sync") {
					let t = e.type === "click" && this._shouldUnproject3D(i) ? this._getFirstPickedInfo(this._pickPointSync(this._getPointPickOptions(n.x, n.y, {
						unproject3D: !0,
						canvasId: r
					}, i))) : this._getLastPointerDownPickingInfo(n.x, n.y, r, i);
					this._dispatchPickingEvent(t, e);
				} else (this._lastPointerDownInfoPromise || Promise.resolve(this._getLastPointerDownPickingInfo(n.x, n.y, r, i))).then((t) => {
					this._dispatchPickingEvent(t, e);
				}).catch((e) => this.props.onError?.(e));
			}
		}, this._onPointerDown = (e) => {
			let t = e.offsetCenter, n = this._getCanvasIdFromEvent(e);
			if (!t) return;
			let r = this._getInternalPickingMode();
			if (!r) return;
			let i = this.layerManager?.getLayers() || [], a = ++this._pointerDownPickSequence;
			if (r === "sync") {
				let e = this._pickPointSync({
					x: t.x,
					y: t.y,
					canvasId: n,
					radius: this.props.pickingRadius
				}), r = this._getFirstPickedInfo(e);
				this._lastPointerDownInfo = r, this._lastPointerDownInfoPromise = Promise.resolve(r);
				return;
			}
			let o = this._pickPointAsync(this._getPointPickOptions(t.x, t.y, { canvasId: n }, i)).then((e) => this._getFirstPickedInfo(e)).then((e) => (a === this._pointerDownPickSequence && (this._lastPointerDownInfo = e), e)).catch((e) => {
				this.props.onError?.(e);
				let r = this.deckPicker && this.viewManager ? this._getLastPointerDownPickingInfo(t.x, t.y, n, i) : {};
				return a === this._pointerDownPickSequence && (this._lastPointerDownInfo = r), r;
			});
			this._lastPointerDownInfo = null, this._lastPointerDownInfoPromise = o;
		};
		let t = e;
		this.props = {
			...uD,
			...e
		}, e = this.props, this._validateCanvasConfiguration(e), e.viewState && e.initialViewState && B.warn("View state tracking is disabled. Use either `initialViewState` for auto update or `viewState` for manual update.")(), this.viewState = this.props.initialViewState, e.device && (this.device = e.device, this._setDeviceCanvasContext(e.device));
		let n = this.device;
		!n && e.gl && (e.gl instanceof WebGLRenderingContext && B.error("WebGL1 context not supported.")(), n = yl.attach(e.gl, {
			_cacheShaders: !0,
			_cachePipelines: !0,
			...this.props.deviceProps
		})), n ||= this._createDevice(e), this.animationLoop = this._createAnimationLoop(n, e), this.setProps(t), e._typedArrayManagerProps && oC.setOptions(e._typedArrayManagerProps), this.animationLoop.start();
	}
	finalize() {
		this._restoreDeviceResizeHandler(), this.animationLoop?.stop(), this.animationLoop?.destroy(), this.animationLoop = null, this._hoverPickSequence++, this._pointerDownPickSequence++, this._lastPointerDownInfo = null, this._lastPointerDownInfoPromise = null, this.layerManager?.finalize(), this.layerManager = null, this.viewManager?.finalize(), this.viewManager = null, this.effectManager?.finalize(), this.effectManager = null, this.deckRenderer?.finalize(), this.deckRenderer = null, this.deckPicker?.finalize(), this.deckPicker = null, Object.keys(this._canvasManager.targets).length || this.eventManager?.destroy(), this.eventManager = null, this.eventManagers = {}, this.widgetManager?.finalize(), this.widgetManager = null, this._canvasManager.finalize(), this._isMultiCanvasMode() ? this.canvas = null : this.canvas && this.canvas === this._ownedCanvas && (this.canvas.parentElement?.removeChild(this.canvas), this.canvas = null, this._ownedCanvas = null), this._canvasContext = null;
	}
	setProps(e) {
		this.stats.get("setProps Time").timeStart(), "onLayerHover" in e && B.removed("onLayerHover", "onHover")(), "onLayerClick" in e && B.removed("onLayerClick", "onClick")(), e.initialViewState && !WT(this.props.initialViewState, e.initialViewState, 3) && (this.viewState = e.initialViewState), X(!("_canvases" in e) || Array.isArray(e._canvases) === this._isMultiCanvasMode()), Object.assign(this.props, e), this._validateCanvasConfiguration(this.props), this._validateInternalPickingMode(), this.device && this._isMultiCanvasMode() && this._syncCanvasTargets(), this._setCanvasSize(this.props);
		let t = Object.create(this.props);
		if (Object.assign(t, {
			views: this._getViews(),
			width: this.width,
			height: this.height,
			viewState: this._getViewState(),
			eventManagers: this.eventManagers
		}), e.device && e.device.id !== this.device?.id) {
			let t = e.device.getDefaultCanvasContext();
			this.animationLoop?.stop(), !this._isMultiCanvasMode() && this.canvas !== t.canvas && (this.canvas?.remove(), this.eventManager?.destroy(), this.canvas = null), this._setDeviceCanvasContext(e.device), B.log(`recreating animation loop for new device! id=${e.device.id}`)(), this.animationLoop = this._createAnimationLoop(e.device, e), this.animationLoop.start();
		}
		if (this.animationLoop?.setProps(t), e.useDevicePixels !== void 0 && this._canvasContext?.setProps) {
			this._canvasContext.setProps({ useDevicePixels: e.useDevicePixels });
			for (let t of Object.values(this._canvasManager.targets)) t.presentationContext.setProps({ useDevicePixels: e.useDevicePixels });
		}
		this.layerManager && (this.viewManager.setProps(t), this.layerManager.activateViewport(this.getViewports()[0]), this.layerManager.setProps(t), this.effectManager.setProps(t), this.deckRenderer.setProps(t), this.deckPicker.setProps(t), this.widgetManager.setProps(t)), this.stats.get("setProps Time").timeEnd();
	}
	needsRedraw(e = { clearRedrawFlags: !1 }) {
		if (!this.layerManager) return !1;
		if (this.props._animate) return "Deck._animate";
		let t = this._needsRedraw;
		e.clearRedrawFlags && (this._needsRedraw = !1);
		let n = this.viewManager.needsRedraw(e), r = this.layerManager.needsRedraw(e), i = this.effectManager.needsRedraw(e), a = this.deckRenderer.needsRedraw(e);
		return t = t || n || r || i || a, t;
	}
	redraw(e) {
		if (!this.layerManager) return;
		let t = this.needsRedraw({ clearRedrawFlags: !0 });
		t = e || t, t && (this.stats.get("Redraw Count").incrementCount(), this.props._customRender ? this.props._customRender(t) : this._drawLayers(t));
	}
	get isInitialized() {
		return this.viewManager !== null;
	}
	getViews() {
		return X(this.viewManager), this.viewManager.views;
	}
	getView(e) {
		return X(this.viewManager), this.viewManager.getView(e);
	}
	getViewports(e) {
		return X(this.viewManager), this.viewManager.getViewports(e);
	}
	getCanvas() {
		return this.canvas;
	}
	getCanvasContext(e) {
		let t = e ? this.viewManager?.getView(e)?.props.canvasId : void 0;
		return this._getCanvasContext(t);
	}
	getEventManager(e) {
		if (!e || !this.viewManager) return this.eventManager;
		let t = this.viewManager.getCanvasId(e) || "default-canvas";
		return this.eventManagers[t] || this.eventManager;
	}
	async pickObjectAsync(e) {
		let t = (await this._pickAsync("pickObjectAsync", "pickObject Time", e)).result;
		return t.length ? t[0] : null;
	}
	async pickObjectsAsync(e) {
		return await this._pickAsync("pickObjectsAsync", "pickObjects Time", e);
	}
	pickObject(e) {
		let t = this._pick("pickObject", "pickObject Time", e).result;
		return t.length ? t[0] : null;
	}
	pickMultipleObjects(e) {
		return e.depth = e.depth || 10, this._pick("pickObject", "pickMultipleObjects Time", e).result;
	}
	pickObjects(e) {
		return this._pick("pickObjects", "pickObjects Time", e);
	}
	_pickPositionForController(e, t, n) {
		return this._getInternalPickingMode() === "sync" ? this.pickObject({
			x: e,
			y: t,
			radius: 0,
			unproject3D: !0,
			canvasId: n ? this.viewManager?.getCanvasId(n) : void 0
		}) : null;
	}
	_addResources(e, t = !1) {
		for (let n in e) this.layerManager.resourceManager.add({
			resourceId: n,
			data: e[n],
			forceUpdate: t
		});
	}
	_removeResources(e) {
		for (let t of e) this.layerManager.resourceManager.remove(t);
	}
	_addDefaultEffect(e) {
		this.effectManager.addDefaultEffect(e);
	}
	_addDefaultShaderModule(e) {
		this.layerManager.addDefaultShaderModule(e);
	}
	_removeDefaultShaderModule(e) {
		this.layerManager?.removeDefaultShaderModule(e);
	}
	_resolveInternalPickingMode() {
		let { pickAsync: e } = this.props, t = this.device?.type || this.props.deviceProps?.type;
		if (e === "auto") return t === "webgpu" ? "async" : "sync";
		if (e === "sync" && t === "webgpu") throw Error("`pickAsync: \"sync\"` is not supported when Deck is using a WebGPU device.");
		return e;
	}
	_getInternalPickingMode() {
		try {
			return this._resolveInternalPickingMode();
		} catch (e) {
			return this.props.onError?.(e), null;
		}
	}
	_validateInternalPickingMode() {
		this._getInternalPickingMode();
	}
	_getFirstPickedInfo({ result: e, emptyInfo: t }) {
		return e[0] || t;
	}
	_shouldUnproject3D(e = this.layerManager?.getLayers() || []) {
		return e.some((e) => e.props.pickable === "3d");
	}
	_getPointPickOptions(e, t, n = {}, r = this.layerManager?.getLayers() || []) {
		return {
			x: e,
			y: t,
			canvasId: n.canvasId,
			radius: this.props.pickingRadius,
			unproject3D: this._shouldUnproject3D(r),
			...n
		};
	}
	_pickPointSync(e) {
		return this._pick("pickObject", "pickObject Time", e);
	}
	_pickPointAsync(e) {
		return this._pickAsync("pickObjectAsync", "pickObject Time", e);
	}
	_getLastPointerDownPickingInfo(e, t, n, r = this.layerManager?.getLayers() || []) {
		return this.deckPicker.getLastPickedObject({
			x: e,
			y: t,
			layers: r,
			viewports: this.getViewports({
				x: e,
				y: t,
				canvasId: n
			})
		}, this._lastPointerDownInfo);
	}
	_applyHoverCallbacks({ result: e, emptyInfo: t }, n) {
		if (!this.widgetManager) return;
		this.cursorState.isHovering = e.length > 0;
		let r = t, i = !1;
		for (let t of e) r = t, i = t.layer?.onHover(t, n) || i;
		i || (this.props.onHover?.(r, n), this.widgetManager.onHover(r, n));
	}
	_dispatchPickingEvent(e, t) {
		if (!this.layerManager || !this.widgetManager) return;
		let n = gx[t.type];
		if (!n) return;
		let { layer: r } = e, i = r && (r[n] || r.props[n]), a = this.props[n], o = !1;
		i && (o = i.call(r, e, t)), o || (a?.(e, t), this.widgetManager.onEvent(e, t));
	}
	_pickAsync(e, t, n) {
		X(this.deckPicker);
		let { stats: r } = this, i = this._isMultiCanvasMode() ? n.canvasId || this._getDefaultCanvasId() : n.canvasId, a = this._getCanvasContext(i) || void 0;
		r.get("Pick Count").incrementCount(), r.get(t).timeStart(), this._resizeForCanvasTarget(i);
		let o = this.deckPicker[e]({
			layers: this.layerManager.getLayers(n),
			views: this.viewManager.getViews(),
			viewports: this.getViewports({
				...n,
				canvasId: i
			}),
			onViewportActive: this.layerManager.activateViewport,
			effects: this.effectManager.getEffects(),
			...n,
			canvasId: i,
			canvasContext: a
		});
		return r.get(t).timeEnd(), o;
	}
	_pick(e, t, n) {
		X(this.deckPicker);
		let { stats: r } = this, i = this._isMultiCanvasMode() ? n.canvasId || this._getDefaultCanvasId() : n.canvasId, a = this._getCanvasContext(i) || void 0;
		r.get("Pick Count").incrementCount(), r.get(t).timeStart(), this._resizeForCanvasTarget(i);
		let o = this.deckPicker[e]({
			layers: this.layerManager.getLayers(n),
			views: this.viewManager.getViews(),
			viewports: this.getViewports({
				...n,
				canvasId: i
			}),
			onViewportActive: this.layerManager.activateViewport,
			effects: this.effectManager.getEffects(),
			...n,
			canvasId: i,
			canvasContext: a
		});
		return r.get(t).timeEnd(), o;
	}
	_createCanvas(e) {
		let t = e.canvas;
		return typeof t == "string" && (t = document.getElementById(t), X(t)), t ? this._ownedCanvas = null : (t = document.createElement("canvas"), t.id = e.id || "deckgl-overlay", e.width && typeof e.width == "number" && (t.width = e.width), e.height && typeof e.height == "number" && (t.height = e.height), (e.parent || document.body).appendChild(t), this._ownedCanvas = t), Object.assign(t.style, e.style), t;
	}
	_isMultiCanvasMode() {
		return Array.isArray(this.props._canvases);
	}
	_getDefaultCanvasId() {
		return this._canvasManager.order[0] || "default-canvas";
	}
	_validateCanvasConfiguration(e) {
		Array.isArray(e._canvases) && (X(!e.canvas), X(!e.gl), X(!e.device?.canvasContext || e.device.getDefaultCanvasContext().offscreenCanvas));
	}
	_createEventManager(e) {
		let t = new fx(e, {
			touchAction: this.props.touchAction,
			recognizers: Object.keys(_x).map((e) => {
				let [t, n, r, i] = _x[e], a = this.props.eventRecognizerOptions?.[e];
				return {
					recognizer: new t({
						...n,
						...a,
						event: e
					}),
					recognizeWith: r,
					requireFailure: i
				};
			}),
			events: {
				pointerdown: this._onPointerDown,
				pointermove: this._onPointerMove,
				pointerleave: this._onPointerMove
			}
		});
		for (let e in gx) e === "dblclick" ? t.watch(e, this._onEvent) : t.on(e, this._onEvent);
		return t;
	}
	_getEventRoot(e) {
		return e.closest(".deck-events-root") || this.props.parent?.querySelector(".deck-events-root") || e;
	}
	_syncCanvasTargets() {
		if (!this.device || !this._isMultiCanvasMode()) return;
		this._canvasManager.syncCanvasEntries({
			device: this.device,
			canvases: this.props._canvases || [],
			useDevicePixels: this.props.useDevicePixels
		}), this.eventManagers = this._canvasManager.eventManagers;
		let e = this._getDefaultCanvasId();
		this.eventManager = this.eventManagers[e] || null, this.canvas = this._canvasManager.targets[e]?.canvas || null;
	}
	_setCanvasContext(e) {
		this._canvasContext = e, "style" in e.canvas && (this.canvas = e.canvas);
	}
	_setDeviceCanvasContext(e, t = {}) {
		let n = e.getDefaultCanvasContext();
		this._setCanvasContext(n), this._setDeviceResizeHandler(e, t);
	}
	_setDeviceResizeHandler(e, t = {}) {
		let n = !!t.syncDrawingBuffer;
		if (this._deviceResizeHandler?.device === e) {
			this._deviceResizeHandler.syncDrawingBuffer = n;
			return;
		}
		this._restoreDeviceResizeHandler();
		let r = (e) => {
			this._isMultiCanvasMode() ? this._updateMultiCanvasDimensions() : e === this._canvasContext && this._canvasContext && this._onCanvasContextResize(this._canvasContext, { syncDrawingBuffer: this._deviceResizeHandler?.syncDrawingBuffer });
		};
		e.props.onResize = r, this._deviceResizeHandler = {
			device: e,
			onResize: r,
			syncDrawingBuffer: n
		};
	}
	_restoreDeviceResizeHandler() {
		let e = this._deviceResizeHandler;
		e && e.device.props?.onResize === e.onResize && (e.device.props.onResize = lD), this._deviceResizeHandler = null;
	}
	_setCanvasSize(e) {
		if (this._isMultiCanvasMode() || !this.canvas) return;
		let { width: t, height: n } = e;
		if (t || t === 0) {
			let e = Number.isFinite(t) ? `${t}px` : t;
			this.canvas.style.width = e;
		}
		if (n || n === 0) {
			let t = Number.isFinite(n) ? `${n}px` : n;
			this.canvas.style.position = e.style?.position || "absolute", this.canvas.style.height = t;
		}
	}
	_getCanvasIdFromEvent(e) {
		return this._canvasManager.getCanvasIdFromEvent(e?.rootElement);
	}
	_getCanvasContext(e) {
		return this._canvasManager.getTarget(e)?.presentationContext || this._canvasContext;
	}
	_resizeForCanvasTarget(e) {
		let t = this._canvasManager.getTarget(e);
		if (!t || !this.device?.canvasContext) return;
		let [n, r] = t.presentationContext.getDrawingBufferSize();
		this.device.canvasContext.setDrawingBufferSize(n, r);
	}
	_createDeviceCanvas(e) {
		if (this._isMultiCanvasMode()) {
			let t = globalThis.OffscreenCanvas;
			if (!t) throw Error("`_canvases` requires OffscreenCanvas support.");
			return new t(typeof e.width == "number" && Number.isFinite(e.width) ? e.width : 1, typeof e.height == "number" && Number.isFinite(e.height) ? e.height : 1);
		}
		return this._createCanvas(e);
	}
	_updateCanvasSize(e = this._canvasContext) {
		if (this._isMultiCanvasMode()) {
			this._updateMultiCanvasDimensions();
			return;
		}
		let { canvas: t } = this, [n, r] = e ? e.getCSSSize() : [t?.clientWidth ?? t?.width ?? 0, t?.clientHeight ?? t?.height ?? 0];
		(n !== this.width || r !== this.height) && (this.width = n, this.height = r, this.viewManager?.setProps({
			width: n,
			height: r
		}), this.layerManager?.activateViewport(this.getViewports()[0]), this.props.onResize({
			width: n,
			height: r
		}, e || void 0));
	}
	_onCanvasContextResize(e, t = {}) {
		if (t.syncDrawingBuffer) {
			let { width: t, height: n } = e.canvas;
			e.setDrawingBufferSize(t, n);
		}
		this._needsRedraw = "Canvas resized", this._updateCanvasSize(e);
	}
	_updateMultiCanvasDimensions() {
		let [e, t] = this._getCanvasContext()?.getCSSSize() || [0, 0];
		(e !== this.width || t !== this.height) && (this.width = e, this.height = t, this.props.onResize({
			width: e,
			height: t
		})), this._needsRedraw = "Canvas resized", this.viewManager?.setNeedsUpdate("Canvas resized"), this.viewManager?.setProps({
			width: this.width,
			height: this.height
		});
	}
	_createAnimationLoop(e, t) {
		let { gl: n, onError: r } = t;
		return new QC({
			device: e,
			autoResizeDrawingBuffer: !n && !Array.isArray(t._canvases),
			autoResizeViewport: !1,
			onInitialize: (e) => this._setDevice(e.device),
			onRender: this._onRenderFrame.bind(this),
			onError: r
		});
	}
	_createDevice(e) {
		let t = this.props.deviceProps?.createCanvasContext, n = typeof t == "object" ? t : void 0, r = {
			adapters: [],
			_cacheShaders: !0,
			_cachePipelines: !0,
			...e.deviceProps
		};
		r.adapters.includes(yl) || r.adapters.push(yl);
		let i = { alphaMode: this.props.deviceProps?.type === "webgpu" ? "premultiplied" : void 0 };
		return Ue.createDevice({
			_reuseDevices: !0,
			type: "webgl",
			...r,
			createCanvasContext: {
				...i,
				...n,
				canvas: this._createDeviceCanvas(e),
				useDevicePixels: this.props.useDevicePixels,
				autoResize: !0
			}
		});
	}
	_getViewState() {
		return this.props.viewState || this.viewState;
	}
	_getViews() {
		let { views: e } = this.props, t = Array.isArray(e) ? e : e ? [e] : [new RE({ id: "default-view" })];
		return t.length && this.props.controller && (t[0] = t[0].clone({ controller: this.props.controller })), t;
	}
	_onContextLost() {
		let { onError: e } = this.props;
		this.animationLoop && e && e(/* @__PURE__ */ Error("WebGL context is lost"));
	}
	_pickAndCallback() {
		let { _pickRequest: e } = this;
		if (e.event) {
			let t = e.event, n = this.layerManager?.getLayers() || [], r = this._getPointPickOptions(e.x, e.y, {
				canvasId: e.canvasId,
				radius: e.radius,
				mode: e.mode
			}, n), i = this._getInternalPickingMode(), a = ++this._hoverPickSequence;
			if (e.event = null, e.canvasId = void 0, !i) return;
			if (i === "sync") {
				this._applyHoverCallbacks(this._pickPointSync(r), t);
				return;
			}
			this._pickPointAsync(r).then(({ result: e, emptyInfo: n }) => {
				a === this._hoverPickSequence && this._applyHoverCallbacks({
					result: e,
					emptyInfo: n
				}, t);
			}).catch((e) => this.props.onError?.(e));
		}
	}
	_updateCursor() {
		let e = this.props.getCursor(this.cursorState);
		if (this._isMultiCanvasMode()) {
			for (let t of Object.values(this._canvasManager.targets)) t.canvas.style.cursor = e;
			return;
		}
		let t = this.props.parent || this.canvas;
		t && (t.style.cursor = e);
	}
	_setDevice(e) {
		if (this.device = e, this._validateInternalPickingMode(), !this.animationLoop) return;
		this._setDeviceCanvasContext(e, { syncDrawingBuffer: !!(this.props.gl && this.props.device !== e) }), this._isMultiCanvasMode() ? this._syncCanvasTargets() : this.canvas && !this.canvas.isConnected && this.props.parent && this.props.parent.insertBefore(this.canvas, this.props.parent.firstChild), this.device.type === "webgl" && this.device.setParametersWebGL({
			blend: !0,
			blendFunc: [
				770,
				771,
				1,
				771
			],
			polygonOffsetFill: !0,
			depthTest: !0,
			depthFunc: 515
		}), this.props.onDeviceInitialized(this.device), this.device.type === "webgl" && this.props.onWebGLInitialized(this.device.gl);
		let t = new WC();
		if (t.play(), this.animationLoop.attachTimeline(t), !this._isMultiCanvasMode()) {
			let e = this.canvas && this._getEventRoot(this.canvas);
			X(e), this.eventManager = this._createEventManager(e), this.eventManagers = { [GT]: this.eventManager };
		}
		this.viewManager = new KT({
			timeline: t,
			eventManager: this.eventManager,
			eventManagers: this.eventManagers,
			getCanvasContext: this._isMultiCanvasMode() ? this.getCanvasContext.bind(this) : void 0,
			onViewStateChange: this._onViewStateChange.bind(this),
			onInteractionStateChange: this._onInteractionStateChange.bind(this),
			pickPosition: this._pickPositionForController.bind(this),
			views: this._getViews(),
			viewState: this._getViewState(),
			width: this.width,
			height: this.height
		});
		let n = this.viewManager.getViewports()[0];
		this.layerManager = new UT(this.device, {
			deck: this,
			stats: this.stats,
			viewport: n,
			timeline: t
		}), this.effectManager = new VE({
			deck: this,
			device: this.device
		}), this.deckRenderer = new WE(this.device, { stats: this.stats }), this.deckPicker = new QE(this.device, { stats: this.stats });
		let r = this.props.parent?.querySelector(".deck-widgets-root") || (this._isMultiCanvasMode() ? this.props.parent || this.canvas?.parentElement : null) || this.canvas?.parentElement;
		this.widgetManager = new nD({
			deck: this,
			parentElement: r
		}), this.widgetManager.addDefault(new sD()), this.setProps({}), this._updateCanvasSize(this._canvasContext), this.props.onLoad();
	}
	_drawLayers(e, t) {
		let { device: n, gl: r } = this.layerManager.context;
		this.props.onBeforeRender({
			device: n,
			gl: r
		});
		let i = {
			target: this.props._framebuffer,
			layers: this.layerManager.getLayers(),
			viewports: this.viewManager.getViewports(),
			onViewportActive: this.layerManager.activateViewport,
			views: this.viewManager.getViews(),
			pass: "screen",
			effects: this.effectManager.getEffects(),
			...t
		};
		if (this._isMultiCanvasMode() && i.pass === "screen" && !i.target && this._canvasManager.order.length) for (let e of this._canvasManager.order) {
			let t = i.viewports.filter((t) => this.viewManager.getCanvasId(t.id) === e);
			if (!t.length) {
				let t = this._canvasManager.targets[e];
				this._resizeForCanvasTarget(e), this.deckRenderer?.renderLayers({
					...i,
					canvasContext: t.presentationContext,
					target: t.presentationContext.getCurrentFramebuffer(),
					viewports: [],
					clearCanvas: !0
				}), t.presentationContext.present();
				continue;
			}
			let n = this._canvasManager.targets[e];
			this._resizeForCanvasTarget(e);
			let r = n.presentationContext.getCurrentFramebuffer();
			this.deckRenderer?.renderLayers({
				...i,
				canvasContext: n.presentationContext,
				target: r,
				viewports: t
			}), n.presentationContext.present();
		}
		else this.deckRenderer?.renderLayers(i);
		i.pass === "screen" && this.widgetManager.onRedraw({
			viewports: i.viewports,
			layers: i.layers
		}), this.props.onAfterRender({
			device: n,
			gl: r
		});
	}
	_onRenderFrame() {
		this._getFrameStats(), this._metricsCounter++ % 60 == 0 && (this._getMetrics(), this.stats.reset(), B.table(4, this.metrics)(), this.props._onMetrics && this.props._onMetrics(this.metrics)), this._updateCursor(), this.layerManager.updateLayers(), this._pickAndCallback(), this.redraw(), this.viewManager && this.viewManager.updateViewStates();
	}
	_onViewStateChange(e) {
		let t = this.props.onViewStateChange(e) || e.viewState;
		this.viewState && (this.viewState = {
			...this.viewState,
			[e.viewId]: t
		}, this.props.viewState || this.viewManager && this.viewManager.setProps({ viewState: this.viewState }));
	}
	_onInteractionStateChange(e) {
		this.cursorState.isDragging = e.isDragging || !1, this.props.onInteractionStateChange(e);
	}
	_getFrameStats() {
		let { stats: e } = this;
		e.get("frameRate").timeEnd(), e.get("frameRate").timeStart();
		let t = this.animationLoop.stats;
		e.get("GPU Time").addTime(t.get("GPU Time").lastTiming), e.get("CPU Time").addTime(t.get("CPU Time").lastTiming);
	}
	_getMetrics() {
		let { metrics: e, stats: t } = this;
		e.fps = t.get("frameRate").getHz(), e.setPropsTime = t.get("setProps Time").time, e.updateAttributesTime = t.get("Update Attributes").time, e.framesRedrawn = t.get("Redraw Count").count, e.pickTime = t.get("pickObject Time").time + t.get("pickMultipleObjects Time").time + t.get("pickObjects Time").time, e.pickCount = t.get("Pick Count").count, e.layersCount = this.layerManager?.layers.length ?? 0, e.drawLayersCount = t.get("Layers rendered").lastSampleCount, e.pickLayersCount = t.get("Layers picked").lastSampleCount, e.updateLayersCount = t.get("Layer updates").count, e.updateAttributesCount = t.get("Attributes updated").count, e.gpuTime = t.get("GPU Time").time, e.cpuTime = t.get("CPU Time").time, e.gpuTimePerFrame = t.get("GPU Time").getAverageTime(), e.cpuTimePerFrame = t.get("CPU Time").getAverageTime();
		let n = Ue.stats.get("GPU Time and Memory");
		e.bufferMemory = n.get("Buffer Memory").count, e.textureMemory = n.get("Texture Memory").count, e.renderbufferMemory = n.get("Renderbuffer Memory").count, e.gpuMemory = n.get("GPU Memory").count;
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/attribute/gl-utils.js
dD.defaultProps = uD, dD.VERSION = ip, I();
function fD(e) {
	switch (e) {
		case "float64": return Float64Array;
		case "uint8":
		case "unorm8": return Uint8ClampedArray;
		default: return kt(e);
	}
}
var pD = Nt.getDataType.bind(Nt);
function mD(e, t, n) {
	if (t.size > 4) return null;
	let r = n === "webgpu" && t.type === "uint8" ? "unorm8" : t.type, i = t.size, a = !!(n !== "webgpu" && i === 3 && r && [
		"uint8",
		"sint8",
		"unorm8",
		"snorm8",
		"uint16",
		"sint16",
		"unorm16",
		"snorm16"
	].includes(r));
	return {
		attribute: e,
		format: i > 1 ? `${r}x${i}${a ? "-webgl" : ""}` : t.type,
		byteOffset: t.offset || 0
	};
}
function hD(e) {
	return e.stride || e.size * e.bytesPerElement;
}
function gD(e, t) {
	return e.type === t.type && e.size === t.size && hD(e) === hD(t) && (e.offset || 0) === (t.offset || 0);
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/attribute/data-column.js
I();
function _D(e, t) {
	t.offset && B.removed("shaderAttribute.offset", "vertexOffset, elementOffset")();
	let n = hD(e), r = t.vertexOffset === void 0 ? e.vertexOffset || 0 : t.vertexOffset, i = t.elementOffset || 0, a = r * n + i * e.bytesPerElement + (e.offset || 0);
	return {
		...t,
		offset: a,
		stride: n
	};
}
function vD(e, t) {
	let n = _D(e, t);
	return {
		high: n,
		low: {
			...n,
			offset: n.offset + e.size * 4
		}
	};
}
var yD = class {
	constructor(e, t, n) {
		this._buffer = null, this.device = e, this.id = t.id || "", this.size = t.size || 1;
		let r = t.logicalType || t.type, i = r === "float64", { defaultValue: a } = t;
		a = Number.isFinite(a) ? [a] : a || Array(this.size).fill(0);
		let o;
		o = i ? "float32" : !r && t.isIndexed ? "uint32" : r || "float32";
		let s = fD(r || o);
		this.doublePrecision = i, i && t.fp64 === !1 && (s = Float32Array), this.value = null, this.settings = {
			...t,
			defaultType: s,
			defaultValue: a,
			logicalType: r,
			type: o,
			normalized: o.includes("norm"),
			size: this.size,
			bytesPerElement: s.BYTES_PER_ELEMENT
		}, this.state = {
			...n,
			externalBuffer: null,
			bufferAccessor: this.settings,
			allocatedValue: null,
			numInstances: 0,
			bounds: null,
			constant: !1
		};
	}
	get isConstant() {
		return this.state.constant;
	}
	get buffer() {
		return this._buffer;
	}
	get byteOffset() {
		let e = this.getAccessor();
		return e.vertexOffset ? e.vertexOffset * hD(e) : 0;
	}
	get numInstances() {
		return this.state.numInstances;
	}
	set numInstances(e) {
		this.state.numInstances = e;
	}
	get isDoublePrecisionBuffer() {
		return this._shouldSplitDoublePrecisionValue(this.value);
	}
	delete() {
		this._buffer &&= (this._buffer.delete(), null), oC.release(this.state.allocatedValue), this.state.allocatedValue = null;
	}
	getBuffer() {
		return this.state.constant && this.device.type !== "webgpu" ? null : this.state.externalBuffer || this._buffer;
	}
	getValue(e = this.id, t = null) {
		let n = {};
		if (this.state.constant) {
			let r = this.value;
			if (this.device.type === "webgpu" && this._buffer) n[e] = this._buffer;
			else if (t) {
				let i = _D(this.getAccessor(), t), a = i.offset / r.BYTES_PER_ELEMENT, o = i.size || this.size;
				n[e] = r.subarray(a, a + o);
			} else n[e] = r;
		} else n[e] = this.getBuffer();
		return this.doublePrecision && (this.isDoublePrecisionBuffer ? n[`${e}64Low`] = n[e] : n[`${e}64Low`] = new Float32Array(this.size)), n;
	}
	_getBufferLayout(e = this.id, t = null) {
		let n = this.getAccessor(), r = [], i = {
			name: this.id,
			byteStride: this.device.type === "webgpu" && this.state.constant ? 0 : hD(n)
		};
		if (this.doublePrecision) {
			let i = vD(n, t || {});
			r.push(mD(e, {
				...n,
				...i.high
			}, this.device.type), mD(`${e}64Low`, {
				...n,
				...i.low
			}, this.device.type));
		} else if (t) {
			let i = _D(n, t);
			r.push(mD(e, {
				...n,
				...i
			}, this.device.type));
		} else r.push(mD(e, n, this.device.type));
		return i.attributes = r.filter(Boolean), i;
	}
	setAccessor(e) {
		this.state.bufferAccessor = e;
	}
	getAccessor() {
		return this.state.bufferAccessor;
	}
	getBounds() {
		if (this.state.bounds) return this.state.bounds;
		let e = null;
		if (this.state.constant && this.value) {
			let t = Array.from(this.value);
			e = [t, t];
		} else {
			let { value: t, numInstances: n, size: r } = this, i = n * r;
			if (t && i && t.length >= i) {
				let n = Array(r).fill(Infinity), a = Array(r).fill(-Infinity);
				for (let e = 0; e < i;) for (let i = 0; i < r; i++) {
					let r = t[e++];
					r < n[i] && (n[i] = r), r > a[i] && (a[i] = r);
				}
				e = [n, a];
			}
		}
		return this.state.bounds = e, e;
	}
	setData(e) {
		let { state: t } = this, n;
		n = ArrayBuffer.isView(e) ? { value: e } : e instanceof j ? { buffer: e } : e;
		let r = {
			...this.settings,
			...n
		};
		if (ArrayBuffer.isView(n.value)) {
			if (!n.type) {
				if (this.doublePrecision && n.value instanceof Float64Array) r.type = "float32";
				else {
					let e = pD(n.value);
					r.type = r.normalized ? e.replace("int", "norm") : e;
				}
			}
			r.bytesPerElement = n.value.BYTES_PER_ELEMENT, r.stride = hD(r);
		}
		if (t.bounds = null, n.constant) {
			let e = n.value;
			if (e = this._normalizeValue(e, [], 0), this.settings.normalized && (e = this.normalizeConstant(e)), t.constant && this._areValuesEqual(e, this.value)) return !1;
			t.externalBuffer = null, t.constant = !0, this.value = ArrayBuffer.isView(e) ? e : new Float32Array(e);
		} else if (n.buffer) t.externalBuffer = n.buffer, t.constant = !1, this.value = n.value || null;
		else if (n.value) {
			this._checkExternalBuffer(n);
			let e = n.value, i = e;
			t.externalBuffer = null, t.constant = !1, this.value = e, this._shouldSplitDoublePrecisionValue(i) && (i = hC(i, r), e instanceof Float32Array && (r.stride = r.size * 2 * Float32Array.BYTES_PER_ELEMENT));
			let { buffer: a } = this, o = hD(r), s = (r.vertexOffset || 0) * o;
			if (this.settings.isIndexed) {
				let e = this.settings.defaultType;
				i.constructor !== e && (i = new e(i));
			}
			let c = i.byteLength + s + o * 2;
			(!a || a.byteLength < c) && (a = this._createBuffer(c)), a.write(i, s);
		}
		return this.setAccessor(r), !0;
	}
	updateSubBuffer(e = {}) {
		this.state.bounds = null;
		let t = this.value, { startOffset: n = 0, endOffset: r } = e, i = this._shouldSplitDoublePrecisionValue(t);
		this.buffer.write(i ? hC(t, {
			size: this.size,
			startIndex: n,
			endIndex: r
		}) : t.subarray(n, r), n * (i ? 8 : t.BYTES_PER_ELEMENT) + this.byteOffset);
	}
	allocate(e, t = !1) {
		let { state: n } = this, r = n.allocatedValue, i = oC.allocate(r, e + 1, {
			size: this.size,
			type: this.settings.defaultType,
			copy: t
		});
		this.value = i;
		let a = this._shouldSplitDoublePrecisionValue(i), o = a && i instanceof Float32Array ? {
			...this.settings,
			stride: this.size * 2 * Float32Array.BYTES_PER_ELEMENT
		} : this.settings;
		this.setAccessor(o);
		let { byteOffset: s } = this, { buffer: c } = this, l = i.byteLength * (a && i instanceof Float32Array ? 2 : 1);
		return (!c || c.byteLength < l + s) && (c = this._createBuffer(l + s), t && r && c.write(this._shouldSplitDoublePrecisionValue(r) ? hC(r, this) : r, s)), n.allocatedValue = i, n.constant = !1, n.externalBuffer = null, !0;
	}
	_shouldSplitDoublePrecisionValue(e) {
		return !!(this.doublePrecision && (e instanceof Float64Array || this.device.type === "webgpu" && e instanceof Float32Array));
	}
	_checkExternalBuffer(e) {
		let { value: t } = e;
		if (!ArrayBuffer.isView(t)) throw Error(`Attribute ${this.id} value is not TypedArray`);
		let n = this.settings.defaultType, r = !1;
		if (this.doublePrecision && (r = t.BYTES_PER_ELEMENT < 4), r) throw Error(`Attribute ${this.id} does not support ${t.constructor.name}`);
		!(t instanceof n) && this.settings.normalized && !("normalized" in e) && B.warn(`Attribute ${this.id} is normalized`)();
	}
	normalizeConstant(e) {
		switch (this.settings.type) {
			case "snorm8": return new Float32Array(e).map((e) => (e + 128) / 255 * 2 - 1);
			case "snorm16": return new Float32Array(e).map((e) => (e + 32768) / 65535 * 2 - 1);
			case "unorm8": return new Float32Array(e).map((e) => e / 255);
			case "unorm16": return new Float32Array(e).map((e) => e / 65535);
			default: return e;
		}
	}
	_normalizeValue(e, t, n) {
		let { defaultValue: r, size: i } = this.settings;
		if (Number.isFinite(e)) return t[n] = e, t;
		if (!e) {
			let e = i;
			for (; --e >= 0;) t[n + e] = r[e];
			return t;
		}
		switch (i) {
			case 4: t[n + 3] = Number.isFinite(e[3]) ? e[3] : r[3];
			case 3: t[n + 2] = Number.isFinite(e[2]) ? e[2] : r[2];
			case 2: t[n + 1] = Number.isFinite(e[1]) ? e[1] : r[1];
			case 1:
				t[n + 0] = Number.isFinite(e[0]) ? e[0] : r[0];
				break;
			default:
				let a = i;
				for (; --a >= 0;) t[n + a] = Number.isFinite(e[a]) ? e[a] : r[a];
		}
		return t;
	}
	_areValuesEqual(e, t) {
		if (!e || !t) return !1;
		let { size: n } = this;
		for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
		return !0;
	}
	_createBuffer(e) {
		this._buffer && this._buffer.destroy();
		let { isIndexed: t, type: n } = this.settings, r = this.device.type === "webgpu" && !t ? j.VERTEX | j.STORAGE | j.COPY_DST | j.COPY_SRC : (t ? j.INDEX : j.VERTEX) | j.COPY_DST;
		return this._buffer = this.device.createBuffer({
			...this._buffer?.props,
			id: this.id,
			usage: r,
			indexType: t ? n : void 0,
			byteLength: e
		}), this._buffer;
	}
}, bD = [], xD = [];
function SD(e, t = 0, n = Infinity) {
	let r = bD, i = {
		index: -1,
		data: e,
		target: []
	};
	return e ? typeof e[Symbol.iterator] == "function" ? r = e : e.length > 0 && (xD.length = e.length, r = xD) : r = bD, (t > 0 || Number.isFinite(n)) && (r = (Array.isArray(r) ? r : Array.from(r)).slice(t, n), i.index = t - 1), {
		iterable: r,
		objectInfo: i
	};
}
function CD(e) {
	return e && e[Symbol.asyncIterator];
}
function wD(e, t) {
	let { size: n, stride: r, offset: i, startIndices: a, nested: o } = t, s = e.BYTES_PER_ELEMENT, c = r ? r / s : n, l = i ? i / s : 0, u = Math.floor((e.length - l) / c);
	return (t, { index: r, target: i }) => {
		if (!a) {
			let t = r * c + l;
			for (let r = 0; r < n; r++) i[r] = e[t + r];
			return i;
		}
		let s = a[r], d = a[r + 1] || u, f;
		if (o) {
			f = Array(d - s);
			for (let t = s; t < d; t++) {
				let r = t * c + l;
				i = Array(n);
				for (let t = 0; t < n; t++) i[t] = e[r + t];
				f[t - s] = i;
			}
		} else if (c === n) f = e.subarray(s * n + l, d * n + l);
		else {
			f = new e.constructor((d - s) * n);
			let t = 0;
			for (let r = s; r < d; r++) {
				let i = r * c + l;
				for (let r = 0; r < n; r++) f[t++] = e[i + r];
			}
		}
		return f;
	};
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/range.js
var TD = [], ED = [[0, Infinity]];
function DD(e, t) {
	if (e === ED || (t[0] < 0 && (t[0] = 0), t[0] >= t[1])) return e;
	let n = [], r = e.length, i = 0;
	for (let a = 0; a < r; a++) {
		let r = e[a];
		r[1] < t[0] ? (n.push(r), i = a + 1) : r[0] > t[1] ? n.push(r) : t = [Math.min(r[0], t[0]), Math.max(r[1], t[1])];
	}
	return n.splice(i, 0, t), n;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/attribute/transition-settings.js
var OD = {
	interpolation: {
		duration: 0,
		easing: (e) => e
	},
	spring: {
		stiffness: .05,
		damping: .5
	}
};
function kD(e, t) {
	if (!e) return null;
	Number.isFinite(e) && (e = {
		type: "interpolation",
		duration: e
	});
	let n = e.type || "interpolation";
	return {
		...OD[n],
		...t,
		...e,
		type: n
	};
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/attribute/attribute.js
var AD = class extends yD {
	constructor(e, t) {
		super(e, t, {
			startIndices: null,
			constantValue: null,
			lastExternalBuffer: null,
			binaryValue: null,
			binaryAccessor: null,
			needsUpdate: !0,
			needsRedraw: !1,
			layoutChanged: !1,
			updateRanges: ED
		}), this.constant = !1, this.settings.update = t.update || (t.accessor ? this._autoUpdater : void 0), Object.seal(this.settings), Object.seal(this.state), this._validateAttributeUpdaters();
	}
	get startIndices() {
		return this.state.startIndices;
	}
	set startIndices(e) {
		this.state.startIndices = e;
	}
	needsUpdate() {
		return this.state.needsUpdate;
	}
	needsRedraw({ clearChangedFlags: e = !1 } = {}) {
		let t = this.state.needsRedraw;
		return this.state.needsRedraw = t && !e, t;
	}
	layoutChanged() {
		return this.state.layoutChanged;
	}
	setAccessor(e) {
		var t;
		(t = this.state).layoutChanged || (t.layoutChanged = !gD(e, this.getAccessor())), super.setAccessor(e);
	}
	getUpdateTriggers() {
		let { accessor: e } = this.settings;
		return [this.id].concat(typeof e != "function" && e || []);
	}
	supportsTransition() {
		return !!this.settings.transition;
	}
	getTransitionSetting(e) {
		if (!e || !this.supportsTransition()) return null;
		let { accessor: t } = this.settings, n = this.settings.transition;
		return kD(Array.isArray(t) ? e[t.find((t) => e[t])] : e[t], n);
	}
	setNeedsUpdate(e = this.id, t) {
		if (this.state.needsUpdate = this.state.needsUpdate || e, this.setNeedsRedraw(e), t) {
			let { startRow: e = 0, endRow: n = Infinity } = t;
			this.state.updateRanges = DD(this.state.updateRanges, [e, n]);
		} else this.state.updateRanges = ED;
	}
	clearNeedsUpdate() {
		this.state.needsUpdate = !1, this.state.updateRanges = TD;
	}
	setNeedsRedraw(e = this.id) {
		this.state.needsRedraw = this.state.needsRedraw || e;
	}
	allocate(e) {
		let { state: t, settings: n } = this;
		if (n.noAlloc) return !1;
		if (n.update) {
			let n = this.isConstant;
			return super.allocate(e, t.updateRanges !== ED), t.layoutChanged ||= n && this.device.type === "webgpu", !0;
		}
		return !1;
	}
	updateBuffer({ numInstances: e, data: t, props: n, context: r }) {
		if (!this.needsUpdate()) return !1;
		let { state: { updateRanges: i }, settings: { update: a, noAlloc: o } } = this, s = !0;
		if (a) {
			for (let [o, s] of i) a.call(r, this, {
				data: t,
				startRow: o,
				endRow: s,
				props: n,
				numInstances: e
			});
			if (this.value) {
				if (this.constant || !this.buffer || this.buffer.byteLength < this.value.byteLength + this.byteOffset) {
					if (this.constant) {
						let e = this.value;
						this.value = null, this.setConstantValue(r, e);
					} else this.setData({
						value: this.value,
						constant: this.constant
					});
					this.constant = !1;
				} else for (let [t, n] of i) {
					let r = Number.isFinite(t) ? this.getVertexOffset(t) : 0, i = Number.isFinite(n) ? this.getVertexOffset(n) : o || !Number.isFinite(e) ? this.value.length : e * this.size;
					super.updateSubBuffer({
						startOffset: r,
						endOffset: i
					});
				}
			}
			this._checkAttributeArray();
		} else s = !1;
		return this.clearNeedsUpdate(), this.setNeedsRedraw(), s;
	}
	setConstantValue(e, t) {
		var n;
		if (t === void 0 || typeof t == "function") return !1;
		let r = this.isConstant, i = this.settings.transform && e ? this.settings.transform.call(e, t) : t, a = this.settings.defaultType;
		this.state.constantValue = this._normalizeValue(i, new a(this.size), 0);
		let o = this.setData({
			constant: !0,
			value: i
		});
		if (this.device.type === "webgpu") {
			let e = this.state.constantValue;
			this.doublePrecision && (e instanceof Float32Array || e instanceof Float64Array) && (e = hC(e, { size: this.size }), this.setAccessor({
				...this.getAccessor(),
				stride: this.size * 2 * Float32Array.BYTES_PER_ELEMENT
			}));
			let t = this._buffer;
			(!t || t.byteLength < e.byteLength) && (t = this._createBuffer(e.byteLength)), t.write(e), (n = this.state).layoutChanged || (n.layoutChanged = !r), this.constant = !1;
		}
		return o && this.setNeedsRedraw(), this.clearNeedsUpdate(), !0;
	}
	getConstantValue() {
		return this.isConstant ? this.state.constantValue : null;
	}
	setExternalBuffer(e) {
		let { state: t } = this;
		return e ? (this.clearNeedsUpdate(), t.lastExternalBuffer === e || (t.lastExternalBuffer = e, this.setNeedsRedraw(), this.setData(e)), !0) : (t.lastExternalBuffer = null, !1);
	}
	setBinaryValue(e, t = null) {
		let { state: n, settings: r } = this;
		if (!e) return n.binaryValue = null, n.binaryAccessor = null, !1;
		if (r.noAlloc) return !1;
		if (n.binaryValue === e) return this.clearNeedsUpdate(), !0;
		if (n.binaryValue = e, this.setNeedsRedraw(), r.transform || t !== this.startIndices) {
			ArrayBuffer.isView(e) && (e = { value: e });
			let i = e;
			X(ArrayBuffer.isView(i.value), `invalid ${r.accessor}`);
			let a = !!i.size && i.size !== this.size;
			return n.binaryAccessor = wD(i.value, {
				size: i.size || this.size,
				stride: i.stride,
				offset: i.offset,
				startIndices: t,
				nested: a
			}), !1;
		}
		return this.clearNeedsUpdate(), this.setData(e), !0;
	}
	getVertexOffset(e) {
		let { startIndices: t } = this;
		return (t ? e < t.length ? t[e] : this.numInstances : e) * this.size;
	}
	getValue() {
		let e = this.settings.shaderAttributes, t = super.getValue();
		if (!e) return t;
		for (let n in e) Object.assign(t, super.getValue(n, e[n]));
		return t;
	}
	getBufferLayout(e) {
		this.state.layoutChanged = !1;
		let t = this.settings.shaderAttributes, n = super._getBufferLayout(), { stepMode: r } = this.settings;
		if (n.stepMode = r === "dynamic" ? e ? e.isInstanced ? "instance" : "vertex" : "instance" : r ?? "vertex", !t) return n;
		for (let e in t) {
			let r = super._getBufferLayout(e, t[e]);
			n.attributes.push(...r.attributes);
		}
		return n;
	}
	_autoUpdater(e, { data: t, startRow: n, endRow: r, props: i, numInstances: a }) {
		let { settings: o, state: s, value: c, size: l, startIndices: u } = e, { accessor: d, transform: f } = o, p = s.binaryAccessor || (typeof d == "function" ? d : i[d]);
		X(typeof p == "function", `accessor "${d}" is not a function`);
		let m = e.getVertexOffset(n), { iterable: h, objectInfo: g } = SD(t, n, r);
		for (let t of h) {
			g.index++;
			let n = p(t, g);
			if (f && (n = f.call(this, n)), u) {
				let t = (g.index < u.length - 1 ? u[g.index + 1] : a) - u[g.index];
				if (n && Array.isArray(n[0])) {
					let t = m;
					for (let r of n) e._normalizeValue(r, c, t), t += l;
				} else n && n.length > l ? c.set(n, m) : (e._normalizeValue(n, g.target, 0), RT({
					target: c,
					source: g.target,
					start: m,
					count: t
				}));
				m += t * l;
			} else e._normalizeValue(n, c, m), m += l;
		}
	}
	_validateAttributeUpdaters() {
		let { settings: e } = this;
		if (!(e.noAlloc || typeof e.update == "function")) throw Error(`Attribute ${this.id} missing update or accessor`);
	}
	_checkAttributeArray() {
		let { value: e } = this, t = Math.min(4, this.size);
		if (e && e.length >= t) {
			let n = !0;
			switch (t) {
				case 4: n &&= Number.isFinite(e[3]);
				case 3: n &&= Number.isFinite(e[2]);
				case 2: n &&= Number.isFinite(e[1]);
				case 1:
					n &&= Number.isFinite(e[0]);
					break;
				default: n = !1;
			}
			if (!n) throw Error(`Illegal attribute generated for ${this.id}`);
		}
	}
};
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/gpu-data/gpu-vector-format.js
function jD(e) {
	return LD.test(e);
}
function MD(e) {
	return RD.test(e);
}
function ND(e) {
	let t = LD.exec(e), n = RD.exec(e), r = t?.[1] ?? n?.[1] ?? e;
	try {
		M.getVertexFormatInfo(r);
	} catch {
		throw Error(`Unsupported GPUVector format ${e}`);
	}
	return r;
}
function PD(e) {
	let t = ND(e), n = jD(e), r = MD(e), i = M.getVertexFormatInfo(t), a = i.type, o = i.normalized, s = FD(a, o);
	return {
		format: e,
		elementFormat: t,
		vertexList: n,
		valueList: r,
		type: a,
		signedDataType: ID(t, a),
		primitiveType: s,
		components: i.components,
		byteLength: i.byteLength,
		integer: i.integer,
		signed: i.signed,
		normalized: o,
		...i.webglOnly ? { webglOnly: !0 } : {}
	};
}
function FD(e, t) {
	if (t) return "f32";
	switch (e) {
		case "float32": return "f32";
		case "float16": return "f16";
		case "uint8":
		case "uint16":
		case "uint32": return "u32";
		case "sint8":
		case "sint16":
		case "sint32": return "i32";
		default: throw Error(`Unsupported GPUVector component type ${e}`);
	}
}
function ID(e, t) {
	if (e === "unorm10-10-10-2") return "uint32";
	switch (t) {
		case "unorm8": return "uint8";
		case "snorm8": return "sint8";
		case "unorm16": return "uint16";
		case "snorm16": return "sint16";
		default: return t;
	}
}
var LD, RD, zD = t((() => {
	I(), LD = /^vertex-list<([^<>]+)>$/, RD = /^value-list<([^<>]+)>$/;
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/gpu-data/gpu-data-view.js
function BD(e, t) {
	if (!Number.isSafeInteger(e) || e < 0) throw Error(`${t} must be a non-negative safe integer`);
}
var VD, HD = t((() => {
	I(), VD = class {
		buffer;
		format;
		length;
		byteOffset;
		byteStride;
		constructor(e) {
			let t = M.getVertexFormatInfo(e.format).byteLength, n = e.byteOffset ?? 0, r = e.byteStride ?? t;
			if (BD(e.length, "GPUDataView length"), BD(n, "GPUDataView byteOffset"), BD(r, "GPUDataView byteStride"), r < t) throw Error(`GPUDataView byteStride ${r} is smaller than ${e.format} byte length ${t}`);
			let i = e.length === 0 ? 0 : (e.length - 1) * r + t, a = n + i;
			if (!Number.isSafeInteger(i) || !Number.isSafeInteger(a)) throw Error("GPUDataView byte range must use safe integers");
			if (a > e.buffer.byteLength) throw Error("GPUDataView exceeds its backing buffer byte length");
			this.buffer = e.buffer, this.format = e.format, this.length = e.length, this.byteOffset = n, this.byteStride = r;
		}
		get elementByteLength() {
			return M.getVertexFormatInfo(this.format).byteLength;
		}
		get byteLength() {
			return this.length === 0 ? 0 : (this.length - 1) * this.byteStride + this.elementByteLength;
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/gpu-data/gpu-data-format.js
function UD(e) {
	return !!(e && typeof e == "object" && e.type === "struct");
}
function WD(e, t) {
	let n = Object.entries(e);
	if (n.length === 0) throw Error("GPUData struct format must declare at least one field");
	return t === "packed" ? GD(n) : KD(n);
}
function GD(e) {
	let t = [], n = 0, r = 0;
	for (let [i, a] of e) {
		let e = M.getVertexFormatInfo(a);
		if (e.webglOnly) throw Error(`Packed GPUData struct field "${i}" uses WebGL-only format ${a}`);
		n = YD(n, Math.min(4, e.byteLength)), t.push([i, Object.freeze({
			format: a,
			byteOffset: n,
			byteLength: e.byteLength
		})]), n += e.byteLength, r += e.components;
	}
	return Object.freeze({
		type: "struct",
		layout: "packed",
		fields: Object.freeze(Object.fromEntries(t)),
		components: r,
		byteStride: YD(n, 4),
		rowByteLength: n
	});
}
function KD(e) {
	let t = mi(Object.fromEntries(e.map(([e, t]) => [e, qD(t)])), { layout: "wgsl-storage" }), n = [], r = 0, i = 0;
	for (let [a, o] of e) {
		let e = M.getVertexFormatInfo(o), s = t.fields[a].offset * 4;
		n.push([a, Object.freeze({
			format: o,
			byteOffset: s,
			byteLength: e.byteLength
		})]), r = Math.max(r, s + e.byteLength), i += e.components;
	}
	return Object.freeze({
		type: "struct",
		layout: "wgsl-storage",
		fields: Object.freeze(Object.fromEntries(n)),
		components: i,
		byteStride: t.byteLength,
		rowByteLength: r
	});
}
function qD(e) {
	let t = M.getVertexFormatInfo(e);
	switch (t.type) {
		case "float32": return JD("f32", t.components);
		case "sint32": return JD("i32", t.components);
		case "uint32": return JD("u32", t.components);
		default: return JD("u32", Math.ceil(t.byteLength / 4));
	}
}
function JD(e, t) {
	return t === 1 ? e : `vec${t}<${e}>`;
}
function YD(e, t) {
	return Math.ceil(e / t) * t;
}
var XD = t((() => {
	I();
})), ZD, QD, $D, eO = t((() => {
	HD(), XD(), zD(), ZD = class {
		buffer;
		ownsDataBuffer;
		constructor(e, t) {
			this.buffer = e, this.ownsDataBuffer = t;
		}
		get ownsBuffer() {
			return this.ownsDataBuffer;
		}
		transferBufferOwnership(e) {
			if (e.buffer !== this.buffer) throw Error("GPUData ownership can only be transferred to the same buffer");
			e.ownsDataBuffer = this.ownsDataBuffer, this.ownsDataBuffer = !1;
		}
		destroy() {
			this.ownsDataBuffer &&= (this.buffer.destroy(), !1);
		}
	}, QD = class extends ZD {
		dataType;
		format;
		length;
		valueLength;
		stride;
		byteOffset;
		byteStride;
		rowByteLength;
		readbackMetadata;
		valueOffsets;
		nullBitmap;
		valueByteLength;
		constructor(e) {
			let { buffer: t, format: n, length: r, valueLength: i, stride: a, byteOffset: o = 0, byteStride: s, rowByteLength: c, ownsBuffer: l = !1, readbackMetadata: u, valueOffsets: d, nullBitmap: f, valueByteLength: p, dataType: m } = e;
			super(t, l);
			let h;
			h = n ? typeof n == "string" ? n : WD(n, e.layout ?? "wgsl-storage") : void 0;
			let g = UD(h) ? h : void 0, _ = typeof h == "string" ? PD(h) : void 0;
			if (this.dataType = m, this.format = h, this.length = r, this.valueLength = i ?? r, this.stride = a ?? _?.components ?? g?.components ?? s ?? c ?? 1, this.byteOffset = o, this.rowByteLength = c ?? g?.rowByteLength ?? _?.byteLength ?? s ?? this.stride, this.byteStride = s ?? g?.byteStride ?? this.rowByteLength, g) {
				if (this.rowByteLength < g.rowByteLength) throw Error(`GPUData rowByteLength ${this.rowByteLength} is smaller than struct format row byte length ${g.rowByteLength}`);
				if (this.byteStride < Math.max(g.byteStride, this.rowByteLength)) throw Error(`GPUData byteStride ${this.byteStride} is smaller than its struct row layout`);
			}
			this.readbackMetadata = u, this.valueOffsets = d, this.nullBitmap = f, this.valueByteLength = p;
		}
		getChild(e) {
			if (!UD(this.format)) return null;
			let t = this.format.fields[e];
			return t ? new VD({
				buffer: this.buffer,
				format: t.format,
				length: this.length,
				byteOffset: this.byteOffset + t.byteOffset,
				byteStride: this.byteStride
			}) : null;
		}
		getChildAt(e) {
			if (!UD(this.format)) return null;
			let t = Object.values(this.format.fields)[e];
			return t ? new VD({
				buffer: this.buffer,
				format: t.format,
				length: this.length,
				byteOffset: this.byteOffset + t.byteOffset,
				byteStride: this.byteStride
			}) : null;
		}
	}, $D = QD;
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/gpu-data/gpu-vector.js
function tO(e) {
	let t = e.format ? PD(e.format) : void 0, n = e.rowByteLength ?? e.byteStride ?? t?.byteLength;
	if (n === void 0) throw Error("GPUVector requires format or explicit rowByteLength");
	return {
		stride: e.stride ?? t?.components ?? 1,
		byteStride: e.byteStride ?? n,
		rowByteLength: n
	};
}
function nO(e) {
	return e[0]?.format;
}
function rO(e, t) {
	if (e.find((e) => e.format !== t)) throw Error("GPUVector data chunks must share the declared format");
}
var iO, aO = t((() => {
	eO(), zD(), iO = class {
		name;
		dataType;
		format;
		length;
		valueLength;
		stride;
		byteOffset;
		byteStride;
		rowByteLength;
		bufferLayout;
		data = [];
		device;
		bufferProps;
		isAppendable = !1;
		ownsDataChunks = !0;
		ownedVectors = [];
		appendableByteLength = 0;
		constructor(e) {
			switch (e.type) {
				case "buffer": {
					let { name: t, buffer: n, format: r, length: i, valueLength: a = i, byteOffset: o = 0, ownsBuffer: s = !1 } = e, { stride: c, byteStride: l, rowByteLength: u } = tO(e);
					this.name = t, this.dataType = e.dataType, this.format = r, this.length = i, this.valueLength = a, this.stride = c, this.byteOffset = o, this.byteStride = l, this.rowByteLength = u, this.data.push(new $D({
						buffer: n,
						format: r,
						length: i,
						valueLength: a,
						stride: c,
						byteOffset: o,
						byteStride: l,
						rowByteLength: u,
						ownsBuffer: s,
						dataType: e.dataType
					}));
					return;
				}
				case "interleaved": {
					let { name: t, buffer: n, format: r, length: i, valueLength: a = i, byteOffset: o = 0, byteStride: s, attributes: c, ownsBuffer: l = !1 } = e;
					this.name = t, this.dataType = e.dataType, this.format = r, this.length = i, this.valueLength = a, this.stride = s, this.byteOffset = o, this.byteStride = s, this.rowByteLength = s, this.bufferLayout = {
						name: t,
						byteStride: s,
						attributes: c
					}, this.data.push(new $D({
						buffer: n,
						format: r,
						length: i,
						valueLength: a,
						stride: s,
						byteOffset: o,
						byteStride: s,
						rowByteLength: s,
						ownsBuffer: l,
						dataType: e.dataType
					}));
					return;
				}
				case "data": {
					let t = e.format ?? nO(e.data), n = t ? PD(t) : void 0, { name: r, data: i, stride: a = i[0]?.stride ?? n?.components ?? 1, valueLength: o = i.reduce((e, t) => e + t.valueLength, 0), byteStride: s = i[0]?.byteStride ?? n?.byteLength, rowByteLength: c = i[0]?.rowByteLength ?? n?.byteLength, bufferLayout: l, ownsData: u = !1 } = e;
					if (s === void 0 || c === void 0) throw Error("GPUVector requires format or explicit byte layout metadata");
					t && rO(i, t), this.name = r, this.dataType = e.dataType, this.format = t, this.length = i.reduce((e, t) => e + t.length, 0), this.valueLength = o, this.stride = a, this.byteOffset = i.length === 1 ? i[0].byteOffset : 0, this.byteStride = s, this.rowByteLength = c, this.bufferLayout = l, this.ownsDataChunks = u, this.data.push(...i);
					return;
				}
				case "appendable": {
					let { name: t, device: n, format: r, valueLength: i = 0, bufferProps: a } = e, { stride: o, byteStride: s, rowByteLength: c } = tO(e);
					this.name = t, this.dataType = e.dataType, this.format = r, this.length = 0, this.valueLength = i, this.stride = o, this.byteOffset = 0, this.byteStride = s, this.rowByteLength = c, this.device = n, this.bufferProps = a, this.isAppendable = !0;
					return;
				}
			}
		}
		get ownsBuffer() {
			return this.ownsDataChunks && this.data.some((e) => e.ownsBuffer) || this.ownedVectors.some((e) => e.ownsBuffer);
		}
		get capacityRows() {
			return this.isAppendable ? this.length : void 0;
		}
		get appendedByteLength() {
			return this.appendableByteLength;
		}
		addData(e) {
			if (this.format && e.format !== this.format) throw Error("GPUVector.addData() requires matching formats");
			if (e.byteStride !== this.byteStride) throw Error("GPUVector.addData() requires matching byteStride");
			if (e.rowByteLength !== this.rowByteLength) throw Error("GPUVector.addData() requires matching rowByteLength");
			return this.data.push(e), this.length += e.length, this.valueLength += e.valueLength, this;
		}
		appendDataChunk(e, t = this.appendableByteLength + e.buffer.byteLength) {
			if (!this.isAppendable) throw Error("GPUVector.appendDataChunk() requires appendable vector storage");
			if (this.format && e.format !== this.format) throw Error("GPUVector.appendDataChunk() requires matching formats");
			if (e.byteStride !== this.byteStride || e.rowByteLength !== this.rowByteLength) throw Error("GPUVector.appendDataChunk() requires matching byte layout metadata");
			return this.data.push(e), this.length += e.length, this.valueLength += e.valueLength, this.appendableByteLength = t, this;
		}
		resetLastBatch() {
			if (!this.isAppendable) throw Error("GPUVector.resetLastBatch() requires appendable vector storage");
			for (let e of this.data.splice(0)) e.destroy();
			return this.length = 0, this.valueLength = 0, this.appendableByteLength = 0, this;
		}
		retainOwnedVectors(e) {
			return this.ownedVectors.push(...e), this;
		}
		transferBufferOwnership(e) {
			let t = this.data[0], n = e.data[0];
			if (!t || !n || t.buffer !== n.buffer) throw Error("GPUVector ownership can only be transferred to the same buffer");
			t.transferBufferOwnership(n);
		}
		destroy() {
			if (this.ownsDataChunks) for (let e of this.data) e.destroy();
			for (let e of this.ownedVectors.splice(0)) e.destroy();
		}
	};
})), oO = t((() => {
	I(), zD(), eO(), XD(), HD(), aO();
})), sO, cO, lO = t((() => {
	I(), sO = class {
		poolSize = 20;
		bufferPools;
		constructor() {
			this.bufferPools = /* @__PURE__ */ new Map();
		}
		createOrReuse(e, t) {
			if (t > e.limits.maxBufferSize) throw Error(`Buffer pool cannot allocate ${t} bytes: device.limits.maxBufferSize is ${e.limits.maxBufferSize}`);
			let n = this.bufferPools.get(e), r = n ? n.findIndex((e) => e.byteLength >= t) : -1;
			if (r < 0) return e.createBuffer({
				usage: j.VERTEX | j.STORAGE | j.COPY_DST | j.COPY_SRC,
				byteLength: t
			});
			let [i] = n.splice(r, 1);
			return i;
		}
		recycle(e) {
			let t = e.device;
			this.bufferPools.has(t) || this.bufferPools.set(t, []);
			let n = this.bufferPools.get(t), r = n.findIndex((t) => t.byteLength > e.byteLength);
			r < 0 ? n.push(e) : n.splice(r, 0, e), this.purge();
		}
		purge() {
			for (let [e, t] of this.bufferPools) {
				let n = e.isLost ? 0 : this.poolSize;
				for (; t.length > n;) t.shift().destroy();
				t.length === 0 && this.bufferPools.delete(e);
			}
		}
	}, cO = new sO();
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operation/gpu-data-evaluator.js
function uO(e, t, n, r) {
	let { ValueType: i, size: a, offset: o, stride: s } = e, c = s / i.BYTES_PER_ELEMENT, l = o / i.BYTES_PER_ELEMENT, u = r - n;
	if (c === a) {
		let e = l + n * c;
		return t.subarray(e, e + u * a);
	}
	let d = new i(u * a);
	for (let e = 0; e < u; e++) {
		let r = l + (n + e) * c;
		d.set(t.subarray(r, r + a), e * a);
	}
	return d;
}
function dO(e) {
	if (e instanceof Z) return e;
	if (typeof e == "number" || Array.isArray(e)) return Z.fromConstant(e);
	if (e instanceof $D) return Z.fromGPUData(e);
	if (e instanceof VD) return Z.fromGPUDataView(e);
	throw Error("getGPUDataEvaluator() requires GPUDataEvaluator, GPUData, GPUDataView, number, or number[]");
}
function fO(e) {
	if (!e.format) throw Error("GPUDataEvaluator.fromGPUData() requires GPUData format metadata");
	if (jD(e.format) || MD(e.format)) throw Error("GPUDataEvaluator.fromGPUData() does not support variable-length input");
	let t = PD(e.format).byteLength;
	if (e.rowByteLength !== t) throw Error(`GPUDataEvaluator.fromGPUData() requires rowByteLength ${t} for GPUData`);
}
function pO(e) {
	let t = PD(e.format), n = Ot(t.signedDataType), r = n.BYTES_PER_ELEMENT * t.components;
	if (t.byteLength !== r) throw Error(`GPUDataEvaluator does not support packed vertex format ${e.format}: ${t.byteLength} physical bytes cannot expose ${t.components} ${t.signedDataType} components`);
	if (e.byteOffset % n.BYTES_PER_ELEMENT !== 0 || e.byteStride % n.BYTES_PER_ELEMENT !== 0) throw Error(`GPUDataEvaluator requires ${e.format} offset and stride aligned to ${n.BYTES_PER_ELEMENT} bytes`);
	return {
		type: t.signedDataType,
		size: t.components,
		offset: e.byteOffset,
		stride: e.byteStride,
		normalized: t.normalized,
		length: e.length,
		format: e.format
	};
}
function mO(e) {
	let t = hO(e).buffer;
	return t instanceof Jw ? t.buffer : t;
}
function hO(e) {
	let [t, ...n] = e.data;
	if (!t || n.length > 0) throw Error(`GPUDataEvaluator requires exactly one GPUData chunk for "${e.name}"`);
	return t;
}
function gO(e) {
	let t = [];
	return _O(e, t, { byteOffset: 0 }), t;
}
function _O(e, t, n) {
	let r = e.source;
	if (r && !(r instanceof Z) && r.name === "interleave") for (let e of Object.values(r.inputs)) e instanceof Z && _O(e, t, n);
	else t.push({
		attribute: e.id ?? e.toString(),
		format: vO(e.type, e.size, e.normalized),
		byteOffset: n.byteOffset
	}), n.byteOffset += e.ValueType.BYTES_PER_ELEMENT * e.size;
}
function vO(e, t, n = !1) {
	if (t < 1 || t > 4) throw Error(`Cannot synthesize a GPUVector vertex format with ${t} components`);
	let r = e;
	if (n) switch (e) {
		case "uint8":
			r = "unorm8";
			break;
		case "sint8":
			r = "snorm8";
			break;
		case "uint16":
			r = "unorm16";
			break;
		case "sint16":
			r = "snorm16";
			break;
		case "float32":
			r = "float32";
			break;
		default: throw Error(`Unsupported normalized vertex format for ${e}`);
	}
	return (r === "uint8" || r === "sint8" || r === "uint16" || r === "sint16" || r === "unorm8" || r === "snorm8" || r === "unorm16" || r === "snorm16") && t === 3 ? `${r}x3-webgl` : `${r}${t === 1 ? "" : `x${t}`}`;
}
function yO(e, t, n = !1) {
	return t >= 1 && t <= 4 ? vO(e, t, n) : void 0;
}
var Z, bO = t((() => {
	I(), Y(), oO(), lO(), Z = class e {
		static get bufferPoolSize() {
			return cO.poolSize;
		}
		static set bufferPoolSize(e) {
			if (!Number.isSafeInteger(e) || e < 0) throw Error("GPUDataEvaluator.bufferPoolSize must be a non-negative safe integer");
			cO.poolSize = e, cO.purge();
		}
		type;
		size;
		get offset() {
			return this._offset;
		}
		get stride() {
			return this._stride;
		}
		normalized;
		isConstant;
		length;
		get byteLength() {
			return this._byteLength;
		}
		ValueType;
		source = null;
		format;
		_id;
		_destroyed = !1;
		_value;
		_offset;
		_stride;
		_byteLength;
		_gpuVector;
		_bufferOwnership = "owned";
		_targetBuffer;
		static fromArray(t, { type: n, size: r = 1, offset: i = 0, stride: a = 0, normalized: o = !1 }) {
			let s = n, c;
			Array.isArray(t) ? (s ||= "float32", c = new (Ot(s))(t)) : t instanceof Float64Array ? (s = "uint32", r *= 2, i *= 2, a *= 2, c = new Uint32Array(t.buffer, t.byteOffset, t.byteLength / 4)) : (s ||= Et(t), c = t);
			let l = `<${s} * ${r}>`;
			return new e({
				id: l,
				type: s,
				size: r,
				offset: i,
				stride: a,
				normalized: o,
				value: c
			});
		}
		static fromConstant(t, n = "float32") {
			let r = Ot(n), i;
			return Array.isArray(t) ? i = `[${t.join(",")}]` : (i = String(t), t = [t]), new e({
				id: i,
				isConstant: !0,
				type: n,
				size: t.length,
				value: new r(t)
			});
		}
		static fromGPUData(t, n = {}) {
			fO(t);
			let r = new VD({
				buffer: t.buffer,
				format: t.format,
				length: t.length,
				byteOffset: t.byteOffset,
				byteStride: t.byteStride
			});
			return new e({
				...pO(r),
				id: n.id,
				gpuData: t
			});
		}
		static fromGPUDataView(t, n = {}) {
			return new e({
				...pO(t),
				id: n.id,
				buffer: t.buffer
			});
		}
		constructor(t) {
			let { id: n, value: r, buffer: i, gpuData: a, format: o, source: s = null, isConstant: c = !1 } = t;
			if (!s && !r && !i && !a) throw Error("GPUDataEvaluator must have a value source");
			let { type: l, size: u, offset: d, stride: f, normalized: p, length: m } = t;
			if (s instanceof e ? (l ??= s.type, u ??= s.size, d ??= s.offset, f ??= s.stride, p ??= s.normalized, m ??= s.length) : (u ??= 1, d ??= 0, p ??= !1, m = c ? 1 : m), !l) throw Error("GPUDataEvaluator: type not defined");
			if (this._id = n, this.type = l, this.size = u, this.ValueType = Ot(this.type), this._offset = d, this._stride = f || this.ValueType.BYTES_PER_ELEMENT * u, this.normalized = p, this.source = s, this.format = o, m === void 0) {
				if (c) m = 1;
				else {
					if (!r) throw Error("GPUDataEvaluator: length not defined");
					m = Math.ceil(r.byteLength / this.stride);
				}
			}
			this.isConstant = c, this.length = m;
			let h = this.ValueType.BYTES_PER_ELEMENT * this.size;
			this._byteLength = m === 0 ? 0 : (m - 1) * this.stride + h, this._value = r, this._bufferOwnership = s instanceof e || i || a ? "borrowed" : "owned", a ? this._gpuVector = new iO({
				type: "data",
				name: this._id ?? "data",
				format: a.format,
				data: [a],
				stride: a.stride,
				byteStride: a.byteStride,
				rowByteLength: a.rowByteLength
			}) : i && (this._gpuVector = this.createGPUVectorView({
				buffer: i,
				name: this._id,
				format: this.format
			}));
		}
		get value() {
			return this._value || (this.source instanceof e ? this.source.value : void 0);
		}
		get evaluated() {
			return !!this._gpuVector;
		}
		get id() {
			return this._id;
		}
		get gpuVector() {
			if (!this._gpuVector) throw Error(`${this} not evaluated`);
			return this._gpuVector;
		}
		get buffer() {
			return mO(this.gpuVector);
		}
		setTargetBuffer({ buffer: t, byteOffset: n = 0, byteStride: r = this.stride }) {
			if (this._destroyed) throw Error(`GPUDataEvaluator ${this} already destroyed`);
			if (this._gpuVector) throw Error(`GPUDataEvaluator ${this} already evaluated`);
			if (!this.source || this.source instanceof e) throw Error("GPUDataEvaluator target buffers require a deferred operation source");
			this._targetBuffer = {
				buffer: t,
				byteOffset: n,
				byteStride: r
			};
		}
		async evaluate(t, n = {}) {
			if (this._destroyed) throw Error(`GPUDataEvaluator ${this} already destroyed`);
			if (this._gpuVector) return this._gpuVector;
			let r;
			if (this.source instanceof e) {
				let e = await this.source.evaluate(t);
				return this._gpuVector = this.createGPUVectorView({
					...n,
					buffer: mO(e)
				}), this._gpuVector;
			}
			if (r = this._getEvaluationBuffer(t), this._value) r.write(this._value);
			else {
				let e = await this.source.execute(t, r);
				if (!e.success) throw e.error || /* @__PURE__ */ Error(`${this.source} evaluation failed`);
				e.value && (this._value = e.value);
			}
			return this._gpuVector = this.createGPUVectorView({
				...n,
				buffer: r
			}), this._gpuVector;
		}
		evaluateSync(t, n = {}) {
			if (this._destroyed) throw Error(`GPUDataEvaluator ${this} already destroyed`);
			if (this._gpuVector) return this._gpuVector;
			let r;
			if (this.source instanceof e) {
				let e = this.source.evaluateSync(t);
				return this._gpuVector = this.createGPUVectorView({
					...n,
					buffer: mO(e)
				}), this._gpuVector;
			}
			if (r = this._getEvaluationBuffer(t), this._value) r.write(this._value);
			else {
				let e = this.source.executeSync(t, r);
				if (!e.success) throw e.error || /* @__PURE__ */ Error(`${this.source} evaluation failed`);
				e.value && (this._value = e.value);
			}
			return this._gpuVector = this.createGPUVectorView({
				...n,
				buffer: r
			}), this._gpuVector;
		}
		createGPUVectorView(e) {
			let t = e.name ?? this._id ?? "vector", n = e.format ?? this.format ?? yO(this.type, this.size, this.normalized);
			if (e.interleaved) {
				let n = typeof e.interleaved == "object" && e.interleaved.attributes ? e.interleaved.attributes : gO(this);
				return new iO({
					type: "interleaved",
					name: t,
					buffer: e.buffer,
					format: e.format ?? this.format,
					length: this.length,
					byteOffset: this.offset,
					byteStride: this.stride,
					attributes: n,
					ownsBuffer: !1
				});
			}
			return new iO({
				type: "buffer",
				name: t,
				buffer: e.buffer,
				format: n,
				length: this.length,
				stride: this.size,
				byteOffset: this.offset,
				byteStride: this.stride,
				rowByteLength: this.ValueType.BYTES_PER_ELEMENT * this.size,
				ownsBuffer: !1
			});
		}
		_getEvaluationBuffer(e) {
			let t = this._targetBuffer;
			if (!t) return cO.createOrReuse(e, this.byteLength);
			if (t.buffer.device !== e) throw Error("GPUDataEvaluator target buffer belongs to a different device");
			let n = this.ValueType.BYTES_PER_ELEMENT * this.size, r = this.length === 0 ? 0 : (this.length - 1) * t.byteStride + n;
			if (t.byteOffset + r > t.buffer.byteLength) throw Error("GPUDataEvaluator target buffer is too small for the output layout");
			return this._offset = t.byteOffset, this._stride = t.byteStride, this._byteLength = r, this._bufferOwnership = "borrowed", this._targetBuffer = void 0, t.buffer;
		}
		async readValue(e = 0, t) {
			let { ValueType: n } = this, { size: r, offset: i, stride: a, length: o } = this, s = n.BYTES_PER_ELEMENT * r;
			if (t ??= o, e = Math.max(0, Math.min(o, e)), t = Math.max(e, Math.min(o, t)), this._value) return uO(this, this._value, e, t);
			let c = t - e;
			if (c === 0) return new n(0);
			let l = i + e * a, u = a === s ? c * s : (c - 1) * a + s, d = await this.buffer.readAsync(l, u), f = new n(d.buffer, d.byteOffset, d.byteLength / n.BYTES_PER_ELEMENT);
			if (a === s) return f;
			let p = new Uint8Array(s * c);
			for (let e = 0; e < c; e++) {
				let t = e * a;
				p.set(d.subarray(t, t + s), e * s);
			}
			return new n(p.buffer);
		}
		async ensureCPUValue() {
			let e = this.value;
			if (e) return e;
			let t = await this.buffer.readAsync(0, this.offset + this.byteLength);
			if (t.byteLength % this.ValueType.BYTES_PER_ELEMENT !== 0) throw Error(`${this} backing buffer byte length is not aligned to its scalar type`);
			let n = t.slice();
			return this._value = new this.ValueType(n.buffer, n.byteOffset, n.byteLength / this.ValueType.BYTES_PER_ELEMENT), this._value;
		}
		ensureCPUValueSync() {
			let e = this.value;
			if (e) return e;
			throw Error(`${this} CPU value is not available for synchronous evaluation`);
		}
		toString() {
			return this._id ?? this.source?.toString() ?? this.constructor.name;
		}
		destroy() {
			this._gpuVector &&= (this._bufferOwnership === "owned" && cO.recycle(mO(this._gpuVector)), void 0), this._targetBuffer = void 0, this._destroyed = !0;
		}
	};
}));
oO(), bO();
var xO = class e {
	gpuDataEvaluators;
	format;
	length;
	id;
	_gpuVector;
	_ownsGPUDataEvaluators;
	_destroyed = !1;
	static fromGPUVector(t) {
		if (t.bufferLayout) throw Error(`GPUVectorEvaluator.fromGPUVector() does not accept interleaved vector "${t.name}"`);
		if (t.data.length === 0) throw Error(`GPUVectorEvaluator.fromGPUVector() requires GPUData for "${t.name}"`);
		return new e({
			id: t.name,
			gpuDataEvaluators: t.data.map((e) => Z.fromGPUData(e, { id: t.name })),
			gpuVector: t,
			format: t.format
		});
	}
	static fromGPUDataEvaluators(t, n = {}) {
		return new e({
			id: n.id,
			gpuDataEvaluators: t,
			format: n.format
		});
	}
	constructor({ id: e, gpuDataEvaluators: t, gpuVector: n, format: r }) {
		if (t.length === 0) throw Error("GPUVectorEvaluator requires at least one GPUData evaluator");
		SO(t), this.id = e, this.gpuDataEvaluators = t, this.format = r ?? t[0].format, this.length = t.reduce((e, t) => e + t.length, 0), this._gpuVector = n, this._ownsGPUDataEvaluators = !n;
	}
	get evaluated() {
		return !!this._gpuVector;
	}
	get gpuVector() {
		if (!this._gpuVector) throw Error(`${this} not evaluated`);
		return this._gpuVector;
	}
	mapGPUData(t) {
		return e.fromGPUDataEvaluators(this.gpuDataEvaluators.map((e, n) => t(e, n)), { id: this.id });
	}
	async evaluate(e, t = {}) {
		if (this._destroyed) throw Error(`GPUVectorEvaluator ${this} already destroyed`);
		if (this._gpuVector) return this._gpuVector;
		let n = await Promise.all(this.gpuDataEvaluators.map((n) => n.evaluate(e, t))), r = n[0], i = n.map(CO), a = t.format ?? this.format ?? r.format;
		return this._gpuVector = new iO({
			type: "data",
			name: t.name ?? this.id ?? "vector",
			format: a,
			data: i,
			stride: r.stride,
			byteStride: r.byteStride,
			rowByteLength: r.rowByteLength,
			bufferLayout: r.bufferLayout
		}), this._gpuVector;
	}
	evaluateSync(e, t = {}) {
		if (this._destroyed) throw Error(`GPUVectorEvaluator ${this} already destroyed`);
		if (this._gpuVector) return this._gpuVector;
		let n = this.gpuDataEvaluators.map((n) => n.evaluateSync(e, t)), r = n[0], i = n.map(CO), a = t.format ?? this.format ?? r.format;
		return this._gpuVector = new iO({
			type: "data",
			name: t.name ?? this.id ?? "vector",
			format: a,
			data: i,
			stride: r.stride,
			byteStride: r.byteStride,
			rowByteLength: r.rowByteLength,
			bufferLayout: r.bufferLayout
		}), this._gpuVector;
	}
	destroy() {
		if (this._ownsGPUDataEvaluators) for (let e of this.gpuDataEvaluators) e.destroy();
		this._gpuVector = void 0, this._destroyed = !0;
	}
	toString() {
		return this.id ?? this.constructor.name;
	}
};
function SO(e) {
	let t = e[0];
	for (let n of e.slice(1)) if (n.type !== t.type || n.size !== t.size || n.normalized !== t.normalized || n.format !== t.format) throw Error("GPUVectorEvaluator requires matching GPUData evaluator layouts");
}
function CO(e) {
	let [t, ...n] = e.data;
	if (!t || n.length > 0) throw Error(`GPUVectorEvaluator requires one GPUData chunk for "${e.name}"`);
	return t;
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/arithmetic-expression.js
var wO, TO = t((() => {
	wO = {
		add: {
			arity: 2,
			symbol: "arithmetic_add"
		},
		subtract: {
			arity: 2,
			symbol: "arithmetic_subtract"
		},
		multiply: {
			arity: 2,
			symbol: "arithmetic_multiply"
		},
		divide: {
			arity: 2,
			symbol: "arithmetic_divide"
		},
		pow: {
			arity: 2,
			symbol: "pow"
		},
		sqrt: {
			arity: 1,
			symbol: "sqrt"
		},
		abs: {
			arity: 1,
			symbol: "abs"
		},
		sin: {
			arity: 1,
			symbol: "sin"
		},
		cos: {
			arity: 1,
			symbol: "cos"
		},
		tan: {
			arity: 1,
			symbol: "arithmetic_tan"
		},
		exp: {
			arity: 1,
			symbol: "exp"
		},
		log: {
			arity: 1,
			symbol: "log"
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/cpu/common.js
function EO({ elementWise: e, func: t, inputs: n, output: r, outputBuffer: i }) {
	let a = Array.isArray(n) ? n : Object.values(n);
	for (let e of a) if (!e.value) throw Error(`${e} does not have CPU value`);
	let o = r.length, s = r.size, c = new r.ValueType(o * s);
	for (let n = 0; n < o; n++) {
		let r = a.map((e) => Q(e, n));
		if (e) for (let e = 0; e < s; e++) c[n * s + e] = t.apply(null, r.map((t) => t[e]));
		else t.call(null, c.subarray(n * s, n * s + s), ...r);
	}
	let l = r.ValueType.BYTES_PER_ELEMENT, u = r.offset / l, d = r.stride / l, f = s, p = c;
	if (u !== 0 || d !== f) {
		p = new r.ValueType(u + r.byteLength / l);
		for (let e = 0; e < o; e++) {
			let t = e * f, n = u + e * d, r = c.subarray(t, t + s);
			p.set(r, n), i.write(r, n * l);
		}
	} else i.write(c);
	return {
		success: !0,
		value: p
	};
}
function Q(e, t) {
	let n = e.value, r = e.size, i = e.offset / e.ValueType.BYTES_PER_ELEMENT, a = e.stride / e.ValueType.BYTES_PER_ELEMENT, o = i + (e.isConstant ? 0 : t) * a, s = n.slice(o, o + r);
	if (!e.normalized) return s;
	let c = new Float32Array(r);
	for (let t = 0; t < r; t++) c[t] = DO(s[t], e.type);
	return c;
}
function DO(e, t) {
	switch (t) {
		case "uint8": return e / 255;
		case "uint16": return e / 65535;
		case "uint32": return e / 4294967295;
		case "sint8": return Math.max(e / 127, -1);
		case "sint16": return Math.max(e / 32767, -1);
		case "sint32": return Math.max(e / 2147483647, -1);
		case "float32": return e;
		default: throw Error(`Unsupported normalized source type ${t}`);
	}
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/cpu/arithmetic.js
TO();
var OO = ({ inputs: e, output: t, target: n }) => {
	for (let t of Object.values(e.namedInputs)) if (!t.value) throw Error(`${t} does not have CPU value`);
	let r = new t.ValueType(t.length * t.size);
	for (let n = 0; n < t.length; n++) {
		let i = Object.fromEntries(Object.entries(e.namedInputs).map(([e, t]) => [e, Q(t, n)]));
		for (let a = 0; a < t.size; a++) r[n * t.size + a] = kO(e.expression, i, a);
	}
	return n.write(r), {
		success: !0,
		value: r
	};
};
function kO(e, t, n) {
	switch (e.kind) {
		case "input": {
			let r = t[e.name];
			return n < r.length ? r[n] : r.length === 1 ? r[0] : 0;
		}
		case "literal": return Array.isArray(e.value) ? e.value[n] ?? 0 : e.value;
		case "call": {
			AO(e.op, e.args.length);
			let r = e.args.map((e) => kO(e, t, n));
			switch (e.op) {
				case "add": return r[0] + r[1];
				case "subtract": return r[0] - r[1];
				case "multiply": return r[0] * r[1];
				case "divide": return r[0] / r[1];
				case "pow": return r[0] ** +r[1];
				case "sqrt": return Math.sqrt(r[0]);
				case "abs": return Math.abs(r[0]);
				case "sin": return Math.sin(r[0]);
				case "cos": return Math.cos(r[0]);
				case "tan": return Math.tan(r[0]);
				case "exp": return Math.exp(r[0]);
				case "log": return Math.log(r[0]);
				default: {
					let t = e.op;
					throw Error(`Unsupported arithmetic op ${t}`);
				}
			}
		}
		default: throw Error(`Unsupported expression node ${e.kind}`);
	}
}
function AO(e, t) {
	let n = wO[e].arity;
	if (t !== n) throw Error(`Arithmetic op '${e}' expects ${n} args, got ${t}`);
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/cpu/extent.js
var jO = ({ inputs: e, output: t, target: n }) => {
	let { sourceValues: r } = e;
	if (!r.value) throw Error(`${r} does not have CPU value`);
	let i = new t.ValueType(t.length * t.size);
	if (r.length === 0) return {
		success: !1,
		error: /* @__PURE__ */ Error(`${r} is empty`)
	};
	for (let e = 0; e < r.size; e++) {
		let n = Q(r, 0)[e], a = e * t.size, o = a + 1;
		i[a] = n, i[o] = n;
		for (let t = 1; t < r.length; t++) {
			let n = Q(r, t)[e];
			n < i[a] && (i[a] = n), n > i[o] && (i[o] = n);
		}
	}
	return n.write(i), {
		success: !0,
		value: i
	};
}, MO = ({ inputs: e, output: t, target: n }) => EO({
	func: (e, t) => {
		let n = e.length / 2, r = new Float64Array(t.buffer);
		for (let t = 0; t < n; t++) {
			let i = r[t];
			e[t] = Math.fround(i), e[t + n] = i - e[t];
		}
		return e;
	},
	inputs: e,
	output: t,
	outputBuffer: n
}), NO = async ({ inputs: e, output: t, target: n }) => {
	let { ids: r, sourceValues: i } = e, a = r.value, o = i.value;
	if (!a) throw Error(`${r} does not have CPU value`);
	if (!o) throw Error(`${i} does not have CPU value`);
	let s = new t.ValueType(t.length * t.size), c = Array(t.size).fill(0);
	for (let e = 0; e < t.length; e++) {
		let n = Q(r, e), a = Number(n[0]), o = PO(a, i.length) ? Q(i, a) : c;
		s.set(o, e * t.size);
	}
	return n.write(s), {
		success: !0,
		value: s
	};
};
function PO(e, t) {
	return Number.isInteger(e) && e >= 0 && e < t;
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/cpu/interleave.js
var FO = ({ inputs: e, output: t, target: n }) => EO({
	func: (e, ...t) => {
		let n = 0;
		for (let r of t) e.set(r, n), n += r.length;
	},
	inputs: e,
	output: t,
	outputBuffer: n
}), IO = ({ inputs: e, output: t, target: n }) => {
	let { x: r, y: i } = e, a = new t.ValueType(t.length);
	for (let e = 0; e < t.length; e++) {
		let t = Q(r, e), n = Q(i, e), o = 0;
		for (let e = 0; e < r.size; e++) o += t[e] * n[e];
		a[e] = o;
	}
	return n.write(a), {
		success: !0,
		value: a
	};
}, LO = ({ inputs: e, output: t, target: n }) => {
	let { x: r, y: i } = e, a = new t.ValueType(t.length);
	for (let e = 0; e < t.length; e++) {
		let t = Q(r, e), n = Q(i, e), o = 1;
		for (let e = 0; e < r.size; e++) if (t[e] !== n[e]) {
			o = 0;
			break;
		}
		a[e] = o;
	}
	return n.write(a), {
		success: !0,
		value: a
	};
}, RO = ({ inputs: e, output: t, target: n }) => {
	let { x: r } = e, i = new t.ValueType(t.length);
	for (let e = 0; e < t.length; e++) {
		let t = Q(r, e), n = 0;
		for (let e = 0; e < r.size; e++) n += t[e] * t[e];
		i[e] = Math.sqrt(n);
	}
	return n.write(i), {
		success: !0,
		value: i
	};
}, zO = async ({ inputs: e, output: t, target: n }) => {
	let { segments: r, vertexCount: i } = e, a = r.value;
	if (!a) throw Error(`${r} does not have CPU value`);
	BO(a, r, i);
	let o = new t.ValueType(t.length * t.size), s = 0;
	for (let e = 0; e < i; e++) {
		for (; s + 1 < r.length && a[VO(r, s + 1)] <= e;) s++;
		let n = a[VO(r, s)], i = e * t.size;
		o[i] = s, o[i + 1] = e - n;
	}
	return n.write(o), {
		success: !0,
		value: o
	};
};
function BO(e, t, n) {
	if (t.length < 1) throw Error("segmentedMap segments must contain at least one segment start");
	let r = 0;
	for (let n = 0; n < t.length; n++) {
		let i = e[VO(t, n)];
		if (n === 0 && i !== 0) throw Error(`segmentedMap segments must start at 0, got ${i}`);
		if (n > 0 && i < r) throw Error(`segmentedMap segments must be non-decreasing, got ${i} after ${r}`);
		r = i;
	}
	if (r > n) throw Error(`segmentedMap last segment start must be <= vertexCount, got ${r} > ${n}`);
}
function VO(e, t) {
	return e.offset / e.ValueType.BYTES_PER_ELEMENT + t * (e.stride / e.ValueType.BYTES_PER_ELEMENT);
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/cpu/select.js
var HO = async ({ inputs: e, output: t, target: n }) => {
	let { condition: r, whenTrue: i, whenFalse: a } = e, o = new t.ValueType(t.length * t.size);
	for (let e = 0; e < t.length; e++) {
		let n = Q(r, e), s = Q(i, e), c = Q(a, e);
		for (let l = 0; l < t.size; l++) {
			let u = UO(n, r.size, l);
			o[e * t.size + l] = u === 0 ? UO(c, a.size, l) : UO(s, i.size, l);
		}
	}
	return n.write(o), {
		success: !0,
		value: o
	};
};
function UO(e, t, n) {
	return n < t ? e[n] : t === 1 ? e[0] : 0;
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/cpu/sequence.js
var WO = ({ inputs: e, output: t, target: n }) => {
	let r = new t.ValueType(t.length);
	for (let n = 0; n < t.length; n++) r[n] = e.start + n * e.step;
	return n.write(r), {
		success: !0,
		value: r
	};
}, GO = ({ inputs: e, output: t, target: n }) => {
	let { columns: r } = e;
	return EO({
		func: (e, t) => {
			for (let n = 0; n < r.length; n++) e[n] = t[r[n]];
		},
		inputs: { x: e.x },
		output: t,
		outputBuffer: n
	});
}, KO = /* @__PURE__ */ n({
	arithmetic: () => OO,
	dot: () => IO,
	equalAll: () => LO,
	extent: () => jO,
	fround: () => MO,
	gather: () => NO,
	interleave: () => FO,
	length: () => RO,
	segmentedMap: () => zO,
	select: () => HO,
	sequence: () => WO,
	swizzle: () => GO
});
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/utils/expression.js
function qO(e, { operations: t, inputs: n }) {
	switch (e.kind) {
		case "input":
			if (!(e.name in n)) throw Error(`Unknown expression input '${e.name}'`);
			return;
		case "literal":
			if (Array.isArray(e.value)) {
				for (let t of e.value) if (!Number.isFinite(t)) throw Error(`Expression literal array must contain only finite values, got ${t}`);
			} else if (!Number.isFinite(e.value)) throw Error(`Expression literal must be finite, got ${e.value}`);
			return;
		case "call": {
			let r = t[e.op];
			if (!r) throw Error(`Unknown expression op '${e.op}'`);
			if (e.args.length !== r.arity) throw Error(`Expression op '${e.op}' expects ${r.arity} args, got ${e.args.length}`);
			for (let r of e.args) qO(r, {
				operations: t,
				inputs: n
			});
			return;
		}
		default: throw Error(`Unsupported expression node ${e.kind}`);
	}
}
function JO(e, t) {
	return qO(e, t), YO(e, t);
}
function YO(e, t) {
	switch (e.kind) {
		case "input": {
			let n = t.inputs[e.name];
			return t.laneIndex < n.size ? t.formatInput(e.name) : t.formatOutOfBoundsInput(e.name);
		}
		case "literal": return t.formatLiteral(e.value);
		case "call": {
			let n = t.operations[e.op], r = e.args.map((e) => YO(e, t));
			return t.formatCall(n.symbol, r);
		}
		default: throw Error(`Unsupported expression node ${e.kind}`);
	}
}
var XO = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/common/helper.js
function ZO(e, t, n = !1) {
	if (n) return t === 1 ? "float" : `vec${t}`;
	switch (e) {
		case "uint8":
		case "uint16":
		case "uint32": return t === 1 ? "uint" : `uvec${t}`;
		case "sint8":
		case "sint16":
		case "sint32": return t === 1 ? "int" : `ivec${t}`;
		default: return t === 1 ? "float" : `vec${t}`;
	}
}
function QO(e, t, n = !1) {
	let r;
	if (n) switch (e) {
		case "uint8":
			r = "unorm8";
			break;
		case "sint8":
			r = "snorm8";
			break;
		case "uint16":
			r = "unorm16";
			break;
		case "sint16":
			r = "snorm16";
			break;
		case "float32":
			r = "float32";
			break;
		default: throw Error(`Unsupported normalized vertex format for ${e}`);
	}
	else r = e;
	return t === 1 ? r : t === 3 && !r.startsWith("float32") && !r.endsWith("32") ? `${r}x3-webgl` : `${r}x${t}`;
}
function $O(e) {
	switch (e[0]) {
		case "u": return "0u";
		case "s": return "0";
		default: return "0.";
	}
}
function ek(e, t) {
	switch (e) {
		case "uint8":
		case "uint16":
		case "uint32": return `${Math.trunc(t)}u`;
		case "sint8":
		case "sint16":
		case "sint32": return `${Math.trunc(t)}`;
		default: return Number.isInteger(t) ? `${t}.0` : `${t}`;
	}
}
function tk(e) {
	switch (e) {
		case "uint8": return "r8uint";
		case "sint8": return "r8sint";
		case "uint16": return "r16uint";
		case "sint16": return "r16sint";
		case "uint32": return "r32uint";
		case "sint32": return "r32sint";
		case "float32": return "r32float";
		default: throw Error(`Unsupported WebGL gather texture format for ${e}`);
	}
}
function nk(e) {
	return e;
}
function rk(e) {
	switch (e) {
		case "uint32": return "usampler2D";
		case "sint32": return "isampler2D";
		case "float32": return "sampler2D";
		default: throw Error(`Unsupported WebGL gather sampler type for ${e}`);
	}
}
var ik = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/common/row-transform.js
function ak({ module: e, elementWise: t = !1, expression: n, inputs: r, output: i, operationType: a = i.type, outputBuffer: o }) {
	let s = o.device, c = lk("result", i.type, i.size, i.normalized), l = [e, c], u = [], d = {}, f = ZO(i.type, 1, i.normalized), p = ZO(a, 1, i.normalized), m = "", h = null, g = {
		TYPE: p,
		RESULT_LEN: i.size.toString()
	}, _ = ok(r);
	for (let [e, t] of _) l.push(sk(e, t.type, t.size, t.normalized, a)), u.push(ck(e, t)), t instanceof Z ? d[e] = t.buffer : (h ||= cO.createOrReuse(s, o.byteLength), d[e] = h), m += `TYPE ${e}[${t.size}]; get_${e}(${e});\n`, g[`${e.toUpperCase()}_LEN`] = t.size.toString();
	let v = "";
	if (n) for (let e = 0; e < i.size; e++) v += `result[${e}]=${n(e)};\n`;
	else if (t) for (let t = 0; t < i.size; t++) {
		let n = $O(p), r = _.map(([e, r]) => t < r.size ? `${e}[${t}]` : n);
		v += `result[${t}]=${e.name}(${r.join(", ")});\n`;
	}
	else v = `${e.name}(${_.map(([e]) => e).join(", ")}, result);`;
	let y = `\
#version 300 es

void main() {
${m}
${f} result[${i.size}];
${v}
set_result(result);
}
  `, b = new hT(s, {
		vs: y,
		shaderAssembler: fk,
		defines: g,
		modules: l,
		bufferLayout: u,
		vertexCount: 1,
		instanceCount: i.length,
		attributes: d,
		feedbackBufferMode: "interleaved",
		outputs: c.varyings
	});
	s.statsManager.getStats(uk).get(dk).incrementCount(), b.run({
		inputBuffers: d,
		outputBuffers: { [c.varyings[0]]: i.offset === 0 ? o : {
			buffer: o,
			byteOffset: i.offset,
			byteLength: i.byteLength
		} }
	}), h && cO.recycle(h);
}
function ok(e) {
	return Array.isArray(e) ? e.map((e, t) => [`x${t}`, e]) : Object.entries(e);
}
function sk(e, t, n, r = !1, i = t) {
	let a = "", o = "";
	for (let s = 0; s < n; s += 4) {
		let c = Math.min(n - s, 4), l = ZO(t, c, r);
		a += `in ${l} a${e}_${s};\n`;
		for (let n = 0; n < c; n++) {
			let a = `a${e}_${s}`;
			c > 1 && (a = `${a}[${n}]`), (r || t !== i) && (a = `TYPE(${a})`), o += `v[${s + n}]=${a};\n`;
		}
	}
	return {
		name: e,
		vs: `
${a}
void get_${e}(out TYPE v[${n}]) {
  ${o}
}
`
	};
}
function ck(e, t) {
	let n = {
		name: e,
		stepMode: t.isConstant ? "vertex" : "instance",
		byteStride: t.stride,
		attributes: []
	};
	for (let r = 0; r < t.size; r += 4) {
		let i = Math.min(t.size - r, 4);
		n.attributes.push({
			attribute: `a${e}_${r}`,
			format: QO(t.type, i, t.normalized),
			byteOffset: t.offset + t.ValueType.BYTES_PER_ELEMENT * r
		});
	}
	return n;
}
function lk(e, t, n, r = !1) {
	let i = [], a = ZO(t, 1, r), o = "", s = "";
	for (let a = 0; a < n; a += 4) {
		let c = Math.min(n - a, 4), l = ZO(t, c, r);
		i.push(`${e}_${a}`), o += `flat out ${l} ${e}_${a};\n`;
		let u = Array.from({ length: c }, (e, t) => a + t);
		s += `${e}_${a} = ${l}(${u.map((e) => `v[${e}]`).join(",")});\n`;
	}
	return {
		name: e,
		varyings: i,
		vs: `
${o}
void set_${e}(in ${a} v[${n}]) {
  ${s}
}
`
	};
}
var uk, dk, fk, pk = t((() => {
	Y(), G(), bO(), lO(), ik(), uk = "GPGPU Operation Counts", dk = "Transform Runs", fk = new Qg();
})), mk, hk, gk = t((() => {
	G(), XO(), TO(), pk(), ik(), mk = "TYPE arithmetic_add(TYPE x, TYPE y) {\n  return x + y;\n}\n\nTYPE arithmetic_subtract(TYPE x, TYPE y) {\n  return x - y;\n}\n\nTYPE arithmetic_multiply(TYPE x, TYPE y) {\n  return x * y;\n}\n\nTYPE arithmetic_divide(TYPE x, TYPE y) {\n  return x / y;\n}\n\nfloat arithmetic_tan(float x) {\n  return tan_fp32(x);\n}\n", hk = ({ inputs: e, output: t, target: n }) => {
		let r = t.type, i = ZO(r, 1, t.normalized), a = $O(i), o = e.namedInputs;
		return ak({
			module: {
				name: "arithmetic",
				dependencies: [ny],
				vs: mk
			},
			inputs: o,
			output: t,
			operationType: r,
			outputBuffer: n,
			expression: (t) => JO(e.expression, {
				operations: wO,
				inputs: o,
				laneIndex: t,
				formatInput: (e) => `${e}[${t}]`,
				formatOutOfBoundsInput: (e) => o[e].size === 1 ? `${e}[0]` : a,
				formatLiteral: (e) => {
					let n = Array.isArray(e) ? e[t] ?? 0 : e;
					return `${i}(${ek(r, n)})`;
				},
				formatCall: (e, t) => `${e}(${t.join(", ")})`
			})
		}), { success: !0 };
	};
})), _k, vk, yk, bk, xk = t((() => {
	I(), Y(), bO(), lO(), gk(), pk(), _k = "GPGPU Operation Counts", vk = "Transform Runs", yk = ({ inputs: e, output: t, target: n }) => {
		let { sourceValues: r } = e, i = n.device;
		if (r.length === 0) {
			let e = new t.ValueType(t.length * t.size);
			return n.write(e), {
				success: !0,
				value: e
			};
		}
		if (r.isConstant) {
			let e = r.value, i = new t.ValueType(t.length * t.size);
			for (let n = 0; n < t.length; n++) {
				let t = e[n];
				i[n * 2] = t, i[n * 2 + 1] = t;
			}
			return n.write(i), {
				success: !0,
				value: i
			};
		}
		let a = i.createTexture({
			width: 1,
			height: t.length,
			format: "rg32float",
			usage: F.RENDER | F.COPY_SRC | F.COPY_DST
		}), o = i.createFramebuffer({ colorAttachments: [a] }), s = new dT(i, {
			vs: "#version 300 es\n\nflat out float extent_value;\n\nvoid main() {\n  float sourceValues[SOURCE_VALUES_LEN];\n  get_sourceValues(sourceValues);\n  extent_value = sourceValues[gl_VertexID];\n\n  float y = (float(gl_VertexID) + 0.5) / float(CHANNEL_COUNT) * 2.0 - 1.0;\n  gl_Position = vec4(0.0, y, 0.0, 1.0);\n  gl_PointSize = 1.0;\n}\n  ",
			fs: "#version 300 es\n\nprecision highp float;\n\nflat in float extent_value;\nout vec2 fragColor;\n\nvoid main() {\n  fragColor = vec2(-extent_value, extent_value);\n}\n  ",
			topology: "point-list",
			parameters: {
				depthCompare: "always",
				blend: !0,
				blendColorSrcFactor: "one",
				blendColorDstFactor: "one",
				blendColorOperation: "max",
				blendAlphaSrcFactor: "one",
				blendAlphaDstFactor: "one",
				blendAlphaOperation: "max"
			},
			modules: [sk("sourceValues", r.type, r.size, r.normalized)],
			defines: {
				TYPE: "float",
				SOURCE_VALUES_LEN: r.size.toString(),
				CHANNEL_COUNT: t.length.toString()
			},
			attributes: { sourceValues: r.buffer },
			bufferLayout: [ck("sourceValues", r)],
			instanceCount: r.length,
			vertexCount: t.length,
			disableWarnings: !0
		}), c = cO.createOrReuse(i, t.byteLength);
		try {
			let e = i.beginRenderPass({
				framebuffer: o,
				parameters: { viewport: [
					0,
					0,
					1,
					t.length
				] },
				clearColor: [
					-bk,
					-bk,
					0,
					0
				],
				clearDepth: !1,
				clearStencil: !1
			});
			i.statsManager.getStats(_k).get(vk).incrementCount(), s.draw(e), e.end();
			let r = i.createCommandEncoder();
			return r.copyTextureToBuffer({
				sourceTexture: a,
				width: 1,
				height: t.length,
				destinationBuffer: c,
				byteOffset: 0,
				bytesPerRow: 8
			}), i.submit(r.finish()), hk({
				device: i,
				inputs: {
					expression: {
						kind: "call",
						op: "multiply",
						args: [{
							kind: "input",
							name: "x"
						}, {
							kind: "literal",
							value: [-1, 1]
						}]
					},
					namedInputs: { x: new Z({
						buffer: c,
						size: 2,
						type: "float32",
						length: t.length
					}) }
				},
				output: t,
				target: n
			});
		} finally {
			s.destroy(), cO.recycle(c), o.destroy(), a.destroy();
		}
	}, bk = 3e38;
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/interleave.js
function Sk(e, t) {
	let n = t.reduce((e, [, t]) => e + Math.ceil(t.size / 4), 0);
	if (n > e) throw Error(`interleave() requires ${n} vertex attributes, exceeding device limit ${e}`);
}
function Ck(e, t) {
	if (t.size > e) throw Error(`interleave() output size ${t.size} exceeds device inter-stage component limit ${e}`);
}
var wk, Tk = t((() => {
	pk(), wk = ({ inputs: e, output: t, target: n }) => {
		let r = e.map((e, t) => [`x${t}`, e]);
		Sk(n.device.limits.maxVertexAttributes, r), Ck(n.device.limits.maxInterStageShaderVariables, t);
		let i = r.map(([e, t]) => `in TYPE ${e}[${t.size}]`).join(", "), a = 0;
		return ak({
			module: {
				name: "interleave",
				vs: `\
void interleave(${i}, out TYPE result[RESULT_LEN]) {
${r.map(([e, t]) => {
					let n = Array.from({ length: t.size }, (t, n) => `  result[${a + n}] = ${e}[${n}];`).join("\n");
					return a += t.size, n;
				}).join("\n")}
}
`
			},
			inputs: e,
			output: t,
			outputBuffer: n
		}), { success: !0 };
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/fround.js
function Ek() {
	let e = new Uint16Array([255]);
	return new Uint8Array(e.buffer)[0] > 0;
}
var Dk, Ok, kk = t((() => {
	pk(), Dk = `\
#define LE ${+!!Ek()}
const uint F32_NAN = 0xffffffffu;
const uint F32_INF = 0x7f800000u;

// Find first set bit using binary search
// https://en.wikipedia.org/wiki/Find_first_set#CLZ
int countLeadingZeros(uint a) {
  if (a == 0u) return 32;
  int n = 0;
  if ((a & 0xffff0000u) == 0u) { n += 16; a = a << 16; }
  if ((a & 0xff000000u) == 0u) { n += 8;  a = a << 8;  }
  if ((a & 0xf0000000u) == 0u) { n += 4;  a = a << 4;  }
  if ((a & 0xc0000000u) == 0u) { n += 2;  a = a << 2;  }
  if ((a & 0x80000000u) == 0u) return n + 1;
  return n;
}

uint roundShiftRight(uint value, int shift) {
  if (shift <= 0) {
    return value << (-shift);
  }

  if (shift >= 32) {
    if (shift == 32 && value > 0x80000000u) {
      return 1u;
    }
    return 0u;
  }

  uint truncated = value >> shift;
  uint halfShift = 1u << (shift - 1);
  uint remainder = value & ((1u << shift) - 1u);
  if (remainder > halfShift || (remainder == halfShift && (truncated & 1u) == 1u)) {
    return truncated + 1u;
  }
  return truncated;
}

uint makeFloat_(uint sign, int exponent, uint mantissa) {
  return (sign << 31) | (uint(exponent + 127) << 23) | (mantissa & 0x7fffffu);
}

/**
 * Assemble a float32 in bit representation according to IEEE 754
 * https://en.wikipedia.org/wiki/Single-precision_floating-point_format
 */
uint makeFloat(uint sign, int exponent, uint significand) {
  if (significand == 0u) {
    return sign << 31;
  }

  // Remove any extra leading zeros for better precision
  int lead_zeros = countLeadingZeros(significand);
  // Significand is encoded as 1.fraction
  int normalizedExponent = exponent + 31 - lead_zeros;

  if (normalizedExponent > 127) {
    return (sign << 31) | F32_INF;
  }

  uint mantissa;
  if (normalizedExponent >= -126) {
    mantissa = roundShiftRight(significand, 8 - lead_zeros);
    if (mantissa >= 0x1000000u) {
      mantissa >>= 1;
      normalizedExponent++;
      if (normalizedExponent > 127) {
        return (sign << 31) | F32_INF;
      }
    }
    return makeFloat_(sign, normalizedExponent, mantissa);
  }

  int subnormalShift = -149 - exponent;
  mantissa = roundShiftRight(significand, subnormalShift);
  if (mantissa >= 0x800000u) {
    return (sign << 31) | (1u << 23);
  }
  return (sign << 31) | mantissa;
}

/**
 * Parse 8-byte memory as a float64 number according to IEEE 754
 * https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 * Returns 8-byte memory as 2 float32 numbers, consisting of
 * high part: fround(d)
 * low part: d - fround(d)
 */
uvec2 parseAsDouble(uvec2 d) {
  #if LE
  d = d.yx; // to big endian
  #endif

  uint sign = (d[0] >> 31) & 1u; // first bit
  uint exponentBits = (d[0] >> 20) & 0x7ffu;
  int exponent = int(exponentBits) - 1023; // next 11 bits
  uint fractionHigh = d[0] & 0xfffffu;
  uint fractionLow = d[1];

  if (exponentBits == 0x7ffu) {
    if (fractionHigh == 0u && fractionLow == 0u) {
      return uvec2((sign << 31) | F32_INF, F32_NAN);
    }
    return uvec2(F32_NAN);
  }
  
  if (exponentBits == 0u) {
    // All float64 subnormals are too small to survive a float32 split.
    return uvec2(sign << 31);
  }

  if (exponent > 127) {
    return uvec2((sign << 31) | F32_INF, ((1u - sign) << 31) | F32_INF);
  }

  uint hi_part;
  uint low_part;

  // float64 significand has 52 bits
  // float32 significand has 23 bits
  // The significand of the high part is the significand of the double, trimmed
  uint f_hi = 0x800000u | (fractionHigh << 3) | (fractionLow >> 29);
  uint f_low = fractionLow & 0x1fffffffu;

  if (exponent < -126) {
    // For tiny normals, the top 24 significand bits still contribute to the float32
    // high part, but they land in the float32 subnormal range.
    hi_part = makeFloat(sign, exponent - 23, f_hi);

    // The residual keeps the remaining 29 significand bits at the original double scale.
    low_part = makeFloat(sign, exponent - 52, f_low);
    return uvec2(hi_part, low_part);
  }

  bool roundUp = f_low > 0x10000000u || (f_low == 0x10000000u && (f_hi & 1u) == 1u);

  uint f_rounded = f_hi + (roundUp ? 1u : 0u);
  int exponent_hi = exponent;
  if (f_rounded == 0x1000000u) {
    f_rounded = 0x800000u;
    exponent_hi++;
  }

  if (exponent_hi > 127) {
    // Overflows float32 limit
    hi_part = (sign << 31) | F32_INF;
    low_part = ((1u - sign) << 31) | F32_INF;
    return uvec2(hi_part, low_part);
  }
  
  hi_part = makeFloat_(sign, exponent_hi, f_rounded);

  int remainder = int(f_low);
  uint sign_low = sign;
  if (roundUp) {
    remainder -= 0x20000000;
  }
  if (remainder < 0) {
    sign_low = 1u - sign;
    remainder = -remainder;
  }
  low_part = makeFloat(sign_low, exponent - 52, uint(remainder));

  return uvec2(hi_part, low_part);
}

void fround(in uint x[X_LEN], out float result[X_LEN]) {
  int n = X_LEN / 2;
  for (int i = 0; i < n; i++) {
    uvec2 f = parseAsDouble(uvec2(x[i * 2], x[i * 2 + 1]));
    result[i] = uintBitsToFloat(f.x);
    result[i + n] = uintBitsToFloat(f.y);
  }
}
`, Ok = ({ inputs: e, output: t, target: n }) => (ak({
		module: {
			name: "fround",
			vs: Dk
		},
		inputs: e,
		output: t,
		operationType: "uint32",
		outputBuffer: n
	}), { success: !0 });
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/common/random-access-transform.js
function Ak(e, t, n) {
	let r = rk(n), i = ZO(t, 1), a = Array.from({ length: e.size }, (e, t) => `  v[${t}] = ${i}(texelFetch(source_values_texture, ivec2(${t}, rowIndex), 0).r);`).join("\n");
	return {
		name: "source_values_texture",
		vs: `
uniform highp ${r} source_values_texture;
void read_source_values(int rowIndex, out TYPE v[${e.size}]) {
${a}
}
`
	};
}
function jk(e, t, n) {
	let r = n.createTexture({
		width: Math.max(e.size, 1),
		height: e.length,
		format: tk(t),
		usage: F.SAMPLE | F.COPY_DST
	});
	if (e.length === 0) return r;
	let i = n.createCommandEncoder();
	return i.copyBufferToTexture({
		sourceBuffer: e.buffer,
		destinationTexture: r,
		byteOffset: e.offset,
		bytesPerRow: e.stride,
		rowsPerImage: e.length,
		size: [
			e.size,
			e.length,
			1
		]
	}), n.submit(i.finish()), r;
}
var Mk = t((() => {
	I(), ik();
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/gather.js
function Nk(e, t) {
	let n = ZO(e.type, 1), r = "aids_0";
	return e.type !== Ik(t) && (r = `${t}(${r})`), {
		name: "ids",
		vs: `
in ${n} aids_0;
void get_ids(out INDEX_TYPE v[1]) {
  v[0] = ${r};
}
`
	};
}
function Pk(e) {
	return {
		name: "ids",
		stepMode: e.isConstant ? "vertex" : "instance",
		byteStride: e.stride,
		attributes: [{
			attribute: "aids_0",
			format: QO(e.type, 1, e.normalized),
			byteOffset: e.offset
		}]
	};
}
function Fk(e) {
	return {
		name: "gather",
		vs: `
void zero_result(out TYPE result[RESULT_LEN]) {
  for (int i = 0; i < RESULT_LEN; i++) {
    result[i] = ${$O(e)};
  }
}

void gather(in INDEX_TYPE ids[1], out TYPE result[RESULT_LEN]) {
  int sourceIndex = int(ids[0]);
  if (sourceIndex < 0 || sourceIndex >= SOURCE_VALUES_ROWS) {
    zero_result(result);
    return;
  }
  read_source_values(sourceIndex, result);
}
`
	};
}
function Ik(e) {
	switch (e) {
		case "uint": return "uint32";
		case "int": return "sint32";
		default: return "float32";
	}
}
var Lk, Rk = t((() => {
	Y(), ik(), pk(), Mk(), Lk = async ({ inputs: e, output: t, target: n }) => {
		let { ids: r, sourceValues: i } = e, a = n.device, o = lk("result", t.type, t.size), s = ZO(r.type, 1), c = ZO(t.type, 1), l = nk(t.type), u = jk(i, l, a), d = `\
#version 300 es

void main() {
  INDEX_TYPE ids[1];
  get_ids(ids);
  TYPE result[${t.size}];
  gather(ids, result);
  set_result(result);
}
  `, f = new hT(a, {
			vs: d,
			defines: {
				INDEX_TYPE: s,
				TYPE: c,
				RESULT_LEN: t.size.toString(),
				SOURCE_VALUES_ROWS: i.length.toString()
			},
			modules: [
				Nk(r, s),
				Ak(i, t.type, l),
				Fk(t.type),
				o
			],
			bindings: { source_values_texture: u },
			bufferLayout: [Pk(r)],
			vertexCount: 1,
			instanceCount: t.length,
			feedbackBufferMode: "interleaved",
			outputs: o.varyings
		});
		try {
			return f.run({
				inputBuffers: { ids: r.buffer },
				outputBuffers: { [o.varyings[0]]: n }
			}), { success: !0 };
		} finally {
			f.destroy(), u.destroy();
		}
	};
})), zk, Bk, Vk = t((() => {
	pk(), zk = "void row_dot(in TYPE x[X_LEN], in TYPE y[Y_LEN], out float result[1]) {\n  float sum = 0.0;\n  for (int i = 0; i < X_LEN; i++) {\n    sum += float(x[i]) * float(y[i]);\n  }\n  result[0] = sum;\n}\n", Bk = ({ inputs: e, output: t, target: n }) => (ak({
		module: {
			name: "row_dot",
			vs: zk
		},
		inputs: e,
		output: t,
		operationType: "float32",
		outputBuffer: n
	}), { success: !0 });
})), Hk, Uk, Wk = t((() => {
	pk(), Hk = "void equalAll(in TYPE x[X_LEN], in TYPE y[Y_LEN], out uint result[1]) {\n  uint allEqual = uint(1);\n  for (int i = 0; i < X_LEN; i++) {\n    if (x[i] != y[i]) {\n      allEqual = uint(0);\n      break;\n    }\n  }\n  result[0] = allEqual;\n}\n", Uk = ({ inputs: e, output: t, target: n }) => (ak({
		module: {
			name: "equalAll",
			vs: Hk
		},
		inputs: e,
		output: t,
		operationType: t.type === "uint32" ? e.x.type : t.type,
		outputBuffer: n
	}), { success: !0 });
})), Gk, Kk, qk = t((() => {
	pk(), Gk = "void row_length(in TYPE x[X_LEN], out float result[1]) {\n  float sum = 0.0;\n  for (int i = 0; i < X_LEN; i++) {\n    sum += float(x[i]) * float(x[i]);\n  }\n  result[0] = sqrt(sum);\n}\n", Kk = ({ inputs: e, output: t, target: n }) => (ak({
		module: {
			name: "row_length",
			vs: Gk
		},
		inputs: e,
		output: t,
		operationType: "float32",
		outputBuffer: n
	}), { success: !0 });
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/segmented-map.js
function Jk() {
	return {
		name: "segmentedMap",
		vs: "\nuint read_segment_start(int segmentIndex) {\n  TYPE value[1];\n  read_source_values(segmentIndex, value);\n  return uint(value[0]);\n}\n\nvoid segmentedMap(out TYPE result[RESULT_LEN]) {\n  uint vertexIndex = uint(gl_InstanceID);\n  int low = 0;\n  int high = SEGMENTS_LENGTH;\n\n  while (low < high) {\n    int mid = low + (high - low) / 2;\n    uint midStart = read_segment_start(mid);\n    if (midStart <= vertexIndex) {\n      low = mid + 1;\n    } else {\n      high = mid;\n    }\n  }\n\n  uint segmentIndex = uint(max(low - 1, 0));\n  uint segmentStart = read_segment_start(int(segmentIndex));\n  result[0] = segmentIndex;\n  result[1] = vertexIndex - segmentStart;\n}\n"
	};
}
var Yk, Xk = t((() => {
	Y(), Mk(), ik(), pk(), Yk = async ({ inputs: e, output: t, target: n }) => {
		let { segments: r } = e, i = n.device, a = lk("result", t.type, t.size), o = nk(r.type), s = jk(r, o, i), c = new hT(i, {
			vs: "#version 300 es\n\nvoid main() {\n  TYPE result[RESULT_LEN];\n  segmentedMap(result);\n  set_result(result);\n}\n",
			defines: {
				TYPE: "uint",
				RESULT_LEN: t.size.toString(),
				SEGMENTS_LENGTH: r.length.toString()
			},
			modules: [
				Ak(r, t.type, o),
				Jk(),
				a
			],
			bindings: { source_values_texture: s },
			vertexCount: 1,
			instanceCount: t.length,
			feedbackBufferMode: "interleaved",
			outputs: a.varyings
		});
		try {
			return c.run({ outputBuffers: { [a.varyings[0]]: n } }), { success: !0 };
		} finally {
			c.destroy(), s.destroy();
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgl/select.js
function Zk(e, t, n, r) {
	return n < t.size ? `${e}[${n}]` : t.size === 1 ? `${e}[0]` : r;
}
var Qk, $k = t((() => {
	pk(), ik(), Qk = async ({ inputs: e, output: t, target: n }) => {
		let r = $O(ZO(t.type, 1, t.normalized));
		return ak({
			module: {
				name: "select",
				vs: ""
			},
			inputs: e,
			output: t,
			operationType: t.type,
			outputBuffer: n,
			expression: (t) => {
				let n = Zk("condition", e.condition, t, r), i = Zk("whenTrue", e.whenTrue, t, r), a = Zk("whenFalse", e.whenFalse, t, r);
				return `(${n} != ${r} ? ${i} : ${a})`;
			}
		}), { success: !0 };
	};
})), eA, tA = t((() => {
	Y(), pk(), eA = ({ inputs: e, output: t, target: n }) => {
		let r = lk("result", t.type, t.size), i = new hT(n.device, {
			vs: "#version 300 es\n\nvoid main() {\n  int result[1];\n  result[0] = START + gl_InstanceID * STEP;\n  set_result(result);\n}\n",
			defines: {
				START: e.start.toString(),
				STEP: e.step.toString()
			},
			modules: [r],
			vertexCount: 1,
			instanceCount: t.length,
			feedbackBufferMode: "interleaved",
			outputs: r.varyings
		});
		try {
			return i.run({ outputBuffers: { [r.varyings[0]]: n } }), { success: !0 };
		} finally {
			i.destroy();
		}
	};
})), nA, rA = t((() => {
	pk(), nA = ({ inputs: e, output: t, target: n }) => {
		let { columns: r } = e;
		return ak({
			module: {
				name: "swizzle",
				vs: "// swizzle expression handled inline"
			},
			expression: (e) => `x[${r[e]}]`,
			inputs: { x: e.x },
			output: t,
			outputBuffer: n
		}), { success: !0 };
	};
})), iA = /* @__PURE__ */ n({
	arithmetic: () => hk,
	dot: () => Bk,
	equalAll: () => Uk,
	extent: () => yk,
	fround: () => Ok,
	gather: () => Lk,
	interleave: () => wk,
	length: () => Kk,
	segmentedMap: () => Yk,
	select: () => Qk,
	sequence: () => eA,
	swizzle: () => nA
}), aA = t((() => {
	gk(), xk(), Tk(), kk(), Rk(), Vk(), Wk(), qk(), Xk(), $k(), tA(), rA();
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/common/dispatch.js
function oA(e, t) {
	let n = lA(t), r = Math.max(1, Math.ceil(e)), i = Math.min(r, n), a = Math.min(Math.ceil(r / i), n), o = Math.ceil(r / i / a);
	if (o > n) throw Error(`WebGPU dispatch requires ${r} workgroups, exceeding the 3D dispatch limit of ${n} per dimension`);
	return {
		x: i,
		y: a,
		z: o
	};
}
function sA(e, t = "workgroupId") {
	return `((${t}.z * ${e.y}u + ${t}.y) * ${e.x}u + ${t}.x)`;
}
function cA(e, t, n = "workgroupId", r = "localId") {
	return `(${sA(e, n)} * ${t}u + ${r}.x)`;
}
function lA(e) {
	return Number.isFinite(e) && e > 0 ? Math.floor(e) : uA;
}
var uA, dA = t((() => {
	uA = 65535;
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/common/helper.js
function fA(e, t) {
	switch (e) {
		case "u32": return `${t}u`;
		case "f32": return Number.isInteger(t) ? `${t}.0` : `${t}`;
		default: return `${t}`;
	}
}
function pA(e, t) {
	switch (e) {
		case "uint32": return fA("u32", Math.trunc(t));
		case "sint32": return `${Math.trunc(t)}`;
		case "float32": return fA("f32", t);
		default: throw Error(`WebGPU operations only support 32-bit output types, got ${e}`);
	}
}
function mA(e) {
	switch (e) {
		case "uint32": return "0u";
		case "sint32": return "0";
		case "float32": return "0.0";
		default: throw Error(`WebGPU operations only support 32-bit output types, got ${e}`);
	}
}
function $(e) {
	switch (e) {
		case "uint32": return "u32";
		case "sint32": return "i32";
		case "float32": return "f32";
		default: throw Error(`WebGPU operations only support 32-bit storage types, got ${e}`);
	}
}
var hA = t((() => {}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/common/row-transform.js
function gA({ module: e, elementWise: t = !1, expression: n, inputs: r, output: i, operationType: a = i.type, outputBuffer: o }) {
	if (!e.source) throw Error(`WebGPU computation ${e.name} requires WGSL source`);
	let s = SA(r), c = s.map(([e, t]) => ({
		name: e,
		input: t
	})), l = c.filter(({ input: e }) => !e.isConstant).map((e, t) => ({
		...e,
		index: t
	})), u = $(a), d = $(i.type), f = {
		TYPE: u,
		RESULT_LEN: i.size.toString()
	}, p = oA(Math.ceil(i.length / TA), o.device.limits.maxComputeWorkgroupsPerDimension);
	for (let [e, t] of s) f[`${e.toUpperCase()}_LEN`] = t.size.toString();
	let m = `
${wA(e.source, f)}
${l.map(({ name: e, input: t, index: n }) => _A(e, t, n)).join("\n")}
${c.map(({ name: e, input: t }) => vA(e, t, a)).join("\n")}
${yA(i, l.length)}
${bA(i)}

@compute @workgroup_size(${TA}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${cA(p, TA)};
  if (rowIndex >= ${i.length}u) {
    return;
  }

${c.map(({ name: e }) => `  let ${e} = read_${e}(rowIndex);`).join("\n")}
  var result: array<${d}, ${i.size}>;
${xA(e.name, s, i, t, n)}
  write_result(rowIndex, result);
}
`, h = new CT(o.device, {
		source: m,
		modules: e.dependencies,
		shaderAssembler: OA,
		shaderLayout: { bindings: [...l.map(({ name: e }, t) => ({
			name: e,
			type: "storage",
			group: 0,
			location: t
		})), {
			name: "result",
			type: "storage",
			group: 0,
			location: l.length
		}] }
	}), g = Object.fromEntries(l.map(({ name: e, input: t }) => [e, t.buffer]));
	g.result = o, h.setBindings(g);
	let _ = o.device.beginComputePass({});
	o.device.statsManager.getStats(EA).get(DA).incrementCount(), h.dispatch(_, p.x, p.y, p.z), _.end(), o.device.submit(), h.destroy();
}
function _A(e, t, n) {
	return t.isConstant ? "" : `@group(0) @binding(${n}) var<storage, read> ${e}: array<${$(t.type)}>;`;
}
function vA(e, t, n) {
	let r = $(n), i = t.type === n ? "" : r, a = t.stride / t.ValueType.BYTES_PER_ELEMENT, o = t.offset / t.ValueType.BYTES_PER_ELEMENT;
	return t.isConstant ? `fn read_${e}(_rowIndex: u32) -> array<${r}, ${t.size}> {
  return array<${r}, ${t.size}>(${CA(t, i)});
}` : `fn read_${e}(rowIndex: u32) -> array<${r}, ${t.size}> {
  var value: array<${r}, ${t.size}>;
  let rowOffset = ${o}u + rowIndex * ${a}u;
${Array.from({ length: t.size }, (t, n) => i ? `  value[${n}] = ${i}(${e}[rowOffset + ${n}u]);` : `  value[${n}] = ${e}[rowOffset + ${n}u];`).join("\n")}
  return value;
}`;
}
function yA(e, t) {
	return `@group(0) @binding(${t}) var<storage, read_write> result: array<${$(e.type)}>;`;
}
function bA(e) {
	let t = e.stride / e.ValueType.BYTES_PER_ELEMENT, n = e.offset / e.ValueType.BYTES_PER_ELEMENT;
	return `fn write_result(rowIndex: u32, value: array<${$(e.type)}, ${e.size}>) {
  let rowOffset = ${n}u + rowIndex * ${t}u;
${Array.from({ length: e.size }, (e, t) => `  result[rowOffset + ${t}u] = value[${t}];`).join("\n")}
}`;
}
function xA(e, t, n, r, i) {
	let a = "";
	if (i) for (let e = 0; e < n.size; e++) a += `  result[${e}] = ${i(e)};\n`;
	else if (r) {
		let r = mA(n.type), i = $(n.type);
		for (let o = 0; o < n.size; o++) {
			let n = t.map(([e, t]) => o < t.size ? $(t.type) === i ? `${e}[${o}]` : `${i}(${e}[${o}])` : r);
			a += `  result[${o}] = ${e}(${n.join(", ")});\n`;
		}
	} else a += `result = ${e}(${t.map(([e]) => e).join(", ")});`;
	return a.trimEnd();
}
function SA(e) {
	return Array.isArray(e) ? e.map((e, t) => [`x${t}`, e]) : Object.entries(e);
}
function CA(e, t) {
	let n = e.value;
	if (!n) throw Error(`Constant input ${e} is missing CPU values`);
	return Array.from({ length: e.size }, (e, r) => fA(t, n[r] ?? 0)).join(", ");
}
function wA(e, t) {
	for (let n in t) e = e.replaceAll(`{${n}}`, t[n]);
	return e;
}
var TA, EA, DA, OA, kA = t((() => {
	Y(), G(), dA(), hA(), TA = 64, EA = "GPGPU Operation Counts", DA = "Computation Runs", OA = new $g();
})), AA, jA, MA = t((() => {
	G(), XO(), TO(), kA(), hA(), AA = "fn arithmetic_add(x: {TYPE}, y: {TYPE}) -> {TYPE} {\n  return x + y;\n}\n\nfn arithmetic_subtract(x: {TYPE}, y: {TYPE}) -> {TYPE} {\n  return x - y;\n}\n\nfn arithmetic_multiply(x: {TYPE}, y: {TYPE}) -> {TYPE} {\n  return x * y;\n}\n\nfn arithmetic_divide(x: {TYPE}, y: {TYPE}) -> {TYPE} {\n  return x / y;\n}\n\nfn arithmetic_tan(x: f32) -> f32 {\n  return tan_fp32(x);\n}\n", jA = ({ inputs: e, output: t, target: n }) => {
		let r = t.type, i = $(r), a = mA(r), o = e.namedInputs;
		return gA({
			module: {
				name: "arithmetic",
				source: AA,
				dependencies: [ny]
			},
			inputs: o,
			output: t,
			operationType: r,
			outputBuffer: n,
			expression: (t) => JO(e.expression, {
				operations: wO,
				inputs: o,
				laneIndex: t,
				formatInput: (e) => `${e}[${t}]`,
				formatOutOfBoundsInput: (e) => o[e].size === 1 ? `${e}[0]` : a,
				formatLiteral: (e) => {
					let n = Array.isArray(e) ? e[t] ?? 0 : e;
					return `${i}(${pA(r, n)})`;
				},
				formatCall: (e, t) => `${e}(${t.join(", ")})`
			})
		}), { success: !0 };
	};
})), NA, PA, FA = t((() => {
	kA(), NA = "fn row_dot(x: array<{TYPE}, {X_LEN}>, y: array<{TYPE}, {Y_LEN}>) -> array<f32, 1> {\n  var sum = 0.0;\n  for (var i = 0u; i < {X_LEN}u; i = i + 1u) {\n    sum += f32(x[i]) * f32(y[i]);\n  }\n  return array<f32, 1>(sum);\n}\n", PA = ({ inputs: e, output: t, target: n }) => (gA({
		module: {
			name: "row_dot",
			source: NA
		},
		inputs: e,
		output: t,
		operationType: "float32",
		outputBuffer: n
	}), { success: !0 });
})), IA, LA, RA = t((() => {
	kA(), IA = "fn equalAll(x: array<{TYPE}, {X_LEN}>, y: array<{TYPE}, {Y_LEN}>) -> array<u32, 1> {\n  var allEqual = 1u;\n  for (var i = 0u; i < {X_LEN}u; i = i + 1u) {\n    if (x[i] != y[i]) {\n      allEqual = 0u;\n      break;\n    }\n  }\n  return array<u32, 1>(allEqual);\n}\n", LA = ({ inputs: e, output: t, target: n }) => (gA({
		module: {
			name: "equalAll",
			source: IA
		},
		inputs: e,
		output: t,
		operationType: e.x.type,
		outputBuffer: n
	}), { success: !0 });
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/common/random-access-transform.js
function zA(e, t, n) {
	return `@group(0) @binding(${n}) var<storage, read> ${e}: array<${$(t.type)}>;`;
}
function BA(e, t, n, r = e) {
	let i = $(n);
	if (t.isConstant) {
		let e = t.value;
		if (!e) throw Error(`Constant input ${t} is missing CPU values`);
		return `fn read_${r}(_sourceIndex: u32) -> array<${i}, ${t.size}> {
  return array<${i}, ${t.size}>(${Array.from({ length: t.size }, (t, n) => fA(i, e[n] ?? 0)).join(", ")});
}`;
	}
	let a = t.stride / t.ValueType.BYTES_PER_ELEMENT, o = t.offset / t.ValueType.BYTES_PER_ELEMENT, s = $(t.type) === i ? "" : `${i}`;
	return `fn read_${r}(sourceIndex: u32) -> array<${i}, ${t.size}> {
  var value: array<${i}, ${t.size}>;
  let rowOffset = ${o}u + sourceIndex * ${a}u;
${Array.from({ length: t.size }, (t, n) => s ? `  value[${n}] = ${s}(${e}[rowOffset + ${n}u]);` : `  value[${n}] = ${e}[rowOffset + ${n}u];`).join("\n")}
  return value;
}`;
}
function VA(e, t) {
	return BA("sourceValues", e, t, "source_values");
}
function HA(e, t) {
	return `@group(0) @binding(${t}) var<storage, read_write> result: array<${$(e.type)}>;`;
}
function UA(e) {
	let t = e.stride / e.ValueType.BYTES_PER_ELEMENT, n = e.offset / e.ValueType.BYTES_PER_ELEMENT;
	return `fn write_result(rowIndex: u32, value: array<${$(e.type)}, ${e.size}>) {
  let rowOffset = ${n}u + rowIndex * ${t}u;
${Array.from({ length: e.size }, (e, t) => `  result[rowOffset + ${t}u] = value[${t}];`).join("\n")}
}`;
}
function WA(e, t) {
	let n = mA(e);
	return `fn zero_result() -> array<${$(e)}, ${t}> {
  var result: array<${$(e)}, ${t}>;
${Array.from({ length: t }, (e, t) => `  result[${t}] = ${n};`).join("\n")}
  return result;
}`;
}
var GA = t((() => {
	hA();
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/extent.js
function KA({ input: e, inputMode: t, inputGroupCount: n, channelCount: r, outputType: i, outputBuffer: a, outputLength: o, outputStride: s, outputOffset: c }) {
	let l = $(i), u = oA(o, a.device.limits.maxComputeWorkgroupsPerDimension), d = new Z({
		buffer: a,
		type: i,
		size: 2,
		length: o,
		stride: s,
		offset: c
	}), f = `
${e.isConstant ? "" : zA("sourceValues", e, 0)}
${VA(e, i)}
${HA(d, +!e.isConstant)}
${UA(d)}
${qA(t, i, r, n)}

var<workgroup> sharedMin: array<${l}, 64>;
var<workgroup> sharedMax: array<${l}, 64>;

@compute @workgroup_size(64) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let outputRowIndex = ${sA(u)};
  if (outputRowIndex >= ${o}u) {
    return;
  }

  let channelIndex = outputRowIndex % ${r}u;
  let outputGroupIndex = outputRowIndex / ${r}u;
  let inputGroupIndex = outputGroupIndex * 64u + localId.x;

  let result = extent_pass(channelIndex, inputGroupIndex);
  sharedMin[localId.x] = result[0];
  sharedMax[localId.x] = result[1];
  workgroupBarrier();

  var stride = 32u;
  loop {
    if (stride == 0u) {
      break;
    }
    if (localId.x < stride) {
      let compareIndex = localId.x + stride;
      if (sharedMin[compareIndex] < sharedMin[localId.x]) {
        sharedMin[localId.x] = sharedMin[compareIndex];
      }
      if (sharedMax[compareIndex] > sharedMax[localId.x]) {
        sharedMax[localId.x] = sharedMax[compareIndex];
      }
    }
    workgroupBarrier();
    stride = stride / 2u;
  }

  if (localId.x == 0u) {
    write_result(outputRowIndex, array<${l}, 2>(sharedMin[0], sharedMax[0]));
  }
}
`, p = new CT(a.device, {
		source: f,
		shaderLayout: { bindings: [...e.isConstant ? [] : [{
			name: "sourceValues",
			type: "storage",
			group: 0,
			location: 0
		}], {
			name: "result",
			type: "storage",
			group: 0,
			location: +!e.isConstant
		}] }
	}), m = { result: a };
	e.isConstant || (m.sourceValues = e.buffer), p.setBindings(m);
	let h = a.device.beginComputePass({});
	p.dispatch(h, u.x, u.y, u.z), h.end(), a.device.submit(), p.destroy();
}
function qA(e, t, n, r) {
	let i = $(t), [a, o] = JA(t);
	return e === "raw" ? `fn extent_pass(channelIndex: u32, inputGroupIndex: u32) -> array<${i}, 2> {
  var result: array<${i}, 2>;
  result[0] = ${a};
  result[1] = ${o};

  if (inputGroupIndex < ${r}u) {
    let value = read_source_values(inputGroupIndex);
    result[0] = value[channelIndex];
    result[1] = value[channelIndex];
  }

  return result;
}` : `fn extent_pass(channelIndex: u32, inputGroupIndex: u32) -> array<${i}, 2> {
  var result: array<${i}, 2>;
  result[0] = ${a};
  result[1] = ${o};

  if (inputGroupIndex < ${r}u) {
    let rowIndex = inputGroupIndex * ${n}u + channelIndex;
    let value = read_source_values(rowIndex);
    result[0] = value[0];
    result[1] = value[1];
  }

  return result;
}`;
}
function JA(e) {
	switch (e) {
		case "uint32": return ["0xffffffffu", "0u"];
		case "sint32": return ["2147483647", "-2147483648"];
		case "float32": return ["3.402823e38", "-3.402823e38"];
		default: throw Error(`Unsupported WebGPU extent type for ${e}`);
	}
}
var YA, XA = t((() => {
	Y(), bO(), lO(), dA(), hA(), GA(), YA = ({ inputs: e, output: t, target: n }) => {
		let { sourceValues: r } = e;
		if (r.length === 0) {
			let e = new t.ValueType(t.length * t.size);
			return n.write(e), {
				success: !0,
				value: e
			};
		}
		if (r.isConstant) {
			let e = r.value;
			if (!e) throw Error(`Constant input ${r} is missing CPU values`);
			let i = new t.ValueType(t.length * t.size);
			for (let n = 0; n < t.length; n++) {
				let t = e[n];
				i[n * 2] = t, i[n * 2 + 1] = t;
			}
			return n.write(i), {
				success: !0,
				value: i
			};
		}
		let i = [], a = r, o = "raw", s = r.length;
		try {
			for (;;) {
				let e = Math.ceil(s / 64), r = t.length * e, c = e === 1 ? n : cO.createOrReuse(n.device, r * t.stride);
				if (e > 1 && i.push(c), KA({
					input: a,
					inputMode: o,
					inputGroupCount: s,
					channelCount: t.length,
					outputType: t.type,
					outputBuffer: c,
					outputLength: r,
					outputStride: t.stride,
					outputOffset: t.offset
				}), e === 1) break;
				a = new Z({
					buffer: c,
					type: t.type,
					size: 2,
					length: r
				}), o = "partial", s = e;
			}
			return { success: !0 };
		} finally {
			for (let e of i) cO.recycle(e);
		}
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/fround.js
function ZA() {
	let e = new Uint16Array([255]);
	return new Uint8Array(e.buffer)[0] > 0;
}
var QA, $A, ej = t((() => {
	kA(), QA = `\
const LE: bool = ${ZA() ? "true" : "false"};
const F32_NAN: u32 = 0xffffffffu;
const F32_INF: u32 = 0x7f800000u;

fn roundShiftRight(value: u32, shift: i32) -> u32 {
  if (shift <= 0) {
    return value << u32(-shift);
  }

  if (shift >= 32) {
    if (shift == 32 && value > 0x80000000u) {
      return 1u;
    }
    return 0u;
  }

  let shiftU32 = u32(shift);
  let truncated = value >> shiftU32;
  let halfShift = 1u << u32(shift - 1);
  let remainder = value & ((1u << shiftU32) - 1u);
  if (remainder > halfShift || (remainder == halfShift && (truncated & 1u) == 1u)) {
    return truncated + 1u;
  }
  return truncated;
}

fn makeFloatImmediate(sign: u32, exponent: i32, mantissa: u32) -> u32 {
  return (sign << 31u) | (u32(exponent + 127) << 23u) | (mantissa & 0x7fffffu);
}

fn makeFloat(sign: u32, exponent: i32, significand: u32) -> u32 {
  if (significand == 0u) {
    return sign << 31u;
  }

  let leadingZeros = i32(countLeadingZeros(significand));
  var normalizedExponent = exponent + 31 - leadingZeros;

  if (normalizedExponent > 127) {
    return (sign << 31u) | F32_INF;
  }

  var mantissa: u32;
  if (normalizedExponent >= -126) {
    mantissa = roundShiftRight(significand, 8 - leadingZeros);
    if (mantissa >= 0x1000000u) {
      mantissa = mantissa >> 1u;
      normalizedExponent += 1;
      if (normalizedExponent > 127) {
        return (sign << 31u) | F32_INF;
      }
    }
    return makeFloatImmediate(sign, normalizedExponent, mantissa);
  }

  let subnormalShift = -149 - exponent;
  mantissa = roundShiftRight(significand, subnormalShift);
  if (mantissa >= 0x800000u) {
    return (sign << 31u) | (1u << 23u);
  }
  return (sign << 31u) | mantissa;
}

fn parseAsDouble(words: vec2<u32>) -> vec2<u32> {
  var d = words;
  if (LE) {
    d = d.yx;
  }

  let sign = (d.x >> 31u) & 1u;
  let exponentBits = (d.x >> 20u) & 0x7ffu;
  let exponent = i32(exponentBits) - 1023;
  let fractionHigh = d.x & 0xfffffu;
  let fractionLow = d.y;

  if (exponentBits == 0x7ffu) {
    if (fractionHigh == 0u && fractionLow == 0u) {
      return vec2<u32>((sign << 31u) | F32_INF, F32_NAN);
    }
    return vec2<u32>(F32_NAN);
  }

  if (exponentBits == 0u) {
    return vec2<u32>(sign << 31u);
  }

  if (exponent > 127) {
    return vec2<u32>((sign << 31u) | F32_INF, ((1u - sign) << 31u) | F32_INF);
  }

  let highSignificand = 0x800000u | (fractionHigh << 3u) | (fractionLow >> 29u);
  let lowSignificand = fractionLow & 0x1fffffffu;

  if (exponent < -126) {
    let highPart = makeFloat(sign, exponent - 23, highSignificand);
    let lowPart = makeFloat(sign, exponent - 52, lowSignificand);
    return vec2<u32>(highPart, lowPart);
  }

  let roundUp = lowSignificand > 0x10000000u ||
    (lowSignificand == 0x10000000u && (highSignificand & 1u) == 1u);

  var roundedSignificand = highSignificand + select(0u, 1u, roundUp);
  var highExponent = exponent;
  if (roundedSignificand == 0x1000000u) {
    roundedSignificand = 0x800000u;
    highExponent += 1;
  }

  if (highExponent > 127) {
    return vec2<u32>((sign << 31u) | F32_INF, ((1u - sign) << 31u) | F32_INF);
  }

  let highPart = makeFloatImmediate(sign, highExponent, roundedSignificand);

  var remainder = i32(lowSignificand);
  var lowSign = sign;
  if (roundUp) {
    remainder -= 0x20000000;
  }
  if (remainder < 0) {
    lowSign = 1u - sign;
    remainder = -remainder;
  }

  let lowPart = makeFloat(lowSign, exponent - 52, u32(remainder));
  return vec2<u32>(highPart, lowPart);
}

fn fround(x: array<u32, {X_LEN}>) -> array<f32, {RESULT_LEN}> {
  var result: array<f32, {RESULT_LEN}>;
  let n = {X_LEN}u / 2u;
  for (var i = 0u; i < n; i = i + 1u) {
    let parts = parseAsDouble(vec2<u32>(x[i * 2u], x[i * 2u + 1u]));
    result[i] = bitcast<f32>(parts.x);
    result[i + n] = bitcast<f32>(parts.y);
  }
  return result;
}
`, $A = ({ inputs: e, output: t, target: n }) => (gA({
		module: {
			name: "fround",
			source: QA
		},
		inputs: e,
		output: t,
		operationType: "uint32",
		outputBuffer: n
	}), { success: !0 });
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/gather.js
function tj(e, t) {
	if (e.isConstant) {
		let n = e.value;
		if (!n) throw Error(`Constant input ${e} is missing CPU values`);
		return `fn read_ids(_rowIndex: u32) -> ${t} {
  return ${fA(t, n[0] ?? 0)};
}`;
	}
	let n = e.stride / e.ValueType.BYTES_PER_ELEMENT;
	return `fn read_ids(rowIndex: u32) -> ${t} {
  let rowOffset = ${e.offset / e.ValueType.BYTES_PER_ELEMENT}u + rowIndex * ${n}u;
  return ids[rowOffset];
}`;
}
function nj(e, t, n, r) {
	let i = $(e);
	return `fn gather(idsValue: ${i}) -> array<${$(t)}, ${n}> {
  let sourceIndex = ${i === "u32" ? "i32(idsValue)" : i === "i32" ? "idsValue" : "i32(idsValue)"};
  if (sourceIndex < 0 || sourceIndex >= ${r}) {
    return zero_result();
  }
  return read_source_values(u32(sourceIndex));
}`;
}
var rj, ij = t((() => {
	Y(), dA(), hA(), GA(), rj = async ({ inputs: e, output: t, target: n }) => {
		let { ids: r, sourceValues: i } = e, a = $(r.type), o = [];
		r.isConstant || o.push({
			name: "ids",
			input: r,
			index: o.length
		}), i.isConstant || o.push({
			name: "sourceValues",
			input: i,
			index: o.length
		});
		let s = oA(Math.ceil(t.length / 64), n.device.limits.maxComputeWorkgroupsPerDimension), c = `
${o.map(({ name: e, input: t, index: n }) => zA(e, t, n)).join("\n")}
${tj(r, a)}
${VA(i, t.type)}
${HA(t, o.length)}
${UA(t)}
${WA(t.type, t.size)}
${nj(r.type, t.type, t.size, i.length)}

@compute @workgroup_size(64) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${cA(s, 64)};
  if (rowIndex >= ${t.length}u) {
    return;
  }

  let idsValue = read_ids(rowIndex);
  let result = gather(idsValue);
  write_result(rowIndex, result);
}
`, l = new CT(n.device, {
			source: c,
			shaderLayout: { bindings: [...o.map(({ name: e, index: t }) => ({
				name: e,
				type: "storage",
				group: 0,
				location: t
			})), {
				name: "result",
				type: "storage",
				group: 0,
				location: o.length
			}] }
		}), u = {};
		r.isConstant || (u.ids = r.buffer), i.isConstant || (u.sourceValues = i.buffer), u.result = n, l.setBindings(u);
		let d = n.device.beginComputePass({});
		return l.dispatch(d, s.x, s.y, s.z), d.end(), n.device.submit(), l.destroy(), { success: !0 };
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/segmented-map.js
function aj(e) {
	return `fn segmented_map(vertexIndex: u32) -> array<u32, 2> {
  var low = 0i;
  var high = ${e}i;
  while (low < high) {
    let mid = low + (high - low) / 2i;
    let midStart = read_segments(u32(mid))[0];
    if (midStart <= vertexIndex) {
      low = mid + 1i;
    } else {
      high = mid;
    }
  }

  let segmentIndex = u32(max(low - 1i, 0i));
  let segmentStart = read_segments(segmentIndex)[0];
  return array<u32, 2>(segmentIndex, vertexIndex - segmentStart);
}`;
}
var oj, sj = t((() => {
	Y(), dA(), GA(), oj = async ({ inputs: e, output: t, target: n }) => {
		let { segments: r } = e, i = r.isConstant ? [] : [{
			name: "segments",
			input: r,
			index: 0
		}], a = oA(Math.ceil(t.length / 64), n.device.limits.maxComputeWorkgroupsPerDimension), o = `
${i.map(({ name: e, input: t, index: n }) => zA(e, t, n)).join("\n")}
${BA("segments", r, "uint32")}
${HA(t, i.length)}
${UA(t)}
${aj(r.length)}

@compute @workgroup_size(64) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${cA(a, 64)};
  if (rowIndex >= ${t.length}u) {
    return;
  }

  let result = segmented_map(rowIndex);
  write_result(rowIndex, result);
}
`, s = new CT(n.device, {
			source: o,
			shaderLayout: { bindings: [...i.map(({ name: e, index: t }) => ({
				name: e,
				type: "storage",
				group: 0,
				location: t
			})), {
				name: "result",
				type: "storage",
				group: 0,
				location: i.length
			}] }
		}), c = Object.fromEntries(i.map(({ name: e, input: t }) => [e, t.buffer]));
		c.result = n, s.setBindings(c);
		let l = n.device.beginComputePass({});
		return s.dispatch(l, a.x, a.y, a.z), l.end(), n.device.submit(), s.destroy(), { success: !0 };
	};
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/interleave.js
function cj(e, t) {
	let n = t.filter(([, e]) => !e.isConstant).length + 1;
	if (n > e.maxStorageBuffersPerShaderStage) throw Error(`interleave() requires ${n} storage buffers, exceeding device limit ${e.maxStorageBuffersPerShaderStage}`);
	if (n > e.maxBindingsPerBindGroup) throw Error(`interleave() requires ${n} bindings, exceeding bind group limit ${e.maxBindingsPerBindGroup}`);
}
var lj, uj = t((() => {
	kA(), lj = ({ inputs: e, output: t, target: n }) => {
		let r = e.map((e, t) => [`x${t}`, e]);
		cj(n.device.limits, r);
		let i = r.map(([e, t]) => `${e}: array<{TYPE}, ${t.size}>`).join(", "), a = 0;
		return gA({
			module: {
				name: "interleave",
				source: `\
fn interleave(${i}) -> array<{TYPE}, {RESULT_LEN}> {
  var out: array<{TYPE}, {RESULT_LEN}>;
${r.map(([e, t]) => {
					let n = Array.from({ length: t.size }, (t, n) => `  out[${a + n}] = ${e}[${n}];`).join("\n");
					return a += t.size, n;
				}).join("\n")}
  return out;
}
`
			},
			inputs: e,
			output: t,
			outputBuffer: n
		}), { success: !0 };
	};
})), dj, fj, pj = t((() => {
	kA(), dj = "fn row_length(x: array<{TYPE}, {X_LEN}>) -> array<f32, 1> {\n  var sum = 0.0;\n  for (var i = 0u; i < {X_LEN}u; i = i + 1u) {\n    sum += f32(x[i]) * f32(x[i]);\n  }\n  return array<f32, 1>(sqrt(sum));\n}\n", fj = ({ inputs: e, output: t, target: n }) => (gA({
		module: {
			name: "row_length",
			source: dj
		},
		inputs: e,
		output: t,
		operationType: "float32",
		outputBuffer: n
	}), { success: !0 });
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/webgpu/select.js
function mj(e, t, n, r) {
	return n < t.size ? `${e}[${n}]` : t.size === 1 ? `${e}[0]` : r;
}
var hj, gj = t((() => {
	kA(), hA(), hj = async ({ inputs: e, output: t, target: n }) => {
		let r = mA(t.type);
		return gA({
			module: {
				name: "select",
				source: "// inline expression select\n"
			},
			inputs: e,
			output: t,
			operationType: t.type,
			outputBuffer: n,
			expression: (t) => {
				let n = mj("condition", e.condition, t, r), i = mj("whenTrue", e.whenTrue, t, r);
				return `select(${mj("whenFalse", e.whenFalse, t, r)}, ${i}, ${n} != ${r})`;
			}
		}), { success: !0 };
	};
})), _j, vj, yj = t((() => {
	Y(), dA(), _j = 64, vj = ({ inputs: e, output: t, target: n }) => {
		let r = oA(Math.ceil(t.length / _j), n.device.limits.maxComputeWorkgroupsPerDimension), i = `\
@group(0) @binding(0) var<storage, read_write> result: array<i32>;

@compute @workgroup_size(${_j}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${cA(r, _j)};
  if (rowIndex >= ${t.length}u) {
    return;
  }

  let rowOffset = ${t.offset / t.ValueType.BYTES_PER_ELEMENT}u + rowIndex * ${t.stride / t.ValueType.BYTES_PER_ELEMENT}u;
  result[rowOffset] = ${e.start} + i32(rowIndex) * ${e.step};
}
`, a = new CT(n.device, {
			source: i,
			shaderLayout: { bindings: [{
				name: "result",
				type: "storage",
				group: 0,
				location: 0
			}] }
		});
		a.setBindings({ result: n });
		let o = n.device.beginComputePass({});
		return a.dispatch(o, r.x, r.y, r.z), o.end(), n.device.submit(), a.destroy(), { success: !0 };
	};
})), bj, xj = t((() => {
	kA(), bj = ({ inputs: e, output: t, target: n }) => {
		let { columns: r } = e;
		return gA({
			module: {
				name: "swizzle",
				source: "// swizzle expression handled inline"
			},
			expression: (e) => `x[${r[e]}]`,
			inputs: { x: e.x },
			output: t,
			outputBuffer: n
		}), { success: !0 };
	};
})), Sj = /* @__PURE__ */ n({
	arithmetic: () => jA,
	dot: () => PA,
	equalAll: () => LA,
	extent: () => YA,
	fround: () => $A,
	gather: () => rj,
	interleave: () => lj,
	length: () => fj,
	segmentedMap: () => oj,
	select: () => hj,
	sequence: () => vj,
	swizzle: () => bj
}), Cj = t((() => {
	MA(), FA(), RA(), XA(), ej(), ij(), sj(), uj(), pj(), gj(), yj(), xj();
}));
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operation/backend-registry.js
I();
var wj = new class {
	_modules = { cpu: KO };
	add(e, t) {
		let n = this._modules[e];
		if (typeof t.then == "function") {
			let r = Promise.all([Promise.resolve(n || {}), t]).then(([e, t]) => ({
				...e,
				...t
			}));
			return this._modules[e] = r, r.then((t) => {
				this._modules[e] = t;
			}).catch((t) => {
				O.error(`Failed to register ${e} backend: ${t}`)();
			}), r;
		}
		if (n && typeof n.then == "function") {
			let r = Promise.resolve(n).then((e) => ({
				...e,
				...t
			})).then((t) => (this._modules[e] = t, t)).catch((t) => {
				throw O.error(`Failed to register ${e} backend: ${t}`)(), t;
			});
			return this._modules[e] = r, r;
		}
		let r = {
			...n || {},
			...t
		};
		return this._modules[e] = r, Promise.resolve(r);
	}
	async get(e, t) {
		let n = this._modules[e];
		if (!n) {
			if (e === "webgl") n = this.add("webgl", Promise.resolve().then(() => (aA(), iA)));
			else if (e === "webgpu") n = this.add("webgpu", Promise.resolve().then(() => (Cj(), Sj)));
			else throw Error(`${e} backend not registered`);
		}
		let r = (await n)[t];
		if (typeof r != "function") throw Error(`${e} backend does not implement ${t}`);
		return r;
	}
	getSync(e, t) {
		let n = this._modules[e];
		if (!n) throw Error(`${e} backend not registered`);
		if (typeof n.then == "function") throw Error(`${e} backend is not loaded yet`);
		let r = n[t];
		if (typeof r != "function") throw Error(`${e} backend does not implement ${t}`);
		return r;
	}
	clear() {
		this._modules = {};
	}
}();
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operation/operation.js
bO();
var Tj = class {
	inputs;
	dependencies;
	constructor(e) {
		this.inputs = e, this.dependencies = Array.from(e instanceof Array ? e : Object.values(e)).filter((e) => e instanceof Z);
	}
	async execute(e, t) {
		return await this._resolveDependencies(e), await this._executeWithHandler(await wj.get(this._getHandlerRegistry(e), this.name), t);
	}
	executeSync(e, t) {
		this._resolveDependenciesSync(e);
		let n = this._executeWithHandler(wj.getSync(this._getHandlerRegistry(e), this.name), t);
		if (Ej(n)) throw Error(`${this.name} returned a Promise in executeSync()`);
		return n;
	}
	shouldExecuteOnCPU() {
		return this.output.length <= 1 && Array.from(this.dependencies).every((e) => !!e.value);
	}
	_getHandlerRegistry(e) {
		return this.shouldExecuteOnCPU() ? "cpu" : e.type;
	}
	async _resolveDependencies(e) {
		for (let t of this.dependencies) await t.evaluate(e);
		if (this._getHandlerRegistry(e) === "cpu" || e.type === "null") for (let e of this.dependencies) await e.ensureCPUValue();
	}
	_resolveDependenciesSync(e) {
		for (let t of this.dependencies) t.evaluateSync(e);
		if (this._getHandlerRegistry(e) === "cpu" || e.type === "null") for (let e of this.dependencies) e.ensureCPUValueSync();
	}
	_executeWithHandler(e, t) {
		return e({
			device: t.device,
			inputs: this.inputs,
			output: this.output,
			target: t
		});
	}
};
function Ej(e) {
	return typeof e?.then == "function";
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/utils/output-props.js
function Dj(...e) {
	let t = Oj(e.map((e) => e.type));
	return t[0] !== "f" && e.some((e) => e.normalized) && (t = "float32"), {
		isConstant: e.every((e) => e.isConstant),
		type: t,
		size: e.reduce((e, t) => Math.max(e, t.size), 0),
		length: e.reduce((e, t) => Math.max(e, t.length), 0)
	};
}
function Oj(e) {
	let t = 0, n = 0;
	for (let r of e) {
		if (r[0] === "f") return "float32";
		let e = r.endsWith("8") ? 8 : r.endsWith("6") ? 16 : 32;
		r[0] === "u" ? t = Math.max(t, e) : n = Math.max(n, e);
	}
	return t && !n ? `uint${t}` : n && t < 32 ? `sint${Math.max(n, t * 2)}` : "float32";
}
//#endregion
//#region node_modules/@luma.gl/gpgpu/dist/operations/interleave.js
bO();
var kj = class extends Tj {
	name = "interleave";
	output;
	constructor(e) {
		super(e);
		let { isConstant: t, type: n, length: r } = Dj(...e);
		this.output = new Z({
			isConstant: t,
			type: n,
			size: e.reduce((e, t) => e + t.size, 0),
			length: r,
			source: this
		});
	}
	toString() {
		return `_${this.inputs.join("_")}_`;
	}
};
function Aj(...e) {
	if (e.length === 0) throw Error("interleave() requires at least one input");
	return e.length === 1 ? dO(e[0]) : new kj(e.map(dO)).output;
}
Y(), bO();
function jj(e, t) {
	let n = Nj(t);
	for (let t of n) t.evaluateSync(e);
	return Mj(n), t;
}
function Mj(e) {
	let t = new Set(e.flatMap(Lj)), n = /* @__PURE__ */ new Set();
	for (let t of e) Ij(t, n);
	for (let e of n) e.evaluated && !t.has(e.buffer) && e.destroy();
}
function Nj(e) {
	let t = /* @__PURE__ */ new Set();
	return Pj(e, t, /* @__PURE__ */ new Set()), Array.from(t);
}
function Pj(e, t, n) {
	if (Rj(e)) t.add(e);
	else if (e && typeof e == "object" && !n.has(e)) {
		if (n.add(e), Array.isArray(e)) for (let r of e) Pj(r, t, n);
		else if (Fj(e)) for (let r of Object.values(e)) Pj(r, t, n);
	}
}
function Fj(e) {
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function Ij(e, t) {
	if (e instanceof xO) {
		for (let n of e.gpuDataEvaluators) Ij(n, t);
		return;
	}
	let n = e.source;
	if (n) {
		if (n instanceof Z) t.has(n) || (t.add(n), Ij(n, t));
		else for (let e of n.dependencies) t.has(e) || (t.add(e), Ij(e, t));
	}
}
function Lj(e) {
	return e instanceof Z ? [e.buffer] : e.gpuVector.data.map((e) => e.buffer instanceof Jw ? e.buffer.buffer : e.buffer);
}
function Rj(e) {
	return e instanceof Z || e instanceof xO;
}
bO(), Cj();
var zj = class {
	constructor(e, { id: t, isTransitionAttribute: n }) {
		this.packedBuffers = {}, this.device = e, this.id = t, this.isTransitionAttribute = n, this.device.type === "webgpu" && wj.add("webgpu", { interleave: lj });
	}
	hasGroups(e) {
		return this.device.type === "webgpu" && Object.values(e).some((e) => !!e.settings.bufferGroup);
	}
	finalize() {
		for (let e of Object.values(this.packedBuffers)) e.packed.destroy();
		this.packedBuffers = {};
	}
	getBufferLayouts(e, t) {
		let n = this._getPackedGroups(e, t, {
			requireValues: !1,
			excludeAttributes: {}
		});
		return this._getBufferLayouts(e, n, t);
	}
	getBindings(e, t, n, r) {
		let i = this._getPackedGroups(e, n, {
			requireValues: !0,
			excludeAttributes: r
		}), a = {}, o = /* @__PURE__ */ new Set();
		for (let e of i.values()) {
			let n = !this.packedBuffers[e.id] || e.attributes.some((e) => !!t[e.id]);
			a[e.id] = this._getPackedBuffer(e, n);
			for (let t of e.attributes) o.add(t.id);
		}
		return {
			bufferLayouts: this._getBufferLayouts(e, i, n).filter((t) => !r[t.name] && !e[t.name]?.settings.isIndexed),
			buffers: a,
			groupedAttributeIds: o
		};
	}
	_getPackedGroups(e, t, { requireValues: n, excludeAttributes: r }) {
		let i = /* @__PURE__ */ new Map();
		for (let t of Object.values(e)) {
			let e = t.settings.bufferGroup;
			if (!e) continue;
			let n = i.get(e) || [];
			n.push(t), i.set(e, n);
		}
		let a = /* @__PURE__ */ new Map();
		for (let [e, o] of i) {
			let i = this._getPackedGroup(e, o, t, n, r);
			i && a.set(e, i);
		}
		return a;
	}
	_getPackedGroup(e, t, n, r, i) {
		if (t.length < 2) return null;
		let a = t.map((e) => e.getBufferLayout(n)), o = a[0].stepMode, s = Math.max(1, t[0].numInstances), c = r && t.every((e) => e.isConstant);
		for (let e = 0; e < t.length; e++) {
			let n = t[e], c = n.getAccessor(), l = c.size * c.bytesPerElement;
			if (i[n.id] || n.settings.isIndexed || n.settings.noAlloc || n.doublePrecision || this.isTransitionAttribute(n.id) || a[e].stepMode !== o || n.numInstances !== t[0].numInstances || (c.offset || 0) !== 0 || (c.vertexOffset || 0) !== 0 || hD(c) !== l || r && (n.isConstant ? !n.getConstantValue() || n.getConstantValue().byteLength < l : !ArrayBuffer.isView(n.value) || n.value.byteLength < s * l)) return null;
		}
		let l = {}, u = [], d = 0;
		for (let e = 0; e < t.length; e++) {
			let n = t[e];
			d = Bj(d), l[n.id] = d;
			for (let t of a[e].attributes || []) u.push({
				...t,
				byteOffset: d + (t.byteOffset || 0)
			});
			d += hD(n.getAccessor());
		}
		return d = Bj(d), {
			id: e,
			attributes: t,
			byteStride: d,
			byteOffsets: l,
			rowCount: s,
			layout: {
				name: e,
				byteStride: c ? 0 : d,
				stepMode: o,
				attributes: u
			}
		};
	}
	_getBufferLayouts(e, t, n) {
		let r = [], i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
		for (let e of t.values()) for (let t of e.attributes) a.add(t.id);
		for (let o of Object.values(e)) {
			let e = o.settings.bufferGroup, s = e && t.get(e);
			s && a.has(o.id) ? i.has(s.id) || (r.push(s.layout), i.add(s.id)) : r.push(o.getBufferLayout(n));
		}
		return r;
	}
	_getPackedBuffer(e, t) {
		let n = JSON.stringify({
			byteStride: e.layout.byteStride,
			attributes: e.layout.attributes
		}), r = this.packedBuffers[e.id];
		if ((!r || r.layoutKey !== n) && (t = !0), t) {
			r && (r.packed.destroy(), delete this.packedBuffers[e.id]);
			let t = this._interleavePackedGroup(e);
			return this.packedBuffers[e.id] = {
				packed: t,
				layoutKey: n
			}, t.buffer;
		}
		if (!r) throw Error(`Attribute buffer group ${e.id} has no packed buffer`);
		return r.packed.buffer;
	}
	_interleavePackedGroup(e) {
		let t = Aj(...e.attributes.map((t) => this._getInterleaveInput(e, t)));
		return jj(this.device, t), t;
	}
	_getInterleaveInput(e, t) {
		let n = hD(t.getAccessor()), r = e.byteOffsets[t.id];
		if (Vj(`${e.id}.${t.id} rowByteLength`, n), Vj(`${e.id}.${t.id} groupByteOffset`, r), t.isConstant) {
			let r = t.getConstantValue();
			if (!r) throw Error(`Attribute group ${e.id} is missing constant value ${t.id}`);
			return Vj(`${e.id}.${t.id} constant byteOffset`, r.byteOffset), new Z({
				id: t.id,
				type: "uint32",
				size: n / 4,
				isConstant: !0,
				value: new Uint32Array(r.buffer, r.byteOffset, n / Uint32Array.BYTES_PER_ELEMENT)
			});
		}
		let i = t.getBuffer(), a = t.byteOffset, o = t.getAccessor().stride || n;
		if (Vj(`${e.id}.${t.id} byteOffset`, a), Vj(`${e.id}.${t.id} stride`, o), !i) throw Error(`Attribute group ${e.id} cannot interleave missing buffer ${t.id}`);
		return new Z({
			id: t.id,
			type: "uint32",
			size: n / 4,
			offset: a,
			stride: o,
			length: e.rowCount,
			buffer: i
		});
	}
};
function Bj(e) {
	return Math.ceil(e / 4) * 4;
}
function Vj(e, t) {
	if (t % 4 != 0) throw Error(`Attribute buffer groups require 32-bit alignment: ${e}=${t}`);
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/array-utils.js
function Hj(e) {
	let { source: t, target: n, start: r = 0, size: i, getData: a } = e, o = e.end || n.length, s = t.length, c = o - r;
	if (s > c) {
		n.set(t.subarray(0, c), r);
		return;
	}
	if (n.set(t, r), !a) return;
	let l = s;
	for (; l < c;) {
		let e = a(l, t);
		for (let t = 0; t < i; t++) n[r + l] = e[t] || 0, l++;
	}
}
function Uj({ source: e, target: t, size: n, getData: r, sourceStartIndices: i, targetStartIndices: a }) {
	if (!i || !a) return Hj({
		source: e,
		target: t,
		size: n,
		getData: r
	}), t;
	let o = 0, s = 0, c = r && ((e, t) => r(e + s, t)), l = Math.min(i.length, a.length);
	for (let r = 1; r < l; r++) {
		let l = i[r] * n, u = a[r] * n;
		Hj({
			source: e.subarray(o, l),
			target: t,
			start: s,
			end: u,
			size: n,
			getData: c
		}), o = l, s = u;
	}
	return s < t.length && Hj({
		source: [],
		target: t,
		start: s,
		size: n,
		getData: c
	}), t;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/transitions/gpu-transition-utils.js
function Wj(e) {
	let { device: t, settings: n, value: r } = e, i = new AD(t, n);
	return i.setData({
		value: r instanceof Float64Array ? /* @__PURE__ */ new Float64Array() : /* @__PURE__ */ new Float32Array(),
		normalized: n.normalized
	}), i;
}
function Gj(e) {
	switch (e) {
		case 1: return "float";
		case 2: return "vec2";
		case 3: return "vec3";
		case 4: return "vec4";
		default: throw Error(`No defined attribute type for size "${e}"`);
	}
}
function Kj(e) {
	switch (e) {
		case 1: return "float32";
		case 2: return "float32x2";
		case 3: return "float32x3";
		case 4: return "float32x4";
		default: throw Error("invalid type size");
	}
}
function qj(e) {
	e.push(e.shift());
}
function Jj(e, t) {
	let { settings: n, value: r, size: i } = e, a = e.isDoublePrecisionBuffer ? 2 : 1, o = 0, { shaderAttributes: s } = e.settings;
	if (s) for (let e of Object.values(s)) o = Math.max(o, e.vertexOffset ?? 0);
	return (n.noAlloc ? r.length : (t + o) * i) * a;
}
function Yj({ device: e, source: t, target: n }) {
	return (!n || n.byteLength < t.byteLength) && (n?.destroy(), n = e.createBuffer({
		byteLength: t.byteLength,
		usage: t.usage
	})), n;
}
function Xj({ device: e, buffer: t, attribute: n, fromLength: r, toLength: i, fromStartIndices: a, getData: o = (e) => e }) {
	let s = n.isDoublePrecisionBuffer ? 2 : 1, c = n.size * s, l = n.byteOffset, u = n.settings.bytesPerElement < 4 ? l / n.settings.bytesPerElement * 4 : l, d = n.startIndices, f = a && d, p = n.isConstant;
	if (!f && t && r >= i) return t;
	let m = n.value instanceof Float64Array ? Float32Array : n.value.constructor, h = p ? n.value : new m(n.getBuffer().readSyncWebGL(l, i * m.BYTES_PER_ELEMENT).buffer);
	if (n.settings.normalized && !p) {
		let e = o;
		o = (t, r) => n.normalizeConstant(e(t, r));
	}
	let g = p ? (e, t) => o(h, t) : (e, t) => o(h.subarray(e + l, e + l + c), t), _ = t ? new Float32Array(t.readSyncWebGL(u, r * 4).buffer) : /* @__PURE__ */ new Float32Array(), v = new Float32Array(i);
	return Uj({
		source: _,
		target: v,
		sourceStartIndices: a,
		targetStartIndices: d,
		size: c,
		getData: g
	}), (!t || t.byteLength < v.byteLength + u) && (t?.destroy(), t = e.createBuffer({
		byteLength: v.byteLength + u,
		usage: 35050
	})), t.write(v, u), t;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/transitions/gpu-transition.js
var Zj = class {
	constructor({ device: e, attribute: t, timeline: n }) {
		this.buffers = [], this.currentLength = 0, this.device = e, this.transition = new aE(n), this.attribute = t, this.attributeInTransition = Wj(t), this.currentStartIndices = t.startIndices;
	}
	get inProgress() {
		return this.transition.inProgress;
	}
	start(e, t, n = Infinity) {
		this.settings = e, this.currentStartIndices = this.attribute.startIndices, this.currentLength = Jj(this.attribute, t), this.transition.start({
			...e,
			duration: n
		});
	}
	update() {
		let e = this.transition.update();
		return e && this.onUpdate(), e;
	}
	setBuffer(e) {
		let { stride: t } = this.attributeInTransition.getAccessor();
		this.attributeInTransition.setData({
			buffer: e,
			normalized: this.attribute.settings.normalized,
			value: this.attributeInTransition.value,
			stride: t
		});
	}
	cancel() {
		this.transition.cancel();
	}
	delete() {
		this.cancel();
		for (let e of this.buffers) e.destroy();
		this.buffers.length = 0;
	}
};
Y(), G();
var Qj = class extends Zj {
	constructor({ device: e, attribute: t, timeline: n }) {
		super({
			device: e,
			attribute: t,
			timeline: n
		}), this.type = "interpolation", this.transform = rM(e, t);
	}
	start(e, t) {
		let n = this.currentLength, r = this.currentStartIndices;
		if (super.start(e, t, e.duration), e.duration <= 0) {
			this.transition.cancel();
			return;
		}
		let { buffers: i, attribute: a } = this;
		qj(i), i[0] = Xj({
			device: this.device,
			buffer: i[0],
			attribute: a,
			fromLength: n,
			toLength: this.currentLength,
			fromStartIndices: r,
			getData: e.enter
		}), i[1] = Yj({
			device: this.device,
			source: i[0],
			target: i[1]
		}), this.setBuffer(i[1]);
		let { transform: o } = this, s = o.model, c = Math.floor(this.currentLength / a.size);
		nM(a) && (c /= 2), s.setVertexCount(c), a.isConstant ? (s.setAttributes({ aFrom: i[0] }), s.setConstantAttributes({ aTo: a.value })) : s.setAttributes({
			aFrom: i[0],
			aTo: a.getBuffer()
		}), o.transformFeedback.setBuffers({ vCurrent: i[1] });
	}
	onUpdate() {
		let { duration: e, easing: t } = this.settings, { time: n } = this.transition, r = n / e;
		t && (r = t(r));
		let { model: i } = this.transform, a = { time: r };
		i.shaderInputs.setProps({ interpolation: a }), this.transform.run({ discard: !0 });
	}
	delete() {
		super.delete(), this.transform.destroy();
	}
}, $j = {
	name: "interpolation",
	vs: "layout(std140) uniform interpolationUniforms {\n  float time;\n} interpolation;\n",
	uniformTypes: { time: "f32" }
}, eM = "#version 300 es\n#define SHADER_NAME interpolation-transition-vertex-shader\n\nin ATTRIBUTE_TYPE aFrom;\nin ATTRIBUTE_TYPE aTo;\nout ATTRIBUTE_TYPE vCurrent;\n\nvoid main(void) {\n  vCurrent = mix(aFrom, aTo, interpolation.time);\n  gl_Position = vec4(0.0);\n}\n", tM = "#version 300 es\n#define SHADER_NAME interpolation-transition-vertex-shader\n\nin ATTRIBUTE_TYPE aFrom;\nin ATTRIBUTE_TYPE aFrom64Low;\nin ATTRIBUTE_TYPE aTo;\nin ATTRIBUTE_TYPE aTo64Low;\nout ATTRIBUTE_TYPE vCurrent;\nout ATTRIBUTE_TYPE vCurrent64Low;\n\nvec2 mix_fp64(vec2 a, vec2 b, float x) {\n  vec2 range = sub_fp64(b, a);\n  return sum_fp64(a, mul_fp64(range, vec2(x, 0.0)));\n}\n\nvoid main(void) {\n  for (int i=0; i<ATTRIBUTE_SIZE; i++) {\n    vec2 value = mix_fp64(vec2(aFrom[i], aFrom64Low[i]), vec2(aTo[i], aTo64Low[i]), interpolation.time);\n    vCurrent[i] = value.x;\n    vCurrent64Low[i] = value.y;\n  }\n  gl_Position = vec4(0.0);\n}\n";
function nM(e) {
	return e.isDoublePrecisionBuffer;
}
function rM(e, t) {
	let n = t.size, r = Gj(n), i = Kj(n), a = t.getBufferLayout();
	return nM(t) ? new hT(e, {
		vs: tM,
		bufferLayout: [{
			name: "aFrom",
			byteStride: 8 * n,
			attributes: [{
				attribute: "aFrom",
				format: i,
				byteOffset: 0
			}, {
				attribute: "aFrom64Low",
				format: i,
				byteOffset: 4 * n
			}]
		}, {
			name: "aTo",
			byteStride: 8 * n,
			attributes: [{
				attribute: "aTo",
				format: i,
				byteOffset: 0
			}, {
				attribute: "aTo64Low",
				format: i,
				byteOffset: 4 * n
			}]
		}],
		modules: [dy, $j],
		defines: {
			ATTRIBUTE_TYPE: r,
			ATTRIBUTE_SIZE: n
		},
		moduleSettings: {},
		varyings: ["vCurrent", "vCurrent64Low"],
		bufferMode: 35980,
		disableWarnings: !0
	}) : new hT(e, {
		vs: eM,
		bufferLayout: [{
			name: "aFrom",
			format: i
		}, {
			name: "aTo",
			format: a.attributes[0].format
		}],
		modules: [$j],
		defines: { ATTRIBUTE_TYPE: r },
		varyings: ["vCurrent"],
		disableWarnings: !0
	});
}
//#endregion
//#region node_modules/@deck.gl/core/dist/transitions/gpu-spring-transition.js
Y();
var iM = class extends Zj {
	constructor({ device: e, attribute: t, timeline: n }) {
		super({
			device: e,
			attribute: t,
			timeline: n
		}), this.type = "spring", this.texture = lM(e), this.framebuffer = uM(e, this.texture), this.transform = cM(e, t);
	}
	start(e, t) {
		let n = this.currentLength, r = this.currentStartIndices;
		super.start(e, t);
		let { buffers: i, attribute: a } = this;
		for (let t = 0; t < 2; t++) i[t] = Xj({
			device: this.device,
			buffer: i[t],
			attribute: a,
			fromLength: n,
			toLength: this.currentLength,
			fromStartIndices: r,
			getData: e.enter
		});
		i[2] = Yj({
			device: this.device,
			source: i[0],
			target: i[2]
		}), this.setBuffer(i[1]);
		let { model: o } = this.transform;
		o.setVertexCount(Math.floor(this.currentLength / a.size)), a.isConstant ? o.setConstantAttributes({ aTo: a.value }) : o.setAttributes({ aTo: a.getBuffer() });
	}
	onUpdate() {
		let { buffers: e, transform: t, framebuffer: n, transition: r } = this, i = this.settings;
		t.model.setAttributes({
			aPrev: e[0],
			aCur: e[1]
		}), t.transformFeedback.setBuffers({ vNext: e[2] });
		let a = {
			stiffness: i.stiffness,
			damping: i.damping
		};
		t.model.shaderInputs.setProps({ spring: a }), t.run({
			framebuffer: n,
			discard: !1,
			parameters: { viewport: [
				0,
				0,
				1,
				1
			] },
			clearColor: [
				0,
				0,
				0,
				0
			]
		}), qj(e), this.setBuffer(e[1]), this.device.readPixelsToArrayWebGL(n)[0] > 0 || r.end();
	}
	delete() {
		super.delete(), this.transform.destroy(), this.texture.destroy(), this.framebuffer.destroy();
	}
}, aM = {
	name: "spring",
	vs: "layout(std140) uniform springUniforms {\n  float damping;\n  float stiffness;\n} spring;\n",
	uniformTypes: {
		damping: "f32",
		stiffness: "f32"
	}
}, oM = "#version 300 es\n#define SHADER_NAME spring-transition-vertex-shader\n\n#define EPSILON 0.00001\n\nin ATTRIBUTE_TYPE aPrev;\nin ATTRIBUTE_TYPE aCur;\nin ATTRIBUTE_TYPE aTo;\nout ATTRIBUTE_TYPE vNext;\nout float vIsTransitioningFlag;\n\nATTRIBUTE_TYPE getNextValue(ATTRIBUTE_TYPE cur, ATTRIBUTE_TYPE prev, ATTRIBUTE_TYPE dest) {\n  ATTRIBUTE_TYPE velocity = cur - prev;\n  ATTRIBUTE_TYPE delta = dest - cur;\n  ATTRIBUTE_TYPE force = delta * spring.stiffness;\n  ATTRIBUTE_TYPE resistance = velocity * spring.damping;\n  return force - resistance + velocity + cur;\n}\n\nvoid main(void) {\n  bool isTransitioning = length(aCur - aPrev) > EPSILON || length(aTo - aCur) > EPSILON;\n  vIsTransitioningFlag = isTransitioning ? 1.0 : 0.0;\n\n  vNext = getNextValue(aCur, aPrev, aTo);\n  gl_Position = vec4(0, 0, 0, 1);\n  gl_PointSize = 100.0;\n}\n", sM = "#version 300 es\n#define SHADER_NAME spring-transition-is-transitioning-fragment-shader\n\nin float vIsTransitioningFlag;\n\nout vec4 fragColor;\n\nvoid main(void) {\n  if (vIsTransitioningFlag == 0.0) {\n    discard;\n  }\n  fragColor = vec4(1.0);\n}";
function cM(e, t) {
	let n = Gj(t.size), r = Kj(t.size);
	return new hT(e, {
		vs: oM,
		fs: sM,
		bufferLayout: [
			{
				name: "aPrev",
				format: r
			},
			{
				name: "aCur",
				format: r
			},
			{
				name: "aTo",
				format: t.getBufferLayout().attributes[0].format
			}
		],
		varyings: ["vNext"],
		modules: [aM],
		defines: { ATTRIBUTE_TYPE: n },
		parameters: {
			depthCompare: "always",
			blendColorOperation: "max",
			blendColorSrcFactor: "one",
			blendColorDstFactor: "one",
			blendAlphaOperation: "max",
			blendAlphaSrcFactor: "one",
			blendAlphaDstFactor: "one"
		}
	});
}
function lM(e) {
	return e.createTexture({
		data: /* @__PURE__ */ new Uint8Array(4),
		format: "rgba8unorm",
		width: 1,
		height: 1
	});
}
function uM(e, t) {
	return e.createFramebuffer({
		id: "spring-transition-is-transitioning-framebuffer",
		width: 1,
		height: 1,
		colorAttachments: [t]
	});
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/attribute/attribute-transition-manager.js
var dM = {
	interpolation: Qj,
	spring: iM
}, fM = class {
	constructor(e, { id: t, timeline: n }) {
		if (!e) throw Error("AttributeTransitionManager is constructed without device");
		this.id = t, this.device = e, this.timeline = n, this.transitions = {}, this.needsRedraw = !1, this.numInstances = 1;
	}
	finalize() {
		for (let e in this.transitions) this._removeTransition(e);
	}
	update({ attributes: e, transitions: t, numInstances: n }) {
		this.numInstances = n || 1;
		for (let n in e) {
			let r = e[n], i = r.getTransitionSetting(t);
			i && this._updateAttribute(n, r, i);
		}
		for (let n in this.transitions) {
			let r = e[n];
			(!r || !r.getTransitionSetting(t)) && this._removeTransition(n);
		}
	}
	hasAttribute(e) {
		let t = this.transitions[e];
		return t && t.inProgress;
	}
	getAttributes() {
		let e = {};
		for (let t in this.transitions) {
			let n = this.transitions[t];
			n.inProgress && (e[t] = n.attributeInTransition);
		}
		return e;
	}
	run() {
		if (this.numInstances === 0) return !1;
		for (let e in this.transitions) this.transitions[e].update() && (this.needsRedraw = !0);
		let e = this.needsRedraw;
		return this.needsRedraw = !1, e;
	}
	_removeTransition(e) {
		this.transitions[e].delete(), delete this.transitions[e];
	}
	_updateAttribute(e, t, n) {
		let r = this.transitions[e], i = !r || r.type !== n.type;
		if (i) {
			r && this._removeTransition(e);
			let a = dM[n.type];
			a ? this.transitions[e] = new a({
				attribute: t,
				timeline: this.timeline,
				device: this.device
			}) : (B.error(`unsupported transition type '${n.type}'`)(), i = !1);
		}
		(i || t.needsRedraw()) && (this.needsRedraw = !0, this.transitions[e].start(n, this.numInstances));
	}
}, pM = "attributeManager.invalidate", mM = "attributeManager.updateStart", hM = "attributeManager.updateEnd", gM = "attribute.updateStart", _M = "attribute.allocate", vM = "attribute.updateEnd", yM = class {
	constructor(e, { id: t = "attribute-manager", stats: n, timeline: r } = {}) {
		this.mergeBoundsMemoized = yx(gC), this.id = t, this.device = e, this.attributes = {}, this.updateTriggers = {}, this.needsRedraw = !0, this.userData = {}, this.stats = n, this.attributeTransitionManager = new fM(e, {
			id: `${t}-transitions`,
			timeline: r
		}), this.attributeBufferGroups = e.type === "webgpu" ? new zj(e, {
			id: t,
			isTransitionAttribute: (e) => this.attributeTransitionManager.hasAttribute(e)
		}) : null, Object.seal(this);
	}
	finalize() {
		this.attributeBufferGroups?.finalize();
		for (let e in this.attributes) this.attributes[e].delete();
		this.attributeTransitionManager.finalize();
	}
	getNeedsRedraw(e = { clearRedrawFlags: !1 }) {
		let t = this.needsRedraw;
		return this.needsRedraw = this.needsRedraw && !e.clearRedrawFlags, t && this.id;
	}
	setNeedsRedraw() {
		this.needsRedraw = !0;
	}
	add(e) {
		this._add(e);
	}
	addInstanced(e) {
		this._add(e, { stepMode: "instance" });
	}
	remove(e) {
		for (let t of e) this.attributes[t] !== void 0 && (this.attributes[t].delete(), delete this.attributes[t]);
	}
	invalidate(e, t) {
		let n = this._invalidateTrigger(e, t);
		V(pM, this, e, n);
	}
	invalidateAll(e) {
		for (let t in this.attributes) this.attributes[t].setNeedsUpdate(t, e);
		V(pM, this, "all");
	}
	update({ data: e, numInstances: t, startIndices: n = null, transitions: r, props: i = {}, buffers: a = {}, context: o = {} }) {
		let s = !1;
		V(mM, this), this.stats && this.stats.get("Update Attributes").timeStart();
		for (let r in this.attributes) {
			let c = this.attributes[r], l = c.settings.accessor;
			c.startIndices = n, c.numInstances = t, i[r] && B.removed(`props.${r}`, `data.attributes.${r}`)(), c.setExternalBuffer(a[r]) || c.setBinaryValue(typeof l == "string" ? a[l] : void 0, e.startIndices) || typeof l == "string" && !a[l] && c.setConstantValue(o, i[l]) || c.needsUpdate() && (s = !0, this._updateAttribute({
				attribute: c,
				numInstances: t,
				data: e,
				props: i,
				context: o
			})), this.needsRedraw = this.needsRedraw || c.needsRedraw();
		}
		s && V(hM, this, t), this.stats && (this.stats.get("Update Attributes").timeEnd(), s && this.stats.get("Attributes updated").incrementCount()), this.attributeTransitionManager.update({
			attributes: this.attributes,
			numInstances: t,
			transitions: r
		});
	}
	updateTransition() {
		let { attributeTransitionManager: e } = this, t = e.run();
		return this.needsRedraw = this.needsRedraw || t, t;
	}
	getAttributes() {
		return {
			...this.attributes,
			...this.attributeTransitionManager.getAttributes()
		};
	}
	getBounds(e) {
		let t = e.map((e) => this.attributes[e]?.getBounds());
		return this.mergeBoundsMemoized(t);
	}
	getChangedAttributes(e = { clearChangedFlags: !1 }) {
		let { attributes: t, attributeTransitionManager: n } = this, r = { ...n.getAttributes() };
		for (let i in t) {
			let a = t[i];
			a.needsRedraw(e) && !n.hasAttribute(i) && (r[i] = a);
		}
		return r;
	}
	getBufferLayouts(e) {
		return this.hasBufferGroups() ? this.attributeBufferGroups.getBufferLayouts(this.getAttributes(), e) : Object.values(this.getAttributes()).map((t) => t.getBufferLayout(e));
	}
	hasBufferGroups() {
		return !!this.attributeBufferGroups?.hasGroups(this.attributes);
	}
	getBufferGroupBindings(e, t, n = {}) {
		return this.attributeBufferGroups ? this.attributeBufferGroups.getBindings(this.getAttributes(), e, t, n) : {
			bufferLayouts: this.getBufferLayouts(t),
			buffers: {},
			groupedAttributeIds: /* @__PURE__ */ new Set()
		};
	}
	_add(e, t) {
		for (let n in e) {
			let r = e[n], i = {
				...r,
				id: n,
				size: r.isIndexed && 1 || r.size || 1,
				...t
			};
			this.attributes[n] = new AD(this.device, i);
		}
		this._mapUpdateTriggersToAttributes();
	}
	_mapUpdateTriggersToAttributes() {
		let e = {};
		for (let t in this.attributes) this.attributes[t].getUpdateTriggers().forEach((n) => {
			e[n] || (e[n] = []), e[n].push(t);
		});
		this.updateTriggers = e;
	}
	_invalidateTrigger(e, t) {
		let { attributes: n, updateTriggers: r } = this, i = r[e];
		return i && i.forEach((e) => {
			let r = n[e];
			r && r.setNeedsUpdate(r.id, t);
		}), i;
	}
	_updateAttribute(e) {
		let { attribute: t, numInstances: n } = e;
		V(gM, t), t.constant ? t.setConstantValue(e.context, t.value) : (t.allocate(n) && V(_M, t, n), t.updateBuffer(e) && (this.needsRedraw = !0, V(vM, t, n)));
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/transitions/cpu-interpolation-transition.js
W();
var bM = class extends aE {
	get value() {
		return this._value;
	}
	_onUpdate() {
		let { time: e, settings: { fromValue: t, toValue: n, duration: r, easing: i } } = this, a = i(e / r);
		this._value = l_(t, n, a);
	}
}, xM = 1e-5;
function SM(e, t, n, r, i) {
	let a = t - e;
	return (n - t) * i + -a * r + a + t;
}
function CM(e, t, n, r, i) {
	if (Array.isArray(n)) {
		let a = [];
		for (let o = 0; o < n.length; o++) a[o] = SM(e[o], t[o], n[o], r, i);
		return a;
	}
	return SM(e, t, n, r, i);
}
function wM(e, t) {
	if (Array.isArray(e)) {
		let n = 0;
		for (let r = 0; r < e.length; r++) {
			let i = e[r] - t[r];
			n += i * i;
		}
		return Math.sqrt(n);
	}
	return Math.abs(e - t);
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/uniform-transition-manager.js
var TM = {
	interpolation: bM,
	spring: class extends aE {
		get value() {
			return this._currValue;
		}
		_onUpdate() {
			let { fromValue: e, toValue: t, damping: n, stiffness: r } = this.settings, { _prevValue: i = e, _currValue: a = e } = this, o = CM(i, a, t, n, r), s = wM(o, t), c = wM(o, a);
			s < xM && c < xM && (o = t, this.end()), this._prevValue = a, this._currValue = o;
		}
	}
}, EM = class {
	constructor(e) {
		this.transitions = /* @__PURE__ */ new Map(), this.timeline = e;
	}
	get active() {
		return this.transitions.size > 0;
	}
	add(e, t, n, r) {
		let { transitions: i } = this;
		if (i.has(e)) {
			let n = i.get(e), { value: r = n.settings.fromValue } = n;
			t = r, this.remove(e);
		}
		if (r = kD(r), !r) return;
		let a = TM[r.type];
		if (!a) {
			B.error(`unsupported transition type '${r.type}'`)();
			return;
		}
		let o = new a(this.timeline);
		o.start({
			...r,
			fromValue: t,
			toValue: n
		}), i.set(e, o);
	}
	remove(e) {
		let { transitions: t } = this;
		t.has(e) && (t.get(e).cancel(), t.delete(e));
	}
	update() {
		let e = {};
		for (let [t, n] of this.transitions) n.update(), e[t] = n.value, n.inProgress || this.remove(t);
		return e;
	}
	clear() {
		for (let e of this.transitions.keys()) this.remove(e);
	}
};
//#endregion
//#region node_modules/@deck.gl/core/dist/lifecycle/props.js
function DM(e) {
	let t = e[jT];
	for (let n in t) {
		let r = t[n], { validate: i } = r;
		if (i && !i(e[n], r)) throw Error(`Invalid prop ${n}: ${e[n]}`);
	}
}
function OM(e, t) {
	let n = AM({
		newProps: e,
		oldProps: t,
		propTypes: e[jT],
		ignoreProps: {
			data: null,
			updateTriggers: null,
			extensions: null,
			transitions: null
		}
	}), r = MM(e, t), i = !1;
	return r || (i = NM(e, t)), {
		dataChanged: r,
		propsChanged: n,
		updateTriggersChanged: i,
		extensionsChanged: PM(e, t),
		transitionsChanged: kM(e, t)
	};
}
function kM(e, t) {
	if (!e.transitions) return !1;
	let n = {}, r = e[jT], i = !1;
	for (let a in e.transitions) {
		let o = r[a], s = o && o.type;
		(s === "number" || s === "color" || s === "array") && jM(e[a], t[a], o) && (n[a] = !0, i = !0);
	}
	return i ? n : !1;
}
function AM({ newProps: e, oldProps: t, ignoreProps: n = {}, propTypes: r = {}, triggerName: i = "props" }) {
	if (t === e) return !1;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return `${i} changed shallowly`;
	for (let a of Object.keys(e)) if (!(a in n)) {
		if (!(a in t)) return `${i}.${a} added`;
		let n = jM(e[a], t[a], r[a]);
		if (n) return `${i}.${a} ${n}`;
	}
	for (let a of Object.keys(t)) if (!(a in n)) {
		if (!(a in e)) return `${i}.${a} dropped`;
		if (!Object.hasOwnProperty.call(e, a)) {
			let n = jM(e[a], t[a], r[a]);
			if (n) return `${i}.${a} ${n}`;
		}
	}
	return !1;
}
function jM(e, t, n) {
	let r = n && n.equal;
	return r && !r(e, t, n) || !r && (r = e && t && e.equals, r && !r.call(e, t)) ? "changed deeply" : !r && t !== e ? "changed shallowly" : null;
}
function MM(e, t) {
	if (t === null) return "oldProps is null, initial diff";
	let n = !1, { dataComparator: r, _dataDiff: i } = e;
	return r ? r(e.data, t.data) || (n = "Data comparator detected a change") : e.data !== t.data && (n = "A new data container was supplied"), n && i && (n = i(e.data, t.data) || n), n;
}
function NM(e, t) {
	if (t === null || "all" in e.updateTriggers && FM(e, t, "all")) return { all: !0 };
	let n = {}, r = !1;
	for (let i in e.updateTriggers) i !== "all" && FM(e, t, i) && (n[i] = !0, r = !0);
	return r ? n : !1;
}
function PM(e, t) {
	if (t === null) return !0;
	let n = t.extensions, { extensions: r } = e;
	if (r === n) return !1;
	if (!n || !r || r.length !== n.length) return !0;
	for (let e = 0; e < r.length; e++) if (!r[e].equals(n[e])) return !0;
	return !1;
}
function FM(e, t, n) {
	let r = e.updateTriggers[n];
	r ??= {};
	let i = t.updateTriggers[n];
	return i ??= {}, AM({
		oldProps: i,
		newProps: r,
		triggerName: n
	});
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/count.js
var IM = "count(): argument not an object", LM = "count(): argument not a container";
function RM(e) {
	if (!BM(e)) throw Error(IM);
	if (typeof e.count == "function") return e.count();
	if (Number.isFinite(e.size)) return e.size;
	if (Number.isFinite(e.length)) return e.length;
	if (zM(e)) return Object.keys(e).length;
	throw Error(LM);
}
function zM(e) {
	return typeof e == "object" && !!e && e.constructor === Object;
}
function BM(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/shader.js
function VM(e, t) {
	if (!t) return e;
	let n = {
		...e,
		...t
	};
	if ("defines" in t && (n.defines = {
		...e.defines,
		...t.defines
	}), "modules" in t && (n.modules = (e.modules || []).concat(t.modules), t.modules.some((e) => e.name === "project64"))) {
		let e = n.modules.findIndex((e) => e.name === "project32");
		e >= 0 && n.modules.splice(e, 1);
	}
	if ("inject" in t) {
		if (!e.inject) n.inject = t.inject;
		else {
			let r = { ...e.inject };
			for (let e in t.inject) r[e] = (r[e] || "") + t.inject[e];
			n.inject = r;
		}
	}
	return n;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/utils/texture.js
I();
var HM = {
	minFilter: "linear",
	mipmapFilter: "linear",
	magFilter: "linear",
	addressModeU: "clamp-to-edge",
	addressModeV: "clamp-to-edge"
}, UM = {};
function WM(e, t, n, r) {
	if (n instanceof F) return n;
	n.constructor && n.constructor.name !== "Object" && (n = { data: n });
	let i = null;
	n.compressed && (i = {
		minFilter: "linear",
		mipmapFilter: n.data.length > 1 ? "nearest" : "linear"
	});
	let { width: a, height: o } = n.data, s = t.createTexture({
		...n,
		sampler: {
			...HM,
			...i,
			...r
		},
		mipLevels: t.getMipLevelCount(a, o)
	});
	return t.type === "webgl" ? s.generateMipmapsWebGL() : t.type === "webgpu" && t.generateMipmapsWebGPU(s), UM[s.id] = e, s;
}
function GM(e, t) {
	t && t instanceof F && UM[t.id] === e && (t.delete(), delete UM[t.id]);
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lifecycle/prop-types.js
var KM = {
	boolean: {
		validate(e, t) {
			return !0;
		},
		equal(e, t, n) {
			return !!e == !!t;
		}
	},
	number: { validate(e, t) {
		return Number.isFinite(e) && (!("max" in t) || e <= t.max) && (!("min" in t) || e >= t.min);
	} },
	color: {
		validate(e, t) {
			return t.optional && !e || XM(e) && (e.length === 3 || e.length === 4);
		},
		equal(e, t, n) {
			return WT(e, t, 1);
		}
	},
	accessor: {
		validate(e, t) {
			let n = ZM(e);
			return n === "function" || n === ZM(t.value);
		},
		equal(e, t, n) {
			return typeof t == "function" || WT(e, t, 1);
		}
	},
	array: {
		validate(e, t) {
			return t.optional && !e || XM(e);
		},
		equal(e, t, n) {
			let { compare: r } = n;
			return r ? WT(e, t, Number.isInteger(r) ? r : +!!r) : e === t;
		}
	},
	object: { equal(e, t, n) {
		if (n.ignore) return !0;
		let { compare: r } = n;
		return r ? WT(e, t, Number.isInteger(r) ? r : +!!r) : e === t;
	} },
	function: {
		validate(e, t) {
			return t.optional && !e || typeof e == "function";
		},
		equal(e, t, n) {
			return !n.compare && n.ignore !== !1 || e === t;
		}
	},
	data: { transform: (e, t, n) => {
		if (!e) return e;
		let { dataTransform: r } = n.props;
		return r ? r(e) : typeof e.shape == "string" && e.shape.endsWith("-table") && Array.isArray(e.data) ? e.data : e;
	} },
	image: {
		transform: (e, t, n) => {
			let r = n.context;
			return !r || !r.device ? null : WM(n.id, r.device, e, {
				...t.parameters,
				...n.props.textureParameters
			});
		},
		release: (e, t, n) => {
			GM(n.id, e);
		}
	}
};
function qM(e) {
	let t = {}, n = {}, r = {};
	for (let [i, a] of Object.entries(e)) {
		let e = a?.deprecatedFor;
		if (e) r[i] = Array.isArray(e) ? e : [e];
		else {
			let e = JM(i, a);
			t[i] = e, n[i] = e.value;
		}
	}
	return {
		propTypes: t,
		defaultProps: n,
		deprecatedProps: r
	};
}
function JM(e, t) {
	switch (ZM(t)) {
		case "object": return YM(e, t);
		case "array": return YM(e, {
			type: "array",
			value: t,
			compare: !1
		});
		case "boolean": return YM(e, {
			type: "boolean",
			value: t
		});
		case "number": return YM(e, {
			type: "number",
			value: t
		});
		case "function": return YM(e, {
			type: "function",
			value: t,
			compare: !0
		});
		default: return {
			name: e,
			type: "unknown",
			value: t
		};
	}
}
function YM(e, t) {
	return "type" in t ? {
		name: e,
		...KM[t.type],
		...t
	} : "value" in t ? {
		name: e,
		type: ZM(t.value),
		...t
	} : {
		name: e,
		type: "object",
		value: t
	};
}
function XM(e) {
	return Array.isArray(e) || ArrayBuffer.isView(e);
}
function ZM(e) {
	return XM(e) ? "array" : e === null ? "null" : typeof e;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lifecycle/create-props.js
function QM(e, t) {
	let n;
	for (let e = t.length - 1; e >= 0; e--) {
		let r = t[e];
		"extensions" in r && (n = r.extensions);
	}
	let r = eN(e.constructor, n), i = Object.create(r);
	i[AT] = e, i[PT] = {}, i[FT] = {};
	for (let e = 0; e < t.length; ++e) {
		let n = t[e];
		for (let e in n) i[e] = n[e];
	}
	return Object.freeze(i), i;
}
var $M = "_mergedDefaultProps";
function eN(e, t) {
	if (!(e instanceof uN.constructor)) return {};
	let n = $M;
	if (t) for (let e of t) {
		let t = e.constructor;
		t && (n += `:${t.extensionName || t.name}`);
	}
	return sN(e, n) || (e[n] = tN(e, t || []));
}
function tN(e, t) {
	if (!e.prototype) return null;
	let n = eN(Object.getPrototypeOf(e)), r = qM(sN(e, "defaultProps") || {}), i = Object.assign(Object.create(null), n, r.defaultProps), a = Object.assign(Object.create(null), n?.[jT], r.propTypes), o = Object.assign(Object.create(null), n?.[MT], r.deprecatedProps);
	for (let e of t) {
		let t = eN(e.constructor);
		t && (Object.assign(i, t), Object.assign(a, t[jT]), Object.assign(o, t[MT]));
	}
	return nN(i, e), iN(i, a), rN(i, o), i[jT] = a, i[MT] = o, t.length === 0 && !oN(e, "_propTypes") && (e._propTypes = a), i;
}
function nN(e, t) {
	let n = cN(t);
	Object.defineProperties(e, { id: {
		writable: !0,
		value: n
	} });
}
function rN(e, t) {
	for (let n in t) Object.defineProperty(e, n, {
		enumerable: !1,
		set(e) {
			let r = `${this.id}: ${n}`;
			for (let r of t[n]) oN(this, r) || (this[r] = e);
			B.deprecated(r, t[n].join("/"))();
		}
	});
}
function iN(e, t) {
	let n = {}, r = {};
	for (let e in t) {
		let i = t[e], { name: a, value: o } = i;
		i.async && (n[a] = o, r[a] = aN(a));
	}
	e[NT] = n, e[PT] = {}, Object.defineProperties(e, r);
}
function aN(e) {
	return {
		enumerable: !0,
		set(t) {
			typeof t == "string" || t instanceof Promise || CD(t) ? this[PT][e] = t : this[FT][e] = t;
		},
		get() {
			if (this[FT]) {
				if (e in this[FT]) return this[FT][e] || this[NT][e];
				if (e in this[PT]) {
					let t = this[AT] && this[AT].internalState;
					if (t && t.hasAsyncProp(e)) return t.getAsyncProp(e) || this[NT][e];
				}
			}
			return this[NT][e];
		}
	};
}
function oN(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t);
}
function sN(e, t) {
	return oN(e, t) && e[t];
}
function cN(e) {
	let t = e.componentName;
	return t || B.warn(`${e.name}.componentName not specified`)(), t || e.name;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lifecycle/component.js
var lN = 0, uN = class {
	constructor(...e) {
		this.props = QM(this, e), this.id = this.props.id, this.count = lN++;
	}
	clone(e) {
		let { props: t } = this, n = {};
		for (let e in t[NT]) e in t[FT] ? n[e] = t[FT][e] : e in t[PT] && (n[e] = t[PT][e]);
		return new this.constructor({
			...t,
			...n,
			...e
		});
	}
};
uN.componentName = "Component", uN.defaultProps = {};
//#endregion
//#region node_modules/@deck.gl/core/dist/lifecycle/component-state.js
var dN = Object.freeze({}), fN = class {
	constructor(e) {
		this.component = e, this.asyncProps = {}, this.onAsyncPropUpdated = () => {}, this.oldProps = null, this.oldAsyncProps = null;
	}
	finalize() {
		for (let e in this.asyncProps) {
			let t = this.asyncProps[e];
			t && t.type && t.type.release && t.type.release(t.resolvedValue, t.type, this.component);
		}
		this.asyncProps = {}, this.component = null, this.resetOldProps();
	}
	getOldProps() {
		return this.oldAsyncProps || this.oldProps || dN;
	}
	resetOldProps() {
		this.oldAsyncProps = null, this.oldProps = this.component ? this.component.props : null;
	}
	hasAsyncProp(e) {
		return e in this.asyncProps;
	}
	getAsyncProp(e) {
		let t = this.asyncProps[e];
		return t && t.resolvedValue;
	}
	isAsyncPropLoading(e) {
		if (e) {
			let t = this.asyncProps[e];
			return !!(t && t.pendingLoadCount > 0 && t.pendingLoadCount !== t.resolvedLoadCount);
		}
		for (let e in this.asyncProps) if (this.isAsyncPropLoading(e)) return !0;
		return !1;
	}
	reloadAsyncProp(e, t) {
		this._watchPromise(e, Promise.resolve(t));
	}
	setAsyncProps(e) {
		this.component = e[AT] || this.component;
		let t = e[FT] || {}, n = e[PT] || e, r = e[NT] || {};
		for (let e in t) {
			let n = t[e];
			this._createAsyncPropData(e, r[e]), this._updateAsyncProp(e, n), t[e] = this.getAsyncProp(e);
		}
		for (let e in n) {
			let t = n[e];
			this._createAsyncPropData(e, r[e]), this._updateAsyncProp(e, t);
		}
	}
	_fetch(e, t) {
		return null;
	}
	_onResolve(e, t) {}
	_onError(e, t) {}
	_updateAsyncProp(e, t) {
		this._didAsyncInputValueChange(e, t) && (typeof t == "string" && (t = this._fetch(e, t)), t instanceof Promise ? this._watchPromise(e, t) : CD(t) ? this._resolveAsyncIterable(e, t) : this._setPropValue(e, t));
	}
	_freezeAsyncOldProps() {
		if (!this.oldAsyncProps && this.oldProps) {
			this.oldAsyncProps = Object.create(this.oldProps);
			for (let e in this.asyncProps) Object.defineProperty(this.oldAsyncProps, e, {
				enumerable: !0,
				value: this.oldProps[e]
			});
		}
	}
	_didAsyncInputValueChange(e, t) {
		let n = this.asyncProps[e];
		return t === n.resolvedValue || t === n.lastValue ? !1 : (n.lastValue = t, !0);
	}
	_setPropValue(e, t) {
		this._freezeAsyncOldProps();
		let n = this.asyncProps[e];
		n && (t = this._postProcessValue(n, t), n.resolvedValue = t, n.pendingLoadCount++, n.resolvedLoadCount = n.pendingLoadCount);
	}
	_setAsyncPropValue(e, t, n) {
		let r = this.asyncProps[e];
		r && n >= r.resolvedLoadCount && t !== void 0 && (this._freezeAsyncOldProps(), r.resolvedValue = t, r.resolvedLoadCount = n, this.onAsyncPropUpdated(e, t));
	}
	_watchPromise(e, t) {
		let n = this.asyncProps[e];
		if (n) {
			n.pendingLoadCount++;
			let r = n.pendingLoadCount;
			t.then((t) => {
				this.component && (t = this._postProcessValue(n, t), this._setAsyncPropValue(e, t, r), this._onResolve(e, t));
			}).catch((t) => {
				this._onError(e, t);
			});
		}
	}
	async _resolveAsyncIterable(e, t) {
		if (e !== "data") {
			this._setPropValue(e, t);
			return;
		}
		let n = this.asyncProps[e];
		if (!n) return;
		n.pendingLoadCount++;
		let r = n.pendingLoadCount, i = [], a = 0;
		for await (let n of t) {
			if (!this.component) return;
			let { dataTransform: t } = this.component.props;
			i = t ? t(n, i) : i.concat(n), Object.defineProperty(i, "__diff", {
				enumerable: !1,
				value: [{
					startRow: a,
					endRow: i.length
				}]
			}), a = i.length, this._setAsyncPropValue(e, i, r);
		}
		this._onResolve(e, i);
	}
	_postProcessValue(e, t) {
		let n = e.type;
		return n && this.component && (n.release && n.release(e.resolvedValue, n, this.component), n.transform) ? n.transform(t, n, this.component) : t;
	}
	_createAsyncPropData(e, t) {
		if (!this.asyncProps[e]) {
			let n = this.component && this.component.props[jT];
			this.asyncProps[e] = {
				type: n && n[e],
				lastValue: null,
				resolvedValue: t,
				pendingLoadCount: 0,
				resolvedLoadCount: 0
			};
		}
	}
}, pN = class extends fN {
	constructor({ attributeManager: e, layer: t }) {
		super(t), this.attributeManager = e, this.needsRedraw = !0, this.needsUpdate = !0, this.subLayers = null, this.usesPickingColorCache = !1, this.disabledPickingIndices = [];
	}
	get layer() {
		return this.component;
	}
	_fetch(e, t) {
		let n = this.layer, r = n?.props.fetch;
		return r ? r(t, {
			propName: e,
			layer: n
		}) : super._fetch(e, t);
	}
	_onResolve(e, t) {
		let n = this.layer;
		if (n) {
			let r = n.props.onDataLoad;
			e === "data" && r && r(t, {
				propName: e,
				layer: n
			});
		}
	}
	_onError(e, t) {
		let n = this.layer;
		n && n.raiseError(t, `loading ${e} of ${this.layer}`);
	}
};
I(), xl();
var mN = "layer.changeFlag", hN = "layer.initialize", gN = "layer.update", _N = "layer.finalize", vN = "layer.matched", yN = 2 ** 24 - 1, bN = Object.freeze([]), xN = yx(({ oldViewport: e, viewport: t }) => e.equals(t)), SN = /* @__PURE__ */ new Uint8ClampedArray();
function CN(e) {
	return e.rowIndexes || e.pickingColors || e.instancePickingColors;
}
function wN(e) {
	return e.rowIndexes;
}
function TN(e) {
	return e.pickingColors || e.instancePickingColors;
}
var EN = {
	data: {
		type: "data",
		value: bN,
		async: !0
	},
	dataComparator: {
		type: "function",
		value: null,
		optional: !0
	},
	_dataDiff: {
		type: "function",
		value: (e) => e && e.__diff,
		optional: !0
	},
	dataTransform: {
		type: "function",
		value: null,
		optional: !0
	},
	onDataLoad: {
		type: "function",
		value: null,
		optional: !0
	},
	onError: {
		type: "function",
		value: null,
		optional: !0
	},
	fetch: {
		type: "function",
		value: (e, { propName: t, layer: n, loaders: r, loadOptions: i, signal: a }) => {
			let { resourceManager: o } = n.context;
			i ||= n.getLoadOptions(), r ||= n.props.loaders, a && (i = {
				...i,
				core: {
					...i?.core,
					fetch: {
						...i?.core?.fetch,
						signal: a
					}
				}
			});
			let s = o.contains(e);
			return !s && !i && (o.add({
				resourceId: e,
				data: ff(e, r),
				persistent: !1
			}), s = !0), s ? o.subscribe({
				resourceId: e,
				onChange: (e) => n.internalState?.reloadAsyncProp(t, e),
				consumerId: n.id,
				requestId: t
			}) : ff(e, r, i);
		}
	},
	updateTriggers: {},
	visible: !0,
	pickable: !1,
	opacity: {
		type: "number",
		min: 0,
		max: 1,
		value: 1
	},
	operation: "draw",
	onHover: {
		type: "function",
		value: null,
		optional: !0
	},
	onClick: {
		type: "function",
		value: null,
		optional: !0
	},
	onDragStart: {
		type: "function",
		value: null,
		optional: !0
	},
	onDrag: {
		type: "function",
		value: null,
		optional: !0
	},
	onDragEnd: {
		type: "function",
		value: null,
		optional: !0
	},
	coordinateSystem: "default",
	coordinateOrigin: {
		type: "array",
		value: [
			0,
			0,
			0
		],
		compare: !0
	},
	modelMatrix: {
		type: "array",
		value: null,
		compare: !0,
		optional: !0
	},
	wrapLongitude: !1,
	positionFormat: "XYZ",
	colorFormat: "RGBA",
	parameters: {
		type: "object",
		value: {},
		optional: !0,
		compare: 2
	},
	loadOptions: {
		type: "object",
		value: null,
		optional: !0,
		ignore: !0
	},
	transitions: null,
	extensions: [],
	loaders: {
		type: "array",
		value: [],
		optional: !0,
		ignore: !0
	},
	getPolygonOffset: {
		type: "function",
		value: ({ layerIndex: e }) => [0, -e * 100]
	},
	highlightedObjectIndex: null,
	autoHighlight: !1,
	highlightColor: {
		type: "accessor",
		value: [
			0,
			0,
			128,
			128
		]
	}
}, DN = class extends uN {
	constructor() {
		super(...arguments), this.internalState = null, this.lifecycle = kT.NO_STATE, this.parent = null;
	}
	static get componentName() {
		return Object.prototype.hasOwnProperty.call(this, "layerName") ? this.layerName : "";
	}
	get root() {
		let e = this;
		for (; e.parent;) e = e.parent;
		return e;
	}
	toString() {
		return `${this.constructor.layerName || this.constructor.name}({id: '${this.props.id}'})`;
	}
	project(e) {
		X(this.internalState);
		let t = this.internalState.viewport || this.context.viewport, [n, r, i] = lS(DC(e, {
			viewport: t,
			modelMatrix: this.props.modelMatrix,
			coordinateOrigin: this.props.coordinateOrigin,
			coordinateSystem: this.props.coordinateSystem
		}), t.pixelProjectionMatrix);
		return e.length === 2 ? [n, r] : [
			n,
			r,
			i
		];
	}
	unproject(e) {
		return X(this.internalState), (this.internalState.viewport || this.context.viewport).unproject(e);
	}
	projectPosition(e, t) {
		return X(this.internalState), OC(e, {
			viewport: this.internalState.viewport || this.context.viewport,
			modelMatrix: this.props.modelMatrix,
			coordinateOrigin: this.props.coordinateOrigin,
			coordinateSystem: this.props.coordinateSystem,
			...t
		});
	}
	get isComposite() {
		return !1;
	}
	get isDrawable() {
		return !0;
	}
	setState(e) {
		this.setChangeFlags({ stateChanged: !0 }), Object.assign(this.state, e), this.setNeedsRedraw();
	}
	setNeedsRedraw() {
		this.internalState && (this.internalState.needsRedraw = !0);
	}
	setNeedsUpdate() {
		this.internalState && (this.context.layerManager.setNeedsUpdate(String(this)), this.internalState.needsUpdate = !0);
	}
	get isLoaded() {
		return this.internalState ? !this.internalState.isAsyncPropLoading() : !1;
	}
	get wrapLongitude() {
		return this.props.wrapLongitude;
	}
	isPickable() {
		return this.props.pickable && this.props.visible;
	}
	getModels() {
		let e = this.state;
		return e && (e.models || e.model && [e.model]) || [];
	}
	setShaderModuleProps(...e) {
		for (let t of this.getModels()) t.shaderInputs.setProps(...e);
	}
	getAttributeManager() {
		return this.internalState && this.internalState.attributeManager;
	}
	getCurrentLayer() {
		return this.internalState && this.internalState.layer;
	}
	getLoadOptions() {
		return this.props.loadOptions;
	}
	use64bitPositions() {
		let { coordinateSystem: e } = this.props;
		return e === "default" || e === "lnglat" || e === "cartesian";
	}
	onHover(e, t) {
		return this.props.onHover && this.props.onHover(e, t) || !1;
	}
	onClick(e, t) {
		return this.props.onClick && this.props.onClick(e, t) || !1;
	}
	nullPickingColor() {
		return [
			0,
			0,
			0
		];
	}
	encodePickingColor(e, t = []) {
		return t[0] = e + 1 & 255, t[1] = e + 1 >> 8 & 255, t[2] = e + 1 >> 8 >> 8 & 255, t;
	}
	decodePickingColor(e) {
		X(e instanceof Uint8Array);
		let [t, n, r] = e;
		return t + n * 256 + r * 65536 - 1;
	}
	getNumInstances() {
		return Number.isFinite(this.props.numInstances) ? this.props.numInstances : this.state && this.state.numInstances !== void 0 ? this.state.numInstances : RM(this.props.data);
	}
	getStartIndices() {
		return this.props.startIndices ? this.props.startIndices : this.state && this.state.startIndices ? this.state.startIndices : null;
	}
	getBounds() {
		return this.getAttributeManager()?.getBounds(["positions", "instancePositions"]);
	}
	getShaders(e) {
		e = VM(e, {
			disableWarnings: !0,
			modules: this.context.defaultShaderModules
		});
		for (let t of this.props.extensions) e = VM(e, t.getShaders.call(this, t));
		return e;
	}
	shouldUpdateState(e) {
		return e.changeFlags.propsOrDataChanged;
	}
	updateState(e) {
		let t = this.getAttributeManager(), { dataChanged: n } = e.changeFlags;
		if (n && t) {
			if (Array.isArray(n)) for (let e of n) t.invalidateAll(e);
			else t.invalidateAll();
		}
		if (t) {
			let { props: n } = e, r = this.internalState.hasPickingBuffer, i = Number.isInteger(n.highlightedObjectIndex) || !!n.pickable || n.extensions.some((e) => e.getNeedsPickingBuffer.call(this, e));
			if (r !== i) {
				this.internalState.hasPickingBuffer = i;
				let e = CN(t.attributes);
				e && (i && e.constant && (e.constant = !1, t.invalidate(e.id)), !e.value && !i && (e.constant = !0, e.value = wN(t.attributes) ? [OS] : [
					0,
					0,
					0
				]));
			}
		}
	}
	finalizeState(e) {
		for (let e of this.getModels()) e.destroy();
		let t = this.getAttributeManager();
		t && t.finalize(), this.context && this.context.resourceManager.unsubscribe({ consumerId: this.id }), this.internalState && (this.internalState.uniformTransitions.clear(), this.internalState.finalize());
	}
	draw(e) {
		for (let t of this.getModels()) t.draw(e.renderPass);
	}
	getPickingInfo({ info: e, mode: t, sourceLayer: n }) {
		let { index: r } = e;
		return r >= 0 && Array.isArray(this.props.data) && (e.object = this.props.data[r]), e;
	}
	raiseError(e, t) {
		t && (e = Error(`${t}: ${e.message}`, { cause: e })), this.props.onError?.(e) || this.context?.onError?.(e, this);
	}
	getNeedsRedraw(e = { clearRedrawFlags: !1 }) {
		return this._getNeedsRedraw(e);
	}
	needsUpdate() {
		return this.internalState ? this.internalState.needsUpdate || this.hasUniformTransition() || this.shouldUpdateState(this._getUpdateParams()) : !1;
	}
	hasUniformTransition() {
		return this.internalState?.uniformTransitions.active || !1;
	}
	activateViewport(e) {
		if (!this.internalState) return;
		let t = this.internalState.viewport;
		this.internalState.viewport = e, (!t || !xN({
			oldViewport: t,
			viewport: e
		})) && (this.setChangeFlags({ viewportChanged: !0 }), this.isComposite ? this.needsUpdate() && this.setNeedsUpdate() : this._update());
	}
	invalidateAttribute(e = "all") {
		let t = this.getAttributeManager();
		t && (e === "all" ? t.invalidateAll() : t.invalidate(e));
	}
	updateAttributes(e) {
		let t = !1;
		for (let n in e) e[n].layoutChanged() && (t = !0);
		for (let n of this.getModels()) this._setModelAttributes(n, e, t);
	}
	_updateAttributes() {
		let e = this.getAttributeManager();
		if (!e) return;
		let t = this.props, n = this.getNumInstances(), r = this.getStartIndices();
		e.update({
			data: t.data,
			numInstances: n,
			startIndices: r,
			props: t,
			transitions: t.transitions,
			buffers: t.data.attributes,
			context: this
		});
		let i = e.getChangedAttributes({ clearChangedFlags: !0 });
		this.updateAttributes(i);
	}
	_updateAttributeTransition() {
		let e = this.getAttributeManager();
		e && e.updateTransition();
	}
	_updateUniformTransition() {
		let { uniformTransitions: e } = this.internalState;
		if (e.active) {
			let t = e.update(), n = Object.create(this.props);
			for (let e in t) Object.defineProperty(n, e, { value: t[e] });
			return n;
		}
		return this.props;
	}
	calculateInstancePickingColors(e, { numInstances: t }) {
		if (e.constant) return;
		let n = Math.floor(SN.length / 4);
		this.internalState.usesPickingColorCache = !0;
		let r = t > 0 && SN[0] === 0;
		if (n < t || r) {
			t > yN && B.warn("Layer has too many data objects. Picking might not be able to distinguish all objects.")(), SN = oC.allocate(SN, t, {
				size: 4,
				copy: !0,
				maxCount: Math.max(t, yN)
			});
			let e = Math.floor(SN.length / 4), i = [
				0,
				0,
				0
			], a = r ? 0 : n;
			for (let t = a; t < e; t++) this.encodePickingColor(t, i), SN[t * 4 + 0] = i[0], SN[t * 4 + 1] = i[1], SN[t * 4 + 2] = i[2], SN[t * 4 + 3] = 0;
		}
		e.value = SN.subarray(0, t * 4);
	}
	_setModelAttributes(e, t, n = !1) {
		if (!Object.keys(t).length) return;
		let r = this.getAttributeManager();
		if (r?.hasBufferGroups()) {
			this._setGroupedModelAttributes(e, r, t);
			return;
		}
		if (n) {
			let n = this.getAttributeManager();
			e.setBufferLayout(n.getBufferLayouts(e)), t = n.getAttributes();
		}
		let i = e.userData?.excludeAttributes || {}, a = {}, o = {};
		for (let n in t) {
			if (i[n]) continue;
			let r = t[n].getValue();
			for (let i in r) {
				let s = r[i];
				s instanceof j ? t[n].settings.isIndexed ? e.setIndexBuffer(s) : a[i] = s : s && (o[i] = s);
			}
		}
		e.setAttributes(a), e.setConstantAttributes(o);
	}
	_setGroupedModelAttributes(e, t, n) {
		let r = e.userData?.excludeAttributes || {}, i = t.getBufferGroupBindings(n, e, r);
		e.setBufferLayout(i.bufferLayouts);
		let a = { ...i.buffers }, o = {}, s = t.getAttributes();
		for (let t in s) {
			if (r[t] || i.groupedAttributeIds.has(t)) continue;
			let n = s[t], c = n.getValue();
			for (let t in c) {
				let r = c[t];
				r instanceof j ? n.settings.isIndexed ? e.setIndexBuffer(r) : a[t] = r : r && (o[t] = r);
			}
		}
		e.setAttributes(a), e.setConstantAttributes(o);
	}
	disablePickingIndex(e) {
		let t = this.props.data;
		if (!("attributes" in t)) {
			this._disablePickingIndex(e);
			return;
		}
		let n = this.getAttributeManager().attributes, r = wN(n), i = TN(n), a = r && t.attributes && t.attributes[r.id];
		if (a && a.value) {
			let n = a.value;
			for (let i = 0; i < t.length; i++) n[r.getVertexOffset(i)] === e && this._disablePickingIndex(i);
			return;
		}
		let o = i && t.attributes && t.attributes[i.id];
		if (o && o.value) {
			let n = o.value, r = this.encodePickingColor(e);
			for (let e = 0; e < t.length; e++) {
				let t = i.getVertexOffset(e);
				n[t] === r[0] && n[t + 1] === r[1] && n[t + 2] === r[2] && this._disablePickingIndex(e);
			}
		} else this._disablePickingIndex(e);
	}
	_disablePickingIndex(e) {
		let t = this.getAttributeManager().attributes, n = wN(t);
		if (n) {
			let t = n.getVertexOffset(e), r = n.getVertexOffset(e + 1), i = new Uint32Array(r - t);
			i.fill(OS), n.buffer.write(i, t * i.BYTES_PER_ELEMENT);
			return;
		}
		let r = TN(t);
		if (!r) {
			this.internalState && kS(this.internalState.disabledPickingIndices, e);
			return;
		}
		let i = r.getVertexOffset(e), a = r.getVertexOffset(e + 1);
		r.buffer.write(new Uint8Array(a - i), i);
	}
	restorePickingColors() {
		let e = this.getAttributeManager().attributes, t = CN(e);
		if (!t) {
			this.internalState && (this.internalState.disabledPickingIndices.length = 0);
			return;
		}
		let n = TN(e);
		this.internalState.usesPickingColorCache && n && n.value.buffer !== SN.buffer && (n.value = SN.subarray(0, n.value.length)), t.updateSubBuffer({ startOffset: 0 });
	}
	_initialize() {
		X(!this.internalState), V(hN, this);
		let e = this._getAttributeManager();
		this.internalState = new pN({
			attributeManager: e,
			layer: this
		}), this._clearChangeFlags(), this.state = {}, Object.defineProperty(this.state, "attributeManager", { get: () => (B.deprecated("layer.state.attributeManager", "layer.getAttributeManager()")(), e) }), this.internalState.uniformTransitions = new EM(this.context.timeline), this.internalState.onAsyncPropUpdated = this._onAsyncPropUpdated.bind(this), this.internalState.setAsyncProps(this.props), this.initializeState(this.context);
		for (let e of this.props.extensions) e.initializeState.call(this, this.context, e);
		this.setChangeFlags({
			dataChanged: "init",
			propsChanged: "init",
			viewportChanged: !0,
			extensionsChanged: !0
		}), this._update();
	}
	_transferState(e) {
		V(vN, this, this === e);
		let { state: t, internalState: n } = e;
		this !== e && (this.internalState = n, this.state = t, this.internalState.setAsyncProps(this.props), this._diffProps(this.props, this.internalState.getOldProps()));
	}
	_update() {
		let e = this.needsUpdate();
		if (V(gN, this, e), !e) return;
		this.context.stats.get("Layer updates").incrementCount();
		let t = this.props, n = this.context, r = this.internalState, i = n.viewport, a = this._updateUniformTransition();
		r.propsInTransition = a, n.viewport = r.viewport || i, this.props = a;
		try {
			let e = this._getUpdateParams(), t = this.getModels();
			if (n.device) this.updateState(e);
			else try {
				this.updateState(e);
			} catch {}
			for (let t of this.props.extensions) t.updateState.call(this, e, t);
			this.setNeedsRedraw(), this._updateAttributes();
			let r = this.getModels()[0] !== t[0];
			this._postUpdate(e, r);
		} finally {
			n.viewport = i, this.props = t, this._clearChangeFlags(), r.needsUpdate = !1, r.resetOldProps();
		}
	}
	_finalize() {
		V(_N, this), this.finalizeState(this.context);
		for (let e of this.props.extensions) e.finalizeState.call(this, this.context, e);
	}
	_drawLayer({ renderPass: e, shaderModuleProps: t = null, uniforms: n = {}, parameters: r = {} }) {
		this._updateAttributeTransition();
		let i = this.props, a = this.context;
		this.props = this.internalState.propsInTransition || i;
		try {
			t && this.setShaderModuleProps(t);
			let { getPolygonOffset: i } = this.props, o = i && i(n) || [0, 0];
			a.device instanceof fl && a.device.setParametersWebGL({ polygonOffset: o });
			let s = a.device instanceof fl ? null : ON(r);
			if (kN(this.getModels(), e, r, s), a.device instanceof fl) a.device.withParametersWebGL(r, () => {
				let i = {
					renderPass: e,
					shaderModuleProps: t,
					uniforms: n,
					parameters: r,
					context: a
				};
				for (let e of this.props.extensions) e.draw.call(this, i, e);
				this.draw(i);
			});
			else {
				s?.renderPassParameters && e.setParameters(s.renderPassParameters);
				let i = {
					renderPass: e,
					shaderModuleProps: t,
					uniforms: n,
					parameters: r,
					context: a
				};
				for (let e of this.props.extensions) e.draw.call(this, i, e);
				this.draw(i);
			}
		} finally {
			this.props = i;
		}
	}
	getChangeFlags() {
		return this.internalState?.changeFlags;
	}
	setChangeFlags(e) {
		if (!this.internalState) return;
		let { changeFlags: t } = this.internalState;
		for (let n in e) if (e[n]) {
			let r = !1;
			switch (n) {
				case "dataChanged":
					let i = e[n], a = t[n];
					i && Array.isArray(a) && (t.dataChanged = Array.isArray(i) ? a.concat(i) : i, r = !0);
				default: t[n] || (t[n] = e[n], r = !0);
			}
			r && V(mN, this, n, e);
		}
		let n = !!(t.dataChanged || t.updateTriggersChanged || t.propsChanged || t.extensionsChanged);
		t.propsOrDataChanged = n, t.somethingChanged = n || t.viewportChanged || t.stateChanged;
	}
	_clearChangeFlags() {
		this.internalState.changeFlags = {
			dataChanged: !1,
			propsChanged: !1,
			updateTriggersChanged: !1,
			viewportChanged: !1,
			stateChanged: !1,
			extensionsChanged: !1,
			propsOrDataChanged: !1,
			somethingChanged: !1
		};
	}
	_diffProps(e, t) {
		let n = OM(e, t);
		if (n.updateTriggersChanged) for (let e in n.updateTriggersChanged) n.updateTriggersChanged[e] && this.invalidateAttribute(e);
		if (n.transitionsChanged) for (let r in n.transitionsChanged) this.internalState.uniformTransitions.add(r, t[r], e[r], e.transitions?.[r]);
		return this.setChangeFlags(n);
	}
	validateProps() {
		DM(this.props);
	}
	updateAutoHighlight(e) {
		this.props.autoHighlight && !Number.isInteger(this.props.highlightedObjectIndex) && this._updateAutoHighlight(e);
	}
	_updateAutoHighlight(e) {
		let t = { highlightedObjectColor: e.picked ? e.color : null }, { highlightColor: n } = this.props;
		e.picked && typeof n == "function" && (t.highlightColor = n(e)), this.setShaderModuleProps({ picking: t }), this.setNeedsRedraw();
	}
	_getAttributeManager() {
		let e = this.context;
		return new yM(e.device, {
			id: this.props.id,
			stats: e.stats,
			timeline: e.timeline
		});
	}
	_postUpdate(e, t) {
		let { props: n, oldProps: r } = e, i = this.state.model;
		i?.isInstanced && i.setInstanceCount(this.getNumInstances());
		let { autoHighlight: a, highlightedObjectIndex: o, highlightColor: s } = n;
		if (t || r.autoHighlight !== a || r.highlightedObjectIndex !== o || r.highlightColor !== s) {
			let e = {};
			Array.isArray(s) && (e.highlightColor = s), (t || r.autoHighlight !== a || o !== r.highlightedObjectIndex) && (e.highlightedObjectColor = Number.isFinite(o) && o >= 0 ? this.encodePickingColor(o) : null), this.setShaderModuleProps({ picking: e });
		}
	}
	_getUpdateParams() {
		return {
			props: this.props,
			oldProps: this.internalState.getOldProps(),
			context: this.context,
			changeFlags: this.internalState.changeFlags
		};
	}
	_getNeedsRedraw(e) {
		if (!this.internalState) return !1;
		let t = !1;
		t ||= this.internalState.needsRedraw && this.id;
		let n = this.getAttributeManager(), r = n ? n.getNeedsRedraw(e) : !1;
		if (t ||= r, t) for (let e of this.props.extensions) e.onNeedsRedraw.call(this, e);
		return this.internalState.needsRedraw = this.internalState.needsRedraw && !e.clearRedrawFlags, t;
	}
	_onAsyncPropUpdated() {
		this._diffProps(this.props, this.internalState.getOldProps()), this.setNeedsUpdate();
	}
};
DN.defaultProps = EN, DN.layerName = "Layer";
function ON(e) {
	let { blendConstant: t, ...n } = e;
	return t ? {
		pipelineParameters: n,
		renderPassParameters: { blendConstant: t }
	} : { pipelineParameters: n };
}
function kN(e, t, n, r) {
	for (let i of e) i.device.type === "webgpu" ? (AN(i, t), i.setParameters({
		...i.parameters,
		...r?.pipelineParameters
	})) : i.setParameters(n);
}
function AN(e, t) {
	let n = t.props.framebuffer || (t.framebuffer ?? null);
	if (!n) return;
	let r = n.colorAttachments.map((e) => e?.texture?.format ?? null), i = n.depthStencilAttachment?.texture?.format, a = e;
	(!jN(a.props.colorAttachmentFormats, r) || a.props.depthStencilAttachmentFormat !== i) && (a.props.colorAttachmentFormats = r, a.props.depthStencilAttachmentFormat = i, a._setPipelineNeedsUpdate("attachment formats"));
}
function jN(e, t) {
	if (e === t) return !0;
	if (!e || !t || e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
//#endregion
//#region node_modules/@deck.gl/core/dist/lib/composite-layer.js
var MN = "compositeLayer.renderLayers", NN = class extends DN {
	get isComposite() {
		return !0;
	}
	get isDrawable() {
		return !1;
	}
	get isLoaded() {
		return super.isLoaded && this.getSubLayers().every((e) => e.isLoaded);
	}
	getSubLayers() {
		return this.internalState && this.internalState.subLayers || [];
	}
	initializeState(e) {}
	setState(e) {
		super.setState(e), this.setNeedsUpdate();
	}
	getPickingInfo({ info: e }) {
		let { object: t } = e;
		return t && t.__source && t.__source.parent && t.__source.parent.id === this.id && (e.object = t.__source.object, e.index = t.__source.index), e;
	}
	filterSubLayer(e) {
		return !0;
	}
	shouldRenderSubLayer(e, t) {
		return t && t.length;
	}
	getSubLayerClass(e, t) {
		let { _subLayerProps: n } = this.props;
		return n && n[e] && n[e].type || t;
	}
	getSubLayerRow(e, t, n) {
		return e.__source = {
			parent: this,
			object: t,
			index: n
		}, e;
	}
	getSubLayerAccessor(e) {
		if (typeof e == "function") {
			let t = {
				index: -1,
				data: this.props.data,
				target: []
			};
			return (n, r) => n && n.__source ? (t.index = n.__source.index, e(n.__source.object, t)) : e(n, r);
		}
		return e;
	}
	getSubLayerProps(e = {}) {
		let { opacity: t, pickable: n, visible: r, parameters: i, getPolygonOffset: a, highlightedObjectIndex: o, autoHighlight: s, highlightColor: c, coordinateSystem: l, coordinateOrigin: u, wrapLongitude: d, positionFormat: f, modelMatrix: p, extensions: m, fetch: h, operation: g, _subLayerProps: _ } = this.props, v = {
			id: "",
			updateTriggers: {},
			opacity: t,
			pickable: n,
			visible: r,
			parameters: i,
			getPolygonOffset: a,
			highlightedObjectIndex: o,
			autoHighlight: s,
			highlightColor: c,
			coordinateSystem: l,
			coordinateOrigin: u,
			wrapLongitude: d,
			positionFormat: f,
			modelMatrix: p,
			extensions: m,
			fetch: h,
			operation: g
		}, y = _ && e.id && _[e.id], b = y && y.updateTriggers, x = e.id || "sublayer";
		if (y) {
			let t = this.props[jT], n = e.type ? e.type._propTypes : {};
			for (let e in y) {
				let r = n[e] || t[e];
				r && r.type === "accessor" && (y[e] = this.getSubLayerAccessor(y[e]));
			}
		}
		Object.assign(v, e, y), v.id = `${this.props.id}-${x}`, v.updateTriggers = {
			all: this.props.updateTriggers?.all,
			...e.updateTriggers,
			...b
		};
		for (let e of m) {
			let t = e.getSubLayerProps.call(this, e);
			t && Object.assign(v, t, { updateTriggers: Object.assign(v.updateTriggers, t.updateTriggers) });
		}
		return v;
	}
	_updateAutoHighlight(e) {
		for (let t of this.getSubLayers()) t.updateAutoHighlight(e);
	}
	_getAttributeManager() {
		return null;
	}
	_postUpdate(e, t) {
		let n = this.internalState.subLayers, r = !n || this.needsUpdate();
		r && (n = IT(this.renderLayers(), Boolean), this.internalState.subLayers = n), V(MN, this, r, n);
		for (let e of n) e.parent = this;
	}
};
//#endregion
//#region node_modules/@deck.gl/google-maps/dist/utils.js
NN.layerName = "CompositeLayer", W();
var PN = "deck-gl-google-maps-container", FN = 85.05113;
function IN(e, t, n, r) {
	if (n) {
		if (n.userData._googleMap === e) return n;
		RN(n);
	}
	let i = {
		click: null,
		rightclick: null,
		dblclick: null,
		mousemove: null,
		mouseout: null
	}, a = new dD({
		...r,
		useDevicePixels: r.useDevicePixels ?? !0,
		...!r.gl && { deviceProps: {
			...r.deviceProps,
			createCanvasContext: {
				...typeof r.deviceProps?.createCanvasContext == "object" ? r.deviceProps.createCanvasContext : void 0,
				pixelSizeSource: "css-dpr"
			}
		} },
		style: r.interleaved ? null : { pointerEvents: "none" },
		parent: LN(t, r.style),
		views: new RE({ repeat: !0 }),
		initialViewState: {
			longitude: 0,
			latitude: 0,
			zoom: 1
		},
		controller: !1
	});
	for (let t in i) i[t] = e.addListener(t, (e) => WN(a, t, e));
	return a.userData._googleMap = e, a.userData._eventListeners = i, a;
}
function LN(e, t) {
	let n = document.createElement("div");
	n.style.position = "absolute", Object.assign(n.style, t);
	let r = e.getMap().getDiv().querySelector(`#${PN}`);
	return r ? r.appendChild(n) : "getPanes" in e && e.getPanes()?.overlayLayer.appendChild(n), n;
}
function RN(e) {
	let { _eventListeners: t } = e.userData;
	for (let e in t) t[e] && t[e].remove();
	e.finalize();
}
function zN(e, t) {
	let { width: n, height: r } = VN(e), i = t.getProjection(), a = e.getBounds();
	if (!a) return {
		width: n,
		height: r,
		left: 0,
		top: 0
	};
	let o = a.getNorthEast(), s = a.getSouthWest(), c = i.fromLatLngToDivPixel(o), l = i.fromLatLngToDivPixel(s), u = HN(i, n / 2, r / 2), d = new google.maps.LatLng(0, u[0]), f = i.fromLatLngToContainerPixel(d), p = i.fromLatLngToDivPixel(d);
	if (!c || !l || !p || !f) return {
		width: n,
		height: r,
		left: 0,
		top: 0
	};
	let m = Math.round(p.x - f.x), h = p.y - f.y, g = HN(i, n / 2, 0), _ = HN(i, n / 2, r), v = u[1], y = u[0];
	if (Math.abs(v) > FN) {
		v = v > 0 ? FN : -85.05113;
		let e = new google.maps.LatLng(v, y), t = i.fromLatLngToContainerPixel(e);
		h += t.y - r / 2;
	}
	h = Math.round(h);
	let b = 180 * new V_(g).sub(_).verticalAngle() / Math.PI;
	b < 0 && (b += 360);
	let x = e.getHeading() || 0, S = e.getZoom() - 1, C;
	if (b === 0) C = r ? (l.y - c.y) / r : 1;
	else if (b === x) {
		let e = new V_([c.x, c.y]).sub([l.x, l.y]).len(), t = new V_([n, -r]).len();
		C = t ? e / t : 1;
	}
	return S += Math.log2(C || 1), {
		width: n,
		height: r,
		left: m,
		top: h,
		zoom: S,
		bearing: b,
		pitch: e.getTilt(),
		latitude: v,
		longitude: y
	};
}
function BN(e, t) {
	let { width: n, height: r } = VN(e), { center: i, heading: a, tilt: o, zoom: s } = t.getCameraParams(), c = r ? n / r : 1, l = new Hv().perspective({
		fovy: 25 * Math.PI / 180,
		aspect: c,
		near: .75,
		far: 3e14
	});
	return {
		width: n,
		height: r,
		viewState: {
			altitude: .5 * l[5],
			bearing: a,
			latitude: i.lat(),
			longitude: i.lng(),
			pitch: o,
			projectionMatrix: l,
			repeat: !0,
			zoom: s - 1
		}
	};
}
function VN(e) {
	let t = e.getDiv().firstChild;
	return {
		width: t.offsetWidth,
		height: t.offsetHeight
	};
}
function HN(e, t, n) {
	let r = new google.maps.Point(t, n), i = e.fromContainerPixelToLatLng(r);
	return [i.lng(), i.lat()];
}
function UN(e, t) {
	if (e.pixel) return e.pixel;
	let n = t.getViewports()[0].project([e.latLng.lng(), e.latLng.lat()]);
	return {
		x: n[0],
		y: n[1]
	};
}
function WN(e, t, n) {
	if (!e.isInitialized) return;
	let r = {
		type: t,
		offsetCenter: UN(n, e),
		srcEvent: n
	};
	switch (t) {
		case "click":
		case "rightclick":
			r.type = "click", r.tapCount = 1, e._onPointerDown(r), e._onEvent(r);
			break;
		case "dblclick":
			r.type = "click", r.tapCount = 2, e._onEvent(r);
			break;
		case "mousemove":
			r.type = "pointermove", e._onPointerMove(r);
			break;
		case "mouseout":
			r.type = "pointerleave", e._onPointerMove(r);
			break;
		default: return;
	}
}
//#endregion
//#region node_modules/@deck.gl/google-maps/dist/google-maps-overlay.js
xl();
var GN = () => !1, KN = {
	depthMask: !0,
	depthTest: !0,
	blend: !0,
	blendFunc: [
		770,
		771,
		1,
		771
	],
	blendEquation: 32774
};
function qN() {}
var JN = { interleaved: !0 }, YN = class {
	constructor(e) {
		this.props = {}, this._map = null, this._deck = null, this._overlay = null, this._positioningOverlay = null, this._externalFramebuffer = null, this.setProps({
			...JN,
			...e
		});
	}
	setMap(e) {
		if (e === this._map) return;
		let { VECTOR: t, UNINITIALIZED: n } = google.maps.RenderingType;
		this._map &&= (!e && this._map.getRenderingType() === t && this.props.interleaved && this._overlay.requestRedraw(), this._overlay?.setMap(null), this._positioningOverlay?.setMap(null), null), e && (this._map = e, e.getRenderingType() === n ? e.addListener("renderingtype_changed", () => {
			this._createOverlay(e);
		}) : this._createOverlay(e));
	}
	setProps(e) {
		if (Object.assign(this.props, e), this._deck) {
			let t = this._deck.props.parent || this._deck.getCanvas()?.parentElement;
			if (e.style && t) {
				let n = t.style;
				Object.assign(n, e.style), e.style = null;
			}
			this._deck.setProps(e);
		}
	}
	pickObject(e) {
		return this._deck && this._deck.pickObject(e);
	}
	pickMultipleObjects(e) {
		return this._deck && this._deck.pickMultipleObjects(e);
	}
	pickObjects(e) {
		return this._deck && this._deck.pickObjects(e);
	}
	finalize() {
		this.setMap(null), this._deck &&= (RN(this._deck), null);
	}
	_createOverlay(e) {
		let { VECTOR: t, UNINITIALIZED: n } = google.maps.RenderingType, r = e.getRenderingType();
		r !== n && (r === t && google.maps.WebGLOverlayView ? this._createOverlayVector(e) : this._createOverlayRaster(e));
	}
	_createOverlayVector(e) {
		let t = this.props.interleaved ?? JN.interleaved, n = new google.maps.OverlayView();
		n.onAdd = this._onAddVectorOverlay.bind(this), n.draw = this._updateContainerSize.bind(this), n.onRemove = this._onRemove.bind(this), this._positioningOverlay = n, this._positioningOverlay.setMap(e);
		let r = new google.maps.WebGLOverlayView();
		r.onAdd = qN, r.onContextRestored = t ? this._onContextRestored.bind(this) : qN, r.onDraw = this._onDrawVector.bind(this), r.onContextLost = t ? this._onContextLost.bind(this) : qN, r.onRemove = t ? this._onRemove.bind(this) : qN, this._overlay = r, this._overlay.setMap(e);
	}
	_createOverlayRaster(e) {
		let t = new google.maps.OverlayView();
		t.onAdd = this._onAdd.bind(this), t.draw = this._onDrawRaster.bind(this), t.onRemove = this._onRemove.bind(this), this._overlay = t, this._overlay.setMap(e);
	}
	_onAdd() {
		this._deck = IN(this._map, this._overlay, this._deck, this.props);
	}
	_onAddVectorOverlay() {
		let e = this._positioningOverlay, t = e.getPanes();
		if (t) {
			let e = document.createElement("div");
			e.id = PN, e.style.position = "absolute", t.overlayLayer.appendChild(e);
		}
		this._deck = IN(this._map, e, this._deck, this.props);
	}
	_updateContainerSize() {
		if (!this._map) return;
		let e = this._map.getDiv().querySelector(`#${PN}`);
		if (!e) return;
		let t = this._map.getDiv().firstChild;
		if (!t) return;
		let n = t.offsetWidth, r = t.offsetHeight;
		e.style.width = `${n}px`, e.style.height = `${r}px`, e.style.left = `${-n / 2}px`, e.style.top = `${-r / 2}px`;
	}
	_onContextRestored({ gl: e }) {
		if (!this._map || !this._overlay) return;
		let t = IN(this._map, this._overlay, this._deck, {
			gl: e,
			_customRender: () => {
				this._overlay && this._overlay.requestRedraw();
			},
			...this.props
		});
		this._deck = t;
		let n = t.animationLoop;
		n._renderFrame = () => {
			let r = e.getParameter(34964);
			t.device.withParametersWebGL({}, () => {
				n.props.onRender(n.animationProps);
			}), e.bindBuffer(34962, r);
		};
	}
	_onContextLost() {
		this._deck &&= (RN(this._deck), null);
	}
	_onRemove() {
		this._deck?.setProps({ layerFilter: GN });
	}
	_onDrawRaster() {
		if (!this._deck || !this._map) return;
		let e = this._deck, { width: t, height: n, left: r, top: i, ...a } = zN(this._map, this._overlay), o = e.getCanvas()?.parentElement || e.props.parent;
		if (o) {
			let e = o.style;
			e.left = `${r}px`, e.top = `${i}px`;
		}
		e.setProps({
			width: t,
			height: n,
			viewState: {
				altitude: 1e4,
				...a
			}
		}), e.redraw();
	}
	_onDrawVector({ gl: e, transformer: t }) {
		if (!this._deck || !this._map) return;
		let n = this._deck, { interleaved: r } = this.props;
		if (n.setProps({
			...BN(this._map, t),
			...r && {
				width: null,
				height: null
			}
		}), r && n.isInitialized) {
			let t = n.device;
			if (t instanceof fl) {
				let r = t.getParametersWebGL(36006), i = null;
				if (r) {
					if (this._externalFramebuffer?.handle !== r) {
						this._externalFramebuffer?.wrapper.destroy();
						let n = t.createFramebuffer({
							handle: r,
							width: e.canvas.width,
							height: e.canvas.height
						});
						this._externalFramebuffer = {
							handle: r,
							wrapper: n
						};
					}
					i = this._externalFramebuffer.wrapper;
				}
				n.setProps({ _framebuffer: i });
			}
			n.needsRedraw({ clearRedrawFlags: !0 }), t instanceof fl && (t.setParametersWebGL({
				viewport: [
					0,
					0,
					e.canvas.width,
					e.canvas.height
				],
				scissor: [
					0,
					0,
					e.canvas.width,
					e.canvas.height
				],
				stencilFunc: [
					519,
					0,
					255,
					519,
					0,
					255
				]
			}), t.withParametersWebGL(KN, () => {
				n._drawLayers("google-vector", { clearCanvas: !1 });
			}));
		} else r || n.redraw();
	}
}, XN = "layout(std140) uniform iconUniforms {\n  float sizeScale;\n  vec2 iconsTextureDim;\n  float sizeBasis;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  bool billboard;\n  highp int sizeUnits;\n  float alphaCutoff;\n} icon;\n", ZN = {
	name: "icon",
	vs: XN,
	fs: XN,
	uniformTypes: {
		sizeScale: "f32",
		iconsTextureDim: "vec2<f32>",
		sizeBasis: "f32",
		sizeMinPixels: "f32",
		sizeMaxPixels: "f32",
		billboard: "f32",
		sizeUnits: "i32",
		alphaCutoff: "f32"
	}
}, QN = "#version 300 es\n#define SHADER_NAME icon-layer-vertex-shader\nin vec2 positions;\nin vec3 instancePositions;\nin vec3 instancePositions64Low;\nin float instanceSizes;\nin float instanceAngles;\nin vec4 instanceColors;\n#ifdef USE_ROW_INDEXES\nin float rowIndexes;\n#endif\nin vec4 instanceIconFrames;\nin float instanceColorModes;\nin vec2 instanceOffsets;\nin vec2 instancePixelOffset;\nout float vColorMode;\nout vec4 vColor;\nout vec2 vTextureCoords;\nout vec2 uv;\nvec2 rotate_by_angle(vec2 vertex, float angle) {\nfloat angle_radian = angle * PI / 180.0;\nfloat cos_angle = cos(angle_radian);\nfloat sin_angle = sin(angle_radian);\nmat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);\nreturn rotationMatrix * vertex;\n}\nvoid main(void) {\ngeometry.worldPosition = instancePositions;\ngeometry.uv = positions;\n#ifdef USE_ROW_INDEXES\ngeometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);\n#else\ngeometry.pickingColor = picking_getPickingColorFromInstanceID();\n#endif\nuv = positions;\nvec2 iconSize = instanceIconFrames.zw;\nfloat sizePixels = clamp(\nproject_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),\nicon.sizeMinPixels, icon.sizeMaxPixels\n);\nfloat iconConstraint = icon.sizeBasis == 0.0 ? iconSize.x : iconSize.y;\nfloat instanceScale = iconConstraint == 0.0 ? 0.0 : sizePixels / iconConstraint;\nvec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;\npixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;\npixelOffset += instancePixelOffset;\npixelOffset.y *= -1.0;\nif (icon.billboard)  {\ngl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);\nDECKGL_FILTER_GL_POSITION(gl_Position, geometry);\nvec3 offset = vec3(pixelOffset, 0.0);\nDECKGL_FILTER_SIZE(offset, geometry);\ngl_Position.xy += project_pixel_size_to_clipspace(offset.xy);\n} else {\nvec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);\nDECKGL_FILTER_SIZE(offset_common, geometry);\ngl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);\nDECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n}\nvTextureCoords = mix(\ninstanceIconFrames.xy,\ninstanceIconFrames.xy + iconSize,\n(positions.xy + 1.0) / 2.0\n) / icon.iconsTextureDim;\nvColor = instanceColors;\nDECKGL_FILTER_COLOR(vColor, geometry);\nvColorMode = instanceColorModes;\n}\n", $N = "#version 300 es\n#define SHADER_NAME icon-layer-fragment-shader\nprecision highp float;\nuniform sampler2D iconsTexture;\nin float vColorMode;\nin vec4 vColor;\nin vec2 vTextureCoords;\nin vec2 uv;\nout vec4 fragColor;\nvoid main(void) {\ngeometry.uv = uv;\nvec4 texColor = texture(iconsTexture, vTextureCoords);\nvec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);\nfloat a = texColor.a * layer.opacity * vColor.a;\nif (a < icon.alphaCutoff) {\ndiscard;\n}\nfragColor = vec4(color, a);\nDECKGL_FILTER_COLOR(fragColor, geometry);\n}\n", eP = "struct IconUniforms {\n  sizeScale: f32,\n  iconsTextureDim: vec2<f32>,\n  sizeBasis: f32,\n  sizeMinPixels: f32,\n  sizeMaxPixels: f32,\n  billboard: i32,\n  sizeUnits: i32,\n  alphaCutoff: f32\n};\n\n@group(0) @binding(auto) var<uniform> icon: IconUniforms;\n@group(0) @binding(auto) var iconsTexture : texture_2d<f32>;\n@group(0) @binding(auto) var iconsTextureSampler : sampler;\n\nfn rotate_by_angle(vertex: vec2<f32>, angle_deg: f32) -> vec2<f32> {\n  let angle_radian = angle_deg * PI / 180.0;\n  let c = cos(angle_radian);\n  let s = sin(angle_radian);\n  let rotation = mat2x2<f32>(vec2<f32>(c, s), vec2<f32>(-s, c));\n  return rotation * vertex;\n}\n\nstruct Attributes {\n  @builtin(instance_index) instanceIndex : u32,\n  @location(0) positions: vec2<f32>,\n\n  @location(1) instancePositions: vec3<f32>,\n  @location(2) instancePositions64Low: vec3<f32>,\n  @location(3) instanceSizes: f32,\n  @location(4) instanceAngles: f32,\n  @location(5) instanceColors: vec4<f32>,\n  @location(6) instanceIconFrames: vec4<f32>,\n  @location(7) instanceColorModes: f32,\n  @location(8) instanceOffsets: vec2<f32>,\n  @location(9) instancePixelOffset: vec2<f32>,\n  PICKING_COLOR_ATTRIBUTE\n};\n\nstruct Varyings {\n  @builtin(position) position: vec4<f32>,\n\n  @location(0) vColorMode: f32,\n  @location(1) vColor: vec4<f32>,\n  @location(2) vTextureCoords: vec2<f32>,\n  @location(3) uv: vec2<f32>,\n  @location(4) pickingColor: vec3<f32>,\n};\n\n@vertex\nfn vertexMain(inp: Attributes) -> Varyings {\n  // write geometry fields used by filters + FS\n  geometry.worldPosition = inp.instancePositions;\n  geometry.uv = inp.positions;\n  geometry.pickingColor = PICKING_COLOR_VALUE;\n\n  var outp: Varyings;\n  outp.uv = inp.positions;\n\n  let iconSize = inp.instanceIconFrames.zw;\n\n  // convert size in meters to pixels, then clamp\n  let sizePixels = clamp(\n    project_unit_size_to_pixel(inp.instanceSizes * icon.sizeScale, icon.sizeUnits),\n    icon.sizeMinPixels, icon.sizeMaxPixels\n  );\n\n  // scale icon height to match instanceSize\n  let iconConstraint = select(iconSize.y, iconSize.x, icon.sizeBasis == 0.0);\n  let instanceScale = select(sizePixels / iconConstraint, 0.0, iconConstraint == 0.0);\n\n  // scale and rotate vertex in \"pixel\" units; then add per-instance pixel offset\n  var pixelOffset = inp.positions / 2.0 * iconSize + inp.instanceOffsets;\n  pixelOffset = rotate_by_angle(pixelOffset, inp.instanceAngles) * instanceScale;\n  pixelOffset = pixelOffset + inp.instancePixelOffset;\n  pixelOffset.y = pixelOffset.y * -1.0;\n\n  if (icon.billboard != 0) {\n    var pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0)); // TODO, &geometry.position);\n    // DECKGL_FILTER_GL_POSITION(pos, geometry);\n\n    var offset = vec3<f32>(pixelOffset, 0.0);\n    // DECKGL_FILTER_SIZE(offset, geometry);\n    let clipOffset = project_pixel_size_to_clipspace(offset.xy);\n    pos = vec4<f32>(pos.x + clipOffset.x, pos.y + clipOffset.y, pos.z, pos.w);\n    outp.position = pos;\n  } else {\n    var offset_common = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);\n    // DECKGL_FILTER_SIZE(offset_common, geometry);\n    var pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, offset_common); // TODO, &geometry.position);\n    // DECKGL_FILTER_GL_POSITION(pos, geometry);\n    outp.position = pos;\n  }\n\n  let uvMix = (inp.positions.xy + vec2<f32>(1.0, 1.0)) * 0.5;\n  outp.vTextureCoords = mix(inp.instanceIconFrames.xy, inp.instanceIconFrames.xy + iconSize, uvMix) / icon.iconsTextureDim;\n\n  outp.vColor = inp.instanceColors;\n  // DECKGL_FILTER_COLOR(outp.vColor, geometry);\n\n  outp.vColorMode = inp.instanceColorModes;\n  outp.pickingColor = geometry.pickingColor;\n\n  return outp;\n}\n\n@fragment\nfn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {\n  // expose to deck.gl filter hooks\n  geometry.uv = inp.uv;\n\n  let texColor = textureSample(iconsTexture, iconsTextureSampler, inp.vTextureCoords);\n\n  // if colorMode == 0, use pixel color from the texture\n  // if colorMode == 1 (or picking), use texture as transparency mask\n  let rgb = mix(texColor.rgb, inp.vColor.rgb, inp.vColorMode);\n  let a = texColor.a * layer.opacity * inp.vColor.a;\n\n  if (a < icon.alphaCutoff) {\n    discard;\n  }\n\n  if (picking.isActive > 0.5) {\n    if (!picking_isColorValid(inp.pickingColor)) {\n      discard;\n    }\n    return vec4<f32>(inp.pickingColor, 1.0);\n  }\n\n  var fragColor = deckgl_premultiplied_alpha(vec4<f32>(rgb, a));\n\n  if (picking.isHighlightActive > 0.5) {\n    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);\n    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {\n      let highLightAlpha = picking.highlightColor.a;\n      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);\n      if (blendedAlpha > 0.0) {\n        let highLightRatio = highLightAlpha / blendedAlpha;\n        fragColor = vec4<f32>(\n          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),\n          blendedAlpha\n        );\n      } else {\n        fragColor = vec4<f32>(fragColor.rgb, 0.0);\n      }\n    }\n  }\n\n  return fragColor;\n}\n";
function tP(e) {
	return eP.replace("PICKING_COLOR_ATTRIBUTE", e ? "@location(10) rowIndexes: u32," : "").replace("PICKING_COLOR_VALUE", e ? "picking_getPickingColorFromIndex(inp.rowIndexes)" : "picking_getPickingColorFromIndex(inp.instanceIndex)");
}
//#endregion
//#region node_modules/@deck.gl/layers/dist/icon-layer/icon-manager.js
var nP = 1024, rP = 4, iP = () => {}, aP = {
	minFilter: "linear",
	mipmapFilter: "linear",
	magFilter: "linear",
	addressModeU: "clamp-to-edge",
	addressModeV: "clamp-to-edge"
}, oP = {
	x: 0,
	y: 0,
	width: 0,
	height: 0
};
function sP(e) {
	return 2 ** Math.ceil(Math.log2(e));
}
function cP(e, t, n, r) {
	let i = Math.min(n / t.width, r / t.height), a = Math.floor(t.width * i), o = Math.floor(t.height * i);
	return i === 1 ? {
		image: t,
		width: a,
		height: o
	} : (e.canvas.height = o, e.canvas.width = a, e.clearRect(0, 0, a, o), e.drawImage(t, 0, 0, t.width, t.height, 0, 0, a, o), {
		image: e.canvas,
		width: a,
		height: o
	});
}
function lP(e) {
	return e && (e.id || e.url);
}
function uP(e) {
	let { device: t } = e;
	t.type === "webgl" ? e.generateMipmapsWebGL() : t.type === "webgpu" && t.generateMipmapsWebGPU(e);
}
function dP(e, t, n, r) {
	let { width: i, height: a, device: o } = e, s = o.createTexture({
		format: "rgba8unorm",
		width: t,
		height: n,
		sampler: r,
		mipLevels: o.getMipLevelCount(t, n)
	}), c = o.createCommandEncoder();
	c.copyTextureToTexture({
		sourceTexture: e,
		destinationTexture: s,
		width: i,
		height: a
	});
	let l = c.finish();
	return o.submit(l), uP(s), e.destroy(), s;
}
function fP(e, t, n) {
	for (let r = 0; r < t.length; r++) {
		let { icon: i, xOffset: a } = t[r], o = lP(i);
		e[o] = {
			...i,
			x: a,
			y: n
		};
	}
}
function pP({ icons: e, buffer: t, mapping: n = {}, xOffset: r = 0, yOffset: i = 0, rowHeight: a = 0, canvasWidth: o }) {
	let s = [];
	for (let c = 0; c < e.length; c++) {
		let l = e[c];
		if (!n[lP(l)]) {
			let { height: e, width: c } = l;
			r + c + t > o && (fP(n, s, i), r = 0, i = a + i + t, a = 0, s = []), s.push({
				icon: l,
				xOffset: r
			}), r = r + c + t, a = Math.max(a, e);
		}
	}
	return s.length > 0 && fP(n, s, i), {
		mapping: n,
		rowHeight: a,
		xOffset: r,
		yOffset: i,
		canvasWidth: o,
		canvasHeight: sP(a + i + t)
	};
}
function mP(e, t, n) {
	if (!e || !t) return null;
	n ||= {};
	let r = {}, { iterable: i, objectInfo: a } = SD(e);
	for (let e of i) {
		a.index++;
		let i = t(e, a), o = lP(i);
		if (!i) throw Error("Icon is missing.");
		if (!i.url) throw Error("Icon url is missing.");
		!r[o] && (!n[o] || i.url !== n[o].url) && (r[o] = {
			...i,
			source: e,
			sourceIndex: a.index
		});
	}
	return r;
}
var hP = class {
	constructor(e, { onUpdate: t = iP, onError: n = iP }) {
		this._loadOptions = null, this._texture = null, this._externalTexture = null, this._mapping = {}, this._samplerParameters = null, this._pendingCount = 0, this._autoPacking = !1, this._xOffset = 0, this._yOffset = 0, this._rowHeight = 0, this._buffer = rP, this._canvasWidth = nP, this._canvasHeight = 0, this._canvas = null, this.device = e, this.onUpdate = t, this.onError = n;
	}
	finalize() {
		this._texture?.delete();
	}
	getTexture() {
		return this._texture || this._externalTexture;
	}
	getIconMapping(e) {
		let t = this._autoPacking ? lP(e) : e;
		return this._mapping[t] || oP;
	}
	setProps({ loadOptions: e, autoPacking: t, iconAtlas: n, iconMapping: r, textureParameters: i }) {
		e && (this._loadOptions = e), t !== void 0 && (this._autoPacking = t), r && (this._mapping = r), n && (this._texture?.delete(), this._texture = null, this._externalTexture = n), i && (this._samplerParameters = i);
	}
	get isLoaded() {
		return this._pendingCount === 0;
	}
	packIcons(e, t) {
		if (!this._autoPacking || typeof document > "u") return;
		let n = Object.values(mP(e, t, this._mapping) || {});
		if (n.length > 0) {
			let { mapping: e, xOffset: t, yOffset: r, rowHeight: i, canvasHeight: a } = pP({
				icons: n,
				buffer: this._buffer,
				canvasWidth: this._canvasWidth,
				mapping: this._mapping,
				rowHeight: this._rowHeight,
				xOffset: this._xOffset,
				yOffset: this._yOffset
			});
			this._rowHeight = i, this._mapping = e, this._xOffset = t, this._yOffset = r, this._canvasHeight = a, this._texture ||= this.device.createTexture({
				format: "rgba8unorm",
				data: null,
				width: this._canvasWidth,
				height: this._canvasHeight,
				sampler: this._samplerParameters || aP,
				mipLevels: this.device.getMipLevelCount(this._canvasWidth, this._canvasHeight)
			}), this._texture.height !== this._canvasHeight && (this._texture = dP(this._texture, this._canvasWidth, this._canvasHeight, this._samplerParameters || aP)), this.onUpdate(!0), this._canvas = this._canvas || document.createElement("canvas"), this._loadIcons(n);
		}
	}
	_loadIcons(e) {
		let t = this._canvas.getContext("2d", { willReadFrequently: !0 });
		for (let n of e) this._pendingCount++, ff(n.url, this._loadOptions).then((e) => {
			let r = lP(n), i = this._mapping[r], { x: a, y: o, width: s, height: c } = i, { image: l, width: u, height: d } = cP(t, e, s, c), f = a + (s - u) / 2, p = o + (c - d) / 2;
			this._texture?.copyExternalImage({
				image: l,
				x: f,
				y: p,
				width: u,
				height: d
			}), i.x = f, i.y = p, i.width = u, i.height = d, this._texture && uP(this._texture), this.onUpdate(u !== s || d !== c);
		}).catch((e) => {
			this.onError({
				url: n.url,
				source: n.source,
				sourceIndex: n.sourceIndex,
				loadOptions: this._loadOptions,
				error: e
			});
		}).finally(() => {
			this._pendingCount--;
		});
	}
};
//#endregion
//#region node_modules/@deck.gl/layers/dist/icon-layer/icon-layer.js
Y();
var gP = [
	0,
	0,
	0,
	255
], _P = {
	iconAtlas: {
		type: "image",
		value: null,
		async: !0
	},
	iconMapping: {
		type: "object",
		value: {},
		async: !0
	},
	sizeScale: {
		type: "number",
		value: 1,
		min: 0
	},
	billboard: !0,
	sizeUnits: "pixels",
	sizeBasis: "height",
	sizeMinPixels: {
		type: "number",
		min: 0,
		value: 0
	},
	sizeMaxPixels: {
		type: "number",
		min: 0,
		value: 2 ** 53 - 1
	},
	alphaCutoff: {
		type: "number",
		value: .05,
		min: 0,
		max: 1
	},
	getPosition: {
		type: "accessor",
		value: (e) => e.position
	},
	getIcon: {
		type: "accessor",
		value: (e) => e.icon
	},
	getColor: {
		type: "accessor",
		value: gP
	},
	getSize: {
		type: "accessor",
		value: 1
	},
	getAngle: {
		type: "accessor",
		value: 0
	},
	getPixelOffset: {
		type: "accessor",
		value: [0, 0]
	},
	onIconError: {
		type: "function",
		value: null,
		optional: !0
	},
	textureParameters: {
		type: "object",
		ignore: !0,
		value: null
	}
}, vP = class extends DN {
	getShaders() {
		let e = !!this.props.data?.attributes?.rowIndexes;
		return super.getShaders({
			vs: QN,
			fs: $N,
			source: tP(e),
			defines: e ? { USE_ROW_INDEXES: !0 } : {},
			modules: [
				Lx,
				Sy,
				FS,
				ZN
			]
		});
	}
	initializeState() {
		this.state = { iconManager: new hP(this.context.device, {
			onUpdate: this._onUpdate.bind(this),
			onError: this._onError.bind(this)
		}) }, this.getAttributeManager().addInstanced({
			instancePositions: {
				size: 3,
				type: "float64",
				fp64: this.use64bitPositions(),
				transition: !0,
				accessor: "getPosition"
			},
			instanceSizes: {
				size: 1,
				transition: !0,
				bufferGroup: "icon-instance-data",
				accessor: "getSize",
				defaultValue: 1
			},
			instanceIconDefs: {
				size: 7,
				bufferGroup: "icon-instance-data",
				accessor: "getIcon",
				transform: this.getInstanceIconDef,
				shaderAttributes: {
					instanceOffsets: {
						size: 2,
						elementOffset: 0
					},
					instanceIconFrames: {
						size: 4,
						elementOffset: 2
					},
					instanceColorModes: {
						size: 1,
						elementOffset: 6
					}
				}
			},
			instanceColors: {
				size: this.props.colorFormat.length,
				type: "unorm8",
				transition: !0,
				bufferGroup: "icon-instance-data",
				accessor: "getColor",
				defaultValue: gP
			},
			instanceAngles: {
				size: 1,
				transition: !0,
				bufferGroup: "icon-instance-data",
				accessor: "getAngle"
			},
			instancePixelOffset: {
				size: 2,
				transition: !0,
				bufferGroup: "icon-instance-data",
				accessor: "getPixelOffset"
			},
			...this.props.data?.attributes?.rowIndexes ? { rowIndexes: {
				size: 1,
				type: "uint32",
				noAlloc: !0
			} } : {}
		});
	}
	updateState(e) {
		super.updateState(e);
		let { props: t, oldProps: n, changeFlags: r } = e, i = this.getAttributeManager(), { iconAtlas: a, iconMapping: o, data: s, getIcon: c, textureParameters: l } = t, { iconManager: u } = this.state;
		if (typeof a == "string") return;
		let d = a || this.internalState.isAsyncPropLoading("iconAtlas");
		u.setProps({
			loadOptions: t.loadOptions,
			autoPacking: !d,
			iconAtlas: a,
			iconMapping: d ? o : null,
			textureParameters: l
		}), d ? n.iconMapping !== t.iconMapping && i.invalidate("getIcon") : (r.dataChanged || r.updateTriggersChanged && (r.updateTriggersChanged.all || r.updateTriggersChanged.getIcon)) && u.packIcons(s, c), r.extensionsChanged && (this.state.model?.destroy(), this.state.model = this._getModel(), i.invalidateAll());
	}
	get isLoaded() {
		return super.isLoaded && this.state.iconManager.isLoaded;
	}
	finalizeState(e) {
		super.finalizeState(e), this.state.iconManager.finalize();
	}
	draw({ uniforms: e }) {
		this._drawModel(this.state.model);
	}
	_drawModel(e) {
		let { sizeScale: t, sizeBasis: n, sizeMinPixels: r, sizeMaxPixels: i, sizeUnits: a, billboard: o, alphaCutoff: s } = this.props, { iconManager: c } = this.state, l = c.getTexture();
		if (l) {
			let c = {
				iconsTexture: l,
				iconsTextureDim: [l.width, l.height],
				sizeUnits: hx[a],
				sizeScale: t,
				sizeBasis: +(n === "height"),
				sizeMinPixels: r,
				sizeMaxPixels: i,
				billboard: o,
				alphaCutoff: s
			};
			e.shaderInputs.setProps({ icon: c }), e.draw(this.context.renderPass);
		}
	}
	_getModel(e = this.props.id) {
		let t = [
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		];
		return new dT(this.context.device, {
			...this.getShaders(),
			id: e,
			bufferLayout: this.getAttributeManager().getBufferLayouts(),
			geometry: new PC({
				topology: "triangle-strip",
				attributes: { positions: {
					size: 2,
					value: new Float32Array(t)
				} }
			}),
			isInstanced: !0
		});
	}
	_onUpdate(e) {
		e ? (this.getAttributeManager()?.invalidate("getIcon"), this.setNeedsUpdate()) : this.setNeedsRedraw();
	}
	_onError(e) {
		let t = this.getCurrentLayer()?.props.onIconError;
		t ? t(e) : B.error(e.error.message)();
	}
	getInstanceIconDef(e) {
		let { x: t, y: n, width: r, height: i, mask: a, anchorX: o = r / 2, anchorY: s = i / 2 } = this.state.iconManager.getIconMapping(e);
		return [
			r / 2 - o,
			i / 2 - s,
			t,
			n,
			r,
			i,
			+!!a
		];
	}
};
vP.defaultProps = _P, vP.layerName = "IconLayer";
//#endregion
//#region node_modules/@googlemaps/js-api-loader/dist/index.js
var yP = (e) => `The setOptions() function should only be called once. The options passed to the additional call (${JSON.stringify(e)}) will be ignored.`, bP = (e) => `The google.maps.importLibrary() function is already defined, and @googlemaps/js-api-loader will use the existing function instead of overwriting it. The options passed to setOptions (${JSON.stringify(e)}) will be ignored.`, xP = (e, t) => `Failed to create Trusted Types policy "${e}": ${t instanceof Error ? t.message : String(t)}.\n\nIf your Content Security Policy uses "require-trusted-types-for 'script'", allow this policy with "trusted-types ${e} google-maps-api-loader google-maps-api#html lit-html". The "google-maps-api-loader", "lit-html", and "google-maps-api#html" policies are required for full Maps JavaScript API execution. Falling back to a string script URL.`, SP = "@googlemaps/js-api-loader", CP = { createScriptURL: (e) => e }, wP;
function TP() {
	if (wP) return wP;
	let e = globalThis.trustedTypes;
	if (!e) return wP = CP, wP;
	try {
		wP = e.createPolicy(SP, { createScriptURL: (e) => e });
	} catch (e) {
		xP(SP, e), wP = CP;
	}
	return wP;
}
function EP(e, t) {
	e.src = TP().createScriptURL(t);
}
var DP = (e) => {
	var t, n, r, i = "The Google Maps JavaScript API", a = "google", o = "importLibrary", s = document, c = window, l = c[a] || (c[a] = {}), u = l.maps ||= {}, d = /* @__PURE__ */ new Set(), f = new URLSearchParams(), p = () => t ||= new Promise(async (o, c) => {
		for (r in await (n = s.createElement("script")), f.set("libraries", [...d] + ""), e) f.set(r.replace(/[A-Z]/g, (e) => "_" + e[0].toLowerCase()), e[r]);
		f.set("callback", a + ".maps.__ib__"), EP(n, "https://maps.googleapis.com/maps/api/js?" + f), u.__ib__ = o, n.onerror = () => t = c(Error(i + " could not load.")), n.nonce = s.querySelector("script[nonce]")?.nonce || "", s.head.append(n);
	});
	u[o] ? console.warn(i + " only loads once. Ignoring:", e) : u[o] = (e, ...t) => d.add(e) && p().then(() => u[o](e, ...t));
}, OP = !1;
function kP(e) {
	OP ? yP(e) : (e.apiKey && (e.key ||= e.apiKey), jP(e), OP = !0);
}
async function AP(e) {
	if (!window?.google?.maps?.importLibrary) throw Error("google.maps.importLibrary is not installed.");
	return await google.maps.importLibrary(e);
}
function jP(e) {
	let t = !!window.google?.maps?.importLibrary;
	t && bP(e), t || DP(e);
}
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/common/utils/color-utils.js
var MP = [
	[
		255,
		255,
		178
	],
	[
		254,
		217,
		118
	],
	[
		254,
		178,
		76
	],
	[
		253,
		141,
		60
	],
	[
		240,
		59,
		32
	],
	[
		189,
		0,
		38
	]
];
function NP(e, t = !1, n = Float32Array) {
	let r;
	if (Number.isFinite(e[0])) r = new n(e);
	else {
		r = new n(e.length * 4);
		let t = 0;
		for (let n = 0; n < e.length; n++) {
			let i = e[n];
			r[t++] = i[0], r[t++] = i[1], r[t++] = i[2], r[t++] = Number.isFinite(i[3]) ? i[3] : 255;
		}
	}
	if (t) for (let e = 0; e < r.length; e++) r[e] /= 255;
	return r;
}
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/heatmap-layer/heatmap-layer-utils.js
function PP(e) {
	let t = e.map((e) => e[0]), n = e.map((e) => e[1]), r = Math.min.apply(null, t), i = Math.max.apply(null, t);
	return [
		r,
		Math.min.apply(null, n),
		i,
		Math.max.apply(null, n)
	];
}
function FP(e, t) {
	return t[0] >= e[0] && t[2] <= e[2] && t[1] >= e[1] && t[3] <= e[3];
}
var IP = /* @__PURE__ */ new Float32Array(12);
function LP(e, t = 2) {
	let n = 0;
	for (let r of e) for (let e = 0; e < t; e++) IP[n++] = r[e] || 0;
	return IP;
}
function RP(e, t, n) {
	let [r, i, a, o] = e, s = a - r, c = o - i, l = s, u = c;
	s / c < t / n ? l = t / n * c : u = n / t * s, l < t && (l = t, u = n);
	let d = (a + r) / 2, f = (o + i) / 2;
	return [
		d - l / 2,
		f - u / 2,
		d + l / 2,
		f + u / 2
	];
}
function zP(e, t) {
	let [n, r, i, a] = t;
	return [(e[0] - n) / (i - n), (e[1] - r) / (a - r)];
}
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/heatmap-layer/triangle-layer.wgsl.js
var BP = "struct TriangleAttributes {\n  @location(0) positions: vec3<f32>,\n  @location(1) texCoords: vec2<f32>,\n};\n\nstruct TriangleVaryings {\n  @builtin(position) position: vec4<f32>,\n  @location(0) textureCoordinates: vec2<f32>,\n  @location(1) intensityMinimum: f32,\n  @location(2) intensityMaximum: f32,\n};\n\n@vertex\nfn vertexMain(attributes: TriangleAttributes) -> TriangleVaryings {\n  var output: TriangleVaryings;\n  output.position = project_position_to_clipspace(\n    attributes.positions,\n    vec3<f32>(0.0),\n    vec3<f32>(0.0)\n  );\n  // WebGPU render-target textures use a top-left origin.\n  output.textureCoordinates = vec2<f32>(attributes.texCoords.x, 1.0 - attributes.texCoords.y);\n\n  let maxWeights = textureLoad(maxTexture, vec2<i32>(0), 0);\n  var maximumValue = select(maxWeights.r, maxWeights.g, triangle.aggregationMode > 0.5);\n  var minimumValue = maximumValue * triangle.threshold;\n\n  if (triangle.colorDomain.y > 0.0) {\n    maximumValue = triangle.colorDomain.y;\n    minimumValue = triangle.colorDomain.x;\n  }\n\n  output.intensityMaximum = triangle.intensity / maximumValue;\n  output.intensityMinimum = triangle.intensity / minimumValue;\n  return output;\n}\n\n@fragment\nfn fragmentMain(varyings: TriangleVaryings) -> @location(0) vec4<f32> {\n  let weights = textureSample(weightsTexture, weightsTextureSampler, varyings.textureCoordinates);\n  var weight = weights.r;\n\n  if (triangle.aggregationMode > 0.5) {\n    weight /= max(1.0, weights.a);\n  }\n\n  let colorCoordinates = vec2<f32>(\n    clamp(weight * varyings.intensityMaximum, 0.0, 1.0),\n    0.5\n  );\n  var color = textureSample(colorTexture, colorTextureSampler, colorCoordinates);\n\n  if (weight <= 0.0) {\n    discard;\n  }\n\n  color.a *= min(weight * varyings.intensityMinimum, 1.0) * layer.opacity;\n  return deckgl_premultiplied_alpha(color);\n}\n", VP = "#version 300 es\n#define SHADER_NAME heatp-map-layer-vertex-shader\nuniform sampler2D maxTexture;\nin vec3 positions;\nin vec2 texCoords;\nout vec2 vTexCoords;\nout float vIntensityMin;\nout float vIntensityMax;\nvoid main(void) {\ngl_Position = project_position_to_clipspace(positions, vec3(0.0), vec3(0.0));\nvTexCoords = texCoords;\nvec4 maxTexture = texture(maxTexture, vec2(0.5));\nfloat maxValue = triangle.aggregationMode < 0.5 ? maxTexture.r : maxTexture.g;\nfloat minValue = maxValue * triangle.threshold;\nif (triangle.colorDomain[1] > 0.) {\nmaxValue = triangle.colorDomain[1];\nminValue = triangle.colorDomain[0];\n}\nvIntensityMax = triangle.intensity / maxValue;\nvIntensityMin = triangle.intensity / minValue;\n}\n", HP = "#version 300 es\n#define SHADER_NAME triangle-layer-fragment-shader\nprecision highp float;\nuniform sampler2D weightsTexture;\nuniform sampler2D colorTexture;\nin vec2 vTexCoords;\nin float vIntensityMin;\nin float vIntensityMax;\nout vec4 fragColor;\nvec4 getLinearColor(float value) {\nfloat factor = clamp(value * vIntensityMax, 0., 1.);\nvec4 color = texture(colorTexture, vec2(factor, 0.5));\ncolor.a *= min(value * vIntensityMin, 1.0);\nreturn color;\n}\nvoid main(void) {\nvec4 weights = texture(weightsTexture, vTexCoords);\nfloat weight = weights.r;\nif (triangle.aggregationMode > 0.5) {\nweight /= max(1.0, weights.a);\n}\nif (weight <= 0.) {\ndiscard;\n}\nvec4 linearColor = getLinearColor(weight);\nlinearColor.a *= layer.opacity;\nfragColor = linearColor;\n}\n", UP = "struct triangleUniforms {\n  aggregationMode: f32,\n  colorDomain: vec2<f32>,\n  intensity: f32,\n  threshold: f32,\n};\n\n@group(0) @binding(auto) var<uniform> triangle: triangleUniforms;\n@group(0) @binding(auto) var colorTexture: texture_2d<f32>;\n@group(0) @binding(auto) var colorTextureSampler: sampler;\n@group(0) @binding(auto) var maxTexture: texture_2d<f32>;\n@group(0) @binding(auto) var weightsTexture: texture_2d<f32>;\n@group(0) @binding(auto) var weightsTextureSampler: sampler;\n", WP = "layout(std140) uniform triangleUniforms {\n  float aggregationMode;\n  vec2 colorDomain;\n  float intensity;\n  float threshold;\n} triangle;\n", GP = {
	name: "triangle",
	source: UP,
	vs: WP,
	fs: WP,
	uniformTypes: {
		aggregationMode: "f32",
		colorDomain: "vec2<f32>",
		intensity: "f32",
		threshold: "f32"
	}
};
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/heatmap-layer/triangle-layer.js
Y();
var KP = class extends DN {
	getShaders() {
		return super.getShaders({
			source: BP,
			vs: VP,
			fs: HP,
			modules: [
				Lx,
				Sy,
				GP
			]
		});
	}
	initializeState({ device: e }) {
		this.setState({ model: this._getModel(e) });
	}
	_getModel(e) {
		let { vertexCount: t, data: n } = this.props;
		return new dT(e, {
			...this.getShaders(),
			id: this.props.id,
			attributes: n.attributes,
			bufferLayout: [{
				name: "positions",
				format: "float32x3"
			}, {
				name: "texCoords",
				format: "float32x2"
			}],
			topology: "triangle-strip",
			vertexCount: t
		});
	}
	draw() {
		let { model: e } = this.state, { aggregationMode: t, colorDomain: n, intensity: r, threshold: i, colorTexture: a, maxTexture: o, weightsTexture: s } = this.props, c = {
			aggregationMode: t,
			colorDomain: n,
			intensity: r,
			threshold: i,
			colorTexture: a,
			maxTexture: o,
			weightsTexture: s
		};
		e.shaderInputs.setProps({ triangle: c }), e.draw(this.context.renderPass);
	}
};
KP.layerName = "TriangleLayer";
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/common/utils/prop-utils.js
function qP(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || (n[r] = e[r]);
	return n;
}
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/heatmap-layer/aggregation-layer.js
var JP = class extends NN {
	initializeAggregationLayer(e) {
		super.initializeState(this.context), this.setState({
			ignoreProps: qP(this.constructor._propTypes, e.data.props),
			dimensions: e
		});
	}
	updateState(e) {
		super.updateState(e);
		let { changeFlags: t } = e;
		if (t.extensionsChanged) {
			let e = this.getShaders({});
			e && e.defines && (e.defines.NON_INSTANCED_MODEL = 1), this.updateShaders(e);
		}
		this._updateAttributes();
	}
	updateAttributes(e) {
		this.setState({ changedAttributes: e });
	}
	getAttributes() {
		return this.getAttributeManager().getAttributes();
	}
	getModuleSettings() {
		let { viewport: e, mousePosition: t, device: n } = this.context;
		return Object.assign(Object.create(this.props), {
			viewport: e,
			mousePosition: t,
			picking: { isActive: 0 },
			devicePixelRatio: n.canvasContext.cssToDeviceRatio()
		});
	}
	updateShaders(e) {}
	isAggregationDirty(e, t = {}) {
		let { props: n, oldProps: r, changeFlags: i } = e, { compareAll: a = !1, dimension: o } = t, { ignoreProps: s } = this.state, { props: c, accessors: l = [] } = o, { updateTriggersChanged: u } = i;
		if (i.dataChanged) return !0;
		if (u) {
			if (u.all) return !0;
			for (let e of l) if (u[e]) return !0;
		}
		if (a) return i.extensionsChanged ? !0 : AM({
			oldProps: r,
			newProps: n,
			ignoreProps: s,
			propTypes: this.constructor._propTypes
		});
		for (let e of c) if (n[e] !== r[e]) return !0;
		return !1;
	}
	isAttributeChanged(e) {
		let { changedAttributes: t } = this.state;
		return e ? t && t[e] !== void 0 : !YP(t);
	}
	_getAttributeManager() {
		return new yM(this.context.device, {
			id: this.props.id,
			stats: this.context.stats
		});
	}
};
JP.layerName = "AggregationLayer";
function YP(e) {
	let t = !0;
	for (let n in e) {
		t = !1;
		break;
	}
	return t;
}
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/heatmap-layer/weights-vs.glsl.js
var XP = "#version 300 es\nin vec3 positions;\nin vec3 positions64Low;\nin float weights;\nout vec4 weightsTexture;\nvoid main()\n{\nweightsTexture = vec4(weights * weight.weightsScale, 0., 0., 1.);\nfloat radiusTexels = project_pixel_size(weight.radiusPixels) * weight.textureWidth / (weight.commonBounds.z - weight.commonBounds.x);\ngl_PointSize = radiusTexels * 2.;\nvec3 commonPosition = project_position(positions, positions64Low);\ngl_Position.xy = (commonPosition.xy - weight.commonBounds.xy) / (weight.commonBounds.zw - weight.commonBounds.xy) ;\ngl_Position.xy = (gl_Position.xy * 2.) - (1.);\ngl_Position.w = 1.0;\n}\n", ZP = "#version 300 es\nin vec4 weightsTexture;\nout vec4 fragColor;\nfloat gaussianKDE(float u){\nreturn pow(2.71828, -u*u/0.05555)/(1.77245385*0.166666);\n}\nvoid main()\n{\nfloat dist = length(gl_PointCoord - vec2(0.5, 0.5));\nif (dist > 0.5) {\ndiscard;\n}\nfragColor = weightsTexture * gaussianKDE(2. * dist);\nDECKGL_FILTER_COLOR(fragColor, geometry);\n}\n", QP = "#version 300 es\nuniform sampler2D inTexture;\nout vec4 outTexture;\nvoid main()\n{\nint yIndex = gl_VertexID / int(maxWeight.textureSize);\nint xIndex = gl_VertexID - (yIndex * int(maxWeight.textureSize));\nvec2 uv = (0.5 + vec2(float(xIndex), float(yIndex))) / maxWeight.textureSize;\noutTexture = texture(inTexture, uv);\ngl_Position = vec4(0.0, 0.0, 0.0, 1.0);\ngl_PointSize = 1.0;\n}\n", $P = "#version 300 es\nin vec4 outTexture;\nout vec4 fragColor;\nvoid main() {\nfragColor = outTexture;\nfragColor.g = outTexture.r / max(1.0, outTexture.a);\n}\n", eF = "struct MaxWeightVaryings {\n  @builtin(position) position: vec4<f32>,\n  @location(0) weights: vec4<f32>,\n};\n\nconst MAX_WEIGHT_REDUCTION_SIZE: u32 = 16u;\n\n@vertex\nfn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> MaxWeightVaryings {\n  var output: MaxWeightVaryings;\n  let textureSize = u32(maxWeight.textureSize);\n  let reducedTextureSize =\n    (textureSize + MAX_WEIGHT_REDUCTION_SIZE - 1u) / MAX_WEIGHT_REDUCTION_SIZE;\n  let blockCoordinates = vec2<u32>(\n    vertexIndex % reducedTextureSize,\n    vertexIndex / reducedTextureSize\n  );\n  var maximumWeights = vec4<f32>(0.0);\n\n  for (var y = 0u; y < MAX_WEIGHT_REDUCTION_SIZE; y++) {\n    for (var x = 0u; x < MAX_WEIGHT_REDUCTION_SIZE; x++) {\n      let textureCoordinates = blockCoordinates * MAX_WEIGHT_REDUCTION_SIZE + vec2<u32>(x, y);\n\n      if (textureCoordinates.x < textureSize && textureCoordinates.y < textureSize) {\n        let weights = textureLoad(inTexture, vec2<i32>(textureCoordinates), 0);\n        maximumWeights.r = max(maximumWeights.r, weights.r);\n        maximumWeights.g = max(maximumWeights.g, weights.r / max(1.0, weights.a));\n        maximumWeights.b = max(maximumWeights.b, weights.b);\n        maximumWeights.a = max(maximumWeights.a, weights.a);\n      }\n    }\n  }\n\n  output.position = vec4<f32>(0.0, 0.0, 0.0, 1.0);\n  output.weights = maximumWeights;\n  return output;\n}\n\n@fragment\nfn fragmentMain(varyings: MaxWeightVaryings) -> @location(0) vec4<f32> {\n  return varyings.weights;\n}\n", tF = "struct WeightAttributes {\n  @builtin(vertex_index) vertexIndex: u32,\n  @location(0) instancePositions: vec3<f32>,\n  @location(1) instancePositions64Low: vec3<f32>,\n  @location(2) instanceWeights: f32,\n};\n\nstruct WeightVaryings {\n  @builtin(position) position: vec4<f32>,\n  @location(0) pointCoordinates: vec2<f32>,\n  @location(1) weights: vec4<f32>,\n};\n\nconst WEIGHT_QUAD_POSITIONS = array<vec2<f32>, 6>(\n  vec2<f32>(-1.0, -1.0),\n  vec2<f32>(1.0, -1.0),\n  vec2<f32>(-1.0, 1.0),\n  vec2<f32>(-1.0, 1.0),\n  vec2<f32>(1.0, -1.0),\n  vec2<f32>(1.0, 1.0)\n);\n\n@vertex\nfn vertexMain(attributes: WeightAttributes) -> WeightVaryings {\n  var output: WeightVaryings;\n  let commonPosition = project_position_vec3_f64(\n    attributes.instancePositions,\n    attributes.instancePositions64Low\n  );\n  let clipPosition =\n    (commonPosition.xy - weight.commonBounds.xy) /\n    (weight.commonBounds.zw - weight.commonBounds.xy) * 2.0 - vec2<f32>(1.0);\n  let radiusTexels =\n    project_pixel_size_float(weight.radiusPixels) * weight.textureWidth /\n    (weight.commonBounds.z - weight.commonBounds.x);\n  let offset = WEIGHT_QUAD_POSITIONS[attributes.vertexIndex];\n\n  output.position = vec4<f32>(\n    clipPosition + offset * radiusTexels * 2.0 / weight.textureWidth,\n    0.0,\n    1.0\n  );\n  output.pointCoordinates = (offset + vec2<f32>(1.0)) * 0.5;\n  output.weights = vec4<f32>(attributes.instanceWeights * weight.weightsScale, 0.0, 0.0, 1.0);\n  return output;\n}\n\n@fragment\nfn fragmentMain(varyings: WeightVaryings) -> @location(0) vec4<f32> {\n  let distanceFromCenter = length(varyings.pointCoordinates - vec2<f32>(0.5));\n  if (distanceFromCenter > 0.5) {\n    discard;\n  }\n\n  let gaussian = exp(-pow(2.0 * distanceFromCenter, 2.0) / 0.05555) /\n    (1.77245385 * 0.166666);\n  return varyings.weights * gaussian;\n}\n", nF = {
	name: "weight",
	source: "struct weightUniforms {\n  commonBounds: vec4<f32>,\n  radiusPixels: f32,\n  textureWidth: f32,\n  weightsScale: f32,\n};\n\n@group(0) @binding(auto) var<uniform> weight: weightUniforms;\n",
	vs: "layout(std140) uniform weightUniforms {\n  vec4 commonBounds;\n  float radiusPixels;\n  float textureWidth;\n  float weightsScale;\n} weight;\n",
	uniformTypes: {
		commonBounds: "vec4<f32>",
		radiusPixels: "f32",
		textureWidth: "f32",
		weightsScale: "f32"
	}
}, rF = {
	name: "maxWeight",
	source: "struct maxWeightUniforms {\n  textureSize: f32,\n};\n\n@group(0) @binding(auto) var<uniform> maxWeight: maxWeightUniforms;\n@group(0) @binding(auto) var inTexture: texture_2d<f32>;\n",
	vs: "layout(std140) uniform maxWeightUniforms {\n  float textureSize;\n} maxWeight;\n",
	uniformTypes: { textureSize: "f32" }
};
//#endregion
//#region node_modules/@deck.gl/aggregation-layers/dist/heatmap-layer/heatmap-layer.js
Y();
var iF = 2, aF = 16, oF = {
	format: "rgba8unorm",
	dimension: "2d",
	width: 1,
	height: 1,
	sampler: {
		minFilter: "linear",
		magFilter: "linear",
		addressModeU: "clamp-to-edge",
		addressModeV: "clamp-to-edge"
	}
}, sF = [0, 0], cF = {
	SUM: 0,
	MEAN: 1
}, lF = {
	getPosition: {
		type: "accessor",
		value: (e) => e.position
	},
	getWeight: {
		type: "accessor",
		value: 1
	},
	intensity: {
		type: "number",
		min: 0,
		value: 1
	},
	radiusPixels: {
		type: "number",
		min: 1,
		max: 100,
		value: 50
	},
	colorRange: MP,
	threshold: {
		type: "number",
		min: 0,
		max: 1,
		value: .05
	},
	colorDomain: {
		type: "array",
		value: null,
		optional: !0
	},
	aggregation: "SUM",
	weightsTextureSize: {
		type: "number",
		min: 128,
		max: 2048,
		value: 2048
	},
	debounceTimeout: {
		type: "number",
		min: 0,
		max: 1e3,
		value: 500
	}
}, uF = ["float32-renderable-webgl", "texture-blend-float-webgl"], dF = { data: { props: ["radiusPixels"] } }, fF = class extends JP {
	getShaders(e) {
		let t = [Lx];
		return e.modules && (t = [...t, ...e.modules]), super.getShaders({
			...e,
			modules: t
		});
	}
	initializeState() {
		super.initializeAggregationLayer(dF), this.setState({ colorDomain: sF }), this._setupTextureParams(), this._setupAttributes(), this._setupResources();
	}
	shouldUpdateState({ changeFlags: e }) {
		return e.somethingChanged;
	}
	updateState(e) {
		super.updateState(e), this._updateHeatmapState(e);
	}
	_updateHeatmapState(e) {
		let { props: t, oldProps: n } = e, r = this._getChangeFlags(e);
		if ((r.dataChanged || r.viewportChanged) && (r.boundsChanged = this._updateBounds(r.dataChanged), this._updateTextureRenderingBounds()), r.dataChanged || r.boundsChanged) {
			if (clearTimeout(this.state.updateTimer), this.setState({ isWeightMapDirty: !0 }), r.dataChanged) {
				let e = this.getShaders({
					vs: XP,
					fs: ZP
				});
				this._createWeightsTransform(e);
			}
		} else r.viewportZoomChanged && this._debouncedUpdateWeightmap();
		t.colorRange !== n.colorRange && this._updateColorTexture(e), this.state.isWeightMapDirty && this._updateWeightmap(), this.setState({ zoom: e.context.viewport.zoom });
	}
	renderLayers() {
		let { weightsTexture: e, triPositionBuffer: t, triTexCoordBuffer: n, maxWeightsTexture: r, colorTexture: i, colorDomain: a } = this.state, { updateTriggers: o, intensity: s, threshold: c, aggregation: l } = this.props;
		return new (this.getSubLayerClass("triangle", KP))(this.getSubLayerProps({
			id: "triangle-layer",
			updateTriggers: o
		}), {
			coordinateSystem: "default",
			data: { attributes: {
				positions: t,
				texCoords: n
			} },
			vertexCount: 4,
			maxTexture: r,
			colorTexture: i,
			aggregationMode: cF[l] || 0,
			weightsTexture: e,
			intensity: s,
			threshold: c,
			colorDomain: a
		});
	}
	finalizeState(e) {
		super.finalizeState(e);
		let { weightsTransform: t, weightsTexture: n, maxWeightTransform: r, maxWeightsTexture: i, triPositionBuffer: a, triTexCoordBuffer: o, colorTexture: s, updateTimer: c } = this.state;
		t?.destroy(), n?.destroy(), r?.destroy(), i?.destroy(), a?.destroy(), o?.destroy(), s?.destroy(), c && clearTimeout(c);
	}
	_getAttributeManager() {
		return new yM(this.context.device, {
			id: this.props.id,
			stats: this.context.stats
		});
	}
	_getChangeFlags(e) {
		let t = {}, { dimensions: n } = this.state;
		t.dataChanged = this.isAttributeChanged() && "attribute changed" || this.isAggregationDirty(e, {
			compareAll: !0,
			dimension: n.data
		}) && "aggregation is dirty", t.viewportChanged = e.changeFlags.viewportChanged;
		let { zoom: r } = this.state;
		return (!e.context.viewport || e.context.viewport.zoom !== r) && (t.viewportZoomChanged = !0), t;
	}
	_createTextures() {
		let { textureSize: e, format: t } = this.state;
		this.setState({
			weightsTexture: this.context.device.createTexture({
				...oF,
				width: e,
				height: e,
				format: t
			}),
			maxWeightsTexture: this.context.device.createTexture({
				...oF,
				width: 1,
				height: 1,
				format: t
			})
		});
	}
	_setupAttributes() {
		let e = this.getAttributeManager();
		this.context.device.type === "webgpu" ? (e.addInstanced({
			instancePositions: {
				size: 3,
				type: "float64",
				accessor: "getPosition",
				transform: (e) => [
					e[0],
					e[1],
					e[2] ?? 0
				]
			},
			instanceWeights: {
				size: 1,
				accessor: "getWeight"
			}
		}), this.setState({ positionAttributeName: "instancePositions" })) : (e.add({
			positions: {
				size: 3,
				type: "float64",
				accessor: "getPosition"
			},
			weights: {
				size: 1,
				accessor: "getWeight"
			}
		}), this.setState({ positionAttributeName: "positions" }));
	}
	_setupTextureParams() {
		let { device: e } = this.context, { weightsTextureSize: t } = this.props, n = Math.min(t, e.limits.maxTextureDimension2D), r = e.type === "webgpu", i = r ? e.getTextureFormatCapabilities("rgba16float").blend : uF.every((t) => e.features.has(t)), a = i ? r ? "rgba16float" : "rgba32float" : "rgba8unorm", o = i ? 1 : 1 / 255;
		this.setState({
			textureSize: n,
			format: a,
			weightsScale: o
		}), i || B.warn(`HeatmapLayer: ${this.id} rendering to float texture not supported, falling back to low precision format`)();
	}
	_createWeightsTransform(e) {
		let { weightsTransform: t } = this.state, { weightsTexture: n } = this.state, r = this.context.device.type === "webgpu", i = this.getAttributeManager();
		t?.destroy(), t = new vT(this.context.device, {
			id: `${this.id}-weights-transform`,
			...e,
			source: tF,
			bufferLayout: i.getBufferLayouts({ isInstanced: r }),
			vertexCount: r ? 6 : 1,
			...r ? {
				colorAttachmentFormats: [n.format],
				isInstanced: !0,
				instanceCount: this.getNumInstances()
			} : {},
			targetTexture: n,
			parameters: {
				depthWriteEnabled: !1,
				blend: !0,
				blendColorOperation: "add",
				blendColorSrcFactor: "one",
				blendColorDstFactor: "one",
				blendAlphaSrcFactor: "one",
				blendAlphaDstFactor: "one"
			},
			topology: r ? "triangle-list" : "point-list",
			modules: [...e.modules, nF]
		}), this.setState({ weightsTransform: t });
	}
	_setupResources() {
		this._createTextures();
		let { device: e } = this.context, { textureSize: t, weightsTexture: n, maxWeightsTexture: r } = this.state, i = this.getShaders({
			vs: XP,
			fs: ZP
		});
		this._createWeightsTransform(i);
		let a = this.getShaders({
			source: eF,
			vs: QP,
			fs: $P,
			modules: [rF]
		}), o = new vT(e, {
			id: `${this.id}-max-weights-transform`,
			targetTexture: r,
			...a,
			...e.type === "webgpu" ? { colorAttachmentFormats: [r.format] } : {},
			vertexCount: e.type === "webgpu" ? Math.ceil(t / aF) ** 2 : t * t,
			topology: "point-list",
			parameters: {
				depthWriteEnabled: !1,
				blend: !0,
				blendColorOperation: "max",
				blendAlphaOperation: "max",
				blendColorSrcFactor: "one",
				blendColorDstFactor: "one",
				blendAlphaSrcFactor: "one",
				blendAlphaDstFactor: "one"
			}
		}), s = {
			inTexture: n,
			textureSize: t
		};
		o.model.shaderInputs.setProps({ maxWeight: s }), this.setState({
			weightsTexture: n,
			maxWeightsTexture: r,
			maxWeightTransform: o,
			zoom: null,
			triPositionBuffer: e.createBuffer({ byteLength: 48 }),
			triTexCoordBuffer: e.createBuffer({ byteLength: 48 })
		});
	}
	updateShaders(e) {
		this._createWeightsTransform({
			vs: XP,
			fs: ZP,
			...e
		});
	}
	_updateMaxWeightValue() {
		let { maxWeightTransform: e } = this.state;
		e.run({
			parameters: { viewport: [
				0,
				0,
				1,
				1
			] },
			clearColor: [
				0,
				0,
				0,
				0
			]
		});
	}
	_updateBounds(e = !1) {
		let { viewport: t } = this.context, n = [
			t.unproject([0, 0]),
			t.unproject([t.width, 0]),
			t.unproject([0, t.height]),
			t.unproject([t.width, t.height])
		].map((e) => e.map(Math.fround)), r = PP(n), i = {
			visibleWorldBounds: r,
			viewportCorners: n
		}, a = !1;
		if (e || !this.state.worldBounds || !FP(this.state.worldBounds, r)) {
			let e = this._worldToCommonBounds(r), t = this._commonToWorldBounds(e);
			this.props.coordinateSystem === "lnglat" && (t[1] = Math.max(t[1], -85.051129), t[3] = Math.min(t[3], 85.051129), t[0] = Math.max(t[0], -360), t[2] = Math.min(t[2], 360));
			let n = this._worldToCommonBounds(t);
			i.worldBounds = t, i.normalizedCommonBounds = n, a = !0;
		}
		return this.setState(i), a;
	}
	_updateTextureRenderingBounds() {
		let { triPositionBuffer: e, triTexCoordBuffer: t, normalizedCommonBounds: n, viewportCorners: r } = this.state, { viewport: i } = this.context;
		e.write(LP(r, 3));
		let a = r.map((e) => zP(i.projectPosition(e), n));
		t.write(LP(a, 2));
	}
	_updateColorTexture(e) {
		let { colorRange: t } = e.props, { colorTexture: n } = this.state, r = NP(t, !1, Uint8Array);
		n?.destroy(), n = this.context.device.createTexture({
			...oF,
			data: r,
			width: t.length,
			height: 1
		}), this.setState({ colorTexture: n });
	}
	_updateWeightmap() {
		let { radiusPixels: e, colorDomain: t, aggregation: n } = this.props, { worldBounds: r, textureSize: i, weightsScale: a, weightsTexture: o } = this.state, s = this.state.weightsTransform;
		this.state.isWeightMapDirty = !1;
		let c = this._worldToCommonBounds(r, { useLayerCoordinateSystem: !0 });
		if (t && n === "SUM") {
			let { viewport: e } = this.context, n = e.distanceScales.metersPerUnit[2] * (c[2] - c[0]) / i;
			this.state.colorDomain = [t[0] * n * a, t[1] * n * a];
		} else this.state.colorDomain = t || sF;
		let l = this.getAttributeManager().getAttributes(), u = this.getModuleSettings();
		if (this._setModelAttributes(s.model, l), this.context.device.type === "webgpu") {
			let e = this.getNumInstances();
			s.model.setVertexCount(e > 0 ? 6 : 0), s.model.setInstanceCount(e);
		} else s.model.setVertexCount(this.getNumInstances());
		let d = {
			radiusPixels: e,
			commonBounds: c,
			textureWidth: i,
			weightsScale: a,
			weightsTexture: o
		}, { viewport: f, devicePixelRatio: p, coordinateSystem: m, coordinateOrigin: h } = u, { modelMatrix: g } = this.props;
		s.model.shaderInputs.setProps({
			project: {
				viewport: f,
				devicePixelRatio: p,
				modelMatrix: g,
				coordinateSystem: m,
				coordinateOrigin: h
			},
			weight: d
		}), s.run({
			parameters: { viewport: [
				0,
				0,
				i,
				i
			] },
			clearColor: [
				0,
				0,
				0,
				0
			]
		}), this._updateMaxWeightValue();
	}
	_debouncedUpdateWeightmap(e = !1) {
		let { updateTimer: t } = this.state, { debounceTimeout: n } = this.props;
		e ? (t = null, this._updateBounds(!0), this._updateTextureRenderingBounds(), this.setState({ isWeightMapDirty: !0 })) : (this.setState({ isWeightMapDirty: !1 }), clearTimeout(t), t = setTimeout(this._debouncedUpdateWeightmap.bind(this, !0), n)), this.setState({ updateTimer: t });
	}
	_worldToCommonBounds(e, t = {}) {
		let { useLayerCoordinateSystem: n = !1 } = t, [r, i, a, o] = e, { viewport: s } = this.context, { textureSize: c } = this.state, { coordinateSystem: l } = this.props, u = n && (l === "lnglat-offsets" || l === "meter-offsets"), d = u ? s.projectPosition(this.props.coordinateOrigin) : [0, 0], f = c * iF / s.scale, p, m;
		return n && !u ? (p = this.projectPosition([
			r,
			i,
			0
		]), m = this.projectPosition([
			a,
			o,
			0
		])) : (p = s.projectPosition([
			r,
			i,
			0
		]), m = s.projectPosition([
			a,
			o,
			0
		])), RP([
			p[0] - d[0],
			p[1] - d[1],
			m[0] - d[0],
			m[1] - d[1]
		], f, f);
	}
	_commonToWorldBounds(e) {
		let [t, n, r, i] = e, { viewport: a } = this.context, o = a.unprojectPosition([t, n]), s = a.unprojectPosition([r, i]);
		return o.slice(0, 2).concat(s.slice(0, 2));
	}
};
fF.layerName = "HeatmapLayer", fF.defaultProps = lF;
//#endregion
//#region restaurants.js
var pF = 900, mF = 6, hF = 20, gF = 6371e3, _F = 900, vF = [];
function yF(e) {
	return Array.isArray(e) ? e.map((e) => ({
		...e,
		COORDINATES: [Number(e?.COORDINATES?.[0]), Number(e?.COORDINATES?.[1])],
		SPACES: Number(e?.SPACES ?? 1)
	})).filter((e) => Number.isFinite(e.COORDINATES[0]) && Number.isFinite(e.COORDINATES[1])) : [];
}
function bF(e, t) {
	return e.length ? [e.reduce((e, t) => e + t.COORDINATES[0], 0) / e.length, e.reduce((e, t) => e + t.COORDINATES[1], 0) / e.length] : [t.lng, t.lat];
}
function xF(e) {
	return {
		lng: e[0],
		lat: e[1]
	};
}
function SF(e) {
	if (!e) return null;
	let t = typeof e.lat == "function" ? e.lat() : e.lat, n = typeof e.lng == "function" ? e.lng() : e.lng;
	return !Number.isFinite(Number(t)) || !Number.isFinite(Number(n)) ? null : {
		lat: Number(t),
		lng: Number(n)
	};
}
function CF(e, t) {
	let n = e.lat * Math.PI / 180, r = t.lat * Math.PI / 180, i = (t.lat - e.lat) * Math.PI / 180, a = (t.lng - e.lng) * Math.PI / 180, o = Math.sin(i / 2) ** 2 + Math.cos(n) * Math.cos(r) * Math.sin(a / 2) ** 2;
	return 2 * gF * Math.atan2(Math.sqrt(o), Math.sqrt(1 - o));
}
function wF(e, t, n) {
	let r = t / gF * (180 / Math.PI), i = n / (gF * Math.cos(e.lat * Math.PI / 180)) * (180 / Math.PI);
	return {
		lat: e.lat + r,
		lng: e.lng + i
	};
}
function TF(e) {
	let t = yF(e);
	if (!t.length) return null;
	if (t.length === 1) {
		let e = xF(t[0].COORDINATES), n = wF(e, -900, -900), r = wF(e, _F, _F);
		return {
			north: r.lat,
			south: n.lat,
			east: r.lng,
			west: n.lng
		};
	}
	return t.reduce((e, t) => {
		let [n, r] = t.COORDINATES;
		return {
			north: Math.max(e.north, r),
			south: Math.min(e.south, r),
			east: Math.max(e.east, n),
			west: Math.min(e.west, n)
		};
	}, {
		north: -Infinity,
		south: Infinity,
		east: -Infinity,
		west: Infinity
	});
}
function EF(e, t) {
	return !t || e.lat <= t.north && e.lat >= t.south && e.lng <= t.east && e.lng >= t.west;
}
function DF(e, t) {
	let n = yF(e), r = xF(bF(n, t)), i = [{
		label: "centerpoint",
		center: r,
		distanceToCenter: 0,
		sortOrder: 0
	}], a = n.map((e, t) => {
		let n = xF(e.COORDINATES);
		return {
			label: e.Name ? `${e.Name}'s red zone` : `Person ${t + 1}'s red zone`,
			center: n,
			distanceToCenter: CF(r, n)
		};
	}).sort((e, t) => e.distanceToCenter - t.distanceToCenter || e.label.localeCompare(t.label)).map((e, t) => ({
		...e,
		sortOrder: t + 1
	}));
	for (let e of a) {
		if (i.length >= mF) break;
		i.some((t) => t.sortOrder > 0 && CF(t.center, e.center) < pF * .7) || i.push(e);
	}
	return i;
}
function OF() {
	vF.forEach((e) => {
		e.map = null;
	}), vF = [];
}
function kF() {
	let e = document.getElementById("restaurant-sidebar"), t = document.getElementById("restaurant-results");
	t && (t.replaceChildren(), e?.classList.remove("is-visible"), e?.setAttribute("aria-hidden", "true"));
}
function AF(e) {
	let t = document.getElementById("restaurant-sidebar"), n = document.getElementById("restaurant-results"), r = document.createElement("div");
	r.className = "restaurant-status", r.textContent = e, n.replaceChildren(r), t?.classList.add("is-visible"), t?.setAttribute("aria-hidden", "false");
}
function jF(e, t) {
	let n = document.getElementById("restaurant-sidebar"), r = document.getElementById("restaurant-results"), i = document.createElement("div");
	if (i.className = "restaurant-status", i.textContent = `${e.length} restaurants found inside the people bounds`, !e.length) {
		i.textContent = "No restaurants found inside the current people bounds", r.replaceChildren(i), n?.classList.add("is-visible"), n?.setAttribute("aria-hidden", "false");
		return;
	}
	let a = document.createElement("ul");
	a.className = "restaurant-list", e.forEach((e) => {
		let t = document.createElement("li");
		t.className = "restaurant-item";
		let n = e.url ? document.createElement("a") : document.createElement("span");
		n.className = "restaurant-name", n.textContent = e.name, e.url && (n.href = e.url, n.target = "_blank", n.rel = "noreferrer");
		let r = document.createElement("div");
		r.className = "restaurant-meta", r.textContent = [
			e.address,
			e.rating,
			e.closestZone
		].filter(Boolean).join(" - "), t.append(n, r), a.appendChild(t);
	}), r.replaceChildren(i, a), n?.classList.add("is-visible"), n?.setAttribute("aria-hidden", "false");
}
function MF(e) {
	let t = document.createElement("div"), n = document.createElement("strong");
	n.textContent = e.name;
	let r = document.createElement("div");
	if (r.textContent = e.address || "", t.append(n, r), e.url) {
		let n = document.createElement("a");
		n.href = e.url, n.target = "_blank", n.rel = "noreferrer", n.textContent = "Open in Google Maps", t.appendChild(n);
	}
	return t;
}
async function NF({ map: e, locationsData: t, fallbackLocationsData: n, mapCenter: r }) {
	let i = document.getElementById("find-restaurants");
	i.disabled = !0, AF("Finding restaurants near the red zones..."), OF();
	try {
		let i = t?.length ? t : n, a = DF(i, r), o = TF(i), [{ Place: s, SearchNearbyRankPreference: c }, { AdvancedMarkerElement: l }, { InfoWindow: u }] = await Promise.all([
			AP("places"),
			AP("marker"),
			AP("maps")
		]), d = /* @__PURE__ */ new Map();
		for (let e of a) {
			let { places: t } = await s.searchNearby({
				fields: [
					"id",
					"displayName",
					"formattedAddress",
					"googleMapsURI",
					"location",
					"rating",
					"userRatingCount"
				],
				locationRestriction: {
					center: e.center,
					radius: pF
				},
				includedPrimaryTypes: ["restaurant"],
				maxResultCount: hF,
				rankPreference: c.POPULARITY
			});
			t.forEach((t) => {
				let n = SF(t.location);
				if (!n || !EF(n, o)) return;
				let r = t.id || `${t.displayName}-${n.lat.toFixed(6)}-${n.lng.toFixed(6)}`, i = CF(e.center, n), a = d.get(r), s = t.rating ? `${t.rating.toFixed(1)} stars${t.userRatingCount ? ` (${t.userRatingCount})` : ""}` : "";
				(!a || e.sortOrder < a.zoneSortOrder || e.sortOrder === a.zoneSortOrder && i < a.distanceToZone) && d.set(r, {
					id: r,
					name: t.displayName || "Unnamed restaurant",
					address: t.formattedAddress || "",
					url: t.googleMapsURI || "",
					location: n,
					rating: s,
					closestZone: e.label,
					distanceToZone: i,
					zoneSortOrder: e.sortOrder
				});
			});
		}
		let f = Array.from(d.values()).sort((e, t) => e.zoneSortOrder - t.zoneSortOrder || e.distanceToZone - t.distanceToZone || e.name.localeCompare(t.name)), p = new u();
		vF = f.map((t) => {
			let n = new l({
				map: e,
				position: t.location,
				title: t.name
			});
			return n.addListener("gmp-click", () => {
				p.setContent(MF(t)), p.open({
					anchor: n,
					map: e
				});
			}), n;
		}), jF(f, a);
	} catch (e) {
		console.error(e), AF("Could not find restaurants. Check that Places API is enabled for this key.");
	} finally {
		i.disabled = !1;
	}
}
//#endregion
//#region app.js
var PF = "AIzaSyBBal_6FUfvLnKGrXZh23bSaXfc_Uv_SZE", FF = "12daf469cfd19e9d34767371", IF = {
	lat: -34.92572531133676,
	lng: 138.59971024043261
}, LF, RF = [];
kP({
	key: PF,
	mapIds: [FF],
	authReferrerPolicy: "origin"
});
function zF(e, t, n = 365) {
	let r = /* @__PURE__ */ new Date();
	r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
	let i = `expires=${r.toUTCString()}`;
	document.cookie = `${e}=${encodeURIComponent(JSON.stringify(t))};${i};path=/`;
}
function BF(e) {
	let t = e + "=", n = document.cookie.split(";");
	for (let e of n) if (e = e.trim(), e.indexOf(t) === 0) try {
		return JSON.parse(decodeURIComponent(e.substring(t.length)));
	} catch {
		return null;
	}
	return null;
}
function VF(e) {
	let t = encodeURIComponent(JSON.stringify(e));
	window.history.replaceState({}, "", `?locations=${t}`);
}
function HF() {
	let e = new URLSearchParams(window.location.search).get("locations");
	if (e && e.length > 0) try {
		return JSON.parse(decodeURIComponent(e));
	} catch {
		return null;
	}
	return null;
}
function UF(e) {
	return Array.isArray(e) ? e.map((e) => ({
		...e,
		COORDINATES: [Number(e?.COORDINATES?.[0]), Number(e?.COORDINATES?.[1])],
		SPACES: Number(e?.SPACES ?? 1)
	})).filter((e) => Number.isFinite(e.COORDINATES[0]) && Number.isFinite(e.COORDINATES[1])) : [];
}
function WF(e) {
	return e.length ? [e.reduce((e, t) => e + t.COORDINATES[0], 0) / e.length, e.reduce((e, t) => e + t.COORDINATES[1], 0) / e.length] : [IF.lng, IF.lat];
}
function GF(e) {
	let t = UF(e);
	RF = t, OF(), kF(), AP("maps").then(({ Map: e }) => {
		let n = new e(document.getElementById("map"), {
			center: IF,
			zoom: 16,
			mapId: FF
		});
		LF = n;
		let [r, i] = WF(t), a = [{ COORDINATES: [r, i] }], o = new YN({ layers: [t.length > 0 && new fF({
			id: "HeatmapLayer",
			data: t,
			opacity: .2,
			aggregation: "SUM",
			getPosition: (e) => e.COORDINATES,
			getWeight: (e) => e.SPACES * .5,
			radiusPixels: 1e3,
			intensity: .75
		}), new vP({
			id: "IconLayer",
			data: a,
			getColor: () => [
				37,
				99,
				235
			],
			getIcon: () => "marker",
			getPosition: (e) => e.COORDINATES,
			getSize: () => 48,
			iconAtlas: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
			iconMapping: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
			pickable: !0
		})].filter(Boolean) });
		zF("peopleLocations", t), VF(t), o.setMap(n);
	});
}
function KF() {
	let e = document.querySelectorAll("#people button"), t = [];
	return e.forEach((e, n) => {
		e.style.color === "blue" && t.push({
			COORDINATES: [Number(e.getAttribute("data-long")), Number(e.getAttribute("data-lat"))],
			Name: e.name,
			SPACES: 1
		});
	}), t;
}
function qF(e) {
	let t = document.getElementById("people");
	e?.forEach((e, n) => {
		let r = document.createElement("button");
		r.textContent = e.Name || `Person ${n + 1}`, r.style.color = "blue", r.setAttribute("data-long", e.COORDINATES[0]), r.setAttribute("data-lat", e.COORDINATES[1]), r.name = e.Name, r.addEventListener("click", () => {
			r.style.color === "red" ? r.style.color = "blue" : r.style.color = "red";
			let e = KF();
			GF(e), zF("peopleLocations", e);
		}), t.appendChild(r);
	});
}
function JF() {
	let e = document.getElementById("name"), t = document.getElementById("lat"), n = document.getElementById("lng");
	qF([{
		Name: e.value,
		COORDINATES: [Number(n.value), Number(t.value)],
		SPACES: 1
	}]), GF(KF());
}
function YF(e) {
	let t = document.getElementById("menu"), n = document.getElementById("menu-toggle");
	t.classList.toggle("is-minimised", e), n.setAttribute("aria-expanded", String(!e)), n.setAttribute("aria-label", e ? "Expand controls" : "Minimise controls"), n.title = e ? "Expand controls" : "Minimise controls", localStorage.setItem("friendMapControlsMinimised", String(e));
}
var XF = HF() ?? BF("peopleLocations");
zF("peopleLocations", XF), VF(XF), document.getElementById("menu-toggle").addEventListener("click", () => {
	YF(!document.getElementById("menu").classList.contains("is-minimised"));
}), document.getElementById("reload").addEventListener("click", () => {
	GF(KF());
}), document.getElementById("submit").addEventListener("click", JF), document.getElementById("restaurant-sidebar-close").addEventListener("click", kF), document.getElementById("find-restaurants").addEventListener("click", () => {
	NF({
		map: LF,
		locationsData: RF,
		fallbackLocationsData: KF(),
		mapCenter: IF
	});
}), document.addEventListener("readystatechange", (e) => {
	e.target.readyState === "complete" && (YF(localStorage.getItem("friendMapControlsMinimised") === "true"), qF(XF), GF(XF));
});
//#endregion
export { GF as loadMap };
