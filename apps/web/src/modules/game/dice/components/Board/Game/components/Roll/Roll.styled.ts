import styled, { css } from 'styled-components'

interface StyledProp {}

export const RollStyled = styled.div<StyledProp>``

const ButtonCss = css`
    background: var(--base-ink-dark);
    border-color: var(--base-ink-dark);
    --base-button-min-width: 12.5rem;
    &:hover {
        box-shadow: 7px 5px 56px -14px var(--base-color-primary-2);
        color: white;
    }
    &:disabled {
        &:disabled {
            box-shadow: none;
        }
    }
    &.active {
        background: var(--base-color-primary-1);
        border-color: var(--base-color-primary-1);
        color: white;
    }
`

export const ButtonUnderCss = css`
    ${ButtonCss}
    transform: skewX(-12deg);
    margin-left: -1.125rem;
    .button-text {
        transform: skewX(12deg);
    }
`

export const ButtonOverCss = css`
    ${ButtonCss}
    transform: skewX(12deg);
    margin-right: -1.125rem;
    .button-text {
        transform: skewX(-12deg);
    }
`
