import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { css } from 'styled-components'
import BigNumber from 'bignumber.js'
import toast from 'react-hot-toast'
import { Button } from '@nixjs23n6/baseui-button'
import { Types } from '@athena20/ts-types'
import { BaseEnum, PaymentTypes } from '@lottery/types'
import { MB } from '@lottery/utils'
import { InputNumberValue } from '@lottery/uikit'
import * as gameRedux from 'redux/game'
import { onRandomCard } from 'modules/game/hilo/utils/random'
import { DIRECTION_LABEL } from 'modules/game/hilo/consts/consts'
import { MessageBrokerID, MessageBrokerKey, HiLoDirection, HiLoTurnStatus } from 'modules/game/hilo/consts/enum'
import { GameBaseTypes } from 'modules/game/hilo/types'
import { getMinAmount, getMaxAmount, getInputAmountNumber, isEnoughBalance } from 'modules/game/hilo/utils/amount'
import { BetTypes, useBet } from 'modules/game/hilo/context/BetContext'
import { useSound } from 'modules/game/hilo/context/SoundContext'
import * as gameSlice from 'modules/game/hilo/redux/game/slice'
import * as gameSelector from 'modules/game/hilo/redux/game/selectors'
import * as walletSlice from 'redux/wallet/slice'
import * as walletSelector from 'redux/wallet/selectors'
import { InputAmount } from './InputAmount'
import { FormBettingStyled } from './index.styled'

const ButtonCss = css`
    width: 3.125rem;
    --base-button-height: 100%;
`
const LABEL_BUTTON_BET = {
    CASH_OUT: 'Cashout',
    BET: 'bet'
}

interface FormBettingPropArg {}

export const FormBetting: React.FC<FormBettingPropArg> = () => {
    const dispatch = useDispatch()
    const isBalanceLoading = useSelector(gameSelector.getBalanceLoading())
    const isGameJoined = useSelector(gameRedux.gamingJoinedSelector())
    const decimals = useSelector(gameSelector.decimalsSelector())
    const getDirectServerBetConfigs = useSelector(gameSelector.getDirectServerBetConfigsSelector())
    const maxSkip = useSelector(gameSelector.maxSkipSelector())
    const existedTurn = useSelector(gameSelector.existedTurnSelector())
    const tokenSelected = useSelector(walletSelector.walletTokenSelectedSelector())
    const tokenSelectedDefault = useSelector(walletSelector.walletTokenSelectedDefaultSelector())

    const [ourAmount, setOurAmount] = React.useState<string>('0')
    const [balance, setBalance] = React.useState<Types.Nullable<string>>(null)
    const [turnID, setTurnID] = React.useState<Types.Nullable<string>>(null)
    const [walletSelectedTokenChange, setWalletSelectedTokenChange] = React.useState<boolean>(false)

    const betAmountConfig = useSelector(gameSelector.getBetAmountConfigSelector())
    const { sound } = useSound()
    const { betState, dispatchBet } = useBet()

    const onEmitAmount = (value: string) => {
        setOurAmount(value)
    }
    const onInitAmount = (_betAmountConfig: Types.Nullable<string[]>, _balance: string, _ourBetAmount: string) => {
        const b = new BigNumber(_balance)
        const o = new BigNumber(_ourBetAmount)
        const t = o.isZero() || b.isLessThan(o) ? _balance : _ourBetAmount
        if (!_betAmountConfig || _betAmountConfig.length < 1) {
            return t
        }
        const minAmount = getMinAmount(_betAmountConfig[2], t)
        const formatAmount = new BigNumber(minAmount)
        return formatAmount.toFixed(decimals)
    }

    const onPlaceBet = React.useCallback(
        (_direction: HiLoDirection) => {
            sound && sound.onSourcePlay()
            dispatchBet({
                type: BetTypes.Type.SET_PLAY,
                payload: true
            })
            dispatchBet({
                type: BetTypes.Type.SET_PLACE_BET_RESULT,
                payload: null
            })
            if (turnID) {
                const params: GameBaseTypes.PlaceBetRequest = {
                    turnId: turnID,
                    direction: _direction
                }

                const delayParams: MB.DelaySetting[] = [
                    {
                        publishType: MB.DELAY_PUBLISH_TYPE.ALL,
                        msgType: MessageBrokerKey.HILO_BET_RESULT_NOTIFICATION,
                        timestampField: ''
                    },
                    {
                        publishType: MB.DELAY_PUBLISH_TYPE.LATEST,
                        msgType: MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION,
                        timestampField: 'timestamp'
                    },
                    {
                        publishType: MB.DELAY_PUBLISH_TYPE.ALL,
                        msgType: MB.COMMON_KEY.GET_JACKPOT_NOTIFICATION,
                        timestampField: ''
                    }
                ]

                MB.messageBroker.addDelayedSettings(delayParams)
                executeBet(params)

                sound && sound.onSourcePlay()
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sound, ourAmount, turnID, tokenSelected]
    )

    const onResetGame = React.useCallback(() => {
        setTurnID(null)

        dispatchBet({
            type: BetTypes.Type.SET_PLAY,
            payload: false
        })
        dispatchBet({
            type: BetTypes.Type.SET_DISABLED,
            payload: false
        })
        dispatchBet({
            type: BetTypes.Type.SET_SKIP,
            payload: maxSkip || 18
        })
        dispatchBet({
            type: BetTypes.Type.INITIAL_STATE
        })
        dispatch(gameSlice.onExistedTurn())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatchBet, maxSkip])

    const getCompletedTurnLastest = (turnsList: GameBaseTypes.HiLoTurn[]) => {
        let turnAllowCashout: Types.Nullable<GameBaseTypes.HiLoTurn> = null
        const leng = turnsList.length
        for (let i = leng - 1; i >= 0; i--) {
            if (turnsList[i].status === HiLoTurnStatus.HLTS_COMPLETED) {
                turnAllowCashout = turnsList[i]
                break
            }
        }
        return turnAllowCashout
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const onInitTurnPlaying = React.useCallback((turnPlaying: GameBaseTypes.HiLoTurn) => {
        const { initCard, offeredOptionsList, effectedCoefficient, initCoefficient } = turnPlaying
        if (initCard) {
            dispatchBet({
                type: BetTypes.Type.SET_DISABLED,
                payload: true
            })
            dispatchBet({
                type: BetTypes.Type.SET_CARD,
                payload: initCard
            })
            dispatch(gameSlice.onExistedTurn(initCard))
        }
        if (offeredOptionsList)
            dispatchBet({
                type: BetTypes.Type.SET_OFFERED_OPTIONS_LIST,
                payload: offeredOptionsList
            })
        const coefficient = effectedCoefficient ? effectedCoefficient : initCoefficient
        dispatchBet({ type: BetTypes.Type.SET_COEFFICIENT, payload: coefficient })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        dispatch(gameSlice.onCheckExistTurn())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (existedTurn) {
            dispatchBet({
                type: BetTypes.Type.SET_CARD,
                payload: existedTurn
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existedTurn])

    React.useEffect(() => {
        if (maxSkip) {
            dispatchBet({
                type: BetTypes.Type.SET_SKIP,
                payload: maxSkip
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSkip])

    React.useEffect(() => {
        if (getDirectServerBetConfigs && !getDirectServerBetConfigs?.[tokenSelected]) {
            toast.error(`Currency unsupported: ${tokenSelected}`)
            setTimeout(() => {
                dispatch(walletSlice.onSetWalletTokenSelected(tokenSelectedDefault))
            }, 2000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenSelected, tokenSelectedDefault, getDirectServerBetConfigs])

    React.useEffect(() => {
        if (betAmountConfig && betAmountConfig && balance && walletSelectedTokenChange) {
            onEmitAmount(onInitAmount(betAmountConfig, balance, ourAmount))
            setWalletSelectedTokenChange(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betAmountConfig, balance, ourAmount, walletSelectedTokenChange])

    React.useEffect(() => {
        if (tokenSelected) {
            setWalletSelectedTokenChange(true)
            setBalance(null)
        }
    }, [tokenSelected])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.HILO_NEW_TURN_FORM_BETTING),
            MessageBrokerKey.HILO_CREATE_NEW_TURN,
            ({ msgData }: MB.SubscribeData<GameBaseTypes.CreateNewTurnReply>) => {
                console.group('HILO_CREATE_NEW_TURN')
                console.log('[Message broker] Subscribe new turn ID: ', msgData)
                console.groupEnd()
                if (msgData) {
                    const { turnId, numSkipRemaining, turnsList, betAmount } = msgData
                    setTurnID(turnId)

                    dispatchBet({
                        type: BetTypes.Type.SET_TURN_ID,
                        payload: turnId
                    })

                    dispatchBet({
                        type: BetTypes.Type.SET_SKIP,
                        payload: numSkipRemaining
                    })

                    if (betAmount) onEmitAmount(betAmount)

                    dispatchBet({
                        type: BetTypes.Type.SET_TURNS_LIST,
                        payload: turnsList
                    })

                    const turnPlaying = turnsList.find((t) => t.status === HiLoTurnStatus.HLTS_PLAYING)
                    if (turnPlaying) onInitTurnPlaying(turnPlaying)

                    if (turnsList.length > 0) {
                        const turnLastest = getCompletedTurnLastest(turnsList)
                        if (turnLastest) {
                            if (turnLastest.isWin) {
                                dispatchBet({
                                    type: BetTypes.Type.SET_ALLOW_CASH_OUT,
                                    payload: true
                                })
                            } else onResetGame()
                        }
                    }
                }
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const keys = [MB.COMMON_KEY.RESET_PLAY_GAME, MessageBrokerKey.HILO_PLACE_BET_ERROR]
        const subIds = MB.messageBroker.subscribes(
            String(MessageBrokerID.HILO_GAME_BOARD),
            keys,
            ({ msgType, msgData }: MB.SubscribeData<any>) => {
                if (msgType === MB.COMMON_KEY.RESET_PLAY_GAME || msgType === MessageBrokerKey.HILO_PLACE_BET_ERROR) {
                    dispatchBet({
                        type: BetTypes.Type.SET_PLACE_BET_RESULT,
                        payload: null
                    })

                    dispatchBet({
                        type: BetTypes.Type.SET_PLAY,
                        payload: false
                    })
                    toast.error(`Error, ${JSON.stringify(msgData)}`)
                    if (msgType === MessageBrokerKey.HILO_PLACE_BET_ERROR) {
                        // handleCreateNewTurn()
                    }
                }
            }
        )
        return () => {
            MB.messageBroker.unsubscribes(subIds)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.HILO_GAME_BOARD),
            MessageBrokerKey.HILO_PLACE_BET_RESULT,
            ({ msgData }: MB.SubscribeData<GameBaseTypes.PlaceBetReply>) => {
                if (msgData) {
                    console.log('HILO_PLACE_BET_RESULT', msgData, msgData.balance)
                    dispatchBet({
                        type: BetTypes.Type.SET_PLAY,
                        payload: false
                    })
                    dispatchBet({
                        type: BetTypes.Type.SET_SKIP,
                        payload: msgData.numSkipRemaining
                    })
                    if (msgData.luckyCard)
                        dispatchBet({
                            type: BetTypes.Type.SET_CARD,
                            payload: msgData.luckyCard
                        })

                    const { turnsList } = msgData
                    dispatchBet({
                        type: BetTypes.Type.SET_TURNS_LIST,
                        payload: turnsList
                    })
                    const turnPlaying = turnsList.find((t) => t.status === HiLoTurnStatus.HLTS_PLAYING)
                    if (turnPlaying) {
                        onInitTurnPlaying(turnPlaying)
                        if (turnPlaying.initCard)
                            dispatch(
                                gameSlice.onCreateNewTurn({
                                    card: turnPlaying.initCard
                                })
                            )
                    }

                    const turnLastest = getCompletedTurnLastest(turnsList)
                    console.log('Turn latest completed or win', turnLastest)
                    if (turnLastest) {
                        if (turnLastest?.isWin) {
                            sound && sound.onSoundWin()
                            dispatchBet({
                                type: BetTypes.Type.SET_ALLOW_CASH_OUT,
                                payload: true
                            })
                        } else {
                            onResetGame()
                            sound && sound.onSoundLose()
                        }
                    }
                    console.warn('[Continue]', msgData)
                }
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatchBet, onResetGame])

    React.useEffect(() => {
        const keys = [
            MessageBrokerKey.FETCH_AVAILABLE_BALANCE,
            MessageBrokerKey.HILO_PLACE_CASH_OUT,
            MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION
        ]
        const subs = MB.messageBroker.subscribes(
            String(MessageBrokerID.HILO_BALANCE_AND_CASH_OUT_FORM_BETTING),
            keys,
            ({ msgType, msgData }: MB.SubscribeData<string | GameBaseTypes.Turn | PaymentTypes.BalanceNotificationChange>) => {
                if (msgType && msgData) {
                    if (MB.messageBroker.isEqual(msgType, MessageBrokerKey.FETCH_AVAILABLE_BALANCE)) {
                        console.group('HILO_FETCH_AVAILABLE_BALANCE')
                        console.log('[Message broker] Subscribe init available balance: ', msgData)
                        console.groupEnd()
                        setBalance(msgData as string)
                    }
                    if (MB.messageBroker.isEqual(msgType, MessageBrokerKey.HILO_PLACE_CASH_OUT)) {
                        console.group('HILO_CREATE_NEW_TURN')
                        console.log('[Message broker] Subscribe new turn ID: ', msgData)
                        console.groupEnd()
                        onResetGame()
                    }
                    if (msgType === MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION) {
                        console.group('HILO_BALANCE_CHANGE_NOTIFICATION')
                        console.log('[Message broker] Subscribe balance change notification from instant keno: ', msgData)
                        console.log('Token selected', tokenSelected)
                        console.groupEnd()
                        if (msgData) {
                            const { available, symbol, gameSymbol } = msgData as PaymentTypes.BalanceNotificationChange
                            if (tokenSelected === symbol && gameSymbol === BaseEnum.GameSymbol.GS_DICE) setBalance(available)
                        }
                    }
                }
            }
        )
        return () => {
            MB.messageBroker.unsubscribes(subs)
        }
    }, [dispatchBet, onResetGame, tokenSelected])

    const onMin = React.useCallback(() => {
        if (betAmountConfig) {
            const v = new BigNumber(getMinAmount(betAmountConfig[0], ourAmount))
            onEmitAmount(v.toFixed())
            sound && sound.onSoundClick()
        }
    }, [betAmountConfig, ourAmount, sound])

    const onMax = React.useCallback(() => {
        if (betAmountConfig) {
            const v = new BigNumber(getMaxAmount(betAmountConfig[1], ourAmount))
            onEmitAmount(v.toFixed(decimals))
            sound?.enabled && sound.onSoundClick()
        }
    }, [betAmountConfig, ourAmount, sound, decimals])

    const onHalf = React.useCallback(() => {
        if (betAmountConfig && balance) {
            const v = new BigNumber(getInputAmountNumber(ourAmount, betAmountConfig[0], betAmountConfig[1], balance, 'HALF'))
            onEmitAmount(v.toFixed(decimals))
            sound?.enabled && sound.onSoundClick()
        }
    }, [betAmountConfig, ourAmount, balance, sound, decimals])

    const onDouble = React.useCallback(() => {
        if (betAmountConfig && balance) {
            const v = new BigNumber(getInputAmountNumber(ourAmount, betAmountConfig[0], betAmountConfig[1], balance, 'DOUBLE'))
            onEmitAmount(v.toFixed(decimals))
            sound?.enabled && sound.onSoundClick()
        }
    }, [betAmountConfig, ourAmount, balance, sound, decimals])

    const onAmountChange = React.useCallback(
        (d: InputNumberValue) => {
            if (d && betAmountConfig && balance) {
                const { value } = d
                const maxAmount = new BigNumber(getMaxAmount(betAmountConfig[1], balance))
                let v = value
                if (value.isGreaterThan(maxAmount)) v = maxAmount
                onEmitAmount(v.toFixed(decimals))
            }
        },
        [betAmountConfig, balance, decimals]
    )

    const onAmountBlur = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event && betAmountConfig && balance) {
                const { value } = event.target
                const min = new BigNumber(getMinAmount(betAmountConfig[0], balance))
                const curr = new BigNumber(value)
                let a = curr.toFixed(decimals)
                if (curr.isNaN() || curr.isLessThan(min)) {
                    a = min.toFixed(decimals)
                }
                setOurAmount(a)
            }
        },
        [betAmountConfig, balance, decimals]
    )

    const executeBet = (params: GameBaseTypes.PlaceBetRequest) => dispatch(gameSlice.onPlaceBet(params))

    const onInitBet = React.useCallback(() => {
        if (!isGameJoined) {
            toast.error('Unable to join game failed to connect. The system is not available yet.')
            return
        }
        if (!tokenSelected || tokenSelected.length === 0) {
            toast.error('Token selected not found.')
            return
        }
        if (!betState) {
            toast.error('Data Error. Data is invalid.')
            return
        }
        if (!ourAmount) {
            toast.error('Amount is required.')
            return
        }
        if (!balance) {
            toast.error('Balance is required.')
            return
        }
        if (betAmountConfig && balance && !isEnoughBalance(ourAmount, betAmountConfig?.[0], betAmountConfig?.[1], balance)) {
            // Deposit now
            toast.error('Your amount out of range.')
            return
        }
        let ourCard = betState.card
        if (!betState.card) {
            const randomCard = onRandomCard()
            ourCard = {
                suit: Number(randomCard[0][0]),
                value: Number(randomCard[1][0])
            }
            dispatchBet({
                type: BetTypes.Type.SET_CARD,
                payload: ourCard
            })
        }
        if (!existedTurn && ourCard) {
            dispatch(
                gameSlice.onCreateNewTurn({
                    card: ourCard,
                    initBet: { betAmount: ourAmount, currencySymbol: tokenSelected }
                })
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameJoined, tokenSelected, betState, ourAmount, balance, betAmountConfig, existedTurn, dispatchBet, turnID])

    const onBetOrCashout = React.useCallback(
        (isBet: boolean) => {
            if (isBet) {
                sound && sound.onSoundClick()
                onInitBet()
                return true
            }
            if (turnID)
                dispatch(
                    gameSlice.onCashOut({
                        turnId: turnID
                    })
                )

            sound && sound.onSoundWin()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onInitBet, turnID]
    )

    const renderBetButton = React.useMemo(() => {
        const playDisabled = betState.isPlaying || isBalanceLoading || (existedTurn && !betState.allowCashOut)
        const isBet = !existedTurn && !betState.allowCashOut
        const label = isBet ? LABEL_BUTTON_BET.BET : LABEL_BUTTON_BET.CASH_OUT
        return (
            <Button
                variant="primary"
                size="xxl"
                className="rd-8 button-betting"
                overrideStyled={css`
                    color: white;
                    &:hover {
                        box-shadow: 7px 5px 56px -14px var(--base-color-primary-2);
                        color: white;
                    }
                    &:disabled {
                        box-shadow: none;
                        color: #ffffff4d;
                    }
                `}
                disabled={playDisabled}
                onClick={() => onBetOrCashout(isBet)}
            >
                <div className="position-absolute text-oswald text-center">
                    <span className="d-flex align-items-center justify-content-center font-style-italic text-uppercase">
                        <span>{label}</span>
                    </span>
                </div>
            </Button>
        )
    }, [betState.isPlaying, betState.allowCashOut, isBalanceLoading, existedTurn, onBetOrCashout])

    const renderHighLow = React.useMemo(() => {
        if (betState.offeredOptionsList.length === 0) {
            return (
                <div className="d-flex flex-column" style={{ flex: '50%' }}>
                    <Button
                        className="mb-16 text-white text-uppercase"
                        variant="primary"
                        disabled
                        overrideStyled={css`
                            --base-button-height: 5rem;
                        `}
                    >
                        <div>
                            <span className="mr-8">
                                <i className="iconic_withdrawal"></i>
                            </span>
                            <span>Higher or Equal</span>
                        </div>
                    </Button>
                    <Button
                        className="text-white text-uppercase"
                        variant="secondary"
                        disabled
                        overrideStyled={css`
                            --base-button-height: 5rem;
                        `}
                    >
                        <div>
                            <span className="mr-8">
                                <i className="iconic_deposit1"></i>
                            </span>
                            <span>Lower or Equal</span>
                        </div>
                    </Button>
                </div>
            )
        }
        const first = betState.offeredOptionsList[0]
        const second = betState.offeredOptionsList[1]
        return (
            <div className="d-flex flex-column" style={{ flex: '50%' }}>
                <Button
                    className="mb-16 text-white"
                    variant="primary"
                    overrideStyled={css`
                        --base-button-height: 5rem;
                    `}
                    onClick={() => onPlaceBet(first.direction)}
                >
                    <div>
                        <span className="mr-8">
                            <i className="iconic_withdrawal"></i>
                        </span>
                        <span className="mr-16">
                            {DIRECTION_LABEL[first.direction]} &nbsp;&nbsp;&nbsp;{`${first.winningChance}%`}
                        </span>
                        <span>{`${first.multiplier}x`}</span>
                    </div>
                </Button>
                <Button
                    className="text-white"
                    variant="secondary"
                    overrideStyled={css`
                        --base-button-height: 5rem;
                    `}
                    onClick={() => onPlaceBet(second.direction)}
                >
                    <div>
                        <span className="mr-8">
                            <i className="iconic_deposit1"></i>
                        </span>
                        <span className="mr-16">
                            {DIRECTION_LABEL[second.direction]} &nbsp;&nbsp;&nbsp;{`${second.winningChance}%`}
                        </span>
                        <span>{`${second.multiplier}x`}</span>
                    </div>
                </Button>
            </div>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betState.offeredOptionsList])

    return (
        <FormBettingStyled>
            <div className="d-flex align-items-center">
                <div className="d-flex flex-column mr-16" style={{ flex: '50%' }}>
                    <div className="mb-16 d-flex align-items-stretch form-betting">
                        <div className="d-flex flex-column betting-left">
                            <Button
                                type="button"
                                className="mb-6 text-oswald w700 button-amount"
                                variant="dark"
                                outline
                                autoWidth
                                overrideStyled={ButtonCss}
                                onClick={onMin}
                                disabled={betState.disabled}
                            >
                                Min
                            </Button>
                            <Button
                                type="button"
                                className="text-oswald w700 button-amount"
                                variant="dark"
                                outline
                                autoWidth
                                overrideStyled={ButtonCss}
                                onClick={onMax}
                                disabled={betState.disabled}
                            >
                                Max
                            </Button>
                        </div>
                        <InputAmount
                            className="ml-8 mr-8 h-100 flex-fill"
                            disabled={betState.disabled}
                            onChange={onAmountChange}
                            amount={ourAmount}
                            onBlur={onAmountBlur}
                        />
                        <div className="d-flex flex-column betting-right">
                            <Button
                                type="button"
                                className="mb-6 text-oswald w700 button-amount"
                                variant="dark"
                                outline
                                autoWidth
                                overrideStyled={ButtonCss}
                                onClick={onHalf}
                                disabled={betState.disabled}
                            >
                                1/2
                            </Button>
                            <Button
                                type="button"
                                className="text-oswald w700 button-amount"
                                variant="dark"
                                outline
                                autoWidth
                                overrideStyled={ButtonCss}
                                onClick={onDouble}
                                disabled={betState.disabled}
                            >
                                2x
                            </Button>
                        </div>
                    </div>
                    {renderBetButton}
                </div>
                {renderHighLow}
            </div>
        </FormBettingStyled>
    )
}
