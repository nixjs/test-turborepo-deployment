import { css } from 'styled-components'

export const WalletCss = css`
    .wallet {
        background-color: var(--base-white);
        border: 1px solid var(--base-black-9);
        box-shadow: 0.125rem 0.5rem 0.5rem rgb(0 0 0 / 8%);
        border-radius: 0.5rem;
        min-width: 250px;
        &-dropdown {
            top: 100%;
            left: 50%;
            box-sizing: border-box;
            transform: translate(-50%, 0%);
            visibility: hidden;
            pointer-events: none;
            right: 0;
            display: none;
            padding-top: 0.8125rem;
            &-inner {
                background-color: var(--base-white);
                border: 0.0625rem solid var(--base-black-dark);
                li {
                    margin-bottom: 0.5rem;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    &:hover {
                        > div {
                            background-color: var(--base-black-lighter);
                        }
                    }
                }
            }
        }
        &-token {
            color: var(--base-font-color-2);
        }
        &:hover {
            .wallet {
                &-token {
                    color: var(--base-font-color-2);
                }
            }
        }
        &.active {
            .wallet-dropdown {
                pointer-events: auto;
                opacity: 1;
                visibility: visible;
                cursor: initial;
            }
        }
        &.show {
            .wallet-dropdown {
                display: block;
            }
        }
    }
    .svg {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
