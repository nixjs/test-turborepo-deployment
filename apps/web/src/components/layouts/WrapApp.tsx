import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { WSEnums } from '@athena20/ts-grpc-socket'
import { useWebsocket } from '@athena20/ts-grpc-socket-react'
import { MB, BaseConst } from '@lottery/utils'
import { PaymentTypes } from '@lottery/types'
import { AuthConstant } from 'context/auth'
import { SocketPort } from 'consts/socket'
import { MESSAGE_BROKER_ID } from 'consts/messageBrokerId'
import { StorageServices } from 'services/localstorage'
import * as authAccountSlice from 'redux/auth/account/slice'
import * as paymentSlice from 'redux/payment/slice'
import * as depositSlice from 'redux/payment/deposit/slice'

interface WrapAppPropArg {
    children?: React.ReactNode
}

export const WrapApp: React.FC<WrapAppPropArg> = ({ children }) => {
    const dispatch = useDispatch()

    const { ws, onClose, onOpen, onReconnect } = useWebsocket()
    const subDepsRef = React.useRef<string | null>(null)
    const subBlRef = React.useRef<string | null>(null)
    const subStRef = React.useRef<string | null>(null)
    const isFirst = React.useRef(true)

    const [authEvent, setAuthEvent] = React.useState<keyof typeof AuthConstant.MessageData>()

    const onAuth = React.useCallback(() => {
        dispatch(authAccountSlice.onFetchUser())
        dispatch(paymentSlice.onFetchCurrencyConfig())
        dispatch(depositSlice.onFetchDepositAddresses())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onNoAuth = React.useCallback(() => {
        dispatch(paymentSlice.onGetCurrencyConfig([]))
        dispatch(depositSlice.onGetDepositAddresses([]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const accessToken = StorageServices.getAccessToken()
        if (accessToken) {
            onAuth()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const subId = MB.messageBroker.subscribe(AuthConstant.SubscribeId.UseLoginListener, AuthConstant.MessageType, ({ msgData }) => {
            setAuthEvent(msgData)
            if (
                msgData === AuthConstant.MessageData.Login ||
                msgData === AuthConstant.MessageData.Register ||
                msgData === AuthConstant.MessageData.NewToken
            ) {
                onAuth()
                const accessToken = StorageServices.getAccessToken()
                accessToken && onOpen?.(SocketPort.INTERNAL, undefined, accessToken)
            }
            if (msgData === AuthConstant.MessageData.Logout) {
                onNoAuth()
                onClose?.(WSEnums.ReasonCode.CLOSE_LOGOUT, 'Close socket after logout')
            }
        })
        return () => {
            subId && MB.messageBroker.unsubscribe(subId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ws])

    React.useEffect(() => {
        setTimeout(() => {
            if (isFirst.current && ws) {
                isFirst.current = false
                subDepsRef.current = ws.subscribe(ws.protoMsgType.DEPOSIT_BALANCE, (data) => {
                    MB.messageBroker.publish<PaymentTypes.DepositBalanceNotification>(MB.COMMON_KEY.DEPOSIT_BALANCE_NOTIFICATION, data)
                })
                subBlRef.current = ws.subscribe<PaymentTypes.BalanceNotification>(ws.protoMsgType.BALANCE, (data) => {
                    MB.messageBroker.publish<PaymentTypes.BalanceNotification>(MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION, data)
                })
                subStRef.current = ws.subscribeState<{ state: WSEnums.States; code?: number }>((e) => {
                    if (e && e.state === WSEnums.States.ON_CLOSE && e?.code === WSEnums.ReasonCode.CLOSE) {
                        onReconnect()
                    }
                })
            }
        }, BaseConst.WSInitDelay)

        return () => {
            if (ws) {
                subDepsRef.current && ws.unsubscribe(subDepsRef.current)
                subBlRef.current && ws.unsubscribe(subBlRef.current)
                subStRef.current && ws.unsubscribe(subStRef.current)
            }
        }
    }, [authEvent, onReconnect, ws])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribes<PaymentTypes.DepositBalanceNotification | PaymentTypes.BalanceNotification>(
            MESSAGE_BROKER_ID.PORTAL_DEPOSIT_NOTIFICATION,
            [MB.COMMON_KEY.DEPOSIT_BALANCE_NOTIFICATION, MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION],
            ({ msgType, msgData }) => {
                if (msgData) {
                    if (msgType === MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION) {
                        dispatch(paymentSlice.onExecuteBalanceChangeNotification(msgData as PaymentTypes.BalanceNotification))
                    }
                    if (msgType === MB.COMMON_KEY.DEPOSIT_BALANCE_NOTIFICATION) {
                        const { amount, symbol } = msgData as PaymentTypes.DepositBalanceNotification
                        toast.success(`Congratulations! ${amount} ${symbol} has been credited to your balance.`)
                    }
                }
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribes(sub)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>{children}</>
}
