import styled from 'styled-components'

export const MegaMenuStyled = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    visibility: hidden;
    opacity: 0;
    box-shadow: 0.125rem 0.75rem 1rem rgb(0 0 0 / 8%);
    transition: all 0.5s ease 0s;
    background: var(--base-white);
    .mega {
        &-container {
            padding: 2.5rem 0 1.5rem;
            .game-lists {
                margin: 0 -0.75rem;
            }
        }
        &-widget-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            color: var(--base-brand-third);
        }
        &-widget-content {
            .nav {
                &-link {
                    padding-bottom: 0.75rem;
                    margin-bottom: 0.75rem;
                    color: var(--base-brand-third);
                    border-bottom: 0.0625rem solid var(--base-black-lighter);
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
            .game {
                &-item {
                    margin-bottom: 1.5rem;
                }
            }
        }
    }
`
