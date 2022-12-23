import React from 'react'
import { useSelector } from 'react-redux'
import { FormAuto, GameAutoPlayTypes } from 'modules/game/base/FormAuto'
import { useBet, BetTypes } from 'modules/game/keno/context/BetContext'
import * as settingSelector from 'modules/game/keno/redux/setting/selectors'
import * as walletSelector from 'redux/wallet/selectors'
import { SwitchMode } from './SwitchMode'
import { Fairness } from './Fairness'

interface ModePropArg {
    className?: string
}

export const Mode: React.FC<ModePropArg> = ({ className }) => {
    const tokenSelected = useSelector(walletSelector.walletTokenSelectedSelector())
    const autoPlay = useSelector(settingSelector.getAutoPlaySelector())

    const {
        betState: { FormAutoPlayConfig, isPlaying },
        dispatchBet
    } = useBet()

    const onSetPlayConfig = (e: GameAutoPlayTypes.FormAutoPlayConfig) => {
        dispatchBet({
            type: BetTypes.Type.SET_AUTOPLAY_CONFIG,
            payload: e
        })
    }

    return (
        <div className={className}>
            <div className="d-flex align-items-center justify-content-between mb-40">
                <Fairness />
                <SwitchMode />
            </div>
            <div className="mode-view">
                <FormAuto
                    autoPlay={autoPlay}
                    isPlaying={isPlaying}
                    playConfig={FormAutoPlayConfig}
                    tokenSelected={tokenSelected}
                    onSetPlayConfig={onSetPlayConfig}
                />
            </div>
        </div>
    )
}
