import { Types } from '@athena20/ts-types'
import BigNumber from 'bignumber.js'
import { GameAutoPlayTypes, AutoPlayStatus, GameStatePlay } from 'modules/game/base/FormAuto'

export const getNewAmount = (config: Types.Nullable<GameAutoPlayTypes.AutoPlayRare>, amount: BigNumber, originalAmount: BigNumber) => {
    if (!config || typeof config !== 'object') {
        return amount
    }
    const { type, value } = config
    if (type) {
        // increase
        const rate = 1 + Number(value) / 100
        return amount.times(new BigNumber(rate))
    }
    // reset
    return originalAmount
}

export const onAutoplayValidation = ({
    numberOfBets,
    originalAmount = '0',
    currentAmount = '0',
    originalBalance = '0',
    currentBalance = '0',
    gameStatus,
    formAutoPlayConfig
}: GameAutoPlayTypes.AutoPlayInfoValidationArg): GameAutoPlayTypes.AutoPlayInfoValidationResult => {
    // gameStatus: 1 - win, 0 - lost
    // onWin: 1 - increase, 0 - reset
    // onLoss: 1 - increase, 0 - reset
    try {
        if (!formAutoPlayConfig) {
            throw Error('`FormAutoPlayConfig` required, must be object')
        }
        const oblBN = new BigNumber(originalBalance)
        const cblBN = new BigNumber(currentBalance)
        if (!originalBalance || Number(originalBalance) < 0 || oblBN.isLessThanOrEqualTo(0)) {
            throw Error('`originalBalance`: required, greater than 0')
        }
        if (!currentBalance || Number(currentBalance) < 0 || cblBN.isLessThanOrEqualTo(0)) {
            throw Error('`currentBalance`: required, greater than 0')
        }
        if (typeof gameStatus !== 'number') {
            throw Error('`gameStatus` required, must be number')
        }
        const oamBn = new BigNumber(originalAmount)
        const camBn = new BigNumber(currentAmount)
        if (numberOfBets === 0 && !oamBn.isEqualTo(camBn) && !oblBN.isEqualTo(cblBN)) {
            throw Error(
                '`originalAmount && currentAmount`, `originalBalance && currentBalance`: two pairs of values must be equal when first joined'
            )
        }
        if (cblBN.isZero() || cblBN.isLessThan(currentAmount)) {
            return { status: 'SUCCESS', data: { status: AutoPlayStatus.BALANCE_NOT_ENOUGH } }
        }
        const { numberOfBet, maxBetAmount, stopOnProfit, stopOnLoss, onWin, onLoss, minBet, maxBet } = formAutoPlayConfig
        const tpBn = new BigNumber(stopOnProfit)
        const slBn = new BigNumber(stopOnLoss)
        let maxAmBn = new BigNumber(maxBetAmount)

        if (maxAmBn.isGreaterThan(cblBN)) {
            maxAmBn = cblBN
        }
        if (numberOfBets === 0 || numberOfBets < numberOfBet || numberOfBet === 0) {
            const minusBl = cblBN.minus(oblBN)
            if (minusBl.isGreaterThanOrEqualTo(tpBn) && tpBn.isGreaterThan(0)) {
                return { status: 'SUCCESS', data: { status: AutoPlayStatus.STOP_ON_PROFIT } }
            }
            if (minusBl.isLessThan(0) && minusBl.negated().isGreaterThanOrEqualTo(slBn) && slBn.isGreaterThan(0)) {
                return { status: 'SUCCESS', data: { status: AutoPlayStatus.STOP_ON_LOSS } }
            }
            let gameState = null
            if (gameStatus === GameStatePlay.WIN) {
                gameState = onWin
            }
            if (gameStatus === GameStatePlay.LOSS) {
                gameState = onLoss
            }
            let amount = getNewAmount(gameState, camBn, oamBn)
            if (maxAmBn.isGreaterThan(0) && amount.isGreaterThan(maxAmBn)) {
                amount = maxAmBn
            }

            if (minBet) {
                const minBetBn = new BigNumber(minBet)
                if (!minBetBn.isNaN() && amount.isLessThan(minBetBn)) {
                    amount = minBetBn
                }
            }
            if (maxBet) {
                const maxBetBn = new BigNumber(maxBet)
                if (!maxBetBn.isNaN() && amount.isGreaterThan(maxBetBn)) {
                    amount = maxBetBn
                }
            }
            return { status: 'SUCCESS', data: { status: AutoPlayStatus.NEW_TURN, amount } }
        }
        return { status: 'SUCCESS', data: { status: AutoPlayStatus.MAXIMUM_NUMBER_OF_BET } }
    } catch (error) {
        return { status: 'ERROR', error }
    }
}
