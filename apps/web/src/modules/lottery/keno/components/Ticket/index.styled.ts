import styled from 'styled-components'

export const TicketStyled = styled.div`
    flex: 0 0 auto;
    width: 50%;
    padding: 0.125rem 0.75rem;
    .ticket-content {
        background: #ffefd5;
    }
    .ticket-numbers {
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 0.875rem;
        grid-row-gap: 0.625rem;
        justify-items: center;

        .number {
            width: 2.25rem;
            height: 2.25rem;
            background: wheat;
        }
    }
`
