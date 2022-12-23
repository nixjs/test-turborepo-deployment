import React from 'react'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { css } from 'styled-components'
import { SingleValue } from 'react-select'
import { BaseNetworkInfo } from 'consts/network'
import { BaseEnum, PaymentTypes } from '@lottery/types'
import { DropdownIndicator } from 'components/DropdownIndicator'
import { SelectStyled } from 'components/styled/select'
import * as paymentSlice from 'redux/payment/slice'
import * as paymentSelector from 'redux/payment/selectors'
import * as depositSlice from 'redux/payment/deposit/slice'
import * as depositSelector from 'redux/payment/deposit/selectors'
import * as depositExternalSlice from 'redux/payment/deposit/external/slice'
import { CurrencySingleValue, CurrencyOption } from './CurrencySelectComponent'
import { NetworkSingleValue, NetworkOption, SelectNetworkProps } from './NetworkSelectComponent'
import { CurrencyNetworkStyled } from './index.styled'

interface CurrencyNetworkPropArg {}

export const CurrencyNetwork: React.FC<CurrencyNetworkPropArg> = () => {
    const isFirst = React.useRef(true)

    const dispatch = useDispatch()
    const currencies = useSelector(paymentSelector.currencyConfigSelector())
    const network = useSelector(depositSelector.depsNetworkSelectedSelector())
    const currency = useSelector(depositSelector.depsCurrencySelectedSelector())

    const depsAddresses = useSelector(depositSelector.depsAddressesSelector())
    const depsAddressesByCurrency = useSelector(depositSelector.depsAddressByCurrencySelector())
    const walletConfig = useSelector(paymentSelector.walletConfigSelector())

    const [networks, setNetworks] = React.useState<SelectNetworkProps[]>()

    const executeCurrencySelected = (e: PaymentTypes.Currency) => {
        dispatch(depositSlice.onSetDepsCurrencySelected(e))
        dispatch(depositExternalSlice.onSetDepsExternalWalletSelected(BaseEnum.WalletProvider.WP_NONE))
        if (e?.depositInfoList && e.depositInfoList.length > 0) {
            const ourNetworks = e.depositInfoList.map((i) => (BaseNetworkInfo as any)[i.networkSymbol])
            setNetworks(() => ourNetworks)
        }
        if (depsAddresses) {
            const ourAddress = depsAddresses.find((d) => d.symbol === e?.symbol)
            dispatch(depositSlice.onSetDepositAddressByCurrency(ourAddress?.depositInfoList || []))
        }
    }

    const handleCurrencyOnChange = React.useCallback(
        (e: SingleValue<PaymentTypes.Currency>) => {
            if (e?.symbol === currency?.symbol) {
                return
            }
            dispatch(paymentSlice.onSetWalletConfigSelected(null))
            dispatch(depositSlice.onSetDepsNetworkSelected(null))
            dispatch(depositSlice.onSetDepositTokenListByNetwork([]))
            dispatch(depositSlice.onSetDepositTokenListByNetworkSelected(null))
            executeCurrencySelected(e as PaymentTypes.Currency)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currency?.symbol, depsAddresses]
    )

    const handleNetworkOnChange = React.useCallback(
        (e: SingleValue<SelectNetworkProps>) => {
            if (e?.key === network?.key) {
                return
            }
            dispatch(depositSlice.onSetDepsNetworkSelected(e))
            dispatch(depositSlice.onSetDepositTokenListByNetworkSelected(null))
            if (depsAddressesByCurrency && depsAddressesByCurrency.length > 0) {
                const ourAddress = depsAddressesByCurrency.find((d) => d.networkSymbol === e?.key)
                dispatch(depositSlice.onSetDepositAddressByCurrencyByNetwork(ourAddress))
                dispatch(depositSlice.onSetDepositTokenListByNetwork(ourAddress?.tokensList || []))
            }

            if (walletConfig.length > 0) {
                const ourWallet = walletConfig.find((w) => w.networkSymbol === e?.key)
                if (ourWallet && ourWallet.networkSymbol) {
                    dispatch(paymentSlice.onSetWalletConfigSelected(ourWallet || null))
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [depsAddressesByCurrency, network?.key, walletConfig]
    )

    React.useEffect(() => {
        if (isFirst.current && currencies.length > 0 && depsAddresses.length > 0) {
            const e = currencies[0]
            executeCurrencySelected(e)
            isFirst.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currencies, depsAddresses])

    return (
        <CurrencyNetworkStyled>
            <div className="group-list">
                <div className="form-group">
                    <label htmlFor="currency" className="form-label mb-8 w400 base-black-darker">
                        Currency:
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
                            instanceId="currency-dropdown"
                            classNamePrefix="lottery-select"
                            maxMenuHeight={420}
                            isSearchable={false}
                            value={currency}
                            options={currencies}
                            isOptionSelected={(data) => {
                                return data?.symbol === currency?.symbol
                            }}
                            onChange={(e) => handleCurrencyOnChange(e)}
                            components={{ SingleValue: CurrencySingleValue as any, Option: CurrencyOption as any, DropdownIndicator }}
                        />
                    </SelectStyled>
                </div>
                {networks && networks.length > 0 && (
                    <div className="form-group">
                        <label htmlFor="network" className="form-label mb-8 w400 base-black-darker">
                            Network:
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
                                value={network}
                                options={networks}
                                isOptionSelected={(data) => {
                                    return data.key === network?.key
                                }}
                                onChange={(e) => handleNetworkOnChange(e)}
                                components={{ SingleValue: NetworkSingleValue as any, Option: NetworkOption as any, DropdownIndicator }}
                            />
                        </SelectStyled>
                    </div>
                )}
            </div>
        </CurrencyNetworkStyled>
    )
}
