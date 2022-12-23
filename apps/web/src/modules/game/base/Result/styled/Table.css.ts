import { css } from 'styled-components'

export const TableCss = css`
    .table {
        &-content {
            width: 100%;
            box-shadow: 0.125rem 0.5rem 0.5rem rgba(0, 0, 0, 0.08);
            border-radius: 0.25rem 0.25rem 0.75rem 0.75rem;
            background-color: var(--base-black-8);
        }

        &-head {
            display: flex;
            justify-content: space-between;
            height: 2.75rem;
            border-radius: 0.25rem 0.25rem 0px 0px;
            color: var(--base-white-3);
            background-color: var(--base-ink-darkest);
            border: 0.0625rem solid var(--base-ink-darker);
        }

        &-column {
            height: 2.75rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-right: 0.625rem;
            overflow: hidden;
            position: relative;
            min-width: 10rem;
            max-width: 10.2rem;
            &.multiplier {
                min-width: 6.25rem;
                max-width: 6.25rem;
            }
            &:first-child {
                margin-left: 1rem;
            }

            &:last-child {
                margin-right: 1rem;
            }
        }

        &-inner {
            position: relative;
            overflow: hidden;
            min-height: calc(2.5rem * 10);
        }

        &-row {
            border-width: 0.0625rem;
            border-style: solid;
            border-top: none;
            animation-duration: 0.5s;
            animation-direction: normal;
            animation-delay: 0s;
            animation-play-state: running;
            animation-timing-function: ease-out;
            color: var(--base-white-5);
            border-color: var(--base-ink-darkest);

            &:first-child {
                animation-name: horizont-1-data;
            }

            &:nth-child(2n) {
                animation-name: horizont-2-data;
            }

            &:nth-child(odd) {
                animation-name: horizont-3-data;
            }

            &:last-child {
                border-bottom-left-radius: 0.75rem;
                border-bottom-right-radius: 0.75rem;
            }

            &-inner {
                display: flex;
                justify-content: space-between;
            }
            &:hover {
                cursor: pointer;
                background: var(--base-white-9);
            }

            &:active {
                background: var(--base-black-3);
            }
        }
    }
    .empty {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        &__image {
            position: relative;
            &:after {
                content: '';
                background: #0400c6;
                opacity: 0.1;
                filter: blur(80px);
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
            }
        }
    }
    .table {
        &-amount {
            width: 5rem;
        }
    }
    .text-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    @-webkit-keyframes horizont-1-data {
        0% {
            opacity: 0;
            transform: translate3d(0, -99.99%, 0);
        }
    }
    @keyframes horizont-1-data {
        0% {
            opacity: 0;
            transform: translate3d(0, -99.99%, 0);
        }
    }
    @-webkit-keyframes horizont-2-data {
        0% {
            transform: translate3d(0, -99.99%, 0);
        }
    }
    @keyframes horizont-2-data {
        0% {
            transform: translate3d(0, -99.99%, 0);
        }
    }
    @-webkit-keyframes horizont-3-data {
        0% {
            transform: translate3d(0, -99.99%, 0);
        }
    }

    @keyframes horizont-3-data {
        0% {
            transform: translate3d(0, -99.99%, 0);
        }
    }
`
