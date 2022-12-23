import styled from 'styled-components'

interface StyledProp {}

export const VerificationOTPStyled = styled.section<StyledProp>`
    .auth-heading {
        &-group {
            i {
                color: var(--base-font-color);
            }
            .button-action {
                left: 0;
                top: 0.75rem;
            }
        }
    }
`
