import styled, { keyframes } from 'styled-components'

interface StyledProp {}

const FlipData = keyframes`
    0% {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(180deg);
    }
`

export const ScreenStyled = styled.div<StyledProp>`
    .card {
        &-front,
        &-back {
            backface-visibility: hidden;
        }
        &-back {
            background-color: #fff;
            transform: rotateY(180deg);
            > span {
                line-height: 1;
                font-weight: 700;
                transform: translateX(-50%);
                font-size: 65px;
                top: 20px;
                left: 50%;
                white-space: nowrap;
                user-select: none;
                pointer-events: none;
            }
            &--spades,
            &--clubs {
                color: #26292f;
            }
            &--hearts,
            &--diamonds {
                color: #f04051;
            }
            &:after {
                content: '';
                display: block;
                background-position: 50%;
                background-repeat: no-repeat;
                background-size: 60px 65px;
                width: 60px;
                height: 65px;
                right: 50%;
                margin-right: -30px;
                bottom: 30px;
                position: absolute;
            }
            &--spades {
                &:after {
                    background-image: url(/modules/games/hilo/Spades.svg);
                }
            }
            &--clubs {
                &:after {
                    background-image: url(/modules/games/hilo/Clubs.svg);
                }
            }
            &--hearts {
                &:after {
                    background-image: url(/modules/games/hilo/Hearts.svg);
                }
            }
            &--diamonds {
                &:after {
                    background-image: url(/modules/games/hilo/Diamonds.svg);
                }
            }
        }
    }
    .deck {
        &-card {
            transform-style: preserve-3d;
            .card {
                background-color: #0000;
                width: 144px;
                height: 200px;
                perspective: 1000px;
                &-inner {
                    transform-style: preserve-3d;
                    &--animation {
                        transform: rotateY(0deg);
                        animation-name: ${FlipData};
                        animation-duration: 0.6s;
                        animation-fill-mode: forwards;
                        animation-delay: 0.1s;
                    }
                }
                &-front {
                    box-shadow: 0 0 25px 0 hsl(0deg 0% 100% / 10%);
                    background-image: url(/modules/games/hilo/card-front.svg);
                    background-size: 144px 200px;
                }
            }
        }
        .button-skip {
            z-index: 4;
            padding: 0;
            bottom: -21px;
            left: 50%;
            transform: translateX(-50%);
            border: none;
        }
    }
`
