import { css } from 'styled-components'

export const InputCss = css`
    --base-input-background-color: var(--base-white);
    --base-input-border-width: 2px;
    --base-input-border-color: var(--base-black-normal);
    --base-input-content-input-color: var(--base-black-darkest);
    --base-input-content-input-size-multiplier: 1;
    --base-input-content-input-height: auto;

    transition: all 0.3s ease;
    &:hover {
        --base-input-border-color: var(--base-black-darkest);
        --base-input-content-input-color: var(--base-brand-third);
    }
    .input {
        height: 3rem;
        &--focused {
            --base-input-border-color: var(--base-functional-useful);
            --base-input-content-input-color: var(--base-brand-third);
        }
    }
`
