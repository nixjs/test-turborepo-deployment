import styled from 'styled-components'

export const NavHeaderStyled = styled.div`
    width: auto;
    .main-nav {
        flex: 0 0 auto;
        display: none;
        &-link {
            flex: 0 0 auto;
            border-radius: 0.75rem;
            padding: 0.625rem 1rem;
            text-decoration: none;
            border: 1px solid transparent;
            transition: all 0.3s ease;
            color: var(--base-brand-third);
            font-size: 1rem;
        }
        &-item {
            display: inline-block;
            &:hover {
                .main-nav-link {
                    font-weight: bold;
                    border-color: var(--base-black-lighter);
                    background-color: var(--base-black-lighter);
                }
                .mega-menu {
                    opacity: 1;
                    z-index: 999;
                    visibility: visible;
                }
            }
        }
    }
    @media all and (min-width: 1024px) {
        width: 40%;
        .main-nav {
            display: flex;
        }
    }
    @media all and (max-width: 1200px) {
        .main-nav {
            &-item {
                &:nth-child(4),
                &:nth-child(5) {
                    display: none;
                }
            }
        }
    }
`
