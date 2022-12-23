import styled from 'styled-components'

export const DrawSelectionStyled = styled.div`
    .draw {
        &-item {
            &:hover {
                > div {
                    background: wheat;
                    cursor: pointer;
                }
            }
            &.activated {
                > div {
                    background: #ff8c00;
                    color: white !important;
                }
            }
        }
    }
    .dropdown-inner {
        height: 300px;
        overflow: hidden;
        overflow-y: auto;
    }
`
