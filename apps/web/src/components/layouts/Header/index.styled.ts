import styled from 'styled-components'
import { BalanceCss } from './balance.styled'
import { WalletCss } from './wallet.styled'

export const HeaderStyled = styled.div`
    &.header {
        height: 4rem;
        top: 0;
        background: var(--base-white);
    }
    .container-fluid {
        padding: 0 0.75rem;
    }
    &.fixed {
        box-shadow: 0.125rem 0.75rem 1rem rgba(0, 0, 0, 0.08);
    }

    @media all and (min-width: 992px) {
        .container-fluid {
            padding: 0 2.25rem;
        }
    }
    ${BalanceCss}
    ${WalletCss}
`
