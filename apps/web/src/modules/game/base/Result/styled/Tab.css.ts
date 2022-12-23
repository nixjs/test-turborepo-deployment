import { css } from "styled-components"

export const TabCss = css`
    .tab {
        &-link {
            padding: 0.75rem 0;
            &:before {
                content: attr(data-text);
                display: block;
                font-weight: 900;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }
        }
        &-item {
            background-color: transparent;
            border: none;
            text-transform: uppercase;
            transition: all 0.3s;
            margin-right: 1rem;
            border-radius: 9999px;
            padding: 0 1rem;
            color: var(--base-font-color-2);
            font-weight: 600;
            &:hover {
                background-color: var(--base-ink-darkest);
            }
            &.active {
                font-weight: 900;
                color: var(--base-white);
                background: var(--base-color-primary-1);
            }
            &.disabled {
                user-select: none;
            }
        }
        &-lists {
            overflow-y: auto;
        }
    }
`
