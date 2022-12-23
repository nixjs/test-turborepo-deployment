import styled from 'styled-components'
import { InputAmountStyled } from './InputAmount.styled'

interface StyledProp {}

export const FormBettingStyled = styled.div<StyledProp>`
    margin-top: 3.375rem;
    ${InputAmountStyled}
    .form-betting, .button-betting {
        width: calc(50% - 0.625rem);
    }
    .button-betting {
        .button-text {
            line-height: 1;
        }
    }
`
