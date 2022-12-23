import { css, keyframes } from "styled-components"

const BalanceAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px) scale(1);
    }
    75% {
        opacity: 1;
        transform: translateY(0) scale(1.1);
    }
    to {
        opacity: 0;
        transform: translateY(-20px) scale(1);
    }
`

export const BalanceCss = css`
    .balance-animation {
        right: 0;
        margin: auto;
        bottom: -1.5rem;
        left: 25%;
        &-text {
            opacity: 0;
            transform-origin: center;
            left: 0.5rem;
            bottom: 0;
            .currency {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
            }
            &.show {
                animation: ${BalanceAnimation} 0.7s cubic-bezier(0.43, 0.4, 0.26, 0.4) normal;
            }
        }
    }
`
