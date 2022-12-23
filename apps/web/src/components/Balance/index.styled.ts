import styled, { css } from 'styled-components'

export interface BalanceStyledPropArg {
    size?: number | string
    weight?: number | string
    lineHeight?: number | string
    color?: string
}

const BalanceLabelStyled = styled.div<BalanceStyledPropArg>`
    &.prize {
        &__value {
            margin-bottom: 0.25rem;
            font-family: Oswald;
            ${({ size, lineHeight, color, weight }) =>
                css`
                    font-weight: ${weight || '700'};
                    font-size: ${size || 16}px;
                    line-height: ${lineHeight || 24}px;
                    color: ${color || 'var(--base-brand-primary)'};
                `};
        }
    }
`

export default BalanceLabelStyled
