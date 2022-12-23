import React from 'react'
import classNames from 'classnames'
import { ElementTypes } from '../../types/element'
import { useId } from '../../hooks/useId'
import { SwitchStyle } from './Switch.styled'

export interface SwitchEvent {
    value: boolean
    stopPropagation: () => void
    preventDefault: () => void
}

interface SwitchPropArg {
    id?: string
    initialChecked?: boolean
    checked?: boolean
    disabled?: boolean
    onSwitchChange?: (e: SwitchEvent) => void
}

export const Switch: React.FC<SwitchPropArg & ElementTypes.StyledProps> = ({
    id,
    disabled,
    initialChecked = false,
    onSwitchChange,
    overrideStyled
}) => {
    const [switchChecked, setSwitchChecked] = React.useState<boolean>(initialChecked)
    const idComp = `switch-${useId()}`

    const onHandleSwitch = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e || disabled) return
            const {
                target: { checked }
            } = e
            setSwitchChecked(checked)
            const selfEvent: SwitchEvent = {
                value: checked,
                stopPropagation: e.stopPropagation,
                preventDefault: e.preventDefault
            }
            if (typeof onSwitchChange === 'function') onSwitchChange(selfEvent)
        },
        [disabled, onSwitchChange]
    )
    return (
        <SwitchStyle
            overrideStyled={overrideStyled}
            id={idComp}
            role="switch"
            tabIndex={0}
            aria-checked={switchChecked}
            aria-disabled={disabled}
            data-state={switchChecked ? 'checked' : 'unchecked'}
            className={classNames('switch-box', {
                'switch-box--checked': switchChecked,
                'switch-box--unchecked': !switchChecked,
                'switch-box--disabled': disabled
            })}
        >
            <input id={id} tabIndex={-1} type="checkbox" readOnly checked={switchChecked} onChange={onHandleSwitch} />
        </SwitchStyle>
    )
}
