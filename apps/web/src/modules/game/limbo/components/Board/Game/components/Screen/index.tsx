import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { MB } from '@lottery/utils'
import { PlayMode } from 'modules/game/base/redux/setting'
import { MessageBrokerKey, MessageBrokerID } from 'modules/game/limbo/consts/enum'
import { GameBaseTypes } from 'modules/game/limbo/types/game'
import { useBet } from 'modules/game/limbo/context/BetContext'
import { useSound } from 'modules/game/limbo/context/SoundContext'
import { UpdateBalance } from 'redux/payment/types'
import * as paymentSlice from 'redux/payment/slice'
import * as settingSelector from 'modules/game/limbo/redux/setting/selectors'
import { ScreenStyled } from './Screen.styled'

interface ScreenPropArg {}

const initRandom = (luckyNumber: number) => {
    if (luckyNumber <= 10) {
        return 0.01
    } else if (luckyNumber <= 50) {
        return 2.01
    } else if (luckyNumber <= 200) {
        return 20.01
    } else if (luckyNumber <= 400) {
        return 40.01
    } else if (luckyNumber <= 600) {
        return 60.01
    } else if (luckyNumber <= 800) {
        return 80.01
    } else if (luckyNumber <= 1200) {
        return 120.01
    } else if (luckyNumber <= 2200) {
        return 220.01
    } else if (luckyNumber <= 4400) {
        return 440.01
    } else if (luckyNumber <= 6600) {
        return 660.01
    } else if (luckyNumber <= 8800) {
        return 880.01
    } else if (luckyNumber <= 9999.99) {
        return 9990.01
    }
    return 0.01
}

export const Screen: React.FC<ScreenPropArg> = () => {
    const dispatch = useDispatch()
    const { betState } = useBet()
    const { sound } = useSound()

    const randomNumberRef = React.useRef<number>(0)
    const timeoutRef = React.useRef<Types.Nullable<NodeJS.Timeout>>(null)
    const intervalRef = React.useRef<Types.Nullable<NodeJS.Timeout>>(null)
    const playMode = useSelector(settingSelector.getPlayModeSelector())
    const gameMode = useSelector(settingSelector.getGameModeSelector())
    const [luckyNumber, setLuckyNumber] = React.useState<string>('0')

    const handleRandomDirectServer = React.useCallback((betResult: GameBaseTypes.PlaceBetReply) => {
        const num = betResult.luckyNumber
        intervalRef.current = setInterval(() => {
            randomNumberRef.current = Number(((randomNumberRef.current + initRandom(Number(num))) % 100).toFixed(2))
            // if (num === String(randomNumberRef.current)) {
            //     MB.messageBroker.publishDelayedMsg()
            //     MB.messageBroker.publish(MessageBrokerKey.LIMBO_PLACE_BET_FROM_DELAY_RESULT, betResult)
            //     setLuckyNumber(num)
            //     intervalRef.current && clearInterval(intervalRef.current)
            // } else {
            //     setLuckyNumber(String(randomNumberRef.current))
            // }
            MB.messageBroker.publishDelayedMsg()
            MB.messageBroker.publish(MessageBrokerKey.LIMBO_PLACE_BET_FROM_DELAY_RESULT, betResult)
            setLuckyNumber(num)
        }, 20)
    }, [])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.LIMBO_BOARD_CENTER),
            MessageBrokerKey.LIMBO_PLACE_BET_FROM_DELAY_RESULT,
            ({ msgData }: MB.SubscribeData<GameBaseTypes.PlaceBetReply>) => {
                if (msgData && sound?.enabled) {
                    msgData.isWin ? sound.onSoundWin() : sound.onSoundLose()
                }
            }
        )

        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
    }, [sound])

    React.useEffect(() => {
        if (!betState.isPlaying || gameMode === BaseEnum.PlayingMode.PM_DIRECT_SERVER) {
            timeoutRef.current = null
            return
        }
        const { betResult } = betState

        const randomFunc = () => {
            intervalRef.current = setInterval(() => {
                // randomNumberRef.current = Number(((randomNumberRef.current + initRandom(Number(num))) % 100).toFixed(2))
                setLuckyNumber(String(randomNumberRef.current))
            }, 20)
        }

        const num = +(betResult?.luckyNumber || 0)
        if (timeoutRef.current && num >= 0) {
            setLuckyNumber(String(num))
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            MB.messageBroker.publish(MessageBrokerKey.LIMBO_PLACE_BET_FROM_DELAY_RESULT, betResult)
            if (betResult && betResult.balance) {
                const {
                    balance: { available, symbol }
                } = betResult
                const params: UpdateBalance = {
                    available: available || '0',
                    animate: true,
                    type: BaseEnum.BalanceWalletTypes.EXTERNAL_WALLET,
                    symbol
                }
                dispatch(paymentSlice.onUpdateBalance(params))
            }
        } else {
            timeoutRef.current = setTimeout(() => {
                randomFunc()
            }, 200)
        }

        return () => {
            intervalRef.current && clearInterval(intervalRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betState.betResult, betState.isPlaying, gameMode])

    React.useEffect(() => {
        if (!betState.betResult || !betState.isPlaying || gameMode === BaseEnum.PlayingMode.PM_SMART_CONTRACT) return

        const { betResult } = betState
        const num = betResult.luckyNumber
        if (playMode === PlayMode.FAST) {
            MB.messageBroker.publishDelayedMsg()
            MB.messageBroker.publish(MessageBrokerKey.LIMBO_PLACE_BET_FROM_DELAY_RESULT, betResult)
            setLuckyNumber(num)
        } else {
            Number(num) >= 0 && handleRandomDirectServer(betResult)
        }
        return () => {
            intervalRef.current && clearInterval(intervalRef.current)
        }
    }, [betState, playMode, gameMode, handleRandomDirectServer])

    return (
        <ScreenStyled>
            <div className="d-flex align-items-center position-relative overflow-hidden user-select-none screen active">
                <div className="text-32 text-center w600 flex-fill position-relative">{luckyNumber}x</div>
            </div>
        </ScreenStyled>
    )
}
