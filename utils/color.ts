// 颜色转换相关算法
// https://jsfiddle.net/Lamik/9rky6fco/
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately

interface Hsva {
  h: number,
  s: number,
  v: number,
  a?: number
}

const HEX_REG = /^#([a-f\d]{3}|[a-f\d]{6})$/i

const RGB_REG = /^rgba?\s?\(/i

const HSL_REG = /^hsla?\s?\(/i

const HSV_REG = /^hsva?\s?\(/i

const parseAlpha = (a: any) => a !== void 0 && !isNaN(+a) && 0 <= +a && +a <= 1 ? +a : 1

function boundValue(value: number, max: number) {
  value = Math.min(max, Math.max(0, value))
  if ((Math.abs(value - max) < 0.000001)) {
    return 1
  }
  return (value % max) / (~~max)
}

/**
 * h.s.v. 转换为 r.g.b
 * @param h 
 * @param s 
 * @param v 
 */
export const hsv2rgb = (h: number, s: number, v: number) => {
  h = boundValue(h, 360)
  s = boundValue(s * 100, 100)
  v = boundValue(v * 100, 100)

  const i = ~~(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  const round = (value: number) => Math.round(value * 255)

  return {
    r: round(r),
    g: round(g),
    b: round(b)
  }
}

/**
 * r.g.b 转换为 h.s.v
 * @param r 
 * @param g 
 * @param b 
 * @param a 
 */
export const rgb2hsv = (r: number, g: number, b: number, a?: number): Hsva => {
  r = boundValue(r, 255)
  g = boundValue(g, 255)
  b = boundValue(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s,
    v: v,
    a: parseAlpha(a)
  }
}

/**
 * h.s.v转换为h.s.l
 * @param h 
 * @param s 
 * @param v 
 */
export const hsv2hsl = (h: number, s: number, v: number) => {
  return {
    h,
    s: (s * v / ((h = (2 - s) * v) < 1 ? h : 2 - h)) || 0,
    l: h / 2
  }
}

/**
 * h.s.l转换为h.s.v
 * @param h 
 * @param s 
 * @param l 
 * @param a 
 */
export const hsl2hsv = (h: number, s: number, l: number, a?: number): Hsva => {
  let _s
  let _v
  l *= 2
  s *= (l <= 1) ? l : 2 - l
  _v = (l + s) / 2
  _s = (2 * s) / (l + s)
  return {
    h,
    s: _s,
    v: _v,
    a: parseAlpha(a)
  }
}

/**
 * hex转换为rgb
 * @param color 
 */
export const hex2rgb = (color: string) => {
  color = color.replace(/^#/, '')
  if (color.length === 3) {
    const colors = []
    for (let i = 0; i < 3; i++) {
      colors.push(color[i], color[i])
    }
    color = colors.join('')
  }

  const r = parseInt([color[0], color[1]].join(''), 16)
  const g = parseInt([color[2], color[3]].join(''), 16)
  const b = parseInt([color[4], color[5]].join(''), 16)

  return {
    r,
    g,
    b
  }
}

/**
 * rgb转化为hex
 * @param r 
 * @param g 
 * @param b 
 */
export const rgb2hex = (r: number, g: number, b: number): string => {
  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex
}

/**
 * 解析输入的任意颜色值
 * 输出h.s.v.a
 * @param color 
 */
export const parseColor = (color: string): Hsva => {
  if (!color) {
    return
  }

  // hex
  if (HEX_REG.test(color)) {
    const { r, g, b } = hex2rgb(color)
    return rgb2hsv(r, g, b)
  }

  // rgb
  if (RGB_REG.test(color)) {
    const colors = color
      .replace(RGB_REG, '')
      .replace(/\)/, '')
      .trim()
      .split(',')
      .filter((v: string) => v.trim() !== '')
      .map((v: string, index: number) => index === 3 ? parseAlpha(v) : parseInt(v, 10))
    // 不必校验每个值是否合法，最终校验生成的color即可
    const [r, g, b, a] = colors
    const hsv: Hsva = rgb2hsv(r, g, b)
    hsv.a = parseAlpha(a)
    return hsv
  }

  // hsv/hsl
  let isHsl
  if (HSV_REG.test(color) || (isHsl = HSL_REG.test(color))) {
    const reg = isHsl ? HSL_REG : HSV_REG
    const colors = color
      .replace(reg, '')
      .replace(/\)/, '')
      .trim()
      .split(',')
      .filter((v: string) => v.trim() !== '')
      .map((v: string, index: number) => index === 3 ? parseAlpha(v) : parseFloat(v))
    const [h, s, v, a] = colors
    if (!isHsl) {
      return {
        h,
        s,
        v,
        a
      }
    } else {
      return hsl2hsv(h, s, v, a)
    }
  }

  return
}
