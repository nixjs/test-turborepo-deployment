import styled from 'styled-components'

interface StyledProp {}

export const LastBetStyled = styled.div<StyledProp>`
    .lastbet-inner {
        height: 2.5rem;
    }
    span {
        min-width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: var(--base-ink-darker);
        &.in {
            color: var(--base-color-primary-1);
        }
        &.out {
            color: var(--base-color-danger-1);
        }
    }
`
