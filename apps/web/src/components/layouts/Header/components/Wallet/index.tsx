import React from 'react'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useOnClickOutside } from 'usehooks-ts'
import { useWebsocket } from '@athena20/ts-grpc-socket-react'
import { Button } from '@nixjs23n6/baseui-button'
import { PaymentTypes, BaseEnum } from '@lottery/types'
import { Formatter, MB, BaseConst } from '@lottery/utils'
import { Balance, Symbol } from '@lottery/uikit'
import { MESSAGE_BROKER_ID } from 'consts/messageBrokerId'
import * as paymentSlice from 'redux/payment/slice'
import * as paymentSelector from 'redux/payment/selectors'
import * as walletSlice from 'redux/wallet/slice'
import * as walletSelector from 'redux/wallet/selectors'
import { DropdownWallet } from './DropdownWallet'
import { Types } from '@athena20/ts-types'

interface WalletPropArg {
    className?: string
}

export const Wallet: React.FC<WalletPropArg> = ({ className }) => {
    const dispatch = useDispatch()
    const { ws } = useWebsocket()
    const tokenSelected = useSelector(walletSelector.walletTokenSelectedSelector())
    const payoutAmount = useSelector(walletSelector.headerPayoutAmountSelector())
    const balances = useSelector(paymentSelector.balancesSelector())

    const [dropdown, setDropdown] = React.useState<boolean>(false)
    const [payoutAnimate, setPayoutAnimate] = React.useState<string>('')
    const payoutAmountRef = React.useRef<Types.Nullable<string>>(null)
    const dropdownRef = React.useRef<HTMLDivElement | null>(null)
    const subRef = React.useRef<string | null>(null)

    const handleClickOutside = () => {
        setDropdown(false)
    }

    useOnClickOutside(dropdownRef, handleClickOutside)

    React.useEffect(() => {
        if (payoutAmount) {
            const p = new BigNumber(payoutAmount)
            payoutAmountRef.current = payoutAmount
            const isWin = (p.isGreaterThan(0) && 'win_ball--win text-success') || ''
            const isLoss = (p.isLessThan(0) && 'win_ball--loss text-danger') || ''
            setPayoutAnimate(`active show ${isWin} ${isLoss}`)
            dispatch(walletSlice.onSetHeaderPayoutAmount(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payoutAmount])

    React.useEffect(() => {
        let timeoutRef: NodeJS.Timeout
        if (payoutAnimate) {
            timeoutRef = setTimeout(() => {
                setPayoutAnimate('')
                payoutAmountRef.current = null
            }, 1000)
        }
        return () => {
            clearTimeout(timeoutRef)
        }
    }, [payoutAnimate])

    React.useEffect(() => {
        setTimeout(() => {
            if (ws && ws.connected) {
                subRef.current = ws.subscribe(ws.protoMsgType.BALANCE, (data: any) => {
                    MB.messageBroker.publish(MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION, data)
                })
            }
        }, BaseConst.WSInitDelay)
        return () => {
            ws && subRef.current && ws.unsubscribe(subRef.current)
        }
    }, [ws])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            MESSAGE_BROKER_ID.GAME_DICE_BALANCE_CHANGE_NOTIFICATION,
            MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION,
            ({ msgData }: MB.SubscribeData<PaymentTypes.BalanceNotificationChange>) => {
                if (msgData) {
                    const { balanceChangeType, symbol, available } = msgData
                    const animate = balanceChangeType === BaseEnum.BalanceChangeType.BCT_GAME && symbol === tokenSelected
                    dispatch(
                        paymentSlice.onUpdateBalance({
                            available,
                            symbol,
                            type: BaseEnum.BalanceWalletTypes.LIVE_WALLET,
                            animate
                        })
                    )
                }
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenSelected])

    const renderBalance = React.useCallback(() => {
        if (!tokenSelected) {
            return <></>
        }
        const cToken = (balances || []).find((item) => item.currencySymbol === tokenSelected)
        if (!cToken) return <></>
        const { available, currencySymbol } = cToken
        const { num } = Formatter.onToFixedSizeNumber(Number(available), 9)
        const symbolPath = `/tokens/ic24px_${currencySymbol.toLowerCase() || 'none'}.svg`
        return (
            <div className="d-inline-flex ml-2 text-oswald text-16 align-items-center wallet-balance">
                <Symbol source={symbolPath} />
                <Balance value={num} className="w700 ml-4 wallet-value" />
                <span className="w600 ml-4 text-color-2">{currencySymbol}</span>
            </div>
        )
    }, [balances, tokenSelected])

    const renderLiveWallet = React.useMemo(() => {
        return (
            <div
                className={classNames('d-flex align-items-center pl-8 pr-6 pb-6 pt-6 mr-12 cursor-pointer position-relative wallet', {
                    active: dropdown,
                    show: dropdown
                })}
                ref={dropdownRef}
                onClick={() => setDropdown(!dropdown)}
                role="presentation"
            >
                {renderBalance()}
                <span className="wallet-token">
                    <i className="text-24 ic_down-small" />
                </span>
                <div className="d-flex flex-column justify-content-center position-absolute w-100 pe-none balance-animation">
                    <div
                        className={classNames(
                            'w700 d-flex align-items-center justify-content-center position-absolute balance-animation-text',
                            payoutAnimate
                        )}
                    >
                        <span className="d-inline-flex align-items-center flex-shrink-0 currency">
                            <div className="d-flex mr-10">
                                <Symbol source={`/tokens/ic24px_${tokenSelected.toLowerCase() || 'none'}.svg`} />
                            </div>
                            <span className="text-14 text-oswald">{payoutAmountRef.current}</span>
                        </span>
                    </div>
                </div>
                <DropdownWallet />
            </div>
        )
    }, [dropdown, payoutAnimate, renderBalance, tokenSelected])

    return (
        <div className={classNames('d-flex align-items-center header-wallet', className)}>
            {renderLiveWallet}
            <Button
                variant="primary"
                autoWidth
                className="w600 text-uppercase mr-12 text-white"
                overrideStyled={css`
                    --base-button-radius: 0.425rem;
                `}
            >
                Deposit
            </Button>
            <Button
                variant="secondary"
                autoWidth
                className="w600 text-uppercase text-white"
                overrideStyled={css`
                    --base-button-radius: 0.425rem;
                `}
            >
                Withdraw
            </Button>
        </div>
    )
}
