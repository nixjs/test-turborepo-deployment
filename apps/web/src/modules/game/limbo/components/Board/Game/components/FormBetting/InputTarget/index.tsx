import React from 'react'

interface InputTargetPropArg {
    disabled?: boolean
    value?: string
    min?: string
    max?: string
    onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void
    onNext: (e: React.MouseEvent<HTMLButtonElement>) => void
    onMin: (e: React.MouseEvent<HTMLButtonElement>) => void
    onMax: (e: React.MouseEvent<HTMLButtonElement>) => void
    onTargetChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onTargetBlur: (e: React.FormEvent<HTMLInputElement>) => void
}

export const InputTarget: React.FC<InputTargetPropArg> = ({
    disabled,
    value,
    onTargetChange,
    onTargetBlur,
    onKeyDown,
    onPrevious,
    onNext,
    min,
    max,
    onMin,
    onMax
}) => {
    return (
        <div>
            <div className="d-flex align-items-center form-target">
                <div className="d-flex flex-column target-left">
                    <button type="button" onClick={onMin} disabled={disabled}>
                        Min
                    </button>
                    <button type="button" onClick={onMax} disabled={disabled}>
                        Max
                    </button>
                </div>
                <input
                    disabled={disabled}
                    name="target"
                    id="target"
                    type={'number'}
                    placeholder="Input target"
                    onChange={onTargetChange}
                    value={value}
                    min={min}
                    max={max}
                    onKeyDown={onKeyDown}
                    onBlur={onTargetBlur}
                />
                <div className="d-flex flex-column target-right">
                    <button type="button" onClick={onPrevious} disabled={disabled}>
                        -
                    </button>
                    <button type="button" onClick={onNext} disabled={disabled}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}
