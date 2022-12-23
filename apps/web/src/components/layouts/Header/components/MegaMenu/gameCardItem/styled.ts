import styled from 'styled-components'

export const GameCardItemStyled = styled.div`
    padding: 0 0.75rem;
    display: inline-block;
    width: 25%;
    .game {
        &-image {
            border-radius: 0.75rem;
            &:before {
                content: '';
                padding-top: 100%;
                display: block;
            }
        }
        &-date {
            line-height: 1.125rem;
        }

        &-link {
            text-decoration: none;
        }
    }
    .game-item {
        &--classic {
            width: 20%;
        }
    }
    @media only screen and (min-width: 680px) and (max-width: 760px) {
        width: 33.3333%;
        .game {
            &-item--classic {
                width: inherit;
            }
            &-image {
                img {
                    width: 100%;
                }
            }
        }
    }
    @media only screen and (max-width: 600px) {
        width: 50%;
        .game {
            &-item--classic {
                width: 50%;
            }
            &-image {
                img {
                    width: 100%;
                }
            }
        }
    }
    @media only screen and (min-width: 1200px) {
        width: 20%;
    }
`
