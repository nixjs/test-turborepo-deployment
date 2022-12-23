import styled, { css } from 'styled-components'

export const ModalCss = css`
    --base-modal-content-padding-top: 0.5rem;
    --base-modal-content-padding-left: 0;
    --base-modal-content-padding-right: 0;
    --base-modal-background-color: var(--base-black-lighter);
    --base-modal-background-color-overlay: #000;
    --base-modal-button-close-top: 0;
    --base-modal-button-close-right: 0rem;
    --base-modal-max-width: 35rem;
    border: 1px solid var(--base-ink-darker);
    .modal-content {
        border-top: 1rem solid var(--base-brand-primary);
        min-height: 38.9375rem;
    }
    .modal {
        &-btn-close {
            z-index: 2;
            justify-content: center;
        }
    }
    .payment-form {
        max-width: 24rem;
    }
`

export const ButtonCss = styled.button`
    width: 2rem;
    height: 2rem;
    border: none;
    outline: none;
    margin: 0.125rem;
    background: #f5f5f5;
    &.disabled {
        background: #ffc107;
        opacity: 0.4;
        cursor: default;
        color: #000;
    }
    &.active {
        background: #ff5722;
        opacity: 1;
        cursor: pointer;
        color: white;
    }
`
