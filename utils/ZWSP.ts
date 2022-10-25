/**
 * [ZWSP:零宽空格](https://zh.wikipedia.org/wiki/%E9%9B%B6%E5%AE%BD%E7%A9%BA%E6%A0%BC)
 */

enum ZWSP {
    ZERO = '\u200e',
    ONE = '\u200f',
    SPLIT = '\u200c',
}

const CODE_MAP = {
    '0': ZWSP.ZERO,
    '1': ZWSP.ONE,
};

const CODE_MAP2 = {
    [ZWSP.ONE]: '1',
    [ZWSP.ZERO]: '0',
};

/**
 * 转换字符串为二进制字符串数组
 */
const str2binary = (str: string) => {
    if (!str.length) return [];
    const binaryMap = str.split('').map((c) => c.charCodeAt(0).toString(2));
    return binaryMap;
};

/**
 * 转换二进制字符串数组为字符串
 */
const binary2str = (bArr: string[]) => {
    const cArr = bArr.map((b) => String.fromCharCode(parseInt(b, 2)));
    return cArr.join('');
};

/**
 * 转换二进制字符串数组为零宽字符串
 */
const covertBinary2ZWSP = (barr: string[]) => {
    const covertSingle = (binaryStr: string) => {
        if (!binaryStr.length) return '';
        return binaryStr
            .split('')
            .map((c) => CODE_MAP[c])
            .join('');
    };

    const str = barr.map(b => covertSingle(b)).join(ZWSP.SPLIT);

    return str;
};

/**
 * 转换零宽字符串回二进制字符串数组
 */
const ZWSP2Binary = (zwspStr: string) => {
    const cArr = zwspStr.split(ZWSP.SPLIT);
    console.log(cArr);
    const covertSingle = (zwspC: string) => {
        if (!zwspC.length) return '';
        return zwspC
            .split('')
            .map((c) => CODE_MAP2[c])
            .join('');
    };
    return cArr.map(covertSingle);
};

const encode = (string: string) => covertBinary2ZWSP(str2binary(string));
const decode = (encodeStr: string) => binary2str(ZWSP2Binary(encodeStr));

/**
 * `zwsp.encode` 转换明文为零宽字符
 *
 * `zwsp.decode` 转换零宽字符为明文
 */
const zwsp = {
    encode,
    decode,
};

export default zwsp;
