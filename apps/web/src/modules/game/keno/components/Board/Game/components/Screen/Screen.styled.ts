import styled from 'styled-components'

interface StyledProp {}

export const ScreenStyled = styled.div<StyledProp>`
    .board {
        position: relative;
        display: grid;
        width: 100%;
        max-width: 658px;
        grid-template-columns: repeat(8, auto);
        grid-gap: 1.2em 0.65em;
        margin-bottom: 25px;
        .button {
            cursor: pointer;
            position: relative;
            padding: 0;
            font-weight: 600;
            font-size: 20px;
            border: none;
            background-color: #0000;
            &:after {
                user-select: none;
                pointer-events: none;
                content: '';
                display: block;
                padding-bottom: 90%;
            }
            > span,
            > div {
                user-select: none;
                position: absolute;
                pointer-events: none;
            }
            > span {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                color: #fff;
            }
            > div {
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                border-radius: 0.5em;
            }
            &-base {
                &:hover {
                    top: 1px;
                }
                > div {
                    box-shadow: 0 7px rgb(41 126 229 / 50%);
                    background-color: #297fe5;
                }
                &:disabled {
                    top: 0;
                    cursor: not-allowed;
                    &:hover {
                        top: 0;
                    }
                    &:not(.button-lucky) {
                        > div {
                            background: #1866c3;
                            box-shadow: 0 7px rgb(24 102 195 / 50%);
                        }
                    }
                }
            }
            &-selected {
                top: 3px;
                &:hover {
                    top: 3px;
                }
                > div {
                    background: #fa305c;
                    box-shadow: 0 4px rgb(241 6 57 / 50%);
                }
            }
            &-lucky {
                top: 3px;
                &:hover {
                    top: 3px;
                }
                > span {
                    color: #297fe5;
                }
                > div {
                    background: #083b7b;
                    box-shadow: 0 4px rgb(6 48 99 / 50%);
                }
            }
            &-win {
                top: 3px;
                &:hover {
                    top: 3px;
                }
                > span {
                    color: black;
                }
                > div {
                    border: 4px solid #fa305c;
                    background-color: #191b20;
                    box-shadow: 0 4px rgb(250 48 92 / 50%);
                }
                &:before {
                    z-index: 1;
                    position: absolute;
                    content: '';
                    display: block;
                    width: 50px;
                    height: 50px;
                    background-image: url(/modules/games/instant-keno/win.png);
                    background-size: 50px 50px;
                    margin: auto;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                }
            }
        }
    }
`
