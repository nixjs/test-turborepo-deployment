import React from 'react'
import classNames from 'classnames'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { Row, Col } from '@nixjs23n6/baseui-grid'
import { FormGroup, InputNumber, Radio, InputNumberValue, Symbol } from '@lottery/uikit'
import { GameAutoPlayTypes } from 'modules/game/base/FormAuto'
import { useBet, BetTypes } from 'modules/game/limbo/context/BetContext'
import { RareType } from 'modules/game/limbo/consts/enum'
import * as settingSelector from 'modules/game/limbo/redux/setting/selectors'
import * as walletSelector from 'redux/wallet/selectors'

export const FormState = {
    NUMBER_OF_BET: 'numberOfBet',
    MAX_BET_AMOUNT: 'maxBetAmount',
    STOP_ON_PROFIT: 'stopOnProfit',
    STOP_ON_LOSS: 'stopOnLoss',
    ON_WIN_VALUE: 'onWinValue',
    ON_WIN_TYPE: 'onWinType',
    ON_LOSS_VALUE: 'onLossValue',
    ON_LOSS_TYPE: 'onLossType'
}

interface FormAutoPropArg {}

export const FormAuto: React.FC<FormAutoPropArg> = () => {
    const tokenSelected = useSelector(walletSelector.walletTokenSelectedSelector())
    const autoPlay = useSelector(settingSelector.getAutoPlaySelector())

    const {
        betState: { FormAutoPlayConfig, isPlaying },
        dispatchBet
    } = useBet()
    const onWinType = Number(FormAutoPlayConfig[FormState.ON_WIN_TYPE as GameAutoPlayTypes.AutoLayConfigKeys])
    const onLossType = Number(FormAutoPlayConfig[FormState.ON_LOSS_TYPE as GameAutoPlayTypes.AutoLayConfigKeys])

    const onChange = (e: InputNumberValue | React.ChangeEvent<HTMLInputElement>, type: 'Customize' | 'Native') => {
        if (e) {
            const {
                target: { name }
            } = e
            const value = type === 'Native' ? (e as React.ChangeEvent<HTMLInputElement>).target.value : (e as InputNumberValue).formatted
            let payload: GameAutoPlayTypes.FormAutoPlayConfig
            switch (name) {
                case FormState.ON_WIN_VALUE: {
                    payload = {
                        ...FormAutoPlayConfig,
                        [name]: value,
                        [FormState.ON_WIN_TYPE]: +value > 0 ? String(RareType.INCREASE) : String(RareType.RESET)
                    }
                    break
                }
                case FormState.ON_LOSS_VALUE: {
                    payload = {
                        ...FormAutoPlayConfig,
                        [name]: value,
                        [FormState.ON_LOSS_TYPE]: +value > 0 ? String(RareType.INCREASE) : String(RareType.RESET)
                    }
                    break
                }
                default: {
                    payload = { ...FormAutoPlayConfig, [name as GameAutoPlayTypes.AutoLayConfigKeys]: value }
                    break
                }
            }
            dispatchBet({
                type: BetTypes.Type.SET_AUTOPLAY_CONFIG,
                payload
            })
        }
    }

    const infinityIcon = React.useMemo(
        () =>
            (FormAutoPlayConfig && +FormAutoPlayConfig[FormState.NUMBER_OF_BET as GameAutoPlayTypes.AutoLayConfigKeys] === 0 && (
                <i className="text-24 ic_infinity" />
            )) ||
            '',
        [FormAutoPlayConfig]
    )

    return (
        <div
            className={classNames({
                'd-none': !autoPlay
            })}
        >
            <Row>
                <Col className="d-flex flex-md-column" md={4}>
                    <FormGroup label="Number of bets" htmlFor={FormState.NUMBER_OF_BET} className="mb-16" contentClass="p-0">
                        <InputNumber
                            overrideStyled={css`
                                padding: 0;
                            `}
                            classNameWrapper="d-flex w-100"
                            id={FormState.NUMBER_OF_BET}
                            name={FormState.NUMBER_OF_BET}
                            value={String(FormAutoPlayConfig[FormState.NUMBER_OF_BET as GameAutoPlayTypes.AutoLayConfigKeys])}
                            suffixHTML={infinityIcon}
                            min={0}
                            placeholder="Number of bets"
                            className="text-oswald w500 pt-12 pb-12 pl-12 pr-12 form-control"
                            onChangeValue={(e) => onChange(e, 'Customize')}
                            disabled={isPlaying}
                        />
                    </FormGroup>
                    <FormGroup label="Max bet amount" htmlFor={FormState.MAX_BET_AMOUNT} contentClass="p-0">
                        <InputNumber
                            id={FormState.MAX_BET_AMOUNT}
                            name={FormState.MAX_BET_AMOUNT}
                            prefixHTML={<Symbol source={`/tokens/ic24px_${tokenSelected.toLowerCase() || 'none'}.svg`} />}
                            suffixHTML={<span>{tokenSelected}</span>}
                            value={String(FormAutoPlayConfig[FormState.MAX_BET_AMOUNT as GameAutoPlayTypes.AutoLayConfigKeys])}
                            min={0}
                            prefixClass="mr-8"
                            placeholder="Max bet amount"
                            className="text-oswald w500 pt-12 pb-12 pl-12 pr-12 form-control"
                            onChangeValue={(e) => onChange(e, 'Customize')}
                            disabled={isPlaying}
                        />
                    </FormGroup>
                </Col>
                <Col className="d-flex flex-md-column" md={4}>
                    <FormGroup label="Stop on profit" htmlFor={FormState.STOP_ON_PROFIT} className="mb-16" contentClass="p-0">
                        <InputNumber
                            id={FormState.STOP_ON_PROFIT}
                            name={FormState.STOP_ON_PROFIT}
                            value={String(FormAutoPlayConfig[FormState.STOP_ON_PROFIT as GameAutoPlayTypes.AutoLayConfigKeys])}
                            prefixHTML={<Symbol source={`/tokens/ic24px_${tokenSelected.toLowerCase() || 'none'}.svg`} />}
                            suffixHTML={<span>{tokenSelected}</span>}
                            min={0}
                            prefixClass="mr-8"
                            placeholder="Stop on profit"
                            className="text-oswald w500 pt-12 pb-12 pl-12 pr-12 form-control"
                            onChangeValue={(e) => onChange(e, 'Customize')}
                            disabled={isPlaying}
                        />
                    </FormGroup>
                    <FormGroup label="On win" contentClass="p-0">
                        <div className="d-flex align-items-center">
                            <div>
                                <label
                                    htmlFor="win-reset"
                                    className="d-flex flex-md-row align-items-center text-14 w600 cursor-pointer mb-6"
                                >
                                    <Radio
                                        id="win-reset"
                                        name={FormState.ON_WIN_TYPE}
                                        value={RareType.RESET}
                                        checked={onWinType === RareType.RESET}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Native')}
                                        disabled={isPlaying}
                                    />
                                    <span className="ml-6">Reset</span>
                                </label>
                                <label htmlFor="win-increase" className="d-flex flex-md-row align-items-center text-14 w600 cursor-pointer">
                                    <Radio
                                        id="win-increase"
                                        name={FormState.ON_WIN_TYPE}
                                        value={RareType.INCREASE}
                                        checked={onWinType === RareType.INCREASE}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Native')}
                                        disabled={isPlaying}
                                    />
                                    <span className="ml-6">Increase</span>
                                </label>
                            </div>
                            <div className="ml-10 flex-fill">
                                <InputNumber
                                    id={FormState.ON_WIN_VALUE}
                                    name={FormState.ON_WIN_VALUE}
                                    value={String(FormAutoPlayConfig[FormState.ON_WIN_VALUE as GameAutoPlayTypes.AutoLayConfigKeys])}
                                    suffixHTML={<span>%</span>}
                                    min={0}
                                    prefixClass="mr-8"
                                    placeholder="On win"
                                    className="text-oswald w500 pt-12 pb-12 pl-12 pr-12 form-control"
                                    onChangeValue={(e) => onChange(e, 'Customize')}
                                    disabled={isPlaying}
                                />
                            </div>
                        </div>
                    </FormGroup>
                </Col>
                <Col className="d-flex flex-md-column" md={4}>
                    <FormGroup label="Stop on loss" htmlFor={FormState.STOP_ON_LOSS} className="mb-16" contentClass="p-0">
                        <InputNumber
                            id={FormState.STOP_ON_LOSS}
                            name={FormState.STOP_ON_LOSS}
                            value={String(FormAutoPlayConfig[FormState.STOP_ON_LOSS as GameAutoPlayTypes.AutoLayConfigKeys])}
                            prefixHTML={<Symbol source={`/tokens/ic24px_${tokenSelected.toLowerCase() || 'none'}.svg`} />}
                            suffixHTML={<span>{tokenSelected}</span>}
                            min={0}
                            prefixClass="mr-8"
                            placeholder="Stop on loss"
                            className="text-oswald w500 pt-12 pb-12 pl-12 pr-12 form-control"
                            onChangeValue={(e) => onChange(e, 'Customize')}
                            disabled={isPlaying}
                        />
                    </FormGroup>
                    <FormGroup label="On loss" contentClass="p-0">
                        <div className="d-flex align-items-center">
                            <div>
                                <label
                                    htmlFor="loss-reset"
                                    className="d-flex flex-md-row align-items-center text-14 w600 cursor-pointer mb-6"
                                >
                                    <Radio
                                        id="loss-reset"
                                        name={FormState.ON_LOSS_TYPE}
                                        value={RareType.RESET}
                                        checked={onLossType === RareType.RESET}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Native')}
                                        disabled={isPlaying}
                                    />
                                    <span className="ml-6">Reset</span>
                                </label>
                                <label
                                    htmlFor="loss-increase"
                                    className="d-flex flex-md-row align-items-center text-14 w600 cursor-pointer"
                                >
                                    <Radio
                                        id="loss-increase"
                                        name={FormState.ON_LOSS_TYPE}
                                        value={RareType.INCREASE}
                                        checked={onLossType === RareType.INCREASE}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Native')}
                                        disabled={isPlaying}
                                    />
                                    <span className="ml-6">Increase</span>
                                </label>
                            </div>
                            <div className="ml-10 flex-fill">
                                <InputNumber
                                    id={FormState.ON_LOSS_VALUE}
                                    name={FormState.ON_LOSS_VALUE}
                                    value={String(FormAutoPlayConfig[FormState.ON_LOSS_VALUE as GameAutoPlayTypes.AutoLayConfigKeys])}
                                    suffixHTML={<span>%</span>}
                                    min={0}
                                    prefixClass="mr-8"
                                    placeholder="On lose"
                                    className="text-oswald w500 pt-12 pb-12 pl-12 pr-12 form-control"
                                    onChangeValue={(e) => onChange(e, 'Customize')}
                                    disabled={isPlaying}
                                />
                            </div>
                        </div>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}
