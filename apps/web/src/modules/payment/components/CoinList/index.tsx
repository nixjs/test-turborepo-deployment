import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { css } from 'styled-components'
import { SingleValue } from 'react-select'
import { PaymentTypes } from '@lottery/types'
import { DropdownIndicator } from 'components/DropdownIndicator'
import { SelectStyled } from 'components/styled/select'
import * as depositSlice from 'redux/payment/deposit/slice'
import * as depositSelector from 'redux/payment/deposit/selectors'
import { CoinOption, CoinSingleValue } from './CoinListComponent'

interface CurrencyNetworkPropArg {
    onTokenSelected?: (token?: PaymentTypes.Token) => void
}

export const CoinListSelect: React.FC<CurrencyNetworkPropArg> = ({ onTokenSelected }) => {
    const dispatch = useDispatch()
    const tokenList = useSelector(depositSelector.depsTokenListByNetworkSelector())
    const token = useSelector(depositSelector.depsTokenListByNetworkSelectedSelector())

    const handleCoinOnChange = (e: SingleValue<PaymentTypes.Token>) => {
        if (e?.symbol !== token?.symbol) {
            onTokenSelected?.(e as PaymentTypes.Token)
            dispatch(depositSlice.onSetDepositTokenListByNetworkSelected(e as PaymentTypes.Token))
        }
    }

    return (
        <div className="form-group">
            <label htmlFor="network" className="form-label mb-8 w400 base-black-darker">
                Coin List:
            </label>
            <SelectStyled
                overrideStyled={css`
                    .lottery-select {
                        &__value-container {
                            height: 3rem;
                            padding-top: 0;
                            padding-bottom: 0;
                        }
                    }
                `}
            >
                <Select
                    instanceId="network-dropdown"
                    classNamePrefix="lottery-select"
                    placeholder="Select a network"
                    isSearchable={false}
                    value={token}
                    options={tokenList}
                    isOptionSelected={(data) => {
                        return data?.symbol === token?.symbol
                    }}
                    onChange={(e) => handleCoinOnChange(e)}
                    components={{ SingleValue: CoinSingleValue as any, Option: CoinOption as any, DropdownIndicator }}
                />
            </SelectStyled>
        </div>
    )
}
