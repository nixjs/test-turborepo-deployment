import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import Image from 'next/image'
import classNames from 'classnames'
import { Button } from '@nixjs23n6/baseui-button'
import { CARD_SUIT_LABEL, CARD_VALUE_LABEL } from 'modules/game/hilo/consts/consts'
import { HiLoDirection } from 'modules/game/hilo/consts/enum'
import { useBet, BetTypes } from 'modules/game/hilo/context/BetContext'
import * as gameSlice from 'modules/game/hilo/redux/game/slice'
import * as gameSelector from 'modules/game/hilo/redux/game/selectors'
import { onRandomCard } from 'modules/game/hilo/utils/random'
import { ScreenStyled } from './Screen.styled'

interface ScreenPropArg {}

export const Screen: React.FC<ScreenPropArg> = () => {
    const dispatch = useDispatch()

    const existedTurn = useSelector(gameSelector.existedTurnSelector())

    const { betState, dispatchBet } = useBet()

    const onSkip = React.useCallback(() => {
        if (!existedTurn) {
            const value = onRandomCard()
            dispatchBet({
                type: BetTypes.Type.SET_CARD,
                payload: {
                    suit: Number(value[0][0]),
                    value: Number(value[1][0])
                }
            })
        } else if (betState.skip > 0 && betState.turnId) {
            dispatch(
                gameSlice.onPlaceBet({
                    direction: HiLoDirection.HLD_SKIP,
                    turnId: betState.turnId
                })
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existedTurn, betState.skip, betState.turnId, dispatchBet])

    const renderCard = React.useMemo(() => {
        if (!betState?.card)
            return (
                <div className="position-relative text-center card">
                    <div className="position-relative w-100 h-100 text-center card-inner">
                        <div className="position-absolute w-100 h-100 rd-12 card-front"></div>
                        <div className={classNames('position-relative w-100 h-100 rd-12 card-back')}>
                            <span className="position-absolute">10</span>
                        </div>
                    </div>
                </div>
            )
        return (
            <div className="position-relative text-center card">
                <div className={classNames('position-relative w-100 h-100 text-center card-inner', 'card-inner--animation')}>
                    <div className="position-absolute w-100 h-100 rd-12 card-front"></div>
                    <div
                        className={classNames(
                            'position-relative w-100 h-100 rd-12 card-back',
                            `card-back--${betState.card ? CARD_SUIT_LABEL[betState.card.suit].toLowerCase() : 'none'}`
                        )}
                    >
                        <span className="position-absolute">{CARD_VALUE_LABEL[betState.card.value]}</span>
                    </div>
                </div>
            </div>
        )
    }, [betState?.card])

    const renderCoefficient = React.useMemo(() => {
        if (betState.coefficient.length === 0 || Number(betState.coefficient) === 0)
            return (
                <div className="d-flex align-items-center justify-content-around w-100 h-100 marks">
                    <div className="d-flex align-items-center flex-column mark">
                        <Image className="mb-8" src="/modules/games/hilo/down.svg" width={56} height={73} alt="Down" />
                        <span className="w600 text-center text-12 text-uppercase mark-title">
                            Ace being <br />
                            the lowest
                        </span>
                    </div>
                    <div className="d-flex align-items-center flex-column mark">
                        <Image className="mb-8" src="/modules/games/hilo/up.svg" width={56} height={73} alt="Up" />
                        <span className="w600 text-center text-12 text-uppercase mark-title">
                            KING BEING
                            <br />
                            THE HIGHEST
                        </span>
                    </div>
                </div>
            )

        return (
            <div className="d-flex flex-column align-items-center coefficient">
                <span className="w600 text-16 coefficient-label">Coefficient:</span>
                <span className="w600 text-24 text-success coefficient-sum">{`${BigNumber(betState.coefficient).toFixed(4)}x`}</span>
            </div>
        )
    }, [betState.coefficient])

    return (
        <ScreenStyled>
            <div className="d-flex justify-content-between">
                <div
                    className="d-flex align-items-center justify-content-center rd-12 flex-fill pt-16 pb-16 board-left"
                    style={{ background: '#e9967a' }}
                >
                    <div className="d-flex flex-column">
                        <h3>Jackpot</h3>
                        <p className="text-center">7777</p>
                    </div>
                </div>
                <div className="ml-16 mr-16 board-center">
                    <div className="position-relative rd-12 deck">
                        <Button autoWidth variant="dark" className="position-absolute text-white pl-8 pr-8 button-skip" onClick={onSkip}>
                            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.44 6.55L1.41 6C1.4 3.48 3.48 1.4 6 1.4a4.6 4.6 0 013.08 1.22l-.4.41c-.1.1-.13.23-.1.35.05.12.15.21.27.24.07.02 2.4.76 2.25.73.19.07.47-.13.41-.41 0-.07-.52-2.65-.5-2.5a.35.35 0 00-.24-.27.35.35 0 00-.34.09l-.35.34A6 6 0 000 6v.01c0 .2 0 .36.02.47.01.16.13.29.28.32l.72.14c.24.05.45-.15.42-.39zM11.7 5.2l-.72-.14a.35.35 0 00-.42.38l.03.56c0 2.52-2.07 4.6-4.59 4.6a4.58 4.58 0 01-3.08-1.22l.4-.41c.1-.1.13-.23.1-.35a.37.37 0 00-.27-.24C3.08 8.36.75 7.62.9 7.65a.34.34 0 00-.32.1.35.35 0 00-.1.31l.5 2.48c.03.13.12.23.25.27.15.04.27 0 .35-.1l.33-.33A6.02 6.02 0 006 12c3.3 0 6-2.7 6-6v-.02c0-.16 0-.31-.02-.46a.35.35 0 00-.28-.32z"
                                    fill="#fff"
                                />
                            </svg>
                            <span className="ml-8">
                                <span className="text-uppercase">Skip</span>
                                {`(${betState.skip})`}
                            </span>
                        </Button>
                        <div className="position-relative deck-card">{renderCard}</div>
                    </div>
                </div>
                <div
                    className="d-flex align-items-center justify-content-center rd-12 flex-fill pt-16 pb-16 board-right"
                    style={{ background: '#e9967a' }}
                >
                    {renderCoefficient}
                </div>
            </div>
        </ScreenStyled>
    )
}
