import styled, { css } from 'styled-components'
import { StyledProps } from '@nixjs23n6/baseui-core'

interface StyledProp {
    type: string
    [name: string]: any
}

export const Checkbox = styled.input.attrs(() => ({
    type: 'checkbox'
}))<StyledProp & StyledProps>`
    appearance: none;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    display: inline-block;
    height: 1.25rem;
    width: 1.25rem;
    vertical-align: middle;
    transition: background-color 0.2s ease-in-out;
    border: 0;
    border-radius: 0.25rem;
    box-shadow: inset 0px 0px 0px 0.125rem var(--checkbox-box-shadow, var(--base-ink-darker));
    &:after {
        --checkbox-tick-border-width: 0.125rem;
        --checkbox-tick-width: 0.415rem;
        --checkbox-tick-height: 0.675rem;
        content: '';
        position: absolute;
        width: var(--checkbox-tick-width);
        height: var(--checkbox-tick-height);
        display: inline-block;
        top: 0.125rem;
        left: 0.375rem;
        transform: scale(0) rotate(45deg);
        border-bottom: var(--checkbox-tick-border-width) solid var(--checkbox-ticker, #35383d);
        border-right: var(--checkbox-tick-border-width) solid var(--checkbox-ticker, #35383d);
        transition: var(--base-animation-duration);
    }
    &:focus {
        outline: none;
    }
    &:checked {
        &:after {
            transform: scale(1) rotate(45deg);
        }
    }
    &:disabled {
        cursor: default;
        &:before {
        }
        &:checked {
            opacity: 0.3;
        }
    }

    ${(props: any) => {
        return css`
            ${props?.overrideStyled || ''}
        `
    }}
`
