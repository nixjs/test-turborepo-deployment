import React from 'react'
import { PaymentTypes } from '@lottery/types'
import { Formatter } from '@lottery/utils'
import { Balance, Symbol } from '@lottery/uikit'
import { useMaskBalance } from 'context/maskBalance'
import { CoingeckoTypes } from 'types/coingecko'
interface WalletBalanceItemPropArg {
    data: PaymentTypes.Balance
    price: CoingeckoTypes.Price
}

export const WalletBalanceItem: React.FC<WalletBalanceItemPropArg> = React.memo(({ data, price }) => {
    const { isMask } = useMaskBalance()

    const { num } = Formatter.onToFixedSizeNumber(+data.available, 9)
    const symbolPath = `/tokens/ic24px_${data.currencySymbol.toLowerCase() || 'none'}.svg`

    const handleChooseToken = (token: any) => {
        console.log(token)
    }
    return (
        <div onClick={() => handleChooseToken(data)} className="pb-16 pt-16 balance-item" role="presentation">
            <div className="d-flex align-items-center justify-content-between mb-8">
                <div className="d-flex align-items-center">
                    <div className="d-flex mr-8">
                        <Symbol source={symbolPath} />
                    </div>
                    <div className="d-flex flex-fill align-items-center">
                        <div className="text-oswald text-18 w700 mr-8 token-symbol">{data.currencySymbol}</div>
                        <div className="text-oswald text-16 token-name">{data.displayName}</div>
                    </div>
                </div>
                <div>
                    {!isMask ? (
                        <Balance className="text-oswald text-16 w500" value={num} />
                    ) : (
                        <span className="text-oswald text-16 w500">*********</span>
                    )}
                </div>
            </div>
        </div>
    )
})

WalletBalanceItem.displayName = 'WalletBalanceItem'
