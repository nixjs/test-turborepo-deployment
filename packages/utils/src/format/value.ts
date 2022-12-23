import BigNumber from 'bignumber.js'
import { Types } from '@athena20/ts-types'

/**
 * Truncate ellipsis in middle of text
 * @param {*} str: `String`
 * @param {*} start: `Number` default 0
 * @param {*} end: `Number` default 7
 * @param {*} limitEndChars: `Number` default 8
 * @param {*} separator: `String` default `...`
 * @returns String
 *
 * Example:
 *
 * 0x364707969DC3234F4B18DA8cE2b719eCfAC6609e => 0x36470...fAC6609e
 * 0x36 => 0x36
 * 0x365n => 0x365n
 */
export const onElliptingMiddle = (str: string, start = 0, end = 7, limitEndChars = 8, separator = '...'): string => {
    if (!str) return ''
    const stLeng = str.length
    if (stLeng <= end) {
        return str
    }
    if (stLeng <= limitEndChars) {
        return `${str.substring(start, end)}${separator}`
    }
    return `${str.substring(start, end)}${separator}${str.substring(str.length - limitEndChars, str.length)}`
}

/**
 *  To fixed size number
 * @param {*} value: `Number`, `BigNumber String`, `String Number` default 0
 * @param {*} fixed: `Number` default 9
 * @returns Object {int: String, dot: String, dec: String, full: String}
 *
 * Example:
 *
 * 100,000,000.345345 => {int: "0", dot: ".", dec: "00000000", full: "0.00000000"}
 *
 * -124.67 => {int: "-134", dot: ".", dec: "67000", full: "-134.67000"}
 *
 * 100000000.345345 => {int: "100,000,000", dot: "", dec: "", full: "100,000,000"}
 *
 * 10000.689 => {int: "10,000", dot: ".", dec: "6890", full: "10,000.6890"}
 *
 * 100 => {int: "100", dot: ".", dec: "000000", full: "100.000000"}
 *
 * 1 => {int: "1", dot: ".", dec: "00000000", full: "1.00000000"}
 *
 * -1 => {int: "-1", dot: ".", dec: "0000000", full: "-1.0000000"}
 *
 * 1e+8 => {int: "100,000,000", dot: "", dec: "", full: "100,000,000"}
 *
 * 0.0000000298 => {int: "0", dot: ".", dec: "00000002", full: "0.00000002"}
 *
 * true => {int: "0", dot: ".", dec: "00000000", full: "0.00000000"}
 *
 * false => {int: "0", dot: ".", dec: "00000000", full: "0.00000000"}
 *
 * NaN => {int: "0", dot: ".", dec: "00000000", full: "0.00000000"}
 *
 * abc => {int: "0", dot: ".", dec: "00000000", full: "0.00000000"}
 *
 * null => {int: "0", dot: ".", dec: "00000000", full: "0.00000000"}
 *
 */
export const onToFixedSizeNumber = (
    value: string | number | BigNumber,
    precision: number
): {
    int: string
    dec: string
    dot: string
    full: string
    num: string
} => {
    if (value === null || typeof value === 'boolean' || (typeof value === 'number' && Number.isNaN(value))) {
        const decStr = new Array(precision).join('0')
        return { int: '0', dot: '.', dec: decStr, full: `0.${decStr}`, num: '0' }
    }
    let val: string | number | BigNumber = value
    if (typeof value === 'string') {
        val = String(value).replaceAll(',', '')
    }
    if (BigNumber.isBigNumber(val)) {
        val = val.toFixed(precision, 1) // ROUND_DOWN;
    } else {
        val = new BigNumber(val).toFixed(precision, 1) // ROUND_DOWN;
    }

    const balanceArray = val.split('.')
    let int = balanceArray[0] || ''
    let dec = balanceArray[1] || ''

    const decPlaces = precision - int.length
    const dot = decPlaces > 0 ? '.' : ''

    dec = decPlaces > 0 ? dec.slice(0, decPlaces) : ''
    const num = `${int}${dot}${dec}`
    int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const full = `${int}${dot}${dec}`

    return { int, dot, dec, full, num }
}

/**
 * Find significant digits
 * @param value: `Number`, `BigNumber String`, `String Number`
 * @returns Object {digit: String, text: String}
 *
 * Example:
 *
 * 1e-8 => {digit: "0.00000001", text: ""}
 *
 * 1000.1 => {digit: "1000.1", text: ""}
 *
 * 1000 => {digit: "1000", text: ""}
 *
 * 100.000.000 => {digit: null, text: null}
 *
 * 100.000 => {digit: "100.", text: "000"}
 *
 * 1000.000 => {digit: "1000.", text: "000"}
 *
 * 1000.1000 => {digit: "1000.1", text: "000"}
 *
 * true => {digit: null, text: null}
 *
 * false => {digit: null, text: null}
 *
 * NaN => {digit: null, text: null}
 *
 * 0.0001 => {digit: "0.0001", text: ""}
 *
 * 0.00010 => {digit: "0.0001", text: "0"}
 *
 * 1e+8 => {digit: "1e+8", text: ""}
 *
 * 1e-8 => {digit: "0.00000001", text: ""}
 *
 * 0.000000000012130 => {digit: "0.00000000001213", text: "0"}
 *
 */

export const onFindSignificantDigits = (
    value: string | number,
    isCommas: boolean = false
): {
    digit: Types.Nullable<string>
    text: Types.Nullable<string>
} => {
    if (value === null || (typeof value === 'number' && Number.isNaN(value)) || (typeof value === 'string' && value.length === 0)) {
        return {
            digit: null,
            text: null
        }
    }
    if (Math.abs(Number(value)) < 1.0) {
        const decCounter = parseInt(Number(value).toString().split('e-')[1], 10)
        if (decCounter) {
            return {
                digit: Number(value).toFixed(decCounter),
                text: ''
            }
        }
    }
    const strVal = String(value)
    let val = strVal
    if (strVal.indexOf('.') !== -1) {
        const bf = strVal.substring(0, strVal.indexOf('.'))
        const ls = strVal.substring(strVal.indexOf('.') + 1)

        val = `${Number(bf)}.${ls}`
    }
    const valueLen = val.length

    const digit = Number(val)
    const digitLen = digit.toString().length
    const decZero = val.substring(digitLen, valueLen)
    const digitStr = digit.toString()

    if (decZero.indexOf('.') !== -1) {
        // 100.000 => {digit: "100.", text: "000"} instead of  {digit: "100", text: ".000"}
        return {
            digit: `${isCommas ? onNumberWithCommas(digitStr) : digitStr}.`,
            text: decZero.replace('.', '')
        }
    }
    return {
        digit: isCommas ? onNumberWithCommas(digitStr) : digitStr,
        text: decZero
    }
}

/**
 * Add trailing Zeros
 * @param {*} value: `Number`, `BigNumber String`, `String Number`
 * @param {*} scale: `Number`
 * @returns `String Number`
 *
 * Example:
 *
 * 0 ====> 0.0000
 *
 * 1 ====> 1.
 *
 * 0. ====> 0.0000
 *
 * 1. ====> 1.0000
 *
 * -1 ====> -1.0000
 *
 * .1 ====> 0.1000
 *
 * -.1 ====> -0.1000
 *
 * -0.0001 ====> -0.0001
 *
 * +0.0001 ====> 0.0001
 *
 * 1.345345 ====> 1.3453
 *
 * 10.23456789 ====> 10.2345
 *
 * 1000.345345 ====> 1000.3453
 *
 * -10.689 ====> -10.6890
 *
 * 100 ====> 100.0000
 *
 * 1e+8 ====> 100000000.0000
 *
 * 1e-8 ====> 0.0000
 *
 * true ====> null
 *
 * false ====> null
 *
 * NaN ====> null
 *
 * string ====> null
 *
 * null ====> null
 */
export const onZeroPadding = (value = 0, scale = 4): Types.Nullable<string> => {
    const regexFloatNumber = /^[+-]?\d*([0-9]*[.])?\d*$/
    const valueTrunc = new BigNumber(value)

    if (!regexFloatNumber.test(valueTrunc.toFixed())) {
        return null
    }

    const truncNumber = new BigNumber(10).exponentiatedBy(scale)
    const multiValue = valueTrunc.multipliedBy(truncNumber)
    const integerValue = new BigNumber(multiValue.toFixed(0, 3))
    const result = integerValue.dividedBy(truncNumber)

    const res = result.toFixed().split('.')
    if (res.length === 1 || res?.[1].length < scale) {
        return result.toFixed(scale)
    }
    return result.toFixed()
}

/**
 * Random alphabets with maximum characters
 * @param {*} maximum: `Number`
 * @returns String
 */

export function onRandomAlphabets(max: number = 7): string {
    return Math.random().toString(36).substring(max)
}

/**
 * Convert a Number to a string with commas.
 * @param value: `String`, `Number`
 * @returns String
 */
export const onNumberWithCommas = (value: string | number) => value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')

export const toDecimal = (value: string | number, dec: number) => {
    if (!value) return '0'
    if (!dec) return String(value)
    return new BigNumber(value).times(new BigNumber(10).pow(dec)).toFixed()
}

export const fromDecimal = (value: string | number, dec: number) => {
    if (!value) return '0'
    if (!dec) return String(value)
    return new BigNumber(value).div(BigNumber(10).pow(dec)).toFixed()
}

export const isInputNumberWithDecimals = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (
        ['ArrowRight', 'ArrowLeft', 'Backspace', 'Delete', 'Clear', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(
            e.key
        ) ||
        (e.metaKey && ['a', 'c', 'v', 'x'].includes(e.key))
    ) {
        return true
    }
    return false
}

export const isDecimal = (value: number) => {
    return (value ^ 0) !== value
}
