import { css } from 'styled-components'

export const ModalCss = css`
    --base-modal-content-padding-top: 0;
    --base-modal-content-padding-left: 0;
    --base-modal-content-padding-right: 0;
    --base-modal-background-color: var(--base-white);
    --base-modal-background-color-overlay: #000;
    --base-modal-button-close-top: 0.75rem;
    --base-modal-button-close-right: 0rem;
    border: 1px solid var(--base-ink-darker);
    .modal-content {
        background-color: #fdfdfd;
        background-position: bottom;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .modal {
        &-btn-close {
            z-index: 2;
            justify-content: center;
        }
        // &-login {
        //     .modal-content {
        //         background-image: url('/auth/bgAuth.jpg');
        //     }
        // }
        &-login,
        &-register,
        &-forgot {
            .modal-content {
                background-image: url('/auth/bgAuth2.jpg');
            }
        }
    }
    // .auth-form {
    //     max-width: 24rem;
    // }
    .svg-view {
        fill: white;
        width: 1.2rem;
        height: 1.2rem;
        overflow: hidden;
    }
    .auth-button--third-party {
        height: 2.5rem;
        width: 2.5rem;
        transition-duration: var(--base-button-transition-duration);
        transition-property: color, background, border-color;
        &.button--apple {
            background-color: #000;
            border-color: #000;
            &:hover {
                background-color: #000;
                border-color: #000;
            }
        }
        &.button--telegram {
            background-color: #54a9eb;
            border-color: #54a9eb;
            &:hover {
                background-color: #469adc;
                border-color: #469adc;
            }
            iframe {
                background: #0000;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0.01;
                width: 200px !important;
                height: 200px !important;
            }
        }
    }
    .login-expand {
        .expanding-group {
            width: 0;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        &.active {
            .expanding-group {
                opacity: 1;
                visibility: visible;
                width: auto;
            }
            .button--plus {
                display: none !important;
            }
        }
    }
`
