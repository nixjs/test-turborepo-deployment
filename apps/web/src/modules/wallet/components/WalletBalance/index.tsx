import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@nixjs23n6/baseui-button'
// import { Pagination } from '@nixjs23n6/baseui-pagination'
import { CoingeckoPriceDefault } from 'consts/coingecko'
import * as paymentSelector from 'redux/payment/selectors'
import * as coingeckoSelector from 'redux/coingecko/selectors'
import * as paymentSlice from 'redux/payment/slice'
import { WalletBalanceItem } from './Item'
import { WalletBalanceStyled } from './index.styled'

interface WalletBalancePropArg {}

export const WalletBalance: React.FC<WalletBalancePropArg> = () => {
    const dispatch = useDispatch()
    const balances = useSelector(paymentSelector.balancesSelector())
    const priceDict = useSelector(coingeckoSelector.priceDictSelector())

    const onAirdrop = () => {
        dispatch(paymentSlice.onAirdrop())
    }

    return (
        <WalletBalanceStyled>
            <div>
                {(balances.length > 0 &&
                    balances.map((item, idx) => {
                        const { currencySymbol } = item
                        return (
                            <WalletBalanceItem
                                key={`${currencySymbol}_${idx}`}
                                data={item}
                                price={priceDict ? priceDict[currencySymbol] : CoingeckoPriceDefault}
                            />
                        )
                    })) || (
                    <div className="pt-24 text-center">
                        <h4 className="mb-16 w400 text-16">Empty Balance</h4>
                        <Button variant="dark" className="text-uppercase base-white rd-8" autoWidth onClick={onAirdrop}>
                            <i className="iconic_plus text-24 mr-12" />
                            Airdrop Now
                        </Button>
                    </div>
                )}
            </div>
            {/* <div className="mt-24 text-center">
                <Pagination total={20} initialPage={1} withControls={false} overrideStyled={PaginationStyled} />
            </div> */}
        </WalletBalanceStyled>
    )
}
