import BigNumber from 'bignumber.js'

export const getMinAmount = (min: BigNumber.Value, balance: BigNumber.Value) => {
    const m = new BigNumber(min)
    const b = new BigNumber(balance)
    let r = m
    if (b.isLessThan(m)) {
        r = b
    }
    return r
}

export const getMaxAmount = (max: BigNumber.Value, balance: BigNumber.Value) => {
    const m = new BigNumber(max)
    const b = new BigNumber(balance)
    let r = b
    if (m.isGreaterThan(b)) {
        r = m
    }
    return r
}

export const getInputAmountNumber = (
    amountNumber: BigNumber.Value,
    minAmount: BigNumber.Value,
    maxAmount: BigNumber.Value,
    balance: BigNumber.Value,
    type: 'DOUBLE' | 'HALF'
) => {
    const min = new BigNumber(minAmount)
    const max = new BigNumber(maxAmount)
    const current = new BigNumber(balance)
    const amNumber = new BigNumber(amountNumber)

    let r = null
    if (type === 'DOUBLE') {
        r = amNumber.times(2)
    } else if (type === 'HALF') {
        r = amNumber.div(2)
    } else {
        r = amNumber
    }

    if (r.isGreaterThan(max)) {
        r = max
    }
    if (r.isLessThan(min)) {
        r = min
    }
    if (r.isGreaterThan(current)) {
        r = current
    }

    return r
}

export const isEnoughBalance = (amount: BigNumber.Value, min: BigNumber.Value, max: BigNumber.Value, balance: BigNumber.Value) => {
    const mn = new BigNumber(min)
    const mx = new BigNumber(max)
    const cur = new BigNumber(balance)
    const am = new BigNumber(amount)

    if (am.isNaN()) {
        return false
    }
    if (am.isGreaterThan(mx)) {
        return false
    }
    if (am.isLessThan(mn)) {
        return false
    }
    if (am.isGreaterThan(cur)) {
        return false
    }
    return true
}

export const isEnoughTarget = (target: BigNumber.Value, min: BigNumber.Value, max: BigNumber.Value) => {
    const mn = new BigNumber(min)
    const mx = new BigNumber(max)
    const am = new BigNumber(target)

    if (am.isNaN()) {
        return false
    }
    if (am.isGreaterThan(mx)) {
        return false
    }
    if (am.isLessThan(mn)) {
        return false
    }
    return true
}
