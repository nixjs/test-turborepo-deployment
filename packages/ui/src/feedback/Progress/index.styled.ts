import styled, { css } from 'styled-components'
import { ElementTypes } from '../../types/element'
import { ProcessingTypes } from './types'

const Colors = {
    textLegendary: '#05E2FF',
    prgLegendary: 'linear-gradient(270.01deg, #31CEFF 0.02%, #561DF9 100%)',
    textMaster: '#F6C44E',
    prgMaster: 'linear-gradient(270.01deg, #FBFF31 0.02%, #5524F9 100%)',
    textCrystal: '#FA54FF',
    prgCrystal: 'linear-gradient(270.01deg, #F798F9 0.02%, #561DF9 100%)'
}

const variantOptions = {
    legendary: {
        color: Colors.textLegendary,
        prgColor: Colors.prgLegendary
    },
    master: {
        color: Colors.textMaster,
        prgColor: Colors.prgMaster
    },
    crystal: {
        color: Colors.textCrystal,
        prgColor: Colors.prgCrystal
    }
}

const sizeOptions: ProcessingTypes.ProgressSizeProps = {
    xs: {
        size: '0.375rem',
        radius: '0.25rem'
    },
    sm: {
        size: '0.425rem',
        radius: '0.25rem'
    },
    md: {
        size: '0.5rem',
        radius: '0.25rem'
    },
    lg: {},
    xl: {},
    xxl: {}
}

export const ProgressStyled = styled.div<ProcessingTypes.ProgressPropArg & ElementTypes.StyledProps>`
    .track {
        width: 100%;
        height: 0.375rem;
        margin: 0 auto;
        position: relative;
        background: var(--base-white);
        ${({ size }) =>
            css`
                height: ${size && sizeOptions[size].size};
                border-radius: ${size && sizeOptions[size].radius};
            `}
    }
    .thumb {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
        ${({ variant, size, progress }) =>
            css`
                background: ${variant && variantOptions[variant].prgColor};
                border-radius: ${size && sizeOptions[size].radius};
                width: ${`${progress}%`};
            `}
        &:before,
            &:after {
            content: '';
            border-radius: 50%;
            width: 0.75rem;
            height: 0.75rem;
            position: absolute;
            right: -0.0625rem;
            top: 50%;
            transform: translateY(-50%);
            background: var(--base-white);
            filter: blur(0.125rem);
        }
    }
    ${(props: any) => {
        return css`
            ${props?.overrideStyled || ''}
        `
    }}
`
