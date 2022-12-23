import { css } from "styled-components"

export const ButtonCss = css`
    color: var(--base-font-color-2);
    overflow: inherit;
    background: var(--base-ink-darkest);
    &:hover {
        color: var(--base-font-color-2);
        background: var(--base-ink-darkest);
    }
    &.activated {
        color: var(--base-font-color);
        background: var(--base-ink-darker);
    }
`
