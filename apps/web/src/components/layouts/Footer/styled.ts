import styled from 'styled-components'

interface StyledProp {}

export const FooterStyled = styled.footer<StyledProp>`
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    border-top: 1px solid var(--base-black-lighter);
    .nav {
        &-link {
            display: inline-block;
            font-size: 1rem;
        }
        &-item {
            margin-bottom: 0.5rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    @media all and (max-width: 590px) {
        .footer {
            &-social {
                margin-bottom: 2rem;
            }
        }
    }
    @media all and (max-width: 992px) {
        .footer-logo {
            margin-bottom: 3rem;
        }
    }
`
