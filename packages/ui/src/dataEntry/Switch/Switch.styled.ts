import styled, { css } from 'styled-components'
import { ElementTypes } from '../../types/element'

export const SwitchStyle = styled.label<ElementTypes.StyledProps>`
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    opacity: 1;
    width: var(--switch-box-width, 2.75rem);
    height: var(--switch-box-height, 1.75rem);
    position: relative;
    overflow: hidden;
    padding: 0px;
    border-radius: var(--switch-box-radius, --switch-circle-radius);
    background: var(--switch-box-background);

    font-size: var(--switch-font-size, 0.875rem);
    transition: all var(--base-transition-fast) linear;
    padding-top: var(--switch-spacing-top, 0.125rem);
    padding-right: var(--switch-spacing-right, 0.125rem);
    padding-bottom: var(--switch-spacing-bottom, 0.125rem);
    padding-left: var(--switch-spacing-left, 0.125rem);

    --switch-box-checked-background: var(--base-color-primary-1);
    --switch-box-width: 2.75rem;
    --switch-box-height: 1.75rem;
    --switch-box-background: #55657e;
    --switch-box-radius: 999px;
    --switch-circle-background: white;
    --switch-circle-radius: 50%;
    &.switch {
        &-box {
            > input {
                width: 20rem;
                height: 20rem;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: transparent;
                visibility: hidden;
                opacity: 0;
                pointer-events: none;
            }
            &::before {
                content: '';
                position: absolute;
                display: flex;
                width: calc(var(--switch-box-height) * 0.7);
                height: calc(var(--switch-box-height) * 0.7);
                justify-content: center;
                align-items: center;
                top: 50%;
                transform: translateY(-50%);
                left: calc(var(--switch-box-width) / 15);
                transition: left 0.25s ease 0s, width 0.2s ease 0s;
                background: var(--switch-circle-background);
                border-radius: var(--switch-circle-radius);
            }
            &--checked {
                --switch-box-background: var(--switch-box-checked-background);
                &::before {
                    left: calc(100% - (var(--switch-box-width) / 15) - var(--switch-box-height) * 0.7);
                }
            }
            &--disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
    }
    ${(props: any) => {
        return css`
            ${props?.overrideStyled || ''}
        `
    }}
`
