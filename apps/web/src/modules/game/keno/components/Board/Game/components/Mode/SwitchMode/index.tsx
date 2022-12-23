import React from 'react'
import { useDispatch } from 'react-redux'
import { Switch, SwitchEvent } from '@lottery/uikit'
import { useBet } from 'modules/game/keno/context/BetContext'
import { useSound } from 'modules/game/keno/context/SoundContext'
import * as settingSlice from 'modules/game/keno/redux/setting/slice'

interface SwitchModePropArg {}

export const SwitchMode: React.FC<SwitchModePropArg> = () => {
    const dispatch = useDispatch()
    const { betState } = useBet()
    const { sound } = useSound()

    const onSwitchChange = (e: SwitchEvent) => {
        dispatch(settingSlice.onSetAutoPlay(e.value))
        sound?.enabled && sound.onSoundClick()
    }

    return (
        <label htmlFor="switch-mode" className="d-inline-flex align-items-center cursor-pointer user-select-none switch-mode">
            <span className="w600 text-color-2 mr-12">Autoplay</span>
            <Switch id="switch-mode" onSwitchChange={onSwitchChange} disabled={betState.isPlaying} />
        </label>
    )
}
