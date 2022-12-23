import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import produce from 'immer'
import { BaseEnum } from '@lottery/types'
import { MB } from '@lottery/utils'
import { PlayMode } from 'modules/game/base/redux/setting'
import { MessageBrokerKey, MessageBrokerID } from 'modules/game/keno/consts/enum'
import { GameBaseTypes } from 'modules/game/keno/types/game'
import { useBet, BetTypes } from 'modules/game/keno/context/BetContext'
import { useSound } from 'modules/game/keno/context/SoundContext'
import { UpdateBalance } from 'redux/payment/types'
import * as paymentSlice from 'redux/payment/slice'
import * as gameSelector from 'modules/game/keno/redux/game/selectors'
import * as settingSelector from 'modules/game/keno/redux/setting/selectors'
import { ScreenStyled } from './Screen.styled'

interface ScreenPropArg {}

export const Screen: React.FC<ScreenPropArg> = () => {
    const dispatch = useDispatch()
    const numbers = useSelector(gameSelector.numberSelector())
    const spot = useSelector(gameSelector.maxSpotSelector())
    const playMode = useSelector(settingSelector.getPlayModeSelector())
    const gameMode = useSelector(settingSelector.getGameModeSelector())

    const { betState, dispatchBet } = useBet()
    const { sound } = useSound()

    const handleRandomDirectServer = React.useCallback((betResult: GameBaseTypes.PlaceBetReply) => {
        MB.messageBroker.publishDelayedMsg()
        MB.messageBroker.publish(MessageBrokerKey.INSTANT_KENO_PLACE_BET_FROM_DELAY_RESULT, betResult)
    }, [])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.INSTANT_KENO_BOARD_CENTER),
            MessageBrokerKey.INSTANT_KENO_PLACE_BET_FROM_DELAY_RESULT,
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
            return
        }
        const { betResult } = betState

        MB.messageBroker.publish(MessageBrokerKey.INSTANT_KENO_PLACE_BET_FROM_DELAY_RESULT, betResult)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betState.betResult, betState.isPlaying, gameMode])

    React.useEffect(() => {
        if (!betState.betResult || !betState.isPlaying || gameMode === BaseEnum.PlayingMode.PM_SMART_CONTRACT) return

        const { betResult } = betState
        if (playMode === PlayMode.FAST) {
            MB.messageBroker.publishDelayedMsg()
            MB.messageBroker.publish(MessageBrokerKey.INSTANT_KENO_PLACE_BET_FROM_DELAY_RESULT, betResult)
            dispatchBet({
                type: BetTypes.Type.SET_LUCKY_NUMBERS,
                payload: betResult.luckyNumbersList
            })
        } else {
            handleRandomDirectServer(betResult)
            dispatchBet({
                type: BetTypes.Type.SET_LUCKY_NUMBERS,
                payload: betResult.luckyNumbersList
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betState, playMode, gameMode, handleRandomDirectServer])

    const onSelectNumber = React.useCallback(
        (num: number) => {
            if (spot && betState.numbers.length <= spot) {
                sound?.onSourceSelect()
                const numbers = produce(betState.numbers, (draft) => {
                    if (draft.length === 0) {
                        draft.push(num)
                    } else {
                        const index = draft.findIndex((d) => d === num)
                        if (index === -1) {
                            draft.push(num)
                        } else {
                            draft.splice(index, 1)
                            dispatchBet({
                                type: BetTypes.Type.SET_LUCKY_NUMBERS,
                                payload: []
                            })
                        }
                    }
                })
                dispatchBet({
                    type: BetTypes.Type.SET_NUMBERS,
                    payload: numbers
                })
            }
            if (betState.luckyNumbers.findIndex((d) => d === num) !== -1) {
                dispatchBet({
                    type: BetTypes.Type.SET_LUCKY_NUMBERS,
                    payload: []
                })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [betState.numbers, betState.luckyNumbers, spot]
    )

    const renderNumbers = React.useMemo(() => {
        if (numbers.length === 0) return <></>
        return numbers.map((num, idx) => {
            let buttonClass = 'button-base'
            let disabled = false
            if (betState.numbers.length > 0) {
                if (spot && betState.numbers.length <= spot) {
                    if (betState.numbers.includes(num)) {
                        buttonClass = 'button-selected'
                    } else if (betState.numbers.length === spot) {
                        disabled = true
                    }
                }
                if (betState.luckyNumbers.includes(num)) {
                    buttonClass = 'button-lucky'
                    if (betState.numbers.includes(num)) {
                        buttonClass = 'button-win'
                    } else {
                        disabled = true
                    }
                }
            }
            return (
                <button
                    key={idx}
                    className={classNames('button button-base', buttonClass)}
                    disabled={disabled}
                    onClick={() => onSelectNumber(num)}
                >
                    <span>{num}</span> <div />
                </button>
            )
        })
    }, [betState.luckyNumbers, betState.numbers, numbers, spot, onSelectNumber])

    return (
        <ScreenStyled>
            <div className="board">{renderNumbers}</div>
        </ScreenStyled>
    )
}
