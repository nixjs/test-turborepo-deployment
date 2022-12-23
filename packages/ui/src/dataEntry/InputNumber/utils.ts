import BigNumber from 'bignumber.js'

export const getRangeValue = (target: BigNumber, min?: number | string, max?: number | string) => {
    // target > max
    if (typeof max !== 'undefined') {
        const dMax = new BigNumber(max)
        if (!dMax?.isNaN() && !target.isLessThan(dMax)) {
            return dMax
        }
    }

    // target < min
    if (typeof min !== 'undefined') {
        const dMin = new BigNumber(min)
        if (!dMin.isNaN() && !dMin.isLessThan(target)) {
            return dMin
        }
    }

    return null
}

export const isNumber = (str: string): boolean => {
    if (typeof str !== 'string') {
        return false
    }

    if (str.trim() === '') {
        return false
    }

    return !Number.isNaN(Number(str))
}
