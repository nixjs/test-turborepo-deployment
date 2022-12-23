import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formatter } from '@lottery/utils'
import { Balance as UIBalance } from '@lottery/uikit'
import * as paymentSlice from 'redux/payment/slice'
import * as paymentSelector from 'redux/payment/selectors'
import * as KenoPaymentSlice from 'modules/lottery/keno/redux/payment/slice'
import * as KenoPaymentSelector from 'modules/lottery/keno/redux/payment/selectors'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'

interface BalancePropArg {}

export const Balance: React.FC<BalancePropArg> = () => {
    const dispatch = useDispatch()
    const balances = useSelector(paymentSelector.balancesSelector())
    const balancesVersion = useSelector(paymentSelector.balanceVersionSelector())
    const currencySymbolInGame = useSelector(KenoGameSelector.ticketPriceDefaultSelector())
    const currentBalance = useSelector(KenoPaymentSelector.currentBalanceSelector())

    React.useEffect(() => {
        dispatch(paymentSlice.onFetchCurrencyConfig())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (balances.length > 0) {
            const ourBalance = balances.find((b) => b.currencySymbol === currencySymbolInGame?.symbol)
            if (ourBalance)
                dispatch(
                    KenoPaymentSlice.onSetCurrentBalance({
                        available: ourBalance.available,
                        currencySymbol: ourBalance.currencySymbol,
                        total: ourBalance.total
                    })
                )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currencySymbolInGame, balancesVersion])

    const renderBalance = React.useMemo(() => {
        if (!currentBalance) return <></>
        const { num } = Formatter.onToFixedSizeNumber(+currentBalance.available, 9)
        return <UIBalance value={num} />
    }, [currentBalance])

    return (
        <div className="d-flex flex-column rd-8 pt-8 pb-8 pr-8 pl-8" style={{ background: 'wheat' }}>
            <label htmlFor="#" className="mb-8">
                Your balance:
            </label>
            <div className="d-flex align-items-center justify-content-end text-roboto text-24 w700">
                {renderBalance} <span className="ml-8">{currentBalance?.currencySymbol}</span>
            </div>
        </div>
    )
}
