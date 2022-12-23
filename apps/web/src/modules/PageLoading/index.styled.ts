import styled from 'styled-components'

export const PageLoadingStyled = styled.div`
    @keyframes spin {
        0% {
            transform: translateZ(-150em) rotateX(45deg) rotateZ(-45deg);
        }
        100% {
            transform: translateZ(-150em) rotateX(45deg) rotateZ(-225deg);
        }
    }
    @keyframes specular {
        0% {
            background-color: #3a3a3a;
        }
        100% {
            background-color: #444;
        }
    }

    .cube {
        animation: spin 2s linear forwards infinite;
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transform: translateZ(-150em) rotateX(45deg) rotateZ(-45deg);

        .cube__face {
            position: absolute;
            width: 5em;
            height: 5em;

            &.cube__face--front {
                transform: rotateY(0deg) translateZ(2.5em);
                background-color: #333;
            }
            &.cube__face--back {
                transform: rotateY(180deg) translateZ(2.5em);
                background-color: #333;
            }

            &.cube__face--right {
                transform: rotateY(90deg) translateZ(2.5em);
                background-color: #3a3a3a;
                animation: specular 1s linear 0.15s infinite alternate;
            }
            &.cube__face--left {
                transform: rotateY(-90deg) translateZ(2.5em);
                background-color: #3a3a3a;
                animation: specular 1s linear 0.15s infinite alternate;
            }

            &.cube__face--top {
                transform: rotateX(90deg) translateZ(2.5em);
                background-color: #444;
                animation: specular 1s linear 0.15s infinite alternate-reverse;
            }
            &.cube__face--bottom {
                transform: rotateX(-90deg) translateZ(2.5em);
                background-color: #444;
                animation: specular 1s linear 0.15s infinite alternate-reverse;
            }
        }
    }

    .loader {
        font-size: 1rem;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #eee;
        text-align: center;
        user-select: none;
        cursor: progress;
        opacity: 1;
        transition: opacity 0.15s ease-in-out;

        .loader__animation {
            width: 5em;
            height: 5em;
            perspective: 100em;
        }
        .loader__message {
            font-size: 0.65em;
            font-weight: 300;
            letter-spacing: 0.1em;
            margin-bottom: 1.5em;
            text-transform: uppercase;
        }
    }
`
