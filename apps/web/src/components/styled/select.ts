import styled, { css } from 'styled-components'
import { StyledProps } from '@nixjs23n6/baseui-core'

export const SelectStyled = styled.div<StyledProps>`
    .lottery-select {
        &__menu {
            margin: 0 !important;
        }
        &__control {
            border-width: 0.125rem;
            border-radius: 0.5rem;
            box-shadow: none;
            border-color: var(--base-black-normal);
            > svg {
                path {
                    stroke: var(--base-black-normal);
                }
            }
            &:hover {
                border-color: var(--base-black-darkest);
                .lottery-select__indicator {
                    > svg {
                        path {
                            stroke: var(--base-black-darkest);
                        }
                    }
                }
            }
            &--menu-is-open {
                border-color: var(--base-primary-normal) !important;
                .lottery-select__indicator {
                    > svg {
                        path {
                            stroke: var(--base-primary-normal) !important;
                        }
                    }
                }
            }
        }
        &__value-container {
            padding: 0.688rem;
            display: flex;
        }
        &__checkbox {
            margin-right: 1.125rem;
            > span {
                transition: 0.25s ease;
                width: 1.25rem;
                height: 1.25rem;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                border: 0.125rem solid var(--base-black-normal);
                &:before {
                    content: '';
                    width: 0.75rem;
                    height: 0.75rem;
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%);
                    display: inline-block;
                    background-color: transparent;
                }
            }
        }
        &__menu-list {
            max-height: 25rem;
        }
        &__single-value {
            display: flex;
            align-items: center;
            font-size: 1rem;
        }
        &__single-icon {
            margin-right: 0.5rem;
            > div {
                vertical-align: middle;
            }
        }
        &__single-title {
            color: var(--base-brand-second);
            font-size: 1rem;
        }
        &__indicator-separator {
            display: none;
        }
        &__indicator {
            margin-right: 0.75rem;
        }
        &__menu {
            box-shadow: 0.125rem 0.125rem 1rem rgba(0, 0, 0, 0.08);
            border-radius: 0.5rem;
            margin-bottom: 0.25rem;
            margin-top: 0.25rem;
            z-index: 9;
            border: 0.0625rem solid var(--base-black-lighter);
        }
        &__option {
            &:hover {
                &:not(.lottery-select__option--is-selected) {
                    background: var(--base-black-lightest);
                    color: var(--base-brand-second);
                    .lottery-select__checkbox {
                        > span {
                            border-color: var(--base-primary-normal);
                        }
                    }
                }
            }
            &--is-selected {
                color: var(--base-white) .lottery-select__checkbox {
                    > span {
                        border-color: var(--base-primary-normal);
                        &:before {
                            background-color: var(--base-primary-normal);
                        }
                    }
                }
            }
        }
    }
    ${(props: any) => {
        return css`
            ${props?.overrideStyled || ''}
        `
    }}
`
