import styled, { keyframes, css } from "styled-components"

const kfSpin = keyframes`
0% {
    transform: translateZ(-100px) rotateX(0deg) rotateY(0deg) rotate(0deg);
  }
  16% {
    transform: translateZ(-100px) rotateX(180deg) rotateY(180deg) rotate(0deg);
  }
  33% {
    transform: translateZ(-100px) rotateX(1turn) rotateY(90deg) rotate(180deg);
  }
  50% {
    transform: translateZ(-100px) rotateX(1turn) rotateY(1turn) rotate(1turn);
  }
  66% {
    transform: translateZ(-100px) rotateX(180deg) rotateY(1turn) rotate(270deg);
  }
  83% {
    transform: translateZ(-100px) rotateX(270deg) rotateY(180deg) rotate(180deg);
  }
  to {
    transform: translateZ(-100px) rotateX(1turn) rotateY(1turn) rotate(1turn);
  }
`

const kfSpinDuplidated = keyframes`
0% {
    transform: translateZ(-100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  16% {
    transform: translateZ(-100px) rotateX(180deg) rotateY(180deg) rotateZ(0deg);
  }
  33% {
    transform: translateZ(-100px) rotateX(360deg) rotateY(90deg) rotateZ(180deg);
  }
  50% {
    transform: translateZ(-100px) rotateX(360deg) rotateY(360deg)
      rotateZ(360deg);
  }
  66% {
    transform: translateZ(-100px) rotateX(180deg) rotateY(360deg)
      rotateZ(270deg);
  }
  83% {
    transform: translateZ(-100px) rotateX(270deg) rotateY(180deg)
      rotateZ(180deg);
  }
  100% {
    transform: translateZ(-100px) rotateX(360deg) rotateY(360deg)
      rotateZ(360deg);
  }
`

interface StyledProp {
    scale?: number
}

export const DiceIconStyled = styled.div<StyledProp>`
    ${({ scale }) =>
        scale &&
        css`
            transform: scale(${scale});
        `}
    #dice {
        width: 60px;
        height: 60px;
        transform-style: preserve-3d;
        -webkit-animation: ${kfSpin} 50s linear infinite;
        animation: ${kfSpin} 50s linear infinite;
        &.active {
            animation: ${kfSpinDuplidated} 2s infinite linear;
        }
        .dot {
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 7px;
            background: #444;
            box-shadow: inset 5px 0 10px #000;

            &.dtop {
                margin-top: 6px;
            }
            &.dleft {
                margin-left: 40px;
            }
            &.dright {
                margin-left: 6px;
            }
            &.dbottom {
                margin-top: 40px;
            }
            &.center {
                margin: 23px 0 0 23px;
                &.dleft {
                    margin: 23px 0 0 6px;
                }
                &.dright {
                    margin: 23px 0 0 40px;
                }
            }
        }
        .side {
            position: absolute;
            width: 60px;
            height: 60px;
            background: #fff;
            box-shadow: inset 0 0 12px #ccc;
            border-radius: 12px;
        }
        .cover,
        .inner {
            background: #e0e0e0;
            box-shadow: none;
        }
        .cover {
            border-radius: 0;
            transform: translateZ(0);
            &.x {
                transform: rotateY(90deg);
            }
            &.z {
                transform: rotateX(90deg);
            }
        }
        .front {
            transform: translateZ(30px);
            &.inner {
                transform: translateZ(28px);
            }
            .dot {
                &.center {
                    background: #e70d4e;
                    box-shadow: inset 5px 0 10px #e70d4e;
                }
            }
        }
        .back {
            transform: rotateX(-180deg) translateZ(30px);
            &.inner {
                transform: rotateX(-180deg) translateZ(28px);
            }
        }
        .right {
            transform: rotateY(90deg) translateZ(30px);
            &.inner {
                transform: rotateY(90deg) translateZ(28px);
            }
        }
        .left {
            transform: rotateY(-90deg) translateZ(30px);
            &.inner {
                transform: rotateY(-90deg) translateZ(28px);
            }
        }
        .top {
            transform: rotateX(90deg) translateZ(30px);
            &.inner {
                transform: rotateX(90deg) translateZ(28px);
            }
        }
        .bottom {
            transform: rotateX(-90deg) translateZ(30px);
            &.inner {
                transform: rotateX(-90deg) translateZ(28px);
            }
        }
    }
`
