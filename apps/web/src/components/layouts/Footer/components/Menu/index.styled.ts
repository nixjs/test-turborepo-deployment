import styled from 'styled-components'

export const MenuFooterStyled = styled.div`
    .nav {
        &-item {
            display: block;
            margin-bottom: 0.5em;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &-link {
            display: inline-block;
        }
    }
    @media all and (max-width: 992px) {
        .footer {
            &-link {
                flex: 0 0 50%;
                max-width: 50%;
                margin-bottom: 3rem;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
`
