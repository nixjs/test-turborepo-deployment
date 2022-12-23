import styled, { css } from 'styled-components'
import { StyledProps } from '@nixjs23n6/baseui-core'

interface StyledInputNumberProp {
    prefixContainerClass: string
}

export const InputNumberStyled = styled.div<StyledInputNumberProp & StyledProps>`
    ${({ prefixContainerClass }) => {
        return css`
            .${prefixContainerClass} {
                width: 100%;
                background: var(--base-input-background-color, var(--base-black));
                border-width: var(--base-input-border-width, 0.0625rem);
                border-color: var(--base-input-border-color, var(--base-color-dark-1));
                border-style: var(--base-input-border-style, solid);
                border-radius: var(--base-input-radius, 0.5rem);
                &-input {
                    padding: 0;
                    color: var(--base-input-content-input-color, var(--base-white));
                    background-color: transparent;
                    border: none;
                    outline: none;
                    width: 100%;
                }
                &--readonly,
                &--disabled {
                    cursor: not-allowed;
                    opacity: var(--base-input-disabled-opacity, 0.5);
                    input {
                        cursor: not-allowed;
                    }
                }
            }
        `
    }}
    ${(props: any) => {
        return css`
            ${props?.overrideStyled || ''}
        `
    }}
`
