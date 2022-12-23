import React from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { MB } from '@lottery/utils'
import { PlayMode } from 'modules/game/base/redux/setting'
import { MessageBrokerKey, MessageBrokerID } from 'modules/game/dice/consts/enum'
import { GameBaseTypes } from 'modules/game/dice/types/game'
import { useRoll } from 'modules/game/dice/context/RollContext'
import { useSound } from 'modules/game/dice/context/SoundContext'
import { UpdateBalance } from 'redux/payment/types'
import * as paymentSlice from 'redux/payment/slice'
import * as diceSettingSelector from 'modules/game/dice/redux/setting/selectors'
import DiceIcon from './DiceIcon'
import { Prediction } from './Prediction'
import LuckyNumber from './LuckyNumber'
import { ScreenStyled } from './Screen.styled'

interface ScreenPropArg {}

export const Screen: React.FC<ScreenPropArg> = () => {
    const dispatch = useDispatch()
    const { rollState } = useRoll()
    const { sound } = useSound()

    const randomNumberRef = React.useRef<number>(0)
    const timeoutRef = React.useRef<Types.Nullable<NodeJS.Timeout>>(null)
    const intervalRef = React.useRef<Types.Nullable<NodeJS.Timeout>>(null)
    const playMode = useSelector(diceSettingSelector.getPlayModeSelector())
    const gameMode = useSelector(diceSettingSelector.getGameModeSelector())
    const [luckyNumber, setLuckyNumber] = React.useState<number>(0)

    const handleRandomDirectServer = React.useCallback((betResult: GameBaseTypes.PlaceBetReply) => {
        const num = betResult.luckyNumber
        intervalRef.current = setInterval(() => {
            randomNumberRef.current = (randomNumberRef.current + 1) % 100
            if (num === randomNumberRef.current) {
                MB.messageBroker.publishDelayedMsg()
                MB.messageBroker.publish(MessageBrokerKey.DICE_PLACE_BET_FROM_DELAY_RESULT, betResult)
                setLuckyNumber(num)
                intervalRef.current && clearInterval(intervalRef.current)
            } else {
                setLuckyNumber(randomNumberRef.current)
            }
        }, 20)
    }, [])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.DICE_BOARD_CENTER),
            MessageBrokerKey.DICE_PLACE_BET_FROM_DELAY_RESULT,
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
        if (!rollState.isRolling || gameMode === BaseEnum.PlayingMode.PM_DIRECT_SERVER) {
            timeoutRef.current = null
            return
        }
        const { betResult } = rollState

        const randomFunc = () => {
            intervalRef.current = setInterval(() => {
                randomNumberRef.current = (randomNumberRef.current + 1) % 100
                setLuckyNumber(randomNumberRef.current)
            }, 20)
        }

        const num = +(betResult?.luckyNumber || 0)
        if (timeoutRef.current && num >= 0) {
            setLuckyNumber(num)
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            MB.messageBroker.publish(MessageBrokerKey.DICE_PLACE_BET_FROM_DELAY_RESULT, betResult)
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
    }, [rollState.betResult, rollState.isRolling, gameMode])

    React.useEffect(() => {
        if (!rollState.betResult || !rollState.isRolling || gameMode === BaseEnum.PlayingMode.PM_SMART_CONTRACT) return

        const { betResult } = rollState
        const num = betResult.luckyNumber
        if (playMode === PlayMode.FAST) {
            MB.messageBroker.publishDelayedMsg()
            MB.messageBroker.publish(MessageBrokerKey.DICE_PLACE_BET_FROM_DELAY_RESULT, betResult)
            setLuckyNumber(num)
        } else {
            num >= 0 && handleRandomDirectServer(betResult)
        }
        return () => {
            intervalRef.current && clearInterval(intervalRef.current)
        }
    }, [rollState, rollState.betResult, playMode, gameMode, handleRandomDirectServer])

    return (
        <ScreenStyled>
            <div className="d-flex align-items-center position-relative overflow-hidden user-select-none screen active">
                <Image
                    className="position-absolute object_rocket"
                    src="/modules/games/dice/rocket.svg"
                    width="40"
                    height="29"
                    alt="Rocket"
                />
                <Image className="position-absolute object_moon" src="/modules/games/dice/moon.svg" width="80" height="80" alt="Moon" />
                <Image
                    className="position-absolute object_earth"
                    src="/modules/games/dice/earth.svg"
                    width="100"
                    height="100"
                    alt="Earth"
                />
                <Image
                    className="position-absolute animated--slow object_astronaut"
                    src="/modules/games/dice/astronaut.svg"
                    alt="Astronaut"
                    width={90}
                    height={115}
                />
                <div className="flex-fill position-relative screen--left">
                    <Prediction />
                </div>
                <div className="screen--center">
                    <DiceIcon active={rollState.isRolling} />
                </div>
                <div className="flex-fill position-relative screen-right">
                    <LuckyNumber
                        isWin={rollState.betResult?.isWin}
                        luckyNumber={luckyNumber < 10 ? `0${luckyNumber}` : String(luckyNumber)}
                    />
                </div>
            </div>
        </ScreenStyled>
    )
}
