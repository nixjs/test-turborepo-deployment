import styled from 'styled-components'

interface StyledProp {}

export const OTPStyled = styled.section<StyledProp>`
    --form-input-border-width: 2px;
    --form-input-border-color: var(--base-black-normal);
    --form-input-color: var(--base-black-darkest);
    --form-input-background-color: var(--base-white);

    --form-input-border-color-hover: var(--base-black-darkest);
    --form-input-background-color-hover: var(--base-white);
    --form-input-color: var(--base-brand-third);
    --form-input-border-color-focus: var(--base-functional-useful);
    --form-input-background-color-focus: var(--base-white);
    --form-input-error-color: var(--base-functional-stressful);

    --form-label-font-size: 1rem;
    --form-label-font-weight: 400;
    --form-label-margin-bottom: 0.5rem;
    --base-input-size-multiplier: 1.7142857142857142;
    .form-label {
        color: var(--base-font-color-2);
        font-size: var(--form-label-font-size);
        font-weight: var(--form-label-font-weight);
        margin-bottom: var(--form-label-margin-bottom);
    }
    .form-input {
        display: block;
        box-sizing: border-box;
        line-height: 1.5;
        width: 3rem;
        height: 3rem;
        background: transparent;
        outline: none;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: 'tnum';
        position: relative;
        text-align: center;
        font-weight: 600;
        color: var(--form-input-color);
        border: var(--form-input-border-width) solid var(--form-input-border-color);
        background-color: var(--form-input-background-color);
        font-size: 1rem;
        padding: calc(var(--base-input-padding-vertical) * var(--base-input-size-multiplier))
            calc(var(--base-input-padding-horizontal) * var(--base-input-size-multiplier));
        border-radius: 0.5rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        margin-right: 0.5rem;
        &:last-child {
            margin-right: 0;
        }
        &:hover {
            --form-input-border-color: var(--form-input-border-color-hover);
            --form-input-background-color: var(--form-input-background-color);
        }
        &:focus {
            --form-input-border-color: var(--form-input-border-color-focus);
            --form-input-background-color: var(--form-input-background-color-focus);
        }
        &:read-only,
        &:disabled,
        &.disabled {
            cursor: not-allowed;
            &:hover,
            &:focus {
                --form-input-border-color: rgba(255, 255, 255, 0.2);
                --form-input-background-color: rgba(255, 255, 255, 0.1);
                cursor: not-allowed;
            }
        }
    }
    .error {
        .form-input {
            --form-input-border-color: var(--base-functional-stressful);
            --form-input-background-color: #d5303533;
            &:hover {
                --form-input-border-color: var(--base-functional-stressful);
                --form-input-background-color: #d5303533;
            }
        }
    }
    .cdt {
        &__time {
            &::before {
                content: attr(data-text);
                display: block;
                font-weight: bold;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }
        }
    }
`
