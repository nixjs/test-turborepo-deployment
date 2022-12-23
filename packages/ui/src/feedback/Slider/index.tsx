import React from 'react'
import { Objectify } from '@athena20/ts-objectify'
import noUiSlider, { API as NoUISliderAPI, Options, Formatter, PartialFormatter } from 'nouislider'
import { SliderStyle } from './Slider.styled'

export interface UpdatableOptions {
    range?: any
    start?: string | number | (string | number)[]
    margin?: number
    limit?: number
    padding?: number | number[]
    snap?: boolean
    step?: number
    format?: Formatter
    tooltips?: boolean | PartialFormatter | (boolean | PartialFormatter)[]
    animate?: boolean
}
interface SliderPropArg {
    className?: string
    targetColor?: string
    connectColor?: string
    disabledColor?: string
    sliderAPIRef?: NoUISliderAPI
    disabled?: boolean
    onUpdate?: (value: (number | string)[]) => void
    onChange?: (value: (number | string)[]) => void
    onSlide?: (value: (number | string)[]) => void
    onStart?: (value: (number | string)[]) => void
    onEnd?: (value: (number | string)[]) => void
    onSet?: (value: (number | string)[]) => void
    updateOptions?: { options: UpdatableOptions; fireSetEvent: boolean }
}

export const Slider: React.FC<SliderPropArg & Options> = (props) => {
    const sliderRef = React.useRef<HTMLDivElement | null>(null)
    const instanceRef = React.useRef<NoUISliderAPI | null>(null)

    const {
        onUpdate,
        onChange,
        onSlide,
        onStart,
        onEnd,
        onSet,
        className,
        targetColor,
        connectColor,
        disabledColor,
        updateOptions,
        disabled
    } = props
    const ourProps = Objectify.omit(props, ['onUpdate', 'onChange', 'onSlide', 'onStart', 'onEnd', 'onSet', 'updateOptions'])

    const updateEvents = (sliderComponent: NoUISliderAPI) => {
        if (onStart) {
            sliderComponent.off('start')
            sliderComponent.on('start', onStart)
        }

        if (onSlide) {
            sliderComponent.off('slide')
            sliderComponent.on('slide', onSlide)
        }

        if (onUpdate) {
            sliderComponent.off('update')
            sliderComponent.on('update', onUpdate)
        }

        if (onChange) {
            sliderComponent.off('change')
            sliderComponent.on('change', onChange)
        }

        if (onSet) {
            sliderComponent.off('set')
            sliderComponent.on('set', onSet)
        }

        if (onEnd) {
            sliderComponent.off('end')
            sliderComponent.on('end', onEnd)
        }
    }

    React.useEffect(() => {
        if (instanceRef.current) {
            updateEvents(instanceRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onUpdate, onChange, onSlide, onStart, onEnd, onSet])

    React.useEffect(() => {
        if (sliderRef.current) {
            instanceRef.current = noUiSlider.create(sliderRef.current as any, ourProps) as NoUISliderAPI
        }
        return () => {
            if (instanceRef.current) {
                instanceRef.current.destroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (sliderRef.current) {
            if (disabled) {
                sliderRef.current.setAttribute('disabled', 'true')
            } else {
                sliderRef.current.removeAttribute('disabled')
            }
        }
    }, [disabled])

    React.useEffect(() => {
        if (instanceRef.current && updateOptions?.options) {
            instanceRef.current.updateOptions(updateOptions?.options as any, updateOptions.fireSetEvent)
        }
    }, [updateOptions])

    return (
        <SliderStyle
            targetColor={targetColor}
            connectColor={connectColor}
            disabledColor={disabledColor || connectColor}
            className={disabled ? 'disabled' : ''}
        >
            <div ref={sliderRef} className={className} />
        </SliderStyle>
    )
}
