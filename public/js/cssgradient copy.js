function GradientCanvas(t, e, n) {
    this._colorStops = [],
        this._alphaStops = [],
        this.angle = n || 0 == n ? n : 90,
        t = t || [];
    for (var i = 0; t.length > i; i++)
        this.addColorStop(t[i].offset, t[i].color);
    e = e || [];
    for (var i = 0; e.length > i; i++)
        this.addAlphaStop(e[i].offset, e[i].alpha)
}
function pickHex(t, e, n) {
    var i = n
        , o = 2 * i - 1
        , r = (o / 1 + 1) / 2
        , s = 1 - r;
    return [Math.round(t[0] * r + e[0] * s), Math.round(t[1] * r + e[1] * s), Math.round(t[2] * r + e[2] * s)]
}
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t.one = t.one || {},
        t.one.color = e())
}(this, function () {
    "use strict";
    function t(e) {
        if (Array.isArray(e)) {
            if ("string" == typeof e[0] && "function" == typeof t[e[0]])
                return new t[e[0]](e.slice(1, e.length));
            if (4 === e.length)
                return new t.RGB(e[0] / 255, e[1] / 255, e[2] / 255, e[3] / 255)
        } else if ("string" == typeof e) {
            var i = e.toLowerCase();
            t.namedColors[i] && (e = "#" + t.namedColors[i]),
                "transparent" === i && (e = "rgba(0,0,0,0)");
            var s = e.match(r);
            if (s) {
                var a = s[1].toUpperCase()
                    , u = n(s[8]) ? s[8] : parseFloat(s[8])
                    , c = "H" === a[0]
                    , l = s[3] ? 100 : c ? 360 : 255
                    , p = s[5] || c ? 100 : 255
                    , d = s[7] || c ? 100 : 255;
                if (n(t[a]))
                    throw new Error("color." + a + " is not installed.");
                return new t[a](parseFloat(s[2]) / l, parseFloat(s[4]) / p, parseFloat(s[6]) / d, u)
            }
            e.length < 6 && (e = e.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, "$1$1$2$2$3$3"));
            var f = e.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);
            if (f)
                return new t.RGB(parseInt(f[1], 16) / 255, parseInt(f[2], 16) / 255, parseInt(f[3], 16) / 255);
            if (t.CMYK) {
                var h = e.match(new RegExp("^cmyk\\(" + o.source + "," + o.source + "," + o.source + "," + o.source + "\\)$", "i"));
                if (h)
                    return new t.CMYK(parseFloat(h[1]) / 100, parseFloat(h[2]) / 100, parseFloat(h[3]) / 100, parseFloat(h[4]) / 100)
            }
        } else if ("object" == typeof e && e.isColor)
            return e;
        return !1
    }
    var e = []
        , n = function (t) {
            return void 0 === t
        }
        , i = /\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/
        , o = /\s*(\.\d+|100|\d?\d(?:\.\d+)?)%\s*/
        , r = new RegExp("^(rgb|hsl|hsv)a?\\(" + i.source + "," + i.source + "," + i.source + "(?:," + /\s*(\.\d+|\d+(?:\.\d+)?)\s*/.source + ")?\\)$", "i");
    t.namedColors = {},
        t.installColorSpace = function (i, o, r) {
            function s(e, n) {
                var i = {};
                i[n.toLowerCase()] = function () {
                    return this.rgb()[n.toLowerCase()]()
                }
                    ,
                    t[n].propertyNames.forEach(function (t) {
                        var e = "black" === t ? "k" : t.charAt(0);
                        i[t] = i[e] = function (e, i) {
                            return this[n.toLowerCase()]()[t](e, i)
                        }
                    });
                for (var o in i)
                    i.hasOwnProperty(o) && void 0 === t[e].prototype[o] && (t[e].prototype[o] = i[o])
            }
            t[i] = function (t) {
                var e = Array.isArray(t) ? t : arguments;
                o.forEach(function (t, n) {
                    var r = e[n];
                    if ("alpha" === t)
                        this._alpha = isNaN(r) || r > 1 ? 1 : r < 0 ? 0 : r;
                    else {
                        if (isNaN(r))
                            throw new Error("[" + i + "]: Invalid color: (" + o.join(",") + ")");
                        "hue" === t ? this._hue = r < 0 ? r - Math.floor(r) : r % 1 : this["_" + t] = r < 0 ? 0 : r > 1 ? 1 : r
                    }
                }, this)
            }
                ,
                t[i].propertyNames = o;
            var a = t[i].prototype;
            ["valueOf", "hex", "hexa", "css", "cssa"].forEach(function (t) {
                a[t] = a[t] || ("RGB" === i ? a.hex : function () {
                    return this.rgb()[t]()
                }
                )
            }),
                a.isColor = !0,
                a.equals = function (t, e) {
                    n(e) && (e = 1e-10),
                        t = t[i.toLowerCase()]();
                    for (var r = 0; r < o.length; r += 1)
                        if (Math.abs(this["_" + o[r]] - t["_" + o[r]]) > e)
                            return !1;
                    return !0
                }
                ,
                a.toJSON = function () {
                    return [i].concat(o.map(function (t) {
                        return this["_" + t]
                    }, this))
                }
                ;
            for (var u in r)
                if (r.hasOwnProperty(u)) {
                    var c = u.match(/^from(.*)$/);
                    c ? t[c[1].toUpperCase()].prototype[i.toLowerCase()] = r[u] : a[u] = r[u]
                }
            return a[i.toLowerCase()] = function () {
                return this
            }
                ,
                a.toString = function () {
                    return "[" + i + " " + o.map(function (t) {
                        return this["_" + t]
                    }, this).join(", ") + "]"
                }
                ,
                o.forEach(function (t) {
                    var e = "black" === t ? "k" : t.charAt(0);
                    a[t] = a[e] = function (e, n) {
                        return void 0 === e ? this["_" + t] : n ? new this.constructor(o.map(function (n) {
                            return this["_" + n] + (t === n ? e : 0)
                        }, this)) : new this.constructor(o.map(function (n) {
                            return t === n ? e : this["_" + n]
                        }, this))
                    }
                }),
                e.forEach(function (t) {
                    s(i, t),
                        s(t, i)
                }),
                e.push(i),
                t
        }
        ,
        t.pluginList = [],
        t.use = function (e) {
            return -1 === t.pluginList.indexOf(e) && (this.pluginList.push(e),
                e(t)),
                t
        }
        ,
        t.installMethod = function (n, i) {
            return e.forEach(function (e) {
                t[e].prototype[n] = i
            }),
                this
        }
        ,
        t.installColorSpace("RGB", ["red", "green", "blue", "alpha"], {
            hex: function () {
                var t = (65536 * Math.round(255 * this._red) + 256 * Math.round(255 * this._green) + Math.round(255 * this._blue)).toString(16);
                return "#" + "00000".substr(0, 6 - t.length) + t
            },
            hexa: function () {
                var t = Math.round(255 * this._alpha).toString(16);
                return "#" + "00".substr(0, 2 - t.length) + t + this.hex().substr(1, 6)
            },
            css: function () {
                return "rgb(" + Math.round(255 * this._red) + "," + Math.round(255 * this._green) + "," + Math.round(255 * this._blue) + ")"
            },
            cssa: function () {
                return "rgba(" + Math.round(255 * this._red) + "," + Math.round(255 * this._green) + "," + Math.round(255 * this._blue) + "," + this._alpha + ")"
            }
        });
    var s = t
        , a = function (t) {
            t.installColorSpace("HSV", ["hue", "saturation", "value", "alpha"], {
                rgb: function () {
                    var e, n, i, o = this._hue, r = this._saturation, s = this._value, a = Math.min(5, Math.floor(6 * o)), u = 6 * o - a, c = s * (1 - r), l = s * (1 - u * r), p = s * (1 - (1 - u) * r);
                    switch (a) {
                        case 0:
                            e = s,
                                n = p,
                                i = c;
                            break;
                        case 1:
                            e = l,
                                n = s,
                                i = c;
                            break;
                        case 2:
                            e = c,
                                n = s,
                                i = p;
                            break;
                        case 3:
                            e = c,
                                n = l,
                                i = s;
                            break;
                        case 4:
                            e = p,
                                n = c,
                                i = s;
                            break;
                        case 5:
                            e = s,
                                n = c,
                                i = l
                    }
                    return new t.RGB(e, n, i, this._alpha)
                },
                hsl: function () {
                    var e, n = (2 - this._saturation) * this._value, i = this._saturation * this._value, o = n <= 1 ? n : 2 - n;
                    return e = o < 1e-9 ? 0 : i / o,
                        new t.HSL(this._hue, e, n / 2, this._alpha)
                },
                fromRgb: function () {
                    var e, n = this._red, i = this._green, o = this._blue, r = Math.max(n, i, o), s = Math.min(n, i, o), a = r - s, u = 0 === r ? 0 : a / r, c = r;
                    if (0 === a)
                        e = 0;
                    else
                        switch (r) {
                            case n:
                                e = (i - o) / a / 6 + (i < o ? 1 : 0);
                                break;
                            case i:
                                e = (o - n) / a / 6 + 1 / 3;
                                break;
                            case o:
                                e = (n - i) / a / 6 + 2 / 3
                        }
                    return new t.HSV(e, u, c, this._alpha)
                }
            })
        }
        , u = function (t) {
            t.use(a),
                t.installColorSpace("HSL", ["hue", "saturation", "lightness", "alpha"], {
                    hsv: function () {
                        var e, n = 2 * this._lightness, i = this._saturation * (n <= 1 ? n : 2 - n);
                        return e = n + i < 1e-9 ? 0 : 2 * i / (n + i),
                            new t.HSV(this._hue, e, (n + i) / 2, this._alpha)
                    },
                    rgb: function () {
                        return this.hsv().rgb()
                    },
                    fromRgb: function () {
                        return this.hsv().hsl()
                    }
                })
        };
    return s.use(a).use(u)
}),
    function (t, e) {
        "object" == typeof exports ? module.exports = e(require("onecolor")) : "function" == typeof define && define.amd ? define(["onecolor"], e) : t.colorjoe = e(t.one.color)
    }(this, function (t) {
        function e(t, e, n) {
            var i = document.createElement(t);
            return i.className = e,
                n.appendChild(i),
                i
        }
        function n(t) {
            var e = Array.prototype.slice
                , n = e.apply(arguments, [1]);
            return function () {
                return t.apply(null, n.concat(e.apply(arguments)))
            }
        }
        function i(t, e, n, i) {
            var s = "colorPickerInput" + Math.floor(1001 * Math.random())
                , a = z(t, n)
                , u = r("text", a, i, s);
            return {
                label: o(e, a, s),
                input: u
            }
        }
        function o(t, n, i) {
            var o = e("label", "", n);
            return o.innerHTML = t,
                i && o.setAttribute("for", i),
                o
        }
        function r(t, n, i, o) {
            var r = e("input", "", n);
            return r.type = t,
                i && (r.maxLength = i),
                o && r.setAttribute("id", o),
                i && (r.maxLength = i),
                r
        }
        function s(t, e) {
            t.style.left = c(100 * e, 0, 100) + "%"
        }
        function a(t, e) {
            t.style.top = c(100 * e, 0, 100) + "%"
        }
        function u(t, e) {
            t.style.background = e
        }
        function c(t, e, n) {
            return Math.min(Math.max(t, e), n)
        }
        function l(t) {
            var e = k.div("currentColorContainer", t)
                , n = k.div("currentColor", e);
            return {
                change: function (t) {
                    k.BG(n, t.cssa())
                }
            }
        }
        function p(t, e, n) {
            function i() {
                e.done()
            }
            function o(t) {
                t.ctrlKey || t.altKey || !/^[a-zA-Z]$/.test(t.key) || t.preventDefault()
            }
            function r() {
                var t = [s];
                f.forEach(function (e, n) {
                    a instanceof Array ? t.push(e.e.input.value / a[n]) : t.push(e.e.input.value / a)
                }),
                    p || t.push(e.getAlpha()),
                    e.set(t)
            }
            var s = n.space
                , a = n.limit || 255
                , u = n.fix >= 0 ? n.fix : 0
                , c = C(a) ? ("" + a).length + u : 4;
            c = u ? c + 1 : c;
            var l = s.split("")
                , p = "A" == s[s.length - 1];
            if (s = p ? s.slice(0, -1) : s,
                ["RGB", "RGBA", "HSL", "HSV", "CMYK"].indexOf(s) < 0)
                return console.warn("Invalid field names", s);
            var d = k.div("colorFields", t)
                , f = l.map(function (t) {
                    t = t.toLowerCase();
                    var e = k.labelInput("color " + t, t, d, c);
                    return e.input.onblur = i,
                        e.input.onkeydown = o,
                        e.input.onkeyup = r,
                    {
                        name: t,
                        e: e
                    }
                });
            return {
                change: function (t) {
                    f.forEach(function (e, n) {
                        a instanceof Array ? e.e.input.value = (t[e.name]() * a[n]).toFixed(u) : e.e.input.value = (t[e.name]() * a).toFixed(u)
                    })
                }
            }
        }
        function d(t, e) {
            function n() {
                e.done()
            }
            function i(t) {
                var n = k.clamp(t.x, 0, 1);
                k.X(t.pointer, n),
                    e.setAlpha(1 - n)
            }
            var o = O.slider({
                parent: t,
                "class": "oned alpha",
                cbs: {
                    begin: i,
                    change: i,
                    end: n
                }
            });
            return {
                change: function (t) {
                    k.X(o.pointer, 1 - t.alpha())
                }
            }
        }
        function f(t, e, n) {
            var i = k.labelInput("hex", n.label || "hex", t, 7);
            return i.input.value = "#",
                i.input.onkeyup = function (t) {
                    var n = t.keyCode || t.which
                        , i = t.target.value;
                    i = "#" == i[0] ? i : "#" + i,
                        i = g(i, 7, "0"),
                        13 == n && e.set(i)
                }
                ,
                i.input.onblur = function (t) {
                    e.set(t.target.value),
                        e.done()
                }
                ,
            {
                change: function (t) {
                    i.input.value = "#" == i.input.value[0] ? "#" : "",
                        i.input.value += t.hex().slice(1)
                }
            }
        }
        function h(t, e, n) {
            var i = k.e("a", n["class"] || "close", t);
            i.href = "#",
                i.innerHTML = n.label || "Close",
                i.onclick = function (t) {
                    t.preventDefault(),
                        e.hide()
                }
        }
        function g(t, e, n) {
            for (var i = t, o = t.length; o < e; o++)
                i += n;
            return i
        }
        function v(e, n) {
            k.BG(e, new t.HSV(n, 1, 1).cssa())
        }
        function m(t) {
            function e(t) {
                f = u.xy(f, {
                    x: k.clamp(t.x, 0, 1),
                    y: k.clamp(t.y, 0, 1)
                }, c, d),
                    i()
            }
            function n(t) {
                f = u.z(f, k.clamp(t.x, 0, 1), c, d),
                    i()
            }
            function i(t) {
                t = C(t) ? t : [];
                for (var e, n = s.change, i = 0, o = n.length; i < o; i++)
                    e = n[i],
                        -1 == t.indexOf(e.name) && e.fn(f)
            }
            function o() {
                if (!r.equals(f)) {
                    for (var t = 0, e = s.done.length; t < e; t++)
                        s.done[t].fn(f);
                    r = f
                }
            }
            if (!t.e)
                return console.warn("colorjoe: missing element");
            var r = y(t.color)
                , s = {
                    change: [],
                    done: []
                }
                , a = T(t.e) ? document.getElementById(t.e) : t.e;
            a.className = "colorPicker";
            var u = t.cbs
                , c = O.xyslider({
                    parent: a,
                    "class": "twod",
                    cbs: {
                        begin: e,
                        change: e,
                        end: o
                    }
                })
                , l = document.querySelector(".js-controls");
            k.div("controls-title", l).innerHTML = "Color Code";
            var p = {
                e: a,
                done: function () {
                    return o(),
                        this
                },
                update: function (t) {
                    return i(t),
                        this
                },
                hide: function () {
                    return a.style.display = "none",
                        this
                },
                show: function () {
                    return a.style.display = "",
                        this
                },
                get: function () {
                    return f
                },
                set: function (t) {
                    var e = this.get();
                    return f = u.init(y(t), c, d),
                        e.equals(f) || this.update(),
                        this
                },
                getAlpha: function () {
                    return f.alpha()
                },
                setAlpha: function (t) {
                    return f = f.alpha(t),
                        this.update(),
                        this
                },
                on: function (t, e, n) {
                    return "change" == t || "done" == t ? s[t].push({
                        name: n,
                        fn: e
                    }) : console.warn('Passed invalid evt name "' + t + '" to colorjoe.on'),
                        this
                },
                removeAllListeners: function (t) {
                    if (t)
                        delete s[t];
                    else
                        for (var e in s)
                            delete s[e];
                    return this
                }
            };
            b(l, p, t.extras);
            var d = O.slider({
                parent: l,
                "class": "oned",
                cbs: {
                    begin: n,
                    change: n,
                    end: o
                }
            });
            x(l, p, t.extras);
            var f = u.init(r, c, d);
            return i(),
                p
        }
        function y(e) {
            if (!_(e))
                return t("#000");
            if (e.isColor)
                return e;
            var n = t(e);
            return n || (_(e) && console.warn("Passed invalid color to colorjoe, using black instead"),
                t("#000"))
        }
        function x(t, n) {
            var i, o = e, r = {};
            i = (0,
                P._extras.alpha)(t, w(n, o + 0), r);
            for (var s in i)
                n.on(s, i[s], o)
        }
        function b(t, e, n) {
            if (n) {
                var i, o, r, s = k.div("extras", t);
                n.forEach(function (t, n) {
                    if ("alpha" !== t) {
                        C(t) ? (o = t[0],
                            r = t.length > 1 ? t[1] : {}) : (o = t,
                                r = {});
                        var a = o in P._extras ? P._extras[o] : null;
                        if (a) {
                            i = a(s, w(e, o + n), r);
                            for (var u in i)
                                e.on(u, i[u], o)
                        }
                    }
                })
            }
        }
        function w(t, e) {
            var n = S(t);
            return n.update = function () {
                t.update([e])
            }
                ,
                n
        }
        function S(t) {
            var e = {};
            for (var n in t)
                e[n] = t[n];
            return e
        }
        function E(t, e) {
            return e.map(t).filter(M).length == e.length
        }
        function C(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
        function T(t) {
            return "string" == typeof t
        }
        function _(t) {
            return void 0 !== t
        }
        function I(t) {
            return "function" == typeof t
        }
        function M(t) {
            return t
        }
        /*! colorjoe - v2.0.0 - Juho Vepsalainen <bebraw@gmail.com> - MIT
    https://bebraw.github.com/colorjoe - 2016-08-12 */
        /*! dragjs - v0.7.0 - Juho Vepsalainen <bebraw@gmail.com> - MIT
    https://bebraw.github.com/dragjs - 2016-08-12 */
        var O = function () {
            function t(t, e) {
                if (!t)
                    return void console.warn("drag is missing elem!");
                s(t, e, "touchstart", "touchmove", "touchend"),
                    s(t, e, "mousedown", "mousemove", "mouseup")
            }
            function e(e) {
                var n = o(e["class"] || "", e.parent)
                    , r = o("pointer", n);
                return o("shape shape1", r),
                    o("shape shape2", r),
                    o("bg bg1", n),
                    o("bg bg2", n),
                    t(n, i(e.cbs, r)),
                {
                    background: n,
                    pointer: r
                }
            }
            function n(e) {
                var n = o(e["class"], e.parent)
                    , r = o("pointer", n);
                o("shape", r);
                var s = o("bg", n);
                return e && "oned alpha" === e["class"] && o("bg-color js-alpha-color", s),
                    t(n, i(e.cbs, r)),
                {
                    background: n,
                    pointer: r
                }
            }
            function i(t, e) {
                function n(t) {
                    return function (n) {
                        n.pointer = e,
                            t(n)
                    }
                }
                var i = {};
                for (var o in t)
                    i[o] = n(t[o]);
                return i
            }
            function o(t, e) {
                return r("div", t, e)
            }
            function r(t, e, n) {
                var i = document.createElement(t);
                return e && (i.className = e),
                    n.appendChild(i),
                    i
            }
            function s(t, e, n, i, o) {
                var r = !1;
                e = c(e);
                var s = e.begin
                    , l = e.change
                    , p = e.end;
                a(t, n, function (e) {
                    function n() {
                        r = !1,
                            u(document, i, c),
                            u(document, o, n),
                            d(p, t, e)
                    }
                    r = !0;
                    var c = f(d, l, t);
                    a(document, i, c),
                        a(document, o, n),
                        d(s, t, e)
                })
            }
            function a(t, e, n) {
                t.addEventListener(e, n, !1)
            }
            function u(t, e, n) {
                t.removeEventListener(e, n, !1)
            }
            function c(t) {
                if (t)
                    return {
                        begin: t.begin || p,
                        change: t.change || p,
                        end: t.end || p
                    };
                var e, n;
                return {
                    begin: function (t) {
                        e = {
                            x: t.elem.offsetLeft,
                            y: t.elem.offsetTop
                        },
                            n = t.cursor
                    },
                    change: function (t) {
                        l(t.elem, "left", e.x + t.cursor.x - n.x + "px"),
                            l(t.elem, "top", e.y + t.cursor.y - n.y + "px")
                    },
                    end: p
                }
            }
            function l(t, e, n) {
                t.style[e] = n
            }
            function p() { }
            function d(t, e, n) {
                n.preventDefault();
                var i = h(e)
                    , o = e.clientWidth
                    , r = e.clientHeight
                    , s = {
                        x: g(e, n),
                        y: v(e, n)
                    }
                    , a = (s.x - i.x) / o
                    , u = (s.y - i.y) / r;
                t({
                    x: isNaN(a) ? 0 : a,
                    y: isNaN(u) ? 0 : u,
                    cursor: s,
                    elem: e,
                    e: n
                })
            }
            function f(t) {
                var e = Array.prototype.slice
                    , n = e.apply(arguments, [1]);
                return function () {
                    return t.apply(null, n.concat(e.apply(arguments)))
                }
            }
            function h(t) {
                var e = t.getBoundingClientRect();
                return {
                    x: e.left,
                    y: e.top
                }
            }
            function g(t, e) {
                return (e.touches ? e.touches[e.touches.length - 1] : e).clientX
            }
            function v(t, e) {
                return (e.touches ? e.touches[e.touches.length - 1] : e).clientY
            }
            return t.xyslider = e,
                t.slider = n,
                t
        }()
            , z = n(e, "div")
            , k = {
                clamp: c,
                e: e,
                div: z,
                partial: n,
                labelInput: i,
                X: s,
                Y: a,
                BG: u
            }
            , A = {
                currentColor: l,
                fields: p,
                hex: f,
                alpha: d,
                close: h
            }
            , P = function (t) {
                return E(I, [t.init, t.xy, t.z]) ? function (e, n, i) {
                    return m({
                        e: e,
                        color: n,
                        cbs: t,
                        extras: i
                    })
                }
                    : console.warn("colorjoe: missing cb")
            };
        P.rgb = P({
            init: function (e, n, i) {
                var o = t(e).hsv();
                return this.xy(o, {
                    x: o.saturation(),
                    y: 1 - o.value()
                }, n, i),
                    this.z(o, o.hue(), n, i),
                    o
            },
            xy: function (t, e, n) {
                return k.X(n.pointer, e.x),
                    k.Y(n.pointer, e.y),
                    t.saturation(e.x).value(1 - e.y)
            },
            z: function (t, e, n, i) {
                return k.X(i.pointer, e),
                    v(n.background, e),
                    t.hue(e)
            }
        }),
            P.hsl = P({
                init: function (e, n, i) {
                    var o = t(e).hsl();
                    return this.xy(o, {
                        x: o.hue(),
                        y: 1 - o.saturation()
                    }, n, i),
                        this.z(o, 1 - o.lightness(), n, i),
                        o
                },
                xy: function (t, e, n, i) {
                    return k.X(n.pointer, e.x),
                        k.Y(n.pointer, e.y),
                        v(i.background, e.x),
                        t.hue(e.x).saturation(1 - e.y)
                },
                z: function (t, e, n, i) {
                    return k.Y(i.pointer, e),
                        t.lightness(1 - e)
                }
            }),
            P._extras = {},
            P.registerExtra = function (t, e) {
                t in P._extras && console.warn('Extra "' + t + '"has been registered already!'),
                    P._extras[t] = e
            }
            ;
        for (var D in A)
            P.registerExtra(D, A[D]);
        return P
    }),
    /**
     * interact.js v1.3.0
     *
     * Copyright (c) 2012-2017 Taye Adeyemi <dev@taye.me>
     * Released under the MIT License.
     * https://raw.github.com/taye/interact.js/master/LICENSE
     */
    function (t) {
        if ("object" == typeof exports && "undefined" != typeof module)
            module.exports = t();
        else if ("function" == typeof define && define.amd)
            define([], t);
        else {
            var e;
            e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
                e.interact = t()
        }
    }(function () {
        return function t(e, n, i) {
            function o(s, a) {
                if (!n[s]) {
                    if (!e[s]) {
                        var u = "function" == typeof require && require;
                        if (!a && u)
                            return u(s, !0);
                        if (r)
                            return r(s, !0);
                        var c = new Error("Cannot find module '" + s + "'");
                        throw c.code = "MODULE_NOT_FOUND",
                        c
                    }
                    var l = n[s] = {
                        exports: {}
                    };
                    e[s][0].call(l.exports, function (t) {
                        var n = e[s][1][t];
                        return o(n || t)
                    }, l, l.exports, t, e, n, i)
                }
                return n[s].exports
            }
            for (var r = "function" == typeof require && require, s = 0; s < i.length; s++)
                o(i[s]);
            return o
        }({
            1: [function (t, e) {
                "use strict";
                "undefined" == typeof window ? e.exports = function (e) {
                    return t("./src/utils/window").init(e),
                        t("./src/index")
                }
                    : e.exports = t("./src/index")
            }
                , {
                "./src/index": 19,
                "./src/utils/window": 51
            }],
            2: [function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                function i(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i;
                        i = e[n];
                        var o = i;
                        if (t.immediatePropagationStopped)
                            break;
                        o(t)
                    }
                }
                var o = t("./utils/extend.js")
                    , r = function () {
                        function t(e) {
                            n(this, t),
                                this.options = o({}, e || {})
                        }
                        return t.prototype.fire = function (t) {
                            var e = void 0
                                , n = "on" + t.type
                                , o = this.global;
                            (e = this[t.type]) && i(t, e),
                                this[n] && this[n](t),
                                !t.propagationStopped && o && (e = o[t.type]) && i(t, e)
                        }
                            ,
                            t.prototype.on = function (t, e) {
                                this[t] ? this[t].push(e) : this[t] = [e]
                            }
                            ,
                            t.prototype.off = function (t, e) {
                                var n = this[t]
                                    , i = n ? n.indexOf(e) : -1;
                                -1 !== i && n.splice(i, 1),
                                    (n && 0 === n.length || !e) && (this[t] = undefined)
                            }
                            ,
                            t
                    }();
                e.exports = r
            }
                , {
                "./utils/extend.js": 40
            }],
            3: [function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = t("./utils/extend")
                    , o = t("./utils/getOriginXY")
                    , r = t("./defaultOptions")
                    , s = t("./utils/Signals")["new"]()
                    , a = function () {
                        function t(e, a, u, c, l, p) {
                            var d = arguments.length > 6 && arguments[6] !== undefined && arguments[6];
                            n(this, t);
                            var f = e.target
                                , h = (f && f.options || r).deltaSource
                                , g = o(f, l, u)
                                , v = "start" === c
                                , m = "end" === c
                                , y = v ? e.startCoords : e.curCoords
                                , x = e.prevEvent;
                            l = l || e.element;
                            var b = i({}, y.page)
                                , w = i({}, y.client);
                            b.x -= g.x,
                                b.y -= g.y,
                                w.x -= g.x,
                                w.y -= g.y,
                                this.ctrlKey = a.ctrlKey,
                                this.altKey = a.altKey,
                                this.shiftKey = a.shiftKey,
                                this.metaKey = a.metaKey,
                                this.button = a.button,
                                this.buttons = a.buttons,
                                this.target = l,
                                this.currentTarget = l,
                                this.relatedTarget = p || null,
                                this.preEnd = d,
                                this.type = u + (c || ""),
                                this.interaction = e,
                                this.interactable = f,
                                this.t0 = v ? e.downTimes[e.downTimes.length - 1] : x.t0;
                            var S = {
                                interaction: e,
                                event: a,
                                action: u,
                                phase: c,
                                element: l,
                                related: p,
                                page: b,
                                client: w,
                                coords: y,
                                starting: v,
                                ending: m,
                                deltaSource: h,
                                iEvent: this
                            };
                            s.fire("set-xy", S),
                                m ? (this.pageX = x.pageX,
                                    this.pageY = x.pageY,
                                    this.clientX = x.clientX,
                                    this.clientY = x.clientY) : (this.pageX = b.x,
                                        this.pageY = b.y,
                                        this.clientX = w.x,
                                        this.clientY = w.y),
                                this.x0 = e.startCoords.page.x - g.x,
                                this.y0 = e.startCoords.page.y - g.y,
                                this.clientX0 = e.startCoords.client.x - g.x,
                                this.clientY0 = e.startCoords.client.y - g.y,
                                s.fire("set-delta", S),
                                this.timeStamp = y.timeStamp,
                                this.dt = e.pointerDelta.timeStamp,
                                this.duration = this.timeStamp - this.t0,
                                this.speed = e.pointerDelta[h].speed,
                                this.velocityX = e.pointerDelta[h].vx,
                                this.velocityY = e.pointerDelta[h].vy,
                                this.swipe = m || "inertiastart" === c ? this.getSwipe() : null,
                                s.fire("new", S)
                        }
                        return t.prototype.getSwipe = function () {
                            var t = this.interaction;
                            if (t.prevEvent.speed < 600 || this.timeStamp - t.prevEvent.timeStamp > 150)
                                return null;
                            var e = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI
                                , n = 22.5;
                            e < 0 && (e += 360);
                            var i = 135 - n <= e && e < 225 + n
                                , o = 225 - n <= e && e < 315 + n
                                , r = !i && (315 - n <= e || e < 45 + n);
                            return {
                                up: o,
                                down: !o && 45 - n <= e && e < 135 + n,
                                left: i,
                                right: r,
                                angle: e,
                                speed: t.prevEvent.speed,
                                velocity: {
                                    x: t.prevEvent.velocityX,
                                    y: t.prevEvent.velocityY
                                }
                            }
                        }
                            ,
                            t.prototype.preventDefault = function () { }
                            ,
                            t.prototype.stopImmediatePropagation = function () {
                                this.immediatePropagationStopped = this.propagationStopped = !0
                            }
                            ,
                            t.prototype.stopPropagation = function () {
                                this.propagationStopped = !0
                            }
                            ,
                            t
                    }();
                s.on("set-delta", function (t) {
                    var e = t.iEvent
                        , n = t.interaction
                        , i = t.starting
                        , o = t.deltaSource
                        , r = i ? e : n.prevEvent;
                    "client" === o ? (e.dx = e.clientX - r.clientX,
                        e.dy = e.clientY - r.clientY) : (e.dx = e.pageX - r.pageX,
                            e.dy = e.pageY - r.pageY)
                }),
                    a.signals = s,
                    e.exports = a
            }
                , {
                "./defaultOptions": 18,
                "./utils/Signals": 34,
                "./utils/extend": 40,
                "./utils/getOriginXY": 41
            }],
            4: [function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = t("./utils/is")
                    , o = t("./utils/events")
                    , r = t("./utils/extend")
                    , s = t("./actions/base")
                    , a = t("./scope")
                    , u = t("./Eventable")
                    , c = t("./defaultOptions")
                    , l = t("./utils/Signals")["new"]()
                    , p = t("./utils/domUtils")
                    , d = p.getElementRect
                    , f = p.nodeContains
                    , h = p.trySelector
                    , g = p.matchesSelector
                    , v = t("./utils/window")
                    , m = v.getWindow
                    , y = t("./utils/arr")
                    , x = y.contains
                    , b = t("./utils/browser")
                    , w = b.wheelEvent;
                a.interactables = [];
                var S = function () {
                    function t(e, i) {
                        n(this, t),
                            i = i || {},
                            this.target = e,
                            this.events = new u,
                            this._context = i.context || a.document,
                            this._win = m(h(e) ? this._context : e),
                            this._doc = this._win.document,
                            l.fire("new", {
                                target: e,
                                options: i,
                                interactable: this,
                                win: this._win
                            }),
                            a.addDocument(this._doc, this._win),
                            a.interactables.push(this),
                            this.set(i)
                    }
                    return t.prototype.setOnEvents = function (t, e) {
                        var n = "on" + t;
                        return i["function"](e.onstart) && (this.events[n + "start"] = e.onstart),
                            i["function"](e.onmove) && (this.events[n + "move"] = e.onmove),
                            i["function"](e.onend) && (this.events[n + "end"] = e.onend),
                            i["function"](e.oninertiastart) && (this.events[n + "inertiastart"] = e.oninertiastart),
                            this
                    }
                        ,
                        t.prototype.setPerAction = function (t, e) {
                            for (var n in e)
                                n in c[t] && (i.object(e[n]) ? (this.options[t][n] = r(this.options[t][n] || {}, e[n]),
                                    i.object(c.perAction[n]) && "enabled" in c.perAction[n] && (this.options[t][n].enabled = !1 !== e[n].enabled)) : i.bool(e[n]) && i.object(c.perAction[n]) ? this.options[t][n].enabled = e[n] : e[n] !== undefined && (this.options[t][n] = e[n]))
                        }
                        ,
                        t.prototype.getRect = function (t) {
                            return t = t || this.target,
                                i.string(this.target) && !i.element(t) && (t = this._context.querySelector(this.target)),
                                d(t)
                        }
                        ,
                        t.prototype.rectChecker = function (t) {
                            return i["function"](t) ? (this.getRect = t,
                                this) : null === t ? (delete this.options.getRect,
                                    this) : this.getRect
                        }
                        ,
                        t.prototype._backCompatOption = function (t, e) {
                            if (h(e) || i.object(e)) {
                                this.options[t] = e;
                                for (var n = 0; n < s.names.length; n++) {
                                    var o;
                                    o = s.names[n];
                                    var r = o;
                                    this.options[r][t] = e
                                }
                                return this
                            }
                            return this.options[t]
                        }
                        ,
                        t.prototype.origin = function (t) {
                            return this._backCompatOption("origin", t)
                        }
                        ,
                        t.prototype.deltaSource = function (t) {
                            return "page" === t || "client" === t ? (this.options.deltaSource = t,
                                this) : this.options.deltaSource
                        }
                        ,
                        t.prototype.context = function () {
                            return this._context
                        }
                        ,
                        t.prototype.inContext = function (t) {
                            return this._context === t.ownerDocument || f(this._context, t)
                        }
                        ,
                        t.prototype.fire = function (t) {
                            return this.events.fire(t),
                                this
                        }
                        ,
                        t.prototype._onOffMultiple = function (t, e, n, o) {
                            if (i.string(e) && -1 !== e.search(" ") && (e = e.trim().split(/ +/)),
                                i.array(e)) {
                                for (var r = 0; r < e.length; r++) {
                                    var s;
                                    s = e[r];
                                    var a = s;
                                    this[t](a, n, o)
                                }
                                return !0
                            }
                            if (i.object(e)) {
                                for (var u in e)
                                    this[t](u, e[u], n);
                                return !0
                            }
                        }
                        ,
                        t.prototype.on = function (e, n, r) {
                            return this._onOffMultiple("on", e, n, r) ? this : ("wheel" === e && (e = w),
                                x(t.eventTypes, e) ? this.events.on(e, n) : i.string(this.target) ? o.addDelegate(this.target, this._context, e, n, r) : o.add(this.target, e, n, r),
                                this)
                        }
                        ,
                        t.prototype.off = function (e, n, r) {
                            return this._onOffMultiple("off", e, n, r) ? this : ("wheel" === e && (e = w),
                                x(t.eventTypes, e) ? this.events.off(e, n) : i.string(this.target) ? o.removeDelegate(this.target, this._context, e, n, r) : o.remove(this.target, e, n, r),
                                this)
                        }
                        ,
                        t.prototype.set = function (e) {
                            i.object(e) || (e = {}),
                                this.options = r({}, c.base);
                            var n = r({}, c.perAction);
                            for (var o in s.methodDict) {
                                var a = s.methodDict[o];
                                this.options[o] = r({}, c[o]),
                                    this.setPerAction(o, n),
                                    this[a](e[o])
                            }
                            for (var u = 0; u < t.settingsMethods.length; u++) {
                                var p;
                                p = t.settingsMethods[u];
                                var d = p;
                                this.options[d] = c.base[d],
                                    d in e && this[d](e[d])
                            }
                            return l.fire("set", {
                                options: e,
                                interactable: this
                            }),
                                this
                        }
                        ,
                        t.prototype.unset = function () {
                            if (o.remove(this.target, "all"),
                                i.string(this.target))
                                for (var t in o.delegatedEvents) {
                                    var e = o.delegatedEvents[t];
                                    e.selectors[0] === this.target && e.contexts[0] === this._context && (e.selectors.splice(0, 1),
                                        e.contexts.splice(0, 1),
                                        e.listeners.splice(0, 1),
                                        e.selectors.length || (e[t] = null)),
                                        o.remove(this._context, t, o.delegateListener),
                                        o.remove(this._context, t, o.delegateUseCapture, !0)
                                }
                            else
                                o.remove(this, "all");
                            l.fire("unset", {
                                interactable: this
                            }),
                                a.interactables.splice(a.interactables.indexOf(this), 1);
                            for (var n = 0; n < (a.interactions || []).length; n++) {
                                var r;
                                r = (a.interactions || [])[n];
                                var s = r;
                                s.target === this && s.interacting() && s.stop()
                            }
                            return a.interact
                        }
                        ,
                        t
                }();
                a.interactables.indexOfElement = function (t, e) {
                    e = e || a.document;
                    for (var n = 0; n < this.length; n++) {
                        var i = this[n];
                        if (i.target === t && i._context === e)
                            return n
                    }
                    return -1
                }
                    ,
                    a.interactables.get = function (t, e, n) {
                        var o = this[this.indexOfElement(t, e && e.context)];
                        return o && (i.string(t) || n || o.inContext(t)) ? o : null
                    }
                    ,
                    a.interactables.forEachMatch = function (t, e) {
                        for (var n = 0; n < this.length; n++) {
                            var o;
                            o = this[n];
                            var r = o
                                , s = void 0;
                            if ((i.string(r.target) ? i.element(t) && g(t, r.target) : t === r.target) && r.inContext(t) && (s = e(r)),
                                s !== undefined)
                                return s
                        }
                    }
                    ,
                    S.eventTypes = a.eventTypes = [],
                    S.signals = l,
                    S.settingsMethods = ["deltaSource", "origin", "preventDefault", "rectChecker"],
                    e.exports = S
            }
                , {
                "./Eventable": 2,
                "./actions/base": 6,
                "./defaultOptions": 18,
                "./scope": 33,
                "./utils/Signals": 34,
                "./utils/arr": 35,
                "./utils/browser": 36,
                "./utils/domUtils": 38,
                "./utils/events": 39,
                "./utils/extend": 40,
                "./utils/is": 45,
                "./utils/window": 51
            }],
            5: [function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                function i(t) {
                    return function (e) {
                        var n = a.getPointerType(e)
                            , i = a.getEventTargets(e)
                            , o = i[0]
                            , r = i[1]
                            , u = [];
                        if (c.supportsTouch && /touch/.test(e.type)) {
                            g = (new Date).getTime();
                            for (var l = 0; l < e.changedTouches.length; l++) {
                                var d;
                                d = e.changedTouches[l];
                                var f = d
                                    , h = f
                                    , m = p.search(h, e.type, o);
                                u.push([h, m || new v({
                                    pointerType: n
                                })])
                            }
                        } else {
                            var y = !1;
                            if (!c.supportsPointerEvent && /mouse/.test(e.type)) {
                                for (var x = 0; x < s.interactions.length && !y; x++)
                                    y = "mouse" !== s.interactions[x].pointerType && s.interactions[x].pointerIsDown;
                                y = y || (new Date).getTime() - g < 500 || 0 === e.timeStamp
                            }
                            if (!y) {
                                var b = p.search(e, e.type, o);
                                b || (b = new v({
                                    pointerType: n
                                })),
                                    u.push([e, b])
                            }
                        }
                        for (var w = 0; w < u.length; w++) {
                            var S = u[w]
                                , E = S[0]
                                , C = S[1];
                            C._updateEventTargets(o, r),
                                C[t](E, e, o, r)
                        }
                    }
                }
                function o(t) {
                    for (var e = 0; e < s.interactions.length; e++) {
                        var n;
                        n = s.interactions[e];
                        var i = n;
                        i.end(t),
                            d.fire("endall", {
                                event: t,
                                interaction: i
                            })
                    }
                }
                function r(t, e) {
                    var n = t.doc
                        , i = 0 === e.indexOf("add") ? u.add : u.remove;
                    for (var o in s.delegatedEvents)
                        i(n, o, u.delegateListener),
                            i(n, o, u.delegateUseCapture, !0);
                    for (var r in x)
                        i(n, r, x[r])
                }
                var s = t("./scope")
                    , a = t("./utils")
                    , u = t("./utils/events")
                    , c = t("./utils/browser")
                    , l = t("./utils/domObjects")
                    , p = t("./utils/interactionFinder")
                    , d = t("./utils/Signals")["new"]()
                    , f = {}
                    , h = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer"]
                    , g = 0;
                s.interactions = [];
                for (var v = function () {
                    function t(e) {
                        var i = e.pointerType;
                        n(this, t),
                            this.target = null,
                            this.element = null,
                            this.prepared = {
                                name: null,
                                axis: null,
                                edges: null
                            },
                            this.pointers = [],
                            this.pointerIds = [],
                            this.downTargets = [],
                            this.downTimes = [],
                            this.prevCoords = {
                                page: {
                                    x: 0,
                                    y: 0
                                },
                                client: {
                                    x: 0,
                                    y: 0
                                },
                                timeStamp: 0
                            },
                            this.curCoords = {
                                page: {
                                    x: 0,
                                    y: 0
                                },
                                client: {
                                    x: 0,
                                    y: 0
                                },
                                timeStamp: 0
                            },
                            this.startCoords = {
                                page: {
                                    x: 0,
                                    y: 0
                                },
                                client: {
                                    x: 0,
                                    y: 0
                                },
                                timeStamp: 0
                            },
                            this.pointerDelta = {
                                page: {
                                    x: 0,
                                    y: 0,
                                    vx: 0,
                                    vy: 0,
                                    speed: 0
                                },
                                client: {
                                    x: 0,
                                    y: 0,
                                    vx: 0,
                                    vy: 0,
                                    speed: 0
                                },
                                timeStamp: 0
                            },
                            this.downEvent = null,
                            this.downPointer = {},
                            this._eventTarget = null,
                            this._curEventTarget = null,
                            this.prevEvent = null,
                            this.pointerIsDown = !1,
                            this.pointerWasMoved = !1,
                            this._interacting = !1,
                            this.pointerType = i,
                            d.fire("new", this),
                            s.interactions.push(this)
                    }
                    return t.prototype.pointerDown = function (t, e, n) {
                        var i = this.updatePointer(t, e, !0);
                        d.fire("down", {
                            pointer: t,
                            event: e,
                            eventTarget: n,
                            pointerIndex: i,
                            interaction: this
                        })
                    }
                        ,
                        t.prototype.start = function (t, e, n) {
                            this.interacting() || !this.pointerIsDown || this.pointerIds.length < ("gesture" === t.name ? 2 : 1) || (-1 === s.interactions.indexOf(this) && s.interactions.push(this),
                                a.copyAction(this.prepared, t),
                                this.target = e,
                                this.element = n,
                                d.fire("action-start", {
                                    interaction: this,
                                    event: this.downEvent
                                }))
                        }
                        ,
                        t.prototype.pointerMove = function (e, n, i) {
                            this.simulation || (this.updatePointer(e),
                                a.setCoords(this.curCoords, this.pointers));
                            var o = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y
                                , r = void 0
                                , s = void 0;
                            this.pointerIsDown && !this.pointerWasMoved && (r = this.curCoords.client.x - this.startCoords.client.x,
                                s = this.curCoords.client.y - this.startCoords.client.y,
                                this.pointerWasMoved = a.hypot(r, s) > t.pointerMoveTolerance);
                            var u = {
                                pointer: e,
                                pointerIndex: this.getPointerIndex(e),
                                event: n,
                                eventTarget: i,
                                dx: r,
                                dy: s,
                                duplicate: o,
                                interaction: this,
                                interactingBeforeMove: this.interacting()
                            };
                            o || a.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords),
                                d.fire("move", u),
                                o || (this.interacting() && this.doMove(u),
                                    this.pointerWasMoved && a.copyCoords(this.prevCoords, this.curCoords))
                        }
                        ,
                        t.prototype.doMove = function (t) {
                            t = a.extend({
                                pointer: this.pointers[0],
                                event: this.prevEvent,
                                eventTarget: this._eventTarget,
                                interaction: this
                            }, t || {}),
                                d.fire("before-action-move", t),
                                this._dontFireMove || d.fire("action-move", t),
                                this._dontFireMove = !1
                        }
                        ,
                        t.prototype.pointerUp = function (t, e, n, i) {
                            var o = this.getPointerIndex(t);
                            d.fire(/cancel$/i.test(e.type) ? "cancel" : "up", {
                                pointer: t,
                                pointerIndex: o,
                                event: e,
                                eventTarget: n,
                                curEventTarget: i,
                                interaction: this
                            }),
                                this.simulation || this.end(e),
                                this.pointerIsDown = !1,
                                this.removePointer(t, e)
                        }
                        ,
                        t.prototype.end = function (t) {
                            t = t || this.prevEvent,
                                this.interacting() && d.fire("action-end", {
                                    event: t,
                                    interaction: this
                                }),
                                this.stop()
                        }
                        ,
                        t.prototype.currentAction = function () {
                            return this._interacting ? this.prepared.name : null
                        }
                        ,
                        t.prototype.interacting = function () {
                            return this._interacting
                        }
                        ,
                        t.prototype.stop = function () {
                            d.fire("stop", {
                                interaction: this
                            }),
                                this._interacting && (d.fire("stop-active", {
                                    interaction: this
                                }),
                                    d.fire("stop-" + this.prepared.name, {
                                        interaction: this
                                    })),
                                this.target = this.element = null,
                                this._interacting = !1,
                                this.prepared.name = this.prevEvent = null
                        }
                        ,
                        t.prototype.getPointerIndex = function (t) {
                            return "mouse" === this.pointerType || "pen" === this.pointerType ? 0 : this.pointerIds.indexOf(a.getPointerId(t))
                        }
                        ,
                        t.prototype.updatePointer = function (t, e) {
                            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : e && /(down|start)$/i.test(e.type)
                                , i = a.getPointerId(t)
                                , o = this.getPointerIndex(t);
                            return -1 === o && (o = this.pointerIds.length,
                                this.pointerIds[o] = i),
                                n && d.fire("update-pointer-down", {
                                    pointer: t,
                                    event: e,
                                    down: n,
                                    pointerId: i,
                                    pointerIndex: o,
                                    interaction: this
                                }),
                                this.pointers[o] = t,
                                o
                        }
                        ,
                        t.prototype.removePointer = function (t, e) {
                            var n = this.getPointerIndex(t);
                            -1 !== n && (d.fire("remove-pointer", {
                                pointer: t,
                                event: e,
                                pointerIndex: n,
                                interaction: this
                            }),
                                this.pointers.splice(n, 1),
                                this.pointerIds.splice(n, 1),
                                this.downTargets.splice(n, 1),
                                this.downTimes.splice(n, 1))
                        }
                        ,
                        t.prototype._updateEventTargets = function (t, e) {
                            this._eventTarget = t,
                                this._curEventTarget = e
                        }
                        ,
                        t
                }(), m = 0; m < h.length; m++) {
                    var y = h[m];
                    f[y] = i(y)
                }
                var x = {}
                    , b = c.pEventTypes;
                l.PointerEvent ? (x[b.down] = f.pointerDown,
                    x[b.move] = f.pointerMove,
                    x[b.up] = f.pointerUp,
                    x[b.cancel] = f.pointerUp) : (x.mousedown = f.pointerDown,
                        x.mousemove = f.pointerMove,
                        x.mouseup = f.pointerUp,
                        x.touchstart = f.pointerDown,
                        x.touchmove = f.pointerMove,
                        x.touchend = f.pointerUp,
                        x.touchcancel = f.pointerUp),
                    x.blur = o,
                    d.on("update-pointer-down", function (t) {
                        var e = t.interaction
                            , n = t.pointer
                            , i = t.pointerId
                            , o = t.pointerIndex
                            , r = t.event
                            , s = t.eventTarget
                            , u = t.down;
                        e.pointerIds[o] = i,
                            e.pointers[o] = n,
                            u && (e.pointerIsDown = !0),
                            e.interacting() || (a.setCoords(e.startCoords, e.pointers),
                                a.copyCoords(e.curCoords, e.startCoords),
                                a.copyCoords(e.prevCoords, e.startCoords),
                                e.downEvent = r,
                                e.downTimes[o] = e.curCoords.timeStamp,
                                e.downTargets[o] = s || r && a.getEventTargets(r)[0],
                                e.pointerWasMoved = !1,
                                a.pointerExtend(e.downPointer, n))
                    }),
                    s.signals.on("add-document", r),
                    s.signals.on("remove-document", r),
                    v.pointerMoveTolerance = 1,
                    v.doOnInteractions = i,
                    v.endAll = o,
                    v.signals = d,
                    v.docEvents = x,
                    s.endAllInteractions = o,
                    e.exports = v
            }
                , {
                "./scope": 33,
                "./utils": 43,
                "./utils/Signals": 34,
                "./utils/browser": 36,
                "./utils/domObjects": 37,
                "./utils/events": 39,
                "./utils/interactionFinder": 44
            }],
            6: [function (t, e) {
                "use strict";
                function n(t, e, n, i) {
                    var r = t.prepared.name
                        , s = new o(t, e, r, n, t.element, null, i);
                    t.target.fire(s),
                        t.prevEvent = s
                }
                var i = t("../Interaction")
                    , o = t("../InteractEvent")
                    , r = {
                        firePrepared: n,
                        names: [],
                        methodDict: {}
                    };
                i.signals.on("action-start", function (t) {
                    var e = t.interaction
                        , i = t.event;
                    e._interacting = !0,
                        n(e, i, "start")
                }),
                    i.signals.on("action-move", function (t) {
                        var e = t.interaction;
                        if (n(e, t.event, "move", t.preEnd),
                            !e.interacting())
                            return !1
                    }),
                    i.signals.on("action-end", function (t) {
                        n(t.interaction, t.event, "end")
                    }),
                    e.exports = r
            }
                , {
                "../InteractEvent": 3,
                "../Interaction": 5
            }],
            7: [function (t, e) {
                "use strict";
                var n = t("./base")
                    , i = t("../utils")
                    , o = t("../InteractEvent")
                    , r = t("../Interactable")
                    , s = t("../Interaction")
                    , a = t("../defaultOptions")
                    , u = {
                        defaults: {
                            enabled: !1,
                            mouseButtons: null,
                            origin: null,
                            snap: null,
                            restrict: null,
                            inertia: null,
                            autoScroll: null,
                            startAxis: "xy",
                            lockAxis: "xy"
                        },
                        checker: function (t, e, n) {
                            var i = n.options.drag;
                            return i.enabled ? {
                                name: "drag",
                                axis: "start" === i.lockAxis ? i.startAxis : i.lockAxis
                            } : null
                        },
                        getCursor: function () {
                            return "move"
                        }
                    };
                s.signals.on("before-action-move", function (t) {
                    var e = t.interaction;
                    if ("drag" === e.prepared.name) {
                        var n = e.prepared.axis;
                        "x" === n ? (e.curCoords.page.y = e.startCoords.page.y,
                            e.curCoords.client.y = e.startCoords.client.y,
                            e.pointerDelta.page.speed = Math.abs(e.pointerDelta.page.vx),
                            e.pointerDelta.client.speed = Math.abs(e.pointerDelta.client.vx),
                            e.pointerDelta.client.vy = 0,
                            e.pointerDelta.page.vy = 0) : "y" === n && (e.curCoords.page.x = e.startCoords.page.x,
                                e.curCoords.client.x = e.startCoords.client.x,
                                e.pointerDelta.page.speed = Math.abs(e.pointerDelta.page.vy),
                                e.pointerDelta.client.speed = Math.abs(e.pointerDelta.client.vy),
                                e.pointerDelta.client.vx = 0,
                                e.pointerDelta.page.vx = 0)
                    }
                }),
                    o.signals.on("new", function (t) {
                        var e = t.iEvent
                            , n = t.interaction;
                        if ("dragmove" === e.type) {
                            var i = n.prepared.axis;
                            "x" === i ? (e.pageY = n.startCoords.page.y,
                                e.clientY = n.startCoords.client.y,
                                e.dy = 0) : "y" === i && (e.pageX = n.startCoords.page.x,
                                    e.clientX = n.startCoords.client.x,
                                    e.dx = 0)
                        }
                    }),
                    r.prototype.draggable = function (t) {
                        return i.is.object(t) ? (this.options.drag.enabled = !1 !== t.enabled,
                            this.setPerAction("drag", t),
                            this.setOnEvents("drag", t),
                            /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis),
                            /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis),
                            this) : i.is.bool(t) ? (this.options.drag.enabled = t,
                                t || (this.ondragstart = this.ondragstart = this.ondragend = null),
                                this) : this.options.drag
                    }
                    ,
                    n.drag = u,
                    n.names.push("drag"),
                    i.merge(r.eventTypes, ["dragstart", "dragmove", "draginertiastart", "draginertiaresume", "dragend"]),
                    n.methodDict.drag = "draggable",
                    a.drag = u.defaults,
                    e.exports = u
            }
                , {
                "../InteractEvent": 3,
                "../Interactable": 4,
                "../Interaction": 5,
                "../defaultOptions": 18,
                "../utils": 43,
                "./base": 6
            }],
            8: [function (t, e) {
                "use strict";
                function n(t, e) {
                    var n = []
                        , i = [];
                    e = e || t.element;
                    for (var o = 0; o < l.interactables.length; o++) {
                        var r;
                        r = l.interactables[o];
                        var s = r;
                        if (s.options.drop.enabled) {
                            var a = s.options.drop.accept;
                            if (!(c.is.element(a) && a !== e || c.is.string(a) && !c.matchesSelector(e, a)))
                                for (var u = c.is.string(s.target) ? s._context.querySelectorAll(s.target) : [s.target], p = 0; p < u.length; p++) {
                                    var d;
                                    d = u[p];
                                    var f = d;
                                    f !== e && (n.push(s),
                                        i.push(f))
                                }
                        }
                    }
                    return {
                        elements: i,
                        dropzones: n
                    }
                }
                function i(t, e) {
                    for (var n = void 0, i = 0; i < t.activeDrops.dropzones.length; i++) {
                        var o = t.activeDrops.dropzones[i]
                            , r = t.activeDrops.elements[i];
                        r !== n && (e.target = r,
                            o.fire(e)),
                            n = r
                    }
                }
                function o(t, e) {
                    var i = n(t, e, !0);
                    t.activeDrops.dropzones = i.dropzones,
                        t.activeDrops.elements = i.elements,
                        t.activeDrops.rects = [];
                    for (var o = 0; o < t.activeDrops.dropzones.length; o++)
                        t.activeDrops.rects[o] = t.activeDrops.dropzones[o].getRect(t.activeDrops.elements[o])
                }
                function r(t, e, n) {
                    var i = t.interaction
                        , r = [];
                    m && o(i, n);
                    for (var s = 0; s < i.activeDrops.dropzones.length; s++) {
                        var a = i.activeDrops.dropzones[s]
                            , u = i.activeDrops.elements[s]
                            , l = i.activeDrops.rects[s];
                        r.push(a.dropCheck(t, e, i.target, n, u, l) ? u : null)
                    }
                    var p = c.indexOfDeepestElement(r);
                    return {
                        dropzone: i.activeDrops.dropzones[p] || null,
                        element: i.activeDrops.elements[p] || null
                    }
                }
                function s(t, e, n) {
                    var i = {
                        enter: null,
                        leave: null,
                        activate: null,
                        deactivate: null,
                        move: null,
                        drop: null
                    }
                        , o = {
                            dragEvent: n,
                            interaction: t,
                            target: t.dropElement,
                            dropzone: t.dropTarget,
                            relatedTarget: n.target,
                            draggable: n.interactable,
                            timeStamp: n.timeStamp
                        };
                    return t.dropElement !== t.prevDropElement && (t.prevDropTarget && (i.leave = c.extend({
                        type: "dragleave"
                    }, o),
                        n.dragLeave = i.leave.target = t.prevDropElement,
                        n.prevDropzone = i.leave.dropzone = t.prevDropTarget),
                        t.dropTarget && (i.enter = {
                            dragEvent: n,
                            interaction: t,
                            target: t.dropElement,
                            dropzone: t.dropTarget,
                            relatedTarget: n.target,
                            draggable: n.interactable,
                            timeStamp: n.timeStamp,
                            type: "dragenter"
                        },
                            n.dragEnter = t.dropElement,
                            n.dropzone = t.dropTarget)),
                        "dragend" === n.type && t.dropTarget && (i.drop = c.extend({
                            type: "drop"
                        }, o),
                            n.dropzone = t.dropTarget,
                            n.relatedTarget = t.dropElement),
                        "dragstart" === n.type && (i.activate = c.extend({
                            type: "dropactivate"
                        }, o),
                            i.activate.target = null,
                            i.activate.dropzone = null),
                        "dragend" === n.type && (i.deactivate = c.extend({
                            type: "dropdeactivate"
                        }, o),
                            i.deactivate.target = null,
                            i.deactivate.dropzone = null),
                        "dragmove" === n.type && t.dropTarget && (i.move = c.extend({
                            dragmove: n,
                            type: "dropmove"
                        }, o),
                            n.dropzone = t.dropTarget),
                        i
                }
                function a(t, e) {
                    e.leave && t.prevDropTarget.fire(e.leave),
                        e.move && t.dropTarget.fire(e.move),
                        e.enter && t.dropTarget.fire(e.enter),
                        e.drop && t.dropTarget.fire(e.drop),
                        e.deactivate && i(t, e.deactivate),
                        t.prevDropTarget = t.dropTarget,
                        t.prevDropElement = t.dropElement
                }
                var u = t("./base")
                    , c = t("../utils")
                    , l = t("../scope")
                    , p = t("../interact")
                    , d = t("../InteractEvent")
                    , f = t("../Interactable")
                    , h = t("../Interaction")
                    , g = t("../defaultOptions")
                    , v = {
                        defaults: {
                            enabled: !1,
                            accept: null,
                            overlap: "pointer"
                        }
                    }
                    , m = !1;
                h.signals.on("action-start", function (t) {
                    var e = t.interaction
                        , n = t.event;
                    if ("drag" === e.prepared.name) {
                        e.activeDrops.dropzones = [],
                            e.activeDrops.elements = [],
                            e.activeDrops.rects = [],
                            e.dropEvents = null,
                            e.dynamicDrop || o(e, e.element);
                        var r = e.prevEvent
                            , a = s(e, n, r);
                        a.activate && i(e, a.activate)
                    }
                }),
                    d.signals.on("new", function (t) {
                        var e = t.interaction
                            , n = t.iEvent
                            , i = t.event;
                        if ("dragmove" === n.type || "dragend" === n.type) {
                            var o = e.element
                                , a = n
                                , u = r(a, i, o);
                            e.dropTarget = u.dropzone,
                                e.dropElement = u.element,
                                e.dropEvents = s(e, i, a)
                        }
                    }),
                    h.signals.on("action-move", function (t) {
                        var e = t.interaction;
                        "drag" === e.prepared.name && a(e, e.dropEvents)
                    }),
                    h.signals.on("action-end", function (t) {
                        var e = t.interaction;
                        "drag" === e.prepared.name && a(e, e.dropEvents)
                    }),
                    h.signals.on("stop-drag", function (t) {
                        var e = t.interaction;
                        e.activeDrops.dropzones = e.activeDrops.elements = e.activeDrops.rects = e.dropEvents = null
                    }),
                    f.prototype.dropzone = function (t) {
                        return c.is.object(t) ? (this.options.drop.enabled = !1 !== t.enabled,
                            c.is["function"](t.ondrop) && (this.events.ondrop = t.ondrop),
                            c.is["function"](t.ondropactivate) && (this.events.ondropactivate = t.ondropactivate),
                            c.is["function"](t.ondropdeactivate) && (this.events.ondropdeactivate = t.ondropdeactivate),
                            c.is["function"](t.ondragenter) && (this.events.ondragenter = t.ondragenter),
                            c.is["function"](t.ondragleave) && (this.events.ondragleave = t.ondragleave),
                            c.is["function"](t.ondropmove) && (this.events.ondropmove = t.ondropmove),
                            /^(pointer|center)$/.test(t.overlap) ? this.options.drop.overlap = t.overlap : c.is.number(t.overlap) && (this.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)),
                            "accept" in t && (this.options.drop.accept = t.accept),
                            "checker" in t && (this.options.drop.checker = t.checker),
                            this) : c.is.bool(t) ? (this.options.drop.enabled = t,
                                t || (this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null),
                                this) : this.options.drop
                    }
                    ,
                    f.prototype.dropCheck = function (t, e, n, i, o, r) {
                        var s = !1;
                        if (!(r = r || this.getRect(o)))
                            return !!this.options.drop.checker && this.options.drop.checker(t, e, s, this, o, n, i);
                        var a = this.options.drop.overlap;
                        if ("pointer" === a) {
                            var u = c.getOriginXY(n, i, "drag")
                                , l = c.getPageXY(t);
                            l.x += u.x,
                                l.y += u.y;
                            var p = l.x > r.left && l.x < r.right
                                , d = l.y > r.top && l.y < r.bottom;
                            s = p && d
                        }
                        var f = n.getRect(i);
                        if (f && "center" === a) {
                            var h = f.left + f.width / 2
                                , g = f.top + f.height / 2;
                            s = h >= r.left && h <= r.right && g >= r.top && g <= r.bottom
                        }
                        if (f && c.is.number(a)) {
                            s = Math.max(0, Math.min(r.right, f.right) - Math.max(r.left, f.left)) * Math.max(0, Math.min(r.bottom, f.bottom) - Math.max(r.top, f.top)) / (f.width * f.height) >= a
                        }
                        return this.options.drop.checker && (s = this.options.drop.checker(t, e, s, this, o, n, i)),
                            s
                    }
                    ,
                    f.signals.on("unset", function (t) {
                        t.interactable.dropzone(!1)
                    }),
                    f.settingsMethods.push("dropChecker"),
                    h.signals.on("new", function (t) {
                        t.dropTarget = null,
                            t.dropElement = null,
                            t.prevDropTarget = null,
                            t.prevDropElement = null,
                            t.dropEvents = null,
                            t.activeDrops = {
                                dropzones: [],
                                elements: [],
                                rects: []
                            }
                    }),
                    h.signals.on("stop", function (t) {
                        var e = t.interaction;
                        e.dropTarget = e.dropElement = e.prevDropTarget = e.prevDropElement = null
                    }),
                    p.dynamicDrop = function (t) {
                        return c.is.bool(t) ? (m = t,
                            p) : m
                    }
                    ,
                    c.merge(f.eventTypes, ["dragenter", "dragleave", "dropactivate", "dropdeactivate", "dropmove", "drop"]),
                    u.methodDict.drop = "dropzone",
                    g.drop = v.defaults,
                    e.exports = v
            }
                , {
                "../InteractEvent": 3,
                "../Interactable": 4,
                "../Interaction": 5,
                "../defaultOptions": 18,
                "../interact": 21,
                "../scope": 33,
                "../utils": 43,
                "./base": 6
            }],
            9: [function (t, e) {
                "use strict";
                var n = t("./base")
                    , i = t("../utils")
                    , o = t("../InteractEvent")
                    , r = t("../Interactable")
                    , s = t("../Interaction")
                    , a = t("../defaultOptions")
                    , u = {
                        defaults: {
                            enabled: !1,
                            origin: null,
                            restrict: null
                        },
                        checker: function (t, e, n, i, o) {
                            return o.pointerIds.length >= 2 ? {
                                name: "gesture"
                            } : null
                        },
                        getCursor: function () {
                            return ""
                        }
                    };
                o.signals.on("new", function (t) {
                    var e = t.iEvent
                        , n = t.interaction;
                    "gesturestart" === e.type && (e.ds = 0,
                        n.gesture.startDistance = n.gesture.prevDistance = e.distance,
                        n.gesture.startAngle = n.gesture.prevAngle = e.angle,
                        n.gesture.scale = 1)
                }),
                    o.signals.on("new", function (t) {
                        var e = t.iEvent
                            , n = t.interaction;
                        "gesturemove" === e.type && (e.ds = e.scale - n.gesture.scale,
                            n.target.fire(e),
                            n.gesture.prevAngle = e.angle,
                            n.gesture.prevDistance = e.distance,
                            e.scale === Infinity || null === e.scale || e.scale === undefined || isNaN(e.scale) || (n.gesture.scale = e.scale))
                    }),
                    r.prototype.gesturable = function (t) {
                        return i.is.object(t) ? (this.options.gesture.enabled = !1 !== t.enabled,
                            this.setPerAction("gesture", t),
                            this.setOnEvents("gesture", t),
                            this) : i.is.bool(t) ? (this.options.gesture.enabled = t,
                                t || (this.ongesturestart = this.ongesturestart = this.ongestureend = null),
                                this) : this.options.gesture
                    }
                    ,
                    o.signals.on("set-delta", function (t) {
                        var e = t.interaction
                            , n = t.iEvent
                            , r = t.action
                            , s = t.event
                            , a = t.starting
                            , u = t.ending
                            , c = t.deltaSource;
                        if ("gesture" === r) {
                            var l = e.pointers;
                            n.touches = [l[0], l[1]],
                                a ? (n.distance = i.touchDistance(l, c),
                                    n.box = i.touchBBox(l),
                                    n.scale = 1,
                                    n.ds = 0,
                                    n.angle = i.touchAngle(l, undefined, c),
                                    n.da = 0) : u || s instanceof o ? (n.distance = e.prevEvent.distance,
                                        n.box = e.prevEvent.box,
                                        n.scale = e.prevEvent.scale,
                                        n.ds = n.scale - 1,
                                        n.angle = e.prevEvent.angle,
                                        n.da = n.angle - e.gesture.startAngle) : (n.distance = i.touchDistance(l, c),
                                            n.box = i.touchBBox(l),
                                            n.scale = n.distance / e.gesture.startDistance,
                                            n.angle = i.touchAngle(l, e.gesture.prevAngle, c),
                                            n.ds = n.scale - e.gesture.prevScale,
                                            n.da = n.angle - e.gesture.prevAngle)
                        }
                    }),
                    s.signals.on("new", function (t) {
                        t.gesture = {
                            start: {
                                x: 0,
                                y: 0
                            },
                            startDistance: 0,
                            prevDistance: 0,
                            distance: 0,
                            scale: 1,
                            startAngle: 0,
                            prevAngle: 0
                        }
                    }),
                    n.gesture = u,
                    n.names.push("gesture"),
                    i.merge(r.eventTypes, ["gesturestart", "gesturemove", "gestureend"]),
                    n.methodDict.gesture = "gesturable",
                    a.gesture = u.defaults,
                    e.exports = u
            }
                , {
                "../InteractEvent": 3,
                "../Interactable": 4,
                "../Interaction": 5,
                "../defaultOptions": 18,
                "../utils": 43,
                "./base": 6
            }],
            10: [function (t, e) {
                "use strict";
                function n(t, e, n, i, r, s, a) {
                    if (!e)
                        return !1;
                    if (!0 === e) {
                        var u = o.is.number(s.width) ? s.width : s.right - s.left
                            , c = o.is.number(s.height) ? s.height : s.bottom - s.top;
                        if (u < 0 && ("left" === t ? t = "right" : "right" === t && (t = "left")),
                            c < 0 && ("top" === t ? t = "bottom" : "bottom" === t && (t = "top")),
                            "left" === t)
                            return n.x < (u >= 0 ? s.left : s.right) + a;
                        if ("top" === t)
                            return n.y < (c >= 0 ? s.top : s.bottom) + a;
                        if ("right" === t)
                            return n.x > (u >= 0 ? s.right : s.left) - a;
                        if ("bottom" === t)
                            return n.y > (c >= 0 ? s.bottom : s.top) - a
                    }
                    return !!o.is.element(i) && (o.is.element(e) ? e === i : o.matchesUpTo(i, e, r))
                }
                var i = t("./base")
                    , o = t("../utils")
                    , r = t("../utils/browser")
                    , s = t("../InteractEvent")
                    , a = t("../Interactable")
                    , u = t("../Interaction")
                    , c = t("../defaultOptions")
                    , l = r.supportsTouch || r.supportsPointerEvent ? 20 : 10
                    , p = {
                        defaults: {
                            enabled: !1,
                            mouseButtons: null,
                            origin: null,
                            snap: null,
                            restrict: null,
                            inertia: null,
                            autoScroll: null,
                            square: !1,
                            preserveAspectRatio: !1,
                            axis: "xy",
                            margin: NaN,
                            edges: null,
                            invert: "none"
                        },
                        checker: function (t, e, i, r, s, a) {
                            if (!a)
                                return null;
                            var u = o.extend({}, s.curCoords.page)
                                , c = i.options;
                            if (c.resize.enabled) {
                                var p = c.resize
                                    , d = {
                                        left: !1,
                                        right: !1,
                                        top: !1,
                                        bottom: !1
                                    };
                                if (o.is.object(p.edges)) {
                                    for (var f in d)
                                        d[f] = n(f, p.edges[f], u, s._eventTarget, r, a, p.margin || l);
                                    if (d.left = d.left && !d.right,
                                        d.top = d.top && !d.bottom,
                                        d.left || d.right || d.top || d.bottom)
                                        return {
                                            name: "resize",
                                            edges: d
                                        }
                                } else {
                                    var h = "y" !== c.resize.axis && u.x > a.right - l
                                        , g = "x" !== c.resize.axis && u.y > a.bottom - l;
                                    if (h || g)
                                        return {
                                            name: "resize",
                                            axes: (h ? "x" : "") + (g ? "y" : "")
                                        }
                                }
                            }
                            return null
                        },
                        cursors: r.isIe9 ? {
                            x: "e-resize",
                            y: "s-resize",
                            xy: "se-resize",
                            top: "n-resize",
                            left: "w-resize",
                            bottom: "s-resize",
                            right: "e-resize",
                            topleft: "se-resize",
                            bottomright: "se-resize",
                            topright: "ne-resize",
                            bottomleft: "ne-resize"
                        } : {
                            x: "ew-resize",
                            y: "ns-resize",
                            xy: "nwse-resize",
                            top: "ns-resize",
                            left: "ew-resize",
                            bottom: "ns-resize",
                            right: "ew-resize",
                            topleft: "nwse-resize",
                            bottomright: "nwse-resize",
                            topright: "nesw-resize",
                            bottomleft: "nesw-resize"
                        },
                        getCursor: function (t) {
                            if (t.axis)
                                return p.cursors[t.name + t.axis];
                            if (t.edges) {
                                for (var e = "", n = ["top", "bottom", "left", "right"], i = 0; i < 4; i++)
                                    t.edges[n[i]] && (e += n[i]);
                                return p.cursors[e]
                            }
                        }
                    };
                s.signals.on("new", function (t) {
                    var e = t.iEvent
                        , n = t.interaction;
                    if ("resizestart" === e.type && n.prepared.edges) {
                        var i = n.target.getRect(n.element)
                            , r = n.target.options.resize;
                        if (r.square || r.preserveAspectRatio) {
                            var s = o.extend({}, n.prepared.edges);
                            s.top = s.top || s.left && !s.bottom,
                                s.left = s.left || s.top && !s.right,
                                s.bottom = s.bottom || s.right && !s.top,
                                s.right = s.right || s.bottom && !s.left,
                                n.prepared._linkedEdges = s
                        } else
                            n.prepared._linkedEdges = null;
                        r.preserveAspectRatio && (n.resizeStartAspectRatio = i.width / i.height),
                            n.resizeRects = {
                                start: i,
                                current: o.extend({}, i),
                                inverted: o.extend({}, i),
                                previous: o.extend({}, i),
                                delta: {
                                    left: 0,
                                    right: 0,
                                    width: 0,
                                    top: 0,
                                    bottom: 0,
                                    height: 0
                                }
                            },
                            e.rect = n.resizeRects.inverted,
                            e.deltaRect = n.resizeRects.delta
                    }
                }),
                    s.signals.on("new", function (t) {
                        var e = t.iEvent
                            , n = t.phase
                            , i = t.interaction;
                        if ("move" === n && i.prepared.edges) {
                            var r = i.target.options.resize
                                , s = r.invert
                                , a = "reposition" === s || "negate" === s
                                , u = i.prepared.edges
                                , c = i.resizeRects.start
                                , l = i.resizeRects.current
                                , p = i.resizeRects.inverted
                                , d = i.resizeRects.delta
                                , f = o.extend(i.resizeRects.previous, p)
                                , h = u
                                , g = e.dx
                                , v = e.dy;
                            if (r.preserveAspectRatio || r.square) {
                                var m = r.preserveAspectRatio ? i.resizeStartAspectRatio : 1;
                                u = i.prepared._linkedEdges,
                                    h.left && h.bottom || h.right && h.top ? v = -g / m : h.left || h.right ? v = g / m : (h.top || h.bottom) && (g = v * m)
                            }
                            if (u.top && (l.top += v),
                                u.bottom && (l.bottom += v),
                                u.left && (l.left += g),
                                u.right && (l.right += g),
                                a) {
                                if (o.extend(p, l),
                                    "reposition" === s) {
                                    var y = void 0;
                                    p.top > p.bottom && (y = p.top,
                                        p.top = p.bottom,
                                        p.bottom = y),
                                        p.left > p.right && (y = p.left,
                                            p.left = p.right,
                                            p.right = y)
                                }
                            } else
                                p.top = Math.min(l.top, c.bottom),
                                    p.bottom = Math.max(l.bottom, c.top),
                                    p.left = Math.min(l.left, c.right),
                                    p.right = Math.max(l.right, c.left);
                            p.width = p.right - p.left,
                                p.height = p.bottom - p.top;
                            for (var x in p)
                                d[x] = p[x] - f[x];
                            e.edges = i.prepared.edges,
                                e.rect = p,
                                e.deltaRect = d
                        }
                    }),
                    a.prototype.resizable = function (t) {
                        return o.is.object(t) ? (this.options.resize.enabled = !1 !== t.enabled,
                            this.setPerAction("resize", t),
                            this.setOnEvents("resize", t),
                            /^x$|^y$|^xy$/.test(t.axis) ? this.options.resize.axis = t.axis : null === t.axis && (this.options.resize.axis = c.resize.axis),
                            o.is.bool(t.preserveAspectRatio) ? this.options.resize.preserveAspectRatio = t.preserveAspectRatio : o.is.bool(t.square) && (this.options.resize.square = t.square),
                            this) : o.is.bool(t) ? (this.options.resize.enabled = t,
                                t || (this.onresizestart = this.onresizestart = this.onresizeend = null),
                                this) : this.options.resize
                    }
                    ,
                    u.signals.on("new", function (t) {
                        t.resizeAxes = "xy"
                    }),
                    s.signals.on("set-delta", function (t) {
                        var e = t.interaction
                            , n = t.iEvent;
                        "resize" === t.action && e.resizeAxes && (e.target.options.resize.square ? ("y" === e.resizeAxes ? n.dx = n.dy : n.dy = n.dx,
                            n.axes = "xy") : (n.axes = e.resizeAxes,
                                "x" === e.resizeAxes ? n.dy = 0 : "y" === e.resizeAxes && (n.dx = 0)))
                    }),
                    i.resize = p,
                    i.names.push("resize"),
                    o.merge(a.eventTypes, ["resizestart", "resizemove", "resizeinertiastart", "resizeinertiaresume", "resizeend"]),
                    i.methodDict.resize = "resizable",
                    c.resize = p.defaults,
                    e.exports = p
            }
                , {
                "../InteractEvent": 3,
                "../Interactable": 4,
                "../Interaction": 5,
                "../defaultOptions": 18,
                "../utils": 43,
                "../utils/browser": 36,
                "./base": 6
            }],
            11: [function (t, e) {
                "use strict";
                var n = t("./utils/raf")
                    , i = t("./utils/window").getWindow
                    , o = t("./utils/is")
                    , r = t("./utils/domUtils")
                    , s = t("./Interaction")
                    , a = t("./defaultOptions")
                    , u = {
                        defaults: {
                            enabled: !1,
                            container: null,
                            margin: 60,
                            speed: 300
                        },
                        interaction: null,
                        i: null,
                        x: 0,
                        y: 0,
                        isScrolling: !1,
                        prevTime: 0,
                        start: function (t) {
                            u.isScrolling = !0,
                                n.cancel(u.i),
                                u.interaction = t,
                                u.prevTime = (new Date).getTime(),
                                u.i = n.request(u.scroll)
                        },
                        stop: function () {
                            u.isScrolling = !1,
                                n.cancel(u.i)
                        },
                        scroll: function () {
                            var t = u.interaction.target.options[u.interaction.prepared.name].autoScroll
                                , e = t.container || i(u.interaction.element)
                                , r = (new Date).getTime()
                                , s = (r - u.prevTime) / 1e3
                                , a = t.speed * s;
                            a >= 1 && (o.window(e) ? e.scrollBy(u.x * a, u.y * a) : e && (e.scrollLeft += u.x * a),
                                u.prevTime = r),
                                u.isScrolling && (n.cancel(u.i),
                                    u.i = n.request(u.scroll))
                        },
                        check: function (t, e) {
                            var n = t.options;
                            return n[e].autoScroll && n[e].autoScroll.enabled
                        },
                        onInteractionMove: function (t) {
                            var e = t.interaction
                                , n = t.pointer;
                            if (e.interacting() && u.check(e.target, e.prepared.name)) {
                                if (e.simulation)
                                    return void (u.x = u.y = 0);
                                var s = void 0
                                    , a = void 0
                                    , c = void 0
                                    , l = void 0
                                    , p = e.target.options[e.prepared.name].autoScroll
                                    , d = p.container || i(e.element);
                                if (o.window(d))
                                    l = n.clientX < u.margin,
                                        s = n.clientY < u.margin,
                                        a = n.clientX > d.innerWidth - u.margin,
                                        c = n.clientY > d.innerHeight - u.margin;
                                else {
                                    var f = r.getElementClientRect(d);
                                    l = n.clientX < f.left + u.margin,
                                        s = n.clientY < f.top + u.margin,
                                        a = n.clientX > f.right - u.margin,
                                        c = n.clientY > f.bottom - u.margin
                                }
                                u.x = a ? 1 : l ? -1 : 0,
                                    u.y = c ? 1 : s ? -1 : 0,
                                    u.isScrolling || (u.margin = p.margin,
                                        u.speed = p.speed,
                                        u.start(e))
                            }
                        }
                    };
                s.signals.on("stop-active", function () {
                    u.stop()
                }),
                    s.signals.on("action-move", u.onInteractionMove),
                    a.perAction.autoScroll = u.defaults,
                    e.exports = u
            }
                , {
                "./Interaction": 5,
                "./defaultOptions": 18,
                "./utils/domUtils": 38,
                "./utils/is": 45,
                "./utils/raf": 49,
                "./utils/window": 51
            }],
            12: [function (t) {
                "use strict";
                var e = t("../Interactable")
                    , n = t("../actions/base")
                    , i = t("../utils/is")
                    , o = t("../utils/domUtils")
                    , r = t("../utils")
                    , s = r.warnOnce;
                e.prototype.getAction = function (t, e, n, i) {
                    var o = this.defaultActionChecker(t, e, n, i);
                    return this.options.actionChecker ? this.options.actionChecker(t, e, o, this, i, n) : o
                }
                    ,
                    e.prototype.ignoreFrom = s(function (t) {
                        return this._backCompatOption("ignoreFrom", t)
                    }, "Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."),
                    e.prototype.allowFrom = s(function (t) {
                        return this._backCompatOption("allowFrom", t)
                    }, "Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."),
                    e.prototype.testIgnore = function (t, e, n) {
                        return !(!t || !i.element(n)) && (i.string(t) ? o.matchesUpTo(n, t, e) : !!i.element(t) && o.nodeContains(t, n))
                    }
                    ,
                    e.prototype.testAllow = function (t, e, n) {
                        return !t || !!i.element(n) && (i.string(t) ? o.matchesUpTo(n, t, e) : !!i.element(t) && o.nodeContains(t, n))
                    }
                    ,
                    e.prototype.testIgnoreAllow = function (t, e, n) {
                        return !this.testIgnore(t.ignoreFrom, e, n) && this.testAllow(t.allowFrom, e, n)
                    }
                    ,
                    e.prototype.actionChecker = function (t) {
                        return i["function"](t) ? (this.options.actionChecker = t,
                            this) : null === t ? (delete this.options.actionChecker,
                                this) : this.options.actionChecker
                    }
                    ,
                    e.prototype.styleCursor = function (t) {
                        return i.bool(t) ? (this.options.styleCursor = t,
                            this) : null === t ? (delete this.options.styleCursor,
                                this) : this.options.styleCursor
                    }
                    ,
                    e.prototype.defaultActionChecker = function (t, e, i, o) {
                        for (var r = this.getRect(o), s = e.buttons || {
                            0: 1,
                            1: 4,
                            3: 8,
                            4: 16
                        }[e.button], a = null, u = 0; u < n.names.length; u++) {
                            var c;
                            c = n.names[u];
                            var l = c;
                            if ((!i.pointerIsDown || !/mouse|pointer/.test(i.pointerType) || 0 != (s & this.options[l].mouseButtons)) && (a = n[l].checker(t, e, this, o, i, r)))
                                return a
                        }
                    }
            }
                , {
                "../Interactable": 4,
                "../actions/base": 6,
                "../utils": 43,
                "../utils/domUtils": 38,
                "../utils/is": 45
            }],
            13: [function (t, e) {
                "use strict";
                function n(t, e, n, i) {
                    return f.is.object(t) && e.testIgnoreAllow(e.options[t.name], n, i) && e.options[t.name].enabled && s(e, n, t) ? t : null
                }
                function i(t, e, i, o, r, s) {
                    for (var a = 0, u = o.length; a < u; a++) {
                        var c = o[a]
                            , l = r[a]
                            , p = n(c.getAction(e, i, t, l), c, l, s);
                        if (p)
                            return {
                                action: p,
                                target: c,
                                element: l
                            }
                    }
                    return {}
                }
                function o(t, e, n, o) {
                    function r(t) {
                        s.push(t),
                            a.push(u)
                    }
                    for (var s = [], a = [], u = o; f.is.element(u);) {
                        s = [],
                            a = [],
                            d.interactables.forEachMatch(u, r);
                        var c = i(t, e, n, s, a, o);
                        if (c.action && !c.target.options[c.action.name].manualStart)
                            return c;
                        u = f.parentNode(u)
                    }
                    return {}
                }
                function r(t, e) {
                    var n = e.action
                        , i = e.target
                        , o = e.element;
                    if (n = n || {},
                        t.target && t.target.options.styleCursor && (t.target._doc.documentElement.style.cursor = ""),
                        t.target = i,
                        t.element = o,
                        f.copyAction(t.prepared, n),
                        i && i.options.styleCursor) {
                        var r = n ? l[n.name].getCursor(n) : "";
                        t.target._doc.documentElement.style.cursor = r
                    }
                    h.fire("prepared", {
                        interaction: t
                    })
                }
                function s(t, e, n) {
                    var i = t.options
                        , o = i[n.name].max
                        , r = i[n.name].maxPerElement
                        , s = 0
                        , a = 0
                        , u = 0;
                    if (o && r && g.maxInteractions) {
                        for (var c = 0; c < d.interactions.length; c++) {
                            var l;
                            l = d.interactions[c];
                            var p = l
                                , f = p.prepared.name;
                            if (p.interacting()) {
                                if (++s >= g.maxInteractions)
                                    return !1;
                                if (p.target === t) {
                                    if ((a += f === n.name | 0) >= o)
                                        return !1;
                                    if (p.element === e && (u++,
                                        f !== n.name || u >= r))
                                        return !1
                                }
                            }
                        }
                        return g.maxInteractions > 0
                    }
                }
                var a = t("../interact")
                    , u = t("../Interactable")
                    , c = t("../Interaction")
                    , l = t("../actions/base")
                    , p = t("../defaultOptions")
                    , d = t("../scope")
                    , f = t("../utils")
                    , h = t("../utils/Signals")["new"]();
                t("./InteractableMethods");
                var g = {
                    signals: h,
                    withinInteractionLimit: s,
                    maxInteractions: Infinity,
                    defaults: {
                        perAction: {
                            manualStart: !1,
                            max: Infinity,
                            maxPerElement: 1,
                            allowFrom: null,
                            ignoreFrom: null,
                            mouseButtons: 1
                        }
                    },
                    setActionDefaults: function (t) {
                        f.extend(t.defaults, g.defaults.perAction)
                    },
                    validateAction: n
                };
                c.signals.on("down", function (t) {
                    var e = t.interaction
                        , n = t.pointer
                        , i = t.event
                        , s = t.eventTarget;
                    if (!e.interacting()) {
                        r(e, o(e, n, i, s))
                    }
                }),
                    c.signals.on("move", function (t) {
                        var e = t.interaction
                            , n = t.pointer
                            , i = t.event
                            , s = t.eventTarget;
                        if ("mouse" === e.pointerType && !e.pointerIsDown && !e.interacting()) {
                            r(e, o(e, n, i, s))
                        }
                    }),
                    c.signals.on("move", function (t) {
                        var e = t.interaction
                            , n = t.event;
                        if (e.pointerIsDown && !e.interacting() && e.pointerWasMoved && e.prepared.name) {
                            h.fire("before-start", t);
                            var i = e.target;
                            e.prepared.name && i && (i.options[e.prepared.name].manualStart || !s(i, e.element, e.prepared) ? e.stop(n) : e.start(e.prepared, i, e.element))
                        }
                    }),
                    c.signals.on("stop", function (t) {
                        var e = t.interaction
                            , n = e.target;
                        n && n.options.styleCursor && (n._doc.documentElement.style.cursor = "")
                    }),
                    a.maxInteractions = function (t) {
                        return f.is.number(t) ? (g.maxInteractions = t,
                            a) : g.maxInteractions
                    }
                    ,
                    u.settingsMethods.push("styleCursor"),
                    u.settingsMethods.push("actionChecker"),
                    u.settingsMethods.push("ignoreFrom"),
                    u.settingsMethods.push("allowFrom"),
                    p.base.actionChecker = null,
                    p.base.styleCursor = !0,
                    f.extend(p.perAction, g.defaults.perAction),
                    e.exports = g
            }
                , {
                "../Interactable": 4,
                "../Interaction": 5,
                "../actions/base": 6,
                "../defaultOptions": 18,
                "../interact": 21,
                "../scope": 33,
                "../utils": 43,
                "../utils/Signals": 34,
                "./InteractableMethods": 12
            }],
            14: [function (t) {
                "use strict";
                function e(t, e) {
                    if (!e)
                        return !1;
                    var n = e.options.drag.startAxis;
                    return "xy" === t || "xy" === n || n === t
                }
                var n = t("./base")
                    , i = t("../scope")
                    , o = t("../utils/is")
                    , r = t("../utils/domUtils")
                    , s = r.parentNode;
                n.setActionDefaults(t("../actions/drag")),
                    n.signals.on("before-start", function (t) {
                        var r = t.interaction
                            , a = t.eventTarget
                            , u = t.dx
                            , c = t.dy;
                        if ("drag" === r.prepared.name) {
                            var l = Math.abs(u)
                                , p = Math.abs(c)
                                , d = r.target.options.drag
                                , f = d.startAxis
                                , h = l > p ? "x" : l < p ? "y" : "xy";
                            if (r.prepared.axis = "start" === d.lockAxis ? h[0] : d.lockAxis,
                                "xy" !== h && "xy" !== f && f !== h) {
                                r.prepared.name = null;
                                for (var g = a, v = function (t) {
                                    if (t !== r.target) {
                                        var i = r.target.options.drag;
                                        if (!i.manualStart && t.testIgnoreAllow(i, g, a)) {
                                            var o = t.getAction(r.downPointer, r.downEvent, r, g);
                                            if (o && "drag" === o.name && e(h, t) && n.validateAction(o, t, g, a))
                                                return t
                                        }
                                    }
                                }; o.element(g);) {
                                    var m = i.interactables.forEachMatch(g, v);
                                    if (m) {
                                        r.prepared.name = "drag",
                                            r.target = m,
                                            r.element = g;
                                        break
                                    }
                                    g = s(g)
                                }
                            }
                        }
                    })
            }
                , {
                "../actions/drag": 7,
                "../scope": 33,
                "../utils/domUtils": 38,
                "../utils/is": 45,
                "./base": 13
            }],
            15: [function (t) {
                "use strict";
                t("./base").setActionDefaults(t("../actions/gesture"))
            }
                , {
                "../actions/gesture": 9,
                "./base": 13
            }],
            16: [function (t, e) {
                "use strict";
                function n(t) {
                    var e = t.prepared && t.prepared.name;
                    if (!e)
                        return null;
                    var n = t.target.options;
                    return n[e].hold || n[e].delay
                }
                var i = t("./base")
                    , o = t("../Interaction");
                i.defaults.perAction.hold = 0,
                    i.defaults.perAction.delay = 0,
                    o.signals.on("new", function (t) {
                        t.autoStartHoldTimer = null
                    }),
                    i.signals.on("prepared", function (t) {
                        var e = t.interaction
                            , i = n(e);
                        i > 0 && (e.autoStartHoldTimer = setTimeout(function () {
                            e.start(e.prepared, e.target, e.element)
                        }, i))
                    }),
                    o.signals.on("move", function (t) {
                        var e = t.interaction
                            , n = t.duplicate;
                        e.pointerWasMoved && !n && clearTimeout(e.autoStartHoldTimer)
                    }),
                    i.signals.on("before-start", function (t) {
                        var e = t.interaction;
                        n(e) > 0 && (e.prepared.name = null)
                    }),
                    e.exports = {
                        getHoldDuration: n
                    }
            }
                , {
                "../Interaction": 5,
                "./base": 13
            }],
            17: [function (t) {
                "use strict";
                t("./base").setActionDefaults(t("../actions/resize"))
            }
                , {
                "../actions/resize": 10,
                "./base": 13
            }],
            18: [function (t, e) {
                "use strict";
                e.exports = {
                    base: {
                        accept: null,
                        preventDefault: "auto",
                        deltaSource: "page"
                    },
                    perAction: {
                        origin: {
                            x: 0,
                            y: 0
                        },
                        inertia: {
                            enabled: !1,
                            resistance: 10,
                            minSpeed: 100,
                            endSpeed: 10,
                            allowResume: !0,
                            smoothEndDuration: 300
                        }
                    }
                }
            }
                , {}],
            19: [function (t, e) {
                "use strict";
                t("./inertia"),
                    t("./modifiers/snap"),
                    t("./modifiers/restrict"),
                    t("./pointerEvents/base"),
                    t("./pointerEvents/holdRepeat"),
                    t("./pointerEvents/interactableTargets"),
                    t("./autoStart/hold"),
                    t("./actions/gesture"),
                    t("./actions/resize"),
                    t("./actions/drag"),
                    t("./actions/drop"),
                    t("./modifiers/snapSize"),
                    t("./modifiers/restrictEdges"),
                    t("./modifiers/restrictSize"),
                    t("./autoStart/gesture"),
                    t("./autoStart/resize"),
                    t("./autoStart/drag"),
                    t("./interactablePreventDefault.js"),
                    t("./autoScroll"),
                    e.exports = t("./interact")
            }
                , {
                "./actions/drag": 7,
                "./actions/drop": 8,
                "./actions/gesture": 9,
                "./actions/resize": 10,
                "./autoScroll": 11,
                "./autoStart/drag": 14,
                "./autoStart/gesture": 15,
                "./autoStart/hold": 16,
                "./autoStart/resize": 17,
                "./inertia": 20,
                "./interact": 21,
                "./interactablePreventDefault.js": 22,
                "./modifiers/restrict": 24,
                "./modifiers/restrictEdges": 25,
                "./modifiers/restrictSize": 26,
                "./modifiers/snap": 27,
                "./modifiers/snapSize": 28,
                "./pointerEvents/base": 30,
                "./pointerEvents/holdRepeat": 31,
                "./pointerEvents/interactableTargets": 32
            }],
            20: [function (t) {
                "use strict";
                function e(t, e) {
                    var n = t.target.options[t.prepared.name].inertia
                        , i = n.resistance
                        , o = -Math.log(n.endSpeed / e.v0) / i;
                    e.x0 = t.prevEvent.pageX,
                        e.y0 = t.prevEvent.pageY,
                        e.t0 = e.startEvent.timeStamp / 1e3,
                        e.sx = e.sy = 0,
                        e.modifiedXe = e.xe = (e.vx0 - o) / i,
                        e.modifiedYe = e.ye = (e.vy0 - o) / i,
                        e.te = o,
                        e.lambda_v0 = i / e.v0,
                        e.one_ve_v0 = 1 - n.endSpeed / e.v0
                }
                function n() {
                    o(this),
                        u.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
                    var t = this.inertiaStatus
                        , e = this.target.options[this.prepared.name].inertia
                        , n = e.resistance
                        , i = (new Date).getTime() / 1e3 - t.t0;
                    if (i < t.te) {
                        var r = 1 - (Math.exp(-n * i) - t.lambda_v0) / t.one_ve_v0;
                        if (t.modifiedXe === t.xe && t.modifiedYe === t.ye)
                            t.sx = t.xe * r,
                                t.sy = t.ye * r;
                        else {
                            var s = u.getQuadraticCurvePoint(0, 0, t.xe, t.ye, t.modifiedXe, t.modifiedYe, r);
                            t.sx = s.x,
                                t.sy = s.y
                        }
                        this.doMove(),
                            t.i = c.request(this.boundInertiaFrame)
                    } else
                        t.sx = t.modifiedXe,
                            t.sy = t.modifiedYe,
                            this.doMove(),
                            this.end(t.startEvent),
                            t.active = !1,
                            this.simulation = null;
                    u.copyCoords(this.prevCoords, this.curCoords)
                }
                function i() {
                    o(this);
                    var t = this.inertiaStatus
                        , e = (new Date).getTime() - t.t0
                        , n = this.target.options[this.prepared.name].inertia.smoothEndDuration;
                    e < n ? (t.sx = u.easeOutQuad(e, 0, t.xe, n),
                        t.sy = u.easeOutQuad(e, 0, t.ye, n),
                        this.pointerMove(t.startEvent, t.startEvent),
                        t.i = c.request(this.boundSmoothEndFrame)) : (t.sx = t.xe,
                            t.sy = t.ye,
                            this.pointerMove(t.startEvent, t.startEvent),
                            this.end(t.startEvent),
                            t.smoothEnd = t.active = !1,
                            this.simulation = null)
                }
                function o(t) {
                    var e = t.inertiaStatus;
                    if (e.active) {
                        var n = e.upCoords.page
                            , i = e.upCoords.client;
                        u.setCoords(t.curCoords, [{
                            pageX: n.x + e.sx,
                            pageY: n.y + e.sy,
                            clientX: i.x + e.sx,
                            clientY: i.y + e.sy
                        }])
                    }
                }
                var r = t("./InteractEvent")
                    , s = t("./Interaction")
                    , a = t("./modifiers/base")
                    , u = t("./utils")
                    , c = t("./utils/raf");
                s.signals.on("new", function (t) {
                    t.inertiaStatus = {
                        active: !1,
                        smoothEnd: !1,
                        allowResume: !1,
                        startEvent: null,
                        upCoords: {},
                        xe: 0,
                        ye: 0,
                        sx: 0,
                        sy: 0,
                        t0: 0,
                        vx0: 0,
                        vys: 0,
                        duration: 0,
                        lambda_v0: 0,
                        one_ve_v0: 0,
                        i: null
                    },
                        t.boundInertiaFrame = function () {
                            return n.apply(t)
                        }
                        ,
                        t.boundSmoothEndFrame = function () {
                            return i.apply(t)
                        }
                }),
                    s.signals.on("down", function (t) {
                        var e = t.interaction
                            , n = t.event
                            , i = t.pointer
                            , o = t.eventTarget
                            , l = e.inertiaStatus;
                        if (l.active)
                            for (var p = o; u.is.element(p);) {
                                if (p === e.element) {
                                    c.cancel(l.i),
                                        l.active = !1,
                                        e.simulation = null,
                                        e.updatePointer(i),
                                        u.setCoords(e.curCoords, e.pointers);
                                    var d = {
                                        interaction: e
                                    };
                                    s.signals.fire("before-action-move", d),
                                        s.signals.fire("action-resume", d);
                                    var f = new r(e, n, e.prepared.name, "inertiaresume", e.element);
                                    e.target.fire(f),
                                        e.prevEvent = f,
                                        a.resetStatuses(e.modifierStatuses),
                                        u.copyCoords(e.prevCoords, e.curCoords);
                                    break
                                }
                                p = u.parentNode(p)
                            }
                    }),
                    s.signals.on("up", function (t) {
                        var n = t.interaction
                            , i = t.event
                            , o = n.inertiaStatus;
                        if (n.interacting() && !o.active) {
                            var s = n.target
                                , l = s && s.options
                                , p = l && n.prepared.name && l[n.prepared.name].inertia
                                , d = (new Date).getTime()
                                , f = {}
                                , h = u.extend({}, n.curCoords.page)
                                , g = n.pointerDelta.client.speed
                                , v = !1
                                , m = void 0
                                , y = p && p.enabled && "gesture" !== n.prepared.name && i !== o.startEvent
                                , x = y && d - n.curCoords.timeStamp < 50 && g > p.minSpeed && g > p.endSpeed
                                , b = {
                                    interaction: n,
                                    pageCoords: h,
                                    statuses: f,
                                    preEnd: !0,
                                    requireEndOnly: !0
                                };
                            y && !x && (a.resetStatuses(f),
                                m = a.setAll(b),
                                m.shouldMove && m.locked && (v = !0)),
                                (x || v) && (u.copyCoords(o.upCoords, n.curCoords),
                                    n.pointers[0] = o.startEvent = new r(n, i, n.prepared.name, "inertiastart", n.element),
                                    o.t0 = d,
                                    o.active = !0,
                                    o.allowResume = p.allowResume,
                                    n.simulation = o,
                                    s.fire(o.startEvent),
                                    x ? (o.vx0 = n.pointerDelta.client.vx,
                                        o.vy0 = n.pointerDelta.client.vy,
                                        o.v0 = g,
                                        e(n, o),
                                        u.extend(h, n.curCoords.page),
                                        h.x += o.xe,
                                        h.y += o.ye,
                                        a.resetStatuses(f),
                                        m = a.setAll(b),
                                        o.modifiedXe += m.dx,
                                        o.modifiedYe += m.dy,
                                        o.i = c.request(n.boundInertiaFrame)) : (o.smoothEnd = !0,
                                            o.xe = m.dx,
                                            o.ye = m.dy,
                                            o.sx = o.sy = 0,
                                            o.i = c.request(n.boundSmoothEndFrame)))
                        }
                    }),
                    s.signals.on("stop-active", function (t) {
                        var e = t.interaction
                            , n = e.inertiaStatus;
                        n.active && (c.cancel(n.i),
                            n.active = !1,
                            e.simulation = null)
                    })
            }
                , {
                "./InteractEvent": 3,
                "./Interaction": 5,
                "./modifiers/base": 23,
                "./utils": 43,
                "./utils/raf": 49
            }],
            21: [function (t, e) {
                "use strict";
                function n(t, e) {
                    var n = s.interactables.get(t, e);
                    return n || (n = new a(t, e),
                        n.events.global = c),
                        n
                }
                var i = t("./utils/browser")
                    , o = t("./utils/events")
                    , r = t("./utils")
                    , s = t("./scope")
                    , a = t("./Interactable")
                    , u = t("./Interaction")
                    , c = {};
                n.isSet = function (t, e) {
                    return -1 !== s.interactables.indexOfElement(t, e && e.context)
                }
                    ,
                    n.on = function (t, e, i) {
                        if (r.is.string(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)),
                            r.is.array(t)) {
                            for (var u = 0; u < t.length; u++) {
                                var l;
                                l = t[u];
                                var p = l;
                                n.on(p, e, i)
                            }
                            return n
                        }
                        if (r.is.object(t)) {
                            for (var d in t)
                                n.on(d, t[d], e);
                            return n
                        }
                        return r.contains(a.eventTypes, t) ? c[t] ? c[t].push(e) : c[t] = [e] : o.add(s.document, t, e, {
                            options: i
                        }),
                            n
                    }
                    ,
                    n.off = function (t, e, i) {
                        if (r.is.string(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)),
                            r.is.array(t)) {
                            for (var u = 0; u < t.length; u++) {
                                var l;
                                l = t[u];
                                var p = l;
                                n.off(p, e, i)
                            }
                            return n
                        }
                        if (r.is.object(t)) {
                            for (var d in t)
                                n.off(d, t[d], e);
                            return n
                        }
                        if (r.contains(a.eventTypes, t)) {
                            var f = void 0;
                            t in c && -1 !== (f = c[t].indexOf(e)) && c[t].splice(f, 1)
                        } else
                            o.remove(s.document, t, e, i);
                        return n
                    }
                    ,
                    n.debug = function () {
                        return s
                    }
                    ,
                    n.getPointerAverage = r.pointerAverage,
                    n.getTouchBBox = r.touchBBox,
                    n.getTouchDistance = r.touchDistance,
                    n.getTouchAngle = r.touchAngle,
                    n.getElementRect = r.getElementRect,
                    n.getElementClientRect = r.getElementClientRect,
                    n.matchesSelector = r.matchesSelector,
                    n.closest = r.closest,
                    n.supportsTouch = function () {
                        return i.supportsTouch
                    }
                    ,
                    n.supportsPointerEvent = function () {
                        return i.supportsPointerEvent
                    }
                    ,
                    n.stop = function (t) {
                        for (var e = s.interactions.length - 1; e >= 0; e--)
                            s.interactions[e].stop(t);
                        return n
                    }
                    ,
                    n.pointerMoveTolerance = function (t) {
                        return r.is.number(t) ? (u.pointerMoveTolerance = t,
                            n) : u.pointerMoveTolerance
                    }
                    ,
                    n.addDocument = s.addDocument,
                    n.removeDocument = s.removeDocument,
                    s.interact = n,
                    e.exports = n
            }
                , {
                "./Interactable": 4,
                "./Interaction": 5,
                "./scope": 33,
                "./utils": 43,
                "./utils/browser": 36,
                "./utils/events": 39
            }],
            22: [function (t) {
                "use strict";
                function e(t) {
                    var e = t.interaction
                        , n = t.event;
                    e.target && e.target.checkAndPreventDefault(n)
                }
                var n = t("./Interactable")
                    , i = t("./Interaction")
                    , o = t("./scope")
                    , r = t("./utils/is")
                    , s = t("./utils/events")
                    , a = t("./utils/domUtils")
                    , u = a.nodeContains
                    , c = a.matchesSelector;
                n.prototype.preventDefault = function (t) {
                    return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t,
                        this) : r.bool(t) ? (this.options.preventDefault = t ? "always" : "never",
                            this) : this.options.preventDefault
                }
                    ,
                    n.prototype.checkAndPreventDefault = function (t) {
                        var e = this.options.preventDefault;
                        if ("never" !== e)
                            return "always" === e ? void t.preventDefault() : void (s.supportsOptions && /^touch(start|move)$/.test(t.type) || /^(mouse|pointer|touch)*(down|start)/i.test(t.type) || r.element(t.target) && c(t.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || t.preventDefault())
                    }
                    ;
                for (var l = ["down", "move", "up", "cancel"], p = 0; p < l.length; p++) {
                    var d = l[p];
                    i.signals.on(d, e)
                }
                i.docEvents.dragstart = function (t) {
                    for (var e = 0; e < o.interactions.length; e++) {
                        var n;
                        n = o.interactions[e];
                        var i = n;
                        if (i.element && (i.element === t.target || u(i.element, t.target)))
                            return void i.target.checkAndPreventDefault(t)
                    }
                }
            }
                , {
                "./Interactable": 4,
                "./Interaction": 5,
                "./scope": 33,
                "./utils/domUtils": 38,
                "./utils/events": 39,
                "./utils/is": 45
            }],
            23: [function (t, e) {
                "use strict";
                function n(t, e, n) {
                    return t && t.enabled && (e || !t.endOnly) && (!n || t.endOnly)
                }
                var i = t("../InteractEvent")
                    , o = t("../Interaction")
                    , r = t("../utils/extend")
                    , s = {
                        names: [],
                        setOffsets: function (t) {
                            var e = t.interaction
                                , n = t.pageCoords
                                , i = e.target
                                , o = e.element
                                , r = e.startOffset
                                , a = i.getRect(o);
                            a ? (r.left = n.x - a.left,
                                r.top = n.y - a.top,
                                r.right = a.right - n.x,
                                r.bottom = a.bottom - n.y,
                                "width" in a || (a.width = a.right - a.left),
                                "height" in a || (a.height = a.bottom - a.top)) : r.left = r.top = r.right = r.bottom = 0,
                                t.rect = a,
                                t.interactable = i,
                                t.element = o;
                            for (var u = 0; u < s.names.length; u++) {
                                var c;
                                c = s.names[u];
                                var l = c;
                                t.options = i.options[e.prepared.name][l],
                                    t.options && (e.modifierOffsets[l] = s[l].setOffset(t))
                            }
                        },
                        setAll: function (t) {
                            var e = t.interaction
                                , i = t.statuses
                                , o = t.preEnd
                                , a = t.requireEndOnly
                                , u = {
                                    dx: 0,
                                    dy: 0,
                                    changed: !1,
                                    locked: !1,
                                    shouldMove: !0
                                };
                            t.modifiedCoords = r({}, t.pageCoords);
                            for (var c = 0; c < s.names.length; c++) {
                                var l;
                                l = s.names[c];
                                var p = l
                                    , d = s[p]
                                    , f = e.target.options[e.prepared.name][p];
                                n(f, o, a) && (t.status = t.status = i[p],
                                    t.options = f,
                                    t.offset = t.interaction.modifierOffsets[p],
                                    d.set(t),
                                    t.status.locked && (t.modifiedCoords.x += t.status.dx,
                                        t.modifiedCoords.y += t.status.dy,
                                        u.dx += t.status.dx,
                                        u.dy += t.status.dy,
                                        u.locked = !0))
                            }
                            return u.shouldMove = !t.status || !u.locked || t.status.changed,
                                u
                        },
                        resetStatuses: function (t) {
                            for (var e = 0; e < s.names.length; e++) {
                                var n;
                                n = s.names[e];
                                var i = n
                                    , o = t[i] || {};
                                o.dx = o.dy = 0,
                                    o.modifiedX = o.modifiedY = NaN,
                                    o.locked = !1,
                                    o.changed = !0,
                                    t[i] = o
                            }
                            return t
                        },
                        start: function (t, e) {
                            var n = t.interaction
                                , i = {
                                    interaction: n,
                                    pageCoords: ("action-resume" === e ? n.curCoords : n.startCoords).page,
                                    startOffset: n.startOffset,
                                    statuses: n.modifierStatuses,
                                    preEnd: !1,
                                    requireEndOnly: !1
                                };
                            s.setOffsets(i),
                                s.resetStatuses(i.statuses),
                                i.pageCoords = r({}, n.startCoords.page),
                                n.modifierResult = s.setAll(i)
                        },
                        beforeMove: function (t) {
                            var e = t.interaction
                                , n = t.preEnd
                                , i = t.interactingBeforeMove
                                , o = s.setAll({
                                    interaction: e,
                                    preEnd: n,
                                    pageCoords: e.curCoords.page,
                                    statuses: e.modifierStatuses,
                                    requireEndOnly: !1
                                });
                            !o.shouldMove && i && (e._dontFireMove = !0),
                                e.modifierResult = o
                        },
                        end: function (t) {
                            for (var e = t.interaction, i = t.event, o = 0; o < s.names.length; o++) {
                                var r;
                                r = s.names[o];
                                var a = r;
                                if (n(e.target.options[e.prepared.name][a], !0, !0)) {
                                    e.doMove({
                                        event: i,
                                        preEnd: !0
                                    });
                                    break
                                }
                            }
                        },
                        setXY: function (t) {
                            for (var e = t.iEvent, n = t.interaction, i = r({}, t), o = 0; o < s.names.length; o++) {
                                var a = s.names[o];
                                if (i.options = n.target.options[n.prepared.name][a],
                                    i.options) {
                                    var u = s[a];
                                    i.status = n.modifierStatuses[a],
                                        e[a] = u.modifyCoords(i)
                                }
                            }
                        }
                    };
                o.signals.on("new", function (t) {
                    t.startOffset = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                        t.modifierOffsets = {},
                        t.modifierStatuses = s.resetStatuses({}),
                        t.modifierResult = null
                }),
                    o.signals.on("action-start", s.start),
                    o.signals.on("action-resume", s.start),
                    o.signals.on("before-action-move", s.beforeMove),
                    o.signals.on("action-end", s.end),
                    i.signals.on("set-xy", s.setXY),
                    e.exports = s
            }
                , {
                "../InteractEvent": 3,
                "../Interaction": 5,
                "../utils/extend": 40
            }],
            24: [function (t, e) {
                "use strict";
                function n(t, e, n) {
                    return o.is["function"](t) ? o.resolveRectLike(t, e.target, e.element, [n.x, n.y, e]) : o.resolveRectLike(t, e.target, e.element)
                }
                var i = t("./base")
                    , o = t("../utils")
                    , r = t("../defaultOptions")
                    , s = {
                        defaults: {
                            enabled: !1,
                            endOnly: !1,
                            restriction: null,
                            elementRect: null
                        },
                        setOffset: function (t) {
                            var e = t.rect
                                , n = t.startOffset
                                , i = t.options
                                , o = i && i.elementRect
                                , r = {};
                            return e && o ? (r.left = n.left - e.width * o.left,
                                r.top = n.top - e.height * o.top,
                                r.right = n.right - e.width * (1 - o.right),
                                r.bottom = n.bottom - e.height * (1 - o.bottom)) : r.left = r.top = r.right = r.bottom = 0,
                                r
                        },
                        set: function (t) {
                            var e = t.modifiedCoords
                                , i = t.interaction
                                , r = t.status
                                , s = t.options;
                            if (!s)
                                return r;
                            var a = r.useStatusXY ? {
                                x: r.x,
                                y: r.y
                            } : o.extend({}, e)
                                , u = n(s.restriction, i, a);
                            if (!u)
                                return r;
                            r.dx = 0,
                                r.dy = 0,
                                r.locked = !1;
                            var c = u
                                , l = a.x
                                , p = a.y
                                , d = i.modifierOffsets.restrict;
                            "string" != typeof u && ("x" in u && "y" in u ? (l = Math.max(Math.min(c.x + c.width - d.right, a.x), c.x + d.left),
                                p = Math.max(Math.min(c.y + c.height - d.bottom, a.y), c.y + d.top)) : (l = Math.max(Math.min(c.right - d.right, a.x), c.left + d.left),
                                    p = Math.max(Math.min(c.bottom - d.bottom, a.y), c.top + d.top)),
                                r.dx = l - a.x,
                                r.dy = p - a.y,
                                r.changed = r.modifiedX !== l || r.modifiedY !== p,
                                r.locked = !(!r.dx && !r.dy),
                                r.modifiedX = l,
                                r.modifiedY = p)
                        },
                        modifyCoords: function (t) {
                            var e = t.page
                                , n = t.client
                                , i = t.status
                                , o = t.phase
                                , r = t.options
                                , s = r && r.elementRect;
                            if (r && r.enabled && ("start" !== o || !s || !i.locked) && i.locked)
                                return e.x += i.dx,
                                    e.y += i.dy,
                                    n.x += i.dx,
                                    n.y += i.dy,
                                {
                                    dx: i.dx,
                                    dy: i.dy
                                }
                        },
                        getRestrictionRect: n
                    };
                i.restrict = s,
                    i.names.push("restrict"),
                    r.perAction.restrict = s.defaults,
                    e.exports = s
            }
                , {
                "../defaultOptions": 18,
                "../utils": 43,
                "./base": 23
            }],
            25: [function (t, e) {
                "use strict";
                var n = t("./base")
                    , i = t("../utils")
                    , o = t("../utils/rect")
                    , r = t("../defaultOptions")
                    , s = t("../actions/resize")
                    , a = t("./restrict")
                    , u = a.getRestrictionRect
                    , c = {
                        top: +Infinity,
                        left: +Infinity,
                        bottom: -Infinity,
                        right: -Infinity
                    }
                    , l = {
                        top: -Infinity,
                        left: -Infinity,
                        bottom: +Infinity,
                        right: +Infinity
                    }
                    , p = {
                        defaults: {
                            enabled: !1,
                            endOnly: !1,
                            min: null,
                            max: null,
                            offset: null
                        },
                        setOffset: function (t) {
                            var e = t.interaction
                                , n = t.startOffset
                                , o = t.options;
                            if (!o)
                                return i.extend({}, n);
                            var r = u(o.offset, e, e.startCoords.page);
                            return r ? {
                                top: n.top + r.y,
                                left: n.left + r.x,
                                bottom: n.bottom + r.y,
                                right: n.right + r.x
                            } : n
                        },
                        set: function (t) {
                            var e = t.modifiedCoords
                                , n = t.interaction
                                , r = t.status
                                , s = t.offset
                                , a = t.options
                                , p = n.prepared.linkedEdges || n.prepared.edges;
                            if (n.interacting() && p) {
                                var d = r.useStatusXY ? {
                                    x: r.x,
                                    y: r.y
                                } : i.extend({}, e)
                                    , f = o.xywhToTlbr(u(a.inner, n, d)) || c
                                    , h = o.xywhToTlbr(u(a.outer, n, d)) || l
                                    , g = d.x
                                    , v = d.y;
                                r.dx = 0,
                                    r.dy = 0,
                                    r.locked = !1,
                                    p.top ? v = Math.min(Math.max(h.top + s.top, d.y), f.top + s.top) : p.bottom && (v = Math.max(Math.min(h.bottom - s.bottom, d.y), f.bottom - s.bottom)),
                                    p.left ? g = Math.min(Math.max(h.left + s.left, d.x), f.left + s.left) : p.right && (g = Math.max(Math.min(h.right - s.right, d.x), f.right - s.right)),
                                    r.dx = g - d.x,
                                    r.dy = v - d.y,
                                    r.changed = r.modifiedX !== g || r.modifiedY !== v,
                                    r.locked = !(!r.dx && !r.dy),
                                    r.modifiedX = g,
                                    r.modifiedY = v
                            }
                        },
                        modifyCoords: function (t) {
                            var e = t.page
                                , n = t.client
                                , i = t.status
                                , o = t.phase
                                , r = t.options;
                            if (r && r.enabled && ("start" !== o || !i.locked) && i.locked)
                                return e.x += i.dx,
                                    e.y += i.dy,
                                    n.x += i.dx,
                                    n.y += i.dy,
                                {
                                    dx: i.dx,
                                    dy: i.dy
                                }
                        },
                        noInner: c,
                        noOuter: l,
                        getRestrictionRect: u
                    };
                n.restrictEdges = p,
                    n.names.push("restrictEdges"),
                    r.perAction.restrictEdges = p.defaults,
                    s.defaults.restrictEdges = p.defaults,
                    e.exports = p
            }
                , {
                "../actions/resize": 10,
                "../defaultOptions": 18,
                "../utils": 43,
                "../utils/rect": 50,
                "./base": 23,
                "./restrict": 24
            }],
            26: [function (t, e) {
                "use strict";
                var n = t("./base")
                    , i = t("./restrictEdges")
                    , o = t("../utils")
                    , r = t("../utils/rect")
                    , s = t("../defaultOptions")
                    , a = t("../actions/resize")
                    , u = {
                        width: -Infinity,
                        height: -Infinity
                    }
                    , c = {
                        width: +Infinity,
                        height: +Infinity
                    }
                    , l = {
                        defaults: {
                            enabled: !1,
                            endOnly: !1,
                            min: null,
                            max: null
                        },
                        setOffset: function (t) {
                            return t.interaction.startOffset
                        },
                        set: function (t) {
                            var e = t.interaction
                                , n = t.options
                                , s = e.prepared.linkedEdges || e.prepared.edges;
                            if (e.interacting() && s) {
                                var a = r.xywhToTlbr(e.resizeRects.inverted)
                                    , l = r.tlbrToXywh(i.getRestrictionRect(n.min, e)) || u
                                    , p = r.tlbrToXywh(i.getRestrictionRect(n.max, e)) || c;
                                t.options = {
                                    enabled: n.enabled,
                                    endOnly: n.endOnly,
                                    inner: o.extend({}, i.noInner),
                                    outer: o.extend({}, i.noOuter)
                                },
                                    s.top ? (t.options.inner.top = a.bottom - l.height,
                                        t.options.outer.top = a.bottom - p.height) : s.bottom && (t.options.inner.bottom = a.top + l.height,
                                            t.options.outer.bottom = a.top + p.height),
                                    s.left ? (t.options.inner.left = a.right - l.width,
                                        t.options.outer.left = a.right - p.width) : s.right && (t.options.inner.right = a.left + l.width,
                                            t.options.outer.right = a.left + p.width),
                                    i.set(t)
                            }
                        },
                        modifyCoords: i.modifyCoords
                    };
                n.restrictSize = l,
                    n.names.push("restrictSize"),
                    s.perAction.restrictSize = l.defaults,
                    a.defaults.restrictSize = l.defaults,
                    e.exports = l
            }
                , {
                "../actions/resize": 10,
                "../defaultOptions": 18,
                "../utils": 43,
                "../utils/rect": 50,
                "./base": 23,
                "./restrictEdges": 25
            }],
            27: [function (t, e) {
                "use strict";
                var n = t("./base")
                    , i = t("../interact")
                    , o = t("../utils")
                    , r = t("../defaultOptions")
                    , s = {
                        defaults: {
                            enabled: !1,
                            endOnly: !1,
                            range: Infinity,
                            targets: null,
                            offsets: null,
                            relativePoints: null
                        },
                        setOffset: function (t) {
                            var e = t.interaction
                                , n = t.interactable
                                , i = t.element
                                , r = t.rect
                                , s = t.startOffset
                                , a = t.options
                                , u = []
                                , c = o.rectToXY(o.resolveRectLike(a.origin))
                                , l = c || o.getOriginXY(n, i, e.prepared.name);
                            a = a || n.options[e.prepared.name].snap || {};
                            var p = void 0;
                            if ("startCoords" === a.offset)
                                p = {
                                    x: e.startCoords.page.x - l.x,
                                    y: e.startCoords.page.y - l.y
                                };
                            else {
                                var d = o.resolveRectLike(a.offset, n, i, [e]);
                                p = o.rectToXY(d) || {
                                    x: 0,
                                    y: 0
                                }
                            }
                            if (r && a.relativePoints && a.relativePoints.length)
                                for (var f = 0; f < a.relativePoints.length; f++) {
                                    var h;
                                    h = a.relativePoints[f];
                                    var g = h
                                        , v = g.x
                                        , m = g.y;
                                    u.push({
                                        x: s.left - r.width * v + p.x,
                                        y: s.top - r.height * m + p.y
                                    })
                                }
                            else
                                u.push(p);
                            return u
                        },
                        set: function (t) {
                            var e = t.interaction
                                , n = t.modifiedCoords
                                , i = t.status
                                , r = t.options
                                , s = t.offset
                                , a = []
                                , u = void 0
                                , c = void 0
                                , l = void 0;
                            if (i.useStatusXY)
                                c = {
                                    x: i.x,
                                    y: i.y
                                };
                            else {
                                var p = o.getOriginXY(e.target, e.element, e.prepared.name);
                                c = o.extend({}, n),
                                    c.x -= p.x,
                                    c.y -= p.y
                            }
                            i.realX = c.x,
                                i.realY = c.y;
                            for (var d = r.targets ? r.targets.length : 0, f = 0; f < s.length; f++) {
                                var h;
                                h = s[f];
                                for (var g = h, v = g.x, m = g.y, y = c.x - v, x = c.y - m, b = 0; b < r.targets.length; b++) {
                                    var w;
                                    w = r.targets[b];
                                    var S = w;
                                    u = o.is["function"](S) ? S(y, x, e) : S,
                                        u && a.push({
                                            x: o.is.number(u.x) ? u.x + v : y,
                                            y: o.is.number(u.y) ? u.y + m : x,
                                            range: o.is.number(u.range) ? u.range : r.range
                                        })
                                }
                            }
                            var E = {
                                target: null,
                                inRange: !1,
                                distance: 0,
                                range: 0,
                                dx: 0,
                                dy: 0
                            };
                            for (l = 0,
                                d = a.length; l < d; l++) {
                                u = a[l];
                                var C = u.range
                                    , T = u.x - c.x
                                    , _ = u.y - c.y
                                    , I = o.hypot(T, _)
                                    , M = I <= C;
                                C === Infinity && E.inRange && E.range !== Infinity && (M = !1),
                                    E.target && !(M ? E.inRange && C !== Infinity ? I / C < E.distance / E.range : C === Infinity && E.range !== Infinity || I < E.distance : !E.inRange && I < E.distance) || (E.target = u,
                                        E.distance = I,
                                        E.range = C,
                                        E.inRange = M,
                                        E.dx = T,
                                        E.dy = _,
                                        i.range = C)
                            }
                            var O = void 0;
                            E.target ? (O = i.modifiedX !== E.target.x || i.modifiedY !== E.target.y,
                                i.modifiedX = E.target.x,
                                i.modifiedY = E.target.y) : (O = !0,
                                    i.modifiedX = NaN,
                                    i.modifiedY = NaN),
                                i.dx = E.dx,
                                i.dy = E.dy,
                                i.changed = O || E.inRange && !i.locked,
                                i.locked = E.inRange
                        },
                        modifyCoords: function (t) {
                            var e = t.page
                                , n = t.client
                                , i = t.status
                                , o = t.phase
                                , r = t.options
                                , s = r && r.relativePoints;
                            if (r && r.enabled && ("start" !== o || !s || !s.length))
                                return i.locked && (e.x += i.dx,
                                    e.y += i.dy,
                                    n.x += i.dx,
                                    n.y += i.dy),
                                {
                                    range: i.range,
                                    locked: i.locked,
                                    x: i.modifiedX,
                                    y: i.modifiedY,
                                    realX: i.realX,
                                    realY: i.realY,
                                    dx: i.dx,
                                    dy: i.dy
                                }
                        }
                    };
                i.createSnapGrid = function (t) {
                    return function (e, n) {
                        var i = t.limits || {
                            left: -Infinity,
                            right: Infinity,
                            top: -Infinity,
                            bottom: Infinity
                        }
                            , r = 0
                            , s = 0;
                        o.is.object(t.offset) && (r = t.offset.x,
                            s = t.offset.y);
                        var a = Math.round((e - r) / t.x)
                            , u = Math.round((n - s) / t.y);
                        return {
                            x: Math.max(i.left, Math.min(i.right, a * t.x + r)),
                            y: Math.max(i.top, Math.min(i.bottom, u * t.y + s)),
                            range: t.range
                        }
                    }
                }
                    ,
                    n.snap = s,
                    n.names.push("snap"),
                    r.perAction.snap = s.defaults,
                    e.exports = s
            }
                , {
                "../defaultOptions": 18,
                "../interact": 21,
                "../utils": 43,
                "./base": 23
            }],
            28: [function (t, e) {
                "use strict";
                var n = t("./base")
                    , i = t("./snap")
                    , o = t("../defaultOptions")
                    , r = t("../actions/resize")
                    , s = t("../utils/")
                    , a = {
                        defaults: {
                            enabled: !1,
                            endOnly: !1,
                            range: Infinity,
                            targets: null,
                            offsets: null
                        },
                        setOffset: function (t) {
                            var e = t.interaction
                                , n = t.options
                                , o = e.prepared.edges;
                            if (o) {
                                t.options = {
                                    relativePoints: [{
                                        x: o.left ? 0 : 1,
                                        y: o.top ? 0 : 1
                                    }],
                                    origin: {
                                        x: 0,
                                        y: 0
                                    },
                                    offset: "self",
                                    range: n.range
                                };
                                var r = i.setOffset(t);
                                return t.options = n,
                                    r
                            }
                        },
                        set: function (t) {
                            var e = t.interaction
                                , n = t.options
                                , o = t.offset
                                , r = t.modifiedCoords
                                , a = s.extend({}, r)
                                , u = a.x - o[0].x
                                , c = a.y - o[0].y;
                            t.options = s.extend({}, n),
                                t.options.targets = [];
                            for (var l = 0; l < n.targets.length; l++) {
                                var p;
                                p = n.targets[l];
                                var d = p
                                    , f = void 0;
                                f = s.is["function"](d) ? d(u, c, e) : d,
                                    f && ("width" in f && "height" in f && (f.x = f.width,
                                        f.y = f.height),
                                        t.options.targets.push(f))
                            }
                            i.set(t)
                        },
                        modifyCoords: function (t) {
                            var e = t.options;
                            t.options = s.extend({}, e),
                                t.options.enabled = e.enabled,
                                t.options.relativePoints = [null],
                                i.modifyCoords(t)
                        }
                    };
                n.snapSize = a,
                    n.names.push("snapSize"),
                    o.perAction.snapSize = a.defaults,
                    r.defaults.snapSize = a.defaults,
                    e.exports = a
            }
                , {
                "../actions/resize": 10,
                "../defaultOptions": 18,
                "../utils/": 43,
                "./base": 23,
                "./snap": 27
            }],
            29: [function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = t("../utils/pointerUtils");
                e.exports = function () {
                    function t(e, o, r, s, a) {
                        if (n(this, t),
                            i.pointerExtend(this, r),
                            r !== o && i.pointerExtend(this, o),
                            this.interaction = a,
                            this.timeStamp = (new Date).getTime(),
                            this.originalEvent = r,
                            this.type = e,
                            this.pointerId = i.getPointerId(o),
                            this.pointerType = i.getPointerType(o),
                            this.target = s,
                            this.currentTarget = null,
                            "tap" === e) {
                            var u = a.getPointerIndex(o);
                            this.dt = this.timeStamp - a.downTimes[u];
                            var c = this.timeStamp - a.tapTime;
                            this["double"] = !!(a.prevTap && "doubletap" !== a.prevTap.type && a.prevTap.target === this.target && c < 500)
                        } else
                            "doubletap" === e && (this.dt = o.timeStamp - a.tapTime)
                    }
                    return t.prototype.subtractOrigin = function (t) {
                        var e = t.x
                            , n = t.y;
                        return this.pageX -= e,
                            this.pageY -= n,
                            this.clientX -= e,
                            this.clientY -= n,
                            this
                    }
                        ,
                        t.prototype.addOrigin = function (t) {
                            var e = t.x
                                , n = t.y;
                            return this.pageX += e,
                                this.pageY += n,
                                this.clientX += e,
                                this.clientY += n,
                                this
                        }
                        ,
                        t.prototype.preventDefault = function () {
                            this.originalEvent.preventDefault()
                        }
                        ,
                        t.prototype.stopPropagation = function () {
                            this.propagationStopped = !0
                        }
                        ,
                        t.prototype.stopImmediatePropagation = function () {
                            this.immediatePropagationStopped = this.propagationStopped = !0
                        }
                        ,
                        t
                }()
            }
                , {
                "../utils/pointerUtils": 48
            }],
            30: [function (t, e) {
                "use strict";
                function n(t) {
                    for (var e = t.interaction, o = t.pointer, s = t.event, u = t.eventTarget, l = t.type, p = l === undefined ? t.pointerEvent.type : l, d = t.targets, f = d === undefined ? i(t) : d, h = t.pointerEvent, g = h === undefined ? new r(p, o, s, u, e) : h, v = {
                        interaction: e,
                        pointer: o,
                        event: s,
                        eventTarget: u,
                        targets: f,
                        type: p,
                        pointerEvent: g
                    }, m = 0; m < f.length; m++) {
                        var y = f[m];
                        for (var x in y.props || {})
                            g[x] = y.props[x];
                        var b = a.getOriginXY(y.eventable, y.element);
                        if (g.subtractOrigin(b),
                            g.eventable = y.eventable,
                            g.currentTarget = y.element,
                            y.eventable.fire(g),
                            g.addOrigin(b),
                            g.immediatePropagationStopped || g.propagationStopped && m + 1 < f.length && f[m + 1].element !== g.currentTarget)
                            break
                    }
                    if (c.fire("fired", v),
                        "tap" === p) {
                        var w = g["double"] ? n({
                            interaction: e,
                            pointer: o,
                            event: s,
                            eventTarget: u,
                            type: "doubletap"
                        }) : g;
                        e.prevTap = w,
                            e.tapTime = w.timeStamp
                    }
                    return g
                }
                function i(t) {
                    var e = t.interaction
                        , n = t.pointer
                        , i = t.event
                        , o = t.eventTarget
                        , r = t.type
                        , s = e.getPointerIndex(n);
                    if ("tap" === r && (e.pointerWasMoved || !e.downTargets[s] || e.downTargets[s] !== o))
                        return [];
                    for (var u = a.getPath(o), l = {
                        interaction: e,
                        pointer: n,
                        event: i,
                        eventTarget: o,
                        type: r,
                        path: u,
                        targets: [],
                        element: null
                    }, p = 0; p < u.length; p++) {
                        var d;
                        d = u[p];
                        var f = d;
                        l.element = f,
                            c.fire("collect-targets", l)
                    }
                    return "hold" === r && (l.targets = l.targets.filter(function (t) {
                        return t.eventable.options.holdDuration === e.holdTimers[s].duration
                    })),
                        l.targets
                }
                function o(t) {
                    return function (e) {
                        var i = e.interaction
                            , o = e.pointer
                            , r = e.event;
                        n({
                            interaction: i,
                            eventTarget: e.eventTarget,
                            pointer: o,
                            event: r,
                            type: t
                        })
                    }
                }
                var r = t("./PointerEvent")
                    , s = t("../Interaction")
                    , a = t("../utils")
                    , u = t("../defaultOptions")
                    , c = t("../utils/Signals")["new"]()
                    , l = ["down", "up", "cancel"]
                    , p = ["down", "up", "cancel"]
                    , d = {
                        PointerEvent: r,
                        fire: n,
                        collectEventTargets: i,
                        signals: c,
                        defaults: {
                            holdDuration: 600,
                            ignoreFrom: null,
                            allowFrom: null,
                            origin: {
                                x: 0,
                                y: 0
                            }
                        },
                        types: ["down", "move", "up", "cancel", "tap", "doubletap", "hold"]
                    };
                s.signals.on("update-pointer-down", function (t) {
                    var e = t.interaction
                        , n = t.pointerIndex;
                    e.holdTimers[n] = {
                        duration: Infinity,
                        timeout: null
                    }
                }),
                    s.signals.on("remove-pointer", function (t) {
                        var e = t.interaction
                            , n = t.pointerIndex;
                        e.holdTimers.splice(n, 1)
                    }),
                    s.signals.on("move", function (t) {
                        var e = t.interaction
                            , i = t.pointer
                            , o = t.event
                            , r = t.eventTarget
                            , s = t.duplicateMove
                            , a = e.getPointerIndex(i);
                        s || e.pointerIsDown && !e.pointerWasMoved || (e.pointerIsDown && clearTimeout(e.holdTimers[a].timeout),
                            n({
                                interaction: e,
                                pointer: i,
                                event: o,
                                eventTarget: r,
                                type: "move"
                            }))
                    }),
                    s.signals.on("down", function (t) {
                        for (var e = t.interaction, i = t.pointer, o = t.event, r = t.eventTarget, s = t.pointerIndex, u = e.holdTimers[s], l = a.getPath(r), p = {
                            interaction: e,
                            pointer: i,
                            event: o,
                            eventTarget: r,
                            type: "hold",
                            targets: [],
                            path: l,
                            element: null
                        }, d = 0; d < l.length; d++) {
                            var f;
                            f = l[d];
                            var h = f;
                            p.element = h,
                                c.fire("collect-targets", p)
                        }
                        if (p.targets.length) {
                            for (var g = Infinity, v = 0; v < p.targets.length; v++) {
                                var m;
                                m = p.targets[v];
                                var y = m
                                    , x = y.eventable.options.holdDuration;
                                x < g && (g = x)
                            }
                            u.duration = g,
                                u.timeout = setTimeout(function () {
                                    n({
                                        interaction: e,
                                        eventTarget: r,
                                        pointer: i,
                                        event: o,
                                        type: "hold"
                                    })
                                }, g)
                        }
                    }),
                    s.signals.on("up", function (t) {
                        var e = t.interaction
                            , i = t.pointer
                            , o = t.event
                            , r = t.eventTarget;
                        e.pointerWasMoved || n({
                            interaction: e,
                            eventTarget: r,
                            pointer: i,
                            event: o,
                            type: "tap"
                        })
                    });
                for (var f = ["up", "cancel"], h = 0; h < f.length; h++) {
                    var g = f[h];
                    s.signals.on(g, function (t) {
                        var e = t.interaction
                            , n = t.pointerIndex;
                        e.holdTimers[n] && clearTimeout(e.holdTimers[n].timeout)
                    })
                }
                for (var v = 0; v < l.length; v++)
                    s.signals.on(l[v], o(p[v]));
                s.signals.on("new", function (t) {
                    t.prevTap = null,
                        t.tapTime = 0,
                        t.holdTimers = []
                }),
                    u.pointerEvents = d.defaults,
                    e.exports = d
            }
                , {
                "../Interaction": 5,
                "../defaultOptions": 18,
                "../utils": 43,
                "../utils/Signals": 34,
                "./PointerEvent": 29
            }],
            31: [function (t, e) {
                "use strict";
                function n(t) {
                    var e = t.pointerEvent;
                    "hold" === e.type && (e.count = (e.count || 0) + 1)
                }
                function i(t) {
                    var e = t.interaction
                        , n = t.pointerEvent
                        , i = t.eventTarget
                        , o = t.targets;
                    if ("hold" === n.type && o.length) {
                        var s = o[0].eventable.options.holdRepeatInterval;
                        s <= 0 || (e.holdIntervalHandle = setTimeout(function () {
                            r.fire({
                                interaction: e,
                                eventTarget: i,
                                type: "hold",
                                pointer: n,
                                event: n
                            })
                        }, s))
                    }
                }
                function o(t) {
                    var e = t.interaction;
                    e.holdIntervalHandle && (clearInterval(e.holdIntervalHandle),
                        e.holdIntervalHandle = null)
                }
                var r = t("./base")
                    , s = t("../Interaction");
                r.signals.on("new", n),
                    r.signals.on("fired", i);
                for (var a = ["move", "up", "cancel", "endall"], u = 0; u < a.length; u++) {
                    var c = a[u];
                    s.signals.on(c, o)
                }
                r.defaults.holdRepeatInterval = 0,
                    r.types.push("holdrepeat"),
                    e.exports = {
                        onNew: n,
                        onFired: i,
                        endHoldRepeat: o
                    }
            }
                , {
                "../Interaction": 5,
                "./base": 30
            }],
            32: [function (t) {
                "use strict";
                var e = t("./base")
                    , n = t("../Interactable")
                    , i = t("../utils/is")
                    , o = t("../scope")
                    , r = t("../utils/extend")
                    , s = t("../utils/arr")
                    , a = s.merge;
                e.signals.on("collect-targets", function (t) {
                    var e = t.targets
                        , n = t.element
                        , r = t.type
                        , s = t.eventTarget;
                    o.interactables.forEachMatch(n, function (t) {
                        var o = t.events
                            , a = o.options;
                        o[r] && i.element(n) && t.testIgnoreAllow(a, n, s) && e.push({
                            element: n,
                            eventable: o,
                            props: {
                                interactable: t
                            }
                        })
                    })
                }),
                    n.signals.on("new", function (t) {
                        var e = t.interactable;
                        e.events.getRect = function (t) {
                            return e.getRect(t)
                        }
                    }),
                    n.signals.on("set", function (t) {
                        var n = t.interactable
                            , i = t.options;
                        r(n.events.options, e.defaults),
                            r(n.events.options, i)
                    }),
                    a(n.eventTypes, e.types),
                    n.prototype.pointerEvents = function (t) {
                        return r(this.events.options, t),
                            this
                    }
                    ;
                var u = n.prototype._backCompatOption;
                n.prototype._backCompatOption = function (t, e) {
                    var n = u.call(this, t, e);
                    return n === this && (this.events.options[t] = e),
                        n
                }
                    ,
                    n.settingsMethods.push("pointerEvents")
            }
                , {
                "../Interactable": 4,
                "../scope": 33,
                "../utils/arr": 35,
                "../utils/extend": 40,
                "../utils/is": 45,
                "./base": 30
            }],
            33: [function (t, e) {
                "use strict";
                var n = t("./utils")
                    , i = t("./utils/events")
                    , o = t("./utils/Signals")["new"]()
                    , r = t("./utils/window")
                    , s = r.getWindow
                    , a = {
                        signals: o,
                        events: i,
                        utils: n,
                        document: t("./utils/domObjects").document,
                        documents: [],
                        addDocument: function (t, e) {
                            if (n.contains(a.documents, t))
                                return !1;
                            e = e || s(t),
                                a.documents.push(t),
                                i.documents.push(t),
                                t !== a.document && i.add(e, "unload", a.onWindowUnload),
                                o.fire("add-document", {
                                    doc: t,
                                    win: e
                                })
                        },
                        removeDocument: function (t, e) {
                            var n = a.documents.indexOf(t);
                            e = e || s(t),
                                i.remove(e, "unload", a.onWindowUnload),
                                a.documents.splice(n, 1),
                                i.documents.splice(n, 1),
                                o.fire("remove-document", {
                                    win: e,
                                    doc: t
                                })
                        },
                        onWindowUnload: function () {
                            a.removeDocument(this.document, this)
                        }
                    };
                e.exports = a
            }
                , {
                "./utils": 43,
                "./utils/Signals": 34,
                "./utils/domObjects": 37,
                "./utils/events": 39,
                "./utils/window": 51
            }],
            34: [function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = function () {
                    function t() {
                        n(this, t),
                            this.listeners = {}
                    }
                    return t.prototype.on = function (t, e) {
                        if (!this.listeners[t])
                            return void (this.listeners[t] = [e]);
                        this.listeners[t].push(e)
                    }
                        ,
                        t.prototype.off = function (t, e) {
                            if (this.listeners[t]) {
                                var n = this.listeners[t].indexOf(e);
                                -1 !== n && this.listeners[t].splice(n, 1)
                            }
                        }
                        ,
                        t.prototype.fire = function (t, e) {
                            var n = this.listeners[t];
                            if (n)
                                for (var i = 0; i < n.length; i++) {
                                    var o;
                                    o = n[i];
                                    var r = o;
                                    if (!1 === r(e, t))
                                        return
                                }
                        }
                        ,
                        t
                }();
                i["new"] = function () {
                    return new i
                }
                    ,
                    e.exports = i
            }
                , {}],
            35: [function (t, e) {
                "use strict";
                function n(t, e) {
                    return -1 !== t.indexOf(e)
                }
                function i(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i;
                        i = e[n];
                        var o = i;
                        t.push(o)
                    }
                    return t
                }
                e.exports = {
                    contains: n,
                    merge: i
                }
            }
                , {}],
            36: [function (t, e) {
                "use strict";
                var n = t("./window")
                    , i = n.window
                    , o = t("./is")
                    , r = t("./domObjects")
                    , s = r.Element
                    , a = i.navigator
                    , u = {
                        supportsTouch: !!("ontouchstart" in i || o["function"](i.DocumentTouch) && r.document instanceof i.DocumentTouch),
                        supportsPointerEvent: !!r.PointerEvent,
                        isIOS7: /iP(hone|od|ad)/.test(a.platform) && /OS 7[^\d]/.test(a.appVersion),
                        isIe9: /MSIE 9/.test(a.userAgent),
                        prefixedMatchesSelector: "matches" in s.prototype ? "matches" : "webkitMatchesSelector" in s.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in s.prototype ? "mozMatchesSelector" : "oMatchesSelector" in s.prototype ? "oMatchesSelector" : "msMatchesSelector",
                        pEventTypes: r.PointerEvent ? r.PointerEvent === i.MSPointerEvent ? {
                            up: "MSPointerUp",
                            down: "MSPointerDown",
                            over: "mouseover",
                            out: "mouseout",
                            move: "MSPointerMove",
                            cancel: "MSPointerCancel"
                        } : {
                            up: "pointerup",
                            down: "pointerdown",
                            over: "pointerover",
                            out: "pointerout",
                            move: "pointermove",
                            cancel: "pointercancel"
                        } : null,
                        wheelEvent: "onmousewheel" in r.document ? "mousewheel" : "wheel"
                    };
                u.isOperaMobile = "Opera" === a.appName && u.supportsTouch && a.userAgent.match("Presto"),
                    e.exports = u
            }
                , {
                "./domObjects": 37,
                "./is": 45,
                "./window": 51
            }],
            37: [function (t, e) {
                "use strict";
                function n() { }
                var i = {}
                    , o = t("./window").window;
                i.document = o.document,
                    i.DocumentFragment = o.DocumentFragment || n,
                    i.SVGElement = o.SVGElement || n,
                    i.SVGSVGElement = o.SVGSVGElement || n,
                    i.SVGElementInstance = o.SVGElementInstance || n,
                    i.Element = o.Element || n,
                    i.HTMLElement = o.HTMLElement || i.Element,
                    i.Event = o.Event,
                    i.Touch = o.Touch || n,
                    i.PointerEvent = o.PointerEvent || o.MSPointerEvent,
                    e.exports = i
            }
                , {
                "./window": 51
            }],
            38: [function (t, e) {
                "use strict";
                var n = t("./window")
                    , i = t("./browser")
                    , o = t("./is")
                    , r = t("./domObjects")
                    , s = {
                        nodeContains: function (t, e) {
                            for (; e;) {
                                if (e === t)
                                    return !0;
                                e = e.parentNode
                            }
                            return !1
                        },
                        closest: function (t, e) {
                            for (; o.element(t);) {
                                if (s.matchesSelector(t, e))
                                    return t;
                                t = s.parentNode(t)
                            }
                            return null
                        },
                        parentNode: function (t) {
                            var e = t.parentNode;
                            if (o.docFrag(e)) {
                                for (; (e = e.host) && o.docFrag(e);)
                                    ;
                                return e
                            }
                            return e
                        },
                        matchesSelector: function (t, e) {
                            return n.window !== n.realWindow && (e = e.replace(/\/deep\//g, " ")),
                                t[i.prefixedMatchesSelector](e)
                        },
                        indexOfDeepestElement: function (t) {
                            var e = []
                                , n = []
                                , i = void 0
                                , o = t[0]
                                , s = o ? 0 : -1
                                , a = void 0
                                , u = void 0
                                , c = void 0
                                , l = void 0;
                            for (c = 1; c < t.length; c++)
                                if ((i = t[c]) && i !== o)
                                    if (o) {
                                        if (i.parentNode !== i.ownerDocument)
                                            if (o.parentNode !== i.ownerDocument) {
                                                if (!e.length)
                                                    for (a = o; a.parentNode && a.parentNode !== a.ownerDocument;)
                                                        e.unshift(a),
                                                            a = a.parentNode;
                                                if (o instanceof r.HTMLElement && i instanceof r.SVGElement && !(i instanceof r.SVGSVGElement)) {
                                                    if (i === o.parentNode)
                                                        continue;
                                                    a = i.ownerSVGElement
                                                } else
                                                    a = i;
                                                for (n = []; a.parentNode !== a.ownerDocument;)
                                                    n.unshift(a),
                                                        a = a.parentNode;
                                                for (l = 0; n[l] && n[l] === e[l];)
                                                    l++;
                                                var p = [n[l - 1], n[l], e[l]];
                                                for (u = p[0].lastChild; u;) {
                                                    if (u === p[1]) {
                                                        o = i,
                                                            s = c,
                                                            e = [];
                                                        break
                                                    }
                                                    if (u === p[2])
                                                        break;
                                                    u = u.previousSibling
                                                }
                                            } else
                                                o = i,
                                                    s = c
                                    } else
                                        o = i,
                                            s = c;
                            return s
                        },
                        matchesUpTo: function (t, e, n) {
                            for (; o.element(t);) {
                                if (s.matchesSelector(t, e))
                                    return !0;
                                if ((t = s.parentNode(t)) === n)
                                    return s.matchesSelector(t, e)
                            }
                            return !1
                        },
                        getActualElement: function (t) {
                            return t instanceof r.SVGElementInstance ? t.correspondingUseElement : t
                        },
                        getScrollXY: function (t) {
                            return t = t || n.window,
                            {
                                x: t.scrollX || t.document.documentElement.scrollLeft,
                                y: t.scrollY || t.document.documentElement.scrollTop
                            }
                        },
                        getElementClientRect: function (t) {
                            var e = t instanceof r.SVGElement ? t.getBoundingClientRect() : t.getClientRects()[0];
                            return e && {
                                left: e.left,
                                right: e.right,
                                top: e.top,
                                bottom: e.bottom,
                                width: e.width || e.right - e.left,
                                height: e.height || e.bottom - e.top
                            }
                        },
                        getElementRect: function (t) {
                            var e = s.getElementClientRect(t);
                            if (!i.isIOS7 && e) {
                                var o = s.getScrollXY(n.getWindow(t));
                                e.left += o.x,
                                    e.right += o.x,
                                    e.top += o.y,
                                    e.bottom += o.y
                            }
                            return e
                        },
                        getPath: function (t) {
                            for (var e = []; t;)
                                e.push(t),
                                    t = s.parentNode(t);
                            return e
                        },
                        trySelector: function (t) {
                            return !!o.string(t) && (r.document.querySelector(t),
                                !0)
                        }
                    };
                e.exports = s
            }
                , {
                "./browser": 36,
                "./domObjects": 37,
                "./is": 45,
                "./window": 51
            }],
            39: [function (t, e) {
                "use strict";
                function n(t, e, n, i) {
                    var o = c(i)
                        , r = y.indexOf(t)
                        , s = x[r];
                    s || (s = {
                        events: {},
                        typeCount: 0
                    },
                        r = y.push(t) - 1,
                        x.push(s)),
                        s.events[e] || (s.events[e] = [],
                            s.typeCount++),
                        m(s.events[e], n) || (t.addEventListener(e, n, S ? o : !!o.capture),
                            s.events[e].push(n))
                }
                function i(t, e, n, o) {
                    var r = c(o)
                        , s = y.indexOf(t)
                        , a = x[s];
                    if (a && a.events)
                        if ("all" !== e) {
                            if (a.events[e]) {
                                var u = a.events[e].length;
                                if ("all" === n) {
                                    for (var l = 0; l < u; l++)
                                        i(t, e, a.events[e][l], r);
                                    return
                                }
                                for (var p = 0; p < u; p++)
                                    if (a.events[e][p] === n) {
                                        t.removeEventListener("on" + e, n, S ? r : !!r.capture),
                                            a.events[e].splice(p, 1);
                                        break
                                    }
                                a.events[e] && 0 === a.events[e].length && (a.events[e] = null,
                                    a.typeCount--)
                            }
                            a.typeCount || (x.splice(s, 1),
                                y.splice(s, 1))
                        } else
                            for (e in a.events)
                                a.events.hasOwnProperty(e) && i(t, e, "all")
                }
                function o(t, e, i, o, r) {
                    var u = c(r);
                    if (!b[i]) {
                        b[i] = {
                            selectors: [],
                            contexts: [],
                            listeners: []
                        };
                        for (var l = 0; l < w.length; l++) {
                            var p = w[l];
                            n(p, i, s),
                                n(p, i, a, !0)
                        }
                    }
                    var d = b[i]
                        , f = void 0;
                    for (f = d.selectors.length - 1; f >= 0 && (d.selectors[f] !== t || d.contexts[f] !== e); f--)
                        ;
                    -1 === f && (f = d.selectors.length,
                        d.selectors.push(t),
                        d.contexts.push(e),
                        d.listeners.push([])),
                        d.listeners[f].push([o, !!u.capture, u.passive])
                }
                function r(t, e, n, o, r) {
                    var u = c(r)
                        , l = b[n]
                        , p = !1
                        , d = void 0;
                    if (l)
                        for (d = l.selectors.length - 1; d >= 0; d--)
                            if (l.selectors[d] === t && l.contexts[d] === e) {
                                for (var f = l.listeners[d], h = f.length - 1; h >= 0; h--) {
                                    var g = f[h]
                                        , v = g[0]
                                        , m = g[1]
                                        , y = g[2];
                                    if (v === o && m === !!u.capture && y === u.passive) {
                                        f.splice(h, 1),
                                            f.length || (l.selectors.splice(d, 1),
                                                l.contexts.splice(d, 1),
                                                l.listeners.splice(d, 1),
                                                i(e, n, s),
                                                i(e, n, a, !0),
                                                l.selectors.length || (b[n] = null)),
                                            p = !0;
                                        break
                                    }
                                }
                                if (p)
                                    break
                            }
                }
                function s(t, e) {
                    var n = c(e)
                        , i = {}
                        , o = b[t.type]
                        , r = d.getEventTargets(t)
                        , s = r[0]
                        , a = s;
                    for (f(i, t),
                        i.originalEvent = t,
                        i.preventDefault = u; l.element(a);) {
                        for (var h = 0; h < o.selectors.length; h++) {
                            var g = o.selectors[h]
                                , v = o.contexts[h];
                            if (p.matchesSelector(a, g) && p.nodeContains(v, s) && p.nodeContains(v, a)) {
                                var m = o.listeners[h];
                                i.currentTarget = a;
                                for (var y = 0; y < m.length; y++) {
                                    var x = m[y]
                                        , w = x[0]
                                        , S = x[1]
                                        , E = x[2];
                                    S === !!n.capture && E === n.passive && w(i)
                                }
                            }
                        }
                        a = p.parentNode(a)
                    }
                }
                function a(t) {
                    return s.call(this, t, !0)
                }
                function u() {
                    this.originalEvent.preventDefault()
                }
                function c(t) {
                    return l.object(t) ? t : {
                        capture: t
                    }
                }
                var l = t("./is")
                    , p = t("./domUtils")
                    , d = t("./pointerUtils")
                    , f = t("./pointerExtend")
                    , h = t("./window")
                    , g = h.window
                    , v = t("./arr")
                    , m = v.contains
                    , y = []
                    , x = []
                    , b = {}
                    , w = []
                    , S = function () {
                        var t = !1;
                        return g.document.createElement("div").addEventListener("test", null, {
                            get capture() {
                                t = !0
                            }
                        }),
                            t
                    }();
                e.exports = {
                    add: n,
                    remove: i,
                    addDelegate: o,
                    removeDelegate: r,
                    delegateListener: s,
                    delegateUseCapture: a,
                    delegatedEvents: b,
                    documents: w,
                    supportsOptions: S,
                    _elements: y,
                    _targets: x
                }
            }
                , {
                "./arr": 35,
                "./domUtils": 38,
                "./is": 45,
                "./pointerExtend": 47,
                "./pointerUtils": 48,
                "./window": 51
            }],
            40: [function (t, e) {
                "use strict";
                e.exports = function (t, e) {
                    for (var n in e)
                        t[n] = e[n];
                    return t
                }
            }
                , {}],
            41: [function (t, e) {
                "use strict";
                var n = t("./rect")
                    , i = n.resolveRectLike
                    , o = n.rectToXY;
                e.exports = function (t, e, n) {
                    var r = t.options[n]
                        , s = r && r.origin
                        , a = s || t.options.origin
                        , u = i(a, t, e, [t && e]);
                    return o(u) || {
                        x: 0,
                        y: 0
                    }
                }
            }
                , {
                "./rect": 50
            }],
            42: [function (t, e) {
                "use strict";
                e.exports = function (t, e) {
                    return Math.sqrt(t * t + e * e)
                }
            }
                , {}],
            43: [function (t, e) {
                "use strict";
                var n = t("./extend")
                    , i = t("./window")
                    , o = {
                        warnOnce: function (t, e) {
                            var n = !1;
                            return function () {
                                return n || (i.window.console.warn(e),
                                    n = !0),
                                    t.apply(this, arguments)
                            }
                        },
                        _getQBezierValue: function (t, e, n, i) {
                            var o = 1 - t;
                            return o * o * e + 2 * o * t * n + t * t * i
                        },
                        getQuadraticCurvePoint: function (t, e, n, i, r, s, a) {
                            return {
                                x: o._getQBezierValue(a, t, n, r),
                                y: o._getQBezierValue(a, e, i, s)
                            }
                        },
                        easeOutQuad: function (t, e, n, i) {
                            return t /= i,
                                -n * t * (t - 2) + e
                        },
                        copyAction: function (t, e) {
                            return t.name = e.name,
                                t.axis = e.axis,
                                t.edges = e.edges,
                                t
                        },
                        is: t("./is"),
                        extend: n,
                        hypot: t("./hypot"),
                        getOriginXY: t("./getOriginXY")
                    };
                n(o, t("./arr")),
                    n(o, t("./domUtils")),
                    n(o, t("./pointerUtils")),
                    n(o, t("./rect")),
                    e.exports = o
            }
                , {
                "./arr": 35,
                "./domUtils": 38,
                "./extend": 40,
                "./getOriginXY": 41,
                "./hypot": 42,
                "./is": 45,
                "./pointerUtils": 48,
                "./rect": 50,
                "./window": 51
            }],
            44: [function (t, e) {
                "use strict";
                var n = t("../scope")
                    , i = t("./index")
                    , o = {
                        methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
                        search: function (t, e, n) {
                            for (var r = i.getPointerType(t), s = i.getPointerId(t), a = {
                                pointer: t,
                                pointerId: s,
                                pointerType: r,
                                eventType: e,
                                eventTarget: n
                            }, u = 0; u < o.methodOrder.length; u++) {
                                var c;
                                c = o.methodOrder[u];
                                var l = c
                                    , p = o[l](a);
                                if (p)
                                    return p
                            }
                        },
                        simulationResume: function (t) {
                            var e = t.pointerType
                                , o = t.eventType
                                , r = t.eventTarget;
                            if (!/down|start/i.test(o))
                                return null;
                            for (var s = 0; s < n.interactions.length; s++) {
                                var a;
                                a = n.interactions[s];
                                var u = a
                                    , c = r;
                                if (u.simulation && u.simulation.allowResume && u.pointerType === e)
                                    for (; c;) {
                                        if (c === u.element)
                                            return u;
                                        c = i.parentNode(c)
                                    }
                            }
                            return null
                        },
                        mouseOrPen: function (t) {
                            var e = t.pointerId
                                , o = t.pointerType
                                , r = t.eventType;
                            if ("mouse" !== o && "pen" !== o)
                                return null;
                            for (var s = void 0, a = 0; a < n.interactions.length; a++) {
                                var u;
                                u = n.interactions[a];
                                var c = u;
                                if (c.pointerType === o) {
                                    if (c.simulation && !i.contains(c.pointerIds, e))
                                        continue;
                                    if (c.interacting())
                                        return c;
                                    s || (s = c)
                                }
                            }
                            if (s)
                                return s;
                            for (var l = 0; l < n.interactions.length; l++) {
                                var p;
                                p = n.interactions[l];
                                var d = p;
                                if (!(d.pointerType !== o || /down/i.test(r) && d.simulation))
                                    return d
                            }
                            return null
                        },
                        hasPointer: function (t) {
                            for (var e = t.pointerId, o = 0; o < n.interactions.length; o++) {
                                var r;
                                r = n.interactions[o];
                                var s = r;
                                if (i.contains(s.pointerIds, e))
                                    return s
                            }
                        },
                        idle: function (t) {
                            for (var e = t.pointerType, i = 0; i < n.interactions.length; i++) {
                                var o;
                                o = n.interactions[i];
                                var r = o;
                                if (1 === r.pointerIds.length) {
                                    var s = r.target;
                                    if (s && !s.options.gesture.enabled)
                                        continue
                                } else if (r.pointerIds.length >= 2)
                                    continue;
                                if (!r.interacting() && e === r.pointerType)
                                    return r
                            }
                            return null
                        }
                    };
                e.exports = o
            }
                , {
                "../scope": 33,
                "./index": 43
            }],
            45: [function (t, e) {
                "use strict";
                var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                }
                    : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }
                    , i = t("./window")
                    , o = t("./isWindow")
                    , r = {
                        array: function () { },
                        window: function (t) {
                            return t === i.window || o(t)
                        },
                        docFrag: function (t) {
                            return r.object(t) && 11 === t.nodeType
                        },
                        object: function (t) {
                            return !!t && "object" === (void 0 === t ? "undefined" : n(t))
                        },
                        "function": function (t) {
                            return "function" == typeof t
                        },
                        number: function (t) {
                            return "number" == typeof t
                        },
                        bool: function (t) {
                            return "boolean" == typeof t
                        },
                        string: function (t) {
                            return "string" == typeof t
                        },
                        element: function (t) {
                            if (!t || "object" !== (void 0 === t ? "undefined" : n(t)))
                                return !1;
                            var e = i.getWindow(t) || i.window;
                            return /object|function/.test(n(e.Element)) ? t instanceof e.Element : 1 === t.nodeType && "string" == typeof t.nodeName
                        }
                    };
                r.array = function (t) {
                    return r.object(t) && "undefined" != typeof t.length && r["function"](t.splice)
                }
                    ,
                    e.exports = r
            }
                , {
                "./isWindow": 46,
                "./window": 51
            }],
            46: [function (t, e) {
                "use strict";
                e.exports = function (t) {
                    return !(!t || !t.Window) && t instanceof t.Window
                }
            }
                , {}],
            47: [function (t, e) {
                "use strict";
                function n(t, n) {
                    for (var i in n) {
                        var o = e.exports.prefixedPropREs
                            , r = !1;
                        for (var s in o)
                            if (0 === i.indexOf(s) && o[s].test(i)) {
                                r = !0;
                                break
                            }
                        r || "function" == typeof n[i] || (t[i] = n[i])
                    }
                    return t
                }
                n.prefixedPropREs = {
                    webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
                },
                    e.exports = n
            }
                , {}],
            48: [function (t, e) {
                "use strict";
                var n = t("./hypot")
                    , i = t("./browser")
                    , o = t("./domObjects")
                    , r = t("./domUtils")
                    , s = t("./domObjects")
                    , a = t("./is")
                    , u = t("./pointerExtend")
                    , c = {
                        copyCoords: function (t, e) {
                            t.page = t.page || {},
                                t.page.x = e.page.x,
                                t.page.y = e.page.y,
                                t.client = t.client || {},
                                t.client.x = e.client.x,
                                t.client.y = e.client.y,
                                t.timeStamp = e.timeStamp
                        },
                        setCoordDeltas: function (t, e, i) {
                            t.page.x = i.page.x - e.page.x,
                                t.page.y = i.page.y - e.page.y,
                                t.client.x = i.client.x - e.client.x,
                                t.client.y = i.client.y - e.client.y,
                                t.timeStamp = i.timeStamp - e.timeStamp;
                            var o = Math.max(t.timeStamp / 1e3, .001);
                            t.page.speed = n(t.page.x, t.page.y) / o,
                                t.page.vx = t.page.x / o,
                                t.page.vy = t.page.y / o,
                                t.client.speed = n(t.client.x, t.page.y) / o,
                                t.client.vx = t.client.x / o,
                                t.client.vy = t.client.y / o
                        },
                        isNativePointer: function (t) {
                            return t instanceof o.Event || t instanceof o.Touch
                        },
                        getXY: function (t, e, n) {
                            return n = n || {},
                                t = t || "page",
                                n.x = e[t + "X"],
                                n.y = e[t + "Y"],
                                n
                        },
                        getPageXY: function (t, e) {
                            return e = e || {},
                                i.isOperaMobile && c.isNativePointer(t) ? (c.getXY("screen", t, e),
                                    e.x += window.scrollX,
                                    e.y += window.scrollY) : c.getXY("page", t, e),
                                e
                        },
                        getClientXY: function (t, e) {
                            return e = e || {},
                                i.isOperaMobile && c.isNativePointer(t) ? c.getXY("screen", t, e) : c.getXY("client", t, e),
                                e
                        },
                        getPointerId: function (t) {
                            return a.number(t.pointerId) ? t.pointerId : t.identifier
                        },
                        setCoords: function (t, e, n) {
                            var i = e.length > 1 ? c.pointerAverage(e) : e[0]
                                , o = {};
                            c.getPageXY(i, o),
                                t.page.x = o.x,
                                t.page.y = o.y,
                                c.getClientXY(i, o),
                                t.client.x = o.x,
                                t.client.y = o.y,
                                t.timeStamp = a.number(n) ? n : (new Date).getTime()
                        },
                        pointerExtend: u,
                        getTouchPair: function (t) {
                            var e = [];
                            return a.array(t) ? (e[0] = t[0],
                                e[1] = t[1]) : "touchend" === t.type ? 1 === t.touches.length ? (e[0] = t.touches[0],
                                    e[1] = t.changedTouches[0]) : 0 === t.touches.length && (e[0] = t.changedTouches[0],
                                        e[1] = t.changedTouches[1]) : (e[0] = t.touches[0],
                                            e[1] = t.touches[1]),
                                e
                        },
                        pointerAverage: function (t) {
                            for (var e = {
                                pageX: 0,
                                pageY: 0,
                                clientX: 0,
                                clientY: 0,
                                screenX: 0,
                                screenY: 0
                            }, n = 0; n < t.length; n++) {
                                var i;
                                i = t[n];
                                var o = i;
                                for (var r in e)
                                    e[r] += o[r]
                            }
                            for (var s in e)
                                e[s] /= t.length;
                            return e
                        },
                        touchBBox: function (t) {
                            if (t.length || t.touches && t.touches.length > 1) {
                                var e = c.getTouchPair(t)
                                    , n = Math.min(e[0].pageX, e[1].pageX)
                                    , i = Math.min(e[0].pageY, e[1].pageY);
                                return {
                                    x: n,
                                    y: i,
                                    left: n,
                                    top: i,
                                    width: Math.max(e[0].pageX, e[1].pageX) - n,
                                    height: Math.max(e[0].pageY, e[1].pageY) - i
                                }
                            }
                        },
                        touchDistance: function (t, e) {
                            var i = e + "X"
                                , o = e + "Y"
                                , r = c.getTouchPair(t)
                                , s = r[0][i] - r[1][i]
                                , a = r[0][o] - r[1][o];
                            return n(s, a)
                        },
                        touchAngle: function (t, e, n) {
                            var i = n + "X"
                                , o = n + "Y"
                                , r = c.getTouchPair(t)
                                , s = r[1][i] - r[0][i]
                                , a = r[1][o] - r[0][o];
                            return 180 * Math.atan2(a, s) / Math.PI
                        },
                        getPointerType: function (t) {
                            return a.string(t.pointerType) ? t.pointerType : a.number(t.pointerType) ? [undefined, undefined, "touch", "pen", "mouse"][t.pointerType] : /touch/.test(t.type) || t instanceof s.Touch ? "touch" : "mouse"
                        },
                        getEventTargets: function (t) {
                            var e = a["function"](t.composedPath) ? t.composedPath() : t.path;
                            return [r.getActualElement(e ? e[0] : t.target), r.getActualElement(t.currentTarget)]
                        }
                    };
                e.exports = c
            }
                , {
                "./browser": 36,
                "./domObjects": 37,
                "./domUtils": 38,
                "./hypot": 42,
                "./is": 45,
                "./pointerExtend": 47
            }],
            49: [function (t, e) {
                "use strict";
                for (var n = t("./window"), i = n.window, o = ["ms", "moz", "webkit", "o"], r = 0, s = void 0, a = void 0, u = 0; u < o.length && !i.requestAnimationFrame; u++)
                    s = i[o[u] + "RequestAnimationFrame"],
                        a = i[o[u] + "CancelAnimationFrame"] || i[o[u] + "CancelRequestAnimationFrame"];
                s || (s = function (t) {
                    var e = (new Date).getTime()
                        , n = Math.max(0, 16 - (e - r))
                        , i = setTimeout(function () {
                            t(e + n)
                        }, n);
                    return r = e + n,
                        i
                }
                ),
                    a || (a = function (t) {
                        clearTimeout(t)
                    }
                    ),
                    e.exports = {
                        request: s,
                        cancel: a
                    }
            }
                , {
                "./window": 51
            }],
            50: [function (t, e) {
                "use strict";
                var n = t("./extend")
                    , i = t("./is")
                    , o = t("./domUtils")
                    , r = o.closest
                    , s = o.parentNode
                    , a = o.getElementRect
                    , u = {
                        getStringOptionResult: function (t, e, n) {
                            return i.string(t) ? t = "parent" === t ? s(n) : "self" === t ? e.getRect(n) : r(n, t) : null
                        },
                        resolveRectLike: function (t, e, n, o) {
                            return t = u.getStringOptionResult(t, e, n) || t,
                                i["function"](t) && (t = t.apply(null, o)),
                                i.element(t) && (t = a(t)),
                                t
                        },
                        rectToXY: function (t) {
                            return t && {
                                x: "x" in t ? t.x : t.left,
                                y: "y" in t ? t.y : t.top
                            }
                        },
                        xywhToTlbr: function (t) {
                            return !t || "left" in t && "top" in t || (t = n({}, t),
                                t.left = t.x || 0,
                                t.top = t.y || 0,
                                t.right = t.right || t.left + t.width,
                                t.bottom = t.bottom || t.top + t.height),
                                t
                        },
                        tlbrToXywh: function (t) {
                            return !t || "x" in t && "y" in t || (t = n({}, t),
                                t.x = t.left || 0,
                                t.top = t.top || 0,
                                t.width = t.width || t.right - t.x,
                                t.height = t.height || t.bottom - t.y),
                                t
                        }
                    };
                e.exports = u
            }
                , {
                "./domUtils": 38,
                "./extend": 40,
                "./is": 45
            }],
            51: [function (t, e) {
                "use strict";
                function n(t) {
                    i.realWindow = t;
                    var e = t.document.createTextNode("");
                    e.ownerDocument !== t.document && "function" == typeof t.wrap && t.wrap(e) === e && (t = t.wrap(t)),
                        i.window = t
                }
                var i = e.exports
                    , o = t("./isWindow");
                "undefined" == typeof window ? (i.window = undefined,
                    i.realWindow = undefined) : n(window),
                    i.getWindow = function (t) {
                        if (o(t))
                            return t;
                        var e = t.ownerDocument || t;
                        return e.defaultView || e.parentWindow || i.window
                    }
                    ,
                    i.init = n
            }
                , {
                "./isWindow": 46
            }]
        }, {}, [1])(1)
    }),
    function (t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ClipboardJS = e() : t.ClipboardJS = e()
    }(this, function () {
        return function (t) {
            function e(i) {
                if (n[i])
                    return n[i].exports;
                var o = n[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(o.exports, o, o.exports, e),
                    o.l = !0,
                    o.exports
            }
            var n = {};
            return e.m = t,
                e.c = n,
                e.i = function (t) {
                    return t
                }
                ,
                e.d = function (t, n, i) {
                    e.o(t, n) || Object.defineProperty(t, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: i
                    })
                }
                ,
                e.n = function (t) {
                    var n = t && t.__esModule ? function () {
                        return t["default"]
                    }
                        : function () {
                            return t
                        }
                        ;
                    return e.d(n, "a", n),
                        n
                }
                ,
                e.o = function (t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }
                ,
                e.p = "",
                e(e.s = 3)
        }([function (t, e, n) {
            var i, o, r;
            !function (s, a) {
                o = [t, n(7)],
                    i = a,
                    void 0 !== (r = "function" == typeof i ? i.apply(e, o) : i) && (t.exports = r)
            }(0, function (t, e) {
                "use strict";
                function n(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = function (t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }(e)
                    , o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    }
                        : function (t) {
                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                        }
                    , r = function () {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                i.enumerable = i.enumerable || !1,
                                    i.configurable = !0,
                                    "value" in i && (i.writable = !0),
                                    Object.defineProperty(t, i.key, i)
                            }
                        }
                        return function (e, n, i) {
                            return n && t(e.prototype, n),
                                i && t(e, i),
                                e
                        }
                    }()
                    , s = function () {
                        function t(e) {
                            n(this, t),
                                this.resolveOptions(e),
                                this.initSelection()
                        }
                        return r(t, [{
                            key: "resolveOptions",
                            value: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = t.action,
                                    this.container = t.container,
                                    this.emitter = t.emitter,
                                    this.target = t.target,
                                    this.text = t.text,
                                    this.trigger = t.trigger,
                                    this.selectedText = ""
                            }
                        }, {
                            key: "initSelection",
                            value: function () {
                                this.text ? this.selectFake() : this.target && this.selectTarget()
                            }
                        }, {
                            key: "selectFake",
                            value: function () {
                                var t = this
                                    , e = "rtl" == document.documentElement.getAttribute("dir");
                                this.removeFake(),
                                    this.fakeHandlerCallback = function () {
                                        return t.removeFake()
                                    }
                                    ,
                                    this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0,
                                    this.fakeElem = document.createElement("textarea"),
                                    this.fakeElem.style.fontSize = "12pt",
                                    this.fakeElem.style.border = "0",
                                    this.fakeElem.style.padding = "0",
                                    this.fakeElem.style.margin = "0",
                                    this.fakeElem.style.position = "absolute",
                                    this.fakeElem.style[e ? "right" : "left"] = "-9999px";
                                var n = window.pageYOffset || document.documentElement.scrollTop;
                                this.fakeElem.style.top = n + "px",
                                    this.fakeElem.setAttribute("readonly", ""),
                                    this.fakeElem.value = this.text,
                                    this.container.appendChild(this.fakeElem),
                                    this.selectedText = (0,
                                        i["default"])(this.fakeElem),
                                    this.copyText()
                            }
                        }, {
                            key: "removeFake",
                            value: function () {
                                this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback),
                                    this.fakeHandler = null,
                                    this.fakeHandlerCallback = null),
                                    this.fakeElem && (this.container.removeChild(this.fakeElem),
                                        this.fakeElem = null)
                            }
                        }, {
                            key: "selectTarget",
                            value: function () {
                                this.selectedText = (0,
                                    i["default"])(this.target),
                                    this.copyText()
                            }
                        }, {
                            key: "copyText",
                            value: function () {
                                var t = void 0;
                                try {
                                    t = document.execCommand(this.action)
                                } catch (e) {
                                    t = !1
                                }
                                this.handleResult(t)
                            }
                        }, {
                            key: "handleResult",
                            value: function (t) {
                                this.emitter.emit(t ? "success" : "error", {
                                    action: this.action,
                                    text: this.selectedText,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                })
                            }
                        }, {
                            key: "clearSelection",
                            value: function () {
                                this.trigger && this.trigger.focus(),
                                    window.getSelection().removeAllRanges()
                            }
                        }, {
                            key: "destroy",
                            value: function () {
                                this.removeFake()
                            }
                        }, {
                            key: "action",
                            set: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                                if (this._action = t,
                                    "copy" !== this._action && "cut" !== this._action)
                                    throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function () {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function (t) {
                                if (void 0 !== t) {
                                    if (!t || "object" !== (void 0 === t ? "undefined" : o(t)) || 1 !== t.nodeType)
                                        throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && t.hasAttribute("disabled"))
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled")))
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = t
                                }
                            },
                            get: function () {
                                return this._target
                            }
                        }]),
                            t
                    }();
                t.exports = s
            })
        }
            , function (t, e, n) {
                function i(t, e, n) {
                    if (!t && !e && !n)
                        throw new Error("Missing required arguments");
                    if (!a.string(e))
                        throw new TypeError("Second argument must be a String");
                    if (!a.fn(n))
                        throw new TypeError("Third argument must be a Function");
                    if (a.node(t))
                        return o(t, e, n);
                    if (a.nodeList(t))
                        return r(t, e, n);
                    if (a.string(t))
                        return s(t, e, n);
                    throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                }
                function o(t, e, n) {
                    return t.addEventListener(e, n),
                    {
                        destroy: function () {
                            t.removeEventListener(e, n)
                        }
                    }
                }
                function r(t, e, n) {
                    return Array.prototype.forEach.call(t, function (t) {
                        t.addEventListener(e, n)
                    }),
                    {
                        destroy: function () {
                            Array.prototype.forEach.call(t, function (t) {
                                t.removeEventListener(e, n)
                            })
                        }
                    }
                }
                function s(t, e, n) {
                    return u(document.body, t, e, n)
                }
                var a = n(6)
                    , u = n(5);
                t.exports = i
            }
            , function (t) {
                function e() { }
                e.prototype = {
                    on: function (t, e, n) {
                        var i = this.e || (this.e = {});
                        return (i[t] || (i[t] = [])).push({
                            fn: e,
                            ctx: n
                        }),
                            this
                    },
                    once: function (t, e, n) {
                        function i() {
                            o.off(t, i),
                                e.apply(n, arguments)
                        }
                        var o = this;
                        return i._ = e,
                            this.on(t, i, n)
                    },
                    emit: function (t) {
                        var e = [].slice.call(arguments, 1)
                            , n = ((this.e || (this.e = {}))[t] || []).slice()
                            , i = 0
                            , o = n.length;
                        for (i; i < o; i++)
                            n[i].fn.apply(n[i].ctx, e);
                        return this
                    },
                    off: function (t, e) {
                        var n = this.e || (this.e = {})
                            , i = n[t]
                            , o = [];
                        if (i && e)
                            for (var r = 0, s = i.length; r < s; r++)
                                i[r].fn !== e && i[r].fn._ !== e && o.push(i[r]);
                        return o.length ? n[t] = o : delete n[t],
                            this
                    }
                },
                    t.exports = e
            }
            , function (t, e, n) {
                var i, o, r;
                !function (s, a) {
                    o = [t, n(0), n(2), n(1)],
                        i = a,
                        void 0 !== (r = "function" == typeof i ? i.apply(e, o) : i) && (t.exports = r)
                }(0, function (t, e, n, i) {
                    "use strict";
                    function o(t) {
                        return t && t.__esModule ? t : {
                            "default": t
                        }
                    }
                    function r(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError("Cannot call a class as a function")
                    }
                    function s(t, e) {
                        if (!t)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }
                    function a(t, e) {
                        if ("function" != typeof e && null !== e)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                    }
                    function u(t, e) {
                        var n = "data-clipboard-" + t;
                        if (e.hasAttribute(n))
                            return e.getAttribute(n)
                    }
                    var c = o(e)
                        , l = o(n)
                        , p = o(i)
                        , d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                            return typeof t
                        }
                            : function (t) {
                                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                            }
                        , f = function () {
                            function t(t, e) {
                                for (var n = 0; n < e.length; n++) {
                                    var i = e[n];
                                    i.enumerable = i.enumerable || !1,
                                        i.configurable = !0,
                                        "value" in i && (i.writable = !0),
                                        Object.defineProperty(t, i.key, i)
                                }
                            }
                            return function (e, n, i) {
                                return n && t(e.prototype, n),
                                    i && t(e, i),
                                    e
                            }
                        }()
                        , h = function (t) {
                            function e(t, n) {
                                r(this, e);
                                var i = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                                return i.resolveOptions(n),
                                    i.listenClick(t),
                                    i
                            }
                            return a(e, t),
                                f(e, [{
                                    key: "resolveOptions",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                        this.action = "function" == typeof t.action ? t.action : this.defaultAction,
                                            this.target = "function" == typeof t.target ? t.target : this.defaultTarget,
                                            this.text = "function" == typeof t.text ? t.text : this.defaultText,
                                            this.container = "object" === d(t.container) ? t.container : document.body
                                    }
                                }, {
                                    key: "listenClick",
                                    value: function (t) {
                                        var e = this;
                                        this.listener = (0,
                                            p["default"])(t, "click", function (t) {
                                                return e.onClick(t)
                                            })
                                    }
                                }, {
                                    key: "onClick",
                                    value: function (t) {
                                        var e = t.delegateTarget || t.currentTarget;
                                        this.clipboardAction && (this.clipboardAction = null),
                                            this.clipboardAction = new c["default"]({
                                                action: this.action(e),
                                                target: this.target(e),
                                                text: this.text(e),
                                                container: this.container,
                                                trigger: e,
                                                emitter: this
                                            })
                                    }
                                }, {
                                    key: "defaultAction",
                                    value: function (t) {
                                        return u("action", t)
                                    }
                                }, {
                                    key: "defaultTarget",
                                    value: function (t) {
                                        var e = u("target", t);
                                        if (e)
                                            return document.querySelector(e)
                                    }
                                }, {
                                    key: "defaultText",
                                    value: function (t) {
                                        return u("text", t)
                                    }
                                }, {
                                    key: "destroy",
                                    value: function () {
                                        this.listener.destroy(),
                                            this.clipboardAction && (this.clipboardAction.destroy(),
                                                this.clipboardAction = null)
                                    }
                                }], [{
                                    key: "isSupported",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"]
                                            , e = "string" == typeof t ? [t] : t
                                            , n = !!document.queryCommandSupported;
                                        return e.forEach(function (t) {
                                            n = n && !!document.queryCommandSupported(t)
                                        }),
                                            n
                                    }
                                }]),
                                e
                        }(l["default"]);
                    t.exports = h
                })
            }
            , function (t) {
                function e(t, e) {
                    for (; t && t.nodeType !== n;) {
                        if ("function" == typeof t.matches && t.matches(e))
                            return t;
                        t = t.parentNode
                    }
                }
                var n = 9;
                if ("undefined" != typeof Element && !Element.prototype.matches) {
                    var i = Element.prototype;
                    i.matches = i.matchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector || i.webkitMatchesSelector
                }
                t.exports = e
            }
            , function (t, e, n) {
                function i(t, e, n, i, o) {
                    var s = r.apply(this, arguments);
                    return t.addEventListener(n, s, o),
                    {
                        destroy: function () {
                            t.removeEventListener(n, s, o)
                        }
                    }
                }
                function o(t, e, n, o, r) {
                    return "function" == typeof t.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)),
                        Array.prototype.map.call(t, function (t) {
                            return i(t, e, n, o, r)
                        }))
                }
                function r(t, e, n, i) {
                    return function (n) {
                        n.delegateTarget = s(n.target, e),
                            n.delegateTarget && i.call(t, n)
                    }
                }
                var s = n(4);
                t.exports = o
            }
            , function (t, e) {
                e.node = function (t) {
                    return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
                }
                    ,
                    e.nodeList = function (t) {
                        var n = Object.prototype.toString.call(t);
                        return void 0 !== t && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in t && (0 === t.length || e.node(t[0]))
                    }
                    ,
                    e.string = function (t) {
                        return "string" == typeof t || t instanceof String
                    }
                    ,
                    e.fn = function (t) {
                        return "[object Function]" === Object.prototype.toString.call(t)
                    }
            }
            , function (t) {
                function e(t) {
                    var e;
                    if ("SELECT" === t.nodeName)
                        t.focus(),
                            e = t.value;
                    else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                        var n = t.hasAttribute("readonly");
                        n || t.setAttribute("readonly", ""),
                            t.select(),
                            t.setSelectionRange(0, t.value.length),
                            n || t.removeAttribute("readonly"),
                            e = t.value
                    } else {
                        t.hasAttribute("contenteditable") && t.focus();
                        var i = window.getSelection()
                            , o = document.createRange();
                        o.selectNodeContents(t),
                            i.removeAllRanges(),
                            i.addRange(o),
                            e = i.toString()
                    }
                    return e
                }
                t.exports = e
            }
        ])
    }),
    function (t) {
        function e(t, e) {
            return e = e || 0,
                Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
        }
        function n(t, e) {
            for (var n = {}, i = [], o = 0, r = t.length; o < r; ++o) {
                var s = e ? e(t[o]) : t[o];
                n.hasOwnProperty(s) || (i.push(t[o]),
                    n[s] = 1)
            }
            return i
        }
        function i(t) {
            for (var e = [], n = 0, o = t.length; n < o; n++)
                e = e.concat(t[n].length ? i(t[n]) : t[n]);
            return e
        }
        function o(t, e) {
            for (var n = 0; n < t.length; n++)
                e[n] = t[n]
        }
        function r(t, e, n) {
            this.stops = t,
                this.angle = e,
                this.colorarray = n
        }
        function s(t, e, n) {
            return new b(n === undefined ? t[e] : t[n][e])
        }
        function a(t, e, n) {
            return 1 === t.length ? new b(t[0]) : (e = e || 0,
                n = (n || t.length) - e,
                t = t.slice(e),
                n % 2 == 0 ? s(t, n / 2) : b.getAvg(s(t, Math.floor(n / 2)), s(t, Math.ceil(n / 2))))
        }
        function u(t, e) {
            function n(t) {
                function e(t) {
                    return t * Math.PI / 180
                }
                return {
                    x: Math.max(Math.cos(e(t)), 0),
                    y: Math.max(Math.sin(e(t)), 0)
                }
            }
            t %= 360;
            var i = n(180 - t)
                , o = n(0 - t);
            return {
                x1: i.x * e,
                y1: i.y * e,
                x2: o.x * e,
                y2: o.y * e
            }
        }
        function c(t) {
            for (var e, n = [], i = 0; i < t.length; i++)
                t[i] !== e && (n.push(t[i]),
                    e = t[i]);
            return n
        }
        function l(t) {
            function e(t) {
                for (var e = [], n = 0; n <= 180; n++) {
                    var i = p(t, n).map(function (t) {
                        return t.join()
                    });
                    if (i[0] === i[i.length - 1])
                        e.push(n);
                    else
                        for (var o = c(i), r = o[0], s = 1; s < o.length && x(r, o[s]); s++)
                            s === o.length - 1 && e.push(n)
                }
                return e
            }
            function n(t, e) {
                var n = e.map(function (e) {
                    return {
                        angle: e,
                        stops: h(p(t, e))
                    }
                });
                if (n = n.sort(function (t, e) {
                    return t.stops.length === e.stops.length ? 90 === t.angle || 0 === t.angle || -90 === t.angle ? -1 : 90 === e.angle || 0 === e.angle || -90 === e.angle ? 1 : t.angle - e.angle : 1 === t.stops.length ? 1 : 1 === e.stops.length ? -1 : t.angle - e.angle
                }),
                    0 === n.length)
                    throw "Couldn't find gradient angle";
                return n[0].angle
            }
            return n(t, e(t).map(function (t) {
                return t - 90
            }))
        }
        function p(t, n) {
            for (var i = t[0].length, o = t.length, r = Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2)), s = u(n, r), a = d(e(s.x1), e(s.y1), e(s.x2), e(s.y2)), c = [], l = 0; l < a.length; l++) {
                var p = a[l][0]
                    , f = a[l][1];
                "undefined" != typeof t[f] && "undefined" != typeof t[f][p] && c.push(t[f][p])
            }
            return c
        }
        function d(t, e, n, i) {
            if (t = parseFloat(t),
                e = parseFloat(e),
                n = parseFloat(n),
                i = parseFloat(i),
                isNaN(t) || isNaN(e) || isNaN(n) || isNaN(i))
                throw "Invalid coordinates for Bresenham's";
            t = Math.round(t),
                e = Math.round(e),
                n = Math.round(n),
                i = Math.round(i);
            var o = []
                , r = Math.abs(n - t)
                , s = Math.abs(i - e)
                , a = t < n ? 1 : -1
                , u = e < i ? 1 : -1
                , c = r - s;
            for (o.push([t, e]); t !== n || e !== i;) {
                var l = 2 * c;
                l > -s && (c -= s,
                    t += a),
                    l < r && (c += r,
                        e += u),
                    o.push([t, e])
            }
            return o
        }
        function f(t, n, i) {
            for (var o = s(t, n), r = e(t.length / 5), u = i; u > n; u -= r) {
                var c = s(t, u)
                    , l = b.getAvg(o, c)
                    , p = a(t, n, i);
                if (!l.equals(p))
                    return !1
            }
            return !0
        }
        function h(t, e, n) {
            e = e || 0,
                n = n || t.length - 1;
            var i = [];
            return f(t, e, n) ? (i.push(e),
                n !== t.length - 1 ? i = i.concat(h(t, n, t.length - 1)) : n !== t.length - 1 || 1 === i.length && s(t, 0).equals(s(t, n)) || i.push(n)) : i = i.concat(h(t, e, n - 1)),
                i
        }
        function g(t) {
            try {
                var n = l(t)
                    , i = p(t, n);
                return new r(h(i).map(function (t) {
                    return {
                        idx: e(t / (i.length - 1), 2),
                        color: s(i, t)
                    }
                }), n, t)
            } catch (t) {
                return !1
            }
        }
        function v(t) {
            for (var e = t.getImageData(0, 0, t.canvas.width, t.canvas.height), n = e.width, i = e.height, o = e.data, r = [], s = 0; s < i; s++) {
                for (var a = [], u = 0; u < n; u++) {
                    var c = 4 * (n * s + u)
                        , l = o[c]
                        , p = o[c + 1]
                        , d = o[c + 2]
                        , f = o[c + 3];
                    a.push([l, p, d, f])
                }
                r[s] = a
            }
            return r
        }
        function m(t) {
            return g(v(t.getContext("2d")))
        }
        function y(t, e) {
            var n = new Image;
            n.src = t,
                n.onload = function () {
                    var t = this
                        , n = document.createElement("canvas")
                        , i = n.getContext("2d");
                    n.width = t.width,
                        n.height = t.height,
                        i.drawImage(t, 0, 0),
                        e(m(n))
                }
        }
        function x(t, e) {
            var n = t
                , i = e;
            return t.length && (n = new b(t)),
                e.length && (i = new b(e)),
                b.prototype.equals.apply(n, [i])
        }
        var b = function (t) {
            if ("string" == typeof t && (t = t.split(",")),
                this.r = t[0],
                this.g = t[1],
                this.b = t[2],
                this.a = 4 === t.length ? t[3] : 255,
                "undefined" == typeof this.r || "undefined" == typeof this.g || "undefined" == typeof this.b)
                throw "Invalid Color Array passed in"
        };
        b.getAvg = function (t, e) {
            var n = [(t.r + e.r) / 2, (t.g + e.g) / 2, (t.b + e.b) / 2];
            return "undefined" == typeof t.a && (e.a,
                0) || (t.a = "undefined" == typeof t.a ? 255 : t.a,
                    e.a = "undefined" == typeof e.a ? 255 : e.a,
                    n.push((t.a + e.a) / 2)),
                new b(n)
        }
            ,
            b.prototype.equals = function (t, e) {
                if (e = void 0 === e ? 70 : e,
                    Math.abs(this.r - t.r) > e)
                    return !1;
                if (Math.abs(this.g - t.g) > e)
                    return !1;
                if (Math.abs(this.b - t.b) > e)
                    return !1;
                var n = "undefined" == typeof this.a ? 255 : this.a
                    , i = "undefined" == typeof t.a ? 255 : t.a;
                return !(Math.abs(n - i) > e)
            }
            ,
            b.prototype.toString = function () {
                return 255 === this.a ? "rgb(" + e(this.r) + ", " + e(this.g) + ", " + e(this.b) + ")" : "rgba(" + e(this.r) + ", " + e(this.g) + ", " + e(this.b) + ", " + e(this.a / 255, 2) + ")"
            }
            ,
            r.prototype.toCanvas = function () {
                var t = document.createElement("canvas");
                t.width = this.colorarray[0].length,
                    t.height = this.colorarray.length;
                var e = t.getContext("2d")
                    , n = e.createImageData(t.width, t.height);
                return o(i(this.colorarray), n.data),
                    e.clearRect(0, 0, t.width, t.height),
                    e.putImageData(n, 0, 0),
                    t
            }
            ,
            r.prototype.toCss = function () {
                if (1 === this.stops.length)
                    return "background-color: " + this.stops[0].color.toString();
                var t = n(this.stops, function (t) {
                    return e(100 * t.idx)
                });
                t = t.map(function (t) {
                    return t.color.toString() + " " + e(100 * t.idx) + "%"
                });
                var i = this.angle + "deg, " + t.join(",")
                    , o = Math.abs(this.angle - 450) % 360;
                t.join(",");
                return "background: -webkit-linear-gradient(" + i + ");\nbackground: -o-linear-gradient(" + i + ");\nbackground: -ms-linear-gradient(" + i + ");\nbackground: -moz-linear-gradient(" + i + ");\nbackground: linear-gradient(" + i + ");\n"
            }
            ,
            t.GradientFinder = {
                fromUrl: y,
                fromCanvas: m,
                colorsEqual: x,
                Gradient: r,
                Color: b
            }
    }(window),
    GradientCanvas.fromExportable = function (t) {
        return new GradientCanvas(t.colors.map(function (t) {
            return {
                offset: t[0],
                color: tinycolor(t[1]).toRgbString()
            }
        }), t.alphas.map(function (t) {
            return {
                offset: t[0],
                alpha: t[1]
            }
        }), t.angle)
    }
    ,
    GradientCanvas.prototype.toExportable = function () {
        return {
            colors: this.getColorStops().map(function (t) {
                return [t.getOffset(), tinycolor(t.color).toHex()]
            }),
            alphas: this.getAlphaStops().map(function (t) {
                return [t.getOffset(), t.alpha]
            }),
            angle: this.angle
        }
    }
    ,
    GradientCanvas.prototype.stopsToCSS = function (t, e) {
        if (0 === e.length)
            return "transparent";
        if (1 === e.length)
            return [e[0].color];
        var n = e.map(function (t) {
            return t.color + " " + Math.max(0, Math.min(parseInt(100 * t.offset))) + "%"
        });
        return "linear-gradient(" + this.angleToCSSValue(t) + ", " + n.join(", ") + ")"
    }
    ,
    GradientCanvas.prototype.stopsToW3cCSS = function (t, e) {
        if (0 === e.length)
            return "transparent";
        if (1 === e.length)
            return [e[0].color];
        var n = e.map(function (t) {
            return t.color + " " + Math.max(0, Math.min(parseInt(100 * t.offset))) + "%"
        });
        return "linear-gradient(" + this.angleToW3cCSSValue(t) + ", " + n.join(", ") + ")"
    }
    ,
    GradientCanvas.prototype.angleToW3cCSSValue = function (t) {
        var e = t || this.angle;
        void 0 === e && (e = "top"),
            0 > e && (e += 360);
        var n = {
            0: "to right",
            90: "to top",
            180: "to left",
            270: "to bottom"
        }
            , i = Math.abs(e - 450) % 360;
        return n[e] && (e = n[e]),
            isNaN(parseInt(e)) || (e = i + "deg"),
            e
    }
    ,
    GradientCanvas.prototype.angleToCSSValue = function (t) {
        var e = t || this.angle;
        void 0 === e && (e = "top"),
            0 > e && (e += 360);
        var n = {
            0: "left",
            90: "bottom",
            180: "right",
            270: "top"
        };
        return n[e] && (e = n[e]),
            isNaN(parseInt(e)) || (e += "deg"),
            e
    }
    ,
    GradientCanvas.prototype.angleToGradientVector = function () {
        function t(t) {
            return {
                x: Math.cos(t),
                y: Math.sin(t)
            }
        }
        function e(t) {
            return t * Math.PI / 180
        }
        var n = this.getAngle()
            , i = Math.pow(2, -52)
            , o = n % 360
            , r = t(e(180 - o))
            , s = t(e(360 - o));
        return 0 >= r.x || i >= Math.abs(r.x) ? r.x = 0 : (o > 90 && 180 > o || o > 270 && 360 > o) && (r.x = parseFloat(r.x + .3)),
            0 >= r.y || i >= Math.abs(r.y) ? r.y = 0 : (o > 90 && 180 > o || o > 270 && 360 > o) && (r.y = parseFloat(r.y + .3)),
            0 >= s.x || i >= Math.abs(s.x) ? s.x = 0 : (o > 90 && 180 > o || o > 270 && 360 > o) && (s.x = parseFloat(s.x + .3)),
            0 >= s.y || i >= Math.abs(s.y) ? s.y = 0 : (o > 90 && 180 > o || o > 270 && 360 > o) && (s.y = parseFloat(s.y + .3)),
        {
            x1: parseInt(100 * r.x),
            y1: parseInt(100 * r.y),
            x2: parseInt(100 * s.x),
            y2: parseInt(100 * s.y)
        }
    }
    ,
    GradientCanvas.prototype.toCSSAlpha = function (t) {
        var e = this.getAlphaStopsBlack();
        return 0 === e.length && (e = [{
            color: "#000",
            offset: 1
        }]),
            this.stopsToCSS(t, e)
    }
    ,
    GradientCanvas.prototype.toSVG = function () {
        var t = this.getAllStops()
            , e = t.map(function (t) {
                return '<stop offset="' + t.percent + '" style="stop-color:' + t.color + ";stop-opacity:" + t.alpha + ';" />'
            })
            , n = this.angleToGradientVector();
        return ['<linearGradient spreadMethod="pad" id="gradient" x1="' + n.x1 + '%" y1="' + n.y1 + '%" x2="' + n.x2 + '%" y2="' + n.y2 + '%">', e.join("\n "), "</linearGradient>"].join("\n")
    }
    ,
    GradientCanvas.prototype.getAngle = function () {
        for (; 0 > this.angle;)
            this.angle += 360;
        return this.angle % 360
    }
    ,
    GradientCanvas.prototype.toCSSColor = function (t) {
        return this.stopsToCSS(t, this.getColorStops())
    }
    ,
    GradientCanvas.prototype.toCSS = function (t) {
        return this.stopsToCSS(t, this.getAllStops())
    }
    ,
    GradientCanvas.prototype.toW3cCSS = function (t) {
        return this.stopsToW3cCSS(t, this.getAllStops())
    }
    ,
    GradientCanvas.prototype.removeStop = function (t) {
        this.removeColorStop(t),
            this.removeAlphaStop(t)
    }
    ,
    GradientCanvas.prototype.removeColorStop = function (t) {
        var e = this._colorStops.indexOf(t);
        -1 != e && this._colorStops.splice(e, 1)
    }
    ,
    GradientCanvas.prototype.removeAlphaStop = function (t) {
        var e = this._alphaStops.indexOf(t);
        -1 != e && this._alphaStops.splice(e, 1)
    }
    ,
    GradientCanvas.prototype.getAllStops = function () {
        var t = this
            , e = this.getColorStops().map(function (e) {
                var n = t.getInterpolatedAlphaAtOffset(e.offset)
                    , i = tinycolor(e.color);
                return i.setAlpha(n),
                {
                    color: i.toString("rgb"),
                    hex: i.toString("hex"),
                    offset: e.offset,
                    percent: e.getPercentOffset(),
                    alpha: n
                }
            })
            , n = this.getAlphaStops().map(function (e) {
                var n = tinycolor(t.getInterpolatedColorAtOffset(e.offset));
                return n.setAlpha(e.alpha),
                {
                    color: n.toString("rgb"),
                    hex: n.toString("hex"),
                    offset: e.offset,
                    percent: e.getPercentOffset(),
                    alpha: e.alpha
                }
            });
        return 2 > n.length && (n = []),
            e.concat(n).unique(function (t) {
                return t.offset
            }).sort(function (t, e) {
                return t.offset - e.offset
            })
    }
    ,
    GradientCanvas.prototype.getColorStops = function () {
        return this._colorStops.sort(function (t, e) {
            return t.offset - e.offset
        })
    }
    ,
    GradientCanvas.prototype.getAlphaStops = function () {
        return this._alphaStops.sort(function (t, e) {
            return t.offset - e.offset
        })
    }
    ,
    GradientCanvas.prototype.getAlphaStopsBlack = function () {
        return this.getAlphaStops().map(function (t) {
            return {
                color: "rgba(0, 0, 0, " + t.alpha + ")",
                offset: Math.max(0, Math.min(1, t.offset))
            }
        })
    }
    ,
    GradientCanvas.prototype.toCanvas = function (t, e, n, i) {
        t = t || 100,
            e = e || 100;
        var o = document.createElement("canvas")
            , r = o.getContext("2d");
        o.width = t,
            o.height = e;
        var s = {
            x1: 0,
            x2: 100,
            y1: 0,
            y2: 0
        };
        i || (s = this.angleToGradientVector(this.angle)),
            s.x1 = s.x1 / 100 * t,
            s.x2 = s.x2 / 100 * t,
            s.y1 = s.y1 / 100 * e,
            s.y2 = s.y2 / 100 * e;
        for (var a = r.createLinearGradient(s.x1, s.y1, s.x2, s.y2), u = n || this.getAllStops(), c = 0; u.length > c; c++)
            a.addColorStop(Math.max(0, Math.min(1, u[c].offset)), u[c].color);
        return r.fillStyle = a,
            r.fillRect(0, 0, t, e),
            o
    }
    ,
    GradientCanvas.prototype.toCanvasRules = function (t, e) {
        var n = this.angleToGradientVector(this.angle);
        n.x1 = n.x1 / 100 * t,
            n.x2 = n.x2 / 100 * t,
            n.y1 = n.y1 / 100 * e,
            n.y2 = n.y2 / 100 * e;
        var i = this.getAllStops().map(function (t) {
            return "gradient.addColorStop(" + Math.max(0, Math.min(1, t.offset)) + ', "' + t.color + '");'
        });
        return ["var canvas = document.createElement('canvas');", "var context = canvas.getContext('2d')", "canvas.width = " + t + ";", "canvas.height = " + e + ";", "var gradient = context.createLinearGradient(" + n.x1 + ", " + n.y1 + ", " + n.x2 + ", " + n.y2 + ");", i.join("\n"), "context.fillStyle = gradient;", "context.fillRect(0, 0, " + t + ", " + e + ");"].join("\n")
    }
    ,
    GradientCanvas.prototype.getInterpolatedColorAtOffset = function (t) {
        var e = this.toCanvas(100, 1, this.getColorStops(), !0)
            , n = e.getContext("2d")
            , i = Math.max(0, Math.min(99, parseInt(100 * t)))
            , o = n.getImageData(i, 0, 1, 1).data;
        return tinycolor({
            r: o[0],
            g: o[1],
            b: o[2]
        }).toHexString()
    }
    ,
    GradientCanvas.prototype.getInterpolatedAlphaAtOffset = function (t) {
        var e = this.getAlphaStopsBlack();
        if (0 === e.length)
            return 1;
        var n = this.toCanvas(100, 1, e, !0)
            , i = n.getContext("2d")
            , o = Math.max(0, Math.min(99, parseInt(100 * t)))
            , r = i.getImageData(o, 0, 1, 1).data;
        return Math.round(r[3] / 255 * 100) / 100
    }
    ,
    GradientCanvas.prototype.cloneStop = function (t, e) {
        var n = t.offset
            , i = t.hasOwnProperty("alpha");
        if (e) {
            var o = Math.random() / 5
                , r = i ? this.getAlphaStops() : this.getColorStops()
                , s = r.indexOf(t)
                , a = .5 > n ? n + o : n - o
                , u = s > 0 ? r[s - 1].offset : 0
                , c = r.length - 1 > s ? r[s + 1].offset : 1;
            Math.abs(n - a) < Math.abs(n - u) && (a = u),
                Math.abs(n - a) < Math.abs(n - c) && (a = c),
                n = (n + a) / 2
        }
        return i ? this.addAlphaStop(n, t.alpha) : this.addColorStop(n, t.color)
    }
    ,
    GradientCanvas.prototype.addColorStop = function (t, e) {
        var n = tinycolor(e || this.getInterpolatedColorAtOffset(t));
        1 > n.alpha && (this.addAlphaStop(t, n.alpha),
            n.setAlpha(1));
        var i = {
            offset: t,
            color: "" + n,
            hex: n.toHexString(),
            getOffset: function () {
                return Math.min(1, Math.max(0, Math.round(100 * this.offset) / 100))
            },
            getPercentOffset: function () {
                return 100 * i.getOffset() + "%"
            },
            setOffset: function (t) {
                i.offset = Math.min(1, Math.max(0, t))
            }
        };
        return this._colorStops.push(i),
            this.getColorStops().indexOf(i)
    }
    ,
    GradientCanvas.prototype.addAlphaStop = function (t, e) {
        e = e || this.getInterpolatedAlphaAtOffset(t);
        var n = {
            offset: t,
            alpha: e,
            getOffset: function () {
                return Math.min(1, Math.max(0, Math.round(100 * this.offset) / 100))
            },
            getPercentOffset: function () {
                return 100 * n.getOffset()
            },
            setOffset: function (t) {
                n.offset = Math.min(1, Math.max(0, t))
            }
        };
        return this._alphaStops.push(n),
            this.getAlphaStops().indexOf(n)
    }
    ,
    /*!
     * Isotope PACKAGED v3.0.6
     *
     * Licensed GPLv3 for open source use
     * or Isotope Commercial License for commercial use
     *
     * https://isotope.metafizzy.co
     * Copyright 2010-2018 Metafizzy
     */
    function (t, e) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (n) {
            return e(t, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
    }(window, function (t, e) {
        "use strict";
        function n(n, r, a) {
            function u(t, e, i) {
                var o, r = "$()." + n + '("' + e + '")';
                return t.each(function (t, u) {
                    var c = a.data(u, n);
                    if (!c)
                        return void s(n + " not initialized. Cannot call methods, i.e. " + r);
                    var l = c[e];
                    if (!l || "_" == e.charAt(0))
                        return void s(r + " is not a valid method");
                    var p = l.apply(c, i);
                    o = void 0 === o ? p : o
                }),
                    void 0 !== o ? o : t
            }
            function c(t, e) {
                t.each(function (t, i) {
                    var o = a.data(i, n);
                    o ? (o.option(e),
                        o._init()) : (o = new r(i, e),
                            a.data(i, n, o))
                })
            }
            (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function (t) {
                a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
            }
            ),
                a.fn[n] = function (t) {
                    if ("string" == typeof t) {
                        return u(this, t, o.call(arguments, 1))
                    }
                    return c(this, t),
                        this
                }
                ,
                i(a))
        }
        function i(t) {
            !t || t && t.bridget || (t.bridget = n)
        }
        var o = Array.prototype.slice
            , r = t.console
            , s = void 0 === r ? function () { }
                : function (t) {
                    r.error(t)
                }
            ;
        return i(e || t.jQuery),
            n
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, function () {
        function t() { }
        var e = t.prototype;
        return e.on = function (t, e) {
            if (t && e) {
                var n = this._events = this._events || {}
                    , i = n[t] = n[t] || [];
                return -1 == i.indexOf(e) && i.push(e),
                    this
            }
        }
            ,
            e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var n = this._onceEvents = this._onceEvents || {};
                    return (n[t] = n[t] || {})[e] = !0,
                        this
                }
            }
            ,
            e.off = function (t, e) {
                var n = this._events && this._events[t];
                if (n && n.length) {
                    var i = n.indexOf(e);
                    return -1 != i && n.splice(i, 1),
                        this
                }
            }
            ,
            e.emitEvent = function (t, e) {
                var n = this._events && this._events[t];
                if (n && n.length) {
                    n = n.slice(0),
                        e = e || [];
                    for (var i = this._onceEvents && this._onceEvents[t], o = 0; o < n.length; o++) {
                        var r = n[o];
                        i && i[r] && (this.off(t, r),
                            delete i[r]),
                            r.apply(this, e)
                    }
                    return this
                }
            }
            ,
            e.allOff = function () {
                delete this._events,
                    delete this._onceEvents
            }
            ,
            t
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
    }(window, function () {
        "use strict";
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e
        }
        function e() { }
        function n() {
            for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < c; e++) {
                t[u[e]] = 0
            }
            return t
        }
        function i(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
                e
        }
        function o() {
            if (!l) {
                l = !0;
                var e = document.createElement("div");
                e.style.width = "200px",
                    e.style.padding = "1px 2px 3px 4px",
                    e.style.borderStyle = "solid",
                    e.style.borderWidth = "1px 2px 3px 4px",
                    e.style.boxSizing = "border-box";
                var n = document.body || document.documentElement;
                n.appendChild(e);
                var o = i(e);
                s = 200 == Math.round(t(o.width)),
                    r.isBoxSizeOuter = s,
                    n.removeChild(e)
            }
        }
        function r(e) {
            if (o(),
                "string" == typeof e && (e = document.querySelector(e)),
                e && "object" == typeof e && e.nodeType) {
                var r = i(e);
                if ("none" == r.display)
                    return n();
                var a = {};
                a.width = e.offsetWidth,
                    a.height = e.offsetHeight;
                for (var l = a.isBorderBox = "border-box" == r.boxSizing, p = 0; p < c; p++) {
                    var d = u[p]
                        , f = r[d]
                        , h = parseFloat(f);
                    a[d] = isNaN(h) ? 0 : h
                }
                var g = a.paddingLeft + a.paddingRight
                    , v = a.paddingTop + a.paddingBottom
                    , m = a.marginLeft + a.marginRight
                    , y = a.marginTop + a.marginBottom
                    , x = a.borderLeftWidth + a.borderRightWidth
                    , b = a.borderTopWidth + a.borderBottomWidth
                    , w = l && s
                    , S = t(r.width);
                !1 !== S && (a.width = S + (w ? 0 : g + x));
                var E = t(r.height);
                return !1 !== E && (a.height = E + (w ? 0 : v + b)),
                    a.innerWidth = a.width - (g + x),
                    a.innerHeight = a.height - (v + b),
                    a.outerWidth = a.width + m,
                    a.outerHeight = a.height + y,
                    a
            }
        }
        var s, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        }
            , u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], c = u.length, l = !1;
        return r
    }),
    function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
    }(window, function () {
        "use strict";
        var t = function () {
            var t = window.Element.prototype;
            if (t.matches)
                return "matches";
            if (t.matchesSelector)
                return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], n = 0; n < e.length; n++) {
                var i = e[n]
                    , o = i + "MatchesSelector";
                if (t[o])
                    return o
            }
        }();
        return function (e, n) {
            return e[t](n)
        }
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (n) {
            return e(t, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
    }(window, function (t, e) {
        var n = {};
        n.extend = function (t, e) {
            for (var n in e)
                t[n] = e[n];
            return t
        }
            ,
            n.modulo = function (t, e) {
                return (t % e + e) % e
            }
            ;
        var i = Array.prototype.slice;
        n.makeArray = function (t) {
            return Array.isArray(t) ? t : null === t || void 0 === t ? [] : "object" == typeof t && "number" == typeof t.length ? i.call(t) : [t]
        }
            ,
            n.removeFrom = function (t, e) {
                var n = t.indexOf(e);
                -1 != n && t.splice(n, 1)
            }
            ,
            n.getParent = function (t, n) {
                for (; t.parentNode && t != document.body;)
                    if (t = t.parentNode,
                        e(t, n))
                        return t
            }
            ,
            n.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t
            }
            ,
            n.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }
            ,
            n.filterFindElements = function (t, i) {
                t = n.makeArray(t);
                var o = [];
                return t.forEach(function (t) {
                    if (t instanceof HTMLElement) {
                        if (!i)
                            return void o.push(t);
                        e(t, i) && o.push(t);
                        for (var n = t.querySelectorAll(i), r = 0; r < n.length; r++)
                            o.push(n[r])
                    }
                }),
                    o
            }
            ,
            n.debounceMethod = function (t, e, n) {
                n = n || 100;
                var i = t.prototype[e]
                    , o = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[o];
                    clearTimeout(t);
                    var e = arguments
                        , r = this;
                    this[o] = setTimeout(function () {
                        i.apply(r, e),
                            delete r[o]
                    }, n)
                }
            }
            ,
            n.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
            }
            ,
            n.toDashed = function (t) {
                return t.replace(/(.)([A-Z])/g, function (t, e, n) {
                    return e + "-" + n
                }).toLowerCase()
            }
            ;
        var o = t.console;
        return n.htmlInit = function (e, i) {
            n.docReady(function () {
                var r = n.toDashed(i)
                    , s = "data-" + r
                    , a = document.querySelectorAll("[" + s + "]")
                    , u = document.querySelectorAll(".js-" + r)
                    , c = n.makeArray(a).concat(n.makeArray(u))
                    , l = s + "-options"
                    , p = t.jQuery;
                c.forEach(function (t) {
                    var n, r = t.getAttribute(s) || t.getAttribute(l);
                    try {
                        n = r && JSON.parse(r)
                    } catch (e) {
                        return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + e))
                    }
                    var a = new e(t, n);
                    p && p.data(t, i, a)
                })
            })
        }
            ,
            n
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {},
            t.Outlayer.Item = e(t.EvEmitter, t.getSize))
    }(window, function (t, e) {
        "use strict";
        function n(t) {
            for (var e in t)
                return !1;
            return null,
                !0
        }
        function i(t, e) {
            t && (this.element = t,
                this.layout = e,
                this.position = {
                    x: 0,
                    y: 0
                },
                this._create())
        }
        function o(t) {
            return t.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase()
            })
        }
        var r = document.documentElement.style
            , s = "string" == typeof r.transition ? "transition" : "WebkitTransition"
            , a = "string" == typeof r.transform ? "transform" : "WebkitTransform"
            , u = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            }[s]
            , c = {
                transform: a,
                transition: s,
                transitionDuration: s + "Duration",
                transitionProperty: s + "Property",
                transitionDelay: s + "Delay"
            }
            , l = i.prototype = Object.create(t.prototype);
        l.constructor = i,
            l._create = function () {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                },
                    this.css({
                        position: "absolute"
                    })
            }
            ,
            l.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }
            ,
            l.getSize = function () {
                this.size = e(this.element)
            }
            ,
            l.css = function (t) {
                var e = this.element.style;
                for (var n in t) {
                    e[c[n] || n] = t[n]
                }
            }
            ,
            l.getPosition = function () {
                var t = getComputedStyle(this.element)
                    , e = this.layout._getOption("originLeft")
                    , n = this.layout._getOption("originTop")
                    , i = t[e ? "left" : "right"]
                    , o = t[n ? "top" : "bottom"]
                    , r = parseFloat(i)
                    , s = parseFloat(o)
                    , a = this.layout.size;
                -1 != i.indexOf("%") && (r = r / 100 * a.width),
                    -1 != o.indexOf("%") && (s = s / 100 * a.height),
                    r = isNaN(r) ? 0 : r,
                    s = isNaN(s) ? 0 : s,
                    r -= e ? a.paddingLeft : a.paddingRight,
                    s -= n ? a.paddingTop : a.paddingBottom,
                    this.position.x = r,
                    this.position.y = s
            }
            ,
            l.layoutPosition = function () {
                var t = this.layout.size
                    , e = {}
                    , n = this.layout._getOption("originLeft")
                    , i = this.layout._getOption("originTop")
                    , o = n ? "paddingLeft" : "paddingRight"
                    , r = n ? "left" : "right"
                    , s = n ? "right" : "left"
                    , a = this.position.x + t[o];
                e[r] = this.getXValue(a),
                    e[s] = "";
                var u = i ? "paddingTop" : "paddingBottom"
                    , c = i ? "top" : "bottom"
                    , l = i ? "bottom" : "top"
                    , p = this.position.y + t[u];
                e[c] = this.getYValue(p),
                    e[l] = "",
                    this.css(e),
                    this.emitEvent("layout", [this])
            }
            ,
            l.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
            }
            ,
            l.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
            }
            ,
            l._transitionTo = function (t, e) {
                this.getPosition();
                var n = this.position.x
                    , i = this.position.y
                    , o = t == this.position.x && e == this.position.y;
                if (this.setPosition(t, e),
                    o && !this.isTransitioning)
                    return void this.layoutPosition();
                var r = t - n
                    , s = e - i
                    , a = {};
                a.transform = this.getTranslate(r, s),
                    this.transition({
                        to: a,
                        onTransitionEnd: {
                            transform: this.layoutPosition
                        },
                        isCleaning: !0
                    })
            }
            ,
            l.getTranslate = function (t, e) {
                var n = this.layout._getOption("originLeft")
                    , i = this.layout._getOption("originTop");
                return t = n ? t : -t,
                    e = i ? e : -e,
                    "translate3d(" + t + "px, " + e + "px, 0)"
            }
            ,
            l.goTo = function (t, e) {
                this.setPosition(t, e),
                    this.layoutPosition()
            }
            ,
            l.moveTo = l._transitionTo,
            l.setPosition = function (t, e) {
                this.position.x = parseFloat(t),
                    this.position.y = parseFloat(e)
            }
            ,
            l._nonTransition = function (t) {
                this.css(t.to),
                    t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd)
                    t.onTransitionEnd[e].call(this)
            }
            ,
            l.transition = function (t) {
                if (!parseFloat(this.layout.options.transitionDuration))
                    return void this._nonTransition(t);
                var e = this._transn;
                for (var n in t.onTransitionEnd)
                    e.onEnd[n] = t.onTransitionEnd[n];
                for (n in t.to)
                    e.ingProperties[n] = !0,
                        t.isCleaning && (e.clean[n] = !0);
                if (t.from) {
                    this.css(t.from);
                    this.element.offsetHeight;
                    null
                }
                this.enableTransition(t.to),
                    this.css(t.to),
                    this.isTransitioning = !0
            }
            ;
        var p = "opacity," + o(a);
        l.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                t = "number" == typeof t ? t + "ms" : t,
                    this.css({
                        transitionProperty: p,
                        transitionDuration: t,
                        transitionDelay: this.staggerDelay || 0
                    }),
                    this.element.addEventListener(u, this, !1)
            }
        }
            ,
            l.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t)
            }
            ,
            l.onotransitionend = function (t) {
                this.ontransitionend(t)
            }
            ;
        var d = {
            "-webkit-transform": "transform"
        };
        l.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn
                    , i = d[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i],
                    n(e.ingProperties) && this.disableTransition(),
                    i in e.clean && (this.element.style[t.propertyName] = "",
                        delete e.clean[i]),
                    i in e.onEnd) {
                    e.onEnd[i].call(this),
                        delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }
            ,
            l.disableTransition = function () {
                this.removeTransitionStyles(),
                    this.element.removeEventListener(u, this, !1),
                    this.isTransitioning = !1
            }
            ,
            l._removeStyles = function (t) {
                var e = {};
                for (var n in t)
                    e[n] = "";
                this.css(e)
            }
            ;
        var f = {
            transitionProperty: "",
            transitionDuration: "",
            transitionDelay: ""
        };
        return l.removeTransitionStyles = function () {
            this.css(f)
        }
            ,
            l.stagger = function (t) {
                t = isNaN(t) ? 0 : t,
                    this.staggerDelay = t + "ms"
            }
            ,
            l.removeElem = function () {
                this.element.parentNode.removeChild(this.element),
                    this.css({
                        display: ""
                    }),
                    this.emitEvent("remove", [this])
            }
            ,
            l.remove = function () {
                return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                    this.removeElem()
                }),
                    void this.hide()) : void this.removeElem()
            }
            ,
            l.reveal = function () {
                delete this.isHidden,
                    this.css({
                        display: ""
                    });
                var t = this.layout.options
                    , e = {};
                e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd,
                    this.transition({
                        from: t.hiddenStyle,
                        to: t.visibleStyle,
                        isCleaning: !0,
                        onTransitionEnd: e
                    })
            }
            ,
            l.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal")
            }
            ,
            l.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity)
                    return "opacity";
                for (var n in e)
                    return n
            }
            ,
            l.hide = function () {
                this.isHidden = !0,
                    this.css({
                        display: ""
                    });
                var t = this.layout.options
                    , e = {};
                e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd,
                    this.transition({
                        from: t.visibleStyle,
                        to: t.hiddenStyle,
                        isCleaning: !0,
                        onTransitionEnd: e
                    })
            }
            ,
            l.onHideTransitionEnd = function () {
                this.isHidden && (this.css({
                    display: "none"
                }),
                    this.emitEvent("hide"))
            }
            ,
            l.destroy = function () {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }
            ,
            i
    }),
    function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (n, i, o, r) {
            return e(t, n, i, o, r)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, function (t, e, n, i, o) {
        "use strict";
        function r(t, e) {
            var n = i.getQueryElement(t);
            if (!n)
                return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (n || t)));
            this.element = n,
                c && (this.$element = c(this.element)),
                this.options = i.extend({}, this.constructor.defaults),
                this.option(e);
            var o = ++p;
            this.element.outlayerGUID = o,
                d[o] = this,
                this._create(),
                this._getOption("initLayout") && this.layout()
        }
        function s(t) {
            function e() {
                t.apply(this, arguments)
            }
            return e.prototype = Object.create(t.prototype),
                e.prototype.constructor = e,
                e
        }
        function a(t) {
            if ("number" == typeof t)
                return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/)
                , n = e && e[1]
                , i = e && e[2];
            return n.length ? (n = parseFloat(n)) * (h[i] || 1) : 0
        }
        var u = t.console
            , c = t.jQuery
            , l = function () { }
            , p = 0
            , d = {};
        r.namespace = "outlayer",
            r.Item = o,
            r.defaults = {
                containerStyle: {
                    position: "relative"
                },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            };
        var f = r.prototype;
        i.extend(f, e.prototype),
            f.option = function (t) {
                i.extend(this.options, t)
            }
            ,
            f._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
            }
            ,
            r.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer"
            },
            f._create = function () {
                this.reloadItems(),
                    this.stamps = [],
                    this.stamp(this.options.stamp),
                    i.extend(this.element.style, this.options.containerStyle),
                    this._getOption("resize") && this.bindResize()
            }
            ,
            f.reloadItems = function () {
                this.items = this._itemize(this.element.children)
            }
            ,
            f._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), n = this.constructor.Item, i = [], o = 0; o < e.length; o++) {
                    var r = e[o]
                        , s = new n(r, this);
                    i.push(s)
                }
                return i
            }
            ,
            f._filterFindItemElements = function (t) {
                return i.filterFindElements(t, this.options.itemSelector)
            }
            ,
            f.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element
                })
            }
            ,
            f.layout = function () {
                this._resetLayout(),
                    this._manageStamps();
                var t = this._getOption("layoutInstant")
                    , e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e),
                    this._isLayoutInited = !0
            }
            ,
            f._init = f.layout,
            f._resetLayout = function () {
                this.getSize()
            }
            ,
            f.getSize = function () {
                this.size = n(this.element)
            }
            ,
            f._getMeasurement = function (t, e) {
                var i, o = this.options[t];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : o instanceof HTMLElement && (i = o),
                    this[t] = i ? n(i)[e] : o) : this[t] = 0
            }
            ,
            f.layoutItems = function (t, e) {
                t = this._getItemsForLayout(t),
                    this._layoutItems(t, e),
                    this._postLayout()
            }
            ,
            f._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored
                })
            }
            ,
            f._layoutItems = function (t, e) {
                if (this._emitCompleteOnItems("layout", t),
                    t && t.length) {
                    var n = [];
                    t.forEach(function (t) {
                        var i = this._getItemLayoutPosition(t);
                        i.item = t,
                            i.isInstant = e || t.isLayoutInstant,
                            n.push(i)
                    }, this),
                        this._processLayoutQueue(n)
                }
            }
            ,
            f._getItemLayoutPosition = function () {
                return {
                    x: 0,
                    y: 0
                }
            }
            ,
            f._processLayoutQueue = function (t) {
                this.updateStagger(),
                    t.forEach(function (t, e) {
                        this._positionItem(t.item, t.x, t.y, t.isInstant, e)
                    }, this)
            }
            ,
            f.updateStagger = function () {
                var t = this.options.stagger;
                return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t),
                    this.stagger)
            }
            ,
            f._positionItem = function (t, e, n, i, o) {
                i ? t.goTo(e, n) : (t.stagger(o * this.stagger),
                    t.moveTo(e, n))
            }
            ,
            f._postLayout = function () {
                this.resizeContainer()
            }
            ,
            f.resizeContainer = function () {
                if (this._getOption("resizeContainer")) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0),
                        this._setContainerMeasure(t.height, !1))
                }
            }
            ,
            f._getContainerSize = l,
            f._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var n = this.size;
                    n.isBorderBox && (t += e ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth),
                        t = Math.max(t, 0),
                        this.element.style[e ? "width" : "height"] = t + "px"
                }
            }
            ,
            f._emitCompleteOnItems = function (t, e) {
                function n() {
                    o.dispatchEvent(t + "Complete", null, [e])
                }
                function i() {
                    ++s == r && n()
                }
                var o = this
                    , r = e.length;
                if (!e || !r)
                    return void n();
                var s = 0;
                e.forEach(function (e) {
                    e.once(t, i)
                })
            }
            ,
            f.dispatchEvent = function (t, e, n) {
                var i = e ? [e].concat(n) : n;
                if (this.emitEvent(t, i),
                    c)
                    if (this.$element = this.$element || c(this.element),
                        e) {
                        var o = c.Event(e);
                        o.type = t,
                            this.$element.trigger(o, n)
                    } else
                        this.$element.trigger(t, n)
            }
            ,
            f.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }
            ,
            f.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }
            ,
            f.stamp = function (t) {
                (t = this._find(t)) && (this.stamps = this.stamps.concat(t),
                    t.forEach(this.ignore, this))
            }
            ,
            f.unstamp = function (t) {
                (t = this._find(t)) && t.forEach(function (t) {
                    i.removeFrom(this.stamps, t),
                        this.unignore(t)
                }, this)
            }
            ,
            f._find = function (t) {
                if (t)
                    return "string" == typeof t && (t = this.element.querySelectorAll(t)),
                        t = i.makeArray(t)
            }
            ,
            f._manageStamps = function () {
                this.stamps && this.stamps.length && (this._getBoundingRect(),
                    this.stamps.forEach(this._manageStamp, this))
            }
            ,
            f._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect()
                    , e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }
            ,
            f._manageStamp = l,
            f._getElementOffset = function (t) {
                var e = t.getBoundingClientRect()
                    , i = this._boundingRect
                    , o = n(t);
                return {
                    left: e.left - i.left - o.marginLeft,
                    top: e.top - i.top - o.marginTop,
                    right: i.right - e.right - o.marginRight,
                    bottom: i.bottom - e.bottom - o.marginBottom
                }
            }
            ,
            f.handleEvent = i.handleEvent,
            f.bindResize = function () {
                t.addEventListener("resize", this),
                    this.isResizeBound = !0
            }
            ,
            f.unbindResize = function () {
                t.removeEventListener("resize", this),
                    this.isResizeBound = !1
            }
            ,
            f.onresize = function () {
                this.resize()
            }
            ,
            i.debounceMethod(r, "onresize", 100),
            f.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }
            ,
            f.needsResizeLayout = function () {
                var t = n(this.element);
                return this.size && t && t.innerWidth !== this.size.innerWidth
            }
            ,
            f.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)),
                    e
            }
            ,
            f.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0),
                    this.reveal(e))
            }
            ,
            f.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var n = this.items.slice(0);
                    this.items = e.concat(n),
                        this._resetLayout(),
                        this._manageStamps(),
                        this.layoutItems(e, !0),
                        this.reveal(e),
                        this.layoutItems(n)
                }
            }
            ,
            f.reveal = function (t) {
                if (this._emitCompleteOnItems("reveal", t),
                    t && t.length) {
                    var e = this.updateStagger();
                    t.forEach(function (t, n) {
                        t.stagger(n * e),
                            t.reveal()
                    })
                }
            }
            ,
            f.hide = function (t) {
                if (this._emitCompleteOnItems("hide", t),
                    t && t.length) {
                    var e = this.updateStagger();
                    t.forEach(function (t, n) {
                        t.stagger(n * e),
                            t.hide()
                    })
                }
            }
            ,
            f.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e)
            }
            ,
            f.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e)
            }
            ,
            f.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var n = this.items[e];
                    if (n.element == t)
                        return n
                }
            }
            ,
            f.getItems = function (t) {
                t = i.makeArray(t);
                var e = [];
                return t.forEach(function (t) {
                    var n = this.getItem(t);
                    n && e.push(n)
                }, this),
                    e
            }
            ,
            f.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e),
                    e && e.length && e.forEach(function (t) {
                        t.remove(),
                            i.removeFrom(this.items, t)
                    }, this)
            }
            ,
            f.destroy = function () {
                var t = this.element.style;
                t.height = "",
                    t.position = "",
                    t.width = "",
                    this.items.forEach(function (t) {
                        t.destroy()
                    }),
                    this.unbindResize();
                var e = this.element.outlayerGUID;
                delete d[e],
                    delete this.element.outlayerGUID,
                    c && c.removeData(this.element, this.constructor.namespace)
            }
            ,
            r.data = function (t) {
                t = i.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && d[e]
            }
            ,
            r.create = function (t, e) {
                var n = s(r);
                return n.defaults = i.extend({}, r.defaults),
                    i.extend(n.defaults, e),
                    n.compatOptions = i.extend({}, r.compatOptions),
                    n.namespace = t,
                    n.data = r.data,
                    n.Item = s(o),
                    i.htmlInit(n, t),
                    c && c.bridget && c.bridget(t, n),
                    n
            }
            ;
        var h = {
            ms: 1,
            s: 1e3
        };
        return r.Item = o,
            r
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {},
            t.Isotope.Item = e(t.Outlayer))
    }(window, function (t) {
        "use strict";
        function e() {
            t.Item.apply(this, arguments)
        }
        var n = e.prototype = Object.create(t.Item.prototype)
            , i = n._create;
        n._create = function () {
            this.id = this.layout.itemGUID++,
                i.call(this),
                this.sortData = {}
        }
            ,
            n.updateSortData = function () {
                if (!this.isIgnored) {
                    this.sortData.id = this.id,
                        this.sortData["original-order"] = this.id,
                        this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData
                        , e = this.layout._sorters;
                    for (var n in t) {
                        var i = e[n];
                        this.sortData[n] = i(this.element, this)
                    }
                }
            }
            ;
        var o = n.destroy;
        return n.destroy = function () {
            o.apply(this, arguments),
                this.css({
                    display: ""
                })
        }
            ,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {},
            t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window, function (t, e) {
        "use strict";
        function n(t) {
            this.isotope = t,
                t && (this.options = t.options[this.namespace],
                    this.element = t.element,
                    this.items = t.filteredItems,
                    this.size = t.size)
        }
        var i = n.prototype;
        return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (t) {
            i[t] = function () {
                return e.prototype[t].apply(this.isotope, arguments)
            }
        }),
            i.needsVerticalResizeLayout = function () {
                var e = t(this.isotope.element);
                return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight
            }
            ,
            i._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments)
            }
            ,
            i.getColumnWidth = function () {
                this.getSegmentSize("column", "Width")
            }
            ,
            i.getRowHeight = function () {
                this.getSegmentSize("row", "Height")
            }
            ,
            i.getSegmentSize = function (t, e) {
                var n = t + e
                    , i = "outer" + e;
                if (this._getMeasurement(n, i),
                    !this[n]) {
                    var o = this.getFirstItemSize();
                    this[n] = o && o[i] || this.isotope.size["inner" + e]
                }
            }
            ,
            i.getFirstItemSize = function () {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element)
            }
            ,
            i.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments)
            }
            ,
            i.getSize = function () {
                this.isotope.getSize(),
                    this.size = this.isotope.size
            }
            ,
            n.modes = {},
            n.create = function (t, e) {
                function o() {
                    n.apply(this, arguments)
                }
                return o.prototype = Object.create(i),
                    o.prototype.constructor = o,
                    e && (o.options = e),
                    o.prototype.namespace = t,
                    n.modes[t] = o,
                    o
            }
            ,
            n
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window, function (t, e) {
        var n = t.create("masonry");
        n.compatOptions.fitWidth = "isFitWidth";
        var i = n.prototype;
        return i._resetLayout = function () {
            this.getSize(),
                this._getMeasurement("columnWidth", "outerWidth"),
                this._getMeasurement("gutter", "outerWidth"),
                this.measureColumns(),
                this.colYs = [];
            for (var t = 0; t < this.cols; t++)
                this.colYs.push(0);
            this.maxY = 0,
                this.horizontalColIndex = 0
        }
            ,
            i.measureColumns = function () {
                if (this.getContainerWidth(),
                    !this.columnWidth) {
                    var t = this.items[0]
                        , n = t && t.element;
                    this.columnWidth = n && e(n).outerWidth || this.containerWidth
                }
                var i = this.columnWidth += this.gutter
                    , o = this.containerWidth + this.gutter
                    , r = o / i
                    , s = i - o % i
                    , a = s && s < 1 ? "round" : "floor";
                r = Math[a](r),
                    this.cols = Math.max(r, 1)
            }
            ,
            i.getContainerWidth = function () {
                var t = this._getOption("fitWidth")
                    , n = t ? this.element.parentNode : this.element
                    , i = e(n);
                this.containerWidth = i && i.innerWidth
            }
            ,
            i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth
                    , n = e && e < 1 ? "round" : "ceil"
                    , i = Math[n](t.size.outerWidth / this.columnWidth);
                i = Math.min(i, this.cols);
                for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](i, t), s = {
                    x: this.columnWidth * r.col,
                    y: r.y
                }, a = r.y + t.size.outerHeight, u = i + r.col, c = r.col; c < u; c++)
                    this.colYs[c] = a;
                return s
            }
            ,
            i._getTopColPosition = function (t) {
                var e = this._getTopColGroup(t)
                    , n = Math.min.apply(Math, e);
                return {
                    col: e.indexOf(n),
                    y: n
                }
            }
            ,
            i._getTopColGroup = function (t) {
                if (t < 2)
                    return this.colYs;
                for (var e = [], n = this.cols + 1 - t, i = 0; i < n; i++)
                    e[i] = this._getColGroupY(i, t);
                return e
            }
            ,
            i._getColGroupY = function (t, e) {
                if (e < 2)
                    return this.colYs[t];
                var n = this.colYs.slice(t, t + e);
                return Math.max.apply(Math, n)
            }
            ,
            i._getHorizontalColPosition = function (t, e) {
                var n = this.horizontalColIndex % this.cols;
                n = t > 1 && n + t > this.cols ? 0 : n;
                var i = e.size.outerWidth && e.size.outerHeight;
                return this.horizontalColIndex = i ? n + t : this.horizontalColIndex,
                {
                    col: n,
                    y: this._getColGroupY(n, t)
                }
            }
            ,
            i._manageStamp = function (t) {
                var n = e(t)
                    , i = this._getElementOffset(t)
                    , o = this._getOption("originLeft")
                    , r = o ? i.left : i.right
                    , s = r + n.outerWidth
                    , a = Math.floor(r / this.columnWidth);
                a = Math.max(0, a);
                var u = Math.floor(s / this.columnWidth);
                u -= s % this.columnWidth ? 0 : 1,
                    u = Math.min(this.cols - 1, u);
                for (var c = this._getOption("originTop"), l = (c ? i.top : i.bottom) + n.outerHeight, p = a; p <= u; p++)
                    this.colYs[p] = Math.max(l, this.colYs[p])
            }
            ,
            i._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()),
                    t
            }
            ,
            i._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)
                    t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }
            ,
            i.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(),
                    t != this.containerWidth
            }
            ,
            n
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window, function (t, e) {
        "use strict";
        var n = t.create("masonry")
            , i = n.prototype
            , o = {
                _getElementOffset: !0,
                layout: !0,
                _getMeasurement: !0
            };
        for (var r in e.prototype)
            o[r] || (i[r] = e.prototype[r]);
        var s = i.measureColumns;
        i.measureColumns = function () {
            this.items = this.isotope.filteredItems,
                s.call(this)
        }
            ;
        var a = i._getOption;
        return i._getOption = function (t) {
            return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
        }
            ,
            n
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function (t) {
        "use strict";
        var e = t.create("fitRows")
            , n = e.prototype;
        return n._resetLayout = function () {
            this.x = 0,
                this.y = 0,
                this.maxY = 0,
                this._getMeasurement("gutter", "outerWidth")
        }
            ,
            n._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter
                    , n = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > n && (this.x = 0,
                    this.y = this.maxY);
                var i = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight),
                    this.x += e,
                    i
            }
            ,
            n._getContainerSize = function () {
                return {
                    height: this.maxY
                }
            }
            ,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function (t) {
        "use strict";
        var e = t.create("vertical", {
            horizontalAlignment: 0
        })
            , n = e.prototype;
        return n._resetLayout = function () {
            this.y = 0
        }
            ,
            n._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment
                    , n = this.y;
                return this.y += t.size.outerHeight,
                {
                    x: e,
                    y: n
                }
            }
            ,
            n._getContainerSize = function () {
                return {
                    height: this.y
                }
            }
            ,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function (n, i, o, r, s, a) {
            return e(t, n, i, o, r, s, a)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window, function (t, e, n, i, o, r, s) {
        function a(t, e) {
            return function (n, i) {
                for (var o = 0; o < t.length; o++) {
                    var r = t[o]
                        , s = n.sortData[r]
                        , a = i.sortData[r];
                    if (s > a || s < a) {
                        var u = void 0 !== e[r] ? e[r] : e
                            , c = u ? 1 : -1;
                        return (s > a ? 1 : -1) * c
                    }
                }
                return 0
            }
        }
        var u = t.jQuery
            , c = String.prototype.trim ? function (t) {
                return t.trim()
            }
                : function (t) {
                    return t.replace(/^\s+|\s+$/g, "")
                }
            , l = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        l.Item = r,
            l.LayoutMode = s;
        var p = l.prototype;
        p._create = function () {
            this.itemGUID = 0,
                this._sorters = {},
                this._getSorters(),
                e.prototype._create.call(this),
                this.modes = {},
                this.filteredItems = this.items,
                this.sortHistory = ["original-order"];
            for (var t in s.modes)
                this._initLayoutMode(t)
        }
            ,
            p.reloadItems = function () {
                this.itemGUID = 0,
                    e.prototype.reloadItems.call(this)
            }
            ,
            p._itemize = function () {
                for (var t = e.prototype._itemize.apply(this, arguments), n = 0; n < t.length; n++) {
                    t[n].id = this.itemGUID++
                }
                return this._updateItemsSortData(t),
                    t
            }
            ,
            p._initLayoutMode = function (t) {
                var e = s.modes[t]
                    , n = this.options[t] || {};
                this.options[t] = e.options ? o.extend(e.options, n) : n,
                    this.modes[t] = new e(this)
            }
            ,
            p.layout = function () {
                return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
            }
            ,
            p._layout = function () {
                var t = this._getIsInstant();
                this._resetLayout(),
                    this._manageStamps(),
                    this.layoutItems(this.filteredItems, t),
                    this._isLayoutInited = !0
            }
            ,
            p.arrange = function (t) {
                this.option(t),
                    this._getIsInstant();
                var e = this._filter(this.items);
                this.filteredItems = e.matches,
                    this._bindArrangeComplete(),
                    this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e),
                    this._sort(),
                    this._layout()
            }
            ,
            p._init = p.arrange,
            p._hideReveal = function (t) {
                this.reveal(t.needReveal),
                    this.hide(t.needHide)
            }
            ,
            p._getIsInstant = function () {
                var t = this._getOption("layoutInstant")
                    , e = void 0 !== t ? t : !this._isLayoutInited;
                return this._isInstant = e,
                    e
            }
            ,
            p._bindArrangeComplete = function () {
                function t() {
                    e && n && i && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
                }
                var e, n, i, o = this;
                this.once("layoutComplete", function () {
                    e = !0,
                        t()
                }),
                    this.once("hideComplete", function () {
                        n = !0,
                            t()
                    }),
                    this.once("revealComplete", function () {
                        i = !0,
                            t()
                    })
            }
            ,
            p._filter = function (t) {
                var e = this.options.filter;
                e = e || "*";
                for (var n = [], i = [], o = [], r = this._getFilterTest(e), s = 0; s < t.length; s++) {
                    var a = t[s];
                    if (!a.isIgnored) {
                        var u = r(a);
                        u && n.push(a),
                            u && a.isHidden ? i.push(a) : u || a.isHidden || o.push(a)
                    }
                }
                return {
                    matches: n,
                    needReveal: i,
                    needHide: o
                }
            }
            ,
            p._getFilterTest = function (t) {
                return u && this.options.isJQueryFiltering ? function (e) {
                    return u(e.element).is(t)
                }
                    : "function" == typeof t ? function (e) {
                        return t(e.element)
                    }
                        : function (e) {
                            return i(e.element, t)
                        }
            }
            ,
            p.updateSortData = function (t) {
                var e;
                t ? (t = o.makeArray(t),
                    e = this.getItems(t)) : e = this.items,
                    this._getSorters(),
                    this._updateItemsSortData(e)
            }
            ,
            p._getSorters = function () {
                var t = this.options.getSortData;
                for (var e in t) {
                    var n = t[e];
                    this._sorters[e] = d(n)
                }
            }
            ,
            p._updateItemsSortData = function (t) {
                for (var e = t && t.length, n = 0; e && n < e; n++) {
                    t[n].updateSortData()
                }
            }
            ;
        var d = function () {
            function t(t) {
                if ("string" != typeof t)
                    return t;
                var n = c(t).split(" ")
                    , i = n[0]
                    , o = i.match(/^\[(.+)\]$/)
                    , r = o && o[1]
                    , s = e(r, i)
                    , a = l.sortDataParsers[n[1]];
                return t = a ? function (t) {
                    return t && a(s(t))
                }
                    : function (t) {
                        return t && s(t)
                    }
            }
            function e(t, e) {
                return t ? function (e) {
                    return e.getAttribute(t)
                }
                    : function (t) {
                        var n = t.querySelector(e);
                        return n && n.textContent
                    }
            }
            return t
        }();
        l.sortDataParsers = {
            parseInt: function (t) {
                return parseInt(t, 10)
            },
            parseFloat: function (t) {
                return parseFloat(t)
            }
        },
            p._sort = function () {
                if (this.options.sortBy) {
                    var t = o.makeArray(this.options.sortBy);
                    this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
                    var e = a(this.sortHistory, this.options.sortAscending);
                    this.filteredItems.sort(e)
                }
            }
            ,
            p._getIsSameSortBy = function (t) {
                for (var e = 0; e < t.length; e++)
                    if (t[e] != this.sortHistory[e])
                        return !1;
                return !0
            }
            ,
            p._mode = function () {
                var t = this.options.layoutMode
                    , e = this.modes[t];
                if (!e)
                    throw new Error("No layout mode: " + t);
                return e.options = this.options[t],
                    e
            }
            ,
            p._resetLayout = function () {
                e.prototype._resetLayout.call(this),
                    this._mode()._resetLayout()
            }
            ,
            p._getItemLayoutPosition = function (t) {
                return this._mode()._getItemLayoutPosition(t)
            }
            ,
            p._manageStamp = function (t) {
                this._mode()._manageStamp(t)
            }
            ,
            p._getContainerSize = function () {
                return this._mode()._getContainerSize()
            }
            ,
            p.needsResizeLayout = function () {
                return this._mode().needsResizeLayout()
            }
            ,
            p.appended = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var n = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(n)
                }
            }
            ,
            p.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(),
                        this._manageStamps();
                    var n = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems),
                        this.filteredItems = n.concat(this.filteredItems),
                        this.items = e.concat(this.items)
                }
            }
            ,
            p._filterRevealAdded = function (t) {
                var e = this._filter(t);
                return this.hide(e.needHide),
                    this.reveal(e.matches),
                    this.layoutItems(e.matches, !0),
                    e.matches
            }
            ,
            p.insert = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var n, i, o = e.length;
                    for (n = 0; n < o; n++)
                        i = e[n],
                            this.element.appendChild(i.element);
                    var r = this._filter(e).matches;
                    for (n = 0; n < o; n++)
                        e[n].isLayoutInstant = !0;
                    for (this.arrange(),
                        n = 0; n < o; n++)
                        delete e[n].isLayoutInstant;
                    this.reveal(r)
                }
            }
            ;
        var f = p.remove;
        return p.remove = function (t) {
            t = o.makeArray(t);
            var e = this.getItems(t);
            f.call(this, t);
            for (var n = e && e.length, i = 0; n && i < n; i++) {
                var r = e[i];
                o.removeFrom(this.filteredItems, r)
            }
        }
            ,
            p.shuffle = function () {
                for (var t = 0; t < this.items.length; t++) {
                    this.items[t].sortData.random = Math.random()
                }
                this.options.sortBy = "random",
                    this._sort(),
                    this._layout()
            }
            ,
            p._noTransition = function (t, e) {
                var n = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var i = t.apply(this, e);
                return this.options.transitionDuration = n,
                    i
            }
            ,
            p.getFilteredItemElements = function () {
                return this.filteredItems.map(function (t) {
                    return t.element
                })
            }
            ,
            l
    }),
    window.$ = document.querySelectorAll.bind(document),
    Node.prototype.on = window.on = function (t, e) {
        this.addEventListener(t, e)
    }
    ,
    NodeList.prototype.__proto__ = Array.prototype,
    NodeList.prototype.on = NodeList.prototype.addEventListener = function (t, e) {
        this.forEach(function (n) {
            n.on(t, e)
        })
    }
    ;
var isMobile = window.matchMedia("(max-width: 640px)").matches
    , ColorPicker = function (t) {
        var e = Object.create(ColorPicker.prototype);
        e.gradient = t,
            e.joe,
            e.alpha;
        var n = function () {
            var t = i(STOPS[0][0][1][0])
                , n = $(".js-picker")[0];
            e.joe = colorjoe.rgb(n, t, ["alpha", "hex", ["fields", {
                space: "RGBA",
                limit: [255, 255, 255, 100]
            }]]),
                e.alpha = $(".js-alpha-color")[0],
                o()
        }
            , i = function (t) {
                return "rgba(" + t[0][0] + "," + t[0][1] + "," + t[0][2] + "," + t[0][3] + ")"
            }
            , o = function () {
                e.joe.on("change", function (t) {
                    var n = t.cssa().replace("rgba(", "").replace(")", "").split(",")
                        , i = n.map(function (t) {
                            return parseFloat(t)
                        });
                    e.gradient.updateColor(i)
                })
            };
        return e.setAlphaColor = function (t) {
            var n = t.color[0]
                , i = t.color[1]
                , o = t.color[2]
                , r = "rgba(" + n + "," + i + "," + o + ",1)"
                , s = "rgba(" + n + "," + i + "," + o + ",0)"
                , a = "linear-gradient(to right, " + r + " 0%, " + s + " 100%)";
            e.alpha.style.background = a
        }
            ,
            e.setColor = function (t) {
                var n = t.color[0]
                    , i = t.color[1]
                    , o = t.color[2]
                    , r = t.color[3]
                    , s = "rgba(" + n + "," + i + "," + o + "," + r + ")";
                e.joe.set(s),
                    e.setAlphaColor(t)
            }
            ,
            n(),
            e
    }
    , AnglePicker = function (t, e) {
        var n = Object.create(AnglePicker.prototype);
        n.gradient = t,
            n.angle = e,
            n.angleContainer = $(".js-angle")[0],
            n.pointer = $(".js-pointer")[0],
            n.input = $(".js-angle-input")[0],
            n.dragging = !1,
            n.x = 0,
            n.y = 0;
        var i = function () {
            n.pointer.style.transform = "translateZ(0px) rotate(" + n.angle + "deg)",
                n.input.value = n.angle + "\xb0",
                o()
        }
            , o = function () {
                n.input.on("change", s)
            };
        "ontouchstart" in document.documentElement ? (n.angleContainer.on("touchstart", function (t) {
            t.preventDefault(),
                t.stopPropagation(),
                n.x = t.offsetX || t.layerX,
                n.y = t.offsetY || t.layerY,
                a()
        }),
            n.angleContainer.on("touchmove", function (t) {
                t.preventDefault(),
                    t.stopPropagation(),
                    n.dragging = !0,
                    n.x = t.offsetX || t.layerX,
                    n.y = t.offsetY || t.layerY
            }),
            n.angleContainer.on("touchend", function (t) {
                t.preventDefault(),
                    t.stopPropagation(),
                    n.dragging = !1
            })) : (n.angleContainer.on("mousedown", function (t) {
                n.dragging = !0,
                    n.x = t.offsetX,
                    n.y = t.offsetY,
                    a()
            }),
                n.angleContainer.on("mousemove", function (t) {
                    n.x = t.offsetX,
                        n.y = t.offsetY
                }),
                n.angleContainer.on("mouseup", function () {
                    n.dragging = !1
                }));
        var r = function () {
            n.pointer.style.transform = "translateZ(0px) rotate(" + n.angle + "deg)",
                n.input.value = n.angle + "\xb0",
                n.gradient.updateAngle(n.angle)
        }
            , s = function (t) {
                n.angle = Math.round(parseInt(t.target.value)),
                    r()
            }
            , a = function () {
                x2 = n.x,
                    y2 = n.y,
                    radians = Math.atan2(y2 - 15, x2 - 15),
                    e = radians * (180 / Math.PI),
                    e = 90 + e,
                    e < 0 && (e = 360 + e),
                    e = Math.round(e),
                    n.pointer.style.transform = "translateZ(0px) rotate(" + e + "deg)",
                    n.input.value = Math.round(e) + "\xb0",
                    n.gradient.updateAngle(e)
            };
        n.setAngle = function (t) {
            n.input.value = Math.round(t) + "\xb0",
                r()
        }
            ;
        var u = window.requestAnimationFrame || window.webkitRequestAnimationFrame
            , c = function () {
                !0 === n.dragging && a(),
                    u(c)
            };
        return c(),
            i(),
            n
    }
    , Drag = function (t, e, n) {
        var i = Object.create(Drag.prototype);
        i.point = t,
            i.dom = e,
            i.width = n;
        var o = function () { }
            , r = function (t) {
                var e = t.target
                    , n = (parseFloat(e.getAttribute("data-x")) || 0) + t.dx;
                if ("undefined" != typeof t.restrict && Math.abs(t.restrict.dy) > 120)
                    return void i.point.destroy();
                e.style.webkitTransform = e.style.transform = "translateX(" + n + "px)",
                    e.setAttribute("data-x", n);
                var o = Math.round(n / (i.width - 28) * 100);
                o > 100 && (o = 100),
                    i.point.setPosition(o)
            }
            , s = function () {
                i.point.updateStop()
            };
        return interact(i.dom).draggable({
            inertia: {
                resistance: 5,
                minSpeed: 200
            },
            restrict: {
                restriction: "parent",
                elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                }
            },
            onstart: o,
            onmove: r,
            onend: s
        }),
            i
    }
    , Point = function (t, e, n) {
        var i = Object.create(Point.prototype);
        i.gradient = t,
            i.color = e ? e[0] : [0, 0, 0, 0],
            i.position = e ? e[1] : 0,
            i.isActive = !1,
            i.input,
            i.pointBG,
            i.stop,
            i.tile,
            i.inputHex,
            i.inputPosition,
            i.deleteButton;
        var o = function () {
            i.dom = document.createElement("div"),
                i.dom.classList.add("js-draggable"),
                i.dom.classList.add("app-gradient__point"),
                p(),
                c(),
                f(),
                h()
        }
            , r = function () {
                var t = s();
                return one.color(t).hex()
            }
            , s = function () {
                return "rgb(" + i.color[0] + "," + i.color[1] + "," + i.color[2] + ")"
            }
            , a = function () {
                i.setActive();
                i.color[0],
                    i.color[1],
                    i.color[2],
                    i.color[3]
            }
            , u = function () {
                i.position = this.value,
                    i.setPosition(i.position);
                var t = Math.round(.01 * i.position * (i.gradient.width - 28));
                i.dom.dataset.x = t,
                    i.dom.style.transform = "translateX(" + t + "px)"
            }
            , c = function () {
                i.inputHex.value = r();
                var t = s();
                i.pointBG.style.backgroundColor = t,
                    i.tile.style.backgroundColor = t
            }
            , l = function () {
                var t = document.createElement("label");
                t.classList.add("app-gradient__point-label");
                var e = document.createElement("div");
                return e.classList.add("app-gradient__point-label-bg"),
                    i.input = document.createElement("input"),
                    i.input.classList.add("app-gradient__point-input"),
                    i.input.value = i.position,
                    t.appendChild(e),
                    t.appendChild(i.input),
                    t
            }
            , p = function () {
                var t = Math.round(.01 * i.position * (i.gradient.width - 28));
                i.dom.dataset.x = t,
                    i.dom.style.transform = "translateX(" + t + "px)",
                    i.dom.setAttribute("touch-action", "none");
                var e = document.createElement("div");
                e.classList.add("app-gradient__point-background");
                var n = document.createElement("div");
                n.classList.add("app-gradient__point-visual"),
                    i.pointBG = document.createElement("div"),
                    i.pointBG.classList.add("app-gradient__point-color"),
                    i.dom.appendChild(e),
                    i.dom.appendChild(n),
                    i.dom.appendChild(i.pointBG),
                    i.dom.appendChild(l()),
                    i.gradient.container.appendChild(i.dom),
                    d()
            }
            , d = function () {
                var t = $(".js-stops")[0];
                i.stop = document.createElement("div"),
                    i.stop.classList.add("app-color__stop"),
                    i.isActive && i.stop.classList.add("is-active");
                var e = document.createElement("div");
                e.classList.add("app-color__stop-color");
                var o = document.createElement("div");
                o.classList.add("app-color__stop-color-bg"),
                    i.tile = document.createElement("div"),
                    i.tile.classList.add("app-color__stop-color-tile"),
                    i.tile.style.backgroundColor = s(),
                    o.appendChild(i.tile),
                    e.appendChild(o);
                var a = document.createElement("div");
                a.classList.add("app-color__stop-hex"),
                    i.inputHex = document.createElement("input"),
                    i.inputHex.value = r(),
                    a.appendChild(i.inputHex);
                var u = document.createElement("div");
                u.classList.add("app-color__stop-position"),
                    i.inputPosition = document.createElement("input"),
                    i.inputPosition.value = i.position,
                    u.appendChild(i.inputPosition);
                var c = document.createElement("div");
                c.classList.add("app-color__stop-action"),
                    i.deleteButton = document.createElement("button"),
                    i.deleteButton.classList.add("app-color__stop-action-button"),
                    i.deleteButton.innerHTML = "&times",
                    c.appendChild(i.deleteButton),
                    i.stop.appendChild(e),
                    i.stop.appendChild(a),
                    i.stop.appendChild(u),
                    i.stop.appendChild(c),
                    n ? (t.insertBefore(i.stop, n.stop),
                        n = null) : t.appendChild(i.stop),
                    h()
            }
            , f = function () {
                Drag(i, i.dom, i.gradient.width);
                i.dom.on("pointerdown", a),
                    i.input.on("change", u)
            }
            , h = function () {
                i.tile.on("click", i.setActive),
                    i.inputHex.on("change", i.setHex),
                    i.inputHex.on("focus", i.setActive),
                    i.inputPosition.on("change", u),
                    i.inputPosition.on("focus", i.setActive),
                    i.deleteButton.on("click", i.destroy)
            };
        return i.renderStop = d,
            i.updateStop = i.gradient.renderStops,
            i.setActive = function () {
                i.isActive = !0,
                    i.dom.classList.add("is-active"),
                    i.stop.classList.add("is-active"),
                    i.gradient.setCurrentPoint(i)
            }
            ,
            i.removeActive = function () {
                i.isActive = !1,
                    i.dom.classList.remove("is-active"),
                    i.stop.classList.remove("is-active")
            }
            ,
            i.setHex = function (t) {
                var e = t.target.value;
                "#" !== e.charAt(0) && (e = "#" + e);
                var n = one.color(e);
                if (n)
                    var o = n.hex();
                else
                    var o = "#000000";
                t.target.value = o;
                var r = one.color(o).cssa().replace("rgba(", "").replace(")", "").split(",")
                    , s = r.map(function (t) {
                        return parseFloat(t)
                    });
                i.setColor(s),
                    i.gradient.updatePicker()
            }
            ,
            i.setColor = function (t) {
                i.color = t,
                    c()
            }
            ,
            i.setPosition = function (t) {
                i.position = t,
                    i.input.value = t,
                    i.inputPosition.value = t,
                    i.gradient.updateGradient(i),
                    i.updateStop()
            }
            ,
            i.checkDelete = function () {
                "INPUT" !== document.activeElement.tagName && i.isActive && i.destroy()
            }
            ,
            i.destroy = function () {
                if (i.gradient.points.length <= 2)
                    return void console.warn("You must have at least 2 points");
                i.dom.parentNode.removeChild(i.dom),
                    i.stop.parentNode.removeChild(i.stop),
                    i.gradient.removePoint(i)
            }
            ,
            i.clear = function () {
                i.dom.parentNode.removeChild(i.dom),
                    i.stop.parentNode.removeChild(i.stop)
            }
            ,
            o(),
            i
    }
    , Gradient = function (t, e, n, i) {
        var o = Object.create(Gradient.prototype);
        o.stops = t,
            o.type = e,
            o.angle = n,
            o.index = i,
            o.points = [],
            o.currentPoint,
            o.colorPicker,
            o.gradientBackground = $(".js-header")[0],
            o.gradientToolBackground = $(".js-background")[0],
            o.gradientCopyButton = $(".js-button-copy")[0],
            o.stopsDOM = $(".js-stops")[0],
            o.container = $(".js-drag")[0],
            o.width = o.container.scrollWidth,
            o.code = $(".js-code")[0],
            o.buttonLinear = $(".js-button-linear")[0],
            o.buttonRadial = $(".js-button-radial")[0],
            o.swatch = $(".js-swatch")[i];
        var r = function () {
            o.colorPicker = ColorPicker(o),
                o.anglePicker = AnglePicker(o, o.angle),
                t.forEach(function (t) {
                    var e = Point(o, t);
                    o.points.push(e)
                }),
                o.points[1].setActive(!0),
                "linear-gradient" === o.type ? u(null, !0) : c(null, !0),
                m()
        }
            , s = function (t) {
                8 !== t.keyCode && 46 != t.keyCode || o.currentPoint.checkDelete()
            }
            , a = function (t) {
                if (t.target.classList.contains("js-drag")) {
                    var e, n, i, r = Math.round(t.offsetX / o.width * 100);
                    if (o.points.some(function (t) {
                        if (t.position <= r)
                            e = t;
                        else if (t.position >= r)
                            return n = t,
                                !0
                    }),
                        e && n) {
                        var s = (r - e.position) / (n.position - e.position)
                            , a = pickHex(e.color, n.color, 1 - s);
                        a.push(1),
                            i = [a, r]
                    } else {
                        i = [(e || n).color, r]
                    }
                    var u = Point(o, i, n);
                    o.points.push(u),
                        u.setActive(),
                        o.setCurrentPoint(u),
                        p()
                }
            }
            , u = function (t, e) {
                o.buttonRadial.classList.remove("is-active"),
                    o.buttonLinear.classList.add("is-active"),
                    o.type = "linear-gradient",
                    $(".app-option")[1].style.display = "block",
                    e || p()
            }
            , c = function (t, e) {
                o.buttonLinear.classList.remove("is-active"),
                    o.buttonRadial.classList.add("is-active"),
                    o.type = "radial-gradient",
                    $(".app-option")[1].style.display = "none",
                    e || p()
            }
            , l = function () {
                var t = "linear-gradient(90deg, ";
                return o.points.forEach(function (e, n) {
                    var i = e.color[0]
                        , r = e.color[1]
                        , s = e.color[2]
                        , a = "rgb(" + i + "," + r + "," + s + ") " + e.position + "%";
                    n < o.points.length - 1 && (a += ", "),
                        t += a
                }),
                    t += ")"
            }
            , p = function () {
                o.points.sort(function (t, e) {
                    return t.position - e.position
                });
                var t;
                t = "linear-gradient" === o.type ? o.type + "(" + o.angle + "deg, " : o.type + "(circle, ",
                    t += d(),
                    o.gradientBackground.style.backgroundImage = t,
                    o.gradientToolBackground.style.backgroundImage = l(),
                    o.swatch.childNodes[1].style.backgroundImage = t,
                    o.gradientCopyButton.style.backgroundImage = t,
                    f(),
                    v()
            }
            , d = function () {
                var t = "";
                return o.points.forEach(function (e, n) {
                    var i = e.color[0]
                        , r = e.color[1]
                        , s = e.color[2]
                        , a = e.color[3]
                        , u = "rgba(" + i + "," + r + "," + s + "," + a + ") " + e.position + "%";
                    n < o.points.length - 1 && (u += ", "),
                        t += u
                }),
                    t += ")"
            }
            , f = function () {
                if (0 !== o.points.length) {
                    var t = (o.points[0].color[0],
                        o.points[0].color[1],
                        o.points[0].color[2],
                        window.isCompat ? g : h);
                    o.code.innerHTML = t()
                }
            }
            , h = function () {
                var t = ""
                    , e = o.points[0].color[0]
                    , n = o.points[0].color[1]
                    , i = o.points[0].color[2];
                t = "linear-gradient" === o.type ? o.type + "(" + o.angle + "deg, " : o.type + "(circle, ";
                var r = '<span class="blue">background</span>: rgb(' + e + "," + n + "," + i + ");<br>";
                return r += '<span class="blue">background</span>: ',
                    r += t + d() + ";"
            }
            , g = function () {
                var t = ""
                    , e = o.points[0].color[0]
                    , n = o.points[0].color[1]
                    , i = o.points[0].color[2];
                t = "linear-gradient" === o.type ? o.type + "(" + o.angle + "deg, " : o.type + "(circle, ";
                var r = "rgb(" + e + "," + n + "," + i + ")"
                    , s = one.color(r).hex()
                    , a = o.points.length - 1
                    , u = o.points[a].color[0]
                    , c = o.points[a].color[1]
                    , l = o.points[a].color[2]
                    , p = "rgb(" + u + "," + c + "," + l + ")"
                    , f = one.color(p).hex()
                    , h = '<span class="blue">background</span>: rgb(' + e + "," + n + "," + i + ");<br>";
                return h += '<span class="blue">background</span>: ',
                    h += "-moz-" + t + d() + ";<br>",
                    h += '<span class="blue">background</span>: ',
                    h += "-webkit-" + t + d() + ";<br>",
                    h += '<span class="blue">background</span>: ',
                    h += t + d() + ";<br>",
                    h += '<span class="blue">filter</span>: progid:DXImageTransform.Microsoft.gradient(startColorstr="' + s + '",endColorstr="' + f + '",GradientType=1);'
            }
            , v = function () {
                var t = []
                    , e = [];
                o.points.forEach(function (t) {
                    var n = [t.color, t.position];
                    e.push(n)
                }),
                    t.push(e),
                    t.push(o.type),
                    t.push(o.angle),
                    STOPS[o.index] = t,
                    localStorage.setItem("STOPS", JSON.stringify(STOPS))
            }
            , m = function () {
                o.container.on("click", a),
                    document.on("keyup", s),
                    o.buttonLinear.on("click", u),
                    o.buttonRadial.on("click", c)
            };
        return o.renderStops = function () {
            o.stopsDOM.innerHTML = "",
                o.points.forEach(function (t) {
                    t.renderStop()
                })
        }
            ,
            o.setCurrentPoint = function (t) {
                var e = o.points.indexOf(t);
                o.points.map(function (t, n) {
                    n != e && t.removeActive()
                }),
                    o.currentPoint = t,
                    o.colorPicker.setColor(t)
            }
            ,
            o.updatePicker = function () {
                o.colorPicker.setColor(o.currentPoint)
            }
            ,
            o.updateColor = function (t) {
                o.currentPoint.setColor(t),
                    o.colorPicker.setAlphaColor(o.currentPoint),
                    p()
            }
            ,
            o.updateGradient = function () {
                p()
            }
            ,
            o.updateAngle = function (t) {
                o.angle = t,
                    p()
            }
            ,
            o.removePoint = function (t) {
                var e = o.points.indexOf(t);
                e > -1 && o.points.splice(e, 1);
                var n = o.points[Math.floor(o.points.length / 2)];
                n.setActive(),
                    o.setCurrentPoint(n),
                    p()
            }
            ,
            o.rerender = function (t, e, n, i) {
                o.stops = t,
                    o.type = e,
                    o.angle = n,
                    o.index = i,
                    o.swatch = $(".js-swatch")[i],
                    o.anglePicker = AnglePicker(o, o.angle),
                    o.points.forEach(function (t) {
                        t.clear()
                    }),
                    o.points = [],
                    o.stops.forEach(function (t) {
                        var e = Point(o, t);
                        o.points.push(e)
                    }),
                    o.points[1].setActive(!0),
                    "linear-gradient" === o.type ? u(null, !0) : c(null, !0)
            }
            ,
            o.rerenderCode = f,
            r(),
            o
    }
    , App = function () {
        var t = Object.create(App.prototype);
        t.swatches = $(".js-swatch"),
            t.upload = $(".js-upload")[0],
            t.compat = $(".js-compat")[0],
            t.gradient = null,
            window.isCompat = JSON.parse(localStorage.getItem("isCompat")) || !1;
        var e = function () {
            n(),
                t.swatches.forEach(function (t, e) {
                    t.childNodes[1].style.backgroundImage = i(STOPS[e]),
                        e === CURRENT_STOP && t.classList.add("is-active")
                });
            var e = STOPS[CURRENT_STOP][0]
                , o = STOPS[CURRENT_STOP][1]
                , r = STOPS[CURRENT_STOP][2];
            t.gradient = Gradient(e, o, r, CURRENT_STOP),
                window.isCompat ? (t.compat.checked = !0,
                    $(".code-editor__column-numbers")[0].innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>") : $(".code-editor__column-numbers")[0].innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>",
                u()
        }
            , n = function () {
                new ClipboardJS(".js-copy").on("success", function (t) {
                    var e = $(".js-button-copy")[0];
                    e.style.transition = "all 250ms ease-in-out",
                        e.style.transform = "translateY(0) scaleX(0.02) scaleY(0.5)",
                        setTimeout(function () {
                            e.style.opacity = 0
                        }, 200),
                        setTimeout(function () {
                            e.style.transition = "all 1ms linear",
                                e.style.transform = ""
                        }, 500),
                        setTimeout(function () {
                            e.style.opacity = 1,
                                e.style.transition = "all 150ms ease-in-out"
                        }, 600),
                        t.clearSelection()
                })
            }
            , i = function (t) {
                var e, n = t[0];
                return e = "linear-gradient" === t[1] ? "linear-gradient(" + t[2] + "deg, " : "radial-gradient(circle, ",
                    n.forEach(function (t, i) {
                        var o = t[0][0]
                            , r = t[0][1]
                            , s = t[0][2]
                            , a = t[0][3]
                            , u = "rgba(" + o + "," + r + "," + s + "," + a + ") " + t[1] + "%";
                        i < n.length - 1 && (u += ", "),
                            e += u
                    }),
                    e += ")"
            }
            , o = function () {
                t.swatches.forEach(function (t) {
                    t.classList.remove("is-active")
                }),
                    this.classList.add("is-active");
                var e = t.swatches.indexOf(this)
                    , n = STOPS[e][0]
                    , i = STOPS[e][1]
                    , o = STOPS[e][2];
                t.gradient.rerender(n, i, o, e),
                    CURRENT_STOP = e,
                    localStorage.setItem("CURRENT_STOP", JSON.stringify(CURRENT_STOP))
            }
            , r = function (e) {
                var n = [[], "linear-gradient", 0];
                GradientFinder.fromUrl(e, function (e) {
                    n[2] = e.angle,
                        e.stops.forEach(function (t) {
                            var e = t.color
                                , i = [e.r, e.g, e.b, 1]
                                , o = [i, 100 * t.idx];
                            n[0].push(o)
                        });
                    var i = n[0]
                        , o = n[1]
                        , r = 90 - n[2];
                    t.gradient.rerender(i, o, r, CURRENT_STOP)
                })
            }
            , s = function () {
                var e = t.upload.files[0];
                console.log(e);
                var n = new FileReader;
                n.onload = function (t) {
                    var e = t.target.result;
                    r(e)
                }
                    ,
                    n.readAsDataURL(e)
            }
            , a = function (e) {
                window.isCompat = e.target.checked,
                    window.isCompat ? $(".code-editor__column-numbers")[0].innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>" : $(".code-editor__column-numbers")[0].innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>",
                    localStorage.setItem("isCompat", JSON.stringify(window.isCompat)),
                    t.gradient.rerenderCode()
            }
            , u = function () {
                t.swatches.on("click", o),
                    t.upload.on("change", s),
                    t.compat.on("change", a)
            };
        return window.STOPS = [[[[[2, 0, 36, 1], 0], [[9, 9, 121, 1], 35], [[0, 212, 255, 1], 100]], "linear-gradient", 90], [[[[34, 193, 195, 1], 0], [[253, 187, 45, 1], 100]], "linear-gradient", 0], [[[[63, 94, 251, 1], 0], [[252, 70, 107, 1], 100]], "radial-gradient", 90], [[[[131, 58, 180, 1], 0], [[253, 29, 29, 1], 50], [[252, 176, 69, 1], 100]], "linear-gradient", 90], [[[[238, 174, 202, 1], 0], [[148, 187, 233, 1], 100]], "radial-gradient", 90]],
            STOPS = JSON.parse(localStorage.getItem("STOPS")) || STOPS,
            localStorage.setItem("STOPS", JSON.stringify(STOPS)),
            window.CURRENT_STOP = JSON.parse(localStorage.getItem("CURRENT_STOP")) || 0,
            e(),
            t
    }
    , Backgrounds = function () {
        var t = Object.create(Backgrounds.prototype)
            , e = function () {
                t.links = $(".js-backgrounds-link"),
                    t.shades = $(".js-backgrounds-shade"),
                    t.iframe = $(".js-iframe")[0],
                    o(t.links[1]),
                    r(),
                    s()
            }
            , n = function (e) {
                e.preventDefault(),
                    t.links.forEach(function (t) {
                        t.classList.remove("is-active")
                    }),
                    this.querySelector(".sidenav-backgrounds__background").style.transform = "",
                    this.classList.add("is-active"),
                    isMobile ? window.open(this.href) : (o(this),
                        i(this.href))
            }
            , i = function (e) {
                t.shades.forEach(function (t) {
                    setTimeout(function () {
                        t.style.visibility = "visible",
                            t.style.transform = "scaleX(1) scaleY(1)"
                    }, 300 * Math.random())
                }),
                    setTimeout(function () {
                        t.iframe.src = "about:blank"
                    }, 750),
                    setTimeout(function () {
                        t.iframe.src = e
                    }, 800),
                    setTimeout(function () {
                        t.shades.forEach(function (t) {
                            t.style.transform = "scaleX(0) scaleY(1)"
                        })
                    }, 1300),
                    setTimeout(function () {
                        t.shades.forEach(function (t) {
                            t.style.transition = "all 0ms linear",
                                t.style.transform = "scaleX(1) scaleY(0)"
                        })
                    }, 2200),
                    setTimeout(function () {
                        t.shades.forEach(function (t) {
                            t.style.visibility = "hidden",
                                t.style.transition = ""
                        })
                    }, 2250)
            }
            , o = function (e) {
                var n = t.links.indexOf(e);
                t.links.forEach(function (t, e) {
                    var i = t.querySelector(".sidenav-backgrounds__background")
                        , o = Math.abs(n - e)
                        , r = (110 - 4 * Math.abs(n - e)) / 100;
                    i.parentNode.classList.contains("is-active") || setTimeout(function () {
                        i.style.transform = "scaleX(" + r + ")"
                    }, 50 * o)
                })
            }
            , r = function () {
                setTimeout(function () {
                    $("#ad_iframe")[0] ? (console.log("ad loaded"),
                        $("#ad_iframe")[0].getAttribute("height")) : console.log("ad failed to load")
                }, 1500)
            }
            , s = function () {
                t.links.on("click", n)
            };
        return t.add = function () { }
            ,
            e(),
            t
    };
if (document.body.className.split(" ").some(function (t) {
    return /shades-of-.*/.test(t)
})) {
    console.log("shades");
    var count = $(".js-filter-count")[0]
        , shades = $(".swatch-cards")[0]
        , filters = $(".js-filter")
        , iso = null
        , init = function () {
            iso = new Isotope(shades, {
                itemSelector: ".swatch-card",
                layoutMode: "fitRows"
            }),
                setFilters(),
                setClipboard()
        }
        , setActiveFilter = function () {
            var t = this.dataset.filter;
            filters.forEach(function (t) {
                t.classList.remove("is-active")
            }),
                this.classList.add("is-active"),
                iso.arrange({
                    filter: t
                }),
                updateFilterCount()
        }
        , setFilters = function () {
            filters.on("click", setActiveFilter)
        }
        , updateFilterCount = function () {
            count.innerHTML = iso.filteredItems.length
        }
        , setClipboard = function () {
            new ClipboardJS(".js-copy").on("success", function (t) {
                var e = t.trigger.parentNode.parentNode
                    , n = e.querySelector(".swatch-card__copy-alert");
                n.classList.add("is-copied"),
                    setTimeout(function () {
                        n.classList.remove("is-copied")
                    }, 1200)
            })
        };
    shades && init()
}
if (document.body.classList.contains("index"))
    var app = App();
if (document.body.classList.contains("swatches")) {
    var clipboard = new ClipboardJS(".js-copy");
    clipboard.on("success", function (t) {
        var e = t.trigger.parentNode.parentNode
            , n = e.querySelector(".swatch-card__copy-alert");
        n.classList.add("is-copied"),
            setTimeout(function () {
                n.classList.remove("is-copied")
            }, 1200)
    })
}
if (document.body.classList.contains("gradient-backgrounds"))
    var backgrounds = Backgrounds();
