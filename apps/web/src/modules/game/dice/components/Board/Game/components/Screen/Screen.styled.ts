import styled, { css } from 'styled-components'

interface StyledProp {}

const ObjectCss = css`
    .object {
        &_astronaut {
            bottom: -1.5rem;
            right: -100%;
            will-change: transform;
        }
        &_rocket {
            top: 75%;
            left: 18%;
            z-index: 0;
            opacity: 0.2;
            transform: translate(50%, 180%);
            animation: rocket-movement 50s linear infinite both running;
        }
        &_moon {
            left: 30%;
            opacity: 0.4;
        }
        &_earth {
            bottom: 1%;
            left: 2%;
            opacity: 0.3;
            animation: spin-earth 100s infinite linear both;
        }
    }
    &.win {
        .object {
            &_astronaut {
                right: -2rem;
            }
        }
    }
`

export const ScreenStyled = styled.div<StyledProp>`
    .screen {
        background: linear-gradient(220.24deg, var(--base-ink-darker) 22.92%, #050a16 77.08%);
        box-shadow: 2px 12px 24px rgba(0, 0, 0, 0.32);
        border-radius: 0.75rem;
        min-height: 14rem;
        &:before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url(/modules/games/dice/screen.svg), linear-gradient(90deg, #0b0f1e 0%, #101831 71%, #131a32 100%);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        &-left {
            background: rgba(0, 0, 0, 0.3);
            mix-blend-mode: normal;
        }
        &-right {
            background-repeat: no-repeat;
            background-position: center 170%;
            background-size: contain;
            mix-blend-mode: screen;
        }
        ${ObjectCss}
    }
    .box-lucky-state {
        mix-blend-mode: normal;
        filter: blur(1.875rem);
    }
    @keyframes rocket-movement {
        100% {
            transform: translate(600px, -200px);
        }
    }
    @keyframes spin-earth {
        100% {
            transform: rotate(-360deg);
            transition: transform 20s;
        }
    }
`
