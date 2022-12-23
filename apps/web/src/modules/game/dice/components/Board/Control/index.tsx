import React from 'react'
import { css } from 'styled-components'
import Image from 'next/image'
import { Button } from '@nixjs23n6/baseui-button'
import { Tooltip } from '@nixjs23n6/baseui-tooltip'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { PlayMode } from 'modules/game/base/redux/setting'
import * as settingSlice from 'modules/game/dice/redux/setting/slice'
import * as settingSelector from 'modules/game/dice/redux/setting/selectors'
import { ButtonCss } from './button.styled'

interface ControlPropArg {
    className?: string
}

export const Control: React.FC<ControlPropArg> = ({ className }) => {
    const dispatch = useDispatch()
    const mode = useSelector(settingSelector.getPlayModeSelector())

    const handlePlayMode = () => {
        dispatch(settingSlice.onSetPlayMode(mode === PlayMode.FAST ? PlayMode.NORMAL : PlayMode.FAST))
    }

    return (
        <div className={classNames('d-flex align-items-center justify-content-between', className)}>
            <div className="d-flex align-items-center control-left">
                <Image src="/modules/games/dice/Dice.svg" width={48} height={48} alt="Dice Game" />
                <h2 className="ml-12 w500 text-uppercase text-oswald">Dice</h2>
            </div>
            <div className="d-flex control-right">
                <ul className="d-flex reset-ul">
                    <li>
                        <Tooltip content={mode === PlayMode.FAST ? 'Normal' : 'Fast'}>
                            <Button
                                variant="link"
                                className={classNames('position-relative mr-8', {
                                    activated: mode === PlayMode.FAST
                                })}
                                outline
                                overrideStyled={css`
                                    ${ButtonCss}
                                `}
                                icon={<i className="text-24 ic_flash-lightning" />}
                                onClick={handlePlayMode}
                            />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Sound">
                            <Button
                                variant="link"
                                className="position-relative mr-8"
                                outline
                                overrideStyled={css`
                                    ${ButtonCss}
                                `}
                                icon={<i className="text-24 ic_sound-on" />}
                            />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Fairness">
                            <Button
                                variant="link"
                                className="position-relative mr-8"
                                outline
                                overrideStyled={css`
                                    ${ButtonCss}
                                `}
                                icon={<i className="text-24 ic_shield-tick" />}
                            />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="How to play">
                            <Button
                                variant="link"
                                className="position-relative"
                                outline
                                overrideStyled={css`
                                    ${ButtonCss}
                                `}
                                icon={<i className="text-24 ic_how-to-play" />}
                            />
                        </Tooltip>
                    </li>
                </ul>
            </div>
        </div>
    )
}
