import { css } from 'styled-components'

export const ButtonSocial = css`
    --base-button-height: 2.5rem;
    width: 2.5rem;
    box-shadow: 0.0625rem 0.75rem 1rem rgb(0 0 0 / 8%);
    margin-bottom: 0.5rem;
    border: 0.0625rem solid var(--base-black-lighter);
    font-size: 1rem;
    color: var(--base-brand-third);
    background: var(--base-white);
    &:hover {
        background: var(--base-white);
    }
    &.button {
        &--facebook {
            background-color: #3763d2;
            border-color: #3763d2;
            &:hover {
                background-color: #1f48b0;
                border-color: #1f48b0;
            }
        }
        &--google {
            background-color: #e70d4e;
            border-color: #e70d4e;
            &:hover {
                background-color: #c40840;
                border-color: #c40840;
            }
        }
        &--apple {
            background-color: white;
            border-color: white;
            &:hover {
                background-color: rgba(255, 255, 255, 0.8);
                border-color: rgba(255, 255, 255, 0.8);
            }
            .svg-view {
                fill: #a2aaad;
                margin-left: 0.125rem;
            }
        }
        &--tronlink {
            &:hover {
                border-color: #ff060a;
            }
        }
        &--metamask {
            &:hover {
                border-color: #e17726;
            }
        }
        &--plus {
            background-color: #9e9e9e;
            border-color: #9e9e9e;
            &:hover {
                background-color: #7f7c7c;
                border-color: #7f7c7c;
            }
        }
        &--telegram {
            background-color: #54a9eb;
            border-color: #54a9eb;
            &:hover {
                background-color: #469adc;
                border-color: #469adc;
            }
        }
    }
`
