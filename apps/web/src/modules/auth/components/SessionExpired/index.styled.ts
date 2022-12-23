import styled, { css } from 'styled-components'

interface StyledProp {}

export const SessionExpiredStyled = styled.section<StyledProp>`
    .box {
        &-description {
            color: var(--base-font-color-2);
        }
    }
    .icon-right {
        transform: rotate(-180deg);
    }
`

export const SessionExpiredCss = css`
    --base-modal-background-color: var(--base-white);
    --base-modal-background-color-overlay: #000;
    --base-modal-button-close-top: 0;
    --base-modal-button-close-right: 0rem;
    --base-modal-max-width: 26rem;
    border: 1px solid var(--base-ink-darker);
    .modal-content {
        border-top: 1rem solid var(--base-brand-primary);
    }
    .modal {
        &-btn-close {
            z-index: 2;
            justify-content: center;
        }
    }
`
