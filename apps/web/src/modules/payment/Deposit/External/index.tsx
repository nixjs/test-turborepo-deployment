import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import { css } from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useWallet } from '@athena20/ts-wallet-react'
import { Button } from '@nixjs23n6/baseui-button'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { BaseEnum } from '@lottery/types'
import { Input, Symbol, FormError } from '@lottery/uikit'
import { Formatter } from '@lottery/utils'
import { BaseWalletTypeInfo } from 'consts/wallet'
import { IconTronLink } from 'components/icons/IconTronLink'
import { IconMetaMask } from 'components/icons/IconMetaMask'
import { IconBinanceChain } from 'components/icons/iconBinanceChain'
import { CoinListSelect } from 'modules/payment/components/CoinList'
import { DepositExternalTypes } from 'types/payment/deposit/external'
import * as paymentSelector from 'redux/payment/selectors'
import * as depositSelector from 'redux/payment/deposit/selectors'
import * as depositExternalSlice from 'redux/payment/deposit/external/slice'
import * as depositExternalSelector from 'redux/payment/deposit/external/selectors'
import { Wallet } from './Wallet'
import { DepositSchema } from './validator'

const ExternalWalletInfo: Record<
    Exclude<BaseEnum.WalletProvider, BaseEnum.WalletProvider.WP_NONE>,
    { title: string; icon: React.ReactNode }
> = {
    [BaseEnum.WalletProvider.WP_TRONLINK]: {
        title: 'TronLink',
        icon: <IconTronLink />
    },
    [BaseEnum.WalletProvider.WP_METAMASK]: {
        title: 'MetaMask',
        icon: <IconMetaMask />
    },
    [BaseEnum.WalletProvider.WP_BINANCE_CHAIN_WALLET]: {
        title: 'Binance Chain Wallet',
        icon: <IconBinanceChain />
    }
}

interface DepositExternalPropArg {}

export const DepositExternal: React.FC<DepositExternalPropArg> = () => {
    const dispatch = useDispatch()
    const { provider, onConnect } = useWallet()

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        reset,
        formState: { errors }
    } = useForm<DepositExternalTypes.DepositRequest>({
        resolver: yupResolver(DepositSchema)
    })

    const walletConfig = useSelector(paymentSelector.walletConfigSelectedSelector())
    const tokenByNetwork = useSelector(depositSelector.depsTokenListByNetworkSelectedSelector())
    const externalWalletSelected = useSelector(depositExternalSelector.depsExternalWalletSelectedSelector())
    const externalWalletConnectState = useSelector(depositExternalSelector.depsExternalWalletConnectStateSelector())
    const externalWalletAddress = useSelector(depositExternalSelector.walletAddressSelector())
    const availableBalance = useSelector(depositExternalSelector.availableBalanceSelector())
    const availableBalanceVersion = useSelector(depositExternalSelector.availableBalanceVersionSelector())
    const depsLoading = useSelector(depositExternalSelector.depsLoadingSelector())

    React.useEffect(() => {
        return () => {
            reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onResetState = () => {
        reset()
        dispatch(depositExternalSlice.onSetAvailableBalance())
        dispatch(depositExternalSlice.onSetAvailableBalanceVersion())
        dispatch(depositExternalSlice.onSetWalletAddress())
        dispatch(depositExternalSlice.onSetDepsExternalWalletSelected(BaseEnum.WalletProvider.WP_NONE))
    }

    const handleWalletSelected = React.useCallback(
        (type: BaseEnum.WalletProvider) => {
            onResetState()
            dispatch(depositExternalSlice.onSetDepsExternalWalletSelected(type))
            dispatch(depositExternalSlice.onSetDepsExternalWalletConnectState('PROCESSING'))
            onConnect(
                (BaseWalletTypeInfo as any)[type].type,
                (data) => {
                    if (data.status === 'SUCCESS' && provider) {
                        console.log('%c onConnect((BaseWalletTypeInfo as any)[type].type', 'font-size: 24px; color: blue;', data)
                        dispatch(depositExternalSlice.onSetWalletAddress(data.data))
                        dispatch(
                            depositExternalSlice.onConnectWallet({
                                type,
                                provider
                            })
                        )
                    } else {
                        dispatch(depositExternalSlice.onSetDepsExternalWalletConnectState('FAILED'))
                    }
                },
                () => dispatch(depositExternalSlice.onSetDepsExternalWalletConnectState('FAILED'))
            )
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [provider]
    )

    const handleInputChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {
                target: { value }
            } = e
            if (value.length > 0) {
                clearErrors('amount')
            }
            if (!tokenByNetwork?.decimals) {
                setError('amount', { type: 'custom', message: 'The decimals not invalid' })
                return
            }
            const d = Formatter.fromDecimal(String(availableBalance?.original), tokenByNetwork.decimals)
            if (!availableBalance || new BigNumber(d).isZero()) {
                setError('amount', { type: 'custom', message: 'The balance not enough.' })
                return
            } else {
                if (new BigNumber(value).isLessThan(new BigNumber(tokenByNetwork?.minDeposit || 0))) {
                    setError('amount', { type: 'custom', message: 'The amount you entered must be larger than the minimum deposit.' })
                    return
                }
                if (new BigNumber(value).isGreaterThan(new BigNumber(d))) {
                    setError('amount', { type: 'custom', message: 'The amount you entered must be below maximum deposit amount limit.' })
                    return
                }
                clearErrors('amount')
            }
        },
        [availableBalance, clearErrors, tokenByNetwork?.decimals, tokenByNetwork?.minDeposit, setError]
    )
    const handleMaxBalance = React.useCallback(() => {
        if (provider) {
            dispatch(
                depositExternalSlice.onFetchAvailableBalance({
                    provider
                })
            )

            if (!availableBalance || !availableBalance.original) {
                setError('amount', { type: 'custom', message: 'The balance not enough.' })
            } else {
                if (!tokenByNetwork?.decimals) {
                    setError('amount', { type: 'custom', message: 'The decimals not invalid' })
                    return
                }
                const d = Formatter.fromDecimal(String(availableBalance.original), tokenByNetwork.decimals)
                const { num } = Formatter.onToFixedSizeNumber(+d, 9)
                setValue('amount', Number(num))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provider, availableBalance, setError, tokenByNetwork?.decimals, setValue])

    const onSubmit = handleSubmit((data: DepositExternalTypes.DepositRequest) => {
        if (data && provider) {
            dispatch(
                depositExternalSlice.onDeposit({
                    amount: data.amount,
                    provider
                })
            )
            dispatch(depositExternalSlice.onSetDepositLoading(true))
        }
    })

    const renderSymbol = React.useCallback(() => {
        const symbolPath = `/tokens/ic24px_${tokenByNetwork?.symbol.toLowerCase() || 'none'}.svg`
        return <Symbol name={tokenByNetwork?.displayName} source={symbolPath} height={32} width={32} />
    }, [tokenByNetwork])

    const renderWallet = React.useCallback(() => {
        if (walletConfig) {
            return walletConfig.walletProvidersList.map((w, idx) => {
                const walletInfo = (ExternalWalletInfo as any)[w] as { title: string; icon: React.ReactNode }
                const isSelected = externalWalletSelected === w
                return (
                    <Wallet
                        key={idx}
                        title={walletInfo.title}
                        type={w}
                        icon={walletInfo.icon}
                        isSelected={isSelected}
                        onConnectWallet={handleWalletSelected}
                        state={isSelected ? externalWalletConnectState : 'NONE'}
                        className="mb-12"
                    />
                )
            })
        }
    }, [externalWalletConnectState, externalWalletSelected, handleWalletSelected, walletConfig])

    const renderAvailableBalance = React.useCallback(() => {
        if (!availableBalance || !availableBalance.original) {
            return <></>
        }
        if (!tokenByNetwork?.decimals) {
            return <span className="base-functional-stressful">The decimals not invalid</span>
        }
        const d = Formatter.fromDecimal(String(availableBalance.original), tokenByNetwork?.decimals)
        const { num } = Formatter.onToFixedSizeNumber(+d, 9)
        return (
            <p className="base-black-darker">
                Available: <span className="w700 base-black-darkest mr-4">{num}</span>
                {tokenByNetwork?.symbol}
            </p>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableBalanceVersion, tokenByNetwork])

    return (
        <>
            <form onSubmit={onSubmit}>
                <CoinListSelect onTokenSelected={onResetState} />
                <div
                    className={classNames({
                        'd-none': !tokenByNetwork
                    })}
                >
                    <p className="w400 base-black-darker mt-16 mb-16">Select external wallet to deposit:</p>
                    {renderWallet()}
                    <div
                        className={classNames('mb-24', {
                            'd-none':
                                externalWalletSelected === BaseEnum.WalletProvider.WP_NONE || externalWalletConnectState !== 'CONNECTED'
                        })}
                    >
                        <Input
                            label="Amount:"
                            classNameWrapper="mt-16 mb-8"
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            prefixClassName="d-flex align-items-center"
                            className="text-overflow-ellipsis pl-8"
                            id="address"
                            name="address"
                            type={'text'}
                            placeholder="Enter your amount"
                            autoComplete="off"
                            spellCheck="false"
                            register={register('amount', {
                                onChange: (e) => handleInputChange(e)
                            })}
                            prefixHTML={renderSymbol()}
                            suffixHTML={
                                <Button
                                    type="button"
                                    autoWidth
                                    variant="dark"
                                    className="base-white"
                                    onClick={handleMaxBalance}
                                    overrideStyled={css`
                                        --base-button-height: 2.25rem;
                                        --base-button-radius: 0.375rem;
                                    `}
                                >
                                    Max
                                </Button>
                            }
                        />
                        <FormError errors={errors} name="amount" className="base-functional-stressful text-14 mb-8" />
                        {renderAvailableBalance()}
                        {externalWalletAddress && externalWalletConnectState === 'CONNECTED' && (
                            <p className="mt-8 mb-16 base-black-darker">
                                Wallet address: <span className="base-black-darkest">{externalWalletAddress}</span>
                            </p>
                        )}
                    </div>
                    <div
                        className={classNames('d-flex justify-content-center', {
                            'd-none':
                                externalWalletSelected === BaseEnum.WalletProvider.WP_NONE || externalWalletConnectState !== 'CONNECTED'
                        })}
                    >
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="mt-24 d-flex align-items-center justify-content-center flex uppercase text-white rd-8"
                            spinnerLoading={<Spinner liteColor="var(--base-black-normal)" />}
                            isLoading={depsLoading}
                            disabled={depsLoading || !!errors.amount}
                        >
                            Deposit
                        </Button>
                    </div>
                </div>{' '}
            </form>
        </>
    )
}
