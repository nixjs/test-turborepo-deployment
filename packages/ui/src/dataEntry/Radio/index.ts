import styled, { css } from 'styled-components'
import { StyledProps } from '@nixjs23n6/baseui-core'

interface StyledRadioProp {
    type: string
    [name: string]: any
}

export const Radio = styled.input.attrs(() => ({
    type: 'radio'
}))<StyledRadioProp & StyledProps>`
    --checkbox-box-shadow: #35383d;
    appearance: none;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    display: inline-block;
    height: 20px;
    width: 20px;
    vertical-align: middle;
    transition: background-color 0.2s ease-in-out;
    border-radius: 100%;
    border: 0.125rem solid var(--checkbox-box-shadow);
    &:after {
        --checkbox-tick-size: 10px;
        --checkbox-ticker: #35383d;
        content: '';
        position: absolute;
        width: var(--checkbox-tick-size);
        height: var(--checkbox-tick-size);
        display: inline-block;
        border-radius: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        visibility: hidden;
        margin: 0;
        background-color: var(--checkbox-ticker);
        transition: all var(--base-transition-slow) ease;
    }
    &:focus {
        outline: none;
    }
    &:checked {
        &:after {
            opacity: 1;
            visibility: visible;
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
