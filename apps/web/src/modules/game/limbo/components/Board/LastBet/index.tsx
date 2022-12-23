import classNames from 'classnames'
import React from 'react'
import produce from 'immer'
import { useSelector, useDispatch } from 'react-redux'
import { Formatter } from '@lottery/utils'
import { GameBaseTypes } from 'modules/game/limbo/types'
import { useBet } from 'modules/game/limbo/context/BetContext'
import * as gameSlice from 'modules/game/limbo/redux/game/slice'
import { getLastBetsSelector } from 'modules/game/limbo/redux/game/selectors'
import { LastBetStyled } from './index.styled'

interface LastBetPropArg {
    className?: string
}

const MaxLength = 24

export const LastBet: React.FC<LastBetPropArg> = ({ className }) => {
    const dispatch = useDispatch()
    const { betState } = useBet()
    const lastBets = useSelector(getLastBetsSelector())
    const [list, setList] = React.useState<GameBaseTypes.LastBet[]>([])

    const calculateLastBets = React.useCallback((data: GameBaseTypes.LastBet[]) => {
        setList((prev) => {
            const next = prev.concat(data)
            if (data.length === 1 && next.length > MaxLength) {
                next.shift()
            }
            if (data.length > 1 && next.length > MaxLength) {
                next.splice(0, prev.length)
            }
            return next
        })
    }, [])

    React.useEffect(() => {
        dispatch(gameSlice.onFetchLastBet({ size: 20 }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (lastBets && lastBets.length > 0) {
            const nextState = produce(lastBets, (draftState) => {
                draftState.reverse()
            })
            calculateLastBets(
                nextState.map((item) => {
                    const key = Formatter.onRandomAlphabets()
                    return { key, ...item }
                })
            )
        }
    }, [calculateLastBets, lastBets])

    React.useEffect(() => {
        if (betState.betResult) {
            const {
                betResult: { luckyNumber, isWin }
            } = betState
            calculateLastBets([
                {
                    luckyNumber: Number(luckyNumber),
                    win: isWin,
                    key: Formatter.onRandomAlphabets()
                }
            ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculateLastBets, betState.betResult])

    return (
        <LastBetStyled
            className={classNames('d-flex justify-content-end flex-fill position-relative overflow-hidden user-select-none', className)}
        >
            <div className="d-flex lastbet-inner">
                {list.length > 0 &&
                    list.map((item) => {
                        const { luckyNumber, win, key } = item
                        const c = luckyNumber || 0
                        const n = (String(c).length < 2 && `0${c}`) || c
                        return (
                            <span key={key} className={classNames('rd-8 w700 text-oswald text-center ml-8', win ? 'in' : 'out')}>
                                {n}
                            </span>
                        )
                    })}
            </div>
        </LastBetStyled>
    )
}
