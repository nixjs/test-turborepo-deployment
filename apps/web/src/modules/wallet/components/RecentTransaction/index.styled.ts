import styled from 'styled-components'

export const TxStyled = styled.div`
    margin-bottom: 1.5rem;
    .tx {
        &-icon {
            margin: 0px 12px 0px 0px;
            display: flex;
            height: 2rem;
            width: 2rem;
            min-width: 2rem;
            background-color: var(--base-black-lighter);
            align-items: center;
        }
    }
    &.tx-item {
        &--deposit {
            .tx {
                &-icon {
                    color: var(--base-white);
                    background-color: var(--base-functional-positive);
                }
            }
        }
        &--withdraw {
            .tx {
                &-icon {
                    color: var(--base-white);
                    background-color: var(--base-functional-stressful);
                }
            }
        }
    }
    &:last-child {
        margin-bottom: 0;
    }
`
