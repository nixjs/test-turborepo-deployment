import styled, { css } from 'styled-components'

interface StyledProp {
    targetColor?: string
    connectColor?: string
    disabledColor?: string
}

export const SliderStyle = styled.div<StyledProp>`
    .noUi-target,
    .noUi-target * {
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-user-select: none;
        -ms-touch-action: none;
        touch-action: none;
        -ms-user-select: none;
        -moz-user-select: none;
        user-select: none;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .noUi-target {
        position: relative;
    }
    .noUi-base,
    .noUi-connects {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .noUi-connects {
        overflow: hidden;
        z-index: 0;
    }
    .noUi-connect,
    .noUi-origin {
        will-change: transform;
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        -ms-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        -webkit-transform-style: preserve-3d;
        transform-origin: 0 0;
        transform-style: flat;
    }
    .noUi-txt-dir-rtl.noUi-horizontal .noUi-origin {
        left: 0;
        right: auto;
    }

    .noUi-vertical .noUi-origin {
        top: -100%;
        width: 0;
    }
    .noUi-horizontal .noUi-origin {
        height: 0;
    }
    .noUi-handle {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: absolute;
    }
    .noUi-touch-area {
        height: 100%;
        width: 100%;
    }
    .noUi-state-tap .noUi-connect,
    .noUi-state-tap .noUi-origin {
        -webkit-transition: transform 0.3s;
        transition: transform 0.3s;
    }
    .noUi-state-drag * {
        cursor: inherit !important;
    }

    .noUi-horizontal {
        height: 18px;
    }
    .noUi-horizontal .noUi-handle {
        width: 34px;
        height: 28px;
        right: -17px;
        top: -6px;
    }
    .noUi-vertical {
        width: 18px;
    }
    .noUi-vertical .noUi-handle {
        width: 28px;
        height: 34px;
        right: -6px;
        bottom: -17px;
    }
    .noUi-txt-dir-rtl.noUi-horizontal .noUi-handle {
        left: -17px;
        right: auto;
    }

    .noUi-target,
    .noUi-connects {
        border-radius: 0.25rem;
    }

    .noUi-draggable {
        cursor: ew-resize;
    }
    .noUi-vertical .noUi-draggable {
        cursor: ns-resize;
    }
    .noUi-handle {
        border-radius: 0.25rem;
        background: var(--base-white);
        cursor: default;
        transition: box-shadow 0.3s;
        background-color: var(--base-white);
        box-shadow: 0 0 0 4px hsl(0deg 0% 100% / 20%);
        cursor: pointer;
        &.disabled {
            cursor: not-allowed;
        }
    }
    .noUi-active {
        box-shadow: inset 0 0 1px var(--base-white), inset 0 1px 7px #ddd, 0 3px 6px -3px #bbb;
    }

    .noUi-handle:after {
        left: 17px;
    }
    .noUi-vertical .noUi-handle:before,
    .noUi-vertical .noUi-handle:after {
        width: 14px;
        height: 1px;
        left: 6px;
        top: 14px;
    }
    .noUi-vertical .noUi-handle:after {
        top: 17px;
    }

    [disabled].noUi-target,
    [disabled].noUi-handle,
    [disabled] .noUi-handle {
        cursor: not-allowed;
    }

    .noUi-pips,
    .noUi-pips * {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .noUi-pips {
        position: absolute;
        color: #999;
    }

    .noUi-value {
        position: absolute;
        white-space: nowrap;
        text-align: center;
    }
    .noUi-value-sub {
        color: #ccc;
        font-size: 10px;
    }

    .noUi-marker {
        position: absolute;
        background: #ccc;
    }
    .noUi-marker-sub {
        background: #aaa;
    }
    .noUi-marker-large {
        background: #aaa;
    }

    .noUi-pips-horizontal {
        padding: 10px 0;
        height: 80px;
        top: 100%;
        left: 0;
        width: 100%;
    }
    .noUi-value-horizontal {
        -webkit-transform: translate(-50%, 50%);
        transform: translate(-50%, 50%);
    }
    .noUi-rtl .noUi-value-horizontal {
        -webkit-transform: translate(50%, 50%);
        transform: translate(50%, 50%);
    }
    .noUi-marker-horizontal.noUi-marker {
        margin-left: -1px;
        width: 2px;
        height: 5px;
    }
    .noUi-marker-horizontal.noUi-marker-sub {
        height: 10px;
    }
    .noUi-marker-horizontal.noUi-marker-large {
        height: 15px;
    }

    .noUi-pips-vertical {
        padding: 0 10px;
        height: 100%;
        top: 0;
        left: 100%;
    }
    .noUi-value-vertical {
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        padding-left: 25px;
    }
    .noUi-rtl .noUi-value-vertical {
        -webkit-transform: translate(0, 50%);
        transform: translate(0, 50%);
    }
    .noUi-marker-vertical.noUi-marker {
        width: 5px;
        height: 2px;
        margin-top: -1px;
    }
    .noUi-marker-vertical.noUi-marker-sub {
        width: 10px;
    }
    .noUi-marker-vertical.noUi-marker-large {
        width: 15px;
    }
    .noUi-tooltip {
        border-radius: 0.125rem;
        padding: 5px;
        position: absolute;
        white-space: nowrap;
        pointer-events: none;
        font-weight: 700;
        font-size: 0.75rem;
        text-align: center;
        color: #191b20;
        background: #0000;
        border: none;
        outline: 0;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .noUi-horizontal .noUi-tooltip {
    }
    .noUi-vertical .noUi-tooltip {
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        top: 50%;
        right: 120%;
    }
    .noUi-horizontal .noUi-origin > .noUi-tooltip {
        -webkit-transform: translate(50%, 0);
        transform: translate(50%, 0);
        left: auto;
        bottom: 10px;
    }
    .noUi-vertical .noUi-origin > .noUi-tooltip {
        -webkit-transform: translate(0, -18px);
        transform: translate(0, -18px);
        top: auto;
        right: 28px;
    }
    .noUi {
        &-target {
            ${({ targetColor }) => {
                return css`
                    background: ${targetColor || '#fa305c'};
                `
            }}
        }
        &-connect {
            ${({ connectColor }) => {
                return css`
                    background: ${connectColor || '#297fe5'};
                `
            }}
        }
    }
    [disabled] .noUi-connect {
        ${({ disabledColor }) => {
            return css`
                background: ${disabledColor};
            `
        }}
    }
    &.disabled {
        opacity: var(--noUi-disabled-opacity, 0.5);
    }
`
