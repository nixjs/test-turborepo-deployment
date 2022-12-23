import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { css } from 'styled-components'
import BigNumber from 'bignumber.js'
import useDeepCompareEffect from 'use-deep-compare-effect'
import toast from 'react-hot-toast'
import { Button } from '@nixjs23n6/baseui-button'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Types } from '@athena20/ts-types'
import { BaseEnum, PaymentTypes } from '@lottery/types'
import { Formatter, Randomize, MB } from '@lottery/utils'
import { InputNumberValue, useDeepEqualMemo } from '@lottery/uikit'
import * as gameRedux from 'redux/game'
import { GameAutoPlayTypes, onAutoplayValidation } from 'modules/game/base/FormAuto'
import { PlayMode } from 'modules/game/base/redux/setting'
import { MessageBrokerID, MessageBrokerKey, GameStatePlay, AutoPlayStatus } from 'modules/game/keno/consts/enum'
import { GameBaseTypes, InstantKenoRiskProfile } from 'modules/game/keno/types'
import { BetResultDelayTimer, initAutoPlayInfo } from 'modules/game/keno/consts/consts'
import { getMinAmount, getMaxAmount, getInputAmountNumber, isEnoughBalance } from 'modules/game/keno/utils/amount'
import { BetTypes, useBet } from 'modules/game/keno/context/BetContext'
import { useSound } from 'modules/game/keno/context/SoundContext'
import { InitFormAutoPlayConfig } from 'modules/game/keno/consts/consts'
import * as gameSlice from 'modules/game/keno/redux/game/slice'
import * as gameSelector from 'modules/game/keno/redux/game/selectors'
import * as settingSelector from 'modules/game/keno/redux/setting/selectors'
import * as walletSlice from 'redux/wallet/slice'
import * as walletSelector from 'redux/wallet/selectors'
import { InputAmount } from './InputAmount'
import { RiskProfile } from './RiskProfileSelect'
import { Coeficient } from '../Coeficient'
import { FormBettingStyled } from './styled/index.styled'

const ButtonCss = css`
    width: 3.125rem;
    --base-button-height: 100%;
`

const LABEL_BUTTON_BET = {
    STOP: 'stop',
    START: 'start',
    BET: 'bet'
}

interface FormBettingPropArg {}

export const FormBetting: React.FC<FormBettingPropArg> = () => {
    const dispatch = useDispatch()
    const isBalanceLoading = useSelector(gameSelector.getBalanceLoading())
    const isGameJoined = useSelector(gameRedux.gamingJoinedSelector())
    const decimals = useSelector(gameSelector.decimalsSelector())
    const minLuckyNumber = useSelector(gameSelector.minLuckyNumberSelector())
    const maxLuckyNumber = useSelector(gameSelector.maxLuckyNumberSelector())
    const maxSpot = useSelector(gameSelector.maxSpotSelector())
    const getDirectServerBetConfigs = useSelector(gameSelector.getDirectServerBetConfigsSelector())
    const playMode = useSelector(settingSelector.getPlayModeSelector())
    const gameMode = useSelector(settingSelector.getGameModeSelector())
    const autoPlay = useSelector(settingSelector.getAutoPlaySelector())
    const tokenSelected = useSelector(walletSelector.walletTokenSelectedSelector())
    const tokenSelectedDefault = useSelector(walletSelector.walletTokenSelectedDefaultSelector())

    const [ourAmount, setOurAmount] = React.useState<string>('0')
    const [balance, setBalance] = React.useState<Types.Nullable<string>>(null)
    const [turnID, setTurnID] = React.useState<Types.Nullable<string>>(null)
    const [walletSelectedTokenChange, setWalletSelectedTokenChange] = React.useState<boolean>(false)
    const [autoRunning, setAutoRunning] = React.useState<boolean>(false)
    const [turnIDExpired, setTurnIDExpired] = React.useState<boolean>(false)

    const betAmountConfig = useSelector(gameSelector.getBetAmountConfigSelector())
    const { sound } = useSound()
    const { betState, dispatchBet } = useBet()

    // auto play
    const [autoPlayInfo, setAutoPlayInfo] = React.useState<GameAutoPlayTypes.AutoPlayInfo>(initAutoPlayInfo)
    const FormAutoPlayConfig = useDeepEqualMemo(betState.FormAutoPlayConfig)
    const [stopAuto, setStopAuto] = React.useState<boolean>(true)
    const [originalNumberOfBet, setOriginalNumberOfBet] = React.useState<number>(0)

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

    const handleCreateNewTurn = React.useCallback(() => {
        dispatch(gameSlice.onCreateNewTurn())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getNextTurnData = React.useCallback(() => {
        const { maxBetAmount, stopOnProfit, stopOnLoss, onWinType, onWinValue, onLossType, onLossValue } =
            FormAutoPlayConfig || InitFormAutoPlayConfig
        const { numberOfBets, originalAmount, originalBalance, gameStatus } = autoPlayInfo
        const nextTurn: GameAutoPlayTypes.AutoPlayInfoValidationArg = {
            numberOfBets,
            originalAmount,
            currentAmount: ourAmount,
            originalBalance,
            currentBalance: balance || '0',
            gameStatus,
            formAutoPlayConfig: {
                numberOfBet: originalNumberOfBet,
                maxBetAmount: maxBetAmount,
                stopOnProfit: stopOnProfit,
                stopOnLoss: stopOnLoss,
                onWin: { type: onWinType, value: onWinValue },
                onLoss: { type: onLossType, value: onLossValue },
                minBet: betAmountConfig && betAmountConfig?.length > 0 ? betAmountConfig[0] : null,
                maxBet: betAmountConfig && betAmountConfig?.length > 0 ? betAmountConfig[1] : null
            }
        }
        return nextTurn
    }, [FormAutoPlayConfig, autoPlayInfo, balance, betAmountConfig, originalNumberOfBet, ourAmount])

    const onPlaceBet = React.useCallback(
        (_amount: string, _turnID: string, _numbersList: number[], _risk: InstantKenoRiskProfile, _symbol: string, _playMode: PlayMode) => {
            if (!_amount || turnIDExpired) {
                toast.error('Invalid amount or turnID expired.')
                return
            }
            setTurnIDExpired(true)
            dispatchBet({
                type: BetTypes.Type.SET_PLAY,
                payload: true
            })
            dispatchBet({
                type: BetTypes.Type.SET_PLACE_BET_RESULT,
                payload: null
            })
            if (_turnID) {
                const params: GameBaseTypes.PlaceBetRequest = {
                    turnId: _turnID,
                    numbersList: _numbersList,
                    riskProfile: _risk,
                    betAmount: _amount,
                    currencySymbol: _symbol
                }

                if (_playMode === PlayMode.NORMAL) {
                    const delayParams: MB.DelaySetting[] = [
                        {
                            publishType: MB.DELAY_PUBLISH_TYPE.ALL,
                            msgType: MessageBrokerKey.INSTANT_KENO_BET_RESULT_NOTIFICATION,
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
                } else {
                    setTimeout(() => {
                        executeBet(params)
                    }, BetResultDelayTimer.FAST_MODE)
                }
                sound && sound.onSourcePlay()
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sound, turnIDExpired]
    )

    React.useEffect(() => {
        handleCreateNewTurn()
    }, [handleCreateNewTurn])

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
            setAutoPlayInfo(initAutoPlayInfo)
        }
    }, [tokenSelected])

    React.useEffect(() => {
        const keys = [
            MessageBrokerKey.FETCH_AVAILABLE_BALANCE,
            MessageBrokerKey.INSTANT_KENO_CREATE_NEW_TURN,
            MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION
        ]
        const subs = MB.messageBroker.subscribes(
            String(MessageBrokerID.INSTANT_KENO_BOARD_CENTER),
            keys,
            ({ msgType, msgData }: MB.SubscribeData<string | GameBaseTypes.Turn | PaymentTypes.BalanceNotificationChange>) => {
                if (msgType && msgData) {
                    if (MB.messageBroker.isEqual(msgType, MessageBrokerKey.FETCH_AVAILABLE_BALANCE)) {
                        console.group('INSTANT_KENO_FETCH_AVAILABLE_BALANCE')
                        console.log('[Message broker] Subscribe init available balance: ', msgData)
                        console.groupEnd()
                        setBalance(msgData as string)
                    }
                    if (MB.messageBroker.isEqual(msgType, MessageBrokerKey.INSTANT_KENO_CREATE_NEW_TURN)) {
                        console.group('INSTANT_KENO_CREATE_NEW_TURN')
                        console.log('[Message broker] Subscribe new turn ID: ', msgData)
                        console.groupEnd()
                        setTurnID((msgData as GameBaseTypes.Turn).turnId)
                        setTurnIDExpired(false)
                        setStopAuto(true)
                    }
                    if (msgType === MB.COMMON_KEY.BALANCE_CHANGE_NOTIFICATION) {
                        console.group('INSTANT_KENO_BALANCE_CHANGE_NOTIFICATION')
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
    }, [tokenSelected])

    React.useEffect(() => {
        const keys = [
            MB.COMMON_KEY.RESET_PLAY_GAME,
            MessageBrokerKey.INSTANT_KENO_PLACE_BET_ERROR,
            MessageBrokerKey.INSTANT_KENO_PAUSE_AUTO_BET
        ]
        const subIds = MB.messageBroker.subscribes(
            String(MessageBrokerID.INSTANT_KENO_GAME_BOARD),
            keys,
            ({ msgType, msgData }: MB.SubscribeData<any>) => {
                if (msgType === MB.COMMON_KEY.RESET_PLAY_GAME || msgType === MessageBrokerKey.INSTANT_KENO_PLACE_BET_ERROR) {
                    dispatchBet({
                        type: BetTypes.Type.SET_PLACE_BET_RESULT,
                        payload: null
                    })
                    dispatchBet({
                        type: BetTypes.Type.SET_AUTOPLAY_CONFIG,
                        payload: InitFormAutoPlayConfig
                    })
                    setAutoRunning(false)
                    setTurnIDExpired(false)
                    //  onSetRunningBetStorage(false)
                    dispatchBet({
                        type: BetTypes.Type.SET_PLAY,
                        payload: false
                    })
                    toast.error(`Error, ${JSON.stringify(msgData)}`)
                    if (msgType === MessageBrokerKey.INSTANT_KENO_PLACE_BET_ERROR) {
                        handleCreateNewTurn()
                    }
                }
                if (msgType === MessageBrokerKey.INSTANT_KENO_PAUSE_AUTO_BET) {
                    setAutoRunning(false)
                    dispatchBet({
                        type: BetTypes.Type.SET_PLAY,
                        payload: false
                    })
                    setTurnIDExpired(false)
                    //  onSetRunningBetStorage(false)
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
            String(MessageBrokerID.INSTANT_KENO_GAME_BOARD),
            MessageBrokerKey.INSTANT_KENO_PLACE_BET_RESULT,
            ({ msgData }: MB.SubscribeData<GameBaseTypes.PlaceBetReply>) => {
                // waiting random number animation
                dispatchBet({
                    type: BetTypes.Type.SET_PLACE_BET_RESULT,
                    payload: msgData || null
                })
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useDeepCompareEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.INSTANT_KENO_GAME_BOARD),
            MessageBrokerKey.INSTANT_KENO_PLACE_BET_FROM_DELAY_RESULT,
            ({ msgData }: MB.SubscribeData<GameBaseTypes.PlaceBetReply>) => {
                // finish random number animation
                if (msgData) {
                    console.log('INSTANT_KENO_PLACE_BET_FROM_DELAY_RESULT', msgData)
                    setAutoPlayInfo((current) => ({
                        ...current,
                        numberOfBets: current.numberOfBets + 1,
                        gameStatus: msgData.isWin ? GameStatePlay.WIN : GameStatePlay.LOSS
                    }))

                    const { numberOfBet } = betState.FormAutoPlayConfig
                    const n = Number(numberOfBet)
                    const newBet = n > 0 ? n - 1 : 0
                    dispatchBet({
                        type: BetTypes.Type.SET_AUTOPLAY_CONFIG,
                        payload: {
                            ...betState.FormAutoPlayConfig,
                            numberOfBet: autoPlay ? newBet : numberOfBet
                        }
                    })
                }
                dispatchBet({
                    type: BetTypes.Type.SET_PLAY,
                    payload: false
                })
                setStopAuto(true)
                if (gameMode === BaseEnum.PlayingMode.PM_DIRECT_SERVER) {
                    handleCreateNewTurn()
                } else {
                    setTurnIDExpired(false)
                }
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
    }, [autoPlay, gameMode, handleCreateNewTurn, betState.FormAutoPlayConfig])

    // React.useEffect(() => {
    //     if (!isBalanceLoading && betAmountConfig) {
    //         const amount = !ourAmount || Number.isNaN(Number(ourAmount)) ? 0 : ourAmount
    //         const multiplier = new BigNumber(betState?.multiplier || 0)
    //         const payout = new BigNumber(amount).multipliedBy(multiplier)
    //         const maxPayout = new BigNumber(betAmountConfig[3])

    //         if (payout.isGreaterThan(maxPayout)) {
    //             const maxBet = maxPayout.div(multiplier)
    //             const a = Formatter.onToFixedSizeNumber(maxBet.toFixed(decimals), 9).num
    //             setOurAmount(a)
    //         }
    //     }
    // }, [ourAmount, betState?.multiplier, betAmountConfig, autoRunning, isBalanceLoading, decimals])

    React.useEffect(() => {
        if (autoRunning && !turnIDExpired && turnID && tokenSelected && balance) {
            const nextTurnData = getNextTurnData()
            console.log('[Game board] Next turn data: ', nextTurnData)
            const validation = onAutoplayValidation(nextTurnData)
            if (validation.status === 'SUCCESS' && validation.data) {
                const {
                    data: { status, amount }
                } = validation
                const amountBet = amount || new BigNumber(0)
                // const multiplier = new BigNumber(betState?.multiplier || 0)
                // const payout = amountBet.times(multiplier)
                // if (betAmountConfig) {
                //     const maxPayout = new BigNumber(betAmountConfig[3])
                //     if (payout.isGreaterThan(maxPayout)) {
                //         amountBet = maxPayout.dividedBy(multiplier)
                //     }
                // }

                if (status === AutoPlayStatus.NEW_TURN) {
                    onPlaceBet(amountBet.toFixed(decimals), turnID, betState.numbers, betState.risk, tokenSelected, playMode)
                    return amount && setOurAmount(amount.toFixed(decimals))
                }
                if (status === AutoPlayStatus.BALANCE_NOT_ENOUGH) {
                    setOurAmount(onInitAmount(betAmountConfig, balance, ourAmount))
                } else {
                    setOurAmount(Formatter.onToFixedSizeNumber(nextTurnData.currentAmount, 9).num)
                }
                return setAutoRunning(false)
            } else {
                console.warn(validation.error)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        autoRunning,
        balance,
        betAmountConfig,
        ourAmount,
        playMode,
        betState.numbers,
        betState.risk,
        tokenSelected,
        turnID,
        turnIDExpired,
        getNextTurnData,
        onPlaceBet,
        decimals
    ])

    React.useEffect(() => {
        const stopAutoPlay = autoPlay && !autoRunning
        const stopNormal = !autoPlay && !betState.isPlaying

        if (stopAutoPlay || stopNormal) {
            //   onSetRunningBetStorage(false)
        }
        let disabledAutoPlay = false
        if (autoPlay) {
            if (!stopAuto) {
                disabledAutoPlay = true
            } else {
                disabledAutoPlay = autoRunning
            }
        }
        dispatchBet({
            type: BetTypes.Type.SET_DISABLED,
            payload: autoPlay ? disabledAutoPlay : betState.isPlaying
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, autoRunning, betState.isPlaying, autoPlay, stopAuto])

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

    const onBet = React.useCallback(() => {
        if (!isGameJoined) {
            toast.error('Unable to join game failed to connect. The system is not available yet.')
            return
        }
        if (!turnID) {
            toast.error('Cannot create new turn.')
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
        if (betState.numbers.length === 0) {
            toast.error('Pick from 1 to 10 slots to see the odds!')
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

        if (autoPlay) {
            if (autoRunning) {
                setStopAuto(false)
                setOurAmount(Formatter.onToFixedSizeNumber(ourAmount, 9)?.num)
            }
            setAutoRunning((prev) => !prev)
            setAutoPlayInfo((current) => ({
                ...current,
                numberOfBets: 0, // infinity
                originalAmount: ourAmount,
                originalBalance: balance,
                gameStatus: GameStatePlay.INIT
            }))
            setOriginalNumberOfBet(FormAutoPlayConfig?.numberOfBet || 0)
            sound?.enabled && sound.onSourcePlay()
            return false
        }
        return onPlaceBet(ourAmount, turnID, betState.numbers, betState.risk, tokenSelected, playMode)
    }, [
        isGameJoined,
        turnID,
        tokenSelected,
        betState,
        betAmountConfig,
        balance,
        ourAmount,
        autoPlay,
        playMode,
        autoRunning,
        FormAutoPlayConfig?.numberOfBet,
        sound,
        onPlaceBet
    ])

    const onLuckyPick = () => {
        if (minLuckyNumber && maxLuckyNumber && maxSpot) {
            const numbers = Randomize.randomUnique(minLuckyNumber, maxLuckyNumber, maxSpot)
            dispatchBet({
                type: BetTypes.Type.SET_NUMBERS,
                payload: numbers
            })
        }
    }

    const onClearLuckyPick = () => {
        dispatchBet({
            type: BetTypes.Type.SET_NUMBERS,
            payload: []
        })
        dispatchBet({
            type: BetTypes.Type.SET_LUCKY_NUMBERS,
            payload: []
        })
    }

    const renderBetButton = React.useMemo(() => {
        const playDisabled = (!autoPlay ? betState.isPlaying : !stopAuto) || isBalanceLoading || betState.numbers.length === 0
        const label = autoRunning ? LABEL_BUTTON_BET.STOP : LABEL_BUTTON_BET.START
        return (
            <Button
                variant="primary"
                size="xxl"
                className="ml-18 rd-8 button-betting"
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
                onClick={onBet}
            >
                <div className="position-absolute text-oswald text-center">
                    <span className="d-flex align-items-center justify-content-center font-style-italic text-uppercase">
                        <span>{autoPlay ? label : LABEL_BUTTON_BET.BET}</span>
                        {betState.isPlaying || autoRunning ? (
                            <Spinner
                                className="d-inline-flex ml-10"
                                variant="secondary"
                                size="sm"
                                overrideStyled={css`
                                    --base-spinner-lite-border-width: 0.225rem;
                                `}
                            />
                        ) : null}
                        {autoPlay && FormAutoPlayConfig && +FormAutoPlayConfig.numberOfBet === 0 ? (
                            <span className="d-inline-flex ml-10">
                                <i className="ic_infinity" />
                            </span>
                        ) : null}
                    </span>
                </div>
            </Button>
        )
    }, [betState, autoPlay, stopAuto, isBalanceLoading, autoRunning, onBet, FormAutoPlayConfig])

    return (
        <FormBettingStyled>
            <Coeficient />
            <br />
            <div className="d-flex align-items-stretch justify-content-between">
                <div className="d-flex align-items-stretch form-betting">
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
            <br />
            <div className="d-flex align-items-center">
                <div style={{ flex: '50%' }} className="pr-16">
                    <RiskProfile />
                </div>
                <div className="d-flex align-items-center">
                    <Button type="button" variant="primary" className="text-white mr-16" onClick={onLuckyPick}>
                        Auto Pick
                    </Button>
                    <Button type="button" variant="secondary" className="text-white" onClick={onClearLuckyPick}>
                        Clear
                    </Button>
                </div>
            </div>
        </FormBettingStyled>
    )
}
