import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const SelectNetworkRequiredStyled = styled.div`
    animation: 0.6s ease 0s normal forwards running ${fadeIn};
    .arrow-icon {
        top: -2.1875rem;
        right: -3.125rem;
    }
`
