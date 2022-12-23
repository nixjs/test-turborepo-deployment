import styled from 'styled-components'

// const content = `
//     width: auto;
//     button {
//         &.btn__register {
//             display: none;
//         }
//     }
// `

export const SignHeaderStyled = styled.div`
    width: 60%;
    text-align: right;
    .button-cart {
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        transition: background-color 0.3s ease;
        .badge-cart {
            width: 1.375rem;
            height: 1.375rem;
            top: 0;
            left: 50%;
            line-height: 1.5;
            color: var(--base-white);
            background: var(--base-brand-primary);
        }
        &:hover {
            background-color: var(--base-black-lightest);
        }
    }
    > button {
        &.btn__register {
            margin-right: 1rem;
        }
        &.btn__sign {
            border-color: var(--base-black-lighter);
        }
        &.btn-cart {
            padding-top: calc(0.625rem - 0.375rem);
            > svg {
                width: 36px;
                height: 36px;
            }
            &:hover,
            &:active {
                background: transparent !important;
                border-color: transparent !important;
            }
            .badge-cart {
                width: 1.375rem;
                height: 1.375rem;
                border-radius: 50%;
                display: block;
                position: absolute;
                top: 0;
                left: 50%;
                line-height: 1.5;
                text-align: center;
                font-size: 0.875rem;
                color: var(--base-white);
                background: var(--base-brand-primary);
            }
        }
    }
    @media all and (min-width: 576px) {
        .button-cart {
            margin-right: 1.5rem;
        }
    }
    @media all and (min-width: 769px) {
        width: 40%;
    }
`
