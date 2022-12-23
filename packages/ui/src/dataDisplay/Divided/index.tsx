import classNames from 'classnames'
import React from 'react'
import styled, { css } from 'styled-components'

interface DividedPropArg {
    type?: 'vertical' | 'horizontal'
    height?: string
    width?: string
    className?: string
    color: string
}

const DividedStyled = styled.div<DividedPropArg>`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    ${(props: any) => {
        if (props.width)
            return css`
                width: ${props.width};
            `
        return ''
    }}
    ${(props: any) => {
        if (props.height)
            return css`
                height: ${props.height};
            `
        return ''
    }}
     ${(props: any) => {
        if (props.color)
            return css`
                border-color: ${props.color};
            `
        return ''
    }}
    &.divider-horizontal {
        display: flex;
        clear: both;
        width: 100%;
        min-width: 100%;
        margin: 0.5rem 0;
        border-top-width: 1px;
        border-top-style: solid;
    }
    &.divider-vertical {
        position: relative;
        top: -0.06em;
        display: inline-block;
        height: 0.9em;
        margin: 0 8px;
        vertical-align: middle;
        border-top: 0;
        border-left-width: 1px;
        border-left-style: solid;
    }
`

export const Divided: React.FC<DividedPropArg> = ({ height, width, type = 'horizontal', color, className }) => {
    return (
        <DividedStyled height={height} width={width} color={color} className={classNames(`divider-${type}`, className)} role="separator" />
    )
}
