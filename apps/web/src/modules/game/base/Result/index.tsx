/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useImmer } from 'use-immer'
import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime'
import { useWebsocket } from '@athena20/ts-grpc-socket-react'
import { BaseEnum } from '@lottery/types'
import { BaseConst, Formatter } from '@lottery/utils'
import { Balance, Symbol } from '@lottery/uikit'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { IconSmartContractOn } from 'components/icons/SmartContractOnIcon'
import * as historySlice from 'modules/game/base/redux/history/slice'
import * as historySaga from 'modules/game/base/redux/history/saga'
import * as historySelector from 'modules/game/base/redux/history/selectors'
import { HistoryTypes } from '../types/history'
import { ResultStyled } from './styled/index.styled'

export enum ResultTabConfig {
    ALL_BET,
    MY_BET,
    HIGH_ROLLER,
    RARE_WIN
}

export const FORMAT_DATE_TYPE = {
    YYYY_MM_DD: 'yyyy/mm/dd',
    HH_MM_SS: 'HH:mm:ss',
    DD_MM_YYYY: 'dd/MM/yyyy'
}

const BalanceText = {
    green: 'var(--base-color-success)',
    white: 'var(--base-white-3)',
    gray: 'var(--base-white-5)'
}

const BaseRequest: Partial<HistoryTypes.BetResultRequest> = {
    size: BaseConst.BaseResultSize,
    sortersList: [
        {
            field: 'updated_at',
            order: 'desc'
        }
    ]
}

interface ResultPropArg {
    gameSymbol: BaseEnum.GameSymbol
}

export const Result: React.FC<ResultPropArg> = React.memo(({ gameSymbol }) => {
    injectReducerSaga(historySlice.KEY_REDUCER_SAGA, historySlice.historyReducer, historySaga.root)

    const dispatch = useDispatch()
    const { ws } = useWebsocket()
    const firstTimeRef = React.useRef<boolean>(false)
    const subRef = React.useRef<string | null>(null)

    const [dataTable, setDataTable] = useImmer<HistoryTypes.BetResultReply[]>([])
    const [isLoading, setLoading] = React.useState(false)
    const [tab, setTab] = React.useState<ResultTabConfig>(ResultTabConfig.ALL_BET)

    const betResults = useSelector(historySelector.getBetResultsSelector())

    const handleAppendData = (data: HistoryTypes.BetResultReply) => {
        setDataTable((draft) => {
            draft.unshift(data)
            if (draft.length > BaseConst.BaseResultSize) {
                draft.pop()
            }
            return draft
        })
    }

    React.useEffect(() => {
        dispatch(historySlice.onFetchBetResults({ ...BaseRequest, gameSymbol }))
        return () => {
            setDataTable([])
            dispatch(historySlice.onGetBetResults([]))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (betResults && betResults?.length > 0) {
            setDataTable(betResults)
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betResults])

    React.useEffect(() => {
        setTimeout(() => {
            if (!firstTimeRef.current && ws?.connected) {
                subRef.current = ws.subscribe(ws.protoMsgType.BET_RESULT, (data: HistoryTypes.BetResultReply) => {
                    if (data && data.gameSymbol === gameSymbol) {
                        handleAppendData(data)
                    }
                })
                firstTimeRef.current = true
            }
        }, BaseConst.WSInitDelay)
        return () => {
            ws && subRef.current && ws.unsubscribe(subRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ws])

    const isAllBet = React.useMemo(() => tab === ResultTabConfig.ALL_BET, [tab])

    const handleFormatTime = (date: number) => {
        if (!date) return {}
        const t = fromUnixTime(date)
        return {
            date: format(t, FORMAT_DATE_TYPE.DD_MM_YYYY),
            time: format(t, FORMAT_DATE_TYPE.HH_MM_SS)
        }
    }

    const renderTable = React.useMemo(() => {
        if (isLoading) {
            return <></>
        }
        if (dataTable.length === 0) {
            return (
                <div className="d-flex align-items-center justify-content-center absolute w-100 h-100">
                    Oops! You have no transaction yet.
                </div>
            )
        }
        return dataTable.map((row) => {
            if (!row) return null
            const { createdAt, currencySymbol, isWin, playingMode, betAmount, payout, multiplier, displayName } = row
            const amount = Formatter.onToFixedSizeNumber(betAmount, 9).num
            const pay = Formatter.onToFixedSizeNumber(payout, 9).num
            const multi = Formatter.onZeroPadding(Number(multiplier))
            const dateTime = handleFormatTime(createdAt)

            return (
                <div key={Formatter.onRandomAlphabets()} className="table-row">
                    <div className="table-row-inner" role={'presentation'}>
                        <div className="table-column time">
                            <span className="d-inline-flex mr-6">{dateTime.time}</span>
                            <span className="d-inline-flex">{dateTime.date}</span>
                        </div>
                        {isAllBet && (
                            <div className="table-column player">
                                <span className="text-ellipsis-nowrap" title={displayName}>
                                    {displayName}
                                </span>
                            </div>
                        )}
                        <div className="table-column">
                            <div className="d-inline-flex align-items-center">
                                <span className="mr-4 d-inline-flex">
                                    <Symbol source={`/tokens/ic24px_${currencySymbol.toLowerCase() || 'none'}.svg`} />
                                </span>
                                <div className="table-amount d-flex align-items-center text-oswald baseWhite w500">
                                    <Balance
                                        className="text-oswald text-16 w500"
                                        value={amount}
                                        colorActive={(isWin && BalanceText.green) || BalanceText.white}
                                        colorDisabled={(isWin && BalanceText.gray) || BalanceText.gray}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-column multiplier">{(multi && `x${multi}`) || ''}</div>
                        <div className="table-column">
                            <div className="d-inline-flex align-items-center">
                                <span className="mr-4 d-inline-flex">
                                    <Symbol source={`/tokens/ic24px_${currencySymbol.toLowerCase() || 'none'}.svg`} />
                                </span>
                                <div
                                    className={classNames('table-amount d-flex align-items-center text-oswald baseWhite w500', {
                                        funcPositive: isWin
                                    })}
                                >
                                    <Balance
                                        className="text-oswald text-16 w500"
                                        value={pay}
                                        colorActive={(isWin && BalanceText.green) || BalanceText.white}
                                        colorDisabled={(isWin && BalanceText.gray) || BalanceText.gray}
                                    />
                                </div>
                                {playingMode === BaseEnum.PlayingMode.PM_SMART_CONTRACT && (
                                    <div className="d-flex align-items-center ml-4" role={'presentation'}>
                                        <IconSmartContractOn width={16} height={16} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }, [dataTable, isAllBet, isLoading])

    const handleFetchBets = (_tab: ResultTabConfig) => {
        setDataTable([])
        dispatch(historySlice.onGetBetResults(null))
        let params: Partial<HistoryTypes.BetResultRequest> = {}
        switch (_tab) {
            case ResultTabConfig.HIGH_ROLLER: {
                params = { isHighRoller: BaseEnum.BoolFilter.BF_TRUE }
                break
            }
            case ResultTabConfig.RARE_WIN: {
                params = { isRareWin: BaseEnum.BoolFilter.BF_TRUE }
                break
            }
            case ResultTabConfig.ALL_BET:
            default: {
                break
            }
        }
        dispatch(historySlice.onFetchBetResults({ ...BaseRequest, ...params, gameSymbol }))
    }

    const onSelectTab = React.useCallback((_tab: ResultTabConfig) => {
        setLoading(true)
        setTab(_tab)
        handleFetchBets(_tab)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ResultStyled>
            <div className="game-result mt-48">
                <div className="d-flex w-100 tab-lists" role="tablist">
                    <button
                        role={'tab'}
                        className={classNames(
                            'tab-item d-flex align-items-center text-nowrap',
                            tab === ResultTabConfig.ALL_BET && 'active disabled'
                        )}
                        type="button"
                        onClick={() => onSelectTab(ResultTabConfig.ALL_BET)}
                        disabled={tab === ResultTabConfig.ALL_BET}
                    >
                        <span className="tab-link" data-text="All bets">
                            All bets
                        </span>
                    </button>
                    <button
                        role={'tab'}
                        className={classNames(
                            'tab-item d-flex align-items-center text-nowrap',
                            tab === ResultTabConfig.MY_BET && 'active disabled'
                        )}
                        type="button"
                        onClick={() => onSelectTab(ResultTabConfig.MY_BET)}
                        disabled={tab === ResultTabConfig.MY_BET}
                    >
                        <span className="tab-link" data-text="My bets">
                            My bets
                        </span>
                    </button>
                    <button
                        role={'tab'}
                        className={classNames(
                            'tab-item d-flex align-items-center text-nowrap',
                            tab === ResultTabConfig.HIGH_ROLLER && 'active disabled'
                        )}
                        type="button"
                        onClick={() => onSelectTab(ResultTabConfig.HIGH_ROLLER)}
                        disabled={tab === ResultTabConfig.HIGH_ROLLER}
                    >
                        <span className="tab-link" data-text="High rollers">
                            High rollers
                        </span>
                    </button>
                    <button
                        role={'tab'}
                        className={classNames(
                            'tab-item d-flex align-items-center text-nowrap',
                            tab === ResultTabConfig.RARE_WIN && 'active disabled'
                        )}
                        type="button"
                        onClick={() => onSelectTab(ResultTabConfig.RARE_WIN)}
                        disabled={tab === ResultTabConfig.RARE_WIN}
                    >
                        <span className="tab-link" data-text="Rare wins">
                            Rare wins
                        </span>
                    </button>
                </div>
                <div className="tab-contents">
                    <div className="table mt-40">
                        <div className="table-content">
                            <div className="table-head">
                                <div className="table-column w500 text-color-2">Time</div>
                                {isAllBet && <div className="table-column w500 text-color-2">Player</div>}
                                <div className="table-column w500 text-color-2">Bet Amounts</div>
                                <div className="table-column w500 text-color-2 multiplier">Multiplier</div>
                                <div className="table-column w500 text-color-2">Payout</div>
                            </div>
                            <div className="table-inner relative">{renderTable}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ResultStyled>
    )
})
