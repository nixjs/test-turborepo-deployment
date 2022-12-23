import { css } from 'styled-components'

export const TabCss = css`
    --base-tab-list-background: var(--base-transparent);
    --base-tab-item-color: var(--base-black);
    --base-tab-item-width: 9rem;
    --base-tab-item-background: var(--base-black-lighter);
    --base-tab-panels-margin: 0;
    --base-tab-panel-padding: 1rem;
    --base-tab-list-padding: 0;
    --base-tab-list-radius: 0;
    --base-tab-panel-radius: 0;
    --base-tab-item-margin: 0;
    .tabs {
        &-tab {
            display: inline-flex;
            vertical-align: middle;
            list-style: none;
            text-align: center;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            justify-content: center;
            border-radius: 0.75rem 0.75rem 0 0;
            padding: 0.625rem 0.5rem;
            transition: border-color 0.1s;
            &::before {
                z-index: -1;
                position: absolute;
                content: '';
                width: 100%;
                height: 120%;
                top: 0;
                left: 0;
                transform: translateY(100%);
                transition-duration: 0.25s;
                border-radius: 0.75rem 0.75rem 0 0;
                border: 0.0625rem solid transparent;
                background-color: var(--base-black-lighter);
            }
            &.active {
                box-shadow: none;
                &::before {
                    transition-duration: 0.5s;
                    transform: translateY(0);
                    background: var(--base-black-lighter);
                }
            }
        }
        &-list {
            justify-content: start;
        }
        &-panel {
            padding-top: 1.5rem;
            border-top-right-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            &.second {
                border-top-left-radius: 0.5rem;
            }
        }
    }
`
