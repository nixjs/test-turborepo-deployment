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

export const TurnsListStyled = styled.div<StyledProp>`
    .card {
        background-color: #0000;
        width: 50px;
        height: 70px;
        // perspective: 1000px;
        display: inline-block;
        margin-right: 20px;
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
                font-size: 22px;
                top: 11px;
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
                background-size: 20px 22px;
                transform: translateX(-50%);
                position: absolute;
                left: 50%;
                bottom: 12px;
                width: 20px;
                height: 22px;
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
            background-size: contain;
        }
    }

    .action {
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        right: -25px;
        background-color: #161f2c;
        border: 1px solid #55657e47;
        box-shadow: 0 4px 8px rgb(13 19 28 / 67%);
        border-radius: 4px;
        cursor: default;
        > svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            content: '';
            display: block;
            background-position: 50%;
            background-repeat: no-repeat;
        }
    }
`
