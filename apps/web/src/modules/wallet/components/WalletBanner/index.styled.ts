import { css } from 'styled-components'

export const WalletBannerStyled = css`
    .wallet-banner-content {
        color: red;
    }
    .balance {
        &-text {
            font-size: 1.75rem;
        }
    }
    @media all and (min-width: 901px) {
        .balance {
            &-text {
                font-size: 1.25rem;
            }
        }
    }
`
