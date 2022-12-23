import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PaymentTypes } from '@lottery/types'
import { Formatter } from '@lottery/utils'
import { Balance, Symbol } from '@lottery/uikit'
// import { getSymbol } from "consts/token"
import * as walletSlice from 'redux/wallet/slice'
import * as paymentSelector from 'redux/payment/selectors'

interface DropdownWalletPropArg {}

export const DropdownWallet: React.FC<DropdownWalletPropArg> = () => {
    const dispatch = useDispatch()
    const balances = useSelector(paymentSelector.balancesSelector())

    const handleChooseToken = (item: PaymentTypes.Balance) => {
        dispatch(walletSlice.onSetWalletTokenSelected(item.currencySymbol))
        // StorageServices.storeCurrencySymbol(item.symbol)
    }
    return (
        <div className="position-absolute w-100 overflow-hidden wallet-dropdown">
            <div className="pt-12 pb-12 rd-16 wallet-dropdown-inner">
                <ul className="reset-ul">
                    {balances &&
                        balances.map((item, idx) => {
                            const { available, currencySymbol } = item
                            const { num } = Formatter.onToFixedSizeNumber(+available, 9)

                            const symbolPath = `/tokens/ic24px_${currencySymbol.toLowerCase() || 'none'}.svg`
                            return (
                                <li
                                    key={`${item.currencySymbol}_${idx}`}
                                    onClick={() => handleChooseToken(item)}
                                    className="d-block cursor-pointer animated--fast pl-8 pr-8"
                                    role="presentation"
                                >
                                    <div className="pt-8 pb-8 pl-8 pr-8 rd-8 d-flex align-items-center justify-content-between text-oswald">
                                        <div className="d-flex align-items-center">
                                            <Symbol source={symbolPath} />
                                            <div className="value flex text-right ml-4">
                                                <Balance className="text-oswald text-16 w500" value={num} />
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="uppercase w500 text-color-2 asset">{item.currencySymbol}</div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
}
